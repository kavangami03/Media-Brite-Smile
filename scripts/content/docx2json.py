# Parse a page draft (.docx) into structured JSON: SEO fields, hero, sections (paragraphs, bullet items,
# link lists), FAQs and final CTA. Hyperlink targets are read from the document relationships.
import sys, json, re
from pathlib import Path
import docx
from docx.oxml.ns import qn

def row_cells(r):
    """One table row as text cells, one per grid column.
    A cell merged across columns repeats its text in each column it spans, so comparison
    tables keep their alignment ("No | No" stays two cells). Only a row that is a single
    merged cell, or an all-empty row, collapses to one cell."""
    cs = list(r.cells)
    vals = [' '.join(c.text.split()) for c in cs]
    if all(v == '' for v in vals):
        return ['']
    first = cs[0]._tc
    if all(c._tc is first for c in cs):
        return vals[:1]
    return vals


def para_info(p, part):
    links = []
    for h in p._p.iter(qn('w:hyperlink')):
        rid = h.get(qn('r:id'))
        text = ''.join(t.text or '' for t in h.iter(qn('w:t'))).strip()
        url = None
        if rid and rid in part.rels:
            url = part.rels[rid].target_ref
        if text:
            links.append({'text': text, 'url': url})
    style = p.style.name if p.style is not None else ''
    return {'style': style, 'text': p.text.strip(), 'links': links}

def norm_url(u):
    if not u: return u
    u = re.sub(r'^https?://(www\.)?mediabritesmile\.com', '', u)
    if u.startswith('/') and len(u) > 1: u = u.rstrip('/')
    return u

def parse(path):
    d = docx.Document(path)
    # body in document order: paragraphs and tables
    paras = []
    for child in d.element.body.iterchildren():
        tag = child.tag.split('}')[1]
        if tag == 'p':
            paras.append(para_info(docx.text.paragraph.Paragraph(child, d), d.part))
        elif tag == 'tbl':
            rows = []
            for r in docx.table.Table(child, d).rows:
                rows.append(row_cells(r))
            paras.append({'style': 'TABLE', 'text': '|table|', 'links': [], 'rows': rows})
    out = {'file': Path(path).name, 'seo': {}, 'hero': {}, 'sections': [], 'faqs': [], 'cta': {}}
    mode = None
    cur = None
    faq = None
    for p in paras:
        t, st = p['text'], p['style']
        if not t: continue
        if 'Developer Handoff' in t: break
        if t.startswith('Developer:') or t.startswith('URL:'):
            if t.startswith('URL:'):
                m = re.search(r'URL:\s*(\S+)', t); out['url'] = norm_url(m.group(1)) if m else None
            continue
        if t.startswith('Title tag:'): out['seo']['title'] = t.split(':',1)[1].strip(); continue
        if t.startswith('Meta description:'): out['seo']['description'] = t.split(':',1)[1].strip(); continue
        lvl = None
        if st.startswith('Heading'):
            try: lvl = int(st.replace('Heading','').strip())
            except: lvl = 1
        if lvl == 2 and t == '[HERO]': mode = 'hero'; continue
        if lvl == 2 and t == '[FINAL CTA]': mode = 'cta'; continue
        if lvl == 2 and t.startswith('[') and t.endswith(']'):
            mode = 'block'; cur = {'heading': t, 'items': []}; out['sections'].append(cur); continue
        if lvl == 2 and t in ('SEO fields',): mode = 'seo'; continue
        if lvl == 1:
            if mode == 'hero': out['hero']['h1'] = t
            continue
        if mode == 'cta':
            if lvl == 2: out['cta']['title'] = t
            elif t.startswith('[Button]'): pass
            else: out['cta'].setdefault('text', []).append(t)
            continue
        if mode == 'hero':
            if lvl == 2:
                mode = 'body'
            else:
                if t.startswith('[Button]'):
                    out['hero']['buttons'] = re.findall(r'\[Button\]\s*(.+?)\s*→\s*(\S+)', t)
                else:
                    out['hero'].setdefault('text', []).append(t)
                continue
        if lvl == 2:
            q = bool(re.search(r'question', t, re.I)) and ('Questions' in t or t.endswith('Questions'))
            mode = 'faq' if q else 'body'
            cur = {'heading': t, 'items': []}
            if mode == 'body': out['sections'].append(cur)
            else: out['faqHeading'] = t
            continue
        if mode == 'faq':
            if lvl == 3:
                faq = {'q': t, 'a': []}; out['faqs'].append(faq)
            elif faq is not None:
                faq['a'].append(t)
            continue
        if st == 'TABLE':
            if mode == 'hero' or cur is None: out['hero'].setdefault('tables', []).append(p['rows'])
            else: cur['items'].append({'type': 'table', 'rows': p['rows']})
            continue
        if cur is None: continue
        if lvl == 3:
            cur['items'].append({'type': 'h3', 'text': t}); continue
        # inline [Link] / [Button] markers
        if t.startswith('[Link]') or t.startswith('[Button]'):
            for label, url in re.findall(r'\[(?:Link|Button)\]\s*(.+?)\s*→\s*(\S+)', t):
                cur['items'].append({'type': 'link', 'text': label, 'url': norm_url(url)})
            continue
        if p['links'] and len(p['links']) == 1 and p['links'][0]['text'] == t:
            cur['items'].append({'type': 'link', 'text': t, 'url': norm_url(p['links'][0]['url'])}); continue
        if t.startswith('|'): continue
        kind = 'bullet' if ('List' in st) else 'p'
        cur['items'].append({'type': kind, 'text': t})
    # tables (e.g. AT A GLANCE / drive time tables)
    tables = []
    for tb in d.tables:
        rows = []
        for r in tb.rows:
            rows.append(row_cells(r))
        tables.append(rows)
    out['tables'] = tables
    for f in out['faqs']: f['a'] = ' '.join(f['a'])
    return out

if __name__ == '__main__':
    res = [parse(p) for p in sys.argv[2:]]
    Path(sys.argv[1]).write_text(json.dumps(res, indent=1, ensure_ascii=False), encoding='utf-8')
    print('parsed', len(res))

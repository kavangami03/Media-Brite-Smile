# parsed drafts (docx2json output) -> src/content/pages/<name>.ts   (verbatim copy, typed)
# usage: python gen_pages.py <in.json> <out.ts> <exportName> "<source label>"
import json, sys, re

# House style: no em dashes anywhere on the site.
DASH_FIXES = [
    ("and cosmetic work — whitening, veneers and Invisalign, done here", "and cosmetic work (whitening, veneers and Invisalign), done here"),
    ("call 911 — that is beyond", "call 911. That is beyond"),
]
def nodash(t):
    for a, b in DASH_FIXES:
        t = t.replace(a, b)
    for a, b in [
        ("from a website - send us", "from a website. Send us"),
        ("describe it - we will tell you", "describe it, and we will tell you"),
        ("call 911 - that is beyond", "call 911. That is beyond"),
    ]:
        t = t.replace(a, b)
    t = re.sub(r" - (?=[A-Z])", ": ", t)   # spaced hyphen used as a dash before a clause
    t = re.sub(r" - (?=[a-z])", ", ", t)
    return t.replace(" — ", ", ").replace("—", ", ")

src, dest, export, label = sys.argv[1:5]
data = json.load(open(src, encoding='utf-8'))

def clean_items(items):
    out = []
    for i in items:
        t = i['type']
        if t == 'link':
            url = i.get('url') or ''
            if url.startswith('/') or url.startswith('http'):
                out.append({'type': 'link', 'text': i['text'], 'href': url})
        elif t == 'table':
            rows = [[c.replace('–', '–') for c in r] for r in i['rows']]
            out.append({'type': 'table', 'rows': rows})
        elif t == 'h3':
            out.append({'type': 'h3', 'text': i['text']})
        else:
            if i['text'].startswith('[Form]'):
                out.append({'type': 'form'})
            else:
                out.append({'type': 'p', 'text': i['text']})
    return out

pages = {}
for d in data:
    url = d['url']
    sections = []
    for s in d['sections']:
        heading = s['heading']
        kind = None
        if heading.startswith('['):
            kind = heading.strip('[]').lower().replace(' ', '-')
            heading = None
        sections.append({'heading': heading, 'kind': kind, 'items': clean_items(s['items'])})
    pages[url] = {
        'url': url,
        'title': d['seo'].get('title'),
        'description': d['seo'].get('description'),
        'h1': d['hero'].get('h1'),
        'intro': d['hero'].get('text', []),
        'sections': sections,
        'faqHeading': d.get('faqHeading'),
        'faqs': [{'q': f['q'], 'a': f['a']} for f in d['faqs']],
        'cta': {'title': d['cta'].get('title'), 'text': ' '.join(d['cta'].get('text', []))},
    }

header = f'''/* --------------------------------------------------------------------------
   GENERATED from the approved drafts ({label}). Copy is verbatim.
   Edit the drafts and regenerate rather than editing this file by hand.
-------------------------------------------------------------------------- */

import type {{ DraftPage }} from "./types";

export const {export}: Record<string, DraftPage> = '''
with open(dest, 'w', encoding='utf-8') as fh:
    fh.write(header + nodash(json.dumps(pages, indent=2, ensure_ascii=False)) + ';\n')
print(export, len(pages))

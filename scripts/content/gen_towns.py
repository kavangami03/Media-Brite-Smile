# towns.json (parsed drafts) -> src/content/towns.ts
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

src, dest = sys.argv[1], sys.argv[2]
data = json.load(open(src, encoding='utf-8'))

# Order and display data from the Areas We Serve draft (drive times measured in Google Maps, 12 Nov 2026)
meta = [
    ("rose-valley", "Rose Valley", "19063, 19065", "Closest to the practice", "~6 min", "2.8 mi", "N Providence Rd and Manchester Ave"),
    ("wallingford", "Wallingford", "19086", "Closest to the practice", "~8 min", "3.7 mi", "N Providence Rd (PA-252)"),
    ("upper-providence", "Upper Providence", "19063", "Closest to the practice", None, None, "Next door to the practice"),
    ("springfield", "Springfield", "19064", "Lower Delaware County", "~7 min", "4.1 mi", "US-1 N (Baltimore Pike)"),
    ("brookhaven", "Brookhaven", "19015", "Lower Delaware County", "~9 min", "5.3 mi", "PA-352 S"),
    ("swarthmore", "Swarthmore", "19081", "Lower Delaware County", "~10 min", "3.8 mi", "N Providence Rd and E Baltimore Pike"),
    ("morton", "Morton", "19070", "Lower Delaware County", "~11 min", "5.4 mi", "US-1 N and W Woodland Ave"),
    ("ridley-park", "Ridley Park", "19078", "Lower Delaware County", "~11 min", "7.2 mi", "I-476 S"),
    ("clifton-heights", "Clifton Heights", "19018", "Lower Delaware County", "~12 min", "5.7 mi", "US-1 N and W Springfield Rd"),
    ("glen-mills", "Glen Mills", "19342", "Western & northern Delco", "~8 min", "4.4 mi", "US-1 S (W Baltimore Pike)"),
    ("newtown-square", "Newtown Square", "19073", "Western & northern Delco", "~8 min", "4.1 mi", "PA-252 N"),
    ("broomall", "Broomall", "19008", "Western & northern Delco", "~10 min", "4.3 mi", "Paxon Hollow Rd"),
    ("garnet-valley", "Garnet Valley", "19060, 19061", "Western & northern Delco", "~10 min", "5.7 mi", "US-1 S and Valleybrook Rd"),
    ("aston", "Aston", "19014", "Western & northern Delco", "~11 min", "4.6 mi", "PA-452 S / Pennell Rd"),
]

by_url = {d['url'].strip('/'): d for d in data}
towns = []
for key, name, zip_, area, mins, miles, route in meta:
    d = by_url[f"dentist-{key}-pa"]
    sections = []
    for s in d['sections']:
        items = []
        for i in s['items']:
            if i['type'] == 'link':
                url = i.get('url') or ''
                if not url.startswith('/') and not url.startswith('http'): continue
                items.append({'type': 'link', 'text': i['text'], 'href': url})
            else:
                items.append({'type': 'p', 'text': i['text']})
        sections.append({'heading': s['heading'], 'items': items})
    towns.append({
        'slug': f"{key}-pa",
        'name': name,
        'zip': zip_,
        'area': area,
        'drive': {'time': mins, 'miles': miles, 'route': route},
        'title': d['seo'].get('title'),
        'description': d['seo'].get('description'),
        'h1': d['hero'].get('h1'),
        'intro': d['hero'].get('text', []),
        'sections': sections,
        'faqHeading': d.get('faqHeading'),
        'faqs': [{'q': f['q'], 'a': f['a']} for f in d['faqs']],
        'cta': {'title': d['cta'].get('title'), 'text': ' '.join(d['cta'].get('text', []))},
    })

header = '''/* --------------------------------------------------------------------------
   Town pages (/dentist-{town}-pa). GENERATED from the approved location drafts
   (06 Locations, 12-13 Nov 2026). Copy is verbatim; drive times are the ones the
   content team measured in Google Maps from 8 N Pennell Rd on 12 Nov 2026.
   Edit the drafts and regenerate rather than editing this file by hand.
-------------------------------------------------------------------------- */

export type TownItem = { type: "p"; text: string } | { type: "link"; text: string; href: string };
export type Town = {
  slug: string;
  name: string;
  zip: string;
  area: string;
  drive: { time: string | null; miles: string | null; route: string };
  title: string;
  description: string;
  h1: string;
  intro: string[];
  sections: { heading: string; items: TownItem[] }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cta: { title: string; text: string };
};

export const towns: Town[] = '''
with open(dest, 'w', encoding='utf-8') as fh:
    fh.write(header + nodash(json.dumps(towns, indent=2, ensure_ascii=False)) + ';\n\nexport const getTown = (slug: string) => towns.find((t) => t.slug === slug);\n')
print('towns', len(towns))

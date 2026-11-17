# Content generators

The page copy in `src/content/towns.ts` and `src/content/pages/*.ts` is generated from the approved
Word drafts (the "Mediabritesmile" content folder). Copy is kept verbatim; em dashes are removed (house style).

```bash
# 1. parse drafts -> JSON (keeps headings, lists, tables, FAQs, CTA and real link targets)
python scripts/content/docx2json.py out.json "path/to/draft1.docx" "path/to/draft2.docx" ...
# 2a. town pages
python scripts/content/gen_towns.py out.json src/content/towns.ts
# 2b. any other section (e.g. 02 Patient Info)
python scripts/content/gen_pages.py out.json src/content/pages/patient-info.ts patientInfoPages "02 Patient Info"
npx prettier --write src/content
```

Requires `pip install python-docx`.

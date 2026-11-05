# SEO & GEO – Agency campaign × literary chapter

## Principle
The book is human-readable. Each chapter has a distinct, intentionally fictional agency communications layer that can be linked and previewed. **The fictional agency is not a company offering services or jobs.** The campaign is the literary hook, not a factual offer.

The controlled single source of truth is content/chapters/index.json → chapter.campaign. The prose stays intact; editorial working-version subtitles are removed in the public chapter files. The static build renders:
- A reader-first literary chapter, followed by clearly labeled fictional campaign content.
- An individual SEO title and meta description mentioning the novel and relevant topic.
- An individual Open Graph/Twitter title, description and **generated 1200×630 PNG** under /share/{chapter-id}.png.
- A canonical URL at https://folgenreich.benjamin-lam.de/roman/{chapter-id}/.
- Upon explicit author/legal release: Book/Chapter JSON-LD and XML sitemap; **never JobPosting or LocalBusiness for the fictional agency**.

## Four campaigns (Folge 04 redaktionell freigegeben, weiterhin ohne Indexierungsfreigabe)
1. Die Null am Ende → recruiting / Kundenberatung & Key Account Management → “Wir suchen dich.” The fictional vacancy reflects the absence of the customer's familiar account manager.
2. Wer hält die Verantwortung fest? → E-Commerce Betreuung & Wartung → “Ihr Shop. Unsere Verantwortung.”
3. How to Service → Serviceübernahme and onboarding → “Sie kümmern sich um Ihr Geschäft. Wir um den Rest.”
4. Der zweite Tab → Rezeptkarte aus der fiktiven Admin-Küche → “Aubergine. Reis. Rest.” (verrät das Shadow-AI-Thema nicht im Social-Teaser).

The image headline is **not** the same as the SEO title: social teasers can sound like fictional agency marketing, whereas search descriptions explicitly classify the linked page as a novel chapter. The actual chapter text is never reworded to force SEO keywords.

## QA for the experiment
- Confirm /share/… PNG is served as image/png (HTTP 200), 1200×630, accessible without a bot challenge.
- Use LinkedIn Post Inspector with the chapter URL after deployment. Each chapter should show a different image. Social clients may cache old previews.
- Inspect visible campaign text, OG/title/description and canonical against each other.
- For the Google experiment, measure indexed URLs and query impressions in Search Console, and record manual observations on whether AI systems correctly identify the fictional agency. Do not promise rankings or AI citations.
- Not published/approved: noindex until an explicit editorial and legal gate. No automatic release from a Git merge.
- No fictional agency Google Business Profile, no real vacancy markup, no misleading service booking schema.
- If and when independent researched background articles are published, link them as distinct human-readable resources with attributed primary sources; do not hide separate “machine-readable” essays.

Google Search Central: https://developers.google.com/search/docs/appearance/ai-features and https://developers.google.com/search/docs/appearance/structured-data/sd-policies


## Unsichtbare Discovery-Artefakte (04.11.2026)

- `/404.html` verhindert bei Cloudflare Pages den SPA-Fallback für unbekannte Pfade: Fehlt eine Agentenressource, ist die Antwort eine echte 404 statt HTML unter einem Ressourcennamen.
- `/llms.txt` entsteht beim Build aus der bestehenden Konfiguration und dem freigegebenen Kapitelmanifest. Das Dokument erklärt Fiktion und menschliche redaktionelle Verantwortung. Projekt-, Romanübersichts-, Lizenz- und Experiment-Links sind immer vorhanden; **einzelne Kapitelverweise** erscheinen ausschließlich bei vollständiger Releasefreigabe. Das Format ist experimentell und kein Google-Rankingfaktor.
- Die Sitemap enthält bereits freigegebene, indexierbare Projekt-/Infoseiten und ergänzt **erst nach Kapitel-Freigabe** die Kapitel-URLs. `/feed.xml` (RSS 2.0) und Book-/Chapter-JSON-LD-Identitäten werden erst mit der vollständigen Kapitel-Freigabe ausgeliefert. RSS erfindet keine Veröffentlichungsdaten, denn das Manifest enthält aktuell nur Freigabedaten. Ohne Kapitel-Freigabe fehlen RSS und Kapitel-JSON-LD weiterhin; Kapitel bleiben `noindex`.
- Zwei gültige, leere ARD-Kataloge (`/.well-known/ard.json` nach v0.91 sowie `/.well-known/ai-catalog.json` mit `specVersion: 1.0` für den älteren Lighthouse-Audit) deklarieren ausdrücklich **null** aufrufbare Ressourcen. Damit werden keine Agenten/APIs erfunden; Schema, MIME und leere Eintragslisten werden getestet. Keine JobPosting-/LocalBusiness-Daten für die fiktive Agentur.
- `robots.txt` bleibt offen für Crawler; `noindex` bleibt bis zur bewussten Freigabe auf den **Kapiteltexten** maßgeblich. Die öffentlichen Projekt-/Infoseiten sind jetzt unabhängig davon zur Indexierung autorisiert. Such-Crawling und KI-Training sind separate Entscheidungen; kein willkürliches Blockieren/Erlauben einzelner Bots ohne Autorentscheidung.
- HTTP-Status, Content-Type und Suchindexierung müssen nach Deployment live geprüft werden; CI validiert lediglich die lokalen Buildartefakte.

Quellen: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.cloudflare.com/pages/configuration/serving-pages/ ; https://llmstxt.org/

## Recherchierte Quellen als sichtbare zweite Leseebene (04.11.2026)

Die vorhandenen Kapitel besitzen fachlich geprüfte Hintergrundkataloge und kleine interne Fußnotenverweise auf einen Quellenblock **nach** dem Romantext. Weitere Folgen brauchen vor Freigabe eine explizite Entscheidung (Quellen oder begründetes `none`); siehe [RESEARCH-SOURCES.md](RESEARCH-SOURCES.md). Das ist eine redaktionelle Qualitätsregel, kein Rankingfaktor. Die Quellen ändern weder Romantext noch Strukturdatenaussagen. `noindex`, Fiktionskennzeichnung, Lizenz- und Rechte-Gates bleiben unangetastet.

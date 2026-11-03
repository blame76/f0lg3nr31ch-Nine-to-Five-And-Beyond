# SEO & GEO – Agency campaign × literary chapter

## Principle
The book is human-readable. Each chapter has a distinct, intentionally fictional agency communications layer that can be linked and previewed. **The fictional agency is not a company offering services or jobs.** The campaign is the literary hook, not a factual offer.

The controlled single source of truth is content/chapters/index.json → chapter.campaign. The prose stays intact; editorial working-version subtitles are removed in the public chapter files. The static build renders:
- A reader-first literary chapter, followed by clearly labeled fictional campaign content.
- An individual SEO title and meta description mentioning the novel and relevant topic.
- An individual Open Graph/Twitter title, description and **generated 1200×630 PNG** under /share/{chapter-id}.png.
- A canonical URL at https://folgenreich.benjamin-lam.de/roman/{chapter-id}/.
- Upon explicit author/legal release: Book/Chapter JSON-LD and XML sitemap; **never JobPosting or LocalBusiness for the fictional agency**.

## Three campaigns
1. Die Null am Ende → recruiting / Kundenberatung & Key Account Management → “Wir suchen dich.” The fictional vacancy reflects the absence of the customer's familiar account manager.
2. Wer hält die Verantwortung fest? → E-Commerce Betreuung & Wartung → “Ihr Shop. Unsere Verantwortung.”
3. How to Service → Serviceübernahme and onboarding → “Sie kümmern sich um Ihr Geschäft. Wir um den Rest.”

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

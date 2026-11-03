# Native browser reading modes

## Reader-first HTML

Each chapter is a static HTML document with one `<main>`, a standalone `<article class="reader">`, a chapter title `<h1>`, and contiguous literary paragraphs. The article is the first content inside `<main>`. Chapter navigation and the clearly fictional campaign appear **after** the article.

No internal editorial statuses or review notes belong in the article or any visible public page. Fiction is identified in metadata, the afterword and the footer.

Browsers independently decide whether their native Reader View is eligible. The site does not invoke a fake browser-specific reading mode.

## Manual checks

- Firefox Desktop/Android: open a chapter and look for native reading mode.
- Safari: use Reader on the chapter when offered.
- Chrome: try Reading mode on a chapter; the entry point varies.
- Extracted text must begin with the story title and prose.
- Print view must exclude the site navigation and surrounding content.

## SEO and sharing

The chapter-specific Open Graph images remain in the HTML `<head>` as absolute URLs, and never appear in the reading area. Factual fiction labels and chapter descriptions remain present for the search experiment. The reader text removes only editorial status lines; provenance references still identify the original source snapshots.

## Automated regression

Tests verify the order article → pagination → fictional campaign and ensure that no internal status notice, visible share preview image or editorial drafting label is rendered. They also check author metadata and header spacing.

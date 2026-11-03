# Native browser reading modes

## Reader-first HTML

Each chapter is a static HTML document with one `<main>`, a standalone `<article class="reader">`, a chapter title `<h1>`, contiguous literary paragraphs, and author metadata. The article is the first content inside `<main>`. Chapter navigation, the fictional agency campaign, and release notices appear **after** the article and outside its semantic boundary.

The fiction and experiment identification remains in the page's metadata, afterword, and footer, without interrupting the chapter.

Browsers decide for themselves whether their native Reader View is eligible. The site doesn't attempt to invoke a browser-specific mode with a fake JavaScript button. Firefox, Safari, and Chrome vary by platform and version.

## Manual checks

- Firefox Desktop/Android: open a full chapter and look for the native reader mode icon.
- Safari: use Reader on the chapter when available.
- Chrome: try Reading mode on a chapter; the entry point depends on browser and platform.
- The extracted document should start with the story title and prose, not the fictional advertising campaign.
- Print view contains just the story, without navigation or extra content.

## SEO and social sharing

The Open Graph preview images are retained in the `<head>` as absolute URLs under `https://folgenreich.benjamin-lam.de/share/` but are not visible in the reading area. Individual campaign titles and accurate novel meta descriptions remain available for the SEO/GEO experiment. The three original chapter markdown files and their provenance hashes remain unchanged.

## Automated regression

The campaign test verifies HTML order: article → pagination → fictional campaign → release notice. It also checks that no share preview image is rendered into the visible body, that author metadata exists, and that header padding isn't lost.

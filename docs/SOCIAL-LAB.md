# Partnerwelt · Social-Labor (05.11.2026)

Ein öffentliches Mini-How-to zum Einsatz von Social Media innerhalb des Romanexperiments. Unter `/partnerwelt/share/` stehen sechs **fiktive** Kampagnen aus drei erfundenen Unternehmen. Die Idee ist Gebrauchsliteratur: Die Beispiele sind erfunden; die handwerklichen Fragen sind praktisch nutzbar.

## Redaktionelle Entscheidungen

- **Zielgruppe vor Medium:** Jede Karte adressiert ein reales Arbeitsproblem aus Logistik, Service oder Commerce Operations. Die Beiträge variieren zwischen einem sachlichen LinkedIn-Ton und einem gesprächsorientierten Threads-Ton. Das ist eine redaktionelle Hypothese, kein belegtes Reichweitenrezept.
- **Hook, Beleg, Einladung:** Jeder Beitrag erklärt separat, was die erste Zeile leistet, welcher konkrete Inhalt die Behauptung trägt und wie eine respektvolle Anschlussfrage entsteht.
- **Keine Fakes:** Keine realen Kunden, keine erfundenen Zitate aus der Öffentlichkeit, keine Erfolgszahlen. Eindeutige, wiederholte Fiktions- und KI-Bildhinweise.
- **Jeder Post hat eine eigene indexierbare Seite:** Canonical, title, description, OG/Twitter-Bild und `CreativeWork`-Auszeichnung, keine `LocalBusiness`-/`Product`-/`Offer`-Auszeichnung für die erfundenen Dienstleister.
- **Jede Karte teilbar:** Button für `navigator.share` mit Fallback in die Zwischenablage; separate Text-/Link-kopieren-Schaltflächen. Threads Web Intent öffnet einen editierbaren Entwurf, LinkedIn erhält primär einen Share-Link. Keine Plattform veröffentlicht ohne aktive Handlung des Nutzers. Nichts wird vorab an ein soziales Netzwerk übermittelt.
- **Leicht und zugänglich:** Originale lokale JPEG-Vorschaubilder in 1200×630, statisches HTML, CSS und wenige Zeilen JavaScript, responsiv, Tastaturbedienung und Statusausgabe mit `role=status`. Kein Tracking, kein Social SDK, keine Cookies.
- **Kontrastkorrektur:** Die Angebotsziffern in Warteschleifenwunder waren mit `opacity:.28` auf hellem Hintergrund deutlich unter dem WCAG-2.2-AA-Wert für große Schrift. Die transparente Zahlengestaltung wird bei Veröffentlichung entfernt.

## Quellen und technische Einordnung (geprüft 05.11.2026)

- Open Graph Protocol: https://ogp.me/ (wichtige Eigenschaften: `og:title`, `og:type`, `og:image`, `og:url`).
- LinkedIn Hilfe: https://www.linkedin.com/help/linkedin/answer/a521928/making-your-website-shareable-on-linkedin (OG-Tags für Share Previews).
- MDN Web Share API: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share (`navigator.share` braucht Nutzerinteraktion, HTTPS und ist nicht überall verfügbar).
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/ (AA-Kontrast normaler Text 4,5:1, große Schrift 3:1; Nichttext-UI 3:1).
- Meta Threads Web Intents: https://developers.facebook.com/documentation/threads/threads-web-intents (plattformseitige Web-Entwürfe können sich ändern; aktuelle Web-Domain `threads.com`).
- Google Search Central: https://developers.google.com/search/docs/appearance/ai-features (GEO baut auf guter, indexierbarer Webinformation auf, kein gesonderter 4/4-Rankingstandard).

**Wichtig:** Die tatsächlich erreichte Verbreitung, das resultierende Preview bei Threads/LinkedIn und der Live-Lighthouse-Score können nur nach Deployment und Plattformabruf überprüft werden. Es gibt keine erfundenen Conversion-Raten und keinen Anspruch auf virale Wirkung.
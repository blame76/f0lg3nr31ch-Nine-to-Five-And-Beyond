# Redaktionelle Veröffentlichung und Qualitätssicherung

Der Reader zeigt die Lesertexte, nicht redaktionelle Aufgaben oder interne Freigabehinweise. Die Kapitelmarkdowns enthalten keine Arbeitsfassungs-Untertitel, TODOs oder Statuslabels.

## Vor einer indexierbaren Veröffentlichung

- Romantexte und sichtbare Seiten auf sachliche, literarische und redaktionelle Fehler prüfen.
- Lizenz- und Rechtefragen, Impressum sowie die konkrete Cloudflare-Datenverarbeitung prüfen.
- Mobile Darstellung, native Leseansicht, Kapitelnavigation, 404, Canonicals und Social Previews testen.
- Im Manifest die Kapitel ausdrücklich mit `approved`, `approved_by` und `approved_at` freigeben.
- Erst nach tatsächlicher Rechtsprüfung `legal_reviewed_for_launch` auf `true` setzen.
- Erst nach ausdrücklicher Autorenfreigabe `release_approved` auf `true` setzen.

**Getrennte Indexierung der Projektseiten (04.11.2026):** Der Autor hat die Indexierung der bereits öffentlichen Informationsseiten (Startseite, Romanübersicht, Experiment, Lizenz, Impressum, Datenschutz) ausdrücklich beauftragt. Dafür gilt `public_pages_indexing_approved=true`. Diese Seiten erhalten `index,follow` und stehen in der Sitemap, ohne dadurch Romanfreigaben zu behaupten.

**Die Kapitel bleiben bis zur vollständigen Freigabe `noindex,follow`** und fehlen im Sitemap-/RSS-Feed sowie in den kapitelbezogenen `llms.txt`-Links. `legal_reviewed_for_launch=false`, `release_approved=false` und `release-candidate` bleiben unverändert. Die Freigabe dieser Folgen erfordert weiterhin die oben genannten Prüfungen und eine bewusste Entscheidung; diese Dokumentation ersetzt keine juristische Prüfung. Der technische Status darf nicht in der Leserfassung erscheinen.

## Herkunft und Leserfassung

Im Manifest stehen Verweise auf die Textquellen. Für die Leserfassung wurden ausschließlich editorische Fassungs-Untertitel entfernt; die Prosatexte blieben unverändert. Die ursprünglichen Quell-Hashes bezeichnen die Herkunftstexte und sind nicht die Hashes der hier bereinigten Leserdateien.

Spätere Korrekturen müssen dokumentiert werden. Eine neue Fassung ersetzt nicht automatisch eine zuvor geprüfte Veröffentlichung.

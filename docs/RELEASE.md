# Redaktionelle Veröffentlichung und Qualitätssicherung

Der Reader zeigt die Lesertexte, nicht redaktionelle Aufgaben oder interne Freigabehinweise. Die Kapitelmarkdowns enthalten keine Arbeitsfassungs-Untertitel, TODOs oder Statuslabels.

## Vor einer indexierbaren Veröffentlichung

- Romantexte und sichtbare Seiten auf sachliche, literarische und redaktionelle Fehler prüfen.
- Lizenz- und Rechtefragen, Impressum sowie die konkrete Cloudflare-Datenverarbeitung prüfen.
- Mobile Darstellung, native Leseansicht, Kapitelnavigation, 404, Canonicals und Social Previews testen.
- Im Manifest die Kapitel ausdrücklich mit `approved`, `approved_by` und `approved_at` freigeben.
- Erst nach tatsächlicher Rechtsprüfung `legal_reviewed_for_launch` auf `true` setzen.
- Erst nach ausdrücklicher Autorenfreigabe `release_approved` auf `true` setzen.

Solange die Voraussetzungen fehlen, erzeugt die Seite `noindex` und keine Sitemap. Das ist ein technisches Gate und **kein öffentlich anzuzeigender Redaktionstext**.

## Herkunft und Leserfassung

Im Manifest stehen Verweise auf die Textquellen. Für die Leserfassung wurden ausschließlich editorische Fassungs-Untertitel entfernt; die Prosatexte blieben unverändert. Die ursprünglichen Quell-Hashes bezeichnen die Herkunftstexte und sind nicht die Hashes der hier bereinigten Leserdateien.

Spätere Korrekturen müssen dokumentiert werden. Eine neue Fassung ersetzt nicht automatisch eine zuvor geprüfte Veröffentlichung.

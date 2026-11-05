# Redaktionelle Veröffentlichung und Qualitätssicherung

Der Reader zeigt die Lesertexte, nicht redaktionelle Aufgaben oder interne Freigabehinweise. Die Kapitelmarkdowns enthalten keine Arbeitsfassungs-Untertitel, TODOs oder Statuslabels.

## Vor einer indexierbaren Veröffentlichung

- Romantexte und sichtbare Seiten auf sachliche, literarische und redaktionelle Fehler prüfen.
- **Pflicht pro Folge:** Fachquellen-Gate im Manifest (`research.status=linked` mit geprüftem Quellenkatalog oder `research.status=none` mit Begründung und Prüftag). `pending` ist für `approved` verboten. Prüfung nach [RESEARCH-SOURCES.md](RESEARCH-SOURCES.md); externe Links fachlich und live überprüfen. Keine Zwangsverlinkung.
- Lizenz- und Rechtefragen, Impressum sowie die konkrete Cloudflare-Datenverarbeitung prüfen.
- Mobile Darstellung, native Leseansicht, Kapitelnavigation, 404, Canonicals und Social Previews testen.
- Im Manifest die Kapitel ausdrücklich mit `approved`, `approved_by` und `approved_at` freigeben.
- Erst nach tatsächlicher Rechtsprüfung `legal_reviewed_for_launch` auf `true` setzen.
- Erst nach ausdrücklicher Autorenfreigabe `release_approved` auf `true` setzen.

**Getrennte Indexierung der Projektseiten (04.11.2026):** Der Autor hat die Indexierung der bereits öffentlichen Informationsseiten (Startseite, Romanübersicht, Experiment, Lizenz, Impressum, Datenschutz) ausdrücklich beauftragt. Dafür gilt `public_pages_indexing_approved=true`. Diese Seiten erhalten `index,follow` und stehen in der Sitemap, ohne dadurch Romanfreigaben zu behaupten.

**Redaktionelle Autorenfreigabe am 04.11.2026:** Benjamin Lam hat ausdrücklich die redaktionelle Freigabe der drei bereits öffentlich lesbaren Romanfolgen erklärt. Entsprechend stehen die drei Manifest-Einträge auf `status=approved` mit `approved_by` und `approved_at`. Diese Zustimmung ist **keine Bestätigung einer abgeschlossenen juristischen, Lizenz-, Datenschutz- oder Infrastrukturprüfung**.

**Redaktionelle Autorenfreigabe am 05.11.2026:** Der Autor hat nun zusätzlich **Romanfolge 04 „Der zweite Tab“** ausdrücklich für die Aufnahme in den online lesbaren Reader freigegeben. Der Eintrag in `content/chapters/index.json` ist daher `status=approved`, `approved_by=Benjamin Lam`, `approved_at=2026-11-05`. Der Reader-Deploy auf `main` wird hiermit beauftragt. Die Freigabe umfasst **keine** bereits abgeschlossene juristische Prüfung, keine SEO-Indexierungsfreigabe und keine Freigabe für `legal_reviewed_for_launch=true`. Der aktuelle Stand bleibt deshalb wie bei Folgen 01–03 `noindex,follow`.

**Die Kapitel bleiben bis zur vollständigen Veröffentlichungsfreigabe `noindex,follow`** und fehlen weiterhin in der Sitemap, im RSS-Feed und in einzelnen Kapitel-Links der `llms.txt`. `legal_reviewed_for_launch=false` und `release_approved=false` bleiben bewusst unverändert. Das technische Freigabe-Gate wird erst nach tatsächlichem Rechtsreview und einem gesonderten Release-Beschluss aktiviert. Der technische Status darf nicht in der Leserfassung erscheinen.

## Partnerwelt – eigenständiger Veröffentlichungsbereich (05.11.2026)

Auf ausdrücklichen Veröffentlichungsauftrag des Autors wird die freigegebene Partnerwelt unter `/partnerwelt/` mit drei Firmen-Unterseiten als eigenständige fiktionale Informationsseiten ausgeliefert. Alle abgebildeten Teams sind KI-generiert und sichtbar gekennzeichnet. Fachliche Referenz-Anbieterlinks wurden zugunsten klickbarer Fiktionshinweise entfernt. Die rechtlichen Unterseiten innerhalb der Partnerwelt bleiben `noindex`; die vier redaktionellen Firmen-/Übersichtsseiten sind als öffentliche Informationsseiten indexierbar. Das ist **keine** zusätzliche juristische Freigabe der Romanfolgen.

Die geprüfte HTML-/Asset-Fassung liegt als deterministisches Release-Bundle unter `bundles/partnerwelt-2026-11-05.tar.gz.base64` und wird beim Reader-Build mit SHA-256-Prüfung in `dist/partnerwelt/` entpackt. Dies vermeidet Änderungen an bestehenden Reader- und Kapiteldateien; spätere redaktionelle Änderungen erfordern ein neues geprüftes Bundle. Kapitel bleiben `noindex`, bis die getrennten Freigabegates erfüllt sind.

## Herkunft und Leserfassung

Im Manifest stehen Verweise auf die Textquellen. Für die Leserfassung wurden ausschließlich editorische Fassungs-Untertitel entfernt; die Prosatexte blieben unverändert. Die ursprünglichen Quell-Hashes bezeichnen die Herkunftstexte und sind nicht die Hashes der hier bereinigten Leserdateien.

Spätere Korrekturen müssen dokumentiert werden. Eine neue Fassung ersetzt nicht automatisch eine zuvor geprüfte Veröffentlichung.

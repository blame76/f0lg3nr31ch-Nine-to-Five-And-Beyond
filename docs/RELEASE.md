# Redaktionelle Veröffentlichung und Qualitätssicherung

Der Reader zeigt die Lesertexte, nicht redaktionelle Aufgaben oder interne Freigabehinweise. Die Kapitelmarkdowns enthalten keine Arbeitsfassungs-Untertitel, TODOs oder Statuslabels.

## Suchmaschinenfreigabe der veröffentlichten Romanfolgen (05.11.2026)

Der Autor hat am 05.11.2026 ausdrücklich die Indexierung von „Die Null am Ende“ und allen anderen bereits veröffentlichten Folgen beauftragt. Das gesonderte Flag `published_chapters_indexing_approved=true` aktiviert `index,follow` **nur** für Kapitel mit `status=approved`. Die freigegebenen Folgen 01–05 werden in die Sitemap und mit ihren kanonischen URLs in `llms.txt` aufgenommen; noch nicht freigegebene Kapitel bleiben `noindex,follow` und fehlen in beiden Verzeichnissen.

Diese Anweisung hebt den früheren technischen Indexierungsaufschub auf, bestätigt aber **keine abgeschlossene juristische, Lizenz-, Datenschutz- oder Infrastrukturprüfung**. `release_approved=false` und `legal_reviewed_for_launch=false` bleiben unverändert. Der öffentliche Reader und die Suchmaschinenfreigabe sind weiterhin vom vollständigen Release-Gate getrennt. Eine tatsächliche Aufnahme in den Suchindex entscheidet die Suchmaschine selbst.

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

**Historischer Stand vor der gesonderten Indexierungsfreigabe vom 05.11.2026:** Die Kapitel blieben `noindex,follow` und fehlten in der Sitemap, im RSS-Feed und in einzelnen Kapitel-Links der `llms.txt`. `legal_reviewed_for_launch=false` und `release_approved=false` bleiben bewusst unverändert. Das technische Freigabe-Gate wird erst nach tatsächlichem Rechtsreview und einem gesonderten Release-Beschluss aktiviert. Der technische Status darf nicht in der Leserfassung erscheinen.

## Partnerwelt – eigenständiger Veröffentlichungsbereich (05.11.2026)

Auf ausdrücklichen Veröffentlichungsauftrag des Autors wird die freigegebene Partnerwelt unter `/partnerwelt/` mit drei Firmen-Unterseiten als eigenständige fiktionale Informationsseiten ausgeliefert. Alle abgebildeten Teams sind KI-generiert und sichtbar gekennzeichnet. Fachliche Referenz-Anbieterlinks wurden zugunsten klickbarer Fiktionshinweise entfernt. Die rechtlichen Unterseiten innerhalb der Partnerwelt bleiben `noindex`; die vier redaktionellen Firmen-/Übersichtsseiten sind als öffentliche Informationsseiten indexierbar. Das ist **keine** zusätzliche juristische Freigabe der Romanfolgen.

Die geprüfte HTML-/Asset-Fassung liegt als deterministisches Release-Bundle unter `bundles/partnerwelt-2026-11-05.tar.gz.base64` und wird beim Reader-Build mit SHA-256-Prüfung in `dist/partnerwelt/` entpackt. Dies vermeidet Änderungen an bestehenden Reader- und Kapiteldateien; spätere redaktionelle Änderungen erfordern ein neues geprüftes Bundle. Kapitel bleiben `noindex`, bis die getrennten Freigabegates erfüllt sind.

## Herkunft und Leserfassung

Im Manifest stehen Verweise auf die Textquellen. Für die Leserfassung wurden ausschließlich editorische Fassungs-Untertitel entfernt; die Prosatexte blieben unverändert. Die ursprünglichen Quell-Hashes bezeichnen die Herkunftstexte und sind nicht die Hashes der hier bereinigten Leserdateien.

Spätere Korrekturen müssen dokumentiert werden. Eine neue Fassung ersetzt nicht automatisch eine zuvor geprüfte Veröffentlichung.

## Folge 05 „Verfügbar“ und fiktive Werbung (05.11.2026)

Der Autor hat die Aufnahme der aktuellen Reader-Fassung und den anschließenden Deploy auf `main` ausdrücklich beauftragt. Folge 05 ist mit diesem Stand redaktionell genehmigt und im Manifest als `approved` für den 05.11.2026 gekennzeichnet. Diese Genehmigung ist **keine abgeschlossene juristische Freigabe oder Genehmigung zur Indexierung**; `release_approved=false` und `legal_reviewed_for_launch=false` bleiben unverändert. Die Kapitel bleiben `noindex,follow`.

Die Romanprosa in `content/chapters/verfuegbar.md` enthält keine Werbung. Der Reader-Build schaltet innerhalb der Geschichte bei „Noch gut drei Stunden.“ eine deutlich gekennzeichnete **fiktive Anzeige** ein, die zur bereits vorhandenen Seite `/partnerwelt/share/vier-stunden-zwei-uhren/` führt. Nach dem Kapitel ist die separate fiktive Streamingkampagne **prscnm** mit eigenem Frontend unter `/partnerwelt/prscnm/` verlinkt. Es gibt keine Abonnements, Videos oder Zahlungsvorgänge. Beide Werbebereiche sind redaktionelle Fiktion, nicht als reale Firma auszuzeichnen.

Die sechs Quellen im Katalog `content/references/verfuegbar.json` wurden am 05.11.2026 überprüft; die fachlichen Hinweise sind eine zweite Leseebene und kein Teil der Prosahandlung. Die statische prscnm-Seite und die Hintergrundseite bleiben bewusst `noindex,follow`; die bestehende Partnerwelt und das Social-Labor werden nicht in ihren Freigabestatus verändert. Vor öffentlichen Social-Posts ist die Preview-Grafik auf den Zielplattformen zu prüfen.


## Folge 09 „Nicht betroffen“ (10.11.2026)

Auf ausdrücklichen Veröffentlichungsauftrag wurde das am 09.11. im privaten Manuskript-PR gesicherte Kapitel „Nicht betroffen“ redaktionell freigegeben, geringfügig sprachlich korrigiert und für den Reader vorbereitet. Die Handlung unterscheidet verifizierte PHP-Updates von der noch offenen Betriebsaufnahme und stellt die Hosterbestätigung für OpenSSH nicht mit einer eigenen vollständigen Konfigurationsprüfung gleich.

Die eigenständige Share-Preview ist eine fiktive Hosting-Anzeige für „Häkchenhost“ („Alles im Griff. Außer dem Zugang.“). Sie ist als erfundene Kampagne gekennzeichnet und keine reale Dienstleistung. Vier Quellenhinweise stehen außerhalb der Prosa bzw. dezent als Leseanker im Hintergrundbereich. Die Indexierungsfreigabe für veröffentlichte Folgen bleibt bestehen; `release_approved=false` und `legal_reviewed_for_launch=false` werden nicht verändert.

## Mittwoch 11.11.2026 – Folgen 10 und 11

Der Autor hat die Veröffentlichung der Miniaturen „Die gleiche Arbeit, nur schneller“ und „Die kleine Delle“ zusammen am Mittwoch ausdrücklich beauftragt. Die Prosa ist aus dem Hauptrepository übernommen; nur die interne Kennzeichnung „Arbeitsfassung“ wurde aus der Reader-Lesefassung von Folge 10 entfernt. „Die kleine Delle“ endet unverändert mit der Delle des Putzwagens; der neue Spionage-Charakter bleibt anonym. Beide Kapitel sind `approved` und für die bereits ausdrücklich freigegebene Kapitelindexierung vorgesehen, ohne die Flags für eine vollständige rechtliche Release-Freigabe zu verändern.

Die neue Share-Preview für Folge 11 ist eine eigenständig generierte, ausdrücklich fiktive Monatskarte für Berufspendler (keine echte Fahrkarte). Nach dem Kapitel erscheint im abgetrennten Werbebereich eine fiktive Last-Minute-China-Anzeige des erfundenen „FERNWEHFORMULAR“-Reisebüros ohne reale Preise, Tickets oder Buchungsfunktionen. Folge 10 erhält eine eigene fiktive KI-Kampagnenpreview. Pro Folge wurden genau abgegrenzte Hintergrundlinks dokumentiert. Insbesondere ist bloße Informationsabschöpfung nicht automatisch gleichbedeutend mit Social Engineering.

Freigabe: Benjamin Lam, 11.11.2026. Ein erfolgreicher Main-Merge stößt die Cloudflare-Pages-Bereitstellung an; die tatsächliche Live-Auslieferung ist gesondert zu prüfen.

## Folge 12 „Das offene Hufeisen“ (11.11.2026)

Auf ausdrücklichen Auftrag des Autors ist die Mara-Episode mit dem gewünschten offenen Ende redaktionell freigegeben. Der letzte erklärende Schlusssatz entfällt; keine zusätzlichen Dialog- oder Konfliktszenen. Die Manuskriptfassung ist separat im Arbeitsrepository gesichert.

Die Share-Preview zeigt die ausdrücklich fiktive Community-Veranstaltung „Ideen auf Probe.“. Die Romanhandlung beschreibt keine tatsächliche Veranstaltung oder Vortragenden. Genau ein weiterführender Link verweist auf https://vibe-coding.wtf/de; er dient ausschließlich als Inspiration und belegt keine fiktiven Geschehnisse. Keine weiteren Artikel im Reader für dieses Kapitel. Die bestehende Autorenfreigabe zur Indexierung veröffentlichter Kapitel gilt; die vollständigen juristischen Release-Flags bleiben unverändert.


## Folge 13 „Die fehlende Übersetzungsfunktion“ (13.11.2026)

Auf ausdrücklichen Auftrag des Autors wird die gesicherte Jamal-Episode veröffentlicht. Die Leserfassung übernimmt den Inhalt aus `blame76/f0lg3nr31ch/episodes/texts/die-fehlende-uebersetzungsfunktion.md` unverändert bis auf den entfernten internen Arbeitsfassungs-Untertitel. Die Fassung enthält die freigegebenen Korrekturen zum nicht erreichbaren Postfach, der allgemeinen Workshop-Einladung und dem Kanban-Sprint zum Drucker.

Die Share-Preview ist eine **fiktive Buzzword-Bingo-Karte** und wird durch `scripts/social-image.mjs` im Reader-Build erzeugt; kein zusätzliches KI-Bild wird hochgeladen. Drei sparsame Inline-Hintergründe behandeln die tatsächliche Microsoft-365-Störung vom 12./13.11.2026, Outlooks konfigurationsabhängige Offline-Funktion und verständliche Fachsprache; eine zusätzliche BSI-Vertiefung erklärt Cloud-Abhängigkeit. Der Arbeitszeitbetrugs-Topos wird bewusst nicht als Rechtsurteil veröffentlicht.

Aus dem Quellenhinweis von Folge 12 wurde eine **interne Anweisung** entfernt, die über `editorial_note` zuvor sichtbar wurde. Autorwünsche bleiben PR-/Redaktionsinformation, nicht Teil der öffentlichen Lesebegleitung. Die alten Romankapitel und deren Tonalität werden nicht vereinheitlicht. Fachquellenfreigabe und literarische Veröffentlichungsfreigabe sind voneinander getrennt.

Freigabe: Benjamin Lam, 13.11.2026. Die bestehende Indexierungsfreigabe für veröffentlichte Folgen gilt; die rechtlichen Gesamt-Release-Flags bleiben unverändert.

# Verfügbar

Um acht Uhr siebenundvierzig hielt Jamal seine Karte vor das Lesegerät.

Es piepte. Die Tür öffnete sich.

Im Foyer stand noch immer das Plakat vom letzten Sommerfest. *Zusammen mehr erreichen.* Darunter ein Foto von Menschen, die auf einer Wiese standen und in die Kamera lachten. Zwei davon arbeiteten inzwischen nicht mehr hier.

Jamal nahm die Treppe.

Eigentlich hätte er heute zu Hause gearbeitet. Dort standen zwei Monitore, eine vernünftige Tastatur und eine Kaffeemaschine, die niemand außer ihm benutzte.

Aber die Geschäftsführung hatte beschlossen, dass die Menschen wieder häufiger zusammenkommen sollten.

Nach Corona waren erst alle ins Homeoffice gegangen. Dann hatte man festgestellt, dass es funktionierte. Manche hatten sogar behauptet, es funktioniere besser. Irgendwann kam Hybrid. Zwei Tage Büro, drei Tage zu Hause. Dann drei Tage Büro. Inzwischen sprach man über vier. Und fünf seien eigentlich auch sinnvoll.

Es ging um Zusammenarbeit, Unternehmenskultur und den persönlichen Austausch.

Jamal hatte die Argumente gelesen.

Alle.

Sie waren über Monate im internen Chat diskutiert worden. In Betriebsversammlungen, Feedbackrunden und am Ende von Videokonferenzen, wenn noch fünf Minuten bis zum nächsten Kundentermin waren.

Jeder hatte etwas dazu gesagt. Selbst die Kollegen, die bei den Diskussionen im Büro gesessen hatten, waren häufig per Video zugeschaltet gewesen.

Jamal war es ziemlich egal, wo er arbeitete.

Er hatte nur das Gefühl, früher mehr Kontakt zu den Kollegen gehabt zu haben.

Zu Hause hatte er jemanden angerufen, wenn er eine Frage hatte. Zwei Minuten später war das Problem meistens erledigt. Jetzt musste er erst einen Besprechungsraum suchen, damit er niemanden störte.

Die Kollegen, die zu Hause waren, konnte er von dort aus anrufen.

Die Kollegen, die im Büro waren, waren selten dort, wo er sie vermutete.

***

Sein Platz lag am Fenster.

Jamal stellte den Rucksack ab, zog das Notebook heraus und verband es mit der Dockingstation. Der zweite Monitor blieb zunächst schwarz. Er zog das USB-C-Kabel heraus, wartete und steckte es wieder ein.

Jetzt ging es.

Er legte den Hoodie über die Stuhllehne, setzte die Kopfhörer auf und öffnete das Ticketsystem.

Zwölf Tickets waren ihm zugewiesen. Sechs davon standen auf *Warten auf Rückmeldung*. Zwei warteten auf eine Freigabe, eines auf einen Termin mit dem Kunden. Das erste auf der Liste war neu genug, um interessant zu sein.

*Lieferstatus im Shop vereinheitlichen.*

Der Kunde hatte eine Warenwirtschaft, die neben den eigentlichen Bestandsinformationen zusätzliche Lieferstatus lieferte. Im Shop wurden einige davon falsch dargestellt. Für einen bestimmten Status erschien gar kein Hinweis.

Die gewünschte Lösung war eine kleine Erweiterung für Magento.

Jamal las das Ticket zweimal.

Dann öffnete er die Dokumentation der Schnittstelle und die bestehenden Module im Projekt.

Er fand einen eigenen Resolver für Lieferhinweise. Die Warenwirtschaft lieferte die Codes, der Resolver übersetzte sie fürs Shop-Frontend. Für die Zuordnung gab es eine projektspezifische Schnittstelle. Die Kaufbarkeit wurde anderswo entschieden.

Ein paar Minuten später wusste er, wo er ansetzen wollte.

Die neuen Status brauchten eine eigene Zuordnung, die sich an den Resolver anschließen ließ. Unbekannte Werte durften keine falsche Lieferzusage erzeugen. Die Erweiterung sollte nur den Lieferhinweis verändern, nicht die eigentliche Bestands- oder Bestelllogik.

Er öffnete einen neuen Branch.

*feature/lieferstatus-mapping*

Danach startete er den KI-Assistenten in seiner Entwicklungsumgebung.

Das Werkzeug war längst Teil ihres Entwicklungsprozesses. Es konnte die freigegebenen Projektdateien analysieren, Änderungen vorschlagen und Tests ausführen. Jamal musste nicht mehr jedes Mal erklären, welche Verzeichnisstruktur Magento erwartete.

Er beschrieb die Aufgabe, grenzte die betroffenen Module ein und ergänzte die technischen Anforderungen.

Keine Änderungen am Magento-Core. Keine unnötigen Plugins. Abhängigkeiten über die vorgesehenen Schnittstellen. Unit-Tests für bekannte und unbekannte Statuswerte.

Dann beauftragte er den Assistenten, die Erweiterung im Branch vorzubereiten.

Auf dem Bildschirm erschien eine Aktivitätsanzeige.

*Analyzing project structure.*

Jamal lehnte sich zurück.

Früher hätte er dafür ein vorhandenes Modul kopiert und ausgedünnt. Composer-Datei, Registrierung, Moduldefinition, Klassenstruktur, Konfiguration. Das war keine Kunst. Nur die alten Abhängigkeiten musste man jedes Mal finden, bevor sie mit ins neue Modul wanderten.

Heute nahm ihm die KI diese Arbeit ab.

Ob sie die richtige Stelle im Projekt erwischte, würde der Diff zeigen.

Angenehm.

Er nahm einen Schluck Kaffee.

Kalt.

***

Im Chat blinkte eine Nachricht.

**Tessa:** Hat jemand Severance durch?

**Nils:** Ich bin noch nicht fertig. Keine Spoiler.

**Tessa:** Dann sag ich nichts.

**Nils:** Das klingt nach einem Spoiler.

Jamal öffnete den Thread.

**Jamal:** Ich fang vielleicht mit Black Doves an.

**Tessa:** Ich muss erst die anderen drei Sachen zu Ende schauen.

**Nils:** Ich warte auf Blade Runner 2099.

**Tessa:** Du wartest seit Jahren auf alles mit Blade Runner im Titel.

**Nils:** Und wurde bisher selten enttäuscht.

**Jamal:** Das ist eine erstaunlich niedrige Trefferquote für eine so lange Wartezeit.

Tessa reagierte mit einem lachenden Emoji.

Jamal wechselte zurück in die Entwicklungsumgebung.

*Generating implementation.*

Er sah auf die Uhr.

Neun Uhr vierunddreißig.

Der Assistent arbeitete.

Jamal öffnete die anderen Vorgänge. Beim Kunden Reimers fehlte noch eine Rückmeldung zur geplanten Betriebsübernahme. Ein anderer Kunde hatte die Testumgebung seit Dienstag nicht angesehen. Eine technische Anpassung war fertig, durfte aber ohne Freigabe nicht produktiv gehen.

Er schrieb zwei kurze Nachfragen.

Bei der dritten Aufgabe fehlte eine konkrete Anforderung. Im Ticket stand lediglich:

*Fehlerhafte Anzeige bei Sonderartikeln beheben.*

Darunter ein Screenshot.

Jamal öffnete ihn.

Ein Produkt mit zwei Varianten. Ein Preis, eine Lieferzeit, ein abgeschnittener Text. Drei mögliche Fehler.

Er ergänzte die technische Beschreibung, die betroffenen Ansichten, die noch offenen Fragen und die Bedingungen, unter denen man die Aufgabe als erledigt betrachten konnte.

Das Ticket hatte jetzt einen Umfang, mit dem jemand arbeiten konnte.

***

Um zehn Uhr zwölf meldete der Assistent, dass die Implementierung bereitlag.

Jamal öffnete den Diff.

Die Grundstruktur war ordentlich. Die Abhängigkeiten waren sauber deklariert, die Statuswerte lagen in einer eigenen Klasse, und der Assistent hatte Tests angelegt.

Er fand trotzdem etwas.

Die KI hatte ein `around`-Plugin an den Lieferhinweis-Resolver gehängt. Damit saß sie in dessen Aufrufkette. Nicht nur für die neuen Statuswerte.

Jamal öffnete die DI-Konfiguration. Die Schnittstelle für die Statuszuordnung gab es längst. Er hatte sie in seiner Anweisung nicht beim Namen genannt.

Er entfernte das Plugin, band die neue Mapping-Klasse über die vorhandene Schnittstelle ein und kontrollierte die Änderungen noch einmal.

Dann las er die Tests.

Drei bekannte Werte. Ein unbekannter Wert. Ein leerer Wert.

Er ergänzte einen weiteren Fall.

In einem älteren Log hatte er denselben Lieferstatus einmal vollständig großgeschrieben gesehen. Die Schnittstellendokumentation erwähnte das nicht. Er prüfte das Beispiel noch einmal und ergänzte den Fall.

Er ließ die Tests laufen.

Fünf grüne Meldungen.

Eine rote.

Die neue Variante fiel auf den neutralen Hinweis zurück, obwohl der Status bekannt war.

Jamal sah sich die Normalisierung an. Sie fand erst nach dem Nachschlagen statt. Er zog sie vor die Zuordnung und startete die Tests erneut.

Sechs grüne Meldungen.

Als Nächstes liefen die statische Analyse und die Coding-Standards. Ein Hinweis auf einen unnötigen Import. Zwei kleinere Formatierungen.

Er bereinigte beides.

Danach installierte er das Modul in der lokalen Testumgebung und prüfte die Ausgabe im Shop.

Die Lieferhinweise erschienen wie erwartet. Die Kaufbarkeit der Produkte blieb unverändert.

Gut.

Er öffnete den Diff noch einmal.

Vierzehn Dateien.

Für eine kleine Erweiterung war das nicht wenig. Aber die meisten enthielten nur die Modulstruktur oder Tests. Er prüfte die Änderungen Datei für Datei und entfernte eine Konfigurationsoption, die niemand angefordert hatte.

Der Assistent hatte sie vorsorglich eingebaut.

Vorsorglich war oft ein anderes Wort für späteren Wartungsaufwand.

Jamal erstellte einen Commit und pushte den Branch. Die Pipeline lief noch einmal gegen die vorgesehene Projektumgebung.

Dann eröffnete er einen Pull Request, verlinkte das Ticket und bat Sascha um Review.

Die Erweiterung war fertig.

Fast.

***

Um elf Uhr zweiundvierzig waren auch die übrigen Tickets durchgesehen.

Einige Beschreibungen hatten seit Jahren dieselben Formulierungen. *Bitte prüfen.* *Funktioniert nicht richtig.* *Wie besprochen anpassen.*

Jamal ergänzte bei vier Vorgängen die technischen Randbedingungen. Bei einem korrigierte er eine falsche Zuordnung, bei einem anderen dokumentierte er, welche Information vom Kunden noch fehlte.

Es war keine besonders aufregende Arbeit. Aber jemand musste sie machen, bevor aus einem unklaren Wunsch drei Tage Entwicklung wurden.

Im Chat fragte Nils, ob jemand spontan fünf Minuten für eine Frage zu einem Deployment hätte.

Jamal antwortete sofort.

*Kannst anrufen.*

Das Telefon klingelte.

Nils arbeitete heute von zu Hause.

Jamal stand auf, ging den Flur entlang und sah in die beiden kleinen Telefonkabinen.

Beide besetzt.

Der erste Besprechungsraum war gebucht. Im zweiten saßen sechs Leute um einen Tisch. Auf dem Bildschirm vor ihnen waren weitere vier Menschen zugeschaltet.

Im dritten Raum war niemand.

Jamal setzte sich, nahm den Anruf an und hörte Nils zu.

Das Problem war eine falsch gesetzte Umgebungsvariable. Sie verglichen zwei Konfigurationen, fanden den Unterschied und klärten, welche Einstellung zur Zielumgebung gehörte.

Vier Minuten später war das Gespräch beendet.

„Danke dir.“

„Gerne.“

Jamal ging zurück zu seinem Platz.

Im Homeoffice hätte er die vier Minuten ebenfalls gebraucht.

Nur ohne den Spaziergang.

***

Um zwölf Uhr dreiundzwanzig hatte er keinen Hunger.

Sein Frühstück war spät gewesen, der Kaffee dafür reichlich. Trotzdem nahm er die Kopfhörer ab und ging in die Küche.

Der Admin saß am kleinen Tisch am Fenster.

Vor ihm stand eine flache Schale mit Sobanudeln, gebratenen Pilzen, fein geschnittener Gurke und etwas, das nach eingelegtem Rettich aussah. Er goss eine dunkle Sauce darüber, streute Sesam darauf und legte den Deckel seines Behälters ordentlich neben die Schale.

Links davon lag ein Buch.

*Die Kunst der effizienten Pause.*

Jamal setzte sich.

„Moin.“

„Moin.“

„Sieht gut aus.“

Der Admin schob die Schale ein Stück in seine Richtung.

„Magst du probieren?“

„Danke, hab keinen Hunger. Was liest du da?“

Der Admin drehte das Buch ein wenig.

„Ist es gut?“

„Bin noch am Anfang.“

Jamal betrachtete den Titel.

„Und? Hilft's?“

„Ich sitze immerhin hier.“

Jamal grinste.

Eine Weile sagte keiner etwas.

Dann fragte er:

„Ihr plant doch gerade diese lokale KI-Geschichte, oder?“

Der Admin nickte.

„Schon Hardware ausgesucht?“

„Für einen Testaufbau. Noch nicht bestellt.“

„Was habt ihr vor?“

„Erst mal einen Rechner mit einer GPU mit vierundzwanzig Gigabyte Videospeicher. Vierundsechzig Gigabyte RAM. Genug SSD-Platz für mehrere Modelle.“

„Reicht das?“

„Für kleinere quantisierte Modelle und einen Pilotbetrieb. Nicht für zwanzig Entwickler, die gleichzeitig große Kontexte schicken.“

Jamal nahm einen Schluck Wasser.

„Und größere Modelle?“

„Mehr Speicher. Oder langsamer. Kommt drauf an, was wir brauchen.“

„Also kein eigener ChatGPT-Ersatz.“

„Nicht mit der ersten Kiste.“

„Was nehmt ihr als Modell?“

„Noch offen. Wir testen an echten Entwicklungsaufgaben. Antwortqualität, Geschwindigkeit, Speicherbedarf.“

„Klingt vernünftig.“

„Wäre schade, die Hardware zu kaufen und danach erst die Anforderungen zu klären.“

Jamal nickte.

Der Admin aß weiter.

„Wenn ihr die Tests macht, sag Bescheid. Ich hätte ein paar gute Referenzfälle.“

„Gerne.“

Jamal blieb noch eine Weile sitzen.

Dann stand er auf.

„Schöne Pause noch.“

„Dir auch.“

Der Admin griff wieder nach seinem Buch.

***

Am Platz warteten keine neuen Tickets auf ihn.

Das war gut.

Eigentlich.

Die Pipeline für seine Erweiterung war inzwischen grün. Sascha hatte den Pull Request noch nicht angesehen.

Jamal öffnete das Ticket und ergänzte die Testergebnisse. Unit-Tests bestanden, statische Analyse ohne Befund, Modul lokal installiert und geprüft.

Den Status setzte er auf *Im Review*.

Nicht auf *Erledigt*.

Danach ging er die Liste durch.

Reimers: Rückmeldung ausstehend.

Sonderartikel: fachliche Klärung durch den Kunden erforderlich.

Versandhinweise: Freigabe fehlt.

Zahlungsmodul: Testtermin vereinbaren.

Er hatte für jeden Vorgang notiert, was als Nächstes passieren musste. Bei keinem lag der nächste Schritt bei ihm.

Es gab erfreulich viel Arbeit.

Nur wenig, was er gerade tun konnte.

Er sah auf die Uhr.

Dreizehn Uhr achtundfünfzig.

Noch gut drei Stunden.

***

**Nils:** Kurze Frage: Warum sind eigentlich alle im Büro, wenn niemand ans Telefon gehen kann?

**Tessa:** Weil alle in Meetings sitzen.

**Nils:** Könnte man die nicht online machen?

**Tessa:** Die Meetings?

**Nils:** Nein, die Büros.

Jamal reagierte mit einem Daumen nach oben.

Dann sah er, ob Sascha wieder verfügbar war.

War er nicht.

Er öffnete die interne Wissensplattform.

Es gab eine neue Dokumentation zu den automatisierten Tests für Magento-Projekte. Jamal hatte den Link vor einer Woche gespeichert und seitdem nicht angerührt.

Er begann zu lesen.

Einige Abschnitte kannte er bereits. Bei anderen prüfte er, wie sich die Beispiele auf ihren bestehenden Testaufbau übertragen ließen.

Er startete die lokale Testumgebung, probierte zwei Konfigurationen aus und machte sich Notizen.

Nach einer halben Stunde blickte er wieder in den Chat.

Inzwischen ging es um Serien.

**Tessa:** Ich verstehe nicht, warum ich immer drei Staffeln brauche, um mir die Namen zu merken.

**Nils:** Bei den Ringen der Macht brauche ich dafür Stammbaum und Landkarte.

**Jamal:** Bei uns reicht meistens das Organigramm.

**Tessa:** Das ist aber auch Fantasy.

Jamal lachte.

Dann arbeitete er weiter.

***

Um fünfzehn Uhr achtundzwanzig schrieb Sascha.

*PR sieht gut aus. Eine Frage zum Fallback bei unbekanntem Status.*

Jamal öffnete den Kommentar.

Eine berechtigte Frage.

Der Shop zeigte bei unbekannten Werten einen neutralen Hinweis. Das war so vorgesehen, aber die Formulierung im Ticket ließ zwei Interpretationen zu.

Jamal antwortete mit dem Verweis auf die abgestimmte Anforderung und ergänzte einen Kommentar im Test, damit man die Entscheidung später nachvollziehen konnte.

Sascha bestätigte das Review.

Jamal öffnete den Pull Request. Freigegeben. Die Checks grün. Der Merge-Button war da.

Nur der gemeinsame Teststand wurde bei ihnen nicht nach jedem einzelnen Pull Request aktualisiert. Zum nächsten Integrationslauf würde die Änderung in den Integrationsbranch gemergt; erst danach baute die Pipeline die gemeinsame Testumgebung neu.

Jamal ließ den Pull Request offen und notierte den nächsten Schritt im Ticket. Dort musste der Lieferhinweis mit den Testdaten der Warenwirtschaft noch einmal geprüft werden.

Wieder warten.

Nicht wegen der KI.

Nicht wegen eines Problems.

Sondern weil ein Entwicklungsprozess aus mehr bestand als der Geschwindigkeit, mit der jemand Code schreiben konnte.

Er fand das richtig.

Manchmal hätte er es trotzdem gern schneller gehabt.

***

Um sechzehn Uhr zwei öffnete Jamal das Ticketsystem ein letztes Mal.

Zwölf Tickets.

Keines davon war heute abgeschlossen worden.

Er hatte eine Erweiterung entwickelt, Fehler korrigiert, Tests geschrieben, einen Pull Request durch das Review gebracht, vier Tickets präzisiert, eine Rückfrage geklärt und sich mit Testverfahren beschäftigt.

In der Statistik würde das nicht besonders eindrucksvoll aussehen.

Er wechselte zur Zeiterfassung.

Die Arbeit ließ sich immerhin ordentlich zuordnen.

Entwicklung. Qualitätssicherung. Technische Klärung. Interne Weiterbildung.

Er trug die Zeiten ein.

Dann nahm er die Kopfhörer ab.

Im Büro war es still geworden. Zwei Plätze weiter saß jemand in einem Videocall. Aus einem Besprechungsraum drang gedämpftes Lachen. Am Fenster gegenüber hatte jemand die Jalousien heruntergelassen.

Jamal öffnete den Chat.

Sascha hatte eine Nachricht geschrieben.

*Bist du noch da? Hätte noch eine kurze Frage.*

Jamal sah auf den leeren Platz, an dem Sascha eigentlich sitzen sollte.

*Ja, klar.*

*Kann ich dich kurz anrufen?*

Jamal griff nach seinen Kopfhörern.

Dann stand er auf und ging den Flur entlang.

Die erste Telefonkabine war besetzt.

Die zweite auch.

Er fand schließlich einen freien Besprechungsraum.

Das Gespräch dauerte drei Minuten.

Danach kehrte er an seinen Platz zurück, packte das Notebook ein und zog den Hoodie an.

Im Chat fragte Tessa gerade, ob jemand fürs Wochenende eine gute Serie empfehlen könne.

Jamal überlegte kurz.

Dann schrieb er:

*Ich hab noch nichts gesehen.*

Er schaltete den Rechner aus.

Morgen würde er wieder ins Büro kommen.

Vielleicht traf er dann jemanden.

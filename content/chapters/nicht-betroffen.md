# Nicht betroffen

Mara hatte die E-Mail bereits am Freitag gelesen.

*Betreff: AW: Sicherheitsmeldung OpenSSH – Prüfung Ihrer Hostingumgebung*

Die Antwort war kurz gewesen.

Der Hoster bestätigte, dass die betroffene Konstellation in der Umgebung des Kunden Reimers nicht vorlag. Die eingesetzten Alpine-Container betrieben keinen SSH-Server. Die Systeme, auf denen SSH tatsächlich verwendet wurde, seien von der beschriebenen Schwachstelle nicht betroffen.

Darunter standen eine Vorgangsnummer und die Signatur des technischen Supports.

Mara hatte die Nachricht in der Kundenakte abgelegt.

Jetzt war Dienstag.

Sie öffnete die Sicherheitsübersicht und suchte nach Reimers.

*OpenSSH – Rückmeldung des Betreibers liegt vor.*

Darunter stand:

*Unabhängige Verifikation ausstehend.*

Sie ließ den Eintrag unverändert.

***

Die Servicegesellschaft betreute inzwischen mehrere Dutzend Kundensysteme.

Nicht alle waren gleich. Es gab Magento-Shops, individuelle Anwendungen, kleinere Websites und einige ältere Systeme, deren technische Besonderheiten sich nicht mehr vollständig erklären ließen.

Früher hatte jede Agentur ihre eigenen Verfahren gehabt.

Inzwischen gab es einen gemeinsamen Mindeststandard.

Bei einer Betriebsübernahme wurden die eingesetzten Anwendungen, Laufzeitumgebungen, Fremdbibliotheken, Schnittstellen und Hostingverhältnisse erfasst. Dazu kamen Wartungsfenster, Backup-Verfahren, Ansprechpartner und die Frage, wer Änderungen freigeben durfte.

Ein Teil dieser Informationen wurde automatisch erhoben.

Abhängigkeiten aus den Projekten. Ergebnisse der Sicherheitsprüfungen. Versionsstände aus den verwalteten Umgebungen. Erfolgreiche und fehlgeschlagene Wartungsläufe.

Andere Angaben musste jemand eintragen und regelmäßig überprüfen.

Mara konnte einen Kunden öffnen, den sie noch nie betreut hatte, und sich in wenigen Minuten einen Überblick verschaffen.

Zumindest bei den Projekten, die das Onboarding vollständig durchlaufen hatten.

Für die anderen gab es eine vorläufige Übersicht. Projekte, deren Übernahme bereits begonnen hatte, wurden dort mit den bekannten Systemen, Ansprechpartnern und offenen Risiken erfasst. Neue Sicherheitsmeldungen konnten ihnen zugeordnet werden, auch wenn noch nicht alle technischen Zugänge vorhanden waren.

Seit vergangenem Mittwoch stand Reimers auf dieser Liste.

Es war noch kein vollständiges Monitoring. Aber die OpenSSH-Meldung vom Donnerstag hatte Mara dadurch automatisch als Prüfaufgabe erhalten.

Sie öffnete einen mittelgroßen Onlineshop.

*Letzte Sicherheitsprüfung: 09.11.2026.*

*Abhängigkeiten: geprüft.*

*Monitoring: aktiv.*

*Letzter Wiederherstellungstest: erfolgreich.*

*Offene Wartungsaufgaben: 2.*

Mara öffnete die Aufgaben.

Eine Erweiterung benötigte ein Update. Die Kompatibilität war bereits geprüft, die Umsetzung für das nächste Wartungsfenster vorgesehen.

Bei der zweiten Aufgabe fehlte eine Rückmeldung des Kunden.

Nichts Ungewöhnliches.

Sie wechselte zur Sicherheitsakte.

*21.10.2026 – Kritische PHP-Sicherheitsupdates.*

Mara erinnerte sich an den Tag.

***

Die Ankündigung war bereits am Vortag gekommen.

Für den 21. Oktober hatte das PHP-Projekt außerplanmäßige Sicherheitsupdates angekündigt. Zwei kritische Schwachstellen sollten geschlossen werden.

Als die Details veröffentlicht wurden, liefen die Prüfungen im Service bereits.

Die automatisierte Übersicht zeigte, welche Umgebungen PHP verwendeten und welche Versionen dort zuletzt ermittelt worden waren.

Für die betroffenen Systeme wurden Aufgaben angelegt.

Bei einem Kunden hatte der Hostinganbieter die Aktualisierung übernommen. Die neue Version war anschließend über die Systemverwaltung bestätigt worden.

Bei einem zweiten musste der Service selbst tätig werden.

Mara hatte die Testumgebung aktualisiert, die automatisierten Prüfungen gestartet und die wichtigsten Geschäftsprozesse kontrolliert.

Anmeldung.

Warenkorb.

Checkout.

Eine Erweiterung hatte zunächst einen Fehler erzeugt. Ein Kollege hatte die Ursache gefunden, die Anpassung geprüft und den Test wiederholt.

Danach war das Update produktiv gegangen.

Die tatsächlich laufende PHP-Version wurde kontrolliert, das Ergebnis dokumentiert.

Der Vorgang war noch am selben Tag geschlossen worden.

Nicht alles war automatisch passiert.

Aber die notwendigen Informationen, Zuständigkeiten und Berechtigungen waren vorhanden gewesen.

Niemand hatte erst herausfinden müssen, wer den Server betreute.

***

„Moin.“

Nora stand in der Tür.

„Moin.“

„Bist du schon bei Reimers?“

„Gerade.“

Nora kam näher.

„Wie sieht es aus?“

„Die Antwort vom Hoster zur OpenSSH-Sache liegt vor. Nicht betroffen.“

„Gut.“

„Aber ich kann es nicht selbst prüfen.“

Nora betrachtete den Bildschirm.

„Weil ihr noch keinen Zugang zum Hostingportal habt?“

„Genau. Reimers hat den Zugang, für uns gibt es dort noch keine eigenen Konten. Über die vorhandenen SSH-Zugänge kann die Agentur an der Anwendung arbeiten. Die Konfiguration beim Hoster können wir damit nicht vollständig einsehen.“

„Und PHP?“

„Erledigt. Der Hoster hat aktualisiert, und Jamal hat die tatsächlich vom Shop verwendete Version anschließend selbst geprüft.“

„Haben wir das dokumentiert?“

Mara öffnete die zweite Nachricht.

„Ja. Mit dem Änderungsprotokoll des Hosters und Jamals eigenem Prüfergebnis.“

***

Die E-Mail war vom 22. Oktober.

*Betreff: RE: Dringend – PHP-Sicherheitsupdate / Kundenumgebung Reimers*

Der Hoster bestätigte darin, dass die produktive PHP-Umgebung am Vorabend auf die korrigierte Version 8.2.35 aktualisiert worden war.

Die beiden veröffentlichten Sicherheitslücken seien damit für diese Umgebung behoben.

Im Anhang lag ein Auszug aus dem technischen Änderungsprotokoll. Er enthielt die betroffene Umgebung, den Zeitpunkt der Aktualisierung und die anschließend vom Betreiber ermittelte PHP-Version.

Jamal hatte die Anfrage gestellt.

Er hatte die Sicherheitsmeldung gesehen und geprüft, welche Kundenprojekte möglicherweise betroffen waren. Bei Reimers war der dokumentierte Versionsstand zu alt gewesen, um daraus eine verlässliche Aussage abzuleiten.

Also hatte er nicht auf die geplante Serviceübernahme gewartet.

Er hatte über den bestehenden Supportkontakt beim Hoster nachgefragt, auf die Dringlichkeit hingewiesen und die Bestätigung angefordert.

Andere Arbeiten mussten dafür zurückstehen.

Das war bei einer solchen Meldung nichts Besonderes.

Mara öffnete den alten Vorgang.

*21.10., 15:18 Uhr – Anfrage an Hoster.*

*22.10., 08:41 Uhr – Update auf PHP 8.2.35 bestätigt.*

*22.10., 09:06 Uhr – Rückmeldung und Änderungsnachweis dokumentiert.*

Danach hatte Jamal den bestehenden SSH-Zugang zur Anwendungsumgebung genutzt. Über die interne Diagnose der Webanwendung prüfte er die tatsächlich für den Shop laufende PHP-FPM-Version. Die reine Ausgabe von `php -v` hätte nur die Kommandozeile beschrieben und dafür nicht ausgereicht.

Er hielt das Ergebnis im Vorgang fest.

*22.10., 09:24 Uhr – Produktive Web-Laufzeit über SSH-gestützte Anwendungsdiagnose verifiziert: PHP 8.2.35.*

Die Bestätigung des Hosters und Jamals eigener Nachweis stimmten überein.

Nora las den Eintrag.

„Also wurde das gemacht.“

„Ja.“

„Dann ist das kein offener Sicherheitsvorfall.“

„Nein. PHP ist hier technisch geprüft und abgeschlossen.“

Mara wechselte zur aktuellen Bestandsaufnahme.

„Aber die Betriebsprüfung ist weiterhin offen.“

Nora nickte.

„Das sollten wir auseinanderhalten.“

***

Um neun Uhr saßen vier Menschen im Besprechungsraum.

Nora, Mara, Alex und Martin.

Martin hatte den Termin selbst angestoßen. Am Vortag hatte er Alex geschrieben, dass Reimers geklärt sei und sie die nächsten Schritte mit dem Service besprechen sollten.

Alex hatte die Einladung verschickt.

Als Betreff stand dort:

*Reimers – offene Punkte Betriebsübernahme.*

Martin öffnete sein Notebook.

„Dann schauen wir mal, was noch fehlt.“

Mara teilte ihren Bildschirm.

Sie hatte die Bestandsaufnahme vorbereitet.

Anwendung.

Hosting.

Schnittstellen.

Monitoring.

Wartung.

Zugänge.

Verantwortlichkeiten.

Neben einigen Einträgen standen grüne Häkchen.

Andere waren gelb.

„Wir haben inzwischen deutlich mehr Informationen als letzte Woche“, begann sie. „Jamal hat die Anwendung untersucht, die wichtigsten Komponenten erfasst und die Ergebnisse aus dem Checkout-Vorfall dokumentiert.“

Alex nickte.

„Die Kunden-IT hat außerdem die Schnittstelle zur Warenwirtschaft bestätigt.“

„Gut“, sagte Martin.

Mara scrollte weiter.

„Bei der Infrastruktur fehlen uns noch ein paar Dinge.“

„Was genau?“

„Eigene Servicekonten für die Hosting-Verwaltungsoberfläche, die vollständige Übersicht der vom Betreiber verwalteten Infrastruktur und die Wartungsnachweise der letzten Monate.“

Martin zeigte auf die Sicherheitsakte.

„Aber die Updates sind doch gemacht.“

„Ja.“

„Warum steht das dann hier noch auf gelb?“

„Die PHP-Laufzeit ist verifiziert. Gelb ist die übergreifende Betriebsaufnahme: Wir haben noch keinen Einblick in die Hostingverwaltung und die dort konfigurierten Leistungen.“

Martin lehnte sich zurück.

„Das verstehe ich nicht ganz.“

Mara öffnete die PHP-Meldung.

„Jamal hat sofort reagiert. Der Hoster hat das Update bestätigt und einen technischen Nachweis geliefert. Jamal hat zusätzlich die produktive Web-Laufzeit geprüft. Dieser Sicherheitsvorgang ist abgeschlossen.“

„Okay.“

„Die PHP-Version kann Jamal über den bestehenden SSH-Zugang prüfen. Aber Backups, Benutzerrechte und die übrigen vom Hoster verwalteten Einstellungen sehen wir dadurch nicht vollständig.“

„Ist das nicht Aufgabe des Hosters?“

„Ein Teil davon schon. Wir müssen trotzdem wissen, welche Leistungen eingerichtet sind und wer dafür zuständig ist.“

Martin sah auf die Übersicht.

„Und dafür braucht ihr die Verwaltungsoberfläche?“

„Ja. Die SSH-Zugänge für die Anwendung ersetzen kein eigenes Servicekonto beim Hoster.“

***

Alex hatte die Unterlagen schon am Vorabend durchgesehen.

Der Shop wurde weiterhin über eine Deployment-Pipeline ausgeliefert. Die dafür benötigten Zugangsdaten lagen als geschützte Secrets im CI-System. Jamal konnte Änderungen ausrollen. Für Arbeiten am Projekt gab es außerdem bestehende, eingeschränkte SSH-Zugänge der Agentur.

Der Hostingvertrag lief direkt über Reimers. Auch die Verwaltungsoberfläche gehörte zu seinem Kundenkonto. Dort konnte er neue Benutzer für den Service anlegen oder freigeben.

Bisher war das nicht passiert.

„Wie sind dann die letzten Änderungen online gegangen?“, fragte Mara.

„Über die Pipeline“, sagte Alex. „Die funktioniert. Und Jamal kommt per SSH an die Projektumgebung.“

„Aber nicht an die Verwaltung des Hosters.“

„Nein.“

„Dann brauchen wir keine Schlüssel aus der Pipeline. Wir brauchen eigene Servicekonten im Hostingportal, mit den Berechtigungen für unsere Prüfungen.“

„Reimers kann das freigeben“, sagte Alex. „Ich habe ihn gestern darum gebeten.“

Martin blätterte durch seine Notizen.

„Dann ist doch klar, wer das machen muss.“

„Ja“, sagte Alex. „Die Bestätigung steht noch aus.“

Mara öffnete den betreffenden Eintrag.

*Servicekonten im Hostingportal durch Reimers freigeben lassen – angefragt.*

*Verantwortlich: Alex.*

*Rückmeldung: ausstehend.*

Es stand ein Datum dahinter.

Nora sah auf den Eintrag.

„Bis wann?“

„Ich wollte heute noch einmal nachfragen.“

„Dann setzen wir morgen fünfzehn Uhr als Frist. Wenn bis dahin keine Freigabe oder eine verbindliche Rückmeldung vorliegt, sprechen wir mit Martin und Reimers über den weiteren Weg.“

Martin sah auf.

„Was passiert dann?“

„Die Aufnahme läuft weiter, soweit wir arbeiten können. Ohne eigene Konten im Hostingportal können wir die technische Abnahme nicht abschließen. Falls Reimers sie nicht freigibt, müssen wir mit ihm und dem Betreiber einen anderen Prüfweg vereinbaren.“

„Und wenn nicht?“

„Dann können wir die Betriebsübernahme nicht vollständig freigeben.“

Martin nickte langsam.

„Gut. Dann weiß wenigstens jeder, woran er ist.“

Mara setzte den Termin.

Nora sah auf den Eintrag.

„Und die Vertretung?“

Alex öffnete seine eigene Aufgabenliste.

„Ist benannt.“

Mara ergänzte den Namen.

Martin sah zu.

Die Liste wurde länger.

Gleichzeitig verschwanden zwei gelbe Hinweise.

***

„Ich möchte euch etwas zeigen“, sagte Mara.

Sie öffnete die Akte eines regulär übernommenen Kunden.

Die Oberfläche war dieselbe.

Auch die Kategorien waren identisch.

Bei diesem Projekt standen allerdings neben den technischen Angaben die zugehörigen Nachweise.

Die eingesetzten Bibliotheken waren aus dem Build dokumentiert. Automatische Prüfungen meldeten bekannte Schwachstellen in Abhängigkeiten. Die produktiven Laufzeitversionen wurden aus der verwalteten Umgebung übernommen.

Der Betrieb hatte ein festgelegtes Wartungsfenster.

Die Wiederherstellung war getestet.

Es gab einen primären Ansprechpartner und eine Vertretung.

„Das ist unser normaler Ablauf“, erklärte Mara. „Bei einer Sicherheitsmeldung müssen wir nicht jedes Mal von vorn anfangen.“

Sie öffnete den PHP-Vorgang.

„Hier wussten wir bereits, welche Versionen eingesetzt wurden. Wir konnten gezielt aktualisieren und anschließend selbst prüfen, ob die korrigierten Versionen tatsächlich liefen. Bei Reimers hat Jamal das für PHP ebenfalls geschafft. Was uns dort noch fehlt, ist der vollständige Überblick über die Hostingverwaltung.“

Danach öffnete sie die Meldung vom vergangenen Donnerstag.

*OpenSSH – CVE-2026-123158.*

„Auch hier konnten wir die betroffenen Konstellationen eingrenzen. Nicht jedes System mit Alpine Linux ist automatisch betroffen. Entscheidend ist unter anderem, ob dort ein entsprechend konfigurierter SSH-Server läuft.“

Sie zeigte auf den Prüfbericht.

„Bei diesem Kunden läuft kein SSH-Server in den Alpine-Containern. Die anderen SSH-Systeme haben wir ebenfalls geprüft. Ergebnis: nicht betroffen.“

Daneben standen die ermittelten Konfigurationen und das Prüfdatum.

Martin nickte.

„Und bei Reimers hat der Hoster dasselbe bestätigt.“

„Ja.“

„Dann ist das Ergebnis doch gleich.“

„Für diese konkrete Meldung schon.“

Mara wechselte zwischen den beiden Vorgängen.

„Beim ersten Kunden haben wir die Informationen selbst erhoben. Bei Reimers haben wir die Bestätigung des Betreibers.“

„Ist die weniger wert?“

„Nicht unbedingt. Der Hoster kennt seine Infrastruktur. Bei PHP haben wir zusätzlich selbst nachgesehen. Bei der OpenSSH-Konfiguration und den übrigen Hosting-Einstellungen können wir seine Beschreibung noch nicht unabhängig mit der verwalteten Umgebung abgleichen.“

Martin überlegte.

„Also vertraut ihr ihm nicht?“

„Doch“, sagte Mara. „Wir hätten nur gern zusätzlich eigene Nachweise.“

Nora sah zu Martin.

„Das ist auch wichtig, wenn wir den Betrieb dauerhaft übernehmen. Wir müssen nicht alles selbst machen. Aber wir müssen wissen, was gemacht wurde und worauf wir uns verlassen.“

***

Martin sah auf die beiden Kundenakten.

Er hatte die Servicegesellschaft mit aufgebaut, gerade damit solche Aufgaben nicht mehr von einzelnen Entwicklern abhingen.

Er erinnerte sich an die Diskussion über gemeinsame Standards.

Damals hatten mehrere Agenturen eingewandt, dass sie ihre Kunden längst im Griff hätten. Sie bräuchten keine zusätzliche Dokumentation, nur weil eine neue Gesellschaft gegründet werde.

Martin hatte beide Seiten verstanden.

Er verstand sie noch immer.

„Jamal hat doch richtig gehandelt“, sagte er.

„Absolut“, antwortete Nora.

„Er hat die Lücke gesehen und sich sofort gekümmert.“

„Ja.“

„Und das, obwohl er eigentlich genug andere Arbeit hatte.“

Alex nickte.

„Die Sicherheitsmeldung hatte Priorität.“

„Dann möchte ich nicht, dass wir hier so tun, als wäre nichts passiert.“

„Tun wir nicht“, sagte Mara.

Sie öffnete den Wartungsverlauf.

Der Vorgang vom 21. Oktober war vollständig dokumentiert.

Datum, Anfrage, Rückmeldung, Ergebnis.

„Das ist gute Arbeit. Wir können genau nachvollziehen, was Jamal getan hat.“

Martin betrachtete den Eintrag.

„Und was fehlt?“

„Dass die nächste solche Meldung nicht wieder davon abhängt, ob Jamal persönlich daran denkt, Reimers mitzuprüfen.“

„Dafür steht er doch jetzt in eurer Liste“, sagte Alex.

„Richtig. Seit Mittwoch. Die OpenSSH-Meldung wurde mir deshalb direkt zugewiesen.“

„Dann funktioniert das doch.“

„Für die erste Zuordnung ja. Aber die Liste kennt bisher nur die Systeme, die wir bereits erfassen konnten. Sie ersetzt nicht die vollständige technische Bestandsaufnahme.“

Niemand antwortete sofort.

***

Nora öffnete die Liste der offenen Leistungen.

„Ich glaube, wir kommen hier an den eigentlichen Punkt.“

Sie zeigte auf den bisherigen Wartungsstand.

„Der letzte regulär dokumentierte Wartungslauf stammt aus April. Wir wissen inzwischen, dass danach zumindest sicherheitsrelevante Arbeiten erfolgt sind.“

„Sie stehen nur nicht im Serviceprotokoll“, sagte Alex.

„Genau. Jamals PHP-Prüfung haben wir gefunden. Die Bestätigung zur OpenSSH-Meldung liegt ebenfalls vor. Aber wir wissen nicht, ob es daneben regelmäßige Wartungsläufe gab, wer sie durchgeführt hat und wo die Ergebnisse liegen.“

Martin sah auf die alten Unterlagen.

„Vielleicht beim Hoster.“

„Möglich.“

„Oder in einem anderen System.“

„Auch möglich.“

„Dann müssen wir die Sachen zusammentragen.“

„Ja“, sagte Nora.

Mara wechselte zur Aufgabenübersicht.

Die offenen Punkte waren inzwischen konkreter geworden.

Nicht mehr *Hosting klären*.

Sondern *Aktuelle Infrastrukturübersicht beim Betreiber anfordern.*

Nicht mehr *Zugänge fehlen*.

Sondern *Eigene Servicekonten in der Hosting-Verwaltungsoberfläche durch Reimers freigeben lassen.*

Nicht mehr *Wartung prüfen*.

Sondern *Wartungsnachweise seit Mai mit Betreiber und bisherigen Projektunterlagen abgleichen.*

Martin las die Liste.

„Das sieht doch machbar aus.“

„Ist es auch“, sagte Mara.

„Warum sind wir dann noch nicht fertig?“

Alex antwortete.

„Weil wir dafür Rückmeldungen von anderen brauchen.“

Martin sah ihn an.

Alex zeigte auf die Termine.

„Die Anfrage an Reimers ist raus. Morgen wissen wir, ob die Servicekonten freigegeben werden oder wir einen anderen Prüfweg brauchen.“

„Und wer verfolgt das nach?“

„Ich.“

Nora schüttelte leicht den Kopf.

„Für den Kundenkontakt, ja. Die technische Abnahme liegt bei Mara. Die Betriebsübernahme gebe ich frei, wenn die Voraussetzungen erfüllt sind.“

Martin nickte.

„Und wenn einer von euch im Urlaub ist?“

Alex lächelte.

„Auch dafür haben wir jetzt eine Vertretung.“

***

Nach dem Termin kehrte Mara an ihren Arbeitsplatz zurück.

Sie öffnete die Reimers-Akte.

Oben stand noch immer:

*Aufnahme läuft.*

Darunter waren inzwischen deutlich weniger gelbe Hinweise.

Sie überprüfte die beiden Sicherheitsvorgänge.

PHP.

*Update auf PHP 8.2.35 durch Hostinganbieter bestätigt. Technischer Änderungsnachweis und unabhängige Prüfung der produktiven Web-Laufzeit durch Jamal vom 22.10.2026 liegen vor. Sicherheitsvorgang abgeschlossen.*

OpenSSH.

*Betroffenheit durch Hostinganbieter ausgeschlossen. Technische Begründung dokumentiert. Unabhängige Konfigurationsprüfung im Rahmen der Betriebsaufnahme vorgesehen.*

Beide Sicherheitsmeldungen waren bearbeitet.

Die ausstehenden Verifikationen blieben Teil der Übernahmeprüfung.

Mara öffnete die Liste der offenen Aufgaben.

Beim PHP-Vorgang stand Jamals Name.

Bei der Freigabe der Servicekonten Alex.

Bei der technischen Bestandsaufnahme Mara.

Bei der endgültigen Betriebsfreigabe Nora.

Neben der Freigabe der Servicekonten stand jetzt:

*11.11.2026, 15:00 Uhr – Frist zur Freigabe der Servicekonten oder verbindlichen Rückmeldung.*

*Bei Fristüberschreitung: Eskalation an Martin und Reimers. Alternativen zur technischen Prüfung abstimmen.*

Sie sah auf die alten Projektunterlagen.

Dort hatte einmal gestanden:

*Technische Betreuung: Agentur.*

Mehr nicht.

Sie schloss das Dokument.

Dann öffnete sie die Akte des anderen Kunden, bei dem sie am Morgen noch auf den Nachweis gewartet hatte.

Der Kollege hatte ihn inzwischen ergänzt.

Mara kontrollierte die Angaben und schloss den Vorgang ab.

Ein grünes Häkchen erschien.

Sie wechselte zurück zu Reimers.

Die Sicherheitsmeldungen waren erledigt.

Die Betriebsübernahme nicht.

Und zum ersten Mal seit Beginn der Aufnahme war der Unterschied zwischen beidem vollständig dokumentiert.

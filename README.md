# dsh-custom-css

Eigenes CSS für die DSH-Weboberfläche — ohne Skin-Plugin, ohne Neustart.

## Was es macht

Hängt eine `<style>`-Karte als **letztes** Element in den `<head>`, also nach allen
eingebauten Regeln. Alles, was hier steht, gewinnt gegen die Standard-Styles.

Einstellungen → **Eigenes CSS** (eigene Seite in der Seitenleiste) mit Textfeld,
Autospeichern und Zurücksetzen. Gespeichert wird in `localStorage`, also pro Browser.

## Beispiele

```css
/* Ecken schärfer */
:root { --dsw-radius-md: 2px; --dsw-radius-lg: 4px; --dsw-radius-xl: 6px; }

/* Schrift (muss auf dem Rechner installiert sein) */
body { --dsh-font-family-text: "Atkinson Hyperlegible Next"; }
body { --dsh-font-family-code: "JetBrains Mono"; }

/* Kontrast */
:root { --dsw-alias-label-secondary: light-dark(#3a3a3a, #d8d8d8); }

/* Element ausblenden */
.sidebar { display: none; }
```

## Warum die Theme-Einstellung manchmal nichts tut

DSH hängt die Schrift aus den Einstellungen **vor** den Standard-Stack:

```css
body { --dsw-font-family: var(--dsh-font-family-text, <default>), <default>; }
```

Ein Skin-Plugin, das `--dsw-font-family` selbst setzt, gewinnt dagegen. Hier nicht:
dieses Plugin kommt zuletzt und kann mit `!important` oder einer höheren Spezifität
alles überschreiben.

## Installation

```sh
dsh plugin install /pfad/zu/dsh-custom-css
```

Oder über die Weboberfläche: Einstellungen → Plugins → Ordner installieren.

## Repo

Ein Repo pro Plugin, Namenspräfix `dsh-`.

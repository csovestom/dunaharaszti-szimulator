# Dunaharaszti Szimulátor – telepíthető webapp (PWA)

| fájl | mi ez |
|---|---|
| `index.html` | maga a játék (ezt cseréled, ha új verzió jön) |
| `manifest.webmanifest` | név, ikon, teljes képernyős indítás |
| `sw.js` | offline működés + automatikus frissítés |
| `icons/` | app ikonok (Android, iPhone) |

## Közzététel GitHub Pages-en (ingyenes, https)

1. github.com → **New repository**, pl. `dunaharaszti-szimulator`, **Public**.
2. **Add file → Upload files**, húzd be a mappa teljes tartalmát (az `icons` mappát is) → **Commit changes**.
3. **Settings → Pages** → *Source: Deploy from a branch*, *Branch: main*, mappa: `/ (root)` → **Save**.
4. 1–2 perc múlva elérhető: `https://FELHASZNÁLÓNÉV.github.io/dunaharaszti-szimulator/`

## Telepítés telefonra

- **iPhone:** a linket Safariban nyisd meg (nem az Instagram böngészőjében) → **Megosztás** → **Főképernyőhöz adás**.
  iPhone-on nincs automatikus felugró ablak, a játék üdvözlő képernyője kiírja a lépést.
- **Android (Chrome):** az üdvözlő képernyőn megjelenik a **Telepítés appként** gomb (vagy ⋮ menü → *Alkalmazás telepítése*).

## Frissítés

Új verziónál csak az `index.html`-t töltsd fel újra (**Add file → Upload files**, ugyanazzal a névvel felülírja).
A telepített app a következő indításkor magától frissül, ha van net. Net nélkül az utolsó letöltött verzió indul.

Ha az ikonokat vagy a manifestet módosítod, a `sw.js` elején írd át a `VERSION` értékét (pl. `v2`).

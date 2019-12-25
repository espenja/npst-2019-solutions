# 🐒i

## Oppgaven

    Se dagsbriefen: https://kalender.npst.no/05

<p><strong>Oppdatering på ønskeliste-lekkasje</strong></p><p>Ytterligere 72 ønskelister ser ut til å være på avveie.</p><p>NISSEN  jobber på spreng for å utvikle en ny uknekkelig PPK.</p><p><strong>Kranglete API</strong></p><p>Våre analytikere har gravd litt i et system en tidligere ansatt jobbet med før avskjedigelse. Noen av adventsvikarene er kjent med personen fra tidligere gjennom uthenting av filer og gjenoppretting av passord. Det ser ut til at systemet er skrevet i <code>node.js</code>, men analytikerne våre greier ikke helt skjønne hvordan det fungerer. Det finnes heller ikke noen dokumentasjon. Kunne noen EDB-kompetente alvebetjenter sett nærmere på dette, og rapportert tilbake i intranettet om det ligger noe av interesse der?</p><p><a href=\"https://npst.no/api/%F0%9F%99%83.js\">https://npst.no/api/🙃.js</a></p><p><strong>Julevurdering</strong></p><p>Med bakgrunn i ønskelistelekasjen er julevurderingen nedgradert. Det er nå <em>MULIG</em> at det blir en GOD JUL.</p>

---

## Løsningen

Oppgaven dreier seg om å manipulere state i nettsiden slik at den riktige staten er valgt.

### Steg 1

Åpne [https://npst.no/api/🙃.js](https://npst.no/api/🙃.js) oppgitt i oppgaven.

Siden viser:

```json
{
    "error": false,
    "state": "[>🍕<, 🍉, 🐴, 🐟, 🚀, 🚩]",
    "message": "Bruk /api/🙃.js?commands=🤷 for en 📃 over 👌 ,n🚽er."
}
```

### Steg 2

Finn ut hvilke commands vi har tilgjengelige ved å gå til den oppgitte URL-en for commands:

[https://npst.no/api/🙃.js?commands=🤷](https://npst.no/api/🙃.js?commands=🤷)

Siden viser:

```json
{
    "error": false,
    "state": "[>🍕<, 🍉, 🐴, 🐟, 🚀, 🚩]",
    "message": "Tilgjengelig ,n🚽er: ✨, ⚡, 🔑, 🤷. Eksempel: /api/🙃.js?commands=✨⚡✨"
}
```

### Steg 3

Tilgjengelige kommandoer er ✨, ⚡, 🔑, 🤷
Hvis man åpner eksemplet [https://npst.no/api/🙃.js?commands=✨⚡✨](https://npst.no/api/🙃.js?commands=✨⚡✨) ser vi at "state" forandrer seg til:

```json
{
    "error": false,
    "state": "[🍕, >🐟<, 🚩, 🚀, 🍉, 🐴]",
    "message": ""
}
```

Her ser vi at symbolene har byttet plass på mystisk vis og at en slags markør har flyttet seg en plass til høyre.

### Steg 4

Finne ut hva vi skal gjøre.  
Etter å ha prøvd litt forskjellige kombinasjoner finner vi ut følgende:  

- `> <` er en markør for hvilket symbol som er valgt
- 🔑 henter ut verdien til symbolet som er valgt
- ⚡ flytter 🚩 én plass til høyre, og bytter plass med symbolet som var på den plassen 🚩 blir flyttet til. I tillegg flyttes `> <` en plass til høyre
- ✨ scrambler om på symbolene, men på en bestemt struktur
  
Eksempel:  

[https://npst.no/api/🙃.js?commands=🔑](https://npst.no/api/🙃.js?commands=🔑)

```json
{
    "error": false,
    "state": "[>🍕<, 🍉, 🐴, 🐟, 🚀, 🚩]",
    "message": "🍕"
}
```

[https://npst.no/api/🙃.js?commands=⚡](https://npst.no/api/🙃.js?commands=⚡)

```json
{
    "error": false,
    "state": "[🚩, >🍉<, 🐴, 🐟, 🚀, 🍕]",
    "message": ""
}
```

[https://npst.no/api/🙃.js?commands=✨](https://npst.no/api/🙃.js?commands=✨)

```json
{
    "error": false,
    "state": "[>🐴<, 🚀, 🍕, 🍉, 🐟, 🚩]",
    "message": ""
}
```

[https://npst.no/api/🙃.js?commands=✨⚡⚡🔑](https://npst.no/api/🙃.js?commands=✨⚡⚡🔑)

```json
{
    "error": false,
    "state": "[🚀, 🚩, >🍕<, 🍉, 🐟, 🐴]",
    "message": "🍕"
}
```

### Steg 5

Vi antar at vi vil få flagget til å være valgt og få printet ut verdien til dette, iom at alt dreier seg om å finne et flag (CTF: Capture The Flag)

Løsningen viser seg å være

[https://npst.no/api/🙃.js?commands=⚡⚡⚡⚡✨🔑](https://npst.no/api/🙃.js?commands=⚡⚡⚡⚡✨🔑)

```json
{
    "error": false,
    "state": "[🐟, 🚀, 🍉, 🐴, >🚩<, 🍕]",
    "message": "PST{ba323c3f5b3f1b536461d41cc7f1ba60}"
}
```

```text
Flagg: PST{ba323c3f5b3f1b536461d41cc7f1ba60}
```

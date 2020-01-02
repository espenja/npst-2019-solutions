# Alternativer

## Oppgaven

NPST har mottatt informasjon om at minnepennen var tiltenkt en nordpolar kilde ført av en sydpolar kildefører. Kilden og kildeføreren skal ikke ha noe direkte kjennskap til hverandre, men kommuniserer på en forhåndsavtalt måte. Våre alveteknikere trenger en innføring i hvordan de skjuler dataen sin. Kan du hjelpe dem?

Flagget er `PST{md5(navnet på stedet du fant passordet i forrige trinn (ett tegn))}`

eks: `echo -ne "?" | md5sum d1457b72c3fb323a2671125aef3eab5d -`

Flagget blir da `PST{d1457b72c3fb323a2671125aef3eab5d}`

---

## Løsningen

Svaret på denne har vi allerede fra forrige oppgave.
MD5-summen oppgaven er ute etter er navnet på den alternate data streamen, som er "`_`"

Vi lager en md5-sum av "`_`" som gir oss `b14a7b8059d9c055954c92674ce60032`

```javascript
Flagg: PST{b14a7b8059d9c055954c92674ce60032}
```

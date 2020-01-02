# PPKv3

## Oppgaven

    Se dagsbriefen: https://kalender.npst.no/19

<p><strong>Ny PPK</strong></p><p>I lys av senere tids passordproblematikk har NISSEN utviklet en ny PPK. Kan noen alvebetjenter undersøke om NISSEN har klart å luke ut alle svakheter fra tidligere designiterasjoner?</p><p><strong>Eksempel</strong><br>PPKv3("Pompøst og metodisk") → <code>øMSijrt Mc SÅtMZPrU</code></p><pre><code>ømQ UæjEEi4æÅktÅr i4æÅktÅr SZG tWM tPSÅ i4Z i4æÅktÅr rE0tt UæjEEi4æÅktÅr rE0tt</code></pre>

---

## Løsningen

Vi ser at formatet på cipheret ligner veldig på formatet vi har blitt gitt i de tidligere oppgavene. Går vi ut fra dette ser vi også at like bokstaver i cipher samsvarer med like bokstaver i et "dekodet" flagg. Dette tyder på at oppgaven bruker ren substitusjon.

Her benytter vi oss bare av at vi kjenner formatet på flagget, samt eksempelet i oppgaven for å lage oss et substitusjonsalfabet. Bokstavene vi ikke finner noen match på fyller vi inn med fantasien.

Bokstavsubstitusjon for standard flagg

    PST krøllparentes                                    slutt krøllparentes slutt
    ømQ UæjEEi4æÅktÅr i4æÅktÅr SZG tWM tPSÅ i4Z i4æÅktÅr rE0tt UæjEEi4æÅktÅr rE0tt

Bokstavsubstitusjon for eksemplet i oppgaven

    Pompøst og metodisk
    øMSijrt Mc SÅtMZPrU

Etter å ha mappet bokstavene vi klarer å mappe, sitter vi igjen med følgende substitusjonsalfabet

    0 4 E M P Q S U Z Å c i j k m ø r t æ
    ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
    u a l o i T m k d e g p ø n S P s t r

Vi benytter alfabetet vårt på cipheret:

    ømQ UæjEEi4æÅktÅr i4æÅktÅr SZG tWM tPSÅ i4Z i4æÅktÅr rE0tt UæjEEi4æÅktÅr rE0tt
    PST krøllparentes parentes md# t#o time pad parentes slutt krøllparentes slutt

Vi tar en kvalifisert gjetning på at `G` mapper til `5`, og at `W` mapper til `w` og ender opp med `PST krøllparentes parentes md5 two time pad parentes slutt krøllparentes slutt` som blir til `PST{(md5 two time pad)}`

md5 av `two time pad` er `4a0fc5f3c88874cab11c64e965dff58d`

```javascript
Flagg: PST{4a0fc5f3c88874cab11c64e965dff58d}
```

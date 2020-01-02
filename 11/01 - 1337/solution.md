# 1337

## Oppgaven

    Se dagsbriefen: https://kalender.npst.no/11

<p><strong>Primære faktorer</strong></p> <p>En av NPSTs primære oppgaver er å overvåke kommunikasjonen mellom personer mistenkt for å utøve spionasje for sørpolarske aktører. En alvebetjent har snappet opp en melding tiltenkt en spion. Grunnet flere faktorer trenger vi hjelp med å finne ut av hva <a href="./assets/melding.txt">denne meldingen</a> inneholder. Kan en alvebetjent se over meldingen og finne noen spor?</p> <p><strong>Forsøk på smøring av alvebetjenter</strong></p> <p>En betrodd alvebetjent har mottatt et parti med julebrus. Julebrusen var plassert utenfor NISSENS verksted og adressert alvebetjenten. Det var ingen eksplisitte tegn til avsender, men mistanken er rettet mot Sydpolen pga en sor pingvinfjær som ble funnnet i nærheten av partiet. I tråd med regelverk om smøring fra fremmed makt har alvebetjent informert sin nærmeste leder Jule NISSEN og partiet med julebrus har blitt destruert. Vi oppfordrer andre alvebetjenter til også å rapportere forsøk der de mistenker fremmede makter forsøker å påvirke dem.</p>

---

## Løsningen

Oppgaven hinter sterkt til primtall og faktorer. Vi prøver derfor å finne faktorene til `1337`, oppgavens tittel. Faktorene til `1337` er `7` og `191`, begge primtall.

Del opp teksten i `7` like deler slik at det dannes `7` like lange linjer på `191` tegn.

```plaintext
01110001100111110000100100000111010001011111011110011110011111000100010001000000010111110000000111110101000001000000000001000100111001000100000001000100010001000101111100000001011111010010000
01001010010001000001000100000010011001010000010001010001010000001010010010000000010001000000000001000101000001000000000001000101000101000100000001101100101001001001000000000001000100010001000
01001010000001000001000100000010010101010000010001010001010000010001010100000000010001000000000001000101000001000000000000101001000101000100000001010101000101010001000000000001000100010001000
01110001100001000010000100000010010101011110011110011110011110010001011000000000010001000000000001000101000001000000000000010001000101000100000001000101000101100001111000000001000100010000100
01000000010001000001000100000010010011010000010001010100010000011111010100000000010001000000000001000101000001000000000000010001000101000100000001000101111101010001000000000001000100010001000
01000010010001000001000100000010010001010000010001010010010000010001010010000000010001000000000001000101000001000000000000010001000101000100000001000101000101001001000000000001000100000001000
01000001100001000000100111110111010001011111011110010001011111010001010001011111010001000111110001000101111101111101111100010000111000111001111101000101000101000101111101111101000100010010000
```

Første hint til at dette kanskje er riktig er at første kolonne bare består av `0`, og at andre kolonne bare består av `1`.
Dette er en klassisk oppgave der man har gjemt løsningen direkte i teksten som ASCII art!

Vi kjører en find and replace all `0` med `' '`, og det dukker da opp en lesbar tekst.

```plaintext
 111   11  11111    1  1     111 1   1 11111 1111  1111  11111   1   1   1       1 11111       11111 1 1     1           1   1  111  1   1       1   1   1   1   1 11111       1 11111 1  1
 1  1 1  1   1     1   1      1  11  1 1     1   1 1   1 1      1 1  1  1        1   1           1   1 1     1           1   1 1   1 1   1       11 11  1 1  1  1  1           1   1   1   1
 1  1 1      1     1   1      1  1 1 1 1     1   1 1   1 1     1   1 1 1         1   1           1   1 1     1            1 1  1   1 1   1       1 1 1 1   1 1 1   1           1   1   1   1
 111   11    1    1    1      1  1 1 1 1111  1111  1111  1111  1   1 11          1   1           1   1 1     1             1   1   1 1   1       1   1 1   1 11    1111        1   1   1    1
 1       1   1     1   1      1  1  11 1     1   1 1 1   1     11111 1 1         1   1           1   1 1     1             1   1   1 1   1       1   1 11111 1 1   1           1   1   1   1
 1    1  1   1     1   1      1  1   1 1     1   1 1  1  1     1   1 1  1        1   1           1   1 1     1             1   1   1 1   1       1   1 1   1 1  1  1           1   1       1
 1     11    1      1  11111 111 1   1 11111 1111  1   1 11111 1   1 1   1 11111 1   1   11111   1   1 11111 11111 11111   1    111   111  11111 1   1 1   1 1   1 11111 11111 1   1   1  1
```

```javascript
Flagg: PST{LINEBREAK_IT_TILL_YOU_MAKE_IT!}
```

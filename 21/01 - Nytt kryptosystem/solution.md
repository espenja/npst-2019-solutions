# Nytt kryptosystem

## Oppgaven

    Se dagsbriefen: https://kalender.npst.no/21

<p><strong>Ukens ansatt</strong> Jule NISSEN gratulerer Karine som ukens ansatt, og takker for god innsats. NISSENS sekretariat vil ta kontakt via elektronisk post så fort det lar seg gjøre. Beregn noe ekstra tid grunnet julestri.</p><p><strong>Nytt kryptosystem</strong></p><p>SPST har nylig fått installert et nytt kryptosystem, og vi i NPST har vært tidlig på ballen og fått plassert avlyttingsutstyr på linjene over Antarktis.</p><p>Det kan se ut som at leverandøren til SPST har noen innkjøringsproblemer, da nøkkelen ikke ser ut til å virke.Klarer du å finne ut av hva som er galt?</p><p><a href="./assets/melding.json">Link til melding</a></p><p><strong>Jule NISSENS sykdomsforløp</strong></p><p>Jule NISSEN er frisk og rask, og har vært på jobb innenfor kjernetiden de siste dagene. Han vil for sikkerhets skyld ta det rolig frem til og med lille julaften i påvente av den store dagen, og vil på grunn av dette sannsynligvis trenge noe ekstra hjelp på mandag.</p><p><strong>Julevurdering</strong></p><p>Ettersom Jule NISSEN er blitt frisk, blir julevurderingen oppgradert. Det er nå <em>meget sannsynlig</em> at det blir en GOD JUL.</p>

---

## Løsningen

Oppgaven går ut på å finne riktig krypteringsnøkkel (`secret-key`).

AES-256-GCM er [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) med [Galois/Counter Mode](https://en.wikipedia.org/wiki/Galois/Counter_Mode). Uten å late som om jeg kan dette, så betyr det i praksis at man har et lag med autentisering i tillegg til normal kryptering. For kryptering tar algoritmen 3 inputs og produserer 2 outputs:

### Inputs

- plaintext
- iv (også kalt nonce)
- secret key

### Outputs

- ciphertext
- auth tag

For å dekryptere trenger vi `ciphertext`, `auth tag`, `iv` og `secret key`

Oppgaven hinter til at leverandøren til SPST har problemer med `secret key`. Hintet videre er `uncertain_bits_count`. Det kan se ut som om 2 bits ikke stemmer i `nøkkelen`. Løsningen ender opp med å bli at man må endre to og to bits i `secret key` til vi klarer å dekryptere meldingen.

### Løsning i Node.js fra [@espenja](https://github.com/espenja)

```javascript
const crypto = require("crypto");

const decrypt = (enc, iv, authTag, key) => {
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  return decipher.update(enc, "hex", "utf8") + decipher.final("utf8");
};

const bin2hex = bin => bin.match(/.{4}/g)
    .reduce((agg, b) => agg + parseInt(b, 2).toString(16), "");

const hex2bin = hex => [...hex]
    .reduce((agg, h) => agg + parseInt(h, 16).toString(2).padStart(4, "0"), "");

const flipbit = bit => (bit === "0" ? "1" : "0");

const iv = Buffer.from("d97c2e3410f37ac7b5dcd8df", "hex");
const authTag = Buffer.from("76fe172806c0b41816887630ca74f2f8", "hex");
const cipherText = "69cf99390e143fbab3ea832...lang cipher text";

var keyHex = "800816b1629bcfa519f57a502a6a841298a9f5c20203d8818fdd18271a3b1682";
var binary = hex2bin(keyHex).split("");

for (var i = 0; i < binary.length; i++) {
  for (var k = 0; k < binary.length; k++) {
    var shifted = [...binary];
    shifted[i] = flipbit(shifted[i]);
    shifted[k] = flipbit(shifted[k]);

    var hexkey = bin2hex(shifted.join(""));
    const key = Buffer.from(hexkey, "hex");

    try {
      console.log(decrypt(cipherText, iv, authTag, key));
      return;
    } catch (e) {}
  }
}
```

### Løsning i Python fra [@hoaas](https://github.com/hoaas)

```python
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import (
    Cipher, algorithms, modes
)
from bitstring import BitStream, BitArray

def decoder(ct, tag, key, iv):
    decryptor = Cipher(
        algorithms.AES(key),
        modes.GCM(iv, tag),
        backend=default_backend()
    ).decryptor()

    try:
        output = decryptor.update(ct) + decryptor.finalize()
    except:
        return None
    return output

def flip_bit(bit_as_text):
    if (bit_as_text == '0'):
        return '1'
    return '0'

key_hex = "800816b1629bcfa519f57a502a6a841298a9f5c20203d8818fdd18271a3b1682"

ct = bytes.fromhex("69cf99390e143fbab3ea832...lang cipher text")
tag = bytes.fromhex("76fe172806c0b41816887630ca74f2f8")
iv = bytes.fromhex("d97c2e3410f37ac7b5dcd8df")

key_bin = bin(int(key_hex, 16))[2:].zfill(8)
key_list = list(key_bin)
number_of_bytes = len(key_list)
answer = None
for i in range(number_of_bytes):
    for j in range(number_of_bytes):
        key_list = list(key_bin)

        key_list[i] = flip_bit(key_list[i])
        key_list[j] = flip_bit(key_list[j])

        ba = BitArray(bin="".join(key_list))

        answer = decoder(ct, tag, ba.bytes, iv)
        if answer:
            break
    if answer:
            break
print(answer.decode('utf-8'))
print("Done!")
```

### Output

    SPST
    21.12.19

    Kantinesituasjonen
    Kantinen har nå landet avtale med ny råvareleverandør, og første leveranse blir idag.
    Det blir altså vintersolverv-torsk som planlagt.

    Lekkasje fra SPSTs interne nettverk
    I forbindelse med angrepet mot stordatamaskinen som startet 12.12.19, ble det eksfiltrert en mindre mengde dokumenter gradert TEMMELIG HEMMELIG. Som en konsekvens av dette har vi fra idag tatt i bruk en ny krypteringsalgoritme for data i bevegelse. Vi har opplevd litt problemer med de dedikerte linjene for overføring av nøkkelmateriell, men leverandøren vår jobber på spreng for å fikse dette.


    Ytterligere operasjoner mot NPST
    - Lørdag 14.12.19 fikk en av våre dyktige kildeføringspingviner informasjon om NPSTs planlagte julebord. Vi har ikke lykkes i å bekrefte informasjonen, men kilden forteller at det skal konkurreres i hammerdistanse
    - Tirsdag 17.12.19 ble det gjennomført en vellykket sabotasjeaksjon mot NPSTs matlager. Her ble passordet skiftet til rudolf2, og hashing-algoritme byttet ut med MD5. Det vurderes som MULIG at dette vil påvirke julen.
    - Onsdag 18.12.19 ble det som en HOAX/avledningsoperasjon plassert en helt vanlig ponni i reinsdyrstallen til Jule NISSEN. Dette vil trolig kunne påvirke julen ytterligere.


    Ukens ansatt
    Denne ukens ansatt ønsker ikke å opptre med navn, men vi kan avsløre at pingvinen jobber ved SPSTs PINGINT-seksjon, og har gjort en utmerket jobb med kildene sine den siste tiden.


    Takk til alle for utmerket arbeid uka som har vært.
    Sjef SPST, Keiserpingvinen

    FLAGG: PST{7e7343c9cbe6114f8fd312490816387d}

```javascript
Flagg: PST{7e7343c9cbe6114f8fd312490816387d}
```

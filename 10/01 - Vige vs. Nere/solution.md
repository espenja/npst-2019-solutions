# Vige vs. Nere

## Oppgaven

    Se dagsbriefen: https://kalender.npst.no/10

<p><strong>Sjakkmesterskap</strong></p><p>For tiden arrangeres polarmesterskap i sjakk på Nordpolen. Flere av NPSTs ansatte bruker store deler av arbeidsdagen på å følge med på mesterskapet. Da mange sitter i graderte nett uten mulighet til å strømme sjakk, har NISSEN valgt å legge ved det siste partiet mellom to sørpolare spillere, Vige og Nere:</p><iframe src="https://lichess.org/embed/yDDc9bR0#0?theme=auto&bg=auto"width=600 height=397 frameborder=0 style="width: 100%"></iframe><p>PGN:</p><pre><code>1. a3 e6 2. b3 Ke7 3. Ra2 d5 4. h3 h6 5. f4 Qd6 6. Nc3 Qa6 7. Nf3 g5 8. Nb1 b5 9. d4 Qa5+ 10. Bd2 Kd6 11. g4 Bg7 12. Bc3 f5 13. Nh2 Ba6 14. Qd2 Bc8 15. Qc1 Qb6 16. Ba1 b4 17. Nd2 Ke7 18. Ndf3 Nd7 19. axb4 Ngf6 20. gxf5 Ne5 21. Ng4 c5 22. Nh4 Qd6 23. Nf2 Ng8 24. Bg2 a5 25. Ra4 Qd8 26. Be4 Qe8 27. Ra3 Kf7 28. b5 Qe7 29. O-O exf5 30. Nxf5 Ba6 31. Ng3 Qf6 32. Nd1 Ra7 33. Kg2 Nc4 34. bxa6 Qb6 35. Nb2 Nxa3 36. Nh5 Qxb3 37. Nxg7 Nb5 38. Nd1 Qe3 39. Rh1 Qa3 40. Re1 Rc7 41. Ne8 Kxe8 42. Qb1 Rhh7 43. dxc5 Rce7 44. Rg1 Re5 45. fxg5 Nf6 46. gxh6 Kf8 47. a7 Ng4 48. Kh1 Nc7 49. Bxd5 Qb4 50. Kg2 Qa3 51. c6 Qc5 52. Qb8+ Re8 53. Be5 Ne6 54. Nc3 Rf7 55. Qxe8+ Kxe8 56. Bf4 Rf6 57. Bg3 Kf7 58. Be1 1-0</code></pre><p>Kommentarer til partiet kan legges inn i <a href="https://intranett.npst.no/challenges">intranettet</a>.</p>

---

## Løsningen

Etter litt leting fant vi denne siden [James Stanley - Hiding messages in chess games](https://incoherency.co.uk/blog/stories/chess-steg.html)
James Stanley har designet et system som klarer å gjemme beskjeder i sjakkspill!

Til vår store lettelse finnes det en dekoder direkte linket på siden hans, [Chess Steganography](https://incoherency.co.uk/chess-steg/)

Vi limer inn sjakkspillet i dekoderen og trykker på "Unsteg".

![./assets/screen1](./assets/screen1.png)

Nå dukker det opp et nytt cipher. Vi observerer at det ligner på det kjente formatet `PST KROELLPARENTES ... KROELLPARENTES SLUTT`. Oppgavens tittel er også et hint her til Vigenère cipher.

Vigenère-cipher er ikke særlig sikkert, og dersom man kjenner til en tekst man leter etter og vet posisjonen til teksten, kan man gjette seg fram til hva nøkkelen skal være.

I dette tilfelle laster vi inn cipheret i Vigenère-modulen på [cryptii.com](https://cryptii.com), og begynner å brute force manuelt.

![./assets/screen2](./assets/screen2.png)

Nøkkelen viser seg å være `spst`, som gir output `PST KROELLPARENTES f02a104f2a665e5d3d2619d6184dc50a KROELLPARENTES SLUTT`

```json
Flagg: PST{f02a104f2a665e5d3d2619d6184dc50a}
```

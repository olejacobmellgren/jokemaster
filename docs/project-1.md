# Løsninger til prosjekt krav

Dette dokumentet inneholder beskrivelser av hvordan vi har valgt å oppfylle de ulike tekniske kravene som var stilt til prosjektet. 

## React med Typescript

Prosjektet ble satt opp med Vite som tilbyr en enkel måte å sette opp et prosjekt i React. Det var ønskelige at prosjektet skulle settes opp med Typescript framfor Javascript ettersom dette sikrer at typedeklarering blir korrekt. Kompilatoren gjør typesjekk og sier ifra før kjøring om noen variabler har feil type. Først under kjøring konverteres koden til Javascript.

## React state og props

For å vedlikeholde state i web-applikasjon har vi tatt i bruk React sin hook kalt useState(). Dette tillater oss å gi funksjonelle komponenter en state. Denne hooken tilbyr en nåværende verdi og en setter-funksjon for å endre denne verdien. I "Header" har vi brukt useState for å holde oversikt over hvilken kategori av vitser som er valgt. I "Jokebox" har vi brukt useState for flere deler. Vi har brukt det blant annetfor å ha en liste med oversikt over hvilke vitser som skal vises, for en teller ("counter") som bestemmer hvilken vits som skal vises og for å vite om en vits er favoritt eller ikke. I tillegg trengte vi en useState-hook for å endre teksten til vitsen som skal vises.

Props er noe vi ikke har tatt i bruk like mye. Vi har brukt det for en sjekkboks ("checkbox") som er en komponent med properties navn, sjekket ("checked") og onChange-funksjon. Det er hensiktsmessig å ha dette som en komponent ettersom den skal brukes flere ganger i dropdown menyen i header. Vi vurderte om det ville være mer effektivt og oversiktlig om Jokebox komponenten ble delt opp i flere komponenter som tar i bruk props. Likevel kom vi fram til at dette ikke var nødvendig siden vi bare har én statisk side der det er lite muligheter for universalt gjenbruk.

## Henting av data fra REST API

Dataen henter vi fra et REST API kalt [JokeAPI](https://sv443.net/jokeapi/v2/). Dette API-et tilbyr en rekke vitser innen ulike kategorier levert på et enkelt JSON-format. For å hente dataen fra API-et brukte vi TanStack Query. Hver gang web-applikasjonen åpnes vil det sjekkes om dataen allerede er hentet, eller om vi må hente det. Om det ikke allerede er hentet bruker vi useQuery for å hente 10 vitser fra de ulike kategoriene vi har valgt.

## Bruk av localstorage og sessionstorage

Dataen vi henter fra API-et lagres i localstorage. Dette gjør at vi unngår unødvendige kall til API-et og heller henter data fra localstorage neste gang web-applikasjonen. I localstorage har vi da lagret lister med vitser innen de forskjellige kategoriene og favoritt vitser. Sessionstorage bruker vi for å lagre telleren ("counter"). Dette gjør at dersom man b (????)

## React Router

Vi har valgt å ikke bruke React Router. Dette er ikke nødvendig dersom man bare har en side på nettsiden. Likevel startet vi med å implementere det, men fjernet dette mot slutten da vi innså at vi bare hadde bruk for én side. Vi føler fortsatt det var fordelsmessig at vi startet med å bruke det ettersom vi mest sannsynlig kommer til å ha nytte av det i prosjekt 2.

## Responsivt design

Web-applikasjonen har et responsivt design som er tilpasset for de fleste PC-er og mobiltelefoner. I landskapsformat (PC-er) er grensesnitt begrenset av høyden, derfor definerer vi størrelser ut fra dette. Mens i portrettformat(mobiler) er størrelser definert av bredden siden dette er den begrensende faktoren. Får å oppnå dette har vi brukt media-queries for å finne ut av grensnittets orientering, og endre CSS etter dette. For å optimalisere grensesnittet i forhold til begresningene har vi valgt å endre noen av komponentenes plassering.

## Testing

For å teste web-applikasjonen har vi laget tester av ulike typer. Dette er viktig for å kunne oppdage feil og problemet som kunne forblitt uoppdaget uten tester.

### Komponent-tester

Vi har laget 

### Mock-tester

### Snapshot-tester

### Manuell testing av grensesnitt

## Annet
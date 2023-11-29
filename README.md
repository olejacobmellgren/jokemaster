# JokeMaster-3000 - Prosjekt 1, IT2810

JokeMaster-3000 er en web-applikasjon for visning av vitser. Det er mulighet til å filtrere vitsene på kategori, og man kan bla seg gjennom vitsene med to knapper eller hoppe til en spesifikk ressurs ved hjelp av en dropdown-meny. Man kan favoritisere vitser slik at de havner i en egen liste og man kan også velge å ha nettsiden i darkmode. Prosjektet er laget av gruppe 25 i emnet IT2810 ved NTNU. Dette dokumentet inneholder informasjon om hvordan man kan kjøre prosjektet og i tillegg hvilke valg vi har tatt og hvordan vi har gått fram for å oppfylle de ulike kravene til prosjektet.

## Bygging

Prosjektet er konfigurert til å bygge med npm. Ved å kjøre `npm install` i **prosjekt-1** vil man forberede prosjektet for å kunne kjøre.

## Kjøring av applikasjonen

Etter man har utført en av kommandoen under **[Bygging](readme.md#bygging)** kan man kjøre applikasjonen enten lokalt eller med virtuell maskin.

- #### Kjøring lokalt

Man kan kjøre applikasjonen med lokal lagring ved å navigere til **prosjekt-1** og kjøre `npm run dev`. Da vil appen kjøres på en localhost med en lenke som dukker opp i terminalen.

- #### Kjøring med virtuell maskin

Man kan kjøre applikasjonen med virtuell maskin ved å gå til en nettleser og skrive inn lenken: [it2810-25.idi.ntnu.no/project1/](http://it2810-25.idi.ntnu.no/project1/). Merk at virtuell maskin bare er tilgjengelig på NTNU sitt nettverk eller via VPN.

## Testing

Testene for prosjektet kjøres ved `npm run test` i mappen **prosjekt-1**. Da vil alle testene for hver test-fil kjøres og resultatet av testene vises i terminalen.

# Løsninger til prosjekt krav

Dette dokumentet inneholder beskrivelser av hvordan vi har valgt å oppfylle de ulike tekniske kravene som var stilt til prosjektet.

## React med Typescript

Prosjektet ble satt opp med Vite som tilbyr en enkel måte å sette opp et prosjekt i React. Det var ønskelige at prosjektet skulle settes opp med Typescript framfor Javascript ettersom dette sikrer at typedeklarering blir korrekt. Kompilatoren gjør typesjekk og sier ifra før kjøring om noen variabler har feil type. Først under kjøring konverteres koden til Javascript.

## React state og props

For å vedlikeholde state i web-applikasjon har vi tatt i bruk React sin hook kalt useState(). Dette tillater oss å gi funksjonelle komponenter en state. Denne hooken tilbyr en nåværende verdi og en setter-funksjon for å endre denne verdien. I "Jokebox" har vi brukt useState for flere deler. Vi har brukt det blant annet for å ha en liste med oversikt over hvilke vitser som skal vises, for en teller ("counter") som bestemmer hvilken vits som skal vises og for å vite om en vits er favoritt eller ikke. I tillegg trengte vi en useState-hook for å endre teksten til vitsen som skal vises.

Props spiller en sentral rolle i prosjektet vårt. Når en bruker velger en kategori i Header, er det nødvendig at denne informasjonen når Jokebox for å bestemme hvilken type vits som skal vises. For å håndtere dette sender Header den valgte kategorien som en prop til Jokebox, samtidig som den får tilgang til en metode gjennom props for å oppdatere denne verdien. De tilgjengelige kategoriene for filtrering sendes fra Header til DropdownMenu som en prop. Denne effektive utvekslingen av informasjon gjennom props legger til rette for en dynamisk og sammenhengende brukeropplevelse.

## Henting av data fra REST API

Dataen henter vi fra et REST API kalt [JokeAPI](https://sv443.net/jokeapi/v2/). Dette API-et tilbyr en rekke vitser innen ulike kategorier levert på et enkelt JSON-format. For å hente dataen fra API-et brukte vi TanStack Query. Hver gang web-applikasjonen åpnes vil det sjekkes om dataen allerede er hentet, eller om vi må hente det. Om det ikke allerede er hentet bruker vi useQuery for å hente 10 vitser fra de ulike kategoriene vi har valgt.

## Bruk av localstorage og sessionstorage

Dataen vi henter fra API-et lagres i sessionstorage. Dette gjør at vi unngår unødvendige kall til API-et og heller henter data fra sessionstorage ved reload. Grunnen til at vi lagrer i sessionstorage fremfor localstorage, er grunnet temaets natur - man har ikke lyst til at de samme vitsene skal vises hele tiden, variasjon er nødvendig. I sessionstorage har vi da lagret lister med vitser innen de forskjellige kategoriene som finnes. Vi lagrer også den nåværende kategorien brukeren befinner seg på, slik at man ved reload starter på samme kategori som før. I tillegg lagrer vi en teller ("counter") for hvor langt brukeren har bladd, slik at man starter på samme sted ved reload. Vi lagrer en liste av counters for de forskjellige kategoriene en bruker har besøkt.

Localstorage er brukt for å lagre favoritt-vitsene til en bruker. Det vil si at selv om web-applikasjonen lukkes og åpnes igjen, vil dette bli lagret.

## React Router

Vi har valgt å ikke bruke React Router. Dette er ikke nødvendig dersom man bare har en side på nettsiden. Likevel startet vi med å implementere det, men fjernet dette mot slutten da vi innså at vi bare hadde bruk for én side. Vi føler fortsatt det var fordelsmessig at vi startet med å bruke det ettersom vi mest sannsynlig kommer til å ha nytte av det i prosjekt 2.

## Responsivt design

Web-applikasjonen har et responsivt design som er tilpasset for de fleste PC-er og mobiltelefoner. I landskapsformat (PC-er) er grensesnitt begrenset av høyden, derfor definerer vi størrelser ut fra dette. Mens i portrettformat(mobiler) er størrelser definert av bredden siden dette er den begrensende faktoren. Får å oppnå dette har vi brukt media-queries for å finne ut av grensesnittets orientering, og endre CSS etter dette. For å optimalisere grensesnittet i forhold til begresningene har vi valgt å endre noen av komponentenes plassering.

## Testing

For å teste web-applikasjonen har vi laget tester av ulike typer. Dette er viktig for å kunne oppdage feil og problemet som kunne forblitt uoppdaget uten tester.

#### Komponent-tester

Vi har laget komponent-tester som tester props, state og brukerinteraksjon med komponenter. For Header har vi laget en enkel test som sjekker at overskriften vises som den skal og en test for interaksjon med dropdown-meny. Vi har ikke testet props for CheckBox-komponenten direkte, men vi har testet dette indirekte gjennom Header-komponenten som tar i bruk slike komponenter. JokeBox-komponenten er den vi har mest omfattende tester for. Her har vi blant annet testet at man kan bytte mellom ulike vitser, at staten til counter oppdateres og at favoritisering fungerer som det skal.

#### Mock-tester

I test-filen for JokeBox har vi laget mock-data ved bruk av MSW (Mock Service Worker). Vi ønsker ikke å hente data fra API-et når vi skal teste og lager derfor mock-data. MSW lager mock-data for to ulike kategorier av vitser (Programming + Pun) og gjør at vi kan teste brukerinteraksjon med denne dataen. Dette legger også grunnlaget for at vi kan lage komponent-tester som tester state innenfor komponentene.

#### Snapshot-tester

Blant testene for JokeBox har vi også underveis innført Snapshot-tester. Dette er tester som sjekker sammenligner web-applikasjonen med et "snapshot", altså et slags "bilde" av hierarkiet av komponenter, og sjekker om disse er like.

#### Manuell testing av brukergrensesnitt

I tillegg har vi gjennomført kontinuerlig manuell testing av brukergrensesnittet for å oppdage mulige feil. Når vi gjør dette setter vi oss inn i scenarioet som en bruker og prøver å bruke web-applikasjonen med funksjonalitet som har blitt implementert.

## Annet

I tillegg har vi laget en "Context"-fil for darkmode. Dette gjør at darkmode fungerer som en global variabel som er enkelt tilgjengelig på tvers av alle komponenter, som er nødvendig ettersom denne brukes overalt. Valg av darkmode lagres i localstorage ettersom det var et krav at slike preferanser skulle huskes neste gang brukeren åpner nettsiden.


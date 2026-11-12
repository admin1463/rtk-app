/* Mit RTK: engelsk på padelsiden (Lars 12. november 2026 kl. 14.57).
   Siden er skrevet på dansk. Står sproget på engelsk (sprog.js, knapperne DA og EN), skiftes hver tekst, der står i
   ordbogen herunder, til engelsk. Det gælder også det, formularerne viser undervejs (MutationObserver). Skiftes der
   tilbage, kommer den danske tekst igen. Tekster med navne og tal klares af mønstrene nederst.
   Ny dansk tekst på siden skal have en linje her, ellers står den på dansk i den engelske udgave
   (test_padel_side_sprog.py finder den). */
(function () {
  var EN = {
    // Top, video og fakta
    'Roskilde Tennis Klubs hjemmeside (åbner i ny fane)': 'Roskilde Tennis Club website (opens in a new tab)',
    'To padelspillere giver hånd og griner på en blå bane': 'Two padel players shake hands and laugh on a blue court',
    'Tilmelding åbner': 'Sign-up opens',
    'Tilmelding lukker': 'Sign-up closes',
    'kl. 10': '10 am',
    'Tid til forhåndstilmeldingen åbner': 'Time until pre-registration opens',
    'Tid til forhåndstilmeldingen lukker': 'Time until pre-registration closes',
    'dage': 'days', 'timer': 'hours', 'min': 'min', 'sek': 'sec',
    'Forhåndstilmeldingen er lukket': 'Pre-registration is closed',
    'Nyt i Roskilde Tennis Klub · start 13. januar 2027': 'New at Roskilde Tennis Club · starts 13 January 2027',
    'Padel hele året.': 'Padel all year.',
    'Sammen.': 'Together.',
    'Træning hver uge med trænere, gode makkere og masser af grin. Indendørs hos PadelPit Roskilde og om sommeren også ude på klubbens baner i Darup ved Dyrskuepladsen. For børn, unge og voksne.':
      'Weekly training with coaches, good partners and lots of laughs. Indoors at PadelPit Roskilde and in summer also outdoors on the club\'s courts in Darup by Dyrskuepladsen. For children, young people and adults.',
    'Få besked, når vi åbner for tilmeldinger': 'Get notified when sign-up opens',
    'Sikr din plads': 'Secure your place',
    'Forhåndstilmeldingen åbner tirsdag 17. november kl. 10 ·': 'Pre-registration opens Tuesday 17 November at 10 am ·',
    'Begrænset antal pladser · Det tager 3 minutter · 500 kr. i depositum pr. spiller, som trækkes fra prisen, eller som I får tilbage, hvis I ikke får plads':
      'Limited places · Takes 3 minutes · DKK 500 deposit per player, deducted from the price or refunded if you don\'t get a place',
    '1 til 1,5 time': '1 to 1.5 hours',
    'hver uge, 34 til 40 gange om året': 'every week, 34 to 40 times a year',
    'Fra 8 år': 'From age 8',
    'Junior, Junior+ og voksen': 'Junior, Junior+ and adult',
    'Ude og inde': 'Outdoors and indoors',
    'PadelPit Roskilde og Darup ved Dyrskuepladsen': 'PadelPit Roskilde and Darup by Dyrskuepladsen',
    'Fra 595 kr.': 'From DKK 595',
    'pr. kvartal for juniorer': 'per quarter for juniors',
    'Video på 30 sekunder om fast padeltræning i RTK og PadelPit Roskilde fra januar. Med danske undertekster':
      '30-second video about regular padel training at RTK and PadelPit Roskilde from January. With Danish subtitles',
    'Slå lyd til og se videoen forfra': 'Turn on sound and watch the video from the start',
    'Slå lyd til': 'Turn on sound',
    'Padel i RTK på 30 sekunder. Tryk på knappen i hjørnet for fuld skærm.': 'Padel at RTK in 30 seconds (Danish subtitles). Tap the button in the corner for full screen.',
    // Derfor er det noget særligt
    'Derfor er det noget særligt': 'Why it\'s something special',
    'Et rigtigt klubtilbud i padel. Til en pris, hvor alle kan være med.': 'A real club offer in padel. At a price everyone can afford.',
    'Padel er sjovt fra første bold. Man er altid fire på banen, bolden er i spil, og man griner mere end i de fleste andre sportsgrene. Nu kan du spille det hele året i en klub, med faste hold og en træner, der kender dig.':
      'Padel is fun from the very first ball. There are always four of you on court, the ball stays in play, and you laugh more than in most other sports. Now you can play all year in a club, with regular teams and a coach who knows you.',
    'Træning hele året, inde og ude': 'Training all year, indoors and outdoors',
    'Faste baner hos PadelPit Roskilde og om sommeren også klubbens egne baner i Darup ved Dyrskuepladsen.': 'Regular courts at PadelPit Roskilde and in summer also the club\'s own courts in Darup by Dyrskuepladsen.',
    'Medlemskab af PadelPit Roskilde uden gebyr': 'PadelPit Roskilde membership without a fee',
    'Som medlem af RTK er du også medlem hos PadelPit Roskilde uden at betale deres medlemsgebyr, og du booker baner til medlemspris. Det gælder, så længe aftalen med PadelPit Roskilde løber. Den gælder hele 2027 og forventes at fortsætte.':
      'As an RTK member you are also a member of PadelPit Roskilde without paying their membership fee, and you book courts at the member price. This applies as long as the agreement with PadelPit Roskilde runs. It covers all of 2027 and is expected to continue.',
    'Gratis adgang til udebanerne i Darup': 'Free access to the outdoor courts in Darup',
    'Book en bane i ForeningLet, klubbens medlemsapp, og spil med dine nye makkere, når det passer jer.': 'Book a court in ForeningLet, the club\'s member app, and play with your new partners whenever it suits you.',
    'Camps i ferierne': 'Camps in the school holidays',
    'I vinter-, påske- og efterårsferien, med delvis egenbetaling. For juniorerne og måske også for voksne.': 'In the winter, Easter and autumn holidays, partly paid by the participants. For juniors and perhaps also for adults.',
    'Et fællesskab, ikke et kursus': 'A community, not a course',
    'Du bliver en del af Roskilde Tennis Klub med alt, hvad det giver.': 'You become part of Roskilde Tennis Club with everything that comes with it.',
    'En flok venner holder om hinanden i solnedgangen': 'A group of friends with their arms around each other at sunset',
    'Fire på banen. Én bold.': 'Four on court. One ball.',
    'Og en ny flok at spille med hver uge.': 'And a new group to play with every week.',
    // Det er Roskilde Tennis Klub
    'Det er Roskilde Tennis Klub': 'This is Roskilde Tennis Club',
    'Tennis og padel i samme klub. Det bedste fra begge verdener.': 'Tennis and padel in the same club. The best of both worlds.',
    'I Roskilde Tennis Klub står tennis og padel på lige fod. De to sportsgrene hører naturligt sammen: i begge spiller man bolden over et net, og fodarbejde, timing og spilforståelse er det, der tæller. Meget af det, du lærer i den ene, kan du bruge i den anden, og mange får glæde af begge dele. Når de ligger i samme klub, deler de anlæg, frivillige og fællesskab, og du kan spille den ene om sommeren og den anden om vinteren, eller begge hele året.':
      'At Roskilde Tennis Club, tennis and padel are equals. The two sports belong naturally together: in both you play the ball over a net, and footwork, timing and reading the game are what count. Much of what you learn in one you can use in the other, and many people enjoy both. In the same club they share facilities, volunteers and community, and you can play one in summer and the other in winter, or both all year.',
    'Vi er en bred klub for hele familien, med et stærkt fællesskab, hvor nye er meget velkomne. Der er hold for børn og juniorer, motionister og konkurrencespillere, holdkampe og sociale arrangementer året rundt. Og medlemmerne hjælper selv med at gøre banerne klar til sæsonen.':
      'We are a broad club for the whole family, with a strong community where newcomers are very welcome. There are teams for children and juniors, recreational and competitive players, team matches and social events all year round. And the members help get the courts ready for the season themselves.',
    'anlæg i Roskilde': 'sites in Roskilde',
    'udendørs grusbaner til tennis': 'outdoor clay courts for tennis',
    'indendørs tennisbaner i RTK-hallen': 'indoor tennis courts in the RTK hall',
    'udendørs padelbaner med lys': 'outdoor padel courts with lights',
    'Centralt i byen ligger vores smukke gamle klubhus med 7 grusbaner.': 'In the centre of town is our beautiful old clubhouse with 7 clay courts.',
    'Darupvej ved Dyrskuepladsen': 'Darupvej by Dyrskuepladsen',
    '6 grusbaner, 2 padelbaner med lys og den nyrenoverede RTK-hal med 4 indendørs tennisbaner, omklædning og caféen Sporvognen.': '6 clay courts, 2 padel courts with lights and the newly renovated RTK hall with 4 indoor tennis courts, changing rooms and the café Sporvognen.',
    'Babolat og Racketlife': 'Babolat and Racketlife',
    'Klubbens officielle partnere. Proshoppen i RTK-hallen har udstyr fra Babolat, også til padel, og vi strenger ketsjere i klubben. Som medlem får du rabat hos Racketlife.':
      'The club\'s official partners. The pro shop in the RTK hall has Babolat equipment, also for padel, and we string rackets at the club. As a member you get a discount at Racketlife.',
    'Fællesskabet': 'The community',
    'Holdkampe, klubmesterskaber, sociale aftener og hjælp til at finde en makker. Det er her, de fleste finder deres nye spillevenner.': 'Team matches, club championships, social evenings and help finding a partner. This is where most people find their new playing friends.',
    'Læs mere på': 'Read more at',
    // Hold og priser
    'Hold og priser': 'Teams and prices',
    'Find dit hold': 'Find your team',
    'Første træning er onsdag 13. januar og lørdag 16. januar 2027. Holdene lægges primært efter alder, niveau og de dage, I kan. Det præcise tidspunkt får I sammen med pladsen. Alderen pr. 1. januar 2027 gælder både for hold og udemedlemskab, og 10 til 12-årige vælger selv mellem Junior og Junior+. Passer begge, så sig ja til begge, så finder vi det rigtige efter niveau. Børn og unge, der aldrig har prøvet padel, er meget velkomne. Voksenholdet kræver padelniveau 1,5.':
      'The first sessions are Wednesday 13 January and Saturday 16 January 2027. Teams are set mainly by age, level and the days you can play. You get the exact time together with your place. Age on 1 January 2027 applies both to teams and to outdoor membership, and 10 to 12-year-olds choose between Junior and Junior+. If both suit you, say yes to both and we will find the right one by level. Children and young people who have never tried padel are very welcome. The adult team requires padel level 1.5.',
    '8 til 12 år': 'Age 8 to 12', 'Junior': 'Junior', '1 time om ugen': '1 hour a week', 'pr. kvartal': 'per quarter',
    'Onsdag mellem 15 og 17.30 eller lørdag mellem 9 og 13': 'Wednesday between 3 and 5.30 pm or Saturday between 9 am and 1 pm',
    'Træner med hver gang: en lønnet træner og en frivillig hjælper': 'A coach every time: a paid coach and a volunteer helper',
    '8 til 10 spillere på 2 baner': '8 to 10 players on 2 courts',
    '10 til 17 år': 'Age 10 to 17', '1,5 time om ugen': '1.5 hours a week',
    'Onsdag mellem 15 og 19 eller lørdag mellem 9 og 13': 'Wednesday between 3 and 7 pm or Saturday between 9 am and 1 pm',
    'Træner med hver gang': 'A coach every time',
    'Delt i to aldersgrupper': 'Split into two age groups',
    '8 til 10 spillere på hvert hold': '8 to 10 players on each team',
    'Dygtige 16 og 17-årige kan efter aftale spille med de voksne': 'Skilled 16 and 17-year-olds can play with the adults by arrangement',
    '18 år og op': 'Age 18 and up', 'Voksen': 'Adult',
    'Onsdag mellem 17 og 19': 'Wednesday between 5 and 7 pm',
    'Træner med hver anden gang. De andre gange spiller I frit, fx americano med skiftende makkere. Sådan kan de fleste voksne bedst lide at spille padel.':
      'A coach every other time. The other times you play freely, e.g. americano with changing partners. That is how most adults like to play padel.',
    'Kræver padelniveau 1,5: du kender reglerne og grundslagene, kan serve og kan holde bolden i gang over nettet mindst fem gange med en makker i normalt tempo. Er du ikke der endnu, så se':
      'Requires padel level 1.5: you know the rules and the basic shots, can serve and can keep a rally going over the net at least five times with a partner at normal pace. If you are not there yet, see',
    'listen for nybegyndere': 'the list for beginners',
    'Lørdagshold, hvis der er interesse': 'Saturday team if there is interest',
    'Træningsafgiften betales pr. kalenderkvartal i ForeningLet, klubbens medlems- og betalingssystem. Man binder sig for et halvt år ad gangen. Første periode er januar til juni 2027. Vil du stoppe 30. juni, skal du sige op senest 31. marts. Derefter kan du opsige til udgangen af et kvartal med mindst 3 måneders varsel. Første kvartal koster fuld pris, selv om vi starter 13. januar. Når I får tildelt en plads, har I to dage til at betale. Ellers går pladsen videre til en anden på listen.':
      'The training fee is paid per calendar quarter in ForeningLet, the club\'s membership and payment system. You sign up for six months at a time. The first period is January to June 2027. If you want to stop on 30 June, you must cancel by 31 March at the latest. After that you can cancel at the end of a quarter with at least 3 months\' notice. The first quarter costs the full price even though we start on 13 January. When you are offered a place, you have two days to pay. Otherwise the place goes to someone else on the list.',
    'For at gå på et hold skal du være medlem af RTK. Er du ikke medlem i forvejen, skal du have et udemedlemskab oveni, altså et medlemskab af RTK med udendørs tennis: 144 kr. pr. kvartal (3 til 10 år), 214 kr. (11 til 24 år) eller 383 kr. (25 år og op) og et indmeldelsesgebyr på 250 kr. pr. person. Satserne gælder frem til generalforsamlingen i marts 2027. Udemedlemskabet giver også adgang til at spille tennis udendørs på klubbens to anlæg i Roskilde, og du får medlemskabet af PadelPit Roskilde og gratis adgang til udebanerne i Darup med.':
      'To join a team you must be a member of RTK. If you are not already a member, you also need an outdoor membership, i.e. an RTK membership with outdoor tennis: DKK 144 per quarter (age 3 to 10), DKK 214 (age 11 to 24) or DKK 383 (age 25 and up), plus a joining fee of DKK 250 per person. The rates apply until the annual general meeting in March 2027. The outdoor membership also lets you play outdoor tennis at the club\'s two sites in Roskilde, and it includes PadelPit Roskilde membership and free access to the outdoor courts in Darup.',
    'Se, hvad det koster i alt': 'See what it costs in total',
    'Eksempel på første kvartal for en, der ikke er medlem': 'Example of the first quarter for a non-member',
    'Barn på 9 år, Junior': 'Child aged 9, Junior', 'Barn på 11 år, Junior': 'Child aged 11, Junior',
    'Ung på 13 år, Junior+': 'Young person aged 13, Junior+', 'Voksen på 42 år': 'Adult aged 42',
    'Derefter pr. kvartal': 'After that, per quarter',
    'Eksempel på en familie, første kvartal': 'Example for a family, first quarter',
    'Voksen på 42 år og børn på 9 og 13 år': 'Adult aged 42 and children aged 9 and 13',
    'Depositum, som trækkes fra': 'Deposit, which is deducted',
    'Træning + udemedlemskab + indmeldelse. Depositummet på 500 kr. pr. spiller trækkes fra første kvartal. Er du allerede medlem, betaler du kun træningen. Der er ingen familierabat, så hver spiller betaler sin egen pris.':
      'Training + outdoor membership + joining fee. The DKK 500 deposit per player is deducted from the first quarter. If you are already a member, you only pay for the training. There is no family discount, so each player pays their own price.',
    // Her spiller vi
    'Her spiller vi': 'Where we play',
    'Inde hele året. Også ude om sommeren.': 'Indoors all year. Outdoors too in summer.',
    'Kort over Roskilde med PadelPit Roskilde på Københavnsvej (1) og klubbens udebaner på Darupvej ved Dyrskuepladsen (2)': 'Map of Roskilde with PadelPit Roskilde on Københavnsvej (1) and the club\'s outdoor courts on Darupvej by Dyrskuepladsen (2)',
    'Indendørs baner. Fra september til april træner alle hold her, undtagen i juleferien. Om sommeren er en del af træningen stadig her.': 'Indoor courts. From September to April all teams train here, except during the Christmas holidays. In summer part of the training is still here.',
    'Find vej': 'Directions',
    'RTK\'s baner i Darup (ved Dyrskuepladsen)': 'RTK\'s courts in Darup (by Dyrskuepladsen)',
    'Klubbens egne udendørs baner. Fra maj til august, undtagen sommerferien, træner en del af holdene her. Hvem der er ude, afhænger af holdene, og vi kan skifte, så alle får lidt ude og lidt inde. Som medlem spiller du gratis. Du booker banerne i ForeningLet, klubbens medlemsapp, som du får adgang til, når du er medlem.':
      'The club\'s own outdoor courts. From May to August, except the summer holidays, some of the teams train here. Who plays outdoors depends on the teams, and we may rotate so everyone gets some time outdoors and some indoors. As a member you play for free. You book the courts in ForeningLet, the club\'s member app, which you get access to when you are a member.',
    'Padeltræning indendørs. En spiller slår bolde fra kurven, mens en anden smasher på banen bagved': 'Indoor padel training. One player hits balls from the basket while another smashes on the court behind',
    'En junior returnerer bolden, mens træneren ser på, hos PadelPit Roskilde': 'A junior returns the ball while the coach watches, at PadelPit Roskilde',
    // Vi bygger det sammen
    'Et fælles projekt': 'A shared project',
    'Vi bygger det sammen': 'We build it together',
    'Vi er en klub, der bygger på frivillige. Det er derfor, vi kan holde prisen nede, så alle kan være med. Vi håber, at alle vil give en hånd, hvis de får plads. Det kan være spilleren selv, en forælder eller en anden i familien, og det behøver ikke være meget. Fortæl os i tilmeldingen, hvad I har lyst til at hjælpe med. Det tæller med, når vi sætter holdene.':
      'We are a club built on volunteers. That is why we can keep the price down so everyone can take part. We hope everyone will lend a hand if they get a place. It can be the player, a parent or someone else in the family, and it doesn\'t have to be much. Tell us in the registration what you would like to help with. It counts when we set the teams.',
    'Hjælpe ved arrangementer og camps': 'Help at events and camps',
    'Være hjælpetræner': 'Be an assistant coach',
    'Forælder på holdet som støtte for træneren': 'Parent on the team supporting the coach',
    'Kørsel og praktisk': 'Driving and practical tasks',
    'Foto og sociale medier': 'Photos and social media',
    'Sponsorer og netværk': 'Sponsors and network',
    'RTK Padelcircle, frivillige der løfter padel i klubben': 'RTK Padelcircle, volunteers who develop padel in the club',
    'Spillere og træner slår battene sammen over nettet hos PadelPit Roskilde': 'Players and coach tap rackets over the net at PadelPit Roskilde',
    'RTK, et stærkt fællesskab': 'RTK, a strong community',
    // Forhåndstilmelding
    'Forhåndstilmelding 2027': 'Pre-registration 2027',
    'Forhåndstilmeldingen åbner tirsdag 17. november kl. 10': 'Pre-registration opens Tuesday 17 November at 10 am',
    'Skriv jer op': 'Sign up',
    'Forhåndstilmeldingen åbner tirsdag 17. november kl. 10 og lukker 10. december 2026. Alle får svar senest 15. december. Du kan skrive flere spillere op på én gang, fx dig selv og dine børn. Der er et begrænset antal pladser, kun 8 til 10 på hvert hold. Når I har skrevet jer op, betaler I 500 kr. pr. spiller i depositum i ForeningLet inden for 48 timer. Voksne skal være på padelniveau 1,5. Er du voksen og helt ny, eller er du 60+ og vil spille i dagtimerne, så se':
      'Pre-registration opens Tuesday 17 November at 10 am and closes 10 December 2026. Everyone gets an answer by 15 December. You can sign up several players at once, e.g. yourself and your children. Places are limited, only 8 to 10 on each team. After signing up, you pay a DKK 500 deposit per player in ForeningLet within 48 hours. Adults must be at padel level 1.5. If you are an adult beginner, or 60+ and want to play during the day, see',
    'listerne uden depositum': 'the lists without a deposit',
    'Fra 17. november kl. 10': 'From 17 November, 10 am',
    'Nu': 'Now',
    'Skriv jer op her': 'Sign up here',
    'Spillere, dage og hvordan I vil give en hånd. Du får et tilmeldingsnummer, som vi bruger til at finde jeres betaling.': 'Players, days and how you would like to help. You get a registration number that we use to match your payment.',
    'Inden 48 timer': 'Within 48 hours',
    'Betal 500 kr. pr. spiller': 'Pay DKK 500 per player',
    'I ForeningLet, klubbens medlems- og betalingssystem, med MobilePay. Brug samme mail og mobilnummer som her, og skriv tilmeldingsnummeret. Betal gerne med det samme. Fristen er 48 timer, og er der ikke betalt inden da, tager vi tilmeldingen af listen.':
      'In ForeningLet, the club\'s membership and payment system, with MobilePay. Use the same email and mobile number as here, and enter the registration number. Please pay straight away. The deadline is 48 hours, and if payment has not been made by then, we remove the registration from the list.',
    '10. december': '10 December',
    'Vi sætter holdene': 'We set the teams',
    'Primært efter alder, niveau, dage og frivillighed.': 'Mainly by age, level, days and volunteering.',
    'Senest 15. december': 'By 15 December',
    'I får svar': 'You get an answer',
    'Får I plads, får I det præcise tidspunkt og har to dage til at betale første kvartal i ForeningLet. Depositummet trækkes fra. Ellers går pladsen videre til en anden på listen. Får I ikke plads, får I depositummet tilbage senest to uger efter svaret og kan komme på venteliste, hvis der bliver en plads senere. Siger I nej til en plads på en dag, I har valgt, beholder klubben depositummet.':
      'If you get a place, you get the exact time and have two days to pay the first quarter in ForeningLet. The deposit is deducted. Otherwise the place goes to someone else on the list. If you don\'t get a place, your deposit is refunded no later than two weeks after the answer, and you can go on a waiting list in case a place opens up later. If you turn down a place on a day you chose, the club keeps the deposit.',
    'I tvivl om holdet?': 'Not sure about the team?',
    'Se hold, tider og priser igen': 'See teams, times and prices again',
    'Skriv dit navn og din mail, så sender vi dig en mail tirsdag 17. november kl. 10, når forhåndstilmeldingen åbner. Du binder dig ikke til noget.': 'Enter your name and email and we will email you on Tuesday 17 November at 10 am when pre-registration opens. You are not committing to anything.',
    'Navn': 'Name', 'Mail': 'Email', 'navn@eksempel.dk': 'name@example.com',
    'Lad dette felt være tomt': 'Leave this field empty', 'Lad feltet stå tomt': 'Leave this field empty',
    'Jeg har læst,': 'I have read',
    'hvordan RTK bruger oplysningerne': 'how RTK uses the information',
    'Giv mig besked': 'Notify me',
    'Er du voksen og helt ny, eller er du 60+ og vil spille i dagtimerne?': 'Are you an adult beginner, or 60+ and want to play during the day?',
    'Listerne uden depositum': 'The lists without a deposit',
    'er åbne allerede nu.': 'are open now.',
    'Tak': 'Thank you',
    // Formularen
    '1. Spillerne': '1. The players',
    'Hvem skriver du op?': 'Who are you signing up?',
    'Mig selv': 'Myself', 'Mit barn': 'My child', 'Os begge': 'Both of us',
    '+ Tilføj en spiller mere': '+ Add another player',
    'Har du flere børn, eller skal du selv med, så skriv alle op her på én gang. Så skal du kun betale én gang.': 'If you have several children, or want to join yourself, sign everyone up here at once. Then you only pay once.',
    'Om dagene.': 'About the days.',
    'Onsdag træner Junior mellem 15 og 17.30, Junior+ mellem 15 og 19 og voksne mellem 17 og 19. Lørdag træner vi mellem 9 og 13. Hvilke hold der træner om lørdagen, afhænger af tilmeldingerne. Det præcise tidspunkt får I sammen med pladsen. Vælg gerne begge dage for hver spiller, hvis I kan, det øger chancen for en plads.':
      'On Wednesdays Junior trains between 3 and 5.30 pm, Junior+ between 3 and 7 pm and adults between 5 and 7 pm. On Saturdays we train between 9 am and 1 pm. Which teams train on Saturdays depends on the registrations. You get the exact time together with your place. Choose both days for each player if you can, as it increases the chance of a place.',
    'Videre': 'Next',
    '2. Kontakt og frivillighed': '2. Contact and volunteering',
    'Dit navn (forælder eller den, der skriver op)': 'Your name (parent or the person signing up)',
    'Mobil': 'Mobile', 'Er I medlem af RTK?': 'Are you a member of RTK?',
    'Ja': 'Yes', 'Nej': 'No', 'Ved ikke': 'Don\'t know',
    'Hvordan kan I give en hånd, hvis I får plads?': 'How could you lend a hand if you get a place?',
    'Vælg det, I har lyst til. Det behøver ikke være meget.': 'Choose what you would like. It doesn\'t have to be much.',
    'Kørsel og praktisk (bolde, baner i Darup)': 'Driving and practical tasks (balls, courts in Darup)',
    'Foto, sociale medier og kommunikation': 'Photos, social media and communication',
    'Være med i RTK Padelcircle, en gruppe frivillige, der vil løfte padel i klubben': 'Join RTK Padelcircle, a group of volunteers who want to develop padel in the club',
    'Banevedligehold': 'Court maintenance',
    'Hvem giver hånden?': 'Who lends the hand?',
    'Spilleren': 'The player', 'Forælder': 'Parent', 'Anden voksen': 'Another adult',
    'Hvor ofte, cirka?': 'Roughly how often?',
    'Et par gange pr. halvår': 'A couple of times every six months', 'Månedligt': 'Monthly', 'Ugentligt': 'Weekly',
    'Andet, eller fortæl lidt mere': 'Anything else, or tell us a bit more',
    'Fx noget I er gode til, eller et ønske til holdet': 'E.g. something you are good at, or a wish for the team',
    'Vi vil gerne give en hånd, hvis vi får plads': 'We would like to lend a hand if we get a place',
    'Fortæl mig om camps og andre tilbud, hvis der ikke er plads': 'Tell me about camps and other offers if there is no place',
    'Tilbage': 'Back',
    'Spiller 1': 'Player 1', 'Fjern': 'Remove',
    'Fødselsdato': 'Date of birth', 'Køn (valgfrit)': 'Gender (optional)', 'Vælg': 'Choose',
    'Pige eller kvinde': 'Girl or woman', 'Dreng eller mand': 'Boy or man', 'Ønsker ikke at oplyse': 'Prefer not to say',
    'Har spilleren prøvet padel?': 'Has the player tried padel?',
    'Aldrig': 'Never', 'Lidt': 'A little', 'Spiller jævnligt': 'Plays regularly',
    'Voksenholdet kræver padelniveau 1,5: du kender reglerne og grundslagene, kan serve og kan holde bolden i gang over nettet mindst fem gange med en makker i normalt tempo. Er du ikke der endnu, så vælg Aldrig. Så kommer du på listen for voksne nybegyndere uden depositum.':
      'The adult team requires padel level 1.5: you know the rules and the basic shots, can serve and can keep a rally going over the net at least five times with a partner at normal pace. If you are not there yet, choose Never. Then you go on the list for adult beginners without a deposit.',
    'Vil gerne prøve voksenholdet': 'Would like to try the adult team',
    'Erfaring og niveau': 'Experience and level',
    'Fx hvor længe og hvor tit du har spillet, niveau hvis du kender det, og andre sportsgrene med ketsjer eller bat': 'E.g. how long and how often you have played, your level if you know it, and other racket sports',
    'Hvilke dage kan spilleren?': 'Which days can the player play?',
    'Onsdag': 'Wednesday', 'Lørdag 9 til 13': 'Saturday 9 am to 1 pm',
    'Hvilket hold ønsker I? Vælg begge, hvis begge passer': 'Which team would you like? Choose both if both suit you',
    'Junior, 1 time, 595 kr.': 'Junior, 1 hour, DKK 595', 'Junior+, 1,5 time, 875 kr.': 'Junior+, 1.5 hours, DKK 875',
    'Prisen er pr. kvartal.': 'The price is per quarter.',
    'Vil du hellere spille på hverdage i dagtimerne? Se listen for': 'Would you rather play on weekdays during the day? See the list for',
    'Hold: Junior, 1 time om ugen': 'Team: Junior, 1 hour a week',
    'Hold: Junior+, 1,5 time om ugen': 'Team: Junior+, 1.5 hours a week',
    'Hold: Voksen, 1,5 time om ugen': 'Team: Adult, 1.5 hours a week',
    'Hold: Junior eller Junior+. Vælg ovenfor, hvilket hold I ønsker.': 'Team: Junior or Junior+. Choose above which team you would like.',
    'Hold: Junior eller Junior+. Vi finder det rigtige efter niveau.': 'Team: Junior or Junior+. We will find the right one by level.',
    'Hold: Junior+, 1,5 time om ugen. Vi ser på, om voksenholdet passer. Fortæl om dit niveau ovenfor.': 'Team: Junior+, 1.5 hours a week. We will see if the adult team suits you. Tell us about your level above.',
    'Voksenholdet kræver padelniveau 1,5. Du kommer på listen for voksne nybegyndere og betaler ikke depositum.': 'The adult team requires padel level 1.5. You go on the list for adult beginners and pay no deposit.',
    'Holdene er for spillere fra 8 år. Skriv til os under Spørg os nederst på siden, hvis I alligevel er interesserede.': 'The teams are for players from age 8. Write to us under Ask us at the bottom of the page if you are interested anyway.',
    // Fejl i formularerne
    'Skriv navn og fødselsdato på alle spillere.': 'Enter a name and date of birth for every player.',
    'Tjek fødselsdatoen på alle spillere.': 'Check the date of birth for every player.',
    'Vælg, hvor meget hver spiller har prøvet padel.': 'Choose how much each player has tried padel.',
    'Vælg mindst én dag.': 'Choose at least one day.',
    'Fortæl lidt om niveauet, når en spiller vil prøve voksenholdet.': 'Tell us a little about the level when a player wants to try the adult team.',
    'Skriv dit navn.': 'Enter your name.',
    'Skriv en mail, vi kan svare på.': 'Enter an email address we can reply to.',
    'Skriv en mail, vi kan sende beskeden til.': 'Enter an email address we can send the notice to.',
    'Skriv et dansk mobilnummer med 8 cifre.': 'Enter a Danish mobile number with 8 digits.',
    'Skriv et dansk mobilnummer med 8 cifre, eller lad feltet stå tomt.': 'Enter a Danish mobile number with 8 digits, or leave the field empty.',
    'Sæt flueben ved, at du har læst, hvordan RTK bruger oplysningerne.': 'Tick the box to confirm you have read how RTK uses the information.',
    'Skriv dit fødselsår med fire cifre. Listerne er for voksne.': 'Enter your year of birth with four digits. The lists are for adults.',
    'Seniorpadel (60+) er for dig, der er født i 1967 eller før. Er du voksen og helt ny, så vælg den anden liste.': 'Senior padel (60+) is for people born in 1967 or earlier. If you are an adult beginner, choose the other list.',
    'Vælg, hvor meget du har prøvet padel.': 'Choose how much you have tried padel.',
    'Skriv dit spørgsmål.': 'Write your question.',
    'Der er ingen forbindelse lige nu. Tjek internettet, og prøv igen om et øjeblik.': 'There is no connection right now. Check your internet and try again in a moment.',
    'Noget gik galt. Prøv igen.': 'Something went wrong. Please try again.',
    'Det tager lang tid. Prøv igen om et øjeblik.': 'This is taking a long time. Please try again in a moment.',
    'Sender …': 'Sending …',
    // Kvitteringen
    'Dit tilmeldingsnummer': 'Your registration number',
    'Kopiér': 'Copy', 'Kopieret': 'Copied', 'Kopiér selv': 'Copy it yourself',
    'Sidste trin: betal depositum': 'Last step: pay the deposit',
    'Betal gerne med det samme. Fristen er 48 timer, og er der ikke betalt inden da, tager vi tilmeldingen af listen og sender en mail om det.': 'Please pay straight away. The deadline is 48 hours, and if payment has not been made by then, we remove the registration from the list and send you an email about it.',
    'Skriv præcis dette i ForeningLet, så vi kan finde jeres betaling:': 'Enter exactly this in ForeningLet so we can match your payment:',
    'Tilmeldingsnummer': 'Registration number',
    'Betal i ForeningLet': 'Pay in ForeningLet',
    'Det tager et minut. Skriv navn, mail, mobil og tilmeldingsnummeret. Linket står også i den mail, du får.': 'It takes a minute. Enter name, email, mobile and the registration number. The link is also in the email you receive.',
    'Det sker nu': 'What happens now',
    'lukker forhåndstilmeldingen, og vi sætter holdene.': 'pre-registration closes and we set the teams.',
    'får I svar. Får I plads, får I det præcise tidspunkt og har to dage til at betale første kvartal i ForeningLet. Depositummet trækkes fra. Er I ikke medlemmer, melder I jer ind i ForeningLet samtidig.':
      'you get an answer. If you get a place, you get the exact time and have two days to pay the first quarter in ForeningLet. The deposit is deducted. If you are not members, you join in ForeningLet at the same time.',
    'Får I ikke plads': 'If you don\'t get a place',
    ', får I depositummet tilbage senest to uger efter svaret og kan komme på venteliste.': ', your deposit is refunded no later than two weeks after the answer, and you can go on a waiting list.',
    'Siger I nej': 'If you turn down',
    'til en plads på en dag, I har valgt, beholder klubben depositummet.': 'a place on a day you chose, the club keeps the deposit.',
    'Arrangementet i ForeningLet er ikke oprettet endnu. Du får linket på mail, så snart det er klar.': 'The ForeningLet event has not been created yet. You will get the link by email as soon as it is ready.',
    'er nu forhåndstilmeldt.': 'are now pre-registered.',
    'står på listen for voksne nybegyndere og skal ikke betale noget.': 'are on the list for adult beginners and pay nothing.',
    'På den liste er der intet at betale, og du binder dig ikke. Vi skriver til dig, når vi starter initiativet, eller hvis der bliver plads på et hold, du kan passe ind i. Du bestemmer selv, om du vil blive stående på listen eller af den. Har du spørgsmål eller vil af listen, så':
      'There is nothing to pay on that list, and you are not committing to anything. We will write to you when we start the initiative, or if a place opens up on a team that suits you. You decide whether to stay on the list or come off it. If you have questions or want to come off the list,',
    'står på listen for voksne nybegyndere og skal ikke betale noget. På den liste er der intet at betale, og du binder dig ikke. Vi skriver til dig, når vi starter initiativet, eller hvis der bliver plads på et hold, du kan passe ind i. Du bestemmer selv, om du vil blive stående på listen eller af den. Har du spørgsmål eller vil af listen, så':
      'are on the list for adult beginners and pay nothing. There is nothing to pay on that list, and you are not committing to anything. We will write to you when we start the initiative, or if a place opens up on a team that suits you. You decide whether to stay on the list or come off it. If you have questions or want to come off the list,',
    'skriv til os': 'write to us',
    'Vi sender en mail til': 'We will send an email to',
    'tirsdag 17. november kl. 10, når forhåndstilmeldingen åbner. Du får også en kort bekræftelse nu.': 'on Tuesday 17 November at 10 am when pre-registration opens. You will also get a short confirmation now.',
    // Listerne uden depositum
    'Lister uden depositum': 'Lists without a deposit',
    'Passer holdene ikke til dig lige nu?': 'Don\'t the teams suit you right now?',
    'Padel for voksne nybegyndere og Seniorpadel (60+) er ikke startet endnu. Skriv dig på listen, så vi kan se, hvor mange der vil være med. Bliver vi nok, starter vi initiativet, og så hører du fra os først. Det koster ikke noget at stå på listen, og du binder dig ikke. Du bestemmer selv, om du vil blive stående på listen eller af den.':
      'Padel for adult beginners and Senior padel (60+) have not started yet. Put your name on the list so we can see how many want to join. If there are enough of us, we start the initiative, and you will hear from us first. It costs nothing to be on the list, and you are not committing to anything. You decide whether to stay on the list or come off it.',
    'Voksen og helt ny': 'Adult beginners',
    'Du er ikke på padelniveau 1,5 endnu, fx fordi du aldrig eller næsten aldrig har spillet, og vil gerne i gang sammen med andre nybegyndere. Det er ikke startet endnu. Bliver vi nok, starter vi det.':
      'You are not at padel level 1.5 yet, e.g. because you have never or hardly ever played, and you would like to get started with other beginners. It has not started yet. If there are enough of us, we will start it.',
    'Skriv mig på listen': 'Put me on the list',
    'Seniorpadel (60+) i dagtimerne': 'Senior padel (60+) during the day',
    'Seniorpadel (60+)': 'Senior padel (60+)',
    'Du fylder 60 i 2027 eller er ældre og vil gerne træne og spille på hverdage om formiddagen og frem til kl. 15. Det er ikke startet endnu. Bliver vi nok, starter vi det.':
      'You turn 60 in 2027 or are older and would like to train and play on weekday mornings and until 3 pm. It has not started yet. If there are enough of us, we will start it.',
    'Hvilken liste?': 'Which list?', 'Fødselsår': 'Year of birth', 'Har du prøvet padel?': 'Have you tried padel?',
    'Vil du fortælle lidt mere? (valgfrit)': 'Would you like to tell us a bit more? (optional)',
    'Fx hvilke dage og tider der passer dig': 'E.g. which days and times suit you',
    'Du står nu på listen for Seniorpadel (60+) i dagtimerne.': 'You are now on the list for Senior padel (60+) during the day.',
    'Du står nu på listen for voksne nybegyndere.': 'You are now on the list for adult beginners.',
    'Du får en mail om det med det samme. Der er intet at betale, og du binder dig ikke. Vi skriver til dig, når vi starter initiativet, eller hvis der bliver plads på et hold, du kan passe ind i. Du bestemmer selv, om du vil blive stående på listen eller af den. Har du spørgsmål eller vil af listen, så':
      'You will get an email about it straight away. There is nothing to pay, and you are not committing to anything. We will write to you when we start the initiative, or if a place opens up on a team that suits you. You decide whether to stay on the list or come off it. If you have questions or want to come off the list,',
    // Spørgsmål og svar
    'Spørgsmål og svar': 'Questions and answers',
    'Skal man kunne spille i forvejen?': 'Do you need to be able to play already?',
    'Ikke som barn eller ung. Junior og Junior+ er også for nybegyndere. Voksenholdet kræver padelniveau 1,5. Det betyder, at du kender reglerne og grundslagene, kan serve og kan holde bolden i gang over nettet mindst fem gange med en makker i normalt tempo. Er du voksen og ikke der endnu, så skriv dig på':
      'Not as a child or young person. Junior and Junior+ are also for beginners. The adult team requires padel level 1.5. That means you know the rules and the basic shots, can serve and can keep a rally going over the net at least five times with a partner at normal pace. If you are an adult and not there yet, put your name on',
    'listen for voksne nybegyndere': 'the list for adult beginners',
    '. Det initiativ er ikke startet endnu. Bliver vi nok, starter vi det. Det koster ikke noget at stå på listen. Vi skriver til dig, når vi starter initiativet, eller hvis der bliver plads på et hold, du kan passe ind i. Du bestemmer selv, om du vil blive stående på listen eller af den.':
      '. That initiative has not started yet. If there are enough of us, we will start it. It costs nothing to be on the list. We will write to you when we start the initiative, or if a place opens up on a team that suits you. You decide whether to stay on the list or come off it.',
    'Hvornår kan vi skrive os op?': 'When can we sign up?',
    'Forhåndstilmeldingen åbner tirsdag 17. november kl. 10 og lukker 10. december kl. 23.59. Alle får svar senest 15. december. Vil du have en mail, når vi åbner for tilmeldinger, så skriv dig op under':
      'Pre-registration opens Tuesday 17 November at 10 am and closes 10 December at 11.59 pm. Everyone gets an answer by 15 December. If you want an email when sign-up opens, sign up under',
    '. Listerne uden depositum for voksne nybegyndere og Seniorpadel (60+) er åbne allerede nu.': '. The lists without a deposit for adult beginners and Senior padel (60+) are open now.',
    'Kan jeg skrive hele familien op på én gang?': 'Can I sign up the whole family at once?',
    'Ja. Skriv alle spillere op i samme tilmelding, så får I ét tilmeldingsnummer og betaler depositummet for alle på én gang i ForeningLet. Der er ingen familierabat, så hver spiller betaler sin egen pris.':
      'Yes. Sign up all players in the same registration, then you get one registration number and pay the deposit for everyone at once in ForeningLet. There is no family discount, so each player pays their own price.',
    'Skal jeg være medlem af RTK?': 'Do I need to be a member of RTK?',
    'Ikke for at skrive dig op. Men for at gå på et hold skal du være medlem. Får du plads, melder du dig ind i ForeningLet, og så følger medlemskabet af PadelPit Roskilde, gratis adgang til udebanerne i Darup og udendørs tennis med.':
      'Not to sign up. But to join a team you must be a member. If you get a place, you join in ForeningLet, and that includes PadelPit Roskilde membership, free access to the outdoor courts in Darup and outdoor tennis.',
    'Hvordan booker vi udebanerne i Darup?': 'How do we book the outdoor courts in Darup?',
    'I ForeningLet, klubbens medlemsapp. Du får adgang, når du er blevet medlem, og som medlem spiller du gratis.': 'In ForeningLet, the club\'s member app. You get access once you are a member, and as a member you play for free.',
    'Hvorfor et depositum?': 'Why a deposit?',
    'Så vi ved, hvem der er klar til at være med, og kan sætte holdene, før træningen starter i januar. Depositummet er 500 kr. pr. spiller og trækkes fra prisen, når I får plads.':
      'So we know who is ready to take part and can set the teams before training starts in January. The deposit is DKK 500 per player and is deducted from the price when you get a place.',
    'Hvad hvis vi ikke når at betale depositum?': 'What if we don\'t manage to pay the deposit?',
    'Betal gerne med det samme. Fristen er 48 timer. Er der ikke betalt inden da, tager vi tilmeldingen af listen og sender en mail om det. Så kan I skrive jer op igen.':
      'Please pay straight away. The deadline is 48 hours. If payment has not been made by then, we remove the registration from the list and send you an email about it. You can then sign up again.',
    'Hvorfor skal vi bruge samme mail og mobil i ForeningLet?': 'Why do we need to use the same email and mobile in ForeningLet?',
    'Tilmeldingen her og betalingen i ForeningLet er to systemer. Vi finder jeres betaling ud fra tilmeldingsnummeret, mailen og mobilnummeret. Bruger I de samme, er I sikre på at blive fundet.':
      'The registration here and the payment in ForeningLet are two systems. We match your payment using the registration number, the email and the mobile number. If you use the same ones, we are sure to find you.',
    'Hvordan bliver holdene sat?': 'How are the teams set?',
    'Primært efter alder, niveau, de dage I kan, og frivillighed. Alle får svar senest 15. december.': 'Mainly by age, level, the days you can play, and volunteering. Everyone gets an answer by 15 December.',
    'Kan vi vælge dag?': 'Can we choose the day?',
    'I fortæller, hvilke dage I kan. Hvilke hold der træner om lørdagen, afhænger af tilmeldingerne. Kan I begge dage, er chancen større. Det præcise tidspunkt får I sammen med pladsen.':
      'You tell us which days you can play. Which teams train on Saturdays depends on the registrations. If you can do both days, the chance is better. You get the exact time together with your place.',
    'Er der træner med hver gang?': 'Is there a coach every time?',
    'Juniorerne har træner med hver gang. Voksne har træner med hver anden gang og spiller frit de andre gange, fx americano med skiftende makkere. Sådan kan de fleste voksne bedst lide at spille padel, og det holder prisen nede.':
      'The juniors have a coach every time. Adults have a coach every other time and play freely the other times, e.g. americano with changing partners. That is how most adults like to play padel, and it keeps the price down.',
    'Skal vi hjælpe som frivillige?': 'Do we have to help as volunteers?',
    'Vi håber det. Det er en forventning, ikke et krav, og det behøver ikke være meget. Det kan være spilleren selv, en forælder eller en anden i familien. Læs mere under':
      'We hope so. It is an expectation, not a requirement, and it doesn\'t have to be much. It can be the player, a parent or someone else in the family. Read more under',
    'Hvad hvis vi ikke får plads?': 'What if we don\'t get a place?',
    'Så får I depositummet tilbage senest to uger efter, at I har fået svar. I kan komme på venteliste uden depositum, hvis der bliver en plads senere.':
      'Then your deposit is refunded no later than two weeks after you get the answer. You can go on a waiting list without a deposit in case a place opens up later.',
    'Hvad hvis vi får plads, men ikke vil alligevel?': 'What if we get a place but no longer want it?',
    'Er pladsen på en dag, I har sagt, at I kan, og siger I nej, beholder klubben depositummet. Det er det, depositummet er til, så vi kan regne med de pladser, vi giver. Får I tilbudt en dag, I ikke har valgt, og kan I ikke, får I depositummet tilbage.':
      'If the place is on a day you said you could play and you say no, the club keeps the deposit. That is what the deposit is for, so we can count on the places we give. If you are offered a day you did not choose and you can\'t make it, your deposit is refunded.',
    'Hvor længe binder vi os?': 'How long do we commit for?',
    'For et halvt år ad gangen. Første periode er januar til juni 2027. Vil I stoppe 30. juni, skal I sige op senest 31. marts. Træningen betales pr. kvartal i ForeningLet. Derefter kan I opsige til udgangen af et kvartal med mindst 3 måneders varsel.':
      'For six months at a time. The first period is January to June 2027. If you want to stop on 30 June, you must cancel by 31 March at the latest. Training is paid per quarter in ForeningLet. After that you can cancel at the end of a quarter with at least 3 months\' notice.',
    'Træner I i ferierne?': 'Do you train in the holidays?',
    'Ikke i skolernes ferier. Til gengæld kan der være camps i vinter-, påske- og efterårsferien med delvis egenbetaling.': 'Not in the school holidays. Instead there may be camps in the winter, Easter and autumn holidays, partly paid by the participants.',
    'Skal vi have eget udstyr?': 'Do we need our own equipment?',
    'Ja. Tag dit eget padelbat med og sko, der passer til banen, inde eller ude. Har du ikke et bat, kan du låne et til træningen, så langt de rækker. Du afleverer det igen, når træningen er slut. Proshoppen i RTK-hallen har et udvalg af padelbat og andet padeludstyr, og hos klubbens partner Racketlife får du rabat på padeludstyr som medlem.':
      'Yes. Bring your own padel racket and shoes suited to the court, indoors or outdoors. If you don\'t have a racket, you can borrow one for training while they last. You hand it back when training is over. The pro shop in the RTK hall has a selection of padel rackets and other padel equipment, and the club\'s partner Racketlife gives members a discount on padel equipment.',
    'Hvad er Seniorpadel (60+)?': 'What is Senior padel (60+)?',
    'Et initiativ, vi gerne vil starte for dig på 60 år og op, der vil spille på hverdage i dagtimerne frem til kl. 15. Det er ikke startet endnu. Skriv dig på':
      'An initiative we would like to start for people aged 60 and over who want to play on weekdays during the day until 3 pm. It has not started yet. Put your name on',
    'listen for Seniorpadel (60+)': 'the list for Senior padel (60+)',
    '. Bliver vi nok, starter vi det, og du hører fra os først. Det koster ikke noget at stå på listen, og du binder dig ikke. Du bestemmer selv, om du vil blive stående på listen eller af den.':
      '. If there are enough of us, we will start it, and you will hear from us first. It costs nothing to be on the list, and you are not committing to anything. You decide whether to stay on the list or come off it.',
    'Hvad sker der med vores oplysninger?': 'What happens to our information?',
    'De bruges kun til forhåndstilmeldingen, til at sætte holdene og til at finde jeres betaling. Kun Styregruppen, Padel Team og klubbens administratorer ser dem. Får I ikke plads, sletter vi dem senest 12 måneder efter, at holdene er sat. Læs mere i':
      'It is only used for pre-registration, to set the teams and to match your payment. Only the padel steering group, the Padel Team and the club\'s administrators see it. If you don\'t get a place, we delete it no later than 12 months after the teams are set. Read more in',
    'privatlivsteksten': 'the privacy notice',
    // Spørg os
    'Spørg os': 'Ask us',
    'Fik du ikke svar på dit spørgsmål?': 'Didn\'t find the answer to your question?',
    'Skriv det her, så går det direkte til klubbens sportschef. Du får svar på mail.': 'Write it here and it goes straight to the club\'s head of sport. You will get an answer by email.',
    'Du er også meget velkommen til at sende en almindelig mail til': 'You are also very welcome to send an ordinary email to',
    ', hvis du foretrækker det.': ' if you prefer.',
    'Mobil (valgfri)': 'Mobile (optional)',
    'Dit spørgsmål': 'Your question',
    'Fx om holdene, tiderne eller betalingen': 'E.g. about the teams, the times or payment',
    'Vi bruger kun dine oplysninger til at svare dig.': 'We only use your information to answer you.',
    'Læs hvordan': 'Read how',
    'Send spørgsmålet': 'Send your question',
    'Dit spørgsmål er sendt til klubbens sportschef. Du får svar på': 'Your question has been sent to the club\'s head of sport. You will get an answer at',
    // Partnere, Ace og bund
    'Officielle partnere': 'Official partners',
    'Racketlife (åbner i ny fane)': 'Racketlife (opens in a new tab)',
    'Spørg Ace om RTK padel': 'Ask Ace about RTK padel',
    'Svarer ud fra denne side og klubbens hjemmeside': 'Answers based on this page and the club website',
    'Luk Ace': 'Close Ace',
    'Hej, jeg er Ace. Spørg mig om holdene, priserne, tiderne eller forhåndstilmeldingen. Jeg kan også regne ud, hvad det koster for jer.':
      'Hi, I\'m Ace. Ask me about the teams, the prices, the times or pre-registration. I can also work out what it will cost you.',
    'Hvad koster det samlet for et barn på 11 år?': 'What is the total cost for a child aged 11?',
    'Hvilket hold passer til mit barn?': 'Which team suits my child?',
    'Hvad sker der med depositummet?': 'What happens to the deposit?',
    'Ace er en AI og kan tage fejl. Skriv ikke navne eller andre personlige oplysninger. Er du i tvivl, så brug':
      'Ace is an AI and can make mistakes. Don\'t write names or other personal information. If in doubt, use',
    'Skriv dit spørgsmål': 'Write your question',
    'Dit spørgsmål til Ace': 'Your question for Ace',
    'Send': 'Send',
    'Ace tænker': 'Ace is thinking',
    'Prøv igen': 'Try again',
    'Skriv til os': 'Write to us',
    'Se listerne uden depositum': 'See the lists without a deposit',
    'Ace kan ikke svare lige nu.': 'Ace can\'t answer right now.',
    'Ace kunne ikke svare lige nu. Prøv igen om et øjeblik, eller skriv til os.': 'Ace couldn\'t answer right now. Try again in a moment, or write to us.',
    '· Padel i samarbejde med PadelPit Roskilde': '· Padel in partnership with PadelPit Roskilde',
    'Testversion. Data er opdigtede.': 'Test version. Data is made up.',
    'Privatliv': 'Privacy',
    'Der er en ny version af Mit RTK.': 'There is a new version of Mit RTK.',
    'Opdater': 'Update',
    'Padel hele året i Roskilde Tennis Klub · Forhåndstilmelding 2027': 'Padel all year at Roskilde Tennis Club · Pre-registration 2027',
    // Fejlbeskeder fra motoren (moduler/padel_venteliste.gs og ace_padelside.gs)
    'Ace er ikke slået til på siden endnu. Brug Spørg os nederst på siden.': 'Ace is not switched on for this page yet. Use Ask us at the bottom of the page.',
    'Ace har fået mange spørgsmål i dag. Prøv igen i morgen, eller brug Spørg os nederst på siden.': 'Ace has had a lot of questions today. Try again tomorrow, or use Ask us at the bottom of the page.',
    'Ace kan ikke svare lige nu. Prøv igen om lidt, eller brug Spørg os nederst på siden.': 'Ace can\'t answer right now. Try again shortly, or use Ask us at the bottom of the page.',
    'Ace kan ikke svare lige nu. Prøv igen om lidt.': 'Ace can\'t answer right now. Try again shortly.',
    'Ace kan ikke svare lige nu. Prøv igen senere.': 'Ace can\'t answer right now. Try again later.',
    'Ace har travlt lige nu. Prøv igen om lidt.': 'Ace is busy right now. Try again shortly.',
    'Ace kunne ikke svare. Prøv at skrive spørgsmålet på en anden måde.': 'Ace couldn\'t answer. Try asking the question in a different way.',
    'Der er kommet mange tilmeldinger fra din mail. Prøv igen om en time.': 'Many registrations have come from your email. Try again in an hour.',
    'Der er travlt lige nu. Prøv igen om lidt.': 'It\'s busy right now. Try again shortly.',
    'Du har sendt mange spørgsmål. Prøv igen om en time.': 'You have sent a lot of questions. Try again in an hour.',
    'Forhåndstilmeldingen er lukket. Skriv dig på listerne uden depositum, så hører du fra os.': 'Pre-registration is closed. Put your name on the lists without a deposit and you will hear from us.',
    'Forhåndstilmeldingen er åben. Skriv jer op her på siden.': 'Pre-registration is open. Sign up here on the page.',
    'Forhåndstilmeldingen åbner tirsdag 17. november kl. 10. Skriv dig op, så får du en mail, når vi åbner for tilmeldinger.': 'Pre-registration opens Tuesday 17 November at 10 am. Sign up for an email when sign-up opens.',
    'Genindlæs siden og prøv igen.': 'Reload the page and try again.',
    'Holdene er for spillere fra 8 år.': 'The teams are for players from age 8.',
    'Skriv mindst én spiller op.': 'Sign up at least one player.',
    'Spørgsmålet kunne ikke sendes. Prøv igen om lidt.': 'The question could not be sent. Try again shortly.',
    'Vælg en liste.': 'Choose a list.',
    'Forbindelsen blev afbrudt undervejs. Prøv igen.': 'The connection was interrupted. Please try again.',
    'Ugyldig forespørgsel': 'Invalid request',
    'Ukendt handling': 'Unknown action'
  };

  // Tekster med navne, tal og beløb
  var komma = function (s) { return s.replace(/(\d)\.(\d{3})/g, '$1,$2'); };
  var MOENSTRE = [
    [/^Spiller (\d+)$/, function (m) { return 'Player ' + m[1]; }],
    [/^Hvilke dage kan (.+)\?$/, function (m) { return 'Which days can ' + m[1] + ' play?'; }],
    [/^Tak, (.+?)(\.?)$/, function (m) { return 'Thank you, ' + m[1] + m[2]; }],
    [/^Vælg mindst én dag for (.+)\.$/, function (m) { return 'Choose at least one day for ' + m[1] + '.'; }],
    [/^Vælg, om (.+) skal på Junior, Junior\+ eller begge\.$/, function (m) { return 'Choose whether ' + m[1] + ' should go on Junior, Junior+ or both.'; }],
    [/^Højst (\d+) spillere på én tilmelding\.$/, function (m) { return 'At most ' + m[1] + ' players in one registration.'; }],
    [/^Du har stillet (\d+) spørgsmål i dag\. Prøv igen i morgen, eller brug Spørg os nederst på siden\.$/, function (m) { return 'You have asked ' + m[1] + ' questions today. Try again tomorrow, or use Ask us at the bottom of the page.'; }],
    [/^Seniorpadel \(60\+\) er for dig, der er født i (\d+) eller før\. Er du voksen og helt ny, så vælg den anden liste\.$/, function (m) { return 'Senior padel (60+) is for people born in ' + m[1] + ' or earlier. If you are an adult beginner, choose the other list.'; }],
    [/^(\d+) spillere? × 500 kr\. = ([\d.]+) kr\.$/, function (m) { return m[1] + (m[1] === '1' ? ' player' : ' players') + ' × DKK 500 = DKK ' + komma(m[2]); }],
    [/^([\d.]+(?: [+×] [\d.]+)+) = ([\d.]+) kr\.$/, function (m) { return komma(m[1]) + ' = DKK ' + komma(m[2]); }],
    [/^([\d.]+) kr\.$/, function (m) { return 'DKK ' + komma(m[1]); }]
  ];

  function oversaet(da) {
    var n = da.replace(/\s+/g, ' ').trim();
    if (!n) return null;
    if (Object.prototype.hasOwnProperty.call(EN, n)) return EN[n];
    for (var i = 0; i < MOENSTRE.length; i++) { var m = MOENSTRE[i][0].exec(n); if (m) return MOENSTRE[i][1](m); }
    return null;
  }
  var ATTR = ['placeholder', 'aria-label', 'alt', 'title'];
  var ORIG = new WeakMap(); // tekstnode eller element -> den danske tekst
  var skifter = false;
  function sprog() { return (window.RTK_SPROG && window.RTK_SPROG.sprog) || 'da'; }

  function tekstnode(t, en) {
    if (!t.parentNode || /^(SCRIPT|STYLE|TEXTAREA)$/.test(t.parentNode.nodeName)) return;
    if (t.parentNode.closest && t.parentNode.closest('.pa-mig')) return; // det, man selv har skrevet til Ace, røres ikke
    if (en) {
      var da = ORIG.has(t) ? ORIG.get(t) : t.data;
      var ny = oversaet(da);
      if (ny === null) return;
      var lead = /^\s*/.exec(da)[0], trail = /\s*$/.exec(da)[0];
      ORIG.set(t, da);
      if (t.data !== lead + ny + trail) t.data = lead + ny + trail;
    } else if (ORIG.has(t)) {
      if (t.data !== ORIG.get(t)) t.data = ORIG.get(t);
      ORIG.delete(t);
    }
  }
  function element(el, en) {
    var gemt = ORIG.get(el) || {};
    ATTR.forEach(function (a) {
      if (!el.hasAttribute || !el.hasAttribute(a)) return;
      if (en) {
        var da = gemt[a] !== undefined ? gemt[a] : el.getAttribute(a), ny = oversaet(da);
        if (ny === null) return;
        gemt[a] = da; if (el.getAttribute(a) !== ny) el.setAttribute(a, ny);
      } else if (gemt[a] !== undefined) { el.setAttribute(a, gemt[a]); delete gemt[a]; }
    });
    if (en) ORIG.set(el, gemt);
    // Links til privatlivsteksten følger sproget
    if (el.nodeName === 'A' && /privatliv\.html/.test(el.getAttribute('href') || '')) el.setAttribute('href', el.getAttribute('href').replace(/sprog=(da|en)/, 'sprog=' + (en ? 'en' : 'da')));
  }
  function gennem(rod, en) {
    if (!rod) return;
    if (rod.nodeType === 3) { tekstnode(rod, en); return; }
    if (rod.nodeType !== 1) return;
    element(rod, en);
    var w = document.createTreeWalker(rod, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT), n;
    while ((n = w.nextNode())) { if (n.nodeType === 3) tekstnode(n, en); else element(n, en); }
  }
  function anvend() {
    var en = sprog() === 'en';
    skifter = true;
    gennem(document.body, en);
    var t = ORIG.get(document) || document.title;
    if (en) { ORIG.set(document, t); var nt = oversaet(t); if (nt) document.title = nt; }
    else if (ORIG.has(document)) { document.title = ORIG.get(document); ORIG.delete(document); }
    skifter = false;
  }
  window.PADEL_EN = { oversaet: oversaet, anvend: anvend, ordbog: EN, L: function (da, en) { return sprog() === 'en' ? en : da; } };

  function start() {
    anvend();
    document.addEventListener('sprog', anvend);
    new MutationObserver(function (ms) {
      if (skifter || sprog() !== 'en') return;
      skifter = true;
      ms.forEach(function (m) {
        if (m.type === 'characterData') tekstnode(m.target, true);
        else if (m.type === 'attributes') element(m.target, true);
        else m.addedNodes.forEach(function (x) { gennem(x, true); });
      });
      skifter = false;
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTR });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

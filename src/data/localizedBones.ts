// Localized bone names and texts migrated from the original MedAnatomy 3D
// project (locals.js). English content lives in bones.ts.
// Keys are BoneInfo ids. "foot" is an overview text shared by all foot groups.

import type { LocalizedLang } from "./i18n";

export type LocalizedBoneText = { name: string; paragraphs: string[] };

export const localizedBoneTexts: Record<LocalizedLang, Record<string, LocalizedBoneText>> = {
  "fi": {
    "frontal": {
      "name": "Otsaluu",
      "paragraphs": [
        "Otsaluu on pariton luu, joka muodostaa osan kalloa. Otsaluu koostuu kuudesta osasta. Sen tärkein tehtävä on suojella otsalohkoja."
      ]
    },
    "parietal": {
      "name": "Päälaenluu",
      "paragraphs": [
        "Päälaenluut (lat. os parietale) ovat kaksi luuta kallossa, jotka muodostavat pääkallon sivut ja katon. Molemmat luut ovat noin nelikulmion muotoisia."
      ]
    },
    "temporal": {
      "name": "Ohimoluu",
      "paragraphs": [
        "Ohimoluu (lat. os temporale) kuuluu kallon luihin, ja se sijaitsee kallon sivuilla sulkien sisäänsä korvakäytävän, välikorvan ja sisäkorvan. Ohimoluu muodostuu kolmesta toisiinsa liittyneestä osasta: pars squamosa, ohimoluun kallio-osa (pars petrosa) ja pars tympanica. Pars squamosan uloke, processus zygomaticus, kiinnittyy otsaluun samannimiseen rakenteeseen muodostaen silmän ympärille silmäkaaren, arcus zygomaticuksen. Lisäksi siinä on nivelpinta alaleuan luuta varten. Välikorva ja sisäkorva sijaitsevat pars petrosan onteloiden sisällä.",
        "Korvakäytävää puolestaan ympäröi pars tympanica. Ohimoluu on parillinen luu eli niitä on kaksi, vasen ja oikea."
      ]
    },
    "occipital": {
      "name": "Takaraivoluu",
      "paragraphs": [
        "(lat. os occipitale) kuuluu kallon luihin (ossa cranii) ja se koostuu kolmesta yhteen liittyneestä osasta. Pars basilaris sijaitsee alimmaisena ja sen alaosassa on atlaksen kanssa artikuloiva condylus occipitalis. Pars lateralis sijaitsee pars basilariksen molemminpuolin ja siinä oleva uloke, processus paracondylaris, toimii pään lihasten kiinnittymiskohtana. Squama occipitalis sijaitsee ylimpänä takaraivoluussa ja sen yläosassa on palpoitavissa oleva kyhmy, crista nuchae. Kaikki kolme takaraivoluun osaa osallistuvat niska-aukon (foramen magnum) muodostamiseen."
      ]
    },
    "maxilla": {
      "name": "Yläleukaluu",
      "paragraphs": [
        "Yläleuka (lat. maxilla) koostuu kahdesta, vasemmasta ja oikeasta, yläleuanluusta (lat. os maxillaris). Ylähampaat ovat kiinni yläleukaluissa.",
        "Suurimmat nenän sivuonteloista, vasen ja oikea poskiontelo (lat. sinus maxillaris), sijaitsevat yläleukaluissa.Yläleuka jää usein nykyisin pienemmäksi pehmeämmän ravinnon vuoksi, ja syntyy purentavirheitä. Toinen syy yläleuan pieneksi jäämiseen voi olla hengittäminen suun kautta. Kitarisojen poisto voi auttaa nenähengitystä ja näin edistää yläleuan kasvua."
      ]
    },
    "mandible": {
      "name": "Alaleukaluu",
      "paragraphs": [
        "Alaleuanluu (mandibula) on selkäjänteisten luu, johon alahampaat ovat kiinnittyneet. Rungon takaa suuntautuvat ylöspäin alaleukaluun haarat. Vasen ja oikea yläleuanluu sijaitsevat alaleuanluuta vasten niveltymättä siihen. Ihmisellä alaleuan kärjessä on leukakyhmy. Alaleuanluu niveltyy korvakäytävien lähellä ohimoluihin. Kyseiset leukanivelet liikkuvat suuta aukoessa."
      ]
    },
    "cervical-vertebrae": {
      "name": "Kaulanikama",
      "paragraphs": [
        "Selkäranka jaetaan kolmeen osaan: kaularanka, rintaranka (yläselkä) ja lanneranka (alaselkä). Lannerangan jatkeena on risti- ja häntäluu. Selkäranka rakentuu nikamista, kaularangassa on 7, rintarangassa 12 ja lannerangassa 5 nikamaa."
      ]
    },
    "thoracic-vertebrae": {
      "name": "Rintanikama",
      "paragraphs": [
        "Rintanikama on yksi selkärangan osista, tarkemmin sanottuna rintarangan eli thorakaalisen osan nikama. Ihmisellä rintaranka koostuu yleensä kahdesta­toista nikamasta, jotka muodostavat keskiosan selkärangasta. Rintanikamat kiinnittyvät kylkiluihin ja tukevat rintakehää, suojaten sydäntä ja keuhkoja sekä mahdollistavat selän ja vartalon liikkeet."
      ]
    },
    "lumbar-vertebrae": {
      "name": "Lanneranka",
      "paragraphs": [
        "Lanneranka on selkärangan alaosa, eli yleensä viisi nikamaa, jotka muodostavat alaselän osan. Lannerangan nikamat ovat suurempia kuin rinta- ja kaulanikamat, koska ne kantavat suurimman osan kehon painosta. Ne tukevat vartaloa, mahdollistavat selän taivutukset ja kiertoliikkeet."
      ]
    },
    "sacrum": {
      "name": "Ristiluu",
      "paragraphs": [
        "Ristiluu (lat. os sacrum) koostuu viidestä yhteen sulautuneesta ristinikamasta. Se muodostaa yhdessä lonkkaluun kanssa luisen lantiorenkaan. Yläosastaan ristiluu niveltyy alimpaan lannenikamaan, sivuilta lonkkaluihin ja alhaalta häntäluuhun. Ristiluun tasolla ei ole enää selkäydintä, mutta monet selkäydinhermojen juuret kulkevat sen sisällä olevassa ristiluukanavassa. Ristiluu on vahva luu, ja se murtuu harvoin. Murtumisen syinä on yleensä liikenneonnettomuus tai voimakas isku suoraan luuhun.",
        "Nimensä ristiluu on saanut hevosen ristiluusta, joka irrotettuna ja pystyyn nostettuna muistuttaa krusifiksia.",
        "Ristiluun tienoota kutsutaan ristiseläksi."
      ]
    },
    "sternum": {
      "name": "Rintalasta",
      "paragraphs": [
        "Rintalasta Rintalasta (sternum) on pitkä ja litteä luu, joka sijaitsee keskellä rintakehää. Kylkiluut kiinnittyvät siihen suoraan kylkirustojen avulla (costae sternales). Osa kylkiluista kiinnittyy rintalastaan kostaalisen kaaren avulla, joka muodostuu kun kylkiluiden rusto-osat yhtyvät (costae asternales). Ihmisellä kaksi alinta ja koiralla alin kylkiluu eivät ole yhteydessä rintalastaan (costae fluctuantes). Rintalasta muodostuu suuremmasta, litteästä rintalastan rungosta (corpus sterni) sekä kolmiomaisesta osasta sen yläosassa, rintalastan kahvasta (manubrium sterni), joka on hyvin kehittynyt niillä eläinlajeilla, joilla on myös hyvin kehittyneet solisluut. Molemmat solisluut niveltyvät tähän kolmiomaiseen osaan.",
        "Lisäksi isot rintalihakset kiinnittyvät osaksi siihen. Rintalastan alaosassa on kapea miekkalisäke (processus xiphoideus).",
        "Rintalastasta voidaan ottaa luuydinnäyte rintalastapiston eli sternaalipunktion avulla. Näyte otetaan yleensä rintalastan kahvasta."
      ]
    },
    "ribs": {
      "name": "Kylkiluu",
      "paragraphs": [
        "Kylkiluut (lat. costa, monikossa costae) ovat luita, jotka osallistuvat rintakehän muodostamiseen. Kylkiluiden tehtävä on suojella rintaontelon elimiä."
      ]
    },
    "clavicle": {
      "name": "Solisluu",
      "paragraphs": [
        "Solisluu eli klavikula (lat. clavicula) kuuluu yläraajan luihin ja se muodostaa hartiakaaren yhdessä lapaluun kanssa. Solisluu kiinnittyy rintalastan yläosaan rintalasta-solisluunivelen (lat. articulatio sternoclavicularis) välityksellä. Lapaluuhun solisluu niveltyy olkalisäke-solisluunivelessä (lat. articulatio acromioclavicularis). Solisluu murtuu ja katkeaa herkästi."
      ]
    },
    "scapula": {
      "name": "Lapaluu",
      "paragraphs": [
        "Lapaluu (lat. scapula) on hartian luihin kuuluva luu. Se on kolmikulmainen litteä luu, joka sijaitsee selässä kylkiluiden takana ja niveltyy solisluuhun sekä olkaluuhun.",
        "Lapaluu toimii useamman yläraajaa liikuttavan lihaksen lähtöalueena."
      ]
    },
    "humerus": {
      "name": "Olkaluu",
      "paragraphs": [
        "Olkaluu (lat. humerus) on olkavarren ainoa luu. Yläpäästään se rajoittuu olkaniveleen ja alapäästään kyynärniveleen. Olkaluun olkaniveleen osallistuvassa osassa eli sen yläpäässä on nivelrustoa puolipallon muotoisella alueella. Kyynärniveleen osallistuvassa luun alapäässä on kyynärluuta vastaava olkaluun tela ja värttinäluuta vastaava olkaluun värttinänasta.",
        "Olkaluun anatominen vastine jalassa on reisiluu.",
        "Mahdollisia olkaluun ongelmia ovat olkaluun murtuma ja olkaluun sijoiltaanmeno."
      ]
    },
    "radius": {
      "name": "Värttinäluu",
      "paragraphs": [
        "Värttinäluu (lat. radius) on toinen kyynärvarren kahdesta luusta. Se sijaitsee peukalon puolella ja muodostaa yhdessä kyynärluun kanssa kyynärvarren. Ihmisellä ja lihansyöjillä näiden kahden luun välissä oleva luuvälikalvo tekee niistä yhden kokonaisuuden. Kyynär- ja värttinäluun kiertyminen toistensa ympäri mahdollistaa niin sanotun avaimenkiertoliikkeen.",
        "Sialla luut ovat kiinni toisissaan tiiviillä sidekudoksella, joka ei salli kovin suurta kyynärvarren kiertoliikettä. Märehtijöillä ja hevosella luut ovat luutuneet toisiinsa kiinni."
      ]
    },
    "ulna": {
      "name": "Kyynärluu",
      "paragraphs": [
        "Kyynärluu (lat. ulna) on pikkusormen puolella sijaitseva, ranteen suuntaan kapeneva kyynärvarren luu.",
        "Kyynärluun yhdistää vieressä sijaitsevaan värttinäluuhun niiden välissä kulkeva luuvälikalvo. Kyynärluu muodostaa yhdessä värttinäluun ja olkaluun kanssa kyynärnivelen (articulatio cubiti), joka on toiminnaltaan kaksiakselinen eli mahdollistaa koukistus/ojennus- ja kiertoliikkeen."
      ]
    },
    "hand-phalanges": {
      "name": "Sormien luut",
      "paragraphs": [
        "Sormien luut ovat luita, jotka muodostavat sormien luisen tukirangan. Ihmisen kaikissa sormissa on kolme luuta paitsi peukalossa, jossa on vain kaksi.",
        "Sormiluut ovat sormen tyvijäsen (lat. phalanx proximalis), sormen keskijäsen (phalanx media, puuttuu peukalosta) sekä sormen kärkijäsen (phalanx distalis). Sormiluut ovat pitkulaisia, ja niiden osia ovat tyvi (basis) proksimaalisesti, pää (caput) distaalisesti ja näiden välissä runko (corpus)."
      ]
    },
    "hip-bone": {
      "name": "Lonkkaluut",
      "paragraphs": [
        "Lonkkaluu (lat. os coxae) on suuri, litteä ja epäsäännöllisen muotoinen luu, joka on osa luista lantiorengasta. Oikean- ja vasemmanpuoleinen lonkkaluu muodostavat yhdessä lantion sivu- ja etuseinät."
      ]
    },
    "femur": {
      "name": "Reisiluu",
      "paragraphs": [
        "Reisiluu (lat. femur) on ihmiskehon pisin ja vahvin luu. Se sijaitsee lonkkanivelen ja polvinivelen välissä. Reisiluun anatominen vastine eturaajassa on olkaluu.",
        "Reisiluun yläpään pallomainen osa, jossa on lonkkamaljaan niveltyvä nivelpinta on nimeltään reisiluun pää (caput femoris). Se pää kiinnittyy reisiluun varteen ohuehkolla reisiluunkaulalla (collum femoris), joka on reisiluun helpoiten murtuva osa varsinkin vanhuksilla. Reisiluun yläosassa lateraalisesti reisiluun päähän nähden sijaitsee iso sarvennoinen (trochanter major), hyvin tuntuva luu-uloke, johon monien pakaranseudun lihasten jänteet kiinnittyvät. Reisiluun yläosan takapinnalla lihasten peitossa puolestaan sijaitsee toinen luu-uloke, pieni sarvennoinen (trochanter minor), johon kiinnittyy lanne-suoliluulihas (musculus iliopsoas) jänne. Kolmas samankaltainen uloke on kolmas sarvennoinen (trochanter tertius), joka esiintyy toisinaan pienen sarvennoisen korkeudella reisiluun takapinnalla ja johon kiinnittyy osa isosta pakaralihaksesta (musculus gluteus maximus)."
      ]
    },
    "patella": {
      "name": "Polvilumpio",
      "paragraphs": [
        "Polvilumpio (lat. patella) on kolmionmuotoinen luu, joka sijaitsee nelipäisen reisilihaksen jänteessä. Se liikkuu pitkin reisiluun alaosan etupintaa polven koukistuessa ja ojentuessa. Polvilumpio yhdistää nelipäisen reisilihaksen jänteet yhdellä alapuolisella jänteellä sääriluuhun. Kyseisiä jänteitä tarvitaan jalan ojentamiseen."
      ]
    },
    "tibia": {
      "name": "Sääriluu",
      "paragraphs": [
        "Sääriluu (lat. tibia) on suurempi kahdesta säären luusta. Sääriluu niveltyy yläpäästään reisiluuhun (femur) ja alapäästään telaluuhun (talus). Sääriluu niveltyy myös ulkosivullaan kulkevaan pohjeluuhun (fibula)."
      ]
    },
    "fibula": {
      "name": "Pohjeluu",
      "paragraphs": [
        "Pohjeluu (lat. fibula) on ohuempi kahdesta säären luusta. Se sijaitsee takaraajan (ihmisellä alaraajan) lateraalisella puolella sääriluun (tibia) vieressä siihen niveltyen.",
        "Luiden väliin jää vaihtelevan kokoinen aukko (spatium interossium cruris), jossa kulkee luut toisiinsa sitova sidekudoskalvo (membrana interossea cruris). Pohjeluu sijaitsee alempana kuin sääriluu eikä näin ollen kiinnity reisiluuhun (femur). Naudalla ja pienillä märehtijöillä pohjeluu on surkastunut lähes kokonaan, mutta hevosella vain osittain. Nilkkaluista pohjeluu niveltyy telaluuhun (talus), mutta kiinnittyy nivelsiteillä myös kantaluuhun (calcaneus)."
      ]
    },
    "foot": {
      "name": "Jalkaterän luut",
      "paragraphs": [
        "Jalkaterän luut muodostavat koko jalkaterän luurangon. Ne sisältävät nilkan luut, jalkapöydän luut ja varpaiden luut. Jalkaterän luut tukevat kehon painoa, mahdollistavat kävelyn, juoksun ja tasapainon säätelyn."
      ]
    }
  },
  "ua": {
    "frontal": {
      "name": "Лобова кістка",
      "paragraphs": [
        "Ло́бна кістка також лобова́ кістка (лат. os frontale) — одна чи декілька кісток мозкового черепа. Вони з'єднуються з носовими кістками спереду, слізною і заочними кістками по боках, тім'яними ззаду. У більшості тварин лобні кістки парні, тоді як у представників роду Homo вони формують непарну, зрослу структуру."
      ]
    },
    "parietal": {
      "name": "Тім'яна кістка",
      "paragraphs": [
        "Тім'яна́ кістка (лат. os parietale) — парна кістка мозкового черепа. Має вигляд чотирикутної пластинки, посередині кістка має тім'яний горб (tuber parietale). Між тім'яними горбами міряють ширину мозкового черепа, вони відповідають антропометричним тім'яним точкам (euryon).",
        "Тім'яні кістки з'єднуються між собою, утворюючи сагітальний шов (sutura sagittalis), розташований якраз у сагітальній площині людського тіла. Також вони з'єднуються з іншими черепними кістками:",
        "З лобовою кісткою — вінцевим швом (sutura coronalis). У місці сходження сагітального і вінцевого швів у новонароджених розташовується переднє тім'ячко.",
        "З обох боків зі скроневими кістками — тім'яно-соскоподібним (sutura parietomastoidea) і лускатим (sutura squamosa) швами.",
        "З потиличною — лямбдоподібним швом (sutura lambdoidea).",
        "З обох боків зі клиноподібною кісткою — клиноподібно-тім'яним швом (sutura sphenoparietalis)",
        "Поверхня склепіння черепа над тім'яними кістками називається тім'яною ділянкою (regio parietalis)."
      ]
    },
    "temporal": {
      "name": "Скронева кістка",
      "paragraphs": [
        "Скроне́ва кістка (лат. os temporale) — парна кістка мозкового черепа, що входить до складу основи бічної стінки мозкового черепа, розташовується між клиноподібною, тім'яною і потиличною кістками.",
        "Загальний опис",
        "Складається з луски, барабанної частини, соскоподібної частини і пірамідки, що утворює основу черепа. Луска ззовні гладенька. Від луски відходить виличний відросток (processus zygomaticus), який з'єднується з скроневим відростком виличної кістки. Утворюється вилична дуга. В основі виличного відростка є суглобова нижньощелепна ямка (fossa mandibularis), куди заходить суглобовий відросток нижньої щелепи. Утворюється скронево-нижньощелепний суглоб.",
        "Кам'яниста частина має форму трибічної піраміди, що розташована у черепі майже горизонтально. Її основа, повернена назад і вбік, переходить у соскоподібний відросток (processus mastoideus). Верхівка кам'янистої частини спрямована вперед і до середини. Кам'яниста частина має три поверхні: передню, задню і нижню. Передня і задня поверхня обернені в порожнину черепа. Поверхні розмежовані трьома краями: верхнім, переднім і заднім."
      ]
    },
    "occipital": {
      "name": "Потилична кістка",
      "paragraphs": [
        "Потилична кістка (лат. os occipitale) — непарна кістка мозкового черепа.",
        "Анатомія",
        "Потилична кістка складається з луски, бічних частин і основи або тіла. Всі перелічені частини оточують великий отвір, через який спинний мозок з'єднується з головним. Ззовні на лусці є зовнішнє потиличне підвищення, вниз від якого відходить зовнішній потиличний гребінь, а в сторони — верхня і нижня вийні (каркові) лінії. На внутрішній поверхні луски є внутрішнє потиличне підвищення, вниз від якого відходить внутрішній потиличний гребінь, вверх сагітальна борозна, а в сторони — поперечні борозни. Утворюється хрестоподібне підвищення, яке ділить луску на 4 ямки: у верхніх лежать задні полюси півкуль великого мозку, а в нижніх — півкулі мозочка. У борознах знаходяться венозні синуси, куди збирається венозна кров від головного мозку. Стінки синусів не спадаються і це забезпечує швидке відтікання венозної крові від головного мозку."
      ]
    },
    "maxilla": {
      "name": "Верхня щелепа",
      "paragraphs": [
        "Верхньощелепна́ кі́стка (лат. maxilla) — кістка верхньої щелепи в кісткових риб, включно з чотириногими. В анатомії людини maxilla означає всю верхню щелепу.",
        "Людини Верхня щелепа людини (maxilla) — парна кістка лицевого черепа. Вона має тіло (corpus maxillae) і 4 відростки: лобовий (processus frontalis), виличний (processus zygomaticus), альвеолярний (processus alveolaris) і піднебінний (processus palatinus).",
        "Тіло верхньої щелепи (corpus maxillae) містить верхньощелепну пазуху (sinus maxillaris), що сполучається через великий верхньощелепний розтвір (hiatus maxillaris) з носовою порожниною. Цю порожнину ще називають пазухою Гаймора. Тіло має неправильну кубоподібну форму, на ньому є 4 поверхні: передня, очноямкова, підскронева і носова."
      ]
    },
    "mandible": {
      "name": "Нижня щелепа",
      "paragraphs": [
        "Нижньощеле́пна кі́стка (лат. mandibula) — кістка лицевого черепа. Єдина рухома кістка черепа. Утворена з двох зубних кісток в амніотів, в анамній розділена.",
        "Анатомія у людини Складається із тіла та двох гілок, сполучених з тілом під кутом 110—130°. Основа тіла масивна. По середній лінії видно звернений вентрально підборідний виступ, який є характерною властивістю черепа людини. На гілках розташовані альвеоли зубів. Гілки щелепи спрямовуються краніально і закінчуються двома відростками: переднім — вінцевим і заднім — суглобовим, розділеними вирізкою. До вінцевого приєднується скроневий м'яз, на другому розташована суглобова голівка скронево-нижньощелепного суглоба. Збоку до суглобового відростка приєднується крилоподібний м'яз."
      ]
    },
    "cervical-vertebrae": {
      "name": "Шийний відділ хребта",
      "paragraphs": [
        "Шийний відділ хребта (лат. vertebrae cervicales) — перший відділ хребта людини та хребетних тварин, що підтримує голову. У людини шийний відділ складається з 7 хребців, позначають їх латинською літерою C (від лат. collum — «шия»)."
      ]
    },
    "thoracic-vertebrae": {
      "name": "Грудний відділ хребта",
      "paragraphs": [
        "Грудний відділ хребта (лат. vertebrae thoracicae) складається з 12 хребців. До цих тіл хребців напіврухомо прикріплені ребра. Грудні хребці і ребра, попереду сполучені грудиною утворюють грудну клітку."
      ]
    },
    "lumbar-vertebrae": {
      "name": "Поперековий відділ хребта",
      "paragraphs": [
        "Поперековий відділ хребта (лат. vertebrae lumbales) підтримує вагу тіла та складається з 5 хребців."
      ]
    },
    "sacrum": {
      "name": "Крижова кістка",
      "paragraphs": [
        "Крижова кістка (лат. os sacrum) утворює задню частину таза і зростається з 5 крижовими хребцями."
      ]
    },
    "sternum": {
      "name": "Груднина",
      "paragraphs": [
        "Грудина , або грудна кістка ( лат. sternum , від др.-грец. στέρνον - \"грудина\", \"груди\") - елемент скелета багатьох наземних хребетних . Дає опору плечовому поясу . У земноводних і рептилій грудина зазвичай хрящова , у птахів кісткова [ 1 ] [ 2 ] . У літаючих і деяких тварин, що риють, має серединний виступ для прикріплення грудних м'язів - кіль .",
        "Грудина людини - довгаста плоска кістка в середині грудей. З'єднується з ребрами за допомогою хрящів , формуючи разом з ними грудну клітину , що вміщає та захищає від зовнішнього впливу легені , серце та найважливіші кровоносні судини ."
      ]
    },
    "ribs": {
      "name": "Ребро",
      "paragraphs": [
        "Ре́бра (лат. costae) — парні кістки осьового скелета хребетних тварин (за винятком безщелепних), що з'єднуються з хребтом. У риб ребра дають опору міосептам тулубної мускулатури; появу ребер у філогенезі позв'язують з посиленням локомоції в щелепних. В амніотів ребра грудної області з'єднуються також із грудиною, утворюючи каркас грудної клітки."
      ]
    },
    "clavicle": {
      "name": "Ключиця",
      "paragraphs": [
        "Ключи́ця (лат. clavicula — «ключик») — у людській анатомії — S-подібна зігнута невелика трубчаста кістка у поясі верхніх кінцівок, з тілом і двома кінцями: лопатковим (акроміальним) та грудинним. З'єднує лопатку з грудною кісткою плечового поясу — на обох кінцях є суглобові поверхні для сполучення (відповідно) з ключичною вирізкою рукоятки грудної кістки та акроміальним відростком лопатки. Ключиця ніби відсовує плечовий суглоб на периферію тіла, забезпечуючи свободу рухів руки."
      ]
    },
    "scapula": {
      "name": "Лопатка",
      "paragraphs": [
        "Лопа́тка (лат. scapula) — кістка пояса верхніх кінцівок, яка забезпечує з'єднання плечової кістки з ключицею. У людини це плоска кістка приблизно трикутної форми."
      ]
    },
    "humerus": {
      "name": "Плечова кістка",
      "paragraphs": [
        "Плечова́ кістка (лат. humerus) — довга трубчаста кістка має тіло (діафіз) та дві голівки (епіфізи). На верхньому епіфізі є кулястої форми суглобова поверхня для сполучення з лопаткою, анатомічна шийка, великий (латеральний) і малий (медіальний) горбки. Від горбків вниз відходять гребені, між якими іде міжгорбкова борозна (тут розташоване сухожилля двоголового м'яза). Нижче горбів знаходиться тонша частина кістки — хірургічна шийка — місце переломів. На тілі є дельтоподібна горбистість, до якої прикріплюється дельтоподібний м'яз. На нижньому епіфізі є два суглобові вирости і два надвирости: більший медіальний і менший латеральний. Суглобові вирости несуть блокоподібну поверхню для з'єднання з ліктьовою кісткою, і кулясту для з'єднання з променевою кісткою. На нижньому епіфізі є ще ліктьова ямка і вінцева, куди заходять відповідні суглобові вирости ліктьової кістки. Ліктьова ямка глибша від вінцевої."
      ]
    },
    "radius": {
      "name": "Променева кістка",
      "paragraphs": [
        "Промене́ва кі́стка (лат. radius) — довга трубчаста кістка передпліччя. З'єднується з плечовою та ліктьовою кістками. На верхньому епіфізі є суглобова ямка для сполучення з голівкою плечової кістки та суглобове коло для сполучення з ліктьовою кісткою. Поряд з цією голівкою розташована горбистість двоголового м'яза. Дистальний епіфіз має зап'ястну суглобову поверхню для сполучення з верхнім (проксимальним) рядом кісток зап'ястя і закінчується латеральним шилоподібним відростком. На медіальному краї цього епіфізу є суглобова поверхня для сполучення із ліктьовою кісткою."
      ]
    },
    "ulna": {
      "name": "Ліктьова кістка",
      "paragraphs": [
        "Ліктьова кі́стка (лат. ulna) — кістка руки, яка має тіло і два епіфізи. На верхньому епіфізі є два відростки: ліктьовий (англ. olecranon process) і вінцевий (англ. coronoid process). Між ними утворюється блокоподібна вирізка, яка з'єднується з однойменною суглобовою поверхнею плечової кістки (утворюється блокоподібний суглоб). На латеральній поверхні є променева вирізка, куди заходить головка променевої кістки і утворюється проксимальний променево-ліктьовий суглоб (циліндричний). Тіло тригранне: долонна, тильна і латеральна поверхні. Долонна і тильна утворюють міжкістковий гребінь. На нижньому епіфізі є головка з суглобовою поверхнею і медіальний шилоподібний відросток, що виступає зі сторони малого пальця."
      ]
    },
    "hand-phalanges": {
      "name": "Кістки пальців рук",
      "paragraphs": [
        "Ossa digitorum manus (кістки пальців рук) — кістки, що утворюють скелет пальців кисті. Вони забезпечують рухливість пальців: згинання, розгинання, відведення та приведення. Кожен палець, крім великого, має три кістки: проксимальну, середню та дистальну. Великий палець складається з двох кісток: проксимальної та дистальної. Ці кістки з’єднуються суглобами і прикріплені до м’язів кисті, що дозволяє виконувати тонкі та точні рухи."
      ]
    },
    "hip-bone": {
      "name": "Кістки таза",
      "paragraphs": [
        "Таз (лат. pelvis) — пояс скелета нижньої кінцівки, який складається з двох тазових кісток та крижової, які міцно між собою сполучаються і становлять міцну опору для вільних нижніх кінцівок. Таз є частиною тулуба.",
        "Український термін таз являє собою кальку латинського pelvis, що означає як «анатомічний таз», так і «миска», «балія», «таз»: з огляду на його характерну чашоподібну форму."
      ]
    },
    "femur": {
      "name": "Стегнова кістка",
      "paragraphs": [
        "Стегнова́ кі́стка (лат. os femoris) — єдина кістка стегна. Найбільша і найдовша трубчаста кістка в організмі людини. Як і всі довгі трубчасті кістки, має тіло та два кінці. З віком кісткова тканина втрачає міцність, через що часто відбувається перелом шийки стегна."
      ]
    },
    "patella": {
      "name": "Колінна кістка",
      "paragraphs": [
        "Наколі́нок, надколінок, надколінник, колінна чашечка (лат. patella) — найбільша сесамоподібна кістка. За формою нагадує заокруглений трикутник, верхівка якого обернена вниз, а основа — вгору."
      ]
    },
    "tibia": {
      "name": "Великогомілкова кістка",
      "paragraphs": [
        "Великогомі́лко́ва кі́стка (лат. tibia), заст. суре́ля — найбільша і основна з двох кісток гомілки, розташована зі сторони, ближчої до осі тіла. Латинська назва первісно означала «дудка, флейта, авлос»."
      ]
    },
    "fibula": {
      "name": "Малогомілкова кістка",
      "paragraphs": [
        "Малогомі́лко́ва кістка (лат. fibula) — менша з кісток гомілки, майже не несе фізичного навантаження при ході. Одна з основних функцій малогомілкової кістки — участь у формуванні колінного та надп'ятково-гомілкового суглобів. Складається із тіла (діафіза) та двох епіфізів (проксимальний, дистальний). На проксимальному кінці розташована головка. Виросток на дистальному епіфізі утворює латеральну кісточку."
      ]
    },
    "foot": {
      "name": "Кістки стопи",
      "paragraphs": [
        "Кістки стопи людини включають 26 кісток і утворюють три відділи:",
        "Заплесно (лат. tarsus) — 7 кісток проксимального відділу стопи, які з'єднуються з кістками плесна.",
        "Надп'яткова (таранна) (лат. talus);",
        "П'яткова (лат. calcaneus);",
        "Човноподібна (лат. os naviculare);",
        "Бічна клиноподібна (лат. os cuneiforme lateralis);",
        "Проміжна (латеральна) клиноподібна (лат. os cuneiforme intermedium);",
        "Присередня клиноподібна (лат. os cuneiforme medialis);",
        "Кубоподібна (лат. os cuboideum);",
        "Плесно (лат. metatarsale) — 5 коротких трубчастих кісток стопи, розташованих між заплесном і фалангами пальців.",
        "Фаланги (лат. phalanx) — 14 коротких трубчастих кісток, що складають сегменти пальців стопи. Дві фаланги утворюють великий палець, інші пальці складаються з трьох фаланг."
      ]
    }
  },
  "sv": {
    "frontal": {
      "name": "Pannben",
      "paragraphs": [
        "Pannben (latin: os frontale) är, i människans skelett, ett ben på kraniets framsida som består av två delar: en vertikal del (squama frontalis) som motsvarar pannan, och en horisontell eller orbital del (pars orbitalis) som utgör ögon- och näshålornas tak."
      ]
    },
    "parietal": {
      "name": "Hjässben",
      "paragraphs": [
        "Hjässbenet (latin: os parietale) är en del av skallen som finns beläget mellan nackben, pannben, kilben och tinningben."
      ]
    },
    "temporal": {
      "name": "Tinningben",
      "paragraphs": [
        "Tinningben (latin: os temporale) är, i människans kropp, ett parigt ben som sitter nedtill, baktill på kraniets laterala sidor, ovanför och runt örat."
      ]
    },
    "occipital": {
      "name": "Nackben",
      "paragraphs": [
        "Nackben, occipitalben (latin: os occipitale) är, i människans skelett, ett krökt, trapetsformat ben som utgör kraniets bakre, nedre del."
      ]
    },
    "maxilla": {
      "name": "Överkäke",
      "paragraphs": [
        "Överkäken (latin: maxilla) är en mer eller mindre fast ansluten del av kraniet som i människans kropp består av av två överkäksben (os maxillaris). I överkäken finns den övre tandraden. Tillsammans med okbenen (os zygomaticum) bildar överkäken den hårda gommen, näsans botten och laterala väggar samt ögonhålornas botten."
      ]
    },
    "mandible": {
      "name": "Underkäke",
      "paragraphs": [
        "Käke är endera av de två delar av ryggradsdjurens skelett som begränsar munhålan upptill och nedtill och där tänderna sitter. Underkäken är rörlig medelst en led och överkäken är en del av kraniet."
      ]
    },
    "cervical-vertebrae": {
      "name": "Halskota",
      "paragraphs": [
        "Halskota, cervikalkota (latin: vertebra cervicalis, pluralis vertebrae cervicales) är en av ryggradens kotor i halsen, omedelbart nedanför kraniet. I människans kropp finns sju halskotor som tillsammans utgör omkring en femtedel av ryggradens längd."
      ]
    },
    "thoracic-vertebrae": {
      "name": "Bröstkota",
      "paragraphs": [
        "Bröstkota, thorakalkota (latin: vertebra thoracica, pl. vertebrae thoracicae, Th I–Th XII) är, i människans kropp, de tolv ryggkotor (vertebrae) i ryggraden (columna vertebralis) som ledar mot revbenen (costae) och utgör en del av bröstkorgen (thorax)."
      ]
    },
    "lumbar-vertebrae": {
      "name": "Ländrygg",
      "paragraphs": [
        "Ländryggen är den del av människans rygg som sitter längst ner. Ländryggen består anatomiskt av 5 kotor men kan hos vissa ha 4 eller 6 kotor, detta faller inom normalvariation inom smärtfri befolkning."
      ]
    },
    "sacrum": {
      "name": "Korsben",
      "paragraphs": [
        "Korsben eller sakralben (latin: os sacrum) är, i människans skelett, ett stort, triangulärt ben som utgör en del av ryggradens (columna vertebralis) kaudala (nedre) avslutning och, med sin placering mellan de två höftbenen (os coxae), även bäckenets (pelvis) bakre vägg."
      ]
    },
    "sternum": {
      "name": "Bröstben",
      "paragraphs": [
        "Bröstben (latin: sternum, av grekiskans στέρνον, \"bröst\") är, i människans kropp, ett avlångt och platt ben centralt placerat på bröstkorgens (thorax) framsida (ventralt) och utgör dess främre vägg. Bröstbenet fyller en viktig funktion genom att skydda lungorna och hjärtat och upptar dessutom stora krafter från armarna via nyckelbenen (clavicula). Det är i genomsnitt omkring 17 centimeter långt, något längre hos män än hos kvinnor."
      ]
    },
    "ribs": {
      "name": "Revben",
      "paragraphs": [
        "Revben (latin: singular costa, plural costae) är en del av skelettet, som skyddar de inre organen i bröstkorgen."
      ]
    },
    "clavicle": {
      "name": "Nyckelben",
      "paragraphs": [
        "Nyckelben (latin: clavicula) är i människans kropp ett ben som utgör den främre delen av skuldergördeln (cingulum extremitatis superioris)."
      ]
    },
    "scapula": {
      "name": "Skulderblad",
      "paragraphs": [
        "Skulderblad, skapula, axelblad, (latin: scapula, grekiska: omo) är i människans skelett ett tunt, platt, parigt och oregelbundet triangulärt ben på baksidan av bröstkorgen (thorax)."
      ]
    },
    "humerus": {
      "name": "Överarmsben",
      "paragraphs": [
        "Överarmsbenet (latin: humerus) är i människans skelett ett långt ben i armen mellan skulderbladet (scapula) och underarmsbenen, strålbenet (radius) och armbågsbenet (ulna)."
      ]
    },
    "radius": {
      "name": "Strålben",
      "paragraphs": [
        "Strålben, spolben (latin: radius) är, i människans skelett, tillsammans med armbågsbenet (ulna) ett av benen i underarmen. Strålbenet ledar i armbågsleden (art. cubiti) både till överarmsbenet (humerus) och till armbågsbenet. I handleden (art. radiocarpea) ledar strålbenet till handloven (carpus) och till armbågsbenet."
      ]
    },
    "ulna": {
      "name": "Armbågsben",
      "paragraphs": [
        "Armbågsben (latin: ulna) är, i människans skelett, ett långt ben i underarmen, placerat medialt om strålbenet (radius)."
      ]
    },
    "hand-phalanges": {
      "name": "Fingerben",
      "paragraphs": [
        "Ett ulnart finger består av tre rörben kallade falanger: Grundfalang (phalanx proximalis), mellanfalang (phalanx media) och ytterfalang (phalanx distalis). Varje ben består av ett skaft (corpus) och två extremiteter; den proximala och något större basen (basis) och det distala och mindre huvudet (caput)."
      ]
    },
    "hip-bone": {
      "name": "Höftben",
      "paragraphs": [
        "Höftben (latin: os coxae) är, i människans skelett, ett stort, parigt och oregelbundet ben som utgör den ventrala (främre) och de laterala (yttre) sidorna på bäckenet (pelvis) och bäckenhålan."
      ]
    },
    "femur": {
      "name": "Lårben",
      "paragraphs": [
        "Lårben (latin: femur) är det längsta, tyngsta och starkaste benet i människans skelett, och bildar benstomme i Låret. Lårbenet är ledat mot bäckenet (pelvis) i höftleden (art. coxae) och mot skenbenet (tibia) och knäskålen (patella) i knäleden (art. genus)."
      ]
    },
    "patella": {
      "name": "Knäskål",
      "paragraphs": [
        "Patella eller knäskålen är ett tjockt triangulärt ben som skyddar framsidan av knät. Patella är kroppens största sesamben och sitter i quadriceps sena vilket ger en större hävarm för muskeln."
      ]
    },
    "tibia": {
      "name": "Skenben",
      "paragraphs": [
        "Skenbenet (latin: tibia), även kallat smalbenet, är ett ben i människans skelett som tillsammans med det mindre vadbenet (fibula) utgör underbenets (crus) skelett."
      ]
    },
    "fibula": {
      "name": "Vadben",
      "paragraphs": [
        "Vadbenet (latin: fibula) är det smalare och yttre av de två långa rörben som bildar underbenets skelett hos människan. Ordet Fibula kommer från latin och kan översättas till spänne eller brosch."
      ]
    },
    "foot": {
      "name": "Fotben",
      "paragraphs": [
        "Längst fram på människans fot sitter fem tår, och längst bak sitter hälen. Tåvalken är den delen av foten där tårna möter foten. Hålfoten är delen på insidan av foten mellan hälen och tåvalken."
      ]
    }
  },
  "de": {
    "frontal": {
      "name": "Stirnbein",
      "paragraphs": [
        "Das paarige Stirnbein (lat. Os frontale) ist ein Teil des Hirnschädels. Es bildet das vordere Schädeldach und damit die vordere obere Wand der Schädelhöhle, bei Wiederkäuern einen Großteil des Schädeldachs. Die Stirnbeine beider Seiten sind in der Medianebene über eine Schädelnaht, die Sutura frontalis („Stirnnaht“), miteinander verbunden. Das Stirnbein der Säugetiere besteht aus drei Abschnitten, der Stirnbeinschuppe (Squama frontalis), der Augenhöhlenplatte (Pars orbita) und der Schläfenfläche (Facies temporalis)."
      ]
    },
    "parietal": {
      "name": "Scheitelbein",
      "paragraphs": [
        "Das paarige Scheitelbein (lateinisch Os parietale) ist ein Teil des Hirnschädels. Es bildet das Schädeldach und die Seitenwand der knöchernen Gehirnkapsel. Bei Wiederkäuern wird, aufgrund des sehr großen Stirnbeins, nur der Seitenteil des Schädeldachs vom Scheitelbein gebildet."
      ]
    },
    "temporal": {
      "name": "Schläfenbein",
      "paragraphs": [
        "Das Schläfenbein (lateinisch Os temporale) ist einer der Knochen des Hirnschädels. Es liegt seitlich im hinteren Schädelbereich. Das Schläfenbein beinhaltet Mittel- und Innenohr und bildet die Gelenkspfanne des Kiefergelenks."
      ]
    },
    "occipital": {
      "name": "Hinterhauptsbein",
      "paragraphs": [
        "Das Hinterhauptbein (auch Hinterhauptsbein oder Hinterhaupthöcker; lat. Os occipitale oder kurz Occiput) ist der am Halsübergang gelegene Teil des Hirnschädels. Es bildet den hinteren Abschluss der Schädelhöhle und mit dem Atlas das erste Kopfgelenk."
      ]
    },
    "maxilla": {
      "name": "Oberkiefer",
      "paragraphs": [
        "Der Oberkiefer (lat. Maxilla) ist ein paariger Knochen des Gesichtsschädels. Er bildet den Boden der Augenhöhle (Orbita), den Boden und die Seitenwand der Nasenhöhle (Cavum nasi) sowie einen Teil des Gaumens und damit das Dach der Mundhöhle (Cavum oris proprium). Der Oberkiefer enthält auch die Kieferhöhle (Sinus maxillaris)."
      ]
    },
    "mandible": {
      "name": "Unterkiefer",
      "paragraphs": [
        "Der Unterkiefer oder die Kinnlade (lat. Mandibula von mandere „kauen“) ist ein Knochen des Gesichtsschädels. Er ist bei Säugetieren der bewegliche der beiden Kieferknochen."
      ]
    },
    "cervical-vertebrae": {
      "name": "Halswirbel",
      "paragraphs": [
        "Als Halswirbel (lateinisch Vertebrae cervicales) werden das kopfseitige (kraniale) Ende der Wirbelsäule von Wirbeltieren und die besonders beweglichen Wirbel zwischen der Brustwirbelsäule und dem Kopf bezeichnet. Dieser Abschnitt wird Halswirbelsäule genannt. Der kranial letzte vor dem Cranium gelegene Halswirbel wird als Atlas bezeichnet."
      ]
    },
    "thoracic-vertebrae": {
      "name": "Brustwirbel",
      "paragraphs": [
        "Die Brustwirbel (lat. Vertebrae thoracicae) sind die knöchernen Elemente der Brustwirbelsäule. Diese Wirbel sind charakterisiert durch ihre Kontaktflächen zu den Rippen (Facies costalis). Der Mensch besitzt 12 Brustwirbel. Sie werden von oben nach unten durchnummeriert. Bezeichnet werden sie nach der lateinischen Schreibweise mit Th1 bis Th12 (Th = thorakal = zugehörig zum Brustkorb)."
      ]
    },
    "lumbar-vertebrae": {
      "name": "Lendenwirbel",
      "paragraphs": [
        "Die Lendenwirbel (Vertebrae lumbales) bilden den Lendenabschnitt der Wirbelsäule, der auch als Lendenwirbelsäule bezeichnet wird. Der Mensch besitzt fünf, Huftiere zumeist sechs und Raubtiere sieben Lendenwirbel. Bei Vögeln sind die Lendenwirbel mit dem Kreuzbein zum Synsacrum verwachsen."
      ]
    },
    "sacrum": {
      "name": "Kreuzbein",
      "paragraphs": [
        "Das Kreuzbein (lateinisch Os sacrum, genannt auch Sakrum) ist ein Knochen der Landwirbeltiere. Beim erwachsenen Menschen ist es in etwa keilförmig. Es entwickelt sich durch Verschmelzung (Synostose) aus den ursprünglich einzelnen, zusammenwachsenden Wirbeln, den Kreuzwirbeln (Sakralwirbel). Beim Heranwachsenden findet diese Verschmelzung (vorher ein knorpeliger Verbund) bis zum Ende der Wachstumsphase statt. Das Kreuzbein umschließt den hinteren Abschnitt des Wirbelkanals und bildet mit beiden Hüftbeinen den Beckengürtel. Kaudal (schwanzwärts) – also bei Tieren nach hinten und beim Menschen nach unten – schließt sich das Steißbein (Os coccygis) bzw. die Schwanzwirbelsäule an. Das Kreuzbein-Steißbein-Gelenk kann auch als Knorpelhaft ausgebildet sein und ab einem Alter von 30 Jahren verknöchern."
      ]
    },
    "sternum": {
      "name": "Brustbein",
      "paragraphs": [
        "Das Brustbein oder lateinisch Sternum (latinisiert von altgriechisch στέρνον sternon, ‚Brust, Herz, Gemüt‘) ist ein platter, schwertförmiger Knochen in der vorderen Mitte des Brustkorbs, an dem die Rippen bzw. deren knorpelige Verlängerungen ansetzen. Das Brustbein des Mannes ist dabei schlanker als das der Frau. Die Längsdurchtrennung des Brustbeins bei Operationen wird als Sternotomie bezeichnet."
      ]
    },
    "ribs": {
      "name": "Rippen",
      "paragraphs": [
        "Rippen bezeichnet im Computerjargon das Kopieren von einer Datenquelle auf ein anderes Speichermedium, meist auf eine Festplatte. Das Verb leitet sich vom englischen „to rip“ ab, das in diesem Zusammenhang so viel wie „(herunter-)reißen“ bedeutet. Der Jargon-File-Eintrag für rip gibt einen Ursprung des Begriffs im Amiga-Slang an, wo er verwendet wurde, um die Extraktion von Multimedia-Inhalten aus Programmen zu bezeichnen."
      ]
    },
    "clavicle": {
      "name": "Schlüsselbein",
      "paragraphs": [
        "Das Schlüsselbein (lateinisch die Clavicula, eingedeutscht auch Klavikula, altgr. κλείς, Genitiv κλειδός [kleidos]) ist einer der drei ursprünglichen Knochen des Schultergürtels bei Reptilien, Vögeln und Säugetieren. Bei Knochenfischen ist das Schlüsselbein als Hautverknöcherung bereits angedeutet, bei heutigen Amphibien fehlt es."
      ]
    },
    "scapula": {
      "name": "Schulterblatt",
      "paragraphs": [
        "Das Schulterblatt (lateinisch die Scapula) bildet beim Menschen den hinteren, bei Tieren den oberen Teil des knöchernen Schultergürtels. Es handelt sich beim Menschen und den übrigen Säugetieren um einen platten, dreieckigen Knochen. Bei Vögeln ist er schmal und säbelförmig. Er dient der Befestigung eines Armes (einer Vordergliedmaße bei Vierbeinern, eines Flügels bei Vögeln) sowie als Muskelursprung und -ansatz. Die Verbindung zum Brustkorb erfolgt rein muskulös (sogenannte Synsarkose, von griechisch syn ‚zusammen‘, sarkos ‚Fleisch‘). Zu Oberarmknochen (Humerus) und Schlüsselbein (Clavicula) – bei Vögeln auch zum Coracoid – besteht eine gelenkige Verbindung. Sie dient der Stabilisation des Schultergelenks und passt sich dank ihrer Verschieblichkeit den Oberarmbewegungen an. Bei Schlachttieren wird das Schulterblatt gewerbsmäßig auch als „Schaufelknochen“ bezeichnet."
      ]
    },
    "humerus": {
      "name": "Oberarmknochen",
      "paragraphs": [
        "Der Oberarmknochen (lateinisch Os humeri oder kurz Humerus; früher auch Achselbein genannt) ist einer der längsten und kräftigsten Röhrenknochen der am Land lebenden Wirbeltiere und bildet die knöcherne Grundlage des Oberarmes. Beim Menschen entspricht die fünffache Länge des Oberarmknochens etwa der Körpergröße."
      ]
    },
    "radius": {
      "name": "Radius",
      "paragraphs": [
        "Der Radius (lat.-anat. für Speiche) ist ein Knochen des Unterarmes. Die Speiche ist daumenseitig gelegen, bei Säugetieren kräftiger als die Elle, der sie dort gegenüberliegt, und ein typischer Röhrenknochen."
      ]
    },
    "ulna": {
      "name": "Ulna",
      "paragraphs": [
        "Die Ulna (lat.-anat. für Elle) ist neben dem Radius (Speiche) einer der beiden Knochen des Unterarmes. Die Elle ist kleinfingerseitig gelegen, weniger kräftig als die Speiche und ein typischer Röhrenknochen."
      ]
    },
    "hand-phalanges": {
      "name": "Fingerknochen",
      "paragraphs": [
        "Die Fingerknochen (lat. Ossa digiti manus) sind die knöchernen Stützelemente der Finger. Bei Säugetieren hat jeder vollausgebildete Finger drei knöcherne Stützelemente, die als Phalanx proximalis, media und distalis („körpernaher, mittlerer und körperferner Fingergliedknochen“), auch Phalanx I, II und III; (von altgr. phalanx „Schlachtreihe von Kriegern“ „Baumstamm“, „Walze“, oder „Rolle“) bezeichnet werden. Der menschliche Daumen besitzt nur zwei Phalangen. Die Verbindungen zwischen Mittelhandknochen und Phalanx proximalis und den Fingergliedknochen untereinander sind die Fingergelenke"
      ]
    },
    "hip-bone": {
      "name": "Beckenknochen",
      "paragraphs": [
        "Das Becken (lateinisch Pelvis) ist bei Landwirbeltieren der Körperabschnitt unterhalb des Bauchs und oberhalb der Beine, bei vierfüßigen Säugetieren der Teil zwischen Bauch und Schwanz. Man unterscheidet beim Menschen zwischen einem großen und einem kleinen Becken (Pelvis major und Pelvis minor). Das große Becken liegt zwischen beiden Darmbeinschaufeln oberhalb der Beckeneingangslinie (Linea terminalis) und gehört eigentlich zum Bauchraum."
      ]
    },
    "femur": {
      "name": "Oberschenkelknochen",
      "paragraphs": [
        "Der Oberschenkelknochen, in der medizinischen Fachsprache Os femoris oder kurz das Femur, ist der kräftigste Röhrenknochen und bildet die knöcherne Grundlage des Oberschenkels. Er ist der längste Knochen des menschlichen Körpers."
      ]
    },
    "patella": {
      "name": "Kniescheibe",
      "paragraphs": [
        "Die Kniescheibe (lateinisch Patella) ist ein flacher, scheibenförmiger, von vorne betrachtet dreieckiger Knochen, der vor dem Kniegelenk liegt, an dessen Gelenkflächen er beteiligt ist. Die Kniescheibe fungiert als Sesambein in der Sehne des Musculus quadriceps femoris (vierköpfiger Oberschenkelmuskel). Sie schützt das Kniegelenk und vervielfacht die Kraftentwicklung des Quadrizeps durch die Verlängerung des Hebelarmes. Die Verknöcherung der Kniescheibe erfolgt beim Menschen über mehrere Ossifikationszentren ab dem dritten Lebensjahr."
      ]
    },
    "tibia": {
      "name": "Schienbein",
      "paragraphs": [
        "Das Schienbein (lateinisch Tibia) ist neben dem Wadenbein (Fibula) einer der beiden Knochen des Unterschenkels. Das Schienbein ist der kräftigere der beiden Knochen und ein typischer Röhrenknochen. Das lateinische Wort tibia ist die Bezeichnung einer Knochenflöte und der lateinische Name des in der griechischen Antike als Aulos bekannten Blasinstruments."
      ]
    },
    "fibula": {
      "name": "Wadenbein",
      "paragraphs": [
        "Das Wadenbein (lat. Fibula (f.) „Heftnadel“, „Spange“) ist neben dem Schienbein (Tibia), an dem es seitlich außen anliegt, einer der beiden Knochen des Unterschenkels. Das Wadenbein ist der dünnere der beiden Knochen und ein typischer Röhrenknochen."
      ]
    },
    "foot": {
      "name": "Fußknochen",
      "paragraphs": [
        "Der Knöchel (lateinisch Malleolus, ‚Hämmerchen‘, Diminutiv von lateinisch malleus, ‚Hammer‘), genannt auch Fußknöchel (älter auch Enkel, verwandt mit mittelhochdeutsch anke ‚Gelenk‘), ist ein Knochenhöcker am unteren Ende des Unterschenkels. Er bildet den oberen Teil des Sprunggelenks, des Verbindungsgelenks zwischen Fuß und Bein, und gehört medizinisch-anatomisch betrachtet zum Bein und nicht zum Fuß."
      ]
    }
  },
  "fa": {
    "frontal": {
      "name": "استخوان پیشانی",
      "paragraphs": [
        "استخوان پیشانی (به انگلیسی: Frontal bone) استخوانی است که قسمت جلو و بالای جمجمه (پیشانی) را ساخته‌است. این استخوان پیشانی بخش جلویی جمجمه یا پیشانی، بخش بالایی حفره چشم و قسمت اعظم بخش جلویی کف جمجمه را به وجود می‌آورد. استخوان پیشانی از دو بخش راست و چپ تشکیل شده که به شکل استخوانی واحد درمی‌آید."
      ]
    },
    "parietal": {
      "name": "استخوان آهیانه",
      "paragraphs": [
        "استخوان‌های آهیانه (Parietal bones)به صورت یک جفت استخوان پهن و چهارگوش هستند که بخش عمدهٔ کاسهٔ سر را تشکیل می‌دهند. این استخوان‌ها قسمت‌های طرفی و سقف جمجمه را می‌سازد. این استخوان‌ها که با یکدیگر مفصل شده‌اند، در جلو با استخوان پیشانی و در عقب با استخوان پس‌سری، مفصل می‌گردند. هر یک از استخوان‌های آهیانه دارای یک سطح بیرونی صاف و محدب و یک سطح درونی ناصاف و مقعر است و چهار زاویه و چهار کنار دارد."
      ]
    },
    "temporal": {
      "name": "استخوان گیجگاهی",
      "paragraphs": [
        "ستخوان گیجگاهی (Temporal bones) در طرفین جمجمه قرار دارد و در تشکیل قسمت جدار طرفی و قاعده کاسه سر نقش دارد. دستگاه شنوایی - تعادلی بدن در ضخامت آن قرار دارد. سطح خارجی این استخوان با قسمت خارجی سر و سطح داخلی آن نیز با قسمت درونی سر در ارتباط است. به استخوان گیجگاهی در متون قدیمی فارسی استخوان کلالک و صُدغ نیز گفته می‌شد."
      ]
    },
    "occipital": {
      "name": "استخوان پس‌سری",
      "paragraphs": [
        "استخوان پس‌سری یا استخوان اُکسیپیتال (به انگلیسی: Occipital bone) استخوان لوزی‌شکل است که در قسمت پسین (خلفی) زیرین کاسه سر قرار گرفته و قاعده جمجمه را تشکیل می‌دهد. این استخوان سومین استخوان سر به‌شمار می‌آید و در قسمت پشت و بخشی از کف جمجمه قرار دارد و تمام قسمت پس‌سری را ساخته و از سه قسمت اصلی تشکیل شده‌است."
      ]
    },
    "maxilla": {
      "name": "فک بالا",
      "paragraphs": [
        "به هریک از دو استخوان نامنظمی که بخش اعظم استخوان‌بندی قسمت میانی صورت را تشکیل می‌دهند و در ساختار کام و کف حفرهٔ چشم و حفرهٔ اشکی نقش دارند، فک بالا، بَرواره یا ماگزیلا (Maxilla) می‌گویند. سطح زیرین برواره در دهان قسمت کام سخت را تشکیل می‌دهد. سینوس برواره در این استخوان قرار دارد."
      ]
    },
    "mandible": {
      "name": "فک پایین",
      "paragraphs": [
        "فَکّ پایین، زیرواره یا مندیبول (به لاتین: mandibula) استخوان نعلی‌شکل متحرکی است که بخش تحتانی استخوان‌بندی صورت و چارچوب استخوانی کف دهان را تشکیل می‌دهد."
      ]
    },
    "cervical-vertebrae": {
      "name": "مهره گردنی",
      "paragraphs": [
        "مهره‌های گردنی به مجموعه‌ای از مهره‌های گردن گفته می‌شود که بیرون از جمجمه قرار دارد. غیر از پستانداران مهرهای گردنی، مانند مهره‌های سینه‌ای دارای دنده می‌باشند."
      ]
    },
    "thoracic-vertebrae": {
      "name": "مهره سینه‌ای",
      "paragraphs": [
        "مهره‌های سینه‌ای تعدادی مهره در ستون فقرات مهره‌داران هستند که بخش میانی آن در میان مهره‌های گردنی و کمری را تشکیل می‌دهند که به آنها مهره‌های پشتی هم می‌گویند. در انسان‌ها، اندازه این مهره‌ها به نسبت متوسط است و با حرکت به سوی پایین ستون فقرات اندازه‌شان بیشتر می‌شود، به گونه‌ای که بالاترین مهرهٔ سینه‌ای بسیار کوچکتر از پایین‌ترین آن‌ها است. ویژگی اصلی این مهره‌ها اتصال آن‌ها به استخوان‌های قفسه سینه و دنده‌ها است. این مهره‌ها دارای چهار سطح اضافی مفصلی هستند و به دلیل همین اتصال در حرکات فلکشن و فلکشن جانبی دارای محدودیت می‌باشند. همچنین زائده‌های شوکی این مهره‌ها بلند و به سمت پایین متمایل هستند و به همین دلیل حرکت هایپر اکستنشن ستون مهره‌ها در این قسمت محدود شده است."
      ]
    },
    "lumbar-vertebrae": {
      "name": "مهره کمری",
      "paragraphs": [
        "مهره‌های کمری (انگلیسی: Lumbar vertebrae) به قسمتی از ستون مهره‌ها گفته می‌شود که در ناحیه کمر قرار دارد. در انسان پنج قطعه از مهره‌های ستون فقرات را که بین دوازدهمین مهره پشتی و استخوان خاجی قرار دارند، کمری می‌گویند."
      ]
    },
    "sacrum": {
      "name": "استخوان خاجی",
      "paragraphs": [
        "استخوان خاجی یا ساکروم (به انگلیسی: Sacrum) نام یکی از استخوان‌های تشکیل‌دهندهٔ لگن خاصره است. این استخوان در پایین ستون مهره‌های کمر، در زیر آخرین مهرهٔ کمری قرار گرفته و در پشت لگن، بین دو استخوان کوهانه (بی‌نام، هیپ) قرار دارد. در داخل استخوان خاجی ریشه‌های عصبی قرار دارند."
      ]
    },
    "sternum": {
      "name": "استخوان جناغ",
      "paragraphs": [
        "جـِناغ (به لاتین: استرنوم Sternum) استخوانی است خنجری‌شکل و تَکی و طویل که در بخش پیشین و میانی قفسهٔ سینه قرار دارد و غضروف‌های دنده‌ای از دو طرف به آن متصل شده‌اند. همچنین استخوان ترقوه به قسمت فوقانی آن (دسته) متصل می‌شود. این استخوان دارای طولی در حدود ۱۵ تا ۲۰ سانتی‌متر است."
      ]
    },
    "ribs": {
      "name": "دنده",
      "paragraphs": [
        "دنده یا قبرغه نام دوازده جفت استخوان در طرفین قفسه سینه است که از ستون مهره‌ها آغاز شده و به جز دو جفت دندهٔ انتهایی بقیه در قسمت قدام به جناغ مفصل می‌شوند (مستقیم یا غیر مستقیم)."
      ]
    },
    "clavicle": {
      "name": "استخوان ترقوه",
      "paragraphs": [
        "تَرقُوه یا چَنبَر (به انگلیسی: Clavicle) استخوان دراز است که همراه با استخوان کتف، بازو و جناغ، کمربند شانه‌ای یا سینه‌ای را تشکیل می‌دهند. این استخوان برخلاف سایر استخوان‌های دراز، فاقد هرگونه مغزی است و دارای منشأ غشائی می‌باشد و از سمت داخل به جناغ و از سمت خارج به استخوان کتف متصل می‌شود. ترقوه تنها استخوان بین تنه و اندام فوقانی است و در تمام طولش قابل لمس است. شکل استخوان ترقوه در هر طرف قفسه سینه شبیه حرف «S» است."
      ]
    },
    "scapula": {
      "name": "استخوان کتف",
      "paragraphs": [
        "استخوان شانه یا کِتف یا اِسکَپیولا (به انگلیسی: Scapula) در بدن انسان، نام استخوانی پهن، سه‌گوش و صاف در اندام فوقانی است که در پشت قفسه سینه در هر طرف واقع شده‌است. استخوان کتف به ترقوه و استخوان بازو، مفصل می‌شود."
      ]
    },
    "humerus": {
      "name": "استخوان بازو",
      "paragraphs": [
        "استخوان بازو، یا هومروس (به انگلیسی: Humerus) در قسمت پروگزیمال با کتف مفصل شده و مفصل شانه را می‌سازد. در قسمت انتها این استخوان با استخوان‌های زند زبرین و زند زیرین مفصل آرنج را می‌سازد."
      ]
    },
    "radius": {
      "name": "زند زبرین",
      "paragraphs": [
        "زَند زِبَرین یا رادیوس (به انگلیسی: Radius) استخوانی است بلند در سمت خارجی ساعد که موازی زند زیرین (اولنا) بوده و مچ دست را به آرنج متصل می‌نماید."
      ]
    },
    "ulna": {
      "name": "زند زیرین",
      "paragraphs": [
        "زند زیرین یا اولنا (به انگلیسی: Ulna) یکی از دو استخوان طویلی است که در ساعد قرار دارد و مچ دست را به آرنج متصل می‌نماید و به بدن نزدیکتر است. در قسمت دیستال این استخوان (نزدیک به مچ) زائده‌ای به نام زائده نیزه‌ای (استیلوئید) وجود دارد. این استخوان در بالا با استخوان بازو (هومروس)، در کنار با زند زبرین (رادیوس) و در پایین با استخوان‌های مچ دست مفصل می‌شود."
      ]
    },
    "hand-phalanges": {
      "name": "استخوان‌های انگشتان",
      "paragraphs": [
        "انگشت دست نام بندهای انتهایی دست است که در انسان شامل ۵ انگشت در هر دست می‌شود (در مجموع ۱۰ انگشت). انگشتان دست به جز انگشت شست که فقط ۲ بند دارد، دارای سه استخوان مجزا هستند که بین آن‌ها مفصل و در انتهایشان ناخن قرار دارد."
      ]
    },
    "hip-bone": {
      "name": "استخوان‌های لگن",
      "paragraphs": [
        "استخوان بالی لگن یا استخوان هیپ، (به انگلیسی: Hip bone) یک استخوان چهارگوش‌مانند نامنظم است که قسمت میانی آن کمی تاب خورده است. دو عدد از این استخوان در بدن وجود دارد؛ یکی در چپ بدن و دیگری در سمت راست که به هم مفصل می‌شوند و کمربند لگنی را تشکیل می‌دهند."
      ]
    },
    "femur": {
      "name": "استخوان ران",
      "paragraphs": [
        "استخوان ران یا فمور/فیمر (به انگلیسی: femur) بلندترین اندام در بدن انسان و در عین حال حجیم‌ترین و قوی‌ترین استخوان نیز هست. این استخوان، اولین استخوان اندام تحتانی بوده که در انتهای فوقانی خود در لگن خاصره قرار می‌گیرد و مفصل ران را به وجود می‌آورد."
      ]
    },
    "patella": {
      "name": "کشکک",
      "paragraphs": [
        "کَشکَک زانو یا کاسه زانو (نام علمی: پاتلا، Patella) استخوانی مثلثی‌شکل و ضخیم است که بزرگ‌ترین استخوان کنجدی در بدن به‌شمار می‌آید. همچنین تنها استخوان کنجدی بدن است که در شمارش استخوان‌های بدن محسوب می‌شود. شکل آن به تکه‌های کشک شباهت دارد. کشکک، زانو را پوشانده و از آن در برابر نیروی فرساینده‌ای که از سایش زردپی چهارسر ران به سطح کشککی استخوان ران پدید می‌آید حفاظت می‌کند. استخوان کشکک در ضخامت زردپی ماهیچه چهارسرِ ران واقع شده و در صدمه‌هایی که به ناحیه زانو وارد می‌شود امکان آسیب دیدن آن زیاد است."
      ]
    },
    "tibia": {
      "name": "درشت‌نی",
      "paragraphs": [
        "دُرُشت‌نِی یا تیبیا (به انگلیسی: Tibia) استخوان بلندی است در طرف داخل ساق پا که بین زانو و مچ پا قرار دارد. درشت‌نی مسئول حمایت بیشتر وزن بدن است و برای حرکت مفصل زانو و مچ پا ضروری است. در حین راه رفتن استخوان تیبیا نیروی محوری در حدود پنج برابر وزن انسان را تحمل می‌کند."
      ]
    },
    "fibula": {
      "name": "استخوان نازک نی",
      "paragraphs": [
        "نازُک‌نِی یا فیبولا (به انگلیسی: Fibula) استخوانی است که هم‌راستا با استخوان درشت‌نی ساق پا و در سمت خارج آن قرار دارد و میان زانو و مچ پا قرار گرفته‌است."
      ]
    },
    "foot": {
      "name": "استخوان‌های پا",
      "paragraphs": [
        "در پا، جلوتر از استخوان‌های مچ پا، پنج استخوان بلند قرار دارند که به آن‌ها کف‌پایی می‌گویند. جلوتر از استخوان‌های کف پا، انگشتان پا قرار دارند که هر کدام از آن‌ها سه بند دارد (بجز شست پا که دو بند دارد). کف‌پایی‌ها به همراه انگشتان پا، پیش‌پا را تشکیل می‌دهند."
      ]
    }
  },
  "ar": {
    "frontal": {
      "name": "عظم جبهي",
      "paragraphs": [
        "العظم الجبهي (بالإنجليزية: Frontal bone) هو أحد عظام الجمجمة المفردة، ويشكل الجبهة والحافة العلوية وسقف المحجر. يتوضع في الوجه الأمامي للقحف، ويشاهد من الوجه الجانبي ومن قاعدة القحف أيضاً، وهو عظم مفرد يكون في الحياة الجنينية مزدوجاً وبعد التحامه يبقى أثر للالتحام يسمى: الدرز الجبهي (الناصف)، يساهم في تشكيل كل من الحفرة القحفية الأمامية وقاعدة القحف وجوف الحجاج."
      ]
    },
    "parietal": {
      "name": "العظم الجداري",
      "paragraphs": [
        "العظم الجداري (بالإنجليزية: Parietal bone) هو أحد عظام الجمجمة يشكل باتحاده مع نظيره في الجانب المقابل جانب وسقف الجمجمة. له شكل رباعي غير منتظم، يوصف له سطحان وأربعة حدود وأربع زاويا. يتوضع ضمن سطحه الداخلي التلم السهمي الذي يسير فيه الجيب السهمي العلوي."
      ]
    },
    "temporal": {
      "name": "العظم الصدغي",
      "paragraphs": [
        "العظم الصدغي (بالإنجليزية: Temporal bone) هو عظم مزدوج يتوضع في القسم السفلي الجانبي من القحف أو الجمجمة، ويشكل جزءاً من جانب الجمجمة وقاعدتها. يجاور العظم الصدغي من الأمام العظم الوتدي (بالإنجليزية: Sphenoid bone) ومن الخلف العظم القفوي (بالإنجليزية: Occipital bone) ومن الأعلى العظم الجداري (بالإنجليزية: Parietal bone). يساهم العظمان الصدغيان بتشكيل جزء من الوجه في كل جانب يدعى الصدغ، وهما يحويان أعضاء السمع والتوازن ويظهر على الوجه الخارجي لكل منهما الصماخ السمعي الخارجي. للعظم الصدغي خمسة أجزاء: الجزء الصدفي (بالإنجليزية: Squamous part)، الجزء الخشائي (بالإنجليزية: Mastoid part)، الجزء الصخري (بالإنجليزية: Petrous part)، الجزء الطبلي (بالإنجليزية: Tympanic part) والناتئ الإبري (بالإنجليزية: Styloid process)."
      ]
    },
    "occipital": {
      "name": "العظم القذالي",
      "paragraphs": [
        "العظم القذالي (بالإنجليزية: Occipital bone) هو أحد العظام الجلدية للقحف العظام وهو العظم الرئيسي للقذال (الجزء الخلفي والسفلي من الجمجمة). يأخذ العظم القذالي شكل شبه منحرف منحني على نفسه مثل طبق ضحل. يعلو العظم القذالي الفصوص القذالية للدماغ. في قاعدة الجمجمة في العظم القذالي توجد فتحة بيضاوية كبيرة تسمى الثقبة العظمى والتي تسمح بمرور الحبل الشوكي."
      ]
    },
    "maxilla": {
      "name": "عظم الفك العلوي",
      "paragraphs": [
        "الفك العلوي (بالإنجليزية: Maxilla) هو أحد عظام الجمجمة وهو عظم ثابت بعكس الفك السفلي الذي يمثل العظم الوحيد المتحرك من عظام الجمجمة."
      ]
    },
    "mandible": {
      "name": "عظم الفك السفلي",
      "paragraphs": [
        "عظمُ الفَكِّ السُّفلِيّ (بالإنجليزية: Mandible) (بالإنجليزيّة المحكيّة: Lower jaw) أو عظم الفك (بالإنجليزية: Jawbone)، (باللاتينية: Mandibula)، هو أكبر وأقوى وأدنى (في المستوى) عظم في هيكل الوجه. يحمل هذا العظم الأسنان السفلية، ويقع هذا العظم أسفل عظم الفك العلويّ. يعتبر عظم الفك السفلي العظم الوحيد المُتحرِّك في الجمجمة (باستثناء عظيمات السمع في الأذن الوسطى). يتصل عظم الفك السفلي بالعظمين الصدغيين على الجانبين بواسطة المفاصل الصدغية الفكية."
      ]
    },
    "cervical-vertebrae": {
      "name": "الفقرات العنقية",
      "paragraphs": [
        "الفقرات الرقبية أو الفقرات العنقية (بالإنجليزية: Cervical vertebrae) يوجد في الرقبة سبع فقرات مرقمة تسلسليا من الأعلى إلى الأسفل. تسمى الفقرة الأولى بالأطلس وهي تشبه الحلقة، وتكون مع قاعدة الجمجمة من الأعلى مفصل يسمى المفصل بالأطلسي. وتسمى الفقرة العنقية الثانية بالمحور حيث يخرج منها بروز إلى أعلى كأنه وتد أو محور. ويربط هاتين الفقرتين مفصل يسمى المفصل المحور الأطلسي حيث يدخل الوتد في الجزء الأمامي من حلقة الأطلس ويمتد رباط من جانبي الحلقة من الداخل ليحافظ على استقرار المفصل."
      ]
    },
    "thoracic-vertebrae": {
      "name": "الفقرات الصدرية",
      "paragraphs": [
        "فقرة صدرية (بالإنجليزية: Thoracic vertebrae) هي إحدى فقرات العمود الفقري وعددها (12) فقرة تقع بين الفقرات العنقية والقطنية. تمتاز هذه الفقرات بالزيادة في حجمها تدرجاً من الأعلى إلى الأسفل إذ تكون الفقرة الثانية عشر أكبرها حجماً ولا توجد فتحة في النتوء المستعرض كما في الفقرات العنقية وتتمفصل هذه الفقرات مع الأضلاع. حيث يتمفصل رأس كل ضلع مع جسم فقرتين أحدهما موافقة للضلع بالعدد والأخرى تسبق الضلع عدداً، كما أن درنة الضلع تتمفصل مع القسم الأمامي للنتوء المستعرض للفقرة التي تحمل نفس رقم الضلع ومن هذا الترابط يترك وجيهان هلاليان الشكل علويان وسفليان عند جانبي الحافة العليا والسفلى لجسم الفقرة كما يترك وجيه مفصلي على القسم الأمامي للنتوء المستعرض وبهذه الصفات تتصف الفقرات الصدرية."
      ]
    },
    "lumbar-vertebrae": {
      "name": "الفقرات القطنية",
      "paragraphs": [
        "الفقرات القَطَنِيَّة (بالإنجليزية: Lumbar vertebrae) هي إحدى أقسام العمود الفقري وعددها خمس فقرات، وتقع بين الفقرات الصدرية والفقرات العجزية. تمتاز بكبر حجمها عن باقي الفقرات التي تعلوها (العنقية الصدرية) وتحمل جميع صفات الفقرة النموذجية فلا توجد فتحة بالنتوء المستعرض كالفقرات العنقية ولا توجد أوجه مفصلية على جوانب الجسم أو على القسم الأمامي للنتوء المستعرض كما في الفقرات الصدرية، والنتوء الشوكي رباعي الشكل موازٍ لسطح الأرض، وتتباعد النتوءات الشوكية بعضها عن بعض أما النتوء المستعرض فقصير. والفتحة الفقرية مثلثة الشكل بسبب قصر السويقة وتكون أكبرَ من الفتحة الفقرية في الفقرات الصدرية، ولكنها أصغر من الفتحة الفقرية في الفقرات العنقية."
      ]
    },
    "sacrum": {
      "name": "عجز (تشريح)",
      "paragraphs": [
        "العَجُز (باللاتينية: os sacrum) عظم كبير مثلث الشكل يقع في قاعدة العمود الفقري في الجزء الخلفي العلوي من الحوض ومتموضع بشكل يشبه الإسفين بين العظمين الوركيين ويرتبط في الأسفل مع العصعص وفي الأعلى مع الفقرة القطنية الخامسة."
      ]
    },
    "sternum": {
      "name": "عظم القص",
      "paragraphs": [
        "عظم القَصّ (باللاتينية: Sternum) عظمٌ مسطح، مفرد، طويل، غير سميك، من عدة قطع ملتحمة، طوله نحو 19 سم، يشبه السيف الروماني العريض وضعه في الجسم شاقوليًّا مع ميلان قليل نحو الأمام، هو في منتصف الصدر في الأمام عند الإنسان، يتصل بالأضلاع السبعة العليا بواسطة الغضاريف الضلعية ويكوّن مع الأضلاع والفِقْرات الصدرية القفص الصدري الذي يحمي القلب والرئتين ويمنح مواقع لاتصال عضلات الصدر والبطن والظهر والأطراف العليا، ويتألف من ثلاثة أجزاء:"
      ]
    },
    "ribs": {
      "name": "الأضلاع",
      "paragraphs": [
        "الضلع هو أحد عظام القفص الصدري في الإنسان، ويوجد لدى الإنسان 24 ضلعاً بحيث يكون هناك 12 ضلع على كل جانب من جانبي الجسم، توجد بين الأضلاع عضلات (تعرف بالعضلات الوربية)، وأوعية دموية وأعصاب."
      ]
    },
    "clavicle": {
      "name": "عظم الترقوة",
      "paragraphs": [
        "التَّرْقُـوَة (الجمع: التَّراقي) أو الناحرة (بالإنجليزية: Clavicle) عظم يُصَنَّف في تشريح جسم الإنسان بأحد العظام الطويلة، وهي تعمل دعامة بين لوح الكتف في الظهر وعظم القص في منتصف الصدر. هناك ترقوتان، واحدة علي اليمين والأخرى على اليسار، وهي العظم الطويل الوحيد الذي يقع أفقياً في جسم الإنسان."
      ]
    },
    "scapula": {
      "name": "لوح الكتف",
      "paragraphs": [
        "عَظْم الكَتِف أو عظم اللَّوْح أو لوح الكتف (بالإنجليزية: Scapula) عظمة مسطحة زوجية تقع في الجزء الخلفي من منطقة الحزام الكتفي. العظمة كبيرة نسبياً وقريبة من شكل المثلث. وهي تتصل بعظمتي الترقوة والعضد."
      ]
    },
    "humerus": {
      "name": "عظم العضد",
      "paragraphs": [
        "النَّقَا أو النَّقْو أو عظم العَضُد (بالإنجليزية: Humerus) هو من العظام الطويلة وهو جزء من الهيكل العظمي البشري ويوجد في العضد حيث يصل الكتف مع المرفق. ويرتبط مع عظم الكتف علويا ومع عظمي الزند والكعبرة سفلياً، وينقسم تشريحيا إلى ثلاثة أقسام. يتكون الطرف العلوي العضدي من رأس مستدير وعنق ضيق وعمليتين قصيرتان (درنات، تسمى أحيانًا حدبة). الجسم أسطواني في الجزء العلوي منه وأكثر موشورية في الأسفل. يتكون الطرف السفلي من لقيمتان، وعضدان (بكرة عضدية ورؤيس العضد)، وثلاثة حفر (الحفرة الشعاعية، الحفرة التاجية، حفرة زجية). بالإضافة إلى رقبته التشريحية الحقيقية، يُشار إلى الانقباض تحت الدرنات الكبيرة والصغيرة لعظم العضد على أنه عنقها الجراحي بسبب ميله إلى الكسر، وبالتالي غالبًا ما يصبح محور تركيز الجراحين."
      ]
    },
    "radius": {
      "name": "عظم الكعبرة",
      "paragraphs": [
        "الكعبرة (بالإنجليزية: Radius (bone)) هي أحد عظمتي منطقة الساعد، تصل المرفق مع الرسغ. و تقع عظمة الكعبرة على يسار عظمة الزند. ويمر العصب الكعبري من خلال القناة الكعبرية مع أعصاب العضد العميقة."
      ]
    },
    "ulna": {
      "name": "عظم الزند",
      "paragraphs": [
        "عظم الزَّنْد (بالإنجليزية: Ulna) هو أحد العظام الطويلة في البشر، وهو أحد عظمتين طوال داخل الساعد (العظمة الأخرى هي الكعبرة). وهي تمتد من المرفق إلى الرسغ موازية للكعبرة. في الوضع القياسي التشريحي، عندما يكون الساعد ممتدا لأسفل ويكون الكف متوجها للأمام، يكون الزند واقعا على الجهة الأقرب للجسم (الجهة الإنسية). قد ينكسر الزند حال الوزن الزائد أو الاصطدام الشديد."
      ]
    },
    "hand-phalanges": {
      "name": "عظام الأصابع",
      "paragraphs": [
        "الأَصْبُعُ والأُصْبِعُ والأَصْبِعُ والإِصْبِعُ هو جزء من اليد أو القدم، والأصابع موجودة في الرئيسيات الأخرى، ويد الإنسان العادية تحتوي على خمس أصابع، وتستخدم الأصابع في كثير من الأنشطة مثل اللمس والإمساك بالأشياء والكتابة. ويُوجد في كلّ إصبعٍ من أصابع الإنسان (باستثناء الإبهام) ثلاث مفاصل، تسمّى عموماً البراجم."
      ]
    },
    "hip-bone": {
      "name": "عظام الحوض",
      "paragraphs": [
        "عظم الورك أو عظم الحوض يسمى أيضاً العظم غير المسمى أو العظم اللَّامُسَمَّى هو عظم كبير عريض مسطح غير منتظم الشكل، يكون سميكاً في بعض الأمكن، مثل: الحُق، ورقيقاً في أماكن أخرى، مثل: الحفرة الحَـرْقَـفية، وهو في المرحلة الجنينية يكون مؤلفاً من ثلاثة عظام هي عظمة علوية تدعى الحَـرْقَـفَـة، وعظمة أمامية تدعى العانة، وأخرى سفلية خلفية تدعى الإسك، وتلتحم مع بعضها عند الحُق بعد البلوغ."
      ]
    },
    "femur": {
      "name": "عظم الفخذ",
      "paragraphs": [
        "عظم الفخذ (بالإنجليزية: Femur) والجمع (بالإنجليزية: femora) يُصنّف كأحد العظام الطويلة، وهو أطول عظام الهيكل العظمي عند الإنسان، ويكوّن أكثر من 26.74% من طول الإنسان، وهو أيضاً أقوى عظام الجسم وأصلبها في البشر. يتكون عظم الفخذ من:"
      ]
    },
    "patella": {
      "name": "رضفة",
      "paragraphs": [
        "الرَّضْفَة (بالإنجليزية: Patella) أو الدَّاغِصَة أو عظمة رأس الركبة (بالإنجليزية: Kneecap) أو (بالإنجليزية: kneepan)، هي عظمة سميكة مستديرة ومثلثة الشكل تتمفصل مع عظم الفخذ، و هي تغطي وتحمي الجزء الأمامي لسطح مفصل الركبة. توجد الرضفة عند معظم الفقاريات مثل الفئران والقطط والطيور، ولكنها لا توجد في الحيتان و لا في الزواحف مثل الثعابين ولا في البرمائيات مثل الضفادع. تُعتبر الرضفة في الإنسان أكبر عظم سمسمي في الجسد كله. يولد الأطفال برضفة من الغضروف الرخو، ثم يبدأ التعظّم والتحول تدريجيا إلى عظم كامل عند بلوغه نحو ثلاث سنوات."
      ]
    },
    "tibia": {
      "name": "قصبة الساق",
      "paragraphs": [
        "قصبة الساق أو عظم الظنبوب (الجمع: ظنابيب) هو العظم الأكبر والأقوى وذو التوضع الأمامي من بين عظمي الساق تحت الركبة لدى الفقاريات (العظم الآخر هو الشظية، يتوضع خلف الظنبوب وإلى الخارج منه)، ويصل الركبة بعظام الكاحل. يوجد عظم الظنبوب في الجانب الأنسي (الأقرب إلى الوسط) من الساق إلى جانب الشظية ويكون أقرب منها إلى المستوى الناصف أو الخط المركزي. يرتبط عظم الظنبوب بعظم الشظية بالغشاء بين العظمي في الساق مشكلًا نوع من المفاصل الليفية يدعى التلازم ذات الحركة القليلة جدًا. أطلق على العظم اسم قصبة الساق تيمنًا بساق الناي. إنه ثاني أكبر العظام في جسم الإنسان بعد عظم الفخذ. إن عظام الساق هي أقوى العظام الطويلة إذ أنها تدعم باقي الجسم."
      ]
    },
    "fibula": {
      "name": "عظم الشظية",
      "paragraphs": [
        "عظم الشظية (باللاتينية: fibula) هو أحد العظام الطويلة في البشر، وهو أحد عظمتي الساق الموجود على الجانب الوحشي أي الخارجي للساق، بينما يكون العظم الآخر وهو قصبة الساق في الجانب الإنسي أي الداخلي للساق."
      ]
    },
    "foot": {
      "name": "عظام القدم",
      "paragraphs": [
        "مُشْط القدم مجموعةٌ من خمسة عظام طويلة في قدم الإنسان، تصل عظامَ الرُّصْغ بعظام سُلَامَيَات القدم. تُرَقَّم عظام مُشط القدم من الجانب الإنسي (جانب إصبع القدم الكبير): مشط القدم الأول، والثاني، والثالث، والرابع، والخامس (ترقم بالأرقام الرومانية غالبًا). عظام مشط القدم تُماثل عظام المشط في اليد. أطول عظام مشط القدم في الإنسان هي بترتيب تنازلي: الثاني، والثالث، والرابع، والخامس، والأول."
      ]
    }
  }
};

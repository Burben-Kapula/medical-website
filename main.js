import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { OBJLoader } from "jsm/loaders/OBJLoader.js"; // ✅ для skeleton.obj
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/loaders/GLTFLoader.js';

let mouse, model;
let isHovered = false;


// --- Сцена, камера, рендер --- --- Kohtaus, Kamera, Renderöinti ---
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

// // Ліве світло Vasen valo
const lightLeft = new THREE.DirectionalLight(0xffffff, -0.15);
lightLeft.position.set(-5, 5, 0);
scene.add(lightLeft);

// // // Праве світло oikean valo
const lightRight = new THREE.DirectionalLight(0xffffff, -0.35);
lightRight.position.set(5, 5, 0);
scene.add(lightRight);

// // Переднє світло seuran valo
const lightFront = new THREE.DirectionalLight(0xffffff, -0.35);
lightFront.position.set(0, 5, 5);
scene.add(lightFront);

// // Заднє світло taka valo
const lightBack = new THREE.DirectionalLight(0xffffff, -0.15);
lightBack.position.set(0, 5, -5);
scene.add(lightBack);


// // Нижнє світло ala valo
const lightBottom = new THREE.DirectionalLight(0xffffff, -0.1);
lightBottom.position.set(0, -5, 0);
scene.add(lightBottom);


// М’яке загальне світло (Ambient) Pehmeä yleisvalo (Ympäröivä)
const ambientLight = new THREE.AmbientLight(0xffffff, -0.15);
scene.add(ambientLight);

// zoom
const zoom = 7;
const camera = new THREE.OrthographicCamera(
  w / -200 / zoom,
  w / 200 / zoom,
  h / 200 / zoom,
  h / -200 / zoom,
  0.1,
  1000
);



// modelli paikka
camera.position.set(1, 0, 80);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// --- Контроли --- --- Ohjaimet ---
const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;
ctrls.dampingFactor = 0.05;
ctrls.screenSpacePanning = true;
ctrls.minDistance = 1;
ctrls.maxDistance = 200;



// painikkeiden värien vaihtaminen
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach(button => {
    const color = button.dataset.color;
    if (!color) return;
    button.style.backgroundColor = color;
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.border = '1px solid #000';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {
        scene.background = new THREE.Color(color);
    });
});

//Mallikuormaaja
const objLoader = new OBJLoader();
objLoader.load("./assets/skelewwttt.obj", (object) => {
  object.scale.set(0.05, 0.05, 0.05);
  object.position.set(-0.3, -0.3, 0);
  scene.add(object);
});



// --- Освітлення ---// --- Valaistus ---
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// --- Рендер ---// --- Renderöi ---
function animate() {
  requestAnimationFrame(animate);
  ctrls.update();
  renderer.render(scene, camera);
}
animate();

// --- Ресайз ---// --- Muuta kokoa ---
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.left   = w / -200 / zoom;
  camera.right  = w / 200 / zoom;
  camera.top    = h / 200 / zoom;
  camera.bottom = h / -200 / zoom;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

//Suomi
document.addEventListener("DOMContentLoaded", () => {
  const text_fi = {
    Otsaluu: `<h2>Otsaluu</h2><p>Otsaluu on pariton luu, joka muodostaa osan kalloa. Otsaluu koostuu kuudesta osasta. Sen tärkein tehtävä on suojella otsalohkoja.​</p>`,
    Päälaenluu: `<h2>Päälaenluu</h2><p>Päälaenluut (lat. os parietale) ovat kaksi luuta kallossa, jotka muodostavat pääkallon sivut ja katon. Molemmat luut ovat noin nelikulmion muotoisia.​​</p>`,
    Ohimoluu: `<h2>Ohimoluu</h2><p>Ohimoluu (lat. os temporale) kuuluu kallon luihin, ja se sijaitsee kallon sivuilla sulkien sisäänsä korvakäytävän, välikorvan ja sisäkorvan. Ohimoluu muodostuu 
    kolmesta toisiinsa liittyneestä osasta: pars squamosa, ohimoluun kallio-osa (pars petrosa) ja pars tympanica. Pars squamosan uloke, processus zygomaticus, kiinnittyy otsaluun samannimiseen 
    rakenteeseen muodostaen silmän ympärille silmäkaaren, arcus zygomaticuksen. Lisäksi siinä on nivelpinta alaleuan luuta varten. Välikorva ja sisäkorva sijaitsevat pars petrosan onteloiden sisällä.
     Korvakäytävää puolestaan ympäröi pars tympanica. Ohimoluu on parillinen luu eli niitä on kaksi, vasen ja oikea.​​</p>`,
    Takaraivoluu: `<h2>Takaraivoluu</h2><p>(lat. os occipitale) kuuluu kallon luihin (ossa cranii) ja se koostuu kolmesta yhteen liittyneestä osasta. Pars basilaris sijaitsee alimmaisena ja sen 
    alaosassa on atlaksen kanssa artikuloiva condylus occipitalis. Pars lateralis sijaitsee pars basilariksen molemminpuolin ja siinä oleva uloke, processus paracondylaris, toimii pään lihasten
     kiinnittymiskohtana. Squama occipitalis sijaitsee ylimpänä takaraivoluussa ja sen yläosassa on palpoitavissa oleva kyhmy, crista nuchae. Kaikki kolme takaraivoluun osaa osallistuvat 
     niska-aukon (foramen magnum) muodostamiseen.​​</p>`,
    Yläleukaluu: `<h2>Yläleukaluu</h2><p>Yläleuka (lat. maxilla) koostuu kahdesta, vasemmasta ja oikeasta, yläleuanluusta (lat. os maxillaris). Ylähampaat ovat kiinni yläleukaluissa. 
    Suurimmat nenän sivuonteloista, vasen ja oikea poskiontelo (lat. sinus maxillaris), sijaitsevat yläleukaluissa.Yläleuka jää usein nykyisin pienemmäksi pehmeämmän ravinnon vuoksi, ja
     syntyy purentavirheitä. Toinen syy yläleuan pieneksi jäämiseen voi olla hengittäminen suun kautta. Kitarisojen poisto voi auttaa nenähengitystä ja näin edistää yläleuan kasvua.​</p>`,
    Alaleukaluu: `<h2>Alaleukaluu</h2><p>Alaleuanluu (mandibula) on selkäjänteisten luu, johon alahampaat ovat kiinnittyneet. Rungon takaa suuntautuvat ylöspäin alaleukaluun haarat. Vasen 
    ja oikea yläleuanluu sijaitsevat alaleuanluuta vasten niveltymättä siihen. Ihmisellä alaleuan kärjessä on leukakyhmy. Alaleuanluu niveltyy korvakäytävien lähellä ohimoluihin. Kyseiset 
    leukanivelet liikkuvat suuta aukoessa.​</p>`,
    Kaulanikama: `<h2>Kaulanikama</h2><p> Selkäranka jaetaan kolmeen osaan: kaularanka, rintaranka (yläselkä) ja lanneranka (alaselkä). Lannerangan jatkeena on risti- ja häntäluu. Selkäranka rakentuu nikamista, kaularangassa on 7, rintarangassa 12 ja lannerangassa 5 nikamaa.​</p>`,
    Rintanikama: `<h2>Rintanikama</h2><p>Rintanikama on yksi selkärangan osista, tarkemmin sanottuna rintarangan eli thorakaalisen osan nikama. Ihmisellä rintaranka koostuu yleensä kahdesta­toista
     nikamasta, jotka muodostavat keskiosan selkärangasta. Rintanikamat kiinnittyvät kylkiluihin ja tukevat rintakehää, suojaten sydäntä ja keuhkoja sekä mahdollistavat selän ja vartalon liikkeet.</p>`,
    Lanneranka: `<h2>Lanneranka</h2><p>Lanneranka on selkärangan alaosa, eli yleensä viisi nikamaa, jotka muodostavat alaselän osan. Lannerangan nikamat ovat suurempia kuin rinta- ja kaulanikamat,
     koska ne kantavat suurimman osan kehon painosta. Ne tukevat vartaloa, mahdollistavat selän taivutukset ja kiertoliikkeet.</p>`,
    Ristiluu: `<h2>Ristiluu</h2><p>Ristiluu (lat. os sacrum) koostuu viidestä yhteen sulautuneesta ristinikamasta. Se muodostaa yhdessä lonkkaluun kanssa luisen lantiorenkaan. Yläosastaan ristiluu
     niveltyy alimpaan lannenikamaan, sivuilta lonkkaluihin ja alhaalta häntäluuhun. Ristiluun tasolla ei ole enää selkäydintä, mutta monet selkäydinhermojen juuret kulkevat sen sisällä olevassa 
     ristiluukanavassa. Ristiluu on vahva luu, ja se murtuu harvoin. Murtumisen syinä on yleensä liikenneonnettomuus tai voimakas isku suoraan luuhun.​
    Nimensä ristiluu on saanut hevosen ristiluusta, joka irrotettuna ja pystyyn nostettuna muistuttaa krusifiksia.​
    Ristiluun tienoota kutsutaan ristiseläksi.​</p>`,
    Rintalasta: `<h2>Rintalasta</h2><p>Rintalasta  Rintalasta (sternum) on pitkä ja litteä luu, joka sijaitsee keskellä rintakehää. Kylkiluut kiinnittyvät siihen suoraan kylkirustojen avulla 
    (costae sternales). Osa kylkiluista kiinnittyy rintalastaan kostaalisen kaaren avulla, joka muodostuu kun kylkiluiden rusto-osat yhtyvät (costae asternales). Ihmisellä kaksi alinta ja koiralla 
    alin kylkiluu eivät ole yhteydessä rintalastaan (costae fluctuantes). Rintalasta muodostuu suuremmasta, litteästä rintalastan rungosta (corpus sterni) sekä kolmiomaisesta osasta sen yläosassa,
     rintalastan kahvasta (manubrium sterni), joka on hyvin kehittynyt niillä eläinlajeilla, joilla on myös hyvin kehittyneet solisluut. Molemmat solisluut niveltyvät tähän kolmiomaiseen osaan.
      Lisäksi isot rintalihakset kiinnittyvät osaksi siihen. Rintalastan alaosassa on kapea miekkalisäke (processus xiphoideus).​
    Rintalastasta voidaan ottaa luuydinnäyte rintalastapiston eli sternaalipunktion avulla. Näyte otetaan yleensä rintalastan kahvasta.​
    ​</p>`,
    Kylkiluu: `<h2>Kylkiluu</h2><p> Kylkiluut (lat. costa, monikossa costae) ovat luita, jotka osallistuvat rintakehän muodostamiseen. Kylkiluiden tehtävä on suojella rintaontelon elimiä.​</p>`,
    Solisluu: `<h2>Solisluu</h2><p>Solisluu eli klavikula (lat. clavicula) kuuluu yläraajan luihin ja se muodostaa hartiakaaren yhdessä lapaluun kanssa. Solisluu kiinnittyy rintalastan yläosaan 
    rintalasta-solisluunivelen (lat. articulatio sternoclavicularis) välityksellä. Lapaluuhun solisluu niveltyy olkalisäke-solisluunivelessä (lat. articulatio acromioclavicularis). Solisluu murtuu
     ja katkeaa herkästi.​</p>`,
    Lapaluu: `<h2>Lapaluu</h2><p>Lapaluu (lat. scapula) on hartian luihin kuuluva luu. Se on kolmikulmainen litteä luu, joka sijaitsee selässä kylkiluiden takana ja niveltyy solisluuhun sekä olkaluuhun.
     Lapaluu toimii useamman yläraajaa liikuttavan lihaksen lähtöalueena.​</p>`,
    Olkaluu: `<h2>Olkaluu</h2><p>Olkaluu (lat. humerus) on olkavarren ainoa luu. Yläpäästään se rajoittuu olkaniveleen ja alapäästään kyynärniveleen. Olkaluun olkaniveleen osallistuvassa osassa eli 
    sen yläpäässä on nivelrustoa puolipallon muotoisella alueella. Kyynärniveleen osallistuvassa luun alapäässä on kyynärluuta vastaava olkaluun tela ja värttinäluuta vastaava olkaluun värttinänasta.
     Olkaluun anatominen vastine jalassa on reisiluu.​
    Mahdollisia olkaluun ongelmia ovat olkaluun murtuma ja olkaluun sijoiltaanmeno.​</p>`,
    Värttinäluu: `<h2>Värttinäluu</h2><p>Värttinäluu (lat. radius) on toinen kyynärvarren kahdesta luusta. Se sijaitsee peukalon puolella ja muodostaa yhdessä kyynärluun kanssa kyynärvarren. Ihmisellä
     ja lihansyöjillä näiden kahden luun välissä oleva luuvälikalvo tekee niistä yhden kokonaisuuden. Kyynär- ja värttinäluun kiertyminen toistensa ympäri mahdollistaa niin sanotun avaimenkiertoliikkeen.
    Sialla luut ovat kiinni toisissaan tiiviillä sidekudoksella, joka ei salli kovin suurta kyynärvarren kiertoliikettä. Märehtijöillä ja hevosella luut ovat luutuneet toisiinsa kiinni.​</p>`,
    Kyynärluu: `<h2>Kyynärluu</h2><p> Kyynärluu (lat. ulna) on pikkusormen puolella sijaitseva, ranteen suuntaan kapeneva kyynärvarren luu.​
    Kyynärluun yhdistää vieressä sijaitsevaan värttinäluuhun niiden välissä kulkeva luuvälikalvo. Kyynärluu muodostaa yhdessä värttinäluun ja olkaluun kanssa kyynärnivelen (articulatio cubiti), joka on
     toiminnaltaan kaksiakselinen eli mahdollistaa koukistus/ojennus- ja kiertoliikkeen.​
    ​</p>`,
    Sormienluut: `<h2>Sormien luut</h2><p>Sormien luut ovat luita, jotka muodostavat sormien luisen tukirangan. Ihmisen kaikissa sormissa on kolme luuta paitsi peukalossa, jossa on vain kaksi.​
    Sormiluut ovat sormen tyvijäsen (lat. phalanx proximalis), sormen keskijäsen (phalanx media, puuttuu peukalosta) sekä sormen kärkijäsen (phalanx distalis).[1] Sormiluut ovat pitkulaisia, ja niiden
     osia ovat tyvi (basis) proksimaalisesti, pää (caput) distaalisesti ja näiden välissä runko (corpus).​</p>`,
    Lantionluut: `<h2>Lonkkaluut</h2><p> Lonkkaluu (lat. os coxae) on suuri, litteä ja epäsäännöllisen muotoinen luu, joka on osa luista lantiorengasta. Oikean- ja vasemmanpuoleinen lonkkaluu muodostavat 
    yhdessä lantion sivu- ja etuseinät.​</p>`,
    Reisiluu: `<h2>Reisiluu</h2><p> Reisiluu (lat. femur) on ihmiskehon pisin ja vahvin luu. Se sijaitsee lonkkanivelen ja polvinivelen välissä. Reisiluun anatominen vastine eturaajassa on olkaluu.​
    Reisiluun yläpään pallomainen osa, jossa on lonkkamaljaan niveltyvä nivelpinta on nimeltään reisiluun pää (caput femoris). Se pää kiinnittyy reisiluun varteen ohuehkolla reisiluunkaulalla (collum femoris),
     joka on reisiluun helpoiten murtuva osa varsinkin vanhuksilla. Reisiluun yläosassa lateraalisesti reisiluun päähän nähden sijaitsee iso sarvennoinen (trochanter major), hyvin tuntuva luu-uloke, johon 
     monien pakaranseudun lihasten jänteet kiinnittyvät. Reisiluun yläosan takapinnalla lihasten peitossa puolestaan sijaitsee toinen luu-uloke, pieni sarvennoinen (trochanter minor), johon kiinnittyy
       lanne-suoliluulihas (musculus iliopsoas) jänne. Kolmas samankaltainen uloke on kolmas sarvennoinen (trochanter tertius), joka esiintyy toisinaan pienen sarvennoisen korkeudella reisiluun takapinnalla
        ja johon kiinnittyy osa isosta pakaralihaksesta (musculus gluteus maximus).​
    ​</p>`,
      Polvilumpio: `<h2>Polvilumpio</h2><p>Polvilumpio (lat. patella) on kolmionmuotoinen luu, joka sijaitsee nelipäisen reisilihaksen jänteessä. Se liikkuu pitkin reisiluun alaosan etupintaa polven koukistuessa 
    ja ojentuessa. Polvilumpio yhdistää nelipäisen reisilihaksen jänteet yhdellä alapuolisella jänteellä sääriluuhun. Kyseisiä jänteitä tarvitaan jalan ojentamiseen.​</p>`,
    Sääriluu: `<h2>Sääriluu</h2><p>Sääriluu (lat. tibia) on suurempi kahdesta säären luusta. Sääriluu niveltyy yläpäästään reisiluuhun (femur) ja alapäästään telaluuhun (talus). Sääriluu niveltyy myös
     ulkosivullaan kulkevaan pohjeluuhun (fibula).​</p>`,
    Pohjeluu: `<h2>Pohjeluu</h2><p> Pohjeluu (lat. fibula) on ohuempi kahdesta säären luusta. Se sijaitsee takaraajan (ihmisellä alaraajan) lateraalisella puolella sääriluun (tibia) vieressä siihen niveltyen.
     Luiden väliin jää vaihtelevan kokoinen aukko (spatium interossium cruris), jossa kulkee luut toisiinsa sitova sidekudoskalvo (membrana interossea cruris). Pohjeluu sijaitsee alempana kuin sääriluu eikä
      näin ollen kiinnity reisiluuhun (femur). Naudalla ja pienillä märehtijöillä pohjeluu on surkastunut lähes kokonaan, mutta hevosella vain osittain. Nilkkaluista pohjeluu niveltyy telaluuhun (talus),
       mutta kiinnittyy nivelsiteillä myös kantaluuhun (calcaneus).​</p>`,
    Jalkateränluut: `<h2>Jalkaterän luut</h2><p>Jalkaterän luut muodostavat koko jalkaterän luurangon. Ne sisältävät nilkan luut, jalkapöydän luut ja varpaiden luut. Jalkaterän luut tukevat kehon painoa,
     mahdollistavat kävelyn, juoksun ja tasapainon säätelyn.</p>`,
    };



//Ukraina
let text_ua = {
  Otsaluu: `<h2>Лобова кістка</h2><p>Ло́бна кістка також лобова́ кістка (лат. os frontale) — одна чи декілька кісток мозкового черепа. Вони з'єднуються з носовими кістками спереду, слізною і заочними кістками по боках, тім'яними ззаду. У більшості тварин лобні кістки парні, тоді як у представників роду Homo вони формують непарну, зрослу структуру.</p>`,
  Päälaenluu: `<h2>Тім'яна кістка</h2><p>Тім'яна́ кістка (лат. os parietale) — парна кістка мозкового черепа. Має вигляд чотирикутної пластинки, посередині кістка має тім'яний горб (tuber parietale). Між тім'яними горбами міряють ширину мозкового черепа, вони відповідають антропометричним тім'яним точкам (euryon).
    Тім'яні кістки з'єднуються між собою, утворюючи сагітальний шов (sutura sagittalis), розташований якраз у сагітальній площині людського тіла. Також вони з'єднуються з іншими черепними кістками:
    З лобовою кісткою — вінцевим швом (sutura coronalis). У місці сходження сагітального і вінцевого швів у новонароджених розташовується переднє тім'ячко.
    З обох боків зі скроневими кістками — тім'яно-соскоподібним (sutura parietomastoidea) і лускатим (sutura squamosa) швами.
    З потиличною — лямбдоподібним швом (sutura lambdoidea).
    З обох боків зі клиноподібною кісткою — клиноподібно-тім'яним швом (sutura sphenoparietalis)
    Поверхня склепіння черепа над тім'яними кістками називається тім'яною ділянкою (regio parietalis).</p>`,
  Ohimoluu: `<h2>Скронева кістка</h2><p>Скроне́ва кістка (лат. os temporale) — парна кістка мозкового черепа, що входить до складу основи бічної стінки мозкового черепа, розташовується між клиноподібною, тім'яною і потиличною кістками.
    Загальний опис
    Складається з луски, барабанної частини, соскоподібної частини і пірамідки, що утворює основу черепа. Луска ззовні гладенька. Від луски відходить виличний відросток (processus zygomaticus), який з'єднується з скроневим відростком виличної кістки. Утворюється вилична дуга. В основі виличного відростка є суглобова нижньощелепна ямка (fossa mandibularis), куди заходить суглобовий відросток нижньої щелепи. Утворюється скронево-нижньощелепний суглоб.
    Кам'яниста частина має форму трибічної піраміди, що розташована у черепі майже горизонтально. Її основа, повернена назад і вбік, переходить у соскоподібний відросток (processus mastoideus). Верхівка кам'янистої частини спрямована вперед і до середини. Кам'яниста частина має три поверхні: передню, задню і нижню. Передня і задня поверхня обернені в порожнину черепа. Поверхні розмежовані трьома краями: верхнім, переднім і заднім.</p>`,
  Takaraivoluu: `<h2>Потилична кістка</h2><p>Потилична кістка (лат. os occipitale) — непарна кістка мозкового черепа.
    Анатомія 
    Потилична кістка складається з луски, бічних частин і основи або тіла. Всі перелічені частини оточують великий отвір, через який спинний мозок з'єднується з головним. Ззовні на лусці є зовнішнє потиличне підвищення, вниз від якого відходить зовнішній потиличний гребінь, а в сторони — верхня і нижня вийні (каркові) лінії. На внутрішній поверхні луски є внутрішнє потиличне підвищення, вниз від якого відходить внутрішній потиличний гребінь, вверх сагітальна борозна, а в сторони — поперечні борозни. Утворюється хрестоподібне підвищення, яке ділить луску на 4 ямки: у верхніх лежать задні полюси півкуль великого мозку, а в нижніх — півкулі мозочка. У борознах знаходяться венозні синуси, куди збирається венозна кров від головного мозку. Стінки синусів не спадаються і це забезпечує швидке відтікання венозної крові від головного мозку.</p>`,
  Yläleukaluu: `<h2>Верхня щелепа</h2><p>Верхньощелепна́ кі́стка (лат. maxilla) — кістка верхньої щелепи в кісткових риб, включно з чотириногими. В анатомії людини maxilla означає всю верхню щелепу.
    Людини Верхня щелепа людини (maxilla) — парна кістка лицевого черепа. Вона має тіло (corpus maxillae) і 4 відростки: лобовий (processus frontalis), виличний (processus zygomaticus), альвеолярний (processus alveolaris) і піднебінний (processus palatinus).
    Тіло верхньої щелепи (corpus maxillae) містить верхньощелепну пазуху (sinus maxillaris), що сполучається через великий верхньощелепний розтвір (hiatus maxillaris) з носовою порожниною. Цю порожнину ще називають пазухою Гаймора. Тіло має неправильну кубоподібну форму, на ньому є 4 поверхні: передня, очноямкова, підскронева і носова.</p>`,
  Alaleukaluu: `<h2>Нижня щелепа</h2><p>Нижньощеле́пна кі́стка (лат. mandibula) — кістка лицевого черепа. Єдина рухома кістка черепа[1]. Утворена з двох зубних кісток в амніотів, в анамній розділена.
    Анатомія у людини Складається із тіла та двох гілок, сполучених з тілом під кутом 110—130°. Основа тіла масивна. По середній лінії видно звернений вентрально підборідний виступ, який є характерною властивістю черепа людини. На гілках розташовані альвеоли зубів. Гілки щелепи спрямовуються краніально і закінчуються двома відростками: переднім — вінцевим і заднім — суглобовим, розділеними вирізкою. До вінцевого приєднується скроневий м'яз, на другому розташована суглобова голівка скронево-нижньощелепного суглоба. Збоку до суглобового відростка приєднується крилоподібний м'яз.</p>`,
  Kaulanikama:`<h2>Шийний відділ хребта</h2><p>Шийний відділ хребта (лат. vertebrae cervicales) — перший відділ хребта людини та хребетних тварин, що підтримує голову. У людини шийний відділ складається з 7 хребців, позначають їх латинською літерою C (від лат. collum — «шия»).</p>`,
  Rintanikama:`<h2>Грудний відділ хребта</h2><p>Грудний відділ хребта (лат. vertebrae thoracicae) складається з 12 хребців. До цих тіл хребців напіврухомо прикріплені ребра. Грудні хребці і ребра, попереду сполучені грудиною утворюють грудну клітку.</p>`,
  Lanneranka:`<h2>Поперековий відділ хребта</h2><p>Поперековий відділ хребта (лат. vertebrae lumbales) підтримує вагу тіла та складається з 5 хребців.</p>`,
  Ristiluu:`<h2>Крижова кістка</h2><p>Крижова кістка (лат. os sacrum) утворює задню частину таза і зростається з 5 крижовими хребцями.</p>`,
  Rintalasta:`<h2>Груднина</h2><p>Грудина , або грудна кістка ( лат.  sternum , від др.-грец. στέρνον  - "грудина", "груди") - елемент скелета багатьох наземних хребетних . Дає опору плечовому поясу . У земноводних і рептилій грудина зазвичай хрящова , у птахів кісткова [ 1 ] [ 2 ] . У літаючих і деяких тварин, що риють, має серединний виступ для прикріплення грудних м'язів - кіль .

  Грудина людини - довгаста плоска кістка в середині грудей. З'єднується з ребрами за допомогою хрящів , формуючи разом з ними грудну клітину , що вміщає та захищає від зовнішнього впливу легені , серце та найважливіші кровоносні судини .</p>`,
  Kylkiluu:`<h2>Ребро</h2><p>Ре́бра (лат. costae) — парні кістки осьового скелета хребетних тварин (за винятком безщелепних), що з'єднуються з хребтом. У риб ребра дають опору міосептам тулубної мускулатури; появу ребер у філогенезі позв'язують з посиленням локомоції в щелепних. В амніотів ребра грудної області з'єднуються також із грудиною, утворюючи каркас грудної клітки.</p>`,
  Solisluu:`<h2>Ключиця</h2><p>Ключи́ця (лат. clavicula — «ключик») — у людській анатомії — S-подібна зігнута невелика трубчаста кістка у поясі верхніх кінцівок, з тілом і двома кінцями: лопатковим (акроміальним) та грудинним. З'єднує лопатку з грудною кісткою плечового поясу — на обох кінцях є суглобові поверхні для сполучення (відповідно) з ключичною вирізкою рукоятки грудної кістки та акроміальним відростком лопатки. Ключиця ніби відсовує плечовий суглоб на периферію тіла, забезпечуючи свободу рухів руки.</p>`,
  Lapaluu:`<h2>Лопатка</h2><p>Лопа́тка (лат. scapula) — кістка пояса верхніх кінцівок, яка забезпечує з'єднання плечової кістки з ключицею. У людини це плоска кістка приблизно трикутної форми.</p>`,
  Olkaluu:`<h2>Плечова кістка</h2><p>Плечова́ кістка (лат. humerus) — довга трубчаста кістка має тіло (діафіз) та дві голівки (епіфізи). На верхньому епіфізі є кулястої форми суглобова поверхня для сполучення з лопаткою, анатомічна шийка, великий (латеральний) і малий (медіальний) горбки. Від горбків вниз відходять гребені, між якими іде міжгорбкова борозна (тут розташоване сухожилля двоголового м'яза). Нижче горбів знаходиться тонша частина кістки — хірургічна шийка — місце переломів. На тілі є дельтоподібна горбистість, до якої прикріплюється дельтоподібний м'яз. На нижньому епіфізі є два суглобові вирости і два надвирости: більший медіальний і менший латеральний. Суглобові вирости несуть блокоподібну поверхню для з'єднання з ліктьовою кісткою, і кулясту для з'єднання з променевою кісткою. На нижньому епіфізі є ще ліктьова ямка і вінцева, куди заходять відповідні суглобові вирости ліктьової кістки. Ліктьова ямка глибша від вінцевої.</p>`,
    Värttinäluu:`<h2>Променева кістка</h2><p>Промене́ва кі́стка (лат. radius) — довга трубчаста кістка передпліччя. З'єднується з плечовою та ліктьовою кістками. На верхньому епіфізі є суглобова ямка для сполучення з голівкою плечової кістки та суглобове коло для сполучення з ліктьовою кісткою. Поряд з цією голівкою розташована горбистість двоголового м'яза. Дистальний епіфіз має зап'ястну суглобову поверхню для сполучення з верхнім (проксимальним) рядом кісток зап'ястя і закінчується латеральним шилоподібним відростком. На медіальному краї цього епіфізу є суглобова поверхня для сполучення із ліктьовою кісткою.</p>`,
    Kyynärluu:`<h2>Ліктьова кістка</h2><p>Ліктьова кі́стка (лат. ulna) — кістка руки, яка має тіло і два епіфізи. На верхньому епіфізі є два відростки: ліктьовий (англ. olecranon process) і вінцевий (англ. coronoid process). Між ними утворюється блокоподібна вирізка, яка з'єднується з однойменною суглобовою поверхнею плечової кістки (утворюється блокоподібний суглоб). На латеральній поверхні є променева вирізка, куди заходить головка променевої кістки і утворюється проксимальний променево-ліктьовий суглоб (циліндричний). Тіло тригранне: долонна, тильна і латеральна поверхні. Долонна і тильна утворюють міжкістковий гребінь. На нижньому епіфізі є головка з суглобовою поверхнею і медіальний шилоподібний відросток, що виступає зі сторони малого пальця.</p>`,
    Sormienluut:`<h2>Кістки пальців рук</h2><p>Ossa digitorum manus (кістки пальців рук) — кістки, що утворюють скелет пальців кисті. Вони забезпечують рухливість пальців: згинання, розгинання, відведення та приведення. Кожен палець, крім великого, має три кістки: проксимальну, середню та дистальну. Великий палець складається з двох кісток: проксимальної та дистальної. Ці кістки з’єднуються суглобами і прикріплені до м’язів кисті, що дозволяє виконувати тонкі та точні рухи.</p>`,
    Lantionluut:`<h2>Кістки таза</h2><p>Таз (лат. pelvis) — пояс скелета нижньої кінцівки, який складається з двох тазових кісток та крижової, які міцно між собою сполучаються і становлять міцну опору для вільних нижніх кінцівок. Таз є частиною тулуба.
  Український термін таз являє собою кальку латинського pelvis, що означає як «анатомічний таз», так і «миска», «балія», «таз»: з огляду на його характерну чашоподібну форму.</p>`,
  Reisiluu:`<h2>Стегнова кістка</h2><p>Стегнова́ кі́стка (лат. os femoris) — єдина кістка стегна. Найбільша і найдовша трубчаста кістка в організмі людини. Як і всі довгі трубчасті кістки, має тіло та два кінці. З віком кісткова тканина втрачає міцність, через що часто відбувається перелом шийки стегна.</p>`,
    Polvilumpio:`<h2>Колінна кістка</h2><p>Наколі́нок, надколінок, надколінник, колінна чашечка (лат. patella) — найбільша сесамоподібна кістка. За формою нагадує заокруглений трикутник, верхівка якого обернена вниз, а основа — вгору.</p>`,
  Sääriluu:`<h2>Великогомілкова кістка</h2><p>Великогомі́лко́ва кі́стка (лат. tibia), заст. суре́ля — найбільша і основна з двох кісток гомілки, розташована зі сторони, ближчої до осі тіла. Латинська назва первісно означала «дудка, флейта, авлос».</p>`,
  Pohjeluu:`<h2>Малогомілкова кістка</h2><p>Малогомі́лко́ва кістка (лат. fibula) — менша з кісток гомілки, майже не несе фізичного навантаження при ході. Одна з основних функцій малогомілкової кістки — участь у формуванні колінного та надп'ятково-гомілкового суглобів. Складається із тіла (діафіза) та двох епіфізів (проксимальний, дистальний). На проксимальному кінці розташована головка. Виросток на дистальному епіфізі утворює латеральну кісточку.</p>`,
    Jalkateränluut:`<h2>Кістки стопи</h2><p>Кістки стопи людини включають 26 кісток і утворюють три відділи:

Заплесно (лат. tarsus) — 7 кісток проксимального відділу стопи, які з'єднуються з кістками плесна.
Надп'яткова (таранна) (лат. talus);
П'яткова (лат. calcaneus);
Човноподібна (лат. os naviculare);
Бічна клиноподібна (лат. os cuneiforme lateralis);
Проміжна (латеральна) клиноподібна (лат. os cuneiforme intermedium);
Присередня клиноподібна (лат. os cuneiforme medialis);
Кубоподібна (лат. os cuboideum);
Плесно (лат. metatarsale) — 5 коротких трубчастих кісток стопи, розташованих між заплесном і фалангами пальців.
Фаланги (лат. phalanx) — 14 коротких трубчастих кісток, що складають сегменти пальців стопи. Дві фаланги утворюють великий палець, інші пальці складаються з трьох фаланг.</p>`

};
//Enku
const text_en = {
  Otsaluu: `<h2>Frontal bone</h2><p>The frontal bone is a paired element of the skull forming the front part of the head. In the human skull, the frontal bone or sincipital bone is an unpaired bone which consists of two portions. These are the vertically oriented squamous part, and the horizontally oriented orbital part, making up the bony part of the forehead, part of the bony orbital cavity holding the eye, and part of the bony part of the nose respectively. The name comes from the Latin word frons (meaning "forehead").</p>`,
  Päälaenluu: `<h2>Parietal bone</h2><p>The parietal bones form the sides of the skull. The parietal bones (/pəˈraɪ.ətəl/ pə-RY-ə-təl) are two bones in the skull which, when joined at a fibrous joint known as a cranial suture, form the sides and roof of the neurocranium. In humans, each bone is roughly quadrilateral in form, and has two surfaces, four borders, and four angles. It is named from the Latin paries (-ietis), wall.</p>`,
  Ohimoluu: `<h2>Temporal bone</h2><p>The temporal bone is located on the side of the skull. The temporal bone is a paired bone situated at the sides and base of the skull, lateral to the temporal lobe of the cerebral cortex.

The temporal bones are overlaid by the sides of the head known as the temples where four of the cranial bones fuse. Each temple is covered by a temporal muscle. The temporal bones house the structures of the ears. The lower seven cranial nerves and the major vessels to and from the brain traverse the temporal bone.</p>`,
  Takaraivoluu: `<h2>Occipital bone</h2><p>The occipital bone forms the back part of the skull. The occipital bone (/ˌɒkˈsɪpɪtəl/) is a cranial dermal bone and the main bone of the occiput (back and lower part of the skull). It is trapezoidal in shape and curved on itself like a shallow dish. The occipital bone lies over the occipital lobes of the cerebrum. At the base of the skull in the occipital bone, there is a large oval opening called the foramen magnum, which allows the passage of the spinal cord.</p>`,
  Yläleukaluu: `<h2>Maxilla</h2><p>The maxilla forms the upper part of the mouth. In vertebrates, the maxilla (pl.: maxillae /mækˈsɪliː/) is the upper fixed (not fixed in Neopterygii) bone of the jaw formed from the fusion of two maxillary bones. In humans, the upper jaw includes the hard palate in the front of the mouth. The two maxillary bones are fused at the intermaxillary suture, forming the anterior nasal spine. This is similar to the mandible (lower jaw), which is also a fusion of two mandibular bones at the mandibular symphysis. The mandible is the movable part of the jaw.</p>`,
  Alaleukaluu: `<h2>Mandible</h2><p>The mandible forms the lower part of the mouth. In jawed vertebrates, the mandible (from the Latin mandibula, 'for chewing'), lower jaw, or jawbone is a bone that makes up the lower and typically more mobile component of the mouth (the upper jaw being known as the maxilla).</p>`,
  Kaulanikama: `<h2>Cervical vertebra</h2><p>The cervical vertebrae are located in the upper part of the spine. In tetrapods, cervical vertebrae (sg.: vertebra) are the vertebrae of the neck, immediately below the skull. Truncal vertebrae (divided into thoracic and lumbar vertebrae in mammals) lie caudal (toward the tail) of cervical vertebrae. In sauropsid species, the cervical vertebrae bear cervical ribs. In lizards and saurischian dinosaurs, the cervical ribs are large; in birds, they are small and completely fused to the vertebrae. The vertebral transverse processes of mammals are homologous to the cervical ribs of other amniotes.[citation needed] Most mammals have seven cervical vertebrae, with the only three known exceptions being the manatee with six, the two-toed sloth with five or six, and the three-toed sloth with nine.</p>`,
  Rintanikama: `<h2>Thoracic vertebra</h2><p>The thoracic vertebrae form the thoracic section of the spine. n vertebrates, thoracic vertebrae compose the middle segment of the vertebral column, between the cervical vertebrae and the lumbar vertebrae. In humans, there are twelve thoracic vertebrae of intermediate size between the cervical and lumbar vertebrae; they increase in size going towards the lumbar vertebrae.[citation needed] They are distinguished by the presence of facets on the sides of the bodies for articulation with the heads of the ribs, as well as facets on the transverse processes of all, except the eleventh and twelfth, for articulation with the tubercles of the ribs. By convention, the human thoracic vertebrae are numbered T1–T12, with the first one (T1) located closest to the skull and the others going down the spine toward the lumbar region.</p>`,
  Lanneranka: `<h2>Lumbar vertebra</h2><p>The lumbar vertebrae support the weight of the body. The lumbar vertebrae are located between the thoracic vertebrae and pelvis. They form the lower part of the back in humans, and the tail end of the back in quadrupeds. In humans, there are five lumbar vertebrae. The term is used to describe the anatomy of humans and quadrupeds, such as horses, pigs, or cattle. These bones are found in particular cuts of meat, including tenderloin or sirloin steak.</p>`,
  Ristiluu: `<h2>Sacrum</h2><p>The sacrum situates at the upper, back part of the pelvic cavity, between the two wings of the pelvis. The sacrum (pl.: sacra or sacrums), in human anatomy, is a triangular bone at the base of the spine that forms by the fusing of the sacral vertebrae (S1–S5) between ages 18 and 30.</p>`,
  Rintalasta: `<h2>Sternum</h2><p>The sternum (pl.: sternums or sterna) or breastbone is a long flat bone located in the central part of the chest. It connects to the ribs via cartilage and forms the front of the rib cage, thus helping to protect the heart, lungs, and major blood vessels from injury. Shaped roughly like a necktie, it is one of the largest and longest flat bones of the body. Its three regions are the manubrium, the body, and the xiphoid process. The word sternum originates from Ancient Greek στέρνον (stérnon) 'chest'.</p>`,
  Kylkiluu: `<h2>Rib</h2><p>In vertebrate anatomy, ribs (Latin: costae) are the long curved bones which form the rib cage, part of the axial skeleton. In most tetrapods, ribs surround the thoracic cavity, enabling the lungs to expand and thus facilitate breathing by expanding the thoracic cavity. They serve to protect the lungs, heart, and other vital organs of the thorax.</p>`,
  Solisluu: `<h2>Clavicle</h2><p> The clavicle is a slender, S-shaped long bone approximately 6 inches (15 cm) long that serves as a strut between the shoulder blade and the sternum (breastbone). There are two clavicles, one on each side of the body. The clavicle is the only long bone in the body that lies horizontally. Together with the shoulder blade, it makes up the shoulder girdle.</p>`,
  Lapaluu: `<h2>Scapula</h2><p>The scapula is located on the back behind the shoulders. The scapula (pl.: scapulae or scapulas), also known as the shoulder blade, is the bone that connects the humerus (upper arm bone) with the clavicle (collar bone). Like their connected bones, the scapulae are paired, with each scapula on either side of the body being roughly a mirror image of the other. The name derives from the Classical Latin word for trowel or small shovel, which it was thought to resemble.</p>`,
  Olkaluu: `<h2>Humerus</h2><p>The humerus is the main bone of the upper limb. The humerus (/ˈhjuːmərəs/; pl.: humeri) is a long bone in the arm that runs from the shoulder to the elbow. It connects the scapula and the two bones of the lower arm, the radius and ulna, and consists of three sections. The humeral upper extremity consists of a rounded head, a narrow neck, and two short processes (tubercles, sometimes called tuberosities). The shaft is cylindrical in its upper portion, and more prismatic below. The lower extremity consists of 2 epicondyles, 2 processes (trochlea and capitulum), and 3 fossae (radial fossa, coronoid fossa, and olecranon fossa). As well as its true anatomical neck, the constriction below the greater and lesser tubercles of the humerus is referred to as its surgical neck due to its tendency to fracture, thus often becoming the focus of surgeons.</p>`,
    Värttinäluu: `<h2>Radius</h2><p>The radius is located in the forearm. The radius or radial bone (pl.: radii or radiuses) is one of the two large bones of the forearm, the other being the ulna. It extends from the lateral side of the elbow to the thumb side of the wrist and runs parallel to the ulna. The ulna is longer than the radius, but the radius is thicker. The radius is a long bone, prism-shaped and slightly curved longitudinally.</p>`,
    Kyynärluu: `<h2>Ulna</h2><p>The ulna or ulnar bone (pl.: ulnae or ulnas)[3] is a long bone in the forearm stretching from the elbow to the wrist. It is on the same side of the forearm as the little finger, running parallel to the radius, the forearm's other long bone. Longer and thinner than the radius, the ulna is considered to be the smaller long bone of the lower arm. The corresponding bone in the lower leg is the fibula.</p>`,
    Sormienluut: `<h2>Finger bones</h2><p>Finger Bones (Phalanges)

The fingers of the hand are made up of phalanges, which are small tubular bones. Each finger (except the thumb) has three phalanges:

Proximal phalanx – the bone nearest to the hand.

Middle phalanx – the central bone of the finger.

Distal phalanx – the bone at the fingertip.

The thumb is unique because it has only two phalanges: a proximal phalanx and a distal phalanx.

The phalanges provide structure, support, and flexibility for the fingers, enabling fine motor movements such as grasping and manipulating objects.T</p>`,
    Lantionluut: `<h2>Pelvic bone</h2><p>The hip bone (os coxae, innominate bone, pelvic bone or coxal bone is a large flat bone, constricted in the center and expanded above and below. In some vertebrates (including humans before puberty) it is composed of three parts: the ilium, ischium, and the pubis.</p>`,
    Reisiluu: `<h2>Femur</h2><p>The femur (/ˈfiːmər/; pl.: femurs or femora /ˈfɛmərə/),[1][2] or thigh bone is the only bone in the thigh — the region of the lower limb between the hip and the knee. In many four-legged animals the femur is the upper bone of the hindleg.

The top of the femur fits into a socket in the pelvis called the hip joint, and the bottom of the femur connects to the shinbone (tibia) and kneecap (patella) to form the knee. In humans the femur is the largest and thickest bone in the body.</p>`,
    Polvilumpio: `<h2>Patella</h2><p>The patella (pl.: patellae or patellas), also known as the kneecap, is a flat, rounded triangular bone which articulates with the femur (thigh bone) and covers and protects the anterior articular surface of the knee joint. The patella is found in many tetrapods, such as mice, cats, birds, and dogs, but not in whales, or most reptiles.

In humans, the patella is the largest sesamoid bone (i.e., embedded within a tendon or a muscle) in the body. Babies are born with a patella of soft cartilage which begins to ossify into bone at about four years of age.</p>`,
    Sääriluu: `<h2>Tibia</h2><p>The tibia (/ˈtɪbiə/; pl.: tibiae /ˈtɪbii/ or tibias), also known as the shinbone or shankbone, is the larger, stronger, and anterior (frontal) of the two bones in the leg below the knee in vertebrates (the other being the fibula, behind and to the outside of the tibia); it connects the knee with the ankle. The tibia is found on the medial side of the leg next to the fibula and closer to the median plane. The tibia is connected to the fibula by the interosseous membrane of leg, forming a type of fibrous joint called a syndesmosis with very little movement. The tibia is named for the flute tibia. It is the second largest bone in the human body, after the femur. The leg bones are the strongest long bones as they support the rest of the body.</p>`,
    Pohjeluu: `<h2>Fibula</h2><p>The fibula (pl.: fibulae or fibulas) or calf bone is a leg bone on the lateral side of the tibia, to which it is connected above and below. It is the smaller of the two bones and, in proportion to its length, the most slender of all the long bones. Its upper extremity is small, placed toward the back of the head of the tibia, below the knee joint and excluded from the formation of this joint. Its lower extremity inclines a little forward, so as to be on a plane anterior to that of the upper end; it projects below the tibia and forms the lateral part of the ankle joint.</p>`,
    Jalkateränluut: `<h2>Foot bones</h2><p>Main groups of foot bones
Toes (Phalanges)
Each small toe has 3 bones.
The big toe has only 2 bones.
Middle part (Metatarsals)
5 long bones that connect the toes to the ankle.
Back part (Tarsal bones)
Heel bone (Calcaneus) – the biggest bone, forms the heel.
Ankle bone (Talus) – sits on top of the heel bone, connects to the leg.
Navicular, Cuboid, and 3 Cuneiform bones – small bones that help shape 
the arch of the foot.
👉 In total, the foot has 26 bones:
14 toe bones
5 metatarsals
7 tarsal bones</p>`
};
//Ruotsi
const text_sv = {
  Otsaluu: `<h2>Pannben</h2><p>Pannben (latin: os frontale) är, i människans skelett, ett ben på kraniets framsida som består av två delar: en vertikal del (squama frontalis) som motsvarar pannan, och en horisontell eller orbital del (pars orbitalis) som utgör ögon- och näshålornas tak.</p>`,
  Päälaenluu: `<h2>Hjässben</h2><p>Hjässbenet (latin: os parietale) är en del av skallen som finns beläget mellan nackben, pannben, kilben och tinningben.</p>`,
  Ohimoluu: `<h2>Tinningben</h2><p>Tinningben (latin: os temporale) är, i människans kropp, ett parigt ben som sitter nedtill, baktill på kraniets laterala sidor, ovanför och runt örat.</p>`,
  Takaraivoluu: `<h2>Nackben</h2><p>Nackben, occipitalben (latin: os occipitale) är, i människans skelett, ett krökt, trapetsformat ben som utgör kraniets bakre, nedre del.</p>`,
  Yläleukaluu: `<h2>Överkäke</h2><p>Överkäken (latin: maxilla) är en mer eller mindre fast ansluten del av kraniet som i människans kropp består av av två överkäksben (os maxillaris). I överkäken finns den övre tandraden. Tillsammans med okbenen (os zygomaticum) bildar överkäken den hårda gommen, näsans botten och laterala väggar samt ögonhålornas botten.</p>`,
  Alaleukaluu: `<h2>Underkäke</h2><p>Käke är endera av de två delar av ryggradsdjurens skelett som begränsar munhålan upptill och nedtill och där tänderna sitter. Underkäken är rörlig medelst en led och överkäken är en del av kraniet.</p>`,
  Kaulanikama: `<h2>Halskota</h2><p>Halskota, cervikalkota (latin: vertebra cervicalis, pluralis vertebrae cervicales) är en av ryggradens kotor i halsen, omedelbart nedanför kraniet. I människans kropp finns sju halskotor som tillsammans utgör omkring en femtedel av ryggradens längd.</p>`,
  Rintanikama: `<h2>Bröstkota</h2><p>Bröstkota, thorakalkota (latin: vertebra thoracica, pl. vertebrae thoracicae, Th I–Th XII) är, i människans kropp, de tolv ryggkotor (vertebrae) i ryggraden (columna vertebralis) som ledar mot revbenen (costae) och utgör en del av bröstkorgen (thorax).</p>`,
  Lanneranka: `<h2>Ländrygg</h2><p>Ländryggen är den del av människans rygg som sitter längst ner. Ländryggen består anatomiskt av 5 kotor men kan hos vissa ha 4 eller 6 kotor, detta faller inom normalvariation inom smärtfri befolkning.</p>`,
  Ristiluu: `<h2>Korsben</h2><p>Korsben eller sakralben (latin: os sacrum) är, i människans skelett, ett stort, triangulärt ben som utgör en del av ryggradens (columna vertebralis) kaudala (nedre) avslutning och, med sin placering mellan de två höftbenen (os coxae), även bäckenets (pelvis) bakre vägg.</p>`,
  Rintalasta: `<h2>Bröstben</h2><p>Bröstben (latin: sternum, av grekiskans στέρνον, "bröst") är, i människans kropp, ett avlångt och platt ben centralt placerat på bröstkorgens (thorax) framsida (ventralt) och utgör dess främre vägg. Bröstbenet fyller en viktig funktion genom att skydda lungorna och hjärtat och upptar dessutom stora krafter från armarna via nyckelbenen (clavicula). Det är i genomsnitt omkring 17 centimeter långt, något längre hos män än hos kvinnor.</p>`,
  Kylkiluu: `<h2>Revben</h2><p>Revben (latin: singular costa, plural costae) är en del av skelettet, som skyddar de inre organen i bröstkorgen.</p>`,
  Solisluu: `<h2>Nyckelben</h2><p>Nyckelben (latin: clavicula) är i människans kropp ett ben som utgör den främre delen av skuldergördeln (cingulum extremitatis superioris).</p>`,
  Lapaluu: `<h2>Skulderblad</h2><p>Skulderblad, skapula, axelblad, (latin: scapula, grekiska: omo) är i människans skelett ett tunt, platt, parigt och oregelbundet triangulärt ben på baksidan av bröstkorgen (thorax).</p>`,
  Olkaluu: `<h2>Överarmsben</h2><p>Överarmsbenet (latin: humerus) är i människans skelett ett långt ben i armen mellan skulderbladet (scapula) och underarmsbenen, strålbenet (radius) och armbågsbenet (ulna).</p>`,
  Värttinäluu: `<h2>Strålben</h2><p>Strålben, spolben (latin: radius) är, i människans skelett, tillsammans med armbågsbenet (ulna) ett av benen i underarmen. Strålbenet ledar i armbågsleden (art. cubiti) både till överarmsbenet (humerus) och till armbågsbenet. I handleden (art. radiocarpea) ledar strålbenet till handloven (carpus) och till armbågsbenet.</p>`,
  Kyynärluu: `<h2>Armbågsben</h2><p>Armbågsben (latin: ulna) är, i människans skelett, ett långt ben i underarmen, placerat medialt om strålbenet (radius).</p>`,
  Sormienluut: `<h2>Fingerben</h2><p>Ett ulnart finger består av tre rörben kallade falanger: Grundfalang (phalanx proximalis), mellanfalang (phalanx media) och ytterfalang (phalanx distalis). Varje ben består av ett skaft (corpus) och två extremiteter; den proximala och något större basen (basis) och det distala och mindre huvudet (caput).</p>`,
  Lantionluut: `<h2>Höftben</h2><p>Höftben (latin: os coxae) är, i människans skelett, ett stort, parigt och oregelbundet ben som utgör den ventrala (främre) och de laterala (yttre) sidorna på bäckenet (pelvis) och bäckenhålan.</p>`,
  Reisiluu: `<h2>Lårben</h2><p>Lårben (latin: femur) är det längsta, tyngsta och starkaste benet i människans skelett, och bildar benstomme i Låret. Lårbenet är ledat mot bäckenet (pelvis) i höftleden (art. coxae) och mot skenbenet (tibia) och knäskålen (patella) i knäleden (art. genus).</p>`,
  Polvilumpio: `<h2>Knäskål</h2><p>Patella eller knäskålen är ett tjockt triangulärt ben som skyddar framsidan av knät. Patella är kroppens största sesamben och sitter i quadriceps sena vilket ger en större hävarm för muskeln.</p>`,
  Sääriluu: `<h2>Skenben</h2><p>Skenbenet (latin: tibia), även kallat smalbenet, är ett ben i människans skelett som tillsammans med det mindre vadbenet (fibula) utgör underbenets (crus) skelett.</p>`,
  Pohjeluu: `<h2>Vadben</h2><p>Vadbenet (latin: fibula) är det smalare och yttre av de två långa rörben som bildar underbenets skelett hos människan. Ordet Fibula kommer från latin och kan översättas till spänne eller brosch.</p>`,
  Jalkateränluut: `<h2>Fotben</h2><p>Längst fram på människans fot sitter fem tår, och längst bak sitter hälen. Tåvalken är den delen av foten där tårna möter foten. Hålfoten är delen på insidan av foten mellan hälen och tåvalken.</p>`
};
//Saksa
const text_de = {
  Otsaluu: `<h2>Stirnbein</h2><p>Das paarige Stirnbein (lat. Os frontale) ist ein Teil des Hirnschädels. Es bildet das vordere Schädeldach und damit die vordere obere Wand der Schädelhöhle, bei Wiederkäuern einen Großteil des Schädeldachs. Die Stirnbeine beider Seiten sind in der Medianebene über eine Schädelnaht, die Sutura frontalis („Stirnnaht“), miteinander verbunden. Das Stirnbein der Säugetiere besteht aus drei Abschnitten, der Stirnbeinschuppe (Squama frontalis), der Augenhöhlenplatte (Pars orbita) und der Schläfenfläche (Facies temporalis).</p>`,
  Päälaenluu: `<h2>Scheitelbein</h2><p>Das paarige Scheitelbein (lateinisch Os parietale) ist ein Teil des Hirnschädels. Es bildet das Schädeldach und die Seitenwand der knöchernen Gehirnkapsel. Bei Wiederkäuern wird, aufgrund des sehr großen Stirnbeins, nur der Seitenteil des Schädeldachs vom Scheitelbein gebildet.</p>`,
  Ohimoluu: `<h2>Schläfenbein</h2><p>Das Schläfenbein (lateinisch Os temporale) ist einer der Knochen des Hirnschädels. Es liegt seitlich im hinteren Schädelbereich. Das Schläfenbein beinhaltet Mittel- und Innenohr und bildet die Gelenkspfanne des Kiefergelenks.</p>`,
  Takaraivoluu: `<h2>Hinterhauptsbein</h2><p>Das Hinterhauptbein (auch Hinterhauptsbein oder Hinterhaupthöcker; lat. Os occipitale oder kurz Occiput) ist der am Halsübergang gelegene Teil des Hirnschädels. Es bildet den hinteren Abschluss der Schädelhöhle und mit dem Atlas das erste Kopfgelenk.</p>`,
  Yläleukaluu: `<h2>Oberkiefer</h2><p>Der Oberkiefer (lat. Maxilla) ist ein paariger Knochen des Gesichtsschädels. Er bildet den Boden der Augenhöhle (Orbita), den Boden und die Seitenwand der Nasenhöhle (Cavum nasi) sowie einen Teil des Gaumens und damit das Dach der Mundhöhle (Cavum oris proprium). Der Oberkiefer enthält auch die Kieferhöhle (Sinus maxillaris).</p>`,
  Alaleukaluu: `<h2>Unterkiefer</h2><p>Der Unterkiefer oder die Kinnlade (lat. Mandibula von mandere „kauen“) ist ein Knochen des Gesichtsschädels. Er ist bei Säugetieren der bewegliche der beiden Kieferknochen.</p>`,
  Kaulanikama: `<h2>Halswirbel</h2><p>Als Halswirbel (lateinisch Vertebrae cervicales) werden das kopfseitige (kraniale) Ende der Wirbelsäule von Wirbeltieren und die besonders beweglichen Wirbel zwischen der Brustwirbelsäule und dem Kopf bezeichnet. Dieser Abschnitt wird Halswirbelsäule genannt. Der kranial letzte vor dem Cranium gelegene Halswirbel wird als Atlas bezeichnet.</p>`,
  Rintanikama: `<h2>Brustwirbel</h2><p>Die Brustwirbel (lat. Vertebrae thoracicae) sind die knöchernen Elemente der Brustwirbelsäule. Diese Wirbel sind charakterisiert durch ihre Kontaktflächen zu den Rippen (Facies costalis). Der Mensch besitzt 12 Brustwirbel. Sie werden von oben nach unten durchnummeriert. Bezeichnet werden sie nach der lateinischen Schreibweise mit Th1 bis Th12 (Th = thorakal = zugehörig zum Brustkorb).</p>`,
  Lanneranka: `<h2>Lendenwirbel</h2><p>Die Lendenwirbel (Vertebrae lumbales)[1] bilden den Lendenabschnitt der Wirbelsäule, der auch als Lendenwirbelsäule bezeichnet wird. Der Mensch besitzt fünf, Huftiere zumeist sechs und Raubtiere sieben Lendenwirbel. Bei Vögeln sind die Lendenwirbel mit dem Kreuzbein zum Synsacrum verwachsen.</p>`,
  Ristiluu: `<h2>Kreuzbein</h2><p>Das Kreuzbein (lateinisch Os sacrum, genannt auch Sakrum) ist ein Knochen der Landwirbeltiere. Beim erwachsenen Menschen ist es in etwa keilförmig. Es entwickelt sich durch Verschmelzung (Synostose) aus den ursprünglich einzelnen, zusammenwachsenden Wirbeln, den Kreuzwirbeln (Sakralwirbel). Beim Heranwachsenden findet diese Verschmelzung (vorher ein knorpeliger Verbund) bis zum Ende der Wachstumsphase statt. Das Kreuzbein umschließt den hinteren Abschnitt des Wirbelkanals und bildet mit beiden Hüftbeinen den Beckengürtel. Kaudal (schwanzwärts) – also bei Tieren nach hinten und beim Menschen nach unten – schließt sich das Steißbein (Os coccygis) bzw. die Schwanzwirbelsäule an. Das Kreuzbein-Steißbein-Gelenk kann auch als Knorpelhaft ausgebildet sein und ab einem Alter von 30 Jahren verknöchern.</p>`,
  Rintalasta: `<h2>Brustbein</h2><p>Das Brustbein oder lateinisch Sternum (latinisiert von altgriechisch στέρνον sternon, ‚Brust, Herz, Gemüt‘) ist ein platter, schwertförmiger Knochen in der vorderen Mitte des Brustkorbs, an dem die Rippen bzw. deren knorpelige Verlängerungen ansetzen. Das Brustbein des Mannes ist dabei schlanker als das der Frau. Die Längsdurchtrennung des Brustbeins bei Operationen wird als Sternotomie bezeichnet.</p>`,
  Kylkiluu: `<h2>Rippen</h2><p>Rippen bezeichnet im Computerjargon das Kopieren von einer Datenquelle auf ein anderes Speichermedium, meist auf eine Festplatte. Das Verb leitet sich vom englischen „to rip“ ab, das in diesem Zusammenhang so viel wie „(herunter-)reißen“ bedeutet. Der Jargon-File-Eintrag für rip gibt einen Ursprung des Begriffs im Amiga-Slang an, wo er verwendet wurde, um die Extraktion von Multimedia-Inhalten aus Programmen zu bezeichnen.</p>`,
  Solisluu: `<h2>Schlüsselbein</h2><p>Das Schlüsselbein (lateinisch die Clavicula, eingedeutscht auch Klavikula, altgr. κλείς, Genitiv κλειδός [kleidos]) ist einer der drei ursprünglichen Knochen des Schultergürtels bei Reptilien, Vögeln und Säugetieren. Bei Knochenfischen ist das Schlüsselbein als Hautverknöcherung bereits angedeutet, bei heutigen Amphibien fehlt es.</p>`,
  Lapaluu: `<h2>Schulterblatt</h2><p>Das Schulterblatt (lateinisch die Scapula[1]) bildet beim Menschen den hinteren, bei Tieren den oberen Teil des knöchernen Schultergürtels. Es handelt sich beim Menschen und den übrigen Säugetieren um einen platten, dreieckigen Knochen. Bei Vögeln ist er schmal und säbelförmig. Er dient der Befestigung eines Armes (einer Vordergliedmaße bei Vierbeinern, eines Flügels bei Vögeln) sowie als Muskelursprung und -ansatz. Die Verbindung zum Brustkorb erfolgt rein muskulös (sogenannte Synsarkose, von griechisch syn ‚zusammen‘, sarkos ‚Fleisch‘). Zu Oberarmknochen (Humerus) und Schlüsselbein (Clavicula) – bei Vögeln auch zum Coracoid – besteht eine gelenkige Verbindung. Sie dient der Stabilisation des Schultergelenks und passt sich dank ihrer Verschieblichkeit den Oberarmbewegungen an. Bei Schlachttieren wird das Schulterblatt gewerbsmäßig auch als „Schaufelknochen“ bezeichnet.</p>`,
  Olkaluu: `<h2>Oberarmknochen</h2><p>Der Oberarmknochen (lateinisch Os humeri oder kurz Humerus; früher auch Achselbein[1] genannt) ist einer der längsten und kräftigsten Röhrenknochen der am Land lebenden Wirbeltiere und bildet die knöcherne Grundlage des Oberarmes. Beim Menschen entspricht die fünffache Länge des Oberarmknochens etwa der Körpergröße.</p>`,
  Värttinäluu: `<h2>Radius</h2><p>Der Radius (lat.-anat. für Speiche) ist ein Knochen des Unterarmes. Die Speiche ist daumenseitig gelegen, bei Säugetieren kräftiger als die Elle, der sie dort gegenüberliegt, und ein typischer Röhrenknochen.</p>`,
  Kyynärluu: `<h2>Ulna</h2><p>Die Ulna (lat.-anat. für Elle) ist neben dem Radius (Speiche) einer der beiden Knochen des Unterarmes. Die Elle ist kleinfingerseitig gelegen, weniger kräftig als die Speiche und ein typischer Röhrenknochen.</p>`,
  Sormienluut: `<h2>Fingerknochen</h2><p>Die Fingerknochen (lat. Ossa digiti manus) sind die knöchernen Stützelemente der Finger. Bei Säugetieren hat jeder vollausgebildete Finger drei knöcherne Stützelemente, die als Phalanx proximalis, media und distalis („körpernaher, mittlerer und körperferner Fingergliedknochen“), auch Phalanx I, II und III; (von altgr. phalanx „Schlachtreihe von Kriegern“ „Baumstamm“, „Walze“, oder „Rolle“) bezeichnet werden. Der menschliche Daumen besitzt nur zwei Phalangen. Die Verbindungen zwischen Mittelhandknochen und Phalanx proximalis und den Fingergliedknochen untereinander sind die Fingergelenke</p>`,
  Lantionluut: `<h2>Beckenknochen</h2><p>Das Becken (lateinisch Pelvis) ist bei Landwirbeltieren der Körperabschnitt unterhalb des Bauchs und oberhalb der Beine, bei vierfüßigen Säugetieren der Teil zwischen Bauch und Schwanz. Man unterscheidet beim Menschen zwischen einem großen und einem kleinen Becken (Pelvis major und Pelvis minor). Das große Becken liegt zwischen beiden Darmbeinschaufeln oberhalb der Beckeneingangslinie (Linea terminalis) und gehört eigentlich zum Bauchraum.</p>`,
  Reisiluu: `<h2>Oberschenkelknochen</h2><p>Der Oberschenkelknochen, in der medizinischen Fachsprache Os femoris oder kurz das Femur, ist der kräftigste Röhrenknochen und bildet die knöcherne Grundlage des Oberschenkels. Er ist der längste Knochen des menschlichen Körpers.</p>`,
  Polvilumpio: `<h2>Kniescheibe</h2><p>Die Kniescheibe (lateinisch Patella) ist ein flacher, scheibenförmiger, von vorne betrachtet dreieckiger Knochen, der vor dem Kniegelenk liegt, an dessen Gelenkflächen er beteiligt ist. Die Kniescheibe fungiert als Sesambein in der Sehne des Musculus quadriceps femoris (vierköpfiger Oberschenkelmuskel). Sie schützt das Kniegelenk und vervielfacht die Kraftentwicklung des Quadrizeps durch die Verlängerung des Hebelarmes. Die Verknöcherung der Kniescheibe erfolgt beim Menschen über mehrere Ossifikationszentren ab dem dritten Lebensjahr.</p>`,
  Sääriluu: `<h2>Schienbein</h2><p>Das Schienbein (lateinisch Tibia) ist neben dem Wadenbein (Fibula) einer der beiden Knochen des Unterschenkels. Das Schienbein ist der kräftigere der beiden Knochen und ein typischer Röhrenknochen. Das lateinische Wort tibia ist die Bezeichnung einer Knochenflöte und der lateinische Name des in der griechischen Antike als Aulos bekannten Blasinstruments.</p>`,
  Pohjeluu: `<h2>Wadenbein</h2><p>Das Wadenbein (lat. Fibula (f.) „Heftnadel“, „Spange“) ist neben dem Schienbein (Tibia), an dem es seitlich außen anliegt, einer der beiden Knochen des Unterschenkels. Das Wadenbein ist der dünnere der beiden Knochen und ein typischer Röhrenknochen.</p>`,
  Jalkateränluut:`<h2>Fußknochen</h2><p>Der Knöchel (lateinisch Malleolus, ‚Hämmerchen‘, Diminutiv von lateinisch malleus, ‚Hammer‘), genannt auch Fußknöchel (älter auch Enkel, verwandt mit mittelhochdeutsch anke ‚Gelenk‘[1]), ist ein Knochenhöcker am unteren Ende des Unterschenkels. Er bildet den oberen Teil des Sprunggelenks, des Verbindungsgelenks zwischen Fuß und Bein, und gehört medizinisch-anatomisch betrachtet zum Bein und nicht zum Fuß.</p>`
};
//persian
const text_fa = {
  Otsaluu: `<h2>استخوان پیشانی</h2><p>استخوان پیشانی (به انگلیسی: Frontal bone) استخوانی است که قسمت جلو و بالای جمجمه (پیشانی) را ساخته‌است. این استخوان پیشانی بخش جلویی جمجمه یا پیشانی، بخش بالایی حفره چشم و قسمت اعظم بخش جلویی کف جمجمه را به وجود می‌آورد. استخوان پیشانی از دو بخش راست و چپ تشکیل شده که به شکل استخوانی واحد درمی‌آید.</p>`,
  Päälaenluu: `<h2>استخوان آهیانه</h2><p>استخوان‌های آهیانه (Parietal bones)به صورت یک جفت استخوان پهن و چهارگوش هستند که بخش عمدهٔ کاسهٔ سر را تشکیل می‌دهند. این استخوان‌ها قسمت‌های طرفی و سقف جمجمه را می‌سازد. این استخوان‌ها که با یکدیگر مفصل شده‌اند، در جلو با استخوان پیشانی و در عقب با استخوان پس‌سری، مفصل می‌گردند. هر یک از استخوان‌های آهیانه دارای یک سطح بیرونی صاف و محدب و یک سطح درونی ناصاف و مقعر است و چهار زاویه و چهار کنار دارد.</p>`,
  Ohimoluu: `<h2>استخوان گیجگاهی</h2><p>ستخوان گیجگاهی (Temporal bones) در طرفین جمجمه قرار دارد و در تشکیل قسمت جدار طرفی و قاعده کاسه سر نقش دارد. دستگاه شنوایی - تعادلی بدن در ضخامت آن قرار دارد. سطح خارجی این استخوان با قسمت خارجی سر و سطح داخلی آن نیز با قسمت درونی سر در ارتباط است. به استخوان گیجگاهی در متون قدیمی فارسی استخوان کلالک و صُدغ نیز گفته می‌شد.</p>`,
  Takaraivoluu: `<h2>استخوان پس‌سری</h2><p>استخوان پس‌سری یا استخوان اُکسیپیتال (به انگلیسی: Occipital bone) استخوان لوزی‌شکل است که در قسمت پسین (خلفی) زیرین کاسه سر قرار گرفته و قاعده جمجمه را تشکیل می‌دهد. این استخوان سومین استخوان سر به‌شمار می‌آید و در قسمت پشت و بخشی از کف جمجمه قرار دارد و تمام قسمت پس‌سری را ساخته و از سه قسمت اصلی تشکیل شده‌است.</p>`,
  Yläleukaluu: `<h2>فک بالا</h2><p>به هریک از دو استخوان نامنظمی که بخش اعظم استخوان‌بندی قسمت میانی صورت را تشکیل می‌دهند و در ساختار کام و کف حفرهٔ چشم و حفرهٔ اشکی نقش دارند، فک بالا، بَرواره یا ماگزیلا (Maxilla) می‌گویند. سطح زیرین برواره در دهان قسمت کام سخت را تشکیل می‌دهد. سینوس برواره در این استخوان قرار دارد.</p>`,
  Alaleukaluu: `<h2>فک پایین</h2><p>فَکّ پایین، زیرواره یا مندیبول (به لاتین: mandibula) استخوان نعلی‌شکل متحرکی است که بخش تحتانی استخوان‌بندی صورت و چارچوب استخوانی کف دهان را تشکیل می‌دهد.</p>`,
  Kaulanikama: `<h2>مهره گردنی</h2><p>مهره‌های گردنی به مجموعه‌ای از مهره‌های گردن گفته می‌شود که بیرون از جمجمه قرار دارد. غیر از پستانداران مهرهای گردنی، مانند مهره‌های سینه‌ای دارای دنده می‌باشند.</p>`,
  Rintanikama: `<h2>مهره سینه‌ای</h2><p>مهره‌های سینه‌ای تعدادی مهره در ستون فقرات مهره‌داران هستند که بخش میانی آن در میان مهره‌های گردنی و کمری را تشکیل می‌دهند که به آنها مهره‌های پشتی هم می‌گویند. در انسان‌ها، اندازه این مهره‌ها به نسبت متوسط است و با حرکت به سوی پایین ستون فقرات اندازه‌شان بیشتر می‌شود، به گونه‌ای که بالاترین مهرهٔ سینه‌ای بسیار کوچکتر از پایین‌ترین آن‌ها است. ویژگی اصلی این مهره‌ها اتصال آن‌ها به استخوان‌های قفسه سینه و دنده‌ها است. این مهره‌ها دارای چهار سطح اضافی مفصلی هستند و به دلیل همین اتصال در حرکات فلکشن و فلکشن جانبی دارای محدودیت می‌باشند. همچنین زائده‌های شوکی این مهره‌ها بلند و به سمت پایین متمایل هستند و به همین دلیل حرکت هایپر اکستنشن ستون مهره‌ها در این قسمت محدود شده است.</p>`,
  Lanneranka: `<h2>مهره کمری</h2><p>مهره‌های کمری (انگلیسی: Lumbar vertebrae) به قسمتی از ستون مهره‌ها گفته می‌شود که در ناحیه کمر قرار دارد. در انسان پنج قطعه از مهره‌های ستون فقرات را که بین دوازدهمین مهره پشتی و استخوان خاجی قرار دارند، کمری می‌گویند.</p>`,
  Ristiluu: `<h2>استخوان خاجی</h2><p>استخوان خاجی یا ساکروم (به انگلیسی: Sacrum) نام یکی از استخوان‌های تشکیل‌دهندهٔ لگن خاصره است. این استخوان در پایین ستون مهره‌های کمر، در زیر آخرین مهرهٔ کمری قرار گرفته و در پشت لگن، بین دو استخوان کوهانه (بی‌نام، هیپ) قرار دارد. در داخل استخوان خاجی ریشه‌های عصبی قرار دارند.</p>`,
  Rintalasta: `<h2>استخوان جناغ</h2><p>جـِناغ (به لاتین: استرنوم Sternum) استخوانی است خنجری‌شکل و تَکی و طویل که در بخش پیشین و میانی قفسهٔ سینه قرار دارد و غضروف‌های دنده‌ای از دو طرف به آن متصل شده‌اند. همچنین استخوان ترقوه به قسمت فوقانی آن (دسته) متصل می‌شود. این استخوان دارای طولی در حدود ۱۵ تا ۲۰ سانتی‌متر است.</p>`,
  Kylkiluu: `<h2>دنده</h2><p>دنده یا قبرغه نام دوازده جفت استخوان در طرفین قفسه سینه است که از ستون مهره‌ها آغاز شده و به جز دو جفت دندهٔ انتهایی بقیه در قسمت قدام به جناغ مفصل می‌شوند (مستقیم یا غیر مستقیم).</p>`,
  Solisluu: `<h2>استخوان ترقوه</h2><p>تَرقُوه یا چَنبَر (به انگلیسی: Clavicle) استخوان دراز است که همراه با استخوان کتف، بازو و جناغ، کمربند شانه‌ای یا سینه‌ای را تشکیل می‌دهند. این استخوان برخلاف سایر استخوان‌های دراز، فاقد هرگونه مغزی است و دارای منشأ غشائی می‌باشد و از سمت داخل به جناغ و از سمت خارج به استخوان کتف متصل می‌شود. ترقوه تنها استخوان بین تنه و اندام فوقانی است و در تمام طولش قابل لمس است. شکل استخوان ترقوه در هر طرف قفسه سینه شبیه حرف «S» است.</p>`,
  Lapaluu: `<h2>استخوان کتف</h2><p>استخوان شانه یا کِتف یا اِسکَپیولا (به انگلیسی: Scapula) در بدن انسان، نام استخوانی پهن، سه‌گوش و صاف در اندام فوقانی است که در پشت قفسه سینه در هر طرف واقع شده‌است. استخوان کتف به ترقوه و استخوان بازو، مفصل می‌شود.</p>`,
  Olkaluu: `<h2>استخوان بازو</h2><p>استخوان بازو، یا هومروس (به انگلیسی: Humerus) در قسمت پروگزیمال با کتف مفصل شده و مفصل شانه را می‌سازد. در قسمت انتها این استخوان با استخوان‌های زند زبرین و زند زیرین مفصل آرنج را می‌سازد.</p>`,
  Värttinäluu: `<h2>زند زبرین</h2><p>زَند زِبَرین یا رادیوس (به انگلیسی: Radius) استخوانی است بلند در سمت خارجی ساعد که موازی زند زیرین (اولنا) بوده و مچ دست را به آرنج متصل می‌نماید.</p>`,
  Kyynärluu: `<h2>زند زیرین</h2><p>زند زیرین یا اولنا (به انگلیسی: Ulna) یکی از دو استخوان طویلی است که در ساعد قرار دارد و مچ دست را به آرنج متصل می‌نماید و به بدن نزدیکتر است. در قسمت دیستال این استخوان (نزدیک به مچ) زائده‌ای به نام زائده نیزه‌ای (استیلوئید) وجود دارد. این استخوان در بالا با استخوان بازو (هومروس)، در کنار با زند زبرین (رادیوس) و در پایین با استخوان‌های مچ دست مفصل می‌شود.</p>`,
  Sormienluut: `<h2>استخوان‌های انگشتان</h2><p>انگشت دست نام بندهای انتهایی دست است که در انسان شامل ۵ انگشت در هر دست می‌شود (در مجموع ۱۰ انگشت). انگشتان دست به جز انگشت شست که فقط ۲ بند دارد، دارای سه استخوان مجزا هستند که بین آن‌ها مفصل و در انتهایشان ناخن قرار دارد.</p>`,
  Lantionluut: `<h2>استخوان‌های لگن</h2><p>استخوان بالی لگن یا استخوان هیپ، (به انگلیسی: Hip bone) یک استخوان چهارگوش‌مانند نامنظم است که قسمت میانی آن کمی تاب خورده است. دو عدد از این استخوان در بدن وجود دارد؛ یکی در چپ بدن و دیگری در سمت راست که به هم مفصل می‌شوند و کمربند لگنی را تشکیل می‌دهند.</p>`,
  Reisiluu: `<h2>استخوان ران</h2><p>استخوان ران یا فمور/فیمر (به انگلیسی: femur) بلندترین اندام در بدن انسان و در عین حال حجیم‌ترین و قوی‌ترین استخوان نیز هست. این استخوان، اولین استخوان اندام تحتانی بوده که در انتهای فوقانی خود در لگن خاصره قرار می‌گیرد و مفصل ران را به وجود می‌آورد.</p>`,
  Polvilumpio: `<h2>کشکک</h2><p>کَشکَک زانو یا کاسه زانو (نام علمی: پاتلا، Patella) استخوانی مثلثی‌شکل و ضخیم است که بزرگ‌ترین استخوان کنجدی در بدن به‌شمار می‌آید. همچنین تنها استخوان کنجدی بدن است که در شمارش استخوان‌های بدن محسوب می‌شود. شکل آن به تکه‌های کشک شباهت دارد. کشکک، زانو را پوشانده و از آن در برابر نیروی فرساینده‌ای که از سایش زردپی چهارسر ران به سطح کشککی استخوان ران پدید می‌آید حفاظت می‌کند. استخوان کشکک در ضخامت زردپی ماهیچه چهارسرِ ران واقع شده و در صدمه‌هایی که به ناحیه زانو وارد می‌شود امکان آسیب دیدن آن زیاد است.</p>`,
  Sääriluu: `<h2>درشت‌نی</h2><p>دُرُشت‌نِی یا تیبیا (به انگلیسی: Tibia) استخوان بلندی است در طرف داخل ساق پا که بین زانو و مچ پا قرار دارد. درشت‌نی مسئول حمایت بیشتر وزن بدن است و برای حرکت مفصل زانو و مچ پا ضروری است. در حین راه رفتن استخوان تیبیا نیروی محوری در حدود پنج برابر وزن انسان را تحمل می‌کند.</p>`,
  Pohjeluu: `<h2>استخوان نازک نی</h2><p>نازُک‌نِی یا فیبولا (به انگلیسی: Fibula) استخوانی است که هم‌راستا با استخوان درشت‌نی ساق پا و در سمت خارج آن قرار دارد و میان زانو و مچ پا قرار گرفته‌است.</p>`,
  Jalkateränluut: `<h2>استخوان‌های پا</h2><p>در پا، جلوتر از استخوان‌های مچ پا، پنج استخوان بلند قرار دارند که به آن‌ها کف‌پایی می‌گویند. جلوتر از استخوان‌های کف پا، انگشتان پا قرار دارند که هر کدام از آن‌ها سه بند دارد (بجز شست پا که دو بند دارد). کف‌پایی‌ها به همراه انگشتان پا، پیش‌پا را تشکیل می‌دهند.</p>`
};
//arabian
const text_ar = {
  Otsaluu: `<h2> عظم جبهي</h2><p>العظم الجبهي (بالإنجليزية: Frontal bone) هو أحد عظام الجمجمة المفردة، ويشكل الجبهة والحافة العلوية وسقف المحجر. يتوضع في الوجه الأمامي للقحف، ويشاهد من الوجه الجانبي ومن قاعدة القحف أيضاً، وهو عظم مفرد يكون في الحياة الجنينية مزدوجاً وبعد التحامه يبقى أثر للالتحام يسمى: الدرز الجبهي (الناصف)، يساهم في تشكيل كل من الحفرة القحفية الأمامية وقاعدة القحف وجوف الحجاج.</p>`,
  Päälaenluu: `<h2>العظم الجداري</h2><p>العظم الجداري (بالإنجليزية: Parietal bone) هو أحد عظام الجمجمة يشكل باتحاده مع نظيره في الجانب المقابل جانب وسقف الجمجمة. له شكل رباعي غير منتظم، يوصف له سطحان وأربعة حدود وأربع زاويا. يتوضع ضمن سطحه الداخلي التلم السهمي الذي يسير فيه الجيب السهمي العلوي.</p>`,
  Ohimoluu: `<h2>العظم الصدغي</h2><p>العظم الصدغي (بالإنجليزية: Temporal bone) هو عظم مزدوج يتوضع في القسم السفلي الجانبي من القحف أو الجمجمة، ويشكل جزءاً من جانب الجمجمة وقاعدتها. يجاور العظم الصدغي من الأمام العظم الوتدي (بالإنجليزية: Sphenoid bone) ومن الخلف العظم القفوي (بالإنجليزية: Occipital bone) ومن الأعلى العظم الجداري (بالإنجليزية: Parietal bone). يساهم العظمان الصدغيان بتشكيل جزء من الوجه في كل جانب يدعى الصدغ، وهما يحويان أعضاء السمع والتوازن ويظهر على الوجه الخارجي لكل منهما الصماخ السمعي الخارجي. للعظم الصدغي خمسة أجزاء: الجزء الصدفي (بالإنجليزية: Squamous part)، الجزء الخشائي (بالإنجليزية: Mastoid part)، الجزء الصخري (بالإنجليزية: Petrous part)، الجزء الطبلي (بالإنجليزية: Tympanic part) والناتئ الإبري (بالإنجليزية: Styloid process).</p>`,
  Takaraivoluu: `<h2>العظم القذالي</h2><p>العظم القذالي (بالإنجليزية: Occipital bone) هو أحد العظام الجلدية للقحف العظام وهو العظم الرئيسي للقذال (الجزء الخلفي والسفلي من الجمجمة). يأخذ العظم القذالي شكل شبه منحرف منحني على نفسه مثل طبق ضحل. يعلو العظم القذالي الفصوص القذالية للدماغ. في قاعدة الجمجمة في العظم القذالي توجد فتحة بيضاوية كبيرة تسمى الثقبة العظمى والتي تسمح بمرور الحبل الشوكي.</p>`,
  Yläleukaluu: `<h2>عظم الفك العلوي</h2><p>الفك العلوي (بالإنجليزية: Maxilla) هو أحد عظام الجمجمة وهو عظم ثابت بعكس الفك السفلي الذي يمثل العظم الوحيد المتحرك من عظام الجمجمة.</p>`,
  Alaleukaluu: `<h2>عظم الفك السفلي</h2><p>عظمُ الفَكِّ السُّفلِيّ (بالإنجليزية: Mandible) (بالإنجليزيّة المحكيّة: Lower jaw) أو عظم الفك (بالإنجليزية: Jawbone)، (باللاتينية: Mandibula)، هو أكبر وأقوى وأدنى (في المستوى) عظم في هيكل الوجه. يحمل هذا العظم الأسنان السفلية، ويقع هذا العظم أسفل عظم الفك العلويّ. يعتبر عظم الفك السفلي العظم الوحيد المُتحرِّك في الجمجمة (باستثناء عظيمات السمع في الأذن الوسطى). يتصل عظم الفك السفلي بالعظمين الصدغيين على الجانبين بواسطة المفاصل الصدغية الفكية.</p>`,
  Kaulanikama: `<h2>الفقرات العنقية</h2><p>الفقرات الرقبية أو الفقرات العنقية (بالإنجليزية: Cervical vertebrae) يوجد في الرقبة سبع فقرات مرقمة تسلسليا من الأعلى إلى الأسفل. تسمى الفقرة الأولى بالأطلس وهي تشبه الحلقة، وتكون مع قاعدة الجمجمة من الأعلى مفصل يسمى المفصل بالأطلسي. وتسمى الفقرة العنقية الثانية بالمحور حيث يخرج منها بروز إلى أعلى كأنه وتد أو محور. ويربط هاتين الفقرتين مفصل يسمى المفصل المحور الأطلسي حيث يدخل الوتد في الجزء الأمامي من حلقة الأطلس ويمتد رباط من جانبي الحلقة من الداخل ليحافظ على استقرار المفصل.</p>`,
  Rintanikama: `<h2>الفقرات الصدرية</h2><p>فقرة صدرية (بالإنجليزية: Thoracic vertebrae) هي إحدى فقرات العمود الفقري وعددها (12) فقرة تقع بين الفقرات العنقية والقطنية. تمتاز هذه الفقرات بالزيادة في حجمها تدرجاً من الأعلى إلى الأسفل إذ تكون الفقرة الثانية عشر أكبرها حجماً ولا توجد فتحة في النتوء المستعرض كما في الفقرات العنقية وتتمفصل هذه الفقرات مع الأضلاع. حيث يتمفصل رأس كل ضلع مع جسم فقرتين أحدهما موافقة للضلع بالعدد والأخرى تسبق الضلع عدداً، كما أن درنة الضلع تتمفصل مع القسم الأمامي للنتوء المستعرض للفقرة التي تحمل نفس رقم الضلع ومن هذا الترابط يترك وجيهان هلاليان الشكل علويان وسفليان عند جانبي الحافة العليا والسفلى لجسم الفقرة كما يترك وجيه مفصلي على القسم الأمامي للنتوء المستعرض وبهذه الصفات تتصف الفقرات الصدرية.</p>`,
  Lanneranka: `<h2>
 الفقرات القطنية</h2><p>الفقرات القَطَنِيَّة (بالإنجليزية: Lumbar vertebrae) هي إحدى أقسام العمود الفقري وعددها خمس فقرات، وتقع بين الفقرات الصدرية والفقرات العجزية. تمتاز بكبر حجمها عن باقي الفقرات التي تعلوها (العنقية الصدرية) وتحمل جميع صفات الفقرة النموذجية فلا توجد فتحة بالنتوء المستعرض كالفقرات العنقية ولا توجد أوجه مفصلية على جوانب الجسم أو على القسم الأمامي للنتوء المستعرض كما في الفقرات الصدرية، والنتوء الشوكي رباعي الشكل موازٍ لسطح الأرض، وتتباعد النتوءات الشوكية بعضها عن بعض أما النتوء المستعرض فقصير. والفتحة الفقرية مثلثة الشكل بسبب قصر السويقة وتكون أكبرَ من الفتحة الفقرية في الفقرات الصدرية، ولكنها أصغر من الفتحة الفقرية في الفقرات العنقية.</p>`,
  Ristiluu: `<h2>عجز (تشريح)</h2><p>العَجُز (باللاتينية: os sacrum) عظم كبير مثلث الشكل يقع في قاعدة العمود الفقري في الجزء الخلفي العلوي من الحوض ومتموضع بشكل يشبه الإسفين بين العظمين الوركيين ويرتبط في الأسفل مع العصعص وفي الأعلى مع الفقرة القطنية الخامسة.</p>`,
  Rintalasta: `<h2>عظم القص</h2><p>عظم القَصّ (باللاتينية: Sternum) عظمٌ مسطح، مفرد، طويل، غير سميك، من عدة قطع ملتحمة، طوله نحو 19 سم، يشبه السيف الروماني العريض وضعه في الجسم شاقوليًّا مع ميلان قليل نحو الأمام، هو في منتصف الصدر في الأمام عند الإنسان، يتصل بالأضلاع السبعة العليا بواسطة الغضاريف الضلعية ويكوّن مع الأضلاع والفِقْرات الصدرية القفص الصدري الذي يحمي القلب والرئتين ويمنح مواقع لاتصال عضلات الصدر والبطن والظهر والأطراف العليا، ويتألف من ثلاثة أجزاء:</p>`,
  Kylkiluu: `<h2>الأضلاع</h2><p>الضلع هو أحد عظام القفص الصدري في الإنسان، ويوجد لدى الإنسان 24 ضلعاً  بحيث يكون هناك 12 ضلع على كل جانب من جانبي الجسم، توجد بين الأضلاع عضلات (تعرف بالعضلات الوربية)، وأوعية دموية وأعصاب.</p>`,
  Solisluu: `<h2>عظم الترقوة</h2><p>التَّرْقُـوَة (الجمع: التَّراقي) أو الناحرة (بالإنجليزية: Clavicle) عظم يُصَنَّف في تشريح جسم الإنسان بأحد العظام الطويلة، وهي تعمل دعامة بين لوح الكتف في الظهر وعظم القص في منتصف الصدر. هناك ترقوتان، واحدة علي اليمين والأخرى على اليسار، وهي العظم الطويل الوحيد الذي يقع أفقياً في جسم الإنسان.</p>`,
  Lapaluu: `<h2>لوح الكتف</h2><p>عَظْم الكَتِف أو عظم اللَّوْح أو لوح الكتف (بالإنجليزية: Scapula) عظمة مسطحة زوجية تقع في الجزء الخلفي من منطقة الحزام الكتفي. العظمة كبيرة نسبياً وقريبة من شكل المثلث. وهي تتصل بعظمتي الترقوة والعضد.</p>`,
  Olkaluu: `<h2>عظم العضد</h2><p>النَّقَا أو النَّقْو أو عظم العَضُد (بالإنجليزية: Humerus) هو من العظام الطويلة وهو جزء من الهيكل العظمي البشري ويوجد في العضد حيث يصل الكتف مع المرفق. ويرتبط مع عظم الكتف علويا ومع عظمي الزند والكعبرة سفلياً، وينقسم تشريحيا إلى ثلاثة أقسام. يتكون الطرف العلوي العضدي من رأس مستدير وعنق ضيق وعمليتين قصيرتان (درنات، تسمى أحيانًا حدبة). الجسم أسطواني في الجزء العلوي منه وأكثر موشورية في الأسفل. يتكون الطرف السفلي من لقيمتان، وعضدان (بكرة عضدية ورؤيس العضد)، وثلاثة حفر (الحفرة الشعاعية، الحفرة التاجية، حفرة زجية). بالإضافة إلى رقبته التشريحية الحقيقية، يُشار إلى الانقباض تحت الدرنات الكبيرة والصغيرة لعظم العضد على أنه عنقها الجراحي بسبب ميله إلى الكسر، وبالتالي غالبًا ما يصبح محور تركيز الجراحين.</p>`,
  Värttinäluu: `<h2>عظم الكعبرة</h2><p>الكعبرة (بالإنجليزية: Radius (bone)) هي أحد عظمتي منطقة الساعد، تصل المرفق مع الرسغ. و تقع عظمة الكعبرة على يسار عظمة الزند. ويمر العصب الكعبري من خلال القناة الكعبرية مع أعصاب العضد العميقة.</p>`,
  Kyynärluu: `<h2>عظم الزند</h2><p>عظم الزَّنْد (بالإنجليزية: Ulna) هو أحد العظام الطويلة في البشر، وهو أحد عظمتين طوال داخل الساعد (العظمة الأخرى هي الكعبرة). وهي تمتد من المرفق إلى الرسغ موازية للكعبرة. في الوضع القياسي التشريحي، عندما يكون الساعد ممتدا لأسفل ويكون الكف متوجها للأمام، يكون الزند واقعا على الجهة الأقرب للجسم (الجهة الإنسية). قد ينكسر الزند حال الوزن الزائد أو الاصطدام الشديد.</p>`,
  Sormienluut: `<h2>عظام الأصابع</h2>الأَصْبُعُ والأُصْبِعُ والأَصْبِعُ والإِصْبِعُ هو جزء من اليد أو القدم، والأصابع موجودة في الرئيسيات الأخرى، ويد الإنسان العادية تحتوي على خمس أصابع، وتستخدم الأصابع في كثير من الأنشطة مثل اللمس والإمساك بالأشياء والكتابة. ويُوجد في كلّ إصبعٍ من أصابع الإنسان (باستثناء الإبهام) ثلاث مفاصل، تسمّى عموماً البراجم.<p></p>`,
  Lantionluut: `<h2>عظام الحوض</h2><p>عظم الورك أو عظم الحوض يسمى أيضاً العظم غير المسمى أو العظم اللَّامُسَمَّى هو عظم كبير عريض مسطح غير منتظم الشكل، يكون سميكاً في بعض الأمكن، مثل: الحُق، ورقيقاً في أماكن أخرى، مثل: الحفرة الحَـرْقَـفية، وهو في المرحلة الجنينية يكون مؤلفاً من ثلاثة عظام هي عظمة علوية تدعى الحَـرْقَـفَـة، وعظمة أمامية تدعى العانة، وأخرى سفلية خلفية تدعى الإسك، وتلتحم مع بعضها عند الحُق بعد البلوغ.</p>`,
  Reisiluu: `<h2>عظم الفخذ</h2><p>عظم الفخذ (بالإنجليزية: Femur) والجمع (بالإنجليزية: femora) يُصنّف كأحد العظام الطويلة، وهو أطول عظام الهيكل العظمي عند الإنسان، ويكوّن أكثر من 26.74% من طول الإنسان، وهو أيضاً أقوى عظام الجسم وأصلبها في البشر. يتكون عظم الفخذ من:</p>`,
  Polvilumpio: `<h2>رضفة</h2><p>الرَّضْفَة (بالإنجليزية: Patella) أو الدَّاغِصَة أو عظمة رأس الركبة (بالإنجليزية: Kneecap) أو (بالإنجليزية: kneepan)، هي عظمة سميكة مستديرة ومثلثة الشكل تتمفصل مع عظم الفخذ، و هي تغطي وتحمي الجزء الأمامي لسطح مفصل الركبة. توجد الرضفة عند معظم الفقاريات مثل الفئران والقطط والطيور، ولكنها لا توجد في الحيتان و لا في الزواحف مثل الثعابين ولا في البرمائيات مثل الضفادع. تُعتبر الرضفة في الإنسان أكبر عظم سمسمي في الجسد كله. يولد الأطفال برضفة من الغضروف الرخو، ثم يبدأ التعظّم والتحول تدريجيا إلى عظم كامل عند بلوغه نحو ثلاث سنوات.</p>`,
  Sääriluu: `<h2>قصبة الساق</h2><p>قصبة الساق أو عظم الظنبوب (الجمع: ظنابيب) هو العظم الأكبر والأقوى وذو التوضع الأمامي من بين عظمي الساق تحت الركبة لدى الفقاريات (العظم الآخر هو الشظية، يتوضع خلف الظنبوب وإلى الخارج منه)، ويصل الركبة بعظام الكاحل. يوجد عظم الظنبوب في الجانب الأنسي (الأقرب إلى الوسط) من الساق إلى جانب الشظية ويكون أقرب منها إلى المستوى الناصف أو الخط المركزي. يرتبط عظم الظنبوب بعظم الشظية بالغشاء بين العظمي في الساق مشكلًا نوع من المفاصل الليفية يدعى التلازم ذات الحركة القليلة جدًا. أطلق على العظم اسم قصبة الساق تيمنًا بساق الناي. إنه ثاني أكبر العظام في جسم الإنسان بعد عظم الفخذ. إن عظام الساق هي أقوى العظام الطويلة إذ أنها تدعم باقي الجسم.</p>`,
  Pohjeluu: `<h2>عظم الشظية</h2><p>عظم الشظية (باللاتينية: fibula) هو أحد العظام الطويلة في البشر، وهو أحد عظمتي الساق الموجود على الجانب الوحشي أي الخارجي للساق، بينما يكون العظم الآخر وهو قصبة الساق في الجانب الإنسي أي الداخلي للساق.</p>`,
  Jalkateränluut: `<h2>عظام القدم</h2><p>مُشْط القدم مجموعةٌ من خمسة عظام طويلة في قدم الإنسان، تصل عظامَ الرُّصْغ بعظام سُلَامَيَات القدم. تُرَقَّم عظام مُشط القدم من الجانب الإنسي (جانب إصبع القدم الكبير): مشط القدم الأول، والثاني، والثالث، والرابع، والخامس (ترقم بالأرقام الرومانية غالبًا). عظام مشط القدم تُماثل عظام المشط في اليد. أطول عظام مشط القدم في الإنسان هي بترتيب تنازلي: الثاني، والثالث، والرابع، والخامس، والأول.</p>`
}

//valokuvavalinta
    for (let key in text_fi) {
  text_fi[key] += `<img src="image/${key}.png" alt="${key}" style="max-width:800px; display:block; margin-top:10px;">`;
}
for (let key in text_ua) {
  text_ua[key] += `<img src="image/${key}.png" alt="${key}" style="max-width:800px; display:block; margin-top:10px;">`;
}
for (let key in text_en) {
  text_en[key] += `<img src="image/${key}.png" alt="${key}" style="max-width:800px; display:block; margin-top:10px;">`;
}
for (let key in text_sv) { 
  text_sv[key] += `<img src="image/${key}.png" alt="${key}" style="max-width:800px; display:block; margin-top:10px;">`;
}
for (let key in text_de) {
  text_de[key] += `<img src="image/${key}.png" alt="${key}" style="max-width:800px; display:block; margin-top:10px;">`;
}
for (let key in text_fa) {
  text_fa[key] += `<img src="image/${key}.png" alt="${key}" style="max-width:800px; display:block; margin-top:10px;">`;
}
for (let key in text_ar) {
  text_ar[key] += `<img src="image/${key}.png" alt="${key}" style="max-width:800px; display:block; margin-top:10px;">`;
}


// Функція для оновлення назв кнопок// Funktio painikkeiden nimien päivittämiseen
let currentLang = "fi"; // початкова мова // lähdekieli

document.getElementById('languageSelect').addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateButtonNames(currentLang);
});

// Функція для відображення тексту при кліку на кнопку стрілки// Funktio, joka näyttää tekstin nuolipainiketta napsautettaessa
allButtons.forEach(id => {
  const btn = document.getElementById(id);
  if(btn){

     
//tiedosto vaihto
    btn.onclick = () => {
      document.getElementById("info_panel").style.display = "block";
      if(currentLang === "fi") document.getElementById("text").innerHTML = text_fi[id];
      else if(currentLang === "ua") document.getElementById("text").innerHTML = text_ua[id];
      else if (currentLang === "de") document.getElementById("text").innerHTML = text_de[id];
      else if (currentLang === "sv") document.getElementById("text").innerHTML = text_sv[id];
      else if (currentLang === "fa") document.getElementById("text").innerHTML = text_fa[id];
      else if (currentLang === "ar") document.getElementById("text").innerHTML = text_ar[id];
      else document.getElementById("text").innerHTML = text_en[id];
    };
  }
});


//kieli vaihto
allButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.onclick = () => {
            document.getElementById("info_panel").style.display = "block";
            if (currentLang === "fi") {
                document.getElementById("text").innerHTML = text_fi[id];
            } else if (currentLang === "ua") {
                document.getElementById("text").innerHTML = text_ua[id];
            } else if (currentLang === "sv") {
                document.getElementById("text").innerHTML = text_sv[id];
            } else if (currentLang === "de") {
                document.getElementById("text").innerHTML = text_de[id];
            } else if (currentLang === "fa") {
                document.getElementById("text").innerHTML = text_fa[id];
            } else if (currentLang === "ar") {
                document.getElementById("text").innerHTML = text_ar[id];
            } else {
                document.getElementById("text").innerHTML = text_en[id];
            }
        };
    }
});


});
// назви кнопок по мовах// painikkeiden nimet kielen mukaan
document.getElementById('languageSelect').addEventListener('change', (e) => {
  const selectedLang = e.target.value;
  console.log("Selected language:", selectedLang);
  // Тут можна підключити зміну текстів і кнопок на сайті
});

// всі кнопки// kaikki painikkeet
const leftButtons = ["Otsaluu","Päälaenluu","Ohimoluu","Takaraivoluu","Yläleukaluu","Alaleukaluu","Kaulanikama","Rintanikama","Lanneranka","Ristiluu","Rintalasta","Kylkiluu"];
const rightButtons = ["Solisluu","Lapaluu","Olkaluu","Värttinäluu","Kyynärluu","Sormienluut","Lantionluut","Reisiluu","Polvilumpio","Sääriluu","Pohjeluu","Jalkateränluut"];
const allButtons = leftButtons.concat(rightButtons);

// назви кнопок по мовах// painikkeiden nimet kielen mukaan
const names = {
  fi:
  {
    Otsaluu: "Otsaluu",            // Лобова кістка
    Päälaenluu: "Päälaenluu",      // Тім'яна кістка
    Ohimoluu: "Ohimoluu",          // Скронева кістка
    Takaraivoluu: "Takaraivon kyhmy",  // Потилична кістка
    Yläleukaluu: "Yläleukaluu",    // Верхня щелепа
    Alaleukaluu: "Alaleukaluu",    // Нижня щелепа
    Kaulanikama: "Kaulanikama",    // Шийний відділ хребта
    Rintanikama: "Rintanikama",    // Грудний відділ хребта
    Lanneranka: "Lanneranka",      // Поперековий відділ хребта
    Ristiluu: "Ristiluu",          // Крижова кістка
    Häntäluu: "Häntäluu",          // Копчиковий хребець
    Rintalasta: "Rintalasta",      // Груднина
    Kylkiluu: "Kylkiluu",          // Ребро
    Solisluu: "Solisluu",          // Ключиця
    Lapaluu: "Lapaluu",            // Лопатка
    Olkaluu: "Olkaluu",            // Плечова кістка
    Värttinäluu: "Värttinäluu",    // Променева кістка
    Kyynärluu: "Kyynärluu",        // Ліктьова кістка
      Sormienluut: "Sormienluut",       // Кістки пальців рук
    Lantionluut: "Lantionluut",       // Кістки таза
      Reisiluu: "Reisiluu",          // Стегнова кістка
    Polvilumpio: "Polvilumpio",          // Колінна кістка
    Sääriluu: "Sääriluu",          // Гомілкова кістка
    Pohjeluu: "Pohjeluu",          // Литкова кістка
      Jalkateränluut: "Jalkaterän luut" // Кістки стопи
  },

ua: {
    Otsaluu: "Лобова кістка",
    Päälaenluu: "Тім'яна кістка",
    Ohimoluu: "Скронева кістка",
    Takaraivoluu: "Потилична кістка",
    Yläleukaluu: "Верхня щелепа",
    Alaleukaluu: "Нижня щелепа",
    Kaulanikama: "Шийний відділ хребта",
    Rintanikama: "Грудний відділ хребта",
    Lanneranka: "Поперековий відділ хребта",
    Ristiluu: "Крижова кістка",
    Häntäluu: "Копчиковий хребець",
    Rintalasta: "Груднина",
    Kylkiluu: "Ребро",
    Solisluu: "Ключиця",
    Lapaluu: "Лопатка",
    Olkaluu: "Плечова кістка",
    Värttinäluu: "Променева кістка",
    Kyynärluu: "Ліктьова кістка",
    Sormienluut: "Кістки пальців рук",
    Lantionluut: "Кістки таза",
    Reisiluu: "Стегнова кістка",
    Polvilumpio: "Колінна кістка",
    Sääriluu: "Гомілкова кістка",
    Pohjeluu: "Литкова кістка",
    Jalkateränluut: "Кістки стопи"
},

  en: {
    Otsaluu:"Frontal bone", Päälaenluu:"Parietal bone", Ohimoluu:"Temporal bone", Takaraivoluu:"Occipital bone",
    Yläleukaluu:"Maxilla", Alaleukaluu:"Mandible", Kaulanikama:"Cervical vertebra", Rintanikama:"Thoracic vertebra",
    Lanneranka:"Lumbar vertebra", Ristiluu:"Sacrum", Rintalasta:"Sternum", Kylkiluu:"Rib",
    Solisluu:"Clavicle", Lapaluu:"Scapula", Olkaluu:"Humerus", Värttinäluu:"Radius", Kyynärluu:"Ulna",
      Sormienluut:"Finger bones", Lantionluut:"Pelvic bone", Reisiluu:"Femur", Polvilumpio:"Patella",
      Sääriluu:"Tibia", Pohjeluu:"Fibula", Jalkateränluut:"Foot bones"
  }, 
  sv: {
    Otsaluu: "Pannben",
    Päälaenluu: "Hjässben",
    Ohimoluu: "Tinningben",
    Takaraivoluu: "Nackben",
    Yläleukaluu: "Överkäke",
    Alaleukaluu: "Underkäke",
    Kaulanikama: "Halskota",
    Rintanikama: "Bröstkota",
    Lanneranka: "Ländrygg",
    Ristiluu: "Korsben",
    Rintalasta: "Bröstben",
    Kylkiluu: "Revben",
    Solisluu: "Nyckelben",
    Lapaluu: "Skulderblad",
    Olkaluu: "Överarmsben",
    Värttinäluu: "Strålben",
    Kyynärluu: "Armbågsben",
    Sormienluut: "Fingerben",
    Lantionluut: "Höftben",
    Reisiluu: "Lårben",
    Polvilumpio: "Knäskål",
    Sääriluu: "Skenben",
    Pohjeluu: "Vadben",
    Jalkateränluut: "Fotben"
  },
  de: {
    Otsaluu: "Stirnbein",
    Päälaenluu: "Scheitelbein",
    Ohimoluu: "Schläfenbein",
    Takaraivoluu: "Hinterhauptsbein",
    Yläleukaluu: "Oberkiefer",
    Alaleukaluu: "Unterkiefer",
    Kaulanikama: "Halswirbel",
    Rintanikama: "Brustwirbel",
    Lanneranka: "Lendenwirbel",
    Ristiluu: "Kreuzbein",
    Rintalasta: "Brustbein",
    Kylkiluu: "Rippen",
    Solisluu: "Schlüsselbein",
    Lapaluu: "Schulterblatt",
    Olkaluu: "Oberarmknochen",
    Värttinäluu: "Radius",
    Kyynärluu: "Ulna",
    Sormienluut: "Fingerknochen",
    Lantionluut: "Beckenknochen",
    Reisiluu: "Oberschenkelknochen",
    Polvilumpio: "Kniescheibe",
    Sääriluu: "Schienbein",
    Pohjeluu: "Wadenbein",
    Jalkateränluut: "Fußknochen"

  },
  
  fa: {
  Otsaluu: "استخوان پیشانی",
  Päälaenluu: "استخوان آهیانه",
  Ohimoluu: "استخوان گیجگاهی",
  Takaraivoluu: "استخوان پس‌سری",
  Yläleukaluu: "استخوان فک بالا",
  Alaleukaluu: "استخوان فک پایین",
  Kaulanikama: "مهره گردنی",
  Rintanikama: "مهره سینه‌ای",
  Lanneranka: "مهره کمری",
  Ristiluu: "استخوان خاجی",
  Rintalasta: "استخوان جناغ",
  Kylkiluu: "دنده",
  Solisluu: "استخوان ترقوه",
  Lapaluu: "استخوان کتف",
  Olkaluu: "استخوان بازو",
  Värttinäluu: "استخوان زند زبرین",
  Kyynärluu: "استخوان زند",
  Sormienluut: "استخوان‌های انگشتان",
  Lantionluut: "استخوان‌های لگن",
  Reisiluu: "استخوان ران",
  Polvilumpio: "کشکک زانو",
  Sääriluu: "استخوان ساق پا",
  Pohjeluu: "استخوان نازک نی",
  Jalkateränluut: "استخوان‌های پا"
  },

  ar: {
  Otsaluu: "عظم الجبهة",
  Päälaenluu: "العظم الجداري",
  Ohimoluu: "العظم الصدغي",
  Takaraivoluu: "العظم القذالي",
  Yläleukaluu: "عظم الفك العلوي",
  Alaleukaluu: "عظم الفك السفلي",
  Kaulanikama: "الفقرات العنقية",
  Rintanikama: "الفقرات الصدرية",
  Lanneranka: "الفقرات القطنية",
  Ristiluu: "العجز",
  Rintalasta: "عظم القص",
  Kylkiluu: "الأضلاع",
  Solisluu: "عظم الترقوة",
  Lapaluu: "لوح الكتف",
  Olkaluu: "عظم العضد",
  Värttinäluu: "عظم الكعبرة",
  Kyynärluu: "عظم الزند",
  Sormienluut: "عظام الأصابع",
  Lantionluut: "عظام الحوض",
  Reisiluu: "عظم الفخذ",
  Polvilumpio: "صابونة الركبة",
  Sääriluu: "عظم الساق (القصبة)",
  Pohjeluu: "عظم الشظية",
  Jalkateränluut: "عظام القدم"
}



};

// функція для оновлення назв кнопок// funktio painikkeiden nimien päivittämiseen
function updateButtonNames(lang) {
  allButtons.forEach(id => {
    const panel = document.getElementById(id).parentElement;
    panel.firstChild.textContent = names[lang][id] + " ";
  });
}

// слухач select// valitse kuuntelija
document.getElementById('languageSelect').addEventListener('change', (e)=>{
  const lang = e.target.value;
  updateButtonNames(lang);
});

const close_button = document.getElementById("close_button");
if (close_button) {
    close_button.onclick = () => {
        document.getElementById("info_panel").style.display = "none";
    };
}



// тут функції які довзволяють появі кота та приберають її
// tässä ovat funktiot, joiden avulla kissa voi ilmestyä ja poistaa sen
const meme_cat = document.getElementById('meme_cat'); // вибирає перший елемент з класом meme_cat
const gif = document.getElementById('gif');
const border_but_div = document.getElementById('border_but_div');
const border = document.getElementById('border');


// перша лінія появи яка покаже другу
// ensimmäinen esiintymisrivi, joka näyttää toisen
border_but_div.addEventListener("mouseenter", () => {
    border.style.display = "block";
})
// друга лінія яка покаже div в якому кіт
// toisella rivillä näytetään div-tiedosto, jossa kissa on
border.addEventListener("mouseenter", () => {
    meme_cat.style.display = "block";
})
// покаже кота
// näytä kissa
meme_cat.addEventListener("mouseenter", () => {
    gif.style.display = "block";
});
// забере кота коли курсор не на ньому
// ota kissa, kun kursori ei ole sen päällä
meme_cat.addEventListener("mouseleave", () => {
    gif.style.display = "none";
});

// кнопка закриття div де знаходиться кіт
const meme_button = document.getElementById("meme_button");
if (meme_button) {
    meme_button.onclick = () => {
        document.getElementById("meme_cat").style.display = "none";
    };
}
const close_button_all = document.getElementById("close_button_all");
if (close_button_all) {
    close_button_all.onclick = () => {
        document.getElementById("left-panel").style.display = "none";
    };
}
const show_left_panel = document.getElementById("show_left_panel");
if (show_left_panel) {
    show_left_panel.onclick = () => {
        document.getElementById("left-panel").style.display = "block";
    };
}

window.onload = function() {
    document.getElementById("controls_overlay").style.display = "block";
    document.getElementById("controls_camera").style.display = "block";
};
document.getElementById("close_for_controls").onclick = function() {
    document.getElementById("controls_overlay").style.display = "none";
    document.getElementById("controls_camera").style.display = "none";
};



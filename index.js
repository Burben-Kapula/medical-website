import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { OBJLoader } from "jsm/loaders/OBJLoader.js"; // ✅ для skeleton.obj

// --- Сцена, камера, рендер ---
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Зменшуємо видиму область → модель здається більшою
const zoom = 7; // чим більше, тим ближче / більша модель
const camera = new THREE.OrthographicCamera(
  w / -200 / zoom,
  w / 200 / zoom,
  h / 200 / zoom,
  h / -200 / zoom,
  0.1,
  1000
);

camera.position.set(1, 0, 80);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;

// --- Цільові позиції ---
// --- Початкові координати камери ---
const initPos = new THREE.Vector3(1, 0, 80);  // стартова позиція
const initLook = new THREE.Vector3(0, 0, 0);  // стартовий напрямок

camera.position.copy(initPos);
camera.lookAt(initLook);

let targetPos = new THREE.Vector3().copy(initPos); 
let targetLook = new THREE.Vector3().copy(initLook);

// --- Кнопки ---
document.getElementById("button_right").onclick = () => {
  targetPos.set(2, 0.5, 1.6);
  targetLook.set(0, 2.5, 0);
};

document.getElementById("button_back").onclick = () => {
  targetPos.set(-1, 0, -3);
  targetLook.set(-8, 1.5, 0);
};

document.getElementById("button_head").onclick = () => {
  targetPos.set(-1, 0.5, 0.6);
  targetLook.set(-4, 0, 1.5);
};

document.getElementById("button_legs").onclick = () => {
  targetPos.set(0, 0, 3);
  targetLook.set(0, -9, 3);
};

document.getElementById("button_front").onclick = () => {
  targetPos.copy(initPos);   // 🔹 повертаємось у стартову позицію
  targetLook.copy(initLook); // 🔹 і дивимось у стартовий напрямок
};

// --- Завантаження skeleton.obj ---
const objLoader = new OBJLoader();
objLoader.load("./assets/skeleton.obj", (object) => {
  object.scale.set(0.05, 0.05, 0.05);
  object.position.set(-0.6, 0, 0);
  scene.add(object);
});

// --- Освітлення ---
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// --- Фон ---

// --- Рендер ---
function animate() {
  requestAnimationFrame(animate);

  // 🔹 Плавний рух камери
  camera.position.lerp(targetPos, 0.05);

  // 🔹 Плавний поворот камери
  let currentLook = new THREE.Vector3();
  currentLook.lerpVectors(
    camera.getWorldDirection(new THREE.Vector3()).add(camera.position),
    targetLook,
    0.05
  );
  camera.lookAt(currentLook);

  renderer.render(scene, camera);
  ctrls.update();
}
animate();

// --- Ресайз ---
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

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
    Kaulanikama: `<h2>Kaulanikama</h2><p>  Nikama (vertebra) on epäsäännöllisen muotoinen moniulokkeinen luu, joista selkäranka muodostuu. Nikaman osia ovat nikamasolmu, nikamakaari ja nikamaulokkeet. 
    Nikaman sisällä kulkee selkäydinkanava. Nikamat sijaitsevat päällekkäin ja niveltyvät toisiinsa, mikä tekee selkärangasta taipuvan.​</p>`,
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
    Varttinaluu: `<h2>Värttinäluu</h2><p>Värttinäluu (lat. radius) on toinen kyynärvarren kahdesta luusta. Se sijaitsee peukalon puolella ja muodostaa yhdessä kyynärluun kanssa kyynärvarren. Ihmisellä
     ja lihansyöjillä näiden kahden luun välissä oleva luuvälikalvo tekee niistä yhden kokonaisuuden. Kyynär- ja värttinäluun kiertyminen toistensa ympäri mahdollistaa niin sanotun avaimenkiertoliikkeen.
      Sialla luut ovat kiinni toisissaan tiiviillä sidekudoksella, joka ei salli kovin suurta kyynärvarren kiertoliikettä. Märehtijöillä ja hevosella luut ovat luutuneet toisiinsa kiinni.​</p>`,
    Kyyarnluu: `<h2>Kyynärluu</h2><p> Kyynärluu (lat. ulna) on pikkusormen puolella sijaitseva, ranteen suuntaan kapeneva kyynärvarren luu.​
    Kyynärluun yhdistää vieressä sijaitsevaan värttinäluuhun niiden välissä kulkeva luuvälikalvo. Kyynärluu muodostaa yhdessä värttinäluun ja olkaluun kanssa kyynärnivelen (articulatio cubiti), joka on
     toiminnaltaan kaksiakselinen eli mahdollistaa koukistus/ojennus- ja kiertoliikkeen.​
    ​</p>`,
    Sormien: `<h2>Sormien luut</h2><p>Sormien luut ovat luita, jotka muodostavat sormien luisen tukirangan. Ihmisen kaikissa sormissa on kolme luuta paitsi peukalossa, jossa on vain kaksi.​
    Sormiluut ovat sormen tyvijäsen (lat. phalanx proximalis), sormen keskijäsen (phalanx media, puuttuu peukalosta) sekä sormen kärkijäsen (phalanx distalis).[1] Sormiluut ovat pitkulaisia, ja niiden
     osia ovat tyvi (basis) proksimaalisesti, pää (caput) distaalisesti ja näiden välissä runko (corpus).​</p>`,
    Lantion: `<h2>Lantion luu</h2><p> Lonkkaluu (lat. os coxae) on suuri, litteä ja epäsäännöllisen muotoinen luu, joka on osa luista lantiorengasta. Oikean- ja vasemmanpuoleinen lonkkaluu muodostavat 
    yhdessä lantion sivu- ja etuseinät.​</p>`,
    Reisiluu: `<h2>Reisiluu</h2><p> Reisiluu (lat. femur) on ihmiskehon pisin ja vahvin luu. Se sijaitsee lonkkanivelen ja polvinivelen välissä. Reisiluun anatominen vastine eturaajassa on olkaluu.​
    Reisiluun yläpään pallomainen osa, jossa on lonkkamaljaan niveltyvä nivelpinta on nimeltään reisiluun pää (caput femoris). Se pää kiinnittyy reisiluun varteen ohuehkolla reisiluunkaulalla (collum femoris),
     joka on reisiluun helpoiten murtuva osa varsinkin vanhuksilla. Reisiluun yläosassa lateraalisesti reisiluun päähän nähden sijaitsee iso sarvennoinen (trochanter major), hyvin tuntuva luu-uloke, johon 
     monien pakaranseudun lihasten jänteet kiinnittyvät. Reisiluun yläosan takapinnalla lihasten peitossa puolestaan sijaitsee toinen luu-uloke, pieni sarvennoinen (trochanter minor), johon kiinnittyy
       lanne-suoliluulihas (musculus iliopsoas) jänne. Kolmas samankaltainen uloke on kolmas sarvennoinen (trochanter tertius), joka esiintyy toisinaan pienen sarvennoisen korkeudella reisiluun takapinnalla
        ja johon kiinnittyy osa isosta pakaralihaksesta (musculus gluteus maximus).​
    ​</p>`,
    Polviluu: `<h2>Polviluu</h2><p>Polvilumpio (lat. patella) on kolmionmuotoinen luu, joka sijaitsee nelipäisen reisilihaksen jänteessä. Se liikkuu pitkin reisiluun alaosan etupintaa polven koukistuessa 
    ja ojentuessa. Polvilumpio yhdistää nelipäisen reisilihaksen jänteet yhdellä alapuolisella jänteellä sääriluuhun. Kyseisiä jänteitä tarvitaan jalan ojentamiseen.​</p>`,
    Saariluu: `<h2>Sääriluu</h2><p>Sääriluu (lat. tibia) on suurempi kahdesta säären luusta. Sääriluu niveltyy yläpäästään reisiluuhun (femur) ja alapäästään telaluuhun (talus). Sääriluu niveltyy myös
     ulkosivullaan kulkevaan pohjeluuhun (fibula).​</p>`,
    Pohjeluu: `<h2>Pohjeluu</h2><p> Pohjeluu (lat. fibula) on ohuempi kahdesta säären luusta. Se sijaitsee takaraajan (ihmisellä alaraajan) lateraalisella puolella sääriluun (tibia) vieressä siihen niveltyen.
     Luiden väliin jää vaihtelevan kokoinen aukko (spatium interossium cruris), jossa kulkee luut toisiinsa sitova sidekudoskalvo (membrana interossea cruris). Pohjeluu sijaitsee alempana kuin sääriluu eikä
      näin ollen kiinnity reisiluuhun (femur). Naudalla ja pienillä märehtijöillä pohjeluu on surkastunut lähes kokonaan, mutta hevosella vain osittain. Nilkkaluista pohjeluu niveltyy telaluuhun (talus),
       mutta kiinnittyy nivelsiteillä myös kantaluuhun (calcaneus).​</p>`,
    Jalkateran: `<h2>Jalkaterän luu</h2><p>Jalkaterän luut muodostavat koko jalkaterän luurangon. Ne sisältävät nilkan luut, jalkapöydän luut ja varpaiden luut. Jalkaterän luut tukevat kehon painoa,
     mahdollistavat kävelyn, juoksun ja tasapainon säätelyn.</p>`,
    };


const text_ua = {
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

Людини
Верхня щелепа людини (maxilla) — парна кістка лицевого черепа. Вона має тіло (corpus maxillae) і 4 відростки: лобовий (processus frontalis), виличний (processus zygomaticus), альвеолярний (processus alveolaris) і піднебінний (processus palatinus).

Тіло верхньої щелепи (corpus maxillae) містить верхньощелепну пазуху (sinus maxillaris), що сполучається через великий верхньощелепний розтвір (hiatus maxillaris) з носовою порожниною. Цю порожнину ще називають пазухою Гаймора. Тіло має неправильну кубоподібну форму, на ньому є 4 поверхні: передня, очноямкова, підскронева і носова.</p>`,
  Alaleukaluu: `<h2>Нижня щелепа</h2><p>Нижньощеле́пна кі́стка (лат. mandibula) — кістка лицевого черепа. Єдина рухома кістка черепа[1]. Утворена з двох зубних кісток в амніотів, в анамній розділена.

Анатомія у людини
Складається із тіла та двох гілок, сполучених з тілом під кутом 110—130°. Основа тіла масивна. По середній лінії видно звернений вентрально підборідний виступ, який є характерною властивістю черепа людини. На гілках розташовані альвеоли зубів. Гілки щелепи спрямовуються краніально і закінчуються двома відростками: переднім — вінцевим і заднім — суглобовим, розділеними вирізкою. До вінцевого приєднується скроневий м'яз, на другому розташована суглобова голівка скронево-нижньощелепного суглоба. Збоку до суглобового відростка приєднується крилоподібний м'яз.</p>`,
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
Varttinaluu:`<h2>Променева кістка</h2><p>Промене́ва кі́стка (лат. radius) — довга трубчаста кістка передпліччя. З'єднується з плечовою та ліктьовою кістками. На верхньому епіфізі є суглобова ямка для сполучення з голівкою плечової кістки та суглобове коло для сполучення з ліктьовою кісткою. Поряд з цією голівкою розташована горбистість двоголового м'яза. Дистальний епіфіз має зап'ястну суглобову поверхню для сполучення з верхнім (проксимальним) рядом кісток зап'ястя і закінчується латеральним шилоподібним відростком. На медіальному краї цього епіфізу є суглобова поверхня для сполучення із ліктьовою кісткою.</p>`,
Kyyarnluu:`<h2>Ліктьова кістка</h2><p>Ліктьова кі́стка (лат. ulna) — кістка руки, яка має тіло і два епіфізи. На верхньому епіфізі є два відростки: ліктьовий (англ. olecranon process) і вінцевий (англ. coronoid process). Між ними утворюється блокоподібна вирізка, яка з'єднується з однойменною суглобовою поверхнею плечової кістки (утворюється блокоподібний суглоб). На латеральній поверхні є променева вирізка, куди заходить головка променевої кістки і утворюється проксимальний променево-ліктьовий суглоб (циліндричний). Тіло тригранне: долонна, тильна і латеральна поверхні. Долонна і тильна утворюють міжкістковий гребінь. На нижньому епіфізі є головка з суглобовою поверхнею і медіальний шилоподібний відросток, що виступає зі сторони малого пальця.</p>`,
Sormien:`<h2>Кістки пальців рук</h2><p>Ossa digitorum manus (кістки пальців рук) — кістки, що утворюють скелет пальців кисті. Вони забезпечують рухливість пальців: згинання, розгинання, відведення та приведення. Кожен палець, крім великого, має три кістки: проксимальну, середню та дистальну. Великий палець складається з двох кісток: проксимальної та дистальної. Ці кістки з’єднуються суглобами і прикріплені до м’язів кисті, що дозволяє виконувати тонкі та точні рухи.</p>`,
Lantion:`<h2>Кістки таза</h2><p>Кістки таза (лат. ossa coxae) формують тазове кільце і з’єднують хребет із нижніми кінцівками.</p>`,
Reisiluu:`<h2>Стегнова кістка</h2><p>Стегнова кістка (лат. femur) — найдовша і найміцніша кістка тіла, з’єднує таз із гомілкою.</p>`,
Polviluu:`<h2>Колінна кістка</h2><p>Колінна кістка (лат. patella) захищає колінний суглоб і полегшує роботу м’язів стегна.</p>`,
Saariluu:`<h2>Гомілкова кістка</h2><p>Гомілкова кістка (лат. tibia) розташована у нижній частині ноги і несе вагу тіла.</p>`,
Pohjeluu:`<h2>Литкова кістка</h2><p>Литкова кістка (лат. fibula) розташована збоку гомілки і допомагає підтримувати щиколотку.</p>`,
Jalkateran:`<h2>Кістки стопи</h2><p>Кістки стопи (лат. ossa pedis) формують скелет стопи і забезпечують опору та рухливість ноги.</p>`

};

const text_en = {
  Otsaluu: `<h2>Frontal bone</h2><p>The frontal bone is a paired element of the skull forming the front part of the head.</p>`,
  Päälaenluu: `<h2>Parietal bone</h2><p>The parietal bones form the sides of the skull.</p>`,
  Ohimoluu: `<h2>Temporal bone</h2><p>The temporal bone is located on the side of the skull.</p>`,
  Takaraivoluu: `<h2>Occipital bone</h2><p>The occipital bone forms the back part of the skull.</p>`,
  Yläleukaluu: `<h2>Maxilla</h2><p>The maxilla forms the upper part of the mouth.</p>`,
  Alaleukaluu: `<h2>Mandible</h2><p>The mandible forms the lower part of the mouth.</p>`,
  Kaulanikama: `<h2>Cervical vertebra</h2><p>The cervical vertebrae are located in the upper part of the spine.</p>`,
  Rintanikama: `<h2>Thoracic vertebra</h2><p>The thoracic vertebrae form the thoracic section of the spine.</p>`,
  Lanneranka: `<h2>Lumbar vertebra</h2><p>The lumbar vertebrae support the weight of the body.</p>`,
  Ristiluu: `<h2>Sacrum</h2><p>The sacrum forms the back part of the pelvis.</p>`,
  Rintalasta: `<h2>Sternum</h2><p>The sternum protects the heart and lungs.</p>`,
  Kylkiluu: `<h2>Rib</h2><p>The ribs protect the chest cavity.</p>`,
  Solisluu: `<h2>Clavicle</h2><p>The clavicle connects the sternum to the scapula.</p>`,
  Lapaluu: `<h2>Scapula</h2><p>The scapula is located on the back behind the shoulders.</p>`,
  Olkaluu: `<h2>Humerus</h2><p>The humerus is the main bone of the upper limb.</p>`,
  Varttinaluu: `<h2>Radius</h2><p>The radius is located in the forearm.</p>`,
  Kyyarnluu: `<h2>Ulna</h2><p>The ulna is located next to the radius.</p>`,
  Sormien: `<h2>Finger bones</h2><p>The finger bones form the skeleton of the fingers.</p>`,
  Lantion: `<h2>Pelvic bone</h2><p>The pelvic bone forms the pelvic ring.</p>`,
  Reisiluu: `<h2>Femur</h2><p>The femur is the longest and strongest bone in the body.</p>`,
  Polviluu: `<h2>Patella</h2><p>The patella protects the knee.</p>`,
  Saariluu: `<h2>Tibia</h2><p>The tibia is located in the lower part of the leg.</p>`,
  Pohjeluu: `<h2>Fibula</h2><p>The fibula is located on the side of the lower leg.</p>`,
  Jalkateran: `<h2>Foot bones</h2><p>The foot bones form the skeleton of the foot.</p>`
};

// Функція для оновлення назв кнопок
let currentLang = "fi"; // початкова мова

document.getElementById('languageSelect').addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateButtonNames(currentLang);
});

// Функція для відображення тексту при кліку на кнопку
allButtons.forEach(id => {
  const btn = document.getElementById(id);
  if(btn){
    btn.onclick = () => {
      document.getElementById("info_panel").style.display = "block";
      if(currentLang === "fi") document.getElementById("text").innerHTML = text_fi[id];
      else if(currentLang === "ua") document.getElementById("text").innerHTML = text_ua[id];
      else document.getElementById("text").innerHTML = text_en[id];
    };
  }
});

// Закриття панелі
document.getElementById("btn_close").onclick = () => {
  document.getElementById("info_panel").style.display = "none";
};



















  const btn_close = document.getElementById("btn_close");
  if (btn_close) {
    btn_close.onclick = () => {
      document.getElementById("info_panel").style.display = "none";
    };
  }
  for (const id in info) {
    const btn = document.getElementById(id);
    if (btn) {
      // перевірка, щоб уникнути помилок
      btn.onclick = () => {
        document.getElementById("info_panel").style.display = "block";
        document.getElementById("text").innerHTML = info[id];
      };
    }
  }
});
// назви кнопок по мовах
document.getElementById('languageSelect').addEventListener('change', (e) => {
  const selectedLang = e.target.value;
  console.log("Selected language:", selectedLang);
  // Тут можна підключити зміну текстів і кнопок на сайті
});

// всі кнопки
const leftButtons = ["Otsaluu","Päälaenluu","Ohimoluu","Takaraivoluu","Yläleukaluu","Alaleukaluu","Kaulanikama","Rintanikama","Lanneranka","Ristiluu","Rintalasta","Kylkiluu"];
const rightButtons = ["Solisluu","Lapaluu","Olkaluu","Varttinaluu","Kyyarnluu","Sormien","Lantion","Reisiluu","Polviluu","Saariluu","Pohjeluu","Jalkateran"];
const allButtons = leftButtons.concat(rightButtons);

// назви кнопок по мовах
const names = {
  fi: {
    Otsaluu:"Otsaluu", Päälaenluu:"Päälaenluu", Ohimoluu:"Ohimoluu", Takaraivoluu:"Takaraivoluu",
    Yläleukaluu:"Yläleukaluu", Alaleukaluu:"Alaleukaluu", Kaulanikama:"Kaulanikama", Rintanikama:"Rintanikama",
    Lanneranka:"Lanneranka", Ristiluu:"Ristiluu", Rintalasta:"Rintalasta", Kylkiluu:"Kylkiluu",
    Solisluu:"Solisluu", Lapaluu:"Lapaluu", Olkaluu:"Olkaluu", Varttinaluu:"Värttinäluu", Kyyarnluu:"Kyynärluu",
    Sormien:"Sormien luut", Lantion:"Lantion luu", Reisiluu:"Reisiluu", Polviluu:"Polviluu",
    Saariluu:"Sääriluu", Pohjeluu:"Pohjeluu", Jalkateran:"Jalkaterän luu"
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
    Vartaluu: "Променева кістка",
    Kyynerluu: "Ліктьова кістка",
    Sormienluut: "Кістки пальців рук",
    Lantionluut: "Кістки таза",
    Reisiluu: "Стегнова кістка",
    Polviluu: "Колінна кістка",
    Sääriluu: "Гомілкова кістка",
    Pohjeluu: "Литкова кістка",
    Jalkateranluut: "Кістки стопи"
},

  en: {
    Otsaluu:"Frontal bone", Päälaenluu:"Parietal bone", Ohimoluu:"Temporal bone", Takaraivoluu:"Occipital bone",
    Yläleukaluu:"Maxilla", Alaleukaluu:"Mandible", Kaulanikama:"Cervical vertebra", Rintanikama:"Thoracic vertebra",
    Lanneranka:"Lumbar vertebra", Ristiluu:"Sacrum", Rintalasta:"Sternum", Kylkiluu:"Rib",
    Solisluu:"Clavicle", Lapaluu:"Scapula", Olkaluu:"Humerus", Varttinaluu:"Radius", Kyyarnluu:"Ulna",
    Sormien:"Finger bones", Lantion:"Pelvic bone", Reisiluu:"Femur", Polviluu:"Patella",
    Saariluu:"Tibia", Pohjeluu:"Fibula", Jalkateran:"Foot bones"
  }
};
// функція для оновлення назв кнопок
function updateButtonNames(lang) {
  allButtons.forEach(id => {
    const panel = document.getElementById(id).parentElement;
    panel.firstChild.textContent = names[lang][id] + " ";
  });
}

// слухач select
document.getElementById('languageSelect').addEventListener('change', (e)=>{
  const lang = e.target.value;
  updateButtonNames(lang);
});
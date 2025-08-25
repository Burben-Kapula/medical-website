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
let targetPos = new THREE.Vector3().copy(camera.position); // куди рухається камера
let targetLook = new THREE.Vector3(0, 0.5, 0); // куди дивиться камера

// --- Кнопки ---
document.getElementById("button_right").onclick = () => {
  targetPos.set(2, 0.5, 1.6); // права
  targetLook.set(0, 0.5, 0); // дивимось на тулуб
};
document.getElementById("button_left").onclick = () => {
  targetPos.set(-2, 0.9, -1.6); // ліва
  targetLook.set(0, 0.5, 0); // дивимось на тулуб
};
document.getElementById("button_head").onclick = () => {
  targetPos.set(1, 1.5, 0.2); // позиція камери
  targetLook.set(0, 10, 2); // 🔹 дивимось на голову
};
document.getElementById("button_legs").onclick = () => {
  targetPos.set(0, 0, 3); // позиція
  targetLook.set(0, 0, 0); // дивимось на ноги
};

// --- Завантаження skeleton.obj ---
const objLoader = new OBJLoader();
objLoader.load("./assets/skeleton.obj", (object) => {
  object.scale.set(0.05, 0.05, 0.05); // підганяємо під сцену

  // 🔹 Ставимо модель зліва
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
  const info = {
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
    Otsaluu:"Лобова кістка", Päälaenluu:"Тім'яна кістка", Ohimoluu:"Скронева кістка", Takaraivoluu:"Задня частина черепа",
    Yläleukaluu:"Верхня щелепа", Alaleukaluu:"Нижня щелепа", Kaulanikama:"Шийний хребець", Rintanikama:"Грудний хребець",
    Lanneranka:"Поперековий хребець", Ristiluu:"Крижова кістка", Rintalasta:"Груднина", Kylkiluu:"Ребро",
    Solisluu:"Ключиця", Lapaluu:"Лопатка", Olkaluu:"Плечова кістка", Varttinaluu:"Променева кістка", Kyyarnluu:"Ліктьова кістка",
    Sormien:"Кістки пальців", Lantion:"Кістка тазу", Reisiluu:"Стегнова кістка", Polviluu:"Колінна кістка",
    Saariluu:"Гомілкова кістка", Pohjeluu:"Литкова кістка", Jalkateran:"Кістки стопи"
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





allButtons.forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    if(currentLang === 'ua') {
      document.getElementById('info-panel').innerHTML = text_ua[id];
    } else if(currentLang === 'fi') {
      document.getElementById('info-panel').innerHTML = text_fi[id];
    } else {
      document.getElementById('info-panel').innerHTML = text_en[id];
    }
  });
});

import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { OBJLoader } from "jsm/loaders/OBJLoader.js"; // ✅ для skeleton.obj

// --- Сцена, камера, рендер ---
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 1, 3); // стартова позиція

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;

// --- Цільові позиції ---
let targetPos = new THREE.Vector3().copy(camera.position); // куди рухається камера
let targetLook = new THREE.Vector3(0, 0.5, 0);             // куди дивиться камера

// --- Кнопки ---
document.getElementById("button_right").onclick = () => {
  targetPos.set(2, 0.5, 1.6); // права
  targetLook.set(0, 0.5, 0);  // дивимось на тулуб
};
document.getElementById("button_left").onclick = () => {
  targetPos.set(-2, 0.9, -1.6); // ліва
  targetLook.set(0, 0.5, 0);    // дивимось на тулуб
};
document.getElementById("button_head").onclick = () => {
  targetPos.set(1, 1.5, 0.2);   // позиція камери
  targetLook.set(0, 10, 2);    // 🔹 дивимось на голову
};
document.getElementById("button_legs").onclick = () => {
  targetPos.set(0, 0, 3);       // позиція
  targetLook.set(0, 0, 0);      // дивимось на ноги
};

// --- Завантаження skeleton.obj ---
const objLoader = new OBJLoader();
objLoader.load("./assets/skeleton.obj", (object) => {
  object.scale.set(0.05, 0.05, 0.05);   // підганяємо під сцену
  object.position.set(0, 0, 0);         // ставимо в центр
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
    Alaleukaluu: `<h2>Alaleukaluu</h2><p>Alaleuanluu (mandibula) on selkäjänteisten luu, johon alahampaat ovat kiinnittyneet. Rungon takaa suuntautuvat ylöspäin alaleukaluun haarat. Vasen ja oikea yläleuanluu sijaitsevat alaleuanluuta vasten niveltymättä siihen. Ihmisellä alaleuan kärjessä on leukakyhmy. Alaleuanluu niveltyy korvakäytävien lähellä ohimoluihin. Kyseiset leukanivelet liikkuvat suuta aukoessa.​</p>`,
    Kaulanikama: `<h2>Kaulanikama</h2><p>  Nikama (vertebra) on epäsäännöllisen muotoinen moniulokkeinen luu, joista selkäranka muodostuu. Nikaman osia ovat nikamasolmu, nikamakaari ja nikamaulokkeet. Nikaman sisällä kulkee selkäydinkanava. Nikamat sijaitsevat päällekkäin ja niveltyvät toisiinsa, mikä tekee selkärangasta taipuvan.​</p>`,
    Rintanikama: `<h2>Rintanikama</h2><p></p>`,
    Lanneranka: `<h2>Lanneranka</h2><p></p>`,
    Ristiluu: `<h2>Ristiluu</h2><p></p>`,
    Rintalasta: `<h2>Rintalasta</h2><p></p>`,
    Kylkiluu: `<h2>Kylkiluu</h2><p></p>`,
    Solisluu: `<h2>Solisluu</h2><p></p>`,
    Lapaluu: `<h2>Lapaluu</h2><p></p>`,
    Olkaluu: `<h2>Olkaluu</h2><p></p>`,
    Varttinaluu: `<h2>Värttinäluu</h2><p></p>`,
    Kyyarnluu: `<h2>Kyynärluu</h2><p></p>`,
    Sormien: `<h2>Sormien luut</h2><p></p>`,
    Lantion: `<h2>Lantion luu</h2><p></p>`,
    Reisiluu: `<h2>Reisiluu</h2><p></p>`,
    Polviluu: `<h2>Polviluu</h2><p></p>`,
    Saariluu: `<h2>Sääriluu</h2><p></p>`,
    Pohjeluu: `<h2>Pohjeluu</h2><p></p>`,
    Jalkateran: `<h2>Jalkaterän luu</h2><p></p>`
  };
  
  const btn_close = document.getElementById("btn_close");
  if (btn_close){
    btn_close.onclick = () => {
      document.getElementById("info_panel").style.display = "none";  
    } 
  }
  for (const id in info) {
    const btn = document.getElementById(id);
    if (btn) {  // перевірка, щоб уникнути помилок
      btn.onclick = () => {
        document.getElementById("info_panel").style.display = "block";  
        document.getElementById("text").innerHTML = info[id];
      } 

    }
  }
});
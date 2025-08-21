import * as THREE from "three";
import getLayer from "./getLayer.js";
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
const gradientBackground = getLayer({
  hue: 1.5,
  numSprites: 8,
  opacity: 1,
  radius: 10,
  size: 24,
  z: -15.5,
});
scene.add(gradientBackground);

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
    Ohimoluu: `<h2>Ohimoluu</h2><p>Ohimoluu on kallon sivulla oleva luu, joka muodostaa osan otsan ja posken aluetta.​</p>`,
    Takaraivoluu: `<h2>Takaraivoluu</h2><p>(lat. os occipitale) kuuluu kallon luihin (ossa cranii) ja se koostuu kolmesta yhteen liittyneestä osasta. Pars basilaris sijaitsee alimmaisena ja sen alaosassa on atlaksen kanssa artikuloiva condylus occipitalis. Pars lateralis sijaitsee pars basilariksen molemminpuolin ja siinä oleva uloke, processus paracondylaris, toimii pään lihasten kiinnittymiskohtana. Squama occipitalis sijaitsee ylimpänä takaraivoluussa ja sen yläosassa on palpoitavissa oleva kyhmy, crista nuchae. Kaikki kolme takaraivoluun osaa osallistuvat niska-aukon (foramen magnum) muodostamiseen.​​</p>`

  };

  for (const id in info) {
    const btn = document.getElementById(id);
    if (btn) {  // перевірка, щоб уникнути помилок
      btn.onclick = () => {
        document.getElementById("text").innerHTML = info[id];
      };
    }
  }
});
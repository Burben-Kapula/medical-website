import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { OBJLoader } from "jsm/loaders/OBJLoader.js";
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/loaders/GLTFLoader.js';
import { translations } from './locals.js';

let mouse, model;
let isHovered = false;

//valokuvavalinta - add images to translations
const langKeys = ['fi', 'ua', 'en', 'sv', 'de', 'fa', 'ar'];
langKeys.forEach(lang => {
    const textObj = translations[`text_${lang}`];
    if (textObj) {
        for (let key in textObj) {
            textObj[key] += `<img src="image/${key}.png" alt="${key}" style="max-width:800px; display:block; margin-top:10px;">`;
        }
    }
});

// --- Сцена, камера, рендер ---
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

// Світло - natural balanced lighting
const lightLeft = new THREE.DirectionalLight(0xffffff, 0.25);
lightLeft.position.set(-5, 5, 0);
scene.add(lightLeft);

const lightRight = new THREE.DirectionalLight(0xffffff, 0.25);
lightRight.position.set(5, 5, 0);
scene.add(lightRight);

const lightFront = new THREE.DirectionalLight(0xffffff, 0.15);
lightFront.position.set(0, 5, 5);
scene.add(lightFront);

const lightBack = new THREE.DirectionalLight(0xffffff, 0.1);
lightBack.position.set(0, 5, -5);
scene.add(lightBack);

const lightBottom = new THREE.DirectionalLight(0xffffff, 0.08);
lightBottom.position.set(0, -5, 0);
scene.add(lightBottom);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

// Камера
const zoom = 7;
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

// --- Контроли ---
const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;
ctrls.dampingFactor = 0.05;
ctrls.screenSpacePanning = true;
ctrls.minDistance = 1;
ctrls.maxDistance = 200;

// Кнопки кольорів
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach(button => {
    const color = button.dataset.color;
    if (!color) return;
    button.style.backgroundColor = color;
    button.addEventListener('click', () => {
        scene.background = new THREE.Color(color);
    });
});

// Завантаження моделі
const objLoader = new OBJLoader();
objLoader.load("./assets/skelewwttt.obj", (object) => {
    object.scale.set(0.05, 0.05, 0.05);
    object.position.set(-0.3, -0.3, 0);
    scene.add(object);
});

// Освітлення
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.35);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// --- Рендер ---
function animate() {
    requestAnimationFrame(animate);
    ctrls.update();
    renderer.render(scene, camera);
}
animate();

// --- Ресайз ---
window.addEventListener("resize", () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.left = w / -200 / zoom;
    camera.right = w / 200 / zoom;
    camera.top = h / 200 / zoom;
    camera.bottom = h / -200 / zoom;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});

const leftButtons = ["Otsaluu", "Päälaenluu", "Ohimoluu", "Takaraivoluu", "Yläleukaluu", "Alaleukaluu", "Kaulanikama", "Rintanikama", "Lanneranka", "Ristiluu", "Rintalasta", "Kylkiluu"];
const rightButtons = ["Solisluu", "Lapaluu", "Olkaluu", "Värttinäluu", "Kyynärluu", "Sormienluut", "Lantionluut", "Reisiluu", "Polvilumpio", "Sääriluu", "Pohjeluu", "Jalkateränluut"];
const allButtons = leftButtons.concat(rightButtons);

// Назви кнопок для різних мов
const names = {
    fi: {
        Otsaluu: "Otsaluu",
        Päälaenluu: "Päälaenluu",
        Ohimoluu: "Ohimoluu",
        Takaraivoluu: "Takaraivoluu",
        Yläleukaluu: "Yläleukaluu",
        Alaleukaluu: "Alaleukaluu",
        Kaulanikama: "Kaulanikama",
        Rintanikama: "Rintanikama",
        Lanneranka: "Lanneranka",
        Ristiluu: "Ristiluu",
        Häntäluu: "Häntäluu",
        Rintalasta: "Rintalasta",
        Kylkiluu: "Kylkiluu",
        Solisluu: "Solisluu",
        Lapaluu: "Lapaluu",
        Olkaluu: "Olkaluu",
        Värttinäluu: "Värttinäluu",
        Kyynärluu: "Kyynärluu",
        Sormienluut: "Sormienluut",
        Lantionluut: "Lantionluut",
        Reisiluu: "Reisiluu",
        Polvilumpio: "Polvilumpio",
        Sääriluu: "Sääriluu",
        Pohjeluu: "Pohjeluu",
        Jalkateränluut: "Jalkaterän luut"
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
        Pohjeluu: "Малогомілкова кістка",
        Jalkateränluut: "Кістки стопи"
    },
    en: {
        Otsaluu: "Frontal bone",
        Päälaenluu: "Parietal bone",
        Ohimoluu: "Temporal bone",
        Takaraivoluu: "Occipital bone",
        Yläleukaluu: "Maxilla",
        Alaleukaluu: "Mandible",
        Kaulanikama: "Cervical vertebra",
        Rintanikama: "Thoracic vertebra",
        Lanneranka: "Lumbar vertebra",
        Ristiluu: "Sacrum",
        Rintalasta: "Sternum",
        Kylkiluu: "Rib",
        Solisluu: "Clavicle",
        Lapaluu: "Scapula",
        Olkaluu: "Humerus",
        Värttinäluu: "Radius",
        Kyynärluu: "Ulna",
        Sormienluut: "Finger bones",
        Lantionluut: "Pelvic bone",
        Reisiluu: "Femur",
        Polvilumpio: "Patella",
        Sääriluu: "Tibia",
        Pohjeluu: "Fibula",
        Jalkateränluut: "Foot bones"
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

// Поточна мова
let currentLang = "fi";

// Селектор мови
const langSelect = document.getElementById('languageSelect');
if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        updateButtonNames(currentLang);
    });
}

// Функція для отримання перекладу
function getTranslation(id) {
    const langText = translations[`text_${currentLang}`];
    return langText ? langText[id] : translations.text_fi[id];
}

// Оновлення назв кнопок
function updateButtonNames(lang) {
    allButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            const panel = btn.parentElement;
            if (panel && panel.firstChild) {
                panel.firstChild.textContent = names[lang]?.[id] + " ";
            }
        }
    });
}

// Додаємо обробники кліків для кнопок
allButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.onclick = () => {
            const panel = document.getElementById("info_panel");
            const textEl = document.getElementById("text");
            if (panel) panel.style.display = "block";
            if (textEl) textEl.innerHTML = getTranslation(id);
        };
    }
});

// Закриття панелі інформації
const close_button = document.getElementById("close_button");
if (close_button) {
    close_button.onclick = () => {
        const panel = document.getElementById("info_panel");
        if (panel) panel.style.display = "none";
    };
}

// Кіт-мем
const meme_cat = document.getElementById('meme_cat');
const gif = document.getElementById('gif');
const border_but_div = document.getElementById('border_but_div');
const border = document.getElementById('border');

if (border_but_div) {
    border_but_div.addEventListener("mouseenter", () => {
        if (border) border.style.display = "block";
    });
}

if (border) {
    border.addEventListener("mouseenter", () => {
        if (meme_cat) meme_cat.style.display = "block";
    });
}

if (meme_cat) {
    meme_cat.addEventListener("mouseenter", () => {
        if (gif) gif.style.display = "block";
    });
    meme_cat.addEventListener("mouseleave", () => {
        if (gif) gif.style.display = "none";
    });
}

const meme_button = document.getElementById("meme_button");
if (meme_button) {
    meme_button.onclick = () => {
        const cat = document.getElementById("meme_cat");
        if (cat) cat.style.display = "none";
    };
}

const close_button_all = document.getElementById("close_button_all");
if (close_button_all) {
    close_button_all.onclick = () => {
        const panel = document.getElementById("left-panel");
        if (panel) panel.style.display = "none";
    };
}

const show_left_panel = document.getElementById("show_left_panel");
if (show_left_panel) {
    show_left_panel.onclick = () => {
        const panel = document.getElementById("left-panel");
        if (panel) panel.style.display = "block";
    };
}

// Вікно управління камерою
window.onload = function () {
    const overlay = document.getElementById("controls_overlay");
    const cameraControls = document.getElementById("controls_camera");
    if (overlay) overlay.style.display = "block";
    if (cameraControls) cameraControls.style.display = "block";
};

const close_for_controls = document.getElementById("close_for_controls");
if (close_for_controls) {
    close_for_controls.onclick = function () {
        const overlay = document.getElementById("controls_overlay");
        const cameraControls = document.getElementById("controls_camera");
        if (overlay) overlay.style.display = "none";
        if (cameraControls) cameraControls.style.display = "none";
    };
}

// Квіз
const quizToggleBtn = document.getElementById("quiz_toggle_button");
const quizPanel = document.getElementById("quiz_panel");
const quizCloseBtn = document.getElementById("quiz_close_button");

const quizData = [
    {
        options: ["Reisiluu", "Sääriluu", "Olkaluu", "Kyynärluu"],
        answer: 0,
        image: "image/Reisiluu.png"
    },
    {
        options: ["Otsaluu", "Päälaenluu", "Takaraivoluu", "Ohimoluu"],
        answer: 0,
        image: "image/Otsaluu.png"
    },
    {
        options: ["Olkaluu", "Sormien luut", "Lantionluut", "Rintalasta"],
        answer: 0,
        image: "image/Olkaluu.png"
    }
];

let currentQuiz = 0;
let quizScore = 0;

const quizImage = document.getElementById("quiz_image");
const quizOptionsDiv = document.getElementById("quiz_options");
const quizResult = document.getElementById("quiz_result");
const quizScoreP = document.getElementById("quiz_score");
const quizNextBtn = document.getElementById("quiz_next");

function loadQuestion() {
    if (!quizResult || !quizScoreP || !quizImage || !quizOptionsDiv || !quizNextBtn) return;

    quizResult.innerText = "";
    quizScoreP.innerText = `Score: ${quizScore}`;

    const q = quizData[currentQuiz];

    quizImage.src = q.image;
    quizImage.style.display = "block";

    quizOptionsDiv.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("div");
        btn.className = "quiz_option";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        quizOptionsDiv.appendChild(btn);
    });

    quizNextBtn.style.display = "none";
    quizNextBtn.disabled = false;
}

function checkAnswer(selected) {
    if (!quizResult || !quizScoreP || !quizNextBtn || !quizOptionsDiv) return;

    const q = quizData[currentQuiz];
    if (selected === q.answer) {
        quizResult.innerText = " Oikein!";
        quizScore++;
    } else {
        quizResult.innerText = ` Väärin! Oikea vastaus: ${q.options[q.answer]}`;
    }
    quizScoreP.innerText = `Score: ${quizScore}`;

    quizNextBtn.style.display = "inline-block";

    Array.from(quizOptionsDiv.children).forEach(btn => {
        btn.onclick = null;
    });
}

if (quizNextBtn) {
    quizNextBtn.onclick = () => {
        currentQuiz++;
        if (currentQuiz >= quizData.length) {
            if (quizResult) quizResult.innerText = `Peli päättynyt! Pistemäärä: ${quizScore}`;
            if (quizOptionsDiv) quizOptionsDiv.innerHTML = "";
            if (quizImage) quizImage.style.display = "none";
            if (quizNextBtn) quizNextBtn.style.display = "none";
        } else {
            loadQuestion();
        }
    };
}

if (quizToggleBtn && quizPanel) {
    quizToggleBtn.onclick = () => {
        quizPanel.style.display = "block";
    };
}

if (quizCloseBtn && quizPanel) {
    quizCloseBtn.onclick = () => {
        quizPanel.style.display = "none";
        currentQuiz = 0;
        quizScore = 0;
        loadQuestion();
    };
}

loadQuestion();
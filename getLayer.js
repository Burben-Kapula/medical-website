import * as THREE from "three"; // Імпортуємо всю бібліотеку THREE.js

const loader = new THREE.TextureLoader(); 
// Створюємо об'єкт для завантаження текстур (картинок), який будемо використовувати для спрайтів

// Функція для створення одного спрайта
function getSprite({ hasFog, color, opacity, path, pos, size }) {
  const spriteMat = new THREE.SpriteMaterial({
    color,           // Колір спрайта
    fog: hasFog,     // Включає взаємодію спрайта з туманом сцени
    map: loader.load(path), // Завантажує текстуру спрайта з файлу
    transparent: true,      // Дозволяє прозорість
    opacity,                // Прозорість спрайта
  });


  // Трохи рандомізуємо яскравість кольору
  spriteMat.color.offsetHSL(0, 0, Math.random() * 0.2 - 0.1);

  const sprite = new THREE.Sprite(spriteMat); // Створюємо об'єкт Sprite з матеріалом

  sprite.position.set(pos.x, -pos.y, pos.z); // Встановлюємо позицію спрайта. Зверни увагу, що y інвертовано

  size += Math.random() - 0.5;              // Трохи рандомізуємо розмір
  sprite.scale.set(size, size, size);       // Встановлюємо розмір спрайта

  sprite.material.rotation = 0;             // Початкове обертання спрайта (0)

  return sprite;                             // Повертаємо готовий спрайт
}

// Функція для створення шару спрайтів (групи)
function getLayer({
  hasFog = true,   // Чи реагують спрайти на туман
  hue = 0.0,       // Відтінок кольору (HSL)
  numSprites = 10, // Кількість спрайтів у шарі
  opacity = 1,     // Прозорість спрайтів
  path = "./rad-grad.png", // Шлях до текстури спрайта
  radius = 1,      // Радіус розташування спрайтів
  sat = 0.5,       // Насиченість кольору (HSL)
  size = 1,        // Початковий розмір спрайта
  z = 0,           // Z-позиція шару
}) {
  const layerGroup = new THREE.Group(); // Створюємо групу, щоб об'єднати всі спрайти шару

  for (let i = 0; i < numSprites; i += 1) {
    let angle = (i / numSprites) * Math.PI * 2; // Розташування спрайтів по колу

    // Рандомна позиція у колі з радіусом radius
    const pos = new THREE.Vector3(
      Math.cos(angle) * Math.random() * radius,
      Math.sin(angle) * Math.random() * radius,
      z + Math.random() // Трохи рандомізуємо по Z
    );

    const length = new THREE.Vector3(pos.x, pos.y, 0).length(); 
    // Довжина вектора від центру до позиції спрайта (не використовується, закоментований код з hue)

    let color = new THREE.Color().setHSL(hue, 1, sat); 
    // Створюємо колір спрайта за HSL. Насиченість = 1, світлість = sat

    const sprite = getSprite({ hasFog, color, opacity, path, pos, size }); 
    // Створюємо спрайт

    layerGroup.add(sprite); // Додаємо спрайт до групи
  }

  return layerGroup; // Повертаємо готову групу спрайтів
}

export default getLayer; // Експортуємо функцію для використання в інших файлах

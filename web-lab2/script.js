// Переконуємось, що DOM повністю завантажений
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ЗАВДАННЯ 1.1: Атрибут width картинки через elem.onclick
    // ==========================================
    const images = document.querySelectorAll(".img-container img");
    images.forEach(img => {
        img.onclick = function() {
            console.log(`Значення атрибуту width: ${this.getAttribute('width')}`);
        };
    });

    // ==========================================
    // ЗАВДАННЯ 1.2: Запис href в title при mouseover
    // ==========================================
    const links = document.querySelectorAll(".links-container a");
    links.forEach(link => {
        function addTitle() {
            this.setAttribute('title', this.getAttribute('href'));
            // Після того як подія спрацювала, демонструємо removeEventListener (за умовою завдання)
            this.removeEventListener('mouseover', addTitle);
        }
        link.addEventListener('mouseover', addTitle);
    });

    // ==========================================
    // ЗАВДАННЯ 1.3: Виведення value в абзац #demo
    // ==========================================
    const task3Inputs = document.querySelectorAll(".task3-input");
    const demoParagraph = document.getElementById("demo");

    task3Inputs.forEach(input => {
        input.addEventListener('click', function() {
            demoParagraph.innerText = `Ви вказали: ${this.value}`;
        });
    });

    // ==========================================
    // ЗАВДАННЯ 1.4: Перший клік -> console.log, наступні -> alert
    // ==========================================
    const task4Inputs = document.querySelectorAll(".task4-input");

    task4Inputs.forEach(input => {
        // Функція для другого і наступних кліків
        function alertClick() {
            alert(`Повторний клік: ${this.value}`);
        }

        // Функція для першого кліку
        function firstClick() {
            console.log(`Перший клік: ${this.value}`);
            // Видаляємо обробник першого кліку
            this.removeEventListener('click', firstClick);
            // Навішуємо обробник для наступних кліків (alert)
            this.addEventListener('click', alertClick);
        }

        input.addEventListener('click', firstClick);
    });

    // ==========================================
    // ЗАВДАННЯ 1.5: Квадрат числа в параграфі
    // ==========================================
    const paragraphs = document.querySelectorAll(".num-paragraph");
    paragraphs.forEach(p => {
        p.addEventListener('click', function() {
            // Беремо число з data-атрибуту
            let num = parseInt(this.getAttribute('data-value'));
            let square = num * num;
            this.innerText = `Квадрат числа ${num} = ${square}`;
        });
    });

    // ==========================================
    // ЗАВДАННЯ 2.1: Чергування кольору (Зелений <-> Червоний)
    // ==========================================
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach(box => {
        // Функція, яка фарбує в червоний колір
        function turnRed() {
            this.style.backgroundColor = "#ef4444"; // Червоний
            this.removeEventListener('click', turnRed);
            this.addEventListener('click', turnGreen);
        }

        // Функція, яка повертає зелений колір
        function turnGreen() {
            this.style.backgroundColor = "#22c55e"; // Початковий зелений
            this.removeEventListener('click', turnGreen);
            this.addEventListener('click', turnRed);
        }

        // Початково вішаємо функцію фарбування в червоний колір
        box.addEventListener('click', turnRed);
    });

});
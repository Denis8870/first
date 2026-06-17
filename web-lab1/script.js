// Зв'язуємо функції з кнопками після завантаження сторінки
document.getElementById('btn-1').addEventListener('click', task1);
document.getElementById('btn-2').addEventListener('click', task2);
document.getElementById('btn-3').addEventListener('click', task3);
document.getElementById('btn-4').addEventListener('click', task4);
document.getElementById('btn-5').addEventListener('click', task5);
document.getElementById('btn-6').addEventListener('click', task6);

// ==========================================
// Завдання 1: Прості числа (while)
// ==========================================
function task1() {
    let resultArr = [];
    let num = 2; 
    while (num <= 100) {
        let isPrime = true;
        let i = 2;
        while (i * i <= num) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
            i++;
        }
        if (isPrime) resultArr.push(num);
        num++;
    }
    document.getElementById('res-1').innerText = "Прості числа:\n" + resultArr.join(', ');
}

// ==========================================
// Завдання 2: Парні/непарні (do...while)
// ==========================================
function task2() {
    let output = "";
    let current = 0;
    do {
        if (current === 0) {
            output += `${current} – це нуль\n`;
        } else if (current % 2 === 0) {
            output += `${current} – парне число\n`;
        } else {
            output += `${current} – непарне число\n`;
        }
        current++;
    } while (current <= 10);
    
    document.getElementById('res-2').innerText = output.trim();
}

// ==========================================
// Завдання 3: Ділення 10000
// ==========================================
function task3() {
    let numb = 10000;
    let result = numb;
    let counter = 0;

    while (result >= 50) {
        result = result / 2;
        counter++;
    }

    console.log(`result = ${result}, counter = ${counter}`);
    document.getElementById('res-3').innerText = `Результат: ${result}\nІтерацій: ${counter}\n(Також дубльовано в консоль)`;
}

// ==========================================
// Завдання 4: Пори року та місяці
// ==========================================
function task4() {
    let monthInput = prompt("Введіть номер місяця (1-12):");
    if (monthInput === null) return; // Якщо натиснули "Скасувати"
    
    let month = parseInt(monthInput);
    let season = "";
    let monthName = "";

    switch (month) {
        case 12: monthName = "Грудень"; season = "зима"; break;
        case 1: monthName = "Січень"; season = "зима"; break;
        case 2: monthName = "Лютий"; season = "зима"; break;
        case 3: monthName = "Березень"; season = "весна"; break;
        case 4: monthName = "Квітень"; season = "весна"; break;
        case 5: monthName = "Травень"; season = "весна"; break;
        case 6: monthName = "Червень"; season = "літо"; break;
        case 7: monthName = "Липень"; season = "літо"; break;
        case 8: monthName = "Серпень"; season = "літо"; break;
        case 9: monthName = "Вересень"; season = "осінь"; break;
        case 10: monthName = "Жовтень"; season = "осінь"; break;
        case 11: monthName = "Листопад"; season = "осінь"; break;
        default: 
            alert("Помилка! Введіть число від 1 до 12.");
            document.getElementById('res-4').innerText = "Введено некоректні дані";
            return;
    }

    let resText = `Місяць: ${monthName}, пора року: ${season}.`;
    alert(resText);
    document.getElementById('res-4').innerText = resText;
}

// ==========================================
// Завдання 5: Цельсій -> Фаренгейт
// ==========================================
function task5() {
    let tcInput = prompt("Введіть температуру в °C:");
    if (tcInput === null) return;

    let tc = parseFloat(tcInput);

    if (!isNaN(tc)) {
        let tf = (9 / 5) * tc + 32;
        let resText = `${tc}°C = ${tf.toFixed(1)}°F`;
        alert(resText);
        document.getElementById('res-5').innerText = resText;
    } else {
        alert("Помилка! Введіть числове значення.");
        document.getElementById('res-5').innerText = "Не числове значення";
    }
}

// ==========================================
// Завдання 6: День тижня
// ==========================================
function task6() {
    let dayInput = prompt("Введіть число від 1 до 7:");
    if (dayInput === null) return;

    let day = parseInt(dayInput);
    let dayName = "";

    switch (day) {
        case 1: dayName = "Понеділок"; break;
        case 2: dayName = "Вівторок"; break;
        case 3: dayName = "Середа"; break;
        case 4: dayName = "Четвер"; break;
        case 5: dayName = "П'ятниця"; break;
        case 6: dayName = "Субота"; break;
        case 7: dayName = "Неділя"; break;
        default: dayName = "Некоректне число! Очікується від 1 до 7.";
    }

    document.getElementById('res-6').innerText = dayName;
}
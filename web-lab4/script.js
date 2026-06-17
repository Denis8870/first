// =========================================================================
// ОСНОВНІ ФУНКЦІЇ ЛАБОРАТОРНОЇ РОБОТИ (згідно з технічним завданням)
// =========================================================================

// 1. Залишок від ділення на 60
function seconds(total) {
    return total % 60;
}

// 2. Периметр правильного багатокутника
function perimeter(side, count) {
    return count * side;
}

// 3. FizzBuzz
function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("fizzbuzz");
        } else if (i % 3 === 0) {
            console.log("fizz");
        } else if (i % 5 === 0) {
            console.log("buzz");
        } else {
            console.log(i);
        }
    }
}

// 4. Середнє арифметичне трьох чисел (вивід на екран через alert)
function Calculate(a, b, c) {
    let avg = (a + b + c) / 3;
    alert(`Середнє арифметичне чисел ${a}, ${b}, ${c} дорівнює: ${avg.toFixed(2)}`);
    return avg;
}

// 5. Перевірка подільності числа n на x і y (3 варіанти)
// Варіант А: Конструкція if
function isDivisibleIf(n, x, y) {
    if (n % x === 0 && n % y === 0) {
        return true;
    } else {
        return false;
    }
}
// Варіант Б: Тернарний оператор
function isDivisibleTernary(n, x, y) {
    return (n % x === 0 && n % y === 0) ? true : false;
}
// Варіант В: Без if та тернарного оператора
function isDivisibleClean(n, x, y) {
    return n % x === 0 && n % y === 0;
}

// 7. Функція обробки матриці 5х5 для Головної Діагоналі
function processMatrix(matrix) {
    for (let i = 0; i < 5; i++) {
        if (matrix[i][i] < 0) {
            matrix[i][i] = 0;
        } else if (matrix[i][i] > 0) {
            matrix[i][i] = 1;
        }
    }
    return matrix;
}

// 8. Чотири арифметичні функції
function Add(a, b) { alert(`Результат додавання: ${a + b}`); return a + b; }
function Sub(a, b) { alert(`Результат віднімання: ${a - b}`); return a - b; }
function Mul(a, b) { alert(`Результат множення: ${a * b}`); return a * b; }
function Div(a, b) {
    if (b === 0) {
        alert("Помилка: Ділення на нуль неможливе!");
        return "Помилка (ділення на 0)";
    }
    alert(`Результат ділення: ${a / b}`);
    return a / b;
}

// 9. Комплексна перевірка числа
function analyzeNumber(num) {
    let result = {
        sign: num >= 0 ? "Позитивне (або нуль)" : "Негативне",
        isPrime: true,
        divisibility: []
    };

    // Перевірка на просте число
    if (num <= 1) result.isPrime = false;
    else {
        for (let i = 2; i * i <= num; i++) {
            if (num % i === 0) {
                result.isPrime = false;
                break;
            }
        }
    }

    // Перевірка подільності без залишку
    [2, 5, 3, 6, 9].forEach(d => {
        if (num % d === 0) result.divisibility.push(d);
    });

    return result;
}

// 10. Переворот масиву та піднесення чисел до квадрату
function transformArray(arr) {
    let modified = arr.map(item => typeof item === 'number' ? item * item : item);
    return modified.reverse();
}

// 11. Видалення дублікатів у масиві
function removeDuplicates(arr) {
    return [...new Set(arr)];
}


// =========================================================================
// ФУНКЦІЇ-ОБРОБНИКИ ДЛЯ ІНТЕРФЕЙСУ (Викликаються при натисканні кнопок)
// =========================================================================

function runSeconds() {
    let val = prompt("Введіть загальну кількість секунд:", "125");
    if(val === null) return;
    let res = seconds(parseInt(val));
    document.getElementById("res-1").innerText = `seconds(${val}) => залишок секунд: ${res}`;
}

function runPerimeter() {
    let side = prompt("Введіть довжину сторони багатокутника:", "10");
    let count = prompt("Введіть кількість сторін багатокутника:", "5");
    if(!side || !count) return;
    let res = perimeter(parseFloat(side), parseInt(count));
    document.getElementById("res-2").innerText = `Периметр правильного багатокутника: ${res}`;
}

function runFizzBuzz() {
    let n = prompt("Введіть число N для FizzBuzz:", "15");
    if(!n) return;
    console.clear();
    console.log(`--- Результати FizzBuzz для N = ${n} ---`);
    fizzBuzz(parseInt(n));
    alert("Результат виведено в консоль розробника. Натисніть F12.");
}

function runCalculate() {
    let a = parseInt(prompt("Введіть 1-е число:"));
    let b = parseInt(prompt("Введіть 2-е число:"));
    let c = parseInt(prompt("Введіть 3-е число:"));
    if(isNaN(a) || isNaN(b) || isNaN(c)) return;
    let avg = (a + b + c) / 3;
    Calculate(a, b, c);
    document.getElementById("res-4").innerText = `Числа: ${a}, ${b}, ${c}\nСереднє: ${avg.toFixed(2)}`;
}

function runIsDivisible() {
    let n = parseInt(prompt("Введіть n:", "12"));
    let x = parseInt(prompt("Введіть x:", "3"));
    let y = parseInt(prompt("Введіть y:", "4"));
    if(!n || !x || !y) return;

    let resIf = isDivisibleIf(n, x, y);
    let resTernary = isDivisibleTernary(n, x, y);
    let resClean = isDivisibleClean(n, x, y);

    document.getElementById("res-5").innerText = 
        `Чи ділиться ${n} на ${x} та ${y}?\n` +
        `1. З конструкцією if: ${resIf}\n` +
        `2. З тернарним оператором: ${resTernary}\n` +
        `3. Без if та тернарного: ${resClean}`;
}

function runArrayStats() {
    let nInput = prompt("Введіть розмірність масиву N:", "10");
    if(!nInput) return;
    let N = parseInt(nInput);
    
    // Заповнюємо випадковими числами від -50 до 100
    let arr = [];
    for(let i = 0; i < N; i++) {
        arr.push(Math.floor(Math.random() * 151) - 50);
    }

    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let sum = arr.reduce((acc, curr) => acc + curr, 0);
    let avg = sum / arr.length;
    let odds = arr.filter(num => num % 2 !== 0);

    document.getElementById("res-6").innerText = 
        `Згенерований масив:\n[${arr.join(", ")}]\n\n` +
        `Найбільше значення: ${max}\n` +
        `Найменше значення: ${min}\n` +
        `Загальна сума: ${sum}\n` +
        `Середнє арифметичне: ${avg.toFixed(2)}\n` +
        `Непарні значення: [${odds.join(", ")}]`;
}

function runMatrixDiagonal() {
    // Генерація двовимірного масиву 5х5
    let matrix = [];
    let originalText = "";
    
    for (let i = 0; i < 5; i++) {
        matrix[i] = [];
        for (let j = 0; j < 5; j++) {
            // випадкові числа від -9 до 9
            matrix[i][j] = Math.floor(Math.random() * 19) - 9; 
        }
        originalText += `[${matrix[i].map(n => String(n).padStart(2, ' ')).join(", ")}]\n`;
    }

    // Копіюємо матрицю перед обробкою, щоб не пошкодити оригінал
    let matrixCopy = JSON.parse(JSON.stringify(matrix));
    let processedMatrix = processMatrix(matrixCopy);
    
    let processedText = "";
    for (let i = 0; i < 5; i++) {
        processedText += `[${processedMatrix[i].map(n => String(n).padStart(2, ' ')).join(", ")}]\n`;
    }

    document.getElementById("res-7").innerText = 
        `Початкова матриця 5х5:\n${originalText}\n` +
        `Матриця після обробки діагоналі:\n${processedText}`;
}

function runArithmetic() {
    let a = parseFloat(prompt("Введіть перше число:"));
    let b = parseFloat(prompt("Введіть друге число:"));
    if(isNaN(a) || isNaN(b)) return;

    let operation = prompt("Оберіть операцію (+, -, *, /):");
    let res;

    switch (operation) {
        case "+": res = Add(a, b); break;
        case "-": res = Sub(a, b); break;
        case "*": res = Mul(a, b); break;
        case "/": res = Div(a, b); break;
        default: alert("Невідома операція!"); return;
    }

    document.getElementById("res-8").innerText = `Операція: ${a} ${operation} ${b}\nРезультат обчислено!`;
}

function runNumberAnalysis() {
    let input = prompt("Введіть число для комплексного аналізу:", "15");
    if(!input) return;
    let num = parseInt(input);
    
    let analysis = analyzeNumber(num);

    document.getElementById("res-9").innerText = 
        `Аналіз числа: ${num}\n` +
        `1. Знак: ${analysis.sign}\n` +
        `2. Чи є простим: ${analysis.isPrime ? "Так" : "Ні"}\n` +
        `3. Ділиться без залишку на числа: ${analysis.divisibility.length > 0 ? analysis.divisibility.join(", ") : "ні на одне з (2,3,5,6,9)"}`;
}

function runArrayTransform() {
    let testArray = [2, "привіт", 5, true, 9, "JS", -3];
    let result = transformArray(testArray);

    document.getElementById("res-10").innerText = 
        `Вхідний масив:\n[2, "привіт", 5, true, 9, "JS", -3]\n\n` +
        `Результат (реверс + піднесення чисел до квадрату):\n` +
        JSON.stringify(result);
}

function runRemoveDuplicates() {
    let inputArr = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6];
    let result = removeDuplicates(inputArr);

    document.getElementById("res-11").innerText = 
        `Вхідний масив:\n[${inputArr.join(", ")}]\n\n` +
        `Масив після видалення дублікатів:\n[${result.join(", ")}]`;
}
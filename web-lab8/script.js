document.addEventListener("DOMContentLoaded", () => {
    
    // Елементи інтерфейсу
    const menuScreen = document.getElementById("menu-screen");
    const gameScreen = document.getElementById("game-screen");
    const grid = document.getElementById("grid");
    const timeLeftSpan = document.getElementById("time-left");
    const nextNumSpan = document.getElementById("next-num");
    const statsTableBody = document.getElementById("stats-table-body");
    
    // Кнопки
    document.getElementById("start-game-btn").addEventListener("click", startGame);
    document.getElementById("restart-btn").addEventListener("click", resetGame);

    // Стан гри
    let expectedNumber = 1;
    let timerInterval = null;
    let timeLeft = 60;
    let attemptCount = 0;
    let gameHistory = []; // Масив для збереження спроб

    // Завантажуємо історію спроб з localStorage, якщо вона є
    if (localStorage.getItem("game_stats")) {
        gameHistory = JSON.parse(localStorage.getItem("game_stats"));
        attemptCount = gameHistory.length;
        renderStatsTable();
    }

    // Варіанти шрифтів за умовою (мінімум 5 варіантів)
    const fontSizes = ["16px", "20px", "24px", "28px", "32px"];

    // Функція запуску гри
    function startGame() {
        menuScreen.classList.remove("active");
        gameScreen.classList.add("active");
        resetGame();
    }

    // Скидання та ініціалізація нової партії
    function resetGame() {
        clearInterval(timerInterval);
        expectedNumber = 1;
        timeLeft = 60;
        timeLeftSpan.innerText = timeLeft;
        nextNumSpan.innerText = expectedNumber;
        
        // Генеруємо та перемішуємо числа від 1 до 20
        let numbers = [];
        for (let i = 1; i <= 20; i++) numbers.push(i);
        numbers.sort(() => Math.random() - 0.5); // випадкове перемішування

        // Очищаємо ігрову сітку
        grid.innerHTML = "";

        // Створюємо клітинки в DOM
        numbers.forEach(num => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerText = num;
            
            // 1. Автоматична випадкова генерація кольорів (використовуємо яскраві HSL кольори)
            const randomHue = Math.floor(Math.random() * 360);
            cell.style.color = `hsl(${randomHue}, 85%, 65%)`;

            // 2. Випадковий розмір шрифту з 5 варіантів
            const randomSize = fontSizes[Math.floor(Math.random() * fontSizes.length)];
            cell.style.fontSize = randomSize;

            // Клік по клітинці
            cell.addEventListener("click", () => handleCellClick(num, cell));
            
            grid.appendChild(cell);
        });

        // Запуск таймера зворотного відліку
        timerInterval = setInterval(() => {
            timeLeft--;
            timeLeftSpan.innerText = timeLeft;

            if (timeLeft <= 0) {
                endGame(false); // Програш по часу
            }
        }, 1000);
    }

    // Обробка натискання на цифру
    function handleCellClick(clickedNum, cellElement) {
        // Якщо клітинка вже активована, ігноруємо
        if (cellElement.classList.contains("correct")) return;

        if (clickedNum === expectedNumber) {
            // Вірний вибір
            cellElement.classList.add("correct");
            expectedNumber++;
            
            if (expectedNumber > 20) {
                endGame(true); // Перемога!
            } else {
                nextNumSpan.innerText = expectedNumber;
            }
        } else {
            // Невірна цифра за послідовністю
            alert("Не вірна цифра! Спробуйте знайти правильну.");
        }
    }

    // Завершення гри (true = перемога, false = програш)
    function endGame(isWin) {
        clearInterval(timerInterval);
        attemptCount++;
        
        let timeSpent = 60 - timeLeft;
        let statusText = isWin ? "Успішно" : "Час вийшов";
        let timeText = isWin ? `${timeSpent} сек` : "—";

        // Додаємо запис в історію
        gameHistory.push({
            id: attemptCount,
            success: isWin,
            status: statusText,
            time: isWin ? timeSpent : Infinity, // Infinity полегшує пошук найкращого результату
            timeString: timeText
        });

        // Зберігаємо в браузері
        localStorage.setItem("game_stats", JSON.stringify(gameHistory));

        // Оновлюємо таблицю на екрані
        renderStatsTable();

        if (isWin) {
            alert(`Вітаємо! Ви успішно пройшли гру за ${timeSpent} секунд!`);
            resetGame(); // Гра починається з початку за умовою ТЗ
        } else {
            alert("Час вийшов! Спробуйте ще раз.");
            resetGame();
        }
    }

    // Функція рендеру таблиці та пошуку найкращого результату
    function renderStatsTable() {
        statsTableBody.innerHTML = "";

        // Шукаємо найкращий результат (мінімальний час серед успішних)
        let bestTime = Infinity;
        gameHistory.forEach(record => {
            if (record.success && record.time < bestTime) {
                bestTime = record.time;
            }
        });

        // Виводимо рядки таблиці
        gameHistory.forEach(record => {
            const row = document.createElement("tr");

            // Якщо це найкращий результат, підсвічуємо його іншим кольором (за умовою ТЗ)
            if (record.success && record.time === bestTime) {
                row.classList.add("best-record");
            }

            row.innerHTML = `
                <td>Спроба №${record.id}</td>
                <td>${record.status}</td>
                <td>${record.timeString}</td>
            `;
            
            // Нові спроби додаємо наверх таблиці для зручності
            statsTableBody.insertBefore(row, statsTableBody.firstChild);
        });
    }

});
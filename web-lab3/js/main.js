document.addEventListener("DOMContentLoaded", () => {
    // 1. Створюємо та стилізуємо контейнер калькулятора
    const calcContainer = document.createElement("div");
    
    // Базові стилі для калькулятора
    calcContainer.style.backgroundColor = "#1e293b";
    calcContainer.style.borderRadius = "16px";
    calcContainer.style.padding = "24px";
    calcContainer.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.3)";
    calcContainer.style.fontFamily = "system-ui, -apple-system, sans-serif";
    calcContainer.style.margin = "40px auto";
    calcContainer.style.boxSizing = "border-box";

    // Адаптивність через JS (динамічний моніторинг ширини екрану)
    function handleResize() {
        if (window.innerWidth < 480) {
            calcContainer.style.width = "95%";
            calcContainer.style.maxWidth = "100%";
        } else {
            calcContainer.style.width = "360px";
        }
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // викликаємо один раз при старті

    // Стилізуємо body сторінки через JS
    document.body.style.backgroundColor = "#0f172a";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";

    // 2. Створюємо дисплей для виведення результату
    const display = document.createElement("div");
    display.innerText = "0";
    display.style.backgroundColor = "#0f172a";
    display.style.color = "#f8fafc";
    display.style.fontSize = "2.5rem";
    display.style.textAlign = "right";
    display.style.padding = "16px";
    display.style.borderRadius = "8px";
    display.style.marginBottom = "20px";
    display.style.overflowX = "auto";
    display.style.whiteSpace = "nowrap";
    display.style.fontFamily = "monospace";
    calcContainer.appendChild(display);

    // 3. Створюємо сітку для кнопок
    const buttonsGrid = document.createElement("div");
    buttonsGrid.style.display = "grid";
    buttonsGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
    buttonsGrid.style.gap = "12px";
    calcContainer.appendChild(buttonsGrid);

    // Масив з текстом для кнопок
    const buttonsValues = [
        "C", "CE", "%", "/",
        "7", "8", "9", "*",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        "0", ".", "=", ""
    ];

    // Змінні для логіки обчислень
    let currentInput = "";
    let previousInput = "";
    let operation = null;

    // 4. Генерація кнопок та їх стилізація
    buttonsValues.forEach(val => {
        // Пропускаємо пустий елемент (для вирівнювання сітки, якщо потрібно)
        if (val === "") {
            const emptySpace = document.createElement("div");
            buttonsGrid.appendChild(emptySpace);
            return;
        }

        const btn = document.createElement("button");
        btn.innerText = val;

        // Загальні стилі для всіх кнопок
        btn.style.padding = "20px 10px";
        btn.style.fontSize = "1.25rem";
        btn.style.fontWeight = "bold";
        btn.style.border = "none";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.transition = "background-color 0.2s, transform 0.1s";

        // Індивідуальні кольори для різних типів кнопок
        if (["/", "*", "-", "+", "="].includes(val)) {
            btn.style.backgroundColor = "#6366f1"; // Сині оператори
            btn.style.color = "#ffffff";
        } else if (["C", "CE", "%"].includes(val)) {
            btn.style.backgroundColor = "#cbd5e1"; // Світлі системні
            btn.style.color = "#1e293b";
        } else {
            btn.style.backgroundColor = "#334155"; // Темні цифри
            btn.style.color = "#f8fafc";
        }

        // Ефекти наведення та кліку (Hover / Active) через JS події
        btn.addEventListener("mouseover", () => {
            btn.style.opacity = "0.85";
        });
        btn.addEventListener("mouseout", () => {
            btn.style.opacity = "1";
        });
        btn.addEventListener("mousedown", () => {
            btn.style.transform = "scale(0.95)";
        });
        btn.addEventListener("mouseup", () => {
            btn.style.transform = "scale(1)";
        });

        // 5. Логіка калькулятора (Обробка кліків)
        btn.addEventListener("click", () => {
            if (val >= "0" && val <= "9" || val === ".") {
                // Введення чисел
                if (val === "." && currentInput.includes(".")) return; // Захист від подвійної крапки
                if (currentInput === "0" && val !== ".") currentInput = "";
                currentInput += val;
                display.innerText = currentInput;
            } 
            else if (val === "C") {
                // Скидання всього
                currentInput = "";
                previousInput = "";
                operation = null;
                display.innerText = "0";
            } 
            else if (val === "CE") {
                // Видалення останнього символу
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || "0";
            }
            else if (val === "%") {
                // Відсотки
                if (currentInput) {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    display.innerText = currentInput;
                }
            }
            else if (val === "=") {
                // Обчислення результату
                if (previousInput && currentInput && operation) {
                    currentInput = calculate(previousInput, currentInput, operation);
                    display.innerText = currentInput;
                    previousInput = "";
                    operation = null;
                }
            } 
            else {
                // Операції (+, -, *, /)
                if (currentInput === "") return;
                if (previousInput !== "") {
                    previousInput = calculate(previousInput, currentInput, operation);
                } else {
                    previousInput = currentInput;
                }
                operation = val;
                currentInput = "";
                display.innerText = previousInput;
            }
        });

        buttonsGrid.appendChild(btn);
    });

    // Функція математичних обчислень
    function calculate(a, b, op) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        if (isNaN(num1) || !isNaN(num2) === false) return "0";

        switch (op) {
            case "+": return (num1 + num2).toString();
            case "-": return (num1 - num2).toString();
            case "*": return (num1 * num2).toString();
            case "/": return num2 === 0 ? "Помилка" : (num1 / num2).toString();
            default: return b;
        }
    }

    // Додаємо калькулятор на сторінку в body
    document.body.appendChild(calcContainer);
});
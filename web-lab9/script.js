$(document).ready(function () {
    
    // Посилання на елементи DOM
    const $menuScreen = $("#menu-screen");
    const $gameScreen = $("#game-screen");
    const $grid = $("#game-grid");
    const $draggableTarget = $("#draggable-target");
    const $scoreCounter = $("#score-counter");

    // Стан гри
    let currentCategory = "animals";
    let database = { animals: [], insects: [], fish: [] };
    let gridImages = []; 
    let currentImageObj = null; 
    let matchedPairs = 0;
    const totalPairsToWin = 10; 

    // ІНІЦІАЛІЗАЦІЯ ЛОКАЛЬНОЇ БАЗИ КАРТИНОК
    // Генеруємо шляхи до твоїх локальних папок (мінімум 50 картинок на категорію за ТЗ)
    function initDatabase() {
        for (let i = 1; i <= 50; i++) {
            database.animals.push({ id: `anim-${i}`, url: `img/animals/${i}.jpg` });
            database.insects.push({ id: `insc-${i}`, url: `img/insects/${i}.jpg` });
            database.fish.push({ id: `fish-${i}`, url: `img/fish/${i}.jpg` });
        }
    }
    initDatabase();

    // Запуск гри
    $("#start-game-btn").click(function () {
        currentCategory = $("#category-select").val();
        $menuScreen.removeClass("active");
        $gameScreen.addClass("active");
        setupNewGame();
    });

    $("#restart-btn").click(setupNewGame);

    // Налаштування гри
    function setupNewGame() {
        matchedPairs = 0;
        $scoreCounter.text(matchedPairs);
        
        // Беремо 50 картинок обраної категорії та перемішуємо їх
        let catImages = [...database[currentCategory]];
        catImages.sort(() => Math.random() - 0.5);

        // Вирізаємо 25 випадкових картинок для поля 5х5
        gridImages = catImages.slice(0, 25);

        // Очищаємо та будуємо сітку 5х5
        $grid.empty();
        gridImages.forEach((imgObj) => {
            const $cell = $(`<div class="grid-cell" data-id="${imgObj.id}">
                                <img src="${imgObj.url}" alt="item">
                             </div>`);
            $grid.append($cell);
        });

        // Налаштування Droppable для клітинок сітки
        $(".grid-cell").droppable({
            accept: "#draggable-target",
            hoverClass: "ui-droppable-hover",
            drop: function (event, ui) {
                const targetId = $(this).data("id");

                // Перевірка на збіг
                if (targetId === currentImageObj.id) {
                    matchedPairs++;
                    $scoreCounter.text(matchedPairs);
                    
                    $(this).css("border-color", "#22c55e").fadeOut(150).fadeIn(150);

                    if (matchedPairs >= totalPairsToWin) {
                        setTimeout(triggerWin, 300);
                    } else {
                        loadNewCurrentPicture();
                    }
                } else {
                    alert("Не вірна картинка! Спробуйте ще раз.");
                }

                // Повертаємо поточну картку на місце
                $draggableTarget.css({ top: 0, left: 0 });
            }
        });

        loadNewCurrentPicture();
    }

    // Вибір випадкової картинки з 25 відображених на полі
    function loadNewCurrentPicture() {
        const randomIndex = Math.floor(Math.random() * gridImages.length);
        currentImageObj = gridImages[randomIndex];
        
        $draggableTarget.attr("src", currentImageObj.url);

        // Налаштування Draggable через jQuery UI
        $draggableTarget.draggable({
            revert: "invalid", 
            containment: "#game-screen", 
            cursor: "grabbing",
            start: function() {
                $(this).css("transform", "scale(1.05)");
            },
            stop: function() {
                $(this).css("transform", "scale(1)");
            }
        });
    }

    function triggerWin() {
        alert("Вітаємо! Успіх! Ви знайшли всі необхідні збіги картинок!");
        $gameScreen.removeClass("active");
        $menuScreen.addClass("active");
    }
});
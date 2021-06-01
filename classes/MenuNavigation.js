export default class MenuNavigation {
    // Конструктор принемает название тэга обертки меню
    constructor(menuTag) {
        this.menuTag = document.querySelector(menuTag);

        document.addEventListener("scroll", () => {
            // Если мы опускаемся ниже чем позиция меню, тогда прибавляем класс fixed для нашей менюшки
            if (window.scrollY > this.menuTag.getBoundingClientRect().y) {
                this.menuTag.classList.add("fixed");
            } else {
                // Иначе убираем фиксед класс
                this.menuTag.classList.remove("fixed");
            }
        });
        // Скролл по айдишникам секций
        this.menuTag.addEventListener("click", (event) => {
            // Вешаем событие клик только если элемент button
            if (event.target.tagName === "BUTTON") {
                // Получаем значение атрибута кнопки
                const sectionLink = event.target.getAttribute("data-section-id");
                // Получаем секцию, к которой надо прокрутится
                const sectionToScroll = document.querySelectorAll("section");
                // Сравниваем значение атрибута нажатой кнопки и секции, прокручиваемся до нужной секции с плавной прокруткой
                sectionToScroll.forEach((element) => {
                    if (sectionLink === element.id) {
                        element.scrollIntoView({
                            behavior: "smooth",
                        });
                    }
                });
            }
        });
    }
}
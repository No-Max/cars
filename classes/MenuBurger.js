export default class MenuBurger {
    constructor(burgerPlacement, burgerElement, burgerImg) {
        this.burgerPlacement = document.querySelector(burgerPlacement);
        this.burgerElementClose = document.createElement(burgerElement);
        this.burgerElementOpen = document.createElement(burgerElement);

        this.burgerElementOpen.classList.add("burger");
        this.burgerElementOpen.innerHTML = `<img src = '${burgerImg}' width = '32' height = '32'>`;
        this.burgerPlacement.insertAdjacentElement(
            "beforebegin",
            this.burgerElementOpen
        );

        this.burgerElementClose.classList.add("close");
        this.burgerElementClose.innerText = "Х";
        this.burgerPlacement.insertAdjacentElement(
            "afterbegin",
            this.burgerElementClose
        );

        this.burgerElementClose.addEventListener("click", () => {
            this.burgerPlacement.style.left = "-500px";
        });

        this.burgerElementOpen.addEventListener("click", (event) => {
            this.burgerPlacement.style.left = "0";
        });
    }
}
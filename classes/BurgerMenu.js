export default class BurgerMenu {
    constructor ( trigger, menu) {
        this.trigger = document.getElementById ("trigger");
        this.menu = document.getElementById ("menu");

        this.trigger.onclick = () => {
            this.menu.classList.toggle ("show");
        }
    }
}
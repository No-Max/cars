export default class PopUp {
  constructor(delay = 1800, container = document.body) {
    this.element = document.createElement("div");
    this.delay = delay;

    this.element.className = "pop-up";
    container.append(this.element);

    document.addEventListener("pop-up", (e) => {
      this.pushMessage(e.detail.message);
    });
  }

  pushMessage(message) {
    this.element.classList.add("active");
    this.element.innerText = message || "";
    const timer = setTimeout(() => {
      this.element.classList.remove("active");
      clearTimeout(timer);
    }, this.delay);
  }
}

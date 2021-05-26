export default class Preloader {
  state = false;
  constructor(containerElement, className) {
    this.containerElement = containerElement;
    this.className = className;
  }
  show() {
    this.state = true;
    this.containerElement.classList.add(this.className);
  }
  hide() {
    this.state = false;
    this.containerElement.classList.remove(this.className);
  }
}

export default class Router {
  pages = [];

  _parameters = null;

  constructor(container, callback, homePage = "#home") {
    this.callback = callback;
    for (let page in container.children) {
      if (container.children[page].id) {
        this.pages.push({
          id: container.children[page].id,
          element: container.children[page],
        });
      }
    }
    this.homePage = homePage;

    const onHashCahnge = () => {
      const pageId = location.hash || this.homePage;
      const pageObj = this.pages.find((page) => page.id === pageId);
      if (pageObj) {
        this.pages.forEach((page) => page.element.classList.remove("active"));
        pageObj.element.classList.add("active");
      }
      this.callback(pageId, this._parameters);
    };

    onHashCahnge();
    window.addEventListener("hashchange", onHashCahnge);
  }

  goTo(pageId, parameters) {
    location.hash = pageId;
    this._parameters = parameters;
  }

  goHome() {
    location.hash = this.homePage;
    this._parameters = null;
  }
}

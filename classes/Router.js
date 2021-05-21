export default class Router {
  pages = [];
  constructor(container, homePage = "#home") {
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
    };

    onHashCahnge();
    window.addEventListener("hashchange", onHashCahnge);
  }
  goTo(pageId) {
    location.hash = pageId;
  }
}

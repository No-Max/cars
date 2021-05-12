export default class Router {
  pages = [];
  constructor(container) {
    for (let page in container.children) {
      if (container.children[page].id) {
        this.pages.push({
          id: container.children[page].id,
          element: container.children[page],
        });
      }
    }

    window.addEventListener('hashchange', (e) => {
      this.goTo(location.hash);
    })
  }
  goTo(pageId) {
    const pageObj = this.pages.find((page) => page.id === pageId);
    this.pages.forEach((page) => page.element.classList.remove('active'));
    pageObj.element.classList.add('active');
  }
}
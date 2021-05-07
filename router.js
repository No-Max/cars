class Router {
  _currentRoute;
  _routesElement
  routes = [];
  constructor(routes, routesElement) {
    this.routes = routes;
    this._routesElement = routesElement;

    this._currentRoute = {
      path: window.location.hash,
      title: document.title
    }

    this.goTo(location.hash);

    window.addEventListener('hashchange', () => {
      this.goTo(location.hash);
    });
  }
  goTo(path) {
    const targetRoute = this.routes.find(route => route.path === path);
    location.hash = targetRoute.path;
    document.title = targetRoute.title;
    this._currentRoute = targetRoute;
  }
}

new Router([
  {
    path: '',
    title: 'Все авто'
  },
  {
    path: '#car',
    title: 'Авто',
  }
], document.querySelector('#router'))

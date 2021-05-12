export default class Card {
  constructor({ brand, model, img, price, description }) {
    const containerElement = document.createElement('div');
    containerElement.classList.add('component-card');

    containerElement.innerHTML = `
      <img class="component-card-img" src="img/${img}">
      <div class="component-card-brand">${brand}</div>
      <div class="component-card-model">${model}</div>
      <div class="component-card-price">${price}</div>
      <div class="component-card-descr">${description}</div>
    `;

    return containerElement;
  }
  static appendCards(container, cars) {
    cars.forEach(car => {
      container.append(new Card(car));
    });
  }  
}
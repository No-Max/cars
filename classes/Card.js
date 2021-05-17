export default class Card {
  constructor({ brand, model, img, price, description, color, year}) {
    const containerElement = document.createElement('div');
    containerElement.classList.add('component-card');

    containerElement.innerHTML = `
      <img class="component-card-img" src="img/${img}">
      <div class="component-card-brand">${brand}</div>
      <div class="component-card-model">${model}</div>
      <div class="component-card-price">${price}</div>
      <div class="component-card-descr">${description}</div>
      <button href="#car" class="component-card-more">Learn more..</button>
    `;

    this.car = {
      brand: brand,
      model: model,
      img: img,
      price: price,
      description: description,
    }
    containerElement.querySelector('button').addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = '#car';
      a.click();
      const container = document.querySelector('.component-page');
      container.innerHTML = `
        <div class="component-page-img">
        <img src="img/big/${img}">
        </div>
        <div class="component-page-info">
        <div class="component-page-title">${brand + ' ' + model}</div>
        <div class="component-page-price">${price}</div>
        <div class="component-page-descr">${description}</div>
        <table class="component-page-table">
          <tr>
            <td>Максимальная скорость</td>
            <td>${Math.trunc(Math.random() * 100 + 200)}км/ч</td>
          </tr>
          <tr>
            <td>Вес</td>
            <td>${Math.trunc(Math.random() * 700 + 1000)}кг</td>
          </tr>
          <tr>
            <td>Привод</td>
            <td>полный</td>
          </tr>
          <tr>
            <td>Цвет</td>
            <td>${color}</td>
          </tr>
          <tr>
            <td>Модельный год</td>
            <td>${year ?? Math.trunc(Math.random() * 30 + 1990)}</td>
          </tr>
        </table>
        </div>
      `;
      console.log(event.target.closest('.component-card'));
      console.log(this.car);
    });

    return containerElement;
  }
  static appendCards(container, cars) {
    cars.forEach(car => {
      container.append(new Card(car));
    });
  }
}
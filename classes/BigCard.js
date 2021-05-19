export default class BigCard {
    constructor({ id, brand, model, img, price, description }) {
        const container = document.createElement('div');
        container.classList.add('component-page');
        container.innerHTML = `
            <div class="component-page-img">
              <img src="img/${img}">
            </div>
            <div class="component-page-info">
              <div class="component-page-title">${brand} ${model}</div>
              <div class="component-page-price">${price}$</div>
              <div class="component-page-descr">${description}</div>
              <table class="component-page-table">
                <tr>
                  <td>Максимальная скорость</td>
                  <td>260км/ч</td>
                </tr>
                <tr>
                  <td>Вес</td>
                  <td>1200кг</td>
                </tr>
                <tr>
                  <td>Привод</td>
                  <td>полный</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>серый</td>
                </tr>
                <tr>
                  <td>Модельный год</td>
                  <td>2020</td>
                </tr>
              </table>
            </div>`
        return container;
    }
}
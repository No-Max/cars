export default class BigCard {
  constructor({ id, brand, model, bigImg, price, description, parameters }) {
    const container = document.createElement("div");
    container.classList.add("component-page");
    container.innerHTML = `
      <div class="component-page-img">
        <img src="img/${bigImg}">
      </div>
      <div class="component-page-info">
        <div class="component-page-title">${brand} ${model}</div>
        <div class="component-page-price">${price}$</div>
        <div class="component-page-descr">${description}</div>
        <table class="component-page-table">
          ${createParametersTable(parameters)}
        </table>
      </div>`;
    return container;
  }
  static appendCard(container, car) {
    container.innerHTML = "";
    container.append(new BigCard(car));
  }
}

function createParametersTable(parameters) {
  let html = "";
  parameters.forEach((parameter) => {
    html += `
      <tr>
        <td>${parameter.name}</td>
        <td>${parameter.value}</td>
      </tr>`;
  });
  return html;
}

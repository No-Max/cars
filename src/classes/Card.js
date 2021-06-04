export default class Card {
  constructor({ id, brand, model, img, price, description }, onClick) {
    const containerElement = document.createElement("div");
    containerElement.classList.add("component-card");

    containerElement.innerHTML = `
      <div class="component-card-img" style="background-image: url('img/${img}')"></div>
      <div class="component-card-brand">${brand}</div>
      <div class="component-card-model">${model}</div>
      <div class="component-card-price">${price}</div>
      <div class="component-card-descr">${description}</div>  
    `;
    const buttonReadMore = document.createElement("button");
    buttonReadMore.innerText = "Подробнее";
    buttonReadMore.onclick = () => {
      onClick(id);
    };
    containerElement.append(buttonReadMore);

    return containerElement;
  }
  static appendCards(container, cars, onClick) {
    cars.forEach((car) => {
      container.append(new Card(car, onClick));
    });
  }
}

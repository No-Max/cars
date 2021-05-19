import { brands } from './constants/cars.js';
import Dropdown from './classes/Dropdown.js';
import Card from './classes/Card.js';
import Router from './classes/Router.js';

const router = new Router(document.getElementById('router'));

const modelDropdown = new Dropdown('Выберите модель', []);

const brandDropdown = new Dropdown('Выберите марку', brands,
  (brand) => {
    modelDropdown.setItemsList([]);
    modelDropdown.clearSelectedValue();
    if (brand) {
      getCars().then((cars) => {
        let models = cars.filter(car => car.brand === brand).map(car => car.model);
        models = Array.from(new Set(models));
        modelDropdown.setItemsList(models);
      })
    }
  }
);

document.querySelector('.filters').append(brandDropdown.element);
document.querySelector('.filters').append(modelDropdown.element);

const cardsContainer = document.querySelector('.cards-container');
getCars().then((cars) => {
  Card.appendCards(cardsContainer, cars);
})

document.querySelector('.component-search').onclick = () => {
  cardsContainer.innerHTML = '';
  getCars().then((cars) => {
    const filteredCars = cars.filter((car) => {
      const isBrand = !!brandDropdown.selectedValue;
      const isModel = !!modelDropdown.selectedValue;
      if (isBrand && isModel) {
        return car.brand === brandDropdown.selectedValue && car.model === modelDropdown.selectedValue;
      } else if (isBrand && !isModel) {
        return car.brand === brandDropdown.selectedValue;
      } else {
        return true;
      }
    });
    Card.appendCards(cardsContainer, filteredCars);
  })
}

function getCars() {
  return fetch('https://cars-server.herokuapp.com/cars')
    .then((response) => {
      return response.json();
    })
}

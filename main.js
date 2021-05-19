import { brands } from "./constants/cars.js";
import Dropdown from "./classes/Dropdown.js";
import Card from "./classes/Card.js";
import Router from "./classes/Router.js";
import BigCard from "./classes/BigCard.js";

// Селекторы контейнеров
const cardsContainer = document.querySelector(".cards-container"); // контейнер для всех машинок
const filtersContainer = document.querySelector(".filters"); // контейнер для фильтров
const bigCardContainer = document.querySelector(".big-card-container"); // контейнер для страницы с машикой
const searchButton = document.querySelector(".component-search"); // кнопка применения фильтров
const routerContainer = document.getElementById("router"); // контейнер со страницами

// Роутер
const router = new Router(routerContainer);

// Фильтры
const modelDropdown = new Dropdown("Выберите модель", []);
const brandDropdown = new Dropdown("Выберите марку", brands, (brand) => {
  modelDropdown.setItemsList([]);
  modelDropdown.clearSelectedValue();
  if (brand) {
    getCars().then((cars) => {
      let models = cars
        .filter((car) => car.brand === brand)
        .map((car) => car.model);
      models = Array.from(new Set(models));
      modelDropdown.setItemsList(models);
    });
  }
});
filtersContainer.append(brandDropdown.element);
filtersContainer.append(modelDropdown.element);

getCars().then((cars) => {
  Card.appendCards(cardsContainer, cars, (carId) => {
    router.goTo("#car");
    getCar(carId).then((car) => {
      BigCard.appendCard(bigCardContainer, car);
    });
  });
});

searchButton.onclick = () => {
  cardsContainer.innerHTML = "";
  getCars().then((cars) => {
    const filteredCars = cars.filter((car) => {
      const isBrand = !!brandDropdown.selectedValue;
      const isModel = !!modelDropdown.selectedValue;
      if (isBrand && isModel) {
        return (
          car.brand === brandDropdown.selectedValue &&
          car.model === modelDropdown.selectedValue
        );
      } else if (isBrand && !isModel) {
        return car.brand === brandDropdown.selectedValue;
      } else {
        return true;
      }
    });
    Card.appendCards(cardsContainer, filteredCars, (carId) => {
      router.goTo("#car");
      getCar(carId).then((car) => {
        BigCard.appendCard(bigCardContainer, car);
      });
    });
  });
};

// Запросы к серверу
function getCars() {
  // Получить все авто
  return fetch("https://cars-server.herokuapp.com/cars").then((response) => {
    return response.json();
  });
}

function getCar(id) {
  // Получить авто по id
  return fetch(`https://cars-server.herokuapp.com/cars/${id}`).then(
    (response) => {
      return response.json();
    }
  );
}

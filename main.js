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

getBrand().then ((brands) => {
  const modelDropdown = new Dropdown ("Выбрать модель", []);
  const brandDropdown = new Dropdown ("Выбрать марку", brands, (brand) => {
    modelDropdown.setItemsList ([]);
    modelDropdown.clearSelectedValue ();
      if (brand) {
        getModel(brand).then ((models) =>{
          modelDropdown.setItemsList (models);
        })
      };
  })
  filtersContainer.append(brandDropdown.element);
  filtersContainer.append(modelDropdown.element);

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
});

getCars().then((cars) => {
  Card.appendCards(cardsContainer, cars, (carId) => {
    router.goTo("#car");
    getCar(carId).then((car) => {
      BigCard.appendCard(bigCardContainer, car);
    });
  });
});


// Запросы к серверу
function getCars() {
  // Получить все авто
  return fetch("https://cars-server.herokuapp.com/cars").then((response) => {
    return response.json();
  });
}

function getCar(id) {
  // Получить авто по id
  return fetch(`https://cars-server.herokuapp.com/cars/${id}`).then((response) => {
    return response.json();
  });
}

function getBrand() {
  // Получить бренд авто
  return fetch (`https://cars-server.herokuapp.com/brands`).then ((response) => {
    return response.json();
  });
}

function getModel(brand) {
  // Получить модель
  return fetch(`https://cars-server.herokuapp.com/models/${brand}`).then((response) => {
      return response.json();
  });
}
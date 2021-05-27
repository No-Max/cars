// Импорты классов
import Dropdown from "./classes/Dropdown.js";
import Card from "./classes/Card.js";
import Router from "./classes/Router.js";
import BigCard from "./classes/BigCard.js";
import Preloader from "./classes/Preloader.js";

// импорты сервисов
import { getBrands } from "./services/brands.js";
import { getCar, getCars } from "./services/cars.js";
import { getModels } from "./services/models.js";

// Селекторы контейнеров
const cardsContainer = document.querySelector(".cards-container"); // контейнер для всех машинок
const filtersContainer = document.querySelector(".filters"); // контейнер для фильтров
const bigCardContainer = document.querySelector(".big-card-container"); // контейнер для страницы с машикой
const searchButton = document.querySelector(".component-search"); // кнопка применения фильтров
const routerContainer = document.getElementById("router"); // контейнер со страницами

// Роутер
const router = new Router(routerContainer);

// Прелоадер
const preloader = new Preloader(document.querySelector(".router"), "loading");

// Фильтры
const brandDropdown = new Dropdown("Выберите марку", [], filtersContainer);
const modelDropdown = new Dropdown("Выберите модель", [], filtersContainer);

// Получаем авто и бренды
preloader.show();
Promise.all([getBrands(), getCars()]).then(([brands, cars]) => {
  brandDropdown.setItemsList(brands);
  brandDropdown.onSelectItem = (brand) => {
    modelDropdown.setItemsList([]);
    modelDropdown.clearSelectedValue();
    if (brand) {
      getModels(brand).then((models) => {
        modelDropdown.setItemsList(models);
      });
    }
  };
  preloader.hide();

  Card.appendCards(cardsContainer, cars, (carId) => {
    preloader.show();
    router.goTo("#car");
    getCar(carId).then((car) => {
      BigCard.appendCard(bigCardContainer, car);
      preloader.hide();
    });
  });
});

// Обработчик кнопки "Показать"
searchButton.onclick = () => {
  cardsContainer.innerHTML = "";
  preloader.show();
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
    preloader.hide();

    Card.appendCards(cardsContainer, filteredCars, (carId) => {
      router.goTo("#car");
      preloader.show();
      getCar(carId).then((car) => {
        BigCard.appendCard(bigCardContainer, car);
        preloader.hide();
      });
    });
  });
};

const menu = document.querySelector ('menu');

function scrollSection(id) {
  const section = document.getElementById(id);
  section.scrollIntoView(top);
};

menu.addEventListener('click', (event) => {
  const menuButtons = event.target.dataset.sectionId;
  if (menuButtons) {
    scrollSection (menuButtons);
  };
});

window.onscroll = function () {
  if (window.scrollY >= menu.offsetTop) {
    menu.classList.add('sticked');
  } else {
    menu.classList.remove('sticked');
  };
};




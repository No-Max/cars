// Импорты классов
import Dropdown from "./classes/Dropdown.js";
import Card from "./classes/Card.js";
import Router from "./classes/Router.js";
import BigCard from "./classes/BigCard.js";
import Preloader from "./classes/Preloader.js";
import PopUp from "./classes/PopUp.js";
import FormCreateCar from "./classes/FormCreateCar.js"

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
const formCreateCarContainer = document.forms.createCar;

// Прелоадер
const preloader = new Preloader(document.querySelector(".router"), "loading");

// Фильтры
const brandDropdown = new Dropdown("Выберите марку", filtersContainer);
const modelDropdown = new Dropdown("Выберите модель", filtersContainer);

// Поупап
const poupup = new PopUp(1000);

// Форма создать машинку
const formCreateCar = new FormCreateCar(formCreateCarContainer);
getBrands().then((brands) => {
  formCreateCar.addBrands(brands);
  getModels(document.forms.createCar.brand.value).then((models) => {
    formCreateCar.addModels(models);
  });
  document.forms.createCar.brand.addEventListener('change', () => {
    formCreateCar.clearModels();
    getModels(document.forms.createCar.brand.value).then((models) => {
      formCreateCar.addModels(models);
    });
  });
});

// Роутер
const router = new Router(routerContainer, (pageId, parameters) => {
  switch (pageId) {
    case "#car": {
      if (parameters && parameters.carId) {
        preloader.show();
        getCar(parameters.carId).then((car) => {
          BigCard.appendCard(bigCardContainer, { ...car, brand: car.Brand.name, model: car.Model.name, parameters: car.Parameters });
          preloader.hide();
        });
      } else {
        router.goHome();
      }
      break;
    }
    case "#home": {
      // Получаем авто и бренды
      preloader.show();

      Promise.all([
        getBrands(),
        getCars({
          BrandId: brandDropdown.selectedItem?.id,
          ModelId: modelDropdown.selectedItem?.id,
        }),
      ]).then(([brands, cars]) => {
        brandDropdown.setItemsList(brands);
        brandDropdown.onSelectItem = (brand) => {
          modelDropdown.setItemsList([]);
          if (brand) {
            getModels(brand.id).then((models) => {
              modelDropdown.setItemsList(models);
            });
          }
        };
        preloader.hide();
        if(cars.length) {
          poupup.pushMessage("Машинки успешно получены");
        } else {
          poupup.pushMessage("Машинки не найдены");
        }

        cardsContainer.innerHTML = "";
        Card.appendCards(cardsContainer, cars.map(car => ({...car, brand: car.Brand.name, model: car.Model.name})), (carId) => {
          router.goTo("#car", { carId });
        });
      });
    }
  }
});

// Обработчик кнопки "Показать"
searchButton.onclick = () => {
  cardsContainer.innerHTML = "";
  preloader.show();
  getCars({
    BrandId: brandDropdown.selectedItem?.id,
    ModelId: modelDropdown.selectedItem?.id,
  }).then((cars) => {
    preloader.hide();
    if(cars.length) {
      poupup.pushMessage("Машинки успешно получены");
    } else {
      poupup.pushMessage("Машинки не найдены");
    }

    Card.appendCards(cardsContainer, cars.map(car => ({...car, brand: car.Brand.name, model: car.Model.name})), (carId) => {
      router.goTo("#car");
      preloader.show();
      getCar(carId).then((car) => {
        BigCard.appendCard(bigCardContainer, { ...car, brand: car.Brand.name, model: car.Model.name, parameters: car.Parameters });
        preloader.hide();
      });
    });
  });
};

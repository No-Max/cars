const cars = [
  {
    brand: 'Audi',
    model: 'A1',
    img: 'audi-a1.jpeg',
    price: 30000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'Audi',
    model: 'A8',
    img: 'audi-a8.jpeg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'Audi',
    model: 'Q7',
    img: 'audi-q7.jpeg',
    price: 60000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'BMW',
    model: 'e60',
    img: 'bmw-e60.jpg',
    price: 50000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'BMW',
    model: 'x5',
    img: 'bmw-x5.jpg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'Skoda',
    model: 'Fabia',
    img: 'skoda-fabia.jpeg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'Skoda',
    model: 'Fabia',
    img: 'skoda-fabia.jpeg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'Skoda',
    model: 'Octavia',
    img: 'skoda-octavia.jpeg',
    price: 30000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
];

const brands = Array.from(new Set(cars.map(car => car.brand)));

class Dropdown {
  _selectedValue = null

  constructor(defaultValue, listItems, onSelectItem) {
    this.defaultValue = defaultValue;
    this._selectedValue = defaultValue;
    this.listItems = listItems;
    
    this.element = document.createElement('div');
    this.element.classList.add('component-dropdown-container');
    
    this.valueElement = document.createElement('div');
    this.valueElement.classList.add('component-dropdown-value')
    this.valueElement.innerText = this.defaultValue;
    this.element.append(this.valueElement);
    
    this.listElement = document.createElement('ul');
    this.listElement.classList.add('component-dropdown-list');
    this.element.append(this.listElement);

    this.listItems.forEach(value => {
      const li = document.createElement('li');
      li.innerText = value;
      li.classList.add('component-dropdown-item');
      this.listElement.append(li);
    });

    this.element.addEventListener('click', (event) => {
      this.element.classList.toggle('active');
      if (event.target.matches('.component-dropdown-value')) {
        this.clearSelectedValue();
        if(onSelectItem) onSelectItem();
      }
      if (event.target.matches('.component-dropdown-item')) {
        this.selectedValue = event.target.innerText;
        if(onSelectItem) onSelectItem(event.target.innerText);
      };
    })
  }

  set selectedValue(value) {
    this.valueElement.innerText = value;
    this._selectedValue = value;
  }

  clearSelectedValue() {
    this.selectedValue = this.defaultValue;
  }
  
  setItemsList(list) {
    this.listElement.innerHTML = '';
    list.forEach(value => {
      const li = document.createElement('li');
      li.innerText = value;
      li.classList.add('component-dropdown-item');
      this.listElement.append(li);
    });
  }
}

const modelDropdown = new Dropdown('Выберите модель', []);

const brandDropdown = new Dropdown('Выберите марку', brands,
  (brand) => {
    modelDropdown.setItemsList([]);
    modelDropdown.clearSelectedValue();
    if (brand) {
      let models = cars.filter(car => car.brand === brand).map(car => car.model);
      models = Array.from(new Set(models));
      modelDropdown.setItemsList(models);
    }
  }
);

document.querySelector('.filters').append(brandDropdown.element);
document.querySelector('.filters').append(modelDropdown.element);


function Card({ brand, model, img, price, description }) {
  const containerElement = document.createElement('div');
  containerElement.classList.add('component-card');
  
  const imgElement = document.createElement('img');
  imgElement.classList.add('component-card-img');
  imgElement.src = 'img/' + img;
  containerElement.append(imgElement);

  const brandElement = document.createElement('div');
  brandElement.classList.add('component-card-brand');
  brandElement.innerText = brand;
  containerElement.append(brandElement);

  const modelElement = document.createElement('div');
  modelElement.classList.add('component-card-model');
  modelElement.innerText = model;
  containerElement.append(model);

  const priceElement = document.createElement('div');
  priceElement.classList.add('component-card-price');
  priceElement.innerText = price;
  containerElement.append(priceElement);
  
  const descrElement = document.createElement('div');
  descrElement.classList.add('component-card-descr');
  descrElement.innerText = description;
  containerElement.append(descrElement);

  return containerElement;
}

const cardsContainer = document.querySelector('.cards-container');
cars.forEach(car => {
  cardsContainer.append(
    new Card(car)
  );
});

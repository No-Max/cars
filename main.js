class Dropdown {
  _selectedValue;
  constructor(defaultValue, list, name, dependance = [null, null], initialState = false) {
    this.name = name;
    this.defaultValue = defaultValue;
    this.listItems = list;
    [this._master, this._slave] = dependance;
    if (this._master !== null) {
      this._master._slave = this;
    }
    this.element = this.createList(list, defaultValue, initialState);
    this.element.addEventListener('click', () => {
      this.element.classList.toggle('active');
      if (event.target.matches('li')) {
        const value = event.target.textContent;
        this.setSelectedValue = value;
        if (this._slave.name === 'button') {
          this._slave.element.classList.remove('disabled');
        }
        else {
          // TODO: expand to have more than 2 select fields
          this._slave.element.classList.remove('disabled');
          this._slave.clear();
          this.populateList.call(this._slave.element, cars.filter((e) => {
            if (e.brand === value) return e;
          }).map((e) => e.model));
        }
      }
    });
  }

  createList(values, defaultValue, initialState) {
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const divHeading = document.createElement('div');
    div.className = `component-dropdown-container ${initialState ? 'disabled' : ''}`;
    divHeading.className = `component-dropdown-value`;
    divHeading.textContent = defaultValue;
    div.append(divHeading);
    ul.className = `component-dropdown-list`;
    div.append(ul);
    this.populateList.call(div, values);
    document.querySelector('.filters').append(div);
    return div;
  }

  set setSelectedValue(value) {
    this._selectedValue = value;
    this.element.querySelector('.component-dropdown-value').textContent = value;
  }

  get value() {
    return this._selectedValue;
  }

  clear() {
    this.element.querySelector('.component-dropdown-value').textContent = this.defaultValue;
    this._selectedValue = '';
    let button = this._slave;
    while (button.name !== 'button') {
      button = button._slave;
    }
    button.element.classList.add('disabled');
  }

  populateList(values) {
    const ul = this.querySelector('ul');
    ul.innerHTML = '';
    values.forEach((e) => {
      const li = document.createElement('li');
      li.className = `component-dropdown-item`;
      li.textContent = e;
      ul.append(li);
    });
  }
}

function Card({ brand, model, img, price, description }) {
  const containerElement = document.createElement('div');
  containerElement.classList.add('component-card');

  const imgElement = document.createElement('img');
  imgElement.classList.add('component-img');
  imgElement.src = 'img/' + img;
  containerElement.append(imgElement);

  const brandElement = document.createElement('div');
  brandElement.classList.add('component-brand');
  brandElement.innerText = brand;
  containerElement.append(brandElement);

  const modelElement = document.createElement('div');
  modelElement.classList.add('component-model');
  modelElement.innerText = model;
  containerElement.append(model);

  const priceElement = document.createElement('div');
  priceElement.classList.add('component-price');
  priceElement.innerText = price;
  containerElement.append(priceElement);

  const descrElement = document.createElement('div');
  descrElement.classList.add('component-descr');
  descrElement.innerText = description;
  containerElement.append(descrElement);

  return containerElement;
}

fetch('server-responce.txt')
  .then(response => response.text())
  .then(data => { cars = JSON.parse(data); })
  .then(() => {
    const filters = document.querySelector('.filters');
    const brandDropdown = new Dropdown('Choose brand', (() => {
      return Array.from(new Set(cars.map((e) => e.brand)));
    })(), 'brand');

    /*const*/ modelDropdown = new Dropdown('Choose model', [], 'model', [brandDropdown, null], true);
    const filterButton = {
      name: 'button',
      element: document.createElement('button'),
      _master: modelDropdown,
    };
    filterButton.element.className = 'component-search disabled';
    filterButton.element.innerText = 'Choose';
    filters.append(filterButton.element);
    filterButton.element.addEventListener('click', function () {
      if (!this.classList.contains('disabled')) {
        let top = filterButton;
        let filteredCars = cars;
        while (top._master !== null) {
          top = top._master;
          filteredCars = filteredCars.filter(e => e[top.name] === top.value);
          
        }
        cardsContainer.innerHTML = '';
        filteredCars.forEach(car => cardsContainer.append(new Card(car)));
      }
    });
    modelDropdown._slave =  filterButton;
    const cardsContainer = document.querySelector('.cards-container');
    cars.forEach(car => cardsContainer.append(new Card(car)));
  });
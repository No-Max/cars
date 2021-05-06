class Dropdown {
  _selectedValue;
  constructor(defaultValue, list, dependance = [null, null], listStatus = '') {
    this.defaultValue = defaultValue;
    this.listItems = list;
    [this._master, this._slave] = dependance;
    if (this._master !== null) {
      this._master._slave = this;
    }
    this.element = this.createList(list, defaultValue, listStatus);
    this.element.addEventListener('click', () => {
      this.element.classList.toggle('active');
      if (event.target.matches('li')) {
        const value = event.target.textContent;
        this.setSelectedValue = value;
        if (this._slave === null) {
          filterButton.classList.remove('disabled');
        }
        else {
          if (this._slave.name === 'button') {
            this._slave.element.classList.remove('disabled');
          }
          else {
            this._slave.element.classList.remove('disabled');
            this._slave.clear();
            this.populateList.call(this._slave.element, cars.filter((e) => {
              if (e.brand === value) return e;
            }).map((e) => e.model));
          }
        }
      }
    });
  }

  createList(values, defaultValue, listStatus) {
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const divHeading = document.createElement('div');
    div.className = `component-dropdown-container ${listStatus}`;
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
    const button = this.element.closest('.filters').querySelector('button').classList.add('disabled');
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

fetch('server-responce.txt')
  .then(response => response.text())
  .then(data => { cars = JSON.parse(data); })
  .then(() => {
    const filters = document.querySelector('.filters');
    const brandDropdown = new Dropdown('Choose brand', (() => {
      return Array.from(new Set(cars.map((e) => e.brand)));
    })());

    const modelDropdown = new Dropdown('Choose model', [], [brandDropdown, null], 'disabled');
    const filterButton = document.createElement('button');
    filterButton.className = 'component-search disabled';
    filterButton.innerText = 'Choose';
    filters.append(filterButton);
    filterButton.addEventListener('click', function () {
      if (!this.classList.contains('disabled')) {
        console.log(brandDropdown.value, modelDropdown.value);
        console.log(brandDropdown, modelDropdown);
      }
    });
    modelDropdown._slave = {
      name: 'button',
      element: filterButton,
    };
  })
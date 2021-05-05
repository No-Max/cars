const cars = [
  {
    id: 1,
    brand: 'Audi',
    model: 'A1',
    img: 'audi-a1.jpeg',
    price: 30000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    id: 2,
    brand: 'Audi',
    model: 'A8',
    img: 'audi-a8.jpeg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    id: 3,
    brand: 'Audi',
    model: 'Q7',
    img: 'audi-q7.jpeg',
    price: 60000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    id: 4,
    brand: 'BMW',
    model: 'e60',
    img: 'bmw-e60.jpg',
    price: 50000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    id: 5,
    brand: 'BMW',
    model: 'x5',
    img: 'bmw-x5.jpg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    id: 6,
    brand: 'Skoda',
    model: 'Fabia',
    img: 'skoda-fabia.jpeg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    id: 7,
    brand: 'Skoda',
    model: 'Octavia',
    img: 'skoda-octavia.jpeg',
    price: 30000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
];

class Dropdown {
  constructor(listName, list, listStatus = '', isLast = false) {
    this.listName = listName;
    this.listItems = list;
    this.isLast = isLast;
    this._selectedValue;
    this.element = this.createList(list, listName, listStatus);
    this.element.addEventListener('click', () => {
      this.element.classList.toggle('active');
      if (event.target.matches('li')) {
        const value = event.target.textContent;
        this.selectedValue = value;
        this.element.nextElementSibling.classList.remove('disabled');
        if (this.isLast) {
          if (this.listName !== 'Choose model') {
            this.element.nextElementSibling.classList.remove('disabled');
          }
          
        }
        else {
          this.clear.call(this.element.nextElementSibling);
          const listValues = cars.filter((e) => {
            if (e.brand === value) return e;
          }).map((e) => e.model);
          this.populateList.call(this.element.nextElementSibling, listValues);
          
        }
       }
    });
  }

  createList(values, listName, listStatus) {
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const divHeading = document.createElement('div');
    div.className = `component-dropdown-container ${listStatus}`;
    divHeading.className = `component-dropdown-value`;
    divHeading.textContent = listName;
    div.append(divHeading);
    values.forEach((e) => {
      const li = document.createElement('li');
      li.className = `component-dropdown-item`;
      li.textContent = e;
      ul.append(li);
    });
    ul.className = `component-dropdown-list`;
    div.append(ul);
    document.querySelector('.filters').append(div);
    return div;
  }

  set selectedValue(value) {
    this._selectedValue = value;
    this.element.querySelector('.component-dropdown-value').textContent = value;
  }

  clear() {
    console.log('Here');
    this.querySelector('.component-dropdown-value').textContent = 'Choose model';
    this.nextElementSibling.classList.add('disabled');

  }
  populateList(values) {
    console.log('GOTCHA');
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

const filters = document.querySelector('.filters');
const brandDropdown = new Dropdown('Choose brand', (() => {
  return Array.from(new Set(cars.map((e) =>  e.brand)));
})());
const modelDropdown = new Dropdown('Choose model', [], 'disabled', true);
const filterButton = document.createElement('button');
filterButton.className = 'component-search disabled';
filterButton.textContent = 'Choose';
filters.append(filterButton);
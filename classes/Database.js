import { getBrands } from "../services/brands.js";
import { getModels } from "../services/models.js";

export class Database {
  element;
  brand;
  model;
  constructor(element) {
    this.element = element;
    this.button = this.element[this.element.length - 1];
    this.button.onclick = (event) => {
      event.preventDefault();
      // validate() && send();
    };

    this.brand = this.element.brand;
    this.model = this.element.model;
    this.clearSelect.call(this.model, 'model', true);

    this.populateBrands();
  }

  async populateBrands() {
    this.populateSelect.call(this.brand, getBrands, 'brand', this.clearSelect);

    this.brand.addEventListener('change', () => {
      if (!this.brand.selectedIndex) this.clearModel();
      else this.populateModels(this.brand.selectedIndex);
    });
  }

  async populateModels(id) {
    this.populateSelect.call(this.model, getModels, 'model', this.clearSelect, id);
    this.model.disabled = false;
  }

  async populateSelect(getValues, selectName, clear, id) {
    const disable = selectName === 'model' ? true : undefined;
    const values = await getValues(id);
    clear.call(this, selectName, disable);

    values.forEach(({ id, name }) => {
      this.options.add(new Option(name, id));
    });
  }

  clearSelect(name, disable) {
    this.innerHTML = '';
    this.add(new Option(`Select ${name}`, '0'));
    this.disabled = disable || false;
  }
}
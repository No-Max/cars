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
    const brands = await getBrands();
    // this.brand.innerHTML = '';
    // this.brand.options.add(new Option('Select brand', '0', true, true));
    this.clearSelect.call(this.brand, 'brand');
    brands.forEach(({ id, name }) => {
      this.brand.options.add(new Option(name, id));
    });

    this.brand.addEventListener('change', () => {
      if (!this.brand.selectedIndex) this.clearModel();
      else this.populateModels(this.brand.selectedIndex);
    });
  }

  async populateModels(id) {
    const models = await getModels(id);
    this.clearSelect.call(this.model, 'model');
    models.forEach(({ id, name }) => {
      this.model.options.add(new Option(name, id));
    });
    this.model.disabled = false;
  }

  clearSelect(name, disable) {
    this.innerHTML = '';
    this.add(new Option(`Select ${name}`, '0'));
    this.disabled = disable || false;
  }
}
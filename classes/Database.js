import { getBrands } from "../services/brands.js";
import { getModels } from "../services/models.js";
import { upload } from "../services/upload.js";

export class Database {
  element;
  brand;
  model;
  result;
  popup;
  constructor(element, popup) {
    this.element = element;
    this.popup = popup;
    this.button = this.element[this.element.length - 1];
    this.button.onclick = (event) => {
      event.preventDefault();
      if (this.validate()) {
        if (this.query) {
          const result = upload(this.query);
          new Promise((res) => {
            const interval = setInterval(() => {
              if (result) clearInterval(interval);
            }, 50);
            res();
          }).then(() => this.popup.pushMessage('Машина загружена!'))
          // await result;
          // ;
        }

        this.query = null;
        this.brand.selectedIndex = 0;
        this.clearSelect.call(this.model, 'model', true);
        Array.from(this.element).slice(2, -1).forEach((input) => {
          input.value = '';
        });

      }
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
    await this.populateSelect.call(this.model, getModels, 'model', this.clearSelect, id);
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

  validate() {
    const inputs = Array.from(this.element).slice(0, -1).map((input) => input.value);
    const isValidInputs = inputs.slice(2).every((input) => input.value !== '')

    if (!this.brand.selectedIndex || !this.model.selectedIndex) return false;
    if (!isValidInputs) return false;

    const [BrandId, ModelId, img, bigImg, price, description] = inputs;
    const car = {
      BrandId,
      ModelId,
      img,
      bigImg,
      price,
      description,
    }
    this.query = JSON.stringify(car);
    return true;
  }
}
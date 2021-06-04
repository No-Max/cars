export default class FormCreateCar {
  _selectedBrandId = null;
  _selectedModelId = null;

  constructor(container) {
    this.container = container;
    // this.brandsList = brandsList;

    this.inputs = `
    <input type="text" name="img" placeholder="Картинка для превью">
    <input type="text" name="bigImg" placeholder="Большая картинка">
    <input type="number" name="price" placeholder="Стоимость">
    <textarea name="description" placeholder="Описание"></textarea>
    `
    this.container.innerHTML = this.inputs;

    this.modelSelect = document.createElement('select');
    this.modelSelect.setAttribute('name', 'model');
    this.container.prepend(this.modelSelect);

    this.brandSelect = document.createElement('select');
    this.brandSelect.setAttribute('name', 'brand');
    this.container.prepend(this.brandSelect);

    // this._selectedBrandId = this.brandSelect.value;

    // this.brandSelect.addEventListener('change', function() {
    //   this._selectedBrandId = this.value;
    // });

    this.button = document.createElement('button');
    this.button.setAttribute('type', 'submit');
    this.button.innerText = 'Добавить';
    this.container.append(this.button);

  }

  addBrands(brands) {
    const brandsList = brands;
    brandsList.forEach((brand) => {
      let optionBrand = document.createElement('option');
      optionBrand.setAttribute('value', `${brand.id}`);
      optionBrand.innerText = brand.name;
      this.brandSelect.append(optionBrand);
    });
  }

  addModels(models) {
    const modelsList = models;
    modelsList.forEach((model) => {
      let optionModel = document.createElement('option');
      optionModel.setAttribute('value', `${model.id}`);
      optionModel.innerText = model.name;
      this.modelSelect.append(optionModel);
    });
  }

  clearModels() {
    this.modelSelect.innerHTML = '';
  }
}
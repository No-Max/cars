import "./style.css";

export default class Dropdown {
  constructor(defaultText, container, filterId) {
    this.defaultItem = { id: null, name: defaultText };
    this.filterId = filterId;

    this.element = document.createElement("div");
    this.element.classList.add("component-dropdown-container");

    this.valueElement = document.createElement("div");
    this.valueElement.classList.add("component-dropdown-value");
    this.element.append(this.valueElement);

    this.listElement = document.createElement("ul");
    this.listElement.classList.add("component-dropdown-list");
    this.element.append(this.listElement);

    this.setItemsList();

    this.element.addEventListener("click", (event) => {
      this.element.classList.toggle("active");
      if (event.target.matches(".component-dropdown-value")) {
        this.clearSelectedItem();
        if (this.onSelectItem) this.onSelectItem();
      }
      if (event.target.matches(".component-dropdown-item")) {
        this.selectedItem = this.listItems.find(
          (item) => item.id === Number(event.target.dataset.value)
        );

        localStorage.setItem(filterId, JSON.stringify(this.selectedItem));
        if (this.onSelectItem) this.onSelectItem(this.selectedItem);
      }
    });

    if (container) {
      container.append(this.element);
    }
  }

  set selectedItem(item) {
    this.valueElement.innerText = item.name;
    this.valueElement.dataset.value = item.id;
    this._selectedItem = item;
  }

  get selectedItem() {
    return this._selectedItem.id === this.defaultItem.id
      ? null
      : this._selectedItem;
  }

  clearSelectedItem() {
    this.selectedItem = this.defaultItem;
    localStorage.removeItem(this.filterId);
  }

  setItemsList(list = []) {
    this.listElement.innerHTML = "";
    this.listItems = list;
    this.listItems.forEach((item) => {
      const li = document.createElement("li");
      li.innerText = item.name;
      li.dataset.value = item.id;
      li.classList.add("component-dropdown-item");
      this.listElement.append(li);
    });
    this.selectedItem = list
      ? getLocalStorageItem(this.filterId) || this.defaultItem
      : this.defaultItem;
  }
}

function getLocalStorageItem(filterId) {
  return JSON.parse(localStorage.getItem(filterId));
}

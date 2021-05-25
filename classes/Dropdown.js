export default class Dropdown {
    _selectedValue = null;

    constructor(defaultValue, listItems, onSelectItem) {
        this.defaultValue = defaultValue;
        this._selectedValue = defaultValue;
        this.listItems = listItems;

        this.element = document.createElement("div");
        this.element.classList.add("component-dropdown-container");

        this.valueElement = document.createElement("div");
        this.valueElement.classList.add("component-dropdown-value");
        this.valueElement.innerText = this.defaultValue;
        this.element.append(this.valueElement);

        this.listElement = document.createElement("ul");
        this.listElement.classList.add("component-dropdown-list");
        this.element.append(this.listElement);

        // this.listItems.forEach((value) => {

        // });

        this.element.addEventListener("click", (event) => {
            this.element.classList.toggle("active");
            if (event.target.matches(".component-dropdown-value")) {
                this.clearSelectedValue();
                if (onSelectItem) onSelectItem();
            }
            if (event.target.matches(".component-dropdown-item")) {
                this.selectedValue = event.target.innerText;
                if (onSelectItem) onSelectItem(event.target.innerText);
            }
        });
    }

    set selectedValue(value) {
        this.valueElement.innerText = value;
        this._selectedValue = value;
    }

    get selectedValue() {
        return this._selectedValue === this.defaultValue ?
            null :
            this._selectedValue;
    }

    clearSelectedValue() {
        this.selectedValue = this.defaultValue;
    }

    setItemsList(list) {
        this.listElement.innerHTML = "";
        list.forEach((value) => {
            const li = document.createElement("li");
            li.innerText = value;
            li.classList.add("component-dropdown-item");
            this.listElement.append(li);
        });
    }
    getListBrands(response) {
        response.forEach((value) => {
            const li = document.createElement("li");
            li.innerText = value;
            li.classList.add("component-dropdown-item");
            this.listElement.append(li);
        });
    }
}
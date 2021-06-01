import { menuOpen, menuClose } from './Events.js';

export class Menu {
  constructor() {
    this.menuContainer = document.querySelector('.menu-container');
    this.menuListContainer = document.querySelector('.menu__block_list');
    this.openBtn = document.querySelector('.btn_open');
    this.closeBtn = document.querySelector('.btn_close');
    this.menu = this.menuListContainer.querySelector('.menu');

    this.menuListContainer.addEventListener('menu-opened', () => {
      this.menuOpen();
    });
    this.menuListContainer.addEventListener('menu-closed', () => {
      this.menuClose(this.menu);
    });

    this.openBtn.addEventListener('click', () => {
      this.menuContainer.classList.add('rotate');
      this.menuListContainer.dispatchEvent(menuOpen);
    });

    this.closeBtn.addEventListener('click', () => {
      this.menu.classList.toggle('menu-dropped');
      this.menuListContainer.dispatchEvent(menuClose);
    });
  }

  async waitForAninimation() {
    return new Promise((resolve) => {
      this.menuContainer.addEventListener('transitionend', () => resolve(), {
        once: true,
      })
    });
  }

  menuOpen() {
    this.waitForAninimation().then(() => {
      setTimeout(() => {
        this.menu.classList.toggle('menu-dropped');
      }, 300);
    });
  }

  menuClose() {
    this.waitForAninimation().then(() => {
      setTimeout(() => {
        this.menuContainer.classList.remove('rotate');
      }, 500);
    });
  }
}





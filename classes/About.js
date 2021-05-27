export class About {
  about;

  menu;

  menuButtons;

  aboutHeaders;

  constructor() {
    this.about = document.querySelector('.about');
    this.menu = this.about.querySelector('menu');
    this.menuButtons = Object.values(menu.querySelectorAll('button'));
    this.aboutHeaders = Object
      .values(about.querySelectorAll('section'))
      .map((e) => e.querySelector('h2'));

    this.menu.addEventListener('click', (event) => {
        const curButtonIndex = this.menuButtons.findIndex(button => button === event.target);
        if (curButtonIndex !== -1) {
          const curHeader = this.aboutHeaders[curButtonIndex];
          curHeader.style.position = 'relative';
          curHeader.scrollIntoView();
          curHeader.style.position = '';
        }
      });

      window.onscroll = () => {
        if (this.about.getBoundingClientRect().top < 0) {
          this.menu.classList.add("sticked");
        } else {
          this.menu.classList.remove("sticked");
        }
      }
  }
}

const about = document.querySelector('.about');
const menu = about.querySelector('menu');
const menuButtons = Object.values(menu.querySelectorAll('button'));
const aboutHeaders = Object.values(about.querySelectorAll('section')).map((e) => e.querySelector('h2'));

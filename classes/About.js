export default class About {
    constructor () {
        this.about = document.querySelector('.about');
        this.menu = this.about.querySelector('menu');

        this.menu.addEventListener('click', (event) => {
            const menuButtons = event.target.dataset.sectionId;
            if (menuButtons) {
              scrollSection (menuButtons);
            };
          });

        window.onscroll = () => {
            if (window.scrollY >= this.menu.offsetTop) {
              this.menu.classList.add('sticked');
            } else {
              this.menu.classList.remove('sticked');
            };
        };
    }
}

function scrollSection(id) {
    const section = document.getElementById(id);
    section.scrollIntoView(top);
};

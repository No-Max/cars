export default class About {
  constructor (about, menu, sectionId) {
    this.about = document.querySelector('.about');
    this.menu = this.about.querySelector('menu');

    this.menu.addEventListener('click', (event) => {
      const sectionId = event.target.dataset.sectionId;
        if (sectionId) {
          scrollSection (sectionId);
        };
    });

    window.onscroll = () => {
      if (window.scrollY >= this.menu.offsetTop) {
        this.menu.classList.add('sticked');
      } else {
        this.menu.classList.remove('sticked');
      };
    };

    function scrollSection(id) {
      const section = document.getElementById(id);
      section.scrollIntoView(top);
    };
  }
}



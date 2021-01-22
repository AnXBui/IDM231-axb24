const infoButton = document.querySelector('#moreInfoButton');
const infoConfirm = document.querySelector('#infoConfirm');
const infoModule = document.querySelector('#moreInfo');
const overlay = document.querySelector('.overlay');

gsap.registerPlugin(DrawSVGPlugin, SplitText);

gsap.defaults({
  ease: "power2"
});

const hideInfo = () => {
  infoModule.classList.add('hide');
  overlay.classList.add('hide');
}

infoButton.addEventListener("click", () => {
  infoModule.classList.remove('hide');
  overlay.classList.remove('hide');
});

infoConfirm.addEventListener("click", hideInfo);
overlay.addEventListener("click", hideInfo);

hasClass = (element, clss) => {
  return element.classList.contains(clss);
};

addClass = (element, clss) => {
  element.classList.add(clss);
}

rmvClass = (element, clss) => {
  element.classList.remove(clss);
}

class GodItem {
  constructor(key, index, scene, text) {
    this.scene = scene;
    this.text = text;
    this.key = key;
    this.index = index;
    this.timeline = gsap.timeline();


    this.decoArray = [];
    this.svgDeco = this.scene.querySelectorAll('.deco');
    this.svgDeco.forEach((element) => {
      // this.decoArray.push(this.svgDeco.children)
      element.querySelectorAll('.decoSVG').forEach((item) => {
        this.decoArray.push(item);
      })
    })

    console.log(this.decoArray);




    this.figure = this.scene.querySelector('.godFigure');
    this.halo = this.scene.querySelector('.halo');
    this.title = this.scene.querySelector('.godTitle');
    this.icon = this.text.querySelector('.godIcon');
    this.iconSVG = this.icon.querySelectorAll('.iconSVG');
    this.heading = this.text.querySelector('h2');
    this.paragraph = this.text.querySelectorAll('p');

    let title1 = new SplitText(this.title.querySelector('h2'), {
      type: "chars"
    });
    let title2 = this.title.querySelector('h3');

    console.log(title2);




    this.in = gsap.timeline({
      paused: true
    });
    this.in.fromTo(this.figure, 0.25, {
        alpha: 0,
        yPercent: -10
      }, {
        alpha: 1,
        yPercent: 0
      }, "start")
      .fromTo(this.svgDeco, 0.25, {
        alpha: 0
      }, {
        alpha: 1,
        stagger: 0.25
      }, "start")
      .fromTo(this.decoArray, 0.35, {
        drawSVG: "0%"
      }, {
        drawSVG: "100%",
        stagger: 0.15
      }, "start+=0.1")
      .fromTo(this.icon, 0.35, {
        alpha: 0
      }, {
        alpha: 1
      }, "start+=0.1")
      .fromTo(this.halo, 0.35, {
        alpha: 0,
        scale: 0
      }, {
        alpha: 1,
        scale: 1
      }, "start+=0.15")
      .fromTo(this.iconSVG, 0.25, {
        drawSVG: "0%"
      }, {
        drawSVG: "100%",
        stagger: 0.05
      }, "start+=0.15")
      .fromTo(title1.chars, 0.1, {
        yPercent: 100
      }, {
        yPercent: 0,
        stagger: 0.02
      }, "start+=0.15")
      .fromTo(title2, 0.15, {
        alpha: 0
      }, {
        alpha: 0.5,
        // color: "red"
      }, "start+=0.25")

      .fromTo(this.heading, 0.25, {
        alpha: 0,
        yPercent: 10
      }, {
        alpha: 1,
        yPercent: 0
      }, "start+=0.2")
      .fromTo(this.paragraph, 0.25, {
        alpha: 0,
        yPercent: 10
      }, {
        alpha: 1,
        yPercent: 0,
        stagger: 0.15
      }, "start+=0.25");

  }

  hide() {
    console.log('Hiding ' + this.key);
    rmvClass(this.scene, 'active');
    rmvClass(this.text, 'active');

  }

  show() {
    console.log('Showing ' + this.key);
    addClass(this.scene, 'active');
    addClass(this.text, 'active');
  }

  animateIn() {
    this.in.seek(0);
    this.in.play();
  }

  resetAnimate() {
    this.in.restart();
    this.in.paused(true);
  }
}

class GodGallery {
  constructor(godGalleryID) {
    // Getting main DOM
    this.gallery = document.querySelector(godGalleryID);
    this.form = document.querySelector('#mainForm');
    this.portals = document.querySelector('#godPortals');
    this.background = document.querySelector('#background');

    this.sceneWrapper = this.gallery.querySelector('.godSceneWrapper');
    this.content = this.gallery.querySelector('.godContent');
    this.textWrapper = this.gallery.querySelector('.godTextWrapper');




    // array
    this.portalsArray = this.portals.querySelector('.godButtonList');
    this.sceneArray = this.gallery.querySelectorAll("[data-god]");
    this.textArray = this.gallery.querySelectorAll("[data-text]");
    this.godArray = [];


    // Getting UI DOM
    this.exitButton = this.gallery.querySelectorAll(".closeGod");
    this.nextButton = this.gallery.querySelector(".nextGod");
    this.prevButton = this.gallery.querySelector(".prevGod");

    this.ui = [this.exitButton, this.nextButton, this.prevButton];


    // States
    this.activeGod = 0;
    this.portalResuming = false;
    this.oracle = false;
    this.opened = false;

    // Animation Timeline
    this.portalAnim = gsap.timeline();
    this.mainAnim = gsap.timeline();


    let portal = this.portalAnim;
    portal.to(this.portalsArray, 30, {
      rotate: 360,
      repeat: -1,
      ease: "linear"
    });

    // this.mainAnim.fromTo(this.gallery,0.35,{alpha:0},{alpha:1});
    // this.mainAnim.paused(true);

    this.enterAnimation = gsap.timeline({
        paused: true
      })
      .fromTo(this.portalsArray, 0.25, {
        alpha: 1,
        scale: 1
      }, {
        alpha: 0,
        scale: 0.5
      }, "start")
      .fromTo(this.form, 0.25, {
        alpha: 1
      }, {
        alpha: 0
      }, "start")
      .fromTo(this.gallery, 0.25, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        onComplete: () => {
          this.hideForm();
          this.hidePortals();
          this.godArray[this.activeGod].animateIn();
        }
      })
      .fromTo(this.content, 0.25, {
        alpha: 0
      }, {
        alpha: 1
      }, "-=0.15")
      .fromTo(this.textWrapper, 0.25, {
        alpha: 0,
        yPercent: -10
      }, {
        alpha: 1,
        yPercent: 0
      }, "-=0.15")
      .fromTo(this.sceneWrapper, 0.25, {
        alpha: 0,
        yPercent: 5
      }, {
        alpha: 1,
        yPercent: 0
      }, "-=0.25")
      .fromTo(this.ui, 0.15, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        stagger: 0.1
      });



    //
    this.exitAnimation = gsap.timeline({
        paused: true
      })
      .to(this.ui, 0.15, {
        alpha: 0
      })
      .to(this.content, 0.25, {
        alpha: 0
      })
      .to(this.textWrapper, 0.15, {
        alpha: 0,
        yPercent: 10
      }, "-=0.25")
      .to(this.sceneWrapper, 0.15, {
        alpha: 0,
        yPercent: 5,
        onComplete: () => {
          this.godArray.forEach((element) => {
            element.resetAnimate();
          })
        }
      }, "-=0.25")
      .to(this.gallery, 0.25, {
        alpha: 0
      }, "-=0.15")
      .to(this.portalsArray, 0.25, {
        alpha: 1,
        scale: 1
      }, "-=0.15")
      .to(this.form, 0.25, {
        alpha: 1,
        scale: 1,
        onComplete: () => {
          this.hideGallery();
        }
      }, "-=0.15")




    this.sceneArray.forEach((element, index) => {
      let key = element.getAttribute('data-god');
      let text = this.textArray[index];
      // console.log(text);
      let god = new GodItem(key, index, element, text);
      this.godArray.push(god);
    })

    // console.log(this.godArray);
  }

  init() {
    document.querySelectorAll("[data-target]").forEach((element, index) => {
      let button = element;
      element.addEventListener("click", (ev) => {
        let name = button.getAttribute('data-target');
        this.showGod(this.findGod(name));
        this.open();
        // console.log(button.getAttribute('data-target'));
      });
    })

    this.nextButton.addEventListener("click", () => {
      this.nextGod();
    });

    this.prevButton.addEventListener("click", () => {
      this.prevGod();
    });

    document.querySelector(".closeGod").addEventListener("click", () => {
      this.close();
    });



    document.querySelector('#seeAllButton').addEventListener("click", () => {
      if (this.opened) {
        this.close();
      }
      if (!this.oracle && !this.portalResuming) {
        this.minimizePortals();
        this.pausePortals(0.5);
        this.oracle = true;

      } else {
        this.maximizePortals();
        this.resumePortals(0.5);
        this.oracle = false;
      }
    });
  }

  hideForm() {
    if (!(hasClass(this.form, 'inactive'))) {
      addClass(this.form, 'inactive');
    }
  }

  showForm() {
    if ((hasClass(this.form, 'inactive'))) {
      rmvClass(this.form, 'inactive');
    }
  }

  minimizePortals() {
    if (!(hasClass(this.portalsArray, 'minimize'))) {
      addClass(this.portalsArray, 'minimize');
      let tl = gsap.timeline();
      tl.to(this.portalsArray, 0.25, {
        "--buttonListSize": "85vmin"
      }, "start")
      tl.to(this.form, 0.25, {
        alpha: 0,
        scale: 0.75,
        onComplete: () => {
          this.hideForm();
        }
      }, "start");
    }
  }

  maximizePortals() {
    if (hasClass(this.portalsArray, 'minimize')) {
      this.showForm();
      rmvClass(this.portalsArray, 'minimize');
      let tl = gsap.timeline();
      tl.to(this.portalsArray, 0.25, {
        "--buttonListSize": "80vmax"
      }, "start")
      tl.to(this.form, 0.25, {
        alpha: 1,
        scale: 1
      }, "start");
    }
  }

  pausePortals(dur) {
    // console.log('Pausing portals for ' + dur);
    if (!this.portalResuming) {
      console.log("Pausing portal")
      gsap.to(this.portalAnim, dur, {
        timeScale: 0.01,
        onComplete: () => {
          this.setPausePortals();
        }
      });
    }
  }

  resumePortals(dur) {
    this.portalResuming = true;
    this.portalAnim.play();
    gsap.to(this.portalAnim, dur, {
      timeScale: 1,
      onComplete: () => {
        this.portalResuming = false;
      }
    });
  }

  setPausePortals() {
    if (!this.portalAnim.paused() && !this.portalResuming) {
      this.portalAnim.paused(true);
    }
  }

  minimizeBackground() {
    if (!(hasClass(this.background, 'minimize'))) {
      addClass(this.background, 'minimize');
    }
  }

  maximizeBackground() {
    if (hasClass(this.background, 'minimize')) {
      rmvClass(this.background, 'minimize');
    }
  }

  showGallery() {
    if (hasClass(this.gallery, 'hide')) {
      rmvClass(this.gallery, 'hide');
    }
  }

  hideGallery() {
    if (!(hasClass(this.gallery, 'hide'))) {
      addClass(this.gallery, 'hide');
    }
  }

  hidePortals() {
    if (!(hasClass(this.portals, 'inactive'))) {
      addClass(this.portals, 'inactive');
    }
  }

  showPortals() {
    if (hasClass(this.portals, 'inactive')) {
      rmvClass(this.portals, 'inactive');
    }
  }

  open() {
    if (!this.opened) {
      this.opened = true;
      this.showGallery();
      this.enterAnimation.restart();
      this.minimizeBackground();
      if (!this.oracle) {
        this.pausePortals(0);
      }
    }
  }

  close() {
    console.log('close');
    if (this.opened) {
      this.showForm();
      this.showPortals();
      this.exitAnimation.restart();
      this.maximizeBackground();
      if (this.oracle) {
        this.maximizePortals();
        this.oracle = !this.oracle;
      }
      this.resumePortals(0.15);
      this.opened = false;
    }


  }

  findGod(name) {
    let result = 0;

    if (name != 'next' || name != 'prev') {
      this.godArray.forEach((element, index) => {
        if (element.key == name) {
          result = index;
        }
      })
    } else {
      result = name;
    }


    return result;
  }

  showGod(number) {
    let index = number;
    if ((index != this.activeGod) && index >= 0 && index <= 11) {
      this.godArray[this.activeGod].hide();
      this.godArray[index].show();
      // this.godArray[index].animateIn();
      this.activeGod = index;
    } else {
      console.log('already active: ' + index);
    }
  }

  nextGod() {
    console.log('next');
    let i = this.activeGod;
    // let f = this.godArray[i].hide();
    // console.log(f);
    this.godArray[i].hide()
    if (this.activeGod == 11) {
      this.activeGod = 0;
    } else {
      this.activeGod = this.activeGod + 1;
    }
    this.godArray[this.activeGod].show();
    this.godArray[this.activeGod].animateIn();
  }

  prevGod() {
    console.log('previous');
    let i = this.activeGod;
    this.godArray[i].hide()
    if (this.activeGod == 0) {
      this.activeGod = 11;
    } else {
      this.activeGod = this.activeGod - 1;
    }
    this.godArray[this.activeGod].show();
    this.godArray[this.activeGod].animateIn();
  }
}


let masterGallery = new GodGallery('#godGallery');
masterGallery.init();
//
// window.onload = () => {
// };
// masterGallery.init();

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

const hasClass = (element, clss) => {
  return element.classList.contains(clss);
};

const addClass = (element, clss) => {
  element.classList.add(clss);
}

const rmvClass = (element, clss) => {
  element.classList.remove(clss);
}

const zodiacCalc = (whichMonth, whichDayOfMonth) => {
  let astroSign;
      if ((whichMonth == 12 && whichDayOfMonth >= 22) || (whichMonth == 1 && whichDayOfMonth <= 19)) {
      astroSign = 9;
    } else if ((whichMonth == 11 && whichDayOfMonth >= 22) || (whichMonth == 12 && whichDayOfMonth <= 21)) {
      astroSign = 8;
    } else if ((whichMonth == 10 && whichDayOfMonth >= 24) || (whichMonth == 11 && whichDayOfMonth <= 21)) {
      astroSign = 7;
    } else if ((whichMonth == 9 && whichDayOfMonth >= 23) || (whichMonth == 10 && whichDayOfMonth <= 23)) {
      astroSign = 6;
    } else if ((whichMonth == 8 && whichDayOfMonth >= 23) || (whichMonth == 9 && whichDayOfMonth <= 22)) {
      astroSign = 5;
    } else if ((whichMonth == 7 && whichDayOfMonth >= 23) || (whichMonth == 8 && whichDayOfMonth <= 22)) {
      astroSign = 4;
    } else if ((whichMonth == 6 && whichDayOfMonth >= 22) || (whichMonth == 7 && whichDayOfMonth <= 22)) {
      astroSign = 3;
    } else if ((whichMonth == 5 && whichDayOfMonth >= 21) || (whichMonth == 6 && whichDayOfMonth <= 21)) {
      astroSign = 2;
    } else if ((whichMonth == 4 && whichDayOfMonth >= 20) || (whichMonth == 5 && whichDayOfMonth <= 20)) {
      astroSign = 1;
    } else if ((whichMonth == 3 && whichDayOfMonth >= 21) || (whichMonth == 4 && whichDayOfMonth <= 19)) {
      astroSign = 0;
    } else if ((whichMonth == 2 && whichDayOfMonth >= 19) || (whichMonth == 3 && whichDayOfMonth <= 20)) {
      astroSign = 11;
    } else if ((whichMonth == 1 && whichDayOfMonth >= 20) || (whichMonth == 2 && whichDayOfMonth <= 18)) {
      astroSign = 10;
    }
  return astroSign;
}

let speaker = document.querySelector('#speaker');
let soundTgl = {state:'on', obj:document.querySelector('#soundButton')};
soundTgl.obj.addEventListener('click', () => {
  if (soundTgl.state == 'on'){
    speaker.volume = 0;
    soundTgl.state = 'off';
    if (!hasClass(soundTgl.obj,'muted')){
      addClass(soundTgl.obj,'muted');
    }
  } else {
    speaker.volume = 1;
    soundTgl.state = 'on';
    if (hasClass(soundTgl.obj,'muted')){
      rmvClass(soundTgl.obj,'muted');
    }
  }
})

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

    this.sound = `sound/${this.key}.mp3`;

    let title1 = new SplitText(this.title.querySelector('h2'), {
      type: "chars"
    });
    let title2 = this.title.querySelector('h3');

    console.log(title2);




    this.in = gsap.timeline({
      paused: true
    });
    this.in.fromTo(this.figure, 0.4, {
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
        alpha: 0.5
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
    speaker.src = this.sound;
    speaker.play();
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
    this.input = document.querySelector('#birthday');
    console.log(this.input);
    this.submit = document.querySelector('#submit');
    this.inputMsg = this.form.querySelector('.inputMessage');

    this.portals = document.querySelector('#godPortals');
    this.oracleMsg = document.querySelector('.oracleMode');
    this.currentHover;
    this.godButtons = [];


    this.godName = document.querySelector('#godName');
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

    document.querySelectorAll("[data-target]").forEach(element => {
      let button = element;
      element.addEventListener("click", () => {
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

    this.submit.addEventListener('click', () => {
      if (this.input.value){
        let date = new Date (this.input.value);
        console.log('submitted');
        console.log(date);
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        console.log('day is' + day);
        console.log();
        this.showGod(zodiacCalc(month, day));
        this.open();
      } else {
        console.log('Please enter a value');
        if (!hasClass(this.inputMsg, 'error')){
          addClass(this.inputMsg, 'error');
        }
      }

      // console.log(day);
      // ;
     }
    );

    this.hoverInit();
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
      addClass(this.oracleMsg,'show');
      // this.godName
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
      rmvClass(this.oracleMsg,'show');
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

  hoverInit(){

    document.querySelectorAll("[data-target]").forEach(element => {
      const button = element;
      const name = button.getAttribute('data-target');

      button.addEventListener("mouseenter", () => {
        let tl = gsap.timeline();
        addClass(this.godName,'active');
        tl.to(this.godName,0.125,{opacity: 0, yPercent:-10, onComplete: () => {
          this.godName.innerHTML = name;
        }});
        tl.to(this.godName, 0.125,{opacity: 1, yPercent:0});


      });
      button.addEventListener("mouseleave", () => {
        let tl = gsap.timeline();
        rmvClass(this.godName,'active');
        tl.to(this.godName,0.125,{opacity: 0, yPercent:-10, onComplete: () => {
          this.godName.innerHTML = null;
        }});
        tl.to(this.godName, 0.125,{opacity: 1, yPercent:0});


      });
    })
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

      if (hasClass(this.inputMsg, 'error')){
        rmvClass(this.inputMsg, 'error');
      }

      if (hasClass(this.oracleMsg, 'show')){
        rmvClass(this.oracleMsg, 'show');
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
      speaker.pause();
      this.input.value=null;
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
      speaker.play();
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


//
const body = document.querySelector('body');
const portals = document.querySelector('.godButtonList');
const mountain = document.querySelector('.backgroundMountain');
const ui = document.querySelectorAll('.mainUi');
const form = document.querySelector('.form');


gsap.set(body,{alpha: 0})
gsap.set(body,{visibility:'hidden'});
// gsap.set(portals,{scale: 0.5, alpha: 0});


window.onload = () => {

  gsap.set(body,{visibility:'visible'});
  let tl = gsap.timeline();
  tl.fromTo(body,1,{alpha: 0},{alpha: 1},'start')
  tl.fromTo(portals,1.5,{scale: 0.5, alpha: 0},{scale: 1, alpha: 1},'start')
  tl.fromTo(mountain,1.2,{yPercent: 30, scaleY: 0.85, alpha: 0},{yPercent: 0,  scaleY: 1, alpha: 1},'start')
  tl.fromTo(form,1.75,{yPercent:-15, alpha: 0},{yPercent:0, alpha: 1},'start')
  tl.fromTo(ui,1.5,{ xPercent: 30, alpha: 0},{xPercent: 0, alpha: 1,stagger:0.5},'start')
  let masterGallery = new GodGallery('#godGallery');
  masterGallery.init();
};



const infoButton = document.querySelector('#moreInfoButton');
const infoConfirm = document.querySelector('#infoConfirm');
const infoModule = document.querySelector('#moreInfo');
const overlay = document.querySelector('.overlay');

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

class GodItem{
  constructor(key, index, scene, text){
    this.scene = scene;
    this.text = text;
    this.key = key;
    this.index = index;
  }

  hide(){
    console.log('Hiding ' + this.key);
    rmvClass(this.scene,'active');
    rmvClass(this.text,'active');

  }

  show(){
    console.log('Showing ' + this.key);
    addClass(this.scene,'active');
    addClass(this.text,'active');



  }
}

class GodGallery{
  constructor(godGalleryID){
    this.gallery = document.querySelector(godGalleryID);
    this.form = document.querySelector('#mainForm');
    this.portals = document.querySelector('#godPortals');
    this.portalsArray = this.portals.querySelector('.godButtonList');
    this.sceneArray = this.gallery.querySelectorAll("[data-god]");
    this.exitButton = this.gallery.querySelectorAll(".closeGod");
    this.nextButton = this.gallery.querySelector(".nextGod");
    this.prevButton = this.gallery.querySelector(".prevGod");
    this.textArray = this.gallery.querySelectorAll("[data-text]");
    this.godArray = [];
    this.activeGod = 0;
    this.portalAnim = gsap.timeline();
    this.oracle = false;

    // this.portalScale = gsap.timeline();
    // this.portalScale.paused(true);
    // this.portalScale.to(this.portalAnim, 0.5, {timeScale: 0},"start");
    // this.portalScale.to(this.portalsArray, 0.5, {scale: 0.45},"start");

    let portal = this.portalAnim;
    portal.to(this.portalsArray, 30, {rotate: 360, repeat: -1, ease:"linear"});


    // console.log(this.sceneArray);
    // console.log(this.textArray);


    this.sceneArray.forEach( (element, index) => {
      let key = element.getAttribute('data-god');
      let text = this.textArray[index];
      // console.log(text);
      let god = new GodItem(key, index, element, text);
      this.godArray.push(god);
    })

    // console.log(this.godArray);
  }

  init(){
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
          if (!this.oracle){
            this.close();
            this.hideForm();
            this.pausePortals();
            this.oracle = true;
          } else{
            this.close();
            this.showForm();
            this.resumePortals();
            this.oracle = false;
          }
        });
  }

  hideForm(){
    if (!(hasClass(this.form, 'inactive'))){
      addClass(this.form, 'inactive');
    }
  }

  showForm(){
    if ((hasClass(this.form, 'inactive'))){
      rmvClass(this.form, 'inactive');
    }
  }

  pausePortals(){
    gsap.to(this.portalAnim, 1, {timeScale: 0.01, onComplete: this.portalAnim.pause});
  }

  resumePortals(){
    this.portalAnim.play();
    gsap.to(this.portalAnim, 1, {timeScale: 1});
  }



  open(){
      // console.log(ev);
      if (hasClass(this.gallery,'hide')){
        rmvClass(this.gallery, 'hide');
      }

      if (!(hasClass(this.form, 'inactive'))){
        addClass(this.form, 'inactive');
      }

      if (!(hasClass(this.portals, 'inactive'))){
        addClass(this.portals, 'inactive');
      }

      if (this.oracle){
        this.oracle = !this.oracle;
        this.resumePortals();
      }
  }

  close(){
    // console.log(ev);
    console.log('close');
    if (!(hasClass(this.gallery,'hide'))){
      addClass(this.gallery, 'hide');
    }

    if (hasClass(this.form, 'inactive')){
      rmvClass(this.form, 'inactive');
    }

    if (hasClass(this.portals, 'inactive')){
      rmvClass(this.portals, 'inactive');
    }
  }

  findGod(name){
    let result = 0;

    if (name != 'next' || name !='prev' ){
      this.godArray.forEach((element, index) => {
        if (element.key == name){
          result = index;
        }
      })
    } else {
      result = name;
    }

    console.log(result);

    return result;
  }

  showGod(number){
      let index = number;
      if ((index != this.activeGod) && index >= 0 && index <= 11 ) {
        this.godArray[this.activeGod].hide();
        this.godArray[index].show();
        this.activeGod = index;
      }
      else{
        console.log('already active: ' + index);
      }
  }

  nextGod(){
    console.log('next');
    this.godArray[this.activeGod].hide();
    if (this.activeGod == 11){
      this.activeGod = 0;
    } else {
      this.activeGod = this.activeGod + 1;
    }
    this.godArray[this.activeGod].show();
  }

  prevGod(){
    console.log('previous');
    this.godArray[this.activeGod].hide();
    if (this.activeGod == 0){
      this.activeGod = 11;
    } else {
      this.activeGod = this.activeGod - 1;
    }
    this.godArray[this.activeGod].show();
  }
}


let masterGallery = new GodGallery('#godGallery');
masterGallery.init();
//
// window.onload = () => {
// };
// masterGallery.init();



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
  constructor(scene, text, index){
    this.scene = scene;
    this.text = text;
    this.index = index;
  }

  show(){

  }
}

class GodGallery{
  constructor(godGalleryID){
    this.gallery = document.querySelector(godGalleryID);
    this.form = document.querySelector('#mainForm');
    this.portals = document.querySelector('#godPortals');
    this.sceneArray = this.gallery.querySelectorAll("[data-god]");
    this.exitButton = this.gallery.querySelectorAll(".closeGod")
    this.textArray = [];

    console.log(this.sceneArray);

    this.sceneArray.forEach( (element, index) => {
      let key = element.getAttribute('data-god');
      console.log(key);

        // const item = new GodItem();
    })
  }

  init(){
      document.querySelectorAll(".godButton").forEach((element, index) => {
        element.addEventListener("click", (ev) => {
          this.open(ev)
        });
      })

      document.querySelector(".closeGod").addEventListener("click", (ev) => {
          this.close(ev)
        });
  }

  open(ev){
      console.log(ev);
      if (hasClass(this.gallery,'hide')){
        rmvClass(this.gallery, 'hide');
      }

      if (!(hasClass(this.form, 'inactive'))){
        addClass(this.form, 'inactive');
      }

      if (!(hasClass(this.portals, 'inactive'))){
        addClass(this.portals, 'inactive');
      }
  }

  close(ev){
    console.log(ev);
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
}


let masterGallery = new GodGallery('#godGallery');
// console.log(masterGallery);
// console.log(masterGallery.init());
masterGallery.init();
// masterGallery.init();

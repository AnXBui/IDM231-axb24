const infoButton=document.querySelector("#moreInfoButton"),infoConfirm=document.querySelector("#infoConfirm"),infoModule=document.querySelector("#moreInfo"),overlay=document.querySelector(".overlay"),hideInfo=()=>{infoModule.classList.add("hide"),overlay.classList.add("hide")};infoButton.addEventListener("click",()=>{infoModule.classList.remove("hide"),overlay.classList.remove("hide")}),infoConfirm.addEventListener("click",hideInfo),overlay.addEventListener("click",hideInfo),hasClass=(t,e)=>t.classList.contains(e),addClass=(t,e)=>{t.classList.add(e)},rmvClass=(t,e)=>{t.classList.remove(e)};class GodItem{constructor(t,e,s,i){this.scene=s,this.text=i,this.key=t,this.index=e}hide(){console.log("Hiding "+this.key),rmvClass(this.scene,"active"),rmvClass(this.text,"active")}show(){console.log("Showing "+this.key),addClass(this.scene,"active"),addClass(this.text,"active")}}class GodGallery{constructor(t){this.gallery=document.querySelector(t),this.form=document.querySelector("#mainForm"),this.portals=document.querySelector("#godPortals"),this.portalsArray=this.portals.querySelector(".godButtonList"),this.sceneArray=this.gallery.querySelectorAll("[data-god]"),this.exitButton=this.gallery.querySelectorAll(".closeGod"),this.nextButton=this.gallery.querySelector(".nextGod"),this.prevButton=this.gallery.querySelector(".prevGod"),this.textArray=this.gallery.querySelectorAll("[data-text]"),this.godArray=[],this.activeGod=0,this.portalAnim=gsap.timeline(),this.oracle=!1,this.portalAnim.to(this.portalsArray,30,{rotate:360,repeat:-1,ease:"linear"}),this.sceneArray.forEach((t,e)=>{let s=t.getAttribute("data-god"),i=this.textArray[e],o=new GodItem(s,e,t,i);this.godArray.push(o)})}init(){document.querySelectorAll("[data-target]").forEach((t,e)=>{let s=t;t.addEventListener("click",t=>{let e=s.getAttribute("data-target");this.showGod(this.findGod(e)),this.open()})}),this.nextButton.addEventListener("click",()=>{this.nextGod()}),this.prevButton.addEventListener("click",()=>{this.prevGod()}),document.querySelector(".closeGod").addEventListener("click",()=>{this.close()}),document.querySelector("#seeAllButton").addEventListener("click",()=>{this.oracle?(this.close(),this.showForm(),this.resumePortals(),this.oracle=!1):(this.close(),this.hideForm(),this.pausePortals(),this.oracle=!0)})}hideForm(){hasClass(this.form,"inactive")||addClass(this.form,"inactive")}showForm(){hasClass(this.form,"inactive")&&rmvClass(this.form,"inactive")}pausePortals(){gsap.to(this.portalAnim,1,{timeScale:.01,onComplete:this.portalAnim.pause})}resumePortals(){this.portalAnim.play(),gsap.to(this.portalAnim,1,{timeScale:1})}open(){hasClass(this.gallery,"hide")&&rmvClass(this.gallery,"hide"),hasClass(this.form,"inactive")||addClass(this.form,"inactive"),hasClass(this.portals,"inactive")||addClass(this.portals,"inactive"),this.oracle&&(this.oracle=!this.oracle,this.resumePortals())}close(){console.log("close"),hasClass(this.gallery,"hide")||addClass(this.gallery,"hide"),hasClass(this.form,"inactive")&&rmvClass(this.form,"inactive"),hasClass(this.portals,"inactive")&&rmvClass(this.portals,"inactive")}findGod(t){let e=0;return"next"!=t||"prev"!=t?this.godArray.forEach((s,i)=>{s.key==t&&(e=i)}):e=t,console.log(e),e}showGod(t){let e=t;e!=this.activeGod&&e>=0&&e<=11?(this.godArray[this.activeGod].hide(),this.godArray[e].show(),this.activeGod=e):console.log("already active: "+e)}nextGod(){console.log("next"),this.godArray[this.activeGod].hide(),11==this.activeGod?this.activeGod=0:this.activeGod=this.activeGod+1,this.godArray[this.activeGod].show()}prevGod(){console.log("previous"),this.godArray[this.activeGod].hide(),0==this.activeGod?this.activeGod=11:this.activeGod=this.activeGod-1,this.godArray[this.activeGod].show()}}let masterGallery=new GodGallery("#godGallery");masterGallery.init();
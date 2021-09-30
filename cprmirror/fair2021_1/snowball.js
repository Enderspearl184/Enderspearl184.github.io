var snowballOptions=snowballOptions||{};class Snowball{constructor(initial){const self=this;if(window.self!==window.top){}
this.setupImageSupport();this.playURL='https://play.cprewritten.net/';this.createURL='https://create.cprewritten.net/';this.header=document.getElementById('header');this.footer=document.getElementById('footer');this.content=document.getElementById('content');this.background=document.getElementById('background');this.mobileNotice=document.getElementById('mobile');this.initial='';this.base=undefined;this.loadedMax=2;this.loaded=0;this.setupPlayPage();}
setupImageSupport(){let image=new Image();image.src='data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';image.onload=function(){if((image.width>0)&&(image.height>0))document.body.classList.add('webp');}
image.onerror=function(){document.body.classList.add('nowebp');}}
isMobile(){let isPuffin=(/Puffin/.test(navigator.userAgent));let isMobileTest=(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));let isMobile=(isMobileTest?true:false);if(isPuffin){return false;}
return isMobile;}
verifyMobile(){if(this.isMobile()){return true;}
return false;}
setupPlayPage(){const self=this;this.setupBanner();this.setupAgeGate();document.body.classList.add('loaded');}
setupBanner(){const self=this;let bannerName='cpr_hide_banner';let options=snowballOptions.banner;if(typeof localStorage!=='undefined'&&localStorage.getItem(bannerName)==options.id)return;let banner=document.getElementById('botif-notification');let bannerContent=document.querySelector('.notification__content');let bannerText=document.createElement('span');let bannerButtons=document.querySelector('.notification__buttons');let closeButton=document.getElementById('botif-close-button');let bannerButton=document.createElement('a');if(options){bannerText.innerHTML=options.text;let buttonOptions=options.button;if(buttonOptions){bannerButton.innerHTML=buttonOptions.text;bannerButton.href=buttonOptions.link;bannerButton.classList.add('notification__button');if(buttonOptions.external){bannerButton.classList.add('agegate__link');}
bannerButtons.appendChild(bannerButton);}}
if(options.active){banner.classList.add('botif__notification--opened');}
bannerContent.appendChild(bannerText);closeButton.addEventListener('click',function(){banner.classList.remove('botif__notification--opened');banner.classList.add('botif__notification--closed');if(typeof localStorage!=='undefined')localStorage.setItem(bannerName,options.id);});}
setupAgeGate(){const self=this;let agegateList=document.querySelectorAll('.agegate__link');let agegateLinks=[].slice.call(agegateList);agegateLinks.forEach(function(element){let url=element.href;let target=element.target;element.addEventListener('click',function(event){event.preventDefault();self.showAgeGate(url,target);})});}
showAgeGate(url,target){const self=this;let modal=document.getElementById('agegate-modal');let link=document.querySelector('.agegate-modal__link');let okButton=document.getElementById('agegate-button-pass');let cancelButton=document.getElementById('agegate-button-cancel');modal.classList.add('modal--visible');link.innerHTML=url.split('/')[2].replace('www.','');okButton.href=url;if(target=='_blank'){let tabFunction=function(event){event.preventDefault();modal.classList.remove('modal--visible');let tab=window.open(url,'_blank');tab.focus();okButton.removeEventListener('click',tabFunction);}
okButton.addEventListener('click',tabFunction);}
cancelButton.addEventListener('click',function(event){event.preventDefault();modal.classList.remove('modal--visible');});}}
document.addEventListener('DOMContentLoaded',function(){const snowball=new Snowball(true);window.addEventListener('hashchange',function(event){event.preventDefault();snowball.configureStates(false);},false);showLogout=function(){document.getElementById('logout-button').classList.add('nav__link--logout--visible');}});
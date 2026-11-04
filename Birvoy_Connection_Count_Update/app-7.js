
(function(){
function selectPhoto(el){
 var gallery=el.closest('.offer-gallery');if(!gallery)return;
 var buttons=Array.prototype.slice.call(gallery.querySelectorAll('.offer-gallery-thumbs button')),index=buttons.indexOf(el);if(index<0)return;
 var main=gallery.querySelector('.offer-gallery-main>img');main.src=el.querySelector('img').src;main.alt=gallery.getAttribute('aria-label').replace(/ photos$/,'')+' — photo '+(index+1);
 gallery.querySelector('.offer-gallery-count').textContent=(index+1)+' / '+buttons.length;
 buttons.forEach(function(b){b.setAttribute('aria-pressed',b===el?'true':'false')});
}

 var dialog=document.getElementById('offer-photo-viewer'),photo=document.getElementById('pv-image'),title=document.getElementById('pv-title'),count=document.getElementById('pv-count');
 var photos=[],index=0,returnFocus=null,gallery=null,oldOverflow='';
 function show(i){if(!photos.length)return;index=(i+photos.length)%photos.length;photo.src=photos[index];photo.alt=title.textContent+' — photo '+(index+1);count.textContent=(index+1)+' / '+photos.length;
  if(gallery){var thumbs=gallery.querySelectorAll('.offer-gallery-thumbs button'),main=gallery.querySelector('.offer-gallery-main>img');main.src=photos[index];main.alt=photo.alt;gallery.querySelector('.offer-gallery-count').textContent=count.textContent;Array.prototype.forEach.call(thumbs,function(b,k){b.setAttribute('aria-pressed',k===index?'true':'false')});}
 }
 function open(el,i){gallery=el.closest('.offer-gallery');if(!gallery)return;photos=Array.prototype.map.call(gallery.querySelectorAll('.offer-gallery-thumbs img'),function(img){return img.src});if(!photos.length)return;
 title.textContent=gallery.getAttribute('aria-label').replace(/ photos$/,'');returnFocus=el;show(i);if(!dialog.open){oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();}document.getElementById('pv-close').focus();}
 function openMain(el){var g=el.closest('.offer-gallery'),b=g&&g.querySelector('.offer-gallery-thumbs button[aria-pressed="true"]');open(el,b?Number(b.getAttribute('data-index')):0);};
 // Swipe the inline photo without interfering with vertical page scrolling.
 var inlineTouch=null,suppressClickUntil=0;
 document.addEventListener('touchstart',function(e){var main=e.target.closest&&e.target.closest('.offer-gallery-main');if(!main||e.touches.length!==1){inlineTouch=null;return}inlineTouch={main:main,x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
 document.addEventListener('touchend',function(e){if(!inlineTouch||!e.changedTouches.length)return;var start=inlineTouch,t=e.changedTouches[0];inlineTouch=null;var dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)<45||Math.abs(dx)<=Math.abs(dy)*1.4)return;var g=start.main.closest('.offer-gallery'),buttons=g&&Array.prototype.slice.call(g.querySelectorAll('.offer-gallery-thumbs button'));if(!buttons||buttons.length<2)return;var current=buttons.findIndex(function(b){return b.getAttribute('aria-pressed')==='true'});var next=Math.max(0,Math.min(buttons.length-1,(current<0?0:current)+(dx<0?1:-1)));suppressClickUntil=Date.now()+500;selectPhoto(buttons[next]);var rail=g.querySelector('.offer-gallery-thumbs'),b=buttons[next];if(rail&&b)rail.scrollLeft=Math.max(0,b.offsetLeft-rail.offsetLeft-(rail.clientWidth-b.clientWidth)/2);},{passive:true});
 document.addEventListener('touchcancel',function(){inlineTouch=null},{passive:true});
 // Thumbnail selection uses the inline gallery handler; the main image opens the viewer.
 document.addEventListener('click',function(e){
 var target=e.target.closest&&e.target.closest('.offer-gallery-thumbs button,.offer-gallery-main');if(!target)return;
 if(target.matches('.offer-gallery-main')&&Date.now()<suppressClickUntil){e.preventDefault();e.stopPropagation();return}
 e.preventDefault();e.stopPropagation();
 if(target.matches('.offer-gallery-thumbs button'))selectPhoto(target);else openMain(target);
 },true);
 document.getElementById('pv-close').onclick=function(){dialog.close();};document.getElementById('pv-prev').onclick=function(){show(index-1);};document.getElementById('pv-next').onclick=function(){show(index+1);};
 dialog.addEventListener('close',function(){document.body.style.overflow=oldOverflow;photo.removeAttribute('src');if(returnFocus&&returnFocus.isConnected)returnFocus.focus();});
 dialog.addEventListener('click',function(e){if(e.target===dialog){var r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 var touchStart=null;photo.addEventListener('touchstart',function(e){if(e.touches.length===1)touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY};else touchStart=null;},{passive:true});photo.addEventListener('touchend',function(e){if(!touchStart||!e.changedTouches.length)return;var dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)show(index+(dx<0?1:-1));},{passive:true});
 dialog.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){e.preventDefault();show(index-1);}if(e.key==='ArrowRight'){e.preventDefault();show(index+1);}});
 document.addEventListener('keydown',function(e){if(!dialog.open&&(e.key==='Enter'||e.key===' ')&&e.target.matches('.offer-gallery-main')){e.preventDefault();e.stopPropagation();openMain(e.target);}},true);
})();

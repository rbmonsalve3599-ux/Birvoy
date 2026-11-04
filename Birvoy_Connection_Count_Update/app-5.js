/* Use one neutral artwork for each navigation bar, then mark only the active tab. */
(function(){
 var neutral='/assets/6aaba537a36db2541a976352.svg';
 var bars=document.querySelectorAll('#hnav,#tnav,#rnav,#banav,#cnav,.mynav,#mknav,.fxnavimg');
 bars.forEach(function(bar){
  var img=bar.querySelector('img');
  if(!img){img=document.createElement('img');img.alt='';img.draggable=false;bar.prepend(img)}
  img.src=neutral;img.classList.add('nav-shared-art');
  var selected=bar.id==='banav'?1:bar.id==='cnav'?3:bar.classList.contains('mynav')?4:bar.id==='mknav'||bar.classList.contains('fxnavimg')?2:0;
  var mark=bar.querySelector('.navhl');if(!mark){mark=document.createElement('i');mark.className='navhl';mark.setAttribute('aria-hidden','true');bar.appendChild(mark)}
  var offsets=[0,86,170,246,316],widths=[86,84,76,70,86];mark.style.left=offsets[selected]+'px';mark.style.width=widths[selected]+'px';
  bar.querySelectorAll('button[aria-label]').forEach(function(button,i){if(i===selected)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current')});
 });
})();

(function(){
var M={"laugh": "/assets/dd7bfdd6155184c8472c1d4b.webp", "proud": "/assets/3a36f2f4bbd6c892a5c3fea9.webp", "sad": "/assets/3a7d34b7b51e27c579d8452f.webp", "searching": "/assets/c97c7c3b79a02104591f236c.webp", "shocked": "/assets/e03e5b487f47178ef1aa9166.webp", "thinking": "/assets/a817db00b6062215a4f394a0.webp", "wink": "/assets/d8f91f731a70f3043e7378c8.webp", "main": "/assets/1eeff48cf82cbd4c8b3b81dd.webp", "angry": "/assets/8562357457dd526cd936d325.webp", "closed": "/assets/6b250e672e9664bb10cd1510.webp", "delivering": "/assets/66c41b5cfea73ff293ff4f09.webp"};
/* screen/state -> mascot. Create flows (+ Create, wizards, live screens) are deliberately not listed. */
var SWAP=[
 ['#s-activity .baview[data-s=loading] .hd img','searching'],
 ['#s-activity .baview[data-s=feed] .hd img','delivering'],
 ['#s-activity .baview[data-s=empty] .hd img','delivering'],
 ['#s-activity .baview[data-s=empty] .ctr img','closed'],
 ['#s-activity .baview[data-s=error] .hd img','delivering'],
 ['#s-activity .baview[data-s=error] .ctr img','shocked'],
 ['#s-chats .chview[data-s=list] .hd img','wink'],
 ['#chemptyimg','thinking'],
 ['#s-results .rnone img','sad']
];
function put(i,k){var u=M[k];if(i.getAttribute('src')!==u){i.setAttribute('src',u)}i.classList.add('mx')}
function ins(host,after,k){var c=host.querySelector('.mxins');
 if(!k){if(c)c.remove();return}
 if(!c){c=document.createElement('img');c.className='mx mxhero mxins';c.alt='';c.draggable=false;(after||host).insertAdjacentElement(after?'afterend':'afterbegin',c)}
 put(c,k)}
function sync(){raf=0;
 SWAP.forEach(function(r){document.querySelectorAll(r[0]).forEach(function(i){put(i,r[1])})});
 var rs=document.querySelector('#s-reqsent .body');if(rs){var cw=rs.querySelector('.checkwrap');ins(rs,null,'delivering');if(cw&&rs.firstChild!==rs.querySelector('.mxins'))rs.insertBefore(rs.querySelector('.mxins'),rs.firstChild)}
 var ph=document.querySelector('#myb-myph');if(ph){var tx=ph.textContent||'',k=/whole account/.test(tx)?'sad':/PROMOTION (RESULTS|SETUP)/.test(tx)?'proud':null,hd=ph.querySelector('.hd');if(hd)ins(ph,hd,k)}}
var raf=0;new MutationObserver(function(){if(!raf)raf=requestAnimationFrame(sync)}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','data-s']});
sync();setTimeout(sync,800);
})();
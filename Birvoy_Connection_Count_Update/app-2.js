
(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var wrap=$("#wrap"),snd=$("#snd"),muted=false,cur="splash",timers=[],lang="en";
function fit(){var s=Math.min(innerWidth/402,innerHeight/874);if(innerWidth>=520)s=Math.min(s*.96,1.25);wrap.style.transform="scale("+s+")";wrap.style.margin="0 "+(-(402*(1-s))/2)+"px";wrap.style.marginTop=wrap.style.marginBottom=(-(874*(1-s))/2)+"px"}
addEventListener("resize",fit);fit();
function mkPlay(){var m=$("#s-mk");m.classList.remove("play");void m.getBoundingClientRect();m.classList.add("play")}
var BAMODE="feed",bt;function baShow(s){snrSync();$$("#s-activity .baview").forEach(function(v){v.classList.toggle("on",v.getAttribute("data-s")==s)});var b=$("#s-activity .baview.on");if(b)b.scrollTop=0}function baLoad(){clearTimeout(bt);baShow("loading");bt=setTimeout(function(){baShow(BAMODE)},900)}
var CHMODE="list",qt,chPick=null;var CHTAB="msg";
function chTabs(){var v=$("#s-chats .chview[data-s=list]");if(!v)return;v.setAttribute("data-tab",CHTAB);$$("#s-chats .chtabs button").forEach(function(b){var on=b.getAttribute("data-p")==CHTAB;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
 var n=$$("#s-chats .reqcard:not(.sentcard)").length,u=0;$$("#s-chats #chRecent .badge2").forEach(function(x){u+=+x.textContent||0});
 var a=$("#chTabReq"),c=$("#chTabMsg");if(a){a.textContent=n;a.classList.toggle("z",!n)}if(c){c.textContent=u;c.classList.toggle("z",!u)}}
function chShow(){chTabs();$$("#s-chats .chview").forEach(function(v){v.classList.toggle("on",v.getAttribute("data-s")==CHMODE)});var b=$("#s-chats .chview.on");if(b)b.scrollTop=0;chSheet(false);var dp=CHMODE=="thread"||CHMODE=="sreq";$("#s-chats").classList.toggle("deep",dp);document.body.classList.toggle("chdeep",dp)}function chSheet(on){var z=$("#chz");if(z)z.classList.toggle("on",on);var y=$("#chz2");if(y&&!on)y.classList.remove("on")}function chTidy(){chTabs();var n=$$("#s-chats .reqcard:not(.sentcard)").length;var h=$("#s-chats [data-h=req]"),t=$("#s-chats [data-h=note]");if(h)h.style.display=n?"":"none";if(t)t.style.display=n?"":"none"}
var splashExitTimer=null,splashExitListener=null;
function stopSplashSound(){clearTimeout(splashExitTimer);splashExitTimer=null;if(splashExitListener){snd.removeEventListener('ended',splashExitListener);splashExitListener=null}try{snd.pause();snd.currentTime=0}catch(e){}}
snd.addEventListener('play',function(){if(cur!=='splash')stopSplashSound()});
var rt;function go(id){if(id==cur)return;if(cur==='splash'&&id!=='splash'&&!muted&&!snd.paused&&!snd.ended){if(!splashExitListener){splashExitListener=function(){stopSplashSound();if(cur==='splash')go(id)};snd.addEventListener('ended',splashExitListener,{once:true});splashExitTimer=setTimeout(splashExitListener,4000)}return}if(cur==='splash'&&id!=='splash')stopSplashSound();clearTimeout(rt);clearTimeout(qt);var a=$("#s-"+cur),b=$("#s-"+id);cur=id;a.classList.remove("on");b.classList.add("on");if(id=="home"&&a.id!="s-type"&&a.id!="s-search")homeReset();if(id=="type")typeOpen();if(id=="search")searchOpen();if(id=="mk")mkPlay();if(a.id=="s-search")searchClose();if(id=="activity")baLoad();if(id=="notif")ntRender();if(id=="chats")chShow();if(/^my/.test(id))myShow(id);if(id=="reqsent")qt=setTimeout(function(){if(cur=="reqsent")reqDone()},2800);if(id=="results"){var rs=$("#rscroll");if(rs)rs.scrollTop=0}
 if(id=="mobile"){setTimeout(function(){var i=$(".otpin",b);if(i)i.focus({preventScroll:true})},450)}}
var tt;function toast(t){var e=$("#toast");e.textContent=t;e.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){e.classList.remove("show")},2200)}
/* splash: fade-in logo with sound, then fade out to language */
function clear(){timers.forEach(clearTimeout);timers=[]}
function playSplash(playing){clear();var s=$("#s-splash");s.classList.remove("go");void s.offsetWidth;
 if(!playing){snd.currentTime=0;if(!muted){var p=snd.play();if(p&&p.catch)p.catch(function(){soundBlocked()})}}
 s.classList.add("go");timers.push(setTimeout(function(){go(bvStartScreen())},2900))}
var started=false;
function soundBlocked(){var b=$("#start");if(cur!="splash"||!b)return;b.textContent="Tap for sound";b.classList.add("need");function f(){document.removeEventListener("pointerdown",f,true);document.removeEventListener("keydown",f,true);b.classList.remove("need");if(cur=="splash"&&!muted){snd.currentTime=0;var q=snd.play();if(q&&q.catch)q.catch(function(){})}}document.addEventListener("pointerdown",f,true);document.addEventListener("keydown",f,true)}
function begin(playing){if(started)return;started=true;playSplash(playing)}
$("#start").addEventListener("click",function(e){e.stopPropagation();begin(false)});
document.addEventListener("pointerdown",function f(){if(!started){begin(false)}document.removeEventListener("pointerdown",f)},{once:false});
(function auto(){begin(false)})();
/* language */
function setLang(l){lang=l;$("#lang-en").classList.toggle("sel",l=="en");$("#lang-ar").classList.toggle("sel",l=="ar")}
/* checkboxes */
function chk(i){var b=$$(".chk")[i];b.setAttribute("aria-checked",b.getAttribute("aria-checked")!="true")}
/* otp */
function otpInit(root){var inp=$(".otpin",root),boxes=$$(".box",root);
 function draw(){var v=inp.value;boxes.forEach(function(b,i){var d=v[i]||"";$("b",b).textContent=d;b.classList.toggle("f",!!d)})}
 inp.addEventListener("input",function(){inp.value=inp.value.replace(/\D/g,"").slice(0,6);draw()});
 root._set=function(v){inp.value=v;draw()};root._val=function(){return inp.value};root._inp=inp}
$$(".otp").forEach(otpInit);
function verify(id,next){var root=$("#s-"+id+" .otp"),v=root._val();
 if(v.length==6){go(next);return}
 var code="123456",i=v.length;(function step(){if(i<6){root._set(code.slice(0,++i));setTimeout(step,70)}else setTimeout(function(){go(next)},450)})()}
function reset(){fxReset();$$(".otp").forEach(function(r){r._set("")});$$(".fld").forEach(function(f){f.value=""});$$(".chk").forEach(function(c){c.setAttribute("aria-checked","false")});setLang("en");homeReset();$("#need").value="";needSync();setNear("n");searchClose()}
var acts={
 lang_en:function(){setLang("en")},lang_ar:function(){setLang("ar")},lang_next:function(){go("welcome")},
 create:function(){go("create")},login:function(){go("login");setTimeout(function(){$("#li-id").focus({preventScroll:true})},450)},login_go:function(){go("home")},forgot:function(){toast("Forgot password isn\u2019t part of this flow")},
 chk:function(e){chk(+e.getAttribute("data-i"))},submit:function(){go("mobile")},social:function(){go("allset")},
 ver_m:function(){verify("mobile","allset")},
 chg_m:function(){go("create");setTimeout(function(){$("#f-id").focus()},450)},
 fin:function(){go("home")},open_chats:function(){go("chats")},ch_top:function(){var b=$("#s-chats .chview.on");if(b)b.scrollTo?b.scrollTo({top:0,behavior:"smooth"}):b.scrollTop=0},ch_accept:function(e){var c=e.closest(".reqcard");if(!c)return;var im=c.querySelector(".ph"),nm=c.querySelector(".nm"),cx=c.querySelector(".rctx"),ls=$("#s-chats .list");if(ls){var r=document.createElement("div");r.className="chatrow";r.setAttribute("data-act","soon");r.setAttribute("data-msg","Chat conversation");r.innerHTML='<img class="ph" src="'+im.src+'" alt=""'+(im.getAttribute("style")?' style="'+im.getAttribute("style")+'"':"")+'><div class="grow"><div class="nm">'+nm.textContent+'</div><div class="rctx">'+cx.textContent+'</div><div class="last">You accepted. Say hello.</div></div><div class="right"><div class="time">Now</div></div>';ls.insertBefore(r,ls.firstChild)}c.parentNode.removeChild(c);chTidy();toast("Request accepted")},ch_na:function(e){chPick=e.closest(".reqcard");chSheet(true)},ch_reason:function(e){$$("#chz .rchip").forEach(function(c){c.classList.toggle("on",c===e)})},ch_na_done:function(){if(chPick&&chPick.parentNode)chPick.parentNode.removeChild(chPick);chPick=null;chSheet(false);chTidy();toast("Request declined")},req_send:function(){var rc=$("#rc");if(rc)rc.classList.add("sent");go("reqsent")},req_done:function(){reqDone()},open_act:function(){go("activity")},ba_try:function(){baLoad()},ba_open:function(e){var c=e.closest(".ev");if(c)c.classList.add("read");toast(e.getAttribute("data-msg")+" isn\u2019t part of this flow")},ba_go:function(e){var c=e.closest(".ev");if(c)c.classList.add("read");var t=e.getAttribute("data-to");if(t=="search")acts.ask();else go(t)},pill:function(e){setNear(e.getAttribute("data-v"))},open_type:function(){go("type")},ask:function(){var rc=$("#rc");if(rc)rc.classList.remove("sent");go("search");rt=setTimeout(function(){if(cur=="search")go("results")},4500)},close_search:function(){go("home")},open_mk:function(){go("mk")},close_mk:function(){go("home")},mk_replay:function(){mkPlay()},close_type:function(){go("home")},
 soon:function(e){toast(e.getAttribute("data-msg")+" isn\u2019t part of this flow")},
 home_tab:function(){var s=$("#hs");s.scrollTo?s.scrollTo({top:0,behavior:"smooth"}):s.scrollTop=0}};

/* ===== section 5: chat thread, messaging, sent requests, end connection ===== */
var origin="chats",chCur=null,srCur=null,srTarget=null,accN=0,srN=3,reqBack="home",TODAY="22 Oct";
var TH={};
var SR={};
var SRO=[];
var I={
 back:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
 more:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>',
 send:'<svg viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
 lang:'<svg viewBox="0 0 24 24"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>',
 end:'<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M17 8l5 5M22 8l-5 5"/></svg>',
 clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
 slash:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>',
 glass:'<svg viewBox="0 0 24 24"><path d="M6 3h12M6 21h12M7 3v4l5 5-5 5v4M17 3v4l-5 5 5 5v4"/></svg>'
};
function esc(x){return String(x).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ini(n){return n.charAt(0).toUpperCase()}
function sheet(h){var z=$("#chz2");z.innerHTML='<div class="scrim3" data-act="sh_close"></div><div class="sheet3">'+h+'</div>';z.classList.add("on")}
function shClose(){var z=$("#chz2");if(z)z.classList.remove("on")}
function shBtns(p,q){return'<button type="button" class="pri'+(p[2]?" "+p[2]:"")+'" data-act="'+p[1]+'">'+p[0]+'</button><button type="button" class="sec" data-act="'+q[1]+'">'+q[0]+'</button>'}
function avHTML(id){var p=$('#s-chats .chatrow[data-t="'+id+'"] .ph');if(p&&p.tagName=="IMG")return'<img class="thph" src="'+p.getAttribute("src")+'" alt=""'+(p.getAttribute("style")?' style="'+p.getAttribute("style")+'"':"")+'>';return'<div class="av thph">'+esc(ini(TH[id].name))+'</div>'}
function mark(e){var c=e.closest(".ev");if(c)c.classList.add("read")}
function reqName(n){var e=$("#rsname");if(e)e.textContent=n}
function reqDone(){var b=reqBack;reqBack="home";if(b=="chats"){CHMODE="list";go("chats");chShow()}else if(S6ID.test(b)){s6render(b);go(b)}else if(/^my(bview|pview|odet|ndet)$/.test(b))go(b);else go("home")}
function leave(){var o=origin;if(chCur)rowUp(chCur);CHMODE="list";chShow();if(o=="activity"||o=="notif")go(o)}

/* list rows */
function rowUp(id,full){var th=TH[id],r=$('#s-chats .chatrow[data-t="'+id+'"]');if(!r)return;var l=r.querySelector(".last"),rt=r.querySelector(".right");
 if(th.state=="ended"){l.textContent="Connection ended";rt.innerHTML='<div class="endtag">Ended</div>';return}
 if(full){var lm=null;for(var i=th.msgs.length-1;i>=0;i--){if(th.msgs[i].w){lm=th.msgs[i];break}}
  if(lm){l.textContent=(lm.w=="me"?"You: ":"")+(lm.ar?lm.tr:lm.t);var t=rt.querySelector(".time");if(t)t.textContent=lm.tm}}
 var b=rt.querySelector(".badge2");if(b)b.parentNode.removeChild(b);
 if(th.unread>0){b=document.createElement("div");b.className="badge2";b.textContent=th.unread;rt.appendChild(b)}chTabs()}
function moveEnded(id){var r=$('#s-chats .chatrow[data-t="'+id+'"]'),e=$("#chEnded");if(!r)return;r.classList.add("ended");e.appendChild(r);$$('#s-chats [data-h=ended]').forEach(function(n){n.style.display=""})}

/* thread view */
function renderHead(){var th=TH[chCur],ended=th.state=="ended";
 $("#thHead").innerHTML='<button type="button" class="thbtn" data-act="th_back" aria-label="Back">'+I.back+'</button>'+avHTML(chCur)+'<div class="thtx"><div class="thn">'+esc(th.name)+'</div><div class="ths">'+esc(th.kind)+(ended?" \u00b7 Ended":"")+'</div></div>'+(ended?'<span class="thbtn"></span>':'<button type="button" class="thbtn ring" data-act="th_more" aria-label="Chat options">'+I.more+'</button>');
 $("#thAbout").textContent=th.about;var ctx=$("#thAbout");if(th.sourceTitle&&th.sourceTitle!==th.about){var source=document.createElement("div");source.className="thsource";source.textContent=th.sourceTitle;ctx.appendChild(source)}}
function renderMsgs(bottom){var th=TH[chCur],el=$("#thMsgs"),st=el.scrollTop,h="",prev=null,real=0;
 th.msgs.forEach(function(m,i){
  if(m.d||m.s){h+=m.d?'<div class="thsys">'+esc(m.d)+'</div>':'<div class="thsys b">'+esc(m.s)+'</div>';prev=null;return}
  real++;var me=m.w=="me",nx=th.msgs[i+1],last=!(nx&&nx.w==m.w),tr=m.ar&&(th.auto?!m.orig:!!m.show);
  h+='<div class="thm'+(me?" me":"")+(prev&&prev!=m.w?" gap":"")+'"><div class="thb">'+(m.ar?(tr?esc(m.tr)+'<div class="thtr">Translated from Arabic</div>':'<span class="rtl" dir="rtl">'+esc(m.t)+'</span>'):esc(m.t))+'</div>';
  if(last||m.ar||m.delivery)h+='<div class="thmeta"><span>'+esc(m.tm)+'</span>'+(m.delivery==='pending'?' · Sending…':m.delivery==='failed'?' · Delivery unconfirmed <button type="button" class="thlk" data-act="prod_retry_message" data-id="'+esc(m.id)+'">Retry</button>':m.delivery==='sent'?' · Sent':'')+(m.ar?'<button type="button" class="thlk" data-act="th_tr" data-i="'+i+'">'+(tr?"Show original":"Translate")+'</button>':"")+'</div>';
  h+='</div>';prev=m.w});
 if(!real&&th.state!="ended")h+='<div class="thsys">Say hello to start the conversation.</div>';
 el.innerHTML=h;el.scrollTop=bottom?el.scrollHeight:st}
function renderFoot(){var th=TH[chCur],f=$("#thFoot");
 if(th.state=="ended"){var r=th.recon&&SR[th.recon],other=Object.keys(TH).find(function(id){var x=TH[id];return id!==chCur&&x.state==='active'&&x.sourceId&&x.sourceId===th.sourceId&&x.peer&&th.peer&&x.peer.uid===th.peer.uid});if(other){f.innerHTML='<div class="thend"><p>This conversation has ended. A newer connection is active.</p><button type="button" class="cta" data-act="prod_open_thread" data-id="'+esc(other)+'">Open new chat</button></div>';return}
  f.innerHTML=r?'<div class="thend"><p>Reconnect request sent. '+esc(th.name)+' has 24 hours to respond.</p><button type="button" class="cta ghost" data-act="sr_cancel" data-r="'+r.id+'">Cancel Request</button></div>':'<div class="thend"><p>This connection has ended. You can read the conversation, but you can\u2019t send new messages.</p><button type="button" class="cta" data-act="th_recon">Reconnect</button></div>';return}
 f.innerHTML='<div class="thcomp"><input id="thIn" class="thin" type="text" placeholder="Message" autocomplete="off" enterkeyhint="send" aria-label="Message"><button id="thSend" type="button" class="thsend off" data-act="th_send" aria-label="Send">'+I.send+'</button></div>'}
function openThread(id){var th=TH[id];if(!th)return;origin=(cur=="activity"||cur=="notif")?cur:"chats";chCur=id;th.unread=0;CHMODE="thread";
 renderHead();renderFoot();if(cur!="chats")go("chats");else chShow();renderMsgs(true);rowUp(id)}
function thSend(){var th=TH[chCur],i=$("#thIn");if(!th||th.state=="ended"||!i)return;var v=i.value.trim();if(!v)return;
 var ld=null;th.msgs.forEach(function(m){if(m.d)ld=m.d});if(ld!="Today")th.msgs.push({d:"Today"});
 th.msgs.push({w:"me",t:v,tm:"9:41 AM"});i.value="";$("#thSend").classList.add("off");renderMsgs(true);rowUp(chCur,true);
 var r=$('#s-chats .chatrow[data-t="'+chCur+'"]');if(r&&r.parentNode.id=="chRecent")r.parentNode.insertBefore(r,r.parentNode.firstChild)}

/* sent requests */
function sentCard(r){var title=r.sourceTitle||r.about||r.name,photo=r.sourcePhoto;return'<div class="reqcard sentcard" data-act="sr_open" data-r="'+esc(r.id)+'"><div class="top">'+(photo?'<img class="ph" src="'+esc(photo)+'" alt="">':'<div class="av">'+esc(ini(title))+'</div>')+'<div class="grow"><div class="tag">'+esc(r.kind)+'</div><div class="nm">'+esc(title)+'</div>'+(r.name&&r.name!==title?'<div class="rctx">From '+esc(r.name)+'</div>':'')+(r.ctx&&r.ctx!==title?'<div class="rctx">'+esc(r.ctx)+'</div>':'')+'<div class="rctx mute">Closes in '+esc(r.left)+'</div></div><span class="timeleft">Pending</span></div><div class="btns3"><button type="button" class="na" data-act="sr_cancel">Cancel Request</button></div></div>'}
function sentRender(){var h="",n=0;SRO.forEach(function(id){var r=SR[id];if(r&&r.state=="pending"){n++;h+=sentCard(r)}});$("#chSent").innerHTML=h;var t=$("#s-chats [data-h=sent]");if(t)t.style.display=n?"":"none"}
function addSent(o){var k;SRO.forEach(function(id){var r=SR[id];if(r&&r.state=="pending"&&r.name==o.name&&r.about==o.about)k=r});if(k)return k;
 var id="s"+(++srN);k=SR[id]={id:id,name:o.name,kind:o.kind,about:o.about,ctx:o.ctx,state:"pending",left:"24h",sent:"Today, 9:41 AM",closes:"Tomorrow, 9:41 AM"};SRO.unshift(id);sentRender();return k}
function renderSR(){var r=SR[srCur],st=r.state,cls={pending:"p",declined:"g",expired:"g"}[st],ico={pending:I.clock,declined:I.slash,expired:I.glass}[st],
 ttl={pending:"Waiting for a response",declined:"Not available right now",expired:"Request expired"}[st],
 txt={pending:"Track it in Chats under Sent Requests. We\u2019ll notify you when "+esc(r.name)+" responds. Requests close after 24 hours.",declined:esc(r.name)+" can\u2019t connect about this right now. Your request is closed.",expired:esc(r.name)+" didn\u2019t respond within 24 hours, so the request closed automatically."}[st],
 chip={pending:'<span class="timeleft">Pending</span>',declined:'<span class="chipg">Not available</span>',expired:'<span class="chipg">Expired</span>'}[st];
 $("#srHead").innerHTML='<div class="thh c"><button type="button" class="thbtn" data-act="sr_back" aria-label="Back">'+I.back+'</button><div class="thtx"><div class="thn">Request Status</div></div><span class="thbtn"></span></div>';
 var h='<div class="srhero"><div class="srico '+cls+'">'+ico+'</div><h3>'+ttl+'</h3><p>'+txt+'</p></div>';
 h+='<div class="reqcard"><div class="top">'+(r.sourcePhoto?'<img class="ph" src="'+esc(r.sourcePhoto)+'" alt="">':'<div class="av">'+esc(ini(r.name))+'</div>')+'<div class="grow"><div class="tag">'+esc(r.kind)+'</div><div class="nm">'+esc(r.name)+'</div><div class="rctx">'+(r.sourceTitle&&r.sourceTitle!==r.ctx?'<b>'+esc(r.sourceTitle)+'</b><br>':'')+esc(r.ctx)+'</div></div>'+chip+'</div></div>';
 h+='<div class="list srlist"><div><span>Sent</span><em>'+esc(r.sent)+'</em></div><div><span>'+(st=="pending"?"Closes":st=="declined"?"Declined":"Expired")+'</span><em>'+esc(st=="pending"?r.closes:r.closed)+'</em></div></div>';
 if(st=="declined")h+='<div class="info">'+(r.reason?'Reason shared: <b>'+esc(r.reason)+'</b>':'They didn\u2019t share a reason.')+'</div>';
 h+='<div class="srcta">'+(st=="pending"?'<button type="button" class="cta ghost" data-act="sr_cancel" data-r="'+r.id+'">Cancel Request</button>':'<button type="button" class="cta" data-act="sr_find">Find Other Matches</button>'+(st=="expired"?'<button type="button" class="cta ghost" data-act="sr_again">Send Again</button>':""))+'</div>';
 $("#srBody").innerHTML=h}
function srOpen(id){if(!SR[id])return;origin=(cur=="activity"||cur=="notif")?cur:"chats";srCur=id;CHMODE="sreq";renderSR();if(cur!="chats")go("chats");else chShow()}

Object.assign(acts,{
 ch_tab:function(e){CHTAB=e.getAttribute("data-p");chTabs();var b=$("#s-chats .chview.on");if(b)b.scrollTop=0},
 ch_open:function(e){openThread(e.getAttribute("data-t"))},
 ba_chat:function(e){mark(e);openThread(e.getAttribute("data-t"))},
 ba_sr:function(e){mark(e);srOpen(e.getAttribute("data-r"))},
 th_back:function(){leave()},sr_back:function(){leave()},sh_close:function(){shClose()},
 th_send:function(){thSend()},
 th_tr:function(e){var th=TH[chCur],m=th.msgs[+e.getAttribute("data-i")];if(th.auto)m.orig=!m.orig;else m.show=!m.show;renderMsgs()},
 th_more:function(){var th=TH[chCur];sheet('<h3>Chat options</h3><div class="shrows"><button type="button" class="shrow" role="switch" aria-checked="'+!!th.auto+'" data-act="th_auto"><div class="ic">'+I.lang+'</div><div class="grow"><div class="t">Auto-translate messages</div><div class="s">Show messages in other languages in English</div></div><div class="tg'+(th.auto?" on":"")+'"></div></button><button type="button" class="shrow d" data-act="th_end"><div class="ic">'+I.end+'</div><div class="grow"><div class="t">End connection</div></div></button></div><button type="button" class="sec" data-act="sh_close">Close</button>')},
 th_auto:function(e){var th=TH[chCur];th.auto=!th.auto;th.msgs.forEach(function(m){delete m.orig;delete m.show});var g=e.querySelector(".tg");if(g)g.classList.toggle("on",th.auto);e.setAttribute("aria-checked",!!th.auto);renderMsgs()},
 th_end:function(){var th=TH[chCur];sheet('<h3>End connection with '+esc(th.name)+'?</h3><p>You won\u2019t be able to send new messages. The conversation stays in your history, and you can send a new request to reconnect later.</p>'+shBtns(["End Connection","th_end_go","red"],["Keep Connection","sh_close"]))},
 th_end_go:function(){var th=TH[chCur];th.state="ended";th.msgs.push({s:"You ended this connection \u00b7 "+TODAY});shClose();renderHead();renderFoot();renderMsgs(true);rowUp(chCur);moveEnded(chCur)},
 th_recon:function(){var th=TH[chCur];sheet('<h3>Reconnect with '+esc(th.name)+'?</h3><p>We\u2019ll send a new connection request about '+esc(th.about)+'. They have 24 hours to respond, and a new chat will start if they accept. Your earlier conversation will remain available.</p>'+shBtns(["Send Request","th_recon_go"],["Not Now","sh_close"]))},
 th_recon_go:function(){var th=TH[chCur];shClose();var r=addSent({name:th.name,kind:th.kind,about:th.about,ctx:"Reconnecting about "+th.about});th.recon=r.id;reqName(th.name);reqBack="chats";go("reqsent")},
 sr_open:function(e){srOpen(e.getAttribute("data-r"))},
 sr_cancel:function(e){var c=e.closest("[data-r]");srTarget=c?c.getAttribute("data-r"):srCur;var r=SR[srTarget];if(!r)return;sheet('<h3>Cancel this request?</h3><p>'+esc(r.name)+' will no longer see your request. You can send a new one any time.</p>'+shBtns(["Cancel Request","sr_cancel_go","red"],["Keep Request","sh_close"]))},
 sr_cancel_go:function(){var r=SR[srTarget];if(!r)return;delete SR[srTarget];SRO=SRO.filter(function(x){return x!=srTarget});Object.keys(TH).forEach(function(k){if(TH[k].recon==srTarget)TH[k].recon=null});
  if(r.name=="Sara Al-Abdullah"){var rc=$("#rc");if(rc)rc.classList.remove("sent")}
  shClose();sentRender();if(CHMODE=="sreq"){leave();toast("Request canceled")}else if(CHMODE=="thread")renderFoot();else toast("Request canceled")},
 sr_find:function(){acts.ask()},
 sr_again:function(){var r=SR[srCur];var n=addSent({name:r.name,kind:r.kind,about:r.about,ctx:r.ctx});reqName(r.name);reqBack="chats";go("reqsent")},
 req_send:function(){var rc=$("#rc");if(rc)rc.classList.add("sent");addSent({name:"Sara Al-Abdullah",kind:"Professional",about:"Interior Design",ctx:"Asking about Interior Design services"});reqName("Sara Al-Abdullah");reqBack="home";go("reqsent")},
 ch_accept:function(e){var c=e.closest(".reqcard");if(!c)return;var im=c.querySelector(".ph"),nm=c.querySelector(".nm").textContent,cx=c.querySelector(".rctx").textContent,tg=c.querySelector(".tag").textContent,id="acc"+(++accN),about=cx.replace(/^(Interested in|Asking about)\s+/i,"");
  TH[id]={name:nm,kind:/Professional/i.test(tg)?"Professional":/Personal/i.test(tg)?"Personal Offer":"Business",about:about,state:"active",unread:0,msgs:[{d:"Today"},{s:"You accepted this request"}]};
  var r=document.createElement("div");r.className="chatrow";r.setAttribute("data-act","ch_open");r.setAttribute("data-t",id);
  r.innerHTML='<img class="ph" src="'+im.getAttribute("src")+'" alt=""'+(im.getAttribute("style")?' style="'+im.getAttribute("style")+'"':"")+'><div class="grow"><div class="nm">'+esc(nm)+'</div><div class="rctx">'+esc(about)+'</div><div class="last">You accepted. Say hello.</div></div><div class="right"><div class="time">Now</div></div>';
  var ls=$("#chRecent");ls.insertBefore(r,ls.firstChild);c.parentNode.removeChild(c);chTidy();toast("Request accepted")}
});
document.addEventListener("input",function(e){if(e.target.id=="thIn"){var b=$("#thSend");if(b)b.classList.toggle("off",!e.target.value.trim())}});
document.addEventListener("keydown",function(e){if(e.target.id=="thIn"&&e.key=="Enter"){e.preventDefault();thSend()}});
sentRender();

/* ===== section 6: notifications, Special Need response, detail screens ===== */
var S6ID=/^(notif|snr|odet|ndet|pdet|pres)$/,S6={st:[]},ODET={mode:"own",sent:0},NDET={sent:0},snrPick=null;
var SNR=[];
var NT=[];
var NI={
 resp:'<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-5.5A8 8 0 1 1 21 12z"/></svg>',
 clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
 bars:'<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
 match:'<svg viewBox="0 0 24 24"><path d="M12 3l2.4 5.6L20 11l-5.6 2.4L12 19l-2.4-5.6L4 11l5.6-2.4z"/></svg>',
 check:'<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>'
};
function s6go(id){if(!S6ID.test(cur))S6.st=[];S6.st.push(cur);s6render(id);go(id)}
function s6back(){go(S6.st.pop()||"home")}
function s6hd(id,t){$("#s-"+id+" .thh").innerHTML='<button type="button" class="thbtn" data-act="s6_back" aria-label="Back">'+I.back+'</button><div class="thtx"><div class="thn">'+esc(t)+'</div></div><span class="thbtn"></span>'}
function s6put(id,b,f){$("#s-"+id+" .s6b").innerHTML=b;$("#s-"+id+" .s6f").innerHTML=f||"";$("#s-"+id+" .s6b").scrollTop=0}
function phSrc(t){var p=$('#s-chats .chatrow[data-t="'+t+'"] .ph');return p&&p.tagName=="IMG"?p.getAttribute("src"):""}
function s6render(id){({notif:ntRender,snr:snrRender,odet:odetRender,ndet:ndetRender,pdet:pdetRender,pres:presRender})[id]()}

/* exact request in Chats */
function chHL(q){CHTAB="req";origin=(cur=="activity"||cur=="notif")?cur:"chats";CHMODE="list";if(cur!="chats")go("chats");else chShow();
 setTimeout(function(){var c=$('#s-chats .reqcard[data-q="'+q+'"]');if(!c){toast("That request was already answered");return}
  c.scrollIntoView({block:"center",behavior:"smooth"});c.classList.add("hl");setTimeout(function(){c.classList.remove("hl")},2600)},480)}

/* notifications */
function ntRender(){snrSync();var n=NT.filter(function(x){return x.u}).length,h='<div class="sech" style="margin-top:0"><span>'+(n?n+" unread":"All caught up")+'</span>'+(n?'<button type="button" class="lnk" data-act="nt_all">Mark all as read</button>':"")+'</div>',open=false;
 NT.forEach(function(x,i){if(x.g){if(open)h+='</div>';h+='<div class="day">'+x.g+'</div><div class="nlist">';open=true}
  h+='<button type="button" class="nrow'+(x.u?"":" rd")+'" data-act="nt_go" data-i="'+i+'"><div class="ni'+(x.ic?" i":"")+'">'+(x.ic?NI[x.ic]:x.av)+'</div><div class="nb"><div class="tag">'+x.tag+'</div><div class="t1">'+esc(x.t)+'</div><div class="s1">'+esc(x.s)+'</div></div><div class="nr"><span>'+x.tm+'</span><i></i></div></button>'});
 if(open)h+='</div>';s6hd("notif","Notifications");s6put("notif",h)}
function ntOpen(a){var p=a.split(":"),k=p[0],v=p[1];
 if(k=="chat")openThread(v);else if(k=="req")chHL(v);else if(k=="sr")srOpen(v);else if(k=="snr")s6go("snr");
 else if(k=="odet"){ODET.mode="own";s6go("odet")}else if(k=="pdet")s6go("pdet");else if(k=="pres")s6go("pres");else if(k=="res")go("results")}

/* Special Need response */
function snrCard(r){var ph=r.th?phSrc(r.th):"",av=ph?'<img class="ph" src="'+ph+'" alt="">':'<div class="av">'+esc(ini(r.name))+'</div>';
 var chip=r.st=="sent"?'<span class="chp a">Pending</span>':'<span class="chp">New</span>';
 return'<div class="rq" data-r="'+r.id+'"><div class="top">'+av+'<div class="grow"><div class="tag">'+esc(r.kind)+' \u00b7 Interior Design</div><div class="nm">'+esc(r.name)+'</div><div class="rctx">\u201c'+esc(r.msg)+'\u201d</div><div class="rctx mute">'+esc(r.meta)+'</div></div>'+chip+'</div>'+
  (r.st=="sent"?'<div class="btns3"><button type="button" class="na" data-act="snr_view" data-r="'+r.id+'">View Request</button></div>':'<div class="btns3"><button type="button" class="acc" data-act="snr_connect" data-r="'+r.id+'">Connect</button><button type="button" class="na" data-act="snr_na" data-r="'+r.id+'">Not Available</button></div>')+'</div>'}
function snrRender(){snrSync();var vis=SNR.filter(function(r){return r.st!="na"}),h='<div class="info"><div class="tag" style="margin:0">Your Special Need</div><div class="q">\u201cI need an interior designer for my new apartment.\u201d</div></div>';
 if(!vis.length)h+='<div class="hero"><div class="ico">'+NI.check+'</div><h3>No responses left</h3><p>You\u2019ve replied to every response. New ones will show up in Bird Activity.</p></div>';
 else{h+='<div class="sech"><h3>Responses</h3><span>'+snrStat().n+' to review'+(snrStat().p?' \u00b7 '+snrStat().p+' pending':"")+'</span></div>';vis.forEach(function(r){h+=snrCard(r)})}
 s6hd("snr","Special Need");s6put("snr",h,vis.length?"":'<button type="button" class="cta ghost" data-act="snr_chats">Open Chats</button>')}
function snrStat(){var n=0,p=0,d=0;SNR.forEach(function(r){if(r.st=="na")d++;else if(r.st=="sent")p++;else n++});return{n:n,p:p,d:d,live:n+p}}
function snrSync(){var s=snrStat(),txt=s.live?s.live+(s.live==1?" response":" responses")+(s.n?" \u00b7 "+s.n+" to review":" \u00b7 all answered"):"No open responses";
 var sub=$("#snrasub");if(sub)sub.textContent="\u201cI need an interior designer for my new apartment.\u201d \u00b7 "+txt;
 var b=$("#snrabtn");if(b){b.textContent=s.n?"Review":"View";var c=b.closest(".ev");if(c)c.classList.toggle("read",!s.n)}
 for(var i=0;i<NT.length;i++)if(NT[i].a=="snr"){NT[i].s=txt;NT[i].u=s.n?1:0}
 if(typeof MY!="undefined"&&MY.needs)MY.needs.forEach(function(x){if(x.id==1){x.r=s.live;if(x.s!="paused")x.s=s.p?"progress":"active"}})}
function snrItem(e){var c=e.closest("[data-r]");for(var i=0;i<SNR.length;i++)if(SNR[i].id==(c?c.getAttribute("data-r"):e.getAttribute("data-r")))return SNR[i]}

/* Offer details */

function offerGallery(o){
 var photos=o.gal&&o.gal.length?o.gal:[o.cv||o.art],label=fxE(o.t);
 return '<section class="offer-gallery" aria-label="'+label+' photos"><div class="offer-gallery-main" role="button" tabindex="0" data-act="offer_photo_open" aria-label="Open photo viewer"><img src="'+photos[0]+'" alt="'+label+' — photo 1"><span class="offer-gallery-count" aria-live="polite">1 / '+photos.length+'</span></div><div class="offer-gallery-thumbs" aria-label="Select photo">'+photos.map(function(p,i){return '<button type="button" data-act="offer_photo" data-index="'+i+'" aria-label="View photo '+(i+1)+' of '+photos.length+'" aria-pressed="'+(i===0?'true':'false')+'"><img src="'+p+'" alt="" loading="lazy"></button>'}).join('')+'</div></section>';
}

function odetRender(){var own=ODET.mode=="own",src=(typeof MYIMG!="undefined"&&MYIMG.apt)||phSrc("apt"),o=flFind(FLO,"o1"),
 IC={pin:'<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',bed:'<path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M7 9V7h4v2"/>',floor:'<path d="M4 20h16M6 20V6h12v14M10 10h4M10 14h4"/>',tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.2"/>',user:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'},
 ic=function(k){return '<span class="od-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+IC[k]+'</svg></span>'},
 cell=function(k,l,v){return '<div class="od-c">'+ic(k)+'<div><small>'+l+'</small><b>'+v+'</b></div></div>'},
 h=offerGallery(o)+'<span class="od-chip">PERSONAL OFFER</span>'+(own?'<span class="chp ok od-act">Active</span>':'')+
  '<h2 class="od-t">'+o.t+'</h2><div class="od-pr"><b>KD 450</b><span>/ month</span></div>';
 if(own)h+='<div class="stats"><div><b>24</b><span>Views</span></div><div><b>1</b><span>Interested</span></div><div><b>1</b><span>Chats</span></div></div>';
 h+='<div class="od-card"><h4>Details</h4><div class="od-grid">'+cell("pin","Location",o.area+", Kuwait")+cell("bed","Bedrooms",o.x[0][1])+cell("floor","Floor",o.x[1][1])+cell("tag",own?"Posted":"Condition",own?"24 Oct":o.c)+'</div></div>'+
  '<h4 class="od-h">Description</h4><p class="od-p">'+o.d+'</p>';
 if(!own)h+='<div class="od-by">'+ic("user")+'<div><small>Posted by</small><b>Birvoy user</b></div><span class="od-ago">'+o.ago+'</span></div>';
 h+='<div class="od-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">'+IC.info+'</svg><span>'+(own?'Birvoy user wants to connect about this offer. Requests close after 24 hours.':'Send a connection request. The owner has 24 hours to respond.')+'</span></div>';
 s6hd("odet","Offer Details");
 s6put("odet",h,own?'<button type="button" class="cta" data-act="od_req">See Request</button><button type="button" class="cta ghost" data-act="od_my">Manage in My Offers</button>':(ODET.sent?'<button type="button" class="cta off">Request Pending</button>':'<button type="button" class="cta" data-act="od_connect">Connect</button>'))}

/* Need details */
function ndetRender(){var h='<div class="rq"><div class="top"><div class="av">B</div><div class="grow"><div class="tag">Community Need</div><div class="nm">Birvoy User 001</div></div></div></div>'+
 '<div class="sech" style="margin-top:4px"><h3>Looking for a used bicycle</h3></div><div class="list"><div><span>Timing</span><em>Need soon</em></div><div><span>Condition</span><em>Good condition</em></div><div><span>Area</span><em>Hawally, Kuwait</em></div></div><div class="info">Connect if you have something that matches. They have 24 hours to respond.</div>';
 s6hd("ndet","Need Details");s6put("ndet",h,NDET.sent?'<button type="button" class="cta off">Request Pending</button>':'<button type="button" class="cta" data-act="nd_connect">Connect</button>')}

/* Promotion details + results */
function bizAv(){var p=phSrc("kms");return p?'<img class="ph" src="'+p+'" alt="">':'<div class="av">K</div>'}
function pdetRender(){var h='<div class="rq"><div class="top">'+bizAv()+'<div class="grow"><div class="tag">Business Page</div><div class="nm">Kuwait Motor Spot</div><div class="rctx">Engine Repair \u00b7 Volkswagen \u00b7 Audi</div></div><span class="chp ok">Active</span></div></div>'+
 '<div class="stats"><div><b>13</b><span>Days left</span></div><div><b>3</b><span>Page Views</span></div><div><b>1</b><span>Requests</span></div></div>'+
 '<div class="list"><div><span>Plan</span><em>14 days</em></div><div><span>Cost</span><em>FREE \u00b7 KD 0</em></div><div><span>Started</span><em>Yesterday, 6:40 PM</em></div><div><span>Ends</span><em>4 Nov</em></div></div>';
 s6hd("pdet","Promotion");s6put("pdet",h,'<button type="button" class="cta" data-act="pd_res">View Results</button><button type="button" class="cta ghost" data-act="pd_manage">Manage Promotion</button>')}
function presRender(){var h='<div class="rq"><div class="top">'+bizAv()+'<div class="grow"><div class="tag">Business Page</div><div class="nm">Kuwait Motor Spot</div><div class="rctx">14-day promotion \u00b7 13 days left</div></div></div></div>'+
 '<div class="stats"><div><b>3</b><span>Page Views</span></div><div><b>1</b><span>Connection Requests</span></div><div><b>13</b><span>Days left</span></div></div>'+
 '<div class="sech" style="margin-top:4px"><h3>New activity</h3></div><div class="list"><div><span>Page Views</span><em>+3</em></div><div><span>Connection Requests</span><em>+1</em></div></div>'+
 '<div class="info">1 person wants to connect about Kuwait Motor Spot. Requests close after 24 hours.</div>';
 s6hd("pres","Promotion Results");s6put("pres",h,'<button type="button" class="cta" data-act="pr_req">See Request</button><button type="button" class="cta ghost" data-act="pr_back">Back to Promotion</button>')}

function snrSheet(h){var z=$("#snrz");z.innerHTML='<div class="scrim3" data-act="snr_close"></div><div class="sheet3">'+h+'</div>';z.classList.add("on")}
Object.assign(acts,{
 s6_back:function(){s6back()},
 open_notif:function(){S6.st=[];s6go("notif")},
 nt_go:function(e){var x=NT[+e.getAttribute("data-i")];x.u=0;ntOpen(x.a)},
 nt_all:function(){NT.forEach(function(x){x.u=0});ntRender()},
 ba_snr:function(e){mark(e);s6go("snr")},
 ba_odet:function(e){mark(e);ODET.mode="own";s6go("odet")},
 ba_pdet:function(e){mark(e);s6go("pdet")},
 ba_pres:function(e){mark(e);s6go("pres")},
 home_offer:function(){ODET.mode="browse";s6go("odet")},
 home_need:function(){s6go("ndet")},
 snr_connect:function(e){var r=snrItem(e);if(!r)return;var q=addSent({name:r.name,kind:r.kind,about:"Interior Design",ctx:"Responded to your Special Need"});r.st="sent";r.req=q.id;snrSync();reqName(r.name);reqBack="snr";go("reqsent")},
 snr_view:function(e){var r=snrItem(e);if(r&&r.req)srOpen(r.req)},
 snr_na:function(e){snrPick=snrItem(e);if(!snrPick)return;snrSheet('<h3>Not Available</h3><p>Let them know why, if you\u2019d like. This is optional and helps improve matching.</p><div class="rchips"><span class="rchip on" data-act="snr_reason">Not the right fit</span><span class="rchip" data-act="snr_reason">Too far</span><span class="rchip" data-act="snr_reason">Schedule conflict</span><span class="rchip" data-act="snr_reason">Already sorted</span><span class="rchip" data-act="snr_reason">Other</span></div><button type="button" class="pri" data-act="snr_na_done">Send</button><button type="button" class="sec" data-act="snr_na_done">Skip</button>')},
 snr_reason:function(e){$$("#snrz .rchip").forEach(function(c){c.classList.toggle("on",c===e)})},
 snr_na_done:function(){if(snrPick)snrPick.st="na";snrPick=null;$("#snrz").classList.remove("on");snrRender();toast("Marked as not available")},
 snr_close:function(){$("#snrz").classList.remove("on")},
 snr_chats:function(){CHMODE="list";origin="chats";go("chats");chShow()},
 od_req:function(){chHL("q_apt")},
 od_my:function(){go("myoffers")},
 od_connect:function(){addSent({name:"Birvoy user",kind:"Personal Offer",about:"2-Bedroom Apartment for Rent",ctx:"Interested in 2-Bedroom Apartment for Rent"});ODET.sent=1;reqName("Birvoy user");reqBack="odet";go("reqsent")},
 nd_connect:function(){addSent({name:"Birvoy User 001",kind:"Community Need",about:"Used bicycle",ctx:"Responding to your Need"});NDET.sent=1;reqName("Birvoy User 001");reqBack="ndet";go("reqsent")},
 pd_res:function(){s6go("pres")},
 pd_manage:function(){go("mypromo")},
 pr_req:function(){chHL("q_kms")},
 pr_back:function(){s6back()}
});
document.addEventListener("click",function(e){var t=e.target.closest("[data-act]");if(t&&acts[t.getAttribute("data-act")])acts[t.getAttribute("data-act")](t)});
$$(".fld").forEach(function(f){f.addEventListener("keydown",function(e){if(e.key=="Enter"){e.preventDefault();var g=$$(".fld[data-grp="+f.getAttribute("data-grp")+"]"),i=g.indexOf(f);if(g[i+1])g[i+1].focus();else acts[f.getAttribute("data-submit")]()}})});
$$(".otpin").forEach(function(i){i.addEventListener("keydown",function(e){if(e.key=="Enter")acts.ver_m()})});
$("#t-restart").addEventListener("click",function(){clear();reset();started=false;cur="x";$$(".scr").forEach(function(s){s.classList.remove("on")});cur="splash";$("#s-splash").classList.add("on");$("#s-splash").classList.remove("go");setTimeout(function(){started=true;playSplash(false)},300)});
$("#t-mute").addEventListener("click",function(){muted=!muted;snd.muted=muted;if(sentSound){sentSound.muted=muted;if(muted)sentSound.pause();}if(receivedSound){receivedSound.muted=muted;if(muted)receivedSound.pause();}$("#ic-on").style.display=muted?"none":"";$("#ic-off").style.display=muted?"":"none"});

/* home: blob-backed SVGs, vertical scroll, horizontal featured carousel */
var hs=$("#hs"),tracks=$$("#s-home .htrack"),fidx=0,FW=402,gest=null,sup=false;
(function(){["a","b","c"].forEach(function(k){var el=$("#svg-"+k),u=el.getAttribute("data-src")||"data:image/svg+xml;base64,"+el.textContent.trim();el.textContent="";
 $$('img[data-v="'+k+'"]').forEach(function(i){i.src=u;if(i.decode)i.decode().catch(function(){})})})})();
function scl(){return wrap.getBoundingClientRect().width/402||1}
function fset(i,drag){fidx=Math.max(0,Math.min(1,i));tracks.forEach(function(t){t.classList.toggle("drag",!!drag);t.style.setProperty("--tx",(-fidx*FW)+"px")})}
function setNear(v){$$(".pill").forEach(function(b){var on=b.getAttribute("data-v")==v;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)})}
function homeReset(){gfReset();fset(0,true);hs.scrollTop=0}
hs.addEventListener("pointerdown",function(e){if(e.pointerType=="mouse"&&e.button!==0)return;
 gest={x:e.clientX,y:e.clientY,t:e.timeStamp,ax:null,car:!!e.target.closest("[data-car]"),mouse:e.pointerType=="mouse",id:e.pointerId,base:-fidx*FW,sy:hs.scrollTop,dx:0,tgt:e.target.closest("[data-car]")}});
hs.addEventListener("pointermove",function(e){var g=gest;if(!g||e.pointerId!=g.id)return;var s=scl(),dx=(e.clientX-g.x)/s,dy=(e.clientY-g.y)/s;
 if(g.ax==null){if(Math.abs(dx)<6&&Math.abs(dy)<6)return;g.ax=(g.car&&Math.abs(dx)>Math.abs(dy))?"x":"y";
  if(g.ax=="x"){try{g.tgt.setPointerCapture(e.pointerId)}catch(_){}tracks.forEach(function(t){t.classList.add("drag")})}}
 if(g.ax=="x"){var o=g.base+dx;if(o>0)o*=.35;if(o<-FW)o=-FW+(o+FW)*.35;tracks.forEach(function(t){t.style.setProperty("--tx",o+"px")});g.dx=dx}
 else if(g.mouse){hs.scrollTop=g.sy-dy}});
function gend(e){var g=gest;if(!g||(e.pointerId!=null&&e.pointerId!=g.id))return;gest=null;
 if(g.ax!=null){sup=true;setTimeout(function(){sup=false},0)}
 if(g.ax=="x"){var v=g.dx/Math.max(1,e.timeStamp-g.t),n=fidx;if(g.dx<-50||v<-.4)n=fidx+1;else if(g.dx>50||v>.4)n=fidx-1;fset(n,false)}}
hs.addEventListener("pointerup",gend);hs.addEventListener("pointercancel",gend);
hs.addEventListener("click",function(e){if(sup){e.stopPropagation();e.preventDefault()}},true);
var need=$("#need"),tcount=$("#tcount");
function needSync(){var n=need.value.length;var tc=$("#tclose");tc.classList.toggle("ok",n>0);tc.setAttribute("aria-label",n>0?"Done":"Close");var hn=$("#hnote");hn.classList.toggle("has",n>0);hn.firstChild.textContent=need.value;need.classList.toggle("has",n>0);tcount.classList.toggle("has",n>0);tcount.textContent=n>0?n+"/1000":""}
need.addEventListener("input",needSync);needSync();
function typeOpen(){$("#ts").scrollTop=0;setTimeout(function(){if(cur=="type")need.focus({preventScroll:true})},450)}
$("#ts").addEventListener("click",function(e){var r=$("#tc").getBoundingClientRect(),k=scl(),x=(e.clientX-r.left)/k,y=(e.clientY-r.top)/k;if(x<21||x>381||y<139.5||y>751.5)go("home")});
var APT=null,APR=0,APH=false,apDir=1,AP_MS=4500,hc=$("#hcard");
function apSched(){clearTimeout(APT);APT=setTimeout(apTick,AP_MS)}
function apTick(){if(cur=="home"&&!document.hidden&&!gest&&!APH){var g=$("#gf"),c=fidx==1?2:(g&&g.classList.contains("on")?1:0),n=(c+1)%3;if(g)g.classList.toggle("on",n==1);fset(n==2?1:0,false)}apSched()}
function apPause(hold){APH=true;clearTimeout(APT);clearTimeout(APR);if(!hold)APR=setTimeout(function(){APH=false;apSched()},8000)}
["pointerdown","touchstart","wheel","focusin"].forEach(function(ev){hc.addEventListener(ev,function(){apPause(false)},{passive:true})});
hc.addEventListener("mouseenter",function(){apPause(true)});
hc.addEventListener("mouseleave",function(){clearTimeout(APR);APR=setTimeout(function(){APH=false;apSched()},1500)});
document.addEventListener("keydown",function(e){if(cur=="home"&&(e.key=="ArrowLeft"||e.key=="ArrowRight"))apPause(false)});
if(!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches))apSched();
var wl=0;hs.addEventListener("wheel",function(e){if(!e.target.closest("[data-car]")||Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;e.preventDefault();var n=Date.now();if(n-wl<450)return;if(Math.abs(e.deltaX)>12){wl=n;fset(fidx+(e.deltaX>0?1:-1),false)}},{passive:false});
document.addEventListener("keydown",function(e){if((cur=="type"||cur=="search"||cur=="results"||cur=="mk")&&e.key=="Escape"){go("home");return}if(cur!="home")return;if(e.key=="ArrowRight")fset(fidx+1,false);else if(e.key=="ArrowLeft")fset(fidx-1,false)});
document.addEventListener("keydown",function(e){if(cur=="activity"&&(e.key=="e"||e.key=="E"))baShow("error")});

/* searching: flying bird (body float + wing flap via mesh warp; falls back to float only) */
var sb=$("#sbird"),sbi=$("#sbirdimg"),sbc=$("canvas",sb),bird={raf:0,t0:0,gl:null,ok:false,tried:false,reduce:!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)};
function birdSmooth(a,b,x){x=Math.max(0,Math.min(1,(x-a)/(b-a)));return x*x*(3-2*x)}
function birdSeg(px,py,ax,ay,bx,by){var vx=bx-ax,vy=by-ay,wx=px-ax,wy=py-ay,t=Math.max(0,Math.min(1,(wx*vx+wy*vy)/(vx*vx+vy*vy))),dx=wx-t*vx,dy=wy-t*vy;return Math.sqrt(dx*dx+dy*dy)}
function birdIn(x,y,P){var c=false;for(var i=0,j=P.length-1;i<P.length;j=i++){if(((P[i][1]>y)!=(P[j][1]>y))&&(x<(P[j][0]-P[i][0])*(y-P[i][1])/(P[j][1]-P[i][1])+P[i][0]))c=!c}return c}
function birdInit(){if(bird.tried)return;bird.tried=true;
 try{
  var gl=sbc.getContext("webgl",{alpha:true,premultipliedAlpha:true,antialias:true})||sbc.getContext("experimental-webgl",{alpha:true,premultipliedAlpha:true,antialias:true});if(!gl)return;
  function sh(t,src){var o=gl.createShader(t);gl.shaderSource(o,src);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw 0;return o}
  var pr=gl.createProgram();
  gl.attachShader(pr,sh(gl.VERTEX_SHADER,"attribute vec2 aP;attribute float aW;uniform float uA;uniform vec2 uC;varying vec2 vU;void main(){float a=uA*aW,c=cos(a),s=sin(a);vec2 d=aP-uC;vec2 q=uC+vec2(c*d.x-s*d.y,s*d.x+c*d.y);q=(q-.5)/1.16+.5;vU=aP;gl_Position=vec4(q.x*2.-1.,1.-q.y*2.,0.,1.);}"));
  gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,"precision mediump float;uniform sampler2D uT;varying vec2 vU;void main(){gl_FragColor=texture2D(uT,vU);}"));
  gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw 0;gl.useProgram(pr);
  /* wing region + shoulder pivot, in an 800x800 version of the artwork */
  var poly=[[405,405],[430,360],[500,325],[560,290],[610,240],[655,190],[690,172],[720,185],[755,205],[775,260],[780,300],[765,350],[745,390],[700,420],[640,432],[580,445],[520,462],[470,470],[430,445]],PX=445,PY=415,N=56,pos=[],wt=[],idx=[];
  for(var j=0;j<=N;j++)for(var i=0;i<=N;i++){var u=i/N,v=j/N,x=u*800,y=v*800,d=1e9;
   for(var k=0;k<poly.length;k++){var q=poly[(k+1)%poly.length];d=Math.min(d,birdSeg(x,y,poly[k][0],poly[k][1],q[0],q[1]))}
   var sd=birdIn(x,y,poly)?d:-d,m=birdSmooth(-14,6,sd),r=birdSmooth(10,60,Math.sqrt((x-PX)*(x-PX)+(y-PY)*(y-PY)));
   pos.push(u,v);wt.push(m*r)}
  for(var j=0;j<N;j++)for(var i=0;i<N;i++){var a=j*(N+1)+i,b=a+1,c=a+N+1,e=c+1;idx.push(a,b,c,b,e,c)}
  function buf(t,d,ty){var b=gl.createBuffer();gl.bindBuffer(t,b);gl.bufferData(t,d,gl.STATIC_DRAW);return b}
  buf(gl.ARRAY_BUFFER,new Float32Array(pos));var lp=gl.getAttribLocation(pr,"aP");gl.enableVertexAttribArray(lp);gl.vertexAttribPointer(lp,2,gl.FLOAT,false,0,0);
  buf(gl.ARRAY_BUFFER,new Float32Array(wt));var lw=gl.getAttribLocation(pr,"aW");gl.enableVertexAttribArray(lw);gl.vertexAttribPointer(lw,1,gl.FLOAT,false,0,0);
  buf(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(idx));
  var uA=gl.getUniformLocation(pr,"uA");gl.uniform2f(gl.getUniformLocation(pr,"uC"),PX/800,PY/800);gl.uniform1i(gl.getUniformLocation(pr,"uT"),0);
  var tex=gl.createTexture();
  function up(){gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,sbi);gl.generateMipmap(gl.TEXTURE_2D);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
   gl.viewport(0,0,sbc.width,sbc.height);gl.clearColor(0,0,0,0);bird.gl=gl;bird.uA=uA;bird.n=idx.length;bird.ok=true;sb.classList.add("gl");birdDraw(0)}
  if(sbi.complete&&sbi.naturalWidth)up();else sbi.addEventListener("load",up)
 }catch(_){bird.ok=false;bird.gl=null}}
function birdDraw(a){var gl=bird.gl;if(!bird.ok||!gl)return;gl.clear(gl.COLOR_BUFFER_BIT);gl.uniform1f(bird.uA,a);gl.drawElements(gl.TRIANGLES,bird.n,gl.UNSIGNED_SHORT,0)}
function birdFrame(now){var t=(now-bird.t0)/1000,w=6.2832/3.6,fl=Math.sin(w*t),sw=6.2832*t/9;
 var y=-5*Math.sin(w*t)+1.2*Math.sin(sw*1.3+1),x=6*Math.sin(sw),rot=1.1*Math.sin(w*t-.5)+1.4*Math.sin(sw+.6);
 sb.style.transform="translate3d("+x.toFixed(2)+"px,"+y.toFixed(2)+"px,0) rotate("+rot.toFixed(2)+"deg)";
 birdDraw(0);
 bird.raf=requestAnimationFrame(birdFrame)}
function searchOpen(){birdInit();cancelAnimationFrame(bird.raf);sb.style.transform="";if(bird.reduce){birdDraw(0);return}bird.t0=performance.now();bird.raf=requestAnimationFrame(birdFrame)}
function searchClose(){cancelAnimationFrame(bird.raf);bird.raf=0}

/* ===== Create flows: Business Page · Personal Offer · Professional Profile ===== */
var FXA={"bp":{"logo":"/assets/739f30d4fa4fc7847b7a203f.svg","ph":["/assets/739f30d4fa4fc7847b7a203f.svg","/assets/739f30d4fa4fc7847b7a203f.svg","/assets/739f30d4fa4fc7847b7a203f.svg","/assets/739f30d4fa4fc7847b7a203f.svg"]},"po":{"ph":["/assets/739f30d4fa4fc7847b7a203f.svg","/assets/739f30d4fa4fc7847b7a203f.svg","/assets/739f30d4fa4fc7847b7a203f.svg","/assets/739f30d4fa4fc7847b7a203f.svg"]},"pp":{"logo":"/assets/739f30d4fa4fc7847b7a203f.svg","ph":["/assets/739f30d4fa4fc7847b7a203f.svg","/assets/739f30d4fa4fc7847b7a203f.svg","/assets/739f30d4fa4fc7847b7a203f.svg","/assets/739f30d4fa4fc7847b7a203f.svg"]}};
var FXI={
home:'<svg viewBox="0 0 24 24"><path d="M12 2.5 1.500 11.500H4.500V21h5.300v-6h4.400v6h5.300v-9.500h3z"/></svg>',
act:'<svg viewBox="0 0 24 24"><path d="M2.500 5.300l1.600 1.700 3-3.400M2.500 11.800l1.600 1.700 3-3.400" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="2.600" y="16.400" width="4.300" height="4.200" rx="1.100"/><rect x="9.500" y="4.300" width="12.500" height="3.700" rx="1.800"/><rect x="9.500" y="10.400" width="12.500" height="3.700" rx="1.800"/><rect x="9.500" y="16.500" width="12.500" height="3.700" rx="1.800"/></svg>',
chat:'<svg viewBox="0 0 24 24"><path d="M12 2.500c5.500 0 9.500 3.600 9.500 8.500 0 5-4 8.700-9.500 8.700-1 0-2-.1-2.900-.4L4 21.500l1.300-4.200C3.500 15.900 2.500 13.700 2.500 11 2.500 6.100 6.500 2.500 12 2.500z"/><circle cx="7.800" cy="11" r="1.300" fill="#58A5E3"/><circle cx="12" cy="11" r="1.300" fill="#58A5E3"/><circle cx="16.200" cy="11" r="1.300" fill="#58A5E3"/></svg>'};
FXA.sn={ph:FXA.pp.ph};
var FX={id:null,mode:'wizard',step:0,d:null,key:null,snap:null,dd:false,t:0};
var FXAREAS=['All Kuwait','Capital','Hawalli','Al Farwaniyah','Mubarak Al-Kabeer','Al Ahmadi','Al Jahra'];
var FXPIN='<svg viewBox="0 0 24 24" fill="none" stroke="#013F63" stroke-width="2"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
var FXICON_IMG='<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-5 4 4 3-3 4 4"/></svg>';
var FXICON_UP='<svg viewBox="0 0 24 24"><path d="M12 16V4M12 4l-4 4M12 4l4 4"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>';
var FXSHARE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>';
var FXBACK='<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>';
var FXBIRD={po:"/assets/7473180cc9c26f7686e80973.webp",sn:"/assets/8b9a496162e34522943afdb7.webp",bp:"/assets/a97472469fb00ea89df3291d.webp",pp:"/assets/7f6835d10c5d44942c004b62.webp"};
window.FXBIRD=FXBIRD;
function fxConf(n,sp){var c=['#013F63','#5AC0DE','#FF8A3D','#FFC83D','#9B5CF6','#FF6B9A'],h='<div class="confbox" aria-hidden="true">';for(var i=0;i<n;i++){var a=Math.random()*Math.PI*2,r=80+Math.random()*140,w=6+Math.random()*6;h+='<bv-c class="bvconf k'+(i%3)+'" style="--dx:'+(Math.cos(a)*r).toFixed(0)+'px;--dy:'+(Math.sin(a)*r*.75-50).toFixed(0)+'px;--r:'+((Math.random()*720-360)|0)+'deg;--c:'+c[i%6]+';--w:'+w.toFixed(1)+'px;--t:'+(1.7+Math.random()*.9).toFixed(2)+'s;--dl:'+(.3+Math.random()*.25).toFixed(2)+'s"></bv-c>'}
 if(sp)[[-140,-110],[135,-120],[-170,10],[165,0],[-80,-135],[90,-140]].forEach(function(q,i){h+='<bv-s class="bvtwk'+(i%2?' b':'')+'" style="left:'+q[0]+'px;top:'+q[1]+'px;--dl:'+(.5+i*.18).toFixed(2)+'s">\u2726</bv-s>'});
 return h+'</div>'}
var CREATE_SUCCESS_ART={"pp":"/assets/4b7d4377757e25c4538cd40d.webp","bp":"/assets/c463659e5f6a2da6aa855dbc.webp","sn":"/assets/b5c19317b235c50e3f1e04fc.webp"};
function fxHero(f,sm){return '<div class="hero '+f+(CREATE_SUCCESS_ART[f]?' supplied-art':'')+(sm?' sm':'')+'" aria-hidden="true"><i class="halo"></i><i class="gs"></i>'+(sm?'':fxConf(34,true))+'<img class="hmasc" src="'+(CREATE_SUCCESS_ART[f]||FXBIRD[f])+'" alt=""></div>'}
(function(){var n=0,t=0;document.addEventListener("click",function(e){var el=e.target.closest&&e.target.closest(".status>span:first-child,.fxstat>span:first-child");if(!el)return;var now=Date.now();n=(now-t<1500)?n+1:1;t=now;if(n>=5){n=0;bvSheet({title:"Restart Birvoy?",sub:"This reloads the app. Your account, listings and chats stay saved.",cta:"Restart",danger:1,onSubmit:function(){try{localStorage.removeItem(BVK)}catch(e){}location.reload();return true}})}},true)})();
(function(){var c=document.querySelector('#s-reqsent .checkwrap');if(c)c.insertAdjacentHTML('beforeend',fxConf(26,false))})();

function bvCurrency(value){var v=String(value==null?'':value).trim();if(!v)return '';if(/^(?:KD|KWD|د\.ك)\b/i.test(v))return v;return /^\d/.test(v)?'KD '+v:v}
function fxE(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function fxLbl(t,req,mt){return '<div class="lbl'+(mt?' sp':'')+'">'+t+(req?'<span class="req"> '+req+'</span>':'')+'</div>'}
function fxHl(t){return '<div class="hintlbl">'+t+'</div>'}
var FXLOCK='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
var FXCHECK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function fxPriv(t){return '<div class="privbox">'+FXLOCK+'<span>'+t+'</span></div>'}
function fxIn(k,v,o){o=o||{};return '<input class="in'+(o.cls?' '+o.cls:'')+'" data-k="'+k+'" value="'+fxE(v)+'" placeholder="'+fxE(o.ph||'')+'" maxlength="'+(o.max||80)+'" autocomplete="off" autocapitalize="'+(o.cap||'sentences')+'" spellcheck="false"'+(o.mode?' inputmode="'+o.mode+'"':'')+(o.style?' style="'+o.style+'"':'')+'>'}
function fxTa(k,v,max,ph){return '<div class="in ta taw"><textarea data-k="'+k+'" maxlength="'+max+'" rows="3" spellcheck="false"'+(ph?' placeholder="'+fxE(ph)+'"':'')+'>'+fxE(v)+'</textarea><span class="charcount" data-cc="'+k+'" data-max="'+max+'">'+v.length+'/'+max+' characters</span></div>'}
function fxRo(v,cls){return '<div class="in'+(cls?' '+cls:'')+'">'+fxE(v)+'</div>'}
function fxRoTa(v,max){return '<div class="in ta">'+fxE(v)+'<span class="charcount">'+v.length+'/'+max+' characters</span></div>'}
function fxCount(d){var n=0;d.ph.forEach(function(x){if(x)n++});return n}
function fxPhoto(f,i){var a=FXA[f].ph;return a[i%a.length]}
function fxGrid(f,d,gc,bc,icon){var h='<div class="'+gc+'">';for(var i=0;i<Math.max(4,d.ph.length);i++){h+='<button type="button" class="'+bc+'" data-act="fx" data-fx="ph:'+i+'" aria-label="'+(d.ph[i]?'Remove photo '+(i+1):'Add a photo')+'">'+(d.ph[i]?'<img src="'+fxPic(f,d,i)+'" alt="">':icon)+'</button>'}return h+'</div><div class="hint">'+fxCount(d)+' of '+Math.max(4,d.ph.length)+' photos added · tap a photo to remove it</div>'}
function fxChips(arr,ro){var h='<div class="tagrow">';arr.forEach(function(t,i){h+='<span class="tagchip"'+(ro?' style="padding:9px 16px"':'')+'>'+fxE(t)+(ro?'':' <i data-act="fx" data-fx="tag:rm:'+i+'" role="button" aria-label="Remove '+fxE(t)+'">&times;</i>')+'</span>'});return h+'</div>'}
function fxTags(d,c,ed){return fxLbl(c.q,'(Required)',0)+fxHl(ed?c.hintEd:c.hint)+'<div class="taginput">'+fxIn('tagDraft',d.tagDraft,{ph:'Type one, then tap Add',max:40})+'<button type="button" class="addbtn" data-act="fx" data-fx="tag:add">Add</button></div>'+fxChips(d.tags,false)+(ed?'':'<div class="note">Your tags come from what you enter here — edit or remove them anytime.</div>')}
function fxArea(d){var h='<div class="locin2 selwrap ddwrap"><button type="button" class="selbtn" data-act="fx" data-fx="dd" aria-haspopup="listbox" aria-expanded="'+FX.dd+'">'+FXPIN+'<span class="in">'+fxE(d.area)+'</span><span class="chev2'+(FX.dd?' up':'')+'"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></span></button>';
 if(FX.dd){h+='<div class="ddlist" role="listbox">';FXAREAS.forEach(function(a){h+='<div role="option" class="'+(a==d.area?'on':'')+'" data-act="fx" data-fx="area:'+fxE(a)+'">'+fxE(a)+'</div>'});h+='</div>'}
 return h+'</div>'}
function fxServe(d,c){var h=fxLbl(c.q,'(Required)',0)+fxHl('Select all that apply.')+'<div class="optlist">';
  c.opts.forEach(function(o){var on=d.serve[o[0]];h+='<div class="cbrow" role="checkbox" tabindex="0" aria-checked="'+(on?'true':'false')+'" data-act="fx" data-fx="serve:'+o[0]+'"><input type="checkbox" tabindex="-1"'+(on?' checked':'')+'><div class="tx"><b>'+o[1]+'</b><span>'+o[2]+'</span></div></div>'});
  h+='</div>'+fxLbl(c.lq,'(Optional)',1)+fxHl(c.lh)+'<div class="locin2">'+FXPIN+fxIn('loc',d.loc,{ph:'City or area',max:80})+'</div>';
  h+=fxLbl('Select Service Area','(Optional)',1)+fxHl('Where do you provide your services?')+fxArea(d);return h}
function fxRvc(title,key,inner){return '<section class="rvsec"><div class="rvhd"><h3 class="rvt">'+title+'</h3><button type="button" class="editl" data-act="fx" data-fx="edit:'+key+'" aria-label="Edit '+fxE(title)+'">Edit</button></div><div class="rvbody">'+inner+'</div></section>'}
function fxRvf(k,v,cls){return '<div class="rvf"><div class="rvk">'+k+'</div><div class="rvv'+(cls?' '+cls:'')+'">'+v+'</div></div>'}
function fxRvChips(arr){var h='<div class="rvchips">';arr.forEach(function(t){h+='<span class="rvchip">'+fxE(t)+'</span>'});return h+'</div>'}
function fxRvPics(f,d){var p=fxPhotoImgs(f,d);return p?'<div class="rvpic">'+p+'</div>':'<div class="rvv rvmute">No photos added</div>'}
function fxRvLoc(v){return '<span class="rvloc">'+FXPIN+fxE(v)+'</span>'}
function fxRvServe(d,c){var rows='',n=0;c.opts.forEach(function(o){if(d.serve[o[0]]){n++;rows+='<div class="rvrow"><span class="rvck">'+FXCHECK+'</span><span class="rvv"><b>'+o[1]+'</b></span></div>'}});
  var h='<div class="rvlist">'+(n?rows:'<div class="rvv rvmute">Nothing selected</div>')+'</div>';
  if(d.loc)h+=fxRvf(c.rl,fxRvLoc(d.loc));
  if(d.area)h+=fxRvf('Service Area',fxRvLoc(d.area));return h}
function fxLiveChips(arr){var h='';arr.forEach(function(t){h+='<span class="lcchip">'+fxE(t)+'</span>'});return h}
function fxServeChips(d,c){var a=[];c.opts.forEach(function(o){if(d.serve[o[0]])a.push(o[3])});return a}
function fxPhotoImgs(f,d,n){var h='';d.ph.forEach(function(x,i){if(x)h+='<img src="'+fxPic(f,d,i)+'" alt="">'});return h}

/* ---- flow definitions ---- */
var FXSERVE={
 bp:{q:'How do you serve customers?',lq:'Where is your business located?',lh:'Enter your business location or area.',rl:'Business Location',opts:[['visit','Customers visit us','Customers come to your business.','Customers Visit Us'],['come','We come to you','You provide your service at the customer’s location.','We Come To You'],['remote','Remote/Online','You provide your service remotely or online.','Remote/Online']]},
 pp:{q:'How do you provide your service?',lq:'Where are you located?',lh:'Enter your location or area.',rl:'Location',opts:[['visit','At my location','Customers come to your location.','At My Location'],['come','I come to you','You provide your service at the customer’s location.','I Come To You'],['remote','Remote/Online','You provide your service remotely or online.','Remote/Online']]}
};
var FXC={
 bp:{scr:'s-bp',title:'Tell Us About Your Business',what:'Business Page',steps:[['basics','Basics'],['products','Products & Services'],['serve','How you serve'],['contact','Photos & contact']],
  edit:{basics:'Edit Basics',products:'Edit Products & Services',serve:'Edit How You Serve',contact:'Edit Photos & Contact'},
  rtitle:'Review Your Business Page',rsub:'Check information before publishing',pub:'Publish Business Page',live:'Your Business Page<br>is now live!',manage:'Manage My Business Page',share:'Share Business Page'},
 po:{scr:'s-po',title:'Create Personal Offer',what:'Personal Offer',steps:[['offer','The offer'],['photos','Photos'],['details','Price & details']],
  edit:{offer:'Edit Your Offer',photos:'Edit Photos',details:'Edit Price & details'},
  rtitle:'Review Details',rsub:'',pub:'Publish',live:'Your Personal Offer<br>is now live!',manage:'Manage My Offer',share:'Share Offer'},
 pp:{scr:'s-pp',title:'Tell Us About Your Profession',what:'Professional Profile',steps:[['about','About you'],['services','Services'],['serve','How you serve'],['work','Your work']],
  edit:{about:'Edit About You',services:'Edit Services',serve:'Edit How You Serve',work:'Edit Your Work'},
  rtitle:'Review Your Professional Profile',rsub:'Check information before publishing',pub:'Publish Professional Profile',live:'Your Professional Profile<br>is now live!',manage:'Manage My Professional Profile',share:'Share Professional Profile'}
};
FXC.sn={scr:'s-sn',single:1,title:'Create Special Need',what:'Special Need',steps:[['need','Your need']],edit:{need:'Edit Your Special Need'},
  rtitle:'Review Your Special Need',rsub:'Check information before publishing',pub:'Publish',live:'Your Special Need<br>is now live!',manage:'Manage My Need',share:'Share Need'};
var FXDEF={bp:function(){return{name:'',about:'',tags:[],serve:{},loc:'',area:'',ph:[0,0,0,0],web:'',email:'',logo:''}},po:function(){return{title:'',desc:'',ph:[0,0,0,0],price:'',neg:0,cond:'',loc:''}},pp:function(){return{name:'',role:'',about:'',tags:[],serve:{},loc:'',area:'',ph:[0,0,0,0],link:'',logo:''}}};

FXDEF.sn=function(){var n=new Date();return{desc:'',budget:'',when:'flex',date:null,calOpen:0,cy:n.getFullYear(),cm:n.getMonth(),ph:[0]}};

/* ---- step renderers ---- */
var FXR={bp:{},po:{},pp:{},sn:{}};
FXR.bp.basics=function(d){return '<div class="logorow"><button type="button" class="logobox" data-act="fx" data-fx="upload" aria-label="Logo or photo"><div class="up">'+(d.logo?'<img src="'+d.logo+'" alt="">':FXICON_UP)+'</div><div class="lb">Logo/Photo</div></button><div class="logogrow">'+fxLbl('Business Name','(Required)',0)+fxIn('name',d.name,{ph:'Your business name',max:60})+'</div></div>'+fxLbl('About Your Business','(Required)',24)+fxHl('Describe your business and what makes it special.')+fxTa('about',d.about,1000)+fxPriv('Please don’t include phone numbers, emails or links here. Customers reach you through Birvoy Connect.')};
FXR.bp.products=function(d,ed){return fxTags(d,{q:'What your business provides',hint:'Add your products, services, brands, or specialties. Birvoy uses these to match you with people looking for them. They’re descriptions for matching, not separate offers.',hintEd:'Add your products, services, brands, or specialties. Birvoy uses these to match you with people looking for them.'},ed)};
FXR.bp.serve=function(d){return fxServe(d,FXSERVE.bp)};
FXR.bp.contact=function(d){return fxLbl('Upload photos of your business','(Optional)',0)+fxHl('Show people what your business looks like')+fxGrid('bp',d,'upgrid2','upbox2',FXICON_IMG)+fxLbl('Website','(Optional)',24)+fxIn('web',d.web,{ph:'www.example.com',max:120,cap:'none',mode:'url'})+fxLbl('Business Email','(Optional · private)',24)+fxIn('email',d.email,{ph:'name@example.com',max:120,cap:'none',mode:'email'})+fxPriv('Only Birvoy sees this email, for account and verification messages. It’s never shown on your page — customers contact you through Birvoy Connect.')};
FXR.bp.review=function(d){var c=FXSERVE.bp,h='';
  h+=fxRvc('Basics','basics','<div class="rvpro"><img src="'+(d.logo||bvPh(d.name,'bp'))+'" alt=""><div><div class="rvk">Business Name</div><div class="rvv nm">'+fxE(d.name)+'</div></div></div>'+fxRvf('About Your Business',fxE(d.about)));
  h+=fxRvc('Products & Services','products',fxRvChips(d.tags));
  h+=fxRvc('How We Serve Customers','serve',fxRvServe(d,c));
  var ct='<div class="rvf"><div class="rvk">Business Photos</div>'+fxRvPics('bp',d)+'</div>';
  if(d.web)ct+=fxRvf('Website',fxE(d.web));
  if(d.email)ct+=fxRvf('Business Email',fxE(d.email)+' <span class="rvnote">Private · not shown publicly</span>');
  h+=fxRvc('Photos & Contact','contact',ct);
  return h};
FXR.bp.live=function(d){var c=FXSERVE.bp;return '<div class="lcard"><div class="lchead"><img class="lclogo" src="'+(d.logo||bvPh(d.name,'bp'))+'" alt=""><div class="lcid"><div class="nm">'+fxE(d.name)+'</div>'+(d.loc?'<div class="lcloc">'+FXPIN+fxE(d.loc)+'</div>':'')+(d.area?'<div class="lcsa"><b>Service Area:</b> '+fxE(d.area)+'</div>':'')+'</div></div><div class="lcph">'+fxPhotoImgs('bp',d)+'</div><div class="lcg">Products & Services</div><div class="lcch">'+fxLiveChips(d.tags)+'</div><div class="lcg">How We Serve Customers</div><div class="lcch">'+fxLiveChips(fxServeChips(d,c))+'</div>'};

FXR.po.offer=function(d){return fxLbl('What are you offering?','(Required)',0)+fxIn('title',d.title,{ph:'e.g. 2-Bedroom Apartment for Rent',max:80})+fxLbl('Description','(Required)',20)+fxTa('desc',d.desc,500)+fxPriv('Please don’t include phone numbers, emails or links here. People interested in your offer reach you through Birvoy Connect.')};
FXR.po.photos=function(d){return fxLbl('Photos','(Optional)',0)+fxHl('Add photos of what you’re offering.')+fxGrid('po',d,'upgrid','upbox',FXICON_UP)};
FXR.po.details=function(d){var h=fxLbl('Price','(Optional)',0)+'<div class="pricerow">'+fxIn('price',d.price,{ph:'KD 0',max:14,cap:'none'})+'<div class="negwrap" data-act="fx" data-fx="neg"><button type="button" class="toggle'+(d.neg?' on':'')+'" role="switch" aria-checked="'+(d.neg?'true':'false')+'" aria-label="Negotiable"></button>Negotiable</div></div>';
 h+=fxLbl('Condition','(Optional)',24)+'<div class="chips">';['New','Like New','Good','Fair'].forEach(function(c){h+='<button type="button" class="ck'+(d.cond==c?' on':'')+'" data-act="fx" data-fx="cond:'+c+'" aria-pressed="'+(d.cond==c)+'">'+c+'</button>'});
 h+='</div>'+fxLbl('Location','(Optional)',24)+'<div class="locin">'+FXPIN+fxIn('loc',d.loc,{ph:'City or area',max:80})+'</div><div class="hint">Only your approximate area is shown publicly. Your precise location stays private.</div>';return h};
FXR.po.review=function(d){var h='';
  h+=fxRvc('Your Offer','offer',fxRvf('What You’re Offering',fxE(d.title),'nm')+fxRvf('Description',fxE(d.desc)));
  h+=fxRvc('Photos Of Your Offer','photos',fxRvPics('po',d));
  var dt='';
  if(d.price)dt+=fxRvf('Price',fxE(bvCurrency(d.price))+(d.neg?' <span class="rvchip pale">Negotiable</span>':''));
  if(d.cond)dt+=fxRvf('Condition','<span class="rvchip">'+fxE(d.cond)+'</span>');
  if(d.loc)dt+=fxRvf('Location',fxRvLoc(d.loc)+'<div class="rvnote blk">Only your approximate area is shown publicly. Your precise location stays private.</div>');
  h+=fxRvc('Price, Condition & Location','details',dt||'<div class="rvv rvmute">Nothing added</div>');
  return h};
FXR.po.live=function(d){var rows='';if(d.cond)rows+='<dt>Condition</dt><dd>'+fxE(d.cond)+'</dd>';if(d.price)rows+='<dt>Price</dt><dd>'+fxE(bvCurrency(d.price))+(d.neg?' · Negotiable':'')+'</dd>';if(d.loc)rows+='<dt>Location</dt><dd>'+FXPIN+fxE(d.loc)+'</dd>';
  return '<div class="lcard"><div class="lcph">'+fxPhotoImgs('po',d)+'</div><div class="nm lcnm">'+fxE(d.title)+'</div>'+(rows?'<dl class="lcdl">'+rows+'</dl>':'')};


FXR.pp.about=function(d){return '<div class="logorow"><button type="button" class="logobox" data-act="fx" data-fx="upload" aria-label="Upload photo"><div class="up">'+(d.logo?'<img src="'+d.logo+'" alt="">':FXICON_UP)+'</div><div class="lb">Upload Photo</div></button><div class="logogrow">'+fxLbl('Professional Name','(Required)',0)+fxIn('name',d.name,{ph:'Your full name',max:60})+'</div></div>'+fxLbl('What do you do?','(Required)',24)+fxIn('role',d.role,{ph:'e.g. Interior Designer',max:60})+fxLbl('About You & Your Services','(Required)',24)+fxTa('about',d.about,1000)+fxPriv('Please don’t include phone numbers, emails or links here. Customers reach you through Birvoy Connect.')};
FXR.pp.services=function(d,ed){return fxTags(d,{q:'What services do you provide?',hint:'Add the services, specialties or skills you offer. Birvoy uses these to match you with people looking for them. They’re descriptions for matching, not separate offers.',hintEd:'Add the services, specialties or skills you offer. Birvoy uses these to match you with people looking for them.'},ed)};
FXR.pp.serve=function(d){return fxServe(d,FXSERVE.pp)};
FXR.pp.work=function(d){return fxLbl('Show Your Work','(Optional)',0)+fxHl('Add photos of projects you’re proud of.')+fxGrid('pp',d,'upgrid2','upbox2',FXICON_IMG)+fxLbl('Portfolio Link','(Optional)',24)+fxIn('link',d.link,{ph:'www.example.com/portfolio',max:160,cap:'none',mode:'url'})};
FXR.pp.review=function(d){var c=FXSERVE.pp,h='';
  h+=fxRvc('About You','about','<div class="rvpro rd"><img src="'+(d.logo||bvPh(d.name,'pp'))+'" alt=""><div><div class="rvk">Professional Name</div><div class="rvv nm">'+fxE(d.name)+'</div></div></div>'+fxRvf('What You Do',fxE(d.role))+fxRvf('About You & Your Services',fxE(d.about)));
  h+=fxRvc('Services You Provide','services',fxRvChips(d.tags));
  h+=fxRvc('How You Provide Your Service','serve',fxRvServe(d,c));
  var wk='<div class="rvf"><div class="rvk">Project Photos</div>'+fxRvPics('pp',d)+'</div>';
  if(d.link)wk+=fxRvf('Portfolio Link',fxE(d.link));
  h+=fxRvc('Your Work','work',wk);
  return h};
FXR.pp.live=function(d){var c=FXSERVE.pp;return '<div class="lcard"><div class="lchead"><img class="lclogo rd" src="'+(d.logo||bvPh(d.name,'pp'))+'" alt=""><div class="lcid"><div class="nm">'+fxE(d.name)+'</div><div class="role">'+fxE(d.role)+'</div>'+(d.loc?'<div class="lcloc">'+FXPIN+fxE(d.loc)+'</div>':'')+(d.area?'<div class="lcsa"><b>Service Area:</b> '+fxE(d.area)+'</div>':'')+'</div></div><div class="lcph">'+fxPhotoImgs('pp',d)+'</div><div class="lcg">Services</div><div class="lcch">'+fxLiveChips(d.tags)+'</div><div class="lcg">How You Provide Your Service</div><div class="lcch">'+fxLiveChips(fxServeChips(d,c))+'</div>'};


var FXMON=['January','February','March','April','May','June','July','August','September','October','November','December'];
function fxDay(t,full){return t.d+' '+FXMON[t.m].slice(0,3)+(full?' '+t.y:'')}
function fxBud(d){var b=parseInt(d.budget,10)||0;return b>0?'KD '+b.toLocaleString('en-US'):''}
function fxCal(d){var n=new Date(),ty=n.getFullYear(),tm=n.getMonth(),td=n.getDate(),y=d.cy,m=d.cm,first=new Date(y,m,1).getDay(),len=new Date(y,m+1,0).getDate(),first_m=(y==ty&&m==tm);
 var h='<div class="calwrap"><div class="calhead"><button type="button" data-act="fx" data-fx="cal:-1" aria-label="Previous month"'+(first_m?' disabled':'')+'>&lsaquo;</button><b>'+FXMON[m]+' '+y+'</b><button type="button" data-act="fx" data-fx="cal:1" aria-label="Next month">&rsaquo;</button></div><div class="calgrid">';
 ['S','M','T','W','T','F','S'].forEach(function(x){h+='<div class="dow">'+x+'</div>'});
 for(var i=0;i<first;i++)h+='<i></i>';
 for(var k=1;k<=len;k++){var past=first_m&&k<td,sel=d.date&&d.date.y==y&&d.date.m==m&&d.date.d==k,tod=first_m&&k==td;
  h+='<button type="button" class="cd'+(sel?' sel':'')+(tod?' today':'')+'"'+(past?' disabled':'')+' data-act="fx" data-fx="day:'+k+'" aria-label="'+k+' '+FXMON[m]+' '+y+'"'+(sel?' aria-pressed="true"':'')+'>'+k+'</button>'}
 return h+'</div></div>'}
FXR.sn.need=function(d){var h=fxLbl('Describe what you need','(Required)',0)+fxTa('desc',d.desc,500,'Example: I need a plumber who can fix a leaking kitchen sink this week.');
 h+=fxLbl('Photo','(Optional)',24)+'<button type="button" class="snphoto" data-act="fx" data-fx="ph:0" aria-label="'+(d.ph[0]?'Remove photo':'Add a photo')+'">'+(d.ph[0]?'<img src="'+fxPic('sn',d,0)+'" alt="">':FXICON_UP)+'</button>'+(d.ph[0]?'<div class="hint">Tap the photo to remove it</div>':'');
 h+=fxLbl('Budget','(Optional)',24)+'<div class="kdwrap"><span>KD</span>'+fxIn('budget',d.budget,{ph:'0',max:7,cap:'none',mode:'numeric'})+'</div>';
 h+=fxLbl('When do you need it?','',24)+'<div class="chipsrow"><button type="button" class="ck2'+(d.when=='flex'?' on':'')+'" data-act="fx" data-fx="when:flex" aria-pressed="'+(d.when=='flex')+'">Flexible</button><button type="button" class="ck2'+(d.when=='date'?' on':'')+'" data-act="fx" data-fx="when:date" aria-pressed="'+(d.when=='date')+'">'+(d.when=='date'&&d.date?'Date &mdash; '+fxDay(d.date):'Date')+'</button></div>';
 if(d.when=='date'&&d.calOpen)h+=fxCal(d);
 return h+fxPriv('Please don’t include phone numbers, emails or links here. People who can help reach you through Birvoy Connect.')};
FXR.sn.review=function(d){var b=fxBud(d),t=d.when=='date'&&d.date?fxDay(d.date,1):'Flexible';
 return fxRvc('Your Special Need','need',fxRvf('What you need',fxE(d.desc),'nm')+'<div class="rvf"><div class="rvk">Photo</div>'+fxRvPics('sn',d)+'</div>'+fxRvf('Budget',b?b:'<span class="rvmute">Not set</span>')+fxRvf('When do you need it?',t))};
FXR.sn.live=function(d){var b=fxBud(d),rows='';if(b)rows+='<dt>Budget</dt><dd>'+b+'</dd>';rows+='<dt>Timing</dt><dd>'+(d.when=='date'&&d.date?fxDay(d.date,1):'Flexible')+'</dd>';
 return '<div class="lcard">'+(fxCount(d)?'<div class="lcph">'+fxPhotoImgs('sn',d)+'</div>':'')+'<div class="nm lcnm">'+fxE(d.desc)+'</div><dl class="lcdl">'+rows+'</dl>'};

/* ---- validation ---- */
function fxPrivacy(s){return /(\+?\d[\d\s\-().]{6,}\d)|@|https?:|www\./i.test(s||'')}
var FXV={
 bp:{basics:function(d){if(!d.name.trim())return['Add your business name to continue',['name']];if(!d.about.trim())return['Tell us about your business to continue',['about']];if(fxPrivacy(d.about))return['Please remove phone numbers, emails or links from your description',['about']]},
  products:function(d){if(!d.tags.length)return['Add at least one product or service',['tagDraft']]},
  serve:function(d){if(!d.serve.visit&&!d.serve.come&&!d.serve.remote)return['Select at least one way you serve customers',[]]},
  contact:function(d){if(d.email&&!/^\S+@\S+\.\S+$/.test(d.email.trim()))return['Enter a valid email address',['email']]}},
 po:{offer:function(d){if(!d.title.trim())return['Add what you’re offering to continue',['title']];if(!d.desc.trim())return['Add a short description to continue',['desc']];if(fxPrivacy(d.title+' '+d.desc))return['Please remove phone numbers, emails or links',['desc']]},
  photos:function(){},details:function(){}},
 pp:{about:function(d){if(!d.name.trim())return['Add your name to continue',['name']];if(!d.role.trim())return['Tell us what you do to continue',['role']];if(!d.about.trim())return['Tell us about yourself to continue',['about']];if(fxPrivacy(d.about))return['Please remove phone numbers, emails or links from your description',['about']]},
  services:function(d){if(!d.tags.length)return['Add at least one service',['tagDraft']]},
  serve:function(d){if(!d.serve.visit&&!d.serve.come&&!d.serve.remote)return['Select at least one way you provide your service',[]]},work:function(){}}
};
FXV.sn={need:function(d){if(!d.desc.trim())return['Describe what you need to continue',['desc']];if(fxPrivacy(d.desc))return['Please remove phone numbers, emails or links',['desc']];if(d.when=='date'&&!d.date)return['Pick a date, or choose Flexible',[]]}};
function fxCheck(key){var f=FX.id,fn=FXV[f][key],r=fn&&fn(FX.d);if(!r)return true;toast(r[0]);r[1].forEach(function(k){var e=$('#'+FXC[f].scr+' [data-k="'+k+'"]');var w=e&&(e.closest('.taw')||e);if(w){w.classList.add('err');w.classList.remove('shake');void w.offsetWidth;w.classList.add('shake');if(e.focus&&k!='about'&&k!='desc')e.focus({preventScroll:true})}});return false}

/* ---- rendering ---- */
function fxNavHtml(){function ni(k,l,ic){return '<button type="button" class="ni'+(k=='mk'?' on':'')+'" data-act="fx" data-fx="nav:'+k+'" aria-label="'+l+'">'+ic+'<span class="l">'+l+'</span></button>'}
 return ni('home','Home',FXI.home)+ni('act','Bird Activity',FXI.act)+ni('mk','Create','<span class="plus"><svg viewBox="0 0 24 24"><path d="M12 4.5v15M4.5 12h15" stroke="#4A98E0" stroke-width="4.5" stroke-linecap="round" fill="none"/></svg></span>')+ni('chat','Chats',FXI.chat)+ni('me','My Birvoy','<img src="'+FXA.W+'" alt="">')}
function fxHead(f,i,ed,key){if(ed)return '<div class="pgtitle ed">'+fxE(f.edit[key])+'</div><div class="editnote">You’re editing from Review — your other answers are saved.</div>';
  if(f.single)return '<div class="backrow"><button type="button" class="backl" data-act="fx" data-fx="back">'+FXBACK+'Back</button></div><div class="pgtitle">'+fxE(f.title)+'</div>';
  var n=f.steps.length,bars='';for(var j=0;j<n;j++)bars+='<i class="'+(j<=i?'on':'')+'"></i>';
  return '<div class="backrow"><button type="button" class="backl" data-act="fx" data-fx="back">'+FXBACK+'Back</button></div><div class="pgtitle">'+fxE(f.title)+'</div><div class="stephd"><span class="sn">Step '+(i+1)+' of '+n+'</span><span class="sl">'+fxE(f.steps[i][1])+'</span></div><div class="stepbar" aria-hidden="true">'+bars+'</div>'}
function fxNavRow(f,i,ed){if(ed)return '<div class="navrow"><button type="button" class="cta back" data-act="fx" data-fx="cancel">Cancel</button><button type="button" class="cta" data-act="fx" data-fx="save">Save changes</button></div>';
 var last=i==f.steps.length-1;return '<div class="navrow">'+(i>0?'<button type="button" class="cta back" data-act="fx" data-fx="back">Back</button>':'')+'<button type="button" class="cta" data-act="fx" data-fx="next">'+(last?'Review':'Next')+'</button></div>'}
function fxPhone(){return $('#'+FXC[FX.id].scr+' .phone')}
function fxMount(id){var f=FXC[id],ph=$('#'+f.scr+' .phone');if(ph.getAttribute('data-m'))return ph;ph.setAttribute('data-m','1');
 var st=$('#hstat').cloneNode(true);st.removeAttribute('id');st.className='fxstat';st.removeAttribute('style');
 ph.innerHTML='<div class="body"></div><div class="nav"></div>';ph.insertBefore(st,ph.firstChild);(function(){var n=$('.nav',ph),h=$('#hnav');n.className='nav fxnavimg';n.innerHTML=h.innerHTML;[].forEach.call(n.querySelectorAll('.hit'),function(b){var l=b.getAttribute('aria-label');if(l=='Home'){b.setAttribute('data-act','fx');b.setAttribute('data-fx','nav:home')}else if(l=='Create'){b.setAttribute('data-act','fx');b.setAttribute('data-fx','nav:mk')}else if(l=='Bird Activity'){b.setAttribute('data-act','open_act')}else if(l=='Chats'){b.setAttribute('data-act','open_chats')}else if(l=='My Birvoy'){b.setAttribute('data-act','open_my')}else{b.setAttribute('data-act','soon');b.setAttribute('data-msg',l)}})})();
 ph.addEventListener('input',function(e){var t=e.target,k=t.getAttribute&&t.getAttribute('data-k');if(!k)return;FX.d[k]=t.value;if(k=='budget'){var bv=t.value.replace(/\D/g,'');if(bv!==t.value)t.value=bv;FX.d[k]=bv}var w=t.closest('.taw')||t;w.classList.remove('err');
  if(t.tagName=='TEXTAREA'){fxGrow(t);var c=$('[data-cc="'+k+'"]',ph);if(c)c.textContent=t.value.length+'/'+c.getAttribute('data-max')+' characters'}});
 ph.addEventListener('keydown',function(e){var t=e.target;
  if(e.key=='Enter'&&t.getAttribute&&t.getAttribute('data-k')=='tagDraft'){e.preventDefault();FXH.tag('add')}
  else if((e.key=='Enter'||e.key==' ')&&t.getAttribute&&t.getAttribute('role')=='checkbox'){e.preventDefault();t.click()}});
 return ph}
function fxGrow(t){t.style.height='auto';t.style.height=t.scrollHeight+'px'}
function fxRender(keep){var f=FXC[FX.id],ph=fxMount(FX.id),b=$('.body',ph),nav=$('.nav',ph),d=FX.d,sc=keep?b.scrollTop:0,h,cls='body',live=false,key;
 if(FX.mode=='wizard'){key=f.steps[FX.step][0];h=fxHead(f,FX.step,false,key)+FXR[FX.id][key](d,false)+fxNavRow(f,FX.step,false)}
 else if(FX.mode=='edit'){key=FX.key;h=fxHead(f,0,true,key)+FXR[FX.id][key](d,true)+fxNavRow(f,0,true)}
 else if(FX.mode=='review'){h='<div class="backrow"><button type="button" class="backl" data-act="fx" data-fx="back">'+FXBACK+'Back</button></div><div class="pgtitle">'+f.rtitle+'</div>'+(f.rsub?'<div class="hdmini">'+f.rsub+'</div>':'')+'<div class="editnote">Tap <b>Edit</b> on any section to change it. Your progress is saved.</div>'+FXR[FX.id].review(d)+'<div class="navrow"><button type="button" class="cta" data-act="fx" data-fx="publish">'+f.pub+'</button></div>'}
  else if(FX.mode=='live1'){live=true;cls+=' livewrap';h=fxHero(FX.id,false)+'<div class="cheer">\ud83c\udf89 Congratulations!</div><h2>'+f.live+'</h2>'}
  else{live=true;cls+=' livewrap top';h=fxHero(FX.id,true)+'<h2>'+f.live+'</h2>'+FXR[FX.id].live(d)+'<div class="lcbtns"><button type="button" class="go" data-act="fx" data-fx="manage">'+f.manage+'</button><button type="button" class="go s" data-act="fx" data-fx="share">'+FXSHARE+f.share+'</button></div></div><button type="button" class="cta" data-act="fx" data-fx="done">Done</button>'}
 if(!keep)cls+=' fxin';b.className=cls;
 b.innerHTML=h;nav.style.display=live?'none':'';
 $$('textarea',b).forEach(fxGrow);b.scrollTop=sc;
 if(keep&&FX.focus){var e=$('[data-k="'+FX.focus+'"]',b);if(e){e.focus({preventScroll:true});var l=e.value.length;try{e.setSelectionRange(l,l)}catch(_){}}}FX.focus=null}

/* ---- actions ---- */
function fxStep(i){FX.step=i;FX.mode='wizard';FX.dd=false;fxRender(false)}
var FXH={
 start:function(id){FX.id=id;FX.d=FXDEF[id]();FX.step=0;FX.mode='wizard';FX.key=null;FX.dd=false;clearTimeout(FX.t);fxRender(false);go(FXC[id].scr.slice(2))},
 next:function(){var f=FXC[FX.id],key=f.steps[FX.step][0];if(!fxCheck(key))return;if(FX.step<f.steps.length-1)fxStep(FX.step+1);else{FX.mode='review';FX.dd=false;fxRender(false)}},
 back:function(){var f=FXC[FX.id];if(FX.mode=='review'){fxStep(f.steps.length-1);return}if(FX.step>0)fxStep(FX.step-1);else go('mk')},
 edit:function(k){FX.key=k;FX.snap=JSON.stringify(FX.d);FX.mode='edit';FX.dd=false;fxRender(false)},
 cancel:function(){FX.d=JSON.parse(FX.snap);FX.mode='review';FX.dd=false;fxRender(false)},
 save:function(){if(!fxCheck(FX.key))return;FX.mode='review';FX.dd=false;fxRender(false)},
 publish:function(){var f=FXC[FX.id],V=FXV[FX.id]||{};for(var i=0;i<f.steps.length;i++){var vk=f.steps[i][0],vr=V[vk]&&V[vk](FX.d);if(vr){FX.dd=false;fxStep(i);toast(vr[0]);return}}
  var L={sn:'needs',po:'offers',bp:'biz',pp:'pro'}[FX.id],n0=MY[L].length,ok=false;try{myPub(FX.id,FX.d);ok=FX.editId?!!myFind(L,FX.editId):MY[L].length>n0}catch(e){ok=false}
  if(!ok){toast('We couldn\u2019t publish this yet. Please try again.');return}
  FX.mode='live1';fxRender(false);var id=FX.id;clearTimeout(FX.t);FX.t=setTimeout(function(){if(FX.id==id&&FX.mode=='live1'&&cur==f.scr.slice(2)){FX.mode='live2';fxRender(false)}},3800)},
 ph:function(v){var i=+v;FX.d.ph[i]=FX.d.ph[i]?0:1;fxRender(true)},
 tag:function(v){var d=FX.d;if(v=='add'){var t=(d.tagDraft||'').trim().replace(/\s+/g,' ');if(!t){var e=$('#'+FXC[FX.id].scr+' [data-k="tagDraft"]');if(e)e.focus({preventScroll:true});return}
   if(d.tags.some(function(x){return x.toLowerCase()==t.toLowerCase()})){toast('“'+t+'” is already added');return}
   if(d.tags.length>=15){toast('You can add up to 15');return}d.tags.push(t);d.tagDraft='';FX.focus='tagDraft';fxRender(true)}
  else if(v.indexOf('rm:')==0){d.tags.splice(+v.slice(3),1);fxRender(true)}},
 serve:function(k){FX.d.serve[k]=FX.d.serve[k]?0:1;fxRender(true)},
 dd:function(){FX.dd=!FX.dd;fxRender(true);if(FX.dd){var b=$('.body',fxPhone()),s=$('.selwrap',b);if(s&&b.scrollTo)b.scrollTo({top:Math.max(0,s.offsetTop-150),behavior:'smooth'})}},
 area:function(v){FX.d.area=v;FX.dd=false;fxRender(true)},
 cond:function(v){FX.d.cond=FX.d.cond==v?'':v;fxRender(true)},
 neg:function(){FX.d.neg=FX.d.neg?0:1;fxRender(true)},
 upload:function(){toast('Photo upload isn’t part of this flow')},
 manage:function(){var t={sn:'myneeds',po:'myoffers',bp:'mybiz',pp:'mypro'}[FX.id];if(t){go(t);return}toast(FXC[FX.id].manage+' isn’t part of this flow')},
 share:function(){MY.ph={k:'share',t:FXC[FX.id].share,x:'',b:cur};go('myph')},
 when:function(v){var d=FX.d;d.when=v;d.calOpen=v=='date'?1:0;if(v=='date'&&d.date){d.cy=d.date.y;d.cm=d.date.m}fxRender(true);if(d.calOpen){var b=$('.body',fxPhone()),c=$('.calwrap',b);if(c&&b.scrollTo)b.scrollTo({top:Math.max(0,c.offsetTop-300),behavior:'smooth'})}},
 cal:function(v){var d=FX.d,n=new Date(),m=d.cm+(+v),y=d.cy;if(m<0){m=11;y--}if(m>11){m=0;y++}if(y<n.getFullYear()||(y==n.getFullYear()&&m<n.getMonth()))return;d.cy=y;d.cm=m;fxRender(true)},
 day:function(v){var d=FX.d;d.date={y:d.cy,m:d.cm,d:+v};d.when='date';d.calOpen=0;fxRender(true)},
 done:function(){go('home')},
 nav:function(v){if(v=='home')go('home');else if(v=='mk')go('mk');else toast({act:'Bird Activity',chat:'Chats',me:'My Birvoy'}[v]+' isn’t part of this flow')}
};
acts.fx=function(el){var a=el.getAttribute('data-fx'),i=a.indexOf(':'),k=i<0?a:a.slice(0,i),v=i<0?'':a.slice(i+1);if(FXH[k])FXH[k](v,el)};
document.addEventListener('click',function(e){if(FX.dd&&!e.target.closest('.ddwrap')){FX.dd=false;if(FX.id&&/^s-(bp|pp)$/.test('s-'+cur))fxRender(true)}});
function fxReset(){clearTimeout(FX.t);FX.id=null;FX.d=null;FX.dd=false;FX.mode='wizard'}



/* ---- My Birvoy ---- */
var MYIMG={"apt":"/assets/739f30d4fa4fc7847b7a203f.svg","logo":"/assets/739f30d4fa4fc7847b7a203f.svg","sara":"/assets/739f30d4fa4fc7847b7a203f.svg"};
var MY={tab:{needs:0,offers:0,promo:0},seq:100,arm:null,at:0,
 needs:[],
 offers:[],
 biz:[],
 pro:[],
 promo:[]};
function myCnt(a,s){return a.filter(function(x){return x.s==s}).length}
function myHd(t,p){return '<div class="hd"><div><h2>'+t+'</h2><p>'+p+'</p></div></div>'}
function myTabs(key,labels,states){var h='<div class="tabs" role="tablist">';labels.forEach(function(l,i){h+='<i class="'+(MY.tab[key]==i?'on':'')+'" role="tab" aria-selected="'+(MY.tab[key]==i)+'" data-act="my" data-my="tab:'+key+':'+i+'">'+l+' · '+myCnt(MY[key==='promo'?'promo':key],states[i])+'</i>'});return h+'</div>'}
function myPill(cls,label,cmd,arm){return '<button type="button" class="pill'+(cls?' '+cls:'')+(arm?' arm':'')+'" data-act="my" data-my="'+cmd+'">'+label+'</button>'}
function myDel(list,it){var on=MY.arm==list+it.id;return myPill('d',on?'Tap again to delete':'Delete','do:'+list+':'+it.id+':del',on)}
function myPlural(n,w){return n+' '+w+(n==1?'':'s')}
function myCta(label,cmd,ghost){return '<button type="button" class="cta'+(ghost?' ghost':'')+'" data-act="my" data-my="'+cmd+'">'+label+'</button>'}
function myCard(inner){return '<div class="card">'+inner+'</div>'}
var MYR={
 my:function(){var d=MY,h=myHd('My Birvoy','Everything you manage, in one place');
  h+='<div class="info"><div class="flex"><div class="av" style="width:31.7px;height:31.7px;">S</div><div><b>Your Personal account</b><br>One account · '+myPlural(d.biz.length,'Business Page')+' · '+myPlural(d.pro.length,'Professional Profile')+'</div></div></div>';
  h+='<div class="sec">Manage<span><svg viewBox="0 0 24 24" fill="#013F63"><path d="M12 2l8 3v6c0 5-3.400 9-8 11-4.600-2-8-6-8-11V5z"/><path d="M8.500 12l2.500 2.500 4.500-5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Private &amp; Secure</span></div>';
  [['myneeds','my-need','My Needs','Active, in progress and paused',d.needs.length],['myoffers','my-offer','My Offers','Your Personal Offers',d.offers.length],['mybiz','my-biz','My Businesses','Each Business Page on its own',d.biz.length],['mypro','my-pro','My Professional Profiles','Each profile on its own',d.pro.length],['mypromo','my-promo','Promotion Dashboard','Active and past promotions',myCnt(d.promo,'active')],['mysettings','my-set','Settings','Account, privacy, notifications',null]].forEach(function(r){
   h+='<div class="card hub" role="button" tabindex="0" data-act="my" data-my="go:'+r[0]+'"><div class="ic"><svg><use href="#'+r[1]+'"/></svg></div><div class="grow"><div class="name">'+r[2]+'</div><div class="small">'+r[3]+'</div></div>'+(r[4]==null?'':'<span class="cnt">'+r[4]+'</span>')+'<span class="chev">›</span></div>'});
  return h},
 myneeds:function(){snrSync();var st=['active','progress','paused'],lab={active:'Active',progress:'In Progress',paused:'Paused'},h=myHd('My Needs','Needs you published or sent')+myTabs('needs',['Active','In Progress','Paused'],st),cur_=st[MY.tab.needs],a=MY.needs.filter(function(x){return x.s==cur_});
  a.forEach(function(n){h+=myCard('<div class="flex"><div class="tag grow">SPECIAL NEED</div><span class="chip'+(n.s=='paused'?' c':'')+'">'+lab[n.s]+'</span></div><p>'+fxE(n.t)+'</p><div class="small">'+(n.b?'Budget KD '+n.b.toLocaleString('en-US')+' · ':'')+fxE(n.w)+' · '+myPlural(n.r,'response')+'</div><div class="btns">'+myPill('','Edit','edit:needs:'+n.id)+myPill('o',n.s=='paused'?'Resume':'Pause','do:needs:'+n.id+':pause')+myDel('needs',n)+'</div>')});
  if(!a.length)h+='<div class="empty">No '+lab[cur_]+' Needs.</div>';
  h+='<div class="empty">Need expired with no response? Expired Needs are archived automatically. Publish a new one any time from + Create.</div>'+myCta('Create Special Need','fx:sn');return h},
 myoffers:function(){var st=['active','paused','closed'],lab={active:'Active',paused:'Paused',closed:'Closed'},h=myHd('My Offers','Your Personal Offers')+myTabs('offers',['Active','Paused','Closed'],st),cur_=st[MY.tab.offers],a=MY.offers.filter(function(x){return x.s==cur_});
  a.forEach(function(o){h+=myCard('<div class="flex"><div class="thumb" style="padding:0;overflow:hidden"><img src="'+o.img+'" alt=""></div><div class="grow"><div class="tag">PERSONAL OFFER</div><div class="name">'+fxE(o.t)+'</div><div class="small">'+fxE([bvCurrency(o.p),o.c].filter(Boolean).join(' · '))+'</div><span class="chip'+(o.s=='active'?'':' c')+'" style="margin-top:2.9px">'+lab[o.s]+'</span></div></div><div class="btns">'+myPill('','Edit','edit:offers:'+o.id)+(o.s=='closed'?myPill('o','Reopen','do:offers:'+o.id+':close'):myPill('o',o.s=='paused'?'Resume':'Pause','do:offers:'+o.id+':pause')+myPill('o','Close','do:offers:'+o.id+':close'))+myDel('offers',o)+'</div>')});
  if(!a.length)h+='<div class="empty">No '+lab[cur_]+' Offers.</div>';
  return h+myCta('Create Personal Offer','fx:po')},
 mybiz:function(){var h=myHd('My Businesses','Each Business Page is separate')+'<div class="info">Connections, activity and promotions below belong only to the Business Page they appear under.</div>';
  MY.biz.forEach(function(b){h+=myCard('<div class="flex"><div class="thumb" style="padding:0;overflow:hidden"><img src="'+b.img+'" alt=""></div><div class="grow"><div class="tag">BUSINESS</div><div class="name">'+fxE(b.n)+'</div><div class="sub">'+fxE(b.sub)+'</div></div><span class="chip'+(b.s=='paused'?' c':'')+'">'+(b.s=='paused'?'Paused':'Active')+'</span></div><div class="stats"><div><b>'+b.conn+'</b><span>Successful Connections</span></div><div><b>'+b.req+'</b><span>New requests</span></div><div><b>'+(b.s=='paused'?'No':'Yes')+'</b><span>Can promote</span></div></div><div class="btns">'+myPill('','View Business',flBzCmd(b))+myPill('o','Edit','edit:biz:'+b.id)+myPill('o',b.s=='paused'?'Resume':'Pause','do:biz:'+b.id+':pause')+myPill('o','Promote','pm:open:biz:'+b.id)+myDel('biz',b)+'</div>')});
  if(!MY.biz.length)h+='<div class="empty">No Business Pages yet.</div>';
  return h+myCta('Create another Business Page','fx:bp',1)},
 mypro:function(){var h=myHd('My Professional Profiles','Each profile is separate')+'<div class="info">Requests and successful connections belong to each profile separately. Contact details stay private; chat inside Birvoy.</div>';
  MY.pro.forEach(function(b){h+=myCard('<div class="flex"><div class="av" style="padding:0;overflow:hidden"><img src="'+b.img+'" alt=""></div><div class="grow"><div class="tag">PROFESSIONAL</div><div class="name">'+fxE(b.n)+'</div><div class="sub">'+fxE(b.sub)+'</div></div><span class="chip'+(b.s=='paused'?' c':'')+'">'+(b.s=='paused'?'Paused':'Active')+'</span></div><div class="stats"><div><b>'+b.conn+'</b><span>Successful Connections</span></div><div><b>'+b.req+'</b><span>'+(b.req==1?'New request':'New requests')+'</span></div><div><b>'+(b.s=='paused'?'No':'Yes')+'</b><span>Can promote</span></div></div><div class="btns">'+myPill('','View Profile',flPrCmd(b))+myPill('o','Edit','edit:pro:'+b.id)+myPill('o',b.s=='paused'?'Resume':'Pause','do:pro:'+b.id+':pause')+myPill('o','Promote','pm:open:pro:'+b.id)+myDel('pro',b)+'</div>')});
  if(!MY.pro.length)h+='<div class="empty">No Professional Profiles yet.</div>';
  return h+myCta('Create another Professional Profile','fx:pp',1)},
 mypromo:function(){var h=myHd('Promotion Dashboard','Results from each campaign')+myTabs('promo',['Active','Past'],['active','past']),act=MY.promo.filter(function(x){return x.s=='active'}),past=MY.promo.filter(function(x){return x.s=='past'});
  function card(p){var on=p.s=='active',vl=p.vl||'Page Views',rl=p.rl||'Connection Requests';
   return myCard('<div class="flex"><div class="grow"><div class="tag">'+p.kind+'</div><div class="name">'+fxE(p.n)+'</div></div><span class="chip '+(on?'f':'c')+'">'+(on?'Active':'Stopped')+'</span></div>'+(on?'<div class="small" style="margin-top:2.9px">14-day promotion · Day '+p.day+' · <b style="color:var(--navy)">FREE · KD 0</b></div><div class="bar"><u style="width:'+Math.round(p.day/14*100)+'%"></u></div>':'')+'<div class="stats"><div><b>'+p.v+'</b><span>'+vl+'</span></div><div><b>'+p.rq+'</b><span>'+rl+'</span></div><div><b>'+p.sc+'</b><span>Successful Connections</span></div></div><div class="btns">'+myPill('','View Results','ph:results:Promotion Results:'+p.id)+(on?myPill('o','View Business','go:'+p.to)+myPill('d','Stop promotion','do:promo:'+p.id+':stop'):myPill('','Promote Again','do:promo:'+p.id+':again'))+'</div>')}
  if(MY.tab.promo==0){act.forEach(function(p){h+=card(p)});if(!act.length)h+='<div class="empty">No active promotions. Promote a Business Page, Professional Profile or Offer to start one.</div>'}
  else{past.forEach(function(p){h+=card(p)});if(!past.length)h+='<div class="empty">No past promotions yet.</div>'}
  return h+'<div class="empty">Only activity from a campaign counts toward its results. Promote Again starts a new campaign with fresh counters.</div>'},
 mysettings:function(){function row(l,v,cmd){return '<div role="button" tabindex="0" data-act="my" data-my="'+(cmd||'ph:settings:'+l)+'">'+l+'<em>'+(v||'›')+'</em></div>'}
  var h=myHd('Settings','Your account and privacy');
  h+='<div class="grp">Account</div><div class="list">'+row('Edit Personal Profile','','nv:myself:x')+row('Email &amp; Account Details','','ph:settings:Account Details')+row('Change Password')+row('Language','English')+'<div role="button" tabindex="0" data-act="my" data-my="ph:delete:Delete Account"><span class="warn">Delete Account</span><em>›</em></div></div>';
  h+='<div class="grp">Privacy &amp; Safety</div><div class="list">'+row('Privacy Settings')+row('Blocked Users')+row('Report an Issue')+'</div>';
  h+='<div class="grp">Notifications</div><div class="list">'+row('Notification Preferences')+'</div>';
  h+='<div class="grp">Legal</div><div class="list">'+row('Terms of Use')+row('Privacy Policy')+'</div>';
  h+='<div class="grp">Session</div><div class="list">'+row('Logout','','logout')+'</div>';
  return h+'<div class="empty" style="margin-top:7.2px">Blocking stops future matching and contact between you and that person. Contact details are never shared automatically. Deleting your account stops your listings and requests; past chats stay as read-only history.</div>'}
};

var PHK={edit:{tag:'EDIT',sub:'Edit screen'},view:{tag:'VIEW',sub:'View page'},share:{tag:'SHARE',sub:'Share'},promo:{tag:'PROMOTION SETUP',sub:'Choose how to promote'},results:{tag:'PROMOTION RESULTS',sub:'Campaign results'},settings:{tag:'SETTINGS',sub:'Account and privacy'},delete:{tag:'ACCOUNT',sub:'Confirm deletion'},capture:{tag:'INPUT',sub:'Add to your need'},list:{tag:'LIST',sub:'Browse more'},request:{tag:'REQUEST',sub:'Send a request'}};
MYR.myph=function(){var p=MY.ph||{k:'view',t:'Placeholder',x:''},K=PHK[p.k]||PHK.view,pr=p.k=='results'?MY.promo.filter(function(x){return x.id==p.x})[0]:null,
 h='<button type="button" class="phb" data-act="my" data-my="back">'+I.back+'Back</button>'+myHd(fxE(p.t),pr?fxE(pr.n):(p.x&&p.k!='results'?fxE(p.x):K.sub));
 if(p.k=='delete')return h+'<div class="info"><b>This affects your whole account.</b> Your Needs and Personal Offers will stop, your Business Pages and Professional Profiles will disappear from discovery, and pending requests and active connections will end. Past chats stay as read-only history.</div><div class="phbox">Placeholder: Delete Account confirmation</div>'+myCta('Delete my account','phdel',0).replace('class="cta"','class="cta red"')+'<div style="height:8px"></div>'+myCta('Cancel','back',1);
 h+='<div class="phbox"><div class="tag">'+K.tag+'</div><div class="name">'+fxE(p.t)+'</div><div class="small" style="margin-top:4px">Placeholder screen. The real '+({edit:'edit form',share:'share sheet',promo:'promotion setup',results:'results detail',settings:'settings page',capture:p.t.toLowerCase()+' screen',list:'list',request:'request screen'}[p.k]||'page')+' will open here.</div></div>';
 if(pr)h+='<div class="stats"><div><b>'+pr.v+'</b><span>'+(pr.vl||'Page Views')+'</span></div><div><b>'+pr.rq+'</b><span>'+(pr.rl||'Connection Requests')+'</span></div><div><b>'+pr.sc+'</b><span>Successful Connections</span></div></div>';
 return h+(p.t=='Camera'?myCta('Upload a photo instead','ph:capture:Photo upload',1)+'<div style="height:8px"></div>':'')+myCta('Back','back',1)};
(function(){var o=$('#s-mysettings'),n=o.cloneNode(true);n.id='s-myph';n.setAttribute('aria-label','Placeholder');n.classList.remove('on');n.querySelector('#myb-mysettings').id='myb-myph';o.parentNode.insertBefore(n,o.nextSibling)})();
function myRender(id){var b=$('#myb-'+id);if(b&&MYR[id]){var v=b.parentNode,t=v.scrollTop;b.innerHTML=MYR[id]();v.scrollTop=t}}
function myShow(id){MY.arm=null;clearTimeout(MY.at);var b=$('#myb-'+id);if(b)b.parentNode.scrollTop=0;myRender(id)}
function myFind(l,id){var a=MY[l];for(var i=0;i<a.length;i++)if(a[i].id==id)return[a,i]}
function myDo(l,id,v){var f=myFind(l,id);if(!f)return;var a=f[0],i=f[1],it=a[i];
 if(v=='del'){if(MY.arm!=l+id){MY.arm=l+id;clearTimeout(MY.at);MY.at=setTimeout(function(){MY.arm=null;if(/^my/.test(cur))myRender(cur)},3000);myRender(cur);return}
  MY.arm=null;a.splice(i,1);toast('Deleted');myRender(cur);return}
 if(v=='pause'){it.s=it.s=='paused'?'active':'paused';toast(it.s=='paused'?'Paused':'Resumed')}
 else if(v=='close'){it.s=it.s=='closed'?'active':'closed';toast(it.s=='closed'?'Offer closed':'Offer reopened')}
 else if(v=='stop'){it.s='past';it.p=null;toast('Promotion stopped');MY.tab.promo=1}
 myRender(cur)}
function myAddOffer(d){var ix=0;d.ph.forEach(function(x,i){if(x&&!ix)ix=i+1});var img=ix?fxPhoto('po',ix-1):MYIMG.apt,e=MY.offers.filter(function(o){return o.t==d.title})[0];
 if(e){e.p=d.price||e.p;e.c=d.cond||'';e.img=img;e.s='active'}else MY.offers.unshift({id:++MY.seq,t:d.title,p:d.price||'',c:d.cond||'',img:img,s:'active'})}
function myPub(id,d){if(id=='sn'){MY.tab.needs=0;MY.needs.unshift({id:++MY.seq,t:d.desc.trim(),b:parseInt(d.budget,10)||0,w:d.when=='date'&&d.date?fxDay(d.date,1):'Flexible',r:0,s:'active'})}
 else if(id=='po'){MY.tab.offers=0;myAddOffer(d)}
 else if(id=='bp'){var e=MY.biz.filter(function(b){return b.n==d.name})[0];if(e){e.s='active';if(d.logo)e.img=d.logo}else MY.biz.unshift({id:++MY.seq,n:d.name,sub:d.tags[0]||'Business',img:d.logo||bvPh(d.name,'bp'),conn:0,req:0,s:'active'})}
 else if(id=='pp'){var e2=MY.pro.filter(function(b){return b.n==d.name})[0];if(e2){e2.s='active';e2.sub=d.role;if(d.logo)e2.img=d.logo}else MY.pro.unshift({id:++MY.seq,n:d.name,sub:d.role,img:d.logo||bvPh(d.name,'pp'),conn:0,req:0,s:'active'})}}
acts.open_my=function(){go('my')};
acts.ph=function(el){var a=el.getAttribute('data-ph').split(':');MY.ph={k:a[0],t:a[1],x:a[2]||'',b:cur};go('myph')};
acts.my_top=function(){if(cur!='my')go('my');else{var v=$('#myb-my').parentNode;if(v.scrollTo)v.scrollTo({top:0,behavior:'smooth'})}};
acts.my=function(el){var a=el.getAttribute('data-my').split(':'),k=a[0];
 if(k=='go')go(a[1]);
 else if(k=='tab'){MY.tab[a[1]]=+a[2];myRender(cur)}
 else if(k=='fx')FXH.start(a[1]);
 else if(k=='soon')toast(a[1]+' isn’t part of this flow');
 else if(k=='ph'){MY.ph={k:a[1],t:a[2],x:a[3]||'',b:cur=='myph'&&MY.ph?MY.ph.b:cur};go('myph');myRender('myph')}
 else if(k=='back')go(MY.ph&&MY.ph.b||'my');
 else if(k=='phdel'){toast('Account deleted');go('welcome')}
 else if(k=='do')myDo(a[1],+a[2],a[3]);
 else if(k=='logout'){toast('Logged out');go('welcome')}};
document.addEventListener('keydown',function(e){var t=e.target;if((e.key=='Enter'||e.key==' ')&&t.getAttribute&&t.getAttribute('data-act')=='my'&&t.getAttribute('role')=='button'){e.preventDefault();t.click()}});

/* ===== Dummy listings: Featured Businesses / Featured Professionals / Personal profile ===== */
var FL_ICO={
 car:'<path d="M4 15l1.6-4.6A2 2 0 0 1 7.5 9h9a2 2 0 0 1 1.9 1.4L20 15M3 15h18v3.5H3zM6.5 18.5V20M17.5 18.5V20"/><circle cx="7.5" cy="15" r=".6"/><circle cx="16.5" cy="15" r=".6"/>',
 tv:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
 coffee:'<path d="M4 8h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM17 9h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2"/>',
 dish:'<path d="M3 17h18M5 17a7 7 0 0 1 14 0M12 8V6M10.5 6h3"/>',
 cut:'<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8 7.5L20 18M8 16.5L20 6"/>',
 dumb:'<path d="M6 7v10M3 10v4M18 7v10M21 10v4M6 12h12"/>',
 spark:'<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
 print:'<path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><rect x="7" y="14" width="10" height="7"/>',
 star:'<path d="M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17l-5.6 3 1.3-6.2L3 9.5l6.3-.7z"/>',
 flower:'<circle cx="12" cy="11" r="2.4"/><path d="M12 8.6C11 5 12 3 12 3s1 2 0 5.6zM14.4 11c3.6-1 5.6 0 5.6 0s-2 1-5.6 0zM12 13.4c1 3.6 0 5.6 0 5.6s-1-2 0-5.6zM9.6 11C6 12 4 11 4 11s2-1 5.6 0zM12 19v2"/>',
 cam:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
 pen:'<path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3"/>',
 code:'<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
 bolt:'<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
 book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
 chart:'<path d="M5 20V11M12 20V4M19 20v-6"/>',
 cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
 home:'<path d="M4 11l8-7 8 7v9H4zM10 20v-6h4v6"/>',
 snow:'<path d="M12 3v18M4.5 7.5l15 9M4.5 16.5l15-9"/>',
 bag:'<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>'
};
function flSvg(s){return 'data:image/svg+xml;utf8,'+encodeURIComponent(s)}
function flGrad(id,a,b){return '<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient></defs>'}
function flLogo(ic,a,b){return flSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'+flGrad('g',a,b)+'<rect width="64" height="64" fill="url(#g)"/><g transform="translate(14 14) scale(1.5)" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+FL_ICO[ic]+'</g></svg>')}
function flCover(ic,a,b){return flSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 140" preserveAspectRatio="xMidYMid slice">'+flGrad('g',a,b)+'<rect width="360" height="140" fill="url(#g)"/><circle cx="300" cy="20" r="80" fill="#fff" fill-opacity=".08"/><circle cx="40" cy="150" r="70" fill="#fff" fill-opacity=".07"/><g transform="translate(212 6) scale(5.4)" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">'+FL_ICO[ic]+'</g></svg>')}
function flTile(ic,a,b,t){return flSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90">'+flGrad('g',a,b)+'<rect width="120" height="90" fill="url(#g)"/><circle cx="100" cy="12" r="40" fill="#fff" fill-opacity=".1"/><g transform="translate(40 21) scale(1.7)" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+FL_ICO[ic]+'</g><text x="8" y="82" font-family="Helvetica,Arial,sans-serif" font-size="9" font-weight="700" fill="#fff" fill-opacity=".9">'+t+'</text></svg>')}
function flPerson(a,b,v){var f=v==1?'<path d="M26 34c0-12 6-20 14-20s14 8 14 20c0 6-2 9-4 12H30c-2-3-4-6-4-12z" fill="#fff" fill-opacity=".5"/>':'';return flSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">'+flGrad('g',a,b)+'<rect width="80" height="80" fill="url(#g)"/>'+f+'<circle cx="40" cy="31" r="13" fill="#fff" fill-opacity=".94"/><path d="M13 80c0-17 11-27 27-27s27 10 27 27z" fill="#fff" fill-opacity=".94"/></svg>')}

var FLB=[];
var FLP=[];
FLB.forEach(function(b){b.lg=b.img=='logo'?MYIMG.logo:flLogo(b.ic,b.c1,b.c2);b.cv=flCover(b.ic,b.c1,b.c2);b.gal=[flTile(b.ic,b.c1,b.c2,'Storefront'),flTile(b.ic,b.c2,b.c1,'Our work'),flTile('star',b.c1,b.c2,'Customers')]});
var FLPI={'Home':'home','Creative':'cam','Wellness':'dumb','Learning':'book','Business':'chart'};
FLP.forEach(function(p,i){p.av=p.img=='sara'?MYIMG.sara:flPerson(p.c1,p.c2,p.v);var ic={p1:'home',p2:'cam',p3:'pen',p4:'bolt',p5:'dumb',p6:'code',p7:'book',p8:'chart',p9:'cal',p10:'snow'}[p.id];p.ic=p.ic||ic;p.cv=flCover(ic,p.c1,p.c2);p.gal=[flTile(ic,p.c1,p.c2,'Recent work'),flTile(ic,p.c2,p.c1,'Project'),flTile('star',p.c1,p.c2,'Happy clients')]});
var FLG={b:['All','Auto','Food','Shops','Services','Wellness'],p:['All','Home','Creative','Wellness','Learning','Business']};
/* ---- render + navigation for the new screens ---- */
MY.st={};MY.bk={};MY.flf={b:'All',p:'All'};MY.saved={};
function flGet(id){var a=FLB.concat(FLP);for(var i=0;i<a.length;i++)if(a[i].id==id)return a[i]}
function flByName(n){var a=FLB.concat(FLP);for(var i=0;i<a.length;i++)if(a[i].n==n)return a[i]}
function flStars(r){return '<span class="stars"><svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17l-5.6 3 1.3-6.2L3 9.5l6.3-.7z"/></svg>'+r.toFixed(1)+'</span>'}
function flBack(){return '<button type="button" class="phb" data-act="my" data-my="nvb">'+I.back+'Back</button>'}
function flCmd(id){var it=flGet(id);return 'nv:'+(id.charAt(0)=='b'?'mybview':'mypview')+':'+id}
function flChips(k){var h='<div class="fchips" role="tablist">';FLG[k].forEach(function(g){h+='<i class="'+(MY.flf[k]==g?'on':'')+'" role="tab" aria-selected="'+(MY.flf[k]==g)+'" data-act="my" data-my="flt:'+k+':'+g+'">'+g+'</i>'});return h+'</div>'}
function flVer(){return '<svg class="ver" viewBox="0 0 24 24" aria-label="Verified"><path d="M12 2l2.4 2 3.1-.2.9 3 2.6 1.7-1 3 1 3-2.6 1.7-.9 3-3.1-.2L12 22l-2.4-2-3.1.2-.9-3L3 15.5l1-3-1-3L5.6 7.8l.9-3 3.1.2z"/><path d="M8.5 12.2l2.5 2.5 4.5-4.7" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'}
function flRow(c,l,r,cmd){return '<div class="drow"'+(cmd?' role="button" tabindex="0" data-act="my" data-my="'+cmd+'"':'')+'><div class="ico"><svg viewBox="0 0 24 24">'+c+'</svg></div><div class="grow"><small>'+l+'</small><b>'+r+'</b></div>'+(cmd?'<span class="chev">›</span>':'')+'</div>'}
var FLI={pin:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.2"/>'};
function flMap(c1){return '<svg class="mapsv" viewBox="0 0 320 90" preserveAspectRatio="xMidYMid slice"><rect width="320" height="90" fill="#E8F0F7"/><path d="M0 60C60 50 90 75 150 62S260 40 320 55V90H0z" fill="#CFE6F3"/><g stroke="#fff" stroke-width="6" fill="none"><path d="M-10 30L330 18"/><path d="M110-10L140 100"/><path d="M230-10L205 100"/></g><g stroke="#fff" stroke-width="3" fill="none"><path d="M0 75L330 70"/><path d="M60-5L40 100"/></g><g transform="translate(160 22)"><path d="M0 40S-14 26-14 13a14 14 0 0 1 28 0C14 26 0 40 0 40z" fill="'+c1+'"/><circle cy="13" r="5" fill="#fff"/></g></svg>'}

MYR.myflb=function(){var h=flBack()+myHd('Featured Businesses','Local businesses near you, verified by Birvoy')+flChips('b'),g=MY.flf.b,L=FLB.filter(function(b){return g=='All'||b.g==g});
 
 h+='<div class="cnt2">'+L.length+' business'+(L.length==1?'':'es')+' · listed A to Z</div>';
 L.slice().sort(function(a,b){return a.n.localeCompare(b.n)}).forEach(function(b){h+='<div class="card bz" role="button" tabindex="0" data-act="my" data-my="'+flCmd(b.id)+'"><div class="cover" style="background-image:url(\''+b.cv+'\')">'+(b.gold?'<span class="chip f gold">★ Golden Find</span>':'')+'<span class="open">'+fxE(b.open)+'</span></div><div class="bzb"><img class="blogo" src="'+b.lg+'" alt=""><div class="grow"><div class="name">'+fxE(b.n)+(b.isnew?'':flVer())+'</div><div class="sub">'+fxE(b.cat)+' · '+fxE(b.area)+'</div></div>'+'</div><div class="tags">'+b.tags.map(function(t){return '<span class="chip">'+fxE(t)+'</span>'}).join('')+'</div><div class="foot2"><span class="small">'+b.conn+' connections</span><span class="pill">View Business</span></div></div>'});
 return h+'<div class="empty">Showing '+L.length+' of '+FLB.length+' featured businesses. Businesses are featured by rating, response time and successful connections.</div>'};
MYR.myflp=function(){var h=flBack()+myHd('Featured Professionals','Trusted people ready to help you')+flChips('p'),g=MY.flf.p,L=FLP.filter(function(b){return !b.searchOnly&&(g=='All'||b.g==g)});
 h+='<div class="cnt2">'+L.length+' professional'+(L.length==1?'':'s')+' · sorted by successful connections</div>';
 L.slice().sort(function(a,b){return b.conn-a.conn}).forEach(function(p){h+='<div class="card pr" role="button" tabindex="0" data-act="my" data-my="'+flCmd(p.id)+'"><div class="flex"><div class="pav"><img src="'+p.av+'" alt=""><i class="dot2 '+(p.avail=='Available today'?'on':'')+'"></i></div><div class="grow"><div class="name">'+fxE(p.n)+(p.v?flVer():'')+'</div><div class="sub">'+fxE(p.role)+'</div><div class="small">'+p.yrs+' yrs experience</div></div></div><div class="pmeta"><div><b>'+fxE(p.rate)+'</b><span>Starting rate</span></div><div><b>'+p.conn+'</b><span>Connections</span></div><div><b class="'+(p.avail=='Available today'?'ok':'')+'">'+fxE(p.avail)+'</b><span>'+fxE(p.resp)+'</span></div></div><div class="foot2"><span class="small">'+fxE(p.area)+' · '+fxE(p.langs)+'</span><span class="pill">View Profile</span></div></div>'});
 return h+'<div class="empty">Showing '+L.length+' of '+FLP.length+' featured professionals. Rates are starting prices; final quotes are agreed in Chats.</div>'};

function flActions(it,biz){var sv=MY.saved[it.id];return '<div class="acts3"><button type="button" class="cta" data-act="my" data-my="req:'+it.id+'">'+'Send Request'+'</button><button type="button" class="sq" aria-label="Share" data-act="my" data-my="sh:'+it.id+'"><svg viewBox="0 0 24 24"><path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/></svg></button></div>'}
function flGal(it){if(it.gal&&it.gal.length>=2)return offerGallery({t:it.n||it.t||'Listing',gal:it.gal});return '<div class="gal">'+it.gal.map(function(g){return '<img src="'+g+'" alt="">'}).join('')+'</div>'}
function flRev(it){return it.rev.map(function(r){return '<div class="rev"><div class="flex"><div class="av" style="width:30px;height:30px;font-size:12px">'+fxE(r[0].charAt(0))+'</div><b>'+fxE(r[0])+'</b><span class="stars s grow" style="text-align:right">★★★★★</span></div><p>'+fxE(r[1])+'</p></div>'}).join('')}
MYR.mybview=function(){var b=flGet(MY.st.mybview||'b1'),h=flBack();
 h+='<div class="hero" style="background-image:url(\''+b.cv+'\')"><span class="open">'+fxE(b.open)+'</span></div><div class="idrow"><img class="blogo xl" src="'+b.lg+'" alt=""><div class="grow"><div class="tag">BUSINESS PAGE</div><div class="name xl">'+fxE(b.n)+(b.isnew?'':flVer())+'</div><div class="sub">'+fxE(b.cat)+'</div></div></div>';
 h+='<div class="tags" style="margin:7px 0 2px">'+b.tags.map(function(t){return '<span class="chip">'+fxE(t)+'</span>'}).join('')+'</div>';
 h+='<div class="stats"><div><b>'+b.conn+'</b><span>Successful Connections</span></div><div><b>'+b.yrs+' yrs</b><span>In business</span></div><div><b>Since 2026</b><span>On Birvoy</span></div></div>'+flActions(b,1);
 h+='<div class="sec" style="margin-top:12px">About</div><p class="para">'+fxE(b.about)+'</p>';
 h+='<div class="sec">Products &amp; Services</div><div class="list">'+b.items.map(function(x){return '<div><span>'+fxE(x[0])+'</span><em>'+fxE(x[1])+'</em></div>'}).join('')+'</div>';
 h+='<div class="sec">Photos</div>'+flGal(b);
 h+='<div class="sec">Opening hours</div><div class="list">'+b.hrs.map(function(x){return '<div><span>'+fxE(x[0])+'</span><em>'+fxE(x[1])+'</em></div>'}).join('')+'</div>';
 h+='<div class="sec">Find us</div><div class="mapbox">'+flMap(b.c1)+'</div>'+flRow(FLI.pin,'Area',fxE(b.area)+', Kuwait')+flRow(FLI.globe,'Reply time','Usually within 1 hour');
 h+='<div class="empty">Birvoy does not share phone numbers or contact details automatically. Send a request and chat inside Birvoy.</div>';
 return h};
MYR.mypview=function(){var p=flGet(MY.st.mypview||'p1'),h=flBack();
 h+='<div class="hero" style="background-image:url(\''+p.cv+'\')"></div><div class="idrow pidr"><img class="pbig" src="'+p.av+'" alt=""><div class="grow"><div class="tag">PROFESSIONAL PROFILE</div><div class="name xl">'+fxE(p.n)+(p.v?flVer():'')+'</div><div class="sub">'+fxE(p.role)+'</div><div class="small">'+fxE(p.area)+', Kuwait</div></div></div>';
 h+='<div class="availbar '+(p.avail=='Available today'?'on':'')+'"><i></i>'+fxE(p.avail)+' · '+fxE(p.resp)+'</div>';
 h+='<div class="stats"><div><b>Since 2026</b><span>On Birvoy</span></div><div><b>'+p.conn+'</b><span>Successful Connections</span></div><div><b>'+p.yrs+' yrs</b><span>Experience</span></div></div>'+flActions(p,0);
 h+='<div class="sec" style="margin-top:12px">About</div><p class="para">'+fxE(p.about)+'</p>';
 h+='<div class="sec">Skills</div><div class="tags">'+p.tags.map(function(t){return '<span class="chip">'+fxE(t)+'</span>'}).join('')+'</div>';
 h+='<div class="sec">Services &amp; rates</div><div class="list">'+p.items.map(function(x){return '<div><span>'+fxE(x[0])+'</span><em>'+fxE(x[1])+'</em></div>'}).join('')+'</div>';
 h+='<div class="sec">Portfolio</div>'+flGal(p);
 h+='<div class="sec">Details</div>'+flRow(FLI.tag,'Starting rate',fxE(p.rate))+flRow(FLI.globe,'Languages',fxE(p.langs))+flRow(FLI.pin,'Works in','Kuwait City and nearby areas');
 h+='<div class="empty">Birvoy does not share phone numbers or contact details automatically. Send a request and chat inside Birvoy.</div>';
 return h};
/* Personal profile (home avatar) */
function flMe(){return flSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="#013F63"/><circle cx="40" cy="31" r="13" fill="#fff"/><path d="M13 80c0-17 11-27 27-27s27 10 27 27z" fill="#fff"/></svg>')}
MYR.myself=function(){var d=MY,h=flBack();
 h+='<div class="hero me" style="background-image:url(\''+flCover('star','#013F63','#5AC0DE')+'\')"></div><div class="idrow pidr"><img class="pbig" src="'+flMe()+'" alt=""><div class="grow"><div class="tag">PERSONAL PROFILE</div><div class="name xl">Roderick Monsalve</div><div class="sub">Salmiya, Kuwait · Member since March 2026</div></div></div>';
 h+='<div class="tags" style="margin:8px 0 2px"><span class="chip">Phone verified</span><span class="chip">Email verified</span><span class="chip">Civil ID verified</span></div>';
 h+='<div class="stats"><div><b>12</b><span>Successful Connections</span></div><div><b>'+d.needs.length+'</b><span>Needs posted</span></div><div><b>'+d.offers.length+'</b><span>Offers posted</span></div></div>';
 h+='<div class="acts3"><button type="button" class="cta" data-act="my" data-my="soon:Edit profile">Edit Profile</button><button type="button" class="sq" aria-label="Settings" data-act="my" data-my="nv:mysettings:x"><svg viewBox="0 0 24 24"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="M19.4 13.5a7.7 7.7 0 0 0 0-3l2-1.5-2-3.5-2.3.9a8 8 0 0 0-2.6-1.5L14.1 2H9.9L9.5 4.9a8 8 0 0 0-2.6 1.5l-2.3-.9-2 3.5 2 1.5a7.7 7.7 0 0 0 0 3l-2 1.5 2 3.5 2.3-.9a8 8 0 0 0 2.6 1.5l.4 2.9h4.2l.4-2.9a8 8 0 0 0 2.6-1.5l2.3.9 2-3.5-2-1.5Z"/></svg></button></div>';
 h+='<div class="sec" style="margin-top:12px">About me</div><p class="para">Based in Salmiya and always looking for trusted local help. I use Birvoy to find designers and tradespeople, and to pass on things I no longer need.</p>';
 h+='<div class="sec">Interests</div><div class="tags"><span class="chip">Interior Design</span><span class="chip">Cycling</span><span class="chip">Home Improvement</span><span class="chip">Electronics</span></div>';
 h+='<div class="sec">Contact</div>'+flRow(FLI.phone,'Mobile (private)','+965 •••• 5821')+flRow(FLI.pin,'Area','Salmiya, Kuwait')+flRow(FLI.globe,'Languages','English · Arabic');
 h+='<div class="sec">Your pages</div><div class="list"><div role="button" tabindex="0" data-act="my" data-my="go:mybiz"><span>My Businesses</span><em>'+d.biz.length+'</em></div><div role="button" tabindex="0" data-act="my" data-my="go:mypro"><span>My Professional Profiles</span><em>'+d.pro.length+'</em></div><div role="button" tabindex="0" data-act="my" data-my="go:myneeds"><span>My Needs</span><em>'+d.needs.length+'</em></div><div role="button" tabindex="0" data-act="my" data-my="go:myoffers"><span>My Offers</span><em>'+d.offers.length+'</em></div></div>';
 h+='<div class="sec">Recent activity</div><div class="list"><div><span>Needed an interior designer</span><em>Posted</em></div><div><span>Listed 2-Bedroom Apartment</span><em>Active</em></div><div><span>Connected with Dana Al-Mutairi</span><em>Photography</em></div></div>';
 return h+'<div class="empty">Only your first name and area are shown to people you haven’t connected with.</div>'};

/* clone a My screen for each new id (same trick as myph) */
['myflb','myflp','mybview','mypview','myself'].forEach(function(id){var o=$('#s-mysettings'),n=o.cloneNode(true);n.id='s-'+id;n.setAttribute('aria-label',{myflb:'Featured Businesses',myflp:'Featured Professionals',mybview:'Business Page',mypview:'Professional Profile',myself:'Personal Profile'}[id]);n.classList.remove('on');n.querySelector('#myb-mysettings').id='myb-'+id;o.parentNode.appendChild(n)});
/* navigation: remember where we came from so Back works from anywhere */
var _myAct=acts.my;
acts.my=function(el){var a=el.getAttribute('data-my').split(':'),k=a[0];
 if(k=='nv'){var to=a[1];if(to!=cur){MY.bk[to]=cur}MY.st[to]=a[2];go(to);return}
 if(k=='nvb'){var b=MY.bk[cur]||'home';go(b);if(b=='home')fset(MY.hf||0,true);return}
 if(k=='flt'){MY.flf[a[1]]=a.slice(2).join(':');myRender(cur);return}
 if(k=='req'){var it=flGet(a[1]);toast('Request sent to '+it.n);return}
 if(k=='sv'){MY.saved[a[1]]=!MY.saved[a[1]];toast(MY.saved[a[1]]?'Saved to your list':'Removed from saved');myRender(cur);return}
 if(k=='sh'){toast('Link copied');return}
 if(k=='soon'){toast(a[1]+' isn’t part of this flow');return}
 if(k=='go'&&a[1]){MY.bk[a[1]]=MY.bk[a[1]]||'my';}
 _myAct(el)};
/* home hooks */
acts.fl_open=function(){MY.hf=fidx;var to=fidx==1?'myflp':'myflb';MY.bk[to]='home';go(to)};
acts.nv_open=function(el){MY.hf=fidx;var a=el.getAttribute('data-nv').split(':');MY.bk[a[0]]='home';MY.st[a[0]]=a[1];go(a[0])};
acts.open_prof=function(){MY.hf=fidx;MY.bk.myself='home';go('myself')};
function flOwnF(b,pre){var u=curUser(),f=u&&flGet(pre+'_'+u.id+'_'+b.id);if(f)return f;f=flByName(b.n);return f&&f.usr&&(!u||f.usr!=u.id)?null:f}
function flBzCmd(b){var f=flOwnF(b,'bu');return f&&f.id.charAt(0)=='b'?'nv:mybview:'+f.id:'ph:view:View Business:Business Page'}
function flPrCmd(b){var f=flOwnF(b,'pu');return f&&f.id.charAt(0)=='p'?'nv:mypview:'+f.id:'ph:view:View Profile:Professional Profile'}


/* ===== Offers + Needs lists, request flow wiring, editable personal profile ===== */
FL_ICO.phone='<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>';
FL_ICO.sofa='<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3zM6 18v2M18 18v2"/>';
FL_ICO.bike='<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-7h5l3 7M10 9L8 6H6M13 13h-4"/>';
FL_ICO.baby='<circle cx="9" cy="19" r="1.8"/><circle cx="17" cy="19" r="1.8"/><path d="M4 5h3l2 9h9a5 5 0 0 0-5-8H8"/>';
FL_ICO.desk='<path d="M3 8h18M5 8v12M19 8v12M5 14h14"/>';
FL_ICO.music='<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="16" r="2"/>';
FL_ICO.wrench='<path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z"/>';
FL_ICO.person='<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>';

var OFFER_PHOTOS=[];
var OFFER_GALLERY_ASSETS={};
var FLO=[];
var FLN=[];
FLO.forEach(function(o){if(OFFER_GALLERY_ASSETS[o.id])o.gal=(o.gal||[]).concat(OFFER_GALLERY_ASSETS[o.id]);o.art=(o.gal&&o.gal[0])||flTile(o.ic,o.c1,o.c2,'');o.cv=(o.gal&&o.gal[0])||flCover(o.ic,o.c1,o.c2)});
FLN.forEach(function(n){var m={Items:['#14587A','#5AC0DE'],Services:['#0B2A47','#1B6FA8'],Learning:['#B5538A','#F2A65A'],Events:['#7A1F5C','#E5799B']}[n.g];n.c1=m[0];n.c2=m[1]});
FLG.o=['All','Property','Electronics','Furniture','Vehicles','Kids'];
FLG.n=['All','Items','Services','Learning','Events'];
MY.flf.o='All';MY.flf.n='All';
function flFind(a,id){for(var i=0;i<a.length;i++)if(a[i].id==id)return a[i]}

MYR.myoffl=function(){var g=MY.flf.o,L=FLO.filter(function(o){return g=='All'||o.g==g}),
 h=flBack()+myHd('Personal Offers','What people near you are offering')+flChips('o')+'<div class="cnt2">'+L.length+' offer'+(L.length==1?'':'s')+' · newest first</div><div class="ogrid">';
 L.forEach(function(o){h+='<div class="card oc" role="button" tabindex="0" data-act="my" data-my="od:'+o.id+'"><img src="'+o.art+'" alt=""><div class="ob"><div class="name">'+fxE(o.t)+'</div><div class="pr2">'+fxE(o.p)+'</div><div class="small">'+fxE(o.area)+' · '+fxE(o.c)+'</div><div class="small ago">'+fxE(o.ago)+'</div></div></div>'});
 return h+'</div><div class="empty">Personal Offers are things from people, not businesses. Tap one to see details and say you’re interested.</div>'};
MYR.myneedl=function(){var g=MY.flf.n,L=FLN.filter(function(o){return !o.searchOnly&&(g=='All'||o.g==g)}),
 h=flBack()+myHd('Community Needs','People nearby asking for help')+flChips('n')+'<div class="cnt2">'+L.length+' need'+(L.length==1?'':'s')+' · newest first</div>';
 L.forEach(function(n){h+='<div class="card nc" role="button" tabindex="0" data-act="my" data-my="nd:'+n.id+'"><div class="flex"><div class="nic" style="background:linear-gradient(135deg,'+n.c1+','+n.c2+')"><svg viewBox="0 0 24 24">'+FL_ICO[n.ic]+'</svg></div><div class="grow"><div class="tag">'+fxE(n.u)+' · '+fxE(n.ago)+'</div><div class="name">'+fxE(n.t)+'</div></div></div><div class="tags" style="margin-top:6px"><span class="chip">'+fxE(n.w)+'</span>'+(n.b?'<span class="chip">'+fxE(n.b)+'</span>':'')+'<span class="chip c">'+fxE(n.c)+'</span></div><div class="foot2" style="padding:7px 0 0"><span class="small">'+fxE(n.area)+' · '+n.r+' response'+(n.r==1?'':'s')+'</span><span class="pill">View</span></div></div>'});
 return h+'<div class="empty">Respond only if you can really help. Contact details are never shared automatically. Chat inside Birvoy.</div>'};
function flPoster(name,sub){return '<div class="card flex" style="margin-top:9px;padding:8px"><div class="av" style="width:34px;height:34px;font-size:14px">'+fxE(name.charAt(0))+'</div><div class="grow"><div class="name" style="font-size:13px">'+fxE(name)+'</div><div class="small">'+fxE(sub)+'</div></div><span class="chip">Verified</span></div>'}
function flSq(id){var sv=MY.saved[id];return '<button type="button" class="sq" aria-label="Share" data-act="my" data-my="sh:'+id+'"><svg viewBox="0 0 24 24"><path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/></svg></button>'}
MYR.myodet=function(){var o=flFind(FLO,MY.st.myodet||'o2'),h=flBack();
 h+='<div class="hero" style="background-image:url(\''+o.cv+'\')"><span class="open">'+fxE(o.ago)+'</span></div>';
 h+='<div class="tag" style="margin-top:9px">PERSONAL OFFER</div><div class="name xl">'+fxE(o.t)+'</div><div class="pr2 xl">'+fxE(o.p)+'</div><div class="tags" style="margin-top:5px"><span class="chip">'+fxE(o.c)+'</span><span class="chip">'+fxE(o.g)+'</span><span class="chip">'+fxE(o.area)+'</span></div>';
 h+=flPoster('Birvoy user','Phone verified · Member since 2026');
 h+='<div class="acts3"><button type="button" class="cta" data-act="my" data-my="oreq:'+o.id+'">Send Request</button>'+flSq(o.id)+'</div>';
 h+='<div class="sec" style="margin-top:12px">Description</div><p class="para">'+fxE(o.d)+'</p>';
 h+='<div class="sec">Details</div><div class="list"><div><span>Price</span><em>'+fxE(o.p)+'</em></div><div><span>Condition</span><em>'+fxE(o.c)+'</em></div>'+o.x.map(function(x){return '<div><span>'+fxE(x[0])+'</span><em>'+fxE(x[1])+'</em></div>'}).join('')+'<div><span>Area</span><em>'+fxE(o.area)+', Kuwait</em></div></div>';
 return h+'<div class="empty">Meet in a public place and check the item before you pay. Birvoy never asks for payment in advance.</div>'};
MYR.myndet=function(){var n=flFind(FLN,MY.st.myndet||'n2'),h=flBack();
 h+='<div class="hero" style="height:70px;background-image:url(\''+flCover(n.ic,n.c1,n.c2)+'\')"><span class="open">'+fxE(n.ago)+'</span></div>';
 h+='<div class="tag" style="margin-top:9px">COMMUNITY NEED</div><div class="name xl">'+fxE(n.t)+'</div><div class="tags" style="margin-top:5px"><span class="chip">'+fxE(n.w)+'</span>'+(n.b?'<span class="chip">'+fxE(n.b)+'</span>':'')+'<span class="chip c">'+fxE(n.g)+'</span></div>';
 h+=flPoster(n.u,'Phone verified · '+n.area+', Kuwait');
 h+='<div class="acts3">'+(n.own?'<button type="button" class="cta" data-act="my" data-my="go:myneeds">Manage my needs</button>':'<button type="button" class="cta" data-act="my" data-my="nreq:'+n.id+'">I Can Help</button>')+flSq(n.id)+'</div>';
 h+='<div class="sec" style="margin-top:12px">What they need</div><p class="para">'+fxE(n.d)+'</p>';
 h+='<div class="sec">Details</div><div class="list"><div><span>Timing</span><em>'+fxE(n.w)+'</em></div>'+(n.b?'<div><span>Budget</span><em>'+fxE(n.b.replace(/^Budget /,''))+'</em></div>':'')+'<div><span>Preference</span><em>'+fxE(n.c)+'</em></div><div><span>Area</span><em>'+fxE(n.area)+', Kuwait</em></div><div><span>Responses so far</span><em>'+n.r+'</em></div></div>';
 return h+'<div class="empty">Contact details are never shared automatically. Chat inside Birvoy.</div>'};

/* editable personal profile (name stays fixed, it is shown on Home) */
var ME={edit:0,d:null,area:'',langs:'',about:''};
document.addEventListener('input',function(e){var t=e.target,k=t.getAttribute&&t.getAttribute('data-mef');if(k&&ME.d)ME.d[k]=t.value});
function meField(l,k,tx){var v=fxE(ME.d[k]);return '<label class="flab">'+l+'</label>'+(tx?'<textarea class="fin" rows="4" maxlength="240" data-mef="'+k+'">'+v+'</textarea>':'<input class="fin" type="text" maxlength="60" data-mef="'+k+'" value="'+v+'">')}
MYR.myself=function(){var d=MY,h=flBack();
 h+='<div class="hero me" style="background-image:url(\''+flCover('star','#013F63','#5AC0DE')+'\')"></div><div class="idrow pidr"><img class="pbig" src="'+flMe()+'" alt=""><div class="grow"><div class="tag">PERSONAL PROFILE</div><div class="name xl">Roderick Monsalve</div><div class="sub">'+fxE(ME.area)+' · Member since March 2026</div></div></div>';
 if(ME.edit){
  h+='<div class="sec" style="margin-top:14px">Edit your profile</div>'+meField('Area','area')+meField('Languages','langs')+meField('About me','about',1);
  h+='<div class="note" style="margin-top:6px">Your name and verified details can’t be changed here.</div><div class="acts3" style="margin-top:10px"><button type="button" class="cta" data-act="my" data-my="me:save">Save Changes</button><button type="button" class="cta ghost" data-act="my" data-my="me:cancel">Cancel</button></div>';
  return h};
 h+='<div class="tags" style="margin:8px 0 2px"><span class="chip">Phone verified</span><span class="chip">Email verified</span><span class="chip">Civil ID verified</span></div>';
 h+='<div class="stats"><div><b>12</b><span>Successful Connections</span></div><div><b>'+d.needs.length+'</b><span>Needs posted</span></div><div><b>'+d.offers.length+'</b><span>Offers posted</span></div></div>';
 h+='<div class="acts3"><button type="button" class="cta" data-act="my" data-my="me:edit">Edit Profile</button><button type="button" class="sq" aria-label="Settings" data-act="my" data-my="nv:mysettings:x"><svg viewBox="0 0 24 24"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="M19.4 13.5a7.7 7.7 0 0 0 0-3l2-1.5-2-3.5-2.3.9a8 8 0 0 0-2.6-1.5L14.1 2H9.9L9.5 4.9a8 8 0 0 0-2.6 1.5l-2.3-.9-2 3.5 2 1.5a7.7 7.7 0 0 0 0 3l-2 1.5 2 3.5 2.3-.9a8 8 0 0 0 2.6 1.5l.4 2.9h4.2l.4-2.9a8 8 0 0 0 2.6-1.5l2.3.9 2-3.5-2-1.5Z"/></svg></button></div>';
 h+='<div class="sec" style="margin-top:12px">About me</div><p class="para">'+fxE(ME.about)+'</p>';
 h+='<div class="sec">Interests</div><div class="tags"><span class="chip">Interior Design</span><span class="chip">Cycling</span><span class="chip">Home Improvement</span><span class="chip">Electronics</span></div>';
 h+='<div class="sec">Contact</div>'+flRow(FLI.phone,'Mobile (private)','+965 •••• 5821')+flRow(FLI.pin,'Area',fxE(ME.area))+flRow(FLI.globe,'Languages',fxE(ME.langs));
 h+='<div class="sec">Your pages</div><div class="list"><div role="button" tabindex="0" data-act="my" data-my="go:mybiz"><span>My Businesses</span><em>'+d.biz.length+'</em></div><div role="button" tabindex="0" data-act="my" data-my="go:mypro"><span>My Professional Profiles</span><em>'+d.pro.length+'</em></div><div role="button" tabindex="0" data-act="my" data-my="go:myneeds"><span>My Needs</span><em>'+d.needs.length+'</em></div><div role="button" tabindex="0" data-act="my" data-my="go:myoffers"><span>My Offers</span><em>'+d.offers.length+'</em></div></div>';
 h+='<div class="sec">Recent activity</div><div class="list"><div><span>Needed an interior designer</span><em>Posted</em></div><div><span>Listed 2-Bedroom Apartment</span><em>Active</em></div><div><span>Connected with Dana Al-Mutairi</span><em>Photography</em></div></div>';
 return h+'<div class="empty">Only your first name and area are shown to people you haven’t connected with.</div>'};

['myoffl','myneedl','myodet','myndet'].forEach(function(id){var o=$('#s-mysettings'),n=o.cloneNode(true);n.id='s-'+id;n.setAttribute('aria-label',{myoffl:'Personal Offers',myneedl:'Community Needs',myodet:'Personal Offer',myndet:'Community Need'}[id]);n.classList.remove('on');n.querySelector('#myb-mysettings').id='myb-'+id;o.parentNode.appendChild(n)});

/* send a request through the real request flow, then come back to this screen */
function flSend(name,kind,about,ctx){addSent({name:name,kind:kind,about:about,ctx:ctx});reqName(name);reqBack=cur;go('reqsent')}
var _my2=acts.my;
acts.my=function(el){var a=el.getAttribute('data-my').split(':'),k=a[0];
 if(k=='req'){var it=flGet(a[1]),biz=it.id.charAt(0)=='b';flSend(it.n,biz?'Business Page':'Professional',biz?it.cat:it.role,'Interested in '+(biz?it.cat:it.role));return}
 if(k=='oreq'){var o=flFind(FLO,a[1]);flSend('Birvoy user','Personal Offer',o.t,'Interested in '+o.t);return}
 if(k=='nreq'){var n=flFind(FLN,a[1]);flSend(n.u,'Community Need',n.t,'Responding to your Need');return}
 if(k=='od'){if(a[1]=='o1'){MY.bk.odet=cur;ODET.mode='browse';s6go('odet')}else{MY.bk.myodet=cur;MY.st.myodet=a[1];go('myodet')}return}
 if(k=='nd'){if(a[1]=='n1'){s6go('ndet')}else{MY.bk.myndet=cur;MY.st.myndet=a[1];go('myndet')}return}
 if(k=='me'){if(a[1]=='edit'){ME.d={area:ME.area,langs:ME.langs,about:ME.about};ME.edit=1}else if(a[1]=='save'){var d=ME.d||{};ME.area=(d.area||'').trim()||ME.area;ME.langs=(d.langs||'').trim()||ME.langs;ME.about=(d.about||'').trim()||ME.about;ME.edit=0;toast('Profile updated')}else{ME.edit=0}myRender(cur);var v=$('#myb-myself').parentNode;if(v)v.scrollTop=0;return}
 if(k=='nv'&&a[1]=='myself')ME.edit=0;
 _my2(el)};
acts.ol_open=function(){MY.hf=fidx;MY.bk.myoffl='home';go('myoffl')};
acts.nl_open=function(){MY.hf=fidx;MY.bk.myneedl='home';go('myneedl')};
/* opened from Home: don't highlight the My Birvoy tab */
var _myShow=myShow;myShow=function(id){_myShow(id);var h=$('#s-'+id+' .navhl'),bar=h&&h.parentNode,home=id!=='my'&&MY.bk[id]=='home';if(h){h.style.display='';h.style.left=home?'0px':'316px';h.style.width='86px'}if(bar)bar.querySelectorAll('button[aria-label]').forEach(function(b,i){if(i===(home?0:4))b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')})};

/* Golden Find: rotates with the regular featured business card (businesses slide only) */
var gfEl=$("#gf");
function gfReset(){gfEl.classList.remove("on")}



/* ===================== BV real-app layer: accounts ===================== */
var BVK='birvoy.empty.v1',DB=null,PEND=null,lastSnap='',loginFails=0,lockUntil=0,otpTimer=0,otpLeft=0,smsT=0;
function h53(s,sd){sd=sd||0;var h1=0xdeadbeef^sd,h2=0x41c6ce57^sd;for(var i=0,c;i<s.length;i++){c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return(4294967296*(2097151&h2)+(h1>>>0)).toString(36)}
function dbLoad(){return{v:1,users:{},session:null,data:{},market:{},imgs:{}}}
function dbSave(){try{localStorage.setItem(BVK,JSON.stringify(DB));return true}catch(e){if(!dbSave._w){dbSave._w=1;setTimeout(function(){dbSave._w=0},8000);try{toast('Storage is full. Remove a photo or two.')}catch(x){}}return false}}
DB=dbLoad();
function bvPack(o){return JSON.stringify(o,function(k,v){if(typeof v==='string'&&v.length>300&&v.indexOf('data:image')===0){var id='@'+h53(v);DB.imgs[id]=v;return id}return v})}
function bvUnpack(s){try{return JSON.parse(s,function(k,v){return(typeof v==='string'&&v.charAt(0)==='@'&&DB.imgs[v])?DB.imgs[v]:v})}catch(e){return null}}
function normId(v){v=(v||'').trim();if(v.indexOf('@')>-1)return{k:'email',v:v.toLowerCase()};return{k:'phone',v:v.replace(/\D/g,'').replace(/^00/,'')}}
function validId(v){var n=normId(v);if(n.k=='email')return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(n.v)?n:null;return(n.v.length>=8&&n.v.length<=15)?n:null}
function findUser(n){for(var k in DB.users){var u=DB.users[k];if(u.kind!=n.k)continue;if(u.idv==n.v)return u;if(n.k=='phone'&&n.v.length>=8&&u.idv.length>=8&&(u.idv.slice(-n.v.length)==n.v||n.v.slice(-u.idv.length)==u.idv))return u}return null}
function pwh(){throw Error('Email authentication is required.')}
function mkId(){return 'u'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function curUser(){return DB.session&&DB.users[DB.session]||null}
function firstName(u){return((u&&u.name||'').trim().split(/\s+/)[0])||''}
function bvName(){var u=curUser();return u?u.name:'Birvoy user'}
function bvInit(){var u=curUser();return u&&u.name?u.name.trim().charAt(0).toUpperCase():'B'}
function maskId(n,raw){if(n.k=='email'){var p=n.v.split('@');return p[0].charAt(0)+'***@'+p[1]}var d=n.v,pl=(raw||'').trim().charAt(0)=='+'?'+':'';return pl+d.slice(0,3)+new Array(Math.max(3,d.length-5)).join('*')+d.slice(-3)}
function strongPw(p){return p.length>=8&&/[A-Za-z]/.test(p)&&/\d/.test(p)}

/* ---------- styles ---------- */
(function(){var st=document.createElement('style');st.textContent=
'.ferr{position:absolute;left:34px;right:30px;font:500 11.5px/13px Inter,sans-serif;color:#C62828;pointer-events:none;z-index:3}'+
'.fld.bad{box-shadow:inset 0 0 0 1.5px #D93025!important;background:rgba(255,236,236,.6)!important}'+
'.otpcov{position:absolute;z-index:2;display:flex;align-items:center;justify-content:center;pointer-events:none;font-family:Inter,-apple-system,sans-serif;white-space:nowrap}'+
'#bvsms{position:absolute;left:10px;right:10px;top:10px;z-index:30;padding:11px 14px 12px;border-radius:20px;background:rgba(246,248,251,.95);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 8px 28px rgba(2,30,56,.28);transform:translateY(-150%);transition:transform .45s cubic-bezier(.2,.9,.3,1.1);cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",Inter,sans-serif}'+
'#bvsms.on{transform:none}#bvsms .h{display:flex;align-items:center;gap:7px;font-size:11px;font-weight:600;letter-spacing:.04em;color:#6b7683}'+
'#bvsms .h i{width:18px;height:18px;border-radius:5px;background:linear-gradient(#5CE27A,#1FB647)}#bvsms.mail .h i{background:linear-gradient(#4DA3FF,#0A6CFF)}#bvsms .h em{margin-left:auto;font-style:normal;font-weight:400;letter-spacing:0}'+
'#bvsms .t{margin-top:6px;font-size:14px;line-height:19px;color:#111}#bvsms .t b{font-weight:700;letter-spacing:.06em}#bvsms .s{margin-top:4px;font-size:11px;color:#8a95a3}'+
'#bvsheet{position:absolute;inset:0;z-index:25;display:none}#bvsheet.on{display:block}.bvscrim{position:absolute;inset:0;background:rgba(2,30,56,.5)}'+
'.bvcard{position:absolute;left:0;right:0;bottom:0;background:#fff;border-radius:22px 22px 0 0;padding:24px 22px 30px;font-family:Inter,-apple-system,sans-serif;max-height:88%;overflow:auto;animation:bvup .3s ease;color:#013F63}'+
'@keyframes bvup{from{transform:translateY(40px);opacity:0}}'+
'.bvcard h3{font-size:19px;font-weight:700;text-align:center;line-height:1.25}.bvcard .sub{font-size:13px;color:#555;text-align:center;line-height:1.45;margin:6px 4px 10px}'+
'.bvcard label{display:block;font-size:12.5px;font-weight:600;margin:12px 2px 5px}.bvin{width:100%;height:46px;border:1px solid #C6D3E0;border-radius:12px;padding:0 14px;font:400 15px Inter,sans-serif;color:#0C1E2E;outline:0;background:#F7FAFD}'+
'.bvin:focus{border-color:#013F63;box-shadow:0 0 0 3px rgba(1,63,99,.15);background:#fff}.bvin[readonly]{color:#6b7683;background:#EEF2F6}.bvin.bad{border-color:#D93025;background:#FFF4F4}'+
'.bvfe{min-height:15px;font-size:11.5px;line-height:14px;color:#C62828;margin:3px 2px 0}.bvse{font-size:12.5px;color:#C62828;text-align:center;margin-top:10px;min-height:16px}'+
'.bvcta{display:block;width:100%;height:50px;border:0;border-radius:26px;margin-top:14px;background:linear-gradient(180deg,#1E90FF,#0069E0);color:#fff;font:600 15px Inter,sans-serif;cursor:pointer}.bvcta.red{background:linear-gradient(180deg,#E5473B,#B3261E)}'+
'.bvghost{display:block;width:100%;height:46px;border:0;background:transparent;color:#013F63;font:600 14px Inter,sans-serif;cursor:pointer;margin-top:4px}'+
'.bvrows{margin:10px 0 4px;border:1px solid #DCE6F0;border-radius:14px;overflow:hidden}.bvrows div{display:flex;justify-content:space-between;gap:10px;padding:12px 14px;font-size:13.5px;border-bottom:1px solid #EAF0F6}.bvrows div:last-child{border:0}.bvrows em{font-style:normal;color:#555;text-align:right;word-break:break-all}'+
'#bvHomeName{position:absolute;left:326px;top:113px;width:72px;height:28px;background:#F8FBFE;z-index:6;display:flex;align-items:center;justify-content:center;text-align:center;font:600 10.5px/12px Inter,-apple-system,sans-serif;color:#111;pointer-events:none;overflow:hidden}';
document.head.appendChild(st)})();

/* ---------- inline field errors ---------- */
function fErr(id,msg){var f=$('#'+id);if(!f)return;f.setAttribute('aria-invalid',msg?'true':'false');var e=f._er;if(!e){e=document.createElement('div');e.className='ferr';f.parentNode.insertBefore(e,f.nextSibling);f._er=e;f.addEventListener('input',function(){fErr(id,'')})}e.style.top=(f.offsetTop+47)+'px';e.textContent=msg||'';f.classList.toggle('bad',!!msg)}
function fOk(ids){var ok=true;ids.forEach(function(p){if(p[1]){fErr(p[0],p[1]);if(ok)$('#'+p[0]).focus({preventScroll:true});ok=false}else fErr(p[0],'')});return ok}

/* ---------- SMS / mail banner ---------- */
var smsEl=document.createElement('div');smsEl.id='bvsms';smsEl.innerHTML='<div class="h"><i></i><span></span><em>now</em></div><div class="t"></div><div class="s">Tap to autofill</div>';$('#toast').parentNode.appendChild(smsEl);
function showCode(){throw Error('Email authentication is required.')}
smsEl.addEventListener('click',function(e){e.stopPropagation();smsEl.classList.remove('on');var o=$('#s-mobile .otp');if(cur=='mobile'&&o&&smsEl._code)o._set(smsEl._code);var i=$('#bvsheet .bvcode');if(i&&smsEl._code){i.value=smsEl._code;i.dispatchEvent(new Event('input'))}});
function newCode(){throw Error('Email authentication is required.')}

/* ---------- bottom sheet ---------- */
var shEl=document.createElement('div');shEl.id='bvsheet';shEl.innerHTML='<div class="bvscrim"></div><div class="bvcard"></div>';$('#toast').parentNode.appendChild(shEl);
var shOpt=null;
function sheetClose(){shEl.classList.remove('on');shOpt=null}
$('.bvscrim',shEl).addEventListener('click',function(){if(shOpt&&shOpt.lock)return;sheetClose()});
function bvSheet(o){shOpt=o;var c=$('.bvcard',shEl),h='<h3>'+o.title+'</h3>'+(o.sub?'<div class="sub">'+o.sub+'</div>':'');
 (o.info||[]).length&&(h+='<div class="bvrows">'+o.info.map(function(r){return '<div><span>'+r[0]+'</span><em>'+r[1]+'</em></div>'}).join('')+'</div>');
 (o.fields||[]).forEach(function(f){h+='<label for="bv_'+f.id+'">'+f.label+'</label><input class="bvin '+(f.cls||'')+'" id="bv_'+f.id+'" type="'+(f.type||'text')+'" placeholder="'+(f.ph||'')+'" value="'+(f.val==null?'':String(f.val).replace(/"/g,'&quot;'))+'"'+(f.ro?' readonly':'')+(f.max?' maxlength="'+f.max+'"':'')+(f.mode?' inputmode="'+f.mode+'"':'')+' autocomplete="'+(f.ac||'off')+'"><div class="bvfe" id="bve_'+f.id+'"></div>'});
 h+='<div class="bvse" id="bvse"></div>'+(o.cta?'<button type="button" class="bvcta'+(o.danger?' red':'')+'" id="bvgo">'+o.cta+'</button>':'')+'<button type="button" class="bvghost" id="bvno">'+(o.ghost||'Cancel')+'</button>';
 c.innerHTML=h;shEl.classList.add('on');
 function go2(){var vals={};(o.fields||[]).forEach(function(f){vals[f.id]=$('#bv_'+f.id).value;$('#bve_'+f.id).textContent='';$('#bv_'+f.id).classList.remove('bad')});$('#bvse').textContent='';var r=o.onSubmit(vals);
  if(r&&typeof r=='object'){var first=null;for(var k in r){if(k=='_'){$('#bvse').textContent=r[k]}else{$('#bve_'+k).textContent=r[k];$('#bv_'+k).classList.add('bad');if(!first)first=k}}if(first)$('#bv_'+first).focus()}else if(r===true)sheetClose()}
 if(o.cta)$('#bvgo').addEventListener('click',go2);
 $('#bvno').addEventListener('click',function(){var f=o.onCancel;sheetClose();if(f)f()});
 (o.fields||[]).forEach(function(f){$('#bv_'+f.id).addEventListener('keydown',function(e){if(e.key=='Enter'){e.preventDefault();if(o.cta)go2()}})});
 var f0=(o.fields||[]).filter(function(f){return !f.ro})[0];if(f0)setTimeout(function(){var i=$('#bv_'+f0.id);i&&i.focus({preventScroll:true})},350)}
function bvSheetOpen(){return shEl.classList.contains('on')}

/* ---------- OTP screen overlays ---------- */
var OTPCOV=[['otpTitle',90,80,222,30,'#f8fbfd','#fefeff','700 20px/30px Inter,sans-serif','#013F63'],['otpTarget',100,152,202,25,'#f5fafd','#fafdfe','400 16px/25px Inter,sans-serif','#1D2B3A'],['otpChange',140,178,122,26,'#f3f9fd','#f7fbfd','600 14px/26px Inter,sans-serif','#013F63'],['otpResend',130,324,142,23,'#d7ecf6','#d8ebf6','600 14px/23px Inter,sans-serif','#1D2B3A']];
(function(){var s=$('#s-mobile'),h='';OTPCOV.forEach(function(c){h+='<div id="'+c[0]+'" class="otpcov" style="left:'+c[1]+'px;top:'+c[2]+'px;width:'+c[3]+'px;height:'+c[4]+'px;background:linear-gradient(90deg,'+c[5]+','+c[6]+');font:'+c[7]+';color:'+c[8]+'"></div>'});
 h+='<div id="otpErr" class="ferr" style="left:0;right:0;text-align:center;top:289px;font-size:12.5px"></div><button class="hit" id="otpRsBtn" data-act="otp_resend" aria-label="Resend code" style="left:130px;top:322px;width:142px;height:28px;--r:8px"></button>';s.insertAdjacentHTML('beforeend',h)})();
function otpPaint(){if(!PEND)return;var mail=PEND.id.k=='email';$('#otpTitle').textContent=mail?'Verify your email':'Verify your mobile';$('#otpTarget').textContent=maskId(PEND.id,PEND.raw);var ch=$('#otpChange');ch.textContent=mail?'Change email':'Change number';ch.style.textDecoration='underline';
 var r=$('#otpResend');if(otpLeft>0){r.textContent='Resend in 00:'+(otpLeft<10?'0':'')+otpLeft;r.style.textDecoration='underline';r.style.color='#1D2B3A'}else{r.textContent='Resend code';r.style.textDecoration='underline';r.style.color='#013F63'}}
function otpStart(){clearInterval(otpTimer);otpLeft=30;otpPaint();otpTimer=setInterval(function(){if(otpLeft>0){otpLeft--;otpPaint()}else clearInterval(otpTimer)},1000)}
function otpSend(){PEND.code=newCode();PEND.tries=0;PEND.exp=Date.now()+5*60*1000;showCode(PEND.id,PEND.code);otpStart();$('#otpErr').textContent='';var o=$('#s-mobile .otp');o._set('')}
acts.otp_resend=function(){if(!PEND)return;if(otpLeft>0){toast('You can resend in '+otpLeft+'s');return}otpSend();toast('New code sent')};

/* ---------- sign-up ---------- */
function blankData(){return{my:{needs:[],offers:[],biz:[],pro:[],promo:[],seq:100},me:{area:'Kuwait',langs:'English',about:''}}}
acts.submit=function(){var name=$('#f-name').value.trim(),raw=$('#f-id').value,pw=$('#f-pw').value,pw2=$('#f-pw2').value,n=validId(raw),idMsg='';
 if(!raw.trim())idMsg='Enter your email or mobile number.';else if(!n)idMsg=raw.indexOf('@')>-1?'That email address doesn’t look right.':'Enter a valid mobile number or email.';else if(findUser(n))idMsg='An account with this '+(n.k=='email'?'email':'number')+' already exists. Try logging in.';
 var ok=fOk([['f-name',name.length<2||!/[A-Za-z\u0600-\u06FF]/.test(name)?'Please enter your full name.':''],['f-id',idMsg],['f-pw',!pw?'Create a password.':!strongPw(pw)?'Use 8+ characters with at least one letter and one number.':''],['f-pw2',pw2!==pw?'Passwords don’t match.':'']]);
 var boxes=$$('.chk'),terms=boxes[0]&&boxes[1]&&boxes[0].getAttribute('aria-checked')=='true'&&boxes[1].getAttribute('aria-checked')=='true';
 if(ok&&!terms){toast('Please accept the Terms of Use and Privacy Policy');return}
 if(!ok)return;
 PEND={name:name,id:n,raw:raw,salt:Math.random().toString(36).slice(2,10),pw:pw};PEND.hash=pwh(pw,PEND.salt);go('mobile');setTimeout(otpSend,500)};
acts.chg_m=function(){PEND=null;clearInterval(otpTimer);smsEl.classList.remove('on');go('create');setTimeout(function(){$('#f-id').focus()},450)};
function bvCreateUser(){var u={id:mkId(),name:PEND.name,kind:PEND.id.k,idv:PEND.id.v,raw:PEND.raw.trim(),salt:PEND.salt,pw:PEND.hash,created:Date.now(),verified:true};DB.users[u.id]=u;DB.data[u.id]=bvPack(blankData());DB.session=u.id;dbSave();bvLoadUser(u);PEND=null;clearInterval(otpTimer);smsEl.classList.remove('on')}
acts.ver_m=function(){var o=$('#s-mobile .otp'),v=o._val(),er=$('#otpErr');if(!PEND)return;
 if(v.length<6){er.textContent='Enter the 6-digit code we sent you.';return}
 if(Date.now()>PEND.exp){er.textContent='That code has expired. Tap Resend code.';o._set('');return}
 if(PEND.tries>=5){er.textContent='Too many attempts. Request a new code.';return}
 if(v===PEND.code){er.textContent='';bvCreateUser();go('allset');toast('Account created')}
 else{PEND.tries++;er.textContent=PEND.tries>=5?'Too many attempts. Request a new code.':'That code isn’t right. '+(5-PEND.tries)+' tries left.';o._set('');var b=$('.otp',$('#s-mobile'));b.style.animation='none';void b.offsetWidth;b.style.animation='fxshake .4s'}};
$$('.otpin').forEach(function(i){i.addEventListener('input',function(){$('#otpErr').textContent='';if(i.value.length==6)setTimeout(acts.ver_m,180)})});

/* ---------- login / forgot / social ---------- */
function lockMsg(){var s=Math.ceil((lockUntil-Date.now())/1000);return 'Too many attempts. Try again in '+s+'s.'}
acts.login_go=function(){var raw=$('#li-id').value,pw=$('#li-pw').value,n=validId(raw),u=n&&findUser(n);
 if(Date.now()<lockUntil){fErr('li-pw',lockMsg());return}
 var ok=fOk([['li-id',!raw.trim()?'Enter your email or mobile number.':!n?'Enter a valid email or mobile number.':!u?'No account found with that email or number.':''],['li-pw',!pw?'Enter your password.':'']]);
 if(!ok)return;
 if(u.pw!==pwh(pw,u.salt)){loginFails++;if(loginFails>=5){loginFails=0;lockUntil=Date.now()+30000;fErr('li-pw',lockMsg())}else fErr('li-pw','Incorrect password. '+(5-loginFails)+' tries left.');return}
 loginFails=0;DB.session=u.id;dbSave();bvLoadUser(u);$('#li-pw').value='';go('home');toast('Welcome back, '+firstName(u))};
acts.forgot=function(){bvSheet({title:'Reset your password',sub:'Enter the email or mobile number you signed up with and we’ll send a code.',fields:[{id:'id',label:'Email or mobile number',ph:'Enter your email or mobile number',ac:'username',val:$('#li-id').value}],cta:'Send code',onSubmit:function(v){var n=validId(v.id),u=n&&findUser(n);if(!n)return{id:'Enter a valid email or mobile number.'};if(!u)return{id:'No account found with that email or number.'};forgotCode(u,n)}})};
function forgotCode(u,n){var code=newCode(),tries=0;showCode(n,code);bvSheet({title:'Enter the code',sub:'We sent a 6-digit code to '+maskId(n,u.raw)+'.',lock:1,fields:[{id:'c',label:'6-digit code',ph:'••••••',mode:'numeric',max:6,cls:'bvcode',ac:'one-time-code'}],cta:'Continue',ghost:'Send a new code',onCancel:function(){forgotCode(u,n)},onSubmit:function(v){if(v.c.trim()!==code){tries++;return{c:tries>=5?'Too many attempts. Send a new code.':'That code isn’t right.'}}smsEl.classList.remove('on');forgotNew(u)}})}
function forgotNew(u){bvSheet({title:'Create a new password',lock:1,fields:[{id:'p1',label:'New password',type:'password',ph:'At least 8 characters',ac:'new-password'},{id:'p2',label:'Confirm password',type:'password',ph:'Re-enter your password',ac:'new-password'}],cta:'Save password',onSubmit:function(v){if(!strongPw(v.p1))return{p1:'Use 8+ characters with a letter and a number.'};if(v.p1!==v.p2)return{p2:'Passwords don’t match.'};u.salt=Math.random().toString(36).slice(2,10);u.pw=pwh(v.p1,u.salt);dbSave();loginFails=0;lockUntil=0;toast('Password updated. Log in with your new password.');return true}})}
acts.social=function(el){var prov=/Apple/.test(el.getAttribute('aria-label')||'')?'Apple':'Google';bvSheet({title:'Continue with '+prov,sub:'Demo sign-in: choose the account to use. No password needed.',fields:[{id:'n',label:'Your name',ph:'Full name',ac:'name'},{id:'e',label:prov+' email',ph:'name@'+(prov=='Apple'?'icloud':'gmail')+'.com',ac:'email'}],cta:'Continue',onSubmit:function(v){var n=validId(v.e);if(v.n.trim().length<2)return{n:'Please enter your name.'};if(!n||n.k!='email')return{e:'Enter a valid email address.'};var u=findUser(n);if(!u){u={id:mkId(),name:v.n.trim(),kind:'email',idv:n.v,raw:n.v,salt:Math.random().toString(36).slice(2,10),pw:'social:'+prov,created:Date.now(),prov:prov,verified:false};DB.users[u.id]=u;DB.data[u.id]=bvPack(blankData());DB.session=u.id;dbSave();bvLoadUser(u);sheetClose();go('allset');return}DB.session=u.id;dbSave();bvLoadUser(u);sheetClose();go('home');toast('Welcome back, '+firstName(u))}})};

/* ---------- per-user data + persistence ---------- */
function bvLoadUser(u){var d=bvUnpack(DB.data[u.id])||blankData(),m=d.my||{};['needs','offers','biz','pro','promo'].forEach(function(k){MY[k].length=0;(m[k]||[]).forEach(function(x){MY[k].push(x)})});MY.seq=m.seq||100;MY.tab={needs:0,offers:0,promo:0};MY.arm=null;
 var e=d.me||{};ME.area=e.area||'Kuwait';ME.langs=e.langs||'English';ME.about=e.about||'';ME.edit=0;lastSnap=DB.data[u.id];bvRefreshName();if(typeof bvLoadMore=='function')bvLoadMore(u,d)}
var bvLoadMore,bvClearMore;
function bvPersist(force){var u=curUser();if(!u)return;var s=bvPack(bvSnapshot());if(s===DB.data[u.id]&&!force)return;DB.data[u.id]=s;dbSave()}
function bvSnapshot(){var o={my:{needs:MY.needs,offers:MY.offers,biz:MY.biz,pro:MY.pro,promo:MY.promo,seq:MY.seq},me:{area:ME.area,langs:ME.langs,about:ME.about}};if(typeof bvSnapMore=='function')bvSnapMore(o);return o}
setInterval(function(){bvPersist()},900);window.addEventListener('pagehide',function(){bvPersist(true)});document.addEventListener('visibilitychange',function(){if(document.hidden)bvPersist(true)});
function bvClearUser(){['needs','offers','biz','pro','promo'].forEach(function(k){MY[k].length=0});MY.seq=100;PEND=null;lastSnap='';$$('.fld').forEach(function(f){f.value='';if(f._er)fErr(f.id,'')});$$('.chk').forEach(function(c){c.setAttribute('aria-checked','false')});if(typeof bvClearMore=='function')bvClearMore();bvRefreshName()}
function bvLogout(){bvPersist(true);DB.session=null;dbSave();bvClearUser();go('welcome');toast('Logged out')}

/* ---------- name on home + profile ---------- */
(function(){var h=document.createElement('div');h.id='bvHomeName';$('#s-home').appendChild(h)})();
function bvRefreshName(){var u=curUser(),el=$('#bvHomeName');if(!el)return;var p=(u?u.name:'').trim().split(/\s+/);el.innerHTML=u?(p.length>1?fxE(p[0])+'<br>'+fxE(p.slice(1).join(' ')):fxE(p[0])):'Guest'}
var _myr=MYR.my;MYR.my=function(){var u=curUser(),h=_myr();return h.replace('>S</div>','>'+fxE(bvInit())+'</div>').replace('<b>Your Personal account</b>','<b>'+fxE(bvName())+'</b>')};
var _mys=MYR.myself;MYR.myself=function(){var u=curUser(),h=_mys(),mem=u?new Date(u.created).toLocaleString('en-US',{month:'long',year:'numeric'}):'';
 h=h.replace('Roderick Monsalve',fxE(bvName())).replace('Member since March 2026','Member since '+mem);
 var ver=u?'<span class="chip">'+(u.kind=='email'?'Email':'Phone')+' verified</span>':'';
 h=h.replace(/<div class="tags" style="margin:8px 0 2px">.*?<\/div>/,'<div class="tags" style="margin:8px 0 2px">'+ver+'</div>');
 h=h.replace(/<div class="stats"><div><b>12<\/b><span>Successful Connections<\/span><\/div>/,'<div class="stats"><div><b>'+Number(window.BirvoyPersonalConnections||0).toLocaleString('en-US')+'</b><span>Successful Connections</span></div>');
 h=h.replace(/<div class="sec">Interests<\/div><div class="tags">.*?<\/div>/,'');
 h=h.replace(/<div class="sec">Recent activity<\/div><div class="list">.*?<\/div><\/div>/,function(){var rows=[];MY.offers.slice(0,2).forEach(function(o){rows.push('<div><span>Listed '+fxE(o.t)+'</span><em>'+(o.s=='active'?'Active':'Paused')+'</em></div>')});MY.needs.slice(0,2).forEach(function(n){rows.push('<div><span>Posted a need</span><em>'+(n.s=='active'?'Active':'Paused')+'</em></div>')});return rows.length?'<div class="sec">Recent activity</div><div class="list">'+rows.join('')+'</div>':'<div class="sec">Recent activity</div><div class="empty">Nothing yet. Create an offer, need or page to get started.</div>'});
 h=h.replace('<p class="para"></p>','<p class="para" style="color:#8a95a3">Add a short introduction in Edit Profile.</p>');
 if(u){h=h.replace('+965 •••• 5821',fxE(maskId({k:u.kind,v:u.idv},u.raw)));if(u.kind==='email')h=h.replace('Mobile (private)','Email (private)')}
 return h};

/* ---------- settings: account details, password, delete, logout ---------- */
function acctSheet(){var u=curUser();if(!u)return;bvSheet({title:'Account details',sub:'Your sign-in details. Only your name can be changed here.',info:[['Signed in with',u.prov?u.prov:(u.kind=='email'?'Email':'Mobile number')],[u.kind=='email'?'Email':'Mobile',fxE(u.raw)],['Member since',new Date(u.created).toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'})]],fields:[{id:'n',label:'Full name',val:u.name,ac:'name'}],cta:'Save name',onSubmit:function(v){var n=v.n.trim();if(n.length<2)return{n:'Please enter your full name.'};u.name=n;dbSave();bvRefreshName();if(/^my/.test(cur))myRender(cur);toast('Name updated');return true}})}
function pwSheet(){var u=curUser();if(!u)return;if(u.prov){bvSheet({title:'Change password',sub:'You sign in with '+u.prov+', so there’s no password to change.',cta:'',ghost:'Close'});return}
 bvSheet({title:'Change password',fields:[{id:'o',label:'Current password',type:'password',ph:'Enter current password',ac:'current-password'},{id:'p1',label:'New password',type:'password',ph:'At least 8 characters',ac:'new-password'},{id:'p2',label:'Confirm new password',type:'password',ph:'Re-enter new password',ac:'new-password'}],cta:'Update password',onSubmit:function(v){if(pwh(v.o,u.salt)!==u.pw)return{o:'Current password is incorrect.'};if(!strongPw(v.p1))return{p1:'Use 8+ characters with a letter and a number.'};if(v.p1===v.o)return{p1:'Choose a different password.'};if(v.p1!==v.p2)return{p2:'Passwords don’t match.'};u.salt=Math.random().toString(36).slice(2,10);u.pw=pwh(v.p1,u.salt);dbSave();toast('Password updated');return true}})}
function delSheet(){var u=curUser();if(!u)return;bvSheet({title:'Delete your account?',sub:'This permanently removes your Needs, Offers, Business Pages, Professional Profiles and chats from this device. It can’t be undone.',fields:u.prov?[{id:'t',label:'Type DELETE to confirm',ph:'DELETE'}]:[{id:'o',label:'Enter your password to confirm',type:'password',ph:'Password',ac:'current-password'}],cta:'Delete my account',danger:1,onSubmit:function(v){if(u.prov){if(v.t.trim()!=='DELETE')return{t:'Type DELETE to confirm.'}}else if(pwh(v.o,u.salt)!==u.pw)return{o:'Password is incorrect.'};delete DB.users[u.id];delete DB.data[u.id];delete DB.market[u.id];DB.session=null;dbSave();bvClearUser();sheetClose();go('welcome');toast('Account deleted');return true}})}
var _mybv=acts.my;acts.my=function(el){var a=(el.getAttribute('data-my')||'').split(':');
 if(a[0]=='logout'){bvLogout();return}
 if(a[0]=='ph'&&a[1]=='settings'&&a[2]=='Account Details'){acctSheet();return}
 if(a[0]=='ph'&&a[1]=='settings'&&a[2]=='Change Password'){pwSheet();return}
 if(a[0]=='ph'&&a[1]=='delete'){delSheet();return}
 _mybv(el)};

/* ---------- start screen: skip login when signed in ---------- */
function bvStartScreen(){return curUser()?'home':'lang'}
(function(){var u=curUser();if(u)bvLoadUser(u);else bvRefreshName()})();


/* ===================== BV real-app layer: listings ===================== */
function bvPh(name,kind){var c=kind=='pp'?['#013F63','#5AC0DE']:kind=='po'?['#1B6FA8','#5AC0DE']:['#0B2A47','#1B6FA8'],ch=((name||'B').trim().charAt(0)||'B').toUpperCase();return flSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[1]+'"/></linearGradient></defs><rect width="80" height="80" fill="url(#g)"/><text x="40" y="53" font-family="Inter,Arial,sans-serif" font-size="38" font-weight="700" fill="#fff" text-anchor="middle">'+ch+'</text></svg>')}
function fxPic(f,d,i){var v=d.ph[i];return(typeof v=='string'&&v.length>20)?v:fxPhoto(f,i)}
function bvPickImage(max,cb,cap){var inp=document.createElement('input');inp.type='file';inp.accept='image/*';if(cap)inp.setAttribute('capture','environment');inp.style.display='none';document.body.appendChild(inp);
 inp.onchange=function(){var f=inp.files&&inp.files[0];inp.remove();if(!f)return;if(!/^image\//.test(f.type)){toast('Please choose an image file');return}
  var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*s));c.height=Math.max(1,Math.round(im.height*s));var x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.78))};im.onerror=function(){toast('That image couldn’t be read')};im.src=r.result};r.onerror=function(){toast('That image couldn’t be read')};r.readAsDataURL(f)};
 inp.click()}

/* blank forms for new listings */
FXDEF.bp=function(){return{name:'',about:'',tags:[],tagDraft:'',serve:{visit:0,come:0,remote:0},loc:'',area:'All Kuwait',ph:[0,0,0,0],web:'',email:'',logo:''}};
FXDEF.po=function(){return{title:'',desc:'',ph:[0,0,0,0],price:'',neg:0,cond:'',loc:''}};
FXDEF.pp=function(){var u=curUser();return{name:u?u.name:'',role:'',about:'',tags:[],tagDraft:'',serve:{visit:0,come:0,remote:0},loc:'',area:'All Kuwait',ph:[0,0,0,0],link:'',logo:''}};
FXH.ph=function(v){var i=+v,d=FX.d;if(d.ph[i]){d.ph[i]=0;fxRender(true);return}bvPickImage(800,function(u){d.ph[i]=u;fxRender(true)})};
FXH.upload=function(){var d=FX.d;bvPickImage(400,function(u){d.logo=u;fxRender(true)})};
var _fxst=FXH.start;FXH.start=function(id){FX.editId=null;_fxst(id)};
var _fxrs=fxReset;fxReset=function(){FX.editId=null;_fxrs()};
FXH.startEdit=function(id,list,itemId){var f=myFind(list,itemId),it=f&&f[0][f[1]];if(!it||!it.fd){toast('This listing can’t be edited');return}FX.id=id;FX.d=JSON.parse(JSON.stringify(it.fd));FX.step=0;FX.mode='review';FX.key=null;FX.dd=false;FX.editId=itemId;clearTimeout(FX.t);fxRender(false);go(FXC[id].scr.slice(2))};

/* publish / update a listing */
myPub=function(id,d){var fd=JSON.parse(JSON.stringify(d)),e=FX.editId,t,f,now=Date.now();
 function put(list,flds,extra){t=e&&myFind(list,e);if(t){Object.assign(t[0][t[1]],flds,{fd:fd});return false}MY.tab[list]=0;MY[list].unshift(Object.assign({id:++MY.seq,s:'active',at:now,fd:fd},extra||{},flds));return true}
 if(id=='sn'){f={t:d.desc.trim(),b:parseInt(d.budget,10)||0,w:d.when=='date'&&d.date?fxDay(d.date,1):'Flexible'};put('needs',f,{r:0})}
 else if(id=='po'){var ix=0;d.ph.forEach(function(x,i){if(x&&!ix)ix=i+1});f={t:d.title.trim(),p:d.price||'',c:d.cond||'',img:ix?fxPic('po',d,ix-1):bvPh(d.title,'po')};put('offers',f)}
 else if(id=='bp'){f={n:d.name.trim(),sub:d.tags[0]||'Business',img:d.logo||bvPh(d.name,'bp')};put('biz',f,{conn:0,req:0})}
 else if(id=='pp'){f={n:d.name.trim(),sub:d.role.trim(),img:d.logo||bvPh(d.name,'pp')};put('pro',f,{conn:0,req:0})}
 bvPersist(true)};
(function(){var s=[['Need','needs','n'],['Offer','offers','o'],['Business Page','biz','b'],['Professional Profile','pro','b']];window.__edtag=s})();

/* ---------- shared marketplace: listings from every account on this device ---------- */
function bvAgo(t,need){var d=Math.floor((Date.now()-(t||Date.now()))/864e5);return need?(d<1?'Today':d==1?'Yesterday':d+' days ago'):(d<1?'Posted today':d==1?'Posted yesterday':'Posted '+d+' days ago')}
function bvArea(loc,def){loc=(loc||'').trim();return loc?loc.split(',')[0].trim():def}
function bvListingPhoto(it){var src=it&&it.img;return typeof src==='string'&&/^(?:https?:\/\/|\/assets\/|data:image\/(?:jpeg|png|webp|gif);base64,)/i.test(src)?src:''}
function bvMarketOf(u){var d=bvUnpack(DB.data[u.id])||{},m=d.my||{},me=d.me||{},o={biz:[],pro:[],off:[],need:[]},who=firstName(u)+(u.name.trim().split(/\s+/).length>1?' '+u.name.trim().split(/\s+/).pop().charAt(0)+'.':''),pre=function(k,it){return k+'_'+u.id+'_'+it.id};
 (m.biz||[]).forEach(function(it){var f=it.fd;if(!f||it.s!='active')return;var gal=f.ph.filter(function(x){return typeof x=='string'&&x.length>20}),lg=f.logo||bvPh(f.name,'bp');o.biz.push({id:pre('bu',it),usr:u.id,n:f.name,cat:f.tags[0]||'Business',g:'Other',area:bvArea(f.loc,'Kuwait'),ic:'bag',c1:'#0B2A47',c2:'#1B6FA8',rt:0,rv:0,yrs:0,conn:0,open:'New on Birvoy',tags:f.tags.slice(),img:'usr',about:f.about,items:[],sa:f.area||'',dvk:f.serve||{},dv:fxServeChips(f,FXSERVE.bp),hrs:[['Opening hours','Ask in chat']],ph:u.kind=='phone'?('+'+u.idv):'+965 •••• ••••',cv:gal[0]||bvListingPhoto(it)||flCover('bag','#0B2A47','#1B6FA8'),lg:lg,gal:gal.length?gal:[flTile('bag','#0B2A47','#1B6FA8','Our business')],rev:[],isnew:1,at:it.at||0})});
 (m.pro||[]).forEach(function(it){var f=it.fd;if(!f||it.s!='active')return;var gal=f.ph.filter(function(x){return typeof x=='string'&&x.length>20});o.pro.push({id:pre('pu',it),usr:u.id,n:f.name,role:f.role,g:'Other',area:bvArea(f.loc,'Kuwait'),c1:'#013F63',c2:'#5AC0DE',v:0,rt:0,rv:0,yrs:0,conn:0,rate:'Ask in chat',resp:'New on Birvoy',avail:'Booking this week',langs:me.langs||'English',tags:f.tags.slice(),img:'usr',about:f.about,items:[],sa:f.area||'',dvk:f.serve||{},dv:fxServeChips(f,FXSERVE.pp),ic:'id',cv:gal[0]||bvListingPhoto(it)||flCover('id','#013F63','#5AC0DE'),av:f.logo||bvListingPhoto(it)||gal[0]||bvPh(f.name,'pp'),gal:gal.length?gal:[flTile('id','#013F63','#5AC0DE','Recent work')],rev:[],isnew:1,at:it.at||0})});
 (m.offers||[]).forEach(function(it){var f=it.fd;if(!f||it.s!='active')return;var ph=f.ph.filter(function(x){return typeof x=='string'&&x.length>20}),art=ph[0]||bvListingPhoto(it)||flTile('bag','#1B6FA8','#5AC0DE','');o.off.push({id:pre('ou',it),usr:u.id,t:f.title,p:(f.price?bvCurrency(f.price):'Ask')+(f.neg?' · Negotiable':''),c:f.cond||'Not stated',area:bvArea(f.loc,'Kuwait'),g:'Other',ic:'bag',c1:'#1B6FA8',c2:'#5AC0DE',ago:bvAgo(it.at),d:f.desc,x:[['Negotiable',f.neg?'Yes':'No']],art:art,cv:ph[0]||bvListingPhoto(it)||flCover('bag','#1B6FA8','#5AC0DE'),at:it.at||0,who:who})});
 (m.needs||[]).forEach(function(it){var f=it.fd;if(!f||it.s!='active')return;var t=f.desc.trim(),short=t.length>64?t.slice(0,61).replace(/\s+\S*$/,'')+'…':t;o.need.push({id:pre('nu',it),usr:u.id,t:short,w:it.w||'Flexible',b:it.b?('KD '+it.b):'',c:'Any',area:bvArea(me.area,'Kuwait'),g:'Items',ic:'bag',c1:'#14587A',c2:'#5AC0DE',u:who,r:0,ago:bvAgo(it.at,1),d:t,at:it.at||0})});
 return o}
function bvRebuildMarket(){[FLB,FLP,FLO,FLN].forEach(function(a){for(var i=a.length-1;i>=0;i--)if(a[i].usr)a.splice(i,1)});
 var offs=[],needs=[];for(var uid in DB.market){var r=bvUnpack(DB.market[uid]);if(!r)continue;var own=uid==DB.session;[r.biz,r.pro,r.off,r.need].forEach(function(l){(l||[]).forEach(function(x){x.own=own})});FLB.push.apply(FLB,r.biz||[]);FLP.push.apply(FLP,r.pro||[]);offs=offs.concat(r.off||[]);needs=needs.concat(r.need||[])}
 offs.sort(function(a,b){return b.at-a.at});needs.sort(function(a,b){return b.at-a.at});FLO.unshift.apply(FLO,offs);FLN.unshift.apply(FLN,needs)}
['b','p','o','n'].forEach(function(k){if(FLG[k]&&FLG[k].indexOf('Other')<0)FLG[k].push('Other')});
var _bvp=bvPersist;bvPersist=function(force){var u=curUser();_bvp(force);if(!u)return;var ms=bvPack(bvMarketOf(u));if(ms!==DB.market[u.id]){DB.market[u.id]=ms;dbSave();bvRebuildMarket()}};
bvLoadMore=function(u){bvRebuildMarket()};
bvClearMore=function(){bvRebuildMarket()};

/* own listings: can’t request yourself; honest new-listing stats */
var _fla=flActions;flActions=function(it,biz){return it.own?'<div class="empty" style="margin:10px 0 0">This is your own listing. Manage it from My Birvoy.</div>':_fla(it,biz)};
function bvNew(h,x){if(!x||!x.isnew)return h;return h.replace('<b>0.0 ★</b><span>0 reviews</span>','<b>New</b><span>No reviews yet</span>').replace('<b>0 yrs</b><span>In business</span>','<b>New</b><span>Just joined Birvoy</span>').replace('<b>0 yrs</b><span>Experience</span>','<b>New</b><span>Just joined Birvoy</span>').replace(/<div class="sec">(What customers say|What clients say)<\/div>/,'<div class="sec">$1</div><div class="empty">No reviews yet.</div>')}
var _bvNew1=bvNew;bvNew=function(h,x){h=_bvNew1(h,x);if(!x)return h;var r='';if(x.sa)r+=flRow(FLI.pin,'Service area',fxE(x.sa));if(x.dv&&x.dv.length)r+=flRow(FLI.globe,'How they serve',fxE(x.dv.join(' \u00b7 ')));if(r)h=h.replace('<div class="empty">Birvoy does not share',r+'<div class="empty">Birvoy does not share');return h.replace(/<div class="sec">[^<]*<\/div><div class="list"><\/div>/g,'')};
var _mbv=MYR.mybview;MYR.mybview=function(){return bvNew(_mbv(),flGet(MY.st.mybview||'b1'))};
var _mpv=MYR.mypview;MYR.mypview=function(){return bvNew(_mpv(),flGet(MY.st.mypview||'p1'))};
var _bvmy2=acts.my;acts.my=function(el){var a=(el.getAttribute('data-my')||'').split(':');
 if(a[0]=='edit'){FXH.startEdit({needs:'sn',offers:'po',biz:'bp',pro:'pp'}[a[1]],a[1],a[2]);return}
 var own=(a[0]=='req'&&(flGet(a[1])||{}).own)||(a[0]=='oreq'&&(flFind(FLO,a[1])||{}).own)||(a[0]=='nreq'&&(flFind(FLN,a[1])||{}).own);
 if(own){toast('This is your own listing');return}
 _bvmy2(el)};
bvRebuildMarket();


/* ===================== BV real-app layer: requests, chats, notifications ===================== */
var REQIN=[],bvTgt=null;
TODAY=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short'});
function bvNow(){return new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}
function shortName(n){var p=(n||'').trim().split(/\s+/);return p.length>1?p[0]+' '+p[p.length-1].charAt(0)+'.':(p[0]||'Birvoy user')}
function bvEmptyChat(){return{TH:{},SR:{},SRO:[],srN:0,accN:0,reqIn:[],NT:[]}}
function bvDayLabel(ts){var d=new Date(ts),n=new Date(),a=new Date(d.getFullYear(),d.getMonth(),d.getDate()),b=new Date(n.getFullYear(),n.getMonth(),n.getDate()),k=Math.round((b-a)/864e5);return k<=0?'Today':k==1?'Yesterday':k<7?d.toLocaleDateString('en-US',{weekday:'short'}):d.toLocaleDateString('en-GB',{day:'numeric',month:'short'})}
function bvDay(th){var ld=null;th.msgs.forEach(function(m){if(m.d)ld=m.d});if(ld!='Today')th.msgs.push({d:'Today',ts:Date.now()})}
function bvRelabel(){Object.keys(TH).forEach(function(k){TH[k].msgs.forEach(function(m){if(m.d&&m.ts)m.d=bvDayLabel(m.ts)})})}
function bvNtf(c,item){if(item.event=='request-accepted'&&c.NT===NT)playReceivedSound();if(item.tag=='NEW MESSAGE'){if(c.NT===NT)playReceivedSound();var f=c.NT.filter(function(x){return x.a==item.a&&x.tag=='NEW MESSAGE'&&x.u})[0];if(f){f.s=item.s;f.tm=item.tm;return}}c.NT.forEach(function(x){if(x.g=='TODAY')delete x.g});item.g='TODAY';c.NT.unshift(item)}
function bvChat(uid){return uid==DB.session?{TH:TH,SR:SR,get SRO(){return SRO},set SRO(v){SRO=v},get reqIn(){return REQIN},set reqIn(v){REQIN=v},NT:NT}:null}
function bvWith(uid,fn){if(!uid||!DB.users[uid])return false;if(uid==DB.session){fn(bvChat(uid));bvChatDom();bvPersist(true);return true}var d=bvUnpack(DB.data[uid]);if(!d)return false;d.chat=Object.assign(bvEmptyChat(),d.chat||{});fn(d.chat);DB.data[uid]=bvPack(d);dbSave();return true}

/* persistence hooks */
function bvSnapMore(o){o.chat={TH:TH,SR:SR,SRO:SRO,srN:srN,accN:accN,reqIn:REQIN,NT:NT}}
function bvLoadChat(c){c=Object.assign(bvEmptyChat(),c||{});Object.keys(TH).forEach(function(k){delete TH[k]});Object.keys(SR).forEach(function(k){delete SR[k]});Object.assign(TH,c.TH);Object.assign(SR,c.SR);SRO=(c.SRO||[]).slice();srN=c.srN||0;accN=c.accN||0;REQIN=(c.reqIn||[]).slice();NT.length=0;(c.NT||[]).forEach(function(x){NT.push(x)});bvRelabel()}
bvLoadMore=function(u,d){bvRebuildMarket();bvLoadChat(d&&d.chat);bvExpire();bvChatDom()};
bvClearMore=function(){bvRebuildMarket();bvLoadChat(null);bvChatDom()};

/* ---------- DOM builders ---------- */
function bvAv(name,img,cls){return img?'<img class="ph" src="'+esc(img)+'" alt="">':'<div class="av ph">'+esc(ini(name||'B'))+'</div>'}
function lastOf(th){for(var i=th.msgs.length-1;i>=0;i--){var m=th.msgs[i];if(m.w)return(m.w=='me'?'You: ':'')+(m.ar?m.tr:m.t);if(m.s)return m.s}return 'Say hello'}
function rowTime(th){var ts=th.ord||0,l=bvDayLabel(ts);if(l=='Today'){var lm=null;th.msgs.forEach(function(m){if(m.tm)lm=m.tm});return lm||''}return l}
function thRow(id){var th=TH[id],end=th.state=='ended';return '<div class="chatrow'+(end?' ended':'')+'" data-act="ch_open" data-t="'+id+'">'+bvAv(th.name,th.img)+'<div class="grow"><div class="nm">'+esc(th.name)+'</div><div class="rctx">'+esc(th.about)+'</div><div class="last">'+esc(end?'Connection ended':lastOf(th))+'</div></div><div class="right">'+(end?'<div class="endtag">Ended</div>':'<div class="time">'+esc(rowTime(th))+'</div>'+(th.unread>0?'<div class="badge2">'+th.unread+'</div>':''))+'</div></div>'}
function reqCard(r){var h=Math.max(1,Math.ceil((r.exp-Date.now())/36e5));return '<div class="reqcard" data-q="'+r.q+'"><div class="top">'+bvAv(r.fromName)+'<div class="grow"><div class="tag">'+esc(r.kind)+' &middot; '+esc(r.about)+'</div><div class="nm">'+esc(r.fromName)+'</div><div class="rctx">'+esc(r.ctx)+'</div></div><span class="timeleft">'+h+'h left</span></div><div class="btns3"><button type="button" class="acc" data-act="ch_accept">Accept</button><button type="button" class="na" data-act="ch_na">Not Available</button></div></div>'}
function bvFeed(){var v=$('#s-activity .baview[data-s=feed] .body');if(!v)return;var hd=v.querySelector('.hd'),info=v.querySelector('.info'),keep=(hd?hd.outerHTML:'')+(info?info.outerHTML:''),h='',g=null;
 NT.forEach(function(x,i){if(x.g&&x.g!=g){g=x.g;h+='<div class="day">'+esc(x.g)+'</div>'}if((x.a||'').indexOf('req:')==0)return;h+='<div class="card ev'+(x.u?'':' read')+'"><span class="dot"></span><div class="flex" style="align-items:flex-start"><div class="'+(x.ic?'ic':'av')+'">'+(x.ic&&NI[x.ic]?NI[x.ic]:esc(x.av||'B'))+'</div><div class="grow"><div class="tag">'+esc(x.tag)+'</div><div class="t">'+esc(x.t)+'</div><div class="small">'+esc(x.s)+'</div></div></div><div class="foot"><span class="small">'+esc(x.tm)+'</span><button type="button" class="go" data-act="bv_ba" data-i="'+i+'">'+({chat:'Open Chat',req:'View Request',sr:'View'}[(x.a||'').split(':')[0]]||'View')+'</button></div></div>'});
 if(h){var f=v.querySelector('.ev');v.innerHTML=keep+h}else v.innerHTML=keep;BAMODE=NT.length?'feed':'empty'}
acts.bv_ba=function(e){var x=NT[+e.getAttribute('data-i')];if(!x)return;x.u=0;var c=e.closest('.ev');if(c)c.classList.add('read');ntOpen(x.a)};
var _bl=baLoad;baLoad=function(){bvFeed();_bl()};
function bvSweepReq(){var now=Date.now(),ex=REQIN.filter(function(r){return r.exp&&r.exp<=now});if(!ex.length)return;REQIN=REQIN.filter(function(r){return !(r.exp&&r.exp<=now)});
 ex.forEach(function(r){bvWith(r.fromUid,function(cc){var sr=cc.SR[r.sid],nm=r.toName||'Birvoy user';if(sr){sr.state='expired';sr.closed='Today, '+bvNow()}bvNtf(cc,{av:ini(nm),tag:'CONNECTION REQUEST',t:nm+' didn\u2019t respond in time.',s:'Your request about '+r.about+' expired after 24 hours.',tm:bvNow(),u:1,a:'sr:'+r.sid})})});bvPersist(true)}
setInterval(function(){try{var n=REQIN.length;bvSweepReq();if(REQIN.length!=n)bvChatDom()}catch(e){}},60000);
function bvChatDom(){bvSweepReq();var ids=Object.keys(TH).sort(function(a,b){return(TH[b].ord||0)-(TH[a].ord||0)}),act=ids.filter(function(i){return TH[i].state!='ended'}),end=ids.filter(function(i){return TH[i].state=='ended'});
 $('#chRecent').innerHTML=act.length?act.map(thRow).join(''):'<div class="bvnone">No conversations yet. Accept a request or send one to start chatting.</div>';
 $('#chEnded').innerHTML=end.map(thRow).join('');$$('#s-chats [data-h=ended]').forEach(function(n){n.style.display=end.length?'':'none'});
 $$('#s-chats .reqcard[data-q]').forEach(function(c){c.parentNode.removeChild(c)});var hdr=$('#s-chats [data-h=req]');hdr.insertAdjacentHTML('afterend',REQIN.map(reqCard).join(''));
 sentRender();chTidy();var requestPane=$('#s-chats .chpane[data-p=req]');if(requestPane)requestPane.hidden=!(REQIN.length+SRO.filter(function(id){return SR[id]&&SR[id].state==='pending'}).length);var any=ids.length+REQIN.length+SRO.length;var pm=CHMODE;if(CHMODE=='list'||CHMODE=='empty'){CHMODE=any?'list':'empty'}if(CHMODE!=pm&&cur=='chats')chShow();bvFeed()}
(function(){var st=document.createElement('style');st.textContent='.bvnone{padding:20px 16px;text-align:center;color:#6b7683;font-size:13px;line-height:1.45}#chReqEmpty{padding:18px 16px;text-align:center;color:#6b7683;font-size:13px;line-height:1.45}';document.head.appendChild(st)})();
var _ct=chTidy;chTidy=function(){_ct();var n=$$('#s-chats .reqcard').length,e=$('#chReqEmpty'),note=$('#s-chats [data-h=note]');if(!e){e=document.createElement('div');e.id='chReqEmpty';e.textContent='No requests right now. When someone wants to connect, it shows up here.';note.parentNode.insertBefore(e,note)}e.style.display=n?'none':''};

/* ---------- sending a request ---------- */
var _addSent=addSent;addSent=function(o){var k=_addSent(o);if(!k.bvd){k.bvd=1;k.exp=Date.now()+864e5;var t=bvTgt;
  if(!t){var ex=Object.keys(SR).map(function(x){return SR[x]}).filter(function(r){return r!==k&&r.name==o.name&&r.about==o.about&&r.bvd})[0];if(ex&&ex.to)t={uid:ex.to,rec:{id:ex.lid}}}
  if(t){k.lid=t.rec&&t.rec.id;if(t.promotion)k.promotion=t.promotion;if(t.uid&&DB.users[t.uid]){k.to=t.uid;bvDeliver(k,t.uid)}else k.simAt=Date.now()+3500+Math.random()*3500}else k.simAt=Date.now()+4000+Math.random()*2500}
 return k};
function bvDeliver(k,uid){var me=curUser();k.q='q'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
 bvWith(uid,function(c){c.reqIn.push({q:k.q,fromUid:me.id,fromName:shortName(me.name),toName:k.name,kind:k.kind,about:k.about,ctx:k.ctx,lid:k.lid,promotion:k.promotion||null,sid:k.id,exp:k.exp,at:Date.now()});bvNtf(c,{av:ini(me.name),tag:'NEW CONNECTION REQUEST',t:shortName(me.name)+' wants to connect about '+k.about+'.',s:'Respond in Chats within 24 hours',tm:bvNow(),u:1,a:'req:'+k.q})})}
var _bvDel=acts.my;acts.my=function(el){if((el.getAttribute('data-my')||'')=='phdel'){var du=curUser();if(du){try{Object.keys(TH).forEach(function(k){var pe=TH[k].peer;if(pe&&pe.uid)bvWith(pe.uid,function(cc){var t2=cc.TH[pe.id];if(t2&&t2.state!='ended'){t2.state='ended';t2.msgs.push({s:'This account was deleted. The chat is now read-only.'})}})});
 REQIN.forEach(function(r){bvWith(r.fromUid,function(cc){var sr=cc.SR[r.sid];if(sr){sr.state='declined';sr.closed='Today, '+bvNow()}})});
 Object.keys(DB.users).forEach(function(uid){if(uid!=du.id)bvWith(uid,function(cc){cc.reqIn=(cc.reqIn||[]).filter(function(r){return r.fromUid!=du.id})})})}catch(e){}
 delete DB.users[du.id];delete DB.data[du.id];if(DB.market)delete DB.market[du.id];DB.session=null;dbSave();bvClearUser();bvRebuildMarket()}toast('Account deleted');go('welcome');return}_bvDel(el)};
var _bv3my=acts.my;acts.my=function(el){var a=(el.getAttribute('data-my')||'').split(':');
 if(a[0]=='req'){var it=flGet(a[1]);if(it&&!it.own)bvTgt={uid:it.usr||null,rec:it}}
 else if(a[0]=='oreq'){var o=flFind(FLO,a[1]);if(o&&!o.own){bvTgt={uid:o.usr||null,rec:o};if(o.usr){try{flSend(o.who,'Personal Offer',o.t,'Interested in '+o.t)}finally{bvTgt=null}return}}}
 else if(a[0]=='nreq'){var n=flFind(FLN,a[1]);if(n&&!n.own)bvTgt={uid:n.usr||null,rec:n}}
 try{_bv3my(el)}finally{bvTgt=null}};
var _rcg=acts.th_recon_go;acts.th_recon_go=function(){var th=TH[chCur];bvTgt=th&&th.peer?{uid:th.peer.uid,rec:{id:null}}:null;try{_rcg()}finally{bvTgt=null}};
var _scg=acts.sr_cancel_go;acts.sr_cancel_go=function(){var r=SR[srTarget];if(r&&r.to&&r.q)bvWith(r.to,function(c){c.reqIn=c.reqIn.filter(function(x){return x.q!=r.q});c.NT=c.NT.filter(function(x){return x.a!='req:'+r.q})});_scg();bvPersist(true)};
var _sag=acts.sr_again;acts.sr_again=function(){var r=SR[srCur];bvTgt=r&&r.to?{uid:r.to,rec:{id:r.lid}}:null;try{_sag()}finally{bvTgt=null}};

/* ---------- answering a request ---------- */
acts.ch_accept=function(e){var c=e.closest('.reqcard'),q=c&&c.getAttribute('data-q'),r=REQIN.filter(function(x){return x.q==q})[0];if(!r)return;if(r.exp&&r.exp<=Date.now()){bvChatDom();toast('This request expired after 24 hours');return}REQIN=REQIN.filter(function(x){return x!==r});var id='c'+r.q,me=curUser(),now=Date.now();
 TH[id]={name:r.fromName,kind:r.kind,about:r.about,lid:r.lid,promotion:r.promotion||null,state:'active',unread:0,ord:now,peer:{uid:r.fromUid,id:id},msgs:[{d:'Today',ts:now},{s:'You accepted this request'}].concat(r.promotion?[{s:r.ctx}]:[])};
 bvWith(r.fromUid,function(cc){delete cc.SR[r.sid];cc.SRO=cc.SRO.filter(function(x){return x!=r.sid});var nm=r.toName||'Birvoy user';cc.TH[id]={name:nm,kind:r.kind,about:r.about,lid:r.lid,promotion:r.promotion||null,state:'active',unread:1,ord:now,peer:{uid:me.id,id:id},msgs:[{d:'Today',ts:now},{s:nm+' accepted your request'}].concat(r.promotion?[{s:r.ctx}]:[])};bvNtf(cc,{av:ini(nm),tag:'CONNECTION REQUEST',event:'request-accepted',t:nm+' accepted your request.',s:'Connected for: '+r.about,tm:bvNow(),u:1,a:'chat:'+id})});
 NT.forEach(function(x){if(x.a=='req:'+q)x.u=0});bvChatDom();toast('Request accepted');bvPersist(true);playReceivedSound();openThread(id)};
acts.ch_na_done=function(el){var c=chPick,q=c&&c.getAttribute('data-q'),r=REQIN.filter(function(x){return x.q==q})[0];chPick=null;chSheet(false);if(!r)return;var rsn=(el&&el.textContent=='Skip')?'':(($('#chz .rchip.on')||{}).textContent||'');REQIN=REQIN.filter(function(x){return x!==r});
 bvWith(r.fromUid,function(cc){var s=cc.SR[r.sid],nm=r.toName||'Birvoy user';if(s){s.state='declined';s.reason=rsn;s.closed='Today, '+bvNow()}bvNtf(cc,{av:ini(nm),tag:'CONNECTION REQUEST',t:nm+' isn’t available right now.',s:'Your request about '+r.about+' was closed.',tm:bvNow(),u:1,a:'sr:'+r.sid})});
 NT.forEach(function(x){if(x.a=='req:'+q)x.u=0});bvChatDom();toast('Request declined');bvPersist(true)};

/* ---------- messaging ---------- */
var sentSound=new Audio("/assets/031add91c3fede7cbf99e5ab.mp3");sentSound.preload='auto';
function playSentSound(){if(muted)return;try{sentSound.currentTime=0;var playback=sentSound.play();if(playback&&playback.catch)playback.catch(function(){})}catch(e){}}
/* ===== alert screens, message banners and Chats badge ===== */
(function(){
var st=document.createElement('style');st.textContent=
'.bvbadge{position:absolute;top:22px;left:42px;min-width:18px;height:18px;padding:0 5px;box-sizing:border-box;border-radius:9px;background:#E5342B;color:#fff;font:700 11px/18px Inter,-apple-system,Arial,sans-serif;text-align:center;box-shadow:0 0 0 1.5px #fff;pointer-events:none;z-index:3}'+
'#bvAl{position:absolute;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;padding:0 28px;background:rgba(1,63,99,.5);opacity:0;visibility:hidden;transition:opacity .2s,visibility 0s linear .2s;font-family:Inter,-apple-system,"SF Pro Text","Segoe UI",Arial,sans-serif}'+
'#bvAl.on{opacity:1;visibility:visible;transition:opacity .2s}'+
'#bvAl .card{width:100%;max-width:330px;box-sizing:border-box;background:#fff;border-radius:24px;padding:26px 22px 16px;text-align:center;transform:translateY(10px) scale(.97);transition:transform .22s;box-shadow:0 18px 50px rgba(1,63,99,.35)}'+
'#bvAl.on .card{transform:none}'+
'#bvAl .ic{width:64px;height:64px;border-radius:32px;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;background:#E5F4F9;color:#013F63}'+
'#bvAl .ic.ok{background:#E3F6EA;color:#1B7A3E}#bvAl .ic.warn{background:#FDECEA;color:#B3261E}'+
'#bvAl .tg{font-size:11px;font-weight:700;letter-spacing:.08em;color:#3A93B3;margin-bottom:6px}'+
'#bvAl h3{margin:0 0 8px;font-size:20px;line-height:1.25;font-weight:700;color:#013F63}'+
'#bvAl p{margin:0 0 18px;font-size:14px;line-height:1.45;color:#4B5560}'+
'#bvAl button{display:block;width:100%;border:0;cursor:pointer;font-family:inherit}'+
'#bvAl .p{height:46px;border-radius:23px;background:#013F63;color:#fff;font-size:15px;font-weight:700}'+
'#bvAl .s{height:42px;margin-top:6px;background:transparent;color:#013F63;font-size:14px;font-weight:600}'+
'#bvAl button:focus-visible{outline:2px solid #3A93B3;outline-offset:2px}'+
'#bvBn{position:absolute;left:10px;right:10px;top:46px;z-index:45;display:flex;gap:10px;align-items:center;padding:11px 14px;box-sizing:border-box;background:#fff;border:1px solid #D7E8F0;border-radius:18px;box-shadow:0 8px 28px rgba(1,63,99,.28);cursor:pointer;font-family:Inter,-apple-system,"SF Pro Text","Segoe UI",Arial,sans-serif;opacity:0;visibility:hidden;transform:translateY(-130%);transition:transform .3s,opacity .3s,visibility 0s linear .3s}'+
'#bvBn.on{opacity:1;visibility:visible;transform:none;transition:transform .3s,opacity .3s}'+
'#bvBn .av{flex:none;width:38px;height:38px;border-radius:19px;background:#013F63;color:#fff;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center}'+
'#bvBn .tx{min-width:0;flex:1}#bvBn .tg{font-size:10px;font-weight:700;letter-spacing:.08em;color:#3A93B3}'+
'#bvBn .nm{font-size:14px;font-weight:700;color:#013F63;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#bvBn .pv{font-size:13px;color:#4B5560;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'@media (prefers-reduced-motion:reduce){#bvAl,#bvAl .card,#bvBn{transition-duration:.01s!important}}';
document.head.appendChild(st);

var host=$('#toast').parentNode,al=document.createElement('div'),bn=document.createElement('div');
al.id='bvAl';al.setAttribute('role','alertdialog');al.setAttribute('aria-modal','true');
bn.id='bvBn';bn.setAttribute('role','status');
host.appendChild(al);host.appendChild(bn);

var IC={
 req:'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M19 8v6M16 11h6"/></svg>',
 ok:'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M7.8 12.4l3 3 5.4-6"/></svg>',
 warn:'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12.5M12 16.2v.1"/></svg>',
 bell:'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 21h4"/></svg>',
 chat:'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>'
};
var PRE=/^(splash|lang|welcome|create|mobile|login|allset)$/;
var AL={q:[],cur:null,seen:new WeakSet(),snap:{},uid:null,sum:false,bq:[],bt:0,bk:null};
function ok(){return !!curUser()&&!PRE.test(cur)}
function run(f){try{f&&f()}catch(e){}}
function openNotif(){try{acts.open_notif()}catch(e){go('notif')}}

/* modal alert screen */
function alShow(a){
 AL.cur=a;
 al.innerHTML='<div class="card" role="document"><div class="ic '+(a.cls||'')+'">'+(IC[a.ic]||IC.bell)+'</div><div class="tg">'+esc(a.tag||'')+'</div><h3 id="bvAlT">'+esc(a.title||'')+'</h3><p>'+esc(a.body||'')+'</p><button type="button" class="p">'+esc(a.p||'View')+'</button><button type="button" class="s">'+esc(a.s||'Later')+'</button></div>';
 al.setAttribute('aria-labelledby','bvAlT');al.classList.add('on');
 setTimeout(function(){var b=al.querySelector('.p');if(b)b.focus({preventScroll:true})},60)}
function alClose(){al.classList.remove('on');AL.cur=null}
al.addEventListener('click',function(e){var a=AL.cur;if(!a)return;var t=e.target;
 if(t.closest('.p')){alClose();if(a.nt)a.nt.u=0;run(a.go);bvBadge()}
 else if(t.closest('.s')||t===al)alClose()});
document.addEventListener('keydown',function(e){if(e.key=='Escape'){if(AL.cur)alClose();else if(bn.classList.contains('on'))bnHide()}});

/* message banner */
function bnHide(){bn.classList.remove('on');AL.bk=null;clearTimeout(AL.bt)}
function bnShow(k){var th=TH[k];if(!th)return;AL.bk=k;
 bn.innerHTML='<div class="av">'+esc(ini(th.name||'B'))+'</div><div class="tx"><div class="tg">NEW MESSAGE</div><div class="nm">'+esc(th.name||'Birvoy user')+'</div><div class="pv">'+esc(lastOf(th))+'</div></div>';
 bn.classList.add('on');clearTimeout(AL.bt);AL.bt=setTimeout(bnHide,4800)}
bn.addEventListener('click',function(){var k=AL.bk;bnHide();if(k&&TH[k])run(function(){openThread(k)});bvBadge()});
function threadOpen(k){return CHMODE=='thread'&&chCur==k&&cur=='chats'}

/* which alert does a new notification deserve */
function alFor(x){var t=x.tag||'',a=x.a||'',tx=x.t||'',sb=x.s||'';
 function go1(){if(a&&typeof ntOpen=='function')ntOpen(a);else openNotif()}
 if(t=='NEW MESSAGE')return null;
 if(t=='NEW CONNECTION REQUEST')return{nt:x,ic:'req',tag:'NEW REQUEST',title:'New connection request',body:tx+(sb?' '+sb+'.':''),p:'View request',s:'Later',go:go1};
 if(/accepted your request/.test(tx))return{nt:x,ic:'ok',cls:'ok',tag:'REQUEST ACCEPTED',title:tx,body:sb||'You can chat now.',p:'Open chat',s:'Later',go:go1};
 if(t=='CONNECTION REQUEST')return{nt:x,ic:'warn',cls:'warn',tag:'REQUEST UPDATE',title:tx,body:sb,p:'View',s:'Dismiss',go:go1};
 return{nt:x,ic:'bell',tag:t||'NOTIFICATION',title:tx,body:sb,p:'View',s:'Later',go:go1}}

/* badge on the Chats tab: pending requests + unread messages */
function unreadMsgs(){var n=0;Object.keys(TH).forEach(function(k){if(TH[k].state!='ended')n+=TH[k].unread|0});return n}
function bvBadge(){var n=curUser()?REQIN.length+unreadMsgs():0,t=n>99?'99+':n>9?'9+':''+n;
 $$('button.hit[aria-label^="Chats"]').forEach(function(b){var e=b.querySelector('.bvbadge');
  if(!e){e=document.createElement('span');e.className='bvbadge';e.setAttribute('aria-hidden','true');b.appendChild(e)}
  if(e.textContent!==t)e.textContent=t;e.style.display=n?'':'none';
  var l=n?'Chats, '+n+' new':'Chats';if(b.getAttribute('aria-label')!==l)b.setAttribute('aria-label',l)})}

function summary(){var rq=REQIN.length,mg=unreadMsgs(),nn=NT.filter(function(x){return x.u}).length;
 if(!rq&&!mg&&!nn)return null;
 var parts=[];if(rq)parts.push(rq+(rq==1?' pending request':' pending requests'));if(mg)parts.push(mg+(mg==1?' unread message':' unread messages'));if(nn)parts.push(nn+(nn==1?' notification':' notifications'));
 var title=rq?rq+(rq==1?' pending request':' pending requests'):mg?mg+(mg==1?' unread message':' unread messages'):nn+(nn==1?' new notification':' new notifications');
 return{ic:rq?'req':mg?'chat':'bell',tag:'WELCOME BACK',title:title,body:parts.length>1?parts.join(' · '):'Open it now to catch up.',
  p:rq?'View requests':mg?'Open Chats':'View notifications',s:'Later',
  go:function(){if(rq||mg){if(rq)CHTAB='req';else CHTAB='msg';go('chats')}else openNotif()}}}

function tick(){try{
 var u=curUser(),id=u?u.id:null;
 if(id!==AL.uid){AL.uid=id;AL.seen=new WeakSet();AL.snap={};AL.q=[];AL.bq=[];AL.sum=false;if(AL.cur)alClose();bnHide();
  if(id){NT.forEach(function(x){AL.seen.add(x)});Object.keys(TH).forEach(function(k){AL.snap[k]=TH[k].unread|0});AL.sum=true}
  bvBadge();return}
 if(!id){bvBadge();return}
 var chats={};
 NT.forEach(function(x){if(AL.seen.has(x))return;AL.seen.add(x);if(!x.u)return;var a=alFor(x);if(a){AL.q.push(a);if(/^chat:/.test(x.a||''))chats[x.a.slice(5)]=1}});
 Object.keys(TH).forEach(function(k){var th=TH[k],n=th.state=='ended'?0:(th.unread|0),p=AL.snap[k]|0;AL.snap[k]=n;
  if(n>p&&!chats[k]&&!threadOpen(k)){AL.bq=AL.bq.filter(function(x){return x!=k});AL.bq.push(k)}});
 if(!AL.cur&&ok()){
  if(AL.sum&&cur=='home'){AL.sum=false;var sm=summary();if(sm){alShow(sm);bvBadge();return}}
  if(AL.q.length){var a;
   if(AL.q.length>=3){var n=AL.q.length;AL.q=[];a={ic:'bell',tag:'UPDATES',title:n+' new updates',body:'You have new requests and notifications waiting.',p:'View notifications',s:'Later',go:openNotif}}
   else a=AL.q.shift();
   alShow(a);bvBadge();return}
  if(AL.bq.length&&!AL.bk){var k=AL.bq.shift();if(TH[k]&&!threadOpen(k)&&(TH[k].unread|0)>0)bnShow(k)}}
 if(AL.bk&&(!ok()||threadOpen(AL.bk)||AL.cur))bnHide();
 bvBadge()}catch(e){}}
setInterval(tick,500);bvBadge();
})();


var receivedSound=new Audio("/assets/6b5ca332e761ad083dea1965.mp3");receivedSound.preload='auto';
function playReceivedSound(){if(muted||!receivedSound)return;try{receivedSound.currentTime=0;var playback=receivedSound.play();if(playback&&playback.catch)playback.catch(function(){})}catch(e){}}

var _bvNtfReq=bvNtf;bvNtf=function(c,item){var r=_bvNtfReq(c,item);try{if(c&&c.NT===NT&&item&&item.u&&item.tag=='NEW CONNECTION REQUEST')playReceivedSound()}catch(e){}return r};
var SIMR=[];
function bvSimReply(){}
thSend=function(){var th=TH[chCur],i=$('#thIn');if(!th||th.state=='ended'||!i)return;var v=i.value.trim();if(!v)return;var id=chCur,tm=bvNow(),me=curUser();bvDay(th);th.msgs.push({w:'me',t:v,tm:tm});th.ord=Date.now();i.value='';$('#thSend').classList.add('off');renderMsgs(true);rowUp(id,true);var r=$('#s-chats .chatrow[data-t="'+id+'"]');if(r&&r.parentNode.id=='chRecent')r.parentNode.insertBefore(r,r.parentNode.firstChild);
 if(th.peer&&th.peer.uid){bvWith(th.peer.uid,function(c){var t=c.TH[th.peer.id];if(!t)return;bvDay(t);t.msgs.push({w:'them',t:v,tm:tm});t.unread=(t.unread||0)+1;t.ord=Date.now();bvNtf(c,{av:ini(t.name),tag:'NEW MESSAGE',t:t.name+' sent you a message.',s:v.length>70?v.slice(0,67)+'…':v,tm:tm,u:1,a:'chat:'+th.peer.id})})}else if(th.sim)bvSimReply(id);
 bvPersist(true);playSentSound()};
var _teg=acts.th_end_go;acts.th_end_go=function(){var th=TH[chCur];_teg();if(th&&th.peer&&th.peer.uid)bvWith(th.peer.uid,function(c){var t=c.TH[th.peer.id];if(t){t.state='ended';t.ord=Date.now();t.msgs.push({s:'Connection ended · '+TODAY})}});bvPersist(true)};

/* ---------- requests to listings that aren’t owned by a person on this device: simulated reply ---------- */
function bvSimResolve(){}
function bvExpire(){}
setInterval(function(){if(curUser())bvExpire()},1500);
var _opt=openThread;openThread=function(id){_opt(id);bvPersist(true)};
var _mod=MYR.myodet;MYR.myodet=function(){var h=_mod(),o=flFind(FLO,MY.st.myodet||'o2');return o&&o.who?h.replace('>Birvoy user<','>'+fxE(o.who)+'<').replace('Phone verified · Member since 2026','Birvoy member'):h};
(function(){var u=curUser();if(u){var d=bvUnpack(DB.data[u.id]);bvLoadChat(d&&d.chat);bvExpire()}else bvLoadChat(null);bvChatDom()})();


/* ===================== BV: search, matching, results, bell, verification ===================== */
var QS={text:'',photo:null};
var STOPW={};'i a an the and or for to of in on at my me we you your need needs looking look find want wanted get got some any with without is are be can could would please help someone somebody who that this there near nearby around new good best cheap affordable it im ive id am have has had do does did from by as if so but not no yes very really just also like also kind sort thing things something anything'.split(' ').forEach(function(w){STOPW[w]=1});
var SYNS=[['bike','bicycle','cycle','cycling'],['apartment','flat','property','villa','studio'],['phone','mobile','iphone','smartphone','samsung'],['car','auto','vehicle','automobile','motor'],['fix','repair','mechanic','maintenance'],['designer','design','interior','decor','decorate'],['tv','television','screen'],['sofa','couch','furniture'],['babysitter','nanny','childcare','kids'],['tutor','teacher','lesson','lessons','learning','teach'],['photo','photographer','photography','camera'],['clean','cleaner','cleaning','maid'],['plumber','plumbing','pipe','leak'],['electrician','electric','electrical','wiring'],['ac','aircon','air','conditioning','cooling'],['laptop','computer','pc'],['coffee','cafe','barista'],['move','moving','movers','removal'],['website','web','developer','code','coding','app'],['fitness','gym','trainer','workout']];
var WEAK={fix:1,repair:1,home:1,house:1,service:1,rent:1,work:1,job:1,time:1,week:1,today:1,tomorrow:1,now:1,price:1};
function qStem(w){if(w.length>5&&/(ing|ers)$/.test(w))return w.replace(/(ing|ers)$/,'');if(w.length>4&&/(ed|es)$/.test(w))return w.replace(/(ed|es)$/,'');if(w.length>3&&/s$/.test(w))return w.slice(0,-1);return w}
function qToks(s){return(s||'').toLowerCase().replace(/[^a-z0-9\u0600-\u06FF\s]/g,' ').split(/\s+/).filter(function(w){return w.length>1&&!STOPW[w]}).map(qStem)}
function qExpand(ts){var out=[];ts.forEach(function(t){var g=null;SYNS.forEach(function(s){if(s.map(qStem).indexOf(t)>-1)g=s});out.push({w:t,alts:g?g.map(qStem):[t]})});return out}
var ZONES={cap:['kuwait city','shuwaikh','sharq','dasman','mirgab','qibla','sawaber','daiya','khaldiya','kaifan','shamiya','qadsiya','rawda','adailiya','nuzha','faiha'],haw:['hawally','salmiya','salmiyah','salwa','jabriya','bayan','mishref','rumaithiya','shaab','salam','siddiq','surra','zahra','bidaa'],far:['farwaniya','khaitan','jleeb','ardiya','omariya','rai','firdous','andalous'],ahm:['ahmadi','fahaheel','mangaf','mahboula','abu halifa','fintas','sabahiya','riqqa','fahad al ahmad'],jah:['jahra','sulaibiya','saad al abdullah','naseem']};
function zoneOf(a){a=(a||'').toLowerCase();for(var z in ZONES)for(var i=0;i<ZONES[z].length;i++)if(a.indexOf(ZONES[z][i])>-1)return z;return null}
function userZone(){return zoneOf(ME.area)||'cap'}
function nearV(){var b=$('#s-type .pill.on');return b?b.getAttribute('data-v'):'n'}
function bvCands(){var out=[];
 FLB.forEach(function(b){if(b.own&&!b.sample)return;out.push({t:'b',r:b,title:b.n,tag:'BUSINESS PAGE',sub:b.cat,area:b.area,img:b.lg,sa:b.sa||'',score:0,f:[[b.sa||'',1],[(b.dv||[]).join(' '),1],[b.n,3],[b.cat,3],[(b.tags||[]).join(' '),3],[(b.items||[]).map(function(x){return x[0]}).join(' '),2],[b.about,1],[b.g,1]]})});
 FLP.forEach(function(p){if(p.own&&!p.sample)return;out.push({t:'p',r:p,title:p.n,tag:'PROFESSIONAL',sub:p.role,area:p.area,img:p.av,sa:p.sa||'',score:0,f:[[p.sa||'',1],[(p.dv||[]).join(' '),1],[p.role,3],[(p.tags||[]).join(' '),3],[p.n,2],[(p.items||[]).map(function(x){return x[0]}).join(' '),2],[p.about,1],[p.g,1]]})});
 FLO.forEach(function(o){if(o.own&&!o.sample)return;out.push({t:'o',r:o,title:o.t,tag:'PERSONAL OFFER',sub:o.p+' · '+o.c,area:o.area,img:o.art,score:0,f:[[o.t,3],[o.g,2],[o.d,1]]})});
 return out}
function bvMatch(text,near){var q=qExpand(qToks(text)),all=bvCands(),uz=userZone();
 all.forEach(function(c){c.hit=[];c.score=0;var fl=c.f.map(function(x){return{w:x[1],set:qToks(x[0])}});
  q.forEach(function(t){var best=0;fl.forEach(function(f){var ok=f.set.some(function(s){return t.alts.some(function(a){return s==a||(a.length>=4&&s.length>=4&&(s.indexOf(a)==0||a.indexOf(s)==0))})});if(ok&&f.w>best)best=f.w});if(best){c.score+=(WEAK[t.w]?Math.min(best,1):best);c.hit.push(t.w)}})});
 var base=all.filter(function(c){return c.score>=3});base.sort(function(a,b){return b.score-a.score||((b.r.conn||0)-(a.r.conn||0))});
 var nearOnly=base.filter(function(c){var z=zoneOf(c.area),sz=c.sa?(/all kuwait/i.test(c.sa)?'all':zoneOf(c.sa)):null,rm=c.r.dvk&&c.r.dvk.remote;return !z||z==uz||sz=='all'||sz==uz||rm});
 return{all:base,near:nearOnly,list:near=='n'?nearOnly:base}}

/* ---------- results screen ---------- */
(function(){var st=document.createElement('style');st.textContent='#s-results #rc{height:auto!important;min-height:874px;padding-bottom:130px;background:linear-gradient(#EAF4FC,#fff 220px)}'+
'.bvst{height:52px;display:flex;justify-content:space-between;align-items:center;padding:0 30px 0 38px;font:600 15px Inter,-apple-system,sans-serif;color:#000}.bvst span:last-child{display:flex;gap:6px;align-items:center}'+
'.rbd{padding:0 20px;font-family:Inter,-apple-system,sans-serif;color:#013F63}.rbd h2{font-size:21px;text-align:center;margin:4px 0 2px}.rbd .sb{font-size:13px;color:#555;text-align:center;margin-bottom:14px}'+
'.rneed{background:#fff;border:1px solid #C6D3E0;border-radius:16px;padding:12px 14px;margin-bottom:12px}.rneed .l{font-size:10.5px;font-weight:700;letter-spacing:.06em;color:#6b7683}.rneed .t{font-size:14.5px;line-height:21px;color:#0C1E2E;margin-top:4px;word-break:break-word;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}'+
'.rneed .r{display:flex;gap:10px;align-items:center;margin-top:8px}.rneed img{width:44px;height:44px;border-radius:8px;object-fit:cover}.rneed .ed{margin-left:auto;border:1px solid #013F63;color:#013F63;background:#fff;font:600 13px Inter,sans-serif;border-radius:16px;height:30px;padding:0 14px;cursor:pointer}'+
'.rseg{display:flex;gap:6px;padding:4px;background:#EAF1FA;border-radius:999px;margin:0 0 6px}.rseg button{flex:1;border:0;background:transparent;font:600 13.5px Inter,sans-serif;color:#013F63;height:34px;border-radius:999px;cursor:pointer}.rseg button.on{background:#fff;box-shadow:0 1px 4px rgba(1,63,99,.15)}'+
'.rcnt{font-size:12.5px;color:#6b7683;margin:10px 2px 8px}'+
'.mcard{background:#fff;border:1px solid #C6D3E0;border-radius:16px;padding:12px;margin-bottom:12px}.mcard .top{display:flex;gap:11px;align-items:center}.mcard .mav{width:52px;height:52px;border-radius:12px;object-fit:cover;flex:none;background:#EAF1FA}.mcard .mav.rd{border-radius:50%}'+
'.mcard .tg{font-size:10.5px;font-weight:700;letter-spacing:.05em;color:#013F63}.mcard .nm{font-size:15.5px;font-weight:700;color:#013F63;line-height:1.25;margin-top:1px}.mcard .sb2{font-size:12.5px;color:#555;margin-top:1px}.mcard .why{font-size:12px;color:#1B6FA8;background:#EAF4FC;border-radius:8px;padding:6px 9px;margin:10px 0 0}'+
'.mcard .bt{display:flex;gap:8px;align-items:stretch;margin-top:12px}.mcard .bt button{height:38px;min-width:0;border-radius:19px;border:1px solid #013F63;background:#fff;color:#013F63;font:600 13px Inter,sans-serif;padding:0 14px;white-space:nowrap;cursor:pointer}.mcard .bt .cn{flex:1;margin-left:auto;background:#013F63;color:#fff;border:0;padding:0 10px;font-weight:700;font-size:13px}.mcard .bt .cn.dn{background:#DCE6F0;color:#5b6b7b}.mcard .bt .cn.chat-open{background:#5AC0DE;color:#013F63}'+
'.rnone{text-align:center;padding:12px 8px}.rnone img{width:150px;height:150px;object-fit:contain}.rnone h3{font-size:18px;margin:6px 0 6px}.rnone p{font-size:13.5px;line-height:1.5;color:#555;margin:0 6px 16px}.rnone .pri{display:block;width:100%;height:50px;border:0;border-radius:25px;background:linear-gradient(180deg,#1E90FF,#0069E0);color:#fff;font:700 15px Inter,sans-serif;cursor:pointer}.rnone .sec{display:block;width:100%;height:44px;border:0;background:transparent;color:#013F63;font:600 14px Inter,sans-serif;cursor:pointer;margin-top:4px}'+
'.bvmic{width:72px;height:72px;border-radius:50%;margin:0 auto 12px;background:#013F63;display:grid;place-items:center;animation:bvpulse 1.4s ease-out infinite}.bvmic svg{width:32px;height:32px;stroke:#fff;fill:none;stroke-width:2;stroke-linecap:round}@keyframes bvpulse{0%{box-shadow:0 0 0 0 rgba(1,63,99,.45)}100%{box-shadow:0 0 0 24px rgba(1,63,99,0)}}'+
'.bvph{display:block;width:100%;max-height:160px;object-fit:cover;border-radius:12px;margin:8px 0 2px}';document.head.appendChild(st)})();
function bvStatus(){var s=$('#s-chats .status'),ic=s&&s.children[1]?s.children[1].innerHTML:'';return '<div class="bvst"><span>9:41</span><span>'+ic+'</span></div>'}
function bvConnLabel(c){var nm=c.t=='o'?c.r.who||'Birvoy user':c.r.n,ab=c.t=='b'?c.r.cat:c.t=='p'?c.r.role:c.r.t;
 for(var k in TH){if(TH[k].state=='active'&&TH[k].name==nm&&TH[k].about==ab)return{s:'chat',id:k}}
 for(var i=0;i<SRO.length;i++){var r=SR[SRO[i]];if(r&&r.state=='pending'&&r.name==nm&&r.about==ab)return{s:'sent'}}return{s:'go'}}
function bvResults(){var m=bvMatch(QS.text,nearV()),nv=nearV(),rc=$('#rc'),n=m.list.length,h=bvStatus()+'<div class="rbd"><h2>Matches for Your Need</h2><div class="sb">'+(n?n+(n==1?' match':' matches')+' found':'No suitable matches yet')+'</div>';
 h+='<div class="rneed"><div class="l">YOUR NEED</div><div class="t">'+esc(QS.text)+'</div><div class="r">'+(QS.photo?'<img src="'+QS.photo+'" alt="Attached photo">':'')+'<button type="button" class="ed" data-act="bv_edit">Edit your need</button></div></div>';
 h+='<div class="rseg" role="tablist"><button type="button" class="'+(nv=='n'?'on':'')+'" data-act="bv_near" data-v="n">Nearby</button><button type="button" class="'+(nv=='a'?'on':'')+'" data-act="bv_near" data-v="a">Doesn’t matter</button></div>';
 if(n){h+='<div class="rcnt">'+(nv=='n'?'Distance ranking is not available yet. Showing relevant matches. ':'')+'Best match first.</div>';
  m.list.slice(0,8).forEach(function(c){var st=bvConnLabel(c),lab=c.r.own&&c.r.sample?'Your listing':st.s=='chat'?'Open Chat':st.s=='sent'?'Request sent':'Send Request';
   h+='<div class="mcard"><div class="top"><img class="mav'+(c.t=='p'?' rd':'')+'" src="'+c.img+'" alt=""><div class="grow" style="min-width:0"><div class="tg">'+c.tag+'</div><div class="nm">'+esc(c.title)+'</div><div class="sb2">'+esc(c.sub)+' · '+esc(c.area||'Kuwait')+'</div></div></div>'+(c.hit.length?'<div class="why">Matches: '+c.hit.slice(0,4).map(esc).join(', ')+'</div>':'')+'<div class="bt"><button type="button" data-act="bv_view" data-t="'+c.t+'" data-id="'+c.r.id+'">View</button><button type="button" data-act="bv_share" data-id="'+c.r.id+'">Share</button>'+(c.r.own&&c.r.sample?'':'<button type="button" class="cn'+(st.s=='sent'?' dn':st.s=='chat'?' chat-open':'')+'" data-act="bv_connect" data-t="'+c.t+'" data-id="'+c.r.id+'" data-th="'+(st.id||'')+'"'+(st.s=='sent'?' disabled':'')+'>'+lab+'</button>')+'</div></div>'})}
 else{h+='<div class="rnone"><img src="'+(window.FXBIRD?window.FXBIRD.sn:'')+'" alt=""><h3>No suitable matches yet</h3><p>No suitable active sources were found for this need.</p><button type="button" class="pri" data-act="bv_post">Create a Special Need</button><button type="button" class="sec" data-act="bv_edit">Edit your need</button></div>'}
 rc.innerHTML=h+'</div>';var rs=$('#rscroll');if(rs)rs.scrollTop=0}
acts.bv_near=function(e){var v=e.getAttribute('data-v');setNear(v);bvResults()};
acts.bv_edit=function(){go('type');setTimeout(function(){need.focus({preventScroll:true})},450)};
acts.bv_share=function(){toast('Link copied')};
acts.bv_view=function(e){var t=e.getAttribute('data-t'),id=e.getAttribute('data-id');acts.my({getAttribute:function(){return t=='o'?'od:'+id:'nv:'+(t=='b'?'mybview':'mypview')+':'+id}})};
acts.bv_connect=function(e){var t=e.getAttribute('data-t'),id=e.getAttribute('data-id'),th=e.getAttribute('data-th');if(th){openThread(th);return}var item=t=='o'?flFind(FLO,id):flGet(id);if(!item||item.own){toast('This listing is not available for a connection.');return}var prior=bvTgt;bvTgt={uid:item.usr||null,rec:item};try{return flSend(t=='o'?item.who:item.n,t=='o'?'Personal Offer':t=='b'?'Business Page':'Professional',t=='o'?item.t:t=='b'?item.cat:item.role,QS.text)}finally{bvTgt=prior}};
acts.bv_post=function(){FXH.start('sn');FX.d.desc=QS.text.slice(0,500);if(QS.photo)FX.d.ph[0]=QS.photo;fxRender(false)};
var _rdone=reqDone;reqDone=function(){if(reqBack=='results'){reqBack='home';bvResults();go('results')}else _rdone()};
var _setNear=setNear;setNear=function(v){_setNear(v)};

/* ---------- submit a need (typed, spoken or photographed all end up here) ---------- */
acts.ask=function(){var txt=need.value.trim();if(!txt){if(cur=='type'){toast('Tell us what you need first');need.focus()}else go('type');return}
 QS.text=txt;var rc=$('#rc');if(rc)rc.classList.remove('sent');go('search');rt=setTimeout(function(){if(cur=='search'){bvResults();go('results')}},4500)};
var _acph=acts.ph;acts.ph=function(el){var v=el.getAttribute('data-ph')||'';if(v=='capture:Camera'){bvCamera();return}if(v=='capture:Voice input'){bvVoice();return}_acph(el)};
function bvCamera(){bvPickImage(800,function(u){QS.photo=u;var tmp=need.value;
  bvSheet({title:'What do you need?',sub:'Add a few words so Birvoy can find the right match for this photo.',fields:[{id:'t',label:'Describe what you need',ph:'e.g. Someone to fix this',val:tmp,max:300}],cta:'Find matches',ghost:'Cancel',onCancel:function(){QS.photo=null},onSubmit:function(v){var t=v.t.trim();if(!t)return{t:'Please add a few words about what you need.'};need.value=t;need.dispatchEvent(new Event('input'));sheetClose();setTimeout(function(){acts.ask()},150);return true}});
  var c=$('.bvcard h3');if(c)c.insertAdjacentHTML('afterend','<img class="bvph" src="'+u+'" alt="Your photo">')},true)}
function bvVoice(){var C=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!C){bvSheet({title:'Voice input isn’t available',sub:'This browser can’t listen for speech. Please type what you need instead.',ghost:'OK',onCancel:function(){need.focus()}});return}
 var rec=new C(),fin='',done=false;rec.lang='en-US';rec.interimResults=true;rec.continuous=false;
 function use(){if(done)return;done=true;try{rec.stop()}catch(e){}var t=fin.trim();sheetClose();if(!t){toast('I didn’t catch that. Try again.');return}need.value=(need.value&&need.value.trim()?need.value.trim()+' ':'')+t;need.dispatchEvent(new Event('input'));toast('Searching for: '+t.slice(0,40));setTimeout(function(){if(cur=='type')acts.ask()},700)}
 bvSheet({title:'Listening…',sub:'Say what you need, in your own words.',lock:1,cta:'Use this',ghost:'Cancel',onSubmit:function(){use();return true},onCancel:function(){done=true;try{rec.abort()}catch(e){}}});
 var h=$('.bvcard h3');if(h)h.insertAdjacentHTML('beforebegin','<div class="bvmic"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></div>');
 var se=$('#bvse');
 rec.onresult=function(e){var t='';for(var i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;fin=t;if(se){se.style.color='#013F63';se.textContent='“'+t.trim()+'”'}};
 rec.onerror=function(e){if(done)return;var m={'not-allowed':'Microphone access is blocked. Allow it in your browser settings, or type your need.','service-not-allowed':'Microphone access is blocked. Allow it in your browser settings, or type your need.','no-speech':'I didn’t hear anything. Tap Cancel and try again.','audio-capture':'No microphone was found.'}[e.error]||'Voice input isn’t working right now. You can type your need instead.';if(se){se.style.color='#C62828';se.textContent=m}};
 rec.onend=function(){if(!done&&fin.trim())use()};
 try{rec.start()}catch(x){if(se){se.style.color='#C62828';se.textContent='Voice input couldn’t start. You can type your need instead.'}}}

/* ---------- notification bell: dot only while something is unread ---------- */
(function(){var d=document.createElement('div');d.id='bvBellDot';d.style.cssText='position:absolute;left:296.5px;top:83.5px;width:5.5px;height:7px;background:#054A7C;border-radius:3px 0 0 3px;z-index:6;pointer-events:none';$('#s-home').appendChild(d)})();
function bvBell(){var d=$('#bvBellDot');if(d)d.style.display=NT.some(function(x){return x.u})?'none':''}
setInterval(bvBell,700);bvBell();

/* ---------- verification: only shown when it has really been completed ---------- */
function isVerified(u){return u&&u.verified!==false}
var _bcu=bvCreateUser;
function verifySheet(){var u=curUser();if(!u)return;var n={k:'email',v:u.idv},code=newCode(),tries=0;showCode(n,code);bvSheet({title:'Verify your '+(u.kind=='email'?'email':'mobile number'),sub:'We sent a 6-digit code to '+maskId(n,u.raw)+'.',lock:1,fields:[{id:'c',label:'6-digit code',ph:'••••••',mode:'numeric',max:6,cls:'bvcode',ac:'one-time-code'}],cta:'Verify',ghost:'Not now',onSubmit:function(v){if(v.c.trim()!==code){tries++;return{c:tries>=5?'Too many attempts. Close and try again.':'That code isn’t right.'}}u.verified=true;dbSave();smsEl.classList.remove('on');toast('Verified');if(/^my/.test(cur))myRender(cur);return true}})}
var _mys2=MYR.myself;MYR.myself=function(){var u=curUser(),h=_mys2();
 h=h.replace(/<div class="tags" style="margin:8px 0 2px">.*?<\/div>/,function(){return '<div class="tags" style="margin:8px 0 2px">'+(isVerified(u)?'<span class="chip">'+(u&&u.kind=='email'?'Email':'Phone')+' verified</span>':'<span class="chip c">Not verified</span><button type="button" class="chip" style="border:0;cursor:pointer;background:#013F63;color:#fff" data-act="my" data-my="bv:verify">Verify now</button>')+'</div>'});
 var ar=(ME.area||'Kuwait').replace(/,?\s*Kuwait$/i,'');h=h.replace('Salmiya, Kuwait',fxE(ar)+', Kuwait');return h};
var _bvmy4=acts.my;acts.my=function(el){if((el.getAttribute('data-my')||'')=='bv:verify'){verifySheet();return}_bvmy4(el)};
/* listings: posters and business pages only look verified when their owner is */
var _mbMarket=bvMarketOf;bvMarketOf=function(u){var o=_mbMarket(u),v=isVerified(u);['biz','pro','off','need'].forEach(function(k){o[k].forEach(function(x){x.ver=v;x.vk=u.kind})});return o};
function bvPoster(h,x){if(!x||!x.usr)return h;if(x.ver){return h.replace('Phone verified · Member since 2026',(x.vk=='email'?'Email':'Phone')+' verified')}return h.replace('Phone verified · Member since 2026','Not verified').replace('<span class="chip">Verified</span>','')}
var _mod2=MYR.myodet;MYR.myodet=function(){return bvPoster(_mod2(),flFind(FLO,MY.st.myodet||'o2'))};
var _mnd2=MYR.myndet;MYR.myndet=function(){return bvPoster(_mnd2(),flFind(FLN,MY.st.myndet||'n2'))};

/* ===================== Personal Offers: client feedback round ===================== */
var REQNEW=null,PENDL=null;
(function(){var st=document.createElement('style');st.textContent=
'#hoff{position:absolute;left:21px;top:346px;width:176px;height:244px;border-radius:16px;overflow:hidden;background:linear-gradient(180deg,#5BC3DD 0,#4FB0D6 54px,#0B4E86 200px,#07457A 100%);color:#fff;font-family:Inter,sans-serif;z-index:3}'+
'#hoff .t{position:absolute;left:10px;top:7px;font:italic 800 19px Inter,sans-serif;letter-spacing:-.2px}#hoff .s{position:absolute;left:10px;top:30px;font:400 10.5px/12px Inter,sans-serif;opacity:.95}'+
'#hoff .ph{position:absolute;left:0;top:54px;width:176px;height:141px;object-fit:cover}#hoff .fade{position:absolute;left:0;top:54px;width:176px;height:141px;background:linear-gradient(180deg,rgba(11,78,134,0) 45%,#0B4E86 100%)}'+
'#hoff .cap{position:absolute;left:10px;top:172px;width:100px;font:700 12.5px/15px Inter,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#hoff .ar{position:absolute;left:10px;top:190px;width:104px;font:400 11px Inter,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#hoff .vw{position:absolute;left:116px;top:176px;width:53px;height:23px;border:0;border-radius:12px;background:#5AC0DE;color:#fff;font:700 12px Inter,sans-serif;cursor:pointer}'+
'#hoff .dots{position:absolute;left:0;right:0;top:211px;text-align:center}#hoff .dots i{display:inline-block;width:5px;height:5px;border-radius:50%;background:#fff;opacity:.45;margin:0 2px}#hoff .dots i.on{opacity:1}'+
'#hoff .more{position:absolute;left:0;right:0;top:220px;text-align:center;background:none;border:0;color:#fff;font:400 12px Inter,sans-serif;text-decoration:underline;cursor:pointer;width:100%}'+
'#hoff .emp{position:absolute;left:12px;right:12px;top:72px;text-align:center}#hoff .emp b{display:block;font:700 13px Inter,sans-serif;margin-bottom:6px}#hoff .emp span{font:400 11px/15px Inter,sans-serif;opacity:.92}'+
'.ogal{display:flex;gap:6px;overflow-x:auto;margin:6px 0 0}.ogal img{width:64px;height:64px;border-radius:8px;object-fit:cover;flex:none}'+
'.cta.pend{background:#DCE6F0;color:#3b5368}';
document.head.appendChild(st)})();

/* --- boosted offers (a boost is an active "Personal Offer" promotion on the owner's offer) --- */
function offBoosted(o){return !!(o&&o.bu&&o.bu>Date.now())}
var _bvMO=bvMarketOf;bvMarketOf=function(u){var o=_bvMO(u),d=bvUnpack(DB.data[u.id])||{},of=(d.my||{}).offers||[];
 o.off.forEach(function(x){var it=of.filter(function(i){return 'ou_'+u.id+'_'+i.id==x.id})[0];if(it){x.bu=it.boost||0;x.gal=((it.fd||{}).ph||[]).filter(function(p){return typeof p=='string'&&p.length>20})}});return o};
function boostStop(it){it.boost=0;MY.promo.forEach(function(p){if(p.offer==it.id&&p.s=='active')p.s='past'})}
function bvSourceGone(nm){if(!nm)return;try{var ex=REQIN.filter(function(r){return r.about==nm});REQIN=REQIN.filter(function(r){return r.about!=nm});
 ex.forEach(function(r){bvWith(r.fromUid,function(cc){var sr=cc.SR[r.sid],n2=r.toName||'Birvoy user';if(sr){sr.state='declined';sr.reason='No longer available';sr.closed='Today, '+bvNow()}bvNtf(cc,{av:ini(n2),tag:'CONNECTION REQUEST',t:n2+' isn\u2019t available right now.',s:'Your request about '+r.about+' was closed.',tm:bvNow(),u:1,a:'sr:'+r.sid})})});
 Object.keys(TH).forEach(function(k){var th=TH[k];if(th.about==nm&&th.state!='ended'){th.state='ended';th.msgs.push({s:'This source was deleted. The chat is now read-only.'});var pe=th.peer;if(pe&&pe.uid)bvWith(pe.uid,function(cc){var t2=cc.TH[pe.id];if(t2&&t2.state!='ended'){t2.state='ended';t2.msgs.push({s:'This source was deleted. The chat is now read-only.'})}})}});bvChatDom();bvPersist(true)}catch(e){}}
var _myDo=myDo;myDo=function(l,id,v){
  if(v=='del'&&MY.arm==l+id&&/^(offers|biz|pro)$/.test(l)){var fd=myFind(l,id),di=fd&&fd[0][fd[1]];if(di)bvSourceGone(di.t||di.n)}
  if(l=='offers'&&(v=='close'||v=='pause')){var fo=myFind('offers',id),oo=fo&&fo[0][fo[1]];if(oo&&oo.s=='closed'){toast('This offer is closed. It stays in My Offers as history.');return}}
  if(l=='promo'&&v=='again'){var po=MY.promo.filter(function(x){return x.id==id})[0];if(!po)return;var tg=po.offer?myFind('offers',po.offer):null;
   if(po.offer&&(!tg||tg[0][tg[1]].s!='active')){toast('Resume the offer before promoting it again');return}
   if(MY.promo.some(function(x){return x.s=='active'&&x.kind==po.kind&&x.n==po.n})){toast('This is already being promoted');return}
   MY.promo.unshift({id:++MY.seq,kind:po.kind,n:po.n,day:1,v:0,rq:0,sc:0,s:'active',vl:po.vl,rl:po.rl,to:po.to,offer:po.offer,from:po.id});if(tg)tg[0][tg[1]].boost=Date.now()+14*864e5;MY.tab.promo=0;toast('New campaign started with fresh counters');bvPersist(true);myRender(cur);return}
 if(l=='offers'&&v=='boost'){var f=myFind('offers',id),it=f&&f[0][f[1]];if(!it)return;
  if(it.boost&&it.boost>Date.now()){boostStop(it);toast('Boost stopped')}
  else{if(it.s!='active'){toast('Resume this offer before boosting it');return}it.boost=Date.now()+14*864e5;MY.promo.unshift({id:++MY.seq,kind:'PERSONAL OFFER',n:it.t,offer:it.id,day:1,v:0,rq:0,sc:0,s:'active',vl:'Offer Views',rl:'Interests'});toast('Offer boosted for 14 days. It now appears on Home.')}
  bvPersist(true);myRender(cur);return}
 if(l=='promo'&&v=='stop'){var p=MY.promo.filter(function(x){return x.id==id})[0];if(p&&p.offer){var f2=myFind('offers',p.offer);if(f2)f2[0][f2[1]].boost=0}}
 if(l=='offers'&&(v=='pause'||v=='close'||v=='del')){var f3=myFind('offers',id);if(f3&&(v=='del'?MY.arm==l+id:true))boostStop(f3[0][f3[1]])}
 _myDo(l,id,v);if(/^offers|promo$/.test(l))bvPersist(true)};
var _mo2=MYR.myoffers;MYR.myoffers=function(){var h=_mo2();return h.replace(/(<button type="button" class="pill[^"]*" data-act="my" data-my="do:offers:(\d+):(?:pause|close)">)/,function(m,a,id){return m}).replace(/<div class="btns">(<button[^>]*data-my="edit:offers:(\d+)">Edit<\/button>)/g,function(m,e,id){var f=myFind('offers',+id),it=f&&f[0][f[1]],on=it&&it.boost&&it.boost>Date.now();return '<div class="btns">'+e+(it&&it.s=='active'?myPill('o',on?'Stop boost':'Boost','do:offers:'+id+':boost'):'')})};
var _mp2=MYR.mypromo;MYR.mypromo=function(){return _mp2().replace(/data-my="go:undefined">View Business/g,'data-my="go:myoffers">View Offer')};

/* --- Home: Personal Offers card shows boosted offers only --- */
var HO={i:0};
function hoList(){return FLO.filter(function(o){return o.feat||(o.usr&&offBoosted(o))}).sort(function(a,b){return b.at-a.at})}
function hoRender(){var el=$('#hoff');if(!el)return;var L=hoList(),h='<div class="t">Personal Offers</div><div class="s">See what people are offering.<br>It might be what you need.</div>';
 if(!L.length){h+='<div class="emp"><b>No featured offers right now</b><span>Boosted offers appear here. Describe what you need and Birvoy will match you with any offer.</span></div>'}
 else{if(HO.i>=L.length)HO.i=0;var o=L[HO.i],img=(o.gal&&o.gal[0])||o.cv;h+='<img class="ph" src="'+img+'" alt=""><div class="fade"></div><div class="cap">'+fxE(o.t)+'</div><div class="ar">'+fxE(o.area)+', Kuwait</div><button type="button" class="vw" data-act="hoff_view" data-id="'+fxE(o.id)+'">View</button>';
  if(L.length>1){h+='<div class="dots">';L.slice(0,6).forEach(function(x,k){h+='<i class="'+(k==HO.i?'on':'')+'"></i>'});h+='</div>'}}
 h+='<button type="button" class="more" data-act="ol_open">View More Offers</button>';el.innerHTML=h}
(function(){['home_offer','ol_open'].forEach(function(a){var b=$('#s-home [data-act='+a+']');if(b)b.parentNode.removeChild(b)});var d=document.createElement('div');d.id='hoff';d.setAttribute('role','group');d.setAttribute('aria-label','Featured Personal Offers');$('#hc').appendChild(d);hoRender()})();
acts.hoff_view=function(e){if(e.getAttribute('data-id')=='o1'){MY.hf=fidx;MY.bk.odet='home';ODET.mode='browse';ODET.sent=0;s6go('odet');return}MY.hf=fidx;MY.bk.myodet='home';MY.st.myodet=e.getAttribute('data-id');go('myodet')};
setInterval(function(){if(cur=='home'&&!gest&&hoList().length>1){HO.i++;hoRender()}},4000);
/* More offers from Home lists featured offers only; everything else is found through matching */
MYR.myoffl=function(){var L=FLO.filter(function(o){return o.feat||(o.usr&&offBoosted(o))}).sort(function(a,b){return b.at-a.at}),h=flBack()+myHd('Featured Personal Offers','Boosted offers from people near you')+'<div class="cnt2">'+L.length+' featured offer'+(L.length==1?'':'s')+'</div><div class="ogrid">';
 L.forEach(function(o){h+='<div class="card oc" role="button" tabindex="0" data-act="my" data-my="od:'+o.id+'"><img src="'+((o.gal&&o.gal[0])||o.art)+'" alt=""><div class="ob"><div class="name">'+fxE(o.t)+'</div><div class="pr2">'+fxE(o.p)+'</div><div class="small">'+fxE(o.area)+' · '+fxE(o.c)+'</div><div class="small ago">'+fxE(o.ago)+'</div></div></div>'});
 if(!L.length)h+='</div><div class="empty">No featured offers right now.</div><div class="empty">Offers that aren’t featured still reach you. Tell Birvoy what you need on Home and matching will find them.</div>';
 else h+='</div><div class="empty">These offers are boosted. Other offers are found when you describe what you need on Home.</div>';return h};

/* --- offer detail: uploaded photos, request state, no stand-in sample screen --- */
MYR.myodet=function(){var o=flFind(FLO,MY.st.myodet||'o2');if(!o)return flBack()+'<div class="empty">This offer isn’t available anymore. It may have been paused, closed or removed.</div>';
 var h=flBack(),ph=o.gal&&o.gal.length?o.gal:null,cv=ph?ph[0]:o.cv;
 h+=offerGallery(o);
 h+='<div class="tag" style="margin-top:9px">PERSONAL OFFER'+(offBoosted(o)?' · FEATURED':'')+'</div><div class="name xl">'+fxE(o.t)+'</div><div class="pr2 xl">'+fxE(o.p)+'</div><div class="tags" style="margin-top:5px"><span class="chip">'+fxE(o.c)+'</span><span class="chip">'+fxE(o.g)+'</span><span class="chip">'+fxE(o.area)+'</span></div>';
 h+=flPoster(o.who||'Birvoy user',o.who?'Birvoy member':'Phone verified · Member since 2026');
 var cl=o.own?{s:'own'}:bvConnLabel({t:'o',r:o}),btn=cl.s=='own'?'<div class="empty" style="margin:0;flex:1">This is your own listing. Manage it from My Birvoy.</div>':cl.s=='chat'?'<button type="button" class="cta" data-act="my" data-my="ochat:'+cl.id+'">Open Chat</button>':cl.s=='sent'?'<button type="button" class="cta pend" data-act="my" data-my="ochats:x">Request sent</button>':'<button type="button" class="cta" data-act="my" data-my="oreq:'+o.id+'">Send Request</button>';
 h+='<div class="acts3">'+btn+flSq(o.id)+'</div>';
 h+='<div class="sec" style="margin-top:12px">Description</div><p class="para">'+fxE(o.d)+'</p>';
 h+='<div class="sec">Details</div><div class="list"><div><span>Price</span><em>'+fxE(o.p)+'</em></div><div><span>Condition</span><em>'+fxE(o.c)+'</em></div>'+o.x.map(function(x){return '<div><span>'+fxE(x[0])+'</span><em>'+fxE(x[1])+'</em></div>'}).join('')+'<div><span>Area</span><em>'+fxE(o.area)+', Kuwait</em></div></div>';
 return bvPoster(h+'<div class="empty">Meet in a public place and check the item before you pay. Birvoy never asks for payment in advance.</div>',o)};

/* --- Request sent: only after a request has really been created; wording points to Chats --- */
function reqPendingFor(name,about){return SRO.some(function(id){var r=SR[id];return r&&r.state=='pending'&&r.name==name&&r.about==about})}
function reqThreadFor(name,about){for(var k in TH)if(TH[k].state=='active'&&TH[k].name==name&&TH[k].about==about)return k;return null}
flSend=function(name,kind,about,ctx){var th=reqThreadFor(name,about);if(th){toast('You’re already connected. Opening your chat.');openThread(th);return false}
 if(reqPendingFor(name,about)){toast('Request already sent. Track it in Chats under Sent Requests.');return false}
 var r=null;try{r=addSent({name:name,kind:kind,about:about,ctx:ctx})}catch(e){r=null}
 if(!r||!SR[r.id]||SR[r.id].state!='pending'||!REQNEW){REQNEW=null;toast('Couldn’t send your request. Please try again.');return false}
 bvPersist(true);reqName(name);reqBack=cur;go('reqsent');return true};
var _as3=addSent;addSent=function(o){var n=srN,k=_as3(o);REQNEW=(srN>n&&k&&SR[k.id])?k.id:null;return k};
var _go3=go;go=function(id){if(id=='reqsent'){if(!REQNEW){toast('Request already sent. Track it in Chats under Sent Requests.');return}REQNEW=null;if(!window.bvRequestSoundPlayed)playSentSound();window.bvRequestSoundPlayed=false}var r=_go3(id);if(id=='home'){hoRender();setTimeout(lnkTry,60)}return r};
acts.req_send=function(){toast('Choose someone from your matches to send a request')};
acts.rs_chats=function(){clearTimeout(qt);reqBack='home';CHTAB='req';CHMODE='list';go('chats')};
(function(){var p=$('#s-reqsent p');if(p)p.innerHTML='Your request is waiting in <b>Chats</b> under Sent Requests. We&rsquo;ll notify you when <span id="rsname">Sara Al-Abdullah</span> responds, within 24 hours.';
 var w=$('#s-reqsent .body');if(w)w.insertAdjacentHTML('beforeend','<button type="button" data-act="rs_chats" style="margin:18px 30px 0;height:44px;border-radius:22px;border:1px solid #013F63;background:#fff;color:#013F63;font:600 14px Inter,sans-serif;cursor:pointer">View in Chats</button>')})();
var _rSR=renderSR;renderSR=function(){_rSR();$$('#s-chats *').forEach(function(n){if(n.children.length==0&&/in Bird Activity when/.test(n.textContent))n.textContent=n.textContent.replace(/We.ll let you know in Bird Activity when (.*?) responds\./,'Track this request in Chats under Sent Requests. We’ll notify you when $1 responds.')})};

/* --- Save (persists per account, listed under My Birvoy > Saved) and real links --- */
var _bvSn=bvSnapshot;bvSnapshot=function(){var o=_bvSn();o.saved=MY.saved;return o};
var _bvLM=bvLoadMore;bvLoadMore=function(u,d){_bvLM(u,d);MY.saved=(d&&d.saved)||{}};
var _bvCM=bvClearMore;bvClearMore=function(){_bvCM();MY.saved={}};
(function(){var u=curUser();if(u){var d=bvUnpack(DB.data[u.id]);MY.saved=(d&&d.saved)||{}}})();
function lnkURL(id){return location.href.split('#')[0]+'#l='+encodeURIComponent(id)}
function lnkCopy(t,cb){function fb(){var ta=document.createElement('textarea');ta.value=t;ta.style.cssText='position:fixed;left:-999px;top:0';document.body.appendChild(ta);ta.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}ta.parentNode.removeChild(ta);cb(ok)}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){cb(true)},fb)}else fb()}
function lnkShare(id){if(!id){toast('Couldn’t create a link for this');return}lnkCopy(lnkURL(id),function(ok){toast(ok?'Link copied':'Couldn’t copy the link')})}
function lnkInfo(id){var o,n,x;
 if(/^(o\d|ou_)/.test(id)){o=flFind(FLO,id);return o&&{k:'PERSONAL OFFER',t:o.t,s:o.p+' · '+o.area,img:(o.gal&&o.gal[0])||o.art,cmd:'od:'+id}}
 if(/^(n\d|nu_)/.test(id)){n=flFind(FLN,id);return n&&{k:'COMMUNITY NEED',t:n.t,s:n.area+' · '+n.w,img:flTile(n.ic,n.c1,n.c2,''),cmd:'nd:'+id}}
 x=flGet(id);return x&&(id.charAt(0)=='b'?{k:'BUSINESS PAGE',t:x.n,s:x.cat+' · '+x.area,img:x.lg||x.cv,cmd:'nv:mybview:'+id}:{k:'PROFESSIONAL',t:x.n,s:x.role+' · '+x.area,img:x.av||x.cv,cmd:'nv:mypview:'+id})}
function lnkOpen(id){var i=lnkInfo(id);if(!i){toast('That listing isn’t available anymore');return}MY.hf=0;var a=i.cmd.split(':');
 if(a[0]=='od'){MY.bk.myodet='home';MY.st.myodet=id;go('myodet')}else if(a[0]=='nd'){MY.bk.myndet='home';MY.st.myndet=id;go('myndet')}else{MY.bk[a[1]]='home';MY.st[a[1]]=id;go(a[1])}}
function lnkTry(){var m=/[#&]l=([^&]+)/.exec(location.hash);if(m)PENDL=decodeURIComponent(m[1]);if(!PENDL||!curUser()||cur!='home')return;var id=PENDL;PENDL=null;try{history.replaceState(null,'',location.href.split('#')[0])}catch(e){}lnkOpen(id)}
addEventListener('hashchange',lnkTry);
['mygfd'].forEach(function(id){var o=$('#s-mysettings'),n=o.cloneNode(true);n.id='s-'+id;n.setAttribute('aria-label','Golden Find');n.classList.remove('on');n.querySelector('#myb-mysettings').id='myb-'+id;o.parentNode.appendChild(n)});
function gfData(id){var b=flGet(id||'b2');return b&&b.gf?b:null}
function gfAbout(b){return 'Golden Find: '+b.gf.prod}
function gfRequestState(b){var about=gfAbout(b),thread=reqThreadFor(b.n,about);if(thread)return {state:'chat',id:thread};for(var i=0;i<SRO.length;i++){var r=SR[SRO[i]];if(r&&r.state=='pending'&&r.name==b.n&&r.about==about)return {state:'pending',id:r.id};}return {state:'new'};}
function gfCta(b){if(b.own&&b.sample)return '';var st=gfRequestState(b);return '<button type="button" class="cta" data-act="my" data-my="gfreq:'+b.id+'">'+(st.state=='chat'?'Open Chat':st.state=='pending'?'Request Pending · View Request':'Request to Purchase')+'</button>';}
acts.gf_open=function(el){var id=el.getAttribute('data-business')||'b2';if(!gfData(id)){toast('This Golden Find is no longer available.');return;}MY.hf=fidx;MY.bk.mygfd=cur;MY.st.mygfd=id;go('mygfd');};
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.id==='gf'){e.preventDefault();acts.gf_open(e.target);}});

MYR.mygfd=function(){var b=gfData(MY.st.mygfd);if(!b)return flBack()+'<div class="empty">This Golden Find is no longer available.</div>';var g=b.gf,off=g.was>0?Math.round((1-g.now/g.was)*100):0,src=$('#gf'),bn='';
 if(src){var c=src.cloneNode(true);c.removeAttribute('id');c.removeAttribute('data-act');c.removeAttribute('data-business');c.removeAttribute('tabindex');c.setAttribute('role','presentation');c.classList.add('on');var v=c.querySelector('.gfv');if(v)v.remove();bn=c.outerHTML.replace(/id="(\w+)"/g,'id="$1d"').replace(/url\(#(\w+)\)/g,'url(#$1d)')}
 return flBack()+myHd('Golden Find',b.sample?'Test promotion preview':'Limited-time deal')+
  '<div class="gfd-banner" role="img" aria-label="Golden Find banner: '+fxE(g.prod)+'">'+bn+'</div>'+
  '<div class="gfd-biz"><img class="gfd-lg" src="'+b.lg+'" alt=""><div class="grow"><button type="button" class="gfd-bn" data-act="my" data-my="nv:mybview:'+b.id+'">'+fxE(b.n)+'</button><div class="small">'+fxE(b.cat)+' \u00b7 '+fxE(b.area)+'</div></div></div>'+
  '<div class="gfd-prod"><h3>'+fxE(g.prod)+'</h3><p>'+fxE(g.desc)+'</p></div>'+
  '<div class="gfd-price"><span class="now">KD '+g.now+'</span><s>KD '+g.was+'</s><span class="off">'+off+'% OFF</span></div>'+
  (g.avail?'<div class="gfd-av">'+fxE(g.avail)+'</div>':'')+
  gfCta(b)+
  '<div class="empty">Birvoy connects you with the business. Once they accept your request, continue in Chats to arrange the purchase. There is no checkout or payment in Birvoy.</div>'};
var _gfmy=acts.my;acts.my=function(el){var a=(el.getAttribute('data-my')||'').split(':');
 if(a[0]=='gfreq'){var b=gfData(a[1]);if(!b){toast('This Golden Find is no longer available.');return;}var st=gfRequestState(b);if(st.state=='chat'){openThread(st.id);return;}if(st.state=='pending'){srOpen(st.id);return;}if(b.own){toast('This is your own Golden Find.');return;}var g=b.gf,previousTarget=bvTgt;bvTgt={uid:b.usr||null,rec:b,promotion:{id:g.id||('gf-'+b.id),businessId:b.id,product:g.prod,description:g.desc,originalPrice:g.was,promotionalPrice:g.now,availability:g.avail||''}};try{flSend(b.n,'Golden Find',gfAbout(b),'Request to purchase: '+g.prod+' — KD '+g.now+' (was KD '+g.was+')');}finally{bvTgt=previousTarget;}return;}
 _gfmy(el)};
function savedIds(){return Object.keys(MY.saved).filter(function(k){return MY.saved[k]})}
MYR.mysaved=function(){var ids=savedIds(),h=flBack()+myHd('Saved','Offers, needs and pages you saved');
 if(!ids.length)return h+'<div class="empty">Nothing saved yet. Tap the bookmark on an offer to keep it here.</div>';
 ids.forEach(function(id){var i=lnkInfo(id);h+=i?myCard('<div class="flex"><div class="thumb" style="padding:0;overflow:hidden"><img src="'+i.img+'" alt=""></div><div class="grow"><div class="tag">'+i.k+'</div><div class="name">'+fxE(i.t)+'</div><div class="small">'+fxE(i.s)+'</div></div></div><div class="btns">'+myPill('','Open',i.cmd)+myPill('o','Remove','sv:'+id)+'</div>'):myCard('<div class="flex"><div class="grow"><div class="tag">SAVED</div><div class="name">No longer available</div><div class="small">The owner paused, closed or removed it.</div></div></div><div class="btns">'+myPill('o','Remove','sv:'+id)+'</div>')});
 return h};
var _my3=MYR.my;MYR.my=function(){var n=savedIds().length;return _my3()};
var _my5=acts.my;acts.my=function(el){var a=(el.getAttribute('data-my')||'').split(':'),k=a[0];
 if(k=='sv'){var id=a[1];if(MY.saved[id])delete MY.saved[id];else MY.saved[id]=1;bvPersist(true);toast(MY.saved[id]?'Saved. Find it in My Birvoy > Saved.':'Removed from saved');myRender(cur);return}
 if(k=='sh'){lnkShare(a[1]);return}
 if(k=='od'){MY.bk.myodet=cur;MY.st.myodet=a[1];go('myodet');return}
 if(k=='ochat'){openThread(a[1]);return}
 if(k=='ochats'){CHTAB='req';CHMODE='list';go('chats');return}
 _my5(el)};
acts.bv_share=function(e){lnkShare(e.getAttribute('data-id'))};

/* ===== feedback fixes: delete confirmation, promotion flow, native share + public preview ===== */
(function(){
var host=$('#toast').parentNode;
var st=document.createElement('style');st.textContent=
'#bvCf,#bvSh{position:absolute;inset:0;z-index:42;display:flex;background:rgba(1,63,99,.5);opacity:0;visibility:hidden;transition:opacity .2s,visibility 0s linear .2s;font-family:Inter,-apple-system,"SF Pro Text","Segoe UI",Arial,sans-serif}'+
'#bvCf{align-items:center;justify-content:center;padding:0 24px}#bvSh{align-items:flex-end}'+
'#bvCf.on,#bvSh.on{opacity:1;visibility:visible;transition:opacity .2s}'+
'#bvCf .card{width:100%;max-width:340px;box-sizing:border-box;background:#fff;border-radius:24px;padding:24px 22px 16px;box-shadow:0 18px 50px rgba(1,63,99,.35);transform:translateY(10px) scale(.97);transition:transform .22s}'+
'#bvCf.on .card{transform:none}'+
'#bvCf .ic{width:56px;height:56px;border-radius:28px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;background:#FDECEA;color:#B3261E}'+
'#bvCf h3{margin:0 0 8px;font-size:19px;line-height:1.25;font-weight:700;color:#013F63;text-align:center}'+
'#bvCf p{margin:0 0 10px;font-size:14px;line-height:1.45;color:#4B5560;text-align:center}'+
'#bvCf ul{margin:0 0 16px;padding:0 0 0 18px;font-size:13px;line-height:1.45;color:#4B5560}#bvCf li{margin-bottom:5px}'+
'#bvCf button,#bvSh button{display:block;width:100%;border:0;cursor:pointer;font-family:inherit}'+
'#bvCf .no{height:46px;border-radius:23px;background:#E5F4F9;color:#013F63;font-size:15px;font-weight:700}'+
'#bvCf .yes{height:46px;margin-top:8px;border-radius:23px;background:#B3261E;color:#fff;font-size:15px;font-weight:700}'+
'#bvCf button:focus-visible,#bvSh button:focus-visible,#bvPv button:focus-visible{outline:2px solid #3A93B3;outline-offset:2px}'+
'#bvSh .sheet{width:100%;box-sizing:border-box;background:#fff;border-radius:24px 24px 0 0;padding:18px 20px 22px;transform:translateY(30px);transition:transform .25s;box-shadow:0 -10px 40px rgba(1,63,99,.3)}'+
'#bvSh.on .sheet{transform:none}'+
'#bvSh h3{margin:0 0 12px;font-size:17px;font-weight:700;color:#013F63}'+
'#bvSh .row{display:flex;gap:12px;align-items:center;padding:10px;border:1px solid #D7E8F0;border-radius:14px;margin-bottom:12px}'+
'#bvSh .row img{width:44px;height:44px;border-radius:10px;object-fit:cover;flex:none}'+
'#bvSh .row b{display:block;font-size:14px;color:#013F63;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#bvSh .row span{font-size:12px;color:#4B5560}'+
'#bvSh .opt{height:46px;border-radius:14px;background:#E5F4F9;color:#013F63;font-size:15px;font-weight:600;margin-top:8px;text-align:left;padding:0 16px}'+
'#bvSh .cl{height:42px;margin-top:6px;background:transparent;color:#013F63;font-size:14px;font-weight:600}'+
'#bvPv{position:absolute;inset:0;z-index:44;background:#fff;overflow-y:auto;opacity:0;visibility:hidden;transition:opacity .2s,visibility 0s linear .2s;font-family:Inter,-apple-system,"SF Pro Text","Segoe UI",Arial,sans-serif}'+
'#bvPv.on{opacity:1;visibility:visible;transition:opacity .2s}'+
'#bvPv .top{display:flex;align-items:center;justify-content:space-between;padding:52px 18px 10px}'+
'#bvPv .pb{font-size:11px;font-weight:700;letter-spacing:.08em;color:#3A93B3}'+
'#bvPv .x{width:36px;height:36px;border-radius:18px;border:0;background:#E5F4F9;color:#013F63;font-size:20px;line-height:1;cursor:pointer}'+
'#bvPv .hero{margin:6px 18px 0;height:190px;border-radius:20px;background:#E5F4F9 center/cover no-repeat}'+
'#bvPv .bd{padding:16px 22px 28px}#bvPv h2{margin:4px 0 4px;font-size:22px;color:#013F63}#bvPv .sub{font-size:14px;color:#4B5560;margin-bottom:14px}'+
'#bvPv .note{font-size:12.5px;line-height:1.5;color:#4B5560;background:#E5F4F9;border-radius:14px;padding:11px 14px;margin-bottom:16px}'+
'#bvPv .go{display:block;width:100%;height:48px;border:0;border-radius:24px;background:#013F63;color:#fff;font:700 15px Inter,Arial,sans-serif;cursor:pointer}'+
'.pmopt{cursor:pointer}.pmopt.sel{outline:2px solid #013F63;outline-offset:-2px}'+
'@media (prefers-reduced-motion:reduce){#bvCf,#bvCf .card,#bvSh,#bvSh .sheet,#bvPv{transition-duration:.01s!important}}';
document.head.appendChild(st);
var cf=document.createElement('div'),sh=document.createElement('div'),pv=document.createElement('div');
cf.id='bvCf';cf.setAttribute('role','alertdialog');cf.setAttribute('aria-modal','true');cf.setAttribute('aria-labelledby','bvCfT');
sh.id='bvSh';sh.setAttribute('role','dialog');sh.setAttribute('aria-modal','true');sh.setAttribute('aria-label','Share');
pv.id='bvPv';pv.setAttribute('role','dialog');pv.setAttribute('aria-modal','true');pv.setAttribute('aria-label','Public preview');
host.appendChild(cf);host.appendChild(sh);host.appendChild(pv);

/* ---------- 1. delete confirmation dialog ---------- */
var TRASH='<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13M10 11v6M14 11v6"/></svg>';
var DELK={
 biz:{title:'Delete this Business Page?',ok:'Delete permanently',ul:['Pending connection requests are closed, and the people who sent them are told it is no longer available.','Accepted connections stay in Chats as read-only history.','Any promotion is stopped and the page disappears from search.']},
 pro:{title:'Delete this Professional Profile?',ok:'Delete permanently',ul:['Pending connection requests are closed, and the people who sent them are told it is no longer available.','Accepted connections stay in Chats as read-only history.','Any promotion is stopped and the profile disappears from search.']},
 offers:{title:'Delete this Personal Offer?',ok:'Delete offer',ul:['Pending connection requests are closed, and the people who sent them are told it is no longer available.','Accepted connections stay in Chats as read-only history.','Any boost is stopped and the offer disappears from search.']},
 needs:{title:'Delete this Special Need?',ok:'Delete need',ul:['It stops being matched and shown to other people.','Responses you have not answered are closed.','Chats already started stay as read-only history.']}};
var cfDo=null;
function cfClose(){cf.classList.remove('on');cfDo=null}
function cfAsk(k,name,yes){var K=DELK[k];if(!K)return;cfDo=yes;
 cf.innerHTML='<div class="card" role="document"><div class="ic">'+TRASH+'</div><h3 id="bvCfT">'+esc(K.title)+'</h3><p>“'+esc(name)+'” will be permanently deleted. This can’t be undone.</p><ul>'+K.ul.map(function(x){return'<li>'+esc(x)+'</li>'}).join('')+'</ul><button type="button" class="no">Cancel</button><button type="button" class="yes">'+esc(K.ok)+'</button></div>';
 cf.classList.add('on');setTimeout(function(){var b=cf.querySelector('.no');if(b)b.focus({preventScroll:true})},60)}
cf.addEventListener('click',function(e){var t=e.target;
 if(t.closest('.yes')){var f=cfDo;cfClose();if(f)f()}
 else if(t.closest('.no')||t===cf)cfClose()});
myDel=function(list,it){return myPill('d','Delete','do:'+list+':'+it.id+':del')};
var _myDoCf=myDo;
myDo=function(l,id,v){
 if(v=='del'&&DELK[l]){var f=myFind(l,id),it=f&&f[0][f[1]];if(!it)return;var nm=it.t||it.n;
  cfAsk(l,nm,function(){
   if(l=='needs')bvSourceGone(nm);
   MY.promo.forEach(function(p){if((p.s=='pending'||p.s=='approved'||p.s=='active')&&p.n==nm&&((l=='biz'&&p.to=='mybiz')||(l=='pro'&&p.to=='mypro')||(l=='offers'&&p.kind=='PERSONAL OFFER'))){p.s='past';p.stopped=1}});
   MY.arm=l+id;_myDoCf(l,id,'del');bvPersist(true)});
  return}
 if(l=='promo'&&v=='cancel'){var ix=-1;MY.promo.forEach(function(p,i){if(p.id==id)ix=i});if(ix>=0)MY.promo.splice(ix,1);toast('Promotion request cancelled');bvPersist(true);myRender(cur);return}
 if(l=='promo'&&v=='again'){var p0=MY.promo.filter(function(x){return x.id==id})[0],sr=p0&&pmSrc(p0);if(p0&&sr){pmOpen(sr.l,sr.id,p0.days||14);return}}
 _myDoCf(l,id,v)};

/* ---------- 2. promotion flow (Business Page / Professional Profile) ---------- */
function pmSrc(p){if(p.src&&myFind(p.src.l,p.src.id))return p.src;var l=p.kind=='BUSINESS PAGE'?'biz':p.kind=='PROFESSIONAL PROFILE'?'pro':null;if(!l)return null;var it=MY[l].filter(function(x){return x.n==p.n})[0];return it?{l:l,id:it.id}:null}
function pmLive(l,id){return MY.promo.filter(function(p){var s=pmSrc(p);return s&&s.l==l&&s.id==id&&(p.s=='pending'||p.s=='approved'||p.s=='active')})[0]}
function pmOpen(l,id,days){MY.pm={l:l,id:+id,days:days||14};MY.ph={k:'promo',t:'Promote',x:'',b:(cur=='myph'&&MY.ph&&MY.ph.b)||cur};go('myph');myRender('myph')}
function pmNote(title,body){var u=curUser();if(!u)return;try{bvWith(u.id,function(c){bvNtf(c,{av:'P',tag:'PROMOTION',t:title,s:body,tm:bvNow(),u:1,a:''})})}catch(e){}}
function pmTick(){if(!curUser())return;var now=Date.now(),ch=0;
 MY.promo.forEach(function(p){
  if(p.s=='pending'&&p.sub&&now-p.sub>8000){var s=pmSrc(p),f=s&&myFind(s.l,s.id),it=f&&f[0][f[1]];
   if(!it||it.s!='active'){p.s='rejected';p.rej=!it?'The listing was removed during review.':'The listing was paused during review. Resume it and submit again.';pmNote('Promotion not approved','“'+p.n+'”: '+p.rej)}
   else{p.s='approved';p.apr=now;pmNote('Promotion approved','“'+p.n+'” will be featured for '+(p.days||14)+' days.')}ch=1}
  else if(p.s=='approved'&&now-p.apr>3000){p.s='active';p.start=now;p.end=now+(p.days||14)*864e5;p.day=1;ch=1}
  else if(p.s=='active'&&p.end){if(now>p.end){p.s='past';p.ended=1;pmNote('Promotion ended','“'+p.n+'” finished its '+(p.days||14)+'-day promotion.');ch=1}
   else{var d=Math.min(p.days||14,Math.floor((now-p.start)/864e5)+1);if(d!=p.day){p.day=d;ch=1}}}});
 if(ch){bvPersist(true);if(/^my/.test(cur))myRender(cur)}}
setInterval(pmTick,1500);

function pmOpt(d,sel,sub){return '<div class="card pmopt'+(sel?' sel':'')+'" role="radio" aria-checked="'+sel+'" tabindex="0" data-act="my" data-my="pm:dur:'+d+'"><div class="flex"><div class="grow"><div class="name">'+d+' days</div><div class="small">'+sub+'</div></div><span class="chip f">FREE</span></div></div>'}
function pmScreen(){var q=MY.pm||{},f=q.l&&myFind(q.l,q.id),it=f&&f[0][f[1]],
 h='<button type="button" class="phb" data-act="my" data-my="back">'+I.back+'Back</button>'+myHd('Promote',it?fxE(it.n):'Promotion');
 if(!it)return h+'<div class="info">This listing is no longer available.</div>'+myCta('Back','back',1);
 var kind=q.l=='biz'?'Business Page':'Professional Profile';
 if(it.s!='active')return h+'<div class="info"><b>This '+kind+' is paused.</b> Paused listings can’t be promoted. Resume it from My Birvoy, then promote it.</div>'+myCta('Back','back',1);
 var ex=pmLive(q.l,q.id);
 if(ex)return h+'<div class="info"><b>Already being promoted.</b> This '+kind+' has a promotion that is '+(ex.s=='active'?'running':'in review')+'. You can start another one when it ends or is stopped.</div>'+myCta('Open Promotion Dashboard','go:mypromo')+'<div style="height:8px"></div>'+myCta('Back','back',1);
 var dd=q.days||14;
 h+='<div class="sec">Choose a duration</div><div role="radiogroup" aria-label="Promotion duration">'+pmOpt(7,dd==7,'A short boost')+pmOpt(14,dd==14,'Most popular')+pmOpt(30,dd==30,'A full month of visibility')+'</div>';
 h+='<div class="sec">Review</div>'+myCard('<div class="small"><b style="color:var(--navy)">'+fxE(it.n)+'</b> · '+kind+'</div><div class="small" style="margin-top:6px">Duration: <b style="color:var(--navy)">'+dd+' days</b>, starting once approved</div><div class="small" style="margin-top:6px">Cost: <b style="color:var(--navy)">FREE · KD 0</b></div><div class="small" style="margin-top:6px">Birvoy checks every promotion before it goes live. You’ll get a notification when it’s approved.</div>');
 h+='<div class="info">Promotion is free for the first three months after Birvoy’s official launch. It ends on its own: there is <b>no subscription and no automatic renewal</b>. Promoted listings are shown in rotation with others, so every promoted listing gets a fair turn.</div>';
 return h+myCta('Submit for review','pm:submit')+'<div style="height:8px"></div>'+myCta('Cancel','back',1)}

var STL={pending:'In review',approved:'Approved',active:'Active',past:'Stopped',rejected:'Not approved'};
function pmCard(p){var s=p.s,days=p.days||14,lab=s=='past'&&p.ended?'Ended':STL[s],on=s=='active',vl=p.vl||'Page Views',rl=p.rl||'Connection Requests',day=p.day||1,
 to=p.to||(p.kind=='PERSONAL OFFER'?'myoffers':p.kind=='PROFESSIONAL PROFILE'?'mypro':'mybiz'),vw=p.kind=='PERSONAL OFFER'?'View Offer':p.kind=='PROFESSIONAL PROFILE'?'View Profile':'View Business',body='';
 if(on)body='<div class="small" style="margin-top:2.9px">'+days+'-day promotion · Day '+day+' of '+days+' · <b style="color:var(--navy)">FREE · KD 0</b></div><div class="bar"><u style="width:'+Math.round(day/days*100)+'%"></u></div>';
 else if(s=='pending')body='<div class="small" style="margin-top:2.9px">'+days+'-day promotion · submitted for review. Usually just a few minutes.</div>';
 else if(s=='approved')body='<div class="small" style="margin-top:2.9px">Approved. Your promotion is starting now.</div>';
 else if(s=='rejected')body='<div class="small" style="margin-top:2.9px">'+fxE(p.rej||'This promotion wasn’t approved.')+'</div>';
 var stats=(on||s=='past')?'<div class="stats"><div><b>'+(p.v||0)+'</b><span>'+vl+'</span></div><div><b>'+(p.rq||0)+'</b><span>'+rl+'</span></div><div><b>'+(p.sc||0)+'</b><span>Successful Connections</span></div></div>':'';
 var btns=(on||s=='past'?myPill('','View Results','ph:results:Promotion Results:'+p.id):'')+(on?myPill('o',vw,'go:'+to)+myPill('d','Stop promotion','do:promo:'+p.id+':stop'):s=='pending'?myPill('d','Cancel request','do:promo:'+p.id+':cancel'):s=='approved'?'':myPill('','Promote Again','do:promo:'+p.id+':again'));
 return myCard('<div class="flex"><div class="grow"><div class="tag">'+p.kind+'</div><div class="name">'+fxE(p.n)+'</div></div><span class="chip '+(on||s=='approved'?'f':'c')+'">'+lab+'</span></div>'+body+stats+'<div class="btns">'+btns+'</div>')}
MYR.mypromo=function(){var A=['pending','approved','active'],P=['past','rejected'],act=MY.promo.filter(function(x){return A.indexOf(x.s)>=0}),past=MY.promo.filter(function(x){return P.indexOf(x.s)>=0}),
 t=MY.tab.promo|0,tb=function(i,l,n){return '<i class="'+(t==i?'on':'')+'" role="tab" aria-selected="'+(t==i)+'" data-act="my" data-my="tab:promo:'+i+'">'+l+' · '+n+'</i>'},
 h=myHd('Promotion Dashboard','Results from each campaign')+'<div class="tabs" role="tablist">'+tb(0,'Active',act.length)+tb(1,'Past',past.length)+'</div>';
 if(t==0){act.forEach(function(p){h+=pmCard(p)});if(!act.length)h+='<div class="empty">No active promotions. Promote a Business Page, Professional Profile or Offer to start one.</div>'}
 else{past.forEach(function(p){h+=pmCard(p)});if(!past.length)h+='<div class="empty">No past promotions yet.</div>'}
 return h+'<div class="empty">Only activity from a campaign counts toward its results. Promote Again starts a new campaign with fresh counters. Promotions end on their own and never renew automatically.</div>'};

var _myph=MYR.myph;
MYR.myph=function(){var p=MY.ph||{};
 if(p.k=='promo')return pmScreen();
 if(p.k=='results'){var pr=MY.promo.filter(function(x){return x.id==p.x})[0];
  if(pr){var d=pr.days||14,lab=pr.s=='past'&&pr.ended?'Ended':STL[pr.s]||'',h='<button type="button" class="phb" data-act="my" data-my="back">'+I.back+'Back</button>'+myHd('Promotion Results',fxE(pr.n));
   h+=myCard('<div class="flex"><div class="grow"><div class="tag">'+pr.kind+'</div><div class="name">'+fxE(pr.n)+'</div></div><span class="chip '+(pr.s=='active'?'f':'c')+'">'+lab+'</span></div><div class="small" style="margin-top:6px">'+d+'-day promotion · <b style="color:var(--navy)">FREE · KD 0</b>'+(pr.start?' · Started '+new Date(pr.start).toLocaleDateString('en-GB',{day:'numeric',month:'short'}):'')+(pr.end?' · '+(pr.s=='active'?'Ends ':'Ended ')+new Date(pr.end).toLocaleDateString('en-GB',{day:'numeric',month:'short'}):'')+'</div>');
   h+='<div class="stats"><div><b>'+(pr.v||0)+'</b><span>'+(pr.vl||'Page Views')+'</span></div><div><b>'+(pr.rq||0)+'</b><span>'+(pr.rl||'Connection Requests')+'</span></div><div><b>'+(pr.sc||0)+'</b><span>Successful Connections</span></div></div>';
   return h+'<div class="info">Results count only activity during this campaign. Successful Connections are counted when a request you receive is accepted.</div>'+myCta('Back','back',1)}}
 return _myph()};

var _my6=acts.my;
acts.my=function(el){var a=el.getAttribute('data-my').split(':');
 if(a[0]=='pm'){
  if(a[1]=='open'){pmOpen(a[2],a[3],14);return}
  if(a[1]=='dur'){if(MY.pm){MY.pm.days=+a[2];myRender('myph')}return}
  if(a[1]=='submit'){var q=MY.pm,f=q&&myFind(q.l,q.id),it=f&&f[0][f[1]];
   if(!it||it.s!='active'){toast('Resume this listing before promoting it');return}
   if(pmLive(q.l,q.id)){toast('This is already being promoted');return}
   MY.promo.unshift({id:++MY.seq,kind:q.l=='biz'?'BUSINESS PAGE':'PROFESSIONAL PROFILE',n:it.n,days:q.days||14,s:'pending',sub:Date.now(),v:0,rq:0,sc:0,to:q.l=='biz'?'mybiz':'mypro',src:{l:q.l,id:q.id}});
   MY.tab.promo=0;bvPersist(true);toast('Submitted for review');go('mypromo');return}
  return}
 _my6(el)};
/* ---------- 3. share: native sheet, fallback sheet, public preview ---------- */
function shClose(){sh.classList.remove('on')}
function pvClose(){pv.classList.remove('on')}
function shOpen(id,url){var i=lnkInfo(id);
 sh.innerHTML='<div class="sheet"><h3>Share</h3>'+(i?'<div class="row"><img alt="" src="'+esc(i.img||'')+'"><div style="min-width:0"><b>'+esc(i.t)+'</b><span>'+esc(i.k.charAt(0)+i.k.slice(1).toLowerCase())+'</span></div></div>':'')+'<button type="button" class="opt" data-a="copy">Copy link</button><button type="button" class="opt" data-a="pv">Preview public page</button><button type="button" class="cl" data-a="x">Close</button></div>';
 sh._id=id;sh._url=url;sh.classList.add('on')}
sh.addEventListener('click',function(e){var b=e.target.closest('button'),a=b&&b.getAttribute('data-a');
 if(a=='copy'){lnkCopy(sh._url,function(ok){toast(ok?'Link copied':'Couldn’t copy the link')});shClose()}
 else if(a=='pv'){var id=sh._id;shClose();pvShow(id)}
 else if(a=='x'||e.target===sh)shClose()});
lnkShare=function(id){if(!id){toast('Couldn’t create a link for this');return}
 var i=lnkInfo(id),url=lnkURL(id);
 if(navigator.share){try{navigator.share({title:i?i.t:'Birvoy',text:i?(i.k.charAt(0)+i.k.slice(1).toLowerCase()+' on Birvoy: '+i.t):'Shared from Birvoy',url:url}).catch(function(err){if(err&&err.name=='AbortError')return;shOpen(id,url)});return}catch(err){}}
 shOpen(id,url)};
function pvShow(id){var i=lnkInfo(id),me=!!curUser();
 pv.innerHTML='<div class="top"><span class="pb">PUBLIC PREVIEW</span><button type="button" class="x" aria-label="Close">×</button></div>'+
  (i?'<div class="hero" style="background-image:url(\''+String(i.img||'').replace(/[\'"\\\n]/g,'')+'\')"></div><div class="bd"><div class="pb">'+esc(i.k)+'</div><h2>'+esc(i.t)+'</h2><div class="sub">'+esc(i.s||'')+'</div><div class="note">This is what people see when you share the link. Contact details are never shown here. To get in touch, connect through Birvoy.</div><button type="button" class="go">'+(me?'Open in Birvoy':'Sign in to connect')+'</button></div>'
  :'<div class="bd"><h2>Not available</h2><div class="sub">That listing isn’t available anymore.</div><button type="button" class="go">Close</button></div>');
 pv._id=i?id:null;pv.scrollTop=0;pv.classList.add('on');var b=pv.querySelector('.go');if(b)setTimeout(function(){b.focus({preventScroll:true})},60)}
pv.addEventListener('click',function(e){var t=e.target;
 if(t.closest('.x'))pvClose();
 else if(t.closest('.go')){var id=pv._id;pvClose();if(!id)return;PENDL=id;if(curUser())lnkTry();else if(cur!=='login')go('login')}});
document.addEventListener('keydown',function(e){if(e.key=='Escape'){if(cf.classList.contains('on'))cfClose();else if(pv.classList.contains('on'))pvClose();else if(sh.classList.contains('on'))shClose()}});
/* visitors who open a shared link without signing in get the public preview */
var _lnkTry=lnkTry;
lnkTry=function(){var m=/[#&]l=([^&]+)/.exec(location.hash);
 if(m&&!curUser()){PENDL=decodeURIComponent(m[1]);try{history.replaceState(null,'',location.href.split('#')[0])}catch(e){}pvShow(PENDL);return}
 _lnkTry()};
addEventListener('hashchange',function(){if(/[#&]l=/.test(location.hash)&&!curUser())lnkTry()});
setInterval(function(){if(PENDL&&curUser()&&cur=='home')_lnkTry()},1500);
/* "Share" after publishing opens the real share flow for the listing just published */
FXH.share=function(){var u=curUser(),d=FX.d,mp={bp:['biz','bu',d&&d.name],pp:['pro','pu',d&&d.name],po:['offers','ou',d&&d.title],sn:['needs','nu',d&&d.desc]}[FX.id];
 if(!u||!mp){toast('Couldn’t create a link for this');return}var nm=(mp[2]||'').trim(),it=MY[mp[0]].filter(function(x){return(x.n||x.t)==nm})[0];
 if(!it){toast('Couldn’t create a link for this');return}lnkShare(mp[1]+'_'+u.id+'_'+it.id)};
})();

/* Empty data only. Keep every original screen, component and navigation flow. */
(function(){
[FLB,FLP,FLO,FLN].forEach(function(a){a.length=0});
['needs','offers','biz','pro','promo'].forEach(function(k){MY[k].length=0});MY.saved={};MY.seq=100;
if(typeof SNR!='undefined')SNR.length=0;
bvLoadChat(bvEmptyChat());ME.area='';ME.about='';ME.langs='';
var rebuild=bvRebuildMarket;bvRebuildMarket=function(){[FLB,FLP,FLO,FLN].forEach(function(a){a.length=0});rebuild()};
bvSimReply=function(){};bvSimResolve=function(){};
var u=curUser();if(u)bvLoadUser(u);else{bvClearUser();bvLoadChat(bvEmptyChat())}
bvRebuildMarket();bvChatDom();BAMODE=NT.length?'feed':'empty';CHMODE=Object.keys(TH).length?'list':'empty';
// The home artwork contains outlined sample listing text and photos. Cover only
// the data inside its existing cards; retain their headers, bounds and links.
var st=document.createElement('style');st.textContent=
'.bvzero-count{position:absolute;top:120px;height:18px;color:#0C1E2E;background:#DCF0FF;font:700 16px/18px Inter,sans-serif;pointer-events:none;z-index:5}'+
'.bvzero-need{position:absolute;left:208px;top:403px;width:167px;height:141px;border:1px solid white;border-radius:12px;background:linear-gradient(180deg,#7ECBDD,#C2DFE9);color:#013F63;display:flex;align-items:center;justify-content:center;text-align:center;padding:18px;font:600 14px/21px Inter,sans-serif;z-index:4;pointer-events:none}'+
'.bvzero-feature{position:absolute;left:21px;top:0;width:360px;height:128px;border:1px solid #c2d0db;border-radius:16px;background:linear-gradient(180deg,#E6F1F9,#C7E0F0);color:#013F63;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;font:600 15px/23px Inter,sans-serif;z-index:4;pointer-events:none}'+
'#hoff .emp{left:10px;right:10px;top:64px;bottom:35px;display:flex;flex-direction:column;justify-content:center;padding:14px 8px}'+
'#hoff .emp b{font-size:14px;line-height:20px}#hoff .emp span{font-size:12px;line-height:17px}'+
'';document.head.appendChild(st);
function put(host,cls,text,style){var d=document.createElement('div');d.className=cls;d.textContent=text;if(style)d.style.cssText=style;host.appendChild(d);return d}
var count1=put($('#hc'),'bvzero-count','—','left:53px;width:49px'),count2=put($('#hc'),'bvzero-count','—','left:140px;width:69px');
var ne=put($('#hc'),'bvzero-need','No community needs yet.');
var fe=[];$$('#hcard .hslide').forEach(function(sl,i){fe.push(put(sl,'bvzero-feature',i?'No featured professionals yet.':'No featured businesses yet.'))});
function syncEmpty(){var g=window.BirvoyGlobalCounts;count1.textContent=g?Number(g.successful_connections).toLocaleString('en-US'):'—';count2.textContent=g?Number(g.community).toLocaleString('en-US'):'—';ne.style.display=FLN.length?'none':'';fe.forEach(function(el,i){el.style.display=(i?FLP:FLB).length?'none':''})}
var persist=bvPersist;bvPersist=function(force){persist(force);syncEmpty()};syncEmpty();hoRender();
// Existing taps open the corresponding original collection rather than a seed detail.
acts.home_need=function(){acts.nl_open()};acts.home_offer=function(){acts.ol_open()};
var nv=acts.nv_open;acts.nv_open=function(el){var dest=el.getAttribute('data-nv')||'';if((dest=='mybview:b1'&&!flGet('b1'))||(dest=='mypview:p1'&&!flGet('p1'))){MY.hf=fidx;MY.bk[fidx?'myflp':'myflb']='home';go(fidx?'myflp':'myflb');return}if(nv)nv(el)};
// Reuse the original collection renderers and their existing empty-state styles.
[['myflb',FLB,'No featured businesses yet.'],['myflp',FLP,'No featured professionals yet.'],['myneedl',FLN,'No community needs yet.']].forEach(function(row){var render=MYR[row[0]];MYR[row[0]]=function(){var h=render();return row[1].length?h:h+'<div class="empty">'+row[2]+'</div>'}});
})();

/* Static all-set screen and empty Golden Find; preserve original carousel. */
(function(){
var st=document.createElement('style');st.textContent='#gf{z-index:5}#gf.bv-gf-empty{cursor:default;pointer-events:none}#gf.bv-gf-empty .gfart{width:360px;height:128px}#gf.bv-gf-empty .gfn{max-width:330px;white-space:normal;font-size:17px}#gf.bv-gf-empty .gfs{max-width:330px;white-space:normal}#gf:not(.bv-gf-empty) .gf-photo{position:absolute;left:199px;top:20px;width:106px;height:62px;object-fit:contain;border-radius:3px}#gf:not(.bv-gf-empty) .gf-prices{position:absolute;left:14px;top:36px;white-space:nowrap}#gf .gf-old{font:500 13px/16px Inter,sans-serif;color:rgba(255,255,255,.72);text-decoration:line-through}#gf .gf-now{font:800 28px/28px Inter,sans-serif;color:#FFD15B}#gf .gf-off{display:inline-block;margin-left:8px;padding:2px 6px;border:1px solid #F5C242;border-radius:10px;font:700 10px/12px Inter,sans-serif;color:#F5C242;vertical-align:4px}#gf:not(.bv-gf-empty) .gfn,#gf:not(.bv-gf-empty) .gfs{max-width:245px;overflow:hidden;text-overflow:ellipsis}';document.head.appendChild(st);
var gf=$('#gf'),art=gf.querySelector('.gfart'),badge=gf.querySelector('.gfl'),dots=gf.querySelector('.gfd');
[].slice.call(art.children).forEach(function(el){var keep=el.localName=='defs'||el.localName=='rect'||(el.localName=='g'&&el.getAttribute('fill')=='#F5C242');if(!keep)el.remove()});
gf.replaceChildren(art,badge,dots);gf.classList.add('bv-gf-empty');gf.removeAttribute('data-act');gf.removeAttribute('data-business');gf.removeAttribute('tabindex');gf.setAttribute('role','group');gf.setAttribute('aria-label','Golden Find: no Golden Finds yet');
var title=document.createElement('div');title.className='gfn';title.textContent='No Golden Finds yet';var sub=document.createElement('div');sub.className='gfs';sub.textContent='Golden Finds will appear here.';gf.append(title,sub);
})();


/* Birvoy Supabase adapter. Uses existing project tables and RPCs; no service key. */
(function(){
'use strict';
var client=window.BirvoySupabase.createClient('https://asxfuzoxyoqcutvtwgpo.supabase.co','sb_publishable_kiarXPSb-oiJONe61_OAZQ_q87C1DaU',{auth:{storageKey:'birvoy.supabase.auth',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
var net={client:client,user:null,loading:true,saving:false,suspend:false,refreshing:false,queued:false,last:'',meta:'',known:new Set(),listingRows:[],profiles:{},recordRows:{},channel:null,action:{},version:0};
var kinds={needs:'need',offers:'offer',biz:'business',pro:'professional'},lists={need:'needs',offer:'offers',business:'biz',professional:'pro'},marketKeys={need:'need',offer:'off',business:'biz',professional:'pro'},prefixes={need:'nu',offer:'ou',business:'bu',professional:'pu'};
function copy(x){return JSON.parse(JSON.stringify(x))}
var SAMPLE_BATCH='birvoy-test-catalogue-v2';function sampleInfo(row){var sample=row&&row.data&&row.data.item&&row.data.item.sample;return sample&&sample.isSample===true&&sample.batch===SAMPLE_BATCH?sample:null}
function result(r){if(r.error)throw r.error;return r.data}
function message(e){if(!navigator.onLine)return 'You’re offline. Check your internet connection and try again.';var m=e&&e.message||'';if(/failed to fetch|networkerror|network request failed|failed to send a request/i.test(m))return 'Could not connect. Check your internet connection and try again.';return m||'Connection failed. Please try again.'}
function failure(e){toast(message(e));console.warn('Birvoy:',e&&e.code||e&&e.name||'request failed')}
async function action(key,fn){if(net.action[key])return;net.action[key]=true;try{await net.ready;return await fn()}catch(e){if(key==='login')fErr('li-pw',message(e));failure(e)}finally{delete net.action[key]}}
function uuid(){if(window.crypto&&crypto.randomUUID)return crypto.randomUUID();throw Error('A secure HTTPS connection is required.')}
function freshDB(){return {v:1,users:{},session:null,data:{},market:{},imgs:{}}}
// Discard the demo's local identities. Supabase owns credentials and sessions.
DB=freshDB();dbSave=function(){return true};bvPack=JSON.stringify;bvUnpack=function(s){try{return JSON.parse(s)}catch(e){return null}};
bvClearUser();bvLoadChat(bvEmptyChat());ME.area='';ME.langs='';ME.about='';
bvSweepReq=function(){};bvExpire=function(){};bvSimReply=function(){};bvSimResolve=function(){};bvWith=function(){return false};
function credentials(raw,pw){var n=validId(raw);if(!n)throw Error('Enter a valid email or mobile number.');var o={password:pw};o[n.k=='email'?'email':'phone']=n.k=='email'?n.v:'+'+n.v;return o}
function currentIdentity(user,profile){var md=user.user_metadata||{},name=profile&&profile.display_name;if(!name||name=='Birvoy user')name=md.full_name||md.name||'Birvoy user';return{id:user.id,name:name,kind:user.email?'email':'phone',idv:user.email||user.phone||'',raw:user.email||user.phone||'',created:Date.parse(user.created_at)||Date.now(),verified:!!(user.email_confirmed_at||user.phone_confirmed_at),prov:(user.app_metadata||{}).provider==='email'?null:(user.app_metadata||{}).provider}}
async function rows(table,cols,configure){var all=[],offset=0;for(;;){var q=client.from(table).select(cols||'*').order('created_at',{ascending:false}).range(offset,offset+499);if(configure)q=configure(q);var data=result(await bounded(q,12000))||[];all=all.concat(data);if(data.length<500)return all;offset+=500}}
function localSnapshot(){var my={};Object.keys(kinds).forEach(function(k){my[k]=MY[k]});return{my:copy(my),me:{area:ME.area||'',langs:ME.langs||'',about:ME.about||''},prefs:{saved:copy(MY.saved||{}),promo:[]},name:bvName(),lang:lang}}
function digest(){return JSON.stringify(localSnapshot())}
function localItemsFromServer(data){Object.keys(kinds).forEach(function(k){MY[k]=data.filter(function(r){return r.owner_id==net.user.id&&r.kind==kinds[k]}).map(function(r){var it=copy((r.data||{}).item||{});if(!it.fd)it=fallbackItem(r);it.id=it.id||r.id;it._remoteId=r.id;it.s=(r.data||{}).ui_status||r.status;it.at=Date.parse(r.created_at);return it})});MY.seq=Math.max(100,...Object.keys(kinds).flatMap(function(k){return MY[k].map(function(it){return typeof it.id=='number'?it.id:0})}));net.known=new Set(data.filter(function(r){return r.owner_id==net.user.id}).map(function(r){return r.id}))}
function fallbackItem(r){var fd=r.kind=='need'?{desc:r.description||r.title,budget:r.price||'',when:'flex',ph:[]}:r.kind=='offer'?{title:r.title,desc:r.description||'',price:r.price==null?'':String(r.price),cond:'',loc:r.city||'',ph:[],neg:0}:r.kind=='business'?{name:r.title,about:r.description||'',tags:r.category?[r.category]:[],serve:{},loc:r.city||'',area:r.city||'',logo:'',ph:[]}: {name:r.title,role:r.category||'',about:r.description||'',tags:[],serve:{},loc:r.city||'',area:r.city||'',logo:'',ph:[]};return{id:r.id,fd:fd,t:r.title,n:r.title,p:fd.price||'',c:fd.cond||'',sub:r.category||'',img:bvPh(r.title,r.kind=='offer'?'po':'bp'),b:r.price||0,w:'Flexible',r:0,conn:0,req:0}}
function updateMarket(data){net.testPreview=data.some(function(r){return r.owner_id===net.user?.id&&!!sampleInfo(r)});DB.market={};net.recordRows={};var groups={};data.forEach(function(r){if(!groups[r.owner_id])groups[r.owner_id]={my:{needs:[],offers:[],biz:[],pro:[]},me:{}};var g=groups[r.owner_id],item=copy((r.data||{}).item||fallbackItem(r));if(sampleInfo(r)&&item.fd){var images=Array.isArray(item.fd.ph)?item.fd.ph:[];if(!images.some(function(p){return typeof p==='string'&&p.length>20})){if(r.kind==='professional'&&/graphic designer/i.test(r.title))item.fd.ph=['/assets/test-graphic-designer-generated.png'];if(r.kind==='need'&&/generator/i.test(r.title))item.fd.ph=['/assets/test-generator-generated.png']}}item.s=r.status;item.at=Date.parse(r.created_at);g.my[lists[r.kind]].push(item);if(r.data&&r.data.area)g.me.area=r.data.area});Object.keys(groups).forEach(function(uid){var p=net.profiles[uid]||{},u=uid==DB.session?curUser():{id:uid,name:p.display_name||'Birvoy user',kind:'email',idv:'',raw:''};DB.users[uid]=u;var prev=DB.data[uid];DB.data[uid]=JSON.stringify(groups[uid]);var market=bvMarketOf(u);if(prev!==undefined)DB.data[uid]=prev;Object.keys(market).forEach(function(k){market[k].forEach(function(rec){var r=data.find(function(row){return row.owner_id==uid&&marketKeys[row.kind]==k&&rec.id===prefixes[row.kind]+'_'+uid+'_'+((row.data||{}).item||{id:row.id}).id});if(r){rec.sample=sampleInfo(r);if(rec.sample&&r.kind==='professional'&&/^interior designer$/i.test(r.title.trim())){rec.n='Fahad Al-Sabah';rec.featureImage='/assets/test-interior-designer-wide.png'}rec.searchOnly=!!(rec.sample&&(rec.sample.searchOnly||(r.data&&r.data.search_only)));if(rec.sample&&rec.sample.goldenFind)rec.gf=copy(rec.sample.goldenFind);rec.conn=Number(((net.connectionCounts||{})[r.id]||{}).successful_connections)||0;rec.dbid=r.id;rec.usr=uid;rec.own=uid==DB.session;rec.ver=uid==DB.session&&!!curUser().verified;rec.vk=uid==DB.session?curUser().kind:'email';net.recordRows[rec.id]=r}})});DB.market[uid]=JSON.stringify(market)});bvRebuildMarket();hoRender();document.querySelectorAll('.bvzero-count').forEach(function(el,i){var g=window.BirvoyGlobalCounts;el.textContent=g?Number(i?g.community:g.successful_connections).toLocaleString('en-US'):'—'});var ne=$('.bvzero-need');if(ne)ne.style.display=FLN.length?'none':'';$$('.bvzero-feature').forEach(function(el,i){el.style.display=(i?FLP:FLB).length?'none':''})}
function redraw(){bvChatDom();if(cur=='chats'){if(CHMODE=='thread'&&TH[chCur]){var input=$('#thIn'),draft=input&&input.value;renderHead();renderFoot();renderMsgs(false);if(input&&draft)input.value=draft}else if(CHMODE=='sreq'&&SR[srCur])renderSR();else if(CHMODE=='thread'&&!TH[chCur]){CHMODE='empty';chShow()}else chShow()}if(cur=='activity')baShow(BAMODE);if(cur=='notif')ntRender();if(/^my/.test(cur)&&!ME.edit&&!MY.arm&&!$('.bvcard input:focus'))myRender(cur);if(cur=='results')bvResults()}
function labelKind(row){return row?{business:'Business Page',professional:'Professional',offer:'Personal Offer',need:'Community Need'}[row.kind]:'Connection'}
function nameOf(uid){return (net.profiles[uid]||{}).display_name||'Birvoy user'}
function peerDisplay(row,uid,snapshot){if(row&&row.owner_id===uid&&(row.kind==='business'||row.kind==='professional'))return ((row.data||{}).item||{}).fd?.name||row.title||nameOf(uid);if(!row&&snapshot&&snapshot.source_owner===uid&&(snapshot.source_kind==='business'||snapshot.source_kind==='professional'))return snapshot.source_title||nameOf(uid);return nameOf(uid)}
function requestListingPhoto(row){var item=row&&row.data&&row.data.item||{},fd=item.fd||{},isProvider=row&&(row.kind==='professional'||row.kind==='business'),portfolio=Array.isArray(fd.ph)&&fd.ph.find(function(p){return typeof p==='string'&&p});var photo=isProvider?(fd.logo||''):(portfolio||fd.logo||item.img||'');return /^(https?:\/\/|data:image\/(?:png|jpeg|webp|gif);base64,)/i.test(photo)?photo:''}
// Match request state by the actual listing and its owner, never by display text.
bvConnLabel=function(c){var item=c&&c.r;if(!item)return{s:'go'};var row=net.recordRows[item.id],listing=row?row.id:item.dbid,owner=item.usr;if(!listing||!owner)return{s:'go'};for(var k in TH){var th=TH[k];if(th.state==='active'&&th.sourceId===listing&&th.peer&&th.peer.uid===owner)return{s:'chat',id:k}}for(var i=0;i<SRO.length;i++){var r=SR[SRO[i]];if(r&&r.state==='pending'&&r.lid===listing&&r.to===owner)return{s:'sent',id:r.id}}return{s:'go'}};
var originalFlActions=flActions;flActions=function(it,biz){if(it.own)return originalFlActions(it,biz);var state=bvConnLabel({t:biz?'b':'p',r:it});if(state.s==='go')return originalFlActions(it,biz);var html=originalFlActions(it,biz);if(state.s==='sent')return html.replace('class="cta" data-act="my" data-my="req:'+it.id+'">Send Request','class="cta pend" data-act="prod_request_status" data-id="'+fxE(state.id)+'">Request sent');return html.replace('class="cta" data-act="my" data-my="req:'+it.id+'">Send Request','class="cta" data-act="prod_open_thread" data-id="'+fxE(state.id)+'">Open Chat')};
acts.prod_request_status=function(el){srOpen(el.getAttribute('data-id'))};acts.prod_open_thread=function(el){openThread(el.getAttribute('data-id'))};
function noteReceived(kind,id){var seen=net.incomingSoundState;if(!seen||!id||seen[kind].has(id))return;seen[kind].add(id);playReceivedSound()}
function notifyIncoming(reqs,msgs,notes,me){
 var first=!net.incomingSoundState;if(first)net.incomingSoundState={requests:new Set(),messages:new Set(),notifications:new Set()};
 function record(kind,id){if(!id)return;if(first)net.incomingSoundState[kind].add(id);else noteReceived(kind,id)}
 reqs.forEach(function(r){if(r.receiver_id===me)record('requests',r.id)});
 msgs.forEach(function(m){if(m.sender_id!==me)record('messages',m.id)});
 notes.forEach(function(n){if(n.user_id===me&&/^(request_accepted|request_declined)$/.test(n.type))record('notifications',n.id)});
}
function incomingRealtime(table,payload){if(!net.user||!payload||payload.eventType!=='INSERT')return;var row=payload.new||{},me=net.user.id;
 if(table==='messages'&&row.id&&row.thread_id){var th=TH[row.thread_id];if(row.sender_id===me&&net.outbox&&net.outbox[row.id])confirmOutgoing(row.id);else if(row.sender_id!==me&&th&&!th.msgs.some(function(m){return m.id===row.id})){th.msgs.push({id:row.id,w:'them',t:row.body,tm:new Date(row.created_at).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}),ts:Date.parse(row.created_at)});if(cur==='chats'&&CHMODE==='thread'&&chCur===row.thread_id)renderMsgs(true)}}if(table==='requests'&&row.receiver_id===me)noteReceived('requests',row.id);if(table==='messages'&&row.sender_id&&row.sender_id!==me)noteReceived('messages',row.id);if(table==='notifications'&&row.user_id===me&&/^(request_accepted|request_declined)$/.test(row.type))noteReceived('notifications',row.id)}
function loadConversations(reqs,threads,msgs,notes){var me=net.user.id,chat=bvEmptyChat(),byId={};net.listingRows.forEach(function(r){byId[r.id]=r});var currentOpen=cur=='chats'&&CHMODE=='thread'?chCur:null;
 threads.forEach(function(t){var peer=t.user_a==me?t.user_b:t.user_a,r=reqs.find(function(r){return r.id==t.request_id}),listing=r&&byId[r.listing_id],ms=msgs.filter(function(m){return m.thread_id==t.id}).reverse(),list=[],lastDay='';ms.forEach(function(m){var date=bvDayLabel(Date.parse(m.created_at));if(date!=lastDay){list.push({d:date,ts:Date.parse(m.created_at)});lastDay=date}list.push({id:m.id,w:m.sender_id==me?'me':'them',t:m.body,tm:new Date(m.created_at).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}),ts:Date.parse(m.created_at)})});if(t.state=='ended')list.push({s:'Connection ended'});chat.TH[t.id]={name:peerDisplay(listing,peer,r),img:listing&&listing.owner_id===peer&&(listing.kind==='business'||listing.kind==='professional')?requestListingPhoto(listing):'',kind:labelKind(listing),about:t.about||(listing?listing.title:'Connection'),sourceTitle:listing?listing.title:(r&&r.source_title||''),sourceId:r&&(r.listing_id||r.source_key),lid:listing?prefixes[listing.kind]+'_'+listing.owner_id+'_'+((listing.data||{}).item||{id:listing.id}).id:null,state:t.state,peer:{uid:peer,id:t.id},ord:ms.length?Date.parse(ms[ms.length-1].created_at):Date.parse(t.created_at),unread:ms.filter(function(m){return m.sender_id!=me&&!m.read_at}).length,msgs:list}}
 );reqs.forEach(function(r){var listing=byId[r.listing_id],peer=r.sender_id==me?r.receiver_id:r.sender_id,state=r.state=='pending'&&Date.parse(r.expires_at)<=Date.now()?'expired':r.state;if(r.receiver_id==me&&state=='pending'){chat.reqIn.push({q:r.id,fromUid:r.sender_id,fromName:nameOf(r.sender_id),toName:nameOf(me),kind:labelKind(listing),about:listing?listing.title:r.context||'Connection',sourceTitle:listing?listing.title:'',ctx:r.context||'',lid:r.listing_id,sid:r.id,exp:Date.parse(r.expires_at),at:Date.parse(r.created_at)})}if(r.sender_id==me&&state!='accepted'&&state!='canceled'){chat.SR[r.id]={id:r.id,q:r.id,to:r.receiver_id,lid:r.listing_id,name:peerDisplay(listing,peer,r),kind:labelKind(listing),about:listing?listing.title:r.context||'Connection',sourceTitle:listing?listing.title:(r.source_title||''),sourcePhoto:requestListingPhoto(listing),ctx:r.context||'',state:state,reason:r.decline_reason||'',left:Math.max(0,Math.ceil((Date.parse(r.expires_at)-Date.now())/36e5))+'h',sent:new Date(r.created_at).toLocaleString(),closes:new Date(r.expires_at).toLocaleString(),closed:r.responded_at?new Date(r.responded_at).toLocaleString():'',exp:Date.parse(r.expires_at),bvd:1};chat.SRO.push(r.id)}});
 Object.keys(chat.TH).forEach(function(id){var th=chat.TH[id];if(th.state!=='ended'||!th.sourceId)return;var pending=Object.values(chat.SR).find(function(r){return r.state==='pending'&&r.lid===th.sourceId&&r.to===th.peer.uid});if(pending)th.recon=pending.id});
 Object.keys(net.outbox||{}).forEach(function(id){var pending=net.outbox[id],target=chat.TH[pending.thread];if(!target)return;var existing=target.msgs.find(function(m){return m.id===id});if(existing){confirmOutgoing(id);delete net.outbox[id];return}target.msgs.push({id:id,w:'me',t:pending.body,tm:pending.tm,ts:pending.ts,delivery:pending.state});target.ord=Math.max(target.ord||0,pending.ts)});
 notes.forEach(function(n){var th=n.ref_type==='thread'&&chat.TH[n.ref_id],title=n.title;if(th&&n.type==='request_accepted')title=th.name+' accepted your request';else if(th&&n.type==='message')title=th.name+' sent you a message';chat.NT.push({id:n.id,av:'B',tag:n.type=='message'?'NEW MESSAGE':'CONNECTION REQUEST',t:title,s:n.body||'',tm:bvDayLabel(Date.parse(n.created_at)),u:n.read_at?0:1,a:n.ref_type=='thread'?'chat:'+n.ref_id:n.type=='request_received'?'req:'+n.ref_id:'sr:'+n.ref_id,g:bvDayLabel(Date.parse(n.created_at)).toUpperCase()})});
 var hash=JSON.stringify(chat);if(hash!==net.chatHash){net.chatHash=hash;bvLoadChat(chat);redraw();if(currentOpen&&TH[currentOpen]&&TH[currentOpen].unread){client.rpc('mark_thread_read',{p_thread:currentOpen}).then(function(r){if(r.error)console.warn('Could not mark messages read')})}}}
async function loadConnectionCounts(listings){var map={};for(var i=0;i<listings.length;i+=250){var ids=listings.slice(i,i+250).map(function(row){return row.id});var stats=result(await bounded(client.rpc('birvoy_listing_connection_counts',{p_listing_ids:ids}),8000))||[];stats.forEach(function(row){map[row.listing_id]=row})}return map}
function applyMyConnectionStats(){['mybiz','mypro'].forEach(function(key){var render=MYR[key];MYR[key]=function(){var field=key==='mybiz'?'biz':'pro',original=MY[field];try{MY[field]=original.map(function(item){var stat=(net.connectionCounts||{})[item._remoteId]||{};return Object.assign({},item,{conn:Number(stat.successful_connections)||0,req:Number(stat.pending_requests)||0})});return render()}finally{MY[field]=original}}})}
applyMyConnectionStats();
async function refresh(options){options=options||{};if(!net.user)return;if(net.refreshing){await net.refreshDone;return refresh(options)}net.refreshing=true;var finishRefresh;net.refreshDone=new Promise(function(resolve){finishRefresh=resolve});var uid=net.user.id,version=net.version;try{var values=await Promise.all([rows('profiles','id,display_name,lang,created_at'),rows('listings'),rows('requests'),rows('threads'),rows('messages'),rows('notifications')]);if(!net.user||net.user.id!=uid||version!==net.version)return;net.profiles={};values[0].forEach(function(p){net.profiles[p.id]=p});net.listingRows=values[1];notifyIncoming(values[2],values[4],values[5],uid);loadConversations(values[2],values[3],values[4],values[5]);var counts=await Promise.all([loadConnectionCounts(values[1]),bounded(client.rpc('birvoy_global_counts'),8000).then(function(r){return result(r)}).catch(function(){return null})]);if(!net.user||net.user.id!=uid||version!==net.version)return;net.connectionCounts=counts[0];var globalRow=Array.isArray(counts[1])?counts[1][0]:null;if(globalRow&&Number.isFinite(Number(globalRow.successful_connections))&&Number.isFinite(Number(globalRow.community)))window.BirvoyGlobalCounts=globalRow;var personalIds=new Set(values[1].filter(function(row){return row.owner_id===uid&&(row.kind==='offer'||row.kind==='need')}).map(function(row){return row.id}));net.personalConnections=new Set(values[2].filter(function(r){var providerOwned=r.source_owner===uid&&(r.source_kind==='business'||r.source_kind==='professional');return r.state==='accepted'&&((r.sender_id===uid&&!providerOwned)||(r.receiver_id===uid&&(personalIds.has(r.listing_id)||(r.source_owner===uid&&(r.source_kind==='offer'||r.source_kind==='need')))))}).filter(function(r){return !!(r.listing_id||r.source_key)}).map(function(r){return [r.source_key||r.listing_id,[r.sender_id,r.receiver_id].sort().join(':')].join(':')})).size;window.BirvoyPersonalConnections=net.personalConnections;if(options.own||(!net.saving&&!net.suspend&&digest()===net.last)){localItemsFromServer(values[1]);net.last=digest()}updateMarket(values[1]);var counter=$('.bvzero-count');if(counter)counter.textContent=window.BirvoyGlobalCounts?Number(window.BirvoyGlobalCounts.successful_connections).toLocaleString('en-US'):'—';if(/^my/.test(cur)&&options.own)myRender(cur)}finally{net.refreshing=false;finishRefresh()}}
var refreshOnce=refresh;refresh=function(options){net.refreshAgain=true;net.refreshOwn=net.refreshOwn||!!(options&&options.own);if(net.refreshPromise)return net.refreshPromise;net.refreshPromise=(async function(){do{net.refreshAgain=false;var own=net.refreshOwn;net.refreshOwn=false;await refreshOnce({own:own})}while(net.refreshAgain&&net.user)})().finally(function(){net.refreshPromise=null});return net.refreshPromise};
function unsubscribe(){if(net.channel){client.removeChannel(net.channel);net.channel=null}}
function subscribe(){unsubscribe();var ch=client.channel('birvoy-'+net.user.id);['requests','threads','messages','notifications'].forEach(function(t){ch.on('postgres_changes',{event:'*',schema:'public',table:t},function(payload){incomingRealtime(t,payload);clearTimeout(net.refreshTimer);net.refreshTimer=setTimeout(function(){refresh().catch(failure)},180)})});net.channel=ch.subscribe()}
async function adopt(user){if(!user)return;var changed=!net.user||net.user.id!==user.id;if(!changed){net.user=user;return}
 clearSession();net.loading=true;net.user=user;var version=net.version;
 function current(){return !!net.user&&net.user.id===user.id&&net.version===version}
 var p=result(await bounded(client.from('profiles').select('id,display_name,lang,created_at').eq('id',user.id).single(),10000));if(!current())return;
 if(p.display_name==='Birvoy user'&&(user.user_metadata||{}).full_name){p.display_name=user.user_metadata.full_name;result(await bounded(client.from('profiles').update({display_name:p.display_name}).eq('id',user.id),10000));if(!current())return}
 DB=freshDB();var u=currentIdentity(user,p);DB.users[u.id]=u;DB.session=u.id;var md=user.user_metadata||{},prefs=md.birvoy||{};Object.keys(kinds).forEach(function(k){MY[k]=[]});MY.saved=prefs.saved||{};MY.promo=[];ME.area=prefs.area||'';ME.langs=prefs.langs||'';ME.about=prefs.about||'';ME.edit=0;lang=p.lang||lang;net.meta=JSON.stringify(prefs);net.profiles[u.id]=p;net.last=digest();bvRefreshName();
 try{await refresh({own:true});if(current())subscribe()}finally{if(current()){net.loading=false;net.last=digest()}}
}
var adoptOnce=adopt;adopt=function(user){if(net.adopting&&net.adoptId===user.id)return net.adopting;net.adoptId=user.id;var work=adoptOnce(user),version=net.version;var tracked=work.catch(function(e){if(net.version===version&&net.user&&net.user.id===user.id)clearSession();throw e}).finally(function(){if(net.adopting===tracked){net.adopting=null;if(net.version===version)net.loading=false}});net.adopting=tracked;return tracked};
function clearSession(){net.version++;clearTimeout(net.refreshTimer);unsubscribe();net.incomingSoundState=null;net.outbox={};net.user=null;net.connectionCounts={};net.personalConnections=0;window.BirvoyPersonalConnections=0;window.BirvoyGlobalCounts=null;net.matchCheckedUser=null;net.last='';net.chatHash='';net.readSent=new Set();net.known.clear();net.listingRows=[];net.profiles={};net.recordRows={};DB=freshDB();bvClearUser();bvLoadChat(bvEmptyChat());ME.area='';ME.langs='';ME.about='';MY.saved={};MY.promo=[];bvRebuildMarket();bvChatDom();hoRender()}
var oldLoad=bvLoadUser;bvLoadUser=function(){/* All session hydration goes through adopt(). */};
bvStartScreen=function(){return net.user?'home':'lang'};
function prefsOf(snapshot){return Object.assign({},(net.user.user_metadata||{}).birvoy||{},{area:snapshot.me.area,langs:snapshot.me.langs,about:snapshot.me.about,saved:snapshot.prefs.saved,promo:[]})}
async function save(){if(!net.user||net.loading||net.suspend)return;if(net.saving){net.queued=true;return net.savePromise.then(function(){return save()})}if(digest()===net.last)return;net.saving=true;var uid=net.user.id,version=net.version;Object.keys(kinds).forEach(function(k){MY[k].forEach(function(it){if(!it._remoteId)it._remoteId=uuid()})});var snap=localSnapshot(),key=JSON.stringify(snap),out=[],ids=new Set();Object.keys(kinds).forEach(function(k){snap.my[k].forEach(function(it){var f=it.fd||{},price=String(f.price||it.b||'').replace(/[^0-9.]/g,''),v=parseFloat(price);ids.add(it._remoteId);out.push({id:it._remoteId,owner_id:uid,kind:kinds[k],title:(it.t||it.n||f.title||f.name||f.desc||'').trim(),description:f.desc||f.about||it.t||'',category:f.role||(f.tags||[])[0]||'',price:Number.isFinite(v)?v:null,city:f.loc||snap.me.area||'',status:it.s=='paused'?'paused':it.s=='closed'?'closed':'active',data:Object.assign({item:it,ui_status:it.s,area:snap.me.area},it.sample&&it.sample.batch===SAMPLE_BATCH?{is_sample:true,sample_batch:SAMPLE_BATCH}:{}),created_at:new Date(it.at||Date.now()).toISOString()})})});
net.savePromise=(async function(){try{if(out.length)result(await client.from('listings').upsert(out,{onConflict:'id'}));var deleted=[...net.known].filter(function(id){return !ids.has(id)});if(deleted.length)result(await client.from('listings').delete().eq('owner_id',uid).in('id',deleted));var prefs=prefsOf(snap),md=JSON.stringify(prefs);if(md!==net.meta||((net.user.user_metadata||{}).full_name||'')!==snap.name){var auth=result(await client.auth.updateUser({data:{full_name:snap.name,birvoy:prefs}}));net.user=auth.user;net.meta=md}var profile=net.profiles[uid]||{};if(profile.display_name!==snap.name||profile.lang!==snap.lang){result(await client.from('profiles').update({display_name:snap.name,lang:snap.lang=='ar'?'ar':'en'}).eq('id',uid));net.profiles[uid]=Object.assign({},profile,{display_name:snap.name,lang:snap.lang})}if(net.user&&net.user.id==uid&&version==net.version){net.known=ids;net.last=key;net.listingRows=out.concat(net.listingRows.filter(function(r){return r.owner_id!=uid}));updateMarket(net.listingRows)}return true}finally{net.saving=false;var again=net.queued;net.queued=false;if(again&&net.user&&net.user.id==uid&&digest()!==net.last)setTimeout(function(){save().catch(failure)},200)}})();return net.savePromise}
var lastError=0;bvPersist=function(){if(net.loading||net.suspend||!net.user)return;if(digest()!==net.last)save().catch(function(e){if(Date.now()-lastError>10000){lastError=Date.now();toast('Changes haven’t synced: '+message(e))}});var unread=NT.filter(function(n){return n.id&&!n.u&&!net.readSent?.has(n.id)}).map(function(n){return n.id});if(unread.length){net.readSent=net.readSent||new Set();unread.forEach(function(id){net.readSent.add(id)});client.from('notifications').update({read_at:new Date().toISOString()}).in('id',unread).then(function(r){if(r.error)unread.forEach(function(id){net.readSent.delete(id)})})}};
async function signedIn(data,screen){if(!data.user||!data.session)throw Error('Please confirm your email before signing in.');await adopt(data.user);PEND=null;clearInterval(otpTimer);smsEl.classList.remove('on');go(screen||'home')}
acts.submit=function(){return action('signup',async function(){var name=$('#f-name').value.trim(),raw=$('#f-id').value.trim(),pw=$('#f-pw').value,pw2=$('#f-pw2').value,n=validId(raw);if(!fOk([['f-name',name.length<2?'Please enter your full name.':''],['f-id',!n?'Enter a valid email or mobile number.':n.k=='phone'?'Mobile sign-up is not enabled yet. Please use email.':''],['f-pw',!strongPw(pw)?'Use 8+ characters with a letter and a number.':''],['f-pw2',pw!==pw2?'Passwords don’t match.':'']]))return;var checks=$$('.chk');if(!checks[0]||checks[0].getAttribute('aria-checked')!='true'||checks[1].getAttribute('aria-checked')!='true'){toast('Please accept the Terms of Use and Privacy Policy');return}var data=result(await client.auth.signUp({email:n.v,password:pw,options:{data:{full_name:name},emailRedirectTo:/^https?:$/.test(location.protocol)?location.origin+'/':undefined}}));$('#f-pw').value='';$('#f-pw2').value='';if(data.session){await signedIn(data,'allset');return}PEND={id:n,raw:raw,name:name,password:pw,kind:'signup'};go('mobile');otpPaint();toast('Confirm the link in your email, then tap Verify. You can also enter an email code.')})};
otpSend=function(){};otpPaint=function(){if(!PEND)return;$('#otpTitle').textContent='Verify your email';$('#otpTarget').textContent=maskId(PEND.id,PEND.raw);$('#otpChange').textContent='Change email';$('#otpResend').textContent='Resend confirmation';$('#otpErr').textContent='Confirm the link in your email, then tap Verify.'};
acts.otp_resend=function(){return action('resend',async function(){if(!PEND)return;result(await client.auth.resend({type:'signup',email:PEND.id.v}));toast('Confirmation email sent')})};
acts.ver_m=function(){return action('verify',async function(){if(!PEND)return;var pending=PEND,v=$('#s-mobile .otp')._val(),data;if(v.length){data=result(await client.auth.verifyOtp({email:pending.id.v,token:v,type:'email'}))}else{data=result(await client.auth.signInWithPassword({email:pending.id.v,password:pending.password}))}await signedIn(data,'allset')})};
acts.chg_m=function(){PEND=null;go('create')};
acts.login_go=function(){return action('login',async function(){var raw=$('#li-id').value.trim(),pw=$('#li-pw').value;if(!fOk([['li-id',validId(raw)?'':'Enter a valid email or mobile number.'],['li-pw',pw?'':'Enter your password.']]))return;var data=result(await client.auth.signInWithPassword(credentials(raw,pw)));$('#li-pw').value='';await signedIn(data,'home')})};
acts.social=function(el){return action('oauth',async function(){var provider=/Apple/.test(el.getAttribute('aria-label')||'')?'apple':'google';if(!net.providers||!net.providers[provider]){toast((provider=='apple'?'Apple':'Google')+' sign-in is not configured. Please use email.');return}result(await client.auth.signInWithOAuth({provider:provider,options:{redirectTo:location.origin+'/'}}))})};
function asyncSheet(o,submit){o.onSubmit=function(v){if(net.action.sheet)return;net.action.sheet=true;var btn=$('#bvgo');if(btn)btn.disabled=true;submit(v).then(function(r){if(r===true)sheetClose();else if(r)Object.keys(r).forEach(function(k){var e=$('#bve_'+k);if(e)e.textContent=r[k]})}).catch(function(e){var out=$('#bvse');if(out)out.textContent=message(e);else failure(e)}).finally(function(){net.action.sheet=false;if(btn)btn.disabled=false})};bvSheet(o)}
function resetPasswordSheet(){asyncSheet({title:'Create a new password',fields:[{id:'p1',label:'New password',type:'password',ph:'At least 8 characters',ac:'new-password'},{id:'p2',label:'Confirm password',type:'password',ph:'Re-enter your password',ac:'new-password'}],cta:'Save password'},async function(v){if(!strongPw(v.p1))return{p1:'Use 8+ characters with a letter and a number.'};if(v.p1!==v.p2)return{p2:'Passwords don’t match.'};result(await client.auth.updateUser({password:v.p1}));toast('Password updated');return true})}
acts.forgot=function(){asyncSheet({title:'Reset your password',sub:'We’ll email a password-reset link. Open it on this app’s hosted URL, or enter the email code here.',fields:[{id:'email',label:'Email',ph:'Email address',val:$('#li-id').value}],cta:'Send reset email'},async function(v){var n=validId(v.email);if(!n||n.k!='email')return{email:'Enter a valid email address.'};var opts=/^https?:$/.test(location.protocol)?{redirectTo:location.href.split('#')[0]}:{};result(await client.auth.resetPasswordForEmail(n.v,opts));setTimeout(function(){asyncSheet({title:'Check your email',sub:'Paste the password-reset link from your email, or enter its verification code.',fields:[{id:'code',label:'Reset link or email code',ph:'Paste your reset link or code'}],cta:'Verify code',ghost:'Back to login'},async function(v){var token=v.code.trim(),d;if(/^https?:/.test(token)){var url=new URL(token),h=new URLSearchParams(url.hash.slice(1));if(h.get('access_token')&&h.get('refresh_token'))d=result(await client.auth.setSession({access_token:h.get('access_token'),refresh_token:h.get('refresh_token')}));else{var hash=url.searchParams.get('token_hash')||url.searchParams.get('token');if(!hash)throw Error('Paste the complete reset link from your email.');d=result(await client.auth.verifyOtp({token_hash:hash,type:'recovery'}))}}else d=result(await client.auth.verifyOtp({email:n.v,token:token,type:'recovery'}));if(d.user)await adopt(d.user);setTimeout(resetPasswordSheet,20);return true})},20);return true})};
bvLogout=function(){return action('logout',async function(){await save();result(await client.auth.signOut());clearSession();go('welcome');toast('Logged out')})};
acctSheet=function(){var u=curUser();if(!u)return;asyncSheet({title:'Account details',info:[['Email',esc(u.raw)]],fields:[{id:'n',label:'Full name',val:u.name}],cta:'Save name'},async function(v){var n=v.n.trim();if(n.length<2)return{n:'Please enter your full name.'};u.name=n;await save();bvRefreshName();if(/^my/.test(cur))myRender(cur);toast('Name updated');return true})};
pwSheet=function(){asyncSheet({title:'Change password',fields:[{id:'old',label:'Current password',type:'password',ac:'current-password'},{id:'p1',label:'New password',type:'password',ac:'new-password'},{id:'p2',label:'Confirm password',type:'password',ac:'new-password'}],cta:'Update password'},async function(v){if(!strongPw(v.p1))return{p1:'Use 8+ characters with a letter and a number.'};if(v.p1!==v.p2)return{p2:'Passwords don’t match.'};result(await client.auth.signInWithPassword(credentials(curUser().raw,v.old)));result(await client.auth.updateUser({password:v.p1}));toast('Password updated');return true})};
delSheet=function(){bvSheet({title:'Delete account',sub:'Account deletion requires the project administrator. Your account has not been deleted.',cta:'',ghost:'Close'})};verifySheet=function(){toast(curUser()&&curUser().verified?'Your email is verified.':'Please confirm the link in your email.')};
var oldMy=acts.my;acts.my=function(el){var cmd=el.getAttribute('data-my')||'';if(cmd=='phdel'||cmd.indexOf('ph:delete')===0){delSheet();return}return oldMy(el)};
addSent=function(){throw Error('Choose a live listing to send a connection request.')};
var existingPublish=myPub;FXH.publish=function(){return action('publish',async function(){if(!net.user){go('welcome');toast('Please sign in to publish');return}var f=FXC[FX.id],V=FXV[FX.id]||{};for(var i=0;i<f.steps.length;i++){var vk=f.steps[i][0],vr=V[vk]&&V[vk](FX.d);if(vr){FX.dd=false;fxStep(i);toast(vr[0]);return}}net.suspend=true;try{if(FX._cloudPending)FX.editId=FX._cloudPending;existingPublish(FX.id,FX.d);var list=MY[{sn:'needs',po:'offers',bp:'biz',pp:'pro'}[FX.id]];FX._cloudPending=FX.editId||list[0].id}finally{net.suspend=false}await save();FX._cloudPending=null;FX.mode='live1';fxRender(false);var id=FX.id;clearTimeout(FX.t);FX.t=setTimeout(function(){if(FX.id==id&&FX.mode=='live1'&&cur==f.scr.slice(2)){FX.mode='live2';fxRender(false)}},3800)})};var oldStart=FXH.start;FXH.start=function(id){FX._cloudPending=null;oldStart(id)};
var oldDo=myDo;myDo=function(l,id,v){if(!net.user){toast('Please sign in');return}
 if(v==='del'&&DELK[l]){var found=myFind(l,id),item=found&&found[0][found[1]];if(!item)return;var sourceId=item._remoteId,name=item.t||item.n;
  cfAsk(l,name,function(){return action('deleteSource',async function(){await save();if(!sourceId)throw Error('Please refresh and try deleting again.');result(await client.rpc('birvoy_delete_source',{p_listing:sourceId}));net.known.delete(sourceId);var current=myFind(l,id);if(current)current[0].splice(current[1],1);net.last=digest();toast('Deleted permanently');await refresh({own:true})})});return}
 oldDo(l,id,v);bvPersist(true)};
flSend=function(name,kind,about,ctx){if(net.action.sendRequest)return;var target=bvTgt&&copy(bvTgt),button=document.activeElement,startScreen=cur,priorText=button&&button.textContent,showButton=button&&button.tagName==='BUTTON'&&/send request/i.test(priorText||'');if(showButton){button.textContent='Sending…';button.disabled=true}return action('sendRequest',async function(){var sent=false;try{if(!net.user){go('welcome');toast('Please sign in to connect');return}if(!target||!target.uid)throw Error('This listing is no longer available.');var row=target.rec&&net.recordRows[target.rec.id],listing=row?row.id:target.rec&&target.rec.dbid||null;if(target.rec&&target.rec.id&&!listing)throw Error('Refresh this listing and try again.');var old=Object.keys(SR).map(function(k){return SR[k]}).find(function(r){return r.to==target.uid&&r.lid==listing});if(old&&old.state=='pending'){srOpen(old.id);return}if(old&&old.state=='expired')result(await client.rpc('cancel_request',{p_request:old.id}));var r=result(await client.rpc('send_request',{p_receiver:target.uid,p_listing:listing,p_context:ctx||about}));sent=true;if(showButton&&button.isConnected){button.textContent='Request sent';button.classList.add('pend')}playSentSound();REQNEW=r.id;reqName(name);reqBack=startScreen;await new Promise(function(resolve){setTimeout(resolve,900)});if(cur===startScreen&&net.user){window.bvRequestSoundPlayed=true;go('reqsent')}else REQNEW=null;refresh().catch(failure)}finally{if(showButton&&button.isConnected){if(!sent){button.textContent=priorText;button.classList.remove('pend')}button.disabled=false}}})};
acts.ch_accept=function(el){var c=el.closest('.reqcard'),id=c&&c.getAttribute('data-q');return action('respond',async function(){if(!id)return;var thread=result(await client.rpc('respond_request',{p_request:id,p_accept:true,p_reason:null}));await refresh();if(thread)openThread(thread)})};
acts.ch_na_done=function(el){var c=chPick,id=c&&c.getAttribute('data-q'),reason=(el&&el.textContent=='Skip')?'':(($('#chz .rchip.on')||{}).textContent||'');return action('respond',async function(){if(!id)return;result(await client.rpc('respond_request',{p_request:id,p_accept:false,p_reason:reason}));chPick=null;chSheet(false);await refresh();toast('Request declined')})};
acts.sr_cancel_go=function(){var id=srTarget;return action('cancelRequest',async function(){result(await client.rpc('cancel_request',{p_request:id}));shClose();await refresh();CHMODE=Object.keys(TH).length||SRO.length||REQIN.length?'list':'empty';chShow();toast('Request canceled')})};
acts.sr_again=function(){var r=SR[srCur];if(!r)return;bvTgt={uid:r.to,rec:{id:null,dbid:r.lid}};try{return flSend(r.name,r.kind,r.about,r.ctx)}finally{bvTgt=null}};
acts.th_recon_go=function(){var th=TH[chCur],threadId=chCur;if(!th)return;shClose();return action('sendRequest',async function(){var r=result(await client.rpc('birvoy_reconnect_thread',{p_thread:threadId}));REQNEW=r.id;reqName(th.name);reqBack='chats';playSentSound();go('reqsent');refresh().catch(failure)})};
function paintOutgoing(id){var p=net.outbox&&net.outbox[id],th=p&&TH[p.thread];if(!th)return;var m=th.msgs.find(function(x){return x.id===id});if(!m){m={id:id,w:'me',t:p.body,tm:p.tm,ts:p.ts};th.msgs.push(m)}m.delivery=p.state;if(cur==='chats'&&CHMODE==='thread'&&chCur===p.thread)renderMsgs(true)}
function confirmOutgoing(id){var p=net.outbox&&net.outbox[id];if(!p)return;p.state='sent';paintOutgoing(id);if(!p.played){p.played=true;requestAnimationFrame(function(){playSentSound()})}}
async function deliverOutgoing(id){var p=net.outbox&&net.outbox[id];if(!p||p.busy||!net.user)return;var uid=net.user.id,version=net.version;function current(){return !!net.user&&net.user.id===uid&&net.version===version&&net.outbox&&net.outbox[id]===p}p.busy=true;p.state='pending';paintOutgoing(id);try{
 var existing=null;if(p.attempted){existing=await bounded(client.from('messages').select('id').eq('id',id).maybeSingle(),12000);if(existing.error)throw existing.error}
 if(!current())return;p.attempted=true;
 if(!existing||!existing.data){var inserted=await bounded(client.from('messages').insert({id:id,thread_id:p.thread,sender_id:uid,body:p.body,lang:p.lang}).select('id').single(),12000);if(inserted.error){if(inserted.error.code==='23505'){var check=result(await bounded(client.from('messages').select('id').eq('id',id).maybeSingle(),12000));if(!check)throw inserted.error}else throw inserted.error}}
 if(!current())return;confirmOutgoing(id);refresh().catch(failure)
 }catch(e){if(net.outbox&&net.outbox[id]&&net.outbox[id].state!=='sent'){p.state='failed';paintOutgoing(id)}}finally{p.busy=false}}
acts.prod_retry_message=function(el){deliverOutgoing(el.getAttribute('data-id'))};
thSend=function(){var id=chCur,th=TH[id],input=$('#thIn'),body=input&&input.value.trim();if(!th||th.state!=='active'||!body)return;if(body.length>4000){toast('Messages can contain up to 4,000 characters.');return}
 var mid=uuid(),now=Date.now();net.outbox=net.outbox||{};net.outbox[mid]={thread:id,body:body,lang:lang==='ar'?'ar':'en',state:'pending',ts:now,tm:new Date(now).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})};input.value='';paintOutgoing(mid);deliverOutgoing(mid)};

acts.th_end_go=function(el){var id=chCur,button=el||document.querySelector('#chz [data-act=th_end_go]');if(net.action.endThread)return;if(button){button.disabled=true;button.textContent='Ending…'}return action('endThread',async function(){try{result(await client.rpc('end_thread',{p_thread:id}));shClose();if(TH[id]){TH[id].state='ended';if(chCur===id){renderHead();renderFoot();renderMsgs(true)}}toast('Connection ended');refresh().catch(failure)}finally{if(button&&button.isConnected){button.disabled=false;button.textContent='End Connection'}}})};
var previousNotificationOpen=ntOpen;
ntOpen=function(a){var parts=String(a||'').split(':'),kind=parts[0],id=parts[1];if((kind==='chat'&&!TH[id])||(kind==='req'&&!REQIN.some(function(r){return r.q===id}))||(kind==='sr'&&!SR[id])){var userId=net.user&&net.user.id;return bounded(refresh(),12000).then(function(){if(!net.user||net.user.id!==userId)return;if((kind==='chat'&&!TH[id])||(kind==='req'&&!REQIN.some(function(r){return r.q===id}))||(kind==='sr'&&!SR[id])){toast('This conversation or request is no longer available.');return}previousNotificationOpen(a)}).catch(function(){toast('Couldn’t load this update. Check your connection and try again.')})}return previousNotificationOpen(a)};
var showThread=openThread;openThread=function(id){showThread(id);if(net.user&&TH[id])client.rpc('mark_thread_read',{p_thread:id}).then(function(r){if(r.error)failure(r.error);else refresh().catch(failure)})};
var navigate=go;go=function(id){if(cur==='splash'&&net.startupError)return;if(!net.loading&&!net.user&&!/^(splash|lang|welcome|create|mobile|login)$/.test(id)){navigate('login');toast('Please sign in to continue');return}if(net.user&&id=='myself'){var u=curUser();if(u)u.verified=!!(net.user.email_confirmed_at||net.user.phone_confirmed_at)}if(net.loading&&net.ready&&(id=='home'||id=='lang')){net.ready.then(function(){if(!net.startupError)navigate(bvStartScreen())});return}navigate(id)};
// Hold screen transitions until the persisted Supabase session has been checked.
var splash=playSplash;playSplash=function(playing){splash(playing);timers.forEach(clearTimeout);timers=[];timers.push(setTimeout(function(){net.ready.then(function(){go(bvStartScreen())})},2900))};
// Production-only UI paths. No sample account, offer, result, or successful action is fabricated.
function serviceNotice(title,body){bvSheet({title:title,sub:body,cta:'',ghost:'Close'})}
function paintHome(){
 var count=$$('.bvzero-count'),g=window.BirvoyGlobalCounts;if(count[0])count[0].textContent=g?Number(g.successful_connections).toLocaleString('en-US'):'—';if(count[1])count[1].textContent=g?Number(g.community).toLocaleString('en-US'):'—';
 var box=$('.bvzero-need');if(box){var n=FLN.find(function(x){return !x.searchOnly});box.style.display='flex';box.style.pointerEvents='auto';box.setAttribute('role','button');box.setAttribute('tabindex','0');box.setAttribute('data-act','prod_need');box.setAttribute('data-id',n?n.id:'');box.style.textAlign=n?'left':'center';box.style.padding='12px';box.style.flexDirection='column';box.style.alignItems=n?'stretch':'center';box.innerHTML=n?'<div style="font-size:10px;line-height:14px;margin-bottom:7px">👤 '+fxE(n.u)+'</div><strong style="font-size:15px;line-height:17px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">'+fxE(n.t)+'</strong><div style="font-size:9px;line-height:12px;margin-top:4px">'+fxE(n.w)+'<br>'+fxE(n.area)+', Kuwait</div><span style="align-self:flex-start;background:#013F63;color:white;border-radius:14px;font-size:10px;line-height:22px;padding:0 12px;margin-top:5px">View</span>':'No community needs yet.'}
 // Explicit test fixtures fill the existing slots; no campaign approval or metrics are fabricated.
 $$('.bvzero-feature').forEach(function(el,i){var list=(i?FLP:FLB).filter(function(r){return r.sample&&r.sample.slots.indexOf(i?'featured_professional':'featured_business')>=0}),r=(!i&&list.find(function(item){return /^blue palm salon$/i.test(item.n||'')}))||list[0];el.style.display='flex';if(!r){el.textContent=i?'No featured professionals yet.':'No featured businesses yet.';el.style.pointerEvents='none';el.removeAttribute('data-act');return}el.style.pointerEvents='auto';el.style.padding='14px';el.style.textAlign='left';el.style.justifyContent='flex-start';el.style.gap='14px';el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('data-act','prod_feature');el.setAttribute('data-id',r.id);el.setAttribute('data-kind',i?'p':'b');el.setAttribute('aria-label',r.n);el.style.position='absolute';el.style.padding='0';el.style.overflow='hidden';el.style.background='#013F63';el.innerHTML='<img src="'+fxE(i?(r.featureImage||r.av||r.cv):(r.cv||r.lg))+'" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:'+(i?'center top':'center center')+'"><div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 22%,rgba(1,45,72,.94) 100%)"></div><div style="position:absolute;left:13px;right:78px;bottom:12px;color:white;text-align:left;min-width:0"><div style="font-size:10px;line-height:13px;font-weight:700">'+(i?'FEATURED PROFESSIONAL':'FEATURED BUSINESS')+'</div><div style="font-size:17px;line-height:20px;font-weight:750;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+fxE(r.n.replace(/^SAMPLE\s*[—-]\s*/,''))+'</div><div style="font-size:11px;line-height:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+fxE(i?r.role:r.cat)+' · '+fxE(r.area)+'</div></div><span style="position:absolute;right:12px;bottom:12px;border-radius:16px;background:#5AC0DE;color:white;font-size:11px;line-height:26px;padding:0 16px;font-weight:700">View</span>' });
 var golden=FLB.find(function(r){return r.sample&&r.sample.slots.indexOf('golden_find')>=0&&r.gf}),gf=$('#gf');net.goldenId=golden&&golden.id||null;
 gf.querySelectorAll('.gf-live').forEach(function(node){node.remove()});
 if(golden){var deal=golden.gf,was=Number(deal.was),now=Number(deal.now),discount=was>0&&now>=0&&now<was?Math.round((1-now/was)*100):0;
  gf.classList.remove('bv-gf-empty');gf.setAttribute('role','button');gf.setAttribute('tabindex','0');gf.setAttribute('data-act','gf_open');gf.setAttribute('data-business',golden.id);gf.setAttribute('aria-label',deal.prod+' · Golden Find');
  var dealPhoto=deal.image||golden.cv||golden.lg;if(dealPhoto){var img=document.createElement('img');img.className='gf-live gf-photo';img.src=dealPhoto;img.alt='';gf.appendChild(img)}
  var prices=document.createElement('div');prices.className='gf-live gf-prices';if(Number.isFinite(was)&&was>0){var old=document.createElement('div');old.className='gf-old';old.textContent='KD '+was;prices.appendChild(old)}if(Number.isFinite(now)&&now>=0){var current=document.createElement('span');current.className='gf-now';current.textContent='KD '+now;prices.appendChild(current)}if(discount){var off=document.createElement('span');off.className='gf-off';off.textContent=discount+'% OFF';prices.appendChild(off)}gf.appendChild(prices);
  gf.querySelector('.gfn').textContent=golden.n.replace(/^SAMPLE\s*[—-]\s*/,'');gf.querySelector('.gfs').textContent=deal.prod+(deal.avail?' · '+deal.avail:'');
  var view=document.createElement('button');view.type='button';view.className='hit gfv gf-live';view.setAttribute('data-act','gf_open');view.setAttribute('data-business',golden.id);view.setAttribute('aria-label','View Golden Find: '+deal.prod);view.textContent='View';gf.appendChild(view);
 }else{gf.classList.add('bv-gf-empty');gf.removeAttribute('data-act');gf.removeAttribute('data-business');gf.removeAttribute('tabindex');gf.setAttribute('role','group');gf.setAttribute('aria-label','Golden Find: no Golden Finds yet');gf.querySelector('.gfn').textContent='No Golden Finds yet';gf.querySelector('.gfs').textContent='Golden Finds will appear here.'}

}
var sampleNeedDetail=MYR.myndet;MYR.myndet=function(){var html=sampleNeedDetail(),n=flFind(FLN,MY.st.myndet);if(n&&n.sample){var row=net.recordRows[n.id],photos=(((row||{}).data||{}).item||{}).fd;photos=photos&&photos.ph?photos.ph.filter(function(p){return typeof p==='string'&&p.length>20}):[];if(!photos.length&&n.sample&&/generator/i.test(n.t))photos=['/assets/test-generator-generated.png'];if(photos.length)html=html.replace('<div class="sec" style="margin-top:12px">What they need</div>','<div class="sec">Photos</div>'+flGal({gal:photos})+'<div class="sec" style="margin-top:12px">What they need</div>');if(n.own)html=html.replace('<button type="button" class="cta" data-act="my" data-my="nreq:'+n.id+'">I Can Help</button>','')}return html};
var sampleBusinessList=MYR.myflb;MYR.myflb=function(){return sampleBusinessList().replace('Local businesses near you, verified by Birvoy','Businesses for testing')};var sampleProfessionalList=MYR.myflp;MYR.myflp=function(){return sampleProfessionalList().replace('Trusted people ready to help you','Professionals for testing')};
var marketUpdate=updateMarket;updateMarket=function(data){marketUpdate(data);
 // Collapse only explicitly linked test copies; prefer another account so requests can be tested.
 [FLB,FLP,FLO,FLN].forEach(function(items){var groups={};items.forEach(function(item){var row=net.recordRows[item.id];if(!row)return;var key=row.data&&row.data.test_owner_copy_of||row.id;(groups[key]||(groups[key]=[])).push(item)});Object.keys(groups).forEach(function(key){var group=groups[key];if(group.length<2||!group.some(function(item){var row=net.recordRows[item.id];return row&&row.data&&row.data.test_owner_copy_of===key}))return;var keep=group.find(function(item){return !item.own})||group[0];group.forEach(function(item){if(item!==keep){var i=items.indexOf(item);if(i>=0)items.splice(i,1)}})})});hoRender();paintHome()};
acts.prod_need=function(el){var id=el.getAttribute('data-id');if(!id){acts.nl_open();return}MY.bk.myndet='home';MY.st.myndet=id;go('myndet')};
acts.home_need=function(){acts.nl_open()};acts.prod_feature=function(el){var id=el.getAttribute('data-id'),key=el.getAttribute('data-kind')==='p'?'mypview':'mybview';if(!flGet(id))return;MY.hf=fidx;MY.bk[key]='home';MY.st[key]=id;go(key)};acts.gf_open=function(el){var id=el&&el.getAttribute('data-business')||net.goldenId;if(!gfData(id)){serviceNotice('Golden Find','There are no Golden Finds available right now.');return}MY.hf=fidx;MY.bk.mygfd=cur;MY.st.mygfd=id;go('mygfd')};
hoList=function(){return FLO.filter(function(r){return !r.searchOnly}).sort(function(a,b){return(b.at||0)-(a.at||0)})};offBoosted=function(){return false};
MYR.myoffl=function(){var h=flBack()+myHd('Personal Offers','Things people in your community are offering'),L=FLO.filter(function(r){return !r.searchOnly}).sort(function(a,b){return(b.at||0)-(a.at||0)});if(!L.length)return h+'<div class="empty">No Personal Offers yet.</div>';h+='<div class="cnt2">'+L.length+' offer'+(L.length===1?'':'s')+'</div><div class="ogrid">';L.forEach(function(o){h+='<div class="card oc" role="button" tabindex="0" data-act="my" data-my="od:'+fxE(o.id)+'"><img src="'+fxE(o.art||o.cv)+'" alt=""><div class="ob"><div class="name">'+fxE(o.t)+'</div><div class="pr2">'+fxE(o.p)+'</div><div class="small">'+fxE(o.area)+' · '+fxE(o.c)+'</div></div></div>'});return h+'</div>'};
var showNav=acts.nv_open;acts.nv_open=function(el){var nav=el.getAttribute('data-nv')||'';if(nav==='mybview:b1'||nav==='mypview:p1'){MY.bk[fidx?'myflp':'myflb']='home';go(fidx?'myflp':'myflb');return}if(showNav)showNav(el)};
// Changes to paid/featured eligibility must be decided by a server, not user metadata.
var dispatch=acts.my;acts.my=function(el){var cmd=el.getAttribute('data-my')||'',parts=cmd.split(':');if(parts[0]==='req'&&(cur==='mybview'||cur==='mypview')){var source=flGet(parts[1]);if(source&&!source.own){bvSheet({title:'What would you like to connect about?',sub:fxE(source.n),fields:[{id:'context',label:'Connection context',ph:'Tell them what you need',max:500}],cta:'Send Request',onSubmit:function(v){var context=v.context.trim();if(!context)return{context:'Please describe what you need.'};var prior=bvTgt;bvTgt={uid:source.usr||null,rec:source};try{flSend(source.n,cur==='mybview'?'Business Page':'Professional',source.cat||source.role,context)}finally{bvTgt=prior}return true}});return}}if(parts[0]==='pm'||(parts[0]==='do'&&parts[1]==='offers'&&parts[3]==='boost')||(parts[0]==='do'&&parts[1]==='promo')){serviceNotice('Promotions','Promotions are not open yet. Your listing is still discoverable through search.');return}if(cmd==='prod:blocked'){showBlocked();return}if(parts[0]==='prod-unblock'){unblock(parts[1]);return}if(parts[0]==='ph'&&parts[1]==='settings'){var label=parts.slice(2).join(':');if(label==='Blocked Users'){showBlocked();return}if(label==='Privacy Settings'){serviceNotice('Privacy settings','Contact details are not added to your public listings. Use Birvoy chat to connect. You can block someone from Chat options.');return}if(label==='Notification Preferences'){notificationSettings();return}if(label==='Language'){serviceNotice('Language','The current app interface is in English.');return}if(label==='Report an Issue'){serviceNotice('Report an issue','Open the listing you want to report and choose Report listing. For a conversation, use Chat options → Report conversation.');return}if(/Terms|Privacy Policy/.test(label)){serviceNotice(label,'The operator has not published this document yet. New registrations are closed until the documents are ready.');return}}return dispatch(el)};
// Keep incomplete features visible, but do not simulate their outcome.
acts.th_auto=function(){serviceNotice('Translation','Automatic translation is not available. Messages are shown in their original language.')};
var signup=acts.submit;acts.submit=function(){serviceNotice('Registration is not open yet','Please check back later. Existing members can still sign in.')} ;
acts.lang_ar=function(){toast('The app interface is currently available in English.')};
var oldPlaceholder=MYR.myph;MYR.myph=function(){var p=MY.ph||{};if(p.k==='promo'||p.k==='results')return flBack()+myHd(p.t||'Promotions','Promotions are not open yet')+'<div class="empty">Your listings remain discoverable through search.</div>';return flBack()+myHd(p.t||'Account','')+'<div class="empty">This option is not available yet.</div>'+myCta('Back','back',1)};
MYR.mypromo=function(){return myHd('Promotion Dashboard','Promotions are not open yet')+'<div class="empty">There are no active promotions. Your listings remain discoverable through search.</div>'};
async function showBlocked(){return action('blocked',async function(){if(!net.user)throw Error('Please sign in to view blocked users.');var data=result(await client.from('blocks').select('blocked_id').eq('blocker_id',net.user.id))||[];if(data.length){var people=result(await client.from('profiles').select('id,display_name').in('id',data.map(function(b){return b.blocked_id})))||[];people.forEach(function(p){net.profiles[p.id]=Object.assign({},net.profiles[p.id]||{},p)})}var html='<div class="bvrows">';data.forEach(function(b){html+='<div><span>'+fxE(nameOf(b.blocked_id))+'</span><button class="bvghost" style="width:auto;height:auto;margin:0;padding:0 4px" data-act="my" data-my="prod-unblock:'+b.blocked_id+'">Unblock</button></div>'});html+='</div>';bvSheet({title:'Blocked users',sub:data.length?'Blocked users cannot send you new requests or messages.':'You haven’t blocked anyone.',cta:'',ghost:'Close'});$('#bvsheet .bvcard .sub').insertAdjacentHTML('afterend',html)})}
function unblock(id){var name=nameOf(id);bvSheet({title:'Unblock '+fxE(name)+'?',sub:'They will be able to contact you again and may be matched with you.',cta:'Unblock',onSubmit:function(){action('unblock',async function(){if(!net.user)throw Error('Please sign in to unblock a user.');var removed=result(await client.from('blocks').delete().eq('blocker_id',net.user.id).eq('blocked_id',id).select('blocked_id'));if(!removed||!removed.length)throw Error('This user could not be unblocked. Please refresh and try again.');sheetClose();await refresh();toast('User unblocked');showBlocked()});return false}})}
// Report reasons and confirmation follow the supplied V1 safety screens.
var reportReasons=['Spam / Unwanted Content','Scam or Fraud','Inappropriate Content','Fake or Misleading Information','Harassment or Abuse','Other'],reportState=null;
(function(){var base=$('#s-mysettings'),section=base.cloneNode(true);section.id='s-mysafetyreport';section.setAttribute('aria-label','Report');section.classList.remove('on');section.querySelector('#myb-mysettings').id='myb-mysafetyreport';base.parentNode.appendChild(section)})();
function reportTarget(kind,id){if(!net.user)return;var rec=kind==='thread'?TH[id]:net.recordRows[id],target=kind==='thread'?(rec&&rec.peer&&rec.peer.uid):(rec&&rec.owner_id);if(!target||target===net.user.id){toast('This item cannot be reported.');return}reportState={kind:kind,id:id,target:target,name:kind==='thread'?rec.name:(rec.title||'Listing'),reason:'',done:false};MY.bk.mysafetyreport=cur;go('mysafetyreport')}
MYR.mysafetyreport=function(){if(!reportState)return flBack()+myHd('Report','');if(reportState.done)return flBack()+myHd('Report submitted','')+'<div class="empty">Thank you for helping keep Birvoy safe. Reporting does not block this person automatically.</div><button type="button" class="cta" data-act="prod_report_done">Done</button>';var h=flBack()+myHd(reportState.kind==='thread'?'Report User':'Report','Tell us what’s wrong')+myCard('<div class="tag">REPORTING · '+(reportState.kind==='thread'?'USER':'LISTING')+'</div><div class="name">'+fxE(reportState.name)+'</div>')+'<div class="sec">Why are you reporting this?</div>';reportReasons.forEach(function(reason,i){var selected=reportState.reason===reason;h+='<button type="button" data-act="prod_report_reason" data-reason="'+i+'" aria-pressed="'+selected+'" style="width:100%;text-align:left;background:'+(selected?'#E5F4F9':'#fff')+';border:1px solid '+(selected?'#1685cb':'#c6d3e0')+';border-radius:12px;padding:12px 14px;margin-bottom:7px;font:600 13px Inter,sans-serif;color:#013f63">'+fxE(reason)+'</button>'});return h+'<div id="report-error" class="small" role="alert"></div><button type="button" class="cta" data-act="prod_report_submit">Submit Report</button>'};
acts.prod_report_reason=function(el){var i=Number(el.getAttribute('data-reason'));if(reportState&&reportReasons[i]){reportState.reason=reportReasons[i];myRender('mysafetyreport')}};
acts.prod_report_submit=function(){if(!reportState||reportState.done)return;if(!reportState.reason){var error=$('#report-error');if(error)error.textContent='Please select a reason.';return}var r=reportState;return action('report',async function(){result(await client.from('reports').insert({reporter_id:net.user.id,reported_id:r.target,thread_id:r.kind==='thread'?r.id:null,reason:r.reason+(r.kind==='listing'?'\nListing: '+r.id:'')}));if(reportState===r){r.done=true;myRender('mysafetyreport')}})};
['mybview','mypview','myodet','myndet'].forEach(function(key){var render=MYR[key];MYR[key]=function(){var h=render(),id=MY.st[key],record=net.recordRows[id];if(record&&record.owner_id!==net.user?.id)h+='<button type="button" class="cta ghost" data-act="prod_report_listing" data-id="'+fxE(id)+'">Report listing</button>';return h}});
acts.prod_report_done=function(){var r=reportState;reportState=null;if(!r)return go('my');if(r.kind==='thread'){if(TH[r.id])return openThread(r.id);return go('chats')}return go(MY.bk.mysafetyreport||'my')};
acts.prod_report_listing=function(el){reportTarget('listing',el.getAttribute('data-id'))};
acts.prod_report_thread=function(){shClose();reportTarget('thread',chCur)};
acts.prod_block_thread=function(){var t=TH[chCur],id=t&&t.peer&&t.peer.uid;if(!id)return;shClose();bvSheet({title:'Block '+t.name+'?',sub:'This stops new connection requests and messages between you and this person.',cta:'Block user',danger:1,onSubmit:function(){action('block',async function(){result(await client.from('blocks').insert({blocker_id:net.user.id,blocked_id:id}));result(await client.rpc('end_thread',{p_thread:chCur}));sheetClose();await refresh();toast('User blocked')});return false}})};
var more=acts.th_more;acts.th_more=function(el){more(el);var rows=$('#chz2 .shrows');if(rows)rows.insertAdjacentHTML('beforeend','<button class="shrow" data-act="prod_report_thread"><div class="grow"><div class="t">Report conversation</div></div></button><button class="shrow d" data-act="prod_block_thread"><div class="grow"><div class="t">Block user</div></div></button>')};
function notificationSettings(){var current=muted;bvSheet({title:'Notification sounds',sub:current?'Notification sounds are off.':'Notification sounds are on.',cta:current?'Turn sounds on':'Turn sounds off',onSubmit:function(){muted=!current;snd.muted=muted;if(sentSound)sentSound.muted=muted;if(receivedSound)receivedSound.muted=muted;var md=net.user.user_metadata||{},prefs=Object.assign({},md.birvoy||{},{soundMuted:muted});client.auth.updateUser({data:{birvoy:prefs}}).then(function(r){if(r.error){muted=current;failure(r.error)}else{net.user=r.data.user;toast('Sound preference saved')}});return true}})}
// Passwordless access is initiated only by the visitor pressing the button.
acts.prod_email_login=function(){return action('emailLogin',async function(){var raw=$('#li-id').value.trim(),n=validId(raw);if(!n||n.k!=='email'){fErr('li-id','Enter your email address first.');return}result(await client.auth.signInWithOtp({email:n.v,options:{shouldCreateUser:false,emailRedirectTo:location.origin+'/'}}));asyncSheet({title:'Check your email',sub:'Open the new sign-in email. If the link does not return you here, paste it below.',fields:[{id:'token',label:'Sign-in link or email code',ph:'Paste the fresh link or code',max:8000}],cta:'Sign in'},async function(v){var token=v.token.trim(),data;if(/^https?:/.test(token)){var u=new URL(token),h=new URLSearchParams(u.hash.slice(1));if(h.get('access_token')&&h.get('refresh_token'))data=result(await client.auth.setSession({access_token:h.get('access_token'),refresh_token:h.get('refresh_token')}));else{var hash=u.searchParams.get('token_hash')||u.searchParams.get('token');if(!hash)throw Error('Paste the full sign-in link from the new email.');data=result(await client.auth.verifyOtp({token_hash:hash,type:'email'}))}}else data=result(await client.auth.verifyOtp({email:n.v,token:token,type:'email'}));await signedIn(data,'home');return true})})};
var emailButton=document.createElement('button');emailButton.className='hit';emailButton.setAttribute('data-act','prod_email_login');emailButton.style.cssText='left:83px;top:712px;width:236px;height:38px;color:#013f63;font:600 13px Inter,sans-serif';emailButton.textContent='Sign in with an email link';$('#s-login').appendChild(emailButton);
// Decorative/device chrome uses real time, never a frozen demo clock.
function clock(){var t=new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});$$('.status>span:first-child,.fxstat>span:first-child,.bvst>span:first-child').forEach(function(el){el.textContent=t})}setInterval(clock,60000);clock();
// Status is available for support without revealing a token, email or password.
window.BirvoyBuild={version:'1.0.0-rc.3',backend:'Supabase',launchReady:false};

function startupFailure(){net.startupError=true;var splash=$('#s-splash'),box=$('#startup-retry');if(!box){box=document.createElement('div');box.id='startup-retry';box.setAttribute('role','alert');box.style.cssText='position:absolute;z-index:50;left:24px;right:24px;bottom:100px;padding:20px;border-radius:18px;background:white;color:#013f63;text-align:center;box-shadow:0 8px 28px #001b2e55;font:600 15px/1.45 -apple-system,BlinkMacSystemFont,sans-serif';box.innerHTML='<strong>Couldn’t start Birvoy</strong><p style="font-size:13px;font-weight:400">Check your internet connection and try again.</p><button type="button" style="border:0;border-radius:22px;background:#087ce6;color:white;font-weight:700;padding:12px 38px">Try again</button>';box.querySelector('button').addEventListener('click',function(e){e.stopPropagation();location.reload()});splash.appendChild(box)}stopSplashSound()}
function bounded(p,ms){var timer;return Promise.race([p,new Promise(function(_,reject){timer=setTimeout(function(){reject(Error('Connection timed out'))},ms)})]).finally(function(){clearTimeout(timer)})}
net.ready=(async function(){try{
 fetch('https://asxfuzoxyoqcutvtwgpo.supabase.co/auth/v1/settings',{headers:{apikey:'sb_publishable_kiarXPSb-oiJONe61_OAZQ_q87C1DaU'},signal:AbortSignal.timeout(5000)}).then(function(r){return r.ok?r.json():null}).then(function(x){if(x)net.providers=x.external}).catch(function(){});
 var startupVersion=net.version;await bounded((async function(){var data=result(await client.auth.getSession());if(net.startupError||net.version!==startupVersion)return;if(data.session){var verified=result(await client.auth.getUser());if(net.startupError||net.version!==startupVersion)return;await adopt(verified.user)}else clearSession()})(),12000);
 }catch(e){clearSession();startupFailure()}finally{net.loading=false}})();
client.auth.onAuthStateChange(function(event,session){if(event=='SIGNED_OUT'){var expired=!!net.user&&!net.action.logout;setTimeout(function(){clearSession();if(!/^(splash|lang|welcome|create|login|mobile)$/.test(cur))go('welcome');if(expired)toast('Your session ended. Please sign in again.')},0)}else if(event=='SIGNED_IN'&&session){setTimeout(function(){adopt(session.user).then(function(){if(/^(lang|welcome|create|mobile|login)$/.test(cur))go('home')}).catch(failure)},0)}else if(event=='PASSWORD_RECOVERY'&&session){setTimeout(function(){adopt(session.user).then(resetPasswordSheet).catch(failure)},0)}});
setInterval(function(){if(net.user&&!document.hidden&&!net.loading)refresh().catch(function(e){console.warn('Birvoy refresh:',e.code||'offline')})},15000);
addEventListener('online',function(){if(net.user)save().then(function(){return refresh()}).catch(failure)});
document.addEventListener('visibilitychange',function(){if(!document.hidden&&net.user)refresh().catch(failure)});
$('#stage').inert=false;
/* Authenticated live-catalogue AI matching pilot; never silently use local demo matching. */
var matchTicket=0,matched={query:'',mode:'',items:[]};
bvMatch=function(text,mode){var byId={};bvCands().forEach(function(c){if(c.r.dbid)byId[c.r.dbid]=c});var list=[];if(matched.query===text&&matched.mode===mode)matched.items.forEach(function(item){var c=byId[item.sourceId];if(c){c.score=item.score;c.hit=[];list.push(c)}});return{all:list,near:list,list:list}};
function matchingError(error){var timedOut=error&&/timed out/i.test(error.message||'');var rc=$('#rc'),offline=!navigator.onLine;rc.innerHTML=bvStatus()+'<div class="rbd"><h2>Matches for Your Need</h2><div class="rneed"><div class="l">YOUR NEED</div><div class="t">'+esc(QS.text)+'</div></div><div class="rnone" role="alert"><h3>'+(offline?'You’re offline':'Matching is unavailable')+'</h3><p>'+(offline?'Check your internet connection, then try again.':timedOut?'Search took too long. Check your connection and try again.':'We couldn’t complete your search. Please try again. This does not mean there are no suitable providers.')+'</p><button type="button" class="pri" data-act="prod_match_retry">Try again</button><button type="button" class="sec" data-act="bv_edit">Edit your need</button></div></div>'}
async function matchingFailure(error){if(error&&error.context&&typeof error.context.clone==='function'){try{var body=await error.context.clone().json();return body.message||'Matching is unavailable.'}catch(ignore){}}return message(error)}
acts.ask=async function(){var text=need.value.trim();if(!text){go('type');toast('Tell us what you need first');return}if(text.length>500){toast('Please use no more than 500 characters.');return}await net.ready;if(!net.user){go('login');toast('Please sign in to find matches.');return}var ticket=++matchTicket,uid=net.user.id,mode=nearV();clearTimeout(rt);QS.text=text;QS.photo=null;matched={query:text,mode:mode,items:[]};go('search');var slow=setTimeout(function(){var status=$('#s-search .sr');if(ticket===matchTicket&&cur==='search'&&status)status.textContent='Still searching… This is taking longer than usual.'},8000);try{var response=await Promise.race([client.functions.invoke('birvoy-match',{body:{query:text,locationMode:mode==='n'?'nearby':'anywhere',includeOwnSamples:!!net.testPreview}}),new Promise(function(_,reject){setTimeout(function(){reject(new Error('Search timed out. Please check your connection and try again.'))},18000)})]);if(response.error)throw response.error;if(response.data&&response.data.error)throw Error(response.data.message||'Matching is unavailable.');if(!response.data||!Array.isArray(response.data.matches))throw Error('Matching returned an invalid response.');await Promise.race([refresh(),new Promise(function(_,reject){setTimeout(function(){reject(Error('Search timed out while loading listings. Please try again.'))},8000)})]);if(ticket!==matchTicket||!net.user||net.user.id!==uid||cur!=='search')return;matched={query:text,mode:mode,items:response.data.matches};bvResults();go('results')}catch(error){if(ticket!==matchTicket||!net.user||net.user.id!==uid||cur!=='search')return;go('results');matchingError(error)}finally{clearTimeout(slow);var status=$('#s-search .sr');if(status)status.textContent='Birvoy is Searching…'}};
acts.bv_near=function(el){setNear(el.getAttribute('data-v'));return acts.ask()};acts.prod_match_retry=function(){return acts.ask()};
var cancelMatch=acts.close_search;acts.close_search=function(){matchTicket++;return cancelMatch()};


// Public links use the permanent listing ID and can load before sign-in.
function localPublicKey(key){var keys=Object.keys(net.recordRows);return keys.find(function(k){return net.recordRows[k].id===key})||key}
var previousLinkOpen=lnkOpen;
lnkOpen=function(key){return previousLinkOpen(localPublicKey(key))};
var previousLinkUrl=lnkURL;
lnkURL=function(id){var row=net.recordRows[id];return previousLinkUrl(row&&row.id||id)};
var previousLinkShare=lnkShare;
lnkShare=function(id){var row=net.recordRows[id];if(row&&row.kind==='need'){toast('Special Needs are private and cannot be shared.');return}return previousLinkShare(id)};
var previousLinkTry=lnkTry;
var publicTicket=0,previousPvClose=pvClose;pvClose=function(){publicTicket++;return previousPvClose()};
function showPublicSource(key){
 var ticket=++publicTicket;
 pv.innerHTML='<div class="bd"><h2>Loading listing…</h2></div>';pv._id=null;pv.classList.add('on');
 return bounded(client.rpc('birvoy_public_source',{p_key:key}),12000).then(function(response){
  if(ticket!==publicTicket)return;if(response.error)throw response.error;
  var row=Array.isArray(response.data)?response.data[0]:null;
  if(!row){pv.innerHTML='<div class="bd"><h2>Not available</h2><div class="sub">This listing is no longer available.</div><button type="button" class="go">Close</button></div>';pv._id=null;return}
  var labels={offer:'PERSONAL OFFER',business:'BUSINESS PAGE',professional:'PROFESSIONAL'},pics=Array.isArray(row.photos)?row.photos:[],tags=Array.isArray(row.services)?row.services:[],delivery=row.delivery||{},modes=[];
  if(delivery.visit)modes.push('Visit location');if(delivery.come)modes.push('Comes to you');if(delivery.remote)modes.push('Remote / online');
  var gallery=pics.length?'<div class="pv-gallery" aria-label="Listing photos">'+pics.map(function(img){return '<img src="'+esc(img)+'" alt="Listing photo" loading="lazy">' }).join('')+'</div>':'';
  var cover=row.profile_photo?'<img class="pv-portrait" alt="Profile photo" src="'+esc(row.profile_photo)+'">':'';
  pv.innerHTML='<div class="top"><span class="pb">PUBLIC SOURCE</span><button type="button" class="x" aria-label="Close">×</button></div>'+
    '<div class="bd">'+cover+'<div class="pb">'+esc(labels[row.kind]||'LISTING')+'</div><h2>'+esc(row.title)+'</h2>'+
    (row.expertise?'<div class="sub">'+esc(row.expertise)+'</div>':'')+
    (row.price!=null?'<div class="sub">KD '+esc(String(row.price))+(row.negotiable?' · Negotiable':'')+'</div>':'')+
    (row.condition?'<div class="sub">'+esc(row.condition)+'</div>':'')+
    '<p class="sub">'+esc(row.description||'')+'</p>'+
    (tags.length?'<h3>Services and skills</h3><div class="pv-tags">'+tags.map(function(x){return '<span>'+esc(x)+'</span>'}).join('')+'</div>':'')+
    (modes.length?'<h3>How they provide service</h3><div class="sub">'+esc(modes.join(' · '))+'</div>':'')+
    (gallery?'<h3>Photos</h3>'+gallery:'')+
    '<div class="note">Contact details are private. Connect through Birvoy.</div><button type="button" class="go">'+(net.user?'Open in Birvoy':'Log in to connect')+'</button>'+
    (!net.user?'<div class="note" style="margin-top:12px">Have your own Birvoy? Join Birvoy to connect.</div><button type="button" class="pv-join">Join Birvoy</button>':'')+'</div>';
  pv._id=row.id;pv.scrollTop=0;
 }).catch(function(){if(ticket!==publicTicket)return;pv._id=null;pv.innerHTML='<div class="bd"><h2>Couldn’t load this listing</h2><div class="sub">Check your connection and try opening the link again.</div><button type="button" class="go">Close</button></div>'});
}
pv.addEventListener('click',function(e){if(e.target.closest('.pv-join')){var id=pv._id;pvClose();if(id)PENDL=id;go('create')}});
pvShow=function(id){return showPublicSource((net.recordRows[id]||{}).id||id)};
lnkTry=function(){
 var m=/(?:^#|&)l=([^&]+)/.exec(location.hash);
 if(!m)return previousLinkTry();
 var key;try{key=decodeURIComponent(m[1])}catch(e){return}
 try{history.replaceState(null,'',location.href.split('#')[0])}catch(e){}
 if(net.user&&Object.keys(net.recordRows).length){PENDL=null;return lnkOpen(key)}
 return showPublicSource(key);
};

// Public build diagnostics contain no tokens or personal data.
window.BirvoyConnection={provider:'Supabase',ready:net.ready,status:function(){return{signedIn:!!net.user,loading:net.loading,syncing:net.saving}}};
})();


lnkTry();

})();

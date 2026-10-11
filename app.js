/**
 * ARSHIA TV v6 — Professional
 * Admin: Hadi_9707 / @Hadi1369
 */
(function(){
"use strict";

var ADMIN_USER = "Hadi_9707";
var ADMIN_PASS = "@Hadi1369";
var COLORS = ["#ef4444","#3b82f6","#22c55e","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#f97316","#14b8a6"];
var LOGO = {iranintl:"INTL",azadi:"آزادی",cheshmeh:"عقاب",dej:"دژ",gordafarid:"گرد",bbcpersian:"BBC",radiofarda:"فردا",voapersian:"VOA",simayeazadi:"آزادی",shorai:"شورا",mihan:"میهن",setareh:"ستاره",iranwire:"Wire",mellig:"ملی",kanaljadid:"جدید",zed:"ZED",iranefarda:"فردا",irannr:"NR",pleon:"لئون",pulse:"پالس",didgah:"دید",parstv:"پارس",pmc:"PMC",pmcroyale:"PR",rjtv:"RJ",avang:"آونگ",navahang:"نوا",sunmusic:"سان",t2tv:"T2",persiana_music:"PM",persiana_folk:"PF",persiana_nostalgia:"PN",persiana_rap:"PR",persiana_setmix:"SM",afn:"AFN",ifilmfa:"IF",ifilm2:"IF2",metafilm:"متا",fx:"FX",toonix:"تون",box247:"247",avafamily:"آوا",maahtv:"ماه",tapesh:"تپش",tintv:"TIN",arko:"آرکو",royal:"رویال",oxir:"اکسیر",novin:"نوین",ravi:"راوی",yourtime:"YT",mtc:"MTC",nettv:"نت",itn:"ITN",omideiran:"امید",asil:"اصیل",assirat:"سیرات",alwilayah:"ولایه",persiana_fight:"رزمی"};

var hls=null, cur=null, group="همه", rec=null, chunks=[], recording=false, deferred=null;

function $(id){return document.getElementById(id)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function short(c){return (c.logo&&c.logo.trim())||LOGO[c.id]||(c.name||"?").slice(0,3)}
function groups(){var s={};(window.CHANNELS||[]).forEach(function(c){if(c.group)s[c.group]=1});return ["همه"].concat(Object.keys(s))}

/* ---- Storage ---- */
function getUser(){try{return JSON.parse(localStorage.getItem("ar_user")||"null")}catch(e){return null}}
function setUser(u){if(u)localStorage.setItem("ar_user",JSON.stringify(u));else localStorage.removeItem("ar_user");updUser()}
function isAdmin(){var u=getUser();return u&&u.username===ADMIN_USER&&u.admin===true}
function getCfg(){try{return JSON.parse(localStorage.getItem("ar_cfg")||"{}")}catch(e){return {}}}
function setCfg(p){var c=getCfg();Object.keys(p).forEach(function(k){c[k]=p[k]});localStorage.setItem("ar_cfg",JSON.stringify(c))}
function getHidden(){return getCfg().hidden||{}}
function getLocked(){return getCfg().locked||{}}
function getCards(){return getCfg().cards||["6037-9912-3456-7890"]}
function getSub(){return !!getCfg().sub}

/* ---- UI helpers ---- */
function openM(id){var m=$(id);if(m)m.classList.add("on")}
function closeM(id){var m=$(id);if(m)m.classList.remove("on")}
function openDr(){$("drawer").classList.add("on");$("ov").classList.add("on")}
function closeDr(){$("drawer").classList.remove("on");$("ov").classList.remove("on")}
function setCover(t){var c=$("cover");if(!t){c.style.display="none";return}c.style.display="flex";$("coverTxt").textContent=t}

function updUser(){
  var u=getUser(), letter=$("userLetter"), dr=$("drUser"), adm=$("adminMenuItem");
  if(u){
    letter.textContent=(u.username||"?")[0].toUpperCase();
    dr.textContent=u.username+(u.email?" · "+u.email:"");
    if(isAdmin())adm.hidden=false; else adm.hidden=true;
  } else {
    letter.textContent="?";
    dr.textContent="وارد نشده‌اید";
    adm.hidden=true;
  }
  // auth modal state
  if(u){
    $("authForm").hidden=true;$("authLogged").hidden=false;
    $("authHead").textContent="حساب کاربری";
  } else {
    $("authForm").hidden=false;$("authLogged").hidden=true;
    $("authHead").textContent="ورود / ثبت‌نام";
  }
  // sub badge
  if(getSub()){
    $("subBadge").textContent="فعال";
    $("subBadge").style.background="#22c55e";
    $("btnActivateSub").textContent="اشتراک دارید ✓";
    $("btnActivateSub").disabled=true;
  }
}

/* ---- Collapsible blocks ---- */
function toggleBlock(name){
  var body=$("body"+name.charAt(0).toUpperCase()+name.slice(1));
  var btn=document.querySelector('.block-toggle[data-block="'+name+'"]');
  if(!body||!btn)return;
  var open=body.classList.contains("open");
  // close all
  qa(".block-body").forEach(function(b){b.classList.remove("open")});
  qa(".block-toggle").forEach(function(b){b.classList.remove("active")});
  if(!open){body.classList.add("open");btn.classList.add("active")}
}

/* ---- Channels ---- */
function visibleChannels(){
  var hidden=getHidden(), locked=getLocked();
  return (window.CHANNELS||[]).filter(function(c){
    if(hidden[c.id])return false;
    if(group!=="همه"&&c.group!==group)return false;
    return true;
  }).map(function(c){c._locked=!!locked[c.id];return c});
}

function renderTabs(){
  var bar=$("tabs"), gs=groups();
  bar.innerHTML=gs.map(function(g){return '<button class="tab'+(g===group?" on":"")+'" data-g="'+g+'">'+g+"</button>"}).join("");
  qa(".tab",bar).forEach(function(b){b.onclick=function(){group=b.getAttribute("data-g");renderTabs();renderGrid()}});
}

function renderGrid(){
  var box=$("grid"), list=visibleChannels();
  box.innerHTML=list.map(function(ch,i){
    var col=COLORS[i%COLORS.length];
    var on=cur&&cur.id===ch.id?" on":"";
    var lk=ch._locked?" locked":"";
    return '<div class="ch'+on+lk+'" data-id="'+ch.id+'"><div class="ch-logo" style="border-color:'+col+'">'+short(ch)+'</div><div class="ch-name">'+ch.name+"</div></div>";
  }).join("");
  qa(".ch",box).forEach(function(el){
    el.onclick=function(){
      if(el.classList.contains("locked"))return;
      var ch=(window.CHANNELS||[]).find(function(c){return c.id===el.getAttribute("data-id")});
      if(ch)selectCh(ch);
    };
  });
}

/* ---- Player ---- */
function selectCh(ch){
  cur=ch;$("chTitle").textContent=ch.name;renderGrid();
  var streams=(ch.streams||[]).filter(Boolean);
  if(!streams.length){setCover("لینک استریم تعریف نشده");return}
  playSeq(streams,0);buildEpg(ch);
}

function playSeq(streams,i){
  var v=$("vid");
  if(!streams||i>=streams.length){setCover("هیچ منبعی پاسخ نداد");return}
  var url=streams[i];setCover("اتصال به منبع "+(i+1)+"...");
  if(hls){try{hls.destroy()}catch(e){}hls=null}
  v.removeAttribute("src");try{v.load()}catch(e){}
  var isH=/\.m3u8|playlist|hls/i.test(url);
  if(window.Hls&&Hls.isSupported()&&isH){
    hls=new Hls({enableWorker:true,maxBufferLength:24,manifestLoadingTimeOut:12000,fragLoadingTimeOut:15000});
    hls.loadSource(url);hls.attachMedia(v);
    hls.on(Hls.Events.MANIFEST_PARSED,function(){setCover("");v.play().catch(function(){setCover("یکبار روی تصویر بزنید")})});
    hls.on(Hls.Events.ERROR,function(e,d){if(d.fatal){try{hls.destroy()}catch(x){}hls=null;playSeq(streams,i+1)}});
  } else {
    v.src=url;v.load();
    v.play().then(function(){setCover("")}).catch(function(){playSeq(streams,i+1)});
  }
}

function buildEpg(ch){
  $("epgName").textContent=ch.name;
  var now=new Date(),h=now.getHours(),slots=[];
  for(var i=-1;i<5;i++){
    var hh=(h+i+24)%24;
    var st=(hh<10?"0":"")+hh+":00";
    var en=(((hh+1)%24)<10?"0":"")+((hh+1)%24)+":00";
    var titles=["پخش زنده "+ch.name,"اخبار و گزارش","میان‌برنامه","ویژه برنامه","پخش مستقیم","بازپخش"];
    slots.push({t:st+" – "+en,n:titles[(hh+i+6)%titles.length],now:i===0});
  }
  $("epgBody").innerHTML=slots.map(function(s){return '<div class="epg-row'+(s.now?" now":"")+'"><span class="epg-t">'+s.t+'</span><span class="epg-n">'+s.n+(s.now?" ● الان":"")+"</span></div>"}).join("");
}

/* ---- Archive demo ---- */
function renderArch(){
  var items=[{t:"اخبار بامدادی",d:"۰۸:۵۸",v:"۱۱ هزار"},{t:"گزارش ورزشی",d:"۰۴:۲۸",v:"۷.۴ هزار"},{t:"ویژه برنامه",d:"۱۲:۱۰",v:"۵ هزار"},{t:"گفت‌وگو",d:"۰۶:۱۵",v:"۳ هزار"}];
  $("archRow").innerHTML=items.map(function(x){return '<div class="arch-item"><div class="arch-th"><i class="fa-solid fa-play"></i><span>'+x.d+'</span></div><div class="arch-info"><h4>'+x.t+"</h4><p>"+x.v+" بازدید</p></div></div>"}).join("");
}

/* ---- Search ---- */
function doSearch(q){
  q=(q||"").trim().toLowerCase();
  var box=$("sRes");
  if(!q){box.innerHTML="";return}
  var hits=(window.CHANNELS||[]).filter(function(c){return (c.name||"").toLowerCase().indexOf(q)>=0||(c.group||"").toLowerCase().indexOf(q)>=0||(c.id||"").toLowerCase().indexOf(q)>=0});
  box.innerHTML=hits.slice(0,40).map(function(c){return '<div class="sitem" data-id="'+c.id+'">'+c.name+' <span>('+c.group+")</span></div>"}).join("")||'<div class="sitem">نتیجه‌ای یافت نشد</div>';
  qa(".sitem[data-id]",box).forEach(function(el){el.onclick=function(){var ch=(window.CHANNELS||[]).find(function(c){return c.id===el.getAttribute("data-id")});if(ch){closeM("mSearch");selectCh(ch);$("page").scrollTop=0}}});
}

/* ---- Record ---- */
function toggleRec(){
  var v=$("vid"),btn=$("btnRec");
  if(!recording){
    try{
      var s=v.captureStream?v.captureStream():(v.mozCaptureStream&&v.mozCaptureStream());
      if(!s){alert("ضبط در این دستگاه پشتیبانی نمی‌شود");return}
      chunks=[];rec=new MediaRecorder(s,{mimeType:"video/webm;codecs=vp8,opus"});
      rec.ondataavailable=function(e){if(e.data.size)chunks.push(e.data)};
      rec.onstop=function(){var b=new Blob(chunks,{type:"video/webm"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="arshia-"+Date.now()+".webm";a.click()};
      rec.start(1000);recording=true;btn.classList.add("rec");
    }catch(e){alert("ضبط در دسترس نیست")}
  } else {
    if(rec&&rec.state!=="inactive")rec.stop();recording=false;btn.classList.remove("rec");
  }
}

/* ---- Share / Install ---- */
function share(){
  var url=location.href.split("?")[0],d={title:"ARSHIA TV",text:"پخش زنده ارشیا تی‌وی",url:url};
  if(navigator.share)navigator.share(d).catch(function(){});
  else if(navigator.clipboard)navigator.clipboard.writeText(url).then(function(){alert("لینک کپی شد")});
  else prompt("کپی:",url);
}
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();deferred=e});
function tryInst(){if(deferred){deferred.prompt();deferred.userChoice.then(function(){deferred=null})}else openM("mInstall")}

/* ---- Donate cards ---- */
function renderCards(){
  var list=getCards(),box=$("cardsList");
  box.innerHTML=list.map(function(c,i){return '<div class="card-row"><span>'+c+'</span><button data-i="'+i+'">کپی</button></div>'}).join("")||'<p class="mdesc">کارتی ثبت نشده</p>';
  qa("button[data-i]",box).forEach(function(b){b.onclick=function(){var t=list[+b.getAttribute("data-i")];if(navigator.clipboard)navigator.clipboard.writeText(t.replace(/-/g,"")).then(function(){alert("کپی شد")});else prompt("کپی:",t)}});
}

/* ---- Admin panel ---- */
function renderAdmin(){
  var box=$("admBody");
  if(!isAdmin()){box.innerHTML='<p class="mdesc">دسترسی ندارید.</p>';return}
  var hidden=getHidden(),locked=getLocked(),cards=getCards();
  var html='<div class="adm-sec"><h4>کارت‌های بانکی</h4>';
  cards.forEach(function(c,i){html+='<div class="card-row"><span>'+c+'</span><button class="adm-del-card" data-i="'+i+'">حذف</button></div>'});
  html+='<input class="minp" id="newCard" placeholder="شماره کارت جدید" dir="ltr"><button class="btn-red" id="addCard">افزودن کارت</button></div>';
  html+='<div class="adm-sec"><h4>مدیریت شبکه‌ها (قفل / مخفی)</h4>';
  (window.CHANNELS||[]).forEach(function(ch){
    var lk=locked[ch.id],hd=hidden[ch.id];
    html+='<div class="adm-ch"><span>'+ch.name+'</span>'+
      '<button class="'+(lk?"off":"on")+'" data-act="lock" data-id="'+ch.id+'">'+(lk?"قفل":"باز")+"</button>"+
      '<button class="'+(hd?"off":"on")+'" data-act="hide" data-id="'+ch.id+'">'+(hd?"مخفی":"نمایش")+"</button></div>";
  });
  html+="</div>";
  html+='<div class="adm-sec"><h4>تنظیمات</h4><button class="btn-dark" id="admLogout">خروج از حساب مدیر</button></div>';
  box.innerHTML=html;

  $("addCard").onclick=function(){
    var v=$("newCard").value.trim();if(!v)return;
    var cs=getCards();cs.push(v);setCfg({cards:cs});renderAdmin();renderCards();
  };
  qa(".adm-del-card",box).forEach(function(b){b.onclick=function(){var cs=getCards();cs.splice(+b.getAttribute("data-i"),1);setCfg({cards:cs});renderAdmin();renderCards()}});
  qa("[data-act]",box).forEach(function(b){
    b.onclick=function(){
      var id=b.getAttribute("data-id"),act=b.getAttribute("data-act");
      if(act==="lock"){var L=getLocked();L[id]=!L[id];if(!L[id])delete L[id];setCfg({locked:L})}
      if(act==="hide"){var H=getHidden();H[id]=!H[id];if(!H[id])delete H[id];setCfg({hidden:H})}
      renderAdmin();renderGrid();
    };
  });
  $("admLogout").onclick=function(){setUser(null);closeM("mAdmin");alert("خارج شدید")};
}

/* ---- Auth ---- */
function doAuth(){
  var user=$("aUser").value.trim(), email=$("aEmail").value.trim(), phone=$("aPhone").value.trim(), pass=$("aPass").value;
  if(!/^[A-Za-z0-9_\.]{3,20}$/.test(user)){alert("نام کاربری باید انگلیسی باشد (۳ تا ۲۰ کاراکتر)");return}
  if(!email||email.indexOf("@")<0){alert("ایمیل معتبر وارد کنید");return}
  if(!phone||phone.length<10){alert("شماره موبایل وارد کنید");return}
  if(!pass||pass.length<4){alert("رمز حداقل ۴ کاراکتر");return}
  var isAdm=(user===ADMIN_USER&&pass===ADMIN_PASS);
  setUser({username:user,email:email,phone:phone,password:pass,admin:isAdm});
  closeM("mAuth");
  if(isAdm)alert("ورود مدیر موفق"); else alert("ورود موفق");
}

/* ---- Bind ---- */
function bind(){
  $("btnMenu").onclick=openDr;
  $("btnCloseDr").onclick=closeDr;
  $("ov").onclick=closeDr;
  $("btnUser").onclick=function(){openM("mAuth")};
  $("btnSearch").onclick=function(){openM("mSearch");$("sInp").focus()};
  $("btnEpg").onclick=function(){var b=$("epgBox");b.hidden=!b.hidden};
  $("btnFs").onclick=function(){
    var v=$("vid");
    document.body.classList.add("fs-mode");
    if(v.requestFullscreen)v.requestFullscreen();
    else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen();
  };
  document.addEventListener("fullscreenchange",function(){if(!document.fullscreenElement)document.body.classList.remove("fs-mode")});
  $("btnRec").onclick=toggleRec;
  $("fabDonate").onclick=function(){renderCards();openM("mDonate")};
  $("fabSub").onclick=function(){toggleBlock("sub");$("page").scrollTop=9999};
  $("btnActivateSub").onclick=function(){setCfg({sub:true});updUser();alert("اشتراک رایگان فعال شد")};
  $("btnInst").onclick=tryInst;
  $("sInp").oninput=function(){doSearch(this.value)};

  // blocks
  qa(".block-toggle").forEach(function(b){b.onclick=function(){toggleBlock(b.getAttribute("data-block"))}});

  // drawer
  qa(".dr-list li").forEach(function(li){
    li.onclick=function(){
      var a=li.getAttribute("data-a");closeDr();
      if(a==="account")openM("mAuth");
      else if(a==="donate"){renderCards();openM("mDonate")}
      else if(a==="sub"){toggleBlock("sub");$("page").scrollTop=9999}
      else if(a==="install")tryInst();
      else if(a==="share")share();
      else if(a==="archive")toggleBlock("archive");
      else if(a==="admin"){if(isAdmin()){renderAdmin();openM("mAdmin")}else alert("فقط مدیر")}
      else if(a==="rules")openM("mRules");
    };
  });

  // bottom nav
  qa(".bn").forEach(function(b){
    b.onclick=function(){
      qa(".bn").forEach(function(x){x.classList.remove("active")});b.classList.add("active");
      var p=b.getAttribute("data-p");
      if(p==="home")$("page").scrollTop=0;
      else if(p==="live"){toggleBlock("channels");$("page").scrollTop=0}
      else if(p==="arch")toggleBlock("archive");
      else if(p==="search"){openM("mSearch");$("sInp").focus()}
      else if(p==="menu")openDr();
    };
  });

  // close modals
  qa("[data-x]").forEach(function(b){b.onclick=function(){closeM(b.getAttribute("data-x"))}});

  // auth
  $("btnAuthGo").onclick=doAuth;
  $("btnLogout").onclick=function(){setUser(null);closeM("mAuth")};
  $("btnDelAcc").onclick=function(){if(confirm("حساب حذف شود؟")){setUser(null);closeM("mAuth")}};
  $("btnEditInfo").onclick=function(){
    $("authForm").hidden=false;$("authLogged").hidden=true;
    var u=getUser();if(u){$("aUser").value=u.username;$("aEmail").value=u.email||"";$("aPhone").value=u.phone||""}
  };
}

document.addEventListener("DOMContentLoaded",function(){
  updUser();renderTabs();renderGrid();renderArch();bind();setCover("شبکه را انتخاب کنید");
});
})();

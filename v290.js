<script id="voicejs282">(function(){
function note(t){var e=document.getElementById("mgvT");if(!e){e=document.createElement("div");e.id="mgvT";e.style.cssText="position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#173252;color:#fff;padding:10px 16px;border-radius:14px;font:14px system-ui;z-index:125000;box-shadow:0 4px 24px #0003;max-width:86%;text-align:center";document.body.appendChild(e)}e.textContent=t;clearTimeout(e._t);e._t=setTimeout(function(){e.remove()},4500)}
var HOLD={"bba-vec-5":1,"bba-acc2-1":1,"bba-tax-15":1,"l2-econ-1":1};
var MODMSG="This module's recording is not available. The full notes are here, and Roop can explain anything in chat.";
var CHAPMSG="This chapter's recording is not available. The full chapter is here to read, and Roop can explain it in chat.";
var GERMSG="This German recording is not available yet. The text is here to read, and Roop can explain it in chat.";
var MG_READY={"a1u1-ls1.mp3":1,"a1u1-ls2.mp3":1,"a1u1-ls3.mp3":1,"a1u1-ls4.mp3":1,"a1u1-ls5.mp3":1,"a1u1-ls6.mp3":1,"a1u1-ls7.mp3":1,"a1u1-v01.mp3":1,"a1u1-v02.mp3":1,"a1u1-v03.mp3":1,"a1u1-v04.mp3":1,"a1u1-v05.mp3":1,"a1u1-v06.mp3":1,"a1u1-v07.mp3":1,"a1u1-v08.mp3":1,"a1u1-v09.mp3":1,"a1u1-v10.mp3":1,"a1u1-v11.mp3":1,"a1u1-v12.mp3":1,"a1u1-x01.mp3":1,"a1u1-x02.mp3":1,"a1u1-x03.mp3":1,"a1u1-x04.mp3":1,"a1u1-x05.mp3":1,"a1u1-x06.mp3":1,"a1u1-x07.mp3":1,"a1u1-x08.mp3":1,"a1u1-x10.mp3":1,"a1u1-x11.mp3":1,"de-a1-basics-1.mp3":1,"de-a1-basics-2-ex.mp3":1,"de-a1-basics-2.mp3":1,"de-a1-basics-3.mp3":1,"de-a1-basics-4.mp3":1,"de-a1-basics-5-ex.mp3":1,"de-a1-basics-5.mp3":1,"de-a1-basics-6.mp3":1,"fare-day.mp3":1,"fare-night.mp3":1,"greet-afternoon-de.mp3":1,"greet-afternoon-en.mp3":1,"greet-evening-de.mp3":1,"greet-evening-en.mp3":1,"greet-morning-de.mp3":1,"greet-morning-en.mp3":1,"greet-night-de.mp3":1,"greet-night-en.mp3":1,"tut-chip-1.mp3":1,"tut-chip-2.mp3":1,"tut-chip-3.mp3":1,"tut-limit.mp3":1,"tut-offline.mp3":1,"welcome-de.mp3":1,"welcome-en.mp3":1};
var MG_GERRE=/^(a1u|a2u|b1u|b2u|c1u|dlg-|gq-|de-|alphabet-|greet-\w+-de|welcome-de|fare-)/;
var MG_TUTRE=/^(tut-offline|tut-limit|tut-chip-|tut-greet|greet-\w+-en|welcome-en)/;
var GENMSG="This voice message is being re-recorded with the new voice. It will be back soon.";
function mgGerBlocked(files){for(var i=0;i<files.length;i++){var f=files[i];if(f&&(MG_GERRE.test(f)||MG_TUTRE.test(f))&&!MG_READY[f])return MG_GERRE.test(f)?"de":"gen"}return false}

var PILOT_OK={"ethics-2":1,"ethics-3":1,"ethics-4":1,"ethics-5":1,"ethics-6":1,"ethics-7":1,"ethics-8":1,"ethics-9":1,"ethics-10":1,"quant-1":1,"quant-2":1,"quant-3":1,"quant-4":1,"quant-5":1,"quant-6":1,"quant-7":1,"quant-8":1,"quant-9":1,"quant-10":1,"quant-11":1,"econ-1":1,"econ-2":1,"econ-3":1,"econ-4":1,"econ-5":1};
var _lastUserScroll=0;try{["pointerdown","touchstart","wheel"].forEach(function(ev){document.addEventListener(ev,function(){_lastUserScroll=Date.now()},{passive:true,capture:true})})}catch(e){}
/* read-along: same machinery as the chapter reader - paragraph granularity, char-share of the narration, approximate */
function norm(s){return String(s||"").replace(/\s+/g," ").trim()}
function css281(){if(document.getElementById("mgFollowCss"))return;var css=document.createElement("style");css.id="mgFollowCss";css.textContent=".mgFollow::before{content:'Following along (approximate)';display:block;font:600 11px system-ui;color:#2f6bff;margin:0 0 4px}.mgFollow{background:rgba(47,107,255,.12)!important;border-radius:10px;box-shadow:0 0 0 6px rgba(47,107,255,.12);transition:background .2s,box-shadow .2s}";document.head.appendChild(css)}
var FOL=null;
function stopFollow(){if(FOL&&FOL.t)clearInterval(FOL.t);FOL=null;try{document.querySelectorAll(".mgFollow").forEach(function(e){e.classList.remove("mgFollow")})}catch(e){}}
function startFollow(mid){stopFollow();css281();
 var box=document.querySelector("#m-"+mid+" .module-body");if(!box)return;
 var ps=[].slice.call(box.querySelectorAll("p"));if(!ps.length)return;
 var kp=box.querySelector(".keypoint");
 var items=ps.map(function(p){return{el:p,t:norm(p.textContent)}});
 if(kp)items.push({el:kp,t:norm(kp.textContent).replace(/^\uD83D\uDCA1\s*/,"")});
 /* narration layout: title + ". " + paragraphs joined by space + " Key point. " + key */
 var headEl=document.querySelector("#m-"+mid+" .mh")||document.querySelector("#m-"+mid+" h3")||document.querySelector("#m-"+mid+" .module-head");
 var head=headEl?norm(headEl.textContent).length+2:60;
 var total=head;items.forEach(function(it){total+=it.t.length+1});
 var cum=[],a=head;
 items.forEach(function(it){cum.push([a/total,(a+it.t.length)/total]);a+=it.t.length+1});
 var st={idx:-1};
 FOL={t:setInterval(function(){
   var a2=(typeof PLAYER!=="undefined"&&PLAYER)?PLAYER.a:null;
   if(!a2||a2.ended||!document.contains(items[0].el)){stopFollow();return}
   if(a2.paused||!isFinite(a2.duration)||a2.duration<=0)return;
   var f=a2.currentTime/a2.duration,idx=-1;
   for(var i=0;i<cum.length;i++){if(f>=cum[i][0]&&f<cum[i][1]){idx=i;break}}
   if(idx<0&&f>=cum[cum.length-1][1])idx=cum.length-1;
   if(idx===st.idx)return;st.idx=idx;
   document.querySelectorAll(".mgFollow").forEach(function(e){e.classList.remove("mgFollow")});
   if(idx<0)return;var el=items[idx].el;el.classList.add("mgFollow");
   try{var r=el.getBoundingClientRect();var vh=window.innerHeight||800;
    if((r.top<70||r.bottom>vh-120)&&(Date.now()-_lastUserScroll>4000)){el.scrollIntoView({behavior:"smooth",block:"center"})}}catch(e){}
 },300)}}
function playModule(mid){var k="cfa-"+mid;
 var f=(typeof AUDIO_MANIFEST!=="undefined"&&AUDIO_MANIFEST[k])?AUDIO_MANIFEST[k]:(k+".mp3");
 var p=(typeof PACK_OF!=="undefined")?PACK_OF[f]:null;
 if(!f||!p||typeof PLAYER==="undefined"||!PLAYER||typeof PLAYER.start!=="function"){note(MODMSG);return}
 var go=function(){if(window.AUDIO_MAP&&window.AUDIO_MAP[f]){
   try{if(window.MG_WEB_AUDIO)MG_WEB_AUDIO.unlock()}catch(e){}
   PLAYER.start("cfamod-"+mid,[k],"CFA Level I - Ethics",function(){note(MODMSG);stopFollow()});
   startFollow(mid);
  }else{note(MODMSG)}};
 if(window.AUDIO_MAP&&window.AUDIO_MAP[f]){go()}
 else if(typeof loadPack==="function"){try{Promise.all([loadPack(p)]).then(go,function(){note(MODMSG)})}catch(e){note(MODMSG)}}
 else{note(MODMSG)}}
function arm(){var a=false,b=false,c=false,d=false;
 if(typeof playClips==="function"&&!playClips.__v288){var opc288=playClips;playClips=function(keys,fallback){var fs288;try{fs288=(typeof AUDIO_MANIFEST!=="undefined")?keys.map(function(k){return AUDIO_MANIFEST[k]}):keys;var gb288=mgGerBlocked(fs288);if(gb288){note(gb288==="de"?GERMSG:GENMSG);return}}catch(e){}return opc288.apply(this,arguments)};playClips.__v288=1}
 
 if(typeof xbListen==="function"&&!xbListen.__v276){var ox=xbListen;xbListen=function(mid){if(HOLD[mid]){note(CHAPMSG);return}return ox.apply(this,arguments)};xbListen.__v276=1;a=true}else if(typeof xbListen==="function")a=true;
 if(typeof listenModule==="function"&&!listenModule.__v282){listenModule=function(mid,tid){if(!PILOT_OK[mid]){note(MODMSG);return}playModule(mid)};listenModule.__v282=1;listenModule.__v279=1;listenModule.__v278=1;b=true}else if(typeof listenModule==="function")b=true;
 if(typeof listenModuleTTS==="function"&&!listenModuleTTS.__v282){listenModuleTTS=function(mid,tid,idx){if(!PILOT_OK[mid]){note(MODMSG);return}playModule(mid)};listenModuleTTS.__v282=1;c=true}else if(typeof listenModuleTTS==="function")c=true;
 if(typeof SpeechSynthesis!=="undefined"&&!SpeechSynthesis.prototype.speak.__v282){var osp=SpeechSynthesis.prototype.speak;SpeechSynthesis.prototype.speak=function(u){try{if(u&&/^de/i.test(u.lang||"")){note(GERMSG);return}}catch(e){}return osp.apply(this,arguments)};SpeechSynthesis.prototype.speak.__v282=1;d=true}else if(typeof SpeechSynthesis!=="undefined")d=true;
 return a&&b&&c&&d}
setInterval(arm,400);arm();
})();
</script>
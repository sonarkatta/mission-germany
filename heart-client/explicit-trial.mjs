// Safety pause after observed phone initialization crash. No engine/model start route.
export function prepareHeartTrial({document,getOwner,allowed,subscribeOwner,getTopics,moduleId,loadReader=()=>import('./trial-reader.mjs'),gpu=navigator.gpu,loadEngine=()=>import('./start-gated-engine.mjs').then(m=>m.prepareGatedEngine({getOwner,allowed}))}){
 if(typeof subscribeOwner!=='function'||!allowed()||!getOwner())throw Error('Unlocked owner session required');
 const uid=getOwner(),source=document.querySelector('#view #m-'+CSS.escape(moduleId));if(!source)throw Error('Visible module required');
 if(document.querySelector('[data-heart-trial]'))throw Error('Trial already open');
 const panel=document.createElement('div');panel.dataset.heartTrial='1';const message=document.createElement('p');message.setAttribute('role','status');message.textContent='Heart phone trial is temporarily unavailable after a phone browser crashed during initialization. Do not retry the download. Normal lessons and existing audio are unchanged. No files or saved progress have been deleted.';
 const start=document.createElement('button');start.type='button';start.className='btn';start.style.cssText='display:block;width:100%;margin:12px 0;white-space:normal';start.textContent='Heart trial unavailable';start.disabled=true;const cancel=document.createElement('button');cancel.type='button';cancel.className='btn';cancel.style.cssText='display:block;width:100%;margin:12px 0';cancel.textContent='Cancel';panel.append(message,start,cancel);source.prepend(panel);
 let disposed=false,epoch=0,reader,un,starting=false,loader,controller;const valid=()=>!disposed&&uid===getOwner()&&allowed()&&source.isConnected;
 function close(){if(disposed)return;disposed=true;epoch++;controller?.abort();loader?.terminate();reader?.dispose();panel.remove();un?.();observer.disconnect();document.removeEventListener('visibilitychange',hide);window.removeEventListener('pagehide',close)}
 const observer=new MutationObserver(()=>{if(!valid())close()});observer.observe(document.getElementById('app'),{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']});un=subscribeOwner(()=>{if(!valid())close()});const hide=()=>{if(document.hidden)close()};document.addEventListener('visibilitychange',hide);window.addEventListener('pagehide',close);cancel.onclick=close;
 return{close};
}

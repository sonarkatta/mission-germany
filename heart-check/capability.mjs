// Private capability check only. Does not import the speech engine or fetch model assets.
export function installHeartCapability({document,getOwner,allowed,subscribeOwner,gpu=navigator.gpu}){
 if(typeof subscribeOwner!=='function')throw Error('Auth subscription required');
 if(window.__heartCapabilityMount)throw Error('Capability check already mounted');
 let epoch=0,disposed=false,active=null;
 function clear(){epoch++;active?.status.remove();active=null}
 async function click(event){const button=event.target.closest('button'),source=button?.closest('.module');if(!source?.id?.startsWith('m-')||button!==source.querySelector('.module-body button'))return;
 event.preventDefault();event.stopImmediatePropagation();clear();if(!allowed()||!getOwner())return;
 const a={uid:getOwner(),epoch,source,status:document.createElement('p')};active=a;a.status.dataset.heartCapability='1';a.status.setAttribute('role','status');a.status.textContent='Checking local graphics support. No voice model is being downloaded.';source.prepend(a.status);
 const valid=()=>!disposed&&active===a&&epoch===a.epoch&&getOwner()===a.uid&&allowed()&&source.isConnected;
 let timer;try{const adapter=await Promise.race([gpu?.requestAdapter({powerPreference:'low-power'})??Promise.resolve(null),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('timeout')),8000)})]);if(!valid())return;a.status.textContent=adapter?'Local graphics support is available. Heart has not been loaded or tested on this phone. The next voice trial needs a separate download of about 350 MB.':'Local graphics support is unavailable in this browser. No model was downloaded and no other voice was used.';}catch{if(valid())a.status.textContent='The graphics check did not finish. No model was downloaded and no other voice was used.'}finally{clearTimeout(timer)}}
 window.addEventListener('click',click,true);const un=subscribeOwner(clear);const observer=new MutationObserver(()=>{if(active&&(!active.source.isConnected||!allowed()||active.uid!==getOwner()))clear()});observer.observe(document.getElementById('app'),{subtree:true,childList:true,attributes:true,attributeFilter:['class','hidden']});const hide=()=>{if(document.hidden)clear()};document.addEventListener('visibilitychange',hide);window.addEventListener('pagehide',clear);
 const mount={dispose(){disposed=true;clear();un?.();observer.disconnect();window.removeEventListener('click',click,true);document.removeEventListener('visibilitychange',hide);window.removeEventListener('pagehide',clear);if(window.__heartCapabilityMount===mount)delete window.__heartCapabilityMount}};window.__heartCapabilityMount=mount;return mount;
}

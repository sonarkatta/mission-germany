// Must be called fresh on EVERY explicit Start, never on notice mount.
// Filled with the actual returned+verified deployment origin ONLY after approval.
export const GATEWAY_ORIGIN='https://arya-heart-assets-isolated.sonarkatta.workers.dev';
export async function prepareGatedEngine({getOwner,allowed,gateway=GATEWAY_ORIGIN,fetcher=fetch,importer=u=>import(u)}){
 const uid=getOwner();if(!uid||!allowed())throw Error('Unlocked owner session required');
 if(!gateway||new URL(gateway).protocol!=='https:')throw Error('Private Heart distribution is not activated');
 const user=window.firebase?.auth().currentUser;if(!user||user.uid!==uid)throw Error('Owner session changed');
 let token=await user.getIdToken();if(getOwner()!==uid||!allowed())throw Error('Owner session changed');
 let r;try{r=await fetcher(new URL('/session',gateway),{method:'POST',headers:{Authorization:'Bearer '+token},cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(8000)})}finally{token=null}
 if(!r.ok)throw Error('Private Heart access unavailable. Prepare again to try a fresh session.');
 const j=await r.json(),prefix=new URL(j.prefix),target=new URL(gateway);
 if(prefix.origin!==target.origin||!/^\/s\/\d{10}\.[0-9a-f]{32}\.[0-9a-f]{64}\/heart-official\/$/.test(prefix.pathname)||prefix.search||prefix.hash||j.expires<=Date.now()/1000)throw Error('Invalid Heart asset session');
 if(getOwner()!==uid||!allowed())throw Error('Owner session changed');
 const engine=await importer(new URL('load-engine.mjs',prefix).href);
 if(getOwner()!==uid||!allowed())throw Error('Owner session changed');
 return {loadHeartEngine:options=>{if(getOwner()!==uid||!allowed())throw Error('Owner session changed');return engine.loadHeartEngine({...options,workerUrl:new URL('worker.mjs',prefix)})}};
}

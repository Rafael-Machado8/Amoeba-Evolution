(() => {
'use strict';
const KEY='amoeba-evolution-v3',BACKUP=KEY+'-backup';
function read(k){try{return localStorage.getItem(k);}catch{return null;}}
function load(){
 let recovered=false;
 for(const key of [KEY,BACKUP,'amoeba-evolution-v2']){
  const raw=read(key);if(!raw)continue;
  try{return{game:Evolution.cleanGame(JSON.parse(raw)),recovered:key===BACKUP,available:true};}catch{recovered=true;}
 }
 const game=Evolution.freshGame();
 const legacy=['amoebas','peixes','terrestre','ceu'];
 legacy.forEach((name,i)=>{try{const old=JSON.parse(read('gameState_'+name));if(!old)return;game.worlds[i]=Evolution.clean({coins:old.coins,creatures:old.amoebas?.map(c=>({level:c.level,x:c.x/1280,y:c.y/720})),discovered:old.discoveredLevels});game.tutorial=true;}catch{}});
 for(let i=0;i<3;i++)if(game.worlds[i].best>=EvolutionContent.biomes[i].unlock||read(['nivel_peixes_desbloqueado','nivel_terrestre_desbloqueado','nivel_ceu_desbloqueado'][i])==='true')game.unlocked=Math.max(game.unlocked,i+1);
 return{game,recovered,available:true};
}
function save(game,checkpoint=false){
 try{const text=JSON.stringify(game);if(checkpoint){const old=read(KEY);if(old){try{Evolution.cleanGame(JSON.parse(old));localStorage.setItem(BACKUP,old);}catch{}}}localStorage.setItem(KEY,text);return true;}catch{return false;}
}
window.EvolutionStorage={key:KEY,backup:BACKUP,read,load,save};
})();

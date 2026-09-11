(function(root){
'use strict';
const C=typeof module!=='undefined'?require('./content.js'):root.EvolutionContent;
const clamp=(n,min,max)=>Math.max(min,Math.min(max,Number.isFinite(Number(n))?Number(n):min));
const int=(n,min,max)=>Math.floor(clamp(n,min,max));
const fresh=()=>({coins:45,best:1,merges:0,pulses:0,charge:0,combo:0,comboLeft:0,maxCombo:0,spawn:0,played:0,mission:0,upgrades:[0,0,0],creatures:[1,1,1,1].map((level,i)=>({level,x:.3+(i%2)*.36,y:.34+Math.floor(i/2)*.3})),discovered:[1]});
function clean(value){
 if(!value||typeof value!=='object'||Array.isArray(value))return fresh();
 const s=fresh();
 for(const k of ['coins','merges','pulses','played'])s[k]=clamp(value[k],0,1e12);
 s.best=int(value.best,1,C.maxLevel);s.charge=clamp(value.charge,0,100);
 s.maxCombo=int(value.maxCombo,0,10);s.spawn=clamp(value.spawn,0,8);s.mission=int(value.mission,0,C.missions.length);
 s.upgrades=C.upgrades.map((u,i)=>int(value.upgrades?.[i],0,u.max));
 if(Array.isArray(value.creatures))s.creatures=value.creatures.filter(c=>c&&typeof c==='object').slice(0,32).map(c=>({level:int(c.level,1,C.maxLevel),x:clamp(c.x,.1,.9),y:clamp(c.y,.16,.82)}));
 s.discovered=[...new Set([1,...(Array.isArray(value.discovered)?value.discovered:[]),...s.creatures.map(c=>c.level)])].filter(n=>Number.isInteger(n)&&n>=1&&n<=C.maxLevel).sort((a,b)=>a-b);
 s.best=Math.max(s.best,...s.discovered);return s;
}
const freshGame=()=>({version:3,active:0,unlocked:0,worlds:C.biomes.map(fresh),cycles:0,archive:C.biomes.map(()=>[]),medals:[],tutorial:false,completed:false,savedAt:Date.now(),settings:{sound:true,music:false,volume:.4,motion:true,quality:'high'}});
function cleanGame(data){
 if(![2,3].includes(data?.version)||!Array.isArray(data.worlds)||![4,8].includes(data.worlds.length))throw new Error('Formato de progresso incompatível.');
 const g=freshGame();g.worlds=C.biomes.map((_,i)=>clean(data.worlds[i]));g.unlocked=int(data.unlocked,0,7);
 for(let i=0;i<=g.unlocked&&i<7;i++)if(g.worlds[i].best>=C.biomes[i].unlock)g.unlocked=Math.max(g.unlocked,i+1);
 g.active=int(data.active,0,g.unlocked);g.cycles=int(data.cycles,0,100);g.completed=data.completed===true;
 g.archive=C.biomes.map((_,i)=>Array.isArray(data.archive?.[i])?[...new Set(data.archive[i])].filter(n=>Number.isInteger(n)&&n>0&&n<=20):[]);
 g.medals=Array.isArray(data.medals)?data.medals.filter(v=>typeof v==='string'&&v.length<40).slice(0,30):[];
 g.tutorial=data.tutorial===true||data.version===2;g.savedAt=data.savedAt?clamp(data.savedAt,0,Date.now()):Date.now();
 if(data.settings)g.settings={sound:data.settings.sound===true,music:data.settings.music===true,volume:clamp(data.settings.volume,0,1),motion:data.settings.motion!==false,quality:data.settings.quality==='low'?'low':'high'};
 else if(data.version===2)g.settings.sound=data.sound===true;
 return g;
}
const startLevel=(s,biome=0)=>Math.max(1,Math.min(Math.max(1,s.best-2+(biome===5?1:0)),Math.max(1,s.best-6)+s.upgrades[2]+(biome===5?1:0)));
const income=(s,biome=0,cycles=0)=>s.creatures.reduce((n,c)=>n+2**(c.level-1),0)*(1+s.upgrades[0]*.35)*(biome===2?1.25:1)*(1+cycles*.25);
const price=(s,biome=0)=>Math.round(18*2**(startLevel(s,biome)-1));
const upgradePrice=(s,i)=>Math.round(C.upgrades[i].base*(i===2?4:2.35)**s.upgrades[i]);
const interval=(s,biome=0)=>Math.max(1.5,7*.86**s.upgrades[1]*(biome===3?.8:1));
function pair(s){for(let i=0;i<s.creatures.length;i++){const a=s.creatures[i];if(a.level>=C.maxLevel)continue;const b=s.creatures.slice(i+1).find(c=>c.level===a.level);if(b)return[a,b];}return null;}
function merge(s,a,b,biome=0,fromPulse=false){
 if(a===b||!a||!b||!s.creatures.includes(a)||!s.creatures.includes(b)||a.level!==b.level||a.level>=C.maxLevel)return false;
 const c={level:a.level+1,x:b.x,y:b.y};const discovery=!s.discovered.includes(c.level);
 s.creatures=s.creatures.filter(v=>v!==a&&v!==b);s.creatures.push(c);
 s.combo=s.comboLeft>0?Math.min(10,s.combo+1):1;s.comboLeft=biome===1?8:5;s.maxCombo=Math.max(s.maxCombo,s.combo);
 const reward=Math.round(8*2**(c.level-1)*(1+(s.combo-1)*.1)*(biome===6?2:1));
 s.merges++;s.coins=Math.min(1e12,s.coins+reward);s.best=Math.max(s.best,c.level);
 if(!fromPulse)s.charge=Math.min(100,s.charge+(biome===4?12.5:10));
 if(discovery)s.discovered.push(c.level);
 return{creature:c,discovery,reward};
}
function add(s,biome=0,paid=false,random=Math.random){
 const cost=price(s,biome);if(s.creatures.length>=C.capacity||(paid&&s.coins<cost))return false;
 if(paid)s.coins-=cost;
 let pos,best=-1;
 for(let i=0;i<12;i++){const p={x:.13+random()*.74,y:.2+random()*.56};const distance=Math.min(1,...s.creatures.map(c=>Math.hypot(c.x-p.x,c.y-p.y)));if(distance>best){best=distance;pos=p;}}
 const c={level:startLevel(s,biome),...pos};s.creatures.push(c);if(!s.discovered.includes(c.level))s.discovered.push(c.level);return c;
}
function buyUpgrade(s,i){if(!C.upgrades[i]||s.upgrades[i]>=C.upgrades[i].max||s.coins<upgradePrice(s,i))return false;s.coins-=upgradePrice(s,i);s.upgrades[i]++;return true;}
function pulse(s,biome=0){if(s.charge<100||!pair(s))return[];s.charge=0;s.pulses++;const results=[];for(let i=0;i<(biome===7?5:3);i++){const p=pair(s);if(!p)break;results.push(merge(s,...p,biome,true));}return results;}
function tick(s,dt,biome=0,cycles=0){
 dt=clamp(dt,0,1);s.played+=dt;s.coins=Math.min(1e12,s.coins+income(s,biome,cycles)*dt);s.comboLeft=Math.max(0,s.comboLeft-dt);if(!s.comboLeft)s.combo=0;
 s.spawn=Math.min(interval(s,biome),s.spawn+dt);let born=false;
 if(s.spawn>=interval(s,biome)&&s.creatures.length<C.capacity){born=add(s,biome);s.spawn=0;}return born;
}
function mission(s,biome=0){const m=C.missions[s.mission];if(!m)return null;const target=m.target||C.biomes[biome].unlock,current=m.type==='upgrades'?s.upgrades.reduce((a,b)=>a+b,0):s[m.type];return{...m,target,current:Math.min(target,current),ready:current>=target};}
function claim(s,biome=0){const m=mission(s,biome);if(!m?.ready)return 0;const reward=m.reward*2**Math.max(0,s.best-4);s.coins=Math.min(1e12,s.coins+reward);s.mission++;return reward;}
function unlock(g){const i=g.active;if(i===7&&g.worlds[i].best>=12){const first=!g.completed;g.completed=true;return first?'complete':null;}if(i<7&&g.worlds[i].best>=C.biomes[i].unlock&&g.unlocked<=i){g.unlocked=i+1;return g.unlocked;}return null;}
function offline(g,now=Date.now()){const seconds=Math.min(7200,Math.max(0,(now-g.savedAt)/1000));const s=g.worlds[g.active];const reward=seconds>=60?Math.min(1e12-s.coins,Math.floor(income(s,g.active,g.cycles)*seconds*.25)):0;s.coins+=reward;g.savedAt=now;return reward;}
function rebirth(g){if(!g.completed)return false;g.worlds.forEach((s,i)=>g.archive[i]=[...new Set([...g.archive[i],...s.discovered])]);g.cycles=Math.min(100,g.cycles+1);g.worlds=C.biomes.map(fresh);g.active=0;g.unlocked=0;g.completed=false;return true;}
const api={clamp,fresh,clean,freshGame,cleanGame,startLevel,income,price,upgradePrice,interval,pair,merge,add,buyUpgrade,pulse,tick,mission,claim,unlock,offline,rebirth};
if(typeof module!=='undefined')module.exports=api;else root.Evolution=api;
})(globalThis);



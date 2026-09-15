(function(root){
'use strict';
const C=typeof module!=='undefined'?require('./content.js'):root.EvolutionContent;
const clamp=(n,min,max)=>Math.max(min,Math.min(max,Number.isFinite(Number(n))?Number(n):min));
const int=(n,min,max)=>Math.floor(clamp(n,min,max));
const fresh=()=>({coins:30,best:1,merges:0,pulses:0,charge:0,combo:0,comboLeft:0,maxCombo:0,spawn:0,played:0,mission:0,births:0,surge:0,focus:0,eventClock:0,events:0,upgrades:[0,0,0],creatures:[1,1,1,1].map((level,i)=>({level,x:.3+(i%2)*.36,y:.34+Math.floor(i/2)*.3})),discovered:[1]});
function clean(value){
 if(!value||typeof value!=='object'||Array.isArray(value))return fresh();
 const s=fresh();
 for(const k of ['coins','merges','pulses','played','births','events'])s[k]=clamp(value[k],0,1e12);
 s.focus=int(value.focus,0,2);s.surge=clamp(value.surge,0,10);s.eventClock=clamp(value.eventClock,0,55);s.best=int(value.best,1,C.maxLevel);s.charge=clamp(value.charge,0,100);
 s.maxCombo=int(value.maxCombo,0,10);s.spawn=clamp(value.spawn,0,8);s.mission=int(value.mission,0,C.missions.length);
 s.upgrades=C.upgrades.map((u,i)=>int(value.upgrades?.[i],0,u.max));
 if(Array.isArray(value.creatures))s.creatures=value.creatures.filter(c=>c&&typeof c==='object').slice(0,32).map(c=>({level:int(c.level,1,C.maxLevel),x:clamp(c.x,.1,.9),y:clamp(c.y,.16,.82)}));
 s.discovered=[...new Set([1,...(Array.isArray(value.discovered)?value.discovered:[]),...s.creatures.map(c=>c.level)])].filter(n=>Number.isInteger(n)&&n>=1&&n<=C.maxLevel).sort((a,b)=>a-b);
 s.best=Math.max(s.best,...s.discovered);return s;
}
const record=()=>({merges:0,pulses:0,events:0,maxCombo:0,mission:0,best:1});
const freshGame=()=>({version:4,started:false,active:0,unlocked:0,worlds:C.biomes.map(fresh),records:C.biomes.map(record),cycles:0,archive:C.biomes.map(()=>[]),medals:[],tutorial:false,completed:false,savedAt:Date.now(),cheated:false,settings:{language:'pt-BR',sound:true,music:false,volume:.4,motion:true,quality:'high'}});
function cleanGame(data){
 if(![2,3,4].includes(data?.version)||!Array.isArray(data.worlds)||![4,8].includes(data.worlds.length))throw new Error('Formato de progresso incompatível.');
 const g=freshGame();g.worlds=C.biomes.map((_,i)=>clean(data.worlds[i]));g.unlocked=int(data.unlocked,0,7);
 if(data.version<4)for(let i=0;i<=g.unlocked&&i<7;i++)if(g.worlds[i].best>=C.biomes[i].unlock)g.unlocked=Math.max(g.unlocked,i+1);
 g.started=data.started===true||data.version<4;g.cheated=data.cheated===true;g.active=int(data.active,0,g.unlocked);g.cycles=int(data.cycles,0,100);g.completed=data.completed===true;
 g.archive=C.biomes.map((_,i)=>Array.isArray(data.archive?.[i])?[...new Set(data.archive[i])].filter(n=>Number.isInteger(n)&&n>0&&n<=20):[]);
 g.medals=Array.isArray(data.medals)?[...new Set(data.medals.filter(v=>typeof v==='string'&&v.length<40))].slice(0,100):[];
 g.records=C.biomes.map((_,i)=>{const r=record(),v=data.records?.[i]||{};for(const k of ['merges','pulses','events'])r[k]=int(v[k],0,1e12);r.maxCombo=int(v.maxCombo,0,10);r.mission=int(v.mission,0,5);r.best=int(v.best,1,20);return r;});
 g.tutorial=data.tutorial===true||data.version===2;g.savedAt=data.savedAt?clamp(data.savedAt,0,Date.now()):Date.now();
 if(data.settings)g.settings={language:data.settings.language==='en'?'en':'pt-BR',sound:data.settings.sound===true,music:data.settings.music===true,volume:clamp(data.settings.volume,0,1),motion:data.settings.motion!==false,quality:data.settings.quality==='low'?'low':'high'};
 else if(data.version===2)g.settings.sound=data.sound===true;
 return g;
}
const startLevel=(s,biome=0)=>Math.max(1,Math.min(Math.max(1,s.best-2+(biome===5?1:0)),Math.max(1,s.best-6)+s.upgrades[2]+(biome===5?1:0)));
const income=(s,biome=0,cycles=0)=>Math.sqrt(s.creatures.reduce((n,c)=>n+2**(c.level-1),0))*.4*(1+s.upgrades[0]*.2)*(biome===2?1.25:1)*(1+cycles*.15)*(s.focus===1?1.2:1);
const creaturePrice=level=>Math.round(14*1.5**(level-1));
const price=(s,biome=0)=>creaturePrice(startLevel(s,biome));
const travelCost=destination=>Math.round(450*1.65**(destination-1));
const upgradePrice=(s,i)=>Math.round(C.upgrades[i].base*(i===2?3.2:2.1)**s.upgrades[i]);
const interval=(s,biome=0)=>Math.max(1.5,8*.9**s.upgrades[1]*(biome===3?.8:1)*(s.focus===2?.85:1)*(s.surge>0?.55:1));
function pair(s){for(let i=0;i<s.creatures.length;i++){const a=s.creatures[i];if(a.level>=C.maxLevel)continue;const b=s.creatures.slice(i+1).find(c=>c.level===a.level);if(b)return[a,b];}return null;}
function merge(s,a,b,biome=0,fromPulse=false){
 if(a===b||!a||!b||!s.creatures.includes(a)||!s.creatures.includes(b)||a.level!==b.level||a.level>=C.maxLevel)return false;
 const c={level:a.level+1,x:(a.x+b.x)/2,y:(a.y+b.y)/2};const discovery=!s.discovered.includes(c.level);
 s.creatures=s.creatures.filter(v=>v!==a&&v!==b);s.creatures.push(c);
 s.combo=s.comboLeft>0?Math.min(10,s.combo+1):1;s.comboLeft=(biome===1?8:5)+(s.focus===0?1:0);s.maxCombo=Math.max(s.maxCombo,s.combo);
 const reward=Math.round((3+c.level*1.8)*(1+(s.combo-1)*.07)*(biome===6?1.5:1));
 if(s.combo===5||s.combo===10)s.surge=8;
 s.merges++;s.coins=Math.min(1e12,s.coins+reward);s.best=Math.max(s.best,c.level);
 if(!fromPulse)s.charge=Math.min(100,s.charge+(biome===4?12.5:10));
 if(discovery)s.discovered.push(c.level);
 return{creature:c,discovery,reward,sources:[{...a},{...b}]};
}
function add(s,biome=0,paid=false,random=Math.random,requestedLevel=null){
 let level=startLevel(s,biome);
 if(requestedLevel!==null){if(!Number.isInteger(requestedLevel)||requestedLevel<1||requestedLevel>level)return false;level=requestedLevel;}
 if(!paid&&s.births%3===2){const orphan=orphanLevel(s,biome);if(orphan)level=orphan;}
 const cost=creaturePrice(level);if(s.creatures.length>=C.capacity||(paid&&s.coins<cost))return false;
 if(paid)s.coins-=cost;
 let pos,best=-1;
 for(let i=0;i<12;i++){const p={x:.13+random()*.74,y:.2+random()*.56};const distance=Math.min(1,...s.creatures.map(c=>Math.hypot(c.x-p.x,c.y-p.y)));if(distance>best){best=distance;pos=p;}}
 const c={level,...pos};s.creatures.push(c);s.births++;if(!s.discovered.includes(c.level))s.discovered.push(c.level);return c;
}
function buyUpgrade(s,i){if(!C.upgrades[i]||s.upgrades[i]>=C.upgrades[i].max||s.coins<upgradePrice(s,i))return false;s.coins-=upgradePrice(s,i);s.upgrades[i]++;return true;}
function pulse(s,biome=0){if(s.charge<100||!pair(s))return[];s.charge=0;s.pulses++;const results=[];for(let i=0;i<(biome===7?5:3);i++){const p=pair(s);if(!p)break;results.push(merge(s,...p,biome,true));}return results;}
function tick(s,dt,biome=0,cycles=0){
 dt=clamp(dt,0,1);s.played+=dt;s.eventClock+=dt;s.surge=Math.max(0,s.surge-dt);s.coins=Math.min(1e12,s.coins+income(s,biome,cycles)*dt);s.comboLeft=Math.max(0,s.comboLeft-dt);if(!s.comboLeft)s.combo=0;
 s.spawn=Math.min(interval(s,biome),s.spawn+dt);let born=false;
 if(s.spawn>=interval(s,biome)&&s.creatures.length<C.capacity){born=add(s,biome);s.spawn=0;}return born;
}
function mission(s,biome=0){const m=C.missions[s.mission];if(!m)return null;const target=m.target||C.biomes[biome].unlock,current=m.type==='upgrades'?s.upgrades.reduce((a,b)=>a+b,0):s[m.type];return{...m,target,current:Math.min(target,current),ready:current>=target};}
function claim(s,biome=0){const m=mission(s,biome);if(!m?.ready)return 0;const reward=Math.round(m.reward*.25);s.coins=Math.min(1e12,s.coins+reward);s.mission++;return reward;}
function unlock(g){if(g.active===7&&g.worlds[7].best>=12&&!g.completed){g.completed=true;return 'complete';}return null;}
function buyTravel(g,destination){if(destination!==g.unlocked+1||destination>7||destination<1)return false;const previous=g.worlds[destination-1],cost=travelCost(destination);if(previous.best<C.biomes[destination-1].unlock||previous.coins<cost)return false;previous.coins-=cost;g.unlocked=destination;return true;}
function orphanLevel(s,biome=0){const start=startLevel(s,biome);for(let level=1;level<start;level++)if(s.creatures.filter(c=>c.level===level).length%2===1)return level;return null;}
function buyPartner(s,c,biome=0){if(!s.creatures.includes(c)||c.level>=startLevel(s,biome))return false;return add(s,biome,true,Math.random,c.level);}
function focusCost(s){return Math.round(35+s.best*8);}
function setFocus(s,focus){if(![0,1,2].includes(focus)||s.focus===focus||s.coins<focusCost(s))return false;s.coins-=focusCost(s);s.focus=focus;return true;}
function gather(s){if(s.eventClock<50)return false;s.eventClock=0;s.events++;s.charge=Math.min(100,s.charge+20);s.surge=10;const reward=10+s.best*2;s.coins=Math.min(1e12,s.coins+reward);return reward;}
function cheat(g,code){const s=g.worlds[g.active];switch(code.toUpperCase()){
 case 'HESOYAM': case 'VITALIS': s.coins=Math.min(1e12,s.coins+1000);break;
 case 'ORBITA': if(g.unlocked>=7)return false;g.unlocked++;g.active=g.unlocked;break;
 case 'EVOLUIR': {const c=s.creatures.find(c=>c.level<20);if(!c)return false;c.level++;s.best=Math.max(s.best,c.level);if(!s.discovered.includes(c.level))s.discovered.push(c.level);break;}
 case 'PULSAR':s.charge=100;break;
 default:return false;
 }g.cheated=true;return true;}

function offline(g,now=Date.now()){const seconds=Math.min(7200,Math.max(0,(now-g.savedAt)/1000));const s=g.worlds[g.active];const reward=seconds>=60?Math.min(1e12-s.coins,Math.floor(income(s,g.active,g.cycles)*seconds*.1)):0;s.coins+=reward;g.savedAt=now;return reward;}
function remember(g,i){const s=g.worlds[i],r=g.records[i];for(const k of ['merges','pulses','events'])r[k]=Math.min(1e12,r[k]+s[k]);for(const k of ['maxCombo','mission','best'])r[k]=Math.max(r[k],s[k]);g.archive[i]=[...new Set([...g.archive[i],...s.discovered])];}
function rebirth(g){if(!g.completed)return false;g.worlds.forEach((_,i)=>remember(g,i));g.cycles=Math.min(100,g.cycles+1);g.worlds=C.biomes.map(fresh);g.active=0;g.unlocked=0;g.completed=false;return true;}
const api={remember,creaturePrice,travelCost,buyTravel,orphanLevel,buyPartner,focusCost,setFocus,gather,cheat,clamp,fresh,clean,freshGame,cleanGame,startLevel,income,price,upgradePrice,interval,pair,merge,add,buyUpgrade,pulse,tick,mission,claim,unlock,offline,rebirth};
if(typeof module!=='undefined')module.exports=api;else root.Evolution=api;
})(globalThis);


const fs=require('node:fs');let p='js/evolution-core.js',s=fs.readFileSync(p,'utf8');
s=s.replace('coins:45','coins:30').replace('mission:0,upgrades','mission:0,births:0,surge:0,focus:0,eventClock:0,events:0,upgrades');
s=s.replace("['coins','merges','pulses','played']","['coins','merges','pulses','played','births','events']");
s=s.replace('s.best=int(value.best','s.focus=int(value.focus,0,2);s.surge=clamp(value.surge,0,10);s.eventClock=clamp(value.eventClock,0,55);s.best=int(value.best');
s=s.replace('version:3,active:0','version:4,active:0').replace('settings:{sound:','cheated:false,settings:{language:\'pt-BR\',sound:');
s=s.replace('![2,3].includes(data?.version)','![2,3,4].includes(data?.version)');
s=s.replace('for(let i=0;i<=g.unlocked','if(data.version<4)for(let i=0;i<=g.unlocked');
s=s.replace('g.active=int(data.active','g.cheated=data.cheated===true;g.active=int(data.active');
s=s.replace('g.settings={sound:','g.settings={language:data.settings.language===\'en\'?\'en\':\'pt-BR\',sound:');
s=s.replace(/const income=.*?;\r?\n/,`const income=(s,biome=0,cycles=0)=>Math.sqrt(s.creatures.reduce((n,c)=>n+2**(c.level-1),0))*.4*(1+s.upgrades[0]*.2)*(biome===2?1.25:1)*(1+cycles*.15)*(s.focus===1?1.2:1);\n`);
s=s.replace(/const price=.*?;\r?\n/,`const creaturePrice=level=>Math.round(14*1.5**(level-1));\nconst price=(s,biome=0)=>creaturePrice(startLevel(s,biome));\nconst travelCost=destination=>Math.round(450*1.65**(destination-1));\n`);
s=s.replace("(i===2?4:2.35)","(i===2?3.2:2.1)");
s=s.replace('7*.86**s.upgrades[1]*(biome===3?.8:1)','8*.9**s.upgrades[1]*(biome===3?.8:1)*(s.focus===2?.85:1)*(s.surge>0?.55:1)');
s=s.replace('x:b.x,y:b.y','x:(a.x+b.x)/2,y:(a.y+b.y)/2');
s=s.replace("s.comboLeft=biome===1?8:5", "s.comboLeft=(biome===1?8:5)+(s.focus===0?1:0)");
s=s.replace('Math.round(8*2**(c.level-1)*(1+(s.combo-1)*.1)*(biome===6?2:1))','Math.round((3+c.level*1.8)*(1+(s.combo-1)*.07)*(biome===6?1.5:1))');
s=s.replace('s.merges++;s.coins','if(s.combo===5||s.combo===10)s.surge=8;\n s.merges++;s.coins');
s=s.replace('return{creature:c,discovery,reward}','return{creature:c,discovery,reward,sources:[{...a},{...b}]}');
s=s.replace('random=Math.random){','random=Math.random,requestedLevel=null){');
s=s.replace('const cost=price(s,biome);','let level=startLevel(s,biome);\n if(requestedLevel!==null){if(!Number.isInteger(requestedLevel)||requestedLevel<1||requestedLevel>level)return false;level=requestedLevel;}\n if(!paid&&s.births%3===2){const orphan=orphanLevel(s,biome);if(orphan)level=orphan;}\n const cost=creaturePrice(level);');
s=s.replace('const c={level:startLevel(s,biome),...pos};s.creatures.push(c);','const c={level,...pos};s.creatures.push(c);s.births++;');
s=s.replace('dt=clamp(dt,0,1);s.played+=dt;','dt=clamp(dt,0,1);s.played+=dt;s.eventClock+=dt;s.surge=Math.max(0,s.surge-dt);');
s=s.replace('const reward=m.reward*2**Math.max(0,s.best-4)','const reward=Math.round(m.reward*.25)');
const begin=s.indexOf('function unlock(g)'),end=s.indexOf('function offline(g)',begin);
s=s.slice(0,begin)+`function unlock(g){if(g.active===7&&g.worlds[7].best>=12&&!g.completed){g.completed=true;return 'complete';}return null;}
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
`+s.slice(end);
s=s.replace('income(s,g.active,g.cycles)*seconds*.25','income(s,g.active,g.cycles)*seconds*.1');
s=s.replace('clamp,fresh,clean','creaturePrice,travelCost,buyTravel,orphanLevel,buyPartner,focusCost,setFocus,gather,cheat,clamp,fresh,clean');
fs.writeFileSync(p,s);
p='js/storage.js';s=fs.readFileSync(p,'utf8').replace("KEY='amoeba-evolution-v3'","KEY='amoeba-evolution-v4'").replace("[KEY,BACKUP,'amoeba-evolution-v2']","[KEY,BACKUP,'amoeba-evolution-v3','amoeba-evolution-v2']");fs.writeFileSync(p,s);
p='js/content.js';s=fs.readFileSync(p,'utf8').replace("version:'0.3.0'","version:'0.4.0'").replace('+35% de produção','+20% de produção').replace('Bônus de energia das fusões valem o dobro.','Fusões rendem 50% mais energia.');fs.writeFileSync(p,s);

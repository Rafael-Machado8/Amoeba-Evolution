const E=require('../js/evolution-core.js'),C=require('../js/content.js');
function run(label,delay){const g=E.freshGame(),rows=[];let time=0;for(let biome=0;biome<8;biome++){g.active=biome;const s=g.worlds[biome];let nextAction=0,local=0;for(;local<10800;local++){
 E.tick(s,1,biome);time++;if(s.eventClock>=50)E.gather(s);
 if(local>=nextAction){nextAction=local+delay;const m=E.mission(s,biome);if(m?.ready)E.claim(s,biome);
 if(s.charge>=100&&E.pair(s))E.pulse(s,biome);else{
 const affordable=[2,1,0].find(i=>s.upgrades[i]<C.upgrades[i].max&&s.coins>=E.upgradePrice(s,i)&&((i===2&&s.best>1+s.upgrades[2])||i!==2));
 if(s.best<C.biomes[biome].unlock&&affordable!==undefined&&s.coins>E.price(s,biome)*2+E.upgradePrice(s,affordable))E.buyUpgrade(s,affordable);
 else{const pair=E.pair(s);if(pair)E.merge(s,...pair,biome);else if(s.best<C.biomes[biome].unlock)E.add(s,biome,true);}
 }}
 if(biome<7?E.buyTravel(g,biome+1):E.unlock(g)==='complete')break;
 }
 rows.push({habitat:C.biomes[biome].name,seconds:local+1,merges:s.merges,best:s.best,coins:Math.round(s.coins),upgrades:s.upgrades.join('/')});if(local>=10800)throw new Error(label+' stalled at '+biome);
 }return{strategy:label,actionIntervalSeconds:delay,totalMinutes:Math.round(time/60*10)/10,habitats:rows};}
const report={generatedAt:new Date().toISOString(),note:'Simulation, not human playtesting. Bots pick any available pair and spend energy without reaction or navigation time.',runs:[run('Active, one action every 2 seconds',2),run('Relaxed, one action every 5 seconds',5)]};
console.log(JSON.stringify(report,null,2));require('node:fs').writeFileSync('docs/balance-report.json',JSON.stringify(report,null,2));

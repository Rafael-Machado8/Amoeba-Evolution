(function(root){
'use strict';
const C=typeof module!=='undefined'?require('./content.js'):root.EvolutionContent;
const en=['Microworld','Ocean','Dry land','Sky','Orbit','Nebula','Galaxy','Beyond'];
const defs=[];
const total=(g,key)=>g.worlds.reduce((n,w,i)=>n+w[key]+(g.records?.[i]?.[key]||0),0);
const worldTotal=(g,i,key)=>g.worlds[i][key]+(g.records?.[i]?.[key]||0);
const best=(g,i,key)=>Math.max(g.worlds[i][key],g.records?.[i]?.[key]||0);
const collection=(g,i)=>new Set([...g.worlds[i].discovered,...(g.archive[i]||[])]).size;
const discoveries=g=>g.worlds.reduce((n,_,i)=>n+collection(g,i),0);
const upgrades=g=>g.worlds.reduce((n,w)=>n+w.upgrades.reduce((a,b)=>a+b,0),0);
function add(id,name,desc,target,value,group='journey'){defs.push({id,name,desc,target,value,group,test:g=>value(g)>=target});}
add('first',['Um primeiro encontro','A first encounter'],['Faça sua primeira fusão.','Make your first merge.'],1,g=>total(g,'merges'));
add('ten',['No ritmo da vida','In the rhythm of life'],['Alcance um combo de 10.','Reach a combo of 10.'],10,g=>Math.max(...g.worlds.map((_,i)=>best(g,i,'maxCombo'))));
for(const [id,pt,english,index] of [['ocean','Pés molhados','Wet feet',1],['sky','Sem olhar para baixo','Don’t look down',3],['space','Pálido ponto azul','Pale blue dot',4]])add(id,[pt,english],[`Abra ${C.biomes[index].name}.`,`Open ${en[index]}.`],index,g=>g.unlocked);
add('pulse',['Efeito dominó','Domino effect'],['Use o pulso evolutivo.','Use the evolutionary pulse.'],1,g=>total(g,'pulses'));
add('hundred',['Cem possibilidades','A hundred possibilities'],['Faça 100 fusões entre seus ciclos.','Make 100 merges across your cycles.'],100,g=>total(g,'merges'));
add('research',['Caderno completo','A full journal'],['Conclua as 5 missões de um habitat.','Complete all 5 tasks in a habitat.'],5,g=>Math.max(...g.worlds.map((_,i)=>best(g,i,'mission'))));
add('twenty',['Uma forma perfeita','A perfect form'],['Descubra uma forma de nível 20.','Discover a level 20 form.'],20,g=>Math.max(...g.worlds.map((_,i)=>best(g,i,'best'))));
add('beyond',['Da gota ao cosmos','From a drop to the cosmos'],['Conclua a jornada em Além.','Finish the journey in Beyond.'],1,g=>g.completed||g.cycles>0?1:0);
add('rebirth',['Outra volta ao sol','Another trip around the sun'],['Comece um novo ciclo.','Start a new cycle.'],1,g=>g.cycles);
add('all',['Uma vida de descobertas','A life of discoveries'],['Encontre as 160 formas, somando a coleção dos ciclos.','Discover all 160 forms across your cycles.'],160,discoveries);
// Eight substantial objectives for each habitat: 64 achievements.
C.biomes.forEach((b,i)=>{
 for(const [n,pt,eng] of [[10,'Observadora','Observer'],[15,'Naturalista','Naturalist'],[20,'Enciclopédia','Encyclopedia']])add(`w${i}-discover-${n}`,[`${pt} · ${b.name}`,`${eng} · ${en[i]}`],[`Descubra ${n} formas diferentes em ${b.name}, entre seus ciclos.`,`Discover ${n} different forms in ${en[i]} across your cycles.`],n,g=>collection(g,i),String(i));
 for(const [n,pt,eng] of [[250,'Criadora','Creator'],[1000,'Mestre das fusões','Merge master']])add(`w${i}-merge-${n}`,[`${pt} · ${b.name}`,`${eng} · ${en[i]}`],[`Faça ${n.toLocaleString('pt-BR')} fusões em ${b.name}, entre seus ciclos.`,`Make ${n.toLocaleString('en')} merges in ${en[i]} across your cycles.`],n,g=>worldTotal(g,i,'merges'),String(i));
 add(`w${i}-pulse`,[`Cadência · ${b.name}`,`Cadence · ${en[i]}`],[`Use 25 pulsos em ${b.name}, entre seus ciclos.`,`Use 25 pulses in ${en[i]} across your cycles.`],25,g=>worldTotal(g,i,'pulses'),String(i));
 add(`w${i}-research`,[`Pesquisadora · ${b.name}`,`Researcher · ${en[i]}`],[`Conclua as 5 missões de ${b.name}.`,`Complete all 5 tasks in ${en[i]}.`],5,g=>best(g,i,'mission'),String(i));
 add(`w${i}-lab`,[`Laboratório perfeito · ${b.name}`,`Perfect laboratory · ${en[i]}`],[`Maximize as três melhorias de ${b.name} no mesmo ciclo.`,`Max all three upgrades in ${en[i]} in one cycle.`],19,g=>g.worlds[i].upgrades.reduce((a,b)=>a+b,0),String(i));
});
// 23 global milestones, with a final platinum achievement below.
for(const n of [250,500,1000,3000,10000])add(`merges-${n}`,[`${n.toLocaleString('pt-BR')} encontros`,`${n.toLocaleString('en')} encounters`],[`Faça ${n.toLocaleString('pt-BR')} fusões entre todos os habitats e ciclos.`,`Make ${n.toLocaleString('en')} merges across all habitats and cycles.`],n,g=>total(g,'merges'));
for(const n of [25,100,500])add(`pulses-${n}`,[`Onda de vida ${n}`,`Wave of life ${n}`],[`Use ${n} pulsos entre todos os habitats e ciclos.`,`Use ${n} pulses across all habitats and cycles.`],n,g=>total(g,'pulses'));
for(const n of [10,50,200])add(`blooms-${n}`,[`Colecionadora de centelhas ${n}`,`Spark collector ${n}`],[`Colete ${n} centelhas entre seus ciclos.`,`Collect ${n} living sparks across your cycles.`],n,g=>total(g,'events'));
for(const n of [25,75,152])add(`upgrades-${n}`,[`Rede de laboratórios ${n}`,`Laboratory network ${n}`],[`Mantenha ${n} melhorias compradas entre os habitats no mesmo ciclo.`,`Own ${n} upgrades across habitats in a single cycle.`],n,upgrades);
for(const n of [40,80,120])add(`discoveries-${n}`,[`Atlas da vida ${n}`,`Atlas of life ${n}`],[`Descubra ${n} formas diferentes, somando todos os habitats e ciclos.`,`Discover ${n} different forms across all habitats and cycles.`],n,discoveries);
for(const n of [3,5,10])add(`cycles-${n}`,[`Eterno retorno ${n}`,`Eternal return ${n}`],[`Complete ${n} jornadas e inicie um novo ciclo após cada uma.`,`Complete ${n} journeys and start a new cycle after each.`],n,g=>g.cycles);
for(const n of [4,8])add(`combo-worlds-${n}`,[`Ritmo universal ${n}`,`Universal rhythm ${n}`],[`Alcance combo 10 em ${n} habitats diferentes, entre seus ciclos.`,`Reach combo 10 in ${n} different habitats across your cycles.`],n,g=>g.worlds.filter((_,i)=>best(g,i,'maxCombo')>=10).length);
add('living-masters',['Conselho dos ancestrais','Council of ancestors'],['Mantenha uma criatura de nível 20 viva em cada um dos 8 habitats, no mesmo ciclo.','Keep a living level 20 creature in each of the 8 habitats in the same cycle.'],8,g=>g.worlds.filter(w=>w.creatures.some(c=>c.level===20)).length);
add('platinum',['Um universo completo · PLATINA','A complete universe · PLATINUM'],['Conquiste todas as outras 99 conquistas em uma jornada sem cheats.','Earn all other 99 achievements in a journey without cheats.'],99,g=>defs.filter(d=>d.id!=='platinum'&&g.medals.includes(d.id)).length,'platinum');
const ids=new Set(defs.map(d=>d.id));
function earned(g){return [...new Set(g.medals)].filter(id=>ids.has(id));}
function collect(g){if(!g.started||g.cheated)return [];const found=[];for(const d of defs)if(!g.medals.includes(d.id)&&d.test(g)){g.medals.push(d.id);found.push(d);}return found;}
function progress(d,g){return Math.max(0,Math.min(d.target,Math.floor(d.value(g))));}
function local(d,language){const i=language==='en'?1:0;return{...d,name:d.name[i],desc:d.desc[i]};}
const api={defs,earned,collect,progress,local};if(typeof module!=='undefined')module.exports=api;else root.EvolutionAchievements=api;
})(globalThis);

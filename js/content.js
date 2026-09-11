(function (root) {
'use strict';
const biomes = [
{ id:'micro', name:'Micromundo', title:'Uma gota de vida.', tagline:'Tudo começa com um encontro.', color:'#d9ed9c', hue:88, bg:'#234747', file:'index.html', unlock:8, rule:'Origens', perk:'Um ambiente tranquilo para suas primeiras descobertas.', lore:'Dentro de uma gota, um universo inteiro ensaia seu primeiro movimento.', names:'Centelha|Gota|Núcleo|Cílio|Espiral|Colônia|Simbiose|Origem|Membrana|Pulso|Mosaico|Arquiteta|Véu|Lótus|Coralina|Prisma|Elo|Aurora|Ancestral|Primordial' },
{ id:'ocean', name:'Oceano', title:'A vida ganha corrente.', tagline:'Siga o azul. Há muito sob a superfície.', color:'#91dee8', hue:183, bg:'#163e51', file:'peixes.html', unlock:8, rule:'Maré viva', perk:'Combos duram 8 segundos, em vez de 5.', lore:'O oceano não tem pressa. Suas correntes carregam possibilidades que a superfície ainda não conhece.', names:'Plâncton|Nadadeira|Bolha|Listrado|Veleiro|Lanterna|Recife|Manta|Náutilo|Abissal|Medusa|Coroa azul|Serpentina|Cristal d’água|Maré alta|Leviatã|Tritão|Guardiã|Oceânica|Coração do mar' },
{ id:'land', name:'Terra firme', title:'Raízes para o amanhã.', tagline:'Um passo pequeno. Um mundo novo.', color:'#ebc48b', hue:37, bg:'#36412c', file:'terrestre.html', unlock:9, rule:'Solo fértil', perk:'Todas as criaturas produzem 25% mais energia.', lore:'Nas margens, o mundo ganha textura. Patas, raízes e carapaças encontram seu lugar.', names:'Broto|Musguinho|Rastejante|Carapaça|Saltador|Folhagem|Explorador|Galhudo|Bosque|Arbórea|Flor de pedra|Titã verde|Cipó|Peregrino|Jardineira|Sequoia|Montanha|Gaia|Anciã|Espírito da terra' },
{ id:'sky', name:'Céu', title:'Solte o horizonte.', tagline:'A próxima descoberta tem asas.', color:'#c8c6f4', hue:251, bg:'#303e59', file:'ceu.html', unlock:9, rule:'Vento a favor', perk:'O cultivo automático é 20% mais rápido.', lore:'O vento vira estrada. Onde antes havia limite, agora existe uma direção.', names:'Pluma|Brisa|Asinha|Planador|Andorinha|Vento sul|Nuvem|Albatroz|Pipa viva|Tempestade|Arco-íris|Fênix|Trovão|Solar|Cúmulo|Celeste|Estratos|Serafim|Zênite|Dona do vento' },
{ id:'orbit', name:'Órbita', title:'A gravidade é um convite.', tagline:'A vida encontrou um jeito de partir.', color:'#e9c18c', hue:32, bg:'#202a45', file:'orbita.html', unlock:10, rule:'Gravidade leve', perk:'Cada fusão carrega 25% mais o pulso evolutivo.', lore:'Um pequeno planeta gira em silêncio. A primeira viajante descobre que o vazio também pode ser um lar.', names:'Poeira|Fragmento|Meteoro|Satélite|Viajante|Lunar|Anel|Planetoide|Errante|Atmosfera|Terra nova|Mundo vivo|Gigante|Pastora|Cinturão|Peregrina|Horizonte|Sistema|Arca|Semente cósmica' },
{ id:'nebula', name:'Nebulosa', title:'Onde nascem as estrelas.', tagline:'A escuridão está cheia de cor.', color:'#eab2dd', hue:310, bg:'#39264b', file:'nebulosa.html', unlock:10, rule:'Berçário estelar', perk:'Criaturas cultivadas começam um nível acima.', lore:'Nuvens antigas se dobram em luz. Cada encontro acende uma cor que ainda não tinha nome.', names:'Névoa|Íon|Filamento|Plasma|Flâmula|Roseta|Pulsar|Violeta|Berçário|Estrela jovem|Véu rosa|Supernova|Catedral|Crina|Coração rubro|Borboleta|Carina|Oráculo|Árvore de luz|Mãe das estrelas' },
{ id:'galaxy', name:'Galáxia', title:'Mil sóis. Uma só história.', tagline:'Pequenos encontros desenham o infinito.', color:'#9cbafa', hue:222, bg:'#252642', file:'galaxia.html', unlock:11, rule:'Ressonância', perk:'Bônus de energia das fusões valem o dobro.', lore:'A distância entre duas estrelas parece imensa. Vistas de longe, elas pertencem ao mesmo desenho.', names:'Faísca|Dupla|Tríade|Aglomerado|Braço azul|Espiral|Via clara|Disco|Constelação|Redemoinho|Galáxia viva|Andrômeda|Encontro|Arquipélago|Quasar|Coroa de sóis|Superenxame|Filamento azul|Cartógrafa|Universo em flor' },
{ id:'beyond', name:'Além', title:'O fim também é uma semente.', tagline:'O universo aprendeu a recomeçar.', color:'#f3dbac', hue:44, bg:'#343344', file:'alem.html', unlock:12, rule:'Eterno retorno', perk:'O pulso evolutivo combina até 5 pares.', lore:'Depois da última estrela, um brilho insiste. Você reconhece aquela forma: parece uma pequena gota.', names:'Eco|Memória|Reflexo|Instante|Laço|Sonhadora|Horizonte|Infinita|Paradoxo|Harmonia|Última luz|Nova origem|Tempo|Possibilidade|Eternidade|Abraço|Tudo|Silêncio|Recomeço|Uma gota de vida' }
].map(b => ({...b, names:b.names.split('|')}));
const upgrades = [
{ name:'Metabolismo', desc:'+35% de produção por melhoria', max:8, base:65 },
{ name:'Ritmo de cultivo', desc:'Reduz o intervalo entre nascimentos', max:8, base:100 },
{ name:'Cultura avançada', desc:'Aproxima o cultivo da sua melhor forma', max:3, base:180 }
];
const missions = [
{title:'Primeiros encontros',desc:'Faça 5 fusões neste habitat.',type:'merges',target:5,reward:100},
{title:'Um laboratório melhor',desc:'Compre 3 melhorias neste habitat.',type:'upgrades',target:3,reward:180},
{title:'Vida complexa',desc:'Descubra uma forma de nível 6.',type:'best',target:6,reward:300},
{title:'O ritmo da vida',desc:'Use o pulso evolutivo uma vez.',type:'pulses',target:1,reward:450},
{title:'Horizonte aberto',desc:'Alcance o nível que abre a próxima etapa.',type:'best',target:null,reward:800}
];
const api = {biomes,upgrades,missions,version:'0.3.0',maxLevel:20,capacity:32};
if(typeof module !== 'undefined') module.exports=api; else root.EvolutionContent=api;
})(globalThis);


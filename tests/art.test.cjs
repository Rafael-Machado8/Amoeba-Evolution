const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
test('all 160 forms render with finite coordinates and balanced canvas state',()=>{
 const scope={window:{},EvolutionContent:require('../js/content.js')};vm.runInNewContext(fs.readFileSync('js/art.js','utf8'),scope);
 let depth=0,calls=0;const gradient={addColorStop(){}};
 const ctx=new Proxy({save(){depth++;},restore(){assert.ok(depth>0);depth--;},createRadialGradient(...args){assert.ok(args.every(Number.isFinite));return gradient;}},{get(target,key){return key in target?target[key]:(...args)=>{calls++;for(const arg of args)if(typeof arg==='number')assert.ok(Number.isFinite(arg),key+' received '+arg);};},set(target,key,value){target[key]=value;return true;}});
 for(let biome=0;biome<8;biome++)for(let level=1;level<=20;level++)for(const time of [0,2.5]){scope.window.EvolutionArt.specimen(ctx,biome,level,22,time,level,level===5);assert.equal(depth,0,`${biome}/${level}`);}assert.ok(calls>1000);
});

(() => {
'use strict';
class Soundscape{
 constructor(){this.ctx=null;this.voices=[];this.settings={sound:true,music:false,volume:.4};this.paused=false;this.biome=0;}
 unlock(){try{if(!this.ctx){this.ctx=new(window.AudioContext||window.webkitAudioContext)();this.master=this.ctx.createGain();this.master.connect(this.ctx.destination);this.ambient=this.ctx.createGain();this.ambient.connect(this.master);[0,7,12].forEach((n,i)=>{const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type='sine';o.frequency.value=110*2**(n/12);g.gain.value=.018/(i+1);o.connect(g);g.connect(this.ambient);o.start();this.voices.push(o);});}if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});this.sync();}catch{}}
 configure(settings,biome){this.settings=settings;this.biome=biome;this.sync();}
 sync(){if(!this.ctx)return;const now=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.paused?0:this.settings.volume,now,.12);this.ambient.gain.setTargetAtTime(this.settings.music?1:0,now,.5);const root=[130.81,146.83,110,164.81,123.47,138.59,98,130.81][this.biome];this.voices.forEach((o,i)=>o.frequency.setTargetAtTime(root*2**([0,7,12][i]/12),now,.8));}
 pause(value){if(this.paused===value)return;this.paused=value;this.sync();}
 play(kind,level=1){this.unlock();if(!this.ctx||!this.settings.sound||this.paused)return;const melody=kind==='discover'?[0,4,7,12]:kind==='pulse'?[0,7,12,19]:kind==='buy'?[0]:[0,7];const base=196*2**((level%8)/12);melody.forEach((n,i)=>{const o=this.ctx.createOscillator(),g=this.ctx.createGain(),at=this.ctx.currentTime+i*.07;o.type='sine';o.frequency.value=base*2**(n/12);g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(.1,at+.015);g.gain.exponentialRampToValueAtTime(.001,at+.42);o.connect(g);g.connect(this.master);o.start(at);o.stop(at+.45);});}
}
window.EvolutionSound=Soundscape;
})();


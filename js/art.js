/* Original procedural art. No remote assets, image downloads or fonts. */
(() => {
'use strict';
const TAU=Math.PI*2, C=EvolutionContent;
function ellipse(ctx,x,y,rx,ry,angle=0){ctx.beginPath();ctx.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),angle,0,TAU);}
function orb(ctx,x,y,r,color){const g=ctx.createRadialGradient(x-r*.35,y-r*.4,r*.05,x,y,r);g.addColorStop(0,'#ffffffb0');g.addColorStop(.25,color);g.addColorStop(1,'#14202bcc');ctx.fillStyle=g;ellipse(ctx,x,y,r,r);ctx.fill();}
function specimen(ctx,biome,level,r,time=0,seed=0,selected=false){
 const b=C.biomes[biome],variant=(level-1)%5,tier=Math.floor((level-1)/5),hue=b.hue+[0,28,-24,65,110][variant]+tier*14,body=`hsl(${hue},48%,66%)`,light=`hsl(${hue},66%,83%)`;
 const phase=time*1.7+seed*2.3,breath=1+Math.sin(phase)*.025;
 ctx.save();ctx.scale(breath,breath);ctx.lineWidth=1.5;ctx.strokeStyle=light;
 if(selected){ctx.save();ctx.strokeStyle=b.color;ctx.globalAlpha=.6;ctx.setLineDash([3,6]);ctx.lineDashOffset=-time*12;ellipse(ctx,0,0,r+11,r+11);ctx.stroke();ctx.restore();}
 const fill=ctx.createRadialGradient(-r*.3,-r*.35,1,0,0,r*1.2);fill.addColorStop(0,`hsla(${hue},60%,82%,.85)`);fill.addColorStop(.48,`hsla(${hue},45%,49%,.78)`);fill.addColorStop(1,`hsla(${hue},40%,25%,.6)`);ctx.fillStyle=fill;
 if(biome===0){
  if(variant===3||tier>=2){for(let j=0;j<8+tier*3;j++){const a=j*TAU/(8+tier*3);ctx.beginPath();ctx.moveTo(Math.cos(a)*r*.82,Math.sin(a)*r*.82);ctx.quadraticCurveTo(Math.cos(a+.12)*r*1.15,Math.sin(a+.12)*r*1.15,Math.cos(a+.1*Math.sin(phase+j))*r*1.3,Math.sin(a+.1*Math.sin(phase+j))*r*1.3);ctx.stroke();}}
  ctx.beginPath();const lobes=[4,3,2,7,5][variant],sx=[1,.78,1.15,.91,1][variant],sy=[1,1.12,.67,.91,.94][variant];
  for(let k=0;k<=80;k++){const a=k/80*TAU,rr=r*(1+[.07,.14,.22,.19,.2][variant]*Math.sin(a*lobes+phase*.25)+.025*Math.sin(a*7-phase));const x=Math.cos(a)*rr*sx,y=Math.sin(a)*rr*sy;k?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.closePath();ctx.fill();ctx.stroke();
  ctx.save();ctx.scale(.8,.8);ctx.strokeStyle=`hsla(${hue},65%,85%,.22)`;ctx.stroke();ctx.restore();
  ctx.fillStyle=`hsla(${hue+22},50%,82%,.35)`;ellipse(ctx,-r*.19,-r*.16,r*.36,r*.29,-.5);ctx.fill();
  if(variant===2){ellipse(ctx,r*.43,-r*.07,r*.24,r*.2);ctx.fill();}
  if(variant===4){ctx.beginPath();for(let j=0;j<50;j++){const a=j*.2,rr=j/50*r*.65;j?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(0,0);}ctx.strokeStyle=light;ctx.stroke();}
  if(tier){ctx.strokeStyle=`hsla(${hue+65},70%,85%,.7)`;for(let j=0;j<tier;j++){ellipse(ctx,Math.cos(j*2.5)*r*.4,Math.sin(j*2.5)*r*.38,r*.12,r*.15,j);ctx.stroke();}}
  for(let j=0;j<3+level%4;j++){const a=j*2.4+seed;ellipse(ctx,Math.cos(a)*r*.64,Math.sin(a)*r*.61,2+level*.08,2+level*.08);ctx.fill();}
 }else if(biome===1){
  const wave=Math.sin(phase*2)*r*.12;
  if(level===11||variant===2&&tier>=2){
   for(let j=0;j<5+tier;j++){const x=(j/(4+tier)-.5)*r*1.2;ctx.beginPath();ctx.moveTo(x,0);ctx.bezierCurveTo(x+Math.sin(phase+j)*r*.3,r*.5,x-Math.cos(phase+j)*r*.25,r*.8,x+Math.sin(phase+j)*r*.18,r*1.15);ctx.stroke();}ctx.beginPath();ctx.arc(0,0,r*.85,Math.PI,TAU);ctx.quadraticCurveTo(0,r*.3,-r*.85,0);ctx.fill();ctx.stroke();
  }else if(level===8||variant===3&&tier>1){
   ctx.beginPath();ctx.moveTo(r,0);ctx.bezierCurveTo(r*.2,-r*.2,-r*.6,-r*1.1-wave,-r*.5,-r*1.15);ctx.quadraticCurveTo(-r*.9,0,-r*.5,r*1.15);ctx.bezierCurveTo(-r*.6,r*1.1+wave,r*.2,r*.2,r,0);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(-r*.6,0);ctx.quadraticCurveTo(-r*1.2,wave,-r*1.5,wave*2);ctx.stroke();
  }else{
  ctx.save();ctx.scale([.7,1.1,.85,1,.88][variant],[.75,.72,1.2,.9,1][variant]);
  ctx.beginPath();ctx.moveTo(-r*.6,0);ctx.quadraticCurveTo(-r*1.2,-r*.5,-r*1.4,-r*.55+wave);ctx.lineTo(-r*1.4,r*.55+wave);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(-r*.2,-r*.4);ctx.lineTo(r*.12,-r*(.8+level%3*.1));ctx.lineTo(r*.5,-r*.3);ctx.fill();ctx.stroke();
  ellipse(ctx,0,0,r,r*.64);ctx.fill();ctx.stroke();
  for(let j=0;j<level%4+1;j++){ctx.beginPath();ctx.strokeStyle=`hsla(${hue+35},80%,85%,.5)`;ctx.arc(-r*.45+j*r*.3,0,r*.48,-1.1,1.1);ctx.stroke();}
  if(variant===4){ctx.beginPath();for(let j=0;j<45;j++){const a=j*.22,rr=j/45*r*.54;j?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(0,0);}ctx.stroke();}
  if(tier>=1){ctx.beginPath();ctx.moveTo(r*.35,-r*.5);ctx.quadraticCurveTo(r*.7,-r*1.2,r*1.05,-r*.75+wave);ctx.stroke();orb(ctx,r*1.05,-r*.75+wave,r*.09,light);}
  ctx.restore();}
  ctx.fillStyle=light;ellipse(ctx,r*.36,-r*.15,3,3);ctx.fill();ctx.fillStyle='#172b36';ellipse(ctx,r*.4,-r*.15,1.7,1.7);ctx.fill();
 }else if(biome===2){
  for(const side of[-1,1])for(let j=0;j<2+(variant===2?1:0);j++){ctx.beginPath();ctx.moveTo(side*r*.4,(j-.5)*r*.6);ctx.lineTo(side*r*(.8+Math.sin(phase+j)*.1),(j-.5)*r*1.15);ctx.lineTo(side*r*.23,(j-.5)*r*.9);ctx.fill();ctx.stroke();}
  if(variant===0||variant===4){for(const side of[-1,1]){ctx.save();ctx.rotate(side*.65);ellipse(ctx,side*r*.4,-r*.3,r*.38,r*.85);ctx.fill();ctx.stroke();ctx.restore();}}
  if(tier>0){for(const side of[-1,1]){ctx.beginPath();ctx.moveTo(side*r*.16,-r*.8);ctx.lineTo(side*r*.32,-r*1.2);ctx.lineTo(side*r*.65,-r*1.35);ctx.moveTo(side*r*.32,-r*1.2);ctx.lineTo(side*r*.22,-r*1.4);ctx.stroke();}}
  ellipse(ctx,0,0,r*[.58,.85,.53,.95,.66][variant],r*[.72,.72,1.06,.86,1][variant]);ctx.fill();ctx.stroke();ctx.strokeStyle=`hsla(${hue+30},70%,85%,.4)`;
  for(let j=0;j<level%4+2;j++){ellipse(ctx,0,0,r*(.25+j*.14),r*(.35+j*.14),.3);ctx.stroke();}
  ctx.fillStyle=body;ellipse(ctx,0,-r*.85,r*.36,r*.32);ctx.fill();ctx.stroke();
  for(const side of[-1,1]){ctx.fillStyle='#132925';ellipse(ctx,side*r*.13,-r*.91,2,2);ctx.fill();}
 }else if(biome===3){
  const flap=.6+Math.sin(phase*2)*.35;
  ctx.save();ctx.scale([.78,1.08,.83,1.05,.94][variant],[1,.8,1.1,.75,.95][variant]);
  if(variant===2||tier>=2)for(const side of[-1,1]){ctx.save();ctx.rotate(side*.6);ellipse(ctx,side*r*.45,r*.3,r*.64,r*.42);ctx.fill();ctx.stroke();ctx.restore();}
  for(const side of[-1,1]){ctx.beginPath();ctx.moveTo(0,r*.4);ctx.bezierCurveTo(side*r*.4,-r*1.3*flap,side*r*1.55,-r*1.4*flap,side*r*1.45,-r*.2*flap);ctx.quadraticCurveTo(side*r*.8,r*.5,0,r*.4);ctx.fill();ctx.stroke();for(let j=0;j<3;j++){ctx.beginPath();ctx.moveTo(side*r*.25,0);ctx.lineTo(side*r*(.75+j*.2),-r*(.4+j*.15)*flap);ctx.stroke();}}
  ellipse(ctx,0,0,r*.3,r*.72);ctx.fill();ctx.stroke();ctx.fillStyle=light;ctx.beginPath();ctx.moveTo(-3,-r*.5);ctx.lineTo(0,-r*.95);ctx.lineTo(3,-r*.5);ctx.fill();
  for(let j=0;j<variant+1;j++){const x=(j-variant/2)*r*.13;ctx.beginPath();ctx.moveTo(x,r*.4);ctx.quadraticCurveTo(x*2+Math.sin(phase+j)*r*.1,r*.9,x*2,r*(1+tier*.12));ctx.stroke();}ctx.restore();
 }else if(biome===4){
  if(variant===2){ctx.beginPath();ctx.moveTo(0,-r*.2);ctx.lineTo(-r*1.6,-r*.9);ctx.lineTo(-r*.8,r*.3);ctx.closePath();ctx.globalAlpha=.5;ctx.fill();ctx.globalAlpha=1;}
  if(level>=7&&variant!==0){ctx.save();ctx.rotate(-.4+level*.07);ctx.strokeStyle=`hsla(${hue},65%,78%,.7)`;for(let j=0;j<1+tier;j++){ellipse(ctx,0,0,r*(1.12+j*.1),r*(.38+j*.05));ctx.stroke();}ctx.restore();}
  orb(ctx,0,0,r*[.58,.72,.6,.85,.77][variant],body);
  ctx.save();ellipse(ctx,0,0,r*.82,r*.82);ctx.clip();ctx.strokeStyle=`hsla(${hue+45},45%,90%,.4)`;for(let j=-2;j<3;j++){ctx.beginPath();ctx.moveTo(-r,j*r*.27);ctx.bezierCurveTo(-r*.3,j*r*.27+5,r*.3,j*r*.27-5,r,j*r*.27);ctx.stroke();}ctx.restore();
  if(variant<2){for(let j=0;j<3+tier;j++){const a=j*2.4;ellipse(ctx,Math.cos(a)*r*.35,Math.sin(a)*r*.35,r*.1,r*.07);ctx.fillStyle='#26303f77';ctx.fill();}}
  for(let j=0;j<(level<4?0:1+tier);j++){const a=time*.7+j*TAU/(1+tier)+seed;orb(ctx,Math.cos(a)*r*1.2,Math.sin(a)*r*.55,r*.1,light);}
 }else if(biome===5){
  const petals=3+variant;for(let j=0;j<petals;j++){const a=j*TAU/petals+phase*.12;ctx.save();ctx.rotate(a);ctx.fillStyle=`hsla(${hue+j*8},65%,65%,.24)`;ellipse(ctx,r*.36,0,r*.78,r*(.2+variant*.05));ctx.fill();ctx.restore();}
  ctx.save();ctx.rotate(phase*.12);ctx.fillStyle=fill;ctx.beginPath();for(let j=0;j<petals*2;j++){const a=j*TAU/(petals*2),rr=j%2?r*(.2+tier*.08):r; j?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);}ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();orb(ctx,0,0,r*(.15+tier*.05),light);
 }else if(biome===6){
  const arms=1+variant;ctx.save();ctx.rotate(phase*.1);ctx.scale(1,.48+variant*.1);for(let arm=0;arm<arms;arm++){ctx.beginPath();for(let j=0;j<55;j++){const a=j*(.045+tier*.012)+arm*TAU/arms,rr=r*j/55;j?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(0,0);}ctx.strokeStyle=`hsla(${hue+arm*12},70%,77%,.8)`;ctx.lineWidth=2+tier*.5;ctx.stroke();}ctx.restore();orb(ctx,0,0,r*.24,light);if(variant===1){orb(ctx,r*.55,-r*.22,r*.19,body);}
  for(let j=0;j<9;j++){const a=j*2.4+phase*.1;ctx.fillStyle=light;ellipse(ctx,Math.cos(a)*r*(.4+j/16),Math.sin(a)*r*.6,1.2,1.2);ctx.fill();}
 }else{
  ctx.save();ctx.rotate(phase*.16);for(let j=0;j<2+variant;j++){ctx.rotate(TAU/(2+variant));ellipse(ctx,0,0,r,r*(.18+tier*.1));ctx.strokeStyle=`hsla(${hue+j*20},55%,80%,.65)`;ctx.stroke();}if(tier>=1){ctx.beginPath();for(let j=0;j<=3+variant;j++){const a=j*TAU/(3+variant);j?ctx.lineTo(Math.cos(a)*r*.8,Math.sin(a)*r*.8):ctx.moveTo(Math.cos(a)*r*.8,Math.sin(a)*r*.8);}ctx.stroke();}ctx.restore();orb(ctx,0,0,r*(.2+variant*.04),body);
  ctx.fillStyle='#fff5d7';ellipse(ctx,-r*.08,-r*.08,r*.1,r*.1);ctx.fill();
 }
 if(biome===0){const blink=Math.sin(time*.7+seed)> .997;ctx.fillStyle='#102e2e';for(const side of[-1,1]){ellipse(ctx,r*.22*side,r*.21,2.1,blink?.5:2.7);ctx.fill();}}
 ctx.restore();
}
class Scene{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.width=800;this.height=500;this.time=0;this.fx=[];this.rings=[];this.labels=[];this.born=new WeakMap();this.movers=new WeakMap();this.melds=[];this.transition=0;this.biome=0;this.motion=true;this.quality='high';this.selected=null;this.hover=null;this.pointer=null;this.ro=new ResizeObserver(()=>this.resize());this.ro.observe(canvas);this.resize();}
 resize(){const rect=this.canvas.getBoundingClientRect();this.width=rect.width||800;this.height=rect.height||500;const dpr=Math.min(devicePixelRatio||1,this.quality==='low'?1:2);this.canvas.width=Math.round(this.width*dpr);this.canvas.height=Math.round(this.height*dpr);this.ctx.setTransform(dpr,0,0,dpr,0,0);}
 configure(settings){const old=this.quality;this.motion=settings.motion&&!matchMedia('(prefers-reduced-motion: reduce)').matches;this.quality=settings.quality;if(old!==this.quality)this.resize();}
 radius(){return Math.max(17,Math.min(30,this.width/17));}
 enter(biome){this.biome=biome;this.transition=this.motion?1:0;this.fx=[];this.rings=[];this.labels=[];this.melds=[];this.selected=null;}
 birth(c){this.born.set(c,this.time);if(this.motion)this.rings.push({x:c.x,y:c.y,age:0,kind:'birth'});}
 burst(c,reward,big=false){this.born.set(c,this.time);this.labels.push({x:c.x,y:c.y,age:0,text:big?(window.EvolutionI18n?.t('newForm')||'NOVA FORMA'):`+${reward}`});if(!this.motion)return;this.rings.push({x:c.x,y:c.y,age:0,kind:'merge'});const count=this.quality==='low'?10:big?32:20;for(let i=0;i<count;i++){const a=i/count*TAU;this.fx.push({x:c.x*this.width,y:c.y*this.height,vx:Math.cos(a)*(35+Math.random()*95),vy:Math.sin(a)*(35+Math.random()*95),age:0});}this.fx=this.fx.slice(-160);}
 background(){const ctx=this.ctx,w=this.width,h=this.height,t=this.motion?this.time:0,b=C.biomes[this.biome];
 const g=ctx.createRadialGradient(w*.45,h*.45,1,w*.5,h*.5,w*.75);g.addColorStop(0,b.bg);g.addColorStop(1,'#0a171f');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
 if(this.biome>=4){
  for(let i=0;i<(this.quality==='low'?55:130);i++){const x=(i*137.508+w*.11)%w,y=(i*97.3)%h;ctx.globalAlpha=.18+.5*(.5+.5*Math.sin(i+t*.7));ctx.fillStyle=i%7?'#e5eaf5':b.color;ellipse(ctx,x,y,i%9===0?1.4:.65,i%9===0?1.4:.65);ctx.fill();}ctx.globalAlpha=1;
  ctx.save();ctx.globalAlpha=.32;
  if(this.biome===4){ctx.translate(w*.78,h*.45);ctx.rotate(-.4);ellipse(ctx,0,0,w*.28,w*.08);ctx.strokeStyle='#b5aac5';ctx.lineWidth=10;ctx.stroke();orb(ctx,0,0,Math.min(w,h)*.24,'#6d6592');}
  if(this.biome===5){for(let i=0;i<4;i++){const x=w*(.25+i*.16)+Math.sin(t*.08+i)*20,y=h*(.4+Math.sin(i)*.16);const fog=ctx.createRadialGradient(x,y,0,x,y,w*.32);fog.addColorStop(0,i%2?'#cc66994d':'#688ce64d');fog.addColorStop(1,'#00000000');ctx.fillStyle=fog;ctx.fillRect(0,0,w,h);}}
  if(this.biome===6){ctx.translate(w*.52,h*.5);ctx.rotate(-.5+t*.015);ctx.scale(1,.65);for(let a=0;a<4;a++){ctx.beginPath();for(let j=0;j<140;j++){const angle=j*.035+a*TAU/4,r=j*w*.0022; j?ctx.lineTo(Math.cos(angle)*r,Math.sin(angle)*r):ctx.moveTo(0,0);}ctx.strokeStyle='#b7a2f0';ctx.lineWidth=4;ctx.stroke();}}
  if(this.biome===7){ctx.translate(w*.5,h*.5);for(let j=0;j<5;j++){ctx.rotate(.6+t*.001);ellipse(ctx,0,0,w*.34,w*.14);ctx.strokeStyle='#f7e0a0';ctx.lineWidth=1;ctx.stroke();}}
  ctx.restore();
 }else{
  ctx.strokeStyle='#b7ded008';ctx.lineWidth=1;for(let j=0;j<4;j++){ellipse(ctx,w*.5,h*.5,w*(.22+j*.11),h*(.2+j*.12));ctx.stroke();}
  if(this.biome===1){ctx.save();ctx.globalAlpha=.055;ctx.fillStyle='#bceaf3';for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(w*(i*.24)-20,0);ctx.lineTo(w*(i*.24)+40,0);ctx.lineTo(w*(i*.24)+100+Math.sin(t*.1)*30,h);ctx.lineTo(w*(i*.24)+10,h);ctx.fill();}ctx.restore();}
  if(this.biome===2){ctx.strokeStyle='#9dc48735';for(let i=0;i<18;i++){const x=i*w/17;ctx.beginPath();ctx.moveTo(x,h);ctx.quadraticCurveTo(x+Math.sin(t+i)*8,h-30,x+Math.sin(i)*20,h-40-i%4*13);ctx.stroke();}}
  if(this.biome===3){ctx.save();ctx.globalAlpha=.045;ctx.fillStyle='#e2eafa';for(let i=0;i<4;i++){ellipse(ctx,(i*w*.34+t*3)%(w+200)-100,h*(.25+i*.15),100,25);ctx.fill();}ctx.restore();}
  for(let i=0;i<45;i++){ctx.fillStyle='#c1e3cf22';const x=(i*137.5)%w,y=(i*91.7+t*(i%3+1))%h;ellipse(ctx,x,y,i%3? .8:1.6,i%3?.8:1.6);ctx.fill();}
 }
}
 meld(sources,c,text){
  if(!this.motion){this.burst(c,'',false);this.labels[this.labels.length-1].text=text;return;}
  this.melds.push({sources,c,text,age:0,done:false});
 }
 update(dt,creatures,dragging){
  this.time+=dt;if(!this.motion)return;
  const gap=this.radius()*2.35;
  creatures.forEach((c,i)=>{
   let m=this.movers.get(c);if(!m){m={seed:Math.random()*20,angle:Math.random()*TAU,vx:0,vy:0};this.movers.set(c,m);}
   if(c===dragging||c===this.selected||this.melds.some(f=>f.c===c&&f.age<.42))return;
   m.angle+=Math.sin(this.time*.55+m.seed)*dt*.65;
   const speed=[16,27,19,30,11,13,9,12][this.biome]*(this.biome===2?(Math.sin(this.time*1.3+m.seed)>-.1?1:.1):1);
   m.vx+=(Math.cos(m.angle)*speed-m.vx)*Math.min(1,dt*2);m.vy+=(Math.sin(m.angle)*speed-m.vy)*Math.min(1,dt*2);
   c.x+=m.vx/this.width*dt;c.y+=m.vy/this.height*dt;
   if(c.x<.1||c.x>.9){m.angle=Math.PI-m.angle;m.vx=-m.vx;}if(c.y<.17||c.y>.81){m.angle=-m.angle;m.vy=-m.vy;}
   for(let j=i+1;j<creatures.length;j++){const other=creatures[j];if(other===dragging||other===this.selected)continue;let dx=(c.x-other.x)*this.width,dy=(c.y-other.y)*this.height,d=Math.hypot(dx,dy);if(d<gap){if(d<.1){dx=.1;dy=.1;d=Math.hypot(dx,dy);}const f=(gap-d)*dt*1.2;c.x+=dx/d*f/this.width;c.y+=dy/d*f/this.height;other.x-=dx/d*f/this.width;other.y-=dy/d*f/this.height;}}
   c.x=Math.max(.1,Math.min(.9,c.x));c.y=Math.max(.17,Math.min(.81,c.y));
  });
 }
 draw(creatures,dt){const ctx=this.ctx,w=this.width,h=this.height;this.background();
 if(this.selected){for(const c of creatures){if(c!==this.selected&&c.level===this.selected.level&&c.level<20){ctx.save();ctx.globalAlpha=.16;ctx.strokeStyle=C.biomes[this.biome].color;ctx.setLineDash([2,7]);ctx.beginPath();ctx.moveTo(this.selected.x*w,this.selected.y*h);ctx.lineTo(c.x*w,c.y*h);ctx.stroke();ctx.restore();}}}
 const draw=(c,i)=>{if(this.melds.some(f=>f.c===c&&f.age<.42))return;ctx.save();ctx.translate(c.x*w,c.y*h);const age=this.time-(this.born.get(c)??-100);if(this.motion&&age<.7){const scale=1+Math.sin(age*14)*Math.exp(-age*6)*.3;ctx.scale(scale,scale);}if(this.pointer===c)ctx.scale(1.12,1.12);ctx.save();const mover=this.movers.get(c);if(this.biome===1&&mover?.vx<0)ctx.scale(-1,1);if(this.biome===2&&mover)ctx.rotate(mover.angle+Math.PI/2);specimen(ctx,this.biome,c.level,this.radius(),this.motion?this.time:0,mover?.seed||i,c===this.selected);ctx.restore();ctx.fillStyle=c===this.selected?'#f4f3df':'#c2d4cc';ctx.font='600 10px Segoe UI';ctx.textAlign='center';ctx.fillText(String(c.level).padStart(2,'0'),0,this.radius()+17);ctx.restore();};
 creatures.forEach((c,i)=>{if(c!==this.pointer)draw(c,i);});if(this.pointer&&creatures.includes(this.pointer))draw(this.pointer,creatures.indexOf(this.pointer));
 for(const f of this.melds){
 f.age+=dt;
 if(f.age<.42){const progress=Math.min(1,f.age/.42),ease=progress*progress*(3-2*progress);f.sources.forEach((source,j)=>{const x=(source.x+(f.c.x-source.x)*ease)*w,y=(source.y+(f.c.y-source.y)*ease)*h;ctx.save();ctx.translate(x,y);ctx.rotate((j?-1:1)*progress*.6);const scale=(1-progress*.85)*(1+Math.sin(progress*Math.PI)*.15);ctx.scale(scale,1.1*scale);ctx.globalAlpha=1-progress*.5;specimen(ctx,this.biome,source.level,this.radius(),this.time,j);ctx.restore();});ctx.save();ctx.globalAlpha=progress*.35;ctx.fillStyle=C.biomes[this.biome].color;ellipse(ctx,f.c.x*w,f.c.y*h,this.radius()*progress*1.3,this.radius()*progress*1.3);ctx.fill();ctx.restore();}
 else if(!f.done){f.done=true;this.burst(f.c,'',true);this.labels[this.labels.length-1].text=f.text;}
 }
 this.melds=this.melds.filter(f=>f.age<.7);
 for(const p of this.fx){p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;ctx.globalAlpha=Math.max(0,1-p.age*1.4);ctx.fillStyle=C.biomes[this.biome].color;ellipse(ctx,p.x,p.y,2,2);ctx.fill();}this.fx=this.fx.filter(p=>p.age<.7);ctx.globalAlpha=1;
 for(const ring of this.rings){ring.age+=dt;ctx.globalAlpha=Math.max(0,1-ring.age*1.5)*.5;ctx.strokeStyle=C.biomes[this.biome].color;ctx.lineWidth=1;ellipse(ctx,ring.x*w,ring.y*h,this.radius()+ring.age*65,this.radius()+ring.age*65);ctx.stroke();}this.rings=this.rings.filter(r=>r.age<.7);ctx.globalAlpha=1;
 for(const label of this.labels){label.age+=dt;ctx.globalAlpha=Math.min(1,Math.max(0,(1.5-label.age)*2));ctx.font='600 12px Segoe UI';ctx.textAlign='center';ctx.fillStyle=C.biomes[this.biome].color;ctx.fillText(label.text,label.x*w,label.y*h-this.radius()-12-(this.motion?label.age*22:0));}this.labels=this.labels.filter(l=>l.age<1.5);ctx.globalAlpha=1;
 if(this.transition>0){this.transition=Math.max(0,this.transition-dt*1.5);ctx.globalAlpha=this.transition;ctx.fillStyle='#0b161e';ctx.fillRect(0,0,w,h);ctx.globalAlpha=1;}
 }
 thumbnail(biome,level){const c=document.createElement('canvas');c.width=160;c.height=140;const x=c.getContext('2d');x.translate(80,70);specimen(x,biome,level,42,0,level);return c.toDataURL('image/png');}
}
class HomeScene{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.time=0;this.motion=true;this.width=700;this.height=800;this.ro=new ResizeObserver(()=>this.resize());this.ro.observe(canvas);this.resize();}
 configure(settings){this.motion=settings.motion&&!matchMedia('(prefers-reduced-motion: reduce)').matches;}
 resize(){const r=this.canvas.getBoundingClientRect();this.width=r.width||700;this.height=r.height||800;const dpr=Math.min(devicePixelRatio||1,2);this.canvas.width=this.width*dpr;this.canvas.height=this.height*dpr;this.ctx.setTransform(dpr,0,0,dpr,0,0);}
 draw(dt){if(this.motion)this.time+=dt;const ctx=this.ctx,w=this.width,h=this.height,time=this.time;const g=ctx.createRadialGradient(w*.56,h*.5,5,w*.5,h*.5,w*.8);g.addColorStop(0,'#2f5150');g.addColorStop(.5,'#1c303b');g.addColorStop(1,'#0e1a1e');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
 for(let i=0;i<100;i++){ctx.fillStyle=i%4?'#d2e7cb':'#e4bb86';ctx.globalAlpha=.12+(.5+.5*Math.sin(time*.6+i))*.4;ellipse(ctx,(i*137.51)%w,(i*97.3+time*(i%3)*.9)%h,i%13===0?1.6:.8,i%13===0?1.6:.8);ctx.fill();}ctx.globalAlpha=1;
 const cx=w*.54,cy=h*.49,base=Math.min(w,h)*.22;
 ctx.save();ctx.translate(cx,cy);ctx.rotate(-.35);for(let i=0;i<3;i++){ctx.strokeStyle=i===1?'#d2e7bd36':'#a2c9c71a';ctx.lineWidth=1;ellipse(ctx,0,0,base*(1.25+i*.43),base*(.82+i*.25));ctx.stroke();}ctx.restore();
 ctx.save();ctx.translate(cx,cy);ctx.rotate(Math.sin(time*.2)*.09);specimen(ctx,0,5,base*.74,time,5);ctx.restore();
 const satellites=[{b:1,l:6,a:2.6,r:1.8,size:.3},{b:3,l:8,a:4.6,r:1.6,size:.26},{b:4,l:6,a:.6,r:1.7,size:.36},{b:6,l:8,a:5.3,r:2.15,size:.31}];
 satellites.forEach((o,i)=>{const a=o.a+time*.035*(i%2?1:-1),x=cx+Math.cos(a)*base*o.r,y=cy+Math.sin(a)*base*o.r*.83;ctx.save();ctx.translate(x,y);specimen(ctx,o.b,o.l,base*o.size,time,i);ctx.restore();});
 ctx.strokeStyle='#d7e5c450';ctx.beginPath();ctx.moveTo(cx-base*.35,cy+base*.7);ctx.lineTo(cx-base*.75,cy+base*1.2);ctx.lineTo(cx-base*1.7,cy+base*1.2);ctx.stroke();ctx.fillStyle='#d7e5c4';ellipse(ctx,cx-base*.35,cy+base*.7,3,3);ctx.fill();
 }
}
window.EvolutionArt={Scene,HomeScene,specimen};
})();


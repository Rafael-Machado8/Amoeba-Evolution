const fs=require('node:fs');const p='js/art.js';let s=fs.readFileSync(p,'utf8');
s=s.replace('this.born=new WeakMap();','this.born=new WeakMap();this.movers=new WeakMap();this.melds=[];');
s=s.replace('this.labels=[];this.selected=null;','this.labels=[];this.melds=[];this.selected=null;');
s=s.replace("text:big?'NOVA FORMA':`+${reward}`","text:big?(window.EvolutionI18n?.t('newForm')||'NOVA FORMA'):`+${reward}`");
const start=s.indexOf(' update(dt,creatures,dragging){'),end=s.indexOf(' draw(creatures,dt){',start);
s=s.slice(0,start)+` meld(sources,c,text){
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
`+s.slice(end);
s=s.replace('const draw=(c,i)=>{ctx.save();','const draw=(c,i)=>{if(this.melds.some(f=>f.c===c&&f.age<.42))return;ctx.save();');
s=s.replace('specimen(ctx,this.biome,c.level,this.radius(),this.motion?this.time:0,i,c===this.selected);','ctx.save();const mover=this.movers.get(c);if(this.biome===1&&mover?.vx<0)ctx.scale(-1,1);if(this.biome===2&&mover)ctx.rotate(mover.angle+Math.PI/2);specimen(ctx,this.biome,c.level,this.radius(),this.motion?this.time:0,mover?.seed||i,c===this.selected);ctx.restore();');
s=s.replace('for(const p of this.fx){',`for(const f of this.melds){
 f.age+=dt;
 if(f.age<.42){const progress=Math.min(1,f.age/.42),ease=progress*progress*(3-2*progress);f.sources.forEach((source,j)=>{const x=(source.x+(f.c.x-source.x)*ease)*w,y=(source.y+(f.c.y-source.y)*ease)*h;ctx.save();ctx.translate(x,y);ctx.rotate((j?-1:1)*progress*.6);const scale=(1-progress*.85)*(1+Math.sin(progress*Math.PI)*.15);ctx.scale(scale,1.1*scale);ctx.globalAlpha=1-progress*.5;specimen(ctx,this.biome,source.level,this.radius(),this.time,j);ctx.restore();});ctx.save();ctx.globalAlpha=progress*.35;ctx.fillStyle=C.biomes[this.biome].color;ellipse(ctx,f.c.x*w,f.c.y*h,this.radius()*progress*1.3,this.radius()*progress*1.3);ctx.fill();ctx.restore();}
 else if(!f.done){f.done=true;this.burst(f.c,'',true);this.labels[this.labels.length-1].text=f.text;}
 }
 this.melds=this.melds.filter(f=>f.age<.7);
 for(const p of this.fx){`);
const marker='window.EvolutionArt={Scene,specimen};';
s=s.replace(marker,`class HomeScene{
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
window.EvolutionArt={Scene,HomeScene,specimen};`);
fs.writeFileSync(p,s);

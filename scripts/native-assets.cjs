const fs=require('node:fs'),path=require('node:path'),{Resvg}=require('@resvg/resvg-js');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const icon=read('assets/icon.svg').trim(),square=icon.replace('rx="112"','rx="0"');
function png(svg,size,file){const dest=path.join(root,file),bytes=new Resvg(svg,{fitTo:{mode:'width',value:size}}).render().asPng();fs.mkdirSync(path.dirname(dest),{recursive:true});if(fs.existsSync(dest)&&fs.readFileSync(dest).equals(bytes))return;const temp=dest+'.tmp';fs.writeFileSync(temp,bytes);fs.renameSync(temp,dest);}
const android='android/app/src/main/res/';
for(const [density,size] of Object.entries({mdpi:48,hdpi:72,xhdpi:96,xxhdpi:144,xxxhdpi:192})){
 for(const name of ['ic_launcher','ic_launcher_round'])png(square,size,`${android}mipmap-${density}/${name}.png`);
 png(square,Math.round(size*2.25),`${android}mipmap-${density}/ic_launcher_foreground.png`);
}
const body=icon.replace(/^<svg[^>]+>/,'').replace(/<\/svg>$/,'');
const splash=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732"><rect width="2732" height="2732" fill="#101d20"/><g transform="translate(1110 1110)">${body}</g></svg>`;
for(const dir of fs.readdirSync(path.join(root,android)).filter(d=>d.startsWith('drawable'))){const file=`${android}${dir}/splash.png`;if(fs.existsSync(path.join(root,file)))png(splash,1024,file);}
png(square,1024,'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png');
for(const suffix of ['','-1','-2'])png(splash,2732,`ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732${suffix}.png`);
console.log('Original launcher icons and dark launch screens generated for Android and iOS.');

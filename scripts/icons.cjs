const fs=require('node:fs'),path=require('node:path'),{Resvg}=require('@resvg/resvg-js');
const root=path.resolve(__dirname,'..'),svg=fs.readFileSync(path.join(root,'assets/icon.svg'),'utf8');
for(const size of[192,512])fs.writeFileSync(path.join(root,`assets/icon-${size}.png`),new Resvg(svg,{fitTo:{mode:'width',value:size}}).render().asPng());
const mask=svg.replace('<rect width="512" height="512" rx="112"','<rect width="512" height="512" rx="0"');fs.writeFileSync(path.join(root,'assets/icon-maskable.png'),new Resvg(mask,{fitTo:{mode:'width',value:512}}).render().asPng());
const png=new Resvg(svg,{fitTo:{mode:'width',value:256}}).render().asPng(),ico=Buffer.alloc(22);ico.writeUInt16LE(1,2);ico.writeUInt16LE(1,4);ico.writeUInt16LE(1,10);ico.writeUInt16LE(32,12);ico.writeUInt32LE(png.length,14);ico.writeUInt32LE(22,18);fs.writeFileSync(path.join(root,'assets/icon.ico'),Buffer.concat([ico,png]));
console.log('Generated icons: 192px, 512px, maskable and Windows ICO.');

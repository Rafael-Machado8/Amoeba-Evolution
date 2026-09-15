const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist'),C=require('../js/content.js');
async function build(){
 fs.mkdirSync(out,{recursive:true});
 const files=['css/evolution.css','js/content.js','js/i18n.js','js/evolution-core.js','js/achievements.js','js/storage.js','js/art.js','js/audio.js','js/evolution.js','assets/icon.svg','assets/icon-192.png','assets/icon-512.png','assets/icon-maskable.png','manifest.webmanifest','THIRD_PARTY_NOTICES.txt'];
 for(const file of files){const dest=path.join(out,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(root,file),dest);}
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const routes=[...C.biomes.map(b=>b.file),'library.html','library-peixes.html','library-terrestre.html','library-ceu.html'];
 for(const file of routes){fs.writeFileSync(path.join(root,file),html);fs.writeFileSync(path.join(out,file),html);}
 await require('esbuild').build({entryPoints:[path.join(root,'js/native-entry.js')],bundle:true,format:'iife',outfile:path.join(out,'js/native.js'),target:'chrome110',minify:true,legalComments:'eof'});
 fs.copyFileSync(path.join(out,'js/native.js'),path.join(root,'js/native.js'));
 const all=[...routes,...files,'js/native.js'];const hash=crypto.createHash('sha256');for(const f of all)hash.update(fs.readFileSync(path.join(out,f)));const version=hash.digest('hex').slice(0,12);
 const sw=`const CACHE='amoeba-${version}';const FILES=${JSON.stringify(all.map(f=>'./'+f))};\nself.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));\nself.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('amoeba-')&&k!==CACHE).map(k=>caches.delete(k))))));\nself.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):Response.error())));});\n`;
 fs.writeFileSync(path.join(out,'sw.js'),sw);fs.writeFileSync(path.join(root,'sw.js'),sw);
 fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({version:C.version,hash:version,files:all.length,generatedAt:new Date().toISOString()},null,2));
 console.log(`Built ${all.length+2} files in dist; content hash ${version}.`);
}
build().catch(e=>{console.error(e);process.exitCode=1;});


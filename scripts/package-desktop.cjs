const fs=require('node:fs'),path=require('node:path');
(async()=>{
 const root=path.resolve(__dirname,'..'),stage=path.join(root,'release','desktop-source');
 fs.mkdirSync(stage,{recursive:true});fs.cpSync(path.join(root,'dist'),path.join(stage,'dist'),{recursive:true});fs.cpSync(path.join(root,'desktop'),path.join(stage,'desktop'),{recursive:true});
 fs.writeFileSync(path.join(stage,'package.json'),JSON.stringify({name:'amoeba-evolution',version:'0.3.0',main:'desktop/main.cjs',description:'Da gota ao cosmos'},null,2));
 const {packager}=await import('@electron/packager');
 const result=await packager({dir:stage,out:path.join(root,'release'),name:'Amoeba Evolution',executableName:'Amoeba Evolution',platform:'win32',arch:'x64',electronVersion:'44.3.0',asar:true,overwrite:true,prune:true,icon:path.join(root,'assets/icon.ico'),download:{cacheRoot:path.join(root,'.npm-cache/electron-download')}});
 console.log(result.join('\n'));
})().catch(e=>{console.error(e);process.exitCode=1;});

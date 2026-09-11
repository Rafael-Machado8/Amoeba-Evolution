const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=process.argv.includes('--dist')?path.join(__dirname,'dist'):__dirname;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webmanifest':'application/manifest+json','.json':'application/json'};
const allowed=/^(?:\/(?:index|peixes|terrestre|ceu|orbita|nebulosa|galaxia|alem|library(?:-(?:peixes|terrestre|ceu))?)\.html|\/(?:js|css|assets)\/[\w/.-]+|\/manifest\.webmanifest|\/sw\.js|\/)$/;
const server=http.createServer((req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 if(!allowed.test(pathname)||pathname.includes('..')||pathname.includes('\\')){res.writeHead(404).end('Not found');return;}
 const target=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!target.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 fs.readFile(target,(err,content)=>{if(err){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:content);});
});
server.listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log('Amoeba Evolution: http://127.0.0.1:'+(Number(process.env.PORT)||4173)));

const{app,BrowserWindow,Menu,session}=require('electron');const path=require('node:path');
let window;
app.setName('Amoeba Evolution');
app.whenReady().then(()=>{
 Menu.setApplicationMenu(null);
 session.defaultSession.setPermissionRequestHandler((_webContents,_permission,callback)=>callback(false));
 session.defaultSession.setPermissionCheckHandler(()=>false);
 window=new BrowserWindow({width:1400,height:960,minWidth:360,minHeight:640,backgroundColor:'#101d20',title:'Amoeba Evolution',icon:path.join(__dirname,'../dist/assets/icon-512.png'),autoHideMenuBar:true,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true,webSecurity:true}});
 window.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 window.webContents.on('will-navigate',event=>event.preventDefault());
 window.webContents.on('before-input-event',(event,input)=>{if(input.type==='keyDown'&&input.key==='F11'){window.setFullScreen(!window.isFullScreen());event.preventDefault();}});
 session.defaultSession.on('will-download',(_event,item)=>{item.setSaveDialogOptions({title:'Exportar progresso',defaultPath:'amoeba-evolution-save.json',filters:[{name:'Progresso JSON',extensions:['json']}]});});
 window.loadFile(path.join(__dirname,'../dist/index.html'));
 window.on('closed',()=>window=null);
});
app.on('window-all-closed',()=>app.quit());

import {Capacitor} from '@capacitor/core';
import {Filesystem,Directory,Encoding} from '@capacitor/filesystem';
import {Share} from '@capacitor/share';
import {App} from '@capacitor/app';
if(Capacitor.isNativePlatform()){
 window.AmoebaNative={
  async exportSave(text){const filename='amoeba-evolution-save.json';await Filesystem.writeFile({path:filename,data:text,directory:Directory.Cache,encoding:Encoding.UTF8});const {uri}=await Filesystem.getUri({path:filename,directory:Directory.Cache});await Share.share({title:'Progresso do Amoeba Evolution',files:[uri],dialogTitle:'Guardar uma cópia do progresso'});},
  exit(){return App.exitApp();}
 };
 App.addListener('backButton',()=>window.dispatchEvent(new Event('amoeba-back')));
}

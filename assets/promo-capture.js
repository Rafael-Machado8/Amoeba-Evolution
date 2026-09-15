// Capture-only scene. Not included in distribution builds. Uses the game's actual
// merge rules, specimen renderer and merge animation, enlarged for the page GIF.
const scene=new EvolutionArt.Scene(document.getElementById('scene'));scene.radius=()=>48;
let state,frame;
function reset(){state=Evolution.fresh();state.creatures=[{level:3,x:.33,y:.54},{level:3,x:.67,y:.54}];state.discovered=[1,2,3];state.best=3;frame=0;scene.time=0;scene.enter(0);scene.transition=0;scene.draw(state.creatures,0);document.getElementById('frame').textContent='Quadro 0';}
function next(){frame++;if(frame===22){const result=Evolution.merge(state,...state.creatures);scene.meld(result.sources,result.creature,'NOVA FORMA');}
 scene.time=frame/20;scene.draw(state.creatures,1/20);document.getElementById('frame').textContent='Quadro '+frame;
}
document.getElementById('reset').onclick=reset;document.getElementById('next').onclick=next;reset();

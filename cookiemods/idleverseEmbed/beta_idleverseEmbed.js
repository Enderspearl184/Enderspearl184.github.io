if(Game.Objects['Idleverse'].minigame) throw new Error("Unable to load Idleverse minigame over itself.");

var M = {};
M.parent = Game.Objects['Idleverse'];
M.parent.minigame = M;
M.loadedCount = 0;
M.version = '3.16';
M.GameVersion = '2.031';

M.launch = function(){
    console.log("launch")
	var M = this;

	M.init = function(div){
   		div.style.height="300px";
		var str = '';
		str += '<iframe height=100% width=100% src="https://orteil.dashnet.org/experiments/cookie"></iframe>';
		div.innerHTML = str;
		div.children[0].style.zoom=0.75
		div.children[0].style["-moz-transform"]={scale:0.75}
		div.children[0].style["-moz-transform-origin"]=[0,0]
		M.loadedCount++;
		if (Game.prefs.popups) Game.Popup('Minigame loaded!');
		else Game.Notify('Minigame loaded!', '', '', 1, 1);
	};
	M.save=function(){};
	M.init(l('rowSpecial' + M.parent.id));
}


M.launcher = function(){
    console.log("launcher")
	var M = Game.Objects['Idleverse'].minigame;
	M.parent.minigameName = 'Classic Clicker';
	M.parent.minigameUrl = 'https://enderspearl184.github.io/cookiemods/idleverseEmbed/dummy.js'
	M.name = M.parent.minigameName;
	M.savePrefix = 'minigameClicker';
	Game.LoadMinigames();
}

M.launcher();

var M = 0;

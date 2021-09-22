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
   		div.style.height="600px";
		var str = '';
		str += '<iframe height=100% width=100% src="https://orteil.dashnet.org/experiments/cookie"></iframe>';
		div.innerHTML = str;
		M.loadedCount++;
		if (Game.prefs.popups) Game.Popup('Minigame loaded!');
		else Game.Notify('Minigame loaded!', '', '', 1, 1);
	};
	M.save=function(){};
	M.reset=function(){};
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

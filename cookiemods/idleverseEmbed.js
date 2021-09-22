if(Game.Objects['Idleverse'].minigame) throw new Error("Cannot load minigame over itself.");

//if(typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/' + (0 ? 'Beta/' : '') + 'CCSE.js');
var M = {};
M.parent = Game.Objects['Idleverse'];
M.parent.minigame = M;
M.loadedCount = 0;
M.version = '3.16';
M.GameVersion = '2.031';

M.launch = function(){
	var M = this;
	
	M.init = function(div){
		
		var str = '<iframe src="https://orteil.dashnet.org/experiments/cookie"></iframe>'
		div.innerHTML = str;
		
		M.loadedCount++;
		if (Game.prefs.popups) Game.Popup('Minigame loaded!');
		else Game.Notify('Minigame loaded!', '', '', 1, 1);
	}
}


M.launcher = function(){
	var M = Game.Objects['Idleverse'].minigame;
	
	// Stuff that needs to wait for CCSE but should only run once goes here
	//M.parent.minigameUrl = 'https://klattmose.github.io/CookieClicker/dummyFile.js';
	M.parent.minigameName = 'Classic Clicker';
	
	M.name = M.parent.minigameName;
	//M.savePrefix = 'minigameCasino';
	//M.sourceFolder = 'https://klattmose.github.io/CookieClicker/' + (0 ? 'Beta/' : '');
	
	Game.LoadMinigames();
}

//if(CCSE && CCSE.isLoaded){
	M.launcher();
}
//else{
//	if(!CCSE) var CCSE = {};
//	if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
//	CCSE.postLoadHooks.push(M.launcher);
//}

var M = 0;

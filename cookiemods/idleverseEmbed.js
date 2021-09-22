if(Game.Objects['Idleverse'].minigame) throw new Error("Unable to load Idleverse minigame over itself.");

var M = {};
M.parent = Game.Objects['Idleverse'];
M.parent.minigame = M;
M.loadedCount = 0;
M.version = '3.16';
M.GameVersion = '2.031';

M.launch = function(){
	var M = this;
	
	M.init = function(div){

		
		
		
		var str = '';
		str += '<iframe src="https://orteil.dashnet.org/experiments/cookie"></iframe>';
		div.innerHTML = str;
		
		M.sidebarL = l('casinoSidebar');
		M.moneyL = l('casinoMoney');
		M.actionsL = l('casinoActions');
		M.tableL = l('casinoTable');
		M.gameL = l('casinoGame');
		M.infoL = l('casinoInfo');
		
		M.reset();
		
		M.buildSidebar();
		M.buildTable();
		
		M.loadedCount++;
		if (Game.prefs.popups) Game.Popup('Casino loaded!');
		else Game.Notify('Casino loaded!', '', '', 1, 1);
	}
	
	M.save = function(){
		//output cannot use ",", ";" or "|"
		
		var getMinigameStateSave = function(){
			var res = '';
			res += parseInt(M.parent.onMinigame ? '1' : '0');
			res += '_' + parseInt(M.games.Blackjack.wins);
			res += '_' + parseInt(M.games.Blackjack.winsT);
			res += '_' + parseInt(M.games.Blackjack.ownLuckWins);
			res += '_' + parseInt(M.games.Blackjack.tiesLost);
			res += '_' + parseInt(M.betMode);
			res += '_' + parseInt(M.betChoice);
			res += '_' + parseFloat(M.games.Blackjack.netTotal);
			res += '_' + parseInt(0);
			res += '_' + parseInt(M.beatLength);
			
			return res;
		}
		
		var getGameStateSave = function(){
			var res = '';
			res += parseInt(M.currentPlayerHand);
			res += '_' + parseInt(M.nextBeat);
			res += '_' + parseInt(M.games.Blackjack.phase);
			res += '_' + parseInt(M.games.Blackjack.istep);
			res += '_' + parseFloat(M.betAmount);
			res += '_' + parseInt(M.games.Blackjack.hiddenCard.pip + 13 * M.games.Blackjack.hiddenCard.suit);
			
			return res;
		}
		
		var getCardSave = function(deck){
			var res = '';
			for(var i = 0; i < deck.length; i++) res += (res.length ? '-' : '') + (deck[i].pip + 13 * deck[i].suit);
			return res;
		}
		
		var getPlayerHandsSave = function(){
			var res = '';
			for(var i = 0; i < M.hands.player.length; i++) res += (res.length ? '_' : '') + getCardSave(M.hands.player[i].cards);
			return res;
		}
		
		var getAchievementSave = function(){
			var res = '';
			for(var i = 0; i < M.Achievements.length; i++) res += Math.min(M.Achievements[i].won);
			return res;
		}
		
		var getUpgradeSave = function(){
			var res = '';
			for (var i in M.Upgrades){
				var me = M.Upgrades[i];
				res += Math.min(me.unlocked, 1) + '' + Math.min(me.bought, 1);
			}
			return res;
		}
		
		
		var str = getMinigameStateSave();
		str += ' ' + getGameStateSave();
		str += ' ' + getCardSave(M.hands.dealer.cards);
		str += ' ' + getPlayerHandsSave();
		str += ' ' + getCardSave(M.Deck);
		str += ' ' + getAchievementSave();
		str += ' ' + getUpgradeSave();
		
		CCSE.config.OtherMods[M.name] = str;
		M.saveString = str;
		return ''; //str;
	}
	
	M.load = function(str){
		//interpret str; called after .init
		//note : not actually called in the Game's load; see "minigameSave" in main.js
		if(!str) return false;
		M.saveString = str;
		
		var parseMinigameStateSave = function(str){
			var i = 0;
			var spl = str.split('_');
			var on = parseInt(spl[i++] || 0);
			M.games.Blackjack.wins = parseInt(spl[i++] || 0);
			M.games.Blackjack.winsT = parseInt(spl[i++] || 0);
			M.games.Blackjack.ownLuckWins = parseInt(spl[i++] || 0);
			M.games.Blackjack.tiesLost = parseInt(spl[i++] || 0);
			M.betMode = parseInt(spl[i++] || 0);
			M.betChoice = parseInt(spl[i++] || 0);
			M.games.Blackjack.netTotal = parseFloat(spl[i++] || 0);
			var dummy = parseInt(spl[i++] || 0);
			M.beatLength = parseInt(spl[i++] || 750);
			
			if(on && Game.ascensionMode != 1) M.parent.switchMinigame(1);
		}
		
		var parseGameStateSave = function(str){
			var i = 0;
			var spl = str.split('_');
			M.currentPlayerHand = parseInt(spl[i++] || 0);
			M.nextBeat = parseInt(spl[i++] || 0);
			M.games.Blackjack.phase = parseInt(spl[i++] || 0);
			M.games.Blackjack.istep = parseInt(spl[i++] || 0);
			M.betAmount = parseFloat(spl[i++] || 0);
			M.games.Blackjack.hiddenCard = M.cards[parseInt(spl[i++] || 0)];
		}
		
		var parseCardSave = function(str){
			var res = [];
			if(str){
				var arr = str.split('-');
				for(var i = 0; i < arr.length; i++){
					res.push(M.cards[arr[i]]);
				}
			} 
			return res;
		}
		
		var parsePlayerHandsSave = function(str){
			M.hands.player = [];
			if(str){
				var hands = str.split('_');
				for(var i = 0; i < hands.length; i++){
					M.hands.player.push({cards:parseCardSave(hands[i])});
					M.games.Blackjack.getHandValue(M.hands.player[i]);
				} 
			}else{
				M.hands.player = [{value:0, cards:[]}];
			}
		}
		
		var parseAchievementSave = function(str){
			var spl = str.split('');
			for (var i in M.Achievements){
				var me = M.Achievements[i];
				if(spl[i]){
					var mestr = [spl[i]];
					me.won = parseInt(mestr[0]);
				}else{
					me.won = 0;
				}
				if(me.won && Game.CountsAsAchievementOwned(me.pool)) Game.AchievementsOwned++;
			}
		}
		
		var parseUpgradeSave = function(str){
			var spl = str.split('');
			for (var i in M.Upgrades){
				var me = M.Upgrades[i];
				if (spl[i * 2]){
					var mestr = [spl[i * 2],spl[i * 2 + 1]];
					me.unlocked = parseInt(mestr[0]);
					me.bought = parseInt(mestr[1]);
					if (me.bought && Game.CountsAsUpgradeOwned(me.pool)) Game.UpgradesOwned++;
				}
				else{
					me.unlocked = 0;
					me.bought = 0;
				}
			}
		}
		
		
		var i = 0;
		var spl = str.split(' ');
		parseMinigameStateSave(spl[i++] || '');
		parseGameStateSave(spl[i++] || '');
		M.hands.dealer = {cards:parseCardSave(spl[i++] || 0)};
		parsePlayerHandsSave(spl[i++] || 0);
		M.Deck = parseCardSave(spl[i++] || 0);
		parseAchievementSave(spl[i++] || '');
		parseUpgradeSave(spl[i++] || '');
		
		M.games.Blackjack.getHandValue(M.hands.dealer);
		if(M.Deck.length < (M.minDecks * 52)) M.reshuffle();
		if(M.games.Blackjack.phase == M.games.Blackjack.phases.inactive){
			M.hands = {dealer:{value:0, cards:[]}, player:[{value:0, cards:[]}]};
			M.currentPlayerHand = 0;
		}
		
		M.games.Blackjack.buildSidebar();
		M.games.Blackjack.buildTable();
	}
	
	M.reset = function(hard){
		M.deckCount = 4;
		M.Deck = [];
		M.hands = {dealer:{value:0, cards:[]}, player:[{value:0, cards:[]}]};
		M.games.Blackjack.hiddenCard = M.cards[0];
		M.currentPlayerHand = 0;
		M.minDecks = 2;
		M.betAmount = 0;
		M.betChoice = 1;
		M.betMode = 1;
		M.games.Blackjack.wins = 0;
		M.games.Blackjack.ownLuckWins = 0;
		M.games.Blackjack.tiesLost = 0;
		M.games.Blackjack.phase = 0;
		M.games.Blackjack.istep = 0;
		M.nextBeat = Date.now();
		
		M.setPercentagePrecision(1);
		
		if(hard){
			M.saveString = '';
		}
		
		M.reshuffle();
		
		M.buildSidebar();
		M.buildTable();
		
		setTimeout(function(M){return function(){M.onResize();}}(M), 10);
	}
	
	M.logic = function(){
		//run each frame
		if(M.games.choice == 0) M.games.Blackjack.logic();
	}
	
	M.onResize = function(){
		var width = l('casinoContent').offsetWidth;
		var sidebarW = width * 0.20 - 8;
		var tableW = width * 0.80 - 8;
		M.sidebarL.style.width = sidebarW + 'px';
		M.tableL.style.width = tableW + 'px';
	}
	
	M.draw = function(){
		//run each draw frame
		if(M.games.choice == 0) M.games.Blackjack.draw();
		
		l('casinoCurrentBet').innerHTML = '(' + Beautify(M.betAmount) + ' cookies)';
	}
	
	M.init(l('rowSpecial' + M.parent.id));
}


M.launcher = function(){
	var M = Game.Objects['Idleverse'].minigame;
	
	// Stuff that needs to wait for CCSE but should only run once goes here
	M.parent.minigameUrl = 'https://klattmose.github.io/CookieClicker/dummyFile.js';
	M.parent.minigameName = 'Classic Clicker';
	
	M.name = M.parent.minigameName;
	M.savePrefix = 'minigameCasino';
	M.sourceFolder = 'https://klattmose.github.io/CookieClicker/' + (0 ? 'Beta/' : '');
	M.cardsImage = M.sourceFolder + 'img/phantasypantsCards.png';
	M.iconsImage = M.sourceFolder + 'img/customIcons.png';
	M.chancemakerChance = 0.0003;
	M.beatLength = 750;

	Game.registerHook('check', function(){
		if(M.loadedCount){
			if(M.games.Blackjack.winsT >= 7) Game.Unlock('Raise the stakes');
			if(Game.Has('Raise the stakes') && M.games.Blackjack.winsT >= 49) Game.Unlock('High roller!');
			if(Game.Has('High roller!') && Game.cookies >= (4 * Game.cookiesPs * 60 * 60)) Game.Unlock('Double or nothing');
			if(Game.Has('Double or nothing') && Game.cookies >= (10 * Game.cookiesPs * 60 * 60)) Game.Unlock('Stoned cows');
			if(Game.Has('I make my own luck') && M.games.Blackjack.ownLuckWins >= 52) Game.Unlock('Infinite Improbability Drive');
			if(M.games.Blackjack.tiesLost >= 7) Game.Unlock('Tiebreaker');
			
			if(M.games.Blackjack.winsT >= 21) Game.Win('Card minnow');
			if(M.games.Blackjack.winsT >= 210) Game.Win('Card trout');
			if(M.games.Blackjack.winsT >= 2100) Game.Win('Card shark');
			if(M.games.Blackjack.ownLuckWins >= 13) Game.Win('Ace up your sleeve');
			if(M.games.Blackjack.ownLuckWins >= (13 * 13)) Game.Win('Paid off the dealer');
			if(M.games.Blackjack.ownLuckWins >= 666) Game.Win('Deal with the Devil');
			
			if(M.games.choice == 0) M.games.Blackjack.buildSidebar();
		}
	});
	
	
	if(typeof CM != 'undefined') CM.Sim.InitData(); // Cookie Monster compatibility
	
	
	Game.LoadMinigames();
}

M.launcher();

var M = 0;

console.log('');

function d6(){
	return Math.floor(Math.random() * 6) + 1
}

function chooseCurrentOpponent(fighter){
	return fighter.opponents[Math.floor(Math.random() * fighter.opponents.length)]
};

function checkHit(weapon){
	var roll = d6();
	if (roll >= weapon.toHit){
		return true;
	}
	else{
		return false;
	}
};

function checkWound(weapon){
	var roll = d6();
	if (roll >= weapon.toWound){
		return true;
	}
	else{
		return false;
	}
};

function checkSave(armor){
	var roll = d6();
	if (roll >= armor.save){
		return true;
	}
	else{
		return false;
	}
}

function rollForDeath(fighter){
		roll = d6();
		if (fighter.wounds == 7){
			fighter.isDead = true;
		}
		else if (fighter.wounds == 1 && roll == 1){
			fighter.isDead = true;
		}
		else if (fighter.wounds >= 2 && roll <= fighter.wounds - 1){
			fighter.isDead = true;
		}
	}


//      DEFINE WEAPONS AND ARMOR      //

var WEAPONS = [sword, lawnChair]

function weapon(name, toHit, toWound, desc) {
	this.name = name;
	this.toHit = toHit;
	this.toWound = toWound;
	this.desc = desc;
};

var sword = new weapon("a Sword", 3,3, "A regular old sword");
var lawnChair = new weapon("a Lawn Chair", 2,5, "Great for relaxing");
var unArmed = new weapon("his bare hands",5,6,"This can't be good");

var ARMORS = [chainmail, noArmor] 

function armor(name, save, desc) {
	this.name = name;
	this.save = save;
	this.desc = desc;
}

var chainmail = new armor("Chainmail", 5, "A trusty classic");
var noArmor = new armor("No Armor", 7, "The breeze is nice");




//      DEFINE FIGHTERS     //

function fighter(name, weapon, armor){
	this.name = name;
	
	if (weapon == undefined){
		this.weapon = unArmed;
	}
	else{
		this.weapon = weapon;
	}

	if (armor == undefined){
		this.armor = noArmor;
	}
	else{
		this.armor = armor;
	}

	this.wounds = 0;
	this.recentlyWounded = false;
	this.isDead = false;

	this.opponents = [];
	this.currentOpponent = undefined;

	this.attack = function attack(opponent){
		console.log(this.name + " attacks " + this.currentOpponent.name + " with " + this.weapon.name + ".");
		if (checkHit(this.weapon)){
			var wounded = checkWound(this.weapon);

			if (!wounded){
				console.log(this.currentOpponent.name + " is dealt a glancing blow.");
			}

			if (wounded){
				if (checkSave(this.currentOpponent.armor)){
					console.log(this.currentOpponent.name +"'s " + this.currentOpponent.armor.name + " prevents a wound!");
				}
				else{
					this.currentOpponent.wounds++;
					this.currentOpponent.recentlyWounded = true;
	   			console.log(this.currentOpponent.name + " is wounded! He now has " + this.currentOpponent.wounds + " wounds!");
				}
			}
		}
		else{
			console.log(this.name + " misses!");
		}
	}
};

var fighter1 = new fighter("Fighter1", sword);
var fighter2 = new fighter("Fighter2", lawnChair, chainmail);
var fighter3 = new fighter("Poor Bob");

var FIGHTERS = [fighter1, fighter2, fighter3];


console.log('++++++++++++++++++++');

for (i=0; i<FIGHTERS.length; i++){ ////// LIST ALL in FIGHTERS array
	console.log(FIGHTERS[i].name + " has " + FIGHTERS[i].weapon.name + " and " + FIGHTERS[i].armor.name + ".");
};

console.log('++++++++++++++++++++');
console.log('');




//      DEFINE THE FIGHT       //

function fight(fighters){
	
	var round = 1; // i.e. Round One, etc
	var deadFighters = 0;

	function printRound(){
		console.log('');
		console.log('++++++++++++++++++++');
		console.log('ROUND ' + round);
		console.log('++++++++++++++++++++');
		console.log('');
	};

	// Define opponents for fight//
	//
	// NOTE: if fighters go on to fight again, you'll need to clear out their opponents array
	//
	for (var i=0; i<fighters.length; i++){     	 	
		for (var j=0; j<fighters.length; j++){
			if (i!=j){
				fighters[i].opponents.push(fighters[j]);
			}
		}
		//console.log(fighters[i]);
	};

	function fightRound(){
		printRound();
	// Initialize Fighter
		for (var i=0; i<fighters.length; i++){

		// Choose Opponent
			fighters[i].currentOpponent = chooseCurrentOpponent(fighters[i]);
			while (fighters[i].currentOpponent.isDead==true){ // if opponent is dead, keep choosing till you find a live one //
				fighters[i].currentOpponent = chooseCurrentOpponent(fighters[i]);
			}

		// Attack Opponent
			if (fighters[i].isDead == false){ // only attack an opponent if you are still alive
				fighters[i].attack(fighters[i].currentOpponent);
			}
		}

	// Check Deaths
		for (var i=0; i<fighters.length; i++){
			if (fighters[i].recentlyWounded == true){
				if (fighters[i].isDead == false){ // wounded fighter only rolls for death if still alive
					rollForDeath(fighters[i]);
					console.log('')
					if (fighters[i].isDead==true){
						console.log(fighters[i].name + " dies from his wounds!");
						deadFighters++
					}
					else{
						fighters[i].recentlyWounded = false;
						console.log(fighters[i].name + " battles on in spite of his wounds!")
					}
				}
			}
		}
		
	// Check for winner
		if (deadFighters == fighters.length){
			console.log("All fighters have perished! ARE YOU NOT ENTERTAINED?")
			console.log('')
		}
		else if (deadFighters == fighters.length - 1){
			for (var i = 0; i<fighters.length; i++){
				if (fighters[i].isDead == false){
					console.log(fighters[i].name + " is victorious!")
					console.log('')
				}
			}
		}
		round++;
	}; // end fightRound()

	while (deadFighters <= fighters.length - 2){
		fightRound();
	}
}; // end fight()



fight(FIGHTERS); // BLAM! DO IT! FIGHT TO THE DEATH!
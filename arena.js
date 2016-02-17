function d6(){
	return Math.floor(Math.random() * 6) + 1
}

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
		else {
			console.log("It's only a flesh wound!")
		}
	}


//      DEFINE WEAPONS AND ARMOR      //

function weapon(name, toHit, toWound, desc) {
	this.name = name;
	this.toHit = toHit;
	this.toWound = toWound;
	this.desc = desc;
};

var sword = new weapon("a Sword", 3,3, "A regular old sword")
var lawnChair = new weapon("a Lawn Chair", 2,5, "Great for relaxing")

function armor(name, save, desc) {
	this.name = name;
	this.save = save;
	this.desc = desc;
}

var chainmail = new armor("Chainmail", 5, "A trusty classic")
var noArmor = new armor("No Armor", 7, "The breeze is nice")




//      DEFINE FIGHTERS     //

function fighter(name, weapon, armor){
	this.name = name;
	this.weapon = weapon;
	this.armor = armor;

	this.wounds = 0;
	this.isDead = false;
};

var fighter1 = new fighter("Fighter1", sword, noArmor);
//console.log(fighter1);
var fighter2 = new fighter("Fighter2", lawnChair, chainmail);
//console.log(fighter2);

console.log(fighter1.name + " has " + fighter1.weapon.name + " and " + fighter1.armor.name);
console.log(fighter2.name + " has " + fighter2.weapon.name + " and " + fighter2.armor.name);



//      DEFINE THE FIGHT       //

function fight(){

	//      FIGHTER 1 FIGHTS!!     //
	console.log("Fighter 1 uses his " + fighter1.weapon.name);		
	if (checkHit(fighter1.weapon)){
		console.log("Fighter 2 is hit!");
		if (checkWound(fighter1.weapon)){
			console.log("Fighter 2 is wounded!");
			console.log("Fighter 2 has " + fighter2.wounds + " wounds!");
			fighter2.wounds++;
			rollForDeath(fighter2);
			if (fighter2.isDead==true){
				console.log("Fighter 2 dies from his wounds!");
			}
		}
	}
	else{
		console.log("Fighter 1 misses!");
	}


	//     FIGHTER 2 FIGHTS!!     //
	console.log("Fighter 2 uses his " + fighter2.weapon.name);		
	if (checkHit(fighter2.weapon)){
		console.log("Fighter 1 is hit!");
		if (checkWound(fighter2.weapon)){
			console.log("Fighter 1 is wounded!");
			console.log("Fighter 1 has " + fighter1.wounds + " wounds!");
			fighter1.wounds++;
			rollForDeath(fighter1);
			if (fighter1.isDead==true){
				console.log("Fighter 1 dies from his wounds!");
			}
		}
	}
	else{
		console.log("Fighter 2 misses!");
	}
	
	//     CHECK DEATHS      //

	if (fighter1.isDead == true && fighter2.isDead==true){
		console.log("Both fighters have perished! ARE YOU NOT ENTERTAINED?")
	}
	else if (fighter1.isDead == true){
		console.log("Fighter 2 is victorious!")
	}
	else if (fighter2.isDead == true){
		console.log("Fighter 1 is victorious!")
	}

}

function startFighting(){
	console.log("The fight begins!")
	while (fighter1.isDead==false && fighter2.isDead==false){
		fight();
	}
}

startFighting();
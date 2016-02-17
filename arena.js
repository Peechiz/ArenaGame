//      DEFINE FIGHTERS     //

function fighter(name, weapon, armor){
	this.name = name;
	this.weapon = weapon;
	this.armor = armor;

	var wounds = 0;
	var isDead = false;

	function rollForDeath(){
		roll = d6();
		if (wounds == 7){
			isDead = true;
		}
		else if (wounds == 1 && roll == 1){
			isDead = true;
		}
		else if (wounds >= 2 && roll <= wounds - 1){
			isDead = true;
		}
		else {
			console.log("It's only a flesh wound!")
		}
	}
};

var fighter1 = new fighter("Fighter1", sword, noArmor);
console.log(fighter1);
var fighter2 = new fighter("Fighter2", lawnChair, chainmail);
console.log("Fighter 2 is: " + fighter2);


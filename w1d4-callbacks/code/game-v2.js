/*
This is a slightly more advanced version of game.js that takes a few of
the concepts we've talked about and takes them further.
*/

var hero = {
  name: 'Hiro Protagonist',
  health: 50,
  attackPower: 5,
  weapon: null,  // Weapon is now a key here
  taunt: function(who) {
    console.log(`${this.name}: You're toast, ${who}!`);
  }
}

var enemy = {
  name: 'Mafia Boss',
  health: 150,
  attackPower: 10,
  weapon: null,
  taunt: function(who) {
    console.log(`${this.name}: Mamma mia, you'll become pizza ${who}!`);
  }
}


/*
Instead of passing the attacker, we'll attach the function to both
characters and use `this` to get all necessary information.
*/

function attack(victim) {
  if (!this.weapon) { // No weapon? Use attacker.attackPower
    victim.health -= this.attackPower;
    console.log(`${victim.name} lost ${this.attackPower} health.`);
  }
  else {
    var result = this.weapon(victim); // Else call weapon to do the damage!
    console.log(`${victim.name} lost ${result.attackPower} health.`);
  }
}


/*
We'll also create functions to make a character equip and unequip a weapon
*/

function equip(weapon) {
  this.weapon = weapon;
  // You can always get a function's name with .name
  console.log(`${this.name} is using a ${weapon.name}!`);
}

function unequip() {
  this.weapon = null;
  console.log(`${this.name} is using their fists!`);
}


/*
The weapon functions stay the same.
*/

function pistol(victim) {
  var attackPower = 25;
  victim.health -= attackPower;
  return {
    attackPower: attackPower,
    victimHealth: victim.health
  }
}

function machineGun(victim) {
  var attackPower = 100;
  victim.health -= attackPower;
  return {
    attackPower: attackPower,
    victimHealth: victim.health
  }
}


/*
CustomTaunt was alreay using introspection, so it also remains unchanged.
*/

function customTaunt(taunt) {
  console.log(`${this.name}: ${taunt}`);
}

/*
Now we'll attach our functions to our characters
*/

hero.attack = attack;
hero.equip = equip;
hero.unequip = unequip;
hero.customTaunt = customTaunt;

enemy.attack = attack;
enemy.equip = equip;
enemy.unequip = unequip;
enemy.customTaunt = customTaunt;


// SHOWTIME!

hero.taunt(enemy.name);
hero.attack(enemy);
enemy.taunt(hero.name);
enemy.equip(pistol); // Now the enemy has a pistol,
enemy.attack(hero);  // so this attack will be different!
hero.customTaunt("Aaaargh you'll pay for this!!!!!");
hero.equip(machineGun); // The hero now has a machine gun!
hero.attack(enemy);     // This will hurt!
enemy.customTaunt("Oh, come on man!");

/* Output:
Hiro Protagonist: You're toast, Mafia Boss!
Mafia Boss lost 5 health.
Mafia Boss: Mamma mia, you'll become pizza Hiro Protagonist!
Mafia Boss is using a pistol!
Hiro Protagonist lost 25 health.
Hiro Protagonist: Aaaargh you'll pay for this!!!!!
Hiro Protagonist is using a machineGun!
Mafia Boss lost 100 health.
Mafia Boss: Oh, come on man!
*/

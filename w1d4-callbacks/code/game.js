/*
Now let's put everything we've learned into practice.
First we'll create a few objects representing characters in a game.
Notice how we're adding a function inside both objects and how those
functions use `this` to read keys from itself.
*/

var hero = {
  name: 'Hiro Protagonist',
  health: 50,
  attackPower: 5,
  taunt: function(who) {
    console.log(`${this.name}: You're toast, ${who}!`);
  }
}

var enemy = {
  name: 'Mafia Boss',
  health: 150,
  attackPower: 10,
  taunt: function(who) {
    console.log(`${this.name}: Mamma mia, you'll become pizza ${who}!`);
  }
}


/*
Here's the attack function. Notice how it expects a weapon callback.
If it isn't present, the character's attack power is used.
Otherwise the weapon is used to attack the victim.
*/

function attack(attacker, victim, weapon) {
  if (weapon === undefined) { // No weapon? Use attacker.attackPower
    var attackPower = attacker.attackPower;
    victim.health -= attackPower;
    console.log(`${victim.name} lost ${attackPower} health.`);
  }
  else {
    var result = weapon(victim); // Else call weapon to do the damage!
    console.log(`${victim.name} lost ${result.attackPower} health.`);
  }
}


/*
Now we'll create a few functions representing weapons.
Whenever we attack using a weapon, the weapon does the damage.
All weapon functions receive a victim and return an object
containing the weapon's attack power and the resulting victim health.
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
We're also adding a customTaunt function that we're attaching to each
character. This allows us to write the function only once. We're using
`this` to get information about the object that calls the function.
This pattern is called "introspection", i.e. getting information from the
code while it's running.
*/

function customTaunt(taunt) {
  console.log(`${this.name}: ${taunt}`);
}

hero.customTaunt = customTaunt;
enemy.customTaunt = customTaunt;


// SHOWTIME!

hero.taunt(enemy.name);
attack(hero, enemy);
enemy.taunt(hero.name);
attack(enemy, hero, pistol);
hero.customTaunt("Aaaargh you'll pay for this!!!!!");
attack(hero, enemy, machineGun);
enemy.customTaunt("Oh, come on man!");

/* Output:
Hiro Protagonist: You're toast, Mafia Boss!
Mafia Boss lost 5 health.
Mafia Boss: Mamma mia, you'll become pizza Hiro Protagonist!
Hiro Protagonist lost 25 health.
Hiro Protagonist: Aaaargh you'll pay for this!!!!!
Mafia Boss lost 100 health.
Mafia Boss: Oh, come on man!
*/

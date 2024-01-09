let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// variable weapons, assigned to an array[], that store objects{}
const weapons = [
    { name: "stick", power: 5 },  
    { name: "dagger", power: 30 },
    { name: "claw hammer", power: 50 },
    { name: "sword", power: 100 }
];

const monsters = [
    { name: "slime", level: 2, health: 15 },
    { name: "fanged beast", level: 8, health: 60 },
    { name: "dragon", level: 20, health: 300 }
]

// variable locations, assigned to an array[], that store objects{}
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions":[goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️"
    },
    {
         name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
        
    }
];
// initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// 
/* reusable fumction, instead of assigning innerText and onclick
to specific strings and functions, and aviod repttions we use
this update funtions. and call it where is needed*/ 
function update(location){
    //setting monsterStats css to display none, after monster is defeated
    monsterStats.style.display = "none";

    /*updating  button1-3 text to be assigned to 
    the first,secound and third value of the button text array */
    button1.innerText = location["button text"][0]; //location["button text"] is an array with three elements, [0] for the first element of the array
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    
    /* updating the onclick property for each button
    to be assigned to the first,second and third value of the 
    button functions array*/ 
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    
    /* updating the text.innerText to be assigned to the text
    from the location object*/ 
    text.innerText = location.text;

}

function goTown() {
    update(locations[0]);

}

function goStore() {
    update(locations[1]);

}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if(gold >= 10){
        gold -= 10;
        health += 10;
    
        goldText.innerText = gold;
        healthText.innerText = health;

    }  else {
        text.innerText = "You do not have enough gold to buy health.";
    }
    
}

function buyWeapon() {
    if(currentWeapon < weapons.length - 1){

        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
    
            goldText.innerHTML = gold;
            let newWeapon = weapons[currentWeapon].name;
            newWeapon.name
    
            text.innerText = "You now have a " +  newWeapon + ".";
            
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;

        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }

    } else{
        text.innerText = "You already have the most powerful weapon!"; 
        button2.innerText = "Sell weapon for 15 gold.";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText =gold;

        let currentWeapon = inventory.shift(); 
        text.innerText = "You sold a, " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else{
        text.innerText = "Don't sell your only weapon!"
    }
}

function fightSlime() {
    fighting = 0; //setting to the index of "slime" in the monsters array
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();

}

function fightDragon(){
    fighting = 2;
    goFight();
}

//reusable fumction
function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;

    monsterStats.style.display = "block"
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
  

}
// end reusable fumction

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    /* health -= monsters[fighting].level; */

    /*This sets health equal to health minus the return value
     of the getMonsterAttackValue function, and passes the 
     level of the monster as an argument. */
    health -= getMonsterAttackValue(monsters[fighting].level);
    
    if(isMonsterHit()){
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;

    } else{
        text.innerText += " You miss."
    }

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0){
        lose();
    } else if(monsterHealth <= 0){
        
      /*   if(fighting === 2){
            winGame();
        } else {
            defeatMonster();

        } */
        
        /* re-wrtitting the above comment out if else statement
         to ternary(its a 1 line if-else statement) */
        fighting === 2 ? winGame() : defeatMonster();

    }

    if(Math.random() <= .1 && inventory.length !== 1){
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level){

    /* This will set the monster's attack to five times 
    their level minus a random number between 0 and the player's xp.*/
    const hit = (level * 5) - (Math.floor(Math.random() *xp));

    /* log the value of hit to the console to use in debugging. */
    console.log(hit);

   /*  ternary operator that returns hit if hit is greater than 0,
     or returns 0 if it is not. */
    return hit > 0 ? hit : 0;
}

/* This will return a boolean value (true or false) 
to be used in your if statement.*/
function isMonsterHit(){
    return Math.random() > .2 || health < 20
}

//

function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;

}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;

    goldText.innerText = gold;
    xpText.innerText = xp;

    update(locations[4]);

}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];

    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

/* (hidden feature) in game */
function easterEgg(){
    update(locations[7]);
}

function pick(guess){

}

function pickTwo(){
    pick(2)
}

function pickEight(){
    pick(8)
}

//
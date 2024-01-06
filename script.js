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
const weapons =[
    {
        name: "stick",
        power: 5
    },  
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

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
    }
];
// initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// 
/* reusabæe fumction, instead of assigning innerText and onclick
to specific strings and functions, and aviod repttions we use
this update funtions. and call it where is needed*/ 
function update(location){
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

function fightDragon(){
    console.log("Fighting dragon.")
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

function fightSlime() {

}

function fightBeast() {

}

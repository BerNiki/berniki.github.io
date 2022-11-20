import "./styles.css"
import { soldierNameGenerator } from "./names"
import { isNamespaceExport } from "typescript";


let makoCount = 0;
let materiaCount = 0;
let harvesterCount = 0;
let powerplantCount = 0;
let soldierAmount = 0;
let avalancheActionProbability = 0;
let avalancheAttack = false;
let avalancheLevel = 1;


const allRefresh = () => {
    return onMakoChange(),onMateriaChange(),onHarvesterChange(),onPowerplantChange(),onSoldierListChange();
}

const makoButton = document.querySelector<HTMLButtonElement>("#manifest-mako-button")!;
const makoCounter = document.querySelector("#mako-counter")!;
const materiaButton = document.querySelector<HTMLButtonElement>("#manifest-materia-button")!;
const materiaCounter = document.querySelector("#materia-counter")!;
const materiaCountainer = document.querySelector<HTMLParagraphElement>("#materia-counter-tainer")!;
const harvesterButton = document.querySelector<HTMLParagraphElement>("#manifest-harvester-button")!;
const harvesterCounter = document.querySelector<HTMLSpanElement>("#harvester-counter")!;
const harvesterAv = document.querySelector<HTMLParagraphElement>("#harvester-available")!;
const powerplantAvText = document.querySelector<HTMLParagraphElement>("#pp-available")!;
const powerplantCounter = document.querySelector<HTMLSpanElement>("#pp-counter")!;
const powerplantButton = document.querySelector<HTMLButtonElement>("#pp-button")!;
const muteButton = document.querySelector<HTMLButtonElement>("#mute")!;
const soldierListText = document.querySelector<HTMLParagraphElement>("#soldier-list")!;
const hireSoldierButton = document.querySelector<HTMLButtonElement>("#hire-soldier-button")!;

let soldierList : string[] = [];

const setup = () => {    
    
    let backgroundMusic = new Audio("https://cdn.freesound.org/previews/520/520079_11490095-lq.mp3");
    backgroundMusic.loop = true;

    muteButton.addEventListener('click', () => {
        if (backgroundMusic.volume === 0) {
            backgroundMusic.volume = 1;
        } else {
            backgroundMusic.volume = 0;
        }
    })
       

     makoButton.addEventListener('click', () => {
        makoCount++;
        backgroundMusic.play();
        allRefresh();        
    })
     materiaButton.addEventListener('click', () => {
        if (makoCount >= 20) {
            makoCount-= 20;
            materiaCount++;
        } else {
            alert("You don't have enough mako!")
        };
        if (materiaCount >= 5) {
            harvesterButton.style.display = 'block';
        };
        allRefresh();
     })
     harvesterButton.addEventListener('click', () => {
        if (materiaCount >= 5) {
            harvesterCount++;
            materiaCount-= 5;
            harvesterCounter.style.display = 'inline-block';
            harvesterAv.style.display = 'block';
            powerplantAvText.style.display = 'block';
            powerplantButton.style.display = 'block';
            allRefresh();
        } else {
            alert('You do not have enough materia! You need 5!')
        };
        allRefresh();
     })
     powerplantButton.addEventListener('click', () => {
        if (materiaCount >= 50 && harvesterCount >= 10) {
            powerplantCount++;
            materiaCount-= 50;
            harvesterCount-= 10;
            allRefresh;
        } else {
            alert ("You will need at least 50 materia and 10 harvesters to build a powerplant!")
            allRefresh();
        }
     });
     hireSoldierButton.addEventListener('click', () => {
        if (makoCount >= 1000 && materiaCount >= 20) {
        makoCount -= 1000;
        materiaCount -= 20
        const soldierName = soldierNameGenerator();
        soldierList.push(soldierName);
        soldierAmount++;
        } else {
            alert ("You need 1000 Mako and 20 Materia to hire and mutate recruits into SOLDIERS!");
        }
    });
    

     setInterval(() => {
        makoCount+= harvesterCount * 2;
        makoCount+= powerplantCount * 100;
        materiaCount+= powerplantCount * 3;
        allRefresh();
        if (makoCount >= 20) {
            materiaButton.style.display = 'block';
            materiaCountainer.style.display = 'block';
        };
        avalancheActionProbability = Math.floor((Math.random()*20) + (makoCount * 0.1) + (materiaCount * 0.2) + harvesterCount + (powerplantCount * 5) - (soldierAmount*soldierAmount*200));
        if (avalancheActionProbability >= 100 * avalancheLevel) {
            avalancheAttack = true;
        } else {
            avalancheAttack = false;
        }
    
        if (avalancheAttack === true) {
            avalancheActionProbability = 0;
            new Audio("https://cdn.freesound.org/previews/576/576054_4914751-lq.mp3").play();
            let damagelevel = Math.random()
            makoCount -= Math.floor((damagelevel * 1000)*(avalancheLevel*2));
            materiaCount -= Math.floor((damagelevel * 25) * avalancheLevel);
            harvesterCount -= Math.round((damagelevel -0.45) + (avalancheLevel * 0.9));
            powerplantCount -= Math.min(Math.round((damagelevel - 0.85) + (avalancheLevel*0.1)), 0);
            allRefresh();
            avalancheLevel += 1;
            
            if (makoCount < 0) {
                makoCount = 0;
                allRefresh();
            };
            if ( materiaCount < 0 ) {
                materiaCount = 0;
                allRefresh();
            };
            if ( harvesterCount < 0 ) {
                harvesterCount = 0;
                allRefresh();
            };
            if ( powerplantCount < 0 ) {
                powerplantCount = 0;
                allRefresh();
            };
        
            alert('You have been attacked by the Avalanche ECO Terrorist group.');
            avalancheAttack = false;
        }
        }, 500);
};

function onMakoChange() {
    makoCounter.textContent = makoCount.toString();
};

function onMateriaChange() {
    materiaCounter.textContent = materiaCount.toString();    
};

function onHarvesterChange() {
    harvesterCounter.textContent = harvesterCount.toString();
    powerplantCounter.textContent = powerplantCount.toString();

};

function onPowerplantChange() {
    powerplantCounter.textContent = powerplantCount.toString();
};

function onSoldierListChange() {
    soldierListText.textContent = soldierList.toString()
};


setup();



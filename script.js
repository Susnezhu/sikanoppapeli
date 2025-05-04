//onko valittu 1 vai 2 noppaa
let oneDiceChoosed = false;
let twoDicesChoosed = false;

let number = 1
let scoreCounter = 0

players = []
let currentPlayerIndex = 0;

//ikkunat
const startMenu = document.getElementById("start_menu");
const gameWindow = document.getElementById("game_window");
const playerNameInput = document.getElementById("player_name_input");

//näppäimet
const buttons = document.querySelectorAll("button");

const oneDiceBtn = document.getElementById("one_dice");
const twoDicesBtn = document.getElementById("two_dices");
const startButton = document.getElementById("start_button");
const addPlayer = document.getElementById("add_player");
const stopBtn = document.getElementById("stop_btn")
const throwBtn = document.getElementById("throw_btn")


//nopat
const firstDice = document.getElementById("first_dice");
const secondDice = document.getElementById("second_dice");

//muut
const diceAnimation = document.getElementById("dice_animation");
const playerNumber = document.getElementById("player_number");
const currentName = document.getElementById("current_name");
const currentScore = document.getElementById("current_score");
const currentTotalScore = document.getElementById("current_total_score");

//pelaaja input
const winPoints = document.getElementById("win_points");
const playerQuantity = document.getElementById("player_quantity");
const playerName = document.getElementById("player_name");

gameWindow.style.display = "none";
playerNameInput.style.display = "none";
diceAnimation.style.display = "none";


const dicePics = {
    1: "dice/one.png",
    2: "dice/two.png",
    3: "dice/three.png",
    4: "dice/four.png",
    5: "dice/five.png",
    6: "dice/six.png"
};


function OpenStartMenu() {
    //jos klikkaa yhden nopan nappulan
    oneDiceBtn.onclick = function() {
        if (twoDicesChoosed) {
            twoDicesChoosed = false;
            twoDicesBtn.style.filter = "";
        }
        oneDiceChoosed = true;
        oneDiceBtn.style.filter = "brightness(85%)";
    }

    //jos klikkaa kahden nopan nappulan
    twoDicesBtn.onclick = function() {
        if (oneDiceChoosed) {
            oneDiceChoosed = false;
            oneDiceBtn.style.filter = "";
        }
        twoDicesChoosed = true;
        twoDicesBtn.style.filter = "brightness(85%)";
    }


    startButton.onclick = function() {
        if (oneDiceChoosed || twoDicesChoosed) {
            writePlayerName();
        } else {
            alert("Valitse yhden tai kahden nopan pelin!")
        }
    }
}
OpenStartMenu();

function writePlayerName() {
    startMenu.style.display = "none";
    playerNameInput.style.display = "block";

    //lisää pelaaja objektin players array:hin
    addPlayer.onclick = function() {
        const name = playerName.value.trim();
        if (name) {
            players.push({
                name: name,
                score: 0,
                total: 0
            });
        number += 1
        playerNumber.textContent = "Pelaaja " + number;
        playerName.value = "";
        }

        if (players.length === Number(playerQuantity.value)) {
            number = 1
            playerNameInput.style.display = "none";
            if (oneDiceChoosed) {
                oneDiceGameplay();
            }else if (twoDicesChoosed) {
                twoDicesGameplay();
            }
        }
    }
}

//vaihtaa pelaaja ikkunassa olevat tiedot
function changeScore() {
    currentName.textContent = players[currentPlayerIndex].name;
    currentScore.textContent = "score: " + players[currentPlayerIndex].score;
    currentTotalScore.textContent = "total: " + players[currentPlayerIndex].total;
}

//Antaa randomin numeron 1 - 6
function diceRandom() {
    return Math.floor(Math.random() * 6) + 1;
}

//Vaihtaa kuvan sitä mukaan, mikä nopan sivu tuli
function showDice(number, dice) {
    dice.src = dicePics[number];
}

//peli, jossa on yksi noppa
function oneDiceGameplay() {
    gameWindow.style.display = "block";
    secondDice.style.display = "none";
    changeScore();

    //heitto nappula
    throwBtn.onclick = function() {
        const diceNum = diceRandom()
        diceAnimation.style.display = "block";
        players[currentPlayerIndex].score += diceNum;

        //ottaa kaikki napit pois käytöstä
        buttons.forEach(function(btn) {
            btn.disabled = true;
        });

        setTimeout(function(){
            showDice(diceNum, firstDice)
            diceAnimation.style.display = "none";
            changeScore()

            //laittaa kaikki napit päälle
            buttons.forEach(function(btn) {
                btn.disabled = false;
            });
        },1000)
    }
    
    //lopetus nappula
    stopBtn.onclick = function() {
        players[currentPlayerIndex].total = players[currentPlayerIndex].score
        players[currentPlayerIndex].score = 0


        const currentPlayer = players[currentPlayerIndex];
        currentPlayerIndex++;

        if (currentPlayerIndex >= players.length) {
            currentPlayerIndex = 0;
        }

        changeScore();
    }
}


//peli, jossa on 2 noppaa
function twoDicesGameplay() {
    gameWindow.style.display = "block";
}
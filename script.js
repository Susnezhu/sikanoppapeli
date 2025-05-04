//onko valittu 1 vai 2 noppaa
let oneDiceChoosed = false;
let twoDicesChoosed = false;

let number = 1

players = []

//ikkunat
const startMenu = document.getElementById("start_menu");
const gameWindow = document.getElementById("game_window");
const playerNameInput = document.getElementById("player_name_input");

//näppäimet
const oneDiceBtn = document.getElementById("one_dice");
const twoDicesBtn = document.getElementById("two_dices");
const startButton = document.getElementById("start_button");
const addPlayer = document.getElementById("add_player");

//nopat
const firstDice = document.getElementById("first_dice");
const secondDice = document.getElementById("second_dice");

//muut
const diceAnimation = document.getElementById("dice_animation");
const playerNumber = document.getElementById("player_number");

//pelaaja input
const winPoints = document.getElementById("win_points");
const playerQuantity = document.getElementById("player_quantity");
const playerName = document.getElementById("player_name");

gameWindow.style.display = "none";
playerNameInput.style.display = "none";
diceAnimation.style.display = "none";



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

        console.log(players);

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

//peli, jossa on yksi noppa
function oneDiceGameplay() {
    gameWindow.style.display = "block";
    secondDice.style.display = "none";
}


//peli, jossa on 2 noppaa
function twoDicesGameplay() {
    gameWindow.style.display = "block";
}
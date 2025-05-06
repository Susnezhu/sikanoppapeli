//onko valittu 1 vai 2 noppaa
let oneDiceChoosed = false;
let twoDicesChoosed = false;

//pelaajan numero
let number = 1

//Tarkistaa onko tuplaa ollut 3 kertaa peräkkäin
let bonusCounter = 0

//jos on 1+1 tupla
let oneOneBonus = false;

//musiikki on alussa pois päältä
let isMusicOn = false;

//tähän tulee pelaaja objektit, joille annetaan name, score ja total arvot
players = []

//tarkistaa kumman pelaajan vuoro
let currentPlayerIndex = 0;

//ikkunat
const startMenu = document.getElementById("start_menu");
const gameWindow = document.getElementById("game_window");
const playerNameInput = document.getElementById("player_name_input");
const instructionsWindow = document.getElementById("instructions_window");
const winnerWindow = document.getElementById("winner_window");

//näppäimet
const buttons = document.querySelectorAll("button"); //kaikki näppäimet

const oneDiceBtn = document.getElementById("one_dice"); //alku ikkuna näppäimet
const twoDicesBtn = document.getElementById("two_dices");
const startButton = document.getElementById("start_button");

const addPlayer = document.getElementById("add_player"); //pelaajien lisäys ikkuna näppäin

const stopBtn = document.getElementById("stop_btn"); //peli ikkuna näppäimet
const throwBtn = document.getElementById("throw_btn");
const restartBtn = document.getElementById("restart");
const musicOnOffBtn = document.getElementById("musicBtn");

const rulesBtn = document.getElementById("rulesBtn"); //pelisääntö ikkuna näppäimet
const goBack = document.getElementById("go_back")

const PlayAgain = document.getElementById("play_again"); //voittaja ikkuna näppäin


//nopat jotka näkyy näytöllä
const firstDice = document.getElementById("first_dice");
const secondDice = document.getElementById("second_dice");

//muut elementit
const diceAnimation = document.getElementById("dice_animation");
const playerNumber = document.getElementById("player_number");
const currentName = document.getElementById("current_name");
const currentScore = document.getElementById("current_score");
const currentTotalScore = document.getElementById("current_total_score");
const winner = document.getElementById("winner");
const musicBtnPic = document.getElementById("musicBtnPic");

//pelaaja input
const winPoints = document.getElementById("win_points");
const playerQuantity = document.getElementById("player_quantity");
const playerName = document.getElementById("player_name");

//musiikki ja äänet
const music = document.getElementById("music");
const diceThrowSound = document.getElementById("dice_throw_sound");
const popSound = document.getElementById("pop_sound");
const loseSound = document.getElementById("lose_sound");
const winSound = document.getElementById("win_sound");
const tuplaBonus = document.getElementById("tuplaBonus");


//näyttää näytöllä
function show(content) {
    content.style.display = "block";
}
//piilottaa näytöltä
function hide(content) {
    content.style.display = "none";
}


hide(gameWindow);
hide(playerNameInput);
hide(diceAnimation);
hide(winnerWindow);
hide(instructionsWindow);


function OpenStartMenu() {
    show(startMenu)

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
        playSoundEffect(popSound)
        if (oneDiceChoosed || twoDicesChoosed) {
            writePlayerName();
        } else {
            alert("Valitse yhden tai kahden nopan pelin!")
        }
    }
}

OpenStartMenu();


//ikkuna, johon kirjoitetaan pelaajien nimet
function writePlayerName() {
    hide(startMenu);
    show(playerNameInput);

    //lisää pelaaja objektin players array:hin
    addPlayer.onclick = function() {
        const name = playerName.value.trim();
        if (name) {
            playSoundEffect(popSound);
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
            hide(playerNameInput);

            if (oneDiceChoosed) {
                oneDiceGameplay();
            }else if (twoDicesChoosed) {
                twoDicesGameplay();
            }
        }
    }
}

//kuvat nopan eri sivuista
const dicePics = {
    1: "dice/one.png",
    2: "dice/two.png",
    3: "dice/three.png",
    4: "dice/four.png",
    5: "dice/five.png",
    6: "dice/six.png"
};

//tarkistaa onko pelaajalla tarpeeksi pisteitä voittaa
function checkForWinner() {

    if (players[currentPlayerIndex].total >= Number(winPoints.value)) {
        winner.textContent = players[currentPlayerIndex].name
        show(winnerWindow)
        hide(gameWindow);
        playSoundEffect(winSound);

        PlayAgain.onclick = function() {
            playSoundEffect(popSound);

            setTimeout(function() {
                location.reload();
            },100)
        }
        
    }
}

//vaihtaa pelaaja ikkunassa olevat tiedot
function DisplayCurrentScore() {
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


//restart näppäimen funktio
function restartTheGame() {
    restartBtn.onclick = function() {
        location.reload();
    }
}

//musiikki näppäimen funktio
function putMusicOnOff() {
    musicOnOffBtn.onclick = function() {
        if (isMusicOn) {
            music.pause();
            musicBtnPic.src = "dice/volumeoff.png"
            isMusicOn = false;
            return;
        } 
        if (!isMusicOn) {
            music.currentTime = 0;
            music.play();
            musicBtnPic.src = "dice/volume.png"
            isMusicOn = true;
            return;
        }
    }
}

//soittaa halutun musiikin
function playSoundEffect(sound) {
    sound.currentTime = 0;
    sound.play();
}

//pelisääntöjen avaus näppäin
function gameRules() {
    rulesBtn.onclick = function() {
        playSoundEffect(popSound);
        hide(gameWindow);
        show(instructionsWindow);
    }
    goBack.onclick = function() {
        playSoundEffect(popSound);
        show(gameWindow);
        hide(instructionsWindow);
    }
}

function allButtonsDisabled(value) {
    if (value == "yes") {
        //laittaa kaikki napit pois päältä
        buttons.forEach(function(btn) {
            btn.disabled = true;
        });
    }
    if (value == "no") {
        //laittaa kaikki napit päälle
        buttons.forEach(function(btn) {
            btn.disabled = false;
        });
    }
}

//nollaa pisteet ja antaa seuraavalle vuoron heittää
function loseTheGame() {
    bonusCounter = 0;

    loseSound.play()
    players[currentPlayerIndex].score = 0;
    currentPlayerIndex++;

    //jos kaikki pelaajat heitti nopan, vuoro alkaa uudestaan
    if (currentPlayerIndex >= players.length) {
        currentPlayerIndex = 0;
        }

    DisplayCurrentScore();
}

//lopettaa heitto vuoron
function stopThrowing() {
bonusCounter = 0
oneOneBonus = false;

players[currentPlayerIndex].total += players[currentPlayerIndex].score;
players[currentPlayerIndex].score = 0;

checkForWinner();

currentPlayerIndex++;

//jos kaikki pelaajat heitti nopan, vuoro alkaa uudestaan
if (currentPlayerIndex >= players.length) {
    currentPlayerIndex = 0;
}

DisplayCurrentScore();
}



//peli yhdellä nopalla
function oneDiceGameplay() {
    show(gameWindow);
    hide(secondDice);

    DisplayCurrentScore();

    //restart
    restartTheGame();

    //musiikki
    putMusicOnOff();

    //pelisäännöt
    gameRules();


    //nopan heitto
    throwBtn.onclick = function() {
        const diceNum1 = diceRandom();

        show(diceAnimation);
        playSoundEffect(diceThrowSound);
        allButtonsDisabled("yes");

        if (diceNum1 != 1) {
            players[currentPlayerIndex].score += diceNum1;
        }

        setTimeout(function() {
            hide(diceAnimation);
            allButtonsDisabled("no");
            DisplayCurrentScore();
            showDice(diceNum1, firstDice);

            if (diceNum1 == 1) {
                loseTheGame();
            }

        },1000)
    }

    //vuoron lopetus
    stopBtn.onclick = function() {
        playSoundEffect(popSound);
        stopThrowing();
    }
}


//peli kahdella nopalla
function twoDicesGameplay() {
    show(gameWindow);

    DisplayCurrentScore();

    //restart
    restartTheGame();

    //musiikki
    putMusicOnOff();

    //pelisäännöt
    gameRules();

    //noppien heitto
    throwBtn.onclick = function() {
        const diceNum1 = diceRandom();
        const diceNum2 = diceRandom();

        show(diceAnimation);
        playSoundEffect(diceThrowSound);
        allButtonsDisabled("yes");


        if (diceNum1 == 1 && diceNum2 == 1) {
            players[currentPlayerIndex].score += 25;
            oneOneBonus = true;
        } 
        if (diceNum1 != 1 && diceNum2 != 1) {
            if (diceNum1 == diceNum2) {
                bonusCounter += 1
                if (bonusCounter != 3) {
                    players[currentPlayerIndex].score += (diceNum1 + diceNum2) * 2;
                }
            } else {
                players[currentPlayerIndex].score += diceNum1 + diceNum2;
            }
        }

        setTimeout(function() {
            hide(diceAnimation);
            DisplayCurrentScore();
            showDice(diceNum1, firstDice);
            showDice(diceNum2, secondDice);

            setTimeout(function() {
                allButtonsDisabled("no"); //laittaa napit päälle mutta odottaa vähän
            },500)

            if (!oneOneBonus) { //jos ei ole 1 + 1 eli ykkösten tupla
                if (diceNum1 == 1 || diceNum2 == 1) {
                    oneOneBonus = false;
                    loseTheGame();
                } 
            }

            if (oneOneBonus) {
                playSoundEffect(tuplaBonus);
                stopThrowing();
            }

            if (bonusCounter == 3) {
                loseTheGame();
            } else if (diceNum1 == diceNum2) {
                playSoundEffect(tuplaBonus);
            }
        },1000)
    }

    //vuoron lopetus
    stopBtn.onclick = function() {
        playSoundEffect(popSound);
        stopThrowing();
    }
}


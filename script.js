//onko valittu 1 vai 2 noppaa
let oneDiceChoosed = false;
let twoDicesChoosed = false;

//ikkunat
const startMenu = document.getElementById("start_menu");
const gameWindow = document.getElementById("game_window");

//näppäimet
const oneDiceBtn = document.getElementById("one_dice");
const twoDicesBtn = document.getElementById("two_dices");
const startButton = document.getElementById("start_button");

gameWindow.style.display = "none";


//jos klikkaa yhden nopan nappulan
oneDiceBtn.onclick = function() {
    if (twoDicesChoosed) {
        twoDicesChoosed = false
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
    if (oneDiceChoosed | twoDicesChoosed) {
        gameWindow.style.display = "block";
        startMenu.style.display = "none";
    }
    
}
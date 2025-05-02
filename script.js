const startMenu = document.getElementById("start_menu");
const gameWindow = document.getElementById("game_window");

const startButton = document.getElementById("start_button");

gameWindow.style.display = "none";

startButton.onclick = function() {
    gameWindow.style.display = "block";
    startMenu.style.display = "none"
}
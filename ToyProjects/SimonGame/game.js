var level = 0;
var gameStarted = false;
var allowPresses = false;

var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function playAudio(url) {
    var audio = new Audio(url);
    audio.play();
}

function flashButtons(element) {
    element.fadeOut(150).fadeIn(150);
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 150);
}

function nextSequence() {
    allowPresses = false;
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    for (i=0;i<gamePattern.length;i++) {
        let currentColor = gamePattern[i]
        setTimeout(() => {
            playAudio("./sounds/"+currentColor+".mp3");
            flashButtons($("#"+currentColor));

            let lastPatternDisplay = gamePattern.length === i
            if (lastPatternDisplay) {
                allowPresses = true;
            }
        }, i * 300);
    }
}

function resetData() {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}

function checkAnswer() {
    let recentClickMatches = userClickedPattern[userClickedPattern.length-1]===gamePattern[userClickedPattern.length-1];
    if (recentClickMatches) {
        let wonGame = userClickedPattern.length === gamePattern.length;
        if (wonGame) {
            allowPresses = false;
            setTimeout(() => {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        gameStarted = false;
        allowPresses = false;
        resetData();
        playAudio("./sounds/wrong.mp3");
        $("h1").text("It ain't that hard, Aedan. Press a key to try again");
    }
}

$(".btn").on("click", function() {
    if (allowPresses === false) return;

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playAudio("./sounds/"+userChosenColor+".mp3");
    animatePress(userChosenColor);
    checkAnswer();
})

$(document).on("keydown", function() {
    if (gameStarted) return;

    gameStarted = true;
    nextSequence();
})

var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
})


function nextSequence() {
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


var first = true;
$(document).on("keydown",function() {
    if(first){
        nextSequence();
        $("h1").text("Level "+level);
        first = false;
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]){
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key To Restart")
        starOver();
    }
    else{
        if(currentLevel === gamePattern.length-1){
            console.log("you win");
            
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            },1000);
        }
    }
}

function starOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    first = true;
}
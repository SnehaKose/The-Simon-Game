var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var Level=0;
var started = false;
var userClickedPattern=[];
var randomChosenColour;


function nextSequence(){
    userClickedPattern = [];
    Level++;
    $("#level-title").text("Level " + Level);

    var randomNo= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNo];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}

$(".btn").on("click",function(e){
    var userChosenColour=e.target.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
        var audio=new Audio("sounds/"+name+".mp3");
        audio.play();
}


function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keydown(function(){
    if (!started) {
        $("#level-title").text("Level " + Level);
        nextSequence();
        started = true;
    }  
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("Wrong");
        
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
}
}

function startOver(){
    Level = 0;
    gamePattern = [];
    started = false;

}
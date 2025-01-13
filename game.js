var colours=["red","blue","green","yellow"];
var userSequence=[];
var gamePattern=[];
var start=false;
var level=0;
$(document).keypress(function(){
  if(!start){
   nextSequence();
   start=true;
  }
});
function nextSequence(){
  userSequence=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChoosenColour=colours[randomNumber];
  gamePattern.push(randomChoosenColour);
  makeSound(randomChoosenColour);
  $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}
function makeSound(randomChoosenColour){
   var audio=new Audio("./sounds/"+randomChoosenColour+".mp3");
   audio.play();
}
$(".btn").click(function(){
    var userChoosenColour=$(this).attr("id");
    userSequence.push(userChoosenColour);
    makeSound(userChoosenColour);
    var currentButton = $(this);
    $(currentButton).addClass("pressed");
    setTimeout(function(){
      $(currentButton).removeClass("pressed");
    },100);
    checkUserAnswer();
});
function checkUserAnswer(){
  if(userSequence[userSequence.length-1]===gamePattern[userSequence.length-1]){
     if(userSequence.length===gamePattern.length){
       setTimeout(function(){
         nextSequence();
       },1000);
     }
  }
  else{
    makeSound("wrong");
     $("body").addClass("game-over");
     $("h1").text("Game Over , Press Any Key To Restart");
     setTimeout(function(){
      $("body").removeClass("game-over");
     },100);
     start=false;
     level=0;
     gamePattern=[];
  }
}

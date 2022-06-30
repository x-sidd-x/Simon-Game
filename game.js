var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["green","red","yellow","blue"];

var level = 1;

var started = false;

$(document).keypress(function()
{
  if(started==false)
  {
    nextSequence();
    started = true;
  }
})

$(".btn").click(function()
{
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function nextSequence()
{
  userClickedPattern = [];
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function()
  {
      $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(number)
{
  if(userClickedPattern[number]==gamePattern[number])
  {
    if(userClickedPattern.length==gamePattern.length)
    {
      setTimeout(function()
      {
      nextSequence();
      },1000);
    }
   }
  else
    {
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      playSound("wrong");
      setTimeout(function()
    {
      $("body").removeClass("game-over");
    },200);
      replay();
    }
  }


function replay()
{
  gamePattern = [];
  level = 1;
  started = false;
}

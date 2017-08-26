$( document ).ready(function() {

var choices = [0, 1, 2, 3]
var moves = ["Attack", "Block", "Blast", "Dodge"]
var gameOn = false;
var enemy = true;
var sequence = [];
var inputArray = [];
var inputCount = 0;
var currentEl;
var enemyHealth = 4;
var maxEenemyHealth = 4;
var playerHealth = 3;
var maxPlayerHealth = 3;
var demo = true;
var easy = true;

var audio0 = new Audio(['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3']);
var audio1 = new Audio(['https://s3.amazonaws.com/freecodecamp/simonSound2.mp3']);
var audio2 = new Audio(['https://s3.amazonaws.com/freecodecamp/simonSound3.mp3']);
var audio3 = new Audio(['https://s3.amazonaws.com/freecodecamp/simonSound4.mp3']);
var audio = [audio0, audio1, audio2, audio3];

var testWidth = 100;

$('#enemyHealth').text(enemyHealth);
$('#playerHealth').text(playerHealth);

$('#testButton').click(function(){

reduceBar("player");
playerHealth--

})




$('#animate').click( function(){
  animateLoop(0, 3)
  }
)

function animateLoop(index, end){
   if (index >= end) { return;}
  // do some checking on currentIndex
  let currentEl = $("[data-i=" + sequence[index] + "]");
  setTimeout(function(){
      audio[sequence[index]].play();
      flash(currentEl);
      animateLoop(index + 1, end)
  },1000);
}

function flash(element){
    element.animate({
    backgroundColor: "#0275d8",
    color: "white"
  }, 500, function() {
    // Animation complete.
    $(this).animate({
    backgroundColor: "transparent",
    color: "#0275d8"
  }, 500)
  });
}

function flashGreen(element){
    element.animate({
    backgroundColor: "green",
    color: "white"
  }, 500, function() {
    // Animation complete.
    $(this).animate({
    backgroundColor: "transparent",
    color: "#0275d8"
  }, 500)
  });
}



function generate(){
  gameOn = true;
  inputArray = [];
  inputCount = 0;
  $('#in-count').text(inputCount);
  $('#enemyHealth').html(enemyHealth);
  var newStep = choices[Math.floor(Math.random()*choices.length)]
  console.log("New Step:");
  console.log(newStep);
  sequence.push(newStep);
  //Animate
  demoSwitch(true);
  animateLoop(0, sequence.length);
  demoSwitch(false);
  console.log("All Steps:");
  console.log(sequence);
}

function demoSwitch(boo){
  if (boo){
    setTimeout(function(){
    demo = true;
    $('#turn').text("Demo");
    console.log("switched to Demo");
  },1000 );

  } else {
    setTimeout(function(){
      demo = false;
    $('#turn').text("User");
    console.log("switched to User");
  },(1000 * (sequence.length + 1)));
  }
}

//When user clicks a button
function userInput(clicked){
  if (demo){return;}
  if (gameOn == false){
    console.log("Press Start");
    return;
  }
  inputCount++;
  $('#in-count').text(inputCount);
  flashGreen(clicked);
  var input = clicked.data("i");
  console.log("New Input:");
  console.log(input);
  inputArray.push(input);
  audio[input].play();
  console.log("All Inputs:");
  console.log(inputArray);
  if (check() === false){
     console.log("wrong!");
      if (easy) {
      takeDamage(1);
      } else {
      takeDamage(playerHealth);
      console.log("You lose everything.")
      //reset();
      }
    } else if (check() === true){
      hit(input);
  } else {
      console.log("so far so good")
      return;
    }
}

function check(){
  var lastSeq = sequence[inputCount-1];
  console.log("Last Seq: " + lastSeq);
  var lastIn = inputArray[inputCount-1];
  console.log("Last Input: " + lastIn);
  if  (lastSeq !== lastIn){
    //Incorrect Entry
    return false;
  } else if ( inputCount < sequence.length){
    return undefined;
  } else {
    return true;
  }
}

function reduceBar(whichBar, factor){
 if (whichBar == "player") {
  var element = $('#playerHealthBar');
  var max = maxPlayerHealth;
  var currentHealth = element.data("p");
 } else {
  var element = $('#enemyHealthBar');
  var max = maxEenemyHealth;
  var currentHealth = element.data("p") ;
 }
 console.log("Current Health %: " + currentHealth)
 var decrease = (100/max) * factor;
 console.log("Current Decrease %: " + decrease)
 //element.attr('aria-valuenow', (currentHealth - decrease));
 element.data("p", (currentHealth - decrease) )
 element.animate({
    width: (currentHealth - decrease) + "%"
  }, 2000, function (){
    if (currentHealth - decrease === 0) {
      reset();
    }
  });
}

function reduceAnimation(element, percent){
    element.animate({
    width: percent + "%"
  }, 2000);

}


function hit(index){
  enemyHealth--;
  reduceBar("enemy", 1);
  $('#enemyHealth').html(enemyHealth);
   console.log("correct!");
  if (enemyHealth == 0) {
    console.log("You win!");
    return reset();
  }
  console.log(moves[index]);
  generate();
}


function takeDamage(damage){
  demoSwitch(true);
  playerHealth -= damage;
  reduceBar("player", damage);
  $('#playerHealth').text(playerHealth);
  if (playerHealth <= 0){
      console.log("You lose");
    return;
  }
  inputArray = [];
  inputCount = 0;
  $('#in-count').text(inputCount);
  console.log("Sequence: ");
  console.log(sequence);
  demoSwitch(true);
  animateLoop(0, sequence.length);
  demoSwitch(false);
}

function reset(){
  console.log("Restarting game");
  sequence = [];
  inputArray = [];
  enemyHealth = maxEenemyHealth;
  playerHealth = maxPlayerHealth;
  inputCount = 0;
  $('#enemyHealth').html(enemyHealth);
  $('#playerHealth').html(playerHealth);
  $('#playerHealthBar').data('p', 100).css('width', 100 +'%');
  $('#enemyHealthBar').data('p', 100).css('width', 100 +'%');
  $('#in-count').text(inputCount);
  $('#restart').text("Start")
  demoSwitch(true);
  gameOn = false;
}

$('#restart').click(function(){
  if (!gameOn) {
       gameOn = true;
       generate();
       $(this).text("Reset");
} else {
   reset();
}
})

$('#diff').click(function(){
  if (!easy) {
       easy = true;
    $('#mode').text("Easy");
} else {
      easy = false;
   $('#mode').text("Hard");
}
})



//var item = items[Math.floor(Math.random()*items.length)];

$('.simon').click(function(){
  userInput($(this));
})




//End Ready
});

/*
$('#elem').css('height', '20px').animate({ height: 100 }, 1000);
-RKO
-Rasengan
-John Cena
-

https://codepen.io/dwidomski/pen/KBzuo?js-preprocessor=none
https://codepen.io/jonathan/pen/GZPdbe


*/

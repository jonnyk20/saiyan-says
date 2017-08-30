$( document ).ready(function() {

//Game Settings
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
var tc = true;

var root = "https://u57193820.dl.dropboxusercontent.com/u/57193820/saiyan-says/";


//Audio Files
var audio0 = new Audio(['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3']);
var audio1 = new Audio(['https://s3.amazonaws.com/freecodecamp/simonSound2.mp3']);
var audio2 = new Audio(['https://s3.amazonaws.com/freecodecamp/simonSound3.mp3']);
var audio3 = new Audio(['https://s3.amazonaws.com/freecodecamp/simonSound4.mp3']);
var audio = [audio0, audio1, audio2, audio3];
var tlp = new Audio('./sounds/misc/instant-transmission.mp3');
var hitSound = new Audio('./sounds/misc/hit.mp3');
var blkSound = new Audio('./sounds/misc/block.mp3');
var dgSound = new Audio('./sounds/misc/dodge.mp3');
var bltSound = new Audio('./sounds/misc/ki-blast.mp3');
var chSound =  new Audio('./sounds/misc/charge.mp3');
var kmSound =  new Audio('./sounds/misc/kamehameha.mp3');
var dbcSound =  new Audio('./sounds/misc/db-charge.mp3');
var dbeSound =  new Audio('./sounds/misc/db-explode.mp3');



//Element References
var playerSpace = $('.player-space');
var playerAvatar =  $('#player-image');
var enemySpace = $('.enemy-space');
var enemyAvatar = $('#enemy-image');
var kiSpace = $('.ki-space');
var kiAvatar = $('#ki-image');
var lzSpace = $('.lazer-space');
var lzAvatar = $('#lazer-image');
var kmSpace = $('.km-space');
var kmAvatar = $('#km-image');
var dbSpace = $('.db-space');
var dbAvatar = $('#db-image');

//Stock Images
var playerImages = {
  "basic": "./images/goku/goku-basic.png",
  "attack": "./images/goku/goku-attack.png",
  "attack2": "./images/goku/goku-attack2.png",
  "attack3": "./images/goku/goku-attack3.png",
  "hurt": "./images/goku/goku-hurt.png",
  "block": "./images/goku/goku-block.png",
  "dodge": "./images/goku/goku-dodge.png",
  "blast": "./images/goku/goku-blast.png",
  "kick": "./images/goku/goku-kick.png",
  "hurt2": "./images/goku/goku-hurt2.png",
  "elbow": "./images/goku/goku-elbow.png",
  "finisher1": "./images/goku/goku-finisher1.png",
  "finisher2": "./images/goku/goku-finisher2.png",
  "finisher3": "./images/goku/goku-finisher3.png",
  "finisher4": "./images/goku/goku-finisher4.png",
  "finisher5": "./images/goku/goku-finisher5.png",
  "finisher6": "./images/goku/goku-finisher6.png",
  "finisher7": "./images/goku/goku-finisher7.png",
  "finisher8": "./images/goku/goku-finisher8.png",
  "finisher9": "./images/goku/goku-finisher9.png",
  "finisher10": "./images/goku/goku-finisher10.png",
  "finisher11": "./images/goku/goku-finisher11.png",
  "finisher12": "./images/goku/goku-finisher12.png",
  "finisher13": "./images/goku/goku-finisher13.png",
  "finisher14": "./images/goku/goku-finisher14.png",
  "finisher15": "./images/goku/goku-finisher16.png",
  "dead": "./images/goku/goku-dead.png"
  
}

var enemyImages = {
  "basic": "./images/frieza/frieza-basic.png",
  "attack": "./images/frieza/frieza-attack.png",
  "attack2": "./images/frieza/frieza-attack2.png",
  "attack3": "./images/frieza/frieza-attack3.png",
  "attack4": "./images/frieza/frieza-attack4.png",
  "hurt": "./images/frieza/frieza-hurt.png",
  "hurt2": "./images/frieza/frieza-hurt2.png",
  "dodge": "./images/frieza/frieza-dodge.png",
  "block": "./images/frieza/frieza-block.png",
  "whip1": "./images/frieza/frieza-whip1.png",
  "whip2": "./images/frieza/frieza-whip2.png",
  "whip3": "./images/frieza/frieza-whip3.png",
  "whip4": "./images/frieza/frieza-whip4.png",
  "whip5": "./images/frieza/frieza-whip5.png",
  "charge1": "./images/frieza/frieza-charge1.png",
  "charge2": "./images/frieza/frieza-charge2.png",
  "charge3": "./images/frieza/frieza-charge3.png",
  "dead": "./images/frieza/frieza-dead.png",
  "finisher1": "./images/frieza/frieza-finisher1.png",
  "finisher3": "./images/frieza/frieza-finisher3.png",
  "win": "./images/frieza/frieza-win.png"
}

var miscImages = {
  "blur": "./images/misc/instant-transmission.png",
  "ki": "./images/misc/ki-blast.png",
  "km1":"./images/misc/kamehameha1.png",
  "km2":"./images/misc/kamehameha2.png",
  "km3":"./images/misc/kamehameha3.png"
}

//Moves
var playerAnimations = [attackAnimation, blockAnimation, blastAnimation, dodgeAnimation, finisherAnimation];
var enemyAnimations = [attackFailAnimation, blockFailAnimation, blastFailAnimation, dodgeFailAnimation, finisherFailAnimation];

// Iniitialize Game
$('#enemyHealth').text(enemyHealth);
$('#playerHealth').text(playerHealth);

//Test Action
$('#testButton').click(function(){
 hideC();
})
function hideC(){
  if (tc) {
    $('.test-actions').hide();
    tc = false;
  } else {
    $('.test-actions').show();
    tc = true;
  }

}

$('.test-action').click(function(){
  var $this = $(this);
  var pl = $this.data("p");
  var act = $this.data("a");
  if (pl === 0) {
    playerAnimations[act]();
  } else {
    enemyAnimations[act]();
  }

})


function plImg(newImage){
    if (newImage == "blur"){
      playerAvatar.attr("src", miscImages['blur']);
    } else {
      playerAvatar.attr("src", playerImages[newImage]);
    }
  }

function enImg(newImage){
    if (newImage == "blur"){
      enemyAvatar.attr("src", miscImages['blur']);
    } else {
      enemyAvatar.attr("src", enemyImages[newImage]);
    }
  }


function attackAnimation(){
  playerAvatar.attr("src", miscImages['blur']);
  playerAvatar.fadeOut( 100, function() {
    // Animation complete.
    playerAvatar.fadeIn( 100, function() {
    // Animation complete
       playerAvatar.attr("src", playerImages['attack']);
       enemyAvatar.attr("src", enemyImages['hurt']);
       hitSound.play();
       playerSpace.css({ left: "55%"});
       setTimeout(function(){
         playerAvatar.attr("src", miscImages['blur']);
         playerAvatar.fadeOut( 100, function() {
           playerAvatar.fadeIn( 100, function() {
             playerAvatar.attr("src", playerImages['basic']);
             enemyAvatar.attr("src", enemyImages['basic']);
             playerSpace.css({ left: "20%"});
           })
         })
       }, 200)
     });
  });
}


function blockAnimation(){
  enemyAvatar.attr("src", miscImages['blur']);
  enemyAvatar.fadeOut( 100, function() {
    // Animation complete.
    enemyAvatar.fadeIn( 100, function() {
    // Animation complete
       enemyAvatar.attr("src", enemyImages['attack']);
       playerAvatar.attr("src", playerImages['block']);
       blkSound.play();
       enemySpace.css({ right: "55%"});
       setTimeout(function(){
         enemyAvatar.attr("src", enemyImages['hurt']);
         enemySpace.css({ right: "45%"});
         playerAvatar.attr("src", playerImages['attack2']);
         playerSpace.css({ left: "25%"});
         hitSound.play();
         setTimeout(function(){
             enemyAvatar.attr("src", miscImages['blur']);
             enemyAvatar.fadeOut( 100, function() {
             enemyAvatar.fadeIn( 100, function() {
             enemyAvatar.attr("src", enemyImages['basic']);
             playerAvatar.attr("src", playerImages['basic']);
             playerSpace.css({ left: "20%"});
             enemySpace.css({ right: "20%"});
           })
         })
         }, 500)   
       }, 500)
     });
  });
}

function blastAnimation(){
  bltSound.play();
  playerAvatar.attr("src", playerImages['blast']);
  kiSpace.css({display: "initial"})
  kiSpace.animate({
    left: "60%"
  }, 200, function(){
    kiSpace.css({display: "none"});
    enemyAvatar.attr("src", enemyImages['hurt']);
    setTimeout(function() {
      enemyAvatar.attr("src", enemyImages['basic']);
      playerAvatar.attr("src", playerImages['basic']);
      kiSpace.css({left: "30%"});
    }, 400);
  })

}

function dodgeAnimation(){
  // tlp.play();
  enemyAvatar.attr("src", miscImages['blur']);
  enemyAvatar.fadeOut(200, function() {
    enemyAvatar.attr("src", enemyImages['attack3']);
    enemyAvatar.css({height: 120, width: 120});
    enemySpace.css({ right: "60%", zIndex: 1});
    enemyAvatar.fadeIn(200);
    playerAvatar.attr("src", miscImages['blur']);
    playerAvatar.fadeOut(200, function(){
      tlp.play();
      playerSpace.css({ top: "0px"});
      playerAvatar.fadeIn(200, function(){
      playerAvatar.attr("src", playerImages['dodge']);
      setTimeout(function() {
         playerAvatar.attr("src", playerImages['attack3']);
         enemyAvatar.attr("src", enemyImages['hurt2']);
         enemySpace.css({ top: "50px"});
         hitSound.play();
         setTimeout(function() {
           //continue here
           positionReset();
         }, 500);
      }, 500);
      });
    })
  })

}


function finisherAnimation(){
  chSound.currentTime = 1.4;
  chSound.play();
  plImg('finisher1');
  setTimeout(function() {
    plImg('finisher2');
    setTimeout(function() {
      plImg('finisher3');
      setTimeout(function() {
        kmSound.currentTime = 1.5;
        kmSound.play();
        plImg('finisher4');
        setTimeout(function() {
          chSound.pause();
          plImg('finisher5');
          setTimeout(function() {
            plImg('finisher6');
            setTimeout(function() {
              plImg('finisher7');
              setTimeout(function() {
                plImg('finisher8');
                setTimeout(function() {
                  plImg('finisher9');
                  setTimeout(function() {
                    kmSpace.css({display: "initial"});
                    plImg('finisher10');
                    enImg("hurt");
                    kmSpace.fadeOut(1000)
                    setTimeout(function() {
                      plImg('finisher11');
                      enImg("dead");
                    }, 1000);
                  }, 1000);
                }, 300);
              }, 300);
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }, 300);
   }, 300);
}



function basicFailAnimation(){
  tlp.play();
  enemyAvatar.attr("src", miscImages['blur']);
  enemyAvatar.fadeOut( 100, function() {
    // Animation complete.
    enemyAvatar.fadeIn( 100, function() {
    // Animation complete
       enemyAvatar.attr("src", enemyImages['attack2']);
       playerAvatar.attr("src", playerImages['hurt']);
       hitSound.play();
       enemySpace.css({ right: "55%"});
       setTimeout(function(){
         enemyAvatar.attr("src", miscImages['blur']);
         enemyAvatar.fadeOut( 100, function() {
           enemyAvatar.fadeIn( 100, function() {
             enemyAvatar.attr("src", enemyImages['basic']);
             playerAvatar.attr("src", playerImages['basic']);
             enemySpace.css({ right: "20%"});
           })
         })
       }, 200)
     });
  });
}


function attackFailAnimation(){
  chSound.currentTime = 1.4;
  chSound.play();
  console.log("Attack Fail!");
  enemyAvatar.attr("src", enemyImages['charge1']);
  setTimeout(function() {
    enemyAvatar.attr("src", enemyImages['charge2']);
    setTimeout(function() {
      enemyAvatar.attr("src", enemyImages['charge3']);
      enemySpace.css({height: 150, width: 150, top: "-5px", zIndex: 1, right: "25%"});
      enemyAvatar.css({height: 150, width: 150});
      setTimeout(function() {
        playerAvatar.attr("src", playerImages['hurt'])
        hitSound.play();
        
      }, 250);
      enemySpace.animate({
        right: "100%",
        opacity: 0
      }, 500, function(){
        chSound.pause();
        enemyReset();
        playerAvatar.attr("src", playerImages['basic'])
      })
    }, 200);  
  }, 200);
}

function blockFailAnimation(){
  playerAvatar.attr("src", miscImages['blur']);
  playerAvatar.fadeOut(200, function(){
    blkSound.play();
    enemyAvatar.attr("src", enemyImages['block']);
    playerAvatar.attr("src", playerImages['elbow']);
    playerSpace.css({left: "55%"});
    playerAvatar.fadeIn(200)
    setTimeout(function() {
      enemyAvatar.attr("src", enemyImages['whip1']);
      setTimeout(function() {
        enemyAvatar.attr("src", enemyImages['whip2']);
        setTimeout(function() {
          hitSound.play();
          playerAvatar.attr("src", playerImages['hurt2']);
          playerSpace.css({left: "50%"});
          enemyAvatar.attr("src", enemyImages['whip3']);
          setTimeout(function() { 
            enemyAvatar.attr("src", enemyImages['whip4']);
            setTimeout(function() {
            enemyAvatar.attr("src", enemyImages['whip5']);
            //continue here
            setTimeout(function() {
              playerReset();
              enemyAvatar.attr("src", enemyImages['basic']);
            }, 300);
            }, 100);
          }, 100);   
        }, 100);
      }, 100);  
    }, 500);
  })
}


function blastFailAnimation(){
  bltSound.play();
  enemyAvatar.attr("src", enemyImages['attack4']);
  playerAvatar.attr("src", playerImages['hurt']);
  lzSpace.css({display: "initial"})
  setTimeout(function(){
      enemyAvatar.attr("src", enemyImages['basic']);
      playerAvatar.attr("src", playerImages['basic']);
      lzSpace.css({display: "none"})
  }, 700)
}

function dodgeFailAnimation(){
  console.log("Dodge Fail!");
  playerAvatar.attr("src", miscImages['blur']);
  playerAvatar.fadeOut(100, function(){
    playerSpace.css({left: "60%"});
    playerAvatar.fadeIn(100, function(){
      playerAvatar.attr("src", playerImages['kick']);
      tlp.play();
      enemyAvatar.attr("src", miscImages['blur']);
      enemyAvatar.fadeOut(200, function(){
        enemySpace.css({right: "10%"});
        enemyAvatar.attr("src", miscImages['blur']);
        enemyAvatar.fadeIn(200, function(){
          
          enemyAvatar.attr("src", enemyImages['dodge']);
          setTimeout(function() {
            enemyAvatar.attr("src", enemyImages['attack2']);
            enemySpace.css({right: "25%", zIndex: 1});
            playerAvatar.attr("src", playerImages['hurt2']);
            playerSpace.css({left: "50%"});
            hitSound.play();
            setTimeout(function() {
              positionReset();
            }, 500);
          }, 500);
        });
      });
    });
  })
 }


function finisherFailAnimation(){
  dbcSound.currentTime = 0;
  dbcSound.play();
  dbSpace.css({display: "initial", right: "20%", top: "-80px", opacity: 1});
  dbAvatar.css({height: 10, width: 10, marginTop: "40px"})
  dbAvatar.animate({
    height: 100,
    width: 100,
    marginTop: 0
  }, 2200)
  enImg("finisher1");
  setTimeout(function() {
    dbcSound.pause();
    enImg("attack4");
    setTimeout(function() {
    enImg("finisher3");
        dbeSound.volume = 0.3;
          dbeSound.currentTime = 0.3;
      dbeSound.play();
    dbSpace.animate({
          right: "80%",
          top: "70px",
          opacity: 0
    }, 500)
    setTimeout(function() {

      plImg("hurt");
      setTimeout(function() {
        plImg("dead");
        enImg("win");
      }, 200);
    }, 250);
    }, 100);
  }, 2000);
}


function positionReset(){

 playerReset();

 enemyReset();
  }





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

function playerReset(){
    //Player
    playerAvatar.attr("src", miscImages['blur']);
    playerAvatar.css({width: 100, height: 100});
    playerAvatar.fadeOut(100, function(){
      playerSpace.css({left: "20%", top: "30px", zIndex: 0, height: 100, width: 100});
      playerAvatar.fadeIn(100, function(){
         playerAvatar.attr("src", playerImages['basic']);
      })
    })
}

function enemyReset(){
      //Enemy
    enemyAvatar.attr("src", miscImages['blur']);
    enemyAvatar.css({width: 100, height: 100});
    enemyAvatar.fadeOut(100, function(){
      enemySpace.css({right: "20%", top: "30px", zIndez: 0, opacity: 1, height: 100, width: 100});
      enemyAvatar.fadeIn(100, function(){
         enemyAvatar.attr("src", enemyImages['basic']);
      })
    })

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
     enemyAnimations[input]();
      if (easy) {
      takeDamage(1); 
      } else {
      takeDamage(playerHealth);
      console.log("You lose everything.")
      }
    } else if (check() === true){
      hit(input);
      playerAnimations[input]();
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
 element.data("p", (currentHealth - decrease))
 if ((currentHealth - decrease) < 40) {
   console.log("danger!");
   //element.removeClass("bg warning bg-success").addClass("bg-danger");
   element.addClass("bg-danger");  
 }
 element.animate({
    width: (currentHealth - decrease) + "%"
  }, 2000, function (){
    console.log("Remaing Health is: " + (currentHealth - decrease))
    if (currentHealth - decrease < 1) {
      if (whichBar == "player") {
        console.log("Which Bar: " + whichBar)
        setTimeout(function() {
          finisherFailAnimation();
        }, 700);
        
      } else {
        console.log("Which Bar: " + whichBar)
        setTimeout(function() {
          finisherAnimation();
        }, 700);
        
      }
      return setTimeout(function() {
        reset();
      }, 7000);
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
    return;
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
  setTimeout(function() {
      animateLoop(0, sequence.length);
      demoSwitch(false);
    
  }, 3000);
}

function reset(){
  console.log("Restarting game");
  positionReset();
  sequence = [];
  inputArray = [];
  enemyHealth = maxEenemyHealth;
  playerHealth = maxPlayerHealth;
  inputCount = 0;
  $('#enemyHealth').html(enemyHealth);
  $('#playerHealth').html(playerHealth);
  $('#playerHealthBar').data('p', 100).css('width', 100 +'%').removeClass("bg-danger");
  $('#enemyHealthBar').data('p', 100).css('width', 100 +'%').removeClass("bg-danger");
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
//delay before new sequence

-RKO
-Rasengan
-Jotaro

-Dora
-Patrick
-Cloud
-Falcon Punch

-Final Kamehameha

//laser sound
//dead animations
//victory animations
//menu

https://codepen.io/dwidomski/pen/KBzuo?js-preprocessor=none
https://codepen.io/jonathan/pen/GZPdbe


$("#someID").html("" +
    "<h1>Headline 1</h1>" +
    "<h1>Headline 2</h1>");

*/

//declaring the main sprites and groups
var bananaImage;
var obstacleImage;
var gameOverImage;
var backImage;
var background1;
var player_running;
var monkey;
var invGround;
var gameOver;
var score = 0;
var bananaGrp, obstaclesGrp;
var PLAY, END;
var gameState;

function preload(){
  //loading all the images
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png", "Monkey_04.png","Monkey_05.png","Monkey_06.png", "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backImage = loadImage("bg.jpg");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  gameOverImage = loadImage("gameOver.png")
}

function setup() {
  //creating the canvas
  createCanvas(600, 300);
  
  //making the background sprite and giving it animation and giving it velocity and reassigning its x pos to its width divided by 2
  
  background1 = createSprite(300,150);
  background1.velocityX = -5;
  background1.x = background1.width/2;
  
  //creating the gameOver sprite
  gameOver = createSprite(300,150);
  gameOver.addAnimation("go", gameOverImage);
  gameOver.visible = false;
  
  //creating the monkey / player sprite
  monkey = createSprite(70,260);
  monkey.addAnimation("player", player_running);
  monkey.scale = 0.12;
  
  //creating a invisible ground to support monkey
  invGround = createSprite(0,290,400,5);
  invGround.visible = false;
  
  //creating the banana group and obstacles group
  bananaGrp = new Group();
  obstaclesGrp = new Group();
  
  //defining the PLAY and END states
  PLAY = 1;
  END = 0;
  //assigning the game state to PLAY
  gameState = PLAY;
  
}

function draw() {
  //setting the background to white
  background(220);
  
  //making the monkey collide with the invisible ground
  monkey.collide(invGround);
  
  if (gameState === PLAY){
  
    if (keyDown("space" ) && monkey.y >= 240){
      monkey.velocityY = -11;
    }
    
    //adding gravity
    monkey.velocityY += 0.5;

    if (bananaGrp.isTouching(monkey)){
      bananaGrp.destroyEach();
      score += 2;
    }
    
    if (obstaclesGrp.isTouching(monkey) && monkey.scale > 0.12){
      monkey.scale = 0.12;
      obstaclesGrp.destroyEach();
    
    }

    if (obstaclesGrp.isTouching(monkey) && monkey.scale === 0.12){
     gameState = END;   
    }
  }
  
  else if (gameState === END){
    
    destroy();
    
  }
  
  //calling the functions
  backGround();
  bananas();
  obstacles();
  cases();
  drawSprites();
  
  //text settings for score
  stroke("black");
  strokeWeight(1.3);
  textSize(20);
  fill("black");
  text("Score: " + score, 500, 50);
}


function backGround(){
  //adding animation to background sprite and setting its scale
  background1.addImage("bg", backImage);
  
  background1.scale = 0.8;
  
  if (background1.x <(0 + 200)){
    background1.x = background1.width/2 - 50;
  }

}

function bananas(){
  //creating bananas every 130 frames
  if (frameCount % 130 === 0){
    
    //creating a banana sprite, giving it animation, assigning its y pos to a random no., giving it velocity and adding it to the banana group 
    
    var banana = createSprite(700,300)
    banana.addImage("banana", bananaImage);
    banana.scale = 0.12;
    banana.y = random(100,150);
    banana.velocityX = -6
    bananaGrp.add(banana);
  }

}

function obstacles(){
  
  //creating obstacles every 200 frames, giving it animation, setting its scale, giving it velocity, adding it to the obstacles group and setting its collider radius
  
  if (frameCount % 200 === 0){
    var obs = createSprite(700,260)
    obs.addAnimation("obs", obstacleImage)
    obs.scale = 0.23;
    obs.velocityX = -5;
    obstaclesGrp.add(obs);
    obs.setCollider("circle",0,0,200);
  }

}

function cases() {
  //increasing the size of monkey when it touches banana
  switch(score){
    case 10: monkey.scale = 0.14;
      break;
      
    case 20: monkey.scale = 0.16;
      break;
      
    case 30: monkey.scale = 0.18;
      break;
      
    case 40: monkey.scale = 0.20;
      break;
      
    default: break;

  } 
}

function destroy(){
  //setting the background to light blue
  background("lightblue")
  //setting the background's velocity to 0
  background1.velocityX = 0;
  // setting game over visible to true
  gameOver.visible = true;
  //destroying the groups and monkey
  bananaGrp.destroyEach();
  obstaclesGrp.destroyEach();
  monkey.destroy();  
  //setting the velocity of groups and monkey to 0
  monkey.velocityY = 0;
  bananaGrp.setVelocityXEach(0);
  obstaclesGrp.setVelocityXEach(0);
  //setting the visibility of groups and monkey to false
  bananaGrp.setVisibleEach(false);
  monkey.visible = false;
  
}
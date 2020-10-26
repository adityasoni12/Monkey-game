var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

var ground
score = 0

function preload(){
  
  
            
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  monkeyrunning = ("sprite_1.png")
}



function setup() {
createCanvas(600, 205);
  
 monkey = createSprite(50,180,20,50); 
 monkey.addAnimation(monkeyrunning) ;
  
  ground = createSprite(200,210,400,10);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100); 
  ground.visible = true
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
background("lightblue")
  
  text("Score: "+ score, 500,50);
   if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100); 
     
   
    if(keyDown("space") && monkey.y >= 169) {
      monkey.velocityY = -12;
      
    }  
    monkey.velocityY = monkey.velocityY + 0.8
     
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
     monkey.collide(ground);
     
     spawnObstacles();
      spawnBananas();

     if (monkey.isTouching(FoodGroup)){
        FoodGroup.destroyEach();
      }
     if (monkey.isTouching(obstacleGroup)){
        gameState = END;
      }
   }
  
  else if (gameState === END) {
  FoodGroup.setVelocityXEach(0);  
  obstacleGroup.setVelocityXEach(0);  
    
    
  }  
  
  
 drawSprites(); 
}
function spawnObstacles() {
 if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,185,10,40);
    obstacle.addImage( obstacleImage)
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.lifetime = 300;
   obstacle.scale = 0.2;
   obstacleGroup.add(obstacle)
 }
  
}
function spawnBananas() {
if(frameCount % 60 === 0) {
    var banana = createSprite(600,120,10,40);
    banana.addImage( bananaImage)
    banana.velocityX = -(6 + 3*score/100);
    banana.lifetime = 300;
   banana.scale = 0.1;
 FoodGroup.add(banana)
 }




}
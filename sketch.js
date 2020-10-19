var PLAY = 1;
var END = 0;
var gameState = 1;

var sword,fruit,monster,fruitGroup,enymyGroup,score,r,randomFruit;
var swordImage,fruit1,fruit2,fruit3,fruit4,
monsterImage,gameOverImage;

var gameOverSound;
var knifeSound;

function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSound.mp3"); 
}
  


function setup(){
  createCanvas(600,500);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  sword.setCollider("rectangle",0,0,40,40);
  
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}



function draw(){
 background(190)
  
  if(gameState === PLAY){
    fruits();
    Enemy();
    
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
  if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSound.play();
      score = score + 2;
    }
  else{
    if(enemyGroup.isTouching(sword)){
        gameState = END;
        gameOverSound.play();
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        sword.addImage(gameOverImage);
        sword.scale = 2;
        sword.x=300;
        sword.y=250;
       } 
    }
 }
drawSprites();
   textSize(25);
   stroke("blue");
   fill("black");
   textStyle("italic");
   text("SCORE : "+ score,245,30);
  
  
}




function fruits(){
  if(World.frameCount % 80 === 0){
    position = Math.round(random(1,2))
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    
    
    
     r = Math.round(random(1,4));
  if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    if(position == 1){
      fruit.x = 400 ;
      fruit.velocityX = -(7+(score/4));
    }
    else {
    if (position == 2){
      fruit.x = 0;
      fruit.velocityX = (7+(score/4));
      }
    }
    fruitGroup.add(fruit);
  }
}



function Enemy(){
  if(World.frameCount % 200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(random(80,450));
    monster.velocityX = -(8 + (score/10));
    monster.setLifetime = 50;
    enemyGroup.add(monster);
  }
}
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var background,backgroundImg, invisibleGround;
var monkey,monkeyImg;

var fruitsGroup,fruit1,fruit2;
var snakesGroup,snake,snakeImg;

var score=0;

var restart;


function preload(){
    backgroundImg = loadImage("background.jpeg");
    monkeyImg = loadImage("monkey.gif");

    fruit2 = loadImage("fruit_1.png");
    fruit3 = loadImage("fruit2.png");

    snakeImg = loadImage("snake.png");
    restartImg = loadImage("restart.png");

}

function setup() {

    createCanvas(500,500);

    background = createSprite(100,200);
    background.addImage("background.jpeg",backgroundImg);
    background.velocityX = -2;

    monkey = createSprite(50,300);
    monkey.addAnimation("monkey.gif",monkeyImg);
    monkey.scale = 0.25;

    invisibleGround = createSprite(200,329,600,10);
    invisibleGround.visible = false;

    restart = createSprite(250,200);
  restart.addImage(restartImg);
  restart.scale=0.05;

    
    fruitsGroup = new Group();
   snakesGroup = new Group ();
}

function draw() {


text("Score: "+ score, 100,500,); 

      monkey.debug = false;
      monkey.setCollider("circle",0.2,100,200);
      monkey.collide(invisibleGround);

   
    
    restart.visible = false;
    if(background.x < 220){
        background.x = 300
      }

      if (gameState===PLAY){

        background.velocityX = -(3 + 1*score/5);
      }
      if(keyDown("space") && monkey.y >= 200) {
        monkey.velocityY = -10;
      }
      monkey.velocityY = monkey.velocityY + 1;
      spawnfruits();
      spawnsnake();
      
      
      if (fruitsGroup.isTouching(monkey)) {
        fruitsGroup.destroyEach();
        score=score + 2;
    }
    if(snakesGroup.isTouching(monkey)){
      background.velocityX = 0;
      monkey.velocityX = 0;
      snakesGroup.destroyEach();
        gameState = END;
        restart.visible = true;
    }
    
    else if (gameState === END) {
       
        restart.visible = true;
        
        //set velcity of each game object to 0
        background.velocityX = 0;
        monkey.velocityY = 0;
       
       snakesGroup.setVelocityXEach(0);
       fruitsGroup.setVelocityXEach(0);
      
       
        snakesGroup.setLifetimeEach(-1);
        fruitsGroup.setLifetimeEach(-1);

        if(mousePressedOver(restart)) {
          reset();
        }
      }
    
    
   

drawSprites();
}
function spawnfruits(){

    if(frameCount % 60 === 0) {
        var fruit = createSprite(600,165,10,40);
        fruit.velocityX = -(6 + 3*score/100);
        var rand = Math.round(random(1,3));
        switch(rand) {
            case 1: fruit.addImage(fruit2);
                    break;
            case 2: fruit.addImage(fruit3);
                    break;
            default: break;
          }

         fruit.scale=0.1;
         fruit.lifetime = 300;
        fruitsGroup.add(fruit);
      }
    }
    function spawnsnake(){
      
      if(frameCount % 60 === 0) {
        var snake = createSprite(600,300,10,40);
        snake.addImage(snakeImg);
        snake.velocityX = -(6 + 3*score/100);
        snake.x = Math.round(random(800,1220));
                snake.scale=0.01  ;
                snake.lifetime = 300;
               snakesGroup.add(snake);
      }
      }
    

function reset(){
  gameState = PLAY;
  restart.visible = false;
  
  fruitsGroup.destroyEach();
  snakesGroup.destroyEach();
  
score = 0;
}

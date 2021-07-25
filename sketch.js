var runner;
var gameState;
var obstacles;
var playButton;
var frames;
var ground1, ground2;
var banana;
var slowDown, cloak, shoot;
var lives = 3;
var score = 0;
var fire, water;
var monsterGroup;
var slowGroup, cloakGroup, shootGroup;

//speed

function preload() {
  fire = loadImage("fire.png");
  water = loadImage("water.png");
}

function setup() {
  frames = 100;

  monsterGroup = new Group();
  slowGroup = new Group();
  cloakGroup = new Group();
  shootGroup = new Group();
  var canvas = createCanvas(400, 400);

  //the center of the sprite goes to coordinates listed
  runner = createSprite(200, 200, 20, 20);
  runner.addImage(water);
  runner.scale = 0.1;

  console.log("Runner defined 1" + runner);
  ground1 = createSprite(200, 390, 800, 20);
  ground2 = createSprite(200, 10, 800, 20);

  //add starting gamestate (0) later, 1 is in play, and 2 is end
  gameState = 0;

  //creating the group
  obstacles = new Group();

  if (gameState === 0) {
    start();
  }
}

function draw() {
  background(0);

  if (gameState === 1) {
    play();
  } else {
    if (gameState === 2) {
      end();
    }
  }

  //drawSprites();
}

//start function

function start() {
  //initializing button
  playButton = createButton("play");
  playButton.position(174, 200);

  playButton.mousePressed(() => {
    gameState = 1;
    monster = new Player(400, random(20, 380), 15, 15, "red", -3, 0);
    monster.sprite.addImage(fire);
    monster.sprite.scale = 0.1;

    monsterGroup.add(monster.sprite);

    monster.display();
  });
}

function play() {
  score = score + 1;
  playButton.hide();

  fill("white");
  text("Lives: " + lives, 20, 40);

  //movement
  runner.display();

  if (keyDown(UP_ARROW)) {
    runner.velocityY = -3;
  }

  if (keyDown(DOWN_ARROW)) {
    runner.velocityY = 3;
  }

  //every 100 frames, the frame speed will decrease
  if (frameCount % 100 === 0) {
    if (frames === 1) {
      //once the frame rate reaches 1, set the frame speed to 1
      //this way the game will never end, or you can make the game end at 1
      frames = 1;
    } else {
      frames = frames - 1;
    }
  }
  //gravity: runner.velocityY = runner.velocityY + 0.5;
  runner.collide(ground1);
  runner.collide(ground2);

  /*scroll
  ground.x = ground.x - 5;

  if (ground.x < 0) {
    ground.x = 200;
  }
*/
  if (frameCount % frames === 0) {
    //this creates the monsters FASTER, it does not change the SPEED of the monsters
    makeObstacles();
  }

  if (frameCount % (frames + 10) === 0) {
    powerUps();
    console.log("power up")
  }

  if (lives === 0) {
    gameState = 2;
  }

  drawSprites();
}

function end() {
  fill("white");
  text("Game over", 200, 200);
  text("Score:" + score, 200, 220);
}

function makeObstacles() {
  monster = new Player(400, random(20, 380), 15, 15, "red", -3, 0);
  monster.sprite.addImage(fire);
  monster.sprite.scale = 0.1;
  monsterGroup.add(monster.sprite);

  monster.display();

  for (var i = 0; i < monsterGroup.length; i++) {
    if (monsterGroup.get(i).isTouching(runner)) {
      lives = lives - 1;
    }
  }

}

function powerUps() {
  var num = Math.round(random(3, 3));

  if (num === 1) {
    slowDownBoost();
  } else {
    if (num === 2) {
      cloakBoost();
    } else {
      if (num === 3) {
        shootBoost();
      }
    }
  }
}

function slowDownBoost() {
  slowDown = new Player(400, random(20, 380), 15, 15, "blue", -1, 0);
  slowGroup.add(slowDown.sprite);
  slowDown.display();
//  console.log("before:" + monster.sprite.velocityX);

  for (var s = 0; s < slowGroup.length; s++) {
    if (slowGroup.get(s).isTouching(runner)) {
      monsterGroup.setVelocityXEach(-0.5);
      setTimeout(monsterReset(), 15000);
      console.log("hit slowdown boost");
     // console.log("after:" + monster.sprite.velocityX);
    }
  }
}

function cloakBoost() {
 cloak = new Player(400, random(20, 380), 15, 15, "purple", -1, 0);
  cloakGroup.add(cloak.sprite);
  cloak.display();
//  console.log("before:" + monster.sprite.velocityX);
  
  for (var c = 0; c < cloakGroup.length; c++) {
    //find function that causes the protect function to last for x amount of time
    if (cloakGroup.get(c).isTouching(runner)) {
      c.setTime(protect,10000)
      console.log("hit cloak boost");
    }
  }
}

function protect()
{
for(var p = 0; p < monsterGroup.length; p++)
{
  if(monsterGroup.get(p).x-runner.x<200)
  {
    monsterGroup.get(p).destroy()
  }
}
}

function shootBoost() {
  shoot = new Player(400, random(20, 380), 15, 15, "yellow", -1, 0);
  shootGroup.add(shoot.sprite);
  shoot.display();

  for (var h = 0; h < shootGroup.length; h++) {
    if (shootGroup.get(h).isTouching(runner)) {
     pew()
      console.log("hit shoot boost");
    }
  }}

  function pew()
  {
    if(keyDown("space"))
    {
      var bullet = createSprite(runner.x,runner.y,20,10)
      bullet.velocityX = 5

      for(var b = 0; b < monsterGroup.length; b++)
      {
        if(monsterGroup.get(b).isTouching(bullet))
        {
          monsterGroup.get(b).destroy()
        }}
      

    }

  }

var Diamond;
var DiamondRadius;
var Guard;
var Gun1, Gun2, Gun3;
var Bullet;
var Zombie;
var gunStage = 1;
var score = 0;
var gameState = "play";
var attached = 0;
var zombieGroup;
var bulletGroup;
var wall;
var diamondImage;
var guardAnimation;
var guardImg;
var zombieAnimation;
var Gun1Img, Gun2Img, Gun3Img;

function preload() {

    diamondImage = loadImage("images/diamond.png");

    Gun1Img = loadImage("images/gun1.png");
    Gun2Img = loadImage("images/gun2.png");
    Gun3Img = loadImage("images/gun3.png");

}

function setup() {

    createCanvas(1000, 800);

    gameState = "play";

    Diamond = createSprite(240, 400, 15, 15);
    Diamond.shapeColor = color("blue");
    Diamond.scale = 0.04;

    Guard = createSprite(200, 400, 30, 50);
    Guard.shapeColor = color("black");

    Gun1 = createSprite(Guard.y, Guard.x+10, 15, 7);

    Gun2 = createSprite(Guard.y, Guard.x+20, 18,8);

    Gun3 = createSprite(Guard.y, Guard.x+10, 22, 12);

    DiamondRadius = createSprite(Diamond.x, Diamond.y, 50, 50);
    DiamondRadius.visible = false;

    wall = createSprite(0, 400, 15, 850);
    wall.shapeColor = color("black");

    zombieGroup = new Group();
    bulletGroup = new Group();

}

function draw() {
    
    background(230);


    textSize(15);
    fill("black");
    text("Press w, a, s and d keys to move around, and space to shoot! You can pick up and move the diamond by pressing shift!", 50 ,50);
    text("Don't let the Zombies touch you, the diamond or the wall of the room!", 50, 70)

    if(gameState === "play") {
        score = score+Math.round(getFrameRate()/50);
    }

    text("Score: "+score, 750, 100);

    if(gameState === "play") {
        spawnZombie();
    }

    Diamond.addImage("diamondImg", diamondImage);

    Gun1.addImage("Gun1", Gun1Img);
    Gun1.scale = 0.25
    Gun2.addImage("Gun2", Gun2Img);
    Gun2.scale = 0.1
    Gun3.addImage("Gun3", Gun3Img);
    Gun3.scale = 0.1

    DiamondRadius.x = Diamond.x;
    DiamondRadius.y = Diamond.y;

    Gun1.x = Guard.x;
    Gun1.y = Guard.y;

    Gun2.x = Guard.x;
    Gun2.y = Guard.y;

    Gun3.x = Guard.x;
    Gun3.y = Guard.y;

    if(score < 120) {
        gunStage = 1;
    }

    if(score >= 120 && score < 200) {
        gunStage = 2;
    }

    if(score > 200) {
        gunStage = 3;
    }

    if(gunStage === 1 && gameState === "play") {
        Gun1.visible = true;
        Gun2.visible = false;
        Gun3.visible = false;
    }

    if(gunStage === 2 && gameState === "play") {
        Gun1.visible = false;
        Gun2.visible = true;
        Gun3.visible = false;
    }

    if(gunStage === 3 && gameState === "play") {
        Gun1.visible = false;
        Gun2.visible = false;
        Gun3.visible = true;
    }

    if(Guard.isTouching(DiamondRadius) && keyWentDown("shift")) {
        Diamond.held = true;
    } else{Diamond.held = false};

    if(keyWentDown("shift")) {
        attached = attached+1;
        Diamond.held = true;
    }

    if(keyWentUp("shift")) {
        attached = attached+1;
        Diamond.held = true;
    }

    if(attached/2 % 2 === 0 && Guard.isTouching(DiamondRadius)) {
        Diamond.x = Guard.x-10;
        Diamond.y = Guard.y;
    } 

    if(keyCode === 87 && gameState === "play" && Diamond.held === false) {
        Guard.velocityY = -4;
        Guard.velocityX = 0;
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
    } else if(keyCode === 87 && gameState === "play" && Diamond.held === true) {
        Guard.velocityX = 0;
        Guard.velocityY = -2.5;
    }

    if(keyCode === 65 && gameState === "play" && Diamond.held === false) {
        Guard.velocityY = 0;
        Guard.velocityX = -4;
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
    } else if(keyCode === 65 && gameState === "play" && Diamond.held === true) {
        Guard.velocityX = -2.5;
        Guard.velocityY = 0;
    }

    if(keyCode === 68 && gameState === "play" && Diamond.held === false) {
        Guard.velocityY = 0;
        Guard.velocityX = 4;
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
    } else if(keyCode === 68 && gameState === "play" && Diamond.held === true) {
        Guard.velocityX = 2.5;
        Guard.velocityY = 0;
    }

    if(keyCode === 83 && gameState === "play" && Diamond.held === false) {
        Guard.velocityY = 4;
        Guard.velocityX = 0;
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
    } else if(keyCode === 87 && gameState === "play" && Diamond.held === true) {
        Guard.velocityX = 0;
        Guard.velocityY = 2.5;
    }

    shoot();

    if(bulletGroup.isTouching(zombieGroup)) {
        zombieGroup.destroyEach();
    }

    if(zombieGroup.isTouching(Diamond) || zombieGroup.isTouching(wall) || zombieGroup.isTouching(Guard)) {
        gameState = "end";
        zombieGroup.destroyEach();
    }

    if(gameState === "end") {
        bulletGroup.destroyEach;
        zombieGroup.destroyEach;
        Guard.visible = false;
        Diamond.visible = false;

        textSize(50);
        text("GAME OVER", width/3, 400);
    }

    drawSprites();
}

function shoot () {

    if(keyWentDown("space") && gunStage === 1) {
        Bullet = createSprite(Guard.x, Guard.y, 6, 3);
        Bullet.shapeColor = color("black");
        Bullet.velocityX = 8;
        bulletGroup.add(Bullet);
    }

    if(keyWentDown("space") && gunStage === 2) {
        Bullet = createSprite(Guard.x, Guard.y, 9, 6);
        Bullet.shapeColor = color("black");
        Bullet.velocityX = 10;
        bulletGroup.add(Bullet);
    }

    if(keyWentDown("space") && gunStage === 3) {
        Bullet = createSprite(Guard.x, Guard.y, 13, 13);
        Bullet.shapeColor = color("black");
        Bullet.velocityX = 14;
        bulletGroup.add(Bullet);
    }

}

function spawnZombie() {
  
    if(frameCount % 25 === 0) {
      var Zombie = createSprite(1020, 100, 10, 10);
      Zombie.shapeColor = color("green")
      Zombie.y = Math.round(random(150, 750));
      Zombie.scale = 1;
      Zombie.lifetime = 700;
      Zombie.velocityX = -4.5;
      zombieGroup.add(Zombie);
    }
    
  } 
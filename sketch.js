const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var score = 0;
var par;
var turn = 0;
var gameState = 1;

var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;



function setup() {
  createCanvas(480, 800);

  engine = Engine.create();

  world = engine.world;

  ground = new Ground(240, 790, 480, 20);

  particle = new Particle(240, 50);

  for (var j = -10; j <= width; j += 50) {
    plinkos.push(new Plinko(j, 75));
  }
  for (var j = 15; j <= width - 10; j += 50) {
    plinkos.push(new Plinko(j, 175));
  }
  for (var j = -10; j <= width; j += 50) {
    plinkos.push(new Plinko(j, 275));
  }
  for (var j = 15; j <= width - 10; j += 50) {
    plinkos.push(new Plinko(j, 375));
  }

  for (i = 0; i <= width; i = i + 80) {
    divisions.push(new Ground(i, height - divisionHeight / 2, 5, divisionHeight));
  }

  particle = new Particle(width * 2, 10);

  
  createEdgeSprites();


}

function draw() {
  background(0);
  var i;

  Engine.update(engine);

  if (gameState === 1) {



    if (keyWentDown("space")) {


      //  particles.push(new Particle(width/2,10);
      particle = null;
      particle = new Particle(random(50,430), 10)


    }



    if (particle != null) {
      particle.display();
      // particle.bounceOff(topEdge);
      // particle.bounceOff(edge[1]);
      // particle.bounceOff(edge[2]);
      // particle.bounceOff(edge[3]);
      if (particle.body.position.y >= 700) {

        if (particle.body.position.x >= 0 && particle.body.position.x <= 80 || particle.body.position.x >= 400 && particle.body.position.x <= 480) {
          score += 500;
          particle = null;
          turn++;
          particle = new Particle(width * 2, 10);
          if (turn === 5) {
            gameState = 0;
          }
        }
        if (particle.body.position.x >= 80 && particle.body.position.x <= 160 || particle.body.position.x >= 320 && particle.body.position.x <= 400) {
          score += 300;
          particle = null;
          turn++;
          particle = new Particle(width * 2, 10);
          if (turn === 5) {
            gameState = 0;
          }
        }
        if (particle.body.position.x >= 160 && particle.body.position.x <= 320) {
          score += 100;
          particle = null;
          turn++;
          particle = new Particle(width * 2, 10);
          if (turn === 5) {
            gameState = 0;
          }
          
        }

        // score+=1
      }
    }


    ground.display();

    drawSprites();

    textSize(30)
    fill(255)

    text("Score: " + score, 10, 30)

    text("500", 15, 650)
    text("300", 95, 650)
    text("100", 175, 650)
    text("100", 255, 650)
    text("300", 335, 650)
    text("500", 415, 650)

    for(var j = 0; j< plinkos.length;j++){
      plinkos[j].display();
    }
    for(var j = 0; j< divisions.length;j++){
      divisions[j].display();
    }
    for(var j = 0; j< particles.length;j++){
      particles[j].display();
    }

  }


  if (gameState === 0) {

    background("lightblue")
    textSize(30)
    fill(0)
    text("GameOver \nScore: " + score, 160, 300)

  }



}




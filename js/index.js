const myCanvas = document.querySelector('canvas');
const ctx = myCanvas.getContext("2d");
myCanvas.style.border = " 2px solid black ";

const bgImg = new Image();
bgImg.src = "../images/road.png";
const bgImg2 = new Image();
bgImg2.src = "../images/road.png";
let bg1Y = 0;
let bg2Y = -myCanvas.height;

const carImg = new Image();
carImg.src = '../images/car.png';

// game variables
let gameOver = false;
let animateId;

let carWidth = 60;
let carHeight = 100;
let xCar = myCanvas.width/2 - carWidth/2; 
let yCar = myCanvas.height - carHeight - 20; 
let speedCar = 2;

let moveLeft = false;
let moveRight = false;

let myObstacles = [];
let frames = 0;

class Component {
  constructor (width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.color = color;
  this.x = x;
  this.y = y;
  };

  update() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
};

function checkCollision() {
  const carLeft = xCar;
  const carRight = xCar + carWidth;
  const carPosTop = yCar;
  const carPosBottom = yCar + carHeight ;

  for (let i=0 ; i < myObstacles.length ; i++){
    const obstLeft = myObstacles[i].x;
    const obstRight = myObstacles[i].x + myObstacles[i].width;
    const obstPosTop = myObstacles[i].y;
    const obstPosTbottom = myObstacles[i].y +  myObstacles[i].height;
    if (carLeft < obstLeft &&
        carRight < obstRight &&
        carPosTop < obstPosTbottom )  { gameOver = true;  }
  };
};

function updateObstacles() {
  frames ++;
  if (frames % 360 === 0) {
      let height = 20
      let width = 150
      let x = Math.random() * (500-width)
      myObstacles.push(new Component(width, height, `red`, x , 0))
    };

  for (let i = 0; i < myObstacles.length; i++) {
      console.log (myObstacles)
      myObstacles[i].y += 1;
      myObstacles[i].update();
    };
};

window.onload = () => {
  document.getElementById('start-button').onclick = () => { startGame(); }; // click- > start game

  function animate() { 
    ctx.drawImage(bgImg, 0, bg1Y, myCanvas.width, myCanvas.height);
    ctx.drawImage(bgImg2, 0, bg2Y, myCanvas.width, myCanvas.height);
    bg1Y += 2;
    bg2Y += 2;
  
   ctx.drawImage(carImg, xCar, yCar, carWidth, carHeight); 

  updateObstacles(); 
    
    if ( moveLeft && xCar > 0 ) { xCar -= speedCar; } 
    if ( moveRight && xCar + carWidth < myCanvas.width ) { xCar += speedCar; } 

    if (bg1Y > myCanvas.height) { bg1Y = -myCanvas.height;} 
    if (bg2Y > myCanvas.height) { bg2Y = -myCanvas.height;}

  checkCollision()

    if (!gameOver) { animateId = requestAnimationFrame(animate); }
    else { cancelAnimationFrame(animateId); }
  };

    function startGame() { animate() };
};

 document.addEventListener('keydown', event => {
    if (event.key === `ArrowLeft`) { moveLeft = true; }
    if (event.key === `ArrowRight`) { moveRight = true;}  });

document.addEventListener ('keyup', event => {  moveLeft = false; moveRight = false;  });

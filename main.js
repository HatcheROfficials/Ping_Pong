// canvas html element
var canvas = document.getElementById("world");

// canvas context
var ctx = canvas.getContext("2d");

// canvas height and width
var width = canvas.width = window.innerWidth / 2;
var height = canvas.height = window.innerHeight / 2;

// aligning the play area in the center
canvas.style.transform = "translate(" + (window.innerWidth / 2 - width / 2) + "px," + (window.innerHeight / 2 - height / 2) + "px)";

// defining ball class
class ball {
    ballSize; // ball is a square. size = side length
    ballVelocityX;
    ballVelocityY;
    ballPositionX;
    ballPositionY;

    constructor(ballSize, ballVelocity) {
        this.ballSize = ballSize;
        this.ballVelocityX = ballVelocity;
        this.ballVelocityY = ballVelocity;
        this.ballPositionX = width / 2;
        this.ballPositionY = height / 2;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(this.ballPositionX - this.ballSize / 2, this.ballPositionY - this.ballSize / 2, this.ballSize, this.ballSize);
        ctx.closePath();
    }

    move() {
        this.ballPositionX += this.ballVelocityX;
        this.ballPositionY += this.ballVelocityY;
    }

    collosion() {
        if (this.ballPositionX + this.ballSize / 2 >= width ||
            this.ballPositionX - this.ballSize / 2 <= 0) {
            this.ballVelocityX = -this.ballVelocityX;
        } else if (this.ballPositionY + this.ballSize / 2 >= height ||
            this.ballPositionY - this.ballSize / 2 <= 0) {
            this.ballVelocityY = -this.ballVelocityY;
        }

        if (this.ballPositionX - this.ballSize / 2 <= player1.padPositionX + player1.padWidth &&
            this.ballPositionY >= player1.padPositionY-player1.padLength/2 && this.ballPositionY <= player1.padPositionY + player1.padLength/2) {
            this.ballVelocityX = -this.ballVelocityX;
        }
    }
}

// defining ball
var ball1 = new ball(10, 5);

// defining pad class
class pad {
    padLength;
    padWidth;
    padVelocity;
    padPositionX;
    padPositionY;

    // pad moving up or down
    moveUp;
    moveDown;

    constructor(padLength, padWidth, padVelocity) {
        this.padLength = padLength;
        this.padWidth = padWidth;
        this.padVelocity = padVelocity;
        this.padPositionX = 2 * this.padWidth;
        this.padPositionY = height / 2;
        this.moveUp = false;
        this.mvoeDown = false;

        window.addEventListener("keydown", (event) => {
            this.moveUp = event.key === "ArrowUp";
            this.moveDown = event.key === "ArrowDown";
        });
        window.addEventListener("keyup", () => {
            this.moveUp = false;
            this.moveDown = false;
        });
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(this.padPositionX, this.padPositionY - this.padLength / 2, this.padWidth, this.padLength);
        ctx.closePath();
    }

    move() {
        if (this.moveUp) {
            this.padPositionY -= this.padVelocity;
        } else if (this.moveDown) {
            this.padPositionY += this.padVelocity;
        }
    }

    limits() {
        if (this.padPositionY - this.padLength / 2 <= 0) {
            this.padPositionY = this.padLength / 2;
        } else if (this.padPositionY >= height - this.padLength / 2) {
            this.padPositionY = height - this.padLength / 2;
        }
    }
}

// defining player 1 pad
var player1 = new pad(height / 4, 10, 10);

// main function
function play() {
    // setting background color
    // ctx.fillStyle = "#2c3e50";
    ctx.fillStyle = "rgba(44,62,79,0.4)";
    ctx.fillRect(0, 0, width, height);
 
    player1.draw();
    player1.move();
    player1.limits();

    ball1.draw();
    ball1.move();
    ball1.collosion();
    requestAnimationFrame(play);
}

play();
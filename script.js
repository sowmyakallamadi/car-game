const game = document.getElementById("game");

const player = document.getElementById("player");

const scoreText = document.getElementById("score");

const gameOverScreen =
    document.getElementById("gameOver");

const finalScore =
    document.getElementById("finalScore");


/* -------------------------
   GAME VARIABLES
------------------------- */

let playerX = 175;

let score = 0;

let speed = 5;

let gameRunning = true;

let enemies = [];


/* -------------------------
   PLAYER MOVEMENT
------------------------- */

document.addEventListener("keydown", function(event) {

    if (!gameRunning) {
        return;
    }

    if (event.key === "ArrowLeft") {

        playerX -= 30;
    }

    if (event.key === "ArrowRight") {

        playerX += 30;
    }


    /* Keep player inside road */

    if (playerX < 10) {

        playerX = 10;
    }

    if (playerX > 340) {

        playerX = 340;
    }


    player.style.left =
        playerX + "px";

});


/* -------------------------
   CREATE ENEMY
------------------------- */

function createEnemy() {

    if (!gameRunning) {
        return;
    }


    const enemy =
        document.createElement("div");

    enemy.classList.add("enemy");


    /* Four lanes */

    const lanes = [
        40,
        120,
        200,
        280
    ];


    const lane =
        lanes[
            Math.floor(
                Math.random() * lanes.length
            )
        ];


    enemy.style.left =
        lane + "px";

    enemy.style.top =
        "-100px";


    game.appendChild(enemy);


    enemies.push({

        element: enemy,

        x: lane,

        y: -100

    });

}


/* -------------------------
   COLLISION
------------------------- */

function checkCollision(player, enemy) {

    const playerRect =
        player.getBoundingClientRect();

    const enemyRect =
        enemy.getBoundingClientRect();


    return !(
        playerRect.bottom <
        enemyRect.top ||

        playerRect.top >
        enemyRect.bottom ||

        playerRect.right <
        enemyRect.left ||

        playerRect.left >
        enemyRect.right
    );

}


/* -------------------------
   GAME LOOP
------------------------- */

function gameLoop() {

    if (!gameRunning) {
        return;
    }


    /* Move enemies */

    enemies.forEach(function(enemy, index) {

        enemy.y += speed;


        enemy.element.style.top =
            enemy.y + "px";


        /* Check collision */

        if (
            checkCollision(
                player,
                enemy.element
            )
        ) {

            endGame();

        }


        /* Enemy leaves screen */

        if (enemy.y > 650) {

            enemy.element.remove();

            enemies.splice(index, 1);


            score++;

            scoreText.innerText =
                "Score: " + score;


            /* Increase speed */

            if (score % 10 === 0) {

                speed++;

            }

        }

    });


    requestAnimationFrame(gameLoop);

}


/* -------------------------
   GAME OVER
------------------------- */

function endGame() {

    gameRunning = false;


    finalScore.innerText =
        "Your Score: " + score;


    gameOverScreen.style.display =
        "block";

}


/* -------------------------
   RESTART GAME
------------------------- */

function restartGame() {


    /* Remove enemies */

    enemies.forEach(function(enemy) {

        enemy.element.remove();

    });


    enemies = [];


    /* Reset values */

    playerX = 175;

    score = 0;

    speed = 5;


    player.style.left =
        playerX + "px";


    scoreText.innerText =
        "Score: 0";


    gameOverScreen.style.display =
        "none";


    gameRunning = true;


    gameLoop();

}


/* -------------------------
   CREATE ENEMIES
------------------------- */

setInterval(
    createEnemy,
    1200
);


/* -------------------------
   START GAME
------------------------- */

gameLoop();

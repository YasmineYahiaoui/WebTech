/* Fonction qui se déclenche lorsque la fenêtre est chargée */
window.onload = function() {
    var canvasWidth = 1000;
    var canvasHeight = 500;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applex;
    var appley;
    var score;
    var timeout;

    init();

    // Initialisation
    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        /* On rajoute appendChild pour l'attacher à notre page HTML */
        document.body.appendChild(canvas);
        /* Dessiner sur notre page HTML en utilisant le context */
        ctx = canvas.getContext('2d');
        // Initialisation du serpent
        snakee = new Snake([[6, 4], [5, 4], [4, 4]]);
        // Initialisation de la pomme
        createApple();
        // Initialisation du score
        score = 0;
        // Lancement du jeu
        refreshCanvas();
    }

    // Rafraîchissement du canvas
    function refreshCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawSnake();
        drawApple();
        // Mouvement du serpent
        snakee.advance();
        if (snakee.checkCollision()) {
            // Game over
            gameOver();
        } else {
            if (snakee.isEatingApple(applex, appley)) {
                // Si le serpent mange la pomme
                score++;
                snakee.eatApple();
                createApple();
            }
            // Affichage du score
            drawScore();
            timeout = setTimeout(refreshCanvas, delay);
        }
    }

    // Dessiner le serpent
    function drawSnake() {
        snakee.draw();
    }

    // Dessiner la pomme
    function drawApple() {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(applex * blockSize, appley * blockSize, blockSize, blockSize);
    }

    // Créer une nouvelle pomme
    function createApple() {
        applex = Math.floor(Math.random() * (canvasWidth / blockSize));
        appley = Math.floor(Math.random() * (canvasHeight / blockSize));
    }

    // Dessiner le score
    function drawScore() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 5, canvasHeight - 5);
    }

    // Fin de jeu
    function gameOver() {
        ctx.save();
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2);
        ctx.restore();
        // Annuler le rafraîchissement
        clearTimeout(timeout);
    }

    // Mouvement du serpent
    function Snake(body) {
        this.body = body;
        this.direction = "right";
        this.ateApple = false;

        // Dessiner le serpent
        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#00FF00";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };

        // Faire avancer le serpent
        this.advance = function() {
            var nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw("Invalid Direction");
            }
            this.body.unshift(nextPosition);
            if (!this.ateApple) {
                this.body.pop();
            } else {
                this.ateApple = false;
            }
        };

        // Vérifier les collisions
        this.checkCollision = function() {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = Math.floor(canvasWidth / blockSize);
            var maxY = Math.floor(canvasHeight / blockSize);
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX >= maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY >= maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }

            return wallCollision || snakeCollision;
        };

        // Manger la pomme
        this.isEatingApple = function(appleX, appleY) {
            var head = this.body[0];
            return (head[0] === appleX && head[1] === appleY);
        };

        this.eatApple = function() {
            this.ateApple = true;
        };

        // Changer la direction du serpent
        this.setDirection = function(newDirection) {
            var allowedDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    throw("Invalid Direction");
            }
            if (allowedDirections.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        };
    }

    // Dessiner un bloc
    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    // Contrôles du serpent
    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    };
};

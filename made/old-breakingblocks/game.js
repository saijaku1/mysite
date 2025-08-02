
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const startScreen = document.getElementById("startScreen");
    const gameUI = document.getElementById("gameUI");
    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");
    const scoreDisplay = document.getElementById("score");
    const livesDisplay = document.getElementById("lives");
    const rankingList = document.getElementById("rankingList");
    const clearRanking = document.getElementById("clearRanking");

    const brick = {
      rowCount: 9,
      columnCount: 12,
      width: 60,
      height: 20,
      padding: 10,
      offsetTop: 30,
      offsetLeft: 30,
    };

    let balls = [];
    let paddle;
    let bricks;
    let score;
    let lives;
    let level;
    let items = [];
    let isPlaying = false;

    function resetGame() {
      balls = [{
        x: canvas.width / 2,
        y: canvas.height - 30,
        dx: 4,
        dy: -4,
        radius: 10,
      }];
      paddle = {
        width: 140,
        height: 10,
        x: (canvas.width - 75) / 2,
        speed: 11,
        rightPressed: false,
        leftPressed: false,
      };
      score = 0;
      lives = 5;
      level = 1;
      items = [];
      initBricks();
    }

    function initBricks() {
      bricks = [];
      for (let c = 0; c < brick.columnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brick.rowCount + level - 1; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
      }
    }

    document.addEventListener("keydown", e => {
      if (e.key === "Right" || e.key === "ArrowRight") paddle.rightPressed = true;
      if (e.key === "Left" || e.key === "ArrowLeft") paddle.leftPressed = true;
    });

    document.addEventListener("keyup", e => {
      if (e.key === "Right" || e.key === "ArrowRight") paddle.rightPressed = false;
      if (e.key === "Left" || e.key === "ArrowLeft") paddle.leftPressed = false;
    });

    canvas.addEventListener("touchstart", e => {
      const touchX = e.touches[0].clientX - canvas.offsetLeft;
      if (touchX < canvas.width / 2) paddle.leftPressed = true;
      else paddle.rightPressed = true;
    });

    canvas.addEventListener("touchend", () => {
      paddle.leftPressed = false;
      paddle.rightPressed = false;
    });

    function drawBall(ball) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }

    function drawBricks() {
      for (let c = 0; c < brick.columnCount; c++) {
        for (let r = 0; r < bricks[c].length; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brick.width + brick.padding) + brick.offsetLeft;
            const brickY = r * (brick.height + brick.padding) + brick.offsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brick.width, brick.height);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    function collisionDetection() {
      balls.forEach(ball => {
        for (let c = 0; c < brick.columnCount; c++) {
          for (let r = 0; r < bricks[c].length; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
              if (
                ball.x > b.x &&
                ball.x < b.x + brick.width &&
                ball.y > b.y &&
                ball.y < b.y + brick.height
              ) {
                ball.dy = -ball.dy;
                b.status = 0;
                score++;
                updateScore();

                if (Math.random() < 0.2) {
                  spawnItem(b.x + brick.width / 2, b.y + brick.height);
                }

                if (checkLevelClear()) {
                  level++;
                  balls.forEach(bal => {
                    bal.dx *= 1.5;
                    bal.dy *= 1.5;
                  });
                  initBricks();
                  resetBallPositions();
                }
              }
            }
          }
        }
      });
    }

    function checkLevelClear() {
      return bricks.flat().every(b => b.status === 0);
    }

    function updateScore() {
      scoreDisplay.textContent = `スコア: ${score}`;
      localStorage.setItem('blockBreakerScore', JSON.stringify({ score, level }));
    }

    function updateLives() {
      livesDisplay.textContent = `ライフ: ${lives}`;
    }

    function drawItems() {
      items.forEach(item => {
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.fillStyle = "gold";
        ctx.fill();
        ctx.closePath();
      });
    }

    function updateItems() {
      for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];
        item.y += item.dy;

        if (
          item.y + item.radius >= canvas.height - paddle.height &&
          item.x > paddle.x &&
          item.x < paddle.x + paddle.width
        ) {
          if (item.type === 'multiBall') {
            spawnExtraBall();
          }
          items.splice(i, 1);
        } else if (item.y > canvas.height) {
          items.splice(i, 1);
        }
      }
    }

    function spawnItem(x, y) {
      items.push({ x, y, dy: 2, radius: 8, type: 'multiBall' });
    }

    function spawnExtraBall() {
      balls.push({
        x: paddle.x + paddle.width / 2,
        y: canvas.height - 30,
        dx: Math.random() > 0.5 ? 4 : -4,
        dy: -4,
        radius: 10,
      });
    }

    function resetBallPositions() {
      balls.forEach(ball => {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
      });
    }

    function draw() {
      if (!isPlaying) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBricks();
      balls.forEach(drawBall);
      drawPaddle();
      drawItems();

      collisionDetection();
      updateItems();

      balls.forEach(ball => {
        if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius)
          ball.dx = -ball.dx;

        if (ball.y + ball.dy < ball.radius) {
          ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - ball.radius) {
          if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
          } else {
            balls = balls.filter(bal => bal !== ball);
            if (balls.length === 0) {
              lives--;
              updateLives();
              if (!lives) {
                alert("ゲームオーバー！");
                addScoreToRanking({ score, level });
                displayRanking();
                isPlaying = false;
                gameUI.style.display = "none";
                startScreen.style.display = "block";
                return;
              } else {
                balls = [{
                  x: canvas.width / 2,
                  y: canvas.height - 30,
                  dx: 4,
                  dy: -4,
                  radius: 10,
                }];
                paddle.x = (canvas.width - paddle.width) / 2;
              }
            }
          }
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
      });

      if (paddle.rightPressed && paddle.x < canvas.width - paddle.width)
        paddle.x += paddle.speed;
      if (paddle.leftPressed && paddle.x > 0)
        paddle.x -= paddle.speed;

      requestAnimationFrame(draw);
    }

    function loadRanking() {
      const data = localStorage.getItem('blockBreakerRanking');
      return data ? JSON.parse(data) : [];
    }

    function saveRanking(ranking) {
      localStorage.setItem('blockBreakerRanking', JSON.stringify(ranking));
    }

    function addScoreToRanking(newScore) {
      let ranking = loadRanking();
      ranking.push({ score: newScore.score, level: newScore.level, date: new Date().toLocaleString() });
      ranking.sort((a, b) => b.score - a.score);
      if (ranking.length > 10) ranking = ranking.slice(0, 10);
      saveRanking(ranking);
      displayRanking();
    }

    function displayRanking() {
      const ranking = loadRanking();
      rankingList.innerHTML = "";
      if (ranking.length === 0) {
        rankingList.innerHTML = "<li>まだスコアがありません</li>";
      } else {
        ranking.forEach(entry => {
          const li = document.createElement("li");
          li.textContent = `スコア: ${entry.score}  レベル: ${entry.level}  (${entry.date})`;
          rankingList.appendChild(li);
        });
      }
    }

    clearRanking.onclick = () => {
      if (confirm("ランキングをリセットしますか?")) {
        localStorage.removeItem("blockBreakerRanking");
        displayRanking();
      }
    };

    startButton.onclick = () => {
      startScreen.style.display = "none";
      gameUI.style.display = "block";
      resetGame();
      updateScore();
      updateLives();
      displayRanking();
      isPlaying = true;
      draw();
    };

    restartButton.onclick = () => {
      isPlaying = false;
      gameUI.style.display = "none";
      startScreen.style.display = "block";
    };


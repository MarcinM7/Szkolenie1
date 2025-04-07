<template>
  <div class="game-view">
    <img id="img_ball" src="../assets/ball.png">
    <canvas id="gameScreen" width="800" height="600"></canvas>
    <div class="game-stats">
      <p>Punkty: {{ score }}</p>
      <p>Życia: {{ lives }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const score = ref(0)
const lives = ref(3)
const gameOver = ref(false)

let canvas, ctx
let paddle = {
  width: 100,
  height: 20,
  x: 350,
  y: 580,
  speed: 7,
  dx: 0
}

let ball = {
  x: 400,
  y: 300,
  size: 10,
  speed: 2,
  dx: 4,
  dy: -4
}

// Ustawienia klocków
const brickRowCount = 5
const brickColumnCount = 9
const brickWidth = 70
const brickHeight = 20
const brickPadding = 10
const brickOffsetTop = 60
const brickOffsetLeft = 35

// Tworzenie tablicy klocków
let bricks = []
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }
  }
}

const drawBall = () => {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
  ctx.fillStyle = '#FF5733'
  ctx.fill()
  ctx.closePath()
}

const drawPaddle = () => {
  ctx.fillStyle = '#0095DD'
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
}

const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        
        // Każdy rząd ma inny kolor
        const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF']
        ctx.fillStyle = colors[r]
        ctx.fillRect(brickX, brickY, brickWidth, brickHeight)
        ctx.strokeStyle = '#000'
        ctx.strokeRect(brickX, brickY, brickWidth, brickHeight)
      }
    }
  }
}

const drawGameOver = () => {
  ctx.font = '48px Arial'
  ctx.fillStyle = '#FF0000'
  ctx.textAlign = 'center'
  ctx.fillText('KONIEC GRY', canvas.width / 2, canvas.height / 2)
  ctx.font = '24px Arial'
  ctx.fillText('Naciśnij SPACJĘ aby zagrać ponownie', canvas.width / 2, canvas.height / 2 + 50)
}

const drawWin = () => {
  ctx.font = '48px Arial'
  ctx.fillStyle = '#00FF00'
  ctx.textAlign = 'center'
  ctx.fillText('WYGRAŁEŚ!', canvas.width / 2, canvas.height / 2)
  ctx.font = '24px Arial'
  ctx.fillText('Naciśnij SPACJĘ aby zagrać ponownie', canvas.width / 2, canvas.height / 2 + 50)
}

// Sprawdzanie kolizji piłki z klockami
const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r]
      if (b.status === 1) {
        if (
          ball.x > b.x && 
          ball.x < b.x + brickWidth && 
          ball.y > b.y && 
          ball.y < b.y + brickHeight
        ) {
          ball.dy = -ball.dy
          b.status = 0
          score.value += 10
          
          // Sprawdzenie wygranej
          let allBricksDestroyed = true
          for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
              if (bricks[c][r].status === 1) {
                allBricksDestroyed = false
                break
              }
            }
            if (!allBricksDestroyed) break
          }
          
          if (allBricksDestroyed) {
            gameOver.value = true
            setTimeout(() => {
              resetGame(true)
            }, 3000)
          }
        }
      }
    }
  }
}

// Resetowanie gry
const resetGame = (win = false) => {
  if (win) {
    // Zwiększenie trudności po wygranej
    ball.speed += 1
  } else {
    // Reset po przegranej
    score.value = 0
    lives.value = 3
    ball.speed = 4
  }
  
  gameOver.value = false
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  ball.dx = ball.speed
  ball.dy = -ball.speed
  paddle.x = (canvas.width - paddle.width) / 2
  
  // Reset klocków
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r].status = 1
    }
  }
}

const update = () => {
  if (gameOver.value) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle()
    if (lives.value <= 0) {
      drawGameOver()
    } else {
      drawWin()
    }
    return
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  drawBricks()
  drawBall()
  drawPaddle()
  collisionDetection()
  
  // Piłka dotyka ściany - odbijanie
  if (ball.x + ball.dx > canvas.width - ball.size || ball.x + ball.dx < ball.size) {
    ball.dx = -ball.dx
  }
  
  // Piłka dotyka góry - odbijanie
  if (ball.y + ball.dy < ball.size) {
    ball.dy = -ball.dy
  }
  
  // Piłka dotyka dołu - utrata życia lub game over
  if (ball.y + ball.dy > canvas.height - ball.size) {
    // Sprawdzenie kolizji z paletką
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      // Zmiana kierunku odbicia w zależności od miejsca uderzenia
      const hitPosition = ball.x - (paddle.x + paddle.width / 2)
      const normalized = hitPosition / (paddle.width / 2)
      const angle = normalized * Math.PI / 3 // max 60 stopni odbicia
      
      ball.dx = Math.sin(angle) * ball.speed
      ball.dy = -Math.cos(angle) * ball.speed
    } else {
      lives.value--
      
      if (lives.value <= 0) {
        gameOver.value = true
      } else {
        // Reset piłki
        ball.x = canvas.width / 2
        ball.y = canvas.height / 2
        ball.dx = ball.speed
        ball.dy = -ball.speed
        paddle.x = (canvas.width - paddle.width) / 2
      }
    }
  }
  
  // Aktualizacja pozycji piłki
  ball.x += ball.dx
  ball.y += ball.dy
  
  // Aktualizacja pozycji paletki
  paddle.x += paddle.dx
  
  // Granice ekranu dla paletki
  if (paddle.x < 0) paddle.x = 0
  if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width
  
  requestAnimationFrame(update)
}

const keyDownHandler = (e) => {
  if (e.key === 'ArrowRight' || e.key === 'd') {
    paddle.dx = paddle.speed
  } else if (e.key === 'ArrowLeft' || e.key === 'a') {
    paddle.dx = -paddle.speed
  } else if (e.key === ' ' && gameOver.value) {
    resetGame()
  }
}

const keyUpHandler = (e) => {
  if (
    e.key === 'ArrowRight' || e.key === 'ArrowLeft' ||
    e.key === 'a' || e.key === 'd'
  ) {
    paddle.dx = 0
  }
}

onMounted(() => {
  canvas = document.getElementById('gameScreen')
  ctx = canvas.getContext('2d')

  document.addEventListener('keydown', keyDownHandler)
  document.addEventListener('keyup', keyUpHandler)

  update()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', keyDownHandler)
  document.removeEventListener('keyup', keyUpHandler)
})
</script>

<style>
html {
  width: 100%;
  height: 100%;
  margin: 0;
}

.game-view {
  width: 800px;
  height: 600px;
  background-image: url('../assets/game_bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 600px;
  position: relative;
}

.game-stats {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-family: Arial, sans-serif;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}

img {
  display: none;
}
</style>
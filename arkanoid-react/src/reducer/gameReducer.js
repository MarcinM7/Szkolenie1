export const initialState = {
    canvasWidth: 800,
    canvasHeight: 600,
    canvas: null,
    ctx: null,
    paddle: {
      width: 100,
      height: 20,
      x: 350,
      y: 550,
      speed: 8,
    },
    ball: {
      x: 400,
      y: 300,
      radius: 10,
      dx: 4,
      dy: -4,
    },
    bricks: [],
    brickRowCount: 5,
    brickColumnCount: 9,
    brickWidth: 75,
    brickHeight: 20,
    brickPadding: 10,
    brickOffsetTop: 60,
    brickOffsetLeft: 30,
    score: 0,
    lives: 3,
    gameOver: false,
    gameStarted: false,
  };
  
  export const gameReducer = (state, action) => {
    switch (action.type) {
      case 'INIT_GAME':
        return {
          ...state,
          canvas: action.payload.canvas,
          ctx: action.payload.ctx,
          bricks: createBricks(state),
        };
      case 'MOVE_PADDLE':
        return {
          ...state,
          paddle: {
            ...state.paddle,
            x: action.payload,
          },
        };
      case 'UPDATE_GAME':
        return updateGameState(state);
      case 'RESET_GAME':
        return {
          ...initialState,
          canvas: state.canvas,
          ctx: state.ctx,
          bricks: createBricks(initialState),
        };
      default:
        return state;
    }
  };
  
  const createBricks = (state) => {
    const bricks = [];
    for (let c = 0; c < state.brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < state.brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    return bricks;
  };
  
  const updateGameState = (state) => {
    if (!state.gameStarted || state.gameOver) return state;
    
    // Logika aktualizacji stanu gry
    let { ball, bricks, score, lives, gameOver } = state;
    
    // Nowa pozycja piłki
    let newBall = {
      ...ball,
      x: ball.x + ball.dx,
      y: ball.y + ball.dy,
    };
    
    // Detekcja kolizji ze ścianami
    if (newBall.x + ball.dx > state.canvasWidth - ball.radius || newBall.x + ball.dx < ball.radius) {
      newBall.dx = -ball.dx;
    }
    if (newBall.y + ball.dy < ball.radius) {
      newBall.dy = -ball.dy;
    } else if (newBall.y + ball.dy > state.canvasHeight - ball.radius) {
      if (newBall.x > state.paddle.x && newBall.x < state.paddle.x + state.paddle.width) {
        newBall.dy = -ball.dy;
      } else {
        lives--;
        if (lives === 0) {
          gameOver = true;
        } else {
          // Reset piłki
          newBall = { ...initialState.ball };
        }
      }
    }
    
    // Detekcja kolizji z cegłami
    let newScore = score;
    let newBricks = [...bricks];
    
    for (let c = 0; c < state.brickColumnCount; c++) {
      for (let r = 0; r < state.brickRowCount; r++) {
        const brick = newBricks[c][r];
        if (brick.status === 1) {
          if (
            newBall.x > brick.x &&
            newBall.x < brick.x + state.brickWidth &&
            newBall.y > brick.y &&
            newBall.y < brick.y + state.brickHeight
          ) {
            newBall.dy = -ball.dy;
            brick.status = 0;
            newScore++;
          }
        }
      }
    }
    
    // Rysowanie stanu gry
    drawGame(state.ctx, { ...state, ball: newBall, bricks: newBricks, score: newScore, lives, gameOver });
    
    return {
      ...state,
      ball: newBall,
      bricks: newBricks,
      score: newScore,
      lives,
      gameOver,
    };
  };
  
  const drawGame = (ctx, state) => {
    // Czyszczenie canvas
    ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);
    
    // Rysowanie paletki
    ctx.beginPath();
    ctx.rect(state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    
    // Rysowanie piłki
    ctx.beginPath();
    ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    
    // Rysowanie cegieł
    for (let c = 0; c < state.brickColumnCount; c++) {
      for (let r = 0; r < state.brickRowCount; r++) {
        if (state.bricks[c][r].status === 1) {
          const brickX = c * (state.brickWidth + state.brickPadding) + state.brickOffsetLeft;
          const brickY = r * (state.brickHeight + state.brickPadding) + state.brickOffsetTop;
          state.bricks[c][r].x = brickX;
          state.bricks[c][r].y = brickY;
          
          ctx.beginPath();
          ctx.rect(brickX, brickY, state.brickWidth, state.brickHeight);
          ctx.fillStyle = '#0095DD';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
    
    // Rysowanie wyniku i żyć
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Score: ${state.score}`, 8, 20);
    ctx.fillText(`Lives: ${state.lives}`, state.canvasWidth - 65, 20);
    
    // Komunikat o końcu gry
    if (state.gameOver) {
      ctx.font = '36px Arial';
      ctx.fillStyle = '#FF0000';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', state.canvasWidth / 2, state.canvasHeight / 2);
      ctx.textAlign = 'start';
    }
  };
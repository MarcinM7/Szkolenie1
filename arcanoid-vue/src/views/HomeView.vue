<template>
  <header>
    <h1>Arkanoid</h1>
  </header>

    <div class="home">
      
      <div class="container-wrapper">
        <div>
          <router-link to="game">
            
            <button>Start Game </button>
            
          </router-link>

        </div>

      
        <div >
          <button>High Score</button>
        </div>

        <div>
          <button>Chose Level</button>
        </div>

      </div>
    </div>
  </template>
  
  <script setup>

  
  </script>

  <style>

  header h1{
    color: antiquewhite;
  }
    
    body{
      background-image: url('../assets/bg1.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    
    }

    .home{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      height: 50vh;
     

    }

    .container-wrapper{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      
      gap: 25px;
    }

  </style>


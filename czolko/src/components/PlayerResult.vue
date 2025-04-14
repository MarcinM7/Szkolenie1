<template>
    <div class="player-result">
      <div class="name">PLAYER {{ prop.index + 1 }}</div>
      <div class="result">WYNIK: {{ prop.result }}</div>
    </div>
  </template>
  
  <script setup>
    const prop = defineProps(['index', 'result'])
  </script>
  
  <style lang="scss">
  .player-result{
    display:flex;
    justify-content: space-between;
    padding:1rem;
    margin:.5rem;
    border-radius: 5px;
    background: pink;
    gap:15px;
    font-weight: 800; 
  }
  </style>
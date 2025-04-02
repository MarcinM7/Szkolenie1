<template>
    <div class="result-view">
      <header>
        <h1>RESULT</h1>
      </header>
  
      <div class="results">
  
      </div>
  
      <div class="actions">
        <router-link to="/"> STRONA GŁÓNA </router-link>
        <br>
        <router-link to="#" @click="router.back"> ZAGRAJ JESZCZE RAZ </router-link>
      </div>
  
    </div>
  </template>
  
  <script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()
  </script>
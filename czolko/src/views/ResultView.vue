<template>
  <div class="result-view">
    <header>
      <h1>WYNIKI</h1>
    </header>

    <div class="results">

      <div class="result" v-for="(value, index) in players_store.list">
        <player-result :index="index" :result="value" />
      </div>

    </div>

    <div class="actions">
      <router-link to="/"> INNE KATEGORIE </router-link>
      <router-link to="#" @click="router.back"> KOLEJNY GRACZ </router-link>
    </div>

  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import PlayerResult from '../components/PlayerResult.vue'
  import { usePlayers } from '../store/usePlayers'

  const router = useRouter()
  const players_store = usePlayers()
  
</script>

<style lang="scss">
.result-view{

  .actions{
    display:flex;
    gap:15px;

    a {
      flex:1;
      padding:1.5rem;
      color:#fff;
      text-decoration:none;
      font-weight: 600;
      background: violet;
      border-radius: 15px;
    }

  }

}
</style>
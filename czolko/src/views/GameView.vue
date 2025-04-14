<template>
  <div class="game-view">

    <header>
      <router-link to="/">WRÓĆ DO KATEGORII</router-link>
      <h1>Kategoria: {{ category }}</h1>
    </header>

    <div class="question-wrapper">
      <div class="question">
        {{ item }}
      </div>
      <button class="start" @click="showNextItem" v-if="item == null">      
        START
      </button>
    </div>

    <div class="actions">
      <button v-if="item !== null"
        class="bad"
        @click="() => { players_store.countAnswer(-1); showNextItem() }">
        ŹLE
      </button>
      <button v-if="item !== null" 
        class="good"
        @click="() => { players_store.countAnswer(1);showNextItem() }">
        DOBRZE
      </button>
    </div>

    <player-result :index="player_index" :result="players_store.list[player_index]"/>

  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useCategory } from '../composables/useCategory'
  import { ref } from 'vue'
  import { usePlayers } from '../store/usePlayers'
  import PlayerResult from '../components/PlayerResult.vue'

  const router = useRouter()
  const category = router.currentRoute.value.params.category
  const categories = useCategory()
  const category_index = categories.findIndex(cat => cat.name == category)
  const items = categories[category_index].items
  const item = ref(null)

  const players_store = usePlayers()
  const player_index = players_store.addPlayer(category)

  let item_index = 0

  const showNextItem = () => {
    item.value = items[item_index++]

    if(! item.value){
      router.push('/result')
    }

  }

</script>

<style lang="scss" scoped>
.game-view{
  flex:1;
  display:flex;
  flex-direction: column;

  header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding:1rem 2rem;

    h1{
      margin:0;
    }

    a{
      text-decoration: none;
      color: #000;
      position:relative;
      z-index:2;
    }

  }

  .question-wrapper{
    flex:1;
    display:flex;
    align-items: center;
    justify-content: center;

    .start{
      border-radius:15px;
      padding:1rem 2rem;
      border:none;
      background: rgb(250, 199, 121);
      font-weight: 900;
    }

    .question{
      font-size:3.5rem;
      font-weight: 800;

    }

  }

  .actions{

    button{
      position:fixed;
      inset:0;
      z-index:1;
      width:50%;
      opacity:.25;
      font-size:2rem;

      &.good{
        background: green;
        border-right:0;
      }

      &.bad{
        left:unset;
        background: red;
        border-left:0;
      }

    }

  }

}
</style>
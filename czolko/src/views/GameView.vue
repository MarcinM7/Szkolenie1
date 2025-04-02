<template>
    <div class="game-view">
  
      <header>
        <router-link to="/">STRONA GŁÓWNA</router-link>
        <h1>Kategoria: {{ category }}</h1>
      </header>
  
      <div class="question-wrapper">
        <div class="question">
          {{ item }}
        </div>
      </div>
  
      <div class="actions">
        <button @click="showNextItem" v-if="item == null">      
          START
        </button>
        <button @click="showNextItem" v-if="item !== null">      
          ŹLE
        </button>
        <button @click="showNextItem" v-if="item !== null">      
          DOBRZE
        </button>
      </div>
  
    </div>
  </template>
  
  <script setup>
    import { useRouter } from 'vue-router'
    import { useCategory } from '../composables/useCategory'
    import { ref } from 'vue'
  
    const router = useRouter()
    const category = router.currentRoute.value.params.category
    const categories = useCategory()
    const category_index = categories.findIndex(cat => cat.name == category)
    const items = categories[category_index].items
  
    const item = ref(null)
    let item_index = 0
  
    const showNextItem = () => {
      item.value = items[item_index++]
  
      if(! item.value){
        router.push('/result')
      }
  
    }
  
  </script>
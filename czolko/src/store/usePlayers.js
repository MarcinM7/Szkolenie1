import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayers = defineStore('players', () => {

  const current_category = ref(null)
  const player_index = ref(0)
  const list = ref([])
  
  const addPlayer = (category) => {

    if(category != current_category.value){
      list.value = []
      current_category.value = category
    }

    player_index.value = list.value.push(0) - 1
    return player_index.value

  }

  const countAnswer = (result) => {
    list.value[player_index.value] = list.value[player_index.value] + result
  }

  return {
    list,
    addPlayer,
    countAnswer,
  }

})
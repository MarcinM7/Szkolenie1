import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayers = defineStore('players', () =>{

const players = ref([])

const addPlayer = (category) => {
    players.value.push({
        results: [

            {
                category,
                good: 0,
                bad: 0,

            }
        ]
    })

}


return {

    players,
    addPlayer,
}


})
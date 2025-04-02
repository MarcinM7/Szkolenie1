<script setup>
import { useCategory } from '../composables/useCategory'
const categories = useCategory()
</script>

<template>
  <div class="home-view">
    <h1>CZÓŁKO</h1>
    <div class="categories">

      <div class="category" v-for="category of categories">

        <router-link :to="'/game/' + category.name">
          {{ category.name }}
        </router-link>

      </div>

    </div>
  </div>
</template>

<style lang="scss">
.home-view{

  .categories{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    padding:25px;

    .category{
      padding: 3rem 1rem;
      font-weight:800;
      font-size: clamp(.75rem, 2.5vw, 1.5rem);
      cursor:pointer;
      background: #ff5733;
      border-radius: 15px;
      box-shadow: inset 0 0 15px 5px rgba(0, 0, 0, 0.51);

      &:active{
        box-shadow: unset;        
      }

      &:nth-child(1) { background-color: #ff5733; } // Czerwony
      &:nth-child(2) { background-color: #33ff57; } // Zielony
      &:nth-child(3) { background-color: #3357ff; } // Niebieski
      &:nth-child(4) { background-color: #f4c542; } // Żółty
      &:nth-child(5) { background-color: #a833ff; } // Fioletowy

    }

  }
}
</style>
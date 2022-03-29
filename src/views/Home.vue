<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="fetchPokemon">POKE</button>
    {{ pokemons }}
  </div>
</template>

<script>
import { $http } from "@/axios-config";
import { ref } from "vue";
// @ is an alias to /src

export default {
  name: "Home",
  setup() {
    const pokemons = ref([]);
    const fetchPokemon = function () {
      $http
        .get("/pokemon-species", { offset: 0, limit: 898 })
        .then((res) => {
          pokemons.value = res?.data?.results;
        })
        .catch((err) => {
          debugger;
        });
    };
    return { pokemons, fetchPokemon };
  },
};
</script>

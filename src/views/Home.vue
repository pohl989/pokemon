<template>
  <div class="home">
    <button @click="fetchPokemon">POKE</button>
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      :name="pokemon.name"
      :url="pokemon.url"
    />
  </div>
</template>

<script>
import { $http } from "@/axios-config";
import { ref } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: { PokemonCard },
  setup() {
    const pokemons = ref([]);
    const fetchPokemon = function () {
      $http
        .get("/pokemon-species", { params: { offset: 690, limit: 30 } })
        .then((res) => {
          pokemons.value = res?.data?.results;
        })
        .catch(() => {
          alert("unable to load pokemon");
        });
    };
    return { pokemons, fetchPokemon };
  },
};
</script>

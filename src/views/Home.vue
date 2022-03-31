<template>
  <div class="home">
    <button @click="fetchPokemon">POKE</button>
    <button @click="offset++">+</button>
    <button @click="offset--">-</button>

    {{ offset }}
    {{ limit }}
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
    const offset = ref(10);
    const limit = ref(20);
    const fetchPokemon = function () {
      $http
        .get("/pokemon-species", {
          params: { offset: offset.value, limit: limit.value },
        })
        .then((res) => {
          pokemons.value = res?.data?.results;
        })
        .catch(() => {
          alert("unable to load pokemon");
        });
    };
    return { pokemons, fetchPokemon, offset, limit };
  },
};
</script>

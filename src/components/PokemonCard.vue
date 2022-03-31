<template lang="">
  <div class="poke-card">
    <div v-if="!isSpeciesLoaded && !isPokeLoaded" class="poke-card--body">
      ...loading
    </div>
    <div v-else class="poke-card--body">
      <div class="poke-card--img">
        <PokemonImg :name="name" :id="id" />
      </div>
      <div class="poke-card--content">
        <h2 class="pokemon-title">{{ englishName }}</h2>
        <h4 class="pokemon-subtitle">
          {{ flavorText }}
        </h4>
        <div>
          <PokemonLabel
            v-for="type in pokemonTypes"
            :key="type.name"
            :type="type"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, defineComponent, ref, computed, reactive } from "vue";
import { $http } from "@/axios-config";
import PokemonImg from "../components/PokemonImg";
import PokemonLabel from "../components/PokemonLabel";

const getTypes = function (pokemon) {
  return pokemon?.types;
};

export default defineComponent({
  props: ["name", "url"],
  components: { PokemonImg, PokemonLabel },
  setup(props) {
    const { name } = toRefs(props);
    const isPokeLoaded = ref(false);
    const isSpeciesLoaded = ref(false);
    const id = ref(0);

    // pokemon types
    const pokemon = reactive({});

    $http
      .get(`/pokemon/${name.value}`)
      .then((res) => {
        pokemon.value = res?.data;
      })
      .catch(() => {
        alert("something went wrong");
      })
      .finally(() => (isPokeLoaded.value = true));

    const pokemonTypes = computed(() => getTypes(pokemon.value));

    // pokemon species fun descriptions aka flavor texts  && name
    const pokemonSpecies = reactive({});
    $http
      .get(`/pokemon-species/${name.value}`)
      .then((res) => {
        id.value = res?.data?.id;
        pokemonSpecies.value = res?.data;
      })
      .catch(() => {
        alert("something went wrong");
      })
      .finally(() => (isSpeciesLoaded.value = true));

    const getName = function (pokemon, lang) {
      return pokemon?.names?.find((c) => c.language.name === lang)?.name;
    };
    const englishName = computed(() => getName(pokemonSpecies.value, "en"));

    const flavorTexts = computed(() => {
      return pokemonSpecies?.value?.flavor_text_entries
        ?.filter((c) => c.language.name === "en")
        .map((c) => c.flavor_text);
    });

    const flavorText = computed(() => {
      const arr = flavorTexts.value ?? [];
      return arr[Math.floor(Math.random() * arr.length)];
    });
    return {
      id,
      isPokeLoaded,
      isSpeciesLoaded,
      englishName,
      pokemon,
      flavorText,
      pokemonTypes,
      pokemonSpecies,
    };
  },
});
</script>
<style lang="scss">
.poke-card {
  margin: 5px;
  padding: 10px;
  background-color: #feca1c;
  border: 3px solid #ef5350;
  border-radius: 1rem;
  display: flex;
  justify-content: flex-start;
  max-width: 400px;
}

.poke-card--body {
  display: flex;
  justify-content: flex-start;
}

.poke-card--content {
  text-align: left;
}

.pokemon-title {
  margin: 0px;
}
.pokemon-subtitle {
  margin: 0px;
  font-style: italic;
  font-weight: 300;
}
</style>

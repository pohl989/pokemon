<template lang="">
  <div class="poke-card">
    <div v-if="!isLoaded" class="poke-card--body">...loading</div>
    <div v-else class="poke-card--body">
      <div class="poke-card--img">
        <PokemonImg :name="name" :id="id" />
      </div>
      <div class="poke-card--content">
        <h2 class="pokemon-title">{{ englishName }}</h2>

        <h4 class="pokemon-subtitle">
          {{ flavorText }}
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
import { toRefs, defineComponent, ref, computed } from "vue";
import { $http } from "@/axios-config";
import PokemonImg from "../components/PokemonImg";

const sample = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

export default defineComponent({
  props: ["name", "url"],
  components: { PokemonImg },
  setup(props) {
    const { name } = toRefs(props);
    const isLoaded = ref(false);
    const id = ref(0);
    const pokemon = ref({});
    $http
      .get(`/pokemon-species/${name.value}`)
      .then((res) => {
        id.value = res?.data?.id;
        pokemon.value = res?.data;
      })
      .catch(() => {
        alert("something went wrong");
      })
      .finally(() => (isLoaded.value = true));

    const getName = function (pokemon, lang) {
      return pokemon?.names?.find((c) => c.language.name === lang)?.name;
    };
    const spanishName = computed(() => getName(pokemon.value, "es"));
    const englishName = computed(() => getName(pokemon.value, "en"));
    const getflavorTexts = function (pokemon, lang) {
      return pokemon?.flavor_text_entries?.filter(
        (c) => c.language.name === lang
      );
    };
    const frenchName = computed(() => getName(pokemon.value, "fr"));
    const flavorTexts = computed(() => getflavorTexts(pokemon.value, "en"));
    const flavorText = computed(() => sample(flavorTexts.value)?.flavor_text);
    return {
      id,
      isLoaded,
      spanishName,
      englishName,
      frenchName,
      pokemon,
      flavorText,
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

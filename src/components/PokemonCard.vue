<template lang="">
  <div>
    <div v-if="!isLoaded">...loading</div>
    <div v-else>
      <PokemonImg :name="name" :id="id" />
      <h1>{{ englishName }}</h1>
      <h3>{{ frenchName }}</h3>
      <h3>{{ spanishName }}</h3>
    </div>
  </div>
</template>
<script>
import { toRefs, defineComponent, ref, computed } from "vue";
import { $http } from "@/axios-config";
import PokemonImg from "../components/PokemonImg";

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
    const frenchName = computed(() => getName(pokemon.value, "fr"));
    return { id, isLoaded, spanishName, englishName, frenchName };
  },
});
</script>
<style lang=""></style>

<template>
  <img :src="src" :alt="name" />
</template>
<script>
import { toRefs, defineComponent, computed } from "vue";

const baseURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;

export default defineComponent({
  props: ["id", "name"],
  setup(props) {
    const { id, name } = toRefs(props);
    const src = computed(() => `${baseURL}/${id.value ?? 0}.png`);
    return { src };
  },
});
</script>
<style lang=""></style>

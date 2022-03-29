<template lang="">
  <div>{{}}</div>
</template>
<script>
import { toRefs } from "vue";
import { $http } from "@/axio-config";

export default {
  setup() {
    const { pokemon } = toRefs(pokemon);
  },
};
</script>
<style lang=""></style>

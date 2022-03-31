<template>
  <span :class="className" class="pokemon-label">{{ typeNameTitliezed }}</span>
</template>
<script>
import { computed } from "@vue/reactivity";
import { toRefs } from "vue";

export default {
  props: ["type"],
  setup(props) {
    const { type } = toRefs(props);
    const typeName = computed(() => type?.value?.type?.name);
    const typeNameTitliezed = computed(() => {
      return typeName?.value
        ?.split("")
        .map((c, idx) => (idx === 0 ? c.toUpperCase() : c))
        .join("");
    });

    const className = computed(() => `poke-type-${typeName?.value}`);
    return { typeNameTitliezed, className };
  },
};
</script>
<style lang="scss">
.pokemon-label {
  font-family: "Flexo-Medium", arial, sans-serif;
  border-radius: 3px;
  line-height: 16px;
  max-width: 110px;
  margin: 0 0.25rem 0 0;
  width: 4rem;
  float: left;
  text-transform: none;
  font-size: 11px;
  text-align: center;
  border: 1px solid #a4acaf;
}

.poke-type-normal {
  border-color: #d7e2e6;
  background-color: #a4acaf;
  color: #212121;
}
.poke-type-fighting {
  background-color: #d56723;
  color: #fff;
}
.poke-type-flying {
  border-color: #d7e2e6;
  background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);
  background-color: #3dc7ef;
  color: #212121;
}
.poke-type-poison {
  background-color: #b97fc9;
  color: #fff;
}
.poke-type-ground {
  background: linear-gradient(180deg, #f7de3f 50%, #ab9842 50%);
  background-color: #f7de3f;
  color: #212121;
}
.poke-type-rock {
  background-color: #a38c21;
  color: #fff;
}
.poke-type-bug {
  background-color: #729f3f;
  color: #fff;
}
.poke-type-ghost {
  background-color: #7b62a3;
  color: #fff;
}
.poke-type-steel {
  background-color: #9eb7b8;
  color: #212121;
}
.poke-type-fire {
  background-color: #fd7d24;
  color: #fff;
}
.poke-type-water {
  background-color: #4592c4;
  color: #fff;
}
.poke-type-grass {
  background-color: #9bcc50;
  color: #212121;
}
.poke-type-electric {
  background-color: #eed535;
  color: #212121;
}
.poke-type-psychic {
  background-color: #f366b9;
  color: #fff;
}
.poke-type-ice {
  background-color: #51c4e7;
  color: #212121;
}
.poke-type-dragon {
  background: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%);
  background-color: #53a4cf;
  color: #fff;
}
.poke-type-dark {
  background-color: #707070;
  color: #fff;
}
.poke-type-fairy {
  background-color: #fdb9e9;
  color: #212121;
}
.poke-type-unknown {
  background-color: rgb(13, 13, 87);
  color: fff;
}
</style>

<template>
  <v-rating
    v-if="show"
    v-model="this.$props.rating"
    :length="5"
    :empty-icon="`mdi-star-outline`"
    :full-icon="`mdi-star`"
    :half-icon="`mdi-star-half`"
    :half-increments="true"
    :hover="this.$props.hover"
    :readonly="this.$props.readonly"
    :size="18"
    :dense="true"
    :color="`grey`"
    :background-color="`grey`"
  ></v-rating>
</template>

<script>
export default {
  data() {
    return {
      show : this.$props.rating === null && this.$props.readonly === true ? false : true
    };
  },
  props: ["hover", "rating", "readonly"],
};
</script>

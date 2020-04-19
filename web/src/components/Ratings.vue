<template>
  <v-rating
    class="rate"
    v-model="this.$props.rating"
    :length="length"
    :empty-icon="emptyIcon"
    :full-icon="fullIcon"
    :half-icon="halfIcon"
    :half-increments="halfIncrements"
    :hover="this.$props.hover"
    :readonly="this.$props.readonly"
    :size="size"
    :dense="dense"
    :color="color"
    :background-color="bgColor"
  ></v-rating>
</template>

<script>
export default {
  data: () => ({
    emptyIcon: "mdi-star-outline",
    fullIcon: "mdi-star",
    halfIcon: "mdi-star-half",
    halfIncrements: true,
    length: 5,
    size: 48,
    dense: true,
    color: "red lighten-3",
    bgColor: "grey lighten-1"
  }),
  props: ["hover", "rating", "readonly"]
};
</script>

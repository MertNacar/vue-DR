<template>
  <v-rating
    class="rate"
    v-model="rating"
    :length="length"
    :empty-icon="emptyIcon"
    :full-icon="fullIcon"
    :half-icon="halfIcon"
    :half-increments="halfIncrements"
    :hover="hover"
    :readonly="readonly"
    :size="size"
    :dense="dense"
    :color="color"
    :background-color="bgColor"
  ></v-rating>
</template>

<script>
export default {
  data: () => ({
    rating: this.$props.rating,
    emptyIcon: "mdi-star-outline",
    fullIcon: "mdi-star",
    halfIcon: "mdi-star-half",
    halfIncrements: true,
    length: 5,
    size: 64,
    hover: this.$props.hover,
    dense: true,
    readonly: this.$props.readonly,
    color: "red lighten-3",
    bgColor: "grey lighten-1",
  }),
  props: ["hover", "rating", "readonly"],
};
</script>

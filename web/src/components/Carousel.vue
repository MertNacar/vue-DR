<template>
  <v-carousel v-if="event" cycle height="380" :show-arrows="false">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Carousel",
  props: ["items", "event"]
};
</script>
<style>
.v-image__image--cover {
  background-size: 100% auto !important;
}
</style>

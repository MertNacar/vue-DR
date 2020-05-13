<template>
  <div v-if="event" class="full-banner-container">
    <div class="container">
      <div class="row">
        <div v-for="item in items" :key="item.id" class="col4">
          <div class="item">
            <a href="#" :title="item.title">
              <picture>
                <source media="(max-width: 766px)" :srcset="item.src" />
                <source media="(min-width: 767px)" :srcset="item.src" />
                <img class="lazyload" :src="item.src" style="width:auto;" />
              </picture>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FullBanner",
  props: ["items", "event"]
};
</script>

<style></style>

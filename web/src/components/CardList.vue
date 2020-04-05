<template>
  <div class="row">
    <div
      v-for="item in items"
      :key="item.id"
      class="cell"
      onclick="productClick(this)"
    >
      <div class="content">
        <a :title="item.title" :href="item.source">
          <figure>
            <img class="lazyload" :src="item.source" :alt="item.title" />
            <div class="p-info"></div>
          </figure>
        </a>
        <a :title="item.title" :href="item.source" class="item-name">
          <ul class="rate three-half">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <h3 class="ellipsis">{{ item.title }}</h3>
        </a>
        <hr />
        <a :href="item.authorSource" class="who">{{ item.author }}</a>
        <div class="media-type">{{ item.cover }}</div>
        <div class="media-type">
          <a :href="item.publisherSource" class="who mb10">
            {{ item.publisher }}
          </a>
        </div>
        <span class="old-price">{{ item.price }} TL</span>
        <span class="discount-category">%{{ item.discount }}</span>
        <span class="price"
          >{{ item.price - item.price * (item.discount / 100) }} TL</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>

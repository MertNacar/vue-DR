<template>
  <div class="row">
    <div v-for="item in items" :key="item.id" class="cell">
      <router-link :to="{ name: 'BookDetail', params: { item } }">
        <div class="content">
          <a :title="item.title">
            <figure>
              <img class="lazyload" :src="item.img" :alt="item.title" />
              <div class="p-info"></div>
            </figure>
          </a>
          <a :title="item.title" class="item-name">
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
          <!-- who alternate gelebilir -->
          <div class="media-type">{{ item.cover }}</div>
          <div class="media-type">
            <a :href="item.publisherSource" class="who mb10">
              {{ item.publisher }}
            </a>
          </div>
          <span class="old-price">{{ item.price }} TL</span>
          <span class="discount-category">%{{ item.discount }}</span>
          <span class="price"
            >{{
              (item.price - item.price * (item.discount / 100)).toFixed(2)
            }}
            TL</span
          >
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardList",
  props: ["items"],
};
</script>

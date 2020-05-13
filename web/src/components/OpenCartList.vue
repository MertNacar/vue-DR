<template>
  <span>
    <ul>
      <li v-for="item in items" :key="item.id">
        <figure>
          <router-link :to="{ name: 'BookDetail', params: { item } }">
            <img width="45" :src="item.img" :alt="item.title" />
          </router-link>
        </figure>
        <div class="detail">
          <p class="product-name">
            <a>{{
              item.title.length > 15
                ? item.title.substr(0, 15) + "..."
                : item.title
            }}</a>
          </p>
          <p class="product-type">
            <a :title="item.title"
              >{{ item.cover }} / {{ item.quantity }} ADET</a
            >
          </p>
          <p class="product-price">
            <a :title="item.title"
              >{{
                (item.price - item.price * (item.discount / 100)).toFixed(2)
              }}
              TL</a
            >
          </p>
        </div>
      </li>
    </ul>
    <div class="sum">
      <p class="sum-detail">TOPLAM {{ totalCount }} ÜRÜN</p>
      <hr />
      <p class="sum-price">{{ total }} TL</p>
    </div>
  </span>
</template>

<script>
export default {
  data() {
    return {
      items: this.$store.getters.cart
    };
  },
  computed: {
    total() {
      let total = 0;
      this.$store.getters.cart.forEach(item => {
        let calculated =
          (item.price - item.price * (item.discount / 100)) * item.quantity;
        total += calculated;
      });
      return total.toFixed(2);
    },
    totalCount() {
      let count = 0;
      this.$store.getters.cart.forEach(item => {
        count += item.quantity;
      });
      return count || 0;
    }
  }
};
</script>

<style></style>

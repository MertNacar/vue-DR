<template>
  <div id="orderSummary">
    <div class="checkout-cart-details">
      <div class="inner">
        <h3>Toplam {{ cartCount }} ürün</h3>
        <ul>
          <li v-for="item in $store.getters.cart" :key="item.id">
            <figure>
              <router-link :to="{ name: 'BookDetail', params: { item } }">
                <img :src="item.img" :alt="item.title" />
              </router-link>
            </figure>
            <div class="detail">
              <p class="product-name">
                <router-link :to="{ name: 'BookDetail', params: { item } }">
                  {{ item.title }}
                </router-link>
              </p>
              <p class="product-type">
                <router-link :to="{ name: 'BookDetail', params: { item } }">
                  Medya Tipi: {{ item.cover }} / {{ item.quantity }} ADET
                </router-link>
              </p>
              <p style="text-decoration: line-through">
                {{ item.price * item.quantity }} TL
              </p>
              <p class="product-price">
                <router-link :to="{ name: 'BookDetail', params: { item } }">
                  {{
                    (
                      item.price * item.quantity -
                      item.price * (item.discount / 100) * item.quantity
                    ).toFixed(2)
                  }}
                  TL
                </router-link>
              </p>
            </div>
          </li>
          <li v-if="!cargo">
            <figure>
              <i class="fa fa-box"></i>
            </figure>
            <div class="detail">
              <p class="product-name">Standart Teslimat</p>
              <p class="product-price">7,99 TL</p>
            </div>
          </li>
        </ul>
        <div class="price">
          <p class="new">{{ total }} TL</p>
        </div>

        <div class="cta">
          <a class="btn white fancybox">HEDİYE ÇEKİ/KARTI KULLAN</a>
          <a class="btn white fancybox">İNDİRİM KUPONU KULLAN</a>
          <a class="btn white fancybox">ZUBİZU KAMPANYASI KULLAN</a>

          <router-link :to="{ name: 'Cart' }" class="btn grey"
            >SEPETİ DÜZENLE
          </router-link>

          <router-link :to="{ name: 'Home' }" class="btn grey"
            >ALIŞVERİŞE DEVAM ET
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentList",
  computed: {
    total() {
      let total = 0;
      this.$store.getters.cart.forEach(item => {
        let calculated =
          (item.price - item.price * (item.discount / 100)) * item.quantity;
        total += calculated;
      });
      if (total < 100) total += 7.99;
      return total.toFixed(2);
    },
    cartCount() {
      let count = 0;
      this.$store.getters.cart.forEach(item => {
        count += item.quantity;
      });
      return count || 0;
    },
    cargo() {
      return this.total >= 107.99;
    }
  }
};
</script>

<style></style>

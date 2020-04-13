<template>
  <div>
    <div class="product-row" v-for="(item, index) in Items" :key="item.id">
      <div class="half">
        <div class="check check-input-container">
          <input
            type="checkbox"
            class="check-input-cart check-input-basket-product"
            value="97744585"
          />
        </div>
        <div class="product" style="padding-left: 0px;">
          <div style="float: left;width: 75px;">
            <span style="display: block;text-align: center;">
              <img :src="item.img" :alt="item.title" />
            </span>
          </div>
          <div style="float: left;">
            <p
              class="product-name"
              data-id="97744585"
              data-q="1"
              data-pid="1176800"
            >
              <router-link :to="{ name: 'BookDetail', params: { item } }">
                <a :title="item.title" href="#">{{ item.title }}</a>
              </router-link>
            </p>
            <h5 class="product-cat">Tip: {{ item.cover }}</h5>
          </div>
        </div>
      </div>
      <div class="half">
        <div class="detail"></div>

        <div class="quantity count-container">
          <input
            type="button"
            class="icon-desc"
            @click="decreaseQty(item, index)"
            value="-"
          />
          <input type="text" class="text" :value="item.quantity" />
          <input
            type="button"
            class="icon-inc"
            @click="increaseQty(item, index)"
            value="+"
          />
          <article class="paymentsBasketRefresh">
            <a
              href="#"
              class="icon btnUpdateQuantity"
              title="Güncelle"
              data="97744585"
              @click="changeQty(item)"
              >Güncelle</a
            >
          </article>
        </div>
        <div class="single-price">
          <p class="sale"></p>
          <p class="s-price">
            {{ (item.price - item.price * (item.discount / 100)).toFixed(2) }}
            TL
          </p>
        </div>
        <div class="price priceBoxOrder">
          <p style="text-decoration:line-through;font-size:12px">
            {{ item.price }} TL
          </p>
          <p>
            {{ (item.price - item.price * (item.discount / 100)).toFixed(2) }}
            TL
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartList",
  data() {
    return {
      Items: this.$props.items,
    };
  },
  props: ["items"],
  methods: {
    changeQty(item) {
      console.log("item", item);
      this.$store.dispatch("changeQtyCart", item);
    },
    decreaseQty(item,index) {
      if (item.quantity > 1) this.Items[index].quantity--
    },
    increaseQty(item,index) {
      this.Items[index].quantity++
    },
  }
};
</script>

<style></style>

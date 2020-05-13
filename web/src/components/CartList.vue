<template>
  <div>
    <div class="product-row" v-for="(item, index) in items" :key="index">
      <div class="half">
        <div class="check check-input-container">
          <input
            type="checkbox"
            :value="checkAll"
            class="check-input-cart check-input-basket-product"
            @click="select(item)"
          />
        </div>
        <div class="product" style="padding-left: 0px;">
          <div style="float: left;width: 75px;">
            <span style="display: block;text-align: center;">
              <img width="50px" :src="item.img" :alt="item.title" />
            </span>
          </div>
          <div style="float: left;">
            <p class="product-name">
              <router-link :to="{ name: 'BookDetail', params: { item } }">
                <a style="text-align:left" :title="item.title" href="#">{{
                  item.title
                }}</a>
              </router-link>
            </p>
            <h5 style="text-align:left" class="product-cat">
              Tip: {{ item.cover }}
            </h5>
          </div>
        </div>
      </div>
      <div class="half">
        <div class="detail"></div>

        <div class="quantity count-container">
          <input
            type="button"
            class="icon-desc"
            @click="decrease(item, index)"
            value="-"
          />
          <input
            disabled="true"
            type="text"
            class="text"
            :value="item.quantity"
          />
          <input
            type="button"
            class="icon-inc"
            @click="increase(item, index)"
            value="+"
          />
          <article class="paymentsBasketRefresh">
            <a
              href="#"
              class="icon btnUpdateQuantity"
              title="Güncelle"
              @click="change(item)"
              style="color:grey;text-decoration:none"
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
            {{ item.price * item.quantity }} TL
          </p>
          <p>
            {{
              (
                item.price * item.quantity -
                item.price * (item.discount / 100) * item.quantity
              ).toFixed(2)
            }}
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
  props: [
    "items",
    "decrease",
    "increase",
    "change",
    "totalNew",
    "select",
    "checked"
  ],
  computed: {
    checkAll() {
      return this.$props.checked;
    }
  }
};
</script>

<style></style>

<template>
  <div class="cart">
    <div v-if="!empty" id="cartList">
      <section class="basket-container clearfix">
        <form action="/cart" enctype="multipart/form-data" method="post">
          <section class="cart">
            <div class="container">
              <header><h2 class="basketTitle">Sepetim</h2></header>
              <div class="cart-warning">
                <ArrowBanner
                  title="50-99 TL arası siparişlerde kargo 4,99 TL!.."
                />
              </div>

              <div class="cart-head">
                <div class="half">
                  <div class="check check-input-container">
                    <input type="checkbox" class="chkall" value="" />
                  </div>
                  <div class="product">
                    <h5>ÜRÜN</h5>
                    <span class="chk-title"> TÜMÜNÜ SEÇ</span>
                  </div>
                </div>
                <div class="half">
                  <div class="quantity"><h5>ADET</h5></div>
                  <div class="single-price"><h5>BİRİM FİYAT</h5></div>
                  <div class="price"><h5>TOPLAM FİYAT</h5></div>
                </div>
              </div>

              <CartList
                :items="cart"
                :decrease="decreaseQty"
                :increase="increaseQty"
                :change="changeQty"
                :totalNew="totalNew"
              />

              <div class="cta-row">
                <div class="product-selected">
                  <ul style="text-align:left">
                    <li class="choose-product-text">
                      SEÇİLEN <span class="choose-product-count">0</span> ÜRÜNÜ
                    </li>
                    <li>
                      <a
                        href="javascript:;"
                        id="choose-product-remove"
                        title="SİL"
                        >SİL</a
                      >
                    </li>
                    <li>
                      <a
                        href="javascript:;"
                        id="choose-product-favorite"
                        title="FAVORİLERİME EKLE"
                        >FAVORİLERİME EKLE</a
                      >
                    </li>
                  </ul>
                </div>
                <div class="cart-sum">
                  <div style="clear: both;">
                    <span class="bsktTotalPrice">Ara Toplam:</span>
                    <h4 style="float: right;">{{ total }} TL</h4>
                  </div>
                  <button
                    type="submit"
                    id="checkout"
                    name="checkout"
                    value="checkout"
                    class="btn red"
                    style="font-weight: bold;font-size: 14px;"
                    @click="goPayment()"
                  >
                    SATIN AL
                  </button>
                </div>
              </div>

              <div class="bottom-banner">
                <a title="&#214;deme Y&#246;ntemleri">
                  <picture>
                    <source
                      media="(max-width: 766px)"
                      srcset="assets/img/troy.jpg"
                    />
                    <source
                      media="(min-width: 767px)"
                      srcset="assets/img/troy.jpg"
                    />
                    <img src="assets/img/troy.jpg" style="width:auto;" />
                  </picture>
                </a>
              </div>
            </div>
          </section>
          <section class="fixed-term">
            <div class="container">
              <header>
                <h2>Taksit Seçenekleri</h2>
                <p class="installmentsAccordion">
                  Taksit Seçenekleri<span></span>
                </p>
              </header>
              <div class="installmentsWrapper">
                <BankPayment v-bind:total="total" />

                <BankImage />
              </div>
            </div>
          </section>
        </form>
      </section>
    </div>

    <div v-if="empty">
      <EmptyCart />
    </div>
  </div>
</template>

<script>
import CartList from "@/components/CartList";
import BankPayment from "@/components/BankPayment";
import BankImage from "@/components/BankImage";
import ArrowBanner from "@/components/ArrowBanner";
import EmptyCart from "@/views/EmptyCart";
export default {
  components: {
    CartList,
    BankPayment,
    BankImage,
    ArrowBanner,
    EmptyCart
  },
  data() {
    return {
      cart: JSON.parse(JSON.stringify(this.$store.getters.cart)),
      empty: this.$store.getters.cart.length === 0 ? true : false
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
    totalNew() {
      let totalNew = 0;
      this.cart.forEach(item => {
        let calculated =
          (item.price - item.price * (item.discount / 100)) * item.quantity;
        totalNew += calculated;
      });
      return totalNew.toFixed(2);
    },
    totalCount() {
      return this.$store.getters.cart.length;
    }
  },
  methods: {
    changeQty(item) {
      this.$store.dispatch("changeQtyCart", item);
    },
    decreaseQty(item, index) {
      if (item.quantity > 1) this.cart[index].quantity--;
    },
    increaseQty(item, index) {
      this.cart[index].quantity++;
    },
    goPayment() {
      this.$router.push({ name: "Payment" });
    }
  }
};
</script>
<style>
.txt h3 {
  margin: 0;
  line-height: 2;
  font-weight: 600;
}

.txt h2 {
  margin: 0;
  line-height: 2;
  font-weight: 600;
}

.txt h1 {
  margin: 0;
  line-height: 2;
  font-weight: 600;
}

.txt p {
  margin: 0;
}

.black-catalog img {
  width: 200%;
}

.black-catalog a {
  display: block;
}

.container .row p {
  font-size: 14px;
  text-align: center;
  padding: 5px;
  line-height: 4;
}

.container .row p a {
  font-weight: 600;
  color: black;
}

.bankLogoImg img {
  width: 50%;
  float: right;
}

@media screen and (max-width: 768px) {
  .container .row p {
    line-height: 2;
  }

  .container .row img {
    float: none !important;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .container .row p {
    line-height: 2;
  }
}

@media (max-width: 767px) {
  .bankLogoImg img {
    width: auto;
  }

  .bankRow {
    border: 1px solid #dedede;
    box-shadow: 0 1px 1px rgba(80, 80, 80, 0.1);
    border-radius: 2px;
    margin-bottom: 10px;
  }

  .bankLogoImg {
    text-align: center;
  }
}
</style>

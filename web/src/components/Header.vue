<template>
  <header>
    <div class="header-new">
      <figure class="logo">
        <router-link :to="{ name: 'Home' }"
          ><img src="assets/img/head-logo.png" alt="D&R"
        /></router-link>
      </figure>

      <div v-if="payment" id="header-login" class="head-menu">
        <ul>
          <li v-if="loggedIn" class="giris"><a href="#">HESABIM</a></li>
          <li v-if="loggedIn" class="separator"></li>
          <li v-if="loggedIn" class="giris">
            <a @click="logOut()" href="#">ÇIKIŞ</a>
          </li>

          <li v-if="!loggedIn" class="giris">
            <router-link :to="{ name: 'Login' }">ÜYE GİRİŞİ</router-link>
          </li>

          <li class="separator"></li>
          <li class="sepet">
            <a @click="openCart()">SEPETİM</a>

            <i style="font-size:22px" class="fa fa-shopping-cart"></i>

            <!-- icon-sepet -->
            <span class="items-count">{{ cartCount }}</span>
          </li>
        </ul>

        <div id="header-cart" class="head-cart">
          <OpenCartList v-if="showCart" />
          <div v-if="!showCart" class="sum">
            <p class="sum-detail">Sepetinizde Ürün Bulunmamaktadır.</p>
            <hr />
          </div>
          <input
            @click="goCart()"
            class="btn red"
            value="SEPETE GİT"
            type="button"
          />
        </div>
      </div>

      <div v-if="payment"
        class="category-tab"
        style="display:flex;flex-direction:row;align-items:center;"
        @click="showDialog = !showDialog"
      >
        <i id="menuSrc" style="padding-left:25px" class="fa fa-bars fa-2x"></i>
        <label>MENÜ</label>
      </div>

      <div v-if="payment" id="search-login" class="search-bar">
        <i id="menuSrc" class="fa fa-search"></i>
        <!-- icon-arama -->
        <i id="menuCls" class="icon-close">X</i>
        <input
          type="text"
          class="searchInput"
          maxlength="60"
          placeholder="HANGİ ÜRÜNÜ ARIYORSUN?"
          autocomplete="off"
        />
        <input type="button" value="ARA" id="searchIcon" />
        <div class="search-suggests"></div>
      </div>
      <div v-if="payment" class="categories">
        <CategoryDialog v-if="showDialog" :goCategory="goCategory" />
      </div>
    </div>
  </header>
</template>

<script>
/* eslint-disable */
import OpenCartList from "@/components/OpenCartList";
import CategoryDialog from "@/components/CategoryDialog";
export default {
  name: "Header",
  components: {
    OpenCartList,
    CategoryDialog,
  },
  data() {
    return {
      show: false,
      showDialog: false,
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("deleteUser");
      this.$store.dispatch("deleteAllCart");
    },
    openCart() {
      this.show = !this.show;
      if (this.show)
        document.getElementById("header-cart").classList.add("active");
      else document.getElementById("header-cart").classList.remove("active");
    },
    goCart() {
      if (this.show === true) this.openCart();
      this.$router.push({ name: "Cart" });
    },
    goCategory() {
      this.showDialog = false;
      if (this.$router.history.current.name !== "CategoryBook")
        this.$router.push({ name: "CategoryBook" });
    },
  },
  computed: {
    loggedIn() {
      return this.$store.getters.user.email != null;
    },
    cartCount() {
      let count = 0;
      this.$store.getters.cart.forEach((item) => {
        count += item.quantity;
      });
      return count || 0;
    },
    showCart() {
      return this.$store.getters.cart.length > 0 ? true : false;
    },
    payment(){
      return this.$router.apps[0]._route.name != "Payment"
    }
  },
  beforeUpdate() {
    if (this.loggedIn) {
      document.getElementById("header-login").classList.add("logged-in");
      document.getElementById("search-login").classList.add("logged-in");
    } else {
      document.getElementById("header-login").classList.remove("logged-in");
      document.getElementById("search-login").classList.remove("logged-in");
    }
  },
};
</script>

<style></style>

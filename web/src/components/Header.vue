<template>
  <header>
    <div class="header-new">
      <figure class="logo">
        <router-link :to="{ name: 'Home' }"
          ><img src="assets/img/head-logo.png" alt="D&R"
        /></router-link>
      </figure>

      <div id="header-login" class="head-menu">
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
            <!--<a @click="show = !show">SEPETİM</a>-->
            <router-link :to="{ name: 'Cart' }">
              <a>SEPETİM</a>
            </router-link>

            <i style="font-size:2em" class="fa fa-shopping-cart"></i>

            <!-- icon-sepet -->
            <span class="items-count">{{ cartCount }}</span>
          </li>
        </ul>

        <div v-if="show" class="head-cart">
          <div class="sum">
            <p class="sum-detail">Sepetinizde Ürün Bulunmamaktadır.</p>
            <hr />
          </div>
          <router-link :to="{ name: 'Cart' }">
            <input class="btn red" value="SEPETE GİT" type="button" />
          </router-link>
        </div>
      </div>

      <div
        class="category-tab"
        style="display:flex;flex-direction:row;align-items:center;"
      >
        <i id="menuSrc" style="padding-left:25px" class="fa fa-bars fa-2x"></i>
        <label>MENÜ</label>
      </div>

      <div id="search-login" class="search-bar">
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
        <div class="search-suggests">
          <ul class="product"></ul>
          <ul class="category"></ul>
          <ul class="author"></ul>
          <ul class="brand"></ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["Menu"],
  data() {
    return {
      show: false
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("deleteUser");
      this.$store.dispatch("deleteAllCart");
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.user.email != null;
    },
    cartCount() {
      return this.$store.getters.cart.length || 0;
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
  }
};
</script>

<style></style>

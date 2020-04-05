<template>
  <header>
    <div class="header-new">
      <figure class="logo">
        <a href="/"><img src="assets/img/head-logo.png" alt="D&R"/></a>
      </figure>
      <div class="head-menu ">
        <ul>
          <li class="giris" onclick="eventClick(this);">
            <a href="login.html">ÜYE GİRİŞİ</a>
          </li>

          <li class="separator"></li>
          <li class="sepet" onclick="eventClick(this);" data-id="sepetim-click">
            <a href="sepet.html">SEPETİM</a>
            <i class="icon-sepet"></i>
            <span class="items-count">0</span>
          </li>
        </ul>

        <div class="head-cart">
          <div class="sum">
            <p class="sum-detail">Sepetinizde Ürün Bulunmamaktadır.</p>
            <hr />
          </div>
          <input
            class="btn red"
            value="SEPETE GİT"
            type="button"
            onclick="window.location.href = '/Sepetim';"
          />
        </div>
      </div>
      <div class="category-tab">
        <label>MENÜ</label>
      </div>

      <div class="search-bar ">
        <i id="menuSrc" class="icon-arama"></i>
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
};
</script>

<style></style>

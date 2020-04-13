<template>
  <div v-if="event" class="categoryBookLiterature">
    <section class="sub-categories">
      <div class="categories-path">
        <div class="container">
          <ul>
            <li><a href="/">ANASAYFA</a></li>
            <li>
              <a href="/kategori/kitap">Kitap</a>
            </li>
            <li>
              Edebiyat
            </li>
          </ul>
        </div>
      </div>
      <div class="category-name">
        <div class="container">
          <h1>Edebiyat</h1>
        </div>
      </div>
      <CategoryList v-bind:items="Categories" />
    </section>

    <section class="filter">
      <div class="sc-filter">
        <div class="container">
          <hr />
          <div class="row">
            <div class="filter">
              <!--.filter-media-->
              <select
                name=""
                id="media"
                class="custom select-box-filter mediaTypeControl"
              >
                <option value="">MEDYA CİNSİ</option>
                <option id="media_1134" value="İnce Kapak">İnce Kapak</option>
                <option id="media_609" value="Ciltli">Ciltli</option>
                <option id="media_610" value="Cep Boy">Cep Boy</option>
                <option id="media_706" value="Aylık">Aylık</option>
              </select>
            </div>
            <div class="filter" id="priceFilter">
              <!--.filter-price-->
              <select
                name=""
                id="price"
                class="custom select-box-filter priceControl"
              >
                <option value="">FİYAT</option>
                <option value="0,25">0 TL - 25 TL</option>
                <option value="25,50">25 TL - 50 TL</option>
                <option value="50,100">50 TL - 100 TL</option>
                <option value="100,250">100 TL - 250 TL</option>
                <option value="250,500">250 TL - 500 TL</option>
                <option value="500,-1">500 TL ve &#252;zeri</option>
              </select>
            </div>

            <div class="filter">
              <select name="" id="language" class="custom select-box-filter">
                <option value="">DİL</option>
                <option>T&#252;rk&#231;e</option>
                <option>İngilizce</option>
                <option>K&#252;rt&#231;e</option>
                <option>T&#252;rk&#231;e - İngilizce</option>
                <option>Ermenice</option>
                <option>Almanca</option>
                <option>T&#252;rk&#231;e - Fars&#231;a</option>
                <option>T&#252;rk&#231;e - Makedonca</option>
                <option>Almanca - T&#252;rk&#231;e</option>
                <option>Arap&#231;a - T&#252;rk&#231;e</option>
                <option>Fars&#231;a - T&#252;rk&#231;e</option>
                <option>Fransızca</option>
                <option>Rus&#231;a</option>
                <option>Türkçe - Almanca</option>
                <option>T&#252;rk&#231;e - Arap&#231;a</option>
                <option>T&#252;rk&#231;e - K&#252;rt&#231;e</option>
                <option>T&#252;rk&#231;e - Osmanlıca</option>
                <option>T&#252;rk&#231;e - Yunanca</option>
                <option>T&#252;rk&#231;e - İspanyolca</option>
              </select>
            </div>

            <div class="filter-search">
              <div class="npt-container">
                <input
                  type="text"
                  name="authortext"
                  id="authortext"
                  maxlength="25"
                  autocomplete="off"
                  placeholder="YAZAR"
                />
                <div class="npt-button">
                  <i class="icon-arama"></i>
                  <input type="button" value="&nbsp;" />
                </div>
              </div>
              <div class="category-suggests">
                <ul class="person" style="display: none"></ul>
              </div>
            </div>
            <div class="filter-order-by">
              <select
                name=""
                id="order-by"
                class="custom select-box-filter"
                autocomplete="off"
              >
                <option value="price,desc">Azalan Fiyat</option>
                <option value="price,asc">Artan Fiyat</option>
                <option selected="selected" value="soldcount,desc"
                  >Çok Satan</option
                >
                <option value="newness,desc">Yeni</option>
                <option value="newness,asc">Eski</option>
                <option value="name.sortable,asc">A - Z</option>
                <option value="name.sortable,desc">Z - A</option>
                <option value="discount,desc">Azalan İndirim</option>
                <option value="discount,asc">Artan İndirim</option>
              </select>
            </div>
            <div class="pull-right status-check" id="productStatus">
              <input type="checkbox" id="tukenleriGizle" />
              <label for="tukenleriGizle">Tükenenleri Göster</label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container pager-content">
      <ul class="pager pager-list"></ul>
      <div class="list-count">
        <span id="searchResultCount">47787 ADET</span>
      </div>
    </div>
    <section class="shelf">
      <div id="container" class="container">
        <CardList v-bind:items="Items" />
      </div>
    </section>
    <div class="container">
      <ul class="pager bottom"></ul>
    </div>
  </div>
</template>

<script>
import CardList from "@/components/CardList";
import CategoryList from "@/components/CategoryList";
import axios from "axios";
export default {
  name: "CategoryBookLiterature",
  components: {
    CardList,
    CategoryList,
  },
  data() {
    return {
      Categories: [],
      Items: [],
      event: false,
    };
  },
  async created() {
    try {
      let res = await axios.get(
        "http://localhost:7700/category/books/literature/all"
      );
      this.Categories = res.data.Categories;
      this.Items = res.data.Books;
      // document.getElementById("categories-1").classList.add("active")
      this.event = true;
    } catch (err) {
      console.log("err", err);
    }
  },
};
</script>

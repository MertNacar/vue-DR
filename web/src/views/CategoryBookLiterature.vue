<template>
  <div v-if="event" class="categoryBookLiterature">
    <section class="sub-categories">
      <div class="categories-path">
        <div class="container">
          <ul style="text-align:left">
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
          <v-row>
            <v-col md="2" sm="12" cols="12">
              <v-combobox label="MEDYA CİNSİ" solo readonly></v-combobox>
            </v-col>
            <v-col md="2" sm="12" cols="12">
              <v-select
                v-model="cost"
                @change="filterBooks()"
                :items="costItems"
                label="FİYAT"
                return-object
                solo
              ></v-select>
            </v-col>

            <v-col md="1" sm="12" cols="12">
              <v-combobox label="DİL" solo readonly></v-combobox>
            </v-col>

            <v-col md="3" sm="12" cols="12">
              <v-text-field
                solo
                readonly
                label="Yazar"
                append-icon="fa fa-search"
              ></v-text-field>
            </v-col>

            <v-col md="2" sm="12" cols="12">
              <v-combobox label="ÇOK SATAN" solo readonly></v-combobox>
            </v-col>
            <v-col md="2" sm="12" cols="12">
              <v-checkbox readonly :label="`Tükenenleri göster`"></v-checkbox>
            </v-col>
          </v-row>
        </div>
      </div>
    </section>

    <div class="container pager-content">
      <ul class="pager pager-list">
        <li>
          <a class="active" style="text-decoration:none" href="javascript:;"
            >1</a
          >
        </li>
      </ul>
      <div class="list-count">
        <span id="searchResultCount">{{ totalCount }} ADET</span>
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
/* eslint-disable */
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
      cost: { text: "FİYAT", value: "" },
      costItems: [
        { text: "FİYAT", value: "" },
        { text: "0 TL - 25 TL", value: "0,25" },
        { text: "25 TL - 50 TL", value: "25,50" },
        { text: "100 TL - 250 TL", value: "100,250" },
        { text: "250 TL - 500 TL", value: "250,500" },
        { text: "500 TL ve üzeri", value: "500,999999" },
      ],
      event: false,
    };
  },
  async created() {
    try {
      let res = await axios.get(
        `${process.env.VUE_APP_API}/category/books/literature/all`
      );
      if (res.err) throw new Error();
      this.Categories = res.data.Categories;
      this.Items = res.data.Books;
      this.event = true;
    } catch {
       this.event = false;
     }
  },
  computed: {
    totalCount() {
      return this.Items.length;
    },
  },
  methods: {
    async filterBooks() {
      try {
        let res = await axios.get(
          `${process.env.VUE_APP_API}/category/books/literature?price=${this.cost.value}`
        );
        if (res.err) throw new Error();
        this.Items = res.data.Books;
      } catch {
        this.Items = []
       }
    },
  },
};
</script>

<style>
.input[type="text"] {
  border: none;
}
</style>

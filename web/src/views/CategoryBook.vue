<template>
  <div v-if="event" class="categoryBook">
    <section class="catPagesCont clearfix">
      <div id="catPageContent" class="catPagesContCenter">
        <div class="side-2"></div>

        <section class="sub-categories">
          <div class="categories-path">
            <div class="container">
              <ul style="text-align:left">
                <li><a href="/">ANASAYFA</a></li>
                <li>
                  Kitap
                </li>
              </ul>
            </div>
          </div>
          <div class="category-name">
            <div class="container">
              <h1>Kitap</h1>
            </div>
          </div>

          <section class="stage category-banner">
            <div class="container">
              <Carousel v-if="event" :event="event" v-bind:items="Carousels" />
            </div>
          </section>

          <CategoryList v-bind:items="Categories" />
        </section>

        <div class="container">
          <ArrowBanner title="METİS'ten yüksek indirimli kitaplar!.." />
        </div>

        <section class="shelf">
          <div class="container">
            <header>
              <h2>Çok Satanlar</h2>
              <a href="/CokSatanlar/Kitap">TÜMÜNÜ GÖRÜNTÜLE</a>
            </header>

            <CardList v-bind:items="Interested" />
          </div>
        </section>
        <section class="shelf">
          <div class="container">
            <header>
              <h2>En Yeniler</h2>
              <a href="/Kategori_/Kitap/En-Yeniler/10001/3">TÜMÜNÜ GÖRÜNTÜLE</a>
            </header>
            <CardList v-bind:items="News" />
          </div>
        </section>
        <section class="shelf">
          <div class="container">
            <header>
              <h2>Sizin İçin Seçtiklerimiz</h2>
              <a href="/Sectiklerimiz/Kitap">TÜMÜNÜ GÖRÜNTÜLE</a>
            </header>

            <CardList v-bind:items="ForYou" />
          </div>
        </section>

        <FullBanner v-bind:items="FullBanners" />
      </div>
    </section>
  </div>
</template>

<script>
import FullBanner from "@/components/FullBanner";
import CardList from "@/components/CardList";
import Carousel from "@/components/Carousel";
import ArrowBanner from "@/components/ArrowBanner";
import CategoryList from "@/components/CategoryList";
import axios from "axios";
export default {
  name: "CategoryBook",
  components: {
    FullBanner,
    CardList,
    Carousel,
    ArrowBanner,
    CategoryList,
  },
  data() {
    return {
      Categories: [],
      Carousels: [],
      FullBanners: [],
      Interested: [],
      News: [],
      ForYou: [],
      event: false,
    };
  },
  async created() {
    try {
      let res = await axios.get("http://localhost:7700/category/books");
      this.Categories = res.data.Categories;
      this.Carousels = res.data.Carousels;
      this.FullBanners = res.data.FullBanners;
      this.Interested = res.data.Interested;
      this.News = res.data.News;
      this.ForYou = res.data.ForYou;
      this.event = true;
    } catch {}
  }
};
</script>

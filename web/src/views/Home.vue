<template>
  <div class="home">
    <Header v-bind:Menu="Menu" />
    <SubHeader v-if="event" :event="event" v-bind:SubHeader="SubHeader" />
    <ArrowBanner title="Tüm kitap kampanyaları tek bir sayfada" />

    <section class="shelf">
      <div class="container">
        <header>
          <h2>Kitap</h2>
          <a href="/Sectiklerimiz/Kitap">TÜMÜNÜ GÖRÜNTÜLE</a>
        </header>
        <CardList v-bind:items="Book" />
      </div>
    </section>

    <FullBanner
      v-if="event"
      :event="event"
      v-bind:items="FullBanner.FirstBanner"
    />

    <section class="shelf">
      <div class="container">
        <header>
          <h2>Öne Çıkanlar</h2>
          <a href="/kataloglar_/anasayfaonecikanlar/6804">TÜMÜNÜ GÖRÜNTÜLE</a>
        </header>
        <CardList v-bind:items="Featured" />
      </div>
    </section>

    <section class="shelf">
      <div class="container">
        <header>
          <h2>Kırtasiye</h2>
          <a href="/kategori/Kirtasiye">TÜMÜNÜ GÖRÜNTÜLE</a>
        </header>
        <CardList v-bind:items="Stationery" />
      </div>
    </section>
    <section class="shelf">
      <div class="container">
        <header>
          <h2>Elektronik</h2>
          <a href="/kategori/Elektronik">TÜMÜNÜ GÖRÜNTÜLE</a>
        </header>
        <CardList v-bind:items="Electronic" />
      </div>
    </section>
    <section class="shelf">
      <div class="container">
        <header>
          <h2>Hobi&Oyuncak</h2>
          <a href="/kategori/Hobi-Oyuncak">TÜMÜNÜ GÖRÜNTÜLE</a>
        </header>
        <CardList v-bind:items="HoobyToys" />
      </div>
    </section>
    <section class="shelf">
      <div class="container">
        <header>
          <h2>Oyun&Konsol</h2>
          <a href="/kategori/Oyun-Konsol">TÜMÜNÜ GÖRÜNTÜLE</a>
        </header>
        <CardList v-bind:items="GameConsole" />
      </div>
    </section>

    <FullBanner v-bind:items="FullBanner.SecondBanner" />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import ArrowBanner from "@/components/ArrowBanner";
import FullBanner from "@/components/FullBanner";
import CardList from "@/components/CardList";
import Footer from "@/components/Footer";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      Menu: [],
      PopularSearch: [],
      SubHeader: {},
      Book: [],
      FullBanner: {},
      Featured: [],
      Stationery: [],
      Electronic: [],
      HoobyToys: [],
      GameConsole: [],
      event: false,
    };
  },
  components: {
    Header,
    SubHeader,
    ArrowBanner,
    FullBanner,
    CardList,
    Footer,
  },
  async created() {
    try {
      let res = await axios.get("http://localhost:7700/home");
      this.Menu = res.data.Menu;
      this.PopularSearch = res.data.PopularSearch;
      this.SubHeader = res.data.SubHeader;
      this.Book = res.data.Book;
      this.FullBanner = res.data.FullBanner;
      this.Featured = res.data.Featured;
      this.Stationery = res.data.Stationery;
      this.Electronic = res.data.Electronic;
      this.HoobyToys = res.data.HoobyToys;
      this.GameConsole = res.data.GameConsole;
      this.event = true;
    } catch (err) {
      console.log("err", err);
    }
  },
};
</script>

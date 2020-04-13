<template>
  <div id="app">
    <v-app>
      <Header v-bind:Menu="Menu" />
      <router-view />
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  data() {
    return {
      Menu: [
        {
          id: "Menu-1",
          source: "link",
          img: "link",
          title: "Kitap",
        },
        {
          id: "Menu-2",
          source: "#",
          img: "link",
          title: "E-Kitap",
        },
        {
          id: "Menu-3",
          source: "#",
          img: "link",
          title: "Elektronik",
        },
        {
          id: "Menu-4",
          source: "#",
          img: "link",
          title: "Hobi & Oyuncak",
        },
        {
          id: "Menu-5",
          source: "#",
          img: "link",
          title: "Kırtasiye",
        },
        {
          id: "Menu-6",
          source: "#",
          img: "link",
          title: "Hediyelik Eşyalar",
        },
        {
          id: "Menu-7",
          source: "#",
          img: "link",
          title: "Oyun & Konsol",
        },
        {
          id: "Menu-8",
          source: "#",
          img: "link",
          title: "Yeni Çıkan Kitaplar",
        },
        {
          id: "Menu-9",
          source: "#",
          img: "link",
          title: "Çok Satanlar",
        },
        {
          id: "Menu-10",
          source: "#",
          img: "link",
          title: "Spor & Outdoor",
        },
        {
          id: "Menu-11",
          source: "#",
          img: "link",
          title: "Film",
        },
        {
          id: "Menu-12",
          source: "#",
          img: "link",
          title: "Müzik",
        },
        {
          id: "Menu-13",
          source: "#",
          img: "link",
          title: "Kampanyalar",
        },
        {
          id: "Menu-14",
          source: "#",
          img: "link",
          title: "Mağaza Etkinlikleri",
        },
      ],
    };
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <ul>
    <li v-for="item in items" :key="item.id" @click="goCategory()">
      <a><i :class="item.class"></i></a>
      <a
        ><span>{{ item.title }}</span></a
      >
    </li>
  </ul>
</template>

<script>
import axios from "axios";
export default {
  name: "CategoryDialog",
  props: ["goCategory"],
  data() {
    return {
      dialog: true,
      items: []
    };
  },
  async created() {
    try {
      let res = await axios.get("http://192.168.1.106:7700/home/menu");
      this.items = res.data;
    } catch {
      this.items = [];
    }
  }
};
</script>

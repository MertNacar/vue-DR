<template>
  <ul v-if="dialog">
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
  data() {
    return {
      dialog: true,
      items: [],
    };
  },
  async created() {
    try {
      let res = await axios.get("http://localhost:7700/home/menu");
      this.items = res.data.Menu;
    } catch (err) {
      console.log("err", err);
    }
  },
  methods: {
    async goCategory() {
      try {
        console.log("object1", this.items);
        this.dialog = false;
        console.log("object2", this.items);
        this.$router.push({ name: "CategoryBook" });
        console.log("object3", this.items);
        let res = await axios.get("http://localhost:7700/home/menu");
        this.items = res.data.Menu;
        console.log("object4", this.items);
      } catch (err) {
        console.log("err", err);
      }
    },
  },
};
</script>

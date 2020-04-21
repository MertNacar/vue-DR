<template>
  <div class="sc-container">
    <div class="container">
      <div class="row">
        <ul>
          <li v-for="item in items" :key="item.id">
            <a :id="item.id" :class="item.class" @click="goPage(item.link)">{{ item.title }}</a>
          </li>
          <li class="toggle"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryList",
  props: ["items"],
  mounted() {
    document.getElementById("Categories-1").classList.add("active");
  },
  methods: {
    goPage(link) {
      if(link === "#") return
      this.$router.push({ name: link });
    },
  },
};
</script>

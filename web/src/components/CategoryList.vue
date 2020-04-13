<template>
  <div class="sc-container">
    <div class="container">
      <div class="row">
        <ul v-for="item in items" :key="item.id">
          <li>
            <a :id="item.id" href="#">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryList",
  props: ["items"],
};
</script>

<template>
  <div class="container">
    <div
      class="highlight"
      style="font-size:16px!important;color:#ffffff!important;background:#ff0000!important;"
    >
      <p>
        <a href="#" style="color:#ffffff!important;"
          ><span>{{ title }}</span
          ><img src="assets/img/arrow-right.png"
        /></a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArrowBanner",
  props: ["title"],
};
</script>

<style></style>

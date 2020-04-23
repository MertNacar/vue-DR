<template>
  <div id="productReviewList">
    <div v-for="item in items" :key="item.id" class="comment">
      <div class="comment-content">
        <strong>
          {{ item.title }}
        </strong>
        <p>{{ item.description }}</p>
      </div>
      <div class="comment-details">
        <p>{{ item.date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"CommentList",
  props:["items"]
};
</script>

<style></style>

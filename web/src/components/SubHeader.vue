<template>
  <section class="stage">
    <div class="container relative">
      <div class="top-banner">
        <a href="#" :title="SubHeader.FirstPic.title">
          <picture>
            <source
              media="(max-width: 766px)"
              :srcset="SubHeader.FirstPic.src"
            />
            <source
              media="(min-width: 767px)"
              :srcset="SubHeader.FirstPic.src"
            />
            <img :src="SubHeader.FirstPic.src" style="width:auto;" />
          </picture>
        </a>
      </div>

      <div class="row">
        <div class="col-sm-9">
          <Carousel v-if="event" :event="event" v-bind:items="SubHeader.Carousel" />
        </div>

        <div class="col-sm-3 todaysDeal">
          <a href="#" :title="SubHeader.SecondPic.title">
            <picture>
              <source
                media="(max-width: 766px)"
                :srcset="SubHeader.SecondPic.src"
              />
              <source
                media="(min-width: 767px)"
                :srcset="SubHeader.SecondPic.src"
              />
              <img :srcset="SubHeader.SecondPic.src" style="width:auto;" />
            </picture>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Carousel from "./Carousel";
export default {
  Name: "SubHeader",
  components: {
    Carousel,
  },
  props: ["SubHeader","event"],
};
</script>

<style></style>

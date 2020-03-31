<template>
  <v-carousel cycle :show-arrows="false">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src:
            "../../public/assets/img/0220_d_u_x_851x373_haftanin_firsati_domingo.jpg"
        },
        {
          src: "../../public/assets/img/0120_d_t_76_851x373_jbl.jpg"
        },
        {
          src: "../../public/assets/img/0919_d_u_x_851x373_bic_kampanya.jpg"
        },
        {
          src: "../../public/assets/img/1019_d_u_x_851x373_hatchimals.jpg"
        },
        {
          src:
            "../../public/assets/img/0220_d_u_23_851x373_sennheiser_hd450bt_kulaklik_yeni2-son.jpg"
        },
        {
          src: "../../public/assets/img/0220_d_u_x_851x373_dunyasizlar1.png"
        },
        {
          src: "../../public/assets/img/axess-wings-3.jpg"
        },
        {
          src: "../../public/assets/img/axess-wings-2.jpg"
        },
        {
          src:
            "../../public/assets/img/0120_d_u_x_851x373_ithaki_yayinlari_rev.jpg"
        },
        {
          src: "../../public/assets/img/taksit-sevenekleri-yeni.jpg"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>

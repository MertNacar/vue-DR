<template>
  <section class="basketInstallmentContainer">
    <div v-for="bank in banks" :key="bank.id" class="cell">
      <div class="table">
        <figure>
          <img :src="bank.src" alt="" />
        </figure>
        <div class="head">
          <div class="term">Taksit</div>
          <div class="monthly">Aylık</div>
          <div class="total">Tutar</div>
        </div>
        <div class="cell-row">
          <div class="term">Peşin</div>
          <div class="monthly">{{ total }} TL</div>
          <div class="total">{{ total }} TL</div>
        </div>
        <div class="cell-row">
          <div class="term">2</div>
          <div class="monthly">{{ parseFloat(total / 2).toFixed(2) }} TL</div>
          <div class="total">{{ total }} TL</div>
        </div>
        <div class="cell-row">
          <div class="term">3</div>
          <div class="monthly">{{ parseFloat(total / 3).toFixed(2) }} TL</div>
          <div class="total">{{ total }} TL</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BankPayment",
  props: ["total"],
  data() {
    return {
      banks: [
        {
          src:
            "assets/img/img-new-bonus-logo.png assets/img/img-new-world-logo.png"
        },
        {
          src:
            "assets/img/img-new-maksimum-logo.png assets/img/cardfinans-logo.png"
        },
        {
          src:
            "assets/img/img-new-acess-logo.png assets/img/img-new-advance-logo.png"
        },
        { src: "assets/img/paraflogo.png" }
      ]
    };
  }
};
</script>

<style></style>

assets/img/img-new-bonus-logo.png assets/img/img-new-world-logo.png
assets/img/img-new-maksimum-logo.png assets/img/cardfinans-logo.png
assets/img/img-new-acess-logo.png assets/img/img-new-advance-logo.png
assets/img/paraflogo.png

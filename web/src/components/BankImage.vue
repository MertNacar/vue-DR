<template>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <div class="topic-html-content">
      <div class="topic-html-content-body">
        <div class="container">
          <div class="row" style="clear: both;">
            <div v-for="bank in banks" :key="bank.id" class="bankRow col-xs-12">
              <div class="col-xs-12 col-sm-3 col-lg-2" style="padding: 0;">
                <div class="bankLogoImg">
                  <img :title="bank.title" :src="bank.src" :alt="bank.title" />
                </div>
              </div>
              <div class="col-xs-12 col-sm-9 col-lg-10 txt" style="padding: 0;">
                <p>
                  {{ bank.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BankImage",
  data() {
    return {
      banks: [
        {
          title: "halk bankası",
          src: "assets/img/hblogo.jpg",
          desc:
            "20 TL üzeri işlemlerde 2 ve 4 taksitli işlemlerde ilave +3 taksit eklenecektir.",
        },
        {
          title: "akbank",
          src: "assets/img/akbank-logo.jpg",
          desc:
            "20 TL üzeri işlemlerde 2 ve 4 taksitli işlemlerde ilave +2 taksit eklenecektir.",
        },
        {
          title: "iş bankası",
          src: "assets/img/isbankasi-logo.jpg",
          desc:
            "100 TL üzeri işlemlerde 2 ve 3 taksitli işlemlerde ilave +2 taksit eklenecektir.",
        },
      ],
    };
  },
};
</script>

<style></style>

<template>
  <section class="checkout tabbedSection">
    <div class="container">
      <header>
        <h2 class="titleCheckout">Ödeme ve Teslimat</h2>
      </header>

      <div class="checkout-details">
        <div class="row">
          <form
            method="post"
            id="billingAddressForm"
            name="billingAddressForm"
            autocomplete="off"
          >
            <div id="billingAddressList">
              <div id="billingList">
                <header>
                  <h2 style="font-weight: bold;">1- Fatura Adresi</h2>
                </header>
                <div id="billingAddress">
                  <div
                    class="address-cell bill-address-cell"
                    id="billing-address-cell"
                  >
                    <div class="check" style="text-align:left">
                      <input
                        type="radio"
                        name="billing_address_id"
                        value="28568847"
                        id="item_28568847"
                        class="input-radio-box-bill"
                      />
                      <label for="item_28568847" style="margin-left:5px"
                        >Ev</label
                      >
                    </div>
                    <div class="address-detail">
                      <div class="delete-panel deleteAdresDiv">
                        <p>Adres silinecek Onaylıyor musunuz?</p>
                        <br />
                        <input
                          class="btn blue"
                          onclick="core.widgets.DeleteAddress('/Customer/DeleteCustomerAddress?addressId=28568847    ', this, { prop: '' })"
                          type="button"
                          value="Onayla"
                        />
                        <input
                          class="btn white-border"
                          onclick="VazgecBillBtn(this)"
                          type="button"
                          value="Vazgeç"
                        />
                      </div>
                      <div class="text">
                        <p style="text-align:left">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc vel aliquam risus.
                        </p>
                        <hr />
                        <p style="text-align:left">G. 5376062342</p>
                      </div>
                      <div class="cta">
                        <input
                          type="button"
                          class="btn grey mb10"
                          value="GÜNCELLE"
                          onclick="#"
                        />
                        <input
                          type="button"
                          class="btn grey"
                          value="SİL"
                          onclick="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="show-more">
                  <input
                    type="button"
                    value="+ Yeni Adres Ekle"
                    onclick="core.widgets.newAddress('/Customer/ProcessAddress?id=0_2', this, { prop: 'deneme data' });"
                  />
                </div>
                <div class="shipListBox">
                  <header>
                    <h2 style="font-weight: bold;">2- Teslimat ve Kargo</h2>
                  </header>
                  <ul class="shipListli" style="padding-left:0px">
                    <li class="navShippingAddress active">Teslimat Adresi</li>
                  </ul>

                  <div class="billing-address-cell" id="billCheckBox-cell">
                    <div class="check" style="text-align:left">
                      <input type="checkbox" id="billCheckBox" />
                      <label for="billCheckBox" style="margin-left:5px"
                        >Kargo teslim adresi, fatura adresi ile aynı.</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <header>
              <h2 style="font-weight: bold;">3- Ödeme Seçenekleri</h2>
            </header>

            <div class="payment-box">
              <ul class="tab-style tabs">
                <li>
                  <a class="active">Kredi-Banka Kartı</a>
                </li>
                <li>
                  <a>BKM Express</a>
                </li>
                <li>
                  <a>GarantiPay</a>
                </li>
                <li>
                  <a>Havale-EFT</a>
                </li>
              </ul>

              <div class="tab-content active">
                <div class="payment-card">
                  <div class="mp-payment" id="mpMasterPassTab"></div>
                  <form method="post" id="paymentFormCreditCard">
                    <div class=" shopping-payment">
                      <div class="payment-card">
                        <div
                          style="text-align:left"
                          id="divCreditCard"
                          class="row"
                        >
                          <div class="npt col-md-6">
                            <label>Kart Üzerindeki İsim</label>
                            <v-text-field
                              v-model="name"
                              type="text"
                              maxlength="40"
                              dense
                              solo
                            ></v-text-field>
                          </div>
                          <div class="npt col-md-6">
                            <label>Kart Numarası</label>
                            <v-text-field
                              v-model="number"
                              type="text"
                              maxlength="40"
                              dense
                              solo
                            ></v-text-field>
                          </div>
                          <div class="npt sktSelectbox col-md-6">
                            <label>Son Kullanma Tarihi</label>
                            <div
                              class="fa fa-exclamation-circle"
                              style="font-size:20px;margin-left:15px"
                            ></div>
                            <div class="row">
                              <div class="half margin-bottom20-mobile">
                                <v-select
                                  v-model="month"
                                  :items="months"
                                  return-object
                                  solo
                                  dense
                                ></v-select>
                              </div>
                              <div class="half">
                                <v-select
                                  v-model="year"
                                  :items="years"
                                  return-object
                                  solo
                                  dense
                                ></v-select>
                              </div>
                            </div>
                          </div>
                          <div style="text-align:left" class="npt col-md-6">
                            <label>CVV</label>
                            <div
                              class="fa fa-exclamation-circle"
                              style="font-size:20px;margin-left:15px"
                            ></div>
                            <v-text-field
                              v-model="cvv"
                              type="text"
                              maxlength="40"
                              dense
                              solo
                            ></v-text-field>
                          </div>
                        </div>
                        <div class="fixed-term">
                          <div id="instabl"></div>
                        </div>
                        <div class="instabl-err"></div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div style="text-align:left" class="last-check">
              <input type="checkbox" id="saleAgreement" />
              <label>
                Mesafeli Satış Sözleşmesini okudum ve kabul ediyorum!</label
              >
            </div>
            <div style="text-align:left" class="last-check mb16">
              <input style="margin-right:3px" type="checkbox" />
              <label
                >Ön Bilgilendirme Sözleşmesini okudum ve kabul ediyorum!</label
              >
            </div>
            <div class="complete">
              <input
                @click="completeOrder()"
                type="button"
                class="btn red"
                value="SİPARİŞİ TAMAMLA"
              />
            </div>
          </form>
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-actions>
                <v-btn text @click="dialog = false"
                  ><p style="color:gray">X</p></v-btn
                >
              </v-card-actions>
              <div v-if="!showIcon" style="font-size:150px">
                <i
                  id="dialog-icon"
                  class="fa fa-times-circle"
                  style="color:red"
                ></i>
              </div>
              <div v-if="showIcon" style="font-size:150px">
                <i
                  id="dialog-icon"
                  class="fa fa-check-circle"
                  style="color:green"
                ></i>
              </div>
              <v-card-text>
                <h2>
                  <b style="color:#000">{{ dialogText }}</b>
                </h2>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <PaymentList />
    </div>
  </section>
</template>

<script>
/* eslint-disable */

import PaymentList from "@/components/PaymentList";
import axios from "axios";
export default {
  name: "Payment",
  components: { PaymentList },
  data() {
    return {
      name: "",
      number: "",
      cvv: "",
      showIcon: false,
      dialog: false,
      dialogText: "",
      month: { text: "AY", value: "" },
      months: [
        { text: "AY", value: "" },
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
        { text: "6", value: 6 },
        { text: "7", value: 7 },
        { text: "8", value: 8 },
        { text: "9", value: 9 },
        { text: "10", value: 10 },
        { text: "11", value: 11 },
        { text: "12", value: 12 },
      ],
      year: { text: "YIL", value: "" },
      years: [
        { text: "YIL", value: "" },
        { text: "2020", value: 2020 },
        { text: "2021", value: 2021 },
        { text: "2022", value: 2022 },
        { text: "2023", value: 2023 },
        { text: "2024", value: 2024 },
        { text: "2025", value: 2025 },
        { text: "2026", value: 2026 },
        { text: "2027", value: 2027 },
        { text: "2028", value: 2028 },
        { text: "2029", value: 2029 },
        { text: "2030", value: 2030 },
        { text: "2031", value: 2031 },
        { text: "2032", value: 2032 },
      ],
    };
  },
  methods: {
    async completeOrder() {
      try {
        let validate =
          this.year.value != "" &&
          this.month.value != "" &&
          this.name != "" &&
          this.number.length === 16 &&
          this.cvv.length === 3;
        if (validate) {
          let data = {
            user: this.$store.getters.user,
            card: { name: this.name, number: this.number, cvv: this.cvv },
            boughts: this.$store.getters.cart,
          };
          let res = await axios.post(`http://localhost:7700/payment`, data);
          if (!res.data.err) {
            this.dialogText = "Ürünler başarıyla satın alındı.";
            this.showIcon = true;
            this.dialog = true;
            setTimeout(() => {
              this.$store.dispatch("deleteAllCart");
              this.$router.push({ name: "Home" });
            }, 7000);
          } else throw new Error();
        } else throw new Error();
      } catch (err) {
        console.log("err", err);
        this.dialogText =
          "Bir hatayla karşılaştık. Bilgilerinizi kontrol ediniz.";
        this.showIcon = false;
        this.dialog = true;
      }
    },
  },
};
</script>

<style>
.testBg {
  background: #f00;
}
.sktSelectbox select {
  position: relative;
  padding-left: 5px;
  text-decoration: none;
  text-align: left !important;
  color: #474747;
  font-size: 13px;
  font-family: "Open Sans", sans-serif;
  outline: 0;
  vertical-align: middle;
  background: #fff;
  display: inline-block;
  cursor: pointer;
  border: solid 1px #ebebeb;
  text-transform: uppercase;
  width: 100% !important;
  box-shadow: 0 1px 1px rgba(80, 80, 80, 0.1);
  border-radius: 2px;
  height: 47px;
}
.sktSelectbox select option {
  font-size: 15px;
  color: #9f9f9f;
}
</style>

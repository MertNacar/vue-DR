<template>
  <div class="login">
    <link
      rel="stylesheet"
      type="text/css"
      href="assets/css/customerPages.css"
    />
    <Header />
    <div id="fb-root"></div>

    <section class="user-landing">
      <div class="container">
        <div class="half">
          <div class="content">
            <h3>Üye Girişi</h3>
            <hr />
            <p>D&R Eğlence dünyasına hoşgeldiniz!</p>

            <div class="form-row">
              <label for="e-mail"
                ><label for="Email">E-Posta Adresi</label></label
              >

              <input
                v-model="email"
                autofocus="autofocus"
                data-val="true"
                data-val-email="Hatalı E-posta"
                data-val-required="E-Posta adresi zorunlu"
                id="EmailField"
                maxlength="500"
                name="Email"
                title="Sisteme kayıtlı olan mail adresinizi yazınız!"
                type="text"
                value=""
              />
            </div>

            <div class="form-row">
              <label for="Password">Şifre</label>

              <input
                v-model="password"
                id="PasswordField"
                maxlength="40"
                name="Password"
                title="Lütfen şifrenizi giriniz!"
                type="password"
              />
            </div>

            <div class="form-row">
              <input type="checkbox" id="remember_me" v-model="checked" />
              <label for="remember">Beni Hatırla</label> |
              <a href="#" class="fancybox" data-fancybox-type="ajax"
                >Şifremi Unuttum</a
              >
            </div>
            <div class="form-row">
              <a href="#" class="fancybox" data-fancybox-type="ajax"
                >Gizlilik İlkesi</a
              >
            </div>
            <div class="form-row">
              <input
                @click="goLogin"
                class="btn grey"
                type="button"
                name="login_btn"
                id="login_btn"
                value="GİRİŞ YAP"
              />
            </div>
          </div>
        </div>
        <div class="half">
          <div class="content">
            <h3>Üye Ol</h3>
            <hr />
            <p class="login-bottom-head">Üye değil misiniz?</p>
            <p class="login-bottom-head">
              Hemen üye olun, D&R Kültür, sanat ve eğlence dünyası
              avantajlarından faydalanın!
            </p>
            <div class="form-row">
              <img src="assets/img/uye-ol-bg.jpg" alt="Üye Ol" />
            </div>
            <div class="form-row">
              <router-link :to="{ name: 'Register' }">
                <input
                  class="btn grey"
                  type="button"
                  value="ÜYE OLMAK İSTİYORUM"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-actions>
          <v-btn text @click="dialog = false"
            ><p style="color:gray">X</p></v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-text>
          {{ dialogText }}
        </v-card-text>
      </v-card>
    </v-dialog>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      checked: false,
      dialog: false,
      dialogText: "",
    };
  },
  methods: {
    async goLogin() {
      try {
        let res = await axios.get(
          `http://localhost:7700/auth/login?email=${this.email}&password=${this.password}`
        );
        if (!res.data.err) {
          this.dialogText = "Bekleyiniz...";
          this.dialog = true;
          setTimeout(() => {
            this.$store.dispatch("addUser", {
              email: this.email,
              password: this.password,
            });
            this.$router.push({ name: "Home" });
          }, 2000);
        } else throw new Error();
      } catch {
        this.dialogText = "Email veya şifrenizi hatalı girdiniz.";
        this.dialog = true;
      }
    },
  },
};
</script>

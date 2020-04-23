<template>
  <div class="register">
    <link
      rel="stylesheet"
      type="text/css"
      href="assets/css/customerPages.css"
    />

    <div id="fb-root"></div>
    <div id="register-page">
      <div class="container">
        <div class="register-form">
          <div class="full buttons">
            <div class="login-btn">
              Zaten Üyeyim!
              <router-link :to="{ name: 'Login' }">Giriş Yap</router-link>
            </div>

            <span class="line"><span>veya</span></span>
          </div>
          <div class="full">
            <div class="form-row left-halft">
              <label style="text-align:left">Ad *</label>
              <v-text-field
                v-model="name"
                type="text"
                maxlength="20"
                dense
                outlined
              ></v-text-field>
            </div>
            <div class="form-row right-halft">
              <label style="text-align:left">Soyad *</label>
              <v-text-field
                v-model="surname"
                type="text"
                maxlength="20"
                dense
                outlined
              ></v-text-field>
            </div>
          </div>
          <div class="full">
            <div class="form-row">
              <label style="text-align:left">E-posta *</label>
              <v-text-field
                v-model="email"
                type="text"
                id="e-mail"
                maxlength="500"
                dense
                outlined
              ></v-text-field>
            </div>
            <div class="form-row">
              <label style="text-align:left">E-posta (Tekrar)*</label>
              <v-text-field
                v-model="reEmail"
                type="text"
                maxlength="500"
                dense
                outlined
              ></v-text-field>
            </div>
          </div>

          <div class="full">
            <div class="form-row left-halft">
              <label style="text-align:left">Parola *</label>
              <v-text-field
                v-model="password"
                type="password"
                maxlength="40"
                dense
                outlined
              ></v-text-field>
            </div>
            <div class="form-row right-halft">
              <label style="text-align:left">Parola Tekrar *</label>
              <v-text-field
                v-model="rePassword"
                type="password"
                maxlength="40"
                dense
                outlined
              ></v-text-field>
            </div>
          </div>
          <div class="full contract">
            <div class="form-row">
              <input
                v-model="checkMail"
                type="checkbox"
                class="ncFormCheckboxDiv"
              />
              <p style="margin-left:5px">
                Turkuvaz Müzik Kitap Mağazacılık Pazarlama A.Ş tarafıma ticari
                elektronik ileti göndermesi için burada da belirtilenlere iznim
                vardır.
              </p>
              <p>
                <input
                  v-model="checkContract"
                  type="checkbox"
                  class="ncFormCheckboxDiv"
                  style="margin: 70px 0px 0px 15px"
                />
                <label
                  ><a href="#" class="contractLink fancybox"
                    ><strong>Üyelik Sözleşmesi</strong></a
                  >'ni okudum, onaylıyorum.</label
                >
              </p>
            </div>
          </div>
          <div class="full buttons">
            <a class="btn red" @click="signUp()">ÜYELİĞİ TAMAMLA</a>
          </div>
        </div>
        <div class="register-info">
          <img
            src="assets/img/dr-logo-large.png"
            alt="D&R Kültür, Sanat ve Eğlence Dünyası"
          />
          <h1>
            D&R Kültür, Sanat ve Eğlence Dünyası
            <strong>sizleri bekliyor!</strong>
          </h1>
          <p>
            <strong>Üyelik formu</strong>ndaki boş alanları doldurarak hemen üye
            olabilirsiniz. Bu sayfadan oluşturacağınız üyelik kaydı ile tüm
            <strong>D&R uygulamalarına</strong> da giriş yapabilirsiniz.
          </p>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-actions>
          <v-btn text @click="dialog = false"
            ><p style="color:gray">X</p></v-btn
          >
        </v-card-actions>
        <div v-if="!showIcon" style="font-size:150px">
          <i id="dialog-icon" class="fa fa-times-circle" style="color:red"></i>
        </div>
        <div v-if="showIcon" style="font-size:150px">
          <i id="dialog-icon" class="fa fa-check-circle" style="color:green"></i>
        </div>
        <v-card-text>
          <h2>
            <b style="color:#000">{{ dialogText }}</b>
          </h2>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      reEmail: "",
      password: "",
      rePassword: "",
      checkMail: false,
      checkContract: false,
      dialog: false,
      showIcon: false,
      dialogText: "",
    };
  },
  methods: {
    async signUp() {
      try {
        let validate =
          this.name.length >= 3 &&
          this.surname.length >= 3 &&
          this.email.length > 10 &&
          this.password.length >= 8 &&
          this.email === this.reEmail &&
          this.password === this.rePassword &&
          this.checkMail &&
          this.checkContract;

        if (validate) {
          let data = {
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
          };
          let res = await axios.post("http://localhost:7700/auth/signup", data);
          if (!res.data.err) {
            this.showIcon = true;
            this.dialogText = res.message;
            this.dialog = true;
            setTimeout(() => {
              this.$store.dispatch("addUser", {
                email: this.email,
                password: this.password,
              });
              this.$router.push({ name: "Home" });
            }, 2000);
          } else throw new Error(res.data.message);
        } else throw new Error("Bilgilerinizi kontrol ediniz.");
      } catch (err) {
        this.dialogText = err.message;
        this.showIcon = false;
        this.dialog = true;
      }
    },
  },
};
</script>

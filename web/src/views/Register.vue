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
              Zaten Üyeyim! <a href="/login">Giriş Yap</a>
            </div>

            <span class="line"><span>veya</span></span>
          </div>
          <div class="full">
            <div class="form-row left-halft">
              <label for="name">Ad *</label>
              <input
                type="text"
                id="name"
                maxlength="20"
                name="name"
                title="Lütfen Adınızı Giriniz"
                class="form-control"
              />
            </div>
            <div class="form-row right-halft">
              <label for="surNameField">Soyad *</label>
              <input
                type="text"
                id="surNameField"
                maxlength="20"
                name="surNameField"
                title="Lütfen Soyadnızı Giriniz."
                class="form-control"
              />
            </div>
          </div>
          <div class="full">
            <div class="form-row">
              <label for="e-mail">E-posta *</label>
              <input
                type="text"
                id="e-mail"
                title="Lütfen e-posta adresinizi giriniz"
                maxlength="500"
                name="e-mail"
                class="form-control"
              />
            </div>
            <div class="form-row">
              <label for="e-mailcheck">E-posta (Tekrar)*</label>
              <input
                type="text"
                id="e-mailcheck"
                title="Lütfen tekrardan e-posta adresinizi giriniz"
                maxlength="500"
                name="e-mailcheck"
                class="form-control"
              />
            </div>
          </div>

          <div class="full">
            <div class="form-row left-halft">
              <label for="password">Parola *</label>
              <input
                type="password"
                id="password"
                name="password"
                maxlength="40"
                title="En Az 8 karakter olmalıdır"
                class="form-control"
              />
            </div>
            <div class="form-row right-halft">
              <label for="password-repeat">Parola Tekrar *</label>
              <input
                type="password"
                id="password-repeat"
                name="password-repeat"
                maxlength="40"
                title="En Az 8 karakter olmalıdır"
                class="form-control"
              />
            </div>
          </div>
          <div class="full contract">
            <div class="form-row">
              <p>
                <input
                  type="checkbox"
                  id="eBultenCheck"
                  name="eBultenCheck"
                  class="ncFormCheckboxDiv"
                  title="Güncel gelişmelerden kolayca haberdar olmak için e-bültenimize üye olun."
                />
                Turkuvaz Müzik Kitap Mağazacılık Pazarlama A.Ş tarafıma ticari
                elektronik ileti göndermesi için
                <a
                  href="/hesapsozlemesi"
                  class="fancybox"
                  data-fancybox-type="ajax"
                  >burada</a
                >
                da belirtilenlere iznim vardır.
              </p>
              <p>
                <input
                  type="checkbox"
                  id="contractCheck"
                  name="contractCheck"
                  class="ncFormCheckboxDiv"
                  title="Üyelik Sözleşmesi'ni okudum, onaylıyorum."
                />
                <label
                  ><a
                    href="/Customer/MembershipAgreement"
                    data-fancybox-type="ajax"
                    class="contractLink fancybox"
                    id="contractLink1"
                    title="Üyelik Sözleşmesi"
                    ><strong>Üyelik Sözleşmesi</strong></a
                  >'ni okudum, onaylıyorum.</label
                >
              </p>
            </div>
          </div>
          <div class="full buttons">
            <a
              href="javascript:;"
              class="btn red"
              id="btnAddNewCustomer"
              title="Üyeliği Tamamla"
              >ÜYELİĞİ TAMAMLA</a
            >
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
  </div>
</template>

<script>
export default {
  name: "Register",
};
</script>

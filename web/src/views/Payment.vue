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
                    <div class="check">
                      <input
                        type="radio"
                        name="billing_address_id"
                        value="27780771"
                        id="item_27780771"
                        class="input-radio-box-bill"
                      />
                      <label for="item_27780771">Ev</label>
                    </div>
                    <div class="address-detail">
                      <div class="delete-panel deleteAdresDiv">
                        <p>Adres silinecek Onaylıyor musunuz?</p>
                        <br />
                        <input
                          class="btn blue"
                          onclick="core.widgets.DeleteAddress('/Customer/DeleteCustomerAddress?addressId=27780771    ', this, { prop: '' })"
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
                        <p>
                          R&#252;stempaşa mahallesi Cumhuriyet caddesi no:24
                          daire:4
                        </p>
                        <hr />
                        <p>
                          <span>T.</span> 5551769026 <span> - </span> G.
                          5551769026
                        </p>
                      </div>
                      <div class="cta">
                        <input
                          type="button"
                          class="btn white mb10"
                          value="GÜNCELLE"
                          onclick="core.widgets.updateAddress('/Customer/ProcessAddress?id=27780771    ', this, { prop: '' })"
                        />
                        <input
                          type="button"
                          class="btn white"
                          value="SİL"
                          onclick="deleteBillAddress(this)"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="address-cell bill-address-cell"
                    id="billing-address-cell"
                  >
                    <div class="check">
                      <input
                        type="radio"
                        name="billing_address_id"
                        value="20374911"
                        id="item_20374911"
                        class="input-radio-box-bill"
                      />
                      <label for="item_20374911">İşyeri</label>
                    </div>
                    <div class="address-detail">
                      <div class="delete-panel deleteAdresDiv">
                        <p>Adres silinecek Onaylıyor musunuz?</p>
                        <br />
                        <input
                          class="btn blue"
                          onclick="core.widgets.DeleteAddress('/Customer/DeleteCustomerAddress?addressId=20374911    ', this, { prop: '' })"
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
                        <p>
                          Kocasinan mahallesi 44. sokak Naz apartmanı no: A10 A9
                          DEVA MEDİKAL EDİRNE
                        </p>
                        <hr />
                        <p>G. 5435766410</p>
                      </div>
                      <div class="cta">
                        <input
                          type="button"
                          class="btn white mb10"
                          value="GÜNCELLE"
                          onclick="core.widgets.updateAddress('/Customer/ProcessAddress?id=20374911    ', this, { prop: '' })"
                        />
                        <input
                          type="button"
                          class="btn white"
                          value="SİL"
                          onclick="deleteBillAddress(this)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div id="addListBtns" class="complete">
                  <input
                    type="button"
                    id="addListMin"
                    class="btn lightgrey"
                    value="Fatura Adreslerimi Daralt"
                    onclick="addressListMin()"
                  />
                  <input
                    type="button"
                    id="addListMax"
                    class="btn lightgrey"
                    value="Tüm Fatura Adreslerimi Görüntüle"
                    onclick="addressListMax()"
                  />
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
                  <ul class="shipListli">
                    <li class="navShippingAddress active">Teslimat Adresi</li>
                  </ul>

                  <div class="billing-address-cell" id="billCheckBox-cell">
                    <div class="check">
                      <input type="checkbox" id="billCheckBox" />
                      <label for="billCheckBox"
                        >Kargo teslim adresi, fatura adresi ile aynı.</label
                      >
                    </div>
                  </div>
                  <form
                    method="post"
                    id="shippingAddressForm"
                    name="shippingAddressForm"
                    autocomplete="off"
                  >
                    <div id="shippingAddressList">
                      <div id="shipList">
                        <div id="shippingAddress">
                          <header>
                            <h2>Kargo Teslim Adresi</h2>
                          </header>
                          <div
                            class="address-cell shipping-address-cell"
                            id="shipping-address-cell"
                          >
                            <div class="check">
                              <input
                                type="radio"
                                name="shipping_address_id"
                                value="20374901"
                                id="shipping_address_id_20374901"
                                class="input-radio-box"
                              />
                              <label for="shipping_address_id_20374901"
                                >Ev</label
                              >
                            </div>
                            <div class="address-detail">
                              <div class="delete-panel deleteAdresDiv">
                                <p>Adres silinecek Onaylıyor musunuz?</p>
                                <br />
                                <input
                                  class="btn blue"
                                  onclick="core.widgets.DeleteAddress('/Customer/DeleteCustomerAddress?addressId=20374901    ', this, { prop: '' })"
                                  type="button"
                                  value="Onayla"
                                />
                                <input
                                  class="btn white-border"
                                  onclick="VazgecBtn(this)"
                                  type="button"
                                  value="Vazgeç"
                                />
                              </div>
                              <div class="text">
                                <p>
                                  Kocasinan mahallesi 44. sokak naz apartmanı no
                                  A10 A9 DEVA MEDİKAL EDİRNE
                                </p>
                                <hr />
                                <p>G. 5435766410</p>
                              </div>
                              <div class="cta">
                                <input
                                  type="button"
                                  class="btn white mb10"
                                  value="GÜNCELLE"
                                  onclick="core.widgets.updateAddress('/Customer/ProcessAddress?id=20374901', this, { prop: '' })"
                                />
                                <input
                                  type="button"
                                  class="btn white"
                                  value="SİL"
                                  onclick="deleteAddress(this)"
                                />
                              </div>
                            </div>
                          </div>

                          <div id="shippingAddListBtns" class="complete">
                            <input
                              type="button"
                              id="shippingAddListMin"
                              class="btn lightgrey"
                              value="Kargo Adreslerimi Daralt"
                              onclick="shippingAddressListMin()"
                            />
                            <input
                              type="button"
                              id="shippingAddListMax"
                              class="btn lightgrey"
                              value="Tüm Kargo Adreslerimi Görüntüle"
                              onclick="shippingAddressListMax()"
                            />
                          </div>
                          <div class="show-more">
                            <input
                              type="button"
                              value="+ Yeni Adres Ekle"
                              onclick="core.widgets.newAddress('/Customer/ProcessAddress?id=0_1', this, { prop: '' });"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </form>
          <div class="shipListContainer">
            <form
              method="post"
              id="shippingMethodForm"
              name="shippingMethodForm"
            >
              <ul class="cargoTabs">
                <li>Kargo ve Ücretler</li>
              </ul>

              <div id="shipmentMethods">
                <div class="cargoEstimationDate">
                  <div class="firstEstimatedCargoBox">
                    <div
                      style="float:left;margin-left: 5px;"
                      class="info firstEstimatedCargoInfo"
                      title="Siparişinizle ilgili bir gecikme olması durumunda, sizi daha fazla bekletmemek adına hazır olan ürüleriniz parçalı sevkiyat kapsamında gönderilecektir."
                    >
                      !
                    </div>
                  </div>

                  <div class="secondEstimatedCargoBox">
                    <div
                      style="float:left;margin-left: 5px;"
                      class="info secondEstimatedCargoInfo"
                      title="Ön siparişli ürününüz belirtilen tarihte stoğa girecek, sonrasında tarafınıza gönderilecektir."
                    >
                      !
                    </div>
                  </div>
                </div>

                <div id="shippingList">
                  <div class="cargo-select">
                    <div class="row">
                      <div class="col-md-4">
                        <div
                          class="cargo-cell shippingoption_0"
                          id="DivYurticiKargo"
                        >
                          <input
                            type="radio"
                            id="shippingoption_0"
                            data-id="1"
                            name="shippingoption"
                            rel="chkYurticiKargo"
                            value="Yurti&#231;i Kargo___Shipping.ByTotal"
                            checked="checked"
                            class="input-radio-box-ship"
                          />
                          <label for="kargo1" class="leadTimeInfo">
                            Standart Teslimat
                            <span id="kargo_Yurti&#231;iKargo"
                              >(&#220;cretsiz)</span
                            >
                          </label>
                          <label for="kargo1"
                            ><span class="leadTimeView">Tahmini Teslim: </span
                            ><span class="cargoEstColor">24 Mart 2020</span> -
                            <span class="cargoEstColor"
                              >26 Mart 2020</span
                            ></label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <header>
            <h2 style="font-weight: bold;">3- Ödeme Seçenekleri</h2>
          </header>
          <div class="payment-box">
            <ul class="tab-style tabs">
              <li>
                <a
                  href="javascript:;"
                  class="active"
                  id="paymentTypeCreditCart"
                  title="Kredi-Banka Kartı"
                  >Kredi-Banka Kartı</a
                >
              </li>
              <li>
                <a href="javascript:;" id="paymentTypeBkm" title="BKM Express"
                  >BKM Express</a
                >
              </li>
              <li>
                <a
                  href="javascript:;"
                  id="paymentTypeGarantiPay"
                  title="Garanti Pay"
                  >GarantiPay</a
                >
              </li>
              <li>
                <a
                  href="javascript:;"
                  id="paymentTypeMoneyOrder"
                  title="Havale-EFT"
                  >Havale-EFT</a
                >
              </li>
            </ul>

            <div class="tab-content">
              <div class="payment-card">
                <form method="post" id="paymentFormCreditCard">
                  <div style="display:none">
                    <input
                      id="paymentmethod_0"
                      type="radio"
                      name="paymentmethod"
                      value="Payments.POSNET"
                      checked="checked"
                      style="display:none"
                      data=""
                    />
                  </div>

                  <link
                    type="text/css"
                    rel="stylesheet"
                    href="assets/css/table.css"
                  />

                  <input type="hidden" value="value" id="bank-11" />
                  <input type="hidden" value="value" id="bank-10" />
                  <input type="hidden" value="value" id="bank-13" />
                  <input type="hidden" value="value" id="bank-12" />
                  <input type="hidden" value="value" id="bank-2" />
                  <input type="hidden" value="value" id="bank-6" />
                  <input type="hidden" value="value" id="bank-4" />

                  <div class=" shopping-payment">
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      class="pay-tbl"
                      style="display:none"
                    >
                      <tr style="display:none">
                        <th><label for="Banks" title="">Banka</label>:</th>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row"><label></label></th>
                        <td style="display:none">
                          <ul class="cards">
                            <li id="Visa" class="visa cardimg">
                              <a href="#"></a>
                            </li>
                            <li
                              id="Visa-electron"
                              class="visa_electron cardimg"
                            >
                              <a href="#"></a>
                            </li>
                            <li id="Master-card" class="mastercard cardimg">
                              <a href="#"></a>
                            </li>
                            <li id="Maestro" class="maestro cardimg">
                              <a href="#"></a>
                            </li>
                            <li id="Amex" class="amex cardimg">
                              <a href="#"></a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr style="display:none">
                        <th>
                          <label for="CreditCardTypes" title=""
                            >Kredei KArtı Se&#231;iniz</label
                          >:
                        </th>
                        <td>
                          <input
                            style="display:none"
                            type="text"
                            name="CreditCardType"
                            id="CreditCardType"
                            value="None"
                          />
                          <span id="CreditCardTypeSpan">None</span>

                          <span
                            class="field-validation-valid"
                            data-valmsg-for="CreditCardType"
                            data-valmsg-replace="true"
                          ></span>
                        </td>
                      </tr>
                      <tr style="display:none">
                        <th>
                          <label for="Instalments" title="">Taksit</label>:
                        </th>
                        <td>
                          <span
                            class="field-validation-valid"
                            data-valmsg-for="InstalmentId"
                            data-valmsg-replace="true"
                          ></span>
                        </td>
                      </tr>
                    </table>

                    <div class="payment-card">
                      <div id="divCreditCard" class="row">
                        <div class="npt col-md-6">
                          <label for="name">Kart Üzerindeki İsim</label>
                          <input
                            autocomplete="off"
                            data-val="true"
                            data-val-required="Kart sahibinin adı giriniz"
                            id="CardholderName"
                            name="CardholderName"
                            type="text"
                            value=""
                          />
                          <span
                            class="field-validation-valid"
                            data-valmsg-for="CardholderName"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div class="npt col-md-6">
                          <label for="card-number">Kart Numarası</label>
                          <input
                            autocomplete="off"
                            class="onlyNumber"
                            data-val="true"
                            data-val-regex="Yanlış Kart Numarası"
                            data-val-regex-pattern="^[0-9]{15,16}$"
                            data-val-required="&#39;Card Number&#39; değeri boş olmamalı."
                            id="CardNumber"
                            maxlength="16"
                            name="CardNumber"
                            onkeypress="return DefaultScript.IsDecimal(event)"
                            type="tel"
                            value=""
                          />
                          <span
                            class="field-validation-valid"
                            data-valmsg-for="CardNumber"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div class="npt sktSelectbox col-md-6">
                          <label>Son Kullanma Tarihi</label>
                          <div class="info" title="Son Kullanma Tarihi">!</div>
                          <div class="row">
                            <div class="half margin-bottom20-mobile">
                              <div class="selectHolder">
                                <select
                                  class="ExpireMonth"
                                  data-val="true"
                                  data-val-number="The field Son Kullanma Tarihi must be a number."
                                  data-val-required="&#39;Expire Month&#39; değeri boş olamaz."
                                  id="ExpireMonth"
                                  name="ExpireMonth"
                                  ><option value="">AY</option>
                                  <option value="1">01</option>
                                  <option value="2">02</option>
                                  <option value="3">03</option>
                                  <option value="4">04</option>
                                  <option value="5">05</option>
                                  <option value="6">06</option>
                                  <option value="7">07</option>
                                  <option value="8">08</option>
                                  <option value="9">09</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                </select>
                              </div>
                            </div>
                            <div class="half">
                              <div class="selectHolder">
                                <select
                                  class="ExpireYear"
                                  data-val="true"
                                  data-val-number="The field Son Kullanma Tarihi must be a number."
                                  data-val-required="&#39;Expire Year&#39; değeri boş olamaz."
                                  id="ExpireYear"
                                  name="ExpireYear"
                                  ><option value="">YIL</option>
                                  <option value="2020">2020</option>
                                  <option value="2021">2021</option>
                                  <option value="2022">2022</option>
                                  <option value="2023">2023</option>
                                  <option value="2024">2024</option>
                                  <option value="2025">2025</option>
                                  <option value="2026">2026</option>
                                  <option value="2027">2027</option>
                                  <option value="2028">2028</option>
                                  <option value="2029">2029</option>
                                  <option value="2030">2030</option>
                                  <option value="2031">2031</option>
                                  <option value="2032">2032</option>
                                  <option value="2033">2033</option>
                                  <option value="2034">2034</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="npt col-md-6">
                          <label for="ccv">CVV</label>
                          <div
                            class="info"
                            title="Kartınızın arka yüzünde bulunan 3 haneli numara."
                          >
                            !
                          </div>
                          <input
                            autocomplete="off"
                            data-val="true"
                            data-val-regex="Hatalı CVC2"
                            data-val-regex-pattern="^[0-9]{3,4}$"
                            data-val-required="&#39;Card Code&#39; değeri boş olmamalı."
                            id="CardCode"
                            maxlength="4"
                            name="CardCode"
                            type="tel"
                            value=""
                          />
                        </div>
                      </div>
                      <div class="fixed-term">
                        <div id="instabl"></div>
                      </div>
                      <div class="instabl-err"></div>
                      <div class="last-check 3dactive tdactive">
                        <input
                          id="Is3DPay2"
                          type="checkbox"
                          value="false"
                          name="Is3DPay2"
                        />
                        <input
                          style="display:none"
                          id="Is3DPay"
                          type="text"
                          value="false"
                          name="Is3DPay"
                        />
                        <label for="3dsecure"
                          >3D Secure ile ödeme yapmak istiyorum</label
                        >
                      </div>
                    </div>
                  </div>

                  <input type="hidden" id="ivalue" value="" />
                </form>
              </div>
            </div>

            <div class="tab-content">
              <form method="post" id="paymentFormBkm">
                <div style="display:none">
                  <input
                    id="paymentmethod_2"
                    type="radio"
                    name="paymentmethod"
                    value="Payments.BKMExpress"
                    checked="checked"
                    style="display:none"
                    data=""
                  />
                </div>

                <div class="text-center"><div class="bkm-express"></div></div>
                <p>
                  Ödemelerinizi BKM Express aracılığı ile de
                  gerçekleştirebilirsiniz... BKM Express, kart bilgilerinizi
                  paylaşmadan, güvenle alışveriş yapmanızı sağlayarak internet
                  alışverişlerinizi hızlı, kolay ve keyifli hale getiren
                  ücretsiz bir hizmettir. Kart sahibiyseniz BKM Express'e
                  kaydolabilir, bankanızın sağladığı taksit ve ödül/puan
                  kazanımı fırsatlarından yararlanmaya devam edebilirsiniz.Daha
                  detaylı bilgi için BKM Express Sıkça Sorulan Sorular sayfasını
                  ziyaret edebilirsiniz.
                </p>

                <p>
                  BKM Express ile ödeme yaparken www.bkmexpress.com.tr sayfasına
                  yönlendirileceksiniz. BKM Express sitesine üye olurken
                  kullandığınız kullanıcı adı ve şifreniz ile uygulamaya giriş
                  yapmanız gerekmektedir. Karşınıza gelen ödeme ekranından işlem
                  yapmak istediğiniz kartı ve ödeme şeklini seçerek kolayca
                  ödeme yapabilirsiniz. Alışverişinizi tamamladıktan sonra
                  otomatik olarak sipariş sonuç sayfasına yönlendirileceksiniz.
                </p>
              </form>
            </div>
            <div class="tab-content">
              <form method="post" id="paymentFormGarantiPay">
                <div style="display:none">
                  <input
                    id="paymentmethod_6"
                    type="radio"
                    name="paymentmethod"
                    value="Payments.GarantiPay"
                    checked="checked"
                    style="display:none"
                    data=""
                  />
                </div>

                <div class="text-center">
                  <div class="garanti-pay-logo"></div>
                  <h2 style="font-weight:bold;font-size:18px;">
                    GarantiPay ile Hızlı ve Güvenli Ödeme Yapın!
                  </h2>
                  <p>
                    Garantipay ile
                    <span>kart bilgilerinizi paylaşmadan</span> ödeme yapmak
                    isterseniz;
                  </p>
                  <p>• GarantiPay ödeme sayfasına yönlendirilirsiniz</p>
                  <ul>
                    <li>
                      • GarantiPay ödeme sayfasında ilgili
                      <strong>GSM</strong> veya <strong>TCKN</strong> numarınızı
                      giriniz.
                    </li>
                    <li>
                      • GarantiPay servisini destekleyen T.Garanti Bankası mobil
                      uygulamanıza<strong>*</strong> işlem bildirimi iletilir
                    </li>
                    <li>
                      • Uygulama üzerinden ödemenizi tamamlamak istediğiniz
                      kartı seçerek işlemi kolayca tamamlayabilirsiniz
                    </li>
                  </ul>
                  <p style="font-style:italic;">
                    * GarantiPay Ödeme Servisi şu an için sadece BonusFlaş
                    uygulaması ile kullanılabilmektedir. Uygulama ile ilgili
                    detaylara
                    <a href="http://www.bonusflas.com.tr" target="_blank"
                      >www.bonusflas.com.tr</a
                    >
                    üzerinden ulaşabilirsiniz
                  </p>
                  <br />
                  <p style="font-weight:bold;">
                    Alışverişinizi tamamladıktan sonra otomatik olarak sipariş
                    sonuç sayfasına yönlendirileceksiniz.
                  </p>
                </div>
              </form>
            </div>
            <div class="tab-content">
              <form method="post" id="paymentFormMoneyOrder">
                <div style="display:none">
                  <input
                    id="paymentmethod_3"
                    type="radio"
                    name="paymentmethod"
                    value="Payments.CheckMoneyOrder"
                    checked="checked"
                    data=""
                  />
                </div>

                <div class="havale">
                  <h3>
                    Havale ile sipariş verirken dikkat etmeniz gerekenler:
                  </h3>
                  <ol>
                    <li>
                      Havale/EFT ödemelerinizde Açıklama kısmına mutlaka
                      <b>"W ile başlayan ve 10 haneli sipariş numaranızı"</b>
                      eksiksiz ve tam yazmanızı rica ederiz
                      <b
                        >Havale/EFT açıklama kısmına sipariş numarası yazılmayan
                        ödemeler hesaplarımıza ulaşmış olsa da
                        onaylanamamakta/otomatik iade sağlanamamaktadır. Bu
                        durumda dekontunuz ve sipariş numaranız ile birlikte
                        bilgi@dr.com.tr adresinden bizimle iletişime geçmeniz
                        gerekmektedir.</b
                      >
                    </li>
                    <li>
                      EFT yaparken alıcı olarak
                      <b>"Turkuvaz Müzik Kitap Mağazacılık Pazarlama A.Ş."</b>
                      belirtilmelidir.
                    </li>
                    <li>
                      Siparişinizin onaylanması için en geç
                      <b>"2 iş günü"</b> içinde havalenin yapılmış olması
                      gerekir. Aksi halde siparişiniz otomatik olarak 2 iş günü
                      sonra iptal edilir.
                    </li>
                    <li>
                      Havale hesabımıza ulaştığında size siparişinizin
                      onaylandığını belirtilen bir e-posta gönderilir.
                    </li>
                    <li>
                      ATM'lerden yapılan ödemelerde sipariş numaranızı girme
                      imkanınız olmadığı için, hesaplarımıza gönderilen tutar
                      ile siparişinizi eşleştirmek zaman almakta ve elimizde
                      olmayan nedenler ile siparişinizin gönderimi
                      gecikmektedir. Bu nedenle zorunlu olmadığınız durumlarda
                      ATM'den para transferi yapmamanızı öneriyoruz.
                    </li>
                  </ol>
                  <div class="iban-info">
                    <h3>
                      <span class="info">!</span
                      ><span class="iban-text"
                        >Havale/EFT ile yapılan siparişlerinizin takip, iptal ve
                        iadelerinde kullanılmak üzere IBAN numaranızın aşağıdaki
                        alana girilmesi zorunludur.</span
                      >
                    </h3>
                    <div class="form-element">
                      <label for="nameSurname">Ad Soyad</label>
                      <input type="text" id="nameSurname" name="nameSurname" />
                    </div>
                    <label>IBAN Numaranız</label>
                    <p>
                      (Geri ödeme işlemlerinde doğru ücret iadesi için lütfen
                      “kendi” IBAN numaranızı giriniz)
                    </p>
                    <input
                      type="text"
                      id="ibanNumber"
                      name="ibanNumber"
                      placeholder="TRXX XXXX XXXX XXXX XXXX XXXX XX"
                    />
                  </div>
                  <div class="bank-info">
                    <h4>
                      <input
                        type="radio"
                        class="selectBankAccount"
                        id="BankAccount-24"
                        name="BankAccountId"
                        value="24"
                      />
                      <label for="isbank">İş Bankası</label>
                    </h4>
                    <div class="branch">
                      Turkuvaz M&#252;zik Kitap Mağazacılık Pazarlama.A.Ş
                    </div>
                    <div class="account-number">
                      Şube Kodu:1135 Hesap No:1090906
                    </div>
                    <div class="amount">
                      TR37 0006 4000 0011 1351 0909 06
                    </div>
                  </div>
                  <div class="bank-info">
                    <h4>
                      <input
                        type="radio"
                        class="selectBankAccount"
                        id="BankAccount-25"
                        name="BankAccountId"
                        value="25"
                      />
                      <label for="isbank">Garanti Bankası</label>
                    </h4>
                    <div class="branch">
                      Turkuvaz M&#252;zik Kitap Mağazacılık Pazarlama.A.Ş
                    </div>
                    <div class="account-number">
                      Şube Kodu:1666 Hesap No:6294610
                    </div>
                    <div class="amount">
                      TR09 0006 2001 6660 0006 2946 10
                    </div>
                  </div>
                  <div class="bank-info">
                    <h4>
                      <input
                        type="radio"
                        class="selectBankAccount"
                        id="BankAccount-27"
                        name="BankAccountId"
                        value="27"
                      />
                      <label for="isbank">Akbank</label>
                    </h4>
                    <div class="branch">
                      Turkuvaz M&#252;zik Kitap Mağazacılık Pazarlama.A.Ş
                    </div>
                    <div class="account-number">
                      Şube Kodu:1123 Hesap No:0147305
                    </div>
                    <div class="amount">
                      TR16 0004 6011 2388 8000 1473 05
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="last-check">
            <input type="checkbox" id="saleAgreement" />
            <label for="mesafeli-satis"
              ><a
                href="/SatisSozlesmesi"
                class="fancybox"
                data-fancybox-type="ajax"
                >Mesafeli Satış Sözleşmesini</a
              >
              okudum ve kabul ediyorum!</label
            >
          </div>
          <div class="last-check mb16">
            <input type="checkbox" id="orderNotification" />
            <label for="on-bilgilendirme"
              ><a
                href="/OnbilgilendirmeFormu"
                class="fancybox"
                data-fancybox-type="ajax"
                >Ön Bilgilendirme Sözleşmesini</a
              >
              okudum ve kabul ediyorum!</label
            >
          </div>

          <div class="last-check mb16" id="eArsivDiv" style="display:none;">
            <input type="checkbox" id="eArsivFatura" />
            <label for="eArsiv-istiyorum">E-arşiv fatura istiyorum!</label>
            <p>
              Bu seçenekle faturanız elektronik olarak düzenlenecek ve e-posta
              adresinize pdf olarak gönderilecektir. Çevrenin korunmasına
              sunduğunuz katkı için teşekkürler.
            </p>
          </div>
          <div class="complete">
            <input
              type="button"
              class="btn red"
              value="SİPARİŞİ TAMAMLA"
              id="order-complete"
            />
            <label
              id="loadingOperation"
              class="centered"
              style="color: #eeeeee; display: none"
              >Lütfen bekleyiniz...</label
            >
          </div>
        </div>
      </div>

      <div id="orderSummary">
        <div class="checkout-cart-details">
          <div class="inner">
            <h3>Toplam 1 ürün</h3>
            <ul>
              <li>
                <figure>
                  <a
                    href="/Oyun-Konsol/Sony-PS4-1TB-Death-Stranding/Oyun-Konsollari/Playstation-4/urunno=0001851540001"
                  >
                    <img
                      src="assets/img/0001851540001-1.jpg"
                      alt="Sony PS4 1TB/Death Stranding"
                    />
                  </a>
                </figure>
                <div class="detail">
                  <p class="product-name">
                    <a
                      href="/Oyun-Konsol/Sony-PS4-1TB-Death-Stranding/Oyun-Konsollari/Playstation-4/urunno=0001851540001"
                      title="Sony PS4 1TB/Death Stranding"
                      >Sony PS4 1TB/Death Stranding</a
                    >
                  </p>
                  <p class="product-type">
                    <a
                      href="/Oyun-Konsol/Sony-PS4-1TB-Death-Stranding/Oyun-Konsollari/Playstation-4/urunno=0001851540001"
                      >Renk: Siyah / 1 ADET</a
                    >
                  </p>
                  <p style="text-decoration: line-through">3199,00 TL</p>
                  <p class="product-price">
                    <a
                      href="/Oyun-Konsol/Sony-PS4-1TB-Death-Stranding/Oyun-Konsollari/Playstation-4/urunno=0001851540001"
                      >2999,00 TL</a
                    >
                  </p>
                </div>
              </li>
            </ul>
            <div class="price">
              <p class="new">2999,00 TL</p>
            </div>

            <div class="cta">
              <a
                class="btn white fancybox"
                href="/ShoppingCart/GiftCardBox"
                data-fancybox-type="ajax"
                >HEDİYE ÇEKİ/KARTI KULLAN</a
              >
              <a
                class="btn white fancybox"
                href="/ShoppingCart/DiscountCouponBox"
                data-fancybox-type="ajax"
                >İNDİRİM KUPONU KULLAN</a
              >
              <a
                class="btn white fancybox"
                href="/ShoppingCart/ZubizuCouponBox"
                data-fancybox-type="ajax"
                >ZUBİZU KAMPANYASI KULLAN</a
              >
              <a class="btn grey" href="/Sepetim">SEPETİ DÜZENLE</a>
              <a class="btn grey" href="/">ALIŞVERİŞE DEVAM ET</a>
            </div>
            <span data-cargodate="" class="firstEstimatedCargo"></span>
            <span data-cargodate="" class="secondEstimatedCargo"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Payment"
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

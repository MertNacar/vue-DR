<template>
  <div class="book-detail">
    <div id="selectedId">
      <section class="sub-categories">
        <div class="categories-path">
          <div class="container">
            <ul>
              <li><a href="#">ANASAYFA</a></li>
              <li><a href="#">Kitap</a></li>
              <li>
                <a href="#">Edebiyat</a>
              </li>
              <li>
                <a href="#">Roman</a>
              </li>
              <li class="lastElement">
                <a href="#">T&#252;rkiye Roman</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section class="product-details" id="prod">
        <div class="head-cta">
          <div class="container">
            <div class="product-details">
              <figure>
                <img :src="item.imgBig" :title="item.title" :alt="item.title" />
              </figure>
              <div class="product-name">
                <h3>{{ item.title }}</h3>
              </div>
            </div>
            <div class="hidden">
              <div class="product-price">
                <p>
                  <span>(KDV Dahil)</span>
                  {{
                    (item.price - item.price * (item.discount / 100)).toFixed(2)
                  }}
                  ₺
                </p>
              </div>
              <a class="btn red" href="javascript:;" @click="addToCart"
                >SEPETE EKLE</a
              >
            </div>
            <div class="hidden">
              <span class="product-status">Satışa Hazır</span>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="head">
            <div class="col-half">
              <h1 class="product-name">
                {{ item.title }}
                <span class="newItem"
                  ><img src="assets/img/new-item.png"
                /></span>
              </h1>
            </div>

            <div class="col-half" style="text-align:right">
              <ul class="rate four">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <span>8/10 - 5 Kişi</span>
              <a
                href="javascript:;"
                onclick="PrepareAndAddToFavorites();"
                class="add-to-favorites"
                >FAVORİLERİME EKLE</a
              >
            </div>
          </div>
          <div class="all-details">
            <div class="images">
              <figure class="big-image">
                <a href="javascript:" class="showZoomable">
                  <img
                    :alt="item.title"
                    :src="item.imgBig"
                    :title="item.title"
                    class="img-responsive"
                  />
                </a>
              </figure>
              <div style="clear: both;"></div>
            </div>

            <div class="zoomableOverlay">
              <div class="productZoomSliderWrapper">
                <button class="closeButton">X</button>
                <div class="productZoomSlider owl-carousel">
                  <div class="item">
                    <span class="zoomable">
                      <img
                        class="lazyload proSliderImg"
                        src="assets/img/0001865739001-1.jpg"
                        thumb="assets/img/0001865739001-1.jpg"
                        alt="Olmasa da Olur"
                      />
                    </span>
                    <div class="thumbnail-content" hidden aria-hidden="true">
                      <img src="assets/img/0001865739001-1.jpg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="specs">
              <div class="author">
                Yazar:
                <span
                  ><a href="#"
                    ><span class="name">{{ item.author }}</span></a
                  ></span
                >
              </div>

              <div class="author">
                Yayınevi :
                <h2>
                  <a href="#"
                    ><span class="name" id="publisherName">{{
                      item.publisher
                    }}</span></a
                  >
                </h2>
              </div>
              <div class="spec-box" id="priceBox">
                <div id="result" class="variants-wrapper"></div>
                <div id="statusDiv"></div>
                <div id="priceDiv" class="book-active">
                  <div class="prices">
                    <div class="full">
                      <div class="price">
                        <span id="salePrice"></span
                        ><span class="price-currency"
                          >{{
                            (
                              item.price -
                              item.price * (item.discount / 100)
                            ).toFixed(2)
                          }}
                          TL</span
                        >
                      </div>
                      <div class="quantity">
                        <input
                          id="decrease"
                          type="button"
                          @click="decreaseQty"
                          value="-"
                        />
                        <input id="qty" type="text" :value="qty" />
                        <input
                          id="increase"
                          type="button"
                          @click="increaseQty"
                          value="+"
                        />
                      </div>
                    </div>
                    <div class="full">
                      <div class="old-price">
                        <span id="oldPrice"></span
                        ><span id="oldPriceCurrency" class="price-currency">
                          {{ item.price }} TL</span
                        >
                      </div>
                      <span class="discount">-%{{ item.discount }}</span>
                    </div>
                  </div>

                  <input type="hidden" id="hdnDiscount" />

                  <div class="cta">
                    <a class="btn red" href="javascript:;" @click="addToCart"
                      >SEPETE EKLE</a
                    >
                    <a
                      class="btn white fancybox"
                      href="/Themes/DR/Content/assets/partials/fiyati-dusunce-uyar.html?ver=574"
                      id="openAlarm"
                      data-fancybox-type="ajax"
                      >FİYATI DÜŞÜNCE UYAR</a
                    >
                  </div>
                </div>
                <div class="clear"></div>
                <div class="shipmentTimeFrame">
                  <div class="col-xs-12 col-md-4">
                    <div class="tbox">
                      <strong> Standart Teslimat</strong>
                      <div class="timeCell">
                        24 - 26 Mart
                      </div>
                      <div class="t-free">* 100 TL üzeri bedava!</div>
                    </div>
                  </div>
                </div>
              </div>

              <ul class="pluses">
                <li class="bold hide-element" id="ebookInfo"></li>
                <li class="bold" id="ucretsizKargoDiv">
                  <i class="ico-right-arrow"></i>100 TL üstü standart teslimatlı
                  siparişlerde kargo bedava!
                </li>
                <li>Barkod: {{ item.barcode }}</li>
              </ul>

              <div class="social">
                <div class="comment">
                  <span class="comment-count">0</span>
                  <a
                    class="focusCommentForm"
                    href="javascript:;"
                    onclick="focusCommentForm()"
                    >YORUM YAZ</a
                  >
                </div>
                <div class="s-right">
                  <div class="facebook">
                    <a
                      class="fb-like addthis_button_facebook_like"
                      href="javascript:;"
                    ></a>
                  </div>
                  <div class="twitter">
                    <a class="tweet addthis_button_tweet" href="#"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="summary">
            <p></p>
            <p>
              {{ item.description }}
            </p>
            <p>
              {{ item.descriptionContent }}
            </p>
            <p>
              {{ item.descriptionFooter }}
            </p>
            <p></p>
            <p>(Tanıtım Bülteninden)</p>
            <p><strong>Hamur Tipi : </strong>{{ item.doughType }}</p>
            <p><strong>Sayfa Sayısı : </strong>{{ item.pageNumbers }}</p>
            <p><strong>Ebat : </strong>{{ item.dimension }}</p>
            <p><strong>İlk Baskı Yılı : </strong>{{ item.firstEdition }}</p>
            <p><strong>Baskı Sayısı : </strong>{{ item.editionNumber }}</p>
            <p><strong>Dil : </strong>{{ item.language }}</p>
            <p></p>
          </div>
        </div>
      </section>
      <input type="hidden" id="firstValue" value="1" />
      <input type="hidden" id="shippingprice" value="100" />

      <section class="comments">
        <div class="container">
          <header>
            <h2>Yorumlar <span class="comment-count">0</span></h2>
          </header>
          <div class="comment empty">
            <div class="comment-content">
              <p>Henüz yorum yapılmadı!</p>
            </div>
          </div>
          <div class="text-center">
            <div class="combtnHolder"></div>
            <a
              onclick="toggleCommentForm()"
              href="javascript:;"
              class="btn grey toggleCommentForm"
              >YORUM YAZ</a
            >
          </div>
          <div class="comment-form">
            <div class="form">
              <div class="row">
                <div class="full">
                  <label for="header">Başlık</label>
                  <input type="text" id="header" />
                </div>
              </div>
              <div class="full">
                <label for="message">Yorum</label>
                <textarea name="message" id="message"></textarea>
              </div>
              <div class="text-center">
                <input class="btn blue" type="button" value="GÖNDER" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-actions>
          <v-btn text @click="dialog = false"
            ><p style="color:gray">X</p></v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-text>
          Ürün başarıyla sepetinize eklendi.
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: this.$router.currentRoute.params.item,
      dialog: false,
      qty: 1,
    };
  },
  methods: {
    addToCart() {
      this.item.quantity = this.qty;
      this.$store.dispatch("addCart", this.item);
      this.dialog = true;
    },
    increaseQty() {
      this.qty++;
    },
    decreaseQty() {
      if (this.qty > 1) this.qty--;
    },
  },
  beforeDestroy() {
    this.dialog = false;
  },
};
</script>

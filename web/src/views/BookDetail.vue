<template>
  <div class="book-detail">
    <div id="selectedId">
      <section class="sub-categories">
        <div class="categories-path">
          <div class="container" style="text-align:left">
            <ul>
              <li>
                <router-link :to="{ name: 'Home' }">ANASAYFA</router-link>
              </li>
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
                <img :src="item.img" :title="item.title" :alt="item.title" />
              </figure>
              <div class="product-name">
                <h3>{{ item.title }}</h3>
              </div>
            </div>
            <div>
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
          </div>
        </div>
        <div class="container">
          <div class="head">
            <div class="col-half">
              <h1 class="product-name">
                {{ item.title }}
              </h1>
            </div>

            <div class="col-half" style="text-align:right">
              <div class="rate">
                <Ratings :hover="true" :rating="item.rate" :readonly="false" />
              </div>
              <span>8/10 - 5 Kişi</span>
              <a
                href="javascript:;"
                onclick="PrepareAndAddToFavorites();"
                class="fa fa-heart"
                style="color: #000;padding-left: 5px; font-weight:bold; text-decoration:none"
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
                        src="item.imgBig"
                        thumb="item.imgBig"
                        alt="Olmasa da Olur"
                      />
                    </span>
                    <div class="thumbnail-content" hidden aria-hidden="true">
                      <img src="item.imgBig" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="specs">
              <div class="author" style="text-align:left">
                Yazar:
                <span
                  ><a href="#"
                    ><span class="name">{{ item.author }}</span></a
                  ></span
                >
              </div>

              <div class="author" style="text-align:left">
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
                <div id="result" class="variants-wrapper">
                  <div class="variant">
                    <h3></h3>
                    <div class="variant-content">
                      <ul id="value1Div">
                        <li class="">
                          <input type="radio" checked="" id="chars1_0" /><label
                            for="chars1_0"
                            >{{ item.cover }}</label
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
                      href="#"
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

              <ul class="pluses" style="padding:0px;">
                <li class="bold hide-element" id="ebookInfo"></li>
                <li class="bold" id="ucretsizKargoDiv" style="text-align:left">
                  100 TL üstü standart teslimatlı siparişlerde kargo bedava!
                </li>
                <li style="text-align:left">Barkod: {{ item.barcode }}</li>
              </ul>

              <div class="social">
                <div class="comment">
                  <span class="comment-count">{{ totalComment }}</span>
                  <a class="focusCommentForm" href="javascript:;" onclick=""
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
            <h2>
              Yorumlar <span class="comment-count">{{ totalComment }}</span>
            </h2>
          </header>
          <CommentList v-if="showComment" :items="comments" />
          <div v-if="!showComment" class="comment empty">
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
                  <v-text-field
                    v-model="header"
                    type="text"
                    maxlength="40"
                    dense
                    outlined
                  ></v-text-field>
                </div>
              </div>
              <div class="full">
                <label for="message">Yorum</label>
                <v-text-field
                  v-model="body"
                  type="text"
                  maxlength="80"
                  outlined
                ></v-text-field>
              </div>
              <div class="text-center">
                <input
                  @click="addComment()"
                  class="btn blue"
                  type="button"
                  value="GÖNDER"
                />
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
        </v-card-actions>
        <div style="font-size:150px">
          <i class="fa fa-check-circle" style="color:green"></i>
        </div>
        <v-card-text>
          <b>{{ dialogText }}</b>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Ratings from "@/components/Ratings";
import CommentList from "@/components/CommentList";
export default {
  data() {
    return {
      item: this.$router.currentRoute.params.item,
      dialog: false,
      qty: 1,
      comments: [],
      header: "",
      body: "",
      dialogText: "",
    };
  },
  created() {
    this.getComments();
  },
  components: {
    Ratings,
    CommentList,
  },
  computed: {
    totalComment() {
      return this.comments.length;
    },
    showComment() {
      return this.comments.length > 0;
    },
  },
  methods: {
    async getComments() {
      try {
        let res = await axios.get(
          `http://localhost:7700/home/book/comments?id=${this.item.id}`
        );
        if (!res.data.err) {
          this.comments = res.data.comments;
        } else throw new Error();
      } catch {
        console.log("err");
      }
    },
    addToCart() {
      this.item.quantity = this.qty;
      this.$store.dispatch("addCart", this.item);
      this.dialogText = "Ürün başarıyla sepetinize eklendi.";
      this.dialog = true;
    },
    increaseQty() {
      this.qty++;
    },
    decreaseQty() {
      if (this.qty > 1) this.qty--;
    },
    async addComment() {
      try {
        let validate = this.header.length > 0 && this.body.length > 0;
        if (validate) {
          let comment = {
            id: this.item.id,
            title: this.header,
            description: this.body,
          };
          let res = await axios.post(
            `http://localhost:7700/home/book/comment/add`,
            comment
          );
          if (!res.data.err) {
            console.log("res", res);
            this.comments = res.data.comments;
            this.dialogText = "Yorum başarıyla eklendi.";
            this.dialog = true;
          } else throw new Error();
        } else throw new Error();
      } catch {
        console.log("err");
      }
    },
  },
  beforeDestroy() {
    this.dialog = false;
  },
};
</script>

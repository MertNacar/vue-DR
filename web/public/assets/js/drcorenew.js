var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
var postProducts = true;
var postCategory = true;
var postBrand = true;
var postAuthor = true;
function showAllComments() {
    var productId = $('#hdnProductId').val();
    var url = '';
    if ($('#hdnIsKobo').length > 0 && $('#hdnIsKobo').val() == 'True')
        url = '/product/ProductReviewsAsyncEbook?productid=' + productId;
    else
        url = '/product/ProductReviewsAsync?productid=' + productId;
    $.ajax({
        type: 'post',
        url: url,
        success: function (data) {
            if (data) {
                $('#productReviewList').html(data);
                $("#productReviewList .comment").slice(0, 3).addClass("active");
                $("#productReviewList").append("<div class='deleteComments'><span>TÜM YORUMLARI GİZLE</span></div>");
                $(".deleteComments").on("click", function () {
                    $("#productReviewList .comment:not(.active)").remove();
                    $(".deleteComments").remove();
                    $("#showAllComments").show();
                });
            
                dataLayer.push({ 'Category': 'Ürün Detay', 'Action': 'Tüm Yorumları Gör', 'Label': 'Tüm Yorumları Gör', 'event': 'gaEvent' });
            }
        }
    });
};

// yorumları göster butonu mobil görünüm
// only mobile devices - user agent
var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
if (isTouchDevice || isTouch) {
    var widthPage = $(document).width();
    if (widthPage <= 767) {
        console.log("user agent on");
        $("#showAllComments").appendTo(".combtnHolder");
        $("#showAllComments").click(function () {
            $(this).hide();
        });
    }
}


function toggleCommentForm() {
    if(!$(".comment-form").hasClass("active")) {
  		$(".comment-form").addClass("active");
  	} else {
  		$(".comment-form").removeClass("active");
  	}
};
function focusCommentForm() {
    $('html, body').animate({
        scrollTop: $(".comments").offset().top - $(".head-cta").height() - 50
    });
    if (!$(".comment-form").hasClass("active")) {
        $(".comment-form").addClass("active");
    }
};
function sendComment() {
    var title = $('.comment-form #header').val();
            var comment = $('.comment-form #message').val();
            if (!title || !title.length) {
                DefaultScript.PNotify('', 'Başlık ve Yorum alanları doldurulmalıdır.', 'error'); return;
            }
            var productId = $('#hdnProductId').val();
            var url = '';
            if ($('#hdnIsKobo').length > 0 && $('#hdnIsKobo').val() == 'True')
                url = '/product/ProductReviewsAddEbook?productid=' + productId + '&title=' + title + '&message=' + comment;
            else
                url = '/product/ProductReviewsAdd?productid=' + productId + '&title=' + title + '&message=' + comment;

            $.ajax({
                type: 'post',
                url: url,
                //data: { productId: productId, title: title, message: comment },
                success: function (data) {
                    if (data.success) {
                        $('.comment-form #header').val('');
                        $('.comment-form #message').val('');
                        DefaultScript.PNotify('Yorum Eklendi', 'Yorumunuz eklendi. Onaylandıktan sonra yayına alınacaktır.', 'success');
                        dataLayer.push({ 'Category': 'Ürün Detay', 'Action': 'Yorum Yaz', 'Label': 'Yorum Yaz', 'event': 'gaEvent' });
                    }
                    else {
                        if (data.code === 1)
                            DefaultScript.PNotify('', 'Ürün aktif satıştan kaldırılmıştır. Yorum eklenemez.', 'error');
                        else if (data.code === 2)
                            window.location.href = '/login?ReturnUrl=' + window.location.pathname;
                            //DefaultScript.PNotify('Hata : Üye Girişi', 'Bu özellikten yararlanmak için üye girişi yapmanız gerekmektedir.', 'error');
                        else if (data.code === 3)
                            DefaultScript.PNotify('', 'Başlık ve Yorum alanları doldurulmalıdır.', 'error');
                        else
                            DefaultScript.PNotify('', 'Beklenmeyen bir hata ile karşılaşıldı. Lütfen daha sonra tekrar deneyiniz.', 'error');
                    }
                }
            });
     
}
function initializeDr() {
    $(document).mouseup(function (e) {
        var container = $(".search-suggests");
        if ($(".search-suggests").hasClass("active")) {
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeClass("active");
            }
        }
    });
    $(".search-bar input[type=text]").on("focus", function () {
        //core.widgets.searchBar.showSuggests();
    });
    $(".search-bar input[type=text]").on("keyup", function (e) {
        var txt = $(this).val();

        if (e.keyCode == 13) {
            if (txt.length != 0)
                window.location.assign('/search?q=' + txt);
            else
                return false;
        }
        if ((e.keyCode == 8 || e.keyCode == 46)) {
            postProducts = true;
            postCategory = true;
            postBrand = true;
            postAuthor = true;
        }
        if (txt.length < 3 || e.keyCode == 27) {
            // 3 karakterden önce suggest yok
            $('.search-suggests .product').html('');
            $('.search-suggests .category').html('');
            $('.search-suggests .author').html('');
            core.widgets.searchBar.hideSuggests();
            return;
        }
        var hasItem = 0;
        //ürün adı suggest
        delay(function () {
            if (postProducts) {
                $.ajax({
                    type: 'post',
                    dataType: "json",
                    data: { type: 'product', term: txt },
                    url: '/stateless/suggest',
                    success: function (data) {
                        var jObject = JSON.parse(data);
                        var respHtml = "";
                        var container = $('.search-suggests .product');
                        if (jObject && jObject.suggest && jObject.suggest.length && jObject.suggest[0] && jObject.suggest[0].options && jObject.suggest[0].options.length) {
                            var iterator = 0
                            var length = jObject.suggest[0].options.length;
                            var elements = jObject.suggest[0].options
                            for (iterator; iterator < length; iterator++) {
                                var element = elements[iterator];
                                var liItem = '<li><a href="' + (element.payload.url.match("^/") ? '' : '/') + element.payload.url + '">' + (element.text != "" && element.text.includes("|") ? element.text.split("|")[0] : element.text) + '</a><span class="price">' + parseFloat(element.payload.price.toString().match(/^\d+(?:\.\d{0,2})?/)) + ' TL</span></li>';
                                respHtml += liItem;
                            }
                            respHtml = '<li class="suggest-head"><span>Ürünler</span></li>' + respHtml;
                            container.html(respHtml).show();
                            postProducts = true;
                        }
                        else {
                            container.html('').hide();
                            postProducts = false;
                        }
                    }
                });
            }

            //kategori adı suggest
            if (postCategory) {
                $.ajax({
                    type: 'post',
                    dataType: "json",
                    data: { type: 'category', term: txt },
                    url: '/stateless/suggest',
                    success: function (data) {
                        var jObject = JSON.parse(data);
                        var respHtml = "";
                        var container = $('.search-suggests .category');
                        if (jObject && jObject.suggest && jObject.suggest.length && jObject.suggest[0] && jObject.suggest[0].options && jObject.suggest[0].options.length) {
                            var iterator = 0
                            var length = jObject.suggest[0].options.length;
                            var elements = jObject.suggest[0].options
                            for (iterator; iterator < length; iterator++) {
                                var element = elements[iterator];
                                var href = "#";
                                if (element.payload.url.indexOf("ekategori") > 0) {
                                    href = element.payload.url;
                                }
                                else {
                                    href = '/kategori/' + element.payload.url;
                                }
                                var liItem = '<li><a href="' + href + '">' + element.text + '</a></li>';
                                respHtml += liItem;
                            }
                            respHtml = '<li class="suggest-head"><span>Kategoriler</span></li>' + respHtml;
                            container.html(respHtml).show();
                            postCategory = true;
                        }
                        else {
                            container.html('').hide();
                            postCategory = false;
                        }
                    }
                });
            }

            //marka adı suggest
            if (postBrand) {
                $.ajax({
                    type: 'post',
                    dataType: "json",
                    data: { type: 'brand', term: txt },
                    url: '/stateless/suggest',
                    success: function (data) {
                        var jObject = JSON.parse(data);
                        var respHtml = "";
                        var container = $('.search-suggests .brand');
                        if (jObject && jObject.suggest && jObject.suggest.length && jObject.suggest[0] && jObject.suggest[0].options && jObject.suggest[0].options.length) {
                            var iterator = 0
                            var length = jObject.suggest[0].options.length;
                            var elements = jObject.suggest[0].options
                            for (iterator; iterator < length; iterator++) {
                                var element = elements[iterator];
                                var liItem = '<li><a href="/marka/' + element.payload.url + '">' + element.text + '</a></li>';
                                respHtml += liItem;
                            }
                            respHtml = '<li class="suggest-head"><span>Markalar</span></li>' + respHtml;
                            container.html(respHtml).show();
                            postBrand = true;
                        }
                        else {
                            container.html('').hide();
                            postBrand = false;
                        }
                    }
                });
            }

            // yazar adı suggest
            if (postAuthor) {
                $.ajax({
                    type: 'post',
                    dataType: "json",
                    data: { type: 'author', term: txt },
                    url: '/stateless/suggest',
                    success: function (data) {
                        var jObject = JSON.parse(data);
                        var respHtml = "";
                        var container = $('.search-suggests .author');
                        if (jObject && jObject.suggest && jObject.suggest.length && jObject.suggest[0] && jObject.suggest[0].options && jObject.suggest[0].options.length) {
                            var iterator = 0
                            var length = jObject.suggest[0].options.length;
                            var elements = jObject.suggest[0].options
                            for (iterator; iterator < length; iterator++) {
                                var element = elements[iterator];
                                var liItem = '<li><a href="/yazar/' + element.payload.url + '">' + element.text + '</a></li>';
                                respHtml += liItem;
                            }
                            respHtml = '<li class="suggest-head"><span>Yazarlar</span></li>' + respHtml;
                            container.html(respHtml).show();
                            postAuthor = true;
                        }
                        else {
                            container.html('').hide();
                            postAuthor = false;
                        }
                    }
                });
            }
        }, 500);
        $(".search-bar input[type=text]").ajaxComplete(function () {
            var count = 0;
            $('.search-suggests ul').each(function () {
                if ($(this).html() != '')
                    count++;
            });
            if (count) {
                core.widgets.searchBar.showSuggests();
            } else {
                core.widgets.searchBar.hideSuggests();
            }
        });

    });
    $(".search-bar input[type=text]").on("blur", function () {
        //core.widgets.searchBar.hideSuggests();
    });
}
initializeDr();


// START: VARIANT
$(document).ready(function () {
    var DivHtml = '';
    if ($("input[id^='hdnChar']").length < 1) {
        $("#statusDiv").html('<span class="product-status active">Tükendi</div>');
        $("#salePrice").html("");
        $("#oldPrice").html("");
        $('#hdnProductId').val("");
        $('#sta1').removeClass("hidden");
        $('#sta0').addClass("hidden");
        $('#sta1').html("");
        $('#sta1').html("<span class='product-status active'>Tükendi</span>").show();
        $('#priceDiv').hide();
        return;
    }
    else {
        var selectedInput = 1;
        var charName1 = $("input[id^='hdnChar']").data('charname1');
        var charName2 = $("input[id^='hdnChar']").data('charname2');

        //1.Varyantlar yükleniyor
        if (charName1 != '' && charName1 != 'Münferit') {
            var hdnChar1List = $("input[data-charname1='" + charName1 + "']");
            var charName1Values = [];
            $.each(hdnChar1List, function (index, data) {
                charName1Values.push($(data).data("charvalue1"));
            });
            DivHtml = '<div class="variant">';
            DivHtml += '<h3>' + (charName1 == "Medya Tipi" ? "" : charName1) + '</h3>';
            DivHtml += '<div class="variant-content"><ul id="value1Div">';
            $.each($.unique(charName1Values), function (index, data) {
                var selectedIndex = $("input[id^='hdnChar" + index + "']").data('selected');
                if (data == "e-Kitap") {
                    var ekitapGuid = $("input[id^='hdnChar" + index + "']").data('bookid');
                    $('#ekitapGuid').val(ekitapGuid);
                }
                if (selectedIndex == "True") {
                    selectedInput = index;
                }
                DivHtml += '<li class="' + (index < 4 ? '' : "hide") + '">' +
                               '<input type="radio" value="' + data + '" name="' + charName1 +  '" ' + (selectedIndex == "True" ? 'checked' : "") + ' id="chars1_' + index + '" onclick="' + (charName2 != '' ? 'GetSelectVariantion1()' : 'GetSelectSkuValue(\'' + data + '\')') + '"/>' +
                               '<label for="chars1_' + index + '" >' + data + '</label>' +
                          '</li>';
            });
            DivHtml += '</ul></div></div>';
            $('#result').append(DivHtml);
           // $("input[id^='chars1_']:first").prop('checked', true);
            //$("input[id^='chars1_']:first").prop("checked", true);
        }

        var char1Val = $("input[id^='chars1_']:checked").val();
        //2.Varyantlar varsa yükleniyor
        if (charName2 != '') {
            var hdnChar2List = $("input[data-charname2='" + charName2 + "'][data-charvalue1='" + char1Val + "']");
            var charName2Values = [];
            $.each(hdnChar2List, function (index, data) {
                charName2Values.push($(data).data("charvalue2"));
            });
            DivHtml = '<div class="variant">';
            DivHtml += '<h3>' + charName2 + '</h3>';
            DivHtml += '<div class="variant-content"><ul id="value2Div">';
            $.each($.unique(charName2Values), function (index, data) {
                DivHtml += '<li class="' + (index < 4 ? '' : "hide") + '">' +
                                    '<input type="radio" value="' + data + '" name="' + charName2 + '" id="chars2_' + index + '" onclick="GetSelectSkuValue(\'' + data + '\')" />' +
                                    '<label for="chars2_' + index + '">' + data + '</label>' +
                               '</li>';
            });
            $('#result').append(DivHtml);
            //$("input[id^='chars2_']:first").prop("checked", true).trigger("click");
        }
        else {
            $("input[id^='chars1_" + selectedInput + "']").prop("checked", true).trigger("click");
          // $("#chars1_0").prop("onclick", null).off("click");
        }

        //Münferit Kontrol
        if (charName1 == 'Münferit') {
            var sku = $("input[id^='hdnChar']").data("charvalue1");
            var salePrice = $("input[id^='hdnChar']").data("price");
            var oldPrice = $("input[id^='hdnChar']").data("oldprice");
            var salePriceReplice = $("input[id^='hdnChar']").data("price").toString().replace(',', '').replace('.', '');
            var oldPriceReplice = $("input[id^='hdnChar']").data("oldprice").toString().replace(',', '').replace('.', '');
            var saleStatusCode = $("input[id^='hdnChar']").data("salestatuscode");
            var productId = $("input[id^='hdnChar']").data("productid");
            var iskobo = $("input[id^='hdnChar']").data("iskobo");
            var statustype = $("input[id^='hdnChar']").data('statustype');

            var discount = 0;
            if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                discount = 100 - Math.round((salePriceReplice * 100) / oldPriceReplice);
            }
            if (saleStatusCode == 0) {
                if (iskobo == "True") {
                    $("#qty, #decrease, #increase").prop("disabled", true);
                    $("#ucretsizKargoDiv").html("").hide();
                    $("#ebookInfo").html("<i class=\"ico-right-arrow\"></i>Satın aldığım e-kitaplarımı <a href=\"/kobo-nasil\" target=\"_blank\" title=\"Satın aldığım e-kitaplarımı nasıl okurum?\">nasıl okurum?</a>").fadeIn().removeClass("hide-element");
                }
                else {

                    $("#qty, #decrease, #increase").prop("disabled", false);
                    $("#ebookInfo").html("").hide();
                    if (parseInt(salePriceReplice) >= 7500) {
                        $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>Bu üründe kargo bedava!..").fadeIn().removeClass("hide-element");
                    } else {
                        var price = $('#shippingprice').val();
                        $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>" + price + " TL ve üzeri alışverişlerinizde kargo bedava!").fadeIn().removeClass("hide-element");
                    }
                }
                $("#statusDiv").html("");
                $("#salePrice").html(salePrice);
                if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                    $("#oldPrice").html(oldPrice);
                    $("#oldPriceCurrency").html(" TL");
                }
                else {
                    $("#oldPrice").html("");
                    $("#oldPriceCurrency").html("");
                }

                if (discount > 0)
                    $(".discount").html('-%' + parseInt(discount));
                else
                    $(".discount").html("");

                $('#priceDiv').show();
                $('#sta1').addClass("hidden");
                $('#sta0').removeClass("hidden");
                $('.product-price').html('<p><span>(KDV Dahil)</span> ' + salePrice + ' TL</p>');
            }
            else {
                $("#statusDiv").html('<span class="product-status active">' + statustype + '</div>');
                $("#salePrice").html("");
                $("#oldPrice").html("");
                $('#hdnProductId').val("");
                $('#sta1').removeClass("hidden");
                $('#sta0').addClass("hidden");
                $('#sta1').html("");
                $('#sta1').html("<span class='product-status active'>" + statustype + "</span>").show();
                $('#priceDiv').hide();

            }
            $('#hdnIsKobo').val(iskobo);
            $('#hdnProductId').val(productId);
        }
        //$(".variantRRwrapper .variantRRcontainer").clone().appendTo(".variantRRbox");
    }
});

$(window).load(function(){
    var searchNotProText = $("#container").find(".searchNotProText").length;
    if(searchNotProText > 0) {
        $("#searchResultCount").text("0 ADET"); 
    }
});

//Adet işlemleri
function BtnDecrase() {
    var qty = $('#qty');
    var quantity = qty.val();
    if (quantity) {
        var orderquantity = parseInt(quantity);
        if (orderquantity > 1) {
            qty.val(orderquantity - 1);
            $("#hdnBasketQuantity").val(orderquantity - 1).trigger('change');
        }
    }
}
function BtnIncrease() {
    var qty = $('#qty');
    var quantity = qty.val();
    if (quantity) {
        var orderquantity = parseInt(quantity);
        if (orderquantity < 50) {
            qty.val(orderquantity + 1);
            $("#hdnBasketQuantity").val(orderquantity + 1).trigger('change');
        }
    }
}
function QtyChange() {
    $("#qty").change(function () {
        if ($(this).val() > 50) {
            $(this).val(50);
        }
        else if ($(this).val() < 1) {
            $(this).val(1);
        }
    });
}
var char1Val = $("input[id^='chars1_']:checked").val();


function VariantSet() {
    var DivHtml = '';
    if ($("input[id^='hdnChar']").length < 1) {
        $("#statusDiv").html('<span class="product-status active">Tükendi</div>');
        $("#salePrice").html("");
        $("#oldPrice").html("");
        $('#hdnProductId').val("");
        $('#sta1').removeClass("hidden");
        $('#sta0').addClass("hidden");
        $('#sta1').html("");
        $('#sta1').html("<span class='product-status active'>Tükendi</span>").show();
        $('#priceDiv').hide();
        return;
    }
    else {
        var charName1 = $("input[id^='hdnChar']").data('charname1');
        var charName2 = $("input[id^='hdnChar']").data('charname2');

        //1.Varyantlar yükleniyor
        if (charName1 != '' && charName1 != 'Münferit') {
            var hdnChar1List = $("input[data-charname1='" + charName1 + "']");
            var charName1Values = [];
            $.each(hdnChar1List, function (index, data) {
                charName1Values.push($(data).data("charvalue1"));
            });
            DivHtml = '<div class="variant">';
            DivHtml += '<h3>' + (charName1 == "Medya Tipi" ? "" : charName1) + '</h3>';
            DivHtml += '<div class="variant-content"><ul id="value1Div">';
            $.each($.unique(charName1Values), function (index, data) {
                var selectedIndex = $("input[id^='hdnChar" + index + "']").data('selected');
                DivHtml += '<li class="' + (index < 4 ? '' : "hide") + '">';
                DivHtml += '<input type="radio" value="' + data + '" name="' + charName1 + '" ' + (selectedIndex == "True" ? 'checked' : "") + ' id="chars1_' + index + '" onclick="' + (charName2 != '' ? 'GetSelectVariantion2()' : 'GetSelectSkuValue(\'' + data + '\')') + '"/>';
                DivHtml += '<label for="chars1_' + index + '" >' + data + '</label>' +
                '</li>';
            });
            DivHtml += '</ul></div></div>';
            $('#result').append(DivHtml);
        }

        var char1Val = $("input[id^='chars1_']:checked").val();
        //2.Varyantlar varsa yükleniyor
        if (charName2 != '') {
            var hdnChar2List = $("input[data-charname2='" + charName2 + "'][data-charvalue1='" + char1Val + "']");
            var charName2Values = [];
            $.each(hdnChar2List, function (index, data) {
                charName2Values.push($(data).data("charvalue2"));
            });
            DivHtml = '<div class="variant">';
            DivHtml += '<h3>' + charName2 + '</h3>';
            DivHtml += '<div class="variant-content"><ul id="value2Div">';
            $.each($.unique(charName2Values), function (index, data) {
                DivHtml += '<li class="' + (index < 4 ? '' : "hide") + '">' +
                                    '<input type="radio" value="' + data + '" name="' + charName2 + '" id="chars2_' + index + '" onclick="GetSelectSkuValue(\'' + data + '\')" />' +
                                    '<label for="chars2_' + index + '">' + data + '</label>' +
                               '</li>';
            });
            $('#result').append(DivHtml);
        }
        else {
            //$("input[id^='chars1_']:first").prop("checked", true).trigger("click");
        }

        //Münferit Kontrol
        if (charName1 == 'Münferit') {
            var sku = $("input[id^='hdnChar']").data("charvalue1");
            var salePrice = $("input[id^='hdnChar']").data("price");
            var oldPrice = $("input[id^='hdnChar']").data("oldprice");
            var salePriceReplice = $("input[id^='hdnChar']").data("price").toString().replace(',', '').replace('.', '');
            var oldPriceReplice = $("input[id^='hdnChar']").data("oldprice").toString().replace(',', '').replace('.', '');
            var saleStatusCode = $("input[id^='hdnChar']").data("salestatuscode");
            var productId = $("input[id^='hdnChar']").data("productid");
            var iskobo = $("input[id^='hdnChar']").data("iskobo");
            var statustype = $("input[id^='hdnChar']").data('statustype');

            var discount = 0;
            if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                discount = 100 - Math.round((salePriceReplice * 100) / oldPriceReplice);
            }
            if (saleStatusCode == 0) {
                if (iskobo == "True") {
                    $("#qty, #decrease, #increase").prop("disabled", true);
                    $("#ucretsizKargoDiv").html("").hide();
                    $("#ebookInfo").html("<i class=\"ico-right-arrow\"></i>Satın aldığım e-kitaplarımı <a href=\"/kobo-nasil\" target=\"_blank\" title=\"Satın aldığım e-kitaplarımı nasıl okurum?\">nasıl okurum?</a>").fadeIn().removeClass("hide-element");
                }
                else {

                    $("#qty, #decrease, #increase").prop("disabled", false);
                    $("#ebookInfo").html("").hide();
                    if (parseInt(salePriceReplice) >= 7500) {
                        $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>Bu üründe kargo bedava!..").fadeIn().removeClass("hide-element");
                    } else {
                        var price = $('#shippingprice').val();
                        $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>" + price + " TL ve üzeri alışverişlerinizde kargo bedava!").fadeIn().removeClass("hide-element");
                    }
                }
                $("#statusDiv").html("");
                $("#salePrice").html(salePrice);
                if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                    $("#oldPrice").html(oldPrice);
                    $("#oldPriceCurrency").html(" TL");
                }
                else {
                    $("#oldPrice").html("");
                    $("#oldPriceCurrency").html("");
                }

                if (discount > 0)
                    $(".discount").html('-%' + parseInt(discount));
                else
                    $(".discount").html("");

                $('#priceDiv').show();
                $('#sta1').addClass("hidden");
                $('#sta0').removeClass("hidden");
                $('.product-price').html('<p><span>(KDV Dahil)</span> ' + salePrice + ' TL</p>');
            }
            else {
                $("#statusDiv").html('<span class="product-status active">' + statustype + '</div>');
                $("#salePrice").html("");
                $("#oldPrice").html("");
                $('#hdnProductId').val("");
                $('#sta1').removeClass("hidden");
                $('#sta0').addClass("hidden");
                $('#sta1').html("");
                $('#sta1').html("<span class='product-status active'>" + statustype + "</span>").show();
                $('#priceDiv').hide();

            }
            $('#hdnIsKobo').val(iskobo);
            $('#hdnProductId').val(productId);
        }
    }
}
//Seçilen varyanta göre SKU alıyoruz
var clickCount = 0;
function GetSelectSkuValue(variantType) {
    $("input[type=radio]").attr('disabled', true);
    if (clickCount > 0) {  }

        clickCount++;
        var firstvalue = $("#firstValue").val();
        var seName = $("#seName").val();
        if (seName != undefined && seName != null && seName != "") {
            isBook = !seName.startsWith("ekitap");
        }
        else {
            isBook = true;
        }

        if (firstvalue == 1) {
            var char1Val = $("input[id^='chars1_']:checked").val();
            var char2Val = $("input[id^='chars2_']:checked").val();
            var charName1 = $("input[id^='hdnChar']").data('charname1');
            var charName2 = $("input[id^='hdnChar']").data('charname2');
            if (charName2 != '') {
                var sku = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").val();
                var salePrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("price");
                var oldPrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("oldprice");
                var salePriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("price").toString().replace(',', '').replace('.', '');
                var oldPriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("oldprice").toString().replace(',', '').replace('.', '');
                var saleStatusCode = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("salestatuscode");
                var productId = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("productid");
                var statustype = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data('statustype');
                if (charName1 === "Renk" && charName2 === "Tür") {
                    $(".ImageZoom").attr("href", "http://i.dr.com.tr/cache/600x600-0/originals/" + sku + "-1.jpg");
                    $("#main-product-img").attr("src", "http://i.dr.com.tr/cache/500x400-0/originals/" + sku + "-1.jpg");
                }
            }
            else {
                var sku = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").val();
                var salePrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("price");
                var oldPrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("oldprice");
                var salePriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("price").toString().replace(',', '').replace('.', '');
                var oldPriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("oldprice").toString().replace(',', '').replace('.', '');
                var saleStatusCode = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("salestatuscode");
                var productId = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("productid");
                //var iskobo = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("charvalue1");
                var iskobo = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("iskobo");
                var statustype = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data('statustype');
                if (charName1 === "Renk" && charName2 === "Tür") {
                    $(".ImageZoom").attr("href", "http://i.dr.com.tr/cache/600x600-0/originals/" + sku + "-1.jpg");
                    $("#main-product-img").attr("src", "http://i.dr.com.tr/cache/500x400-0/originals/" + sku + "-1.jpg");
                }

            }
            var discount = 0;
            if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                discount = 100 - Math.round((salePriceReplice * 100) / oldPriceReplice);
            }
            var cta = '<div class="cta"><a class="btn red" href="javascript:;" onclick="PrepareAndAddToBasket();">SEPETE EKLE</a><a class="btn white fancybox" href="/Themes/DR/Content/assets/partials/fiyati-dusunce-uyar.html" id="openAlarm" data-fancybox-type="ajax">FİYATI DÜŞÜNCE UYAR</a></div>';
            var htmlPrice = '<div class="prices">' +
                '<div class="full">' +
                '<div class="price"><span id="salePrice">' + salePrice + '</span><span class="price-currency"> TL</span></div>' +
                    '<div class="quantity">' +
                        '<input id="decrease" type="button" onclick="BtnDecrase();" value="-">' +
                        '<input id="qty" type="text" onchange="QtyChange();" value="1" />' +
                        '<input id="increase" type="button" onclick="BtnIncrease()" value="+">' +
                    '</div>' +
                '</div>' +
                '<div class="full">' +
                '<div class="old-price"><span id="oldPrice">' + oldPrice + '</span><span id="oldPriceCurrency"class="price-currency"> TL</span></div>' +
                '<span class="discount">-%' + discount + '</span>' +
                '</div>' +
            '</div>';

            if (saleStatusCode == 0) {
                if (iskobo == "True") {
                    $("#ucretsizKargoDiv").html("").hide();
                    $("#ebookInfo").html("<i class=\"ico-right-arrow\"></i>Satın aldığım e-kitaplarımı <a href=\"/kobo-nasil\" target=\"_blank\" title=\"Satın aldığım e-kitaplarımı nasıl okurum?\">nasıl okurum?</a>").fadeIn().removeClass("hide-element");
                    $('#priceDiv').html(htmlPrice + cta);
                    $("#qty, #decrease, #increase").prop("disabled", true);
                }
                else {
                    $("#ebookInfo").html("").hide();
                    if (parseInt(salePriceReplice) >= 7500) {
                        $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>Bu üründe kargo bedava!..").fadeIn().removeClass("hide-element");
                    } else {
                        var price = $('#shippingprice').val();
                        $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>" + price + " TL ve üzeri alışverişlerinizde kargo bedava!").fadeIn().removeClass("hide-element");
                    }
                    $('#priceDiv').html(htmlPrice + cta);
                    $("#qty, #decrease, #increase").prop("disabled", false);
                }
                $("#statusDiv").html("");
                $("#salePrice").html(salePrice);
                if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                    $("#oldPrice").html(oldPrice);
                    $("#oldPriceCurrency").html(" TL");
                }
                else {
                    $("#oldPrice").html("");
                    $("#oldPriceCurrency").html("");
                }
                if (discount > 0)
                    $(".discount").html('-%' + parseInt(discount));
                else
                    $(".discount").html("");

                $('#priceDiv').show();
                $('#sta1').addClass("hidden");
                $('#sta0').removeClass("hidden");
                $('.product-price').html('<p><span>(KDV Dahil)</span> ' + salePrice + ' TL</p>');
            }
            else {
                $("#statusDiv").html('<span class="product-status active">' + statustype + '</div>');
                $("#salePrice").html("");
                $("#oldPrice").html("");
                $('#hdnProductId').val("");
                $('#sta1').removeClass("hidden");
                $('#sta0').addClass("hidden");
                $('#sta1').html("");
                $('#sta1').html("<span class='product-status active'>" + statustype + "</span>").show();
                $('#priceDiv').hide();

            }
            $('#hdnIsKobo').val(iskobo);
            $('#hdnProductId').val(productId);
            $("#firstValue").val(firstvalue + 1)
        }
        else {
            if (variantType == "e-Kitap") {
                var ekitapGuid = $('#ekitapGuid').val();
                var seNameSecond = $("#seNameSecond").val();
                if (isBook && seNameSecond != undefined) {
                    var char1Val = $("input[id^='chars1_']:checked").val();
                    var char2Val = $("input[id^='chars2_']:checked").val();
                    var charName1 = $("input[id^='hdnChar']").data('charname1');
                    var charName2 = $("input[id^='hdnChar']").data('charname2');
                    var seNameSecond = $("#seNameSecond").val();

                    if (charName2 != '') {
                        $.ajax({
                            type: 'post',
                            dataType: "json",
                            async: false,
                            data: { seoName: seNameSecond },
                            url: '/Product/ProductDetailsVariantEbookSeo',
                            beforeSend: function () {

                                $("input[type=radio]").attr('disabled', true);
                            },
                            success: function (data) {
                                if (data.Status) {
                                    $('#selectedId').html('');
                                    $('#selectedId').html(data.Data);
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {

                            }
                        });
                        VariantSet();
                        var salePrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("price");
                        var oldPrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("oldprice");
                        var salePriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("price").toString().replace(',', '').replace('.', '');
                        var oldPriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("oldprice").toString().replace(',', '').replace('.', '');
                        var saleStatusCode = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("salestatuscode");
                        var productId = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("productid");
                        var statustype = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data('statustype');
                        if (charName1 === "Renk" && charName2 === "Tür") {
                            $(".ImageZoom").attr("href", "http://i.dr.com.tr/cache/600x600-0/originals/" + sku + "-1.jpg");
                            $("#main-product-img").attr("src", "http://i.dr.com.tr/cache/500x400-0/originals/" + sku + "-1.jpg");
                        }
                    }
                    else {
                        $.ajax({
                            type: 'post',
                            dataType: "json",
                            async: false,
                            data: { seoName: seNameSecond },
                            url: '/Product/ProductDetailsVariantEbookSeo',
                            beforeSend: function () {

                                $("input[type=radio]").attr('disabled', true);
                            },
                            success: function (data) {
                                if (data.Status) {
                                    $('#selectedId').html('');
                                    $('#selectedId').html(data.Data);

                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {

                            }
                        });
                        VariantSet();
                        var salePrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("price");
                        var oldPrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("oldprice");
                        var salePriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("price").toString().replace(',', '').replace('.', '');
                        var oldPriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("oldprice").toString().replace(',', '').replace('.', '');
                        var saleStatusCode = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("salestatuscode");
                        var productId = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("productid");
                        //var iskobo = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("charvalue1");
                        var iskobo = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("iskobo");
                        var statustype = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data('statustype');
                        if (charName1 === "Renk" && charName2 === "Tür") {
                            $(".ImageZoom").attr("href", "http://i.dr.com.tr/cache/600x600-0/originals/" + sku + "-1.jpg");
                            $("#main-product-img").attr("src", "http://i.dr.com.tr/cache/500x400-0/originals/" + sku + "-1.jpg");
                        }

                    }
                    var discount = 0;
                    if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                        discount = 100 - Math.round((salePriceReplice * 100) / oldPriceReplice);
                    }
                    var cta = '<div class="cta"><a class="btn red" href="javascript:;" onclick="PrepareAndAddToBasket();">SEPETE EKLE</a><a class="btn white fancybox" href="/Themes/DR/Content/assets/partials/fiyati-dusunce-uyar.html" id="openAlarm" data-fancybox-type="ajax">FİYATI DÜŞÜNCE UYAR</a></div>';
                    var htmlPrice = '<div class="prices">' +
                        '<div class="full">' +
                        '<div class="price"><span id="salePrice">' + salePrice + '</span><span class="price-currency"> TL</span></div>' +
                            '<div class="quantity">' +
                                '<input id="decrease" type="button" onclick="BtnDecrase();" value="-">' +
                                '<input id="qty" type="text" onchange="QtyChange();" value="1" />' +
                                '<input id="increase" type="button" onclick="BtnIncrease()" value="+">' +
                            '</div>' +
                        '</div>' +
                        '<div class="full">' +
                        '<div class="old-price"><span id="oldPrice">' + oldPrice + '</span><span id="oldPriceCurrency"class="price-currency"> TL</span></div>' +
                        '<span class="discount">-%' + discount + '</span>' +
                        '</div>' +
                    '</div>';

                    if (saleStatusCode == 0) {
                        if (iskobo == "True") {
                            $("#ucretsizKargoDiv").html("").hide();
                            $("#ebookInfo").html("<i class=\"ico-right-arrow\"></i>Satın aldığım e-kitaplarımı <a href=\"/kobo-nasil\" target=\"_blank\" title=\"Satın aldığım e-kitaplarımı nasıl okurum?\">nasıl okurum?</a>").fadeIn().removeClass("hide-element");
                            $('#priceDiv').html(htmlPrice + cta);
                            $("#qty, #decrease, #increase").prop("disabled", true);
                        }
                        else {
                            $("#ebookInfo").html("").hide();
                            if (parseInt(salePriceReplice) >= 7500) {
                                $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>Bu üründe kargo bedava!..").fadeIn().removeClass("hide-element");
                            } else {
                                var price = $('#shippingprice').val();
                                $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>" + price + " TL ve üzeri alışverişlerinizde kargo bedava!").fadeIn().removeClass("hide-element");
                            }
                            $('#priceDiv').html(htmlPrice + cta);
                            $("#qty, #decrease, #increase").prop("disabled", false);
                        }
                        $("#statusDiv").html("");
                        $("#salePrice").html(salePrice);
                        if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                            $("#oldPrice").html(oldPrice);
                            $("#oldPriceCurrency").html(" TL");
                        }
                        else {
                            $("#oldPrice").html("");
                            $("#oldPriceCurrency").html("");
                        }
                        if (discount > 0)
                            $(".discount").html('-%' + parseInt(discount));
                        else
                            $(".discount").html("");

                        $('#priceDiv').show();
                        $('#sta1').addClass("hidden");
                        $('#sta0').removeClass("hidden");
                        $('.product-price').html('<p><span>(KDV Dahil)</span> ' + salePrice + ' TL</p>');
                    }
                    else {
                        $("#statusDiv").html('<span class="product-status active">' + statustype + '</div>');
                        $("#salePrice").html("");
                        $("#oldPrice").html("");
                        $('#hdnProductId').val("");
                        $('#sta1').removeClass("hidden");
                        $('#sta0').addClass("hidden");
                        $('#sta1').html("");
                        $('#sta1').html("<span class='product-status active'>" + statustype + "</span>").show();
                        $('#priceDiv').hide();

                    }
                    $('#hdnIsKobo').val(iskobo);
                    $('#hdnProductId').val(productId);
                    $("#firstValue").val(firstvalue + 1)
                }
                else if (isBook && ekitapGuid != undefined && ekitapGuid != "") {
                    var char1Val = $("input[id^='chars1_']:checked").val();
                    var char2Val = $("input[id^='chars2_']:checked").val();
                    var charName1 = $("input[id^='hdnChar']").data('charname1');
                    var charName2 = $("input[id^='hdnChar']").data('charname2');
                    var seNameSecond = $("#seNameSecond").val();
                    if (charName2 != '') {
                        $.ajax({
                            type: 'post',
                            dataType: "json",
                            async: false,
                            data: { seoName: seNameSecond },
                            url: '/Product/ProductDetailsVariantEbookSeo',
                            beforeSend: function () {
                                $("input[type=radio]").attr('disabled', true);
                            },
                            success: function (data) {
                                if (data.Status) {
                                    $('#selectedId').html('');
                                    $('#selectedId').html(data.Data);

                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {

                            }
                        });
                        VariantSet();
                        var salePrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("price");
                        var oldPrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("oldprice");
                        var salePriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("price").toString().replace(',', '').replace('.', '');
                        var oldPriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("oldprice").toString().replace(',', '').replace('.', '');
                        var saleStatusCode = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("salestatuscode");
                        var productId = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("productid");
                        var statustype = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data('statustype');
                        if (charName1 === "Renk" && charName2 === "Tür") {
                            $(".ImageZoom").attr("href", "http://i.dr.com.tr/cache/600x600-0/originals/" + sku + "-1.jpg");
                            $("#main-product-img").attr("src", "http://i.dr.com.tr/cache/500x400-0/originals/" + sku + "-1.jpg");
                        }
                    }
                    else {
                        $.ajax({
                            type: 'post',
                            dataType: "json",
                            async: false,
                            data: { bookId: ekitapGuid },
                            url: '/Product/ProductDetailsVariantEbook',
                            beforeSend: function () {

                                $("input[type=radio]").attr('disabled', true);
                            },
                            success: function (data) {
                                if (data.Status) {
                                    $('#selectedId').html('');
                                    $('#selectedId').html(data.Data);

                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {

                            }
                        });
                        VariantSet();
                        var salePrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("price");
                        var oldPrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("oldprice");
                        var salePriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("price").toString().replace(',', '').replace('.', '');
                        var oldPriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("oldprice").toString().replace(',', '').replace('.', '');
                        var saleStatusCode = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("salestatuscode");
                        var productId = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("productid");
                        //var iskobo = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("charvalue1");
                        var iskobo = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("iskobo");
                        var statustype = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data('statustype');
                        if (charName1 === "Renk" && charName2 === "Tür") {
                            $(".ImageZoom").attr("href", "http://i.dr.com.tr/cache/600x600-0/originals/" + sku + "-1.jpg");
                            $("#main-product-img").attr("src", "http://i.dr.com.tr/cache/500x400-0/originals/" + sku + "-1.jpg");
                        }

                    }
                    var discount = 0;
                    if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                        discount = 100 - Math.round((salePriceReplice * 100) / oldPriceReplice);
                    }
                    var cta = '<div class="cta"><a class="btn red" href="javascript:;" onclick="PrepareAndAddToBasket();">SEPETE EKLE</a><a class="btn white fancybox" href="/Themes/DR/Content/assets/partials/fiyati-dusunce-uyar.html" id="openAlarm" data-fancybox-type="ajax">FİYATI DÜŞÜNCE UYAR</a></div>';
                    var htmlPrice = '<div class="prices">' +
                        '<div class="full">' +
                        '<div class="price"><span id="salePrice">' + salePrice + '</span><span class="price-currency"> TL</span></div>' +
                            '<div class="quantity">' +
                                '<input id="decrease" type="button" onclick="BtnDecrase();" value="-">' +
                                '<input id="qty" type="text" onchange="QtyChange();" value="1" />' +
                                '<input id="increase" type="button" onclick="BtnIncrease()" value="+">' +
                            '</div>' +
                        '</div>' +
                        '<div class="full">' +
                        '<div class="old-price"><span id="oldPrice">' + oldPrice + '</span><span id="oldPriceCurrency"class="price-currency"> TL</span></div>' +
                        '<span class="discount">-%' + discount + '</span>' +
                        '</div>' +
                    '</div>';

                    if (saleStatusCode == 0) {
                        if (iskobo == "True") {
                            $("#ucretsizKargoDiv").html("").hide();
                            $("#ebookInfo").html("<i class=\"ico-right-arrow\"></i>Satın aldığım e-kitaplarımı <a href=\"/kobo-nasil\" target=\"_blank\" title=\"Satın aldığım e-kitaplarımı nasıl okurum?\">nasıl okurum?</a>").fadeIn().removeClass("hide-element");
                            $('#priceDiv').html(htmlPrice + cta);
                            $("#qty, #decrease, #increase").prop("disabled", true);
                        }
                        else {
                            $("#ebookInfo").html("").hide();
                            if (parseInt(salePriceReplice) >= 7500) {
                                $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>Bu üründe kargo bedava!..").fadeIn().removeClass("hide-element");
                            } else {
                                var price = $('#shippingprice').val();
                                $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>" + price + " TL ve üzeri alışverişlerinizde kargo bedava!").fadeIn().removeClass("hide-element");
                            }
                            $('#priceDiv').html(htmlPrice + cta);
                            $("#qty, #decrease, #increase").prop("disabled", false);
                        }
                        $("#statusDiv").html("");
                        $("#salePrice").html(salePrice);
                        if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                            $("#oldPrice").html(oldPrice);
                            $("#oldPriceCurrency").html(" TL");
                        }
                        else {
                            $("#oldPrice").html("");
                            $("#oldPriceCurrency").html("");
                        }
                        if (discount > 0)
                            $(".discount").html('-%' + parseInt(discount));
                        else
                            $(".discount").html("");

                        $('#priceDiv').show();
                        $('#sta1').addClass("hidden");
                        $('#sta0').removeClass("hidden");
                        $('.product-price').html('<p><span>(KDV Dahil)</span> ' + salePrice + ' TL</p>');
                    }
                    else {
                        $("#statusDiv").html('<span class="product-status active">' + statustype + '</div>');
                        $("#salePrice").html("");
                        $("#oldPrice").html("");
                        $('#hdnProductId').val("");
                        $('#sta1').removeClass("hidden");
                        $('#sta0').addClass("hidden");
                        $('#sta1').html("");
                        $('#sta1').html("<span class='product-status active'>" + statustype + "</span>").show();
                        $('#priceDiv').hide();

                    }
                    $('#hdnIsKobo').val(iskobo);
                    $('#hdnProductId').val(productId);
                    $("#firstValue").val(firstvalue + 1)
                }
            }
            else {
                var char1Val = $("input[id^='chars1_']:checked").val();
                var char2Val = $("input[id^='chars2_']:checked").val();
                var charName1 = $("input[id^='hdnChar']").data('charname1');
                var charName2 = $("input[id^='hdnChar']").data('charname2');
                if (charName2 != '') {
                    var sku = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").val();
                    $.ajax({
                        type: 'post',
                        dataType: "json",
                        async: false,
                        data: { code: sku },
                        url: '/Product/ProductDetailsVariant',
                        beforeSend: function () {

                            $("input[type=radio]").attr('disabled', true);
                        },
                        success: function (data) {
                            if (data.Status) {
                                $('#selectedId').html('');
                                $('#selectedId').html(data.Data);


                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {

                        }
                    });
                    VariantSet();
                    var salePrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("price");
                    var oldPrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("oldprice");
                    var salePriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("price").toString().replace(',', '').replace('.', '');
                    var oldPriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("oldprice").toString().replace(',', '').replace('.', '');
                    var saleStatusCode = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("salestatuscode");
                    var productId = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data("productid");
                    var statustype = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "'][data-charvalue2='" + char2Val + "']").data('statustype');
                    if (charName1 === "Renk" && charName2 === "Tür") {
                        $(".ImageZoom").attr("href", "http://i.dr.com.tr/cache/600x600-0/originals/" + sku + "-1.jpg");
                        $("#main-product-img").attr("src", "http://i.dr.com.tr/cache/500x400-0/originals/" + sku + "-1.jpg");
                    }
                }
                else {
                    var sku = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").val();
                    $.ajax({
                        type: 'post',
                        dataType: "json",
                        async: false,
                        data: { code: sku },
                        url: '/Product/ProductDetailsVariant',
                        beforeSend: function () {

                            $("input[type=radio]").attr('disabled', true);
                        },
                        success: function (data) {
                            if (data.Status) {
                                $('#selectedId').html('');
                                $('#selectedId').html(data.Data);

                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {

                        }
                    });
                    VariantSet();
                    var salePrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("price");
                    var oldPrice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("oldprice");
                    var salePriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("price").toString().replace(',', '').replace('.', '');
                    var oldPriceReplice = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("oldprice").toString().replace(',', '').replace('.', '');
                    var saleStatusCode = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("salestatuscode");
                    var productId = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("productid");
                    //var iskobo = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("charvalue1");
                    var iskobo = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data("iskobo");
                    var statustype = $("input[id^='hdnChar'][data-charvalue1='" + char1Val + "']").data('statustype');
                    if (charName1 === "Renk" && charName2 === "Tür") {
                        $(".ImageZoom").attr("href", "http://i.dr.com.tr/cache/600x600-0/originals/" + sku + "-1.jpg");
                        $("#main-product-img").attr("src", "http://i.dr.com.tr/cache/500x400-0/originals/" + sku + "-1.jpg");
                    }

                }
                var discount = 0;
                if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                    discount = 100 - Math.round((salePriceReplice * 100) / oldPriceReplice);
                }
                var cta = '<div class="cta"><a class="btn red" href="javascript:;" onclick="PrepareAndAddToBasket();">SEPETE EKLE</a><a class="btn white fancybox" href="/Themes/DR/Content/assets/partials/fiyati-dusunce-uyar.html" id="openAlarm" data-fancybox-type="ajax">FİYATI DÜŞÜNCE UYAR</a></div>';
                var htmlPrice = '<div class="prices">' +
                    '<div class="full">' +
                    '<div class="price"><span id="salePrice">' + salePrice + '</span><span class="price-currency"> TL</span></div>' +
                        '<div class="quantity">' +
                            '<input id="decrease" type="button" onclick="BtnDecrase();" value="-">' +
                            '<input id="qty" type="text" onchange="QtyChange();" value="1" />' +
                            '<input id="increase" type="button" onclick="BtnIncrease()" value="+">' +
                        '</div>' +
                    '</div>' +
                    '<div class="full">' +
                    '<div class="old-price"><span id="oldPrice">' + oldPrice + '</span><span id="oldPriceCurrency"class="price-currency"> TL</span></div>' +
                    '<span class="discount">-%' + discount + '</span>' +
                    '</div>' +
                '</div>';

                if (saleStatusCode == 0) {
                    if (iskobo == "True") {
                        $("#ucretsizKargoDiv").html("").hide();
                        $("#ebookInfo").html("<i class=\"ico-right-arrow\"></i>Satın aldığım e-kitaplarımı <a href=\"/kobo-nasil\" target=\"_blank\" title=\"Satın aldığım e-kitaplarımı nasıl okurum?\">nasıl okurum?</a>").fadeIn().removeClass("hide-element");
                        $('#priceDiv').html(htmlPrice + cta);
                        $("#qty, #decrease, #increase").prop("disabled", true);
                    }
                    else {
                        $("#ebookInfo").html("").hide();
                        if (parseInt(salePriceReplice) >= 7500) {
                            $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>Bu üründe kargo bedava!..").fadeIn().removeClass("hide-element");
                        } else {
                            var price = $('#shippingprice').val();
                            $("#ucretsizKargoDiv").html("<i class=\"ico-right-arrow\"></i>" + price + " TL ve üzeri alışverişlerinizde kargo bedava!").fadeIn().removeClass("hide-element");
                        }
                        $('#priceDiv').html(htmlPrice + cta);
                        $("#qty, #decrease, #increase").prop("disabled", false);
                    }
                    $("#statusDiv").html("");
                    $("#salePrice").html(salePrice);
                    if (parseInt(oldPriceReplice) > parseInt(salePriceReplice)) {
                        $("#oldPrice").html(oldPrice);
                        $("#oldPriceCurrency").html(" TL");
                    }
                    else {
                        $("#oldPrice").html("");
                        $("#oldPriceCurrency").html("");
                    }
                    if (discount > 0)
                        $(".discount").html('-%' + parseInt(discount));
                    else
                        $(".discount").html("");

                    $('#priceDiv').show();
                    $('#sta1').addClass("hidden");
                    $('#sta0').removeClass("hidden");
                    $('.product-price').html('<p><span>(KDV Dahil)</span> ' + salePrice + ' TL</p>');
                }
                else {
                    $("#statusDiv").html('<span class="product-status active">' + statustype + '</div>');
                    $("#salePrice").html("");
                    $("#oldPrice").html("");
                    $('#hdnProductId').val("");
                    $('#sta1').removeClass("hidden");
                    $('#sta0').addClass("hidden");
                    $('#sta1').html("");
                    $('#sta1').html("<span class='product-status active'>" + statustype + "</span>").show();
                    $('#priceDiv').hide();

                }
                $('#hdnIsKobo').val(iskobo);
                $('#hdnProductId').val(productId);
                $("#firstValue").val(firstvalue + 1)
            }
            //$(".variantRRwrapper .variantRRcontainer").clone().appendTo(".variantRRbox");
        }
        clickCount = 0;
        $("input[type=radio]").attr('disabled', false);
    
   
}
function GetSelectVariantion2() {
    var DivHtml = '';
    var charName2 = $("input[id^='hdnChar']").data('charname2');
    var char1Val = $("input[id^='chars1_']:checked").val();
    if (char1Val != '' && charName2 != '') {
        var hdnChar2List = $("input[data-charname2='" + charName2 + "'][data-charvalue1='" + char1Val + "']");
        var charName2Values = [];
        $.each(hdnChar2List, function (index, data) {
            charName2Values.push($(data).data("charvalue2"));
        });
        $.each($.unique(charName2Values), function (index, data) {
            DivHtml += '<li class="' + (index < 4 ? '' : "hide") + '">' +
                                '<input type="radio" value="' + data + '" name="' + charName2 + '" id="chars2_' + index + '" onclick="GetSelectSkuValue(\'' + data + '\')" />' +
                                '<label for="chars2_' + index + '">' + data + '</label>' +
                           '</li>';
        });
        $('#value2Div').html(DivHtml);
    }
    //$("input[id^='chars2_']:first").prop("checked", true).trigger("click");


}

//1.Varyantlar seçimine göre 2. varyantları filtreliyor
function GetSelectVariantion1() {
    var DivHtml = '';
    var charName2 = $("input[id^='hdnChar']").data('charname2');
    var char1Val = $("input[id^='chars1_']:checked").val();
    if (char1Val != '' && charName2 != '') {
        var hdnChar2List = $("input[data-charname2='" + charName2 + "'][data-charvalue1='" + char1Val + "']");
        var charName2Values = [];
        $.each(hdnChar2List, function (index, data) {
            charName2Values.push($(data).data("charvalue2"));
        });
        $.each($.unique(charName2Values), function (index, data) {
            DivHtml += '<li class="' + (index < 4 ? '' : "hide") + '">' +
                                '<input type="radio" value="' + data + '" name="' + charName2 + '" id="chars2_' + index + '" onclick="GetSelectSkuValue(\'' + data + '\')" />' +
                                '<label for="chars2_' + index + '">' + data + '</label>' +
                           '</li>';
        });
        $('#value2Div').html(DivHtml);
    }
    $("input[id^='chars2_']:first").prop("checked", true).trigger("click");


}

//Tüm varyantları göster gizle
function ShowAllVariantion1(elm) {
    if ($(elm).hasClass("open")) {
        $(elm).removeClass("open");
    }
    else {
        $(elm).addClass("open");
    }
    if ($("#value1Div > li").hasClass("active")) {
        $("#value1Div > li.hide").removeClass("active");
    }
    else {
        $("#value1Div > li.hide").addClass("active");
    }
}
function ShowAllVariantion2(elm) {
    if ($(elm).hasClass("open")) {
        $(elm).removeClass("open");
    }
    else {
        $(elm).addClass("open");
    }
    if ($("#value2Div > li").hasClass("active")) {
        $("#value2Div > li.hide").removeClass("active");
    }
    else {
        $("#value2Div > li.hide").addClass("active");
    }
}


//END: VARIANT

/* HomePageMainSlider  */
var bannerCarousel = $('.bannerCarousel');
if (bannerCarousel.length > 0) {
    bannerCarousel.carouFredSel({
        auto: 4000,
        mousewheel: true,
        width: 1930,
        height: 350,
        pagination: "#sliderPager",
        scroll: {
            items: 1,
            duration: 1000,
            pauseOnHover: true,
            fx: "cover-fade",
            easing: "swing"
        },
        swipe: {
            onMouse: true,
            onTouch: true
        }
    });
}
var bannerCount = $(".bannerCarousel a").length;
if (bannerCount > 1) {
    var mainBannerSlider = $(".mainBannerSlider");
    //var mainBannerNext = $(".mainBannerNext");
    //var mainBannerPrev = $(".mainBannerPrev");
    //var nextPrevButton = $(".mainBannerNext, .mainBannerPrev");
    //mainBannerSlider.mouseenter(function () { nextPrevButton.stop(true, true).fadeIn(500) });
    //mainBannerSlider.mouseleave(function () { nextPrevButton.stop(true, true).fadeOut(500) });
    //mainBannerNext.click(function () { bannerCarousel.trigger("next") });
    //mainBannerPrev.click(function () { bannerCarousel.trigger("prev") });
}
/* HomePageMainSlider  */
//var bannerCarousel = $('.slider');
//if (bannerCarousel.length > 0) {
//    bannerCarousel.carouFredSel({
//        auto: 4000,
//        mousewheel: true,
//        width: 930,
//        height: 350,
//        pagination: "#slider-pager",
//        scroll: {
//            items: 1,
//            duration: 1000,
//            pauseOnHover: true,
//            fx: "cover-fade",
//            easing: "swing"
//        },
//        swipe: {
//            onMouse: true,
//            onTouch: true
//        }
//    });
//}
//var bannerCount = $(".slider a").length;
//if (bannerCount > 1) {
//    var mainBannerSlider = $(".container");
//    //var mainBannerNext = $(".mainBannerNext");
//    //var mainBannerPrev = $(".mainBannerPrev");
//    //var nextPrevButton = $(".mainBannerNext, .mainBannerPrev");
//    //mainBannerSlider.mouseenter(function () { nextPrevButton.stop(true, true).fadeIn(500) });
//    //mainBannerSlider.mouseleave(function () { nextPrevButton.stop(true, true).fadeOut(500) });
//    //mainBannerNext.click(function () { bannerCarousel.trigger("next") });
//    //mainBannerPrev.click(function () { bannerCarousel.trigger("prev") });
//}


function rate(star) {
    if (star > 10 || star < 1)
        return;
    var productId = $('#hdnProductId').val();
    var url = '';
    if ($('#hdnIsKobo').length > 0 && $('#hdnIsKobo').val() == 'True')
        url = '/product/ProductRatingAddEbook?productid=' + productId + '&rating=' + star;
    else
        url = '/product/ProductRatingAdd?productid=' + productId + '&rating=' + star;

    $.ajax({
        type: 'post',
        url: url,
        success: function (data) {
            if (data.success) {
                DefaultScript.PNotify('Puan Eklendi', 'Puanlamanız başarıyla gerçekleşmiştir.', 'success');
                var rateContainer = $(".product-details .rate");
                rateContainer.attr("class", "rate");
                switch (star) {
                    case 1:
                        rateContainer.addClass("half");
                        break;
                    case 2:
                        rateContainer.addClass("one");
                        break;
                    case 3:
                        rateContainer.addClass("one-half");
                        break;
                    case 4:
                        rateContainer.addClass("two");
                        break;
                    case 5:
                        rateContainer.addClass("two-half");
                        break;
                    case 6:
                        rateContainer.addClass("three");
                        break;
                    case 7:
                        rateContainer.addClass("three-half");
                        break;
                    case 8:
                        rateContainer.addClass("four");
                        break;
                    case 9:
                        rateContainer.addClass("four-half");
                        break;
                    case 10:
                        rateContainer.addClass("five");
                        break;
                }
                dataLayer.push({ 'Category': 'Ürün Detay', 'Action': 'Puan Ver', 'Label': 'Puan Ver', 'event': 'gaEvent' });
            }
            else {
                if (data.code === 1)
                    DefaultScript.PNotify('Hata', 'Ürün aktif satıştan kaldırılmıştır. Puan eklenemez.', 'error');
                else if (data.code === 2)
                    window.location.href = '/login?ReturnUrl=' + window.location.pathname;
                    //DefaultScript.PNotify('Hata : Üye Girişi', 'Bu özellikten yararlanmak için üye girişi yapmanız gerekmektedir.', 'error');
                else if (data.code === 3)
                    DefaultScript.PNotify('Hata', 'Geçerli bir puanlama değeri giriniz.', 'error');
                else if (data.code === 5)
                    DefaultScript.PNotify('Hata', 'Daha önce bu ürün puanlama yapmışsınız.', 'error');
                else
                    DefaultScript.PNotify('Hata', 'Beklenmeyen bir hata ile karşılaşıldı. Lütfen daha sonra tekrar deneyiniz.', 'error');
            }
        }
    });
}

/* ---------------- CUSTOM -------------------- */

var DefaultScript = (function () {

    var def = {};
    def.Lightscreen = function (url, isShow) {
        $("body").append('<div class="loginPopUp"></div><div class="lightscreen3"></div>');
        var lightscreen3 = $(".lightscreen3");
        var loginPopUp = $(".loginPopUp");
        lightscreen3.fadeIn(250);
        def.ShowIndicator("", ".paymentsCont");
        loginPopUp.load(url, function (response, status, xhr) {
            loginPopUp.css("margin-left", "-" + (loginPopUp.width() / 2) + "px");
            if (isShow == false) {
                $(".close").hide();
                return;
            }
            var close = $(".loginPopUp .close");
            close.click(function () {
                lightscreen3.fadeOut(250).remove();
                loginPopUp.fadeOut(250).remove();
            });
            def.HideIndicator(".paymentsCont");
        });
    };
    def.ShowIndicator = function (text, id) {
        var pageElement = arguments.length == 1 ? $('body') : (typeof id == "object") ? id : $(id);
        pageElement.block({ message: "<h2>" + text + "</h2>" });

    };
    def.HideIndicator = function (id) {
        var pageElement = arguments.length == 0 ? $('body') : (typeof id == "object") ? id : $(id);
        pageElement.unblock();
    };
    def.PNotify = function (title, text, types) {
        var Class = "";
        //switch (types) {
        //    case "success": Class = " jgrowlSuccess"; break;
        //    case "warning": Class = " jgrowlWarning"; break;
        //    default: Class = " jgrowlError";
        //}
        switch (types) {
            case "success": Class = " success"; break;
            case "warning": Class = " fail"; break;
            case "alert": Class = " alert"; break;
            case "clearInfo": Class = " clearInfo"; break;
            default: Class = " fail";
        }

        if (title != '')
            core.widgets.notify({ type: Class, title: title, message: text, href: "/Themes/DR/Content/assets/partials/notification.html" });
        else
            core.widgets.notify({ type: Class, message: text, href: "/Themes/DR/Content/assets/partials/notification.html" });
        // text = '<div class="jgrowlCustom' + Class + '"><span class="head">UYARI</span><div class="text"><div><span class="arrow"></span><span>' + text + '</span></div></div></div>';
        //text = '<div class="item-added ' + Class + '"><figure></figure><h3>' + text + '</h3></div>';

        //if (!$('.jGrowl-notification').is(':visible')) {
        //    $("body").append('<div class="lightscreen2"></div>');
        //    var lightscreen2 = $(".lightscreen2");
        //    lightscreen2.fadeIn(250);
        //    $.jGrowl(text, {
        //        life: 1500,
        //        close: function (e, m) {
        //            lightscreen2.fadeOut(250).remove();
        //        },
        //        afterOpen: function (e, m, o) {
        //            $(e).click(function () {
        //                $(e).children("div.jGrowl-close").trigger('click');
        //            });
        //            $('.lightscreen2').click(function () {
        //                $(e).children("div.jGrowl-close").trigger('click');
        //            })
        //        }
        //    });
        //}
    };
    def.closeButton = function () {
        $(".Inside a.close").click(function () {
            $("#OrderBox").hide();
        });
    }
    def.checkEmail = function (txt) {

        var email = jQuery('#' + txt).val();
        if (email == "") return true;
        var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) {
            jQuery('#' + txt).focus();
            return false;
        }
        return true;
    }
    def.reloadWidget = function (divId, url, data) {

        if (jQuery('#' + divId).length == 0) return;
        def.ShowIndicator('yükleniyor', divId);
        jQuery.ajax({
            type: 'post', data: data, url: url, success: function (data) {
                if (jQuery('#' + divId).length > 0) {
                    jQuery('#' + divId).html(data);
                    def.HideIndicator(divId);
                }
            },
            error: function (request, error) {
                def.HideIndicator(divId);
                if (request.status == 500) {
                    var urlx = "/Customers/Home/MyOrders?";
                    $(location).attr('href', urlx);
                }
            }

        });

    }
    def.htmlEncode = function (value) {
        return $('<div/>').text(value).html();
    };
    def.htmlDecode = function (value) {
        return $('<div/>').html(value).text();
    };
    def.IsSpace = function (evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode

        if (charCode == 32)
            return false;

        return true;
    };
    def.IsNumeric = function (evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

        return true;
    };
    def.IsNumericSpinner = function (evt) {
        return true;
    };
    def.IsDecimal = function (evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 44)
            return false;

        if ((evt.target.value.indexOf(',') > 0) && (charCode == 44))
            return false;

        return true;
    };
    def.IsEmpty = function (StrToCheck) {
        StrToCheck = StrToCheck.replace(/^\s+|\s+$/, '');
        if (StrToCheck.length == 0)
            return true;
        else
            return false;
    };
    return {
        Lightscreen: def.Lightscreen,
        ShowIndicator: def.ShowIndicator,
        HideIndicator: def.HideIndicator,
        PNotify: def.PNotify,
        CheckEmail: def.checkEmail,
        ReloadWidget: def.reloadWidget,
        htmlEncode: def.htmlEncode,
        htmlDecode: def.htmlDecode,
        IsNumeric: def.IsNumeric,
        IsDecimal: def.IsDecimal,
        IsEmpty: def.IsEmpty,
        IsSpace: def.IsSpace,
        CloseButton: def.closeButton,
        IsNumericSpinner: def.IsNumericSpinner
    }
}
());
$('#addToAlarmButton').live('click', function () {
    if ($('#price-set').val() == "") {
        $('#price-set').addClass('error');
        return;
    }
    if ($('#date-set').val() == "") {
        $('#date-set').addClass('error');
        return;
    }
    var day = parseInt($('#date-set').val());
    var price = parseInt($('#price-set').val());
    if (day <= 0) {
        $('#date-set').addClass('error');
        return;
    }
    if (price <= 0) {
        $('#price-set').addClass('error');
        return;
    }
    var varId = $('#hdnProductId').val();
    var qty = parseInt($('#qty').val());
    var iskobo = $('#hdnIsKobo').val();
    if (iskobo == 'True') {
        AddEbookToBasket(varId, 6, price, day);
    }
    else {
        AddToBasket(varId, qty, 3, price, day);
    }
    //$.fancybox.close();
});
$('#btnContactUs').click(function () {

    if ($('#e-posta').length <= 0 || !$('#e-posta').val()) {
        DefaultScript.PNotify("Hata", "E-posta boş bırakılamaz.", "error");
        return;
    }
    if ($('#ad').length <= 0 || !$('#ad').val()) {
        DefaultScript.PNotify("Hata", "Ad boş bırakılamaz.", "error");
        return;
    }
    if ($('#soyad').length <= 0 || !$('#soyad').val()) {
        DefaultScript.PNotify("Hata", "Soyad boş bırakılamaz.", "error");
        return;
    }
    if ($('#sorun').length <= 0 || !$('#sorun').val()) {
        DefaultScript.PNotify("Hata", "Konu boş bırakılamaz.", "error");
        return;
    }
    if ($('#message').length <= 0 || !$('#message').val()) {
        DefaultScript.PNotify("Hata", "Yorum boş bırakılamaz.", "error");
        return;
    }
    var orderNo = "";
    if ($('#orderNoInput').val() != undefined)
        orderNo = $('#orderNoInput').val();
    else
        orderNo = $('#orderNo').val();

    var contactUsAsync = {
        Email: $('#e-posta').val(),
        Enquiry: $('#message').val(),
        Name: $('#ad').val(),
        LastName: $('#soyad').val(),
        Topic: $('#sorun option[selected="selected"]').text(),
        OrderNo: orderNo,
    };

    $.post('/common/contactUsAsync', contactUsAsync, function (data) {
        if (data.success) {
            DefaultScript.PNotify("Mesajınız alındı", data.message, "success");
            $('#e-posta').val("");
            $('#ad').val("");
            $('#soyad').val("");
            //$('#orderNo').val("");
            $('#orderNoInput').val("");
            $('#message').val("");
        }
        else {
            DefaultScript.PNotify("Hata", data.message, "error");
        }
    });

});

function isLoggedIn() {
    var retValue = false;
    $.ajax({
        url: '/customer/IsLoggedIn',
        method: 'POST',
        async: false,
        success: function (data) {
            retValue = data;
        }
    });
    return retValue;
}

function AddEbookToBasket(productId, type, customPrice, dayRange) {
    //sepete ekle denildiğinde search-suggests active class'ı devre dışı olacak
    $(".search-bar input[type=text]").val('');
    $('.search-suggests ul').html('');
    core.widgets.searchBar.hideSuggests();


    var qty = 1;
    var type = type || 4;
    var customPrice = customPrice || 0;
    var dayRange = dayRange || 0;
    var url = '';
    var add_basket_product = "";
    if (type == 4)
        url = '/addbooktocart/catalog/' + productId;
    else if (type == 5)
        url = '/addbooktocart/catalog/' + productId + '/' + type;
    else if (type == 6)
        url = '/addbooktocart/catalog/' + productId + '/' + type + '/' + customPrice + '/' + dayRange;

    $.ajax({
        type: 'post',
        url: url,
        success: function (data) {
            if (data.success) {
                core.widgets.notify({ type: "success", message: data.message, href: "/Themes/DR/Content/assets/partials/notification.html" });
                //#gtm takip
                dataLayer.push({ 'Category': 'Ürün Detay', 'Action': 'Sepete Ekle', 'Label': 'Product Detail', 'event': 'gaEvent' });
                dataLayer.push({
                    'Category': 'Enhanced Ecommerce',
                    'Action': 'Browse',
                    'Label': 'Add to Cart',
                    'Value': 0,
                    'noninteraction': false,
                    'ecommerce': {
                        'currencyCode': 'TRY',
                        'add': {
                            'products': add_basket_product
                        }
                    },
                    'event': 'eeEvent'
                });
                //DefaultScript.PNotify('', 'Ürün başarıyla sepetinize eklendi.', 'success');

                $(".items-count").html(data.updatetopcartsectionhtml);
                $(".head-cart").remove();
                $(".head-menu").append(data.updateflyoutcartsectionhtml);
            }
            else {
                core.widgets.notify({ type: "fail", message: data.message, href: "/Themes/DR/Content/assets/partials/notification.html" });
                //DefaultScript.PNotify('', data.message, 'error'); return;
            }
        }
    });
};
function AddToBasket(variationId, quantity, type, customPrice, dayRange) {
    //sepete ekle denildiğinde search-suggests active class'ı devre dışı olacak
    $(".search-bar input[type=text]").val('');
    $('.search-suggests ul').html('');
    core.widgets.searchBar.hideSuggests();

    var qty = quantity || 1;
    var type = type || 1;
    var customPrice = customPrice || 0;
    var dayRange = dayRange || 0;
    var add_basket_product = "";
    $.ajax({
        type: 'post',
        url: '/addproducttocart/catalog/' + variationId + '/' + type + '/' + qty + '/' + customPrice + '/' + dayRange,
        success: function (data) {
            $(".items-count").html(data.updatetopcartsectionhtml);
            if (data.success) {
                if (type === 2) {
                    core.widgets.notify({ type: "success", message: "Ürün favorilerinize eklendi.", href: "/Themes/DR/Content/assets/partials/notification.html" });
                    dataLayer.push({ 'Category': 'Ürün Detay', 'Action': 'Favorilerime Ekle', 'Label': 'Favorilerime Ekle', 'event': 'gaEvent' });
                    //DefaultScript.PNotify('', 'Ürün favorilerinize eklendi.', 'success');
                } else if (type == 3) {
                    core.widgets.notify({ type: "success", message: "Ürün alarm listenize eklendi.", href: "/Themes/DR/Content/assets/partials/notification.html" });
                    //DefaultScript.PNotify('', 'Ürün alarm listenize eklendi.', 'success');
                    dataLayer.push({ 'Category': 'Ürün Detay', 'Action': 'Fiyatı Düşünce Uyar', 'Label': 'Fiyatı Düşünce Uyar', 'event': 'gaEvent' });
                }
                else {
                    core.widgets.notify({ type: "success", message: data.message, href: "/Themes/DR/Content/assets/partials/notification.html" });
                    //#gtm takip
                    dataLayer.push({ 'Category': 'Ürün Detay', 'Action': 'Sepete Ekle', 'Label': 'Product Detail', 'event': 'gaEvent' });
                    dataLayer.push({
                        'Category': 'Enhanced Ecommerce',
                        'Action': 'Browse',
                        'Label': 'Add to Cart',
                        'Value': 0,
                        'noninteraction': false,
                        'ecommerce': {
                            'currencyCode': 'TRY',
                            'add': {
                                'products': add_basket_product
                            }
                        },
                        'event': 'eeEvent'
                    });
                    //DefaultScript.PNotify('', 'Ürün başarıyla sepetinize eklendi.', 'success');
                }
                //$(".items-count").html(data.updatetopcartsectionhtml);
                //$(".head-cart").remove();
                //$(".head-menu").append(data.updateflyoutcartsectionhtml);
            }
            else {
                core.widgets.notify({ type: "fail", message: data.message, href: "/Themes/DR/Content/assets/partials/notification.html" });
                //DefaultScript.PNotify('', data.message, 'error'); return;
            }
        }
    });
};
function AddToBasketForShoppingCart(variationId, quantity, type, customPrice, dayRange) {
    var qty = quantity || 1;
    var type = type || 1;
    var customPrice = customPrice || 0;
    var dayRange = dayRange || 0;
    var add_basket_product = "";
    if (type == 3 && dayRange > 365 && customPrice > 99999) {
        core.widgets.notify({ type: "error", message: "Tarih alanÄ±nÄ±n 365 den kÃ¼Ã§Ã¼k ve fiyat alanÄ±nÄ±n 99,999 dan kÃ¼Ã§Ã¼k olmasÄ± gerekiyor." });
    }
    $.ajax({
        type: 'post',
        url: '/addproducttocart/catalog/' + variationId + '/' + type + '/' + qty + '/' + customPrice + '/' + dayRange,
        success: function (data) {
            if (data.success) {
                location.reload();
            }

        }
    });
};

//#gtm takip kodu
function eventClick(elm) {
    var dataId = $(elm).data('id');
    if (dataId == "uye-girisi-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Üye Girişi', 'Label': 'Üye Girişi', 'event': 'gaEvent' });
    }
    else if (dataId == "sepetim-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Sepetim', 'Label': 'Sepetim', 'event': 'gaEvent' });
    }
    else if (dataId == "kitap-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Kitap', 'event': 'gaEvent' });
    }
    else if (dataId == "ekitap-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'E-Kitap', 'event': 'gaEvent' });
    }
    else if (dataId == "film-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Film', 'event': 'gaEvent' });
    }
    else if (dataId == "muzik-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Müzik', 'event': 'gaEvent' });
    }
    else if (dataId == "elektronik-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Elektronik', 'event': 'gaEvent' });
    }
    else if (dataId == "oyunkonsol-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Oyun & Konsol', 'event': 'gaEvent' });
    }
    else if (dataId == "kirtasiye-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Kırtasiye', 'event': 'gaEvent' });
    }
    else if (dataId == "kisisel-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Kişisel Ürün', 'event': 'gaEvent' });
    }
    else if (dataId == "sporoutdoor-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Spor & Outdoor', 'event': 'gaEvent' });
    }
    else if (dataId == "hobioyuncak-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Hobi & Oyuncak', 'event': 'gaEvent' });
    }
    else if (dataId == "kampanya-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Kampanyalar', 'event': 'gaEvent' });
    }
    else if (dataId == "magazaetkinlik-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Mağaza Etkinlikleri', 'event': 'gaEvent' });
    }
    else if (dataId == "drhakkinda-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Diğer Alanlar', 'Label': 'D&R Hakkında', 'event': 'gaEvent' });
    }
    else if (dataId == "drcard-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'D&R Card', 'event': 'gaEvent' });
    }
    else if (dataId == "magazaetkinlikfooter-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Mağaza Etkinlikleri', 'event': 'gaEvent' });
    }
    else if (dataId == "kampanyafooter-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Kampanyalar', 'event': 'gaEvent' });
    }
    else if (dataId == "magazalarfooter-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'D&R Mağazalar', 'event': 'gaEvent' });
    }
    else if (dataId == "mobiluygulamalar-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Mobil Uygulamalar', 'event': 'gaEvent' });
    }
    else if (dataId == "yardim-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Yardım / SSS', 'event': 'gaEvent' });
    }

    else if (dataId == "islem-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'İşlem Rehberi', 'event': 'gaEvent' });
    }

    else if (dataId == "hediye-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'Sanal Hediye Kartı', 'event': 'gaEvent' });
    }

    else if (dataId == "iletisim-click") {
        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Kategori Tıklanması', 'Label': 'İletişim', 'event': 'gaEvent' });
    }
    else if (dataId == "azalan-fiyat-click") {
    }
}

$(".selectBox-dropdown-menu li a").click(function () {
    var relThis = $(this).attr("rel");
    if (relThis == "price,desc") {
        dataLayer.push({ 'Category': 'Ürün Listeleme', 'Action': 'Sırala', 'Label': 'Fiyata Göre Azalan', 'event': 'gaEvent' });
    }
    else if (relThis == "price,asc") {
        dataLayer.push({ 'Category': 'Ürün Listeleme', 'Action': 'Sırala', 'Label': 'Fiyata Göre Artan', 'event': 'gaEvent' });
    }
    else if (relThis == "soldcount,desc") {
        dataLayer.push({ 'Category': 'Ürün Listeleme', 'Action': 'Sırala', 'Label': 'En Çok Satan', 'event': 'gaEvent' });
    }
    else if (relThis == "newness,desc") {
        dataLayer.push({ 'Category': 'Ürün Listeleme', 'Action': 'Sırala', 'Label': 'Yeni', 'event': 'gaEvent' });
    }
    else if (relThis == "newness,asc") {
        dataLayer.push({ 'Category': 'Ürün Listeleme', 'Action': 'Sırala', 'Label': 'Eski', 'event': 'gaEvent' });
    }
    else if (relThis == "name.sortable,asc") {
        dataLayer.push({ 'Category': 'Ürün Listeleme', 'Action': 'Sırala', 'Label': 'A-Z', 'event': 'gaEvent' });
    }
    else if (relThis == "name.sortable,desc") {
        dataLayer.push({ 'Category': 'Ürün Listeleme', 'Action': 'Sırala', 'Label': 'Z-A', 'event': 'gaEvent' });
    }
    else if (relThis == "commentcount,desc") {
        dataLayer.push({ 'Category': 'Ürün Listeleme', 'Action': 'Sırala', 'Label': 'En Çok Yorum Alan', 'event': 'gaEvent' });
    }
});
$(".mediaTypeControl-selectBox-dropdown-menu li a, .priceControl-selectBox-dropdown-menu li a").click(function () {
    dataLayer.push({ 'Category': 'Ürün Listeleme', 'Action': 'Filtre', 'Label': 'Medya Cinsi, Fiyat veya Marka', 'event': 'gaEvent' });
});
$(".todaysDeal a").click(function () {
    var gununFirsati = $(this).attr("title");
    dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Carousel', 'Label': '' + gununFirsati + '', 'event': 'gaEvent' });
});
$(".slider .item a").click(function () {
    var anasayfaBanner = $(this).attr("title");
    dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Üst Kampanya Alanı', 'Label': '' + anasayfaBanner + '', 'event': 'gaEvent' });
});
$(".full-banner-container .item a").click(function () {
    var anasayfaAltBanner = $(this).attr("title");
    dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Alt Kampanya Alanı ', 'Label': '' + anasayfaAltBanner + '', 'event': 'gaEvent' });

});

//#gtm takip kodu

$("input#name, input#surname, input#surNameField").bind("propertychange change click keyup input paste", function () {
    if (/(.)\1\1/.test($(this).val())) {
        $(this).css("border-color", "red");
        if ($(this).parent().find('span').hasClass("_warning")) {
        } else {
            $(this).parent().append('<span class="_warning" style="color: red; font-size: 12px; float: right; margin-top: 10px;">Lütfen geçerli bir  ' + $(this).parent().find("label").text() + ' giriniz.</span>');
        };
    } else {
        $(this).css("border-color", "#ebebeb");
        $(this).parent().find('span._warning').remove();
    };
});


$(document).ready(function () {

    


});

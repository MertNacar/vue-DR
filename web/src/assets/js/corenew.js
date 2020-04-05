$.fn.exists = function (callback) {
    if (this.length) {
        callback(this);
    }
};


$.fn.tabThis = function (args) {
    var _this = this;
    _this.find(".tab-content").eq(0).addClass("active");

    var _tabs = _this.find("ul.tabs").first().find("li");
    _tabs.find("a").on("click", function (e) {
        e.preventDefault();
    });


    //setMobileSelector();
    fadeAllIn();

    function fadeAllIn() {
        var timeout = 0;
        _this.find(".tab-content.active .cell").each(function (i) {
            timeout = i * 50;
            var that = this;
            setTimeout(function () {
                $(that).addClass("active");
            }, timeout);
        });
    }

    function fadeAllOut(callback) {
        var timeout = 0;
        _this.find(".tab-content .cell").each(function (i) {
            timeout = i * 50;
            var that = this;
            setTimeout(function () {
                $(that).removeClass("active");
            }, timeout);
        });
        setTimeout(callback, timeout);
    }

    function setMobileSelector() {
        var select = '<select class="mobileTab">';
        _tabs.each(function () {
            select += '<option value="' + $(this).index() + '"';
            //if($(this).hasClass("active")){
            //	select += ' selected="selected" '
            //}
            select += '>' + $(this).text() + '</option>';
        });
        select += '</select>';
        _this.find(".tabs").before(select);
        _this.find(".mobileTab").selectBox({
            mobile: true
        });
    }

    function changeTab(tabIndex, device) {
        _this.find(".tabs li a").removeClass("active");
        var selectedTab = _this.find(".tabs li").eq(tabIndex);
        selectedTab.find("a").addClass("active");


        var currentTab = selectedTab.parent("ul").siblings(".tab-content");
        var nextTab = selectedTab.parent("ul").siblings(".tab-content").eq(tabIndex);

        if (device !== "mobile") {
            //_this.find(".mobileTab option").removeAttr("selected");
            _this.find(".mobileTab").selectBox("value", tabIndex);
        }

        currentTab.removeClass("active");
        nextTab.addClass("active");
        nextTab.find(".tabs li").eq(0).addClass("active");
        nextTab.find(".tab-content").removeClass("active");
        nextTab.find(".tab-content").eq(0).addClass("active");


        core.screen.resize();

        _this.trigger("afterTabChange");
    }

    _this.find("ul.tabs").first().find("li").click(function () {
        if (!$(this).hasClass("deactive")) {
            changeTab($(this).index());
        }
    });
    _this.find(".mobileTab").eq(0).on("change", function () {
        changeTab($(this).val(), "mobile");
    });
};

$.fn.charCount = function (count) {
    var _this = $(this);
    _this.each(function () {
        var _that = $(this);
        _that.parent().append("<span class='chars-left'></span>");
        _that.unbind("keyup").keyup(function () {
            check(_that);
        });
        _that.unbind("change").change(function () {
            check(_that);
        });
        var check = function (el) {
            el.max = count;
            el.len = el.val().length;
            if (el.len > el.max) {
                el.val(el.val().substring(0, el.max));
            } else {
                el.charsLeft = el.max - el.len;
            }
            el.parent().find(".chars-left").html(el.charsLeft);
        }
    });
};

//her hangi bir yere tıklandığında searchInput içi boşalacak.
$('.stage').click(function () {
    $(".searchInput").val("")
});


(function (window) {
    var core = {
        init: function () {
            core.widgets.categorySwitch();
            core.widgets.setMobileCellInteraction();
            core.widgets.searchBar.setMobileSearch();
            core.widgets.headerCartLink.set();
            core.widgets.setCustomSelects();
            core.widgets.map.set();
            //core.widgets.toggleCommentForm();
            core.widgets.setAccordion();
            core.widgets.customCheckRadio();
            core.widgets.makeGiftPack();
            $(".sc-container").exists(core.widgets.setSubCategoriesList);
            core.widgets.toggleProductFixedCTA();
           // core.widgets.setRate();
            //core.widgets.checkAuthorPic();
            //core.widgets.focusCommentForm();
            //core.widgets.setProductCardCTA();
            core.widgets.setPDFviewer();
            core.widgets.priceReplacer();

            core.screen.resize();
            core.screen.scroll();
            core.screen.load();
            core.widgets.setMultiselect();



            $(".info,.tooltipDefault").exists(function () {
                $(".info").tooltipster({
                    animation: 'fade',
                    delay: 100,
                    theme: 'my-custom-theme',
                    trigger: 'hover',
                    position: "right"
                });
                $(".tooltipDefault").tooltipster({

                    animation: 'fade',
                    delay: 100,
                    theme: 'my-custom-theme',
                    trigger: 'hover',
                    position: "right"
                });
            });

            $(".fancybox").exists(function () {
                $(".fancybox").fancybox({
                    padding: 0,
                });
            });
            $(".ImageZoom").exists(function () {
                $(".ImageZoom").fancybox({
                    padding: 0,
                    beforeLoad: function () {
                        dataLayer.push({ 'Category': 'Ürün Detay', 'Action': 'Resmi Büyüt', 'Label': 'Resmi Büyüt', 'event': 'gaEvent' });
                    }
                });
            });
            $(".fancyboxAuto").fancybox({
                type: 'iframe',
                autoSize: true,
                padding: 0
            });
            $(".tabbedSection").each(function () {
                $(this).tabThis();
            });

            $(".user-landing").exists(function () {
                var highest = 0;
                $(".user-landing .half").each(function () {
                    if ($(this).height() > highest) {
                        highest = $(this).height();
                    }
                });
                $(".user-landing .half .content").height(highest);
            });


            $(".stage .slider").exists(function () {
                $(".stage .slider").owlCarousel({
                    autoPlay: 3000,
                    items: 1,
                    nav: true,
                    dots: true,
                    loop: true,
                    lazyLoad: true,
                    onChange: callback,
                    autoplay: true,
                    singleItem: true,
                    navText: ["", ""],
                    onRefresh: function (event) {
                        if ($('.owl-carousel .item').length <= 1) {
                            this.settings.loop = false;
                        }
                    },
                });
                //GTM Takip
                $(".stage .slider .owl-stage").children().each(function (i) {
                    var index = i;
                    $(this).attr("data-position", index);

                });
                var sectionheight = new Array(); //set empty array
                $("#rrHomeShow .container .row .cell .content").each(function () { //get all div elements
                    var value = $(this).height(); //get div height
                    sectionheight.push(value); //write height to array
                });
                var newsectionheight = Math.max.apply(Math, sectionheight); //get largest value in array
                $('#rrHomeShow .container .row .cell .content').height(newsectionheight); //set height of all elements to largest

                function callback() {
                    setTimeout(function () {
                        dataLayer.push({
                            'ecommerce': {
                                'promoView': {
                                    'promotions': [
                                    {
                                        'id': $(".slider .owl-item.active a").data("id"),
                                        'name': $(".slider .owl-item.active a").attr("title"),
                                        'creative': 'Anasayfa Carousel',
                                        'position': $(".slider .owl-item.active").data("position")
                                    }]
                                }
                            },
                            'Category': 'Enhanced Ecommerce',
                            'Action': 'Browse',
                            'Label': 'Promotion Impressions',
                            'Value': 0,
                            'noninteraction': true,
                            'event': 'eeEvent'
                        });
                    }, 100);
                }
                $(".stage .slider").on('click', '.owl-item', function (event) {
                    var $this = $(this);
                    $this.addClass('clicked');
                    if ($this.hasClass('clicked') && !$this.hasClass("cloned")) {
                        dataLayer.push({
                            'ecommerce': {
                                'promoClick': {
                                    'promotions': [
                                    {
                                        'id': $(".slider .owl-item.active a").data("id"),
                                        'name': $(".slider .owl-item.active a").attr("title"),
                                        'creative': 'Anasayfa Carousel',
                                        'position': $(".slider .owl-item.active").data("position")
                                    }]
                                }
                            },
                            'Category': 'Enhanced Ecommerce',
                            'Action': 'Browse',
                            'Label': 'Promotion Click',
                            'Value': 0,
                            'noninteraction': true,
                            'event': 'eeEvent'
                        });
                        $this.removeClass('clicked');
                    }
                });
            });
            $(".stage #categorySlider").exists(function () {
                $(".stage #categorySlider").owlCarousel({
                    autoPlay: 3000,
                    items: 1,
                    nav: true,
                    dots: true,
                    loop: true,
                    autoplay: true,
                    onChange: callback,
                    navText: ["", ""],
                    onRefresh: function (event) {
                        if ($('.owl-carousel .item').length <= 1) {
                            this.settings.loop = false;
                        }
                    },
                });

                //GTM Takip
                $(".stage #categorySlider .owl-stage").children().each(function (i) {
                    var index = i;
                    $(this).attr("data-position", index);

                });
                function callback() {
                    setTimeout(function () {
                        dataLayer.push({
                            'ecommerce': {
                                'promoView': {
                                    'promotions': [
                                    {
                                        'id': $("#categorySlider .owl-item.active a").data("id"),
                                        'name': $("#categorySlider .owl-item.active a").attr("title"),
                                        'creative': '' + $("h1").text() + ' Carousel',
                                        'position': $("#categorySlider .owl-item.active").data("position")
                                    }]
                                }
                            },
                            'Category': 'Enhanced Ecommerce',
                            'Action': 'Browse',
                            'Label': 'Promotion Impressions',
                            'Value': 0,
                            'noninteraction': true,
                            'event': 'eeEvent'
                        });
                    }, 100);
                }
                $(".stage #categorySlider").on('click', '.owl-item', function (event) {
                    var $this = $(this);
                    $this.addClass('clicked');
                    if ($this.hasClass('clicked') && !$this.hasClass("cloned")) {
                        dataLayer.push({
                            'ecommerce': {
                                'promoClick': {
                                    'promotions': [
                                    {
                                        'id': $("#categorySlider .owl-item.active a").data("id"),
                                        'name': $("#categorySlider .owl-item.active a").attr("title"),
                                        'creative': '' + $("h1").text() + ' Carousel',
                                        'position': $("#categorySlider .owl-item.active").data("position")
                                    }]
                                }
                            },
                            'Category': 'Enhanced Ecommerce',
                            'Action': 'Browse',
                            'Label': 'Promotion Click',
                            'Value': 0,
                            'noninteraction': true,
                            'event': 'eeEvent'
                        });
                        $this.removeClass('clicked');
                    }
                });
            });
            $(".update-password-switch").exists(core.widgets.showPassUpdateForm);
        },
        screen: {
            checkWidth: function () {
                return $(window).width();
            },
            resize: function () {
                $(window).on("resize", function () {
                    core.widgets.searchBar.setMobileSearch();
                    //$(".sc-container").exists(core.widgets.setSubCategoriesList);
                });
            },
            scroll: function () {
                $(window).on("scroll", function () {
                    core.widgets.toggleProductFixedCTA();
                });
            },
            load: function () {
                $(window).on("load", function () {
                    core.widgets.priceReplacer();
                });

            }
        },
        widgets: {
            categorySwitch: function () {
                $("body").on("click", function (e) {
                    if ($(".category-tab").hasClass("active") && $(e.target).closest(".categories").length == 0) {
                        $(".categories, .category-tab").removeClass("active");
                    } else if ($(e.target).closest(".category-tab").length == 1) {
                        var height = $("header").height();
                        $(".categories, .category-tab").addClass("active");
                        $(".categories.active").css("top", height)
                        dataLayer.push({ 'Category': 'Anasayfa', 'Action': 'Menü', 'Label': 'Menü Tıklanması', 'event': 'gaEvent' });
                    }
                });
            },
            setMultiselect: function () {
                $(".multiselect").each(function () {
                    $(this).on("click", function (e) {
                        if (!$(e.target).hasClass("option")) {
                            $(".multiselect").not(this).removeClass("active");
                            $(this).toggleClass("active");
                        }
                    });
                });
                $(window).on("click", function (e) {
                    if (
						!$(e.target).hasClass("option")
						&& !$(e.target).hasClass("multiselect")
						&& !$(e.target).hasClass("ms-label")
					) {
                        $(".multiselect").removeClass("active");
                    }
                });
            },
            setMobileCellInteraction: function () {
                $(".shelf .cell").on("click", function () {
                    $(".shelf .cell").removeClass("hover");
                    $(this).addClass("hover");
                });
                $(".shelf .cell").on("mouseout", function () {
                    $(".shelf .cell").removeClass("hover");
                });
            },
            priceReplacer: function () {
                $("span.price, span.old-price").each(function () {
                    $(this).html($(this).html().replace(/\./g, ','));
                });
            },
            searchBar: {
                showSuggests: function () {
                    $(".search-bar .search-suggests").addClass("active");
                    //$(".categories, .category-tab").removeClass("active");
                    core.widgets.headerCartLink.hide();
                },
                hideSuggests: function () {
                    $(".search-suggests").removeClass("active");
                },
                setMobileSearch: function () {

                    function mobileSearchOpen () {
                        $(".category-tab").hide();
                        $(".search-bar").addClass("mobile-full");
                        $("#menuSrc").css("display", "none");
                        $("#menuCls").css("display", "inline-block");
                    }
                    function mobileSearchClose() {
                        $(".category-tab").show();
                        $(".search-bar").removeClass("mobile-full");
                        $("#menuSrc").css("display", "inline-block");
                        $("#menuCls").css("display", "none");
                        $(".searchInput").val("");
                        core.widgets.searchBar.hideSuggests();
                    }
                    if (!$(".search-bar").hasClass("mobile-full") && core.screen.checkWidth() < 768) {
                        $(".search-bar").on("click", function (e) {
                         if (!$(e.target).hasClass('icon-close')) {
                            mobileSearchOpen();
                           }
                        });
                    }
                    if (core.screen.checkWidth() < 768) {
                        $("body").on('click', function (event) {
                            if (!$(event.target).closest('.search-bar').length) {
                                mobileSearchClose();
                            }
                        });
                        $("#menuCls").click(function () {
                            mobileSearchClose();
                        });
                    }
                }
            },

            showFilterSuggests: function () {
                $(".filter-search .search-suggests").addClass("active");
            },
            hideFilterSuggests: function () {
                $(".filter-search .search-suggests").removeClass("active");
            },
            headerCartLink: {
                set: function () {
                    $(".head-menu .sepet a").on("click", function (e) {
                        core.widgets.searchBar.hideSuggests();
                        e.preventDefault();
                    });

                    $("body").on("click", function (e) {
                        if ($(e.target).hasClass('head-cart')) {
                            return false;
                        }
                        else if ($(e.target).closest(".head-cart").length <= 0 &&
								!$(e.target).parent().hasClass("sepet")) {
                            core.widgets.headerCartLink.hide();
                        }
                    });

                    $(".head-menu .sepet").on("click", function () {
                        if ($(".head-cart").hasClass("active")) {
                            core.widgets.headerCartLink.hide();
                        } else {
                            $(".search-bar input[type=text]").val('');
                            $('.search-suggests ul').html('');
                            core.widgets.searchBar.hideSuggests();
                            core.widgets.headerCartLink.show();
                        }
                    });


                },
                hide: function () {
                    $(".head-cart").removeClass("active");
                },
                show: function () {
                    $(".head-cart").addClass("active");
                    $.ajax({
                        async: true,
                        type: 'POST',
                        cache: false,
                        url: '/ShoppingCart/GetMiniShoppingCart',
                        beforeSend: function () {
                            core.widgets.searchBar.hideSuggests();
                            core.widgets.loadingSmall(".head-cart");
                        },
                        success: function (data) {
                            if (data.success) {
                                $(".head-cart").remove();
                                $(".head-menu").append(data.updateflyoutcartsectionhtml);
                                //$(".head-cart").addClass("active");
                                $.fancybox.close();
                            }
                        },
                        complete: function () {
                            $(".drLoading").remove();
                        },
                        error: function (request, status, error) { DefaultScript.PNotify('', "Hata!", 'error'); }
                    });

                }
            },
            setCustomSelects: function () {
                $("select.custom").exists(function (elem) {
                    $("select.custom").selectBox({
                        mobile: true,
                        keepInViewport: false
                    });
                });
            },
            //toggleCommentForm: function () { // 11.08.2015'den itibaren kullanılmıyor
            //    $(".toggleCommentForm").exists(function (elem) {
            //        $(elem).on("click", function (e) {
            //            e.preventDefault();
            //            if (!$(".comment-form").hasClass("active")) {
            //                $(".comment-form").addClass("active");
            //            } else {
            //                $(".comment-form").removeClass("active");
            //            }
            //        });
            //    });
            //},
            cancelOrderItemForm: function (container, orderId, sku, quantity, rowno, amount, interest) {
                var container = $(container).closest(".order-row");
                var Amount = amount;
                Amount = amount.replace(',', '.')
                if (!container.find(".comment-form").length) {
                    $(".comment-form").removeClass("active");
                    $(".comment-form").remove();
                    $(".cancelBtn").removeClass("active");
                    $(container.find(".cancel")).css("position", "relative");
                    core.widgets.loadingSmall(container.find(".cancel"));
                    $.ajax({
                        type: "GET",
                        data: { orderId: orderId, sku: sku, quantity: quantity, rowno: rowno, amount: Amount, interest: interest },
                        url: "/Order/CancelOrderItem",
                        content: document.body
                    }).done(function (d) {
                        if ($(".comment-form").html("") && !$(".comment-form").hasClass("active")) {
                            $(".comment-form").addClass("active");
                            $(container.find(".cancelBtn")).addClass("active");
                            $(container).append(d);
                        }
                        $(".drLoading").remove();
                    });

                } else {
                    core.widgets.removePaymentNotificationForm();
                }
            },
            returnOrderItemForm: function (container, orderId, stockCode, quantity, rowno, interest) {
                var container = $(container).closest(".order-row");
                if (!container.find(".comment-form").length) {
                    $(".comment-form").removeClass("active");
                    $(".comment-form").remove();
                    $(container.find(".cancel")).css("position", "relative");
                    $(".cancelBtn").removeClass("active");
                    core.widgets.loadingSmall(container.find(".cancel"));
                    $.ajax({
                        type: "GET",
                        data: {
                            OrderId: orderId, StockCode: stockCode, Quantity: quantity, rowno: rowno, interest: interest
                        },
                        url: "/Order/ReturnOrderItem",
                        content: document.body
                    }).done(function (d) {
                        if ($(".comment-form").html("") && !$(".comment-form").hasClass("active")) {
                            $(".comment-form").addClass("active");
                            $(container.find(".cancelBtn")).addClass("active");
                            $(container).append(d);
                        }
                        $(".drLoading").remove();
                        core.widgets.customCheckRadio();
                    });
                } else {
                    core.widgets.removePaymentNotificationForm();
                }
                return false;
            },
            paymentNotificationForm: function (container, orderCode) {
                var container = $(container).closest(".orders-list-row");

                // form ilk defa yüklendiğinde açık form olmadığından bekleme süresi yok
                window.fLatency = window.fLatency || 0;

                if (!container.find(".comment-form").length) {
                    $(".comment-form").removeClass("active");
                    setTimeout(function () {
                        $(".comment-form").remove();
                        $.ajax({
                            url: "/Order/PaymentTransfer/?OrderCode=" + orderCode,
                            content: document.body
                        }).done(function (d) {
                            $(container).append(d);
                            $(container).find(".custom").selectBox();
                            setTimeout(function () {
                                $(".comment-form").addClass("active");
                            }, 50);
                        });
                    }, window.fLatency);
                    window.fLatency = 400;
                } else {
                    core.widgets.removePaymentNotificationForm();
                }
            },
            removePaymentNotificationForm: function () {
                $(".comment-form").removeClass("active");
                setTimeout(function () {
                    $(".comment-form").remove()
                }, window.fLatency);
                window.fLatency = 0;
            },
            map: {
                set: function () {
                    $(function () {
                        if ($("#map").length > 0) {
                            var targetLocation = new google.maps.LatLng("41.029895", "28.968213");

                            var myOptions = {
                                center: targetLocation,
                                mapTypeId: google.maps.MapTypeId.ROADMAP,
                                zoom: 15,
                                mapTypeControl: false,
                                streetViewControl: false,
                                zoomControl: false,
                                panControl: false,
                                styles: [{ "featureType": "all", "elementType": "all", "stylers": [{ "saturation": -100 }, { "gamma": 0.5 }] }]
                            }

                            var map = new google.maps.Map($("#map")[0], myOptions);

                            // var marker = new google.maps.Marker({
                            // 	map: map,
                            // 	position: new google.maps.LatLng("40.977814", "29.055892"),
                            // 	title: "Test",
                            // 	icon: "marker-icon.png"
                            // });
                        }
                    });
                }
            },
            customCheckRadio: function () {
                $("input[type=checkbox], input[type=radio]").iCheck({
                    checkboxClass: 'icheckbox_flat-grey',
                    radioClass: 'iradio_flat-grey'
                });
            },
            setAccordion: function () {
                $(".accordion").exists(function (elem) {
                    elem.find("h3").on("click", function () {
                        if ($(this).hasClass("active")) {
                            elem.find("h3, .acc-content").removeClass("active");
                        } else {
                            elem.find("h3, .acc-content").removeClass("active");
                            $(this).addClass("active");
                            $(this).next(".acc-content").addClass("active");
                        }
                    });
                });

                function toggle(elem) {

                }
            },
            setSubCategoriesList: function () {
                var listElements = $(".sc-container ul li");
                var current = 0;
                var level = 0;
                listElements.each(function () {
                    var _offset = $(this).offset().top
                    if (_offset != current) {
                        current = _offset;
                        level++;
                    }
                    $(this).removeAttr("class").addClass("level" + level);
                });

                $(".toggle").remove();
                $(".sc-container ul li.level2").last().after("<li class='toggle'></li>");

                function toggleCategoryList() {
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active");
                        $(".sc-container ul").removeAttr("style");
                    } else {
                        $(this).addClass("active");
                        $(".sc-container ul").css("max-height", (listElements.outerHeight() * level) + 70);
                    }
                }
                $(document).on("click", ".sc-container ul li.toggle", toggleCategoryList);
            },
            toggleProductFixedCTA: function () {
                $(".head-cta").exists(function () {
                    var offsetTop = $(".head-cta").offset().top;
                    if (offsetTop <= 200) {
                        $(".head-cta").removeClass("active");
                    } else {
                        $(".head-cta").addClass("active");

                    }
                });
            },

            updateAddress: function (formUrl, e, params) {
                core.widgets.removeAddressForms();
                var container = $(e).closest(".address-cell");
                if (!container.hasClass("updating")) {
                    $.ajax({
                        url: formUrl,
                        beforeSend: function () {
                            container.addClass("updating");
                            core.widgets.loadingSmall(".updating .address-detail .cta");
                        }
                    }).done(function (d) {

                        container.append(d);
                        container.find("select.custom").selectBox({
                            mobile: true,
                            keepInViewport: false
                        });
                        container.find("input[type=checkbox], input[type=radio]").iCheck({
                            checkboxClass: 'icheckbox_flat-grey',
                            radioClass: 'iradio_flat-grey'
                        });
                        core.widgets.addressTypeSelect(container);
                        $(".drLoading").remove();
                    });
                }
                $(e).prop("disabled", true);
                $(e).addClass("updateActive");
            },
            DeleteAddress: function (formUrl, e, params) {
                var container = $(e).closest(".address-cell");
                //if (!container.hasClass("updating")) {
                $.ajax({
                    url: formUrl,
                    beforeSend: function () {
                        container.addClass("updating");
                        core.widgets.loadingSmall(".updating .address-detail");
                        $(".delete-panel").removeClass("active");
                    }
                }).done(function (d) {
                    $(".drLoading").remove();
                    container.fadeOut(function () { $(this).remove(); });
                    location.reload();
                    container.nextAll('.none:first').show();
                    var addressList = $('.bill-address-cell');
                    var shippingAddListBtns = $('.shipping-address-cell');

                    if (addressList.length >= 2) {
                        $("#addListBtns").hide();
                    }
                    if (shippingAddListBtns.length >= 2) {
                        $("#shippingAddListBtns").hide();
                    }
                });
                //}
                $(e).prop("disabled", true);
                $(e).addClass("updateActive");
            },
            removeAddressForms: function () {
                $(".address.update").remove();
                $(".updating").removeClass("updating");
                $(".updateActive").prop("disabled", false);
            },
            newAddress: function (formUrl, e, params) {
                $(e).prop("disabled", true);
                $(e).addClass("updateActive");
                $.ajax({
                    async: true,
                    type: 'POST',
                    cache: false,
                    url: '/Customer/CheckNewAddressProcess',
                    success: function (data) {
                        if (data.success) {
                            core.widgets.removeAddressForms();
                            var container = $(e).closest(".show-more");
                            if (!container.hasClass("updating")) {
                                $.ajax({
                                    url: formUrl,
                                    beforeSend: function () {
                                        container.addClass("updating");
                                        core.widgets.loadingSmall(".show-more.updating");
                                    }
                                }).done(function (d) {
                                    container.append(d);
                                    container.find("select.custom").selectBox({
                                        mobile: true,
                                        keepInViewport: false
                                    });
                                    container.find("input[type=checkbox], input[type=radio]").iCheck({
                                        checkboxClass: 'icheckbox_flat-grey',
                                        radioClass: 'iradio_flat-grey'
                                    });
                                    core.widgets.addressTypeSelect(container);
                                    $(".drLoading").remove();
                                    //container.find(".btn.cancel").on("click", core.widgets.removeAddressForm);
                                });
                            }
                            $(e).prop("disabled", true);
                            $(e).addClass("updateActive");
                        }
                        else {
                            DefaultScript.PNotify('', data.error, 'error');
                        }
                    },
                    error: function (request, status, error) { DefaultScript.PNotify('', "Hata!", 'error'); }
                });
            },
            updatePIAddress: function (formUrl, e, params) {
                core.widgets.removeAddressForms();
                var container = $(e).closest(".address");
                if (!container.hasClass("updating")) {
                    $.ajax({
                        url: formUrl
                    }).done(function (d) {
                        container.addClass("updating");
                        container.append(d);
                        container.find("select.custom").selectBox({
                            mobile: true,
                            keepInViewport: false
                        });
                        container.find("input[type=checkbox], input[type=radio]").iCheck({
                            checkboxClass: 'icheckbox_flat-grey',
                            radioClass: 'iradio_flat-grey'
                        });
                        core.widgets.addressTypeSelect(container);
                        //container.find(".btn.cancel").on("click", core.widgets.removePIAddressUpdateForm);
                    });
                }
            },
            newPIAddress: function (formUrl, e, params) {
                core.widgets.removeAddressForms();
                var container = $(e).closest(".show-more");
                if (!container.hasClass("updating")) {
                    $.ajax({
                        url: formUrl
                    }).done(function (d) {
                        container.addClass("updating");
                        container.append(d);
                        container.find("select.custom").selectBox({
                            mobile: true,
                            keepInViewport: false
                        });
                        container.find("input[type=checkbox], input[type=radio]").iCheck({
                            checkboxClass: 'icheckbox_flat-grey',
                            radioClass: 'iradio_flat-grey'
                        });
                        core.widgets.addressTypeSelect(container);
                        //container.find(".btn.cancel").on("click", core.widgets.removePIAddressForm);
                    });
                }
            },
            addressTypeSelect: function (container) {
                container.find(".btn.cancel").on("click", core.widgets.removeAddressForms);

                switchType($(container).find("input[name=addres-type]:checked").val());
                $(container).find("input[name=addres-type]").on('ifChecked', function (event) {
                    switchType($(this).attr("id"));
                });

                function switchType(type) {
                    if (type == "personal") {
                        $(container).find(".corporate-row").hide();
                        $(container).find(".personal-row").show();
                        $("#TypeName").html("Adı Soyadı");
                    } else if (type == "corporate") {
                        $(container).find(".corporate-row").show();
                        $(container).find(".personal-row").hide();
                        $("#TypeName").html("Ticari Ünvan");
                    }
                }
            },
            makeGiftPack: function () {
                $(".makeGiftPack").each(function () {
                    $(this).on("click", function (e) {
                        e.preventDefault();
                        if ($(this).closest(".extras-row").hasClass("makeGift")) {
                            $(".gift-note-container").hide();
                            $(".makeGiftPack").html("Hediye Paketi Yap");
                            $(this).closest(".extras-row").removeClass("makeGift");
                        } else {
                            $(".gift-note-container").show();
                            $(".makeGiftPack").html("Paketi İptal Et");
                            $(this).closest(".extras-row").addClass("makeGift");
                        }
                    })
                })
            },
            notify: function (args) {
                var href;
                if (args.href) {
                    href = args.href;
                } else {
                    href = "/Themes/dr/content/assets/partials/notification.html";
                }

                $.fancybox({
                    href: href,
                    padding: 0,
                    type: "ajax",
                    helpers: {
                        overlay: { closeClick: false }
                    },
                    beforeShow: function () {
                        core.widgets.fillNotifyModal(args);
                    }
                });

                if (args.close) {
                    switch (args.close) {
                        case "self":
                            setTimeout($.fancybox.close, 5000);
                            break;
                    }
                }

                if (args.callback) {
                    args.callback();
                }
            },
            setPDFviewer: function () {
                $(".pdfViewer").exists(function (elem) {
                    $(elem).on("click", function (event) {
                        event.preventDefault();
                        $.fancybox({
                            href: "/assets/partials/e-book.html",
                            padding: 0,
                            type: "ajax",
                            beforeShow: function () {
                                $(".e-book-preview").append("<a href='" + $(elem).attr("href") + "' class='pdfViewer'></a>");
                                $(".e-book-preview .pdfViewer").media({ width: 460, height: 460 });
                            }
                        });


                    });
                })
            },
            fillNotifyModal: function (args) {
                if (args.title) {
                    $(".modal").prepend("<h2>" + args.title + "</h2>");
                }

                $(".item-added").addClass(args.type);
                $(".item-added h3").html(args.message);
            },
            checkCoupon: function () {
                $(".get-code").hide();
                $(".use-coupon").fadeIn();
            },
            //setRate: function () {
            //    var container = $(".product-details .rate"),
			//		beginClass = container.attr("class"),
			//		posX,
			//		posRange,
			//		posNum;
            //    container.on("mousemove", function (e) {
            //        container.attr("class", "rate");
            //        posX = Math.floor(e.clientX - container.offset().left);
            //        posRange = Math.floor(container.width() / 10);
            //        posNum = Math.floor(posX / posRange);

            //        switch (posNum) {
            //            case 1:
            //                container.addClass("half");
            //                break;
            //            case 2:
            //                container.addClass("one");
            //                break;
            //            case 3:
            //                container.addClass("one-half");
            //                break;
            //            case 4:
            //                container.addClass("two");
            //                break;
            //            case 5:
            //                container.addClass("two-half");
            //                break;
            //            case 6:
            //                container.addClass("three");
            //                break;
            //            case 7:
            //                container.addClass("three-half");
            //                break;
            //            case 8:
            //                container.addClass("four");
            //                break;
            //            case 9:
            //                container.addClass("four-half");
            //                break;
            //            case 10:
            //                container.addClass("five");
            //                break;
            //        }
            //    });
            //    container.on("mouseout", function () {
            //        container.attr("class", beginClass);
            //    });

            //    container.on("click", function () {
            //        rate(posNum);
            //    });
            //},
            showPassUpdateForm: function () {
                $(".update-password-switch").on("click", function () {
                    $(".update-password-switch").hide();
                    $(".update-password").fadeIn();
                });
            },
            //checkAuthorPic: function(){
            //	$(".author-summary").exists(function(){
            //		var imagePath = $(".full-content figure.rounded .inner-round .border img").attr("src");
            //		$.ajax({
            //			url: imagePath,
            //			context: document.body
            //		}).error(function(a) {
            //			$(".full-content figure.rounded").remove();
            //		});
            //	});
            //},
            //focusCommentForm: function () {
            //    $(".focusCommentForm").exists(function () {
            //        $(".focusCommentForm").on("click", function (e) {
            //            e.preventDefault();
            //            $('html, body').animate({
            //                scrollTop: $(".toggleCommentForm").offset().top - $(".head-cta").height() - 50
            //            });
            //            $(".toggleCommentForm").click();
            //        });
            //    });
            //},
            setProductCardCTA: function () {
                $(".shelf .cell").exists(function (elem) {
                    elem.on("click", ".cta", function (e) {
                        if (!$(e.target).hasClass("red")) {
                            window.location.href = $(this).find(".btn.white").attr("href");
                        }
                    });
                });
            },
            waitFor: function () {
                $.fancybox({

                    href: "/Themes/dr/content/assets/partials/notification.html",
                    //href: "/Themes/dr/content/assets/partials/notification.html",
                    padding: 0,
                    type: "ajax",
                    modal: true,
                    beforeShow: function () {
                        core.widgets.fillNotifyModal({
                            title: "Bekleyiniz...",
                            message: ""
                        });
                        $(".item-added figure").remove();
                    }
                });
            },
            loadingSmall: function (loadingId) {
                $(loadingId).append("<div class=\"drLoading\"><span><img src=\"/Themes/DR/Content/assets/images/general/loadingSmall.gif\"/></span></div>");
            },
            loadingLarge: function (loadingId) {
                $(loadingId).append("<div class=\"drLoading\"><span><img src=\"/Themes/DR/Content/assets/images/general/loadingLarge.gif\"/></span></div>");
            },
            fbModal: function () {
                $.fancybox({
                    href: "/Customer/FacebookLogin",
                    //href: "/Themes/dr/content/assets/partials/notification.html",
                    padding: 0,
                    type: "ajax",
                    beforeShow: function () {
                        $(".modal input[type=radio], .modal input[type=check]").iCheck({
                            checkboxClass: 'icheckbox_flat-grey',
                            radioClass: 'iradio_flat-grey'
                        });
                    }
                });
            }

        }
    };

    core.init();
    window.core = core;
})(window);

// --- Config --- //


function pureFadeIn() {
    $("#cookieConsentContainer").fadeIn(1000);
};

function pureFadeOut() {
    $("#cookieConsentContainer").fadeOut(1000);
};

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function cookieConsent() {

    pureFadeIn("cookieConsentContainer");

}

function purecookieDismiss() {
    pureFadeOut("cookieConsentContainer");
    $.ajax({
        type: "POST",
        url: "/Customer/AddCookieActivityLog",
        data: {},
        dataType: "json",
        success: function (data) {
        }
    });
}

window.onload = function () {
    cookieConsent();
};


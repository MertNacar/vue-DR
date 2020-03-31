var lightscreen = $(".lightscreen");
var myAccountLi = $(".myAccount li");
var myAccountLink = $(".myAccount a");
var myAccountCont = $(".myAccountCont");
//var myAccountArrow = $(".myAccountarrow");
var mainCat = $("li.mainCat");
var subCatList = $(".subCatList");
//var catMenu = $(".hb_category");
//var ul_navi = $(".ul_navi");
//var mainCatLink = $(".mainCatLink");
var sh = $("#sh");
//var ht_icon01 = $(".htLoginArea .icon01");
var ht_Link = $(".myAccessLink:link, .myAccessLink:visited");
/*
var lightScreenCss = {
    css1: function () {
        //catMenu.css("z-index", "999");
        //ul_navi.css("z-index", "999");
    },
    css2: function () {
        //catMenu.css("z-index", "1001");
        //ul_navi.css("z-index", "1001");
    }
};
*/
/*HesabÄ±m DropDown*/
myAccountCont.hover(function () {
    //ul_naviRemoveClass();
    sh.show(); lightscreen.show();
    //lightScreenCss.css1();
    //ht_icon01.css("background-position", "-60px -120px");
    ht_Link.css("color","#fff");
}, function () {
    //ul_naviAddClass();
    sh.hide(); lightscreen.hide();
    //lightScreenCss.css2();
    //ht_icon01.css("background-position", "-60px -106px");
    ht_Link.css("color", "#666");
});

myAccountLink.mouseenter(function () {
    var This = $(this);
    This.prev(".arrow").addClass("myAccActiveArrow");
    This.parent("li").addClass("myAccActiveLi");
    This.css("color", "#fff");
});

myAccountLi.mouseleave(function () {
    var This = $(this);
    This.find(".arrow").removeClass("myAccActiveArrow");
    This.removeClass("myAccActiveLi");
    This.find("a").css("color", "#666");
});

/* // if IE */
if (/MSIE\s([\d.]+)/.test(navigator.userAgent)) //IE
{
    /* Mega MenÃ¼ */
    $(".megaMenuBanner a:nth-child(2n+2) img").css("margin-left", "0px");
    $(".subCatList ul:first-child").addClass("firstChildMargin");
    lightscreen.css("opacity", "0.4");
    $(".footerMenu li:last-child").css("margin-right", "0px");
    /*searchbar-autocomplete*/
    $(".ac_results .secondChild:nth-child(5)").css("margin-top", "-220px");
    $(".ac_results .secondChild:nth-child(6)").css("margin-top", "-190px");
    $(".ac_results .secondChild:nth-child(7)").css("margin-top", "-160px");
    $(".ac_results .secondChild:nth-child(8)").css("margin-top", "-130px");
    $(".ac_results .secondChild:nth-child(9)").css({ "margin-top": "-100px", "border-bottom": "none" });
    $(".ac_results .secondChild:nth-child(10)").css({ "margin-top": "0", "border-bottom": "none" });
    /* ie8 indexOf hatasÄ± iÃ§in ekleme */
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
            "use strict";
            if (this == null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (n != n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n != 0 && n != Infinity && n != -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        }
    }
}
/*
lightscreen.mouseenter(function () {
    var catLight = $(".catLight");
    var This = $(this);
    This.hide();
    subCatList.hide();
    if (catLight.length > 0)
        catLight.remove();
});
*/
/* MegamenÃ¼ Dropdown */
var mainCat = $(".mainCat");
var megaMenuTimer;
mainCat.hover(function () {
    var This = $(this);
    megaMenuTimer = setInterval(function () {
        This.addClass("activeMainCat");
        This.find(".mainCatLink").addClass("activemainCatLink");     
        var thissubCatList = This.find(".subCatList");
        var indexNo = This.index();
        if (This.find(".megaMenuBanner").find("img").length == 0)
            thissubCatList.addClass("autoWidth");
        else
            thissubCatList.removeClass("autoWidth");
        thissubCatList.fadeIn(200);
        clearInterval(megaMenuTimer);
    }, 200);
}, function () {
    var This = $(this);
    This.removeClass("activeMainCat");
    This.find(".mainCatLink").removeClass("activemainCatLink");
    subCatList.fadeOut(200);
    if (megaMenuTimer)
        clearInterval(megaMenuTimer);
});
/*
catMenu.hover(function () {
    if (lightscreen.is(":visible"))
        ul_naviRemoveClass();
}, function () {
    ul_naviAddClass();
});
ul_navi.click(function () {
    if (lightscreen.is(":visible"))
        ul_naviRemoveClass();
});
catMenu.click(function (event) {
    if (lightscreen.is(":visible"))
        ul_naviRemoveClass();
});
function ul_naviAddClass() {
    ul_navi.addClass("addBorder");
}
function ul_naviRemoveClass() {
    ul_navi.removeClass("addBorder");
}
*/
//var posLeft = [-1, -60, -133, -186, -252, -360, -507, -649, -739];
//mainCat.hover(function () {
    //ul_naviRemoveClass();
    //if (jQuery.browser.msie && jQuery.browser.version.substring(0, 1) == 8) //IE8
    //    posLeft = [0, -41, -82, -123, -164, -205, -246, -287, -328];
    
    //switch (indexNo)
    //{
    //    case 0: thissubCatList.css("left", posLeft[0] + "px"); break;
    //    case 1: thissubCatList.css("left", posLeft[1] + "px"); break;
    //    case 2: thissubCatList.css("left", posLeft[2] + "px"); break;
    //    case 3: thissubCatList.css("left", posLeft[3] + "px"); break;
    //    case 4: thissubCatList.css("left", posLeft[4] + "px"); break;
    //    case 5: thissubCatList.css("left", posLeft[5] + "px"); break;
    //    case 6: thissubCatList.css("left", posLeft[6] + "px"); break;
    //    case 7: thissubCatList.css("left", posLeft[7] + "px"); break;
    //    case 8: thissubCatList.css("left", posLeft[8] + "px");
    //}
    
    
    /*
    lightscreen.show();    
    if ($(".catLight").length > 0)
        $(".catLight").remove();
    mainCat.prepend('<div class="catLight"></div>');
    This.find(".catLight").remove();
    */
    

    //This.find(".arrow").addClass("activeMainCatArrow");
    //$(this).find(".mainCatLink").css({"font-size":"15px","line-height":"17px"});
//}, function () {
    //ul_naviAddClass();
    
    //This.find(".arrow").removeClass("activeMainCatArrow");
    //$(this).find(".mainCatLink").css({ "font-size": "14px", "line-height": "16px" });
//});

// kategori sayfasÄ± megamenÃ¼ dropdown
//ul_navi.hover(function () { ul_navi.show(); }, function () { hideDropDown(); });
//catMenu.hover(function () { ul_navi.show(); }, function () { hideDropDown(); });
//function hideDropDown() {
//    if ($('.hp_MainSliderCenter').length == 0)
//        ul_navi.hide();
//    else if($(window).scrollTop() > 450)
//        ul_navi.hide();
//}

/* Basket DropDown ScrollBar */
/*
var hb_basket = $(".hb_basket");
var basketDropDown = $(".basketDropDown");
var basketScrollbar = $(".basketScrollbar");
*/
/*
function DropDownIn(This) {
    $(".basketDropDownArrow").css("background-position", "-25px -207px ");
    $(".hb_basket .icon01").css("background-position", "-5px -242px ");
    $(".myBasketTextHeader").css("color", "#369");
    $(".hb_basket .icon02").css("background-position", "-4px -297px");
    This.addClass("headerBasketActive");
}
*/
/*
function DropDownOut(This) {
    firstClick = 0;
    
    //This.removeClass("headerBasketActive");
    //$(".basketDropDownArrow").css("background-position", "-5px -207px ");
    //$(".hb_basket .icon01").css("background-position", "-5px -222px ");
    //$(".myBasketTextHeader").css("color", "#fff");
    //$(".hb_basket .icon02").css("background-position", "-4px -265px");    
    //ul_naviAddClass();
    $(".basketDropDown").fadeOut(300);
}
*/
/*
var firstClick = 0;
hb_basket.click(function () {
    if (firstClick == 0) {
        firstClick = 1;
        var This = $(this);
        $.ajax({
            type: 'post',
            data: {},
            url: '/ShoppingCart/MiniBasket',
            success: function (data) {
                if (data) {
                    basketDropDown.remove();
                    hb_basket.html(data);
                    //DropDownIn(This);
                    //ul_naviRemoveClass();
                    var productLiLength = $("#basketProductCount").val();
                    switch (productLiLength) {
                        case "0": $(".basketDropDown").css("height", "130px").fadeIn(500); break;
                        case "1": $(".basketDropDown").css("height", "155px").fadeIn(500); break;
                        case "2": $(".basketDropDown").css("height", "230px").fadeIn(500); break;
                        default: $(".basketDropDown").css("height", "310px").fadeIn(500);
                    }
                    if (productLiLength > 3) {
                        $(".basketDropDown .filterScrollBar").show();
                        var short = $(".basketScrollbar").slickscroll({ "verticalscrollbar": true });
                        short.InValidate();
                    }
                    //$(".basketScrollbar").tinyscrollbar({ axis: "y" });
                }
            }
        });
    } else 
        DropDownOut(hb_basket);
});

var body = $("body");
body.mouseup(function (e) {
    if ($(e.target).attr('class') != hb_basket.attr('class') && !hb_basket.has(e.target).length) {
        DropDownOut(hb_basket);
    }
});
*/
/* SEARCH BAR */
var sayac = 0;
var arama = '';
var searchIcon = $("#searchIcon");
//var selectBox = $('.searchSelect .select');
var searchInput = $(".searchInput");
var r = { 'special': /['<''>''+''~''*''\'']/g, 'quotes': /['\''&'\"']/g, 'notnumbers': /[^\d]/g }
var hb_search = $(".hb_search");
var searchSelectIcon = $(".searchSelect .icon");
var ac_results = $(".ac_results");
var serachArea = $(".ac_results, .hb_search");
var secondChild = $(".hmCenter .ac_results .secondChild")

//serachArea.live('mouseenter', function () {
//    ul_navi.css("z-index", "999");
//});
//serachArea.live('mouseleave', function () {
//    ul_navi.css("z-index", "1001");
//});
secondChild.live('mouseenter', function () {
    var This = $(this);
    This.css("background", "#c33").filter(":last-child").css("background", "none");
    This.find(".arrow").hide();
    This.find(".arrow2").show();
    This.find(".searchProductName").css("color", "#fff");
    This.filter(":last-child").find(".searchProductName").css("color", "#666");
});
secondChild.live('mouseleave', function () {
    var This = $(this);
    This.css("background", "none");
    This.find(".arrow").show();
    This.find(".arrow2").hide();
    This.find(".searchProductName").css("color", "#666");
});
searchIcon.live("click", function () {
    var search = $(".searchInput").val();
    if (!search)
        return;
    Search();
});
//selectBox.click(function () {
//    $('.selectDiv').html($(this).find('option:selected').html());
//});

var imagePrefixVal = $(".imagePrefix").val();

searchInput.focus(function () {
    var This = $(this);
    if (This.val() == "Hangi Ã¼rÃ¼nÃ¼ arÄ±yorsunuz?")
        This.val("");
}).blur(function () {
    var This = $(this);
    if (This.val() == "")
        This.val("Hangi Ã¼rÃ¼nÃ¼ arÄ±yorsunuz ?");
    searchIcon.removeClass("ac_searchStyle");
    hb_search.removeClass("ac_position");
    searchInput.css("color", "#999");
    hb_search.css("border", "1px solid #ddd");
    lightscreen.hide();
    searchSelect.show();
    //ul_navi.css("z-index", "1001");
}).keyup(function () {
    a = this.selectionStart;
    l = this.value.length;
    this.value = this.value.replace(r['special'], '');
    if (this.value.length != l) a--;   /* EÄŸer fonksiyonda geÃ§ersiz (Ã¶zel) karakter silinmesi oluÅŸur ise imleÃ§ konumunu dÃ¼zeltmek iÃ§in 1 Ã§Ä±karÄ±lÄ±yor. */
    if (this.selectionStart) { this.focus(); this.setSelectionRange(a, a); }
}).bind('keydown', function Gonder(e) {
    if (e.keyCode == 13) Search();
}).autocomplete("/Catalog/Search/Suggest", {
    dataType: 'json',
    delay: 1000,
    minChars: 2,
    appendTo: ".hmCenter",
    extraParams: { categoryId: function () { return $("#ddlCategoryId").val(); } },
    parse: function (data) {

        var rows = new Array();
        sayac = data.length;

        for (var i = 0; i < sayac; i++) {
            if (i == sayac - 1) {
                rows[i] = { data: 'Hangi Ã¼rÃ¼nÃ¼ arÄ±yorsunuz?', value: '0', result: 'Hangi Ã¼rÃ¼nÃ¼ arÄ±yorsunuz?' };
                arama = $("#TopProductName").val();
            }
            else { rows[i] = { data: data[i], value: data[i].Id, result: data[i].Name }; }
        }
        return rows;

    },
    formatItem: function (row, i, n) {
        //$("#productCount").val(row.ProductsCount);
        searchIcon.addClass("ac_searchStyle");
        hb_search.addClass("ac_position");
        searchInput.css("color", "#c33");
        hb_search.css("border", "none");
        lightscreen.show();
        searchSelect.hide();
        //ul_navi.css("z-index", "999");
        
        if (i <= sayac - 1) {
            row.Name2 = row.Name.length >= 35 ? row.Name.substring(0, 32) + "..." : row.Name;
            var xx = '<a class="show_all" title="' + row.Name + '"><span onclick="Search()" class="searchPrice"> </span></a> <img class="searchImg" src="' + imagePrefixVal + row.ImageUrl + '" /><span class="arrow"></span><span class="searchProductName" title="' + row.Name + '">' + row.Name2 + '</span>  <br /> <span class="searchPrice">' + row.Price + ' TL </span><span class="arrow2"></span>';
        }
        else {
            var xx = '<span class="searchProductName showAllLink" onclick="Search()">TÃ¼m Arama SonuÃ§larÄ±</span>';
        }
        return xx;
    }
}).result(function (event, data, formatted) {
    var link;
    if (data == 'Hangi Ã¼rÃ¼nÃ¼ arÄ±yorsunuz?') {
        var input = $.trim(searchInput.val());
        if (input.length <1)
            return;
        link = '/Catalog/Search/Results?term=' + input + '&categoryId=0';
    }
    else
        link = data.Url;
    document.location.href = link;
});

/* searchbar selectBox */
var searchSelect = $(".searchSelect");
/*
var searchSelectUL = $(".searchSelectUL");
var searchSelectLi = $(".searchSelectUL li");
var searchSelectIcon = $(".searchSelect .icon");
var opt = $(".searchSelectUL span");
var allCat = $(".allCat");
var searchHead = $(".searchSelectUL .head");
var actOpt = $(".searchSelectUL .head, .allCat");
var ddlCategoryId = $("#ddlCategoryId");

searchSelectLi.live("mouseenter", function () {
    $(this).find(".arrow").show();
});
searchSelectLi.live("mouseleave", function () {
    $(this).find(".arrow").hide();
});
searchSelectLi.live("click", function () {
    var This = $(this);
    var catId = This.find(".cat").attr("data");
    actOpt.text(This.find(".cat").text()).attr("data", catId);
    ddlCategoryId.val(catId);
    selectHide();
});
allCat.click(function () {
    selectShow();
});
searchSelectIcon.click(function () {
    selectShow();
});
searchSelect.mouseleave(function () {
    selectHide();
});
function selectShow() {
    searchSelectUL.show();
    searchSelectIcon.addClass("searchIconStyle");
}
function selectHide() {
    searchSelectUL.hide();
    searchSelectIcon.removeClass("searchIconStyle");
}
*/
function Search() {
    var hid = $.trim($(".searchInput").val());
    //var catId = $("#ddlCategoryId").val();
    if (!hid)
        return;
    var url = "/Search?q=" + $.trim(hid);
    window.location.href = url;
    return;
};

function Exit(toPage) {
        $.ajax({
            type: 'post',
            cache:false,
            dataType: 'json',
            url: '/Main/Home/CustomerExit',
            success: function (data) {
                if (data == 1) {
                    window.location.assign(toPage);
                }
            },
            error:function(a,b,c){
                alert("hata");
            }
        });
};

/* ---------------- CUSTOM -------------------- */

var DefaultScript = (function () {

    var def = {};
    def.Lightscreen = function (url, isShow) {
        $("body").append('<div class="loginPopUp"></div><div class="lightscreen3"></div>');
        var lightscreen3 = $(".lightscreen3");
        var loginPopUp = $(".loginPopUp");
        lightscreen3.fadeIn(250);
        def.ShowIndicator("", "body");
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
            def.HideIndicator("body");
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
        switch (types) {
            case "success": Class = " jgrowlSuccess"; break;
            case "warning": Class = " jgrowlWarning"; break;
            default: Class = " jgrowlError";
        }
        text = '<div class="jgrowlCustom' + Class + '"><span class="head">UYARI</span><div class="text"><div><span class="arrow"></span><span>' + text + '</span></div></div></div>';        
        $("body").append('<div class="lightscreen2"></div>');
        var lightscreen2 = $(".lightscreen2");
        lightscreen2.fadeIn(250);
        $.jGrowl(text, {
            life: 2500, header: title, theme: "msg_" + types + "1", close: function (e, m) {
                lightscreen2.fadeOut(250).remove();
            }
        });
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
        def.ShowIndicator('yÃ¼kleniyor', divId);
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


/************************* new design *************************/
/* // if IE */
if (/MSIE\s([\d.]+)/.test(navigator.userAgent)) //IE
{
    $(".footer-icon-container a:first, .authorListHead li:last-child").css("margin-right", "0");
}
var DefaultScript = (function () {
    var def = {};
    def.ShowIndicator = function (text, id) {
        var pageElement = arguments.length == 1 ? $('body') : (typeof id == "object") ? id : $('#' + id);
        pageElement.block({ message: "<h2>" + text + "</h2>" });

    };

    def.HideIndicator = function (id) {
        var pageElement = arguments.length == 0 ? $('body') : (typeof id == "object") ? id : $('#' + id);
        pageElement.unblock();
    };

    // def.PNotify = function (title, text, types) {
    //    if (parseInt($('#divAlert').length) > 0) {
    //      $('#divAlert').html(text);
    //    }
    //    else {
    //       $("body").append('<div  style="display:none;"><div id="divAlert">' + text + '</div></div>');
    //    }
    //     $.colorbox({ inline: true, href: '#divAlert' });
    //  };


    def.PNotify = function (title, text, types) {
        if (!$('.jGrowl-notification').is(':visible')) {
            $.jGrowl(text, { life: 5000, theme: "msg_" + types + "1" });
            var loop = setInterval(function () {
                if ($.exist("div.not-icon")) { $('div.not-icon').addClass("msg_" + types + "2"); clearInterval(loop); }
            }, 30); //setInterval
            (function ($) {
                if (!$.exist) {
                    $.extend({
                        exist: function (elm) {
                            if (typeof elm == null) return false;
                            if (typeof elm != "object") elm = $(elm);
                            return elm.length ? true : false;
                        }
                    });
                    $.fn.extend({
                        exist: function () {
                            return $.exist($(this));
                        }
                    });
                }
            })(jQuery);
        }//if
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
        def.ShowIndicator('yÃ¼kleniyor', divId);
        jQuery.ajax({
            type: 'post',
            data: data,
            url: url,
            success: function (data) {

                if (jQuery('#' + divId).length > 0)
                    jQuery('#' + divId).html(data);
                def.HideIndicator(divId);
            },
            error: function () { }
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
        CloseButton: def.closeButton
    }
}
());
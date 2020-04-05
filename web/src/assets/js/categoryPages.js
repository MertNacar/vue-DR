
var lightscreen = $(".lightscreen");

//get_url_parmeters function
function get_url_parmeters(url, name) {
    name = name.replace(/[[]/, "\[").replace(/[]]/, "\]");
    var regexS = "[\?&#/]" + name + "=([^&#/]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null) return "";
    else return results[1];
}

/* category aside create link */
var subCatLi = $(".catList li");
var sortnumber = $("#sortnumber");
var loadingSize = sortnumber.attr("dataSize");

if (loadingSize)
    sortnumber.find("option[value='" + loadingSize + "']").attr("selected", true);

subCatLi.click(function () {
    var This = $(this);
    var subCatLink = This.find("a");
    var queryString = "";
    if (This.attr("class") != "cat_level_1")
        queryString = "?size=" + sortnumber.val();
    window.location.assign(subCatLink.attr("linkData") + queryString);
});

/*  ie css */
var IsIExp = $.browser.msie;
if (IsIExp) {//code for IE
    $("li.cat_level_4:nth-child(2n+1)").css("background", "#f7f7f7");
    $(".filterHead:first-child").css("margin-top", "0");
    $(".selectBoxArea:last-child").css("margin-right", "0px");
    $(".mainCatList li:nth-child(2n+2)").css("background", "#f7f7f7");
    $(".mostSoldProList li:last-child").css("border", "none");
    $(".mostSoldProList li:first-child").css("padding-top", "0");
    $(".brandButon:last-child").css("margin-bottom", "15px");
}

/* checkBox */
var checkBoxInput = $('.checkBoxInput');
var checkBoxInputPopup = $('.checkBoxInputPopup');
var priceRadio = $(".priceRadio");
priceRadio.live("click", function () {
    if ($(this).val() != $(".priceRadio[data='active']").val()) {
        $(".priceRadio").attr("checked", false).removeAttr("data");
        $(".priceRadio").next('.checkBoxDiv').css('background-position', '-1px -43px');
    }
});
checkBoxInput.live("click", function () {
    var This = $(this);
    if (This.attr("data") != "active") {
        This.attr({ "checked": true, "data": "active" });
        This.next('.checkBoxDiv').css('background-position', '-1px -81px');
    } else {
        This.attr("checked", false).removeAttr("data");
        This.next('.checkBoxDiv').css('background-position', '-1px -43px');
    }
});
checkBoxInputPopup.live("click", function () {
    var This = $(this);
    if (This.attr("data") != "active")
        brandPopUpClass.inpActive(This);
    else
        brandPopUpClass.inpPassive(This);
});

/* selectBox */
var selectBox = $(".selectBox");
var spanArrow = $(".selectBoxArea span.arrow");
selectBox.live("click", function () {
    $(this).next('.selectBoxDiv').html($(this).find("option").filter(':selected').html());
});
selectBox.each(function () {
    $(this).next('.selectBoxDiv').html($(this).find("option").filter(':selected').html());
});

/*------------------------ brand pop up -----------------------*/
var close = $(".close");
var selectAll = $(".selectAll");
var checkList = $(".checkList");
var checkListLi = $(".checkList li");
var checkListInput = $(".checkList .checkBoxInputPopup");
var checkListDiv = $(".checkList .checkBoxDivPopup");
var asideBrandHead = $(".asideBrandHead");
var brandPopUp = $(".brandPopUp");
var filterScroll = $('.filterScroll');
var checkBoxInputFilter = $('.checkBoxInputFilter');
var filterScrollBar = $(".brandPopUpFilter .filterScrollBar");
var selectAllHtml = '<article class="brandButon selectAllBut"><span class="brandFilterName">TÃ¼mÃ¼</span></article>';

/* slickScroll */
var scrolls = new Array();
$(document).ready(function () {
    $(".brandPopUp").find(filterScroll).each(function () {
        var This = $(this);
        if (This.find(".checkList li").length > 42) {
            var filterScrollBar = This.find(".filterScrollBar");
            filterScrollBar.show();
            This.addClass("setHeight");
            var short = This.slickscroll({ "verticalscrollbar": true });
            scrolls.push(short);
        }
    });
});

/* brandPopUp show-hide */
var megaMenuTimer;
asideBrandHead.hover(function () {
    var This = $(this);
    megaMenuTimer = setInterval(function () {
        var brandPopUp = This.find(".brandPopUp");
        if (brandPopUp.length <= 0)
            return;
        lightscreen.show();
        brandPopUp.stop(true, true).show();
        /* slickScroll */
        if (This.find(".checkList li").length > 42) {
            var filterScrollBar = This.find(".filterScrollBar");
            var filterScroll = This.find(".filterScroll");
            var thisIndex = This.parent().index();
            filterScrollBar.show();
            filterScroll.addClass("setHeight");
            scrolls[thisIndex-1].InValidate();
        }
        clearInterval(megaMenuTimer);
    }, 200);
}, function () {
    var This = $(this);
    var brandPopUp = This.find(".brandPopUp");
    if (brandPopUp.length <= 0)
        return;
    lightscreen.hide();
    brandPopUp.stop(true, true).hide();
    /* slickScroll */
    filterScrollBar.hide();
    filterScroll.removeClass("setHeight");
    if (megaMenuTimer)
        clearInterval(megaMenuTimer);
});

/* filter delete */
close.live("click", function () {
    var This = $(this);
    This.parent(".brandButon").remove();
    var brandText = $(this).prev(".brandFilterName").text();
    if (brandText != "TÃ¼mÃ¼"){
        var checkBoxInp = $(".checkBoxLabel[data='" + brandText + "']").prev().find(".checkBoxInputPopup");
        brandPopUpClass.inpPassive(checkBoxInp);
    }
    ProductsDisplay.Change(1);
});

/* selectAll */
checkBoxInputFilter.live("click", function () {
    var This = $(this);
    brandPopUpClass.selectAllFunction(This);
    brandPopUpClass.checkBoxFilterFunction(This);
});
selectAll.live("click", function () {
    var This = $(this);
    brandPopUpClass.selectAllFunction(This);
    brandPopUpClass.checkBoxFilterFunction(This.parents(".checkBoxFilterCont").find(".cbif2"));
});

/* brand select */
checkListInput.live("click", function () {
    brandPopUpClass.showHideBrandButton($(this));
});

var brandPopUpClass = {
    deleteBrand: function (ThisParents) {
        ThisParents.find(".checkBoxInputPopup").attr("checked", false).removeAttr("data");
        ThisParents.find(".checkBoxDivPopup").css('background-position', '0 -66px');
        this.selectAllPassive(ThisParents);
        this.inpPassive(ThisParents.find(".checkBoxInputFilter"));
    },
    checkBoxFilterFunction: function (This) {
        if (This.attr("data") != "active")
            this.inpActive(This);
        else
            this.inpPassive(This);
    },
    selectAllFunction: function (This) {
        var filter = This.parents(".asideBrand");        
        var checkBoxInputPopup = filter.find(".checkBoxInputPopup");
        var checkBoxDivPopup = filter.find(".checkBoxDivPopup");

        if (This.attr("data") != "active") {            
            this.selectAllActive(filter);
            checkBoxInputPopup.attr({ "checked": true, "data": "active" });
            checkBoxDivPopup.css('background-position', '-21px -66px');
            filter.find(".brandButon").remove();
            filter.append(selectAllHtml).find(".brandFilterName").after('<span class="close"></span>');
            filter.find(".close").click(function () { brandPopUpClass.deleteBrand($(this).parents(".asideBrand")); });
        } else {
            filter.find(".selectAllBut").remove();
            this.selectAllPassive(filter);
            checkBoxInputPopup.attr("checked", false).removeAttr("data");
            checkBoxDivPopup.css('background-position', '0 -66px');
        }
    },
    showHideBrandButton: function (selector) {
        var thisParent = selector;
        thisParent.parents(".asideBrand").find(".brandButon").remove();//tÃ¼mÃ¼nÃ¼ sil
        var count = 0;
        var chkInp = thisParent.parents(".filterScroll").find(".checkBoxInputPopup");
        chkInp.each(function () { //active inputlarÄ± aside'a ekleme
            var This = $(this);
            if (This.attr("data") == "active") { // input checked ise
                This.parents(".asideBrand").append('<article class="brandButon"><span class="brandFilterName">' + This.parent().next("label").text() + '</span><span class="close"></span></article>');
                count++;
            }
        });
        var filter = thisParent.parents(".asideBrand");
        var cbif2 = filter.find(".cbif2");
        if (chkInp.length == count) { //tÃ¼mÃ¼ seÃ§ili ise
            this.inpActive(cbif2);
            this.selectAllActive(filter);
            filter.find(".brandButon").remove();
            filter.append(selectAllHtml).find(".brandFilterName").after('<span class="close"></span>');
            filter.find(".close").click(function () { brandPopUpClass.deleteBrand($(this).parents(".asideBrand")); });
        }
        else
            if (count < chkInp.length) {
                this.inpPassive(cbif2);
                this.selectAllPassive(filter);
            }
        count = 0;
    },
    inpActive: function (This) {
        This.attr({ "checked": true, "data": "active" });
        This.next('div').css('background-position', '-21px -66px');
    },
    inpPassive: function (This) {
        This.attr("checked", false).removeAttr("data");
        This.next('div').css('background-position', '0 -66px');
    },
    selectAllActive: function (This) {
        This.find(".selectAll").text("TÃ¼mÃ¼nÃ¼ KaldÄ±r").attr("data", "active");
    },
    selectAllPassive: function (This) {
        This.find(".selectAll").text("TÃ¼mÃ¼nÃ¼ SeÃ§").removeAttr("data");
    }
};
/*------------------------ brand pop up -----------------------*/

/* mainCatBannerSlider */
var bannerCarousel = $('.bannerCarousel');
if (bannerCarousel.length > 0) {
    $('.bannerCarousel').carouFredSel({
        auto: 4000,
        mousewheel: true,
        width: 930,
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
    var mainBannerSlider = $(".mainCatBannerSlider");
    var mainBannerNext = $(".mainCatBannerNext");
    var mainBannerPrev = $(".mainCatBannerPrev");
    var nextPrevButton = $(".mainCatBannerNext, .mainCatBannerPrev");
    mainBannerSlider.mouseenter(function () { nextPrevButton.stop(true, true).fadeIn(500) });
    mainBannerSlider.mouseleave(function () { nextPrevButton.stop(true, true).fadeOut(500) });
    mainBannerNext.click(function () { bannerCarousel.trigger("next") });
    mainBannerPrev.click(function () { bannerCarousel.trigger("prev") });
}

// sub kategori Ã‡ekimi
function GetSubCategory(sender, categoryId, parentId, url, topcat) {
    if (sender) {
        $('.catList a').removeClass('active');
        $(sender).addClass('active');
    }
    var content = {
        //topCatId:topcat,
        id: categoryId,
        parentId: parentId
    };
    $.get('/Catalog/' + url, content, function (data) {
        var filtercontent = $('#catFilterHolder').html();
        $("#catPageContent").html(data);
        $('#catFilterHolder').html(filtercontent);
        $('#hdnCategoryids').val(categoryId);
        $('#hdnParentId').val(parentId);
        $('#hdnmethod').val(url);
        ProductsDisplay.Create();
    });
}

//-----------------Sayfalama----------------------%>
$(document).ready(function () {
    //$('.selectBox-dropdown-menu li a').click(function () {
    //    var x = $(this).prop('rel');
    //    $('#hdnFilterPrice').val(x);
    //});
    $('#priceFilter .selectBox').click(function () {
        $(".selectBox-options-bottom").addClass("priceSelects");
        $('.priceSelects li a').click(function () {
            var x = $(this).prop('rel');
            $('#hdnFilterPrice').val(x)
            $.session.set("priceFilter", x);
        });
        
    });
   
});
var ProductsDisplay = (function () {
    var pdisplay = {};
    pdisplay.pageIndex = 1;
    pdisplay.ViewType = 2;
    pdisplay.Gets = function (pageIndex, w) {
        if (pageIndex === 0) return;
        //DefaultScript.ShowIndicator('', ".productList");
        pdisplay.pageIndex = pageIndex;
        //-- /*chrome-safari script hatasÄ± dÃ¼zeltme*/ --%>
        //if ($("#hdnVariationName").val() == 0) { $("#hdnVariationName").val(''); }
        //-- /*chrome-safari script hatasÄ± dÃ¼zeltme*/ --%>
        //----------------- Browser back kodlarÄ± -------------------%>
        //var varChecks = [];
        //var propChecks = [];
        //$('#media option:selected').each(function () {
        //    varChecks.push($(this).val());
        //});
        //$('input[name="chkPropVal"]:checked').each(function () {
        //    propChecks.push($(this).attr('parent') + '_' + $(this).val());
        //});
        //$('#hdnVariationName').val(varChecks.join(","));
        //$('#hdnPropVal').val(propChecks.join(","));
        //----------------- Browser back kodlarÄ± -------------------%>
        //var priceRadioChecked = $(".price option:selected");
        //var price = priceRadioChecked.length > 0 ? priceRadioChecked.val().split(",") : price = [-1, -1];


        var sort = new Array();
        sort = $("#order-by").val().split(",");
        if (sort.length == 1) {
            sort.push("");
        }
        var price = new Array();
        if ($("#price").val()) {
            price = $("#price").val().split(",");
        }
        if (price.length == 1) {
            price = [-1, -1];
        }
        var notForSale = true;
        if ($('#tukenleriGizle').is(':checked') == true) {
            notForSale = false;
        }
        var content = {
            page: pdisplay.pageIndex || 0,
            sortfield: sort[0],
            sortorder: sort[1],
            size: 42,
            categoryid: $("#hdnCategoryids").val(),
            parentId: $("#hdnParentId").val(),
            brandIds: $("#hdnBrandId").val(),
            mediatypes: $("#media").val(),
            HideNotForSale: notForSale,
            minPrice: price[0],
            maxPrice: price[1],
            writer: $('#authortext').val(),
            propVal: $("#hdnPropVal").val(),
            language: $('#language').val(),
            
        };
        
        var baseurl = $('#hdnmethod').val();

        $.get('/Catalog/SubCategoryProducts', content, function (data) {
            $('#container').html(data);
            pdisplay.CreatePager(pageIndex - 1);            
            var count = $('#hdnHitCount').val();
            if (count) {
                $('#searchResultCount').text(count + ' ADET');
            }
            var searchNotProText = $("#container").find(".searchNotProText").length;
            if(searchNotProText > 0) {
                $("#searchResultCount").text("0 ADET"); 
                $(".pager").hide();
            } else {
                $(".pager").show();
            }
            
        });

        //----------------- Browser back kodlarÄ± -------------------%>        
            var pathname = window.location.pathname;
            var page = !content.page ? "#/page=1" : "#/page=" + content.page;
            var sort = $("#order-by").length <= 0 ? "" : "/sort=" + $("#order-by").val();
            //var size = !content.size ? "" : "/size=" + content.size;
            var categoryid = !content.categoryid ? "" : "/categoryid=" + content.categoryid;
            var parentId = !content.parentId ? "" : "/parentId=" + content.parentId;
            var mediatypes = !content.mediatypes ? "" : "/mediatypes=" + content.mediatypes;
            var language = !content.language ? "/lg=" + $("#hdnLanguage").val() : "/lg=" + content.language;
            var price = price.length <= 0 ? "/price=" + $.session.get("priceFilter") : "/price=" + price.join(',');
            var writer = !content.writer ? "" : "/writer=" + content.writer;
            var brandIds = !content.brandIds ? "" : "/brandIds=" + content.brandIds;
            var hs = content.HideNotForSale ? "" : "/hs=" + content.HideNotForSale;
            var propVal = !content.propVal ? "" : "/propVal=" + content.propVal;
            //var catType = !baseurl ? "SubCategoryProducts" : "/catType=" + baseurl;
            //var variation = encodeURI(content.mediatypes).replace("/", "-");

            var url = page + sort /*+ size*/ + categoryid + parentId + mediatypes + language + brandIds + price /*+ writer*/ + propVal + hs /*+ catType*/;
            var alinkAttach = "";
            if (sort != "/sort=soldcount,desc")
                alinkAttach = sort;
            alinkAttach = mediatypes + language + brandIds + price /*+ writer*/ + propVal;
            $('.sc-container').find('a').each(function () {
                
                var link = $(this).attr("href");
                var hashIndex = link.indexOf('#');
                if (hashIndex > 0) 
                    link = link.substring(0, hashIndex);
                if (alinkAttach!="")
                    link = link + "#" + alinkAttach;
                $(this).attr("href", link);
            });
        if (w != 1) {
            if (window.history.pushState) { window.history.pushState('', 'New URL: ' + url, url); }
            else { window.location.hash = url; }//--ie7,8,9 iÃ§in--%>
        }
        //----------------- Browser back kodlarÄ± -------------------%>
        
    };
    pdisplay.CreatePager = function (currentpage) {
        var Total = $("#hdnHitCount").val();
        if (!currentpage || currentpage < 0)
            currentpage = 0;
        $(".pager").pagination(Total, {
            num_edge_entries: 1,
            num_display_entries: 4,
            items_per_page: 42,
            callback: loadProductList,
            current_page: currentpage,
            prev_text: " ",
            next_text: " "
        });
        //#gtm takip kodu
        $(".pager-list li a").click(function () {
            var relThis = $(this).attr("class");
            if (relThis == "next") {
                dataLayer.push({ 'Category': 'ÃœrÃ¼n Listeleme', 'Action': 'Listeleme', 'Label': 'Sonraki', 'event': 'gaEvent' });
            }
            else if (relThis == "prev") {
                dataLayer.push({ 'Category': 'ÃœrÃ¼n Listeleme', 'Action': 'Listeleme', 'Label': 'Ã–nceki', 'event': 'gaEvent' });
            }
            else {
                dataLayer.push({ 'Category': 'ÃœrÃ¼n Listeleme', 'Action': 'Listeleme', 'Label': 'Sayfa NumarasÄ±', 'event': 'gaEvent' });
            }
        });
    };
    return {
        Change: pdisplay.Gets,
        Create: pdisplay.CreatePager
    };
}());


function loadProductList(page_index) {
    ProductsDisplay.Change(page_index);
    $('body, html').animate({ scrollTop: 0 }, 800);
}

ProductsDisplay.Create();

var start;
//$('input[name="chkBrand"],input[name="chkVar"],input[name="chkPropVal"],.priceRadio,#sortnumber,#sortPrice').live("click", function () {
//$('.priceRadio,input[name="chkVar"]').live("click", function () {
//    filtrele();
//});
$('.selectBox').change(function () {
    //filtrele();
    ProductsDisplay.Change(1);
});
//$('.filterBut').live('click', function () {
//    ProductsDisplay.Change(1);
//});
//function filtrele() {
//    clearTimeout(start);
//    start = setTimeout(function () {
//        ProductsDisplay.Change(1);
//        clearTimeout(start);
//    }, 1250);//setTimeout
//}

//-----------------Sayfalama Son----------------------%>


//----------------- Ajax da google iÃ§in url oluÅŸturma ve browser back kodlarÄ± -------------------%>

$(function () {
    $(window).bind('hashchange', function (e) {
        var hash = location.hash;

        var page = get_url_parmeters(window.location.href, 'page');
        page = !page ? 1 : page;

        var categoryid = get_url_parmeters(window.location.href, 'categoryid');
        if (categoryid)
            $("#hdnCategoryids").val(categoryid);

        var parentId = get_url_parmeters(window.location.href, 'parentId');
        if (parentId)
            $("#hdnParentId").val(parentId);

        var brandIds = get_url_parmeters(window.location.href, 'brandIds');
        $("#hdnBrandId").val(brandIds);
        if (brandIds) {
            $('.brandSelect').find('.option div[class*="checked"]').removeClass('checked');
            var brands = brandIds.split(",");
            brands.forEach(function (element) {
                $('#brand_' + element).parent().addClass('checked');
            });
        }

        var writer = get_url_parmeters(window.location.href, 'writer');
        if (writer)
            $("#authortext").val(writer);
        else
            $("#authortext").val('');

        var propVal = get_url_parmeters(window.location.href, 'propVal');
        if (propVal)
            $("#hdnPropVal").val(propVal);     

        var sort = get_url_parmeters(window.location.href, 'sort');
        $("#order-by option").removeAttr("selected");
        if (sort) {
            $("#order-by").val(sort);
            var selected = $("#order-by option[value='" + sort + "']");
            selected.attr({ "selected": "selected" });
            var txt = selected.text();
            selected.parent("select").next("a").find(".selectBox-label").text(txt);
        } else
            $("#order-by option[value='soldcount,desc']").attr({ "selected": "selected" }).parent("select").next("a").find(".selectBox-label").text("EN Ã‡OK SATAN");

        var price = get_url_parmeters(window.location.href, 'price');
        $("#price option").removeAttr("selected");
        if (price) {
            $("#price").val(price);
            var selected = $("#price option[value='" + price + "']");
            selected.attr({ "selected": "selected" });
            var txt = selected.text();
            selected.parent("select").next("a").find(".selectBox-label").text(txt);
        } else
            $("#price option[value='']").attr({ "selected": "selected" }).parent("select").next("a").find(".selectBox-label").text("FÄ°YAT");

        var mediatype = get_url_parmeters(window.location.href, 'mediatypes');
        $("#media option").removeAttr("selected");
        if (mediatype) {
            $("#media").val(mediatype);
            $("#hdnVariationName").val(mediatype);
            var selected = $("#media option[value='" + mediatype + "']");
            selected.attr({ "selected": "selected" });
            var txt = selected.text();
            selected.parent("select").next("a").find(".selectBox-label").text(txt);
        } else
            $("#media option[value='']").attr({ "selected": "selected" }).parent("select").next("a").find(".selectBox-label").text("MEDYA CÄ°NSÄ°");

        var hs = get_url_parmeters(window.location.href, 'hs');
        if (hs != '') {
            if (hs == 'false') {
                $("#productStatus .icheckbox_flat-grey").addClass("checked");
                $("#tukenleriGizle").attr('checked', true);
            }
        }
        else {
            $("#productStatus .icheckbox_flat-grey").removeClass("checked");
            $("#tukenleriGizle").attr('checked', false);
        }

        var language = get_url_parmeters(window.location.href, 'lg');
        $("#language option").removeAttr("selected");
        if (language) {
            $("#language").val(language);
            $("#hdnLanguage").val(language);
            var selected = $("#language option[value='" + language + "']");
            selected.attr({ "selected": "selected" });
            var txt = selected.text();
            selected.parent("select").next("a").find(".selectBox-label").text(txt);
        } else
            $("#language option[value='']").attr({ "selected": "selected" }).parent("select").next("a").find(".selectBox-label").text("DÄ°L");
        //var size = get_url_parmeters(window.location.href, 'size');
        //if (size) {
        //    $("#sortnumber").val(size);
        //    $("#sortnumber option").each(function () {
        //        var This = $(this);
        //        if (This.val() == size) {
        //            This.attr({ "selected": "selected" });
        //            This.parent("select").next("div").text(This.text());
        //            return;
        //        }
        //    });
        //} else
        //    $("#sortnumber option:eq(0)").attr({ "selected": "selected" }).parent("select").next("div").text("40'lÄ± GÃ¶sterim");

        //propVal = propVal.split(",");
        
        //$(".checkBoxInputPopup").each(function () {
        //    var This = $(this);
        //    This.attr("checked", false).removeAttr("data");
        //    This.next('.checkBoxDivPopup').css('background-position', '0 -66px');
        //    if (brandIds.indexOf(This.val()) > -1 || propVal.indexOf(This.val()) > -1) {
        //        This.attr({ "checked": true, "data": "active" });
        //        This.next('.checkBoxDivPopup').css('background-position', '-21px -66px');
        //        brandPopUpClass.showHideBrandButton(This);
        //    }
        //});

       

        
        //var priceRadio = $(".priceRadio");
        //priceRadio.attr("checked", false).removeAttr("data");
        //priceRadio.next('.checkBoxDiv').css('background-position', '-1px -43px');
        //if (price) {
        //    var checkPrice = $(".priceRadio[value='" + price + "']");
        //    checkPrice.attr({ "checked": true, "data": "active" });
        //    checkPrice.next('.checkBoxDiv').css('background-position', '-1px -81px');
        //}
       // if (location.hash.indexOf('#') > -1)
            ProductsDisplay.Change(page, 1);
    });//--/*hashchange*/--%>
    if (location.hash.indexOf('#') > -1)
        $(window).trigger('hashchange');
});


//----------------- Ajax da google iÃ§in url oluÅŸturma ve browser back kodlarÄ± -------------------%>


// yazar suggest

$('#authortext').keyup(function (e) {
    a = this.selectionStart;
    l = this.value.length;
    this.value = this.value.replace(r['special'], '');
    if (this.value.length != l) a--;   /* EÄŸer fonksiyonda geÃ§ersiz (Ã–zel) karakter silinmesi oluÅŸur ise imleÃ§ konumunu dÃ¼zeltmek iÃ§in 1 Ã‡Ä±karÄ±lÄ±yor. */
    if (this.selectionStart) { this.focus(); this.setSelectionRange(a, a); }
    var catId = 0;
    if ($("#hdnMainCatID").length && $("#hdnMainCatID").val()) { catId = $("#hdnMainCatID").val(); }
    var txt = $('#authortext').val();
    if (txt.length < 2)
    {
        return;
    }
    // yazar adÄ± suggest
    delay(function () {
        $.ajax({
            type: 'post',
            dataType: "json",
            data: { type: 'author', term: txt, catId: catId },
            url: '/stateless/suggest',
            success: function (data) {
                var jObject = JSON.parse(data);
                var respHtml = "";
                var container = $('.category-suggests .person');
                if (jObject && jObject.suggest && jObject.suggest.length && jObject.suggest[0] && jObject.suggest[0].options && jObject.suggest[0].options.length) {
                    var iterator = 0
                    var length = jObject.suggest[0].options.length;
                    var elements = jObject.suggest[0].options
                    for (iterator; iterator < length; iterator++) {
                        var element = elements[iterator];
                        var liItem = '<li><a class="writerElement" href="javascript:;">' + element.text + '</a></li>';
                        respHtml += liItem;
                    }
                    //respHtml = '<li class="suggest-head"><span>Yazarlar</span></li>' + respHtml;
                    container.html(respHtml).show();
                    container.focusin();
                }
                else {
                    container.html('').hide();
                }
            }
        }
       );
    }, 500);
    
});
$(document).click(function (event) {
    if (!$(event.target).hasClass('person')) {
        $(".person").hide();
    }
});
$('.writerElement').live('click',function(){
    var a = $(this);
    $('#authortext').val(a.text());
    $('.category-suggests .person').hide();
    ProductsDisplay.Change(1);
});
$('.category-suggests .person').focusout(function () {
    $('.category-suggests .person').hide();
});
$('.npt-button input').click(function () {
    $('.category-suggests .person').hide();
    ProductsDisplay.Change(1);
});

    //.autocomplete('http://213.243.35.185:9200/nop_artists/_suggest?source='+source, {
    //    delay: 1000,
    //    minChars: 3,
    //    parse: function (data) {
    //        var rows = new Array();
    //        for (var i = 0; i < data.length; i++) {
    //            rows[i] = { data: data[i], value: data[i], result: data[i] };
    //        }
    //        return rows;
    //    },
    //    formatItem: function (row, i, n) {
    //        var xx = "<a href='#' title='" + row + "'> " + row + " </a>";
    //        return xx;
    //    }
    //}).result(function (event, data, formatted) {
    //    ProductsDisplay.Change(1);
    //});

    // msgroupname
$('.msgroup').click(function () {
    var _this = $(this);
    var content = {
        groupCode: _this.attr('msg'),
        categoryId: _this.attr('cat')
    };
    $.post('/Catalog/MsGroupMostSold', content, function (data) {
        $('#msmainCatProList').html(data);
        $(".productContent:nth-child(5n)").css("margin-right", "0");
        $('.msgroup').removeClass('active');
        _this.addClass('active');
    });
});

    $('#order-by,#media, #language').live('change',function () {
        ProductsDisplay.Change(1);
    });

    $('.chkBrand').on('ifChecked', function (event) {
        var brandChecks = [];
        $('.option div[class*="checked"]').find('input').each(function () {
            brandChecks.push($(this).val());
        });
        brandChecks.push($(this).val());
        $('#hdnBrandId').val(brandChecks.join(","));
        ProductsDisplay.Change(1);
    });
    $('.chkBrand').on('ifUnchecked', function (event) {
        var currentBrand = $(this).val();
        var brandChecks = [];
        $('.option div[class*="checked"]').find('input').each(function () {
            if ($(this).val() != currentBrand) {
                brandChecks.push($(this).val());
            }
        });
        $('#hdnBrandId').val(brandChecks.join(","));
        ProductsDisplay.Change(1);
    });

    //tÃ¼kenenleri gizle
    var tukenleriGizle = $("#tukenleriGizle");
    $("#productStatus").on('ifChecked', tukenleriGizle, function (event) {
        ProductsDisplay.Change(1);
    });

    $("#productStatus").on('ifUnchecked', tukenleriGizle, function (event) {
        ProductsDisplay.Change(1);
    });
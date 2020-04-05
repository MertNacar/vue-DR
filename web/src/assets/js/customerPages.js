$(document).ready(function(){

/* checkbox */
var ncFormCheckbox = $(".ncFormCheckbox");
ncFormCheckbox.filter(":checked").attr("data", "active").next('.ncFormCheckboxDiv').css('background-position', '0 -22px');
ncFormCheckbox.click(function () {
    var This = $(this);
    if (This.attr("data") != "active") {
        This.attr({ "checked": true, "data": "active" });
        This.next('.ncFormCheckboxDiv').css('background-position', '0 -22px');
    } else {
        This.attr("checked", false).removeAttr("data");
        This.next('.ncFormCheckboxDiv').css('background-position', '0 0');
    }
});

var mfFormCheckbox = $(".mfFormCheckbox");
mfFormCheckbox.click(function () {
    var This = $(this);
    if (This.attr("data") != "active") {
        This.attr({ "checked": true, "data": "active" });
        This.next('.mfFormCheckboxDiv').css('background-position', '0 -42px');
    } else {
        This.attr("checked", false).removeAttr("data");
        This.next('.mfFormCheckboxDiv').css('background-position', '0 0');
    }
});


/* selectbox */
var cmiSelectBox = $(".cmiSelectBox");
var cmiDiv = ".cmiSelectBoxDiv";
var mfSelectBox = $(".mfSelectBox");
var mo_DateSelectBox = $(".mo_DateSelectBox");
var moDiv = ".mo_DateSelectBoxDiv";
var mfDiv = ".mfSelectBoxDiv";

    /* selectBox */
//var selectBox = $(".selectBox");
//var spanArrow = $(".selectBoxArea span.arrow");
//selectBox.live("click", function () {
//    $(this).next('.selectBoxDiv').html($(this).find("option").filter(':selected').html());
//});
//selectBox.each(function () {
//    $(this).next('.selectBoxDiv').html($(this).find("option").filter(':selected').html());
//});


cmiSelectBox.each(function(){
	updateSelectBox($(this),cmiDiv);				   
});
cmiSelectBox.change(function(){
	updateSelectBox($(this),cmiDiv);
});

mo_DateSelectBox.each(function(){
	updateSelectBox($(this),moDiv);		   
});
mo_DateSelectBox.change(function(){
	updateSelectBox($(this),moDiv);	
});

mfSelectBox.each(function(){
	updateSelectBox($(this),mfDiv);		   
});
mfSelectBox.change(function(){
	updateSelectBox($(this),mfDiv);	
});

function updateSelectBox(This,Div){
	This.next(Div).text(This.find("option:checked").text());	
}

var moneyOrderSelectBox = $(".moneyOrderSelectBox");
moneyOrderSelectBox.each(function(){
	updateSelectBox2($(this));				   
});
moneyOrderSelectBox.change(function(){
	updateSelectBox2($(this));
});
function updateSelectBox2(This){
	var Text = This.find("option:checked").text();
	if(Text.length>45)
		Text = Text.substr(0,45)+"...";
	This.next(".moneyOrderSelectBoxDiv").text(Text);	
}

    /*address Popup*/
DeleteAdress = function (addressId) {
    $.ajax({
        type: 'Post',
        url: '/Customer/AddressDelete',
        data: { 'id': addressId },
        success: function (data) {
            var mesType = data.MessageType;
            mesType = mesType == '' ? 'success' : mesType;
            DefaultScript.PNotify('', data.message, mesType);
            setTimeout(function () { document.location.reload(true); }, 1000);
        }
    }); //ajax
};
    /*New Customer Contract Pop Up*/
var contractLink = $("#contractLink");
contractLink.click(function () {
    DefaultScript.Lightscreen("/Customer/NewCustomerContractPopUp");
    $(".loginPopUp").css({ "position": "fixed", "top": "150px" });
});

/*AdresEkle*/
var btnAddAddress = $("#btnAddAddress");
btnAddAddress.click(function () {
    DefaultScript.Lightscreen("/Customer/ProcessAddress?id=0_1", true);
    $(".loginPopUp").css({ "position": "fixed", "top": "10px" });
    isLoad(".popupBtnAdd", "Ekle");
});
/*FaturaAdresiEkle*/
var btnAddBillAddress = $("#btnAddBillAddress");
btnAddBillAddress.click(function () {
    DefaultScript.Lightscreen("/Customer/ProcessAddress?id=0_2", true);
    $(".loginPopUp").css({ "position": "fixed", "top": "10px" });
    isLoad(".popupBtnAdd", "Ekle");
});
/*AdresDüzenle*/
$('.editAddress').click(function () {
    var id = $(this).attr('aid');
    DefaultScript.Lightscreen("/Customer/ProcessAddress?id=" + id, true);
    $(".loginPopUp").css({ "position": "fixed", "top": "30px" });
    isLoad(".popupBtnAdd", "Kaydet");
});
/*FaturaAdresiDüzenle*/
$('.editBillAddress').click(function () {
    var id = $(this).attr('aid');
    DefaultScript.Lightscreen("/Customer/ProcessAddress?id=" + id, true);
    $(".loginPopUp").css({ "position": "fixed", "top": "30px" });
    isLoad(".popupBtnAdd", "Kaydet");
});
/*AdresSil*/
$('.deleteAddress').click(function () {
    var id = $(this).attr('aid');
    DeleteAdress(id);
});
    /*AdresSil*/
$('.delete-address').click(function () {
    var id = $(this).attr('aid');
    DeleteAdress(id);
});
/*isLoad*/
function isLoad(element,message){
    var loadingmyselect = setInterval(function () {
        if ($(element).length) {
            clearInterval(loadingmyselect);
            $(element).text(message).attr("title", message);
        }
    }, 300);
}

/*address Popup*/
//var examining = $(".examining");
//examining.click(function () {
//    DefaultScript.Lightscreen("/Customers/Home/orderTrackingPopUp", true);
//});

/*  code for IE   */
var IsIExp = $.browser.msie;
if (IsIExp) {
    $(".newCustomerForm_Ul li:last-child").css({ "margin-bottom": "0", "height": "auto", "padding-top": "10px" });
    $(".loginForm_Ul li:last-child").css({ "margin-bottom": "0", "height": "auto", "padding-top": "2px" });
    $(".passResetForm_Ul li:last-child, .changeMyAddressInfo_Ul:last-child, .myAccess_Ul li:last-child").css("margin-bottom", "0");
    $(".changePassForm_Ul li:last-child").css({ "margin-bottom": "0", "height": "auto" });
    $(".changeMyInfoForm_Ul .cmiBlock:last-child").css("margin", "0");
    $(".cmiAgeCont:last-child, .btnOperationCont .btnOperation:last-child").css("margin-right", "0");
    $(".changeMyAddressInfo_Ul li:last-child").css("border", "none");
    //$(".changeMyAddressInfo_Ul li:last-child").css({"-webkit-box-shadow":"none","-moz-box-shadow":"none","box-shadow":"none","border":"none"});
    $(".mo_ProductAreaUl:last-child li, .eBookList_Ul li:last-child, .myGameCard_Ul li:last-child").css("border-bottom", "none");
    $(".ot_PopUpProductUl li:last-child, .ot_PopUpProductUl li:first-child").css("border-right", "none");
    $(".popUpTotalPrice_Ul > li:last-child").css("padding", "15px 0 5px 0");
    $(".eBookListBlock:nth-child(2n), .moneyOrderForm_Ul .mo_DateSelectBoxCont:last-child, .myFavoritesBlock:nth-child(2n)").css("margin-right", "0");
    $(".aList_ProContUl > li:last-child, .orderTrackingPopUp_Ul > li:last-child").css("border-bottom", "none");
}


/******************************************** Yeni Site  ********************************************/
/* checkbox */
var check_input = $(".check-input");
check_input.filter(":checked").attr("data", "active").next('span').css('background-position', '-62px 0');
var check_input = $(".check-input");
check_input.click(function () {
    var This = $(this);
    if (This.attr("data") != "active") {
        This.attr({ "checked": true, "data": "active" });
        This.next('span').css('background-position', '-62px 0');
    } else {
        This.attr("checked", false).removeAttr("data");
        This.next('span').css('background-position', '-1px 0');
    }
});
check_input.hover(function () {
    var This = $(this);
    if (This.attr("data") != "active")
        This.next('span').css('background-position', '-32px 0');
}, function () {
    var This = $(this);
    if (This.attr("data") != "active")
        This.next('span').css('background-position', '-1px 0');
});

});
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
        switch (types) {
            case "success": Class = " jgrowlSuccess"; break;
            case "warning": Class = " jgrowlWarning"; break;
            default: Class = " jgrowlError";
        }
        text = '<div class="jgrowlCustom' + Class + '"><span class="head">UYARI</span><div class="text"><div><span class="arrow"></span><span>' + text + '</span></div></div></div>';
        if (!$('.jGrowl-notification').is(':visible')) {
            $("body").append('<div class="lightscreen2"></div>');
            var lightscreen2 = $(".lightscreen2");
            lightscreen2.fadeIn(250);
            $.jGrowl(text, {
                life: 2500, header: title, theme: "msg_" + types + "1", close: function (e, m) {
                    lightscreen2.fadeOut(250).remove();
                }
            });
        }
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
//function GetAvailableJobs() {
//    $.ajax({
//        type: 'get',
//        dataType: 'json',
//        url: '/Customer/GetAvailableJobs/',
//        success: function (data) {
//            $("#profession").html('');
//            $.each(data, function (index, item) {              
//                $("#profession").append('<option value="' + item.Value + '" >' + item.Text + '</option>');
//            });
//        }
//    });
     
//}
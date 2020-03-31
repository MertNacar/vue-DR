
var selectsChange = function (selectBox) {

    if (selectBox.hasClass("select-box-filter")) {
        ProductsDisplay.Change(1);
    }

    if (selectBox.hasClass("countryField")) {

        GetCity();

        var phone = $('#phone').val().replace(" ", "").replace("(", "").replace(")", "").replace("-", "");
        var cellphone = $('#mobile').val().replace(" ", "").replace("(", "").replace(")", "").replace("-", "");
         
        var selectedvalue = $("#countryField option:selected").val();

        if (selectedvalue != 77) {
            $( "#mobile" ).unbind("keypress");
            $( "#mobile" ).unbind("keydown");
            $("#PostalCodeField").val("");
            $("#PostalCodeField").prop("maxlength", "8");
            $('#phone').val('').unmask('').prop("maxlength", "20");
            $('#mobile').val('').unmask('').prop("maxlength", "20");
            if (selectedvalue == 0) {
                $('#mobile').val('').unmask('').prop("maxlength", "10");
            }
        }
        else {
            if(navigator.userAgent.indexOf("Firefox") != -1 ) {
                $("#mobile").keydown(function (e) {
                    var keyCode = parseInt(e.keyCode);

                    if ($.inArray(e.keyCode, [46, 9, 27, 13, 110, 190]) !== -1 ||
                        // Allow: Ctrl+A
                        (keyCode === 65 && e.ctrlKey === true) ||
                        // Allow: Ctrl+C
                        (keyCode === 67 && e.ctrlKey === true) ||
                        // Allow: Ctrl+X
                        (keyCode === 88 && e.ctrlKey === true) ||
                        // Allow: home, end, left, right
                        (keyCode >= 35 && keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    // Ensure that it is a number and stop the keypress
                    if ((keyCode != 229) && (keyCode != 8) && (e.shiftKey || (keyCode < 48 || keyCode > 57)) && (keyCode < 96 || keyCode > 105)) {
                        e.preventDefault();
                    } else if($("#mobile").val().substr(0, 1) != "5" &&  e.keyCode != 53 &&  e.keyCode != 101 ) {
                        e.preventDefault();
                    }
                });
            } else {
                $("#mobile").keypress(function(event) {
                    if(event.keyCode < '8' || event.keyCode > '57') {
                        event.preventDefault();
                    } else if($("#mobile").val().substr(0, 1) != "5" &&  event.keyCode != '53' ) {
                        event.preventDefault();
                    }
                });
            }
            
            $("#PostalCodeField").val("");
            $("#PostalCodeField").prop("maxlength", "5");
            if($("#mobile").val().substr(0, 1) != "5" || $("#mobile").val().length > 11) {
                $('#mobile').val('');
            }
        }

        $("#mobile").on('select', function () {
            var ele  = document.getElementById('mobile');
            var text = ele.value;
            text = text.slice(0, ele.selectionStart) + text.slice(ele.selectionEnd);
            ele.value = text;
        });
        
    }

    if (selectBox.hasClass("cityField")) {
        GetCounty();
    }

    if (selectBox.hasClass("storeCity")) {
        ChangeStore($("#city").val());
    }

    if (selectBox.hasClass("order-by-city")) {
        GetActivities();
    }
    // expire date
    function displayVals() {
        var exM = $('.ExpireMonth').val();
        var exY = $('.ExpireYear').val();
        $('input[name="expiryDate"]').val(exY.slice(-2) + (exM.length == 1 ? "0" + exM : exM));
    }
    if (selectBox.hasClass("ExpireMonth")) {
        displayVals();
    }
    if (selectBox.hasClass("ExpireYear")) {
        displayVals();
    }
};



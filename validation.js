$(document).ready(function() {
    var lastname = "";
    var firstname = "";
    var patronymic = "";

    $("#input_text").keyup(function() {
        var value = $("#input_text").val();
        var pattern = /[a-zа-я-]+/gi; 
        var invalidPattern = /[^a-zа-я- ]|(-){1,} |^-/ig;

        if (invalidPattern.test(value)) { 
            $("#status_invalid").show().text("Wrong"); 
            $("#input_text")
                    .removeClass("valid")
                    .addClass("invalid"); 
            $("#output_name").hide(); 
            return;
        }

        var matches = value.match(pattern);

        firstname = "";
        patronymic = "";
        lastname = "";

        if (value == "") {
            $("#output_name").hide();
            $("#input_text").removeClass("valid invalid");
            $("#status_invalid").css("display","none");
            return;
        }

        if (matches && matches.length == 3) {

            if (matches.length > 0) {
                lastname = matches[0];
            }

            if (matches.length > 1) { 
                firstname = matches[1];
            }

            if (matches.length > 2) { 
                patronymic = matches[2];
            }

            $("#status_invalid").hide();
            $("#input_text")
                    .removeClass("invalid")
                    .addClass("valid");
            $("#output_name").show("fast");
            $("#lastname").text(lastname);
            $("#firstname").text(firstname);
            $("#patronymic").text(patronymic);
        }

        if (matches.length < 3) {
        	$("#status_invalid").show().text("Enter full name");
            $("#output_name").hide();
            $("#input_text").removeClass("invalid").removeClass("valid");
        }
    });

    var form_disable = function() {
        $("#input_text, #dialog_button").attr("disabled","true");
    }

    var form_enable = function() {
        $("#input_text").removeAttr("disabled").removeClass("valid invalid").val(""); 
        $("#dialog_button").removeAttr("disabled");
        $("#output_name, #status_invalid").hide();
    }

    $('#dialog_button').click(function() {
        form_disable();
        $('#overlay').fadeIn(200, function() {
        $('#modal_form').css("display", "block").animate({opacity: 1}, 200);
        $("#modal_form_content").text("Welcome!\n" + 
            lastname + " " + firstname + " " + patronymic);
        });
    });

    $("#overlay, #modal_form_close").click(function() {
        form_enable();
        $("#modal_form").animate({opacity: 0}, 200, function() {
            $(this).hide();
            $('#overlay').fadeOut(200);
        });
    });
});

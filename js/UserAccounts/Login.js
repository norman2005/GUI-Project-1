$(document).ready(function() {

    var username,
            password;

    $("#login").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        draggable: false
    });

    $("#regis").dialog({
        autoOpen: false,
        height: 400,
        width: 400,
        modal: true,
        draggable: false
    });

    $(document).keypress(function(e) {
        if (e.which == 13) {
            if ($("#login").dialog("isOpen")) {
                Login();
                console.log("enter is hit and the login panel is open.");
            }
        }
    });

    $("#log").click(function() {
        $("#login").dialog("open");
    });

    $("#reg").click(function() {
        $("#regis").dialog("open");
    });

    $("#Cancel").click(function() {
        $("#user_login").val("");
        $("#user_password").val("");
        $("#login").dialog("close");
    });

    $("#Login").click(function() {
        Login();
    });

    function Login() {
        username = $("#user_login").val();
        password = $("#user_password").val();
        $("#action").css({'visibility': 'visible'});
        $.ajax({
            type: 'post',
            url: '/~jcaravet/NewLayout/Login.php',
            async: false,
            dataType: 'json',
            data: {
                name: username,
                password: password
            },
            success: function(data) {
                if (data === "true") {
                    $("#username").html(username);
                    $("#action").css({'visibility': 'hidden'});
                    $("#username").css({'visibility': 'visible'});
                    $("#logout").css({'visibility': 'visible'});
                    $("#log").css({'visibility': 'hidden'});
                    $("#reg").css({'visibility': 'hidden'});
                    $("#space").css({'visibility': 'hidden'});
                    username = $("#user_login").val("");
                    $("#user_password").val("");
                    $("#login").dialog("close");

                }
            }
        });
    }
});




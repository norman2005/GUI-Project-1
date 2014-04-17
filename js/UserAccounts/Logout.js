$(document).ready(function() {

    $("#logout").click(function() {
        console.log("in");
        $.ajax({
            type: 'get',
            url: '/~jcaravet/NewLayout/Logout.php',
            async: false,
            success: function(data) {
                console.log("here");
                $("#username").html("");
                $("#username").css({'visibility': 'hidden'});
                $("#logout").css({'visibility': 'hidden'});
                $("#log").css({'visibility': 'visible'});
                $("#reg").css({'visibility': 'visible'});
                $("#space").css({'visibility': 'visible'});
            }
        });
    });
});

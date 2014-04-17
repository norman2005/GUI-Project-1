$(document).ready(function() {
    $.ajax({
        type: 'get',
        url: '/~jcaravet/NewLayout/sessioncheck.php',
        async: false,
        success: function(data) {

            if (data !== "false") {
                $("#username").html(data);
                $("#username").css({'visibility': 'visible'});
                $("#logout").css({'visibility': 'visible'});
                $("#log").css({'visibility': 'hidden'});
                $("#reg").css({'visibility': 'hidden'});
                $("#space").css({'visibility': 'hidden'});
            }
        }
    });
});


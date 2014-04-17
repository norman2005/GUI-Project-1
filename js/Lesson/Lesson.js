$(function() {
    var current_page = 1;
    var total_pages;

    startUp();
    updatePageBar();
    loadContent();

    $('#lessonone').click(function() {
        window.location.href = "Lesson1.html"
    });


    $('.jcarousel-control-prev').click(function() {
        current_page = current_page - 1;
        updatePageBar();
        loadContent();
    });

    $('.jcarousel-control-next').click(function() {
        current_page = current_page + 1;
        updatePageBar();
        loadContent();
    });

    function startUp() {
        total_pages = $("#pagenumber li").length;
    }

    function updatePageBar() {
        console.log($("#pagenumber li").length);
        $(".active").removeClass("active");
        $("#pagenumber li:nth-child(" + current_page + ")").addClass("active");
        if (current_page === 1) {
            $('.jcarousel-control-prev').css({'background': '#808080', 'cursor': 'default'});
            $('.jcarousel-control-prev').attr("disabled", "disabled");
            $('.jcarousel-control-next').removeAttr("disabled", "disabled");
        }
        if (current_page === 2) {
            console.log("nex");
            $('.jcarousel-control-prev').css({'background': '#4E443C', 'cursor': 'pointer'});
            $('.jcarousel-control-prev').removeAttr("disabled", "disabled");
        }
        if (current_page === (total_pages - 1)) {
            console.log("next");
            $('.jcarousel-control-next').css({'background': '#4E443C', 'cursor': 'pointer'});
            $('.jcarousel-control-next').removeAttr("disabled", "disabled");
        }
        if (current_page === total_pages) {
            console.log("next");
            $('.jcarousel-control-next').css({'background': '#808080', 'cursor': 'default'});
            $('.jcarousel-control-next').attr("disabled", "disabled");
        }

    }

    function loadContent() {
        var content = "";
        if (current_page === 1) {
            console.log("page 1");
            content += "<p id='LessonWelcome'> Welcome to lesson 1 lets get started </p>";
            content += "<p id='lineone'>First lets look at a power supply this is the device that provides power to the circuit.</p>";
            content += "<p id='linetwo'>One common example of this is a battery.</p>";
            content += "<p id='linethree'>If you look to the paper on the right side the symble that is a circle with two lines coming from it is are power supply.</p>";
            content += "<p id='linefour'>This will be used to bring are circuit to life.</p>"
            content += "<p id='linefive'>Next we will look at what roll the wire plays.</p>"
            console.log(content);
        }
        if (current_page === 2) {
            content += "<p id='lineone'> A wire is just a simple part that is used to connect different parts of a circuit together.</p>";
            content += "<p id='linetwo'> If you look on the paper to the right you will see a few wires take two of them and attach one to either side of the power supply.</p>";
            content += "<p id='linethree'> Now lets look at ground it is the symbol on the paper that has three horizontal lines.</p>";
            content += "<p id='linefour'> This is a very important component it is a reference point in an electrical circuit and it allows for voltages to be measured.</p>";
        }
        if (current_page === 3) {
            content += "<p id='lineone'>Take one of the ground symbols and connect it the the wire connected to the left side of the power supply.</p>";
            content += "<p id='linetwo'>The last component that this lesson will cover is a resistor. This is the symbol that looks like a saw tooth line.</p>";
            content += "<p id='linethree'>Resistors are used to decrease current or voltage in a circuit.</p>";
            content += "<p id='linefour'>Take the resistor and connect it the the wire on the right side of the power supply and take the last ground and connect it to the resistor.</p>";
            content += "<p id='linefive'>Congratulation you have built your first circuit.</p>";
        }
        $("#placeholder").html(content);
    }
});



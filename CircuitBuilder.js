/*
 * Authors: Joshua Caravetta, Norman Mutunga
 * Created: 1/30/2014
 * 
 * This is the Javascript for the circuit building tool.
 */

$(function() {
    var canvasHTML = document.getElementById("myCanvas"); //Holds the canvas.
    var working_canvas = canvasHTML.getContext("2d"); //Holds the context of the canvas.
    var objects = []; //Array that holds all the objects that will be put on the screen.
    var saved;
    var width = screen.width;//Holds the width of the users screen.
    var height = screen.height;//Holds the height of the users screen.
    var powersettingsobject;

    css_setup();

    $("#CircuitToolBar").tabs(); //Inits the jQuery UI Tabs.
    $("#PowerSettingsBox").dialog(); //Inits the jQuery dialog.
    
    
    $("#PowerSettingsBox").dialog({
        close: function() {
            $('#voltage').val("");
        }
    });

    $("#PowerSettingsBox").dialog("close");

    /*
     * Sets up the size of the circuit builder using information from the users screen size.
     */
    function css_setup() {
        working_canvas.canvas.height = (height / 1.649);
       // $('#CircuitToolBar').css({'width': (width / 2.02257)});
        $('#CircuitToolBar').css({'height': (height / 12.6)});
        $('#CircuitBuilder').css({'width': (width / 2)});
    }

    /*
     Function will draw all the objects in the object array.
     */
    function draw() {

        //ClearRect will clear the canvas.
        working_canvas.clearRect(0, 0, canvasHTML.width, canvasHTML.height);

        //The for loop will go through all objects in the objects array and draw them.
        for (var i = 0; i < objects.length; i++)
        {
            objects[i].draw();
        }
    }

    function addDCPower(x, y) {
        var dcpower = new dcpowerData;
        dcpower.x = x;
        dcpower.y = y;
        objects.push(dcpower);
    }

    function dcpowerData() {
        this.x = 0;
        this.y = 0;
        this.voltage = "";
        this.height = 20;
        this.width = 50;
        this.type = "dcpower";
        this.measurement = "";
        this.draw = function() {
            drawDCPower(this.x, this.y, this.voltage, this.measurement);
        };
    }

    function drawDCPower(x, y, voltage, measurement) {
        working_canvas.beginPath();
        working_canvas.arc(x, y, 20, 0, 2 * Math.PI);
        x = x - 20;
        working_canvas.moveTo(x, y);
        x = x - 15;
        working_canvas.lineTo(x, y);
        x = x + 55;
        working_canvas.moveTo(x, y);
        x = x + 15;
        working_canvas.lineTo(x, y);
        if (voltage !== ""){
           working_canvas.font = "bold 12px Arial";
           working_canvas.fillText(voltage + measurement, x - 48, y - 25);
        }
        working_canvas.stroke();
    }

    dcpowerData.prototype.hitTest = function(hitX, hitY) {

        //Looks to see if the given x is inside the objects x bounds.
        if (hitX >= this.x - (this.width) && hitX <= (this.x + this.width)) {

            //Looks to see if the given y is inside the objects y bounds.
            if (hitY >= (this.y - this.height) && hitY <= (this.y + this.height)) {
                return true;
            }
        }
    };

    dcpowerData.prototype.move = function(x, y) {
        this.x = x;
        this.y = y;
    };

    function addGround(x, y) {
        var ground = new groundData;
        ground.x = x;
        ground.y = y;
        objects.push(ground);
    }

    function groundData() {
        this.x = 0;
        this.y = 0;
        this.height = 32;
        this.width = 32;
        this.type = "ground";
        this.draw = function() {
            drawGround(this.x, this.y);
        };
    }

    function drawGround(x, y) {
        working_canvas.beginPath();
        working_canvas.moveTo(x, y);
        y = y + 14;
        working_canvas.lineTo(x, y);
        x = x - 16;
        working_canvas.moveTo(x, y);
        x = x + 32;
        working_canvas.lineTo(x, y);
        y = y + 5;
        x = x - 26;
        working_canvas.moveTo(x, y);
        x = x + 20;
        working_canvas.lineTo(x, y);
        y = y + 5;
        x = x - 15;
        working_canvas.moveTo(x, y);
        x = x + 10;
        working_canvas.lineTo(x, y);
        working_canvas.stroke();
    }

    groundData.prototype.hitTest = function(hitX, hitY) {

        //Looks to see if the given x is inside the objects x bounds.
        if (hitX >= this.x - (this.width / 2) && hitX <= (this.x + this.width / 2)) {

            //Looks to see if the given y is inside the objects y bounds.
            if (hitY >= (this.y) && hitY <= (this.y + this.height)) {
                return true;
            }
        }
    };

    groundData.prototype.move = function(x, y) {
        this.x = x;
        this.y = y - 20;
    };

    /*
     Function will add a wire will the given information.
     */
    function addWire(x, y, length) {
        var wire = new wireData;
        wire.x = x;
        wire.y = y;
        wire.width = length;
        objects.push(wire);
    }


    /*
     Function will hold the data for the wire.
     */
    function wireData() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 10;
        this.radius = 61;
        this.type = "wire";
        this.draw = function() {
            drawWire(this.x, this.y, this.width);
        };

    }

    /*
     * Function draws the wire to the screen with the given information.
     */
    function drawWire(x, y, length) {
        working_canvas.beginPath();
        working_canvas.moveTo(x, y);
        x += 1 * length;
        y += 0 * length;
        working_canvas.lineTo(x, y);
        working_canvas.stroke();
    }

    /*
     Function used to see if an object is hitting the wire by passing the objects x and y in.
     */
    wireData.prototype.hitTest = function(hitX, hitY) {

        //Looks to see if the given x is inside the objects x bounds.
        if (hitX >= this.x && hitX <= (this.x + this.width)) {

            //Looks to see if the given y is inside the objects y bounds.
            if (hitY >= (this.y - this.height) && hitY <= (this.y + this.height)) {
                return true;
            }
        }
    };

    /*
     * Function will move the wire to the given x and y location.
     */
    wireData.prototype.move = function(x, y) {
        this.x = x - 20;
        this.y = y;
    };


    /*
     Function will hold the data for a resistor.
     */
    function resistorData() {
        this.x = 0;
        this.y = 0;
        this.resistance;
        this.with = canvasHTML.width / 14.2857;
        this.height = canvasHTML.height / 45;
        this.radius = 61;
        this.type = "resistor";
        this.draw = function() {
            drawResistor(this.x, this.y);
        };
    }

    /*
     * Function will add a resistor at the given x and y loaction.
     */
    function addResistor(x, y) {
        var resistor = new resistorData;
        resistor.x = x;
        resistor.y = y;
        objects.push(resistor);
    }

    /*
     Function used to see if an object is hitting the resistor by passing the objects x and y in.
     */
    resistorData.prototype.hitTest = function(hitX, hitY) {

        //Looks to see if the given x is inside the objects x bounds.
        if (hitX >= this.x && hitX <= (this.x + this.with)) {
            //Looks to see if the given y is inside the objects y bounds.
            if (hitY >= (this.y - this.height) && hitY <= (this.y + this.height)) {
                return true;
            }
        }
    };

    /*
     * Function will move the wire to the given x and y location.
     */
    resistorData.prototype.move = function(x, y) {
        this.x = x - 30;
        this.y = y;
    };

    /*
     * Function will draw the resistor a the given x and y.
     */
    function drawResistor(x_pos, y_pos) {
        working_canvas.beginPath();
        var n;
        var distance = 7;
        var x;
        var y;
        var xpos = x_pos;
        var ypos = y_pos;
        n = 5;
        working_canvas.moveTo(xpos, ypos);
        x = xpos;
        y = ypos;
        x += 1 * 10;
        y += 0 * 10;
        working_canvas.lineTo(x, y);
        xpos += 1 * distance + 10;
        ypos += 0 * distance;

        while (n--)
        {
            working_canvas.lineTo((xpos - distance * 0), (ypos - distance * 1));
            working_canvas.lineTo(xpos + distance * 0, ypos + distance * 1);
            xpos += distance * 1;
            ypos += distance * 0;
        }
        working_canvas.lineTo(xpos, ypos);
        x = xpos;
        y = ypos;
        x += 1 * 10;
        y += 0 * 10;
        working_canvas.lineTo(x, y);
        working_canvas.stroke();
    }

    /*
     * Function gets the mouse location and returns it.
     */
    function getMousePos(canvas, evt) {
        var rect = canvasHTML.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    canvasHTML.ondblclick = (function(evt) {
        console.log("double click");
    });

    canvasHTML.onmousedown = (function(evt) {

        var mousePos = getMousePos(canvasHTML, evt);

        for (var i = 0; i < objects.length; i++)
        {
            if (objects[i].hitTest(mousePos.x, mousePos.y)) {
                saved = i;
                if (objects[saved].type === "ground") {
                    $("#myCanvas").bind('mousemove', function(evt) {
                        mousePos = getMousePos(canvasHTML, evt);
                        objects[saved].move(mousePos.x, mousePos.y);
                        draw();
                    });

                }
                if (objects[saved].type === "resistor") {
                    $("#myCanvas").bind('mousemove', function(evt) {
                        mousePos = getMousePos(canvasHTML, evt);
                        objects[saved].move(mousePos.x, mousePos.y);
                        draw();
                    });

                }
                if (objects[saved].type === "wire") {
                    $("#myCanvas").bind('mousemove', function(evt) {
                        mousePos = getMousePos(canvasHTML, evt);
                        objects[saved].move(mousePos.x, mousePos.y);
                        draw();
                    });
                }
                if (objects[saved].type === "dcpower") {
                    $("#myCanvas").bind('mousemove', function(evt) {
                        mousePos = getMousePos(canvasHTML, evt);
                        objects[saved].move(mousePos.x, mousePos.y);
                        draw();
                    });
                }
            }
        }
    });

    /*
     * Function on mouse up it unbinds the canvas to mousemove.
     */
    canvasHTML.onmouseup = (function() {
        $("#myCanvas").unbind('mousemove');
    });

    $('#save_button').click(function() {
        objects[powersettingsobject].voltage = $('#voltage').val();
         objects[powersettingsobject].measurement = $('#measurement').val();
        console.log(objects[powersettingsobject]);
        draw();
        $("#PowerSettingsBox").dialog("close");
    });

    /*
     * Sets the dc power image in the tool bar to be draggable.
     */
    $('#dcpower-img').draggable({
        helper: 'clone'
    });

    /*
     * Sets the resistor image in the tool bar to be draggable.
     */
    $('#resistor-img').draggable({
        helper: 'clone'
    });

    /*
     * Sets the wire image in the tool bar to be draggable.
     */
    $('#wire-img').draggable({
        helper: 'clone'
    });

    /*
     * Sets the ground image in the tool bar to be draggable.
     */
    $('#ground-img').draggable({
        helper: 'clone'
    });

    /*
     * Function that adds objects to the canvas when images are dropped on it.
     */
    $("#myCanvas").droppable({
        accept: "img",
        drop: function(event, ui) {

            var mousePos = getMousePos(canvasHTML, event); //Holds the position of the mouse.

            // If statement looks to see if the image that was dropped was the dc power img.
            if (ui.draggable.attr("id") === "dcpower-img") {
                addDCPower(mousePos.x, mousePos.y);
                $("#PowerSettingsBox").dialog("open");
                powersettingsobject = objects.length - 1;
            }

            // If statement looks to see if the image that was dropped was the resistor img.
            if (ui.draggable.attr("id") === "resistor-img") {
                addResistor(ui.position.left - event.target.offsetLeft, mousePos.y);
            }

            // If statement looks to see if the image was dropped was the wire img.
            if (ui.draggable.attr("id") === "wire-img") {
                addWire(ui.position.left - event.target.offsetLeft, mousePos.y, 40);
            }

            // If statement looks to see if the image that was dropped was the ground img.
            if (ui.draggable.attr("id") === "ground-img") {
                addGround(mousePos.x, mousePos.y - 10);
            }

            draw();
        }
    });
});








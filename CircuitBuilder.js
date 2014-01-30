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
    init();


    /*
     Function will init() the stock objects and call the draw function.
     */
    function init() {
        addBox(700, 0, 100, 100, "resistor");
        addBox(700, 100, 100, 100, "wire");
        draw();
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

    /*
     Function holds the data for a box
     */
    function boxData() {
        this.x = 0; //Holds the x location of the box.
        this.y = 0; //Holds the y location of the box.
        this.width = 0; //Holds the width of the box.
        this.height = 0; //Holds the height of the box.
        this.type = "box"; //Holds the type.
        this.spawner = ""; //Holds what the box will spawn to the screen.
        this.draw = function() {
            drawBox(this.x, this.y, this.width, this.height, this.spawner);
        };
    }

    /*
     Function will create a new box with the given infomation. 
     */
    function addBox(x, y, width, height, spawner) {
        var box = new boxData;
        box.x = x;
        box.y = y;
        box.width = width;
        box.height = height;
        box.spawner = spawner;
        objects.push(box);
    }

    /*
     Function will draw the box to the screen/
     */
    function drawBox(xpos, ypos, Width, Height, spawner) {
        working_canvas.beginPath();
        if (spawner === "resistor") {
            drawResistor(xpos + 20, ypos + 50);
        }
        if (spawner === "wire") {
            drawWire(xpos + 30, ypos + 50, 40);
        }

        working_canvas.rect(xpos, ypos, Width, Height);
        working_canvas.fillStyle = '#C0C0C0';
        working_canvas.fill();
        working_canvas.linewidth = 7;
        working_canvas.strokeStyle = 'black';
        working_canvas.stroke();
    }

    /*
     Function used to see if an object is hitting the box by passing the objects x and y in.
     */
    boxData.prototype.hitTest = function(hitX, hitY) {

        //Looks to see if the given x is inside the objects x bounds.
        if (hitX >= this.x && hitX <= (this.x + this.width)) {

            //Looks to see if the given y is inside the objects y bounds.
            if (hitY >= (this.y) && hitY <= (this.y + this.height)) {
                return true;
            }
        }

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
        this.x = x - 30;
        this.y = y;
    };


    /*
     Function will hold the data for a resistor.
     */
    function resistorData() {
        this.x = 0;
        this.y = 0;
        this.with = 56;
        this.height = 10;
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

    function getMousePos(canvas, evt) {
        var rect = canvasHTML.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    canvasHTML.onmousedown = (function(evt) {

        var mousePos = getMousePos(canvasHTML, evt);
        for (var i = 0; i < objects.length; i++)
        {
            if (objects[i].hitTest(mousePos.x, mousePos.y)) {
                saved = i;
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
                if (objects[saved].type === "box") {
                    if (objects[saved].spawner === "resistor") {
                        addResistor(mousePos.x, mousePos.y);
                    }
                    if (objects[saved].spawner === "wire") {
                        addWire(mousePos.x, mousePos.y, 40);
                    }

                }
            }
        }
    });
    canvasHTML.onmouseup = (function(evt) {
        var hit = 0;
        $("#myCanvas").unbind('mousemove');
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].hitTest(objects[saved].x + 60, objects[saved].y)) {
                if (objects[i].type === "box" && objects[saved].type !== "box") {
                    hit = 1;

                }
            }
        }
        if (hit === 1) {
            objects.splice(saved, 1);
            draw();
        }
    });

});








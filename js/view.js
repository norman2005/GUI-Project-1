define(['Objects'], function(Objects) {

    var c = canvas.getContext('2d');

    function render() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        Objects.each(renderManager);
    }

    function renderManager(Object) {

        if (Object.get('type') === "dcpower") {
            renderDCPowerSupply(Object);
        }
        if (Object.get('type') === "wire") {
            renderWire(Object);
        }
        if (Object.get('type') === "resistor") {
            renderResistor(Object);
        }
        if (Object.get('type') === "ground"){
            renderGround(Object);
        }
    }

    function renderDCPowerSupply(PowerSupply) {
        var x = PowerSupply.get('x');
        var y = PowerSupply.get('y');
        c.beginPath();
        c.arc(x, y, 20, 0, 2 * Math.PI);
        x = x - 20;
        c.moveTo(x, y);
        x = x - 15;
        c.lineTo(x, y);
        x = x + 55;
        c.moveTo(x, y);
        x = x + 15;
        c.lineTo(x, y);
        c.stroke();
        if (PowerSupply.get('snap') && PowerSupply.get('being_moved')) {
            c.beginPath();
            c.arc(PowerSupply.get('snap_location_x'), PowerSupply.get('snap_location_y'), 3, 0, 2 * Math.PI);
            c.fillStyle = 'blue';
            c.fill();
            c.stroke();
        }
    }

    function renderWire(wire) {
        var x = wire.get('x');
        var y = wire.get('y');
        c.beginPath();
        x = x - 20;
        c.moveTo(x, y);
        x += 1 * 40;
        y += 0 * 40;
        c.lineTo(x, y);
        c.stroke();
        if (wire.get('snap') && wire.get('being_moved')) {
            c.beginPath();
            c.arc(wire.get('snap_location_x'), wire.get('snap_location_y'), 3, 0, 2 * Math.PI);
            c.fillStyle = 'blue';
            c.fill();
            c.stroke();
        }
    }

    function renderResistor(Resistor) {
        var x = Resistor.get('x');
        var y = Resistor.get('y');
        var n = 5;
        var distance = 7;
        var xpos = x;
        var ypos = y;
        c.beginPath();
        xpos = xpos - (Resistor.get('width'));
        c.moveTo(xpos, ypos);
        x = xpos;
        y = ypos;
        x += 1 * 10;
        y += 0 * 10;
        c.lineTo(x, y);
        xpos += 1 * distance + 10;
        ypos += 0 * distance;

        while (n--)
        {
            c.lineTo((xpos - distance * 0), (ypos - distance * 1));
            c.lineTo(xpos + distance * 0, ypos + distance * 1);
            xpos += distance * 1;
            ypos += distance * 0;
        }
        c.lineTo(xpos, ypos);
        x = xpos;
        y = ypos;
        x += 1 * 10;
        y += 0 * 10;
        c.lineTo(x, y);
        c.stroke();
        if (Resistor.get('snap') && Resistor.get('being_moved')) {
            c.beginPath();
            c.arc(Resistor.get('snap_location_x'), Resistor.get('snap_location_y'), 3, 0, 2 * Math.PI);
            c.fillStyle = 'blue';
            c.fill();
            c.stroke();
        }
    }
    
    function renderGround(Ground){
        var x = Ground.get('x');
        var y = Ground.get('y');
         c.beginPath();
        c.moveTo(x, y);
        y = y - 14;
        c.lineTo(x, y);
        y = y + 14;
        x = x - 16;
        c.moveTo(x, y);
        x = x + 32;
        c.lineTo(x, y);
        y = y + 5;
        x = x - 26;
        c.moveTo(x, y);
        x = x + 20;
        c.lineTo(x, y);
        y = y + 5;
        x = x - 15;
        c.moveTo(x, y);
        x = x + 10;
        c.lineTo(x, y);
        c.stroke();
        if (Ground.get('snap') && Ground.get('being_moved')) {
            c.beginPath();
            c.arc(Ground.get('snap_location_x'), Ground.get('snap_location_y'), 3, 0, 2 * Math.PI);
            c.fillStyle = 'blue';
            c.fill();
            c.stroke();
        }
    }
    Objects.on('add', render);
    Objects.on('change', render);
});



define(['Objects', 'Object', 'PowerSupply', 'Wire', 'Ground'],
        function(Objects, Object, PowerSupply, Wire, Ground) {
            var objectBeingMoved;
            var objectBeingModified;
            var startX;
            var startY;

            var canvasHTML = document.getElementById("canvas");

            function getMousePos(canvas, evt) {
                var rect = canvasHTML.getBoundingClientRect();
                return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            }


            function findOBjectUnderMouse(x, y) {
                return Objects.find(function(Object) {
                    return Object.contains(x, y);
                });
            }

            canvas.addEventListener('mousedown', function(e) {
                var mousePos = getMousePos(canvasHTML, e);
                objectBeingMoved = findOBjectUnderMouse(mousePos.x, mousePos.y);
                if (objectBeingMoved) {
                    startX = objectBeingMoved.get('x');
                    startY = objectBeingMoved.get('y');
                }
            });

            canvas.addEventListener('mousemove', function(e) {
                var mousePos = getMousePos(canvasHTML, e);
                if (objectBeingMoved) {
                    objectBeingMoved.set({
                        being_moved: true,
                        x: mousePos.x,
                        y: mousePos.y
                    });
                }
            });

            canvas.addEventListener('mouseup', function(e) {
                if (objectBeingMoved.get('snap')) {
                    objectBeingMoved.set({
                        x: objectBeingMoved.get('snap_x'),
                        y: objectBeingMoved.get('snap_y'),
                        being_moved: false
                    });
                }
                if (objectBeingMoved) {
                    objectBeingMoved.set('being_moved', false);
                    objectBeingMoved = null;
                }
            });

            canvas.addEventListener('dblclick', function(e) {
                objectBeingModified = findOBjectUnderMouse(e.pageX, e.pageY);
            });

            $("#CircuitToolBar").tabs();//Inits the jQuery UI Tabs.

            $('#ground-img').draggable({cursorAt: {left: 17, top: 15}, helper: 'clone'});
        });


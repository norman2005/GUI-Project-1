define(['Objects'], function(Objects) {


    var objectBeingMoved;

    function snap() {
        Objects.each(snapUpdate);
        objectBeingMoved = getObjectBeingMoved();
        if (objectBeingMoved) {
            snapManager(objectBeingMoved);
        }
    }

    function getObjectBeingMoved() {
        return Objects.find(function(Object) {
            return Object.beingMoved();
        });
    }

    function snapUpdate(Object) {
        if (Object.get('left_snapable') && Object.get('right_snapable')) {
            Object.set('left_snap_x', (Object.get('x') - (Object.get('width'))));
            Object.set('left_snap_y', Object.get('y'));
            Object.set('right_snap_x', (Object.get('x') + (Object.get('width'))));
            Object.set('right_snap_y', Object.get('y'));
        }
        if (Object.get('top_snapable')) {
            Object.set('top_snap_x', Object.get('x'));
            Object.set('top_snap_y', Object.get('y') - 14);
        }
    }

    function snapManager(objectBeingMoved) {
        if (objectBeingMoved.get('left_snapable') && objectBeingMoved.get('right_snapable')) {
            Objects.each(leftRightSnapCheck);
        }
        if (objectBeingMoved.get('top_snapable')) {
            Objects.each(topSnapCheck);
        }
    }

    function leftRightSnapCheck(Object) {
        // console.log("left and right snap check");
        var snap_range = 10;
        var snapping = false;
        if (Object.get('left_snapable') && Object.get('right_snapable')) {
            //left snap check
            if ((Object.get('right_snap_x') - snap_range) <= objectBeingMoved.get('left_snap_x') && (Object.get('right_snap_x') + snap_range) >= objectBeingMoved.get('left_snap_x')) {
                if ((Object.get('right_snap_y') - snap_range) <= objectBeingMoved.get('left_snap_y') && (Object.get('right_snap_y') + snap_range) >= (objectBeingMoved.get('left_snap_y'))) {
                    snapping = true;
                    objectBeingMoved.set('snap_location_x', Object.get('right_snap_x'));
                    objectBeingMoved.set('snap_location_y', Object.get('right_snap_y'));
                    objectBeingMoved.set('snap_x', (Object.get('right_snap_x') + objectBeingMoved.get('width')));
                    objectBeingMoved.set('snap_y', Object.get('right_snap_y'));
                    objectBeingMoved.set('left_connected', Object.cid);
                }
            }
            //right snap check
            if ((Object.get('left_snap_x') - snap_range) <= objectBeingMoved.get('right_snap_x') && (Object.get('left_snap_x') + snap_range) >= objectBeingMoved.get('right_snap_x')) {
                if ((Object.get('left_snap_y') - snap_range) <= objectBeingMoved.get('right_snap_y') && (Object.get('left_snap_y') + snap_range) >= (objectBeingMoved.get('right_snap_y'))) {
                    snapping = true;
                    objectBeingMoved.set('snap_location_x', Object.get('left_snap_x'));
                    objectBeingMoved.set('snap_location_y', Object.get('left_snap_y'));
                    objectBeingMoved.set('snap_x', (Object.get('left_snap_x') - objectBeingMoved.get('width')));
                    objectBeingMoved.set('snap_y', Object.get('left_snap_y'));
                    objectBeingMoved.set('right_connected', Object.cid);
                }
            }
        }
        if (Object.get('top_snapable')) {
            //left snap check
            if ((Object.get('top_snap_x') - snap_range) <= objectBeingMoved.get('left_snap_x') && (Object.get('top_snap_x') + snap_range) >= objectBeingMoved.get('left_snap_x')) {
                if ((Object.get('top_snap_y') - snap_range) <= objectBeingMoved.get('left_snap_y') && (Object.get('top_snap_y') + snap_range) >= (objectBeingMoved.get('left_snap_y'))) {
                    snapping = true;
                    objectBeingMoved.set('snap_location_x', Object.get('top_snap_x'));
                    objectBeingMoved.set('snap_location_y', Object.get('top_snap_y'));
                    objectBeingMoved.set('snap_x', (Object.get('top_snap_x') + objectBeingMoved.get('width')));
                    objectBeingMoved.set('snap_y', Object.get('top_snap_y'));
                    objectBeingMoved.set('left_connected', Object.cid);
                }
            }
            //right snap check
            if ((Object.get('top_snap_x') - snap_range) <= objectBeingMoved.get('right_snap_x') && (Object.get('top_snap_x') + snap_range) >= objectBeingMoved.get('right_snap_x')) {
                if ((Object.get('top_snap_y') - snap_range) <= objectBeingMoved.get('right_snap_y') && (Object.get('top_snap_y') + snap_range) >= (objectBeingMoved.get('right_snap_y'))) {
                    snapping = true;
                    objectBeingMoved.set('snap_location_x', Object.get('top_snap_x'));
                    objectBeingMoved.set('snap_location_y', Object.get('top_snap_y'));
                    objectBeingMoved.set('snap_x', (Object.get('top_snap_x') - objectBeingMoved.get('width')));
                    objectBeingMoved.set('snap_y', Object.get('top_snap_y'));
                    objectBeingMoved.set('right_connected', Object.cid);
                }
            }
        }
        //set the snap
        if (snapping) {
            objectBeingMoved.set('snap', snapping);
        } else {
            if (objectBeingMoved.get('snap') && Object.cid === objectBeingMoved.get('left_connected')) {
                objectBeingMoved.set('snap', false);
                objectBeingMoved.set('left_connected', null);
            }
            if (objectBeingMoved.get('snap') && Object.cid === objectBeingMoved.get('right_connected')) {
                objectBeingMoved.set('snap', false);
                objectBeingMoved.set('right_connected', null);
            }
        }
    }

    function topSnapCheck(Object) {
        // console.log("top snap check");
        var snap_range = 10;
        var snapping = false;
        if (Object.get('left_snapable') && Object.get('right_snapable')) {
            //left snap check
            if ((Object.get('right_snap_x') - snap_range) <= objectBeingMoved.get('top_snap_x') && (Object.get('right_snap_x') + snap_range) >= objectBeingMoved.get('top_snap_x')) {
                if ((Object.get('right_snap_y') - snap_range) <= objectBeingMoved.get('top_snap_y') && (Object.get('right_snap_y') + snap_range) >= (objectBeingMoved.get('top_snap_y'))) {
                    snapping = true;
                    objectBeingMoved.set('snap_location_x', Object.get('right_snap_x'));
                    objectBeingMoved.set('snap_location_y', Object.get('right_snap_y'));
                    objectBeingMoved.set('snap_x', (Object.get('right_snap_x')));
                    objectBeingMoved.set('snap_y', Object.get('right_snap_y') + objectBeingMoved.get('width'));
                    objectBeingMoved.set('top_connected', Object.cid);
                }
            }
            //right snap check
            if ((Object.get('left_snap_x') - snap_range) <= objectBeingMoved.get('top_snap_x') && (Object.get('left_snap_x') + snap_range) >= objectBeingMoved.get('top_snap_x')) {
                if ((Object.get('left_snap_y') - snap_range) <= objectBeingMoved.get('top_snap_y') && (Object.get('left_snap_y') + snap_range) >= (objectBeingMoved.get('top_snap_y'))) {
                    snapping = true;
                    objectBeingMoved.set('snap_location_x', Object.get('left_snap_x'));
                    objectBeingMoved.set('snap_location_y', Object.get('left_snap_y'));
                    objectBeingMoved.set('snap_x', (Object.get('left_snap_x')));
                    objectBeingMoved.set('snap_y', Object.get('left_snap_y') + objectBeingMoved.get('width'));
                    objectBeingMoved.set('top_connected', Object.cid);
                }
            }
        }
        if (Object.get('top_snapable')) {

        }
        //set the snap
        if (snapping) {
            objectBeingMoved.set('snap', snapping);
        } else {
            if (objectBeingMoved.get('snap') && Object.cid === objectBeingMoved.get('top_connected')) {
                objectBeingMoved.set('snap', false);
                objectBeingMoved.set('top_connected', null);
            }
        }
    }

    Objects.on('change:x', snap);
    Objects.on('change:y', snap);
    Objects.on('change:being_moved', snap);
});



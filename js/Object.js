define([], function() {
    var type, //Holds the type of the object.
            width, //Holds the width of the object.
            height, //Holds the height of the object.
            x, //Holds the x position of the object.
            y, //Holds the y position of the object.
            snap = false, //Tells if the object is snapping to another object.
            snap_x, //Holds the snap x location.
            snap_y, //Holds the snap y location.
            snap_location_x,
            snap_location_y,
            left_connected,
            right_connected,
            being_moved = false,
            top_connected,
            left_snap_x, //Holds the left snap x location.
            left_snap_y, //Holds the left snap y location.
            right_snap_x, //Holds the right snap x location.
            right_snap_y, //Holds the right snap y location.
            top_snap_x, //Holds the top snap x location.
            top_snap_y, //Holds the top snap y location.
            bottom_snap_x, //Holds the bottom snap x location.
            bottom_snap_y, //Holds the bottom snap y location.
            left_snapable, //True if it can snap left.
            right_snapable, //True if it can snap right.
            top_snapable, //True if it can snap on top.
            bottom_snapable; //True if it can snap on bottom.
    return Backbone.Model.extend({
        contains: function(x, y) {
            if (x >= this.get('x') - this.get('width') && x <= (this.get('x') + this.get('width'))) {
                if (y >= (this.get('y') - this.get('height')) && y <= (this.get('y') + this.get('height'))) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        beingMoved: function() {
            if (this.get('being_moved')) {
                return true;
            } else {
                return false;
            }
        },
        type: type,
        width: width,
        height: height,
        x: x,
        y: y,
        snap: snap,
        being_moved: being_moved,
        snap_x: snap_x,
        snap_y: snap_y,
        left_snapable: left_snapable,
        right_snapable: right_snapable
    });
});


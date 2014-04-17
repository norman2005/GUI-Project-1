define(['Object'], function(Object) {
    return Object.extend({
        initialize: function() {
            this.set('height', 10);
            this.set('width', 20);
            this.set('type', 'wire');
            this.set('left_snapable', true);
            this.set('right_snapable', true);
            this.set('left_snap_x', (this.get('x') - (this.get('width'))));
            this.set('left_snap_y', this.get('y'));
            this.set('right_snap_x', (this.get('x') + (this.get('width'))));
            this.set('right_snap_y', this.get('y'));
        }
    });
});




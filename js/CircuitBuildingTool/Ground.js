define(['Object'], function(Object) {
    return Object.extend({
        initialize: function() {
            this.set('height', 32);
            this.set('width', 14);
            this.set('type', 'ground');
            this.set('top_snapable', true);
            this.set('top_snap_x', this.get('x'));
            this.set('top_snap_y', this.get('y') - 14);

        }
    });
});






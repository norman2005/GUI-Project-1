define(['Objects'], function(Objects) {
    var test;

    function Update() {
        Objects.each(function(Object) {
            test = Object.toJSON();
        });
    }

    Objects.on('change', Update);
});
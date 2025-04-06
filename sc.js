(function () {
    'use strict'

    function start() {
        if (window.lampac_src_filter_plugin) {
            return;
        }

        window.lampac_src_filter_plugin = true;

        Lampa.Controller.listener.follow('app', function (event) {
            if (Lampa.Activity.active().component.toLowerCase() == "main") {
                console.log("BUDDY!");
            }
        });

    if (window.appready) {
        start();
    } else {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') {
                start();
            }
        });
    }
})();

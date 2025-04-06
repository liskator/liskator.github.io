(function () {
    'use strict'

    function start() {
        if (window.lampac_src_filter_plugin) {
            return;
        }

        window.lampac_src_filter_plugin = true;

        Lampa.Controller.listener.follow('toggle', function (event) {
            if (event.name !== 'select') {
                return;
            }

            var active = Lampa.Activity.active();
            var componentName = active.component.toLowerCase();

            if (componentName !== 'main') {
                return;
            }
            console.log("LISKATOR");
        });
    }

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

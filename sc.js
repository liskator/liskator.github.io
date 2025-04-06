(function () {
    'use strict'

    function start() {
        if (window.lampac_src_filter_plugin) {
            return;
        }

        
alert("Hello");
    };

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

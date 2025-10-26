    (function () {
        'use strict'

        function start() {
            if (window.lampac_hist) {
                return;
            }
            if (window.localStorage.getItem('favorite') == null) {
                return;
            }
            window.lampac_hist = true;

            const manifest = {
                type: 'control',
                version: '1.0',
                name: 'History',
                description: 'History',
                component: 'History',
                onMain: (data) => {
                    return {
                    title:['История'],
                    results:JSON.parse(localStorage.getItem('favorite')).card.reverse().slice(0,9),
                    }
                }
            };
            Lampa.Manifest.plugins = manifest;
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

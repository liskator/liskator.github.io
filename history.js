    (function () {
        'use strict'

        function start() {
            if (window.lampac_hist) {
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
                    results:JSON.parse(localStorage.getItem('favorite')).card.reverse(),
                    url:"&title=История%20просмотров&component=favorite&type=history&page=1"    
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

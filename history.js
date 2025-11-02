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

        function GetHist () {    let data = {}
            let params = {type:'history'}
            data.results = Lampa.Favorite.get(params)
           return data.results
         }
        Lampa.ContentRows.add({
            index: 0,
            screen: ['main'],
            call: (params, screen)=>{
                // возвращаем функцию с коллбеком
                return function(call){
                    call({
                        results: GetHist(),
                        title: 'История',
                    })
                }
            }
        })
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

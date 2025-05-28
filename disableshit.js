(function () {
    'use strict'

    function start() {
        if (window.lampac_disable_shiiet) {
            return;
        }

        window.lampac_disable_shiiet = true;

        //скрыть колокольчик и фид
        $('.head .notice--icon, .head .open--feed').remove();

        //скрыть кнопку реакций
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'complite') 
                $('.button--reaction, .full-start-new__reactions').remove();
        });

        //основные настройки
        window.lampa_settings.disable_features = {
            dmca: true,
            ai: true,
            subscribe: true,
            trailers: true,
        }

        localStorage.setItem('menu_hide', JSON.stringify(["Персоны", "Лента", "Расписание", "Релизы", "Подписки",]));
        localStorage.setItem('helper', 'false');
        localStorage.setItem('screensaver', 'false');
        //Lampa.Storage.set('card_interfice_type', 'old');
        Lampa.Storage.set('source', 'tmdb');
        Lampa.Storage.set('keyboard_type', 'integrate');


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

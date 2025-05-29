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
        //сортировка источников по качеству
        Lampa.Controller.listener.follow('toggle', function (event) {
            if (event.name !== 'select') {
                return;
            }

            var $filterTitle = $('.selectbox__title');

            if ($filterTitle.length !== 1 || $filterTitle.text() !== Lampa.Lang.translate('filter_sorted')) {
                return;
            }
            var $selectOptions = $('.selectbox-item');
            let regvar = /\d{3,4}p$/;
            const sortedElements = $selectOptions.toArray().sort((a, b) => {
                const matchA = a.innerText.match(regvar);
                const matchB = b.innerText.match(regvar);

                const numA = matchA ? parseInt(matchA[0]) : 0;
                const numB = matchB ? parseInt(matchB[0]) : 0;

                return numB - numA; // Descending order
            });

            $selectOptions = $(sortedElements);

            if ($selectOptions.length > 0) {
                $selectOptions.first().after($selectOptions);
            } else {
                $('body > .selectbox').find('.scroll__body').prepend($selectOptions);
            }

        });
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

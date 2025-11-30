(function () {
    'use strict'
        var unic_id = Lampa.Storage.get('lampac_unic_id', '');
        if (!unic_id) {
            unic_id = Lampa.Utils.uid(8).toLowerCase();
            Lampa.Storage.set('lampac_unic_id', unic_id);
        }

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl,false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    function start() {
        if (window.lampac_disable_shiiet) {
            return;
        }

        window.lampac_disable_shiiet = true;

        //скрыть колокольчик и фид
        $('.head .notice--icon, .head .open--feed, .head .open--profile, .head .black-friday__button').remove();

        //скрыть кнопку реакций
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'complite') 
                $('.button--reaction, .full-start-new__reactions').remove();
        });
		//скрыть AI-асистент в поиске
		Lampa.Controller.listener.follow('toggle',(e)=>{if (e.name==="search") $("#app .search__sources div:nth-child(5)").remove();});
		
        //основные настройки
        window.lampa_settings.disable_features = {
            dmca: true,
            ai: true,
            subscribe: true,
            trailers: true,
        }

		
        localStorage.setItem('menu_hide', JSON.stringify(["Персоны", "Лента", "Расписание", "Релизы", "Подписки","Спорт"]));
        localStorage.setItem('helper', 'false');
        localStorage.setItem('screensaver', 'false');
        //Lampa.Storage.set('card_interfice_type', 'old');
        Lampa.Storage.set('source', 'tmdb');
        Lampa.Storage.set('keyboard_type', 'integrate');

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
        // Отобразить место на диске 
        Lampa.Listener.follow('activity',function (e) {
            if(e.component==="lampac_dnla" && e.type === "start" )
            {
                console.log('Disk Space:', httpGet('https://lisklamp.isplevel.pro/status/disk?uid='+unic_id) ,"GB");
	        $('.dlna-disk-space').remove();
                $('.lampac-dnla-head').find('div').after("<div class='dlna-disk-space'><b>"+httpGet('https://lisklamp.isplevel.pro/status/disk?uid='+unic_id)+" GB</b> Свободно на диске</div>");
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

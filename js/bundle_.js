//"use strict";

(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
                }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];return o(n || r);
                }, p, p.exports, r, e, n, t);
            }return n[i].exports;
        }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
            o(t[i]);
        }return o;
    }return r;
})()({ 1: [function (require, module, exports) {
        function calc() {
            // переменные для калькулятора
            var calcBtn = document.querySelectorAll('.popup_calc_btn'); //кнопка вызова калькулятора
            var popCalc = document.querySelectorAll('.popup_calc')[0]; // окно калькудятора
            var popCalcClose = document.querySelector('.popup_calc_close'); //закрытие окна калькулятора
            var calcNext = popCalc.querySelector('.popup_calc_button'); // кнопка "далее" у  калькулятора
            var calcNextProfile = document.querySelector('.popup_calc_profile'); // следующее окно за калькулятором
            var calcNextEnd = document.querySelector('.popup_calc_profile_button'); //кнопка далее на последнюю страницу
            var calcEnd = document.querySelector('.popup_calc_end'); //последнее окно калькулятора
            var calcCloseEnd = document.querySelector('.popup_calc_end_close');

            //для Хранения данных пользователя в переменных
            var width = 0;
            var height = 0;
            var check1 = void 0; //храним условие "холодное"
            var check2 = void 0; // храним условие "теплое"
            var view = void 0; //храним вид балкона



            for (var i = 0; i < calcBtn.length; i++) {
                calcBtn[i].addEventListener('click', calc);
            };

            function calc() {

                //объект для хранения данных калькулятора 
                var answer = new Object();

                popCalc.style.display = 'block'; //показываем окно калькулятора

                //по клику закрываем окно
                popCalcClose.addEventListener('click', function () {
                    popCalc.style.display = 'none';
                });

                //переключение балконов
                var tabHeaderw = document.querySelector('.info-header-tab_w'); //блок с табами
                var tabw = document.getElementsByClassName('tab_w'); //таб на которые щелкнули
                //let tabAo = document.getElementsByTagName('after_click');
                var tabContentw = document.getElementsByClassName('info-tabcontent_w'); //контент таба


                //скрываем табs балконов
                function hideTabContentw(a) {
                    for (var _i = a; _i < tabContentw.length; _i++) {

                        tabContentw[_i].classList.remove('show');
                        tabContentw[_i].classList.add('hide');
                        tabw[_i].classList.remove('scale');
                    }
                };

                hideTabContentw(1);

                function showTabContentw(b) {
                    if (tabContentw[b].classList.contains('hide')) {
                        hideTabContentw(0);
                        tabContentw[b].classList.remove('hide');
                        tabContentw[b].classList.add('show');
                    }
                }

                tabHeaderw.addEventListener('click', function (e) {

                    e.preventDefault();
                    var target = e.target;
                    for (var _i2 = 0; _i2 < tabw.length; _i2++) {
                        tabw[_i2].classList.remove('scale');
                        if (target == tabw[_i2]) {
                            showTabContentw(_i2);
                            tabw[_i2].classList.add('scale');
                            answer.view = tabw[_i2].getAttribute('data-view');
                            break;
                        }
                    }
                });

                var calcInput = popCalc.querySelectorAll('.form-control');

                for (var _i3 = 0; _i3 < calcInput.length; _i3++) {
                    calcInput[_i3].onkeyup = function () {
                        return this.value = this.value.replace(/[^\d]/g, '');
                    };
                }

                calcNext.addEventListener('click', function () {
                    popCalc.style.display = 'none';
                    calcNextProfile.style.display = 'block';

                    width = calcInput[0].value;
                    height = calcInput[1].value;

                    answer.width = +width;
                    answer.height = +height;

                    calcNextProfile.querySelector('.popup_calc_profile_close').addEventListener('click', function () {
                        calcNextProfile.style.display = 'none';
                    });

                    check1 = calcNextProfile.querySelectorAll('.checkbox')[0];
                    check2 = calcNextProfile.querySelectorAll('.checkbox')[1];

                    calcNextEnd.setAttribute('disabled', 'disabled'); //отключаем кнопку "далее" пока не будет поставлена галка

                    check1.addEventListener('change', function () {
                        check2.checked = false;
                        calcNextEnd.disabled = false;
                        answer.condition = check1.value;
                    });

                    check2.addEventListener('change', function () {
                        check1.checked = false;
                        calcNextEnd.disabled = false;
                        answer.condition = check2.value;
                    });
                });

                calcNextEnd.addEventListener('click', function () {
                    calcNextProfile.style.display = 'none';
                    calcEnd.style.display = 'block';
                });

                calcCloseEnd.addEventListener('click', function () {
                    calcEnd.style.display = 'none';
                    answer.length = 0; //чистим объект с ответами

                    //чистим поля
                    for (var _i4 = 0; _i4 < calcInput.length; _i4++) {
                        calcInput[_i4].value = '';
                    }
                    check1.checked = false;
                    check2.checked = false;
                });
            }
        };

        module.exports = calc;
    }, {}], 2: [function (require, module, exports) {
        function form_modal() {
            //объект для хранения сообщений пользователю
            var message = new Object();
            message.loading = 'Загрузка ...';
            message.success = 'Спасибо! Скоро мы с вами свяжемся!';
            message.failure = 'Что-то пошло не так...';

            //форма в модальных окнах

            //делаем div
           var statusMessage = document.createElement('div');
            statusMessage.classList = 'status';

            var formModal = document.getElementsByClassName('form');

            var _loop = function _loop(i) {

                var input = formModal[i].getElementsByTagName('input');

                input[1].onkeyup = function () {
                    return this.value = this.value.replace(/[^\d]/g, '');
                };

                formModal[i].addEventListener('submit', function (e) {
                    e.preventDefault();
                    formModal[i].appendChild(statusMessage);

                    //AJAX
                    var request = new XMLHttpRequest();
                    //настройка запроса
                    request.open('POST', 'server.php');

                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    var formData = new FormData(formModal[i]); //объект для хранения данных формы

                    //посылка запроса
                    request.send(formData);

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            statusMessage.innerHTML = message.loading;
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                statusMessage.innerHTML = message.success;
                                //Добавляем контент. Прелоадер
                            } else {
                                statusMessage.innerHTML = message.failure;
                            }
                        }
                    };

                    //очищяем поля ввода
                    for (var _i5 = 0; _i5 < input.length; _i5++) {
                        input[_i5].value = '';
                    }
                    formData.delete(formData);
                });
            };

            for (var i = 0; i < formModal.length; i++) {
                _loop(i);
            }
        };

        module.exports = form_modal;
    }, {}], 3: [function (require, module, exports) {
        function form_str() {
            //форма на страницах
            // объект где будем хранить сообщения для пользователя
            var message = new Object();
            message.loading = 'Загрузка ...';
            message.success = 'Спасибо! Скоро мы с вами свяжемся!';
            message.failure = 'Что-то пошло не так...';

            var form = document.getElementsByClassName('main_form');


            //делаем div
            var statusMessage = document.createElement('div');
            statusMessage.classList = 'status';

            var _loop2 = function _loop2(i) {

                var input = form[i].getElementsByTagName('input');

                input[1].onkeyup = function () {
                    return this.value = this.value.replace(/[^\d]/g, '');
                };

                form[i].addEventListener('submit', function (e) {
                    e.preventDefault();
                    form[i].appendChild(statusMessage);

                    //AJAX
                    var request = new XMLHttpRequest();
                    //настройка запроса
                    request.open('POST', 'server.php');

                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    var formData = new FormData(form[i]); //объект для хранения данных формы

                    //посылка запроса
                    request.send(formData);

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            statusMessage.innerHTML = message.loading;
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                statusMessage.innerHTML = message.success;
                                //Добавляем контент. Прелоадер
                            } else {
                                statusMessage.innerHTML = message.failure;
                            }
                        }
                    };

                    //очищяем поля ввода
                    for (var _i6 = 0; _i6 < input.length; _i6++) {
                        input[_i6].value = '';
                    }
                    formData.delete(formData);
                });
            };

            for (var i = 0; i < form.length; i++) {
                _loop2(i);
            }
        };

        module.exports = form_str;
    }, {}], 4: [function (require, module, exports) {
        function foto() {
            var MyModalImg = document.getElementsByClassName('MyModalImg');
            //let modal = document.querySelector('.modal');
            var src = [];
            var image = void 0;

            var _loop3 = function _loop3(i) {
                src.splice(0, src.length);
                MyModalImg[i].addEventListener('click', function (e) {

                    e.preventDefault();
                    var div = document.createElement('div');
                    src[i] = MyModalImg[i].getAttribute('href');
                    div.className = 'modal';
                    var image = document.createElement('img');
                    image.src = src[i];
                    MyModalImg[i].appendChild(div);
                    div.appendChild(image);

                    var modal = document.querySelector('.modal');
                    modal.style.display = 'block';
                });
            };

            for (var i = 0; i < MyModalImg.length; i++) {
                _loop3(i);
            };

            window.addEventListener('click', function (e) {

                var modal = document.querySelector('.modal');
                var img = document.querySelectorAll('.modal');

                for (var i = 0; i < img.length; i++) {
                    if (e.target == modal) {
                        img[i].remove();
                    }
                }
            });
        };

        module.exports = foto;
    }, {}], 5: [function (require, module, exports) {
        function popup() {

            //modal Request an engineer
            function zamer() {
                var popupEngener = document.getElementsByClassName('popup_engineer')[0];
                var popupBtn = document.getElementsByClassName('popup_engineer_btn')[0];
                var popupClose = document.getElementsByClassName('popup_close')[1];

                //для Хранения данных пользователя в переменных
                var width = 0;
                var height = 0;
                var check1 = void 0; //храним условие "холодное"
                var check2 = void 0; // храним условие "теплое"
                var view = void 0; //храним вид балкона


                popupBtn.addEventListener('click', function () {
                    popupEngener.style.display = 'block';
                });

                popupClose.addEventListener('click', function () {
                    popupEngener.style.display = 'none';
                });

                window.addEventListener('click', function (e) {
                    if (e.target === popupEngener) {
                        popupEngener.style.display = 'none';
                    }
                });
            }

            zamer();

            //modal  obrat zvonok


            function modalPopup() {
                var phoneLink = document.getElementsByClassName('phone_link');
                var popupZvonok = document.getElementsByClassName('popup')[0];
                var popupCloseZv = document.getElementsByClassName('popup_close')[0];

                for (var i = 0; i < phoneLink.length; i++) {
                    phoneLink[i].addEventListener('click', function (e) {
                        e.preventDefault();
                        popupZvonok.style.display = 'block';
                    });
                };

                popupCloseZv.addEventListener('click', function () {
                    popupZvonok.style.display = 'none';
                });

                window.addEventListener('click', function (e) {
                    if (e.target === popupZvonok) {
                        popupZvonok.style.display = 'none';
                    }
                });
            }

            modalPopup();
        };

        module.exports = popup;
    }, {}], 6: [function (require, module, exports) {
        function tab() {
            //tab window
            var tabHeader = document.querySelector('.info-header-tab'); //блок с табами
            var tab = document.getElementsByClassName('tab'); //таб на которые щелкнули
            var tabA = document.getElementsByTagName('a');
            var tabContent = document.getElementsByClassName('info-tabcontent'); //контент таба


            //скрываем табы
            function hideTabContent(a) {
                for (var i = a; i < tabContent.length; i++) {
                    tabContent[i].classList.remove('show');
                    tabContent[i].classList.add('hide');
                    tabA[i + 1].classList.remove('active');
                }
            };

            hideTabContent(1);

            // показываем таб
            function showTabContent(b) {
                if (tabContent[b].classList.contains('hide')) {
                    hideTabContent(0);
                    tabContent[b].classList.remove('hide');
                    tabContent[b].classList.add('show');
                }
            }

            tabHeader.addEventListener('click', function (e) {
                e.preventDefault();
                var target = e.target;

                for (var i = 0; i < tab.length; i++) {
                    if (target.parentNode == tab[i]) {
                        showTabContent(i);
                        tabA[i + 2].classList.add('active');
                        break;
                    }
                }
            });
        }

        module.exports = tab;
    }, {}], 7: [function (require, module, exports) {
        function tab_otd() {
            //tab otdelka
            var tabHeadero = document.querySelector('.info-header-tab_o'); //блок с табами
            var tabo = document.getElementsByClassName('tab_o'); //таб на которые щелкнули
            var tabContento = document.getElementsByClassName('info-tabcontent_o'); //контент таба


            //скрываем табы
            function hideTabContento() {
                for (var i = 0; i < tabo.length; i++) {
                    tabContento[i].style.display = 'none';
                    tabo[i].classList.remove('after_click');
                }
            };

            // показываем таб
            function showTabContento(b) {
                hideTabContento();
                tabContento[b].style.display = 'none';
                tabContento[b].style.display = 'block';
            }

            tabHeadero.addEventListener('click', function (e) {
                e.preventDefault();
                var target = e.target;
                for (var i = 0; i < tabo.length; i++) {

                    if (target.parentNode == tabo[i]) {

                        showTabContento(i);
                        tabo[i].classList.add('after_click');
                        break;
                    }
                }
            });
        };

        module.exports = tab_otd;
    }, {}], 8: [function (require, module, exports) {
        function timeout() {
            //Таймер 60 секунд
            setTimeout(function () {
                var popupZvonok = document.getElementsByClassName('popup')[0];
                popupZvonok.style.display = 'block';
            }, 60000);
        };

        module.exports = timeout;
    }, {}], 9: [function (require, module, exports) {
        function timer() {
            //таймер
            var deadline = '2018-07-08';

            function getTimeRemaining(endtime) {
                var t = Date.parse(endtime) - Date.parse(new Date()); // разница между конечной датой и текущей в мс.
                var seconds = Math.floor(t / 1000 % 60); //отсекаем целые минуты и оставляем остаток в секундах
                var minutes = Math.floor(t / 1000 / 60 % 60); //отсекаем целые часы и получаем остаток в минутах
                var hours = Math.floor(t / (1000 * 60 * 60)); //отсекаем целые часы и получаем остаток часов

                if (t < 0) {
                    seconds = 0;
                    minutes = 0;
                    hours = 0;
                }

                if (hours < 10) {
                    hours = "0" + hours;
                }

                if (minutes < 10) {
                    minutes = "0" + minutes;
                }

                if (seconds < 10) {
                    seconds = "0" + seconds;
                }

                return {
                    'total': t,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
            };

            function setClock(id, endtime) {
                var timer = document.getElementById(id),
                    hours = timer.querySelector('.hours'),
                    minutes = timer.querySelector('.minutes'),
                    seconds = timer.querySelector('.seconds');
                var timerInterval = void 0; //переменная интервала

                function updateClock() {
                    var t = getTimeRemaining(endtime);
                    hours.innerHTML = t.hours;
                    minutes.innerHTML = t.minutes;
                    seconds.innerHTML = t.seconds;

                    if (t.total <= 0) {
                        clearInterval(timerInterval);
                    }
                };

                updateClock();
                timerInterval = setInterval(updateClock, 1000);
            };

            setClock('timer', deadline);
        };

        module.exports = timer;
    }, {}], 10: [function (require, module, exports) {
        window.addEventListener('DOMContentLoaded', function () {

            var calc = require('../js/parts/calc');
            var form_modal = require('../js/parts/form_modal');
            var form_str = require('../js/parts/form_str');
            var foto = require('../js/parts/foto');
            var popup = require('../js/parts/popup');
            var tab = require('../js/parts/tab');
            var tab_otd = require('../js/parts/tab_otd');
            var timeout = require('../js/parts/timeout');
            var timer = require('../js/parts/timer');

            calc();
            form_modal();
            form_str();
            foto();
            popup();
            tab();
            tab_otd();
            timeout();
            timer();
        });
    }, { "../js/parts/calc": 1, "../js/parts/form_modal": 2, "../js/parts/form_str": 3, "../js/parts/foto": 4, "../js/parts/popup": 5, "../js/parts/tab": 6, "../js/parts/tab_otd": 7, "../js/parts/timeout": 8, "../js/parts/timer": 9 }] }, {}, [10]);
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function calc(){
    // переменные для калькулятора
let calcBtn = document.querySelectorAll('.popup_calc_btn'); //кнопка вызова калькулятора
let popCalc = document.querySelectorAll('.popup_calc')[0]; // окно калькудятора
let popCalcClose = document.querySelector('.popup_calc_close'); //закрытие окна калькулятора
let calcNext = popCalc.querySelector('.popup_calc_button'); // кнопка "далее" у  калькулятора
let calcNextProfile = document.querySelector('.popup_calc_profile'); // следующее окно за калькулятором
let calcNextEnd = document.querySelector('.popup_calc_profile_button'); //кнопка далее на последнюю страницу
let calcEnd = document.querySelector('.popup_calc_end'); //последнее окно калькулятора
let calcCloseEnd = document.querySelector('.popup_calc_end_close');

//для Хранения данных пользователя в переменных
let width = 0;
let height = 0;
let check1; //храним условие "холодное"
let check2; // храним условие "теплое"
let view; //храним вид балкона




for(let i = 0; i < calcBtn.length; i++)
{
    calcBtn[i].addEventListener('click', calc);
};

function calc(){

    //объект для хранения данных калькулятора 
let answer = new Object();

    popCalc.style.display = 'block'; //показываем окно калькулятора

    //по клику закрываем окно
    popCalcClose.addEventListener('click', () =>{
        popCalc.style.display = 'none';
    })

    //переключение балконов
    let tabHeaderw = document.querySelector('.info-header-tab_w'); //блок с табами
let tabw = document.getElementsByClassName('tab_w');//таб на которые щелкнули
//let tabAo = document.getElementsByTagName('after_click');
let tabContentw = document.getElementsByClassName('info-tabcontent_w'); //контент таба



//скрываем табs балконов
function hideTabContentw(a){
    for(let i = a; i < tabContentw.length; i++){

        tabContentw[i].classList.remove('show');
        tabContentw[i].classList.add('hide');
        tabw[i].classList.remove('scale');

    }
};

hideTabContentw(1);

function showTabContentw(b){
    if(tabContentw[b].classList.contains('hide')){
        hideTabContentw(0);
        tabContentw[b].classList.remove('hide');
        tabContentw[b].classList.add('show');
      
    }
}

tabHeaderw.addEventListener('click', function(e){
    
    e.preventDefault();
    let target = e.target;
        for(let i = 0; i < tabw.length; i++){
            tabw[i].classList.remove('scale');
            if(target == tabw[i]){               
                showTabContentw(i);
                tabw[i].classList.add('scale');
                answer.view = tabw[i].getAttribute('data-view');
                break;
            }
        }
});

let calcInput = popCalc.querySelectorAll('.form-control');

for(let i = 0; i < calcInput.length; i++){
    calcInput[i].onkeyup = function (){
        return this.value = this.value.replace(/[^\d]/g, '');
    }
}

calcNext.addEventListener('click', () =>{
    popCalc.style.display = 'none';
    calcNextProfile.style.display = 'block';

    width = calcInput[0].value;
    height = calcInput[1].value;

    answer.width = +width;
    answer.height = +height;


    calcNextProfile.querySelector('.popup_calc_profile_close').addEventListener('click', ()=>{
    calcNextProfile.style.display = 'none';
    });

    check1 = calcNextProfile.querySelectorAll('.checkbox')[0];
    check2 = calcNextProfile.querySelectorAll('.checkbox')[1];

    

    calcNextEnd.setAttribute('disabled', 'disabled'); //отключаем кнопку "далее" пока не будет поставлена галка

   check1.addEventListener('change', () => {
       check2.checked = false;
       calcNextEnd.disabled = false;
       answer.condition = check1.value;
   })
  
    check2.addEventListener('change', () => {
        check1.checked = false;
        calcNextEnd.disabled = false;
        answer.condition = check2.value;   
    });

   

});


calcNextEnd.addEventListener('click', () => {
    alert( `Ширина: ${answer.width} высота: ${answer.height} Условия: ${answer.condition} и типа: ${answer.view}`);
    calcNextProfile.style.display = 'none';
    calcEnd.style.display = 'block';
    
    });

    calcCloseEnd.addEventListener('click', () =>{
        calcEnd.style.display = 'none';
        answer.length = 0; //чистим объект с ответами

        //чистим поля
        for(let i = 0; i < calcInput.length; i++){
            calcInput[i].value = '';
        }
        check1.checked = false;
        check2.checked = false;
        
        
    });

}

};

module.exports = calc;
},{}],2:[function(require,module,exports){
function form_modal(){
//объект для хранения сообщений пользователю
let message = new Object();
message.loading = 'Загрузка ...';
message.success = 'Спасибо! Скоро мы с вами свяжемся!';
message.failure = 'Что-то пошло не так...';


    //форма в модальных окнах

    //делаем div
    statusMessage = document.createElement('div');
    statusMessage.classList = 'status'; 

let formModal = document.getElementsByClassName('form');

for(let i = 0; i < formModal.length; i++){

    let input = formModal[i].getElementsByTagName('input');

    input[1].onkeyup = function (){
        return this.value = this.value.replace(/[^\d]/g, '');

    }

    formModal[i].addEventListener('submit', (e) => {
        e.preventDefault();
        formModal[i].appendChild(statusMessage);
    
        //AJAX
        let request = new XMLHttpRequest();
        //настройка запроса
        request.open('POST', 'server.php');
    
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
        let formData = new FormData(formModal[i]); //объект для хранения данных формы
    
        //посылка запроса
        request.send(formData);
    
    request.onreadystatechange = () => {
            if(request.readyState < 4){
               statusMessage.innerHTML = message.loading;
    
            } else if(request.readyState === 4){
                if(request.status == 200 && request.status < 300){
                    statusMessage.innerHTML = message.success;
                    //Добавляем контент. Прелоадер
    
                }
                else{
                   statusMessage.innerHTML = message.failure;
                    }
                }
            }
    
         //очищяем поля ввода
        for(let i = 0; i < input.length; i++){
            input[i].value = '';
        }
        formData.delete(formData);
    
    });
}

};

module.exports = form_modal;
},{}],3:[function(require,module,exports){
function form_str(){
       //форма на страницах
// объект где будем хранить сообщения для пользователя
let message = new Object();
message.loading = 'Загрузка ...';
message.success = 'Спасибо! Скоро мы с вами свяжемся!';
message.failure = 'Что-то пошло не так...';

let form = document.getElementsByClassName('main_form'),
    
//делаем div
    statusMessage = document.createElement('div');
    statusMessage.classList = 'status'; 

for(let i = 0; i < form.length; i++){

    let input = form[i].getElementsByTagName('input');

    input[1].onkeyup = function (){
        return this.value = this.value.replace(/[^\d]/g, '');

    }

    form[i].addEventListener('submit', (e) => {
        e.preventDefault();
        form[i].appendChild(statusMessage);
    
        //AJAX
        let request = new XMLHttpRequest();
        //настройка запроса
        request.open('POST', 'server.php');
    
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
        let formData = new FormData(form[i]); //объект для хранения данных формы
    
        //посылка запроса
        request.send(formData);
    
    request.onreadystatechange = () => {
            if(request.readyState < 4){
               statusMessage.innerHTML = message.loading;
    
            } else if(request.readyState === 4){
                if(request.status == 200 && request.status < 300){
                    statusMessage.innerHTML = message.success;
                    //Добавляем контент. Прелоадер
    
                }
                else{
                   statusMessage.innerHTML = message.failure;
                    }
                }
            }
    
         //очищяем поля ввода
        for(let i = 0; i < input.length; i++){
            input[i].value = '';
        }
        formData.delete(formData);
    
    });
}
};

module.exports = form_str;
},{}],4:[function(require,module,exports){
function foto(){
    let MyModalImg = document.getElementsByClassName('MyModalImg');
//let modal = document.querySelector('.modal');
let src = [];
let image;



for(let i = 0; i < MyModalImg.length; i++){
    src.splice(0, src.length)
MyModalImg[i].addEventListener('click', (e) => {
  
    e.preventDefault();
    let div = document.createElement('div');
    src[i] = MyModalImg[i].getAttribute('href');
    div.className = 'modal';
    let image = document.createElement('img');
    image.src = src[i];
    MyModalImg[i].appendChild(div);
    div.appendChild(image);
    
    let modal = document.querySelector('.modal'); 
    modal.style.display = 'block';       
 });
};

window.addEventListener('click',  (e) => {
 
        let modal = document.querySelector('.modal'); 
        let img = document.querySelectorAll('.modal');       

        for(let i = 0; i < img.length; i++){
            if(e.target == modal){ 
                img[i].remove();       
           }
        }    
});
};

module.exports = foto;
},{}],5:[function(require,module,exports){
function popup(){

//modal Request an engineer
function zamer(){
    let popupEngener = document.getElementsByClassName('popup_engineer')[0];
    let popupBtn = document.getElementsByClassName('popup_engineer_btn')[0];
    let popupClose  = document.getElementsByClassName('popup_close')[1];
    
    //для Хранения данных пользователя в переменных
    let width = 0;
    let height = 0;
    let check1; //храним условие "холодное"
    let check2; // храним условие "теплое"
    let view; //храним вид балкона
    
    
    
    
    popupBtn.addEventListener('click', () => {
        popupEngener.style.display = 'block';
    });
    
    popupClose.addEventListener('click', () => {
        popupEngener.style.display = 'none';
    });
    
    window.addEventListener('click',  (e) =>{
        if(e.target === popupEngener){
            popupEngener.style.display = 'none';
        }
    });
    }
    
    
    zamer();

    //modal  obrat zvonok


function modalPopup(){
    let phoneLink = document.getElementsByClassName('phone_link');
    let popupZvonok = document.getElementsByClassName('popup')[0];
    let popupCloseZv  = document.getElementsByClassName('popup_close')[0];
    
    
    for(let i = 0; i < phoneLink.length; i++){
        phoneLink[i].addEventListener('click', (e) =>{
            e.preventDefault();
            popupZvonok.style.display = 'block';
        })
    };
    
    popupCloseZv.addEventListener('click', () =>{
        popupZvonok.style.display = 'none';
    });
    
    window.addEventListener('click', (e) =>{
        if(e.target === popupZvonok){
            popupZvonok.style.display = 'none';
        }
    });
    
    }
    
    modalPopup();

};

module.exports = popup;

},{}],6:[function(require,module,exports){
function tab(){
    //tab window
let tabHeader = document.querySelector('.info-header-tab'); //блок с табами
let tab = document.getElementsByClassName('tab');//таб на которые щелкнули
let tabA = document.getElementsByTagName('a');
let tabContent = document.getElementsByClassName('info-tabcontent'); //контент таба



//скрываем табы
function hideTabContent(a){
    for(let i = a; i < tabContent.length; i++){   
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tabA[i+1].classList.remove('active');
    }
};

hideTabContent(1);

// показываем таб
function showTabContent(b){
    if(tabContent[b].classList.contains('hide')){
        hideTabContent(0);
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }         
}

tabHeader.addEventListener('click', (e) =>{
    e.preventDefault();
    let target = e.target;

        for(let i = 0; i < tab.length; i++){   
            if(target.parentNode == tab[i]){
                showTabContent(i);
                tabA[i+2].classList.add('active');
                break;
           }
        }    
});
}

module.exports = tab;
},{}],7:[function(require,module,exports){
function tab_otd(){
    //tab otdelka
let tabHeadero = document.querySelector('.info-header-tab_o'); //блок с табами
let tabo = document.getElementsByClassName('tab_o');//таб на которые щелкнули
let tabContento = document.getElementsByClassName('info-tabcontent_o'); //контент таба



//скрываем табы
function hideTabContento(){
    for(let i = 0; i < tabo.length; i++){
        tabContento[i].style.display = 'none';    
        tabo[i].classList.remove('after_click');
    }
};

// показываем таб
function showTabContento(b){
        hideTabContento();
        tabContento[b].style.display = 'none';
        tabContento[b].style.display = 'block';                
}

tabHeadero.addEventListener('click', (e) =>{
    e.preventDefault();
    let target = e.target;
        for(let i = 0; i < tabo.length; i++){  
           
            if(target.parentNode == tabo[i]){
                
                showTabContento(i);
                tabo[i].classList.add('after_click');
                break;
           }
        
        }
    
    
        
});
};

module.exports = tab_otd;
},{}],8:[function(require,module,exports){
function timeout(){
    //Таймер 60 секунд
setTimeout(() =>{
    let popupZvonok = document.getElementsByClassName('popup')[0];
    popupZvonok.style.display = 'block';
}, 60000);
};

module.exports = timeout;
},{}],9:[function(require,module,exports){
function timer(){
    //таймер
let deadline = '2018-07-08';

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()); // разница между конечной датой и текущей в мс.
    let seconds = Math.floor((t / 1000) % 60); //отсекаем целые минуты и оставляем остаток в секундах
    let minutes = Math.floor((t / 1000 / 60) % 60); //отсекаем целые часы и получаем остаток в минутах
    let hours = Math.floor((t/(1000 * 60 * 60))); //отсекаем целые часы и получаем остаток часов

    if(t < 0){
        seconds = 0;
        minutes = 0;
        hours = 0;   
    }

    if(hours < 10)
    {
        hours = "0" + hours; 
    }

    if(minutes < 10)
    {
        minutes = "0" + minutes; 
    }

    if(seconds < 10)
    {
        seconds = "0" + seconds; 
    }

    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };
};

function setClock (id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds');
    let timerInterval;  //переменная интервала
        
        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if(t.total <= 0){
                clearInterval(timerInterval);
             }

        };         

        updateClock();
        timerInterval = setInterval(updateClock, 1000);
    };


setClock('timer', deadline);
};

module.exports = timer;
},{}],10:[function(require,module,exports){
window.addEventListener('DOMContentLoaded', () =>{

    let  calc = require('../js/parts/calc');
    let  form_modal = require('../js/parts/form_modal');
    let  form_str = require('../js/parts/form_str');
    let  foto = require('../js/parts/foto');
    let  popup = require('../js/parts/popup');
    let  tab = require('../js/parts/tab');
    let  tab_otd = require('../js/parts/tab_otd');
    let  timeout = require('../js/parts/timeout');
    let  timer = require('../js/parts/timer');

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
},{"../js/parts/calc":1,"../js/parts/form_modal":2,"../js/parts/form_str":3,"../js/parts/foto":4,"../js/parts/popup":5,"../js/parts/tab":6,"../js/parts/tab_otd":7,"../js/parts/timeout":8,"../js/parts/timer":9}]},{},[10]);

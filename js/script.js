window.addEventListener('DOMContentLoaded', () =>{

//modal Request an engineer
function zamer(){
let popupEngener = document.getElementsByClassName('popup_engineer')[0];
let popupBtn = document.getElementsByClassName('popup_engineer_btn')[0];
let popupClose  = document.getElementsByClassName('popup_close')[1];




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

//tab window
let tabHeader = document.querySelector('.info-header-tab'); //блок с табами
let tab = document.getElementsByClassName('tab');//таб на которые щелкнули
let tabA = document.getElementsByTagName('a');
let tabContent = document.getElementsByClassName('info-tabcontent'); //контент таба



//скрываем табы
function hideTabContent(){
    for(let i = 0; i < tab.length; i++){
        tabContent[i].style.display = 'none';    
        tabA[i+2].classList.remove('active');
    }
};

// показываем таб
function showTabContent(b){
        hideTabContent();
        tabContent[b].style.display = 'none';
        tabContent[b].style.display = 'block';     
                  
}

tabHeader.addEventListener('click', (e) =>{
    e.preventDefault();
    let target = e.target;

        for(let i = 0; i < tab.length; i++){   
            if(target == tab[i]){
                showTabContent(i);
                tabA[i+2].classList.add('active');
                break;
           }
        }
        
});

//foto

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

//tab otdelka
let tabHeadero = document.querySelector('.info-header-tab_o'); //блок с табами
let tabo = document.getElementsByClassName('tab_o');//таб на которые щелкнули
//let tabAo = document.getElementsByTagName('after_click');
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
           
            if(target == tabo[i]){
                
                showTabContento(i);
                tabo[i].classList.add('after_click');
                break;
           }
        
        }
    
    
        
});

    //форма на страницах
// объект где будем хранить сообщения для пользователя
let message = new Object();
message.loading = 'Загрузка ...';
message.success = 'Спасибо! Скоро мы с вами свяжемся!';
message.failure = 'Что-то пощло не так...';

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

//форма в модальных окнах
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


//таймер
let deadline = '2018-07-04';

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


//Таймер 60 секунд
setTimeout(() =>{
    let popupZvonok = document.getElementsByClassName('popup')[0];
    popupZvonok.style.display = 'block';
}, 1000);



});
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
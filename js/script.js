window.addEventListener('DOMContentLoaded', () =>{

//modal Request an engineer
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

//modal  obrat zvonok
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

//tab window
let tabHeader = document.querySelector('.info-header-tab'); //блок с табами
let tab = document.getElementsByClassName('tab');//таб на которые щелкнули
let tabA = document.getElementsByTagName('a');
let tabContent = document.getElementsByClassName('info-tabcontent'); //контент таба



//скрываем табы
function hideTabContent(){
    for(let i = 0; i < tab.length; i++){
        tabContent[i].style.display = 'none';    
        tabA[i].classList.remove('active');
    }
};


    //hideTabContent(1);

// показываем таб
function showTabContent(b){
        hideTabContent();
        tabContent[b].style.display = 'none';
        tabContent[b].style.display = 'block';     
                  
}

tabHeader.addEventListener('click', (e) =>{
    let target = e.target;

        for(let i = 0; i < tab.length; i++){   
            if(target == tab[i]){
                tabA[i].classList.add('active');
                showTabContent(i);
   
                break;
           }
        }
        
});

//foto

let MyModalImg = document.getElementsByClassName('MyModalImg');
let modal = document.querySelector('.modal');
let src = [];



for(let i = 0; i < MyModalImg.length; i++){
    
MyModalImg[i].addEventListener('click', (e) => {

    src.splice(0, src.length)
    e.preventDefault();
    let div = document.createElement('div');
    src[i] = MyModalImg[i].getAttribute('href');
    div.className = 'modal';
    let image = document.createElement('img');

    MyModalImg[i].appendChild(div);
    div.appendChild(image);
    image.src = src[i];
    let modal = document.querySelector('.modal');
    modal.style.display = 'block'; 
 });
};

document.addEventListener('click',  (e) => {
    let modal = document.querySelector('.modal');
    if(e.target == modal){
        modal.style.display = 'none';
    }
});




});
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
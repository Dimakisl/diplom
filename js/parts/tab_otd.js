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
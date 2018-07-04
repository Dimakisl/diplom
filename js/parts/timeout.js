function timeout(){
    //Таймер 60 секунд
setTimeout(() =>{
    let popupZvonok = document.getElementsByClassName('popup')[0];
    popupZvonok.style.display = 'block';
}, 60000);
};

module.exports = timeout;
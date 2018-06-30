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
}

popupCloseZv.addEventListener('click', () =>{
    popupZvonok.style.display = 'none';
})

window.addEventListener('click', (e) =>{
    if(e.target === popupZvonok){
        popupZvonok.style.display = 'none';
    }
});


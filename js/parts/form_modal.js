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
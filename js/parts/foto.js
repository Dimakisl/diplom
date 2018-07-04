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
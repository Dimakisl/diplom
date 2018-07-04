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
'use strict';

const DATA = {
    whichSite: ['landing', 'multiPage', 'onlineStore'],
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30],//Значения в процентах
    adapt: 20,//Значения в процентах
    mobileTemplates: 15,//Значения в процентах
    editable: 10,//Значения в процентах
    metrikaYandex: [500, 1000, 2000],
    analyticsGoogle: [850, 1350, 3000],
    sendOrder: 500,
    deadlineDay: [[2, 7], [3, 10], [7, 14]],
    deadlinePercent: [20, 17, 15]
};

const startButton = document.querySelector('.start-button'),
    endButton = document.querySelector('.end-button'),
    firstScreen = document.querySelector('.first-screen'),
    mainForm = document.querySelector('.main-form'),
    formCalculate = document.querySelector('.form-calculate'),
    total = document.querySelector('.total'),
    fastRange = document.querySelector('.fast-range'),
    totalPrice = document.querySelector('.total_price__sum'),
    mobileTemplates = document.querySelector('#mobileTemplates'),
    adapt = document.querySelector('#adapt');




function showElem (elem){
    elem.style.display = 'block';
}

function hideElem (elem){
    elem.style.display = 'none';
}

function priceCalculation(elem){

    let result = 0,
        index = 0,
        options = [];

    if (elem.name === 'whichSite'){
        for (const item of formCalculate.elements){
            if (item.type === 'checkbox'){
               item.checked = false;
            }
        }
        hideElem(fastRange);
    }

    if (adapt.checked){
        mobileTemplates.removeAttribute('disabled');
    }else if (!adapt.checked){
        mobileTemplates.setAttribute('disabled', 'false');
        mobileTemplates.checked = false;
    }

    for (const item of formCalculate.elements){
        if (item.name === 'whichSite' && item.checked){
            index = (DATA.whichSite.indexOf(item.value));
        }else if (item.classList.contains('calc-handler') && item.checked){
                options.push(item.value);
        }
    }
    
    options.forEach( function(key){
        if (typeof(DATA[key]) === 'number'){
            if (key === 'sendOrder'){
                result += DATA[key];
                console.log(DATA[key]);
            }else {
                result += DATA.price[index] * (DATA[key] / 100);
            }
        }else {
            if (key === 'desktopTemplates'){
                result += DATA.price[index] * (DATA[key][index] / 100);
            }else {
                result += DATA[key][index];
            }
        }
    });
   
    result += DATA.price[index];

    totalPrice.textContent = result;
}

function handlerCallBackForm(event){
    
    const target = event.target;

    if (target.classList.contains('want-faster')) {
        target.checked ? showElem(fastRange) : hideElem(fastRange);
    }

    if (target.classList.contains('calc-handler')){
        priceCalculation(target);
    }
}


startButton.addEventListener('click', function(){
    showElem(mainForm);
    hideElem(firstScreen);
});

endButton.addEventListener('click', function(){

    for (const elem of formCalculate.elements){

         if(elem.tagName === 'FIELDSET'){
            hideElem(elem);
         }
    }

    showElem(total);
});

mainForm.addEventListener('change', handlerCallBackForm);

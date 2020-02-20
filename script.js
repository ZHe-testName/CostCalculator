'use strict';

const DAY_STRING = ["день", "дня", "дней"];

const DATA_SWITCH_POS = ["Нет", "Да"];

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
    adapt = document.querySelector('#adapt'),
    typeSite = document.querySelector('.type-site'),
    maxDeadline = document.querySelector('.max-deadline'),
    deadlineValue = document.querySelector('.deadline-value'),
    rangeDeadline = document.querySelector('.range-deadline'),
    desktopTemplatesValue = document.querySelector('.desktopTemplates_value'),
    adaptValue = document.querySelector('.adapt_value'),
    mobileTemplatesValue = document.querySelector('.mobileTemplates_value'),
    editableValue = document.querySelector('.editable_value');

function declOfNum(n, titles) {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
                                0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}


function showElem (elem){
    elem.style.display = 'block';
}

function hideElem (elem){
    elem.style.display = 'none';
}

function switchPos (){
    for (const item of formCalculate.elements){    
        
    if (item.id === 'desktopTemplates' && item.checked){
        desktopTemplatesValue.textContent = DATA_SWITCH_POS[1];
     }else if (item.id === 'desktopTemplates' && !item.checked){
        desktopTemplatesValue.textContent = DATA_SWITCH_POS[0];
     }
     if (item.id === 'adapt' && item.checked){
        adaptValue.textContent = DATA_SWITCH_POS[1];
     }else if (item.id === 'adapt' && !item.checked){
          adaptValue.textContent = DATA_SWITCH_POS[0];
     }
     if (item.id === 'mobileTemplates' && item.checked){
        mobileTemplatesValue.textContent = DATA_SWITCH_POS[1];
     }else if (item.id === 'mobileTemplates' && !item.checked){
        mobileTemplatesValue.textContent = DATA_SWITCH_POS[0];
     }
     if (item.id === 'editable' && item.checked){
        editableValue.textContent = DATA_SWITCH_POS[1];
     }else if (item.id === 'editable' && !item.checked){
        editableValue.textContent = DATA_SWITCH_POS[0];
     }
    }

}

function renderTextContent (total, site, maxDeadTime, minDeadTime){
    totalPrice.textContent = total;
    typeSite.textContent = site;
    maxDeadline.textContent = declOfNum(maxDeadTime, DAY_STRING);
    rangeDeadline.min = minDeadTime;
    rangeDeadline.max = maxDeadTime;
    deadlineValue.textContent = declOfNum(rangeDeadline.value, DAY_STRING);
}

function priceCalculation(elem){

    let result = 0,
        index = 0,
        options = [],
        siteName = '',
        maxDeadLineDay = DATA.deadlineDay[index][1],
        minDeadLineDay = DATA.deadlineDay[index][0];

    if (elem.name === 'whichSite'){
        for (const item of formCalculate.elements){
            if (item.type === 'checkbox'){
               item.checked = false;
            }
        }
        hideElem(fastRange);
    }

    switchPos();

    for (const item of formCalculate.elements){ 
        if (item.name === 'whichSite' && item.checked){
            index = (DATA.whichSite.indexOf(item.value));
            siteName = item.dataset.site;
            maxDeadLineDay = DATA.deadlineDay[index][1];
            minDeadLineDay = DATA.deadlineDay[index][0];
        }else if (item.classList.contains('calc-handler') && item.checked){
                options.push(item.value);
        }
    }
    
    options.forEach( function(key){
        if (typeof(DATA[key]) === 'number'){
            if (key === 'sendOrder'){
                result += DATA[key];
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
    
    renderTextContent (result, siteName, maxDeadLineDay, minDeadLineDay);
}

function handlerCallBackForm(event){
    
    const target = event.target;

    if (target.classList.contains('want-faster')) {
        target.checked ? showElem(fastRange) : hideElem(fastRange);
    }

    if (target.classList.contains('calc-handler')){
        priceCalculation(target);
    }

    if (adapt.checked){
        mobileTemplates.removeAttribute('disabled');
    }else {
        mobileTemplates.setAttribute('disabled', 'false');
        mobileTemplates.checked = false;
        mobileTemplatesValue.textContent = DATA_SWITCH_POS[0];
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

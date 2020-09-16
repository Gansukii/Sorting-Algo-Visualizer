var sortButton = document.querySelector('#btnSort');
var numColumn = document.querySelector('#numColumn');
var elementNumber = document.querySelector('#elementNumber');
var arrow = document.querySelector('#arrow');
var addButton = document.querySelector('#addElements');
var selectedAlgo = document.querySelector('#selectedAlgo');
var speedRange = document.querySelector('#speedRange');
var resetButton = document.querySelector('#btnReset');
var newButton = document.querySelector('#btnNew');
var legendsCard = document.querySelector('#legendsCard');
var legendP = document.querySelector('#legendP'); //For the legend
var arrayOfRandom = new Array();
var stopTimeout = false;
var pos = 0;



// ADDING EVENTLISTENERS ---------------------
sortButton.addEventListener('click', startSort);
resetButton.addEventListener('click', resetSort);
newButton.addEventListener('click', newElements);
addButton.addEventListener('click', addElements);


//ARRAY OBJECT TO SAVE THE ELEMENTS CREATED ----------
var elementObject = [{}];
//ARRAY OF VALUES IS NEEDED FOR RESETTING ----------
var arrValue = []



//ARROW ICON
var arrowIcon = document.createElement('i');
arrowIcon.className = 'fas fa-angle-double-down fa-2x';
var arrowDiv = document.createElement('div');
arrowDiv.className = 'arrow position-relative invisible';
arrowDiv.setAttribute('id', 'arrow');
arrowDiv.appendChild(arrowIcon);



// FUNCTIONS FOR EVENTSLISTENERS --------------------


function addElements() {
    // LIMIT THE INPUT. ELSE, IT WONT FIT IN SCREEN ------------
    if (elementNumber.value > 25) {
        elementNumber.value = 25;
    }
    if (elementNumber.value < 2) {
        elementNumber.value = 2;
    }

    addButton.setAttribute('disabled', '');
    elementNumber.setAttribute('disabled', '');
    newButton.classList.remove('invisible');
    sortButton.classList.remove('invisible');
    // ADD THE ARROW DIV
    numColumn.appendChild(arrowDiv);
    for (var i = 0; i < elementNumber.value; i++) {
        addElement(i);
    }
}

function addElement(i) {
    var newDiv = document.createElement('div');
    newDiv.className = 'numHolders d-flex justify-content-center p-1 m-1';
    newDiv.setAttribute('id', 'box' + i);
    arrValue[i] = Math.floor(Math.random() * 151);
    newDiv.innerHTML = arrValue[i];
    numColumn.appendChild(newDiv);
    elementObject[i] = {
        elmnt: newDiv,
        value: arrValue[i]
    };
}


function startSort() {
    //make add button and algo selector unclickable
    //it might interrupt the process
    addButton.setAttribute('disabled', '');
    selectedAlgo.setAttribute('disabled', '');
    //make sort button invisible
    sortButton.className += ' invisible';
    //make arrow visible
    elementNumber.setAttribute('disabled', '');
    $('#legendsCard').removeClass("invisible");
    $('#btnNew').addClass('invisible');

    if (selectedAlgo.value == 'bubble') {
        stopTimeout = false;
        $.getScript("js/bubble.js");
    } else if (selectedAlgo.value == 'insertion') {
        stopTimeout = false;
        $.getScript("js/insertion.js");
    } else if (selectedAlgo.value == 'selection') {
        stopTimeout = false;
        $.getScript("js/selection.js");
    } else if (selectedAlgo.value == 'merge') {
        stopTimeout = false;
        $.getScript("js/merge.js");
    } else if (selectedAlgo.value == 'quick') {
        stopTimeout = false;
        $.getScript("js/quick.js");
    }
}

function resetSort() {
    $('#btnNew').removeClass('invisible');
    $('#legendsCard').addClass("invisible");
    numColumn.innerHTML = ' ';
    stopTimeout = true;
    elementObject = [{}];
    //CREATE THE ELEMENTS AGAIN
    numColumn.appendChild(arrowDiv);
    for (var i = 0; i < elementNumber.value; i++) {
        var newDiv = document.createElement('div');
        newDiv.className = 'numHolders d-flex justify-content-center p-1 m-1';
        newDiv.setAttribute('id', 'box' + i);
        newDiv.innerHTML = arrValue[i];
        numColumn.appendChild(newDiv);
        elementObject[i] = {
            elmnt: newDiv,
            value: arrValue[i]
        };
    }

    resetButton.className += ' invisible';
    sortButton.classList.remove('invisible');
}


function newElements() {
    //REMOVE THE ELEMENTS FOR THE NEW SET
    addButton.removeAttribute('disabled');
    elementNumber.removeAttribute('disabled');
    $('#numColumn').empty();
    //RESET THE OBJECT AND ARRAY IN CASE
    elementObject = [{}];
    arrValue = [];
    newButton.classList.add('invisible');
    sortButton.classList.add('invisible');
    resetButton.classList.add('invisible');
    return;
}


//SWAPPING FUNCTION
var swapAnim;

function swapStart(element1, element2, pxAdd, gap) {
    var speed = 125 - (speedRange.value * 10);
    pos += pxAdd;
    if (pos >= gap + 1 || gap == 0) { //PROBLEM OCCURS WHEN GAP = 144. POS AT 144.0003 WILL TERMINATE WITHOUT FINISHING THE SWAP
        clearInterval(swapAnim);
    } else {
        element1.elmnt.style.left = pos + 'px';
        element2.elmnt.style.left = -pos + 'px';
    }
}

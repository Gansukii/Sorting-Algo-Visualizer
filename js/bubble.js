var i = 0;
var len = elementObject.length - 1;
var bubbleout;
var bubblein;
var count = 0;
var iter = 0;
//INITIALIZE THE ARROW BECAUSE IT WAS CREATED AFTER AN EVENT. GLOBAL DECLARATION ON MAIN ALONE WILL RESULT TO NULL
var arrow = document.querySelector('#arrow');
var arrowOffset = arrow.offsetLeft + (arrow.offsetWidth/2) ;
arrow.classList.remove('invisible');
//Add the legend
legendP.innerHTML = "<li style='color: #ff7f7f;'><i class='fas fa-angle-double-down'> </i> Current </li><li style='color: #ffff7f;'>Compare / Swap </li>";


continueBubble();

function continueBubble() {
    if (stopTimeout) {
        clearTimeout(bubbleout);
        clearTimeout(bubblein);
        clearInterval(swapAnim);
        stopTimeout = false;
        selectedAlgo.removeAttribute('disabled');
        newButton.classList.remove('invisible');
        legendsCard.classList.add('invisible');
        arrow.classList.add('invisible');
        arrow.removeAttribute('style'); //REMOVE STYLE IN CASE OF RESET
        resetButton.classList.remove('invisible');
        return false;
    }
    //need to locally initialize in order to be updated on speed changes
    var speed = 125 - (speedRange.value * 10);
    if (count == len) {
        stopTimeout = false;
        return;
    }
    if (i > 0) {
        elementObject[i].elmnt.style.background = "white";
        elementObject[i - 1].elmnt.style.background = "white";
    }
    if (i < len) {
        if (i < len - iter) {
            arrow.style.left = (elementObject[i].elmnt.offsetLeft - arrowOffset + (elementObject[i].elmnt.offsetWidth/2)) + 'px';
            elementObject[i].elmnt.style.background = "#ff7f7f";
            bubblein = setTimeout(() => {
                tryz();
            }, speed);
        }
    }
    if (i == len - iter) {
        iter++;
        count++;
        i = 0;
        continueBubble();
    }
    if (iter == len) {
        stopTimeout = true;
        continueBubble();
    }
}

function tryz() {
    var speed = 125 - (speedRange.value * 10);
    var j = i + 1;
    elementObject[j].elmnt.style.background = "#ffff7f";
    if (elementObject[j].value < elementObject[i].value) {
        elementObject[i].elmnt.style.background = "#ff7f7f";
        var low = elementObject[j].value;
        var high = elementObject[i].value;
        elementObject[i].value = low;
        elementObject[j].value = high;
        pos = 0;
        var iPos = elementObject[i].elmnt.offsetLeft;
        var jPos = elementObject[j].elmnt.offsetLeft;
        var gap = jPos - elementObject[i].elmnt.offsetLeft;
        var pxAdd = gap / 10;
        swapAnim = setInterval(swapStart, speed / 2, elementObject[i],elementObject[j],pxAdd,gap);

        bubbleout = setTimeout(() => {
            elementObject[i].elmnt.innerHTML = elementObject[i].value;
            elementObject[j].elmnt.innerHTML = elementObject[j].value;
            elementObject[i].elmnt.removeAttribute('style');
            elementObject[j].elmnt.removeAttribute('style');
        }, speed * 8);
    }

    setTimeout(() => {
        i++;
        continueBubble();
    }, speed * 10);
}

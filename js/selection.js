var i = 0;
var j = 1;
var len = elementObject.length - 1;
var selectionin;
var selectionswap;
var insertionout;

//INITIALIZE THE ARROW BECAUSE IT WAS CREATED AFTER AN EVENT. GLOBAL DECLARATION ON MAIN ALONE WILL RESULT TO NULL
var arrow = document.querySelector('#arrow');
var arrowOffset = arrow.offsetLeft + (arrow.offsetWidth / 2);

legendP.innerHTML = "<li style='color: #ff7f7f;'><i class='fas fa-angle-double-down'> </i>  Current (outer loop)</li><li style='color: #ffff7f;'>Compare / Swap </li>";


continueSelection();


function continueSelection() {
    //need to locally initialize in order to be updated on speed changes
    var speed = 125 - (speedRange.value * 10);
    if (stopTimeout) {
        clearTimeout(selectionin);
        clearTimeout(insertionout);
        clearTimeout(selectionswap);
        clearInterval(swapAnim);
        elementObject[i - 1].elmnt.style.background = "#fff";
        stopTimeout = false;
        selectedAlgo.removeAttribute('disabled');
        newButton.classList.remove('invisible');
        legendsCard.classList.add('invisible');
        resetButton.classList.remove('invisible');
        arrow.classList.add('invisible');
        arrow.removeAttribute('style'); //REMOVE STYLE IN CASE OF RESET
        return false;
    }

    if (i < len) {
        selectionin = setTimeout(() => {
            arrow.style.left = (elementObject[i].elmnt.offsetLeft - arrowOffset + (elementObject[i].elmnt.offsetWidth / 2)) + 'px';
            arrow.classList.remove('invisible');
            j = i + 1;
            elementObject[i].elmnt.style.background = "#ff7f7f";
            selectionCheck();
        }, speed);

    }

    if (i == len) {
        stopTimeout = true;
        continueSelection();
    }


}


function selectionCheck() {
    //need to locally initialize in order to be updated on speed changes
    var speed = 125 - (speedRange.value * 10);
    elementObject[j].elmnt.style.background = "#ffff7f";
    if (elementObject[i].value > elementObject[j].value) {
        pos = 0;
        var iPos = elementObject[i].elmnt.offsetLeft;
        var jPos = elementObject[j].elmnt.offsetLeft;
        var gap = jPos - elementObject[i].elmnt.offsetLeft;
        var pxAdd = gap / 10;
        swapAnim = setInterval(swapStart, speed / 2, elementObject[i], elementObject[j], pxAdd, gap);

        selectionswap = setTimeout(() => {
            var low = elementObject[j].value;
            var high = elementObject[i].value;
            elementObject[i].value = low;
            elementObject[j].value = high;
            elementObject[i].elmnt.innerHTML = elementObject[i].value;
            elementObject[j].elmnt.innerHTML = elementObject[j].value;
            elementObject[i].elmnt.removeAttribute('style');
            elementObject[j].elmnt.removeAttribute('style');

            elementObject[i].elmnt.style.background = "#ff7f7f";
            elementObject[j].elmnt.style.background = "#fff";
            if (j < len) {
                j++;
                selectionCheck();
            } else {
                elementObject[i].elmnt.style.background = "#fff";
                i++
                j = 0;
                continueSelection();
            }
        }, speed * 8);
    } else {
        selectionswap = setTimeout(() => {
            elementObject[j].elmnt.style.background = "#fff";
            if (j < len) {
                j++;
                selectionCheck();
            } else {
                elementObject[i].elmnt.style.background = "#fff";
                i++
                j = 0;
                continueSelection();
            }
        }, speed * 8);


    }
}

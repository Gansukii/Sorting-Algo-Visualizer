var i = 1;
var j = 1;
var len = elementObject.length - 1;
var insertionin;
var insertionswap;
var insertionout;
//var swapAnim;
//INITIALIZE THE ARROW BECAUSE IT WAS CREATED AFTER AN EVENT. GLOBAL DECLARATION ON MAIN ALONE WILL RESULT TO NULL
var arrow = document.querySelector('#arrow');
var arrowOffset = arrow.offsetLeft + (arrow.offsetWidth / 2);
//arrow.classList.remove('invisible');

legendP.innerHTML = "<li style='color: #7f7fff;'><i class='fas fa-angle-double-down'> </i> Current (outer loop) </li><li style='color: #ff7f7f;'>Current (inner loop) </li><li style='color: #ffff7f;'>Compare / Swap </li>";

continueInsertion();

function continueInsertion() {
    //need to locally initialize in order to be updated on speed changes
    var speed = 125 - (speedRange.value * 10);
    if (stopTimeout) {
        clearTimeout(insertionin);
        clearTimeout(insertionout);
        clearTimeout(insertionswap);
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
    if (i <= len) {
        insertionin = setTimeout(() => {
            arrow.style.left = (elementObject[i].elmnt.offsetLeft - arrowOffset + (elementObject[i].elmnt.offsetWidth / 2)) + 'px';
            arrow.classList.remove('invisible');
            j = i;
            insertionCheck();
        }, speed);
    }
    if (i > len) {
        stopTimeout = true;
        elementObject[i - 1].elmnt.style.background = "#fff";
        continueInsertion();
    }
}


function insertionCheck() {
    var speed = 125 - (speedRange.value * 10);
    elementObject[j].elmnt.style.background = "#ff7f7f";
    elementObject[j - 1].elmnt.style.background = "#ffff7f";
    elementObject[i].elmnt.style.background = "#7f7fff";
    if (elementObject[j].value < elementObject[j - 1].value) {
        pos = 0;
        var jPos = elementObject[j].elmnt.offsetLeft;
        var jmPos = elementObject[j - 1].elmnt.offsetLeft;
        var gap = jPos - jmPos;
        var pxAdd = gap / 10;
        swapAnim = setInterval(swapStart, speed / 2, elementObject[j - 1], elementObject[j], pxAdd, gap);


        insertionswap = setTimeout(() => {
            var temp = elementObject[j].value;
            elementObject[j].value = elementObject[j - 1].value;
            elementObject[j - 1].value = temp;
            elementObject[j].elmnt.innerHTML = elementObject[j].value;
            elementObject[j - 1].elmnt.innerHTML = elementObject[j - 1].value;
            elementObject[j - 1].elmnt.removeAttribute('style');
            elementObject[j].elmnt.removeAttribute('style');
            elementObject[j].elmnt.style.background = "#fff";
            elementObject[j - 1].elmnt.style.background = "#fff";
            if (j - 1 != 0) {
                j = j - 1;
                insertionCheck();
            } else {
                insertionout = setTimeout(() => {
                    i++;
                    continueInsertion();
                }, speed * 10);
            }
        }, speed * 8);
    } else {
        insertionout = setTimeout(() => {
            i++;
            elementObject[j - 1].elmnt.style.background = "#fff";
            elementObject[j].elmnt.style.background = "#fff";

            continueInsertion();

        }, speed * 10);
    }
}

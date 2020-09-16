legendP.innerHTML = "<li style='color: #ff7f7f;'>Current Group Being Tested</li><li style='color: #ffff7f;'>To Be Filled</li><li style='color: #7f7fff;'>Lowest Value Among the Group</li>";

var elNumber = 0;
var eoCopy = [];
var valarrz = [];
for (var j = 0; j < elementObject.length; j++) {
    eoCopy[j] = elementObject[j];
    valarrz[j] = j;
}
var mergearr = [];
var groupmergearr = [];
var clonedElements = [];
var groupIndex = [];



//Remove the arrow. We don't need that here
var arrow = document.querySelector('#arrow');
numColumn.removeChild(arrow);
var numRow = document.querySelector('#numRow');

var cloneNumColumn = numColumn.cloneNode(true);
cloneNumColumn.classList.remove('bg-primary');
cloneNumColumn.removeAttribute('id');
cloneNumColumn.style.top = -numColumn.offsetHeight + 'px';
cloneNumColumn.className += ' cloneAnimate position-relative';

//Set different id from the original
var individualCloneChild = cloneNumColumn.children;
for (var i = 0; i < individualCloneChild.length; i++) {
    individualCloneChild[i].id = 'clonebox' + i;
    clonedElements[i] = individualCloneChild[i];
    numColumn.children[i].style.opacity = .5;
}

numRow.appendChild(cloneNumColumn);


continueMerge(eoCopy, valarrz);



function continueMerge(arrpass, valarr) {
    var left = [];
    var right = [];
    var high = arrpass.length - 1;
    var leftindeces = [];
    var rightindeces = [];

    if (high > 0) {
        var mid = Math.floor(arrpass.length / 2);
        for (var i = 0; i < mid; i++) {
            left[i] = arrpass[i];
            leftindeces[i] = valarr[i];
        }
        for (var i = 0; i < arrpass.length - mid; i++) {
            right[i] = arrpass[mid + i];
            rightindeces[i] = valarr[i + mid];
        }

        continueMerge(left, leftindeces);
        continueMerge(right, rightindeces);
        mergeit(left, right, arrpass, leftindeces[0], rightindeces[0]);

    }
}


function mergeit(arrleft, arrright, newarr, startIndex, startIndexR) {
    var i = 0;
    var iL = 0;
    var iR = 0;
    var Start = startIndex;
    var StartR = startIndexR;
    groupIndex.push(Start);
    while (iL < arrleft.length && iR < arrright.length) {
        if (arrleft[iL].value < arrright[iR].value) {
            newarr[i] = arrleft[iL];
            mergearr.push([iL + Start, startIndex]);
            iL++;
        } else {
            newarr[i] = arrright[iR];
            mergearr.push([iR + StartR, startIndex]);
            iR++;
        }
        i++;
        startIndex++;

    }
    while (iL < arrleft.length) {
        newarr[i] = arrleft[iL];
        mergearr.push([iL + Start, startIndex]);
        startIndex++;
        iL++;
        i++
    }
    while (iR < arrright.length) {
        newarr[i] = arrright[iR];
        mergearr.push([iR + StartR, startIndex]);
        startIndex++;
        iR++;
        i++
    }
    groupmergearr.push(i);
}



var i = -1;
var x = 0;
var a = 0;
setTimeout(() => {
    mergeSortAnimation();
}, 800);


function mergeSortAnimation() {
    //need to locally initialize in order to be updated on speed changes
    var speed = 125 - (speedRange.value * 10);
    i++;
    //Highlight the group
    if (groupmergearr[i] == elementObject.length) {
        groupCounter = 0; //For the final recur where all the elements will be swapped
    }
    for (var j = groupIndex[i]; j < groupIndex[i] + groupmergearr[i]; j++) {
        cloneNumColumn.children[j].style.backgroundColor = '#ff7f7f';
    }
    setTimeout(() => {
        allocValues(0);
    }, speed * 7);

}


function allocValues(z) {
    //need to locally initialize in order to be updated on speed changes
    var speed = 125 - (speedRange.value * 10);
    setTimeout(() => {
        var elemntIdNum = mergearr[x][0];
        var indivElement = document.querySelector('#clonebox' + elemntIdNum);
        var swapElement = elementObject[mergearr[x][1]].elmnt;
        swapElement.style.backgroundColor = '#ffff7f';
        swapElement.style.opacity = 1;
        swapElement.innerHTML = '';
        setTimeout(() => {
            swapValues(indivElement, swapElement);
            z++;
            x++;
            setTimeout(() => {
                indivElement.style.backgroundColor = '#fff';
                swapElement.style.backgroundColor = '#fff';
                swapElement.style.opacity = .5;
                if (groupmergearr[i] == elementObject.length) {
                    swapElement.style.opacity = 1;
                }
                if (z < groupmergearr[i])
                    allocValues(z);
                else {
                    if (groupmergearr[i] == elementObject.length) {
                        cloneNumColumn.classList.remove('cloneAnimate');
                        cloneNumColumn.className += ' cloneAnimateDone';
                        setTimeout(() => {
                            numRow.removeChild(cloneNumColumn);
                            selectedAlgo.removeAttribute('disabled');
                            newButton.classList.remove('invisible');
                            legendsCard.classList.add('invisible');
                            resetButton.classList.remove('invisible');

                        }, 550);
                    } else {
                        for (var k = groupIndex[i]; k < groupIndex[i] + groupmergearr[i]; k++) {
                            cloneNumColumn.children[k].innerHTML = elementObject[k].elmnt.textContent;
                        }
                        mergeSortAnimation();
                    }
                }
            }, speed * 7);
        }, speed * 7);
    }, speed * 7);
}



function swapValues(indivElement, swapElement) {

    indivElement.style.backgroundColor = '#7f7fff';
    swapElement.innerHTML = indivElement.textContent;
}


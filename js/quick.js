var eoCopy = [];
legendP.innerHTML = "<li style='color: #7f7fff;'>Pivot</li><li style='color: #ff7f7f;'>Current</li><li style='color: #ffff7f;'>Compare / Swap</li>";


for (var j = 0; j < elementObject.length; j++) {
    eoCopy[j] = elementObject[j];
}

var groups = [];
var swappings = [];
var iter = -1;

qsort(eoCopy, 0, eoCopy.length - 1);

function qsort(arr, start, end) {
    if (start >= end) {
        return;
    }
    groups.push([start, end]);
    var pivotIndex = partition(arr, start, end);
    qsort(arr, start, pivotIndex - 1);
    qsort(arr, pivotIndex + 1, end);
}

function partition(arr, start, end) {
    iter++;
    var pivot = arr[end];
    var swapindex = start;
    var temp1;
    var temp2;
    for (var i = start; i < end; i++) {
        if (arr[i].value <= pivot.value) {
            temp1 = arr[swapindex].value;
            temp2 = arr[i].value;
            swappings.push([iter, i, swapindex]);
            arr[swapindex].value = temp2;
            arr[i].value = temp1;
            swapindex++;
        }
    }
    temp1 = arr[swapindex].value;
    temp2 = arr[end].value
    arr[swapindex].value = temp2;
    arr[end].value = temp1;
    swappings.push(["end", end, swapindex]);
    return swapindex;
}

var swapAnim;
var grpCount = 0;
var swapCountGrp = 0;
quickStart(elementObject);

function quickStart(arr) {
    elementObject[groups[grpCount][1]].elmnt.style.backgroundColor = '#7f7fff';
    start = groups[grpCount][0];
    end = groups[grpCount][1];
    swap = start;
    quickswap(arr, start, end, swap);
}

function quickswap(arr, start, end, swap) {
    //need to locally initialize in order to be updated on speed changes
    var speed = 125 - (speedRange.value * 10);
    if (swap < end) {

        elementObject[swap].elmnt.style.backgroundColor = '#ffff7f';
        elementObject[start].elmnt.style.backgroundColor = '#ff7f7f';
        setTimeout(() => {

            if (swappings[swapCountGrp][0] == grpCount &&
                swappings[swapCountGrp][1] == swap &&
                swappings[swapCountGrp][2] == start) {

                var low = elementObject[swap].elmnt.textContent;
                var high = elementObject[start].elmnt.textContent;
                var pos = 0;
                var iPos = elementObject[start].elmnt.offsetLeft;
                var jPos = elementObject[swap].elmnt.offsetLeft;
                var gap = jPos - iPos;
                var pxAdd = gap / 10;
                swapAnim = setInterval(swapStart, speed / 2, elementObject[start], elementObject[swap], pxAdd, gap);
                swapCountGrp++;

                setTimeout(() => {
                    elementObject[start].elmnt.removeAttribute('style');
                    elementObject[swap].elmnt.removeAttribute('style');
                    elementObject[start].elmnt.style.backgroundColor = '#fff';
                    elementObject[start].elmnt.innerHTML = low;
                    elementObject[swap].elmnt.innerHTML = high;
                    start++;
                }, speed * 5);
            }
            setTimeout(() => {
                elementObject[swap].elmnt.style.backgroundColor = '#fff';
                swap++;
                quickswap(arr, start, end, swap);
            }, speed * 6);
        }, speed * 10);

    } else if (swap == end) {
        setTimeout(() => {
            var low = elementObject[end].elmnt.textContent;
            var high = elementObject[start].elmnt.textContent;
            pos = 0;
            var iPos = elementObject[start].elmnt.offsetLeft;
            var jPos = elementObject[end].elmnt.offsetLeft;
            var gap = jPos - iPos;
            var pxAdd = gap / 10;
            swapAnim = setInterval(swapStart, speed / 2, elementObject[start], elementObject[end], pxAdd, gap);

            setTimeout(() => {
                elementObject[start].elmnt.removeAttribute('style');
                elementObject[end].elmnt.removeAttribute('style');
                elementObject[start].elmnt.innerHTML = low;
                elementObject[end].elmnt.innerHTML = high;
                setTimeout(() => {
                    elementObject[start].elmnt.style.backgroundColor = '#fff';
                    elementObject[end].elmnt.style.backgroundColor = '#fff';
                    swapCountGrp++;
                    grpCount++;
                    setTimeout(() => {
                        if (swapCountGrp == swappings.length) {
                            clearInterval(swapAnim);
                            selectedAlgo.removeAttribute('disabled');
                            newButton.classList.remove('invisible');
                            legendsCard.classList.add('invisible');
                            resetButton.classList.remove('invisible');
                        } else {
                            quickStart(arr);
                        }
                    }, speed * 2);
                }, speed * 5);

            }, speed * 5);
        }, speed * 3);
    }
}

'use strict'

var gNums = [];
var gNextNum;
var gTouch;
var gColors = ['red', 'orange', 'yellow', 'chartreuse', 'blue', 'blueviolet'];
var gFontColors = ['chartreuse', 'blue', 'blueviolet', 'red', 'orange', 'yellow'];


function cellClicked(elCell, i) {
    if (elCell.innerText === "1") timer();
    if (parseFloat(elCell.innerText) === gTouch) {
        gNums[i] = gNextNum;
        // renderTable(gNums);
        var strHtml = `<td onclick="cellClicked(this, ${gNextNum})">${gNextNum}</td>`;
        elCell.innerHTML = strHtml;
        elCell.style.backgroundColor = getColor();
        elCell.style.color = getFontColor();
        gTouch++;
        gNextNum++;
        renderTouch();
    }
}


function getColor() {
    var color;
    if (gNextNum < gNums.length * 2) color = gColors[0];
    else if (gNextNum < gNums.length * 3) color = gColors[1];
    else if (gNextNum < gNums.length * 4) color = gColors[2];
    else if (gNextNum < gNums.length * 5) color = gColors[3];
    else if (gNextNum < gNums.length * 6) color = gColors[4];
    else if (gNextNum < gNums.length * 7) color = gColors[5];
    return color;
}


function getFontColor() {
    var fontColor;
    if (gNextNum < gNums.length * 2) fontColor = gFontColors[0];
    else if (gNextNum < gNums.length * 3) fontColor = gFontColors[1];
    else if (gNextNum < gNums.length * 4) fontColor = gFontColors[2];
    else if (gNextNum < gNums.length * 5) fontColor = gFontColors[3];
    else if (gNextNum < gNums.length * 6) fontColor = gFontColors[4];
    else if (gNextNum < gNums.length * 7) fontColor = gFontColors[5];
    return fontColor;
}


function renderTouch() {
    var strHtml = `${gTouch}`;
    var elTouch = document.querySelector('.touch');
    elTouch.innerText = strHtml;
}


function renderTable(nums) {
    var idx = 0;
    var strHtml = '';
    for (var i = 0; i < Math.sqrt(nums.length); i++) {
        strHtml += '<tr>'
        for (var j = 0; j < Math.sqrt(nums.length); j++) {
            var cell = nums[idx];
            strHtml += `<td "data-idx="${idx}""
            onclick="cellClicked(this, ${idx})">${cell}</td>`
            idx++;
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    var elTable = document.querySelector('.table');
    elBoard.innerHTML = strHtml;
    elTable.style.display = 'block';
}


function easy() {
    var elTable = document.querySelector('.table');
    getNums(16);
    renderTable(gNums);
    hideButtons();
    elTable.style.left = '40%';
    elTable.style.bottom = '150px';
}


function hard() {
    var elTable = document.querySelector('.table');
    getNums(25);
    renderTable(gNums);
    hideButtons();
    elTable.style.left = '38%';
    elTable.style.bottom = '120px';
}


function extreme() {
    var elTable = document.querySelector('.table');
    getNums(36);
    renderTable(gNums);
    hideButtons();
    elTable.style.left = '35.5%';
    elTable.style.bottom = '70px';
}


function hideButtons() {
    var elButton = document.querySelector('.button');
    elButton.style.display = 'none';
    renderTouch();
}


function getNums(length) {
    var nums = []
    for (var i = 0; i < length; i++) {
        nums.push(i + 1)
    }
    nums.sort(() => Math.random() - 0.5);
    gNums = nums;
    gTouch = 1;
    gNextNum = nums.length + 1;
}


function timer() {
    var elTimer = document.querySelector('.timer');
    var milliSecondsTime = 60000;
    var timer;
    timer = setInterval(function(){
        milliSecondsTime = milliSecondsTime - 5;
        if(milliSecondsTime === 0) {
            clearTimeout(timer);
            elTimer.innerHTML = '0.000';
            gameOver()
        }
        else {
            elTimer.innerHTML = ((parseInt(milliSecondsTime/1000)) + '.' + milliSecondsTime % 1000);
        }
    },5);
}


function gameOver() {
    var elTable = document.querySelector('.table');
    elTable.innerHTML = `\nGame over! Your score is: ${(gTouch - 1) * 10}`;
    elTable.style.fontSize = '40px';
    elTable.style.backgroundColor = 'red'
    elTable.style.left = '30%'
    elTable.style.color = 'chartreuse'
    elTable.style.height = '50px';
    elTable.style.width = '550px';  
    elTable.style.bottom = '40%';
    elTable.style.textAlign = 'center';
    elTable.style.borderRadius = '20px';
}
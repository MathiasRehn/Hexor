
function start(){
var modalRules = document.getElementById('modalRules');
var modalWinOnTimePlayer2 = document.getElementById('modalWinOnTimePlayer2');
var modalWinOnTimePlayer1 = document.getElementById('modalWinOnTimePlayer1');
var modalPass = document.getElementById('modalPass');
var rulesButton = document.getElementById('rulesButton');
var passButton = document.getElementById('passButton');
var newGameButton = document.getElementById('newGameButton');
var modalPassClose = document.getElementsByClassName('modalPassClose')[0];
var modalWinOnTimePlayer2Close = document.getElementsByClassName('modalWinOnTimePlayer2Close')[0];
var modalWinOnTimePlayer1Close = document.getElementsByClassName('modalWinOnTimePlayer1Close')[0];
var modalRulesClose = document.getElementsByClassName('modalRulesClose')[0];
var numberOfPass;
var numberOfEmptyHexagons = document.querySelectorAll(".empty").length;
var whosPlayerTurn = 1;
var whosPlayerTurnInnerCount = 15;
var scorePlayer1;
var scorePlayer2;
var clockPlayer1;
var clockPlayer2;
var interval;


rulesButton.onclick = function () {
    modalRules.style.display = "block";
}

passButton.onclick = function () {
    ++numberOfPass;
    if (whosPlayerTurn == 2) {
        whosPlayerTurn = 1;
        whosPlayerTurnInnerCount = 10;
        document.querySelector(".scorePlayer1").innerHTML = "Score " + scorePlayer1;
        document.querySelector(".clockPlayer1").innerHTML = "Time " + clockPlayer1;
        document.querySelector(".scorePlayer2").innerHTML = "Score " + scorePlayer2;
        document.querySelector(".clockPlayer2").innerHTML = "Time " + clockPlayer2;
        document.querySelector(".clockPlayer2").style.visibility = "hidden";
        document.querySelector(".scorePlayer2").style.visibility = "hidden";
        document.querySelector(".clockPlayer1").style.visibility = "visible";
        document.querySelector(".scorePlayer1").style.visibility = "visible";
        rulesButton.style.backgroundColor = "#4C7F54";
        newGameButton.style.backgroundColor = "#4C7F54";
        passButton.style.backgroundColor = "#4C7F54";
    } else if (whosPlayerTurn == 1) {
        whosPlayerTurn = 2;
        whosPlayerTurnInnerCount = 20;
        document.querySelector(".scorePlayer1").innerHTML = "Score " + scorePlayer1;
        document.querySelector(".clockPlayer1").innerHTML = "Time " + clockPlayer1;
        document.querySelector(".scorePlayer2").innerHTML = "Score " + scorePlayer2;
        document.querySelector(".clockPlayer2").innerHTML = "Time " + clockPlayer2;
        document.querySelector(".clockPlayer1").style.visibility = "hidden";
        document.querySelector(".scorePlayer1").style.visibility = "hidden";
        document.querySelector(".clockPlayer2").style.visibility = "visible";
        document.querySelector(".scorePlayer2").style.visibility = "visible";
        rulesButton.style.backgroundColor = "rgb(248, 177, 25)";
        newGameButton.style.backgroundColor = "rgb(248, 177, 25)";
        passButton.style.backgroundColor = "rgb(248, 177, 25)";
    }

    if (numberOfPass >= 2) {
        clearInterval(interval);
        modalPass.style.display = "block";
        numberOfPass = 0;
        document.querySelector(".clockPlayer1").style.visibility = "visible";
        document.querySelector(".scorePlayer1").style.visibility = "visible";
        document.querySelector(".clockPlayer2").style.visibility = "visible";
        document.querySelector(".scorePlayer2").style.visibility = "visible";
    }
}

modalPassClose.onclick = function () {
    modalPass.style.display = "none";
}
modalWinOnTimePlayer1Close.onclick = function () {
    modalWinOnTimePlayer1.style.display = "none";
}

modalWinOnTimePlayer2Close.onclick = function () {
    modalWinOnTimePlayer2.style.display = "none";
}

modalRulesClose.onclick = function () {
    modalRules.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalRules) {
        modalRules.style.display = "none";
    } else if (event.target == modalWinOnTimePlayer1) {
        modalWinOnTimePlayer1.style.display = "none";
    } else if (event.target == modalWinOnTimePlayer2) {
        modalWinOnTimePlayer2.style.display = "none";
    } else if (event.target == modalPass) {
        modalPass.style.display = "none";
    }
}

// When user clicks on the button, start or restart the game
newGameButton.onclick = function () {
    numberOfPass = 0;
    clearInterval(interval);
    interval = setInterval(startClock, 1000);
    whosPlayerTurn = 1;
    whosPlayerTurnInnerCount = 15;
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    clockPlayer1 = 10;
    clockPlayer2 = 10;
    document.querySelector(".scorePlayer1").innerHTML = "Score " + scorePlayer1;
    document.querySelector(".clockPlayer1").innerHTML = "Time " + clockPlayer1;
    document.querySelector(".scorePlayer2").innerHTML = "Score " + scorePlayer2;
    document.querySelector(".clockPlayer2").innerHTML = "Time " + clockPlayer2;
    document.querySelector(".clockPlayer2").style.visibility = "hidden";
    document.querySelector(".scorePlayer2").style.visibility = "hidden";
    document.querySelector(".clockPlayer1").style.visibility = "visible";
    document.querySelector(".scorePlayer1").style.visibility = "visible";
    newGameButton.innerHTML = "RESTART";
    newGameButton.style.backgroundColor = "#4C7F54";
    rulesButton.style.backgroundColor = "#4C7F54";
    passButton.style.backgroundColor = "#4C7F54";
    var newGame = document.querySelectorAll(".player1, .player2, .conflictPlayer1, .conflictPlayer2, .player1Tower, .player2Tower");
    for (i = 0; i < newGame.length; i++) {
        newGame[i].className = "empty";
    }
    numberOfEmptyHexagons = document.querySelectorAll(".empty").length;
    var tds = document.querySelectorAll('td');
    tds.forEach(td => td.addEventListener("click", clickedOnHexagon));
}

//Gets callead every 1000 ms
function startClock() {
    if (whosPlayerTurn == 1) {
        timePlayer1();
    } else timePlayer2();
}
 
function timePlayer1() {
    clockPlayer1--;
    document.querySelector(".clockPlayer1").innerHTML = "Time " + clockPlayer1;
    if (clockPlayer1 <= 0) {
        modalWinOnTimePlayer2.style.display = "block";
        document.querySelector(".clockPlayer2").style.visibility = "visible";
        document.querySelector(".scorePlayer2").style.visibility = "visible";
        clearInterval(interval);
    }
}

function timePlayer2() {
    clockPlayer2--;
    document.querySelector(".clockPlayer2").innerHTML = "Time " + clockPlayer2;
    if (clockPlayer2 <= 0) {
        modalWinOnTimePlayer1.style.display = "block";
        document.querySelector(".clockPlayer1").style.visibility = "visible";
        document.querySelector(".scorePlayer1").style.visibility = "visible";
        clearInterval(interval);
    }
}

function clickedOnHexagon(e) {
    numberOfPass = 0;
    var x = e.target.id;
    //Om spelare väljer en "conflict"-ruta så registreras ingenting
    if (e.target.className == "conflictPlayer1" || e.target.className == "conflictPlayer2") {
        //Om spelare 1 vid sitt första val trycker på en av sina rutor, så skapas ett tower.
    } else if (whosPlayerTurn == 1 && whosPlayerTurnInnerCount == 10 && e.target.className == "player1") {
        player1Tower(e);
        //Om spelare 2 vid sitt första val trycker på en av sina rutor, så skapas ett tower.
    } else if (whosPlayerTurn == 2 && whosPlayerTurnInnerCount == 20 && e.target.className == "player2") {
        player2Tower(e);
        //Spelare 1 får välja två nya rutor.
    } else if (whosPlayerTurn == 1 && e.target.className == "empty") {
        emptyHexagonToPlayer1(e);
        //Spelare 2 får välja två nya rutor.
    } else if (whosPlayerTurn == 2 && e.target.className == "empty") {
        emptyHexagonToPlayer2(e);
        //Om spelare vid sitt första val trycker på motståndaren så attackeras rutan.
    } else if ((whosPlayerTurn == 1 && whosPlayerTurnInnerCount == 10 && e.target.className == "player2") || (whosPlayerTurn == 2 && whosPlayerTurnInnerCount == 20 && e.target.className == "player1"
        || whosPlayerTurn == 1 && whosPlayerTurnInnerCount == 10 && e.target.className == "player2Tower") || (whosPlayerTurn == 2 && whosPlayerTurnInnerCount == 20 && e.target.className == "player1Tower")) {
        attackedPlayerHexagon(e);
    }
    if (whosPlayerTurnInnerCount == 20) {
        playersTurnToPlayer2();
    } else if (whosPlayerTurnInnerCount == 10) {
        playersTurnToPlayer1();
    }
}

function player1Tower(e) {
    e.target.className = "player1Tower";
    whosPlayerTurn = 2;
    whosPlayerTurnInnerCount = 20;
}

function player2Tower(e) {
    e.target.className = "player2Tower";
    whosPlayerTurn = 1;
    whosPlayerTurnInnerCount = 10;
}

function emptyHexagonToPlayer1(e) {
    e.target.className = "player1";
    scorePlayer1++;
    numberOfEmptyHexagons--;
    document.querySelector(".scorePlayer1").innerHTML = "Score " + scorePlayer1;
    whosPlayerTurnInnerCount += 5;
    if (numberOfEmptyHexagons <= 0) {
        whosPlayerTurn = 2;
        whosPlayerTurnInnerCount = 20;
    }
}

function emptyHexagonToPlayer2(e) {
    e.target.className = "player2";
    scorePlayer2++;
    numberOfEmptyHexagons--;
    document.querySelector(".scorePlayer2").innerHTML = "Score " + scorePlayer2;
    whosPlayerTurnInnerCount -= 5;
    if (numberOfEmptyHexagons <= 0) {
        whosPlayerTurn = 1;
        whosPlayerTurnInnerCount = 10;
    }
}

function attackedPlayerHexagon(e) {
    var surroundingHexagonsPlayer1 = 0;
    var surroundingHexagonsPlayer2 = 0;
    var x = e.target.id;
    if (document.getElementById(parseInt(x) + 1).className == "player2") {
        surroundingHexagonsPlayer2++;
    } else if (document.getElementById(parseInt(x) + 1).className == "player1") {
        surroundingHexagonsPlayer1++;
    }
    if (document.getElementById(parseInt(x) + 1).className == "player2Tower") {
        surroundingHexagonsPlayer2 += 2;
    } else if (document.getElementById(parseInt(x) + 1).className == "player1Tower") {
        surroundingHexagonsPlayer1 += 2;
    }
    if (document.getElementById(x - 1).className == "player2") {
        surroundingHexagonsPlayer2++;
    } else if (document.getElementById(x - 1).className == "player1") {
        surroundingHexagonsPlayer1++;
    }
    if (document.getElementById(x - 1).className == "player2Tower") {
        surroundingHexagonsPlayer2 += 2;
    } else if (document.getElementById(x - 1).className == "player1Tower") {
        surroundingHexagonsPlayer1 += 2;
    }
    if (document.getElementById(parseInt(x) + 100).className == "player2") {
        surroundingHexagonsPlayer2++;
    } else if (document.getElementById(parseInt(x) + 100).className == "player1") {
        surroundingHexagonsPlayer1++;
    }
    if (document.getElementById(parseInt(x) + 100).className == "player2Tower") {
        surroundingHexagonsPlayer2 += 2;
    } else if (document.getElementById(parseInt(x) + 100).className == "player1Tower") {
        surroundingHexagonsPlayer1 += 2;
    }
    if (document.getElementById(x - 100).className == "player2") {
        surroundingHexagonsPlayer2++;
    } else if (document.getElementById(x - 100).className == "player1") {
        surroundingHexagonsPlayer1++;
    }
    if (document.getElementById(x - 100).className == "player2Tower") {
        surroundingHexagonsPlayer2 += 2;
    } else if (document.getElementById(x - 100).className == "player1Tower") {
        surroundingHexagonsPlayer1 += 2;
    }
    if (document.getElementById(x).parentElement.className == "odd") {

        if (document.getElementById(parseInt(x) + 101).className == "player2") {
            surroundingHexagonsPlayer2++;
        } else if (document.getElementById(parseInt(x) + 101).className == "player1") {
            surroundingHexagonsPlayer1++;
        }
        if (document.getElementById(parseInt(x) + 101).className == "player2Tower") {
            surroundingHexagonsPlayer2 += 2;
        } else if (document.getElementById(parseInt(x) + 101).className == "player1Tower") {
            surroundingHexagonsPlayer1 += 2;
        }
        if (document.getElementById(x - 99).className == "player2") {
            surroundingHexagonsPlayer2++;
        } else if (document.getElementById(x - 99).className == "player1") {
            surroundingHexagonsPlayer1++;
        }
        if (document.getElementById(x - 99).className == "player2Tower") {
            surroundingHexagonsPlayer2 += 2;
        } else if (document.getElementById(x - 99).className == "player1Tower") {
            surroundingHexagonsPlayer1 += 2;
        }
    } else if (document.getElementById(x).parentElement.className == "even") {

        if (document.getElementById(parseInt(x) + 99).className == "player2") {
            surroundingHexagonsPlayer2++;
        } else if (document.getElementById(parseInt(x) + 99).className == "player1") {
            surroundingHexagonsPlayer1++;
        }
        if (document.getElementById(parseInt(x) + 99).className == "player2Tower") {
            surroundingHexagonsPlayer2 += 2;
        } else if (document.getElementById(parseInt(x) + 99).className == "player1Tower") {
            surroundingHexagonsPlayer1 += 2;
        }
        if (document.getElementById(x - 101).className == "player2") {
            surroundingHexagonsPlayer2++;
        } else if (document.getElementById(x - 101).className == "player1") {
            surroundingHexagonsPlayer1++;
        }
        if (document.getElementById(x - 101).className == "player2Tower") {
            surroundingHexagonsPlayer2 += 2;
        } else if (document.getElementById(x - 101).className == "player1Tower") {
            surroundingHexagonsPlayer1 += 2;
        }
    }

    //Räknar ut vad som händer efter attacken
    if ((surroundingHexagonsPlayer1 > 0 && surroundingHexagonsPlayer1 > surroundingHexagonsPlayer2) && whosPlayerTurn == 1) {
        e.target.className = "player1";
        whosPlayerTurn = 2;
        whosPlayerTurnInnerCount = 20;
        scorePlayer2--;
        scorePlayer1++;

    } else if ((surroundingHexagonsPlayer2 > 0 && surroundingHexagonsPlayer2 > surroundingHexagonsPlayer1) && whosPlayerTurn == 2) {
        e.target.className = "player2";
        whosPlayerTurn = 1;
        whosPlayerTurnInnerCount = 10;
        scorePlayer2++;
        scorePlayer1--;

    } else if ((surroundingHexagonsPlayer2 > 0 && surroundingHexagonsPlayer2 == surroundingHexagonsPlayer1) && e.target.className == "player2") {
        e.target.className = "conflictPlayer2";
        whosPlayerTurn = 2;
        whosPlayerTurnInnerCount = 20;
        scorePlayer2--;

    } else if ((surroundingHexagonsPlayer2 > 0 && surroundingHexagonsPlayer2 == surroundingHexagonsPlayer1) && e.target.className == "player1") {
        e.target.className = "conflictPlayer1";
        whosPlayerTurn = 1;
        whosPlayerTurnInnerCount = 10;
        scorePlayer1--;
    } 
}

function playersTurnToPlayer2() {
    whosPlayerTurn = 2;
    clockPlayer1 += 4;
    document.querySelector(".scorePlayer1").innerHTML = "Score " + scorePlayer1;
    document.querySelector(".clockPlayer1").innerHTML = "Time " + clockPlayer1;
    document.querySelector(".scorePlayer2").innerHTML = "Score " + scorePlayer2;
    document.querySelector(".clockPlayer2").innerHTML = "Time " + clockPlayer2;
    document.querySelector(".clockPlayer1").style.visibility = "hidden";
    document.querySelector(".scorePlayer1").style.visibility = "hidden";
    document.querySelector(".clockPlayer2").style.visibility = "visible";
    document.querySelector(".scorePlayer2").style.visibility = "visible";
    rulesButton.style.backgroundColor = "rgb(248, 177, 25)";
    newGameButton.style.backgroundColor = "rgb(248, 177, 25)";
    passButton.style.backgroundColor = "rgb(248, 177, 25)";
}

function playersTurnToPlayer1() {
    whosPlayerTurn = 1;
    clockPlayer2 += 4;
    document.querySelector(".scorePlayer1").innerHTML = "Score " + scorePlayer1;
    document.querySelector(".clockPlayer1").innerHTML = "Time " + clockPlayer1;
    document.querySelector(".scorePlayer2").innerHTML = "Score " + scorePlayer2;
    document.querySelector(".clockPlayer2").innerHTML = "Time " + clockPlayer2;
    document.querySelector(".clockPlayer2").style.visibility = "hidden";
    document.querySelector(".scorePlayer2").style.visibility = "hidden";
    document.querySelector(".clockPlayer1").style.visibility = "visible";
    document.querySelector(".scorePlayer1").style.visibility = "visible";
    rulesButton.style.backgroundColor = "#4C7F54";
    newGameButton.style.backgroundColor = "#4C7F54";
    passButton.style.backgroundColor = "#4C7F54";
}
}
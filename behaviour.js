
var modalRules = document.getElementById('modalRules');
var modalWinOnTimePlayer2 = document.getElementById('modalWinOnTimePlayer2');
var modalWinOnTimePlayer1 = document.getElementById('modalWinOnTimePlayer1');
var modalPass = document.getElementById('modalPass');
var modalPassClose = document.getElementsByClassName('modalPassClose')[0];
var modalWinOnTimePlayer2Close = document.getElementsByClassName('modalWinOnTimePlayer2Close')[0];
var modalWinOnTimePlayer1Close = document.getElementsByClassName('modalWinOnTimePlayer1Close')[0];
var modalRulesClose = document.getElementsByClassName('modalRulesClose')[0];
var rulesButton = $("#rulesButton");
var passButton = $("#passButton");
var newGameButton = $("#newGameButton");
passButton.css("opacity", "0.2");
passButton.disabled = true;
passButton.css("cursor", "default");
var startValueScore = 0;
var startValueClock = 180;
var scorePlayer1 = startValueScore;
var scorePlayer2 = startValueScore;
var clockPlayer1 = startValueClock;
var clockPlayer2 = startValueClock;
printScoreTimeBothPlayers();
newGameButton.html("START");
rulesButton.html("RULES");
passButton.html("PASS");
var numberOfPass;
var numberOfEmptyHexagons = document.querySelectorAll(".empty").length;
var whosPlayerTurn;
var whosPlayerTurnInnerCount;
var interval;

function printScoreTimeBothPlayers(){
    $(".scorePlayer1").html("Score " + scorePlayer1);
    $(".clockPlayer1").html("Time " + clockPlayer1);
    $(".scorePlayer2").html("Score " + scorePlayer2);
    $(".clockPlayer2").html("Time " + clockPlayer2); 
}

rulesButton.click(function () {
    modalRules.style.display = "block";
})


passButton.click(function () {
    ++numberOfPass;
    if (whosPlayerTurn == 2) {
        playersTurnToPlayer1();
    } else if (whosPlayerTurn == 1) {
        playersTurnToPlayer2();
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
});

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

newGameButton.click(function () {
    numberOfPass = 0;
    passButton.css("opacity", "1.0");
    clearInterval(interval);
    interval = setInterval(startClock, 1000);
    passButton.disabled = false;
    scorePlayer1 = startValueScore;
    scorePlayer2 = startValueScore;
    clockPlayer1 = startValueClock;
    playersTurnToPlayer1();
    clockPlayer2 = startValueClock;
    whosPlayerTurnInnerCount = 15;
    newGameButton.html("RESTART");
    $(".player1, .player2, .conflictPlayer, .player1Tower, .player2Tower").attr("class","empty");
    numberOfEmptyHexagons = $(".empty").length;
    $("td").click(clickedOnHexagon);
})

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
    if (e.target.className == "conflictPlayer") {
    } else if (whosPlayerTurn == 1 && whosPlayerTurnInnerCount == 10 && e.target.className == "player1") {
        player1Tower(e);
    } else if (whosPlayerTurn == 2 && whosPlayerTurnInnerCount == 20 && e.target.className == "player2") {
        player2Tower(e);
    } else if (whosPlayerTurn == 1 && e.target.className == "empty") {
        emptyHexagonToPlayer1(e);
    } else if (whosPlayerTurn == 2 && e.target.className == "empty") {
        emptyHexagonToPlayer2(e);
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
}

function emptyHexagonToPlayer2(e) {
    e.target.className = "player2";
    scorePlayer2++;
    numberOfEmptyHexagons--;
    document.querySelector(".scorePlayer2").innerHTML = "Score " + scorePlayer2;
    whosPlayerTurnInnerCount -= 5;
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
        e.target.className = "conflictPlayer";
        whosPlayerTurn = 2;
        whosPlayerTurnInnerCount = 20;
        scorePlayer2--;

    } else if ((surroundingHexagonsPlayer2 > 0 && surroundingHexagonsPlayer2 == surroundingHexagonsPlayer1) && e.target.className == "player1") {
        e.target.className = "conflictPlayer";
        whosPlayerTurn = 1;
        whosPlayerTurnInnerCount = 10;
        scorePlayer1--;
    } 
}

function playersTurnToPlayer2() {
    whosPlayerTurnInnerCount = 20;
    whosPlayerTurn = 2;
    clockPlayer1 += 4;
    printScoreTimeBothPlayers();
    document.querySelector(".clockPlayer1").style.visibility = "hidden";
    document.querySelector(".scorePlayer1").style.visibility = "hidden";
    document.querySelector(".clockPlayer2").style.visibility = "visible";
    document.querySelector(".scorePlayer2").style.visibility = "visible";
    rulesButton.css("backgroundColor", "rgb(248, 177, 25)");
    newGameButton.css("backgroundColor", "rgb(248, 177, 25)");
    passButton.css("backgroundColor", "rgb(248, 177, 25)");
}

function playersTurnToPlayer1() {
    whosPlayerTurnInnerCount = 10;
    whosPlayerTurn = 1;
    clockPlayer2 += 4;
    printScoreTimeBothPlayers();
    document.querySelector(".clockPlayer1").style.visibility = "visible";
    document.querySelector(".scorePlayer1").style.visibility = "visible";
    document.querySelector(".clockPlayer2").style.visibility = "hidden";
    document.querySelector(".scorePlayer2").style.visibility = "hidden";
    rulesButton.css("backgroundColor", "#4C7F54");
    newGameButton.css("backgroundColor", "#4C7F54");
    passButton.css("backgroundColor", "#4C7F54");
}
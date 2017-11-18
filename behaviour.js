// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("rules");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the button that opens the modal
var btnNew = document.getElementById("newGame");


// When the user clicks on the button, open the modal 
btnNew.onclick = function() {
    count = 1;
    innerCount = 15;
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    downPlayer1 = 180;
    downPlayer2 = 180;
    document.querySelector(".scorePlayer1").innerHTML ="Score " + scorePlayer1;
    document.querySelector(".clockPlayer1").innerHTML = "Time " + downPlayer1;
    document.querySelector(".scorePlayer2").innerHTML ="Score " + scorePlayer2;
    document.querySelector(".clockPlayer2").innerHTML = "Time " + downPlayer2;
    document.querySelector(".clockPlayer2").style.visibility = "hidden";
    document.querySelector(".scorePlayer2").style.visibility = "hidden";
    document.querySelector(".clockPlayer1").style.visibility = "visible";
    document.querySelector(".scorePlayer1").style.visibility = "visible";
    var newGame = document.querySelectorAll('td');
    for(i=0; i<newGame.length; i++){
        newGame[i].className = "empty";
    }
}


var tds = document.querySelectorAll('td');
tds.forEach( td => td.addEventListener("click", myFunction));

var count = 1;
var innerCount = 15;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var downPlayer1 = 180;
var downPlayer2 = 180;
var intervalStop = null;

//Startar tiden
var interval = setInterval(clock, 1000);
function clock(){
if(count==1){
    timePlayer1();
}else timePlayer2();
}

//Tiden för player 1 går medan den för player 2 står still
function timePlayer1(){
    downPlayer1--;
    document.querySelector(".clockPlayer1").innerHTML = "Time " + downPlayer1;
    if(downPlayer1 <= 0){
    clearInterval(interval);
    document.querySelector("h1").style.color = "rgb(248, 177, 25)";
    document.querySelector("h1").innerHTML = "WON ON TIME!";
    } 
}
//Tiden för player 2 går medan den för player 1 står still
function timePlayer2(){
    downPlayer2--;
    document.querySelector(".clockPlayer2").innerHTML ="Time " +  downPlayer2;
    if(downPlayer2 <= 0){
        clearInterval(interval);
        document.querySelector("h1").style.color = "#4C7F54";
        document.querySelector("h1").innerHTML = "WON ON TIME!";
}
}





//När spelare trycker på en av rutorna
function myFunction(e) {
    
    var x = e.target.id;
    var totalPlayer1 = 0;
    var totalPlayer2 = 0;
    //Om spelare väljer en "conflict"-ruta så registreras ingenting
    if  (e.target.className == "conflictPlayer1" || e.target.className == "conflictPlayer2"){

    //Om spelare 1 vid sitt första val trycker på en av sina rutor, så skapas ett tower.
    } else if (count == 1 && innerCount == 10 && e.target.className == "player1"){
                e.target.className ="player1Tower";
                count = 2;
                innerCount = 20;
    //Om spelare 2 vid sitt första val trycker på en av sina rutor, så skapas ett tower.
    } else if (count == 2 && innerCount == 20 && e.target.className =="player2"){
                e.target.className ="player2Tower";
                count = 1;
                innerCount = 10;
    //Spelare 1 får svälja två nya rutor.
    } else if(count == 1 && e.target.className =="empty"){
                e.target.className = "player1";
                scorePlayer1++;
                document.querySelector(".scorePlayer1").innerHTML ="Score " + scorePlayer1;
                innerCount += 5;
    //Spelare 1 får svälja två nya rutor.
    } else if(count == 2 && e.target.className =="empty"){
                e.target.className = "player2";
                scorePlayer2++;
                document.querySelector(".scorePlayer2").innerHTML = "Score " + scorePlayer2;
                innerCount -= 5;
     //Om spelare vid sitt första val trycker på motståndaren så attackeras rutan.
    } else if((count == 1 && innerCount == 10 && e.target.className =="player2") || (count == 2 && innerCount == 20 && e.target.className =="player1" 
    || count == 1 && innerCount == 10 && e.target.className =="player2Tower") || (count == 2 && innerCount == 20 && e.target.className =="player1Tower"  )){
                
                //När spelare attackerar udda rader
        if (document.getElementById(x).parentElement.className == "odd"){
            if(x < 200){
                if (x==101){
                            if(document.getElementById(parseInt(x)+1).className == "player2"){
                                totalPlayer2++;
                            } else if (document.getElementById(parseInt(x)+1).className == "player1"){
                                totalPlayer1++;}                            
                            if (document.getElementById(parseInt(x)+1).className == "player2Tower"){
                                totalPlayer2 += 2;
                            } else if (document.getElementById(parseInt(x)+1).className == "player1Tower"){
                                totalPlayer1 += 2;}
                            if(document.getElementById(parseInt(x)+100).className == "player2"){
                                totalPlayer2++;
                            } else if (document.getElementById(parseInt(x)+100).className == "player1"){
                                totalPlayer1++;}                            
                            if (document.getElementById(parseInt(x)+100).className == "player2Tower"){
                                totalPlayer2 += 2;
                            } else if (document.getElementById(parseInt(x)+100).className == "player1Tower"){
                                    totalPlayer1 += 2;}
                            if(document.getElementById(parseInt(x)+101).className == "player2"){
                                        totalPlayer2++;
                            } else if (document.getElementById(parseInt(x)+101).className == "player1"){
                                        totalPlayer1++;}                            
                            if (document.getElementById(parseInt(x)+101).className == "player2Tower"){
                                        totalPlayer2 += 2;
                            } else if (document.getElementById(parseInt(x)+101).className == "player1Tower"){
                                            totalPlayer1 += 2;}
                } else if (x==110){
                            if(document.getElementById(x-1).className == "player2"){
                                totalPlayer2++;
                            } else if (document.getElementById(x-1).className == "player1"){
                                totalPlayer1++;}                            
                            if (document.getElementById(x-1).className == "player2Tower"){
                                totalPlayer2 += 2;
                            } else if (document.getElementById(x-1).className == "player1Tower"){
                                totalPlayer1 += 2;}
                            if(document.getElementById(parseInt(x)+100).className == "player2"){
                                totalPlayer2++;
                            } else if (document.getElementById(parseInt(x)+100).className == "player1"){
                                totalPlayer1++;}                            
                            if (document.getElementById(parseInt(x)+100).className == "player2Tower"){
                                totalPlayer2 += 2;
                            } else if (document.getElementById(parseInt(x)+100).className == "player1Tower"){
                                    totalPlayer1 += 2;}
                            if(document.getElementById(parseInt(x)+101).className == "player2"){
                                        totalPlayer2++;
                            } else if (document.getElementById(parseInt(x)+101).className == "player1"){
                                        totalPlayer1++;}                            
                            if (document.getElementById(parseInt(x)+101).className == "player2Tower"){
                                        totalPlayer2 += 2;
                            } else if (document.getElementById(parseInt(x)+101).className == "player1Tower"){
                                            totalPlayer1 += 2;}
                } else {
                            if(document.getElementById(parseInt(x)+1).className == "player2"){
                                totalPlayer2++;
                            } else if (document.getElementById(parseInt(x)+1).className == "player1"){
                                totalPlayer1++;}                            
                            if (document.getElementById(parseInt(x)+1).className == "player2Tower"){
                                totalPlayer2 += 2;
                            } else if (document.getElementById(parseInt(x)+1).className == "player1Tower"){
                                    totalPlayer1 += 2;}
                            if(document.getElementById(x-1).className == "player2"){
                                totalPlayer2++;
                            } else if (document.getElementById(x-1).className == "player1"){
                                totalPlayer1++;}                            
                            if (document.getElementById(x-1).className == "player2Tower"){
                                totalPlayer2 += 2;
                            } else if (document.getElementById(x-1).className == "player1Tower"){
                                totalPlayer1 += 2;}
                            if(document.getElementById(parseInt(x)+100).className == "player2"){
                                totalPlayer2++;
                            } else if (document.getElementById(parseInt(x)+100).className == "player1"){
                                totalPlayer1++;}                            
                            if (document.getElementById(parseInt(x)+100).className == "player2Tower"){
                                totalPlayer2 += 2;
                            } else if (document.getElementById(parseInt(x)+100).className == "player1Tower"){
                                    totalPlayer1 += 2;}
                            if(document.getElementById(parseInt(x)+101).className == "player2"){
                                        totalPlayer2++;
                            } else if (document.getElementById(parseInt(x)+101).className == "player1"){
                                        totalPlayer1++;}                            
                            if (document.getElementById(parseInt(x)+101).className == "player2Tower"){
                                        totalPlayer2 += 2;
                            } else if (document.getElementById(parseInt(x)+101).className == "player1Tower"){
                                            totalPlayer1 += 2;}
                        }
            }
                        //Sista raden
                else if(x > 900){
                            //Första rutan sista raden
                    if (x==901){
                                if(document.getElementById(parseInt(x)+1).className == "player2"){
                                    totalPlayer2++;
                                } else if (document.getElementById(parseInt(x)+1).className == "player1"){
                                    totalPlayer1++;}                            
                                if (document.getElementById(parseInt(x)+1).className == "player2Tower"){
                                    totalPlayer2 += 2;
                                } else if (document.getElementById(parseInt(x)+1).className == "player1Tower"){
                                    totalPlayer1 += 2;}
                                if(document.getElementById(x-100).className == "player2"){
                                    totalPlayer2++;
                                } else if (document.getElementById(x-100).className == "player1"){
                                    totalPlayer1++;}                            
                                if (document.getElementById(x-100).className == "player2Tower"){
                                    totalPlayer2 += 2;
                                } else if (document.getElementById(x-100).className == "player1Tower"){
                                        totalPlayer1 += 2;}
                                if(document.getElementById(x-99).className == "player2"){
                                            totalPlayer2++;
                                } else if (document.getElementById(x-99).className == "player1"){
                                            totalPlayer1++;}                            
                                if (document.getElementById(x-99).className == "player2Tower"){
                                            totalPlayer2 += 2;
                                } else if (document.getElementById(x-99).className == "player1Tower"){
                                                totalPlayer1 += 2;}
                            //FSista rutan sista raden
                    } else if (x==910){
                                if(document.getElementById(x-1).className == "player2"){
                                    totalPlayer2++;
                                } else if (document.getElementById(x-1).className == "player1"){
                                    totalPlayer1++;}                            
                                if (document.getElementById(x-1).className == "player2Tower"){
                                    totalPlayer2 += 2;
                                } else if (document.getElementById(x-1).className == "player1Tower"){
                                    totalPlayer1 += 2;}
                                    if(document.getElementById(x-100).className == "player2"){
                                        totalPlayer2++;
                                    } else if (document.getElementById(x-100).className == "player1"){
                                        totalPlayer1++;}                            
                                    if (document.getElementById(x-100).className == "player2Tower"){
                                        totalPlayer2 += 2;
                                    } else if (document.getElementById(x-100).className == "player1Tower"){
                                            totalPlayer1 += 2;}
                                    if(document.getElementById(x-99).className == "player2"){
                                                totalPlayer2++;
                                    } else if (document.getElementById(x-99).className == "player1"){
                                                totalPlayer1++;}                            
                                    if (document.getElementById(x-99).className == "player2Tower"){
                                                totalPlayer2 += 2;
                                    } else if (document.getElementById(x-99).className == "player1Tower"){
                                                    totalPlayer1 += 2;}
                    } else {
                                if(document.getElementById(parseInt(x)+1).className == "player2"){
                                    totalPlayer2++;
                                } else if (document.getElementById(parseInt(x)+1).className == "player1"){
                                    totalPlayer1++;}                            
                                if (document.getElementById(parseInt(x)+1).className == "player2Tower"){
                                    totalPlayer2 += 2;
                                } else if (document.getElementById(parseInt(x)+1).className == "player1Tower"){
                                        totalPlayer1 += 2;}
                                if(document.getElementById(x-1).className == "player2"){
                                    totalPlayer2++;
                                } else if (document.getElementById(x-1).className == "player1"){
                                    totalPlayer1++;}                            
                                if (document.getElementById(x-1).className == "player2Tower"){
                                    totalPlayer2 += 2;
                                } else if (document.getElementById(x-1).className == "player1Tower"){
                                    totalPlayer1 += 2;}
                                if(document.getElementById(x-100).className == "player2"){
                                                    totalPlayer2++;
                                } else if (document.getElementById(x-100).className == "player1"){
                                                    totalPlayer1++;}                            
                                if (document.getElementById(x-100).className == "player2Tower"){
                                                    totalPlayer2 += 2;
                                } else if (document.getElementById(x-100).className == "player1Tower"){
                                                        totalPlayer1 += 2;}
                                if(document.getElementById(x-99).className == "player2"){
                                                            totalPlayer2++;
                                } else if (document.getElementById(x-99).className == "player1"){
                                                            totalPlayer1++;}                            
                                                if (document.getElementById(x-99).className == "player2Tower"){
                                                            totalPlayer2 += 2;
                                                } else if (document.getElementById(x-99).className == "player1Tower"){
                                                                totalPlayer1 += 2;}
                            }
                    } else {
                    if (x%100 == 1){ 
                        if(document.getElementById(parseInt(x)+1).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(parseInt(x)+1).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(parseInt(x)+1).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(parseInt(x)+1).className == "player1Tower"){
                            totalPlayer1 += 2;}

                        if(document.getElementById(x-100).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(x-100).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(x-100).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(x-100).className == "player1Tower"){
                            totalPlayer1 += 2;}
                        
                        if(document.getElementById(parseInt(x)+100).className == "player2"){
                                totalPlayer2++;
                        } else if (document.getElementById(parseInt(x)+100).className == "player1"){
                                totalPlayer1++;
                        } 
                        
                        if (document.getElementById(parseInt(x)+100).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(parseInt(x)+100).className == "player1Tower"){
                            totalPlayer1 += 2;}
                    
                    //När sista rutan i en rad attackeras.
                    } else if(x%100 == 10){
                        if(document.getElementById(x-1).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(x-1).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(x-1).className == "player2Tower"){
                                totalPlayer2 += 2;
                        } else if (document.getElementById(x-1).className == "player1Tower"){
                                totalPlayer1 += 2;}
                            
                        if(document.getElementById(x-99).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(x-99).className == "player1"){
                            totalPlayer1++;
                        }  
                        
                        if (document.getElementById(x-99).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(x-99).className == "player1Tower"){
                            totalPlayer1 += 2;}
        
                        if(document.getElementById(parseInt(x)+101).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(parseInt(x)+101).className == "player1"){
                                totalPlayer1++;
                        } 
                        
                        if (document.getElementById(parseInt(x)+101).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(parseInt(x)+101).className == "player1Tower"){
                            totalPlayer1 += 2;}
                        
                    //Alla andra ojämna rader
                        }else {
                        if (document.getElementById(parseInt(x)+1).className == "player2"){
                        totalPlayer2++;
                    } else if (document.getElementById(parseInt(x)+1).className == "player1"){
                        totalPlayer1++;}                            
                    if (document.getElementById(parseInt(x)+1).className == "player2Tower"){
                        totalPlayer2 += 2;
                    } else if (document.getElementById(parseInt(x)+1).className == "player1Tower"){
                            totalPlayer1 += 2;}
                    if(document.getElementById(x-1).className == "player2"){
                        totalPlayer2++;
                    } else if (document.getElementById(x-1).className == "player1"){
                        totalPlayer1++;}                            
                    if (document.getElementById(x-1).className == "player2Tower"){
                        totalPlayer2 += 2;
                    } else if (document.getElementById(x-1).className == "player1Tower"){
                        totalPlayer1 += 2;}
                    if(document.getElementById(parseInt(x)+100).className == "player2"){
                        totalPlayer2++;
                    } else if (document.getElementById(parseInt(x)+100).className == "player1"){
                        totalPlayer1++;}                            
                    if (document.getElementById(parseInt(x)+100).className == "player2Tower"){
                        totalPlayer2 += 2;
                    } else if (document.getElementById(parseInt(x)+100).className == "player1Tower"){
                            totalPlayer1 += 2;}
                    if(document.getElementById(parseInt(x)+101).className == "player2"){
                                totalPlayer2++;
                    } else if (document.getElementById(parseInt(x)+101).className == "player1"){
                                totalPlayer1++;}                            
                    if (document.getElementById(parseInt(x)+101).className == "player2Tower"){
                                totalPlayer2 += 2;
                    } else if (document.getElementById(parseInt(x)+101).className == "player1Tower"){
                                    totalPlayer1 += 2;}
                    if(document.getElementById(x-100).className == "player2"){
                                        totalPlayer2++;
                    } else if (document.getElementById(x-100).className == "player1"){
                                        totalPlayer1++;}                            
                    if (document.getElementById(x-100).className == "player2Tower"){
                                        totalPlayer2 += 2;
                    } else if (document.getElementById(x-100).className == "player1Tower"){
                                            totalPlayer1 += 2;}
                    if(document.getElementById(x-99).className == "player2"){
                                                totalPlayer2++;
                    } else if (document.getElementById(x-99).className == "player1"){
                                                totalPlayer1++;}                            
                    if (document.getElementById(x-99).className == "player2Tower"){
                                                totalPlayer2 += 2;
                    } else if (document.getElementById(x-99).className == "player1Tower"){
                                                    totalPlayer1 += 2;}
                    }
                //När spelare attackerar jämna rader
                }
            }else if (document.getElementById(x).parentElement.className == "even"){

                    //När första rutan i en rad attackeras.
                    if (x%100 == 1){ 
                        if(document.getElementById(parseInt(x)+1).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(parseInt(x)+1).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(parseInt(x)+1).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(parseInt(x)+1).className == "player1Tower"){
                            totalPlayer1 += 2;}

                        if(document.getElementById(x-100).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(x-100).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(x-100).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(x-100).className == "player1Tower"){
                            totalPlayer1 += 2;}
                        
                        if(document.getElementById(parseInt(x)+100).className == "player2"){
                                totalPlayer2++;
                        } else if (document.getElementById(parseInt(x)+100).className == "player1"){
                                totalPlayer1++;
                        } 
                        
                        if (document.getElementById(parseInt(x)+100).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(parseInt(x)+100).className == "player1Tower"){
                            totalPlayer1 += 2;}
                    
                    //När sista rutan i en rad attackeras.
                    } else if(x%100 == 11){
                        if(document.getElementById(x-1).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(x-1).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(x-1).className == "player2Tower"){
                                totalPlayer2 += 2;
                        } else if (document.getElementById(x-1).className == "player1Tower"){
                                totalPlayer1 += 2;}
                            
                        if(document.getElementById(x-101).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(x-101).className == "player1"){
                            totalPlayer1++;
                        }  
                        
                        if (document.getElementById(x-101).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(x-101).className == "player1Tower"){
                            totalPlayer1 += 2;}
        
                        if(document.getElementById(parseInt(x)+99).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(parseInt(x)+99).className == "player1"){
                                totalPlayer1++;
                        } 
                        
                        if (document.getElementById(parseInt(x)+99).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(parseInt(x)+99).className == "player1Tower"){
                            totalPlayer1 += 2;}
                        
                    //När alla andra rutor i en rad attackeras.
                    } else {
                           
                        if(document.getElementById(x-1).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(x-1).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(x-1).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(x-1).className == "player1Tower"){
                            totalPlayer1 += 2;}
                        
                        if(document.getElementById(parseInt(x)+1).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(parseInt(x)+1).className == "player1"){
                             totalPlayer1++;
                        } 
                        
                        if (document.getElementById(parseInt(x)+1).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(parseInt(x)+1).className == "player1Tower"){
                            totalPlayer1 += 2;}

                        if(document.getElementById(x-100).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(x-100).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(x-100).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(x-100).className == "player1Tower"){
                            totalPlayer1 += 2;}

                        if(document.getElementById(x-101).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(x-101).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(x-101).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(x-101).className == "player1Tower"){
                            totalPlayer1 += 2;}

                        if(document.getElementById(parseInt(x)+100).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(parseInt(x)+100).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(parseInt(x)+100).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(parseInt(x)+100).className == "player1Tower"){
                            totalPlayer1 += 2;}


                        if(document.getElementById(parseInt(x)+99).className == "player2"){
                            totalPlayer2++;
                        } else if (document.getElementById(parseInt(x)+99).className == "player1"){
                            totalPlayer1++;
                        } 
                        
                        if (document.getElementById(parseInt(x)+99).className == "player2Tower"){
                            totalPlayer2 += 2;
                        } else if (document.getElementById(parseInt(x)+99).className == "player1Tower"){
                            totalPlayer1 += 2;}
                        }
            }  

            //Räknar ut vad som händer efter attacken
            if ((totalPlayer1 > 0 && totalPlayer1 > totalPlayer2) && count==1) {
                e.target.className = "player1";
                count = 2;
                innerCount = 20;
                scorePlayer2--;
                scorePlayer1++;
    

            } else if ((totalPlayer2 > 0 && totalPlayer2 > totalPlayer1) && count==2){
                e.target.className = "player2";
                count = 1;
                innerCount = 10;
                scorePlayer2++;
                scorePlayer1--;
            
            }  else if((totalPlayer2 > 0 && totalPlayer2 == totalPlayer1) && e.target.className == "player2"){
                e.target.className = "conflictPlayer2";
                count = 2;
                innerCount = 20;
                scorePlayer2--;
               

            } else if((totalPlayer2 > 0 && totalPlayer2 == totalPlayer1) && e.target.className == "player1"){
                e.target.className = "conflictPlayer1";
                count = 1;
                innerCount = 10;
                scorePlayer1--;}

        }
        if(innerCount == 20){ 
            count = 2;
            downPlayer1 += 4;
            document.querySelector(".scorePlayer1").innerHTML ="Score " + scorePlayer1;
            document.querySelector(".clockPlayer1").innerHTML = "Time " + downPlayer1;
            document.querySelector(".scorePlayer2").innerHTML ="Score " + scorePlayer2;
            document.querySelector(".clockPlayer2").innerHTML = "Time " + downPlayer2;
            document.querySelector(".clockPlayer1").style.visibility = "hidden";
            document.querySelector(".scorePlayer1").style.visibility = "hidden";
            document.querySelector(".clockPlayer2").style.visibility = "visible";
            document.querySelector(".scorePlayer2").style.visibility = "visible";
            document.querySelector("#rules").style.backgroundColor = "rgb(248, 177, 25)";
            document.querySelector("#newGame").style.backgroundColor = "rgb(248, 177, 25)";
        
            } else if (innerCount == 10){
            count = 1;
            downPlayer2 += 4;
            document.querySelector(".scorePlayer1").innerHTML ="Score " + scorePlayer1;
            document.querySelector(".clockPlayer1").innerHTML = "Time " + downPlayer1;
            document.querySelector(".scorePlayer2").innerHTML ="Score " + scorePlayer2;
            document.querySelector(".clockPlayer2").innerHTML = "Time " + downPlayer2;
            document.querySelector(".clockPlayer2").style.visibility = "hidden";
            document.querySelector(".scorePlayer2").style.visibility = "hidden";
            document.querySelector(".clockPlayer1").style.visibility = "visible";
            document.querySelector(".scorePlayer1").style.visibility = "visible";
            document.querySelector("#rules").style.backgroundColor = "#4C7F54";
            document.querySelector("#newGame").style.backgroundColor = "#4C7F54";
            }

    }

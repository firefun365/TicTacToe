let vsPc = document.getElementById("vsPc");
let vsFriend = document.getElementById("vsFriend");
let h2 = document.getElementsByTagName("h2")[0];
let h2two = document.getElementsByTagName("h2")[1];
let inputPc = document.getElementsByTagName("input")[0];
let inputFriend1 = document.getElementsByTagName("input")[1];
let inputFriend2 = document.getElementsByTagName("input")[2];
let startGame = document.getElementById("startGame");
let mainDiv = document.getElementById("enterGame");
let menu = document.getElementById("menu"); //navBar
let close = document.getElementById("close");
let menuText = document.getElementsByClassName("menuText");
let men = document.getElementById("men");
let aTag = document.getElementsByTagName("h1")[0];
aTag.onclick = function () {window.location.reload();}
let footer = document.getElementsByTagName("footer")[0];
let backTimer = document.getElementsByClassName("backTimer");
let popUpTableSize = document.getElementById("popUpTableSize");
let tableSizeInput = document.getElementById("tableSizeInput");
let tableSizeButton = document.getElementById("tableSizeButton");
let table = document.getElementsByTagName("table")[0];
let saveTypeGame;
let friendTurn = 0;
let arr = [[],[],[]];
let reset = document.getElementById("reset");
let returnButton = document.getElementById("return");
let loadGame = document.getElementById("loadGame");
let checkDraw;
counterSteps = 0;

//menu

menu.onmouseover = function () {
    menu.classList.add("navFull");
    men.classList.remove("delete");
    close.classList.remove("delete");
    menuText[1].classList.remove("delete");
    menuText[2].classList.remove("delete");
    menuText[3].classList.remove("delete");
    menuText[4].classList.remove("delete");
}

menu.onmouseout = function () {
    menu.classList.remove("navFull");
    men.classList.add("delete");
    menuText[1].classList.add("delete");
    menuText[2].classList.add("delete");
    menuText[3].classList.add("delete");
    menuText[4].classList.add("delete");
}

close.onclick = function () {
    menu.classList.remove("navFull");
    men.classList.add("delete");
    menuText[1].classList.add("delete");
    menuText[2].classList.add("delete");
    menuText[3].classList.add("delete");
    menuText[4].classList.add("delete");
}

//enter game - step 1 (Vs PC or vs Friend)

vsPc.onclick = function () {
    vsPc.classList.add("moveToLeft");
    vsFriend.classList.add("moveToright");
    setInterval(function(){vsPc.classList.add("delete")}, 2000);
    h2.classList.add("delete");
    setInterval(function(){h2two.classList.remove("delete")}, 800);
    setInterval(function(){inputPc.classList.remove("delete")}, 800);
    setInterval(function(){startGame.classList.remove("delete")}, 800);
    saveTypeGame = "computer";
}

vsFriend.onclick = function () {
    vsPc.classList.add("moveToLeft");
    vsFriend.classList.add("moveToright");
    setInterval(function(){vsPc.classList.add("delete")}, 2000);
    setInterval(function(){vsFriend.classList.add("delete")}, 2000);
    h2.classList.add("delete");
    setInterval(function(){h2two.classList.remove("delete")}, 800);
    setInterval(function(){inputFriend1.classList.remove("delete")}, 800);
    setInterval(function(){inputFriend2.classList.remove("delete")}, 800);
    setInterval(function(){startGame.classList.remove("delete")}, 800);
    saveTypeGame = "friend";
}



//start a new game

startGame.onclick = function () {

    let counter = 3;
    if(inputPc.value.length>0 || (inputFriend1.value.length>0 && inputFriend2.value.length>0))
    {
        mainDiv.classList.add("enterGameOver");
        setInterval(function() {mainDiv.classList.add("delete");}, 2000) 
        setInterval(function() {mainDiv.classList.add("delete");}, 1500) 

        //timer-back-3...2...1...

        table.classList.remove("delete");

        
        //Table Size option in NavBar
        menuText[2].onclick = function () {
            popUpTableSize.classList.remove("delete");
            tableSizeButton.onclick = function () {
                popUpTableSize.classList.add("delete");
                let counter = 3;
                while(counter!=parseInt(tableSizeInput.value))
                {
                    let row = table.insertRow(0);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);

                    counter++;
                }

                for (let b = 0; b<table.rows.length; b++)
                {
                    for(let i = 0; i<parseInt(tableSizeInput.value)-3; i++)
                       {
                           table.rows[b].insertCell(i);
                       }
                }
            }
        }

        
        //VS friend Game Mode
        if(saveTypeGame=="friend")
        {
            document.getElementById("time").classList.remove("delete");
            let interval = setInterval(myTimer, 1000);
let sec = 0;
let min = 0;
let hr = 0;

function myTimer() {
  sec++;
  if (sec == 60) {
    min++;
    sec = 0;
  }

  if (min == 60) {
    min = 0;
    hr++;
  }
  document.getElementById("time").innerHTML = hr + ":" + min + ":" + sec;
}
          returnButton.classList.remove("delete");
          reset.classList.remove("delete");
          loadGame.classList.remove("delete");

            //Reset
            //table reset + arr reset
            reset.onclick = function () {
                hr=0;
                min=0;
                sec=0;
                let counterR = 1;
                while(counterR!=10)
                {
                    localStorage.removeItem("col"+counterR);
                    localStorage.removeItem("row"+counterR);
                    counterR++;
                }


             for (let r = 0; r<3; r++)
             {
               for(let c = 0; c < 3; c++)
                {
                  arr[c][r] = 0;
                  let cell = document.getElementsByTagName("tr")[r].getElementsByTagName("td")[c];
                  cell.classList.remove("circle");
                  cell.classList.remove("cross");
                }
             }
             counterSteps=0;

             
             
        } 

            footer.classList.add("delete");
            table.addEventListener("click", function (e1) {
                counterSteps++;
                localStorage["col"+counterSteps] = e1.target.cellIndex;                             //for Return and Save Mode
                localStorage["row"+counterSteps] = e1.target.parentElement.rowIndex;
                

                if (friendTurn%2 == 0)
                {
                    e1.target.classList.add("cross");
                    arr[parseInt(e1.target.cellIndex)][parseInt(e1.target.parentElement.rowIndex)] = "cross";
                    localStorage["state"+counterSteps] = "cross";
                }

                else {
                    e1.target.classList.add("circle");
                    arr[parseInt(e1.target.cellIndex)][parseInt(e1.target.parentElement.rowIndex)] = "circle";
                    localStorage["state"+counterSteps] = "circle";
                }
                
                //Winning
                for(let z = 0; z<3; z++)
                {
                    //collums winning
                    if((arr[z][0] =="cross" && arr[z][1] == "cross" && arr[z][2] == "cross") || (arr[z][0] =="circle" && arr[z][1] == "circle" && arr[z][2] == "circle"))
                    {
                        alert("The game is Over");
                        checkDraw = 0;
                        if (localStorage.getItem("minSteps") === null) {
                            localStorage.minSteps = counterSteps;
                        }
                        else {
                            if(counterSteps<parseInt(localStorage.getItem("minSteps")))
                            {
                                localStorage.minSteps=counterSteps;
                            }
                        }
                        counterSteps=0;
                        hr=0;
                min=0;
                sec=0;
                    }

                    //rows winning
                    if((arr[0][z] =="cross" && arr[1][z] == "cross" && arr[2][z] == "cross") || (arr[0][z] =="circle" && arr[1][z] == "circle" && arr[2][z] == "circle"))

                    {
                        alert("The game is Over")
                        checkDraw = 0;
                        if (localStorage.getItem("minSteps") === null) {
                            localStorage.minSteps = counterSteps;
                        }
                        else {
                            if(counterSteps<parseInt(localStorage.getItem("minSteps")))
                            {
                                localStorage.minSteps=counterSteps;
                            }
                        }
                        counterSteps=0;
                        hr=0;
                min=0;
                sec=0;
                    }

                    //slant winning
                    if((arr[0][0] == "cross" && arr[1][1] =="cross" && arr[2][2]=="cross") || (arr[0][0] == "circle" && arr[1][1] =="circle" && arr[2][2]=="circle"))
                    {
                        alert("The game is Over")
                        checkDraw = 0;
                        if (localStorage.getItem("minSteps") === null) {
                            localStorage.minSteps = counterSteps;
                        }
                        else {
                            if(counterSteps<parseInt(localStorage.getItem("minSteps")))
                            {
                                localStorage.minSteps=counterSteps;
                            }
                        }
                        counterSteps=0;
                        hr=0;
                min=0;
                sec=0;
                    }

                    if((arr[2][0] == "cross" && arr[1][1] =="cross" && arr[0][2]=="cross") || (arr[2][0] == "circle" && arr[1][1] =="circle" && arr[0][2]=="circle"))
                    {
                        alert("The game is Over");
                        checkDraw = 0;
                        if (localStorage.getItem("minSteps") === null) {
                            localStorage.minSteps = counterSteps;
                        }
                        else {
                            if(counterSteps<parseInt(localStorage.getItem("minSteps")))
                            {
                                localStorage.minSteps=counterSteps;
                            }
                        }
                        counterSteps=0;
                    }

                    if(counterSteps==9)
                    {
                        if(checkDraw!=0)
                        {
                            alert('draw');
                        }
                    }
                }
                
                friendTurn++;
            })
        }
    }

    else {
        document.getElementById("error").classList.remove("delete");
        inputPc.classList.add("redBorder");
        if(inputFriend1.value.length == 0 && inputFriend2.value.length == 0) {
            inputFriend1.classList.add("redBorder");
            inputFriend2.classList.add("redBorder");
        }

        if(inputFriend1.value.length == 0)
        {
            inputFriend1.classList.add("redBorder");
        }

        else {
            inputFriend2.classList.add("redBorder");
        }
    }
}

inputPc.onclick = function () {inputPc.classList.remove("redBorder");}
inputFriend1.onclick = function() {inputFriend1.classList.remove("redBorder"); inputFriend2.classList.remove("redBorder");}
inputFriend2.onclick = function() {inputFriend1.classList.remove("redBorder"); inputFriend2.classList.remove("redBorder");}

//Return Button
returnButton.onclick = function () {
    let colR = localStorage.getItem("col" + counterSteps);
    colR = parseInt(colR);
    let rowR = localStorage.getItem("row" + counterSteps);
    rowR = parseInt(rowR);
    arr[colR][rowR] = 0;
    let cellReturn = document.getElementsByTagName("tr")[rowR].getElementsByTagName("td")[colR];
    localStorage.removeItem("col" + counterSteps);
    localStorage.removeItem("row" + counterSteps);
    cellReturn.classList.remove("circle");
    cellReturn.classList.remove("cross");
    counterSteps--;
}

loadGame.onclick = function () {
    let cou = 1;
    while (cou!=10) 
    {
        let colL = localStorage.getItem("col" + cou);
        colL = parseInt(colL);
        let rowL = localStorage.getItem("row" + cou);
        rowL = parseInt(rowL);
        arr[colL][rowL] = localStorage.getItem("state"+cou);
        let cellLoad = document.getElementsByTagName("tr")[rowL].getElementsByTagName("td")[colL];
        if(localStorage.getItem("state"+cou)=="cross")
        {
            cellLoad.classList.add("cross");
        }
        else {
            cellLoad.classList.add("circle");
        }
        cou++;
    }
}

menuText[3].onclick = function () {
    alert("The game is saved");
}

menuText[1].onclick = function () {
    alert("The Best Result: " + localStorage.getItem("minSteps"));
}


let Gameboard = (function(){
    let gameboard=[];
    for(let i=0; i<9; i++){
        gameboard[i]=[""];
    };
    return gameboard;
})();

const gameSquares = (function(){
    let gamesquares=document.querySelectorAll('.game-square');
    return gamesquares;
})();

let isWon;
let isBoardFull;

function activateSquares(){
    gameSquares.forEach((square) => {square.addEventListener("click", playRound)});
}

function deactivateSquares(){
    gameSquares.forEach((square) => {square.removeEventListener("click", playRound)});
}

function playRound(event) {
    //console.log(this.target.getAttribute("data-index"));
    displayResults.textContent=`${currentPlayer.playerName}, make your selection by clicking on the board!`;
    let positionSelected=event.target.getAttribute("data-index");
    console.log(positionSelected);
    console.log(Gameboard);
    if(Gameboard[positionSelected]!=''){
        //console.log(currentGameboard[positionSelected]);
        alert("Pick an empty position!");
        alert(`${Gameboard[positionSelected]}`);
        //selectPosition(square,Gameboard);
    }
    else {
        Gameboard[positionSelected]=currentPlayer.playerMarker;
        renderGameboard(Gameboard);
        isWon=checkForWin(Gameboard);
        isBoardFull=checkBoardFull(Gameboard);
        if(isWon==true){
            deactivateSquares();
            //console.log(currentGameboard);
            displayResults.textContent=`${currentPlayer.playerName} has won! Marker used: ${currentPlayer.playerMarker}`;
            return;
        }
        if(isBoardFull==true){
            displayResults.textContent=`Board is full!`;    
            return;
        }
        else {
            let holdPlayer=currentPlayer;
            currentPlayer=notCurrentPlayer;
            notCurrentPlayer=holdPlayer;
        }
    }
};

const startButton = (function(){
    let startbutton=document.querySelector('.start-game-btn');
    return startbutton;
})();

const clearButton = (function(){
    let resetbutton=document.querySelector('.clear-game-btn');
    return resetbutton;
})();

const displayResults = (function(){
    let displayText=document.querySelector('.display-results');
    return displayText;
})();

startButton.addEventListener("click",startGame);
clearButton.addEventListener("click",clearGame);

function clearGame(){
    for(let i=0;i<9;i++){
        Gameboard[i]=[""];
    };
    renderGameboard(Gameboard);
    document.getElementById("playerOneName").value="";
    document.getElementById("playerTwoName").value="";
    displayResults.textContent=`Results will go here!`;
    console.log(Gameboard);
    return Gameboard;

};

function createPlayer(name,marker) {
    const playerName=name;
    const playerMarker=marker;
    return {playerName,playerMarker};
}

let currentPlayer;
let notCurrentPlayer;

function startGame() {
    activateSquares();
    let playerOneName=document.getElementById("playerOneName").value;
    console.log(playerOneName);
    let playerOne=createPlayer(playerOneName,"X");
    let playerTwoName=document.getElementById("playerTwoName").value;
    console.log(playerTwoName);
    let playerTwo=createPlayer(playerTwoName,"O");
    if((playerOneName=='')||(playerTwoName=='')){
        alert("Put in valid names!");
        return;
    }
    currentPlayer=playerOne;
    console.log(currentPlayer);
    notCurrentPlayer=playerTwo;
    isWon=false;
    isBoardFull=false;
    displayResults.textContent=`${currentPlayer.playerName}, make your selection by clicking on the board!`;
};

function renderGameboard(gameboard){
    const gameSquares=document.querySelectorAll('.game-square');
    //console.log(gameSquares);
    gameboard.forEach((square,index) => {
        gameSquares[index].textContent=gameboard[index];
    });
};

function checkForWin(gameboard) {
    let gameWon=false;
    if((gameboard[0]!='')&&(gameboard[0]==gameboard[1])&&(gameboard[1]==gameboard[2])){
        gameWon=true;
        console.log("first case");
    }
    if((gameboard[3]!='')&&(gameboard[3]==gameboard[4])&&(gameboard[4]==gameboard[5])){
        gameWon=true;
        console.log("second case");
    }
    if((gameboard[6]!='')&&(gameboard[6]==gameboard[7])&&(gameboard[7]==gameboard[8])){
        gameWon=true;
        console.log("third case");
    }
    if((gameboard[0]!='')&&(gameboard[0]==gameboard[3])&&(gameboard[3]==gameboard[6])){
        gameWon=true;
        console.log("4 case");
    }
    if((gameboard[1]!='')&&(gameboard[1]==gameboard[4])&&(gameboard[4]==gameboard[7])){
        gameWon=true;
        console.log("5 case");
    }
    if((gameboard[2]!='')&&(gameboard[2]==gameboard[5])&&(gameboard[5]==gameboard[8])){
        gameWon=true;
        console.log("6 case");
    }
    if((gameboard[0]!='')&&(gameboard[0]==gameboard[4])&&(gameboard[4]==gameboard[8])){
        gameWon=true;
        console.log("7 case");
    }
    if((gameboard[2]!='')&&(gameboard[2]==gameboard[4])&&(gameboard[4]==gameboard[6])){
        gameWon=true;
        console.log(gameboard[2]);
        console.log(gameboard[4]);
        console.log(gameboard[6]);
        console.log("8 case");
    }
    return gameWon;
};

function checkBoardFull(gameboard) {
    let boardFull=true;
    for (let i=0;i<9; i++){
        if(gameboard[i]==''){
            boardFull=false;
        }
    };
    return boardFull;
}
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

let positionSelected;

const startButton = (function(){
    let startbutton=document.querySelector('.start-game-btn');
    return startbutton;
})();

const clearButton = (function(){
    let resetbutton=document.querySelector('.clear-game-btn');
    return resetbutton;
})();


console.log(startButton);
console.log(clearButton);

startButton.addEventListener("click",playGame);
clearButton.addEventListener("click",clearGame);


function getPlayerInfo (){
    const playerOneName=document.getElementById("playerOneName").value;
    const playerTwoName=document.getElementById("playerTwoName").value;
    return {playerOneName,playerTwoName}; 
}


function clearGame(){
    for(let i=0;i<9;i++){
        Gameboard[i]=[""];
    };
    renderGameboard(Gameboard);
    document.getElementById("playerOneName").value="";
    document.getElementById("playerTwoName").value="";
    return Gameboard;
};

function selectPosition(square,Gameboard){
    positionSelected=square.dataset.index;
    if(Gameboard[positionSelected]!=''){
        alert("Pick and empty position!");
        selectPosition(square,Gameboard);
    }
    else {
        return positionSelected;
    }
};

function playRound(gameboard,currentPlayer,currentPosition){
    gameboard[currentPosition]=currentPlayer.playerMarker;
    renderGameboard(gameboard);
    console.log("round played!");
}

function createPlayer(name,marker) {
    const playerName=name;
    const playerMarker=marker;
    return {playerName,playerMarker};
}

const gameboardObject = (function(marker,place) {
    const gameMarker=marker;
    const gameboardSpot=place;
    return {gameMarker,gameboardSpot};
})();


function playGame() {
    const playerOneName=document.getElementById("playerOneName").value;
    const playerOne=createPlayer(playerOneName,"X");
    const playerTwoName=document.getElementById("playerTwoName").value;
    const playerTwo=createPlayer(playerTwoName,"O");
    if((playerOneName=='')||(playerTwoName=='')){
        alert("Put in valid names!");
        return;
    }
    console.log(playerOne);
    console.log(playerTwo);
    let currentGameboard=Gameboard;
    let currentPlayer=playerOne;
    let notCurrentPlayer=playerTwo;
    let isWon=false;
    let isBoardFull=false;
    console.log(isWon);
    gameSquares.forEach((square)=> {
        square.addEventListener("click", function clicked() {
                positionSelected=selectPosition(square,Gameboard);
                console.log(positionSelected);
                playRound(currentGameboard,currentPlayer,positionSelected);
                isWon=checkForWin(currentGameboard);
                isBoardFull=checkBoardFull(currentGameboard);
           if(isWon==true){
            console.log(currentGameboard);
                console.log(`${currentPlayer.playerName} has won! Marker used: ${currentPlayer.playerMarker}`);
                return;
            }
           if(isBoardFull==true){
                console.log(`Board is Full!`);
                return;
            }
            let holdPlayer=currentPlayer;
            currentPlayer=notCurrentPlayer;
            notCurrentPlayer=holdPlayer;
            console.log(currentGameboard);
            console.log(isBoardFull);
            console.log(`new current player is: ${currentPlayer.playerName} and new not current player is ${notCurrentPlayer.playerName}`);  
        });
    });
};      

function renderGameboard(gameboard){
    const gameSquares=document.querySelectorAll('.game-square');
    console.log(gameSquares);
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

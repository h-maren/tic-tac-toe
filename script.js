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

/*function selectPosition(gameSquares,Gameboard,currentPlayer){
    gameSquares.forEach((square)=> {
        square.addEventListener("click",()=> {
            positionSelected=square.dataset.index;
            console.log(positionSelected);
            if(Gameboard[positionSelected]!=''){
                alert("Pick an empty position!");
                selectPosition(gameSquares,Gameboard,currentPlayer);
            }
            else {
                console.log(positionSelected);
                playRound(Gameboard,currentPlayer,positionSelected);
            }
        });
    });
};*/

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
    const playerOne=createPlayer("Bob","X");
    const playerTwo=createPlayer("Bill","O");
    console.log(playerOne);
    console.log(playerTwo);
    let currentGameboard=Gameboard;
    let currentPlayer=playerOne;
    let notCurrentPlayer=playerTwo;
    let isWon=false;
    let isBoardFull=false;
    console.log(isWon);
    gameSquares.forEach((square)=> {
        square.addEventListener("click",()=>{
            positionSelected=selectPosition(square,Gameboard);
            console.log(positionSelected);
            playRound(currentGameboard,currentPlayer,positionSelected);
            let holdPlayer=currentPlayer;
            currentPlayer=notCurrentPlayer;
            notCurrentPlayer=holdPlayer;
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
            console.log(currentGameboard);
            console.log(isBoardFull);
            console.log(`new current player is: ${currentPlayer.playerName} and new not current player is ${notCurrentPlayer.playerName}`);  
         });
    });
};

/*
    if(isWon==true){
        console.log(currentGameboard);
        console.log(`${currentPlayer.playerName} has won! Marker used: ${currentPlayer.playerMarker}`);
        return;
    }
    if(isBoardFull==true){
        console.log(`Board is Full!`);
        return;
    }
    gameSquares.forEach((square)=> {
        square.addEventListener("click",()=>{
            positionSelected=selectPosition(square,Gameboard);
            console.log(positionSelected);
            playRound(currentGameboard,currentPlayer,positionSelected);
            let holdPlayer=currentPlayer;
            currentPlayer=notCurrentPlayer;
            nonCurrentPlayer=holdPlayer;
            console.log(`new current player is: ${currentPlayer.playerName} and new not current player is ${notCurrentPlayer.playerName}`);  
        });
    });
    */


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

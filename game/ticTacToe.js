//for the jquery, we said on load start working
$(document).ready(function () {
    //console for checking the connection
    console.log('connected');
    //decleration for variables and objects
    var body = document.querySelector('body');
    var game = document.querySelector('.game');
    var easyR = document.querySelector('#easy');
    var mediumR = document.querySelector('#medium');
    var hardR = document.querySelector('#hard');
    var button = document.querySelector('.button');
    var firstPlayer = document.querySelector('.firstPlayer')
    var firstPlayerScore = document.querySelector('.firstPlayerScore')
    var secondPlayer = document.querySelector('.secondPlayer')
    var secondPlayerScore = document.querySelector('.secondPlayerScore');
    var statusNow = document.querySelector('.statusNow');
    var players = {
        p1: {
            name: function () {
                var name1 = window.localStorage.getItem("player1Name");
                return name1;
            },
            type: "X",
            score: 0
        },
        p2: {
            name: function () {
                var name2 = window.localStorage.getItem("player2Name");
                return name2;
            },
            type: "O",
            score: 0,
        }
    }
    //writing the names in the pages along with the score
    firstPlayer.innerHTML = players.p1.name();
    secondPlayer.innerHTML = players.p2.name();
    firstPlayerScore.innerHTML = players.p1.score;
    secondPlayerScore.innerHTML = players.p2.score;
    var numOfCoulmns = 2;
    var widthGame = 32;
    var hightGame = 32;
    var newDiv;
    var newSubDiv;
    var createGame;
    var currentPlayer = players.p1.type;
    var $allDivs;
    var lengthW;
    var currentTrun = 0;
    var showMeWhatYouGot = document.querySelector('.showMeWhatAudio');
    var penAudio = document.querySelector('.pencilEffe');
    var x = players.p1.type;
    var o = players.p2.type;
    //array for possible wins
    var possibleWins = [
        [0, 1, 2],
        [1, 2, 3],
        [2, 3, 4],
        [5, 6, 7],
        [6, 7, 8],
        [7, 8, 9],
        [10, 11, 12],
        [11, 12, 13],
        [12, 13, 14],
        [15, 16, 17],
        [16, 17, 18],
        [17, 18, 19],
        [20, 21, 22],
        [21, 22, 23],
        [22, 23, 24],
        [0, 5, 10],
        [5, 10, 15],
        [10, 15, 20],
        [1, 6, 11],
        [6, 11, 16],
        [11, 16, 21],
        [2, 7, 12],
        [7, 12, 17],
        [12, 17, 22],
        [3, 8, 13],
        [8, 13, 18],
        [13, 18, 23],
        [4, 9, 14],
        [9, 14, 19],
        [14, 19, 24],
        [0, 6, 12],
        [6, 12, 18],
        [12, 18, 24],
        [5, 11, 17],
        [11, 17, 23],
        [10, 16, 22],
        [1, 7, 13],
        [7, 13, 19],
        [2, 13, 14],
        [4, 8, 12],
        [8, 12, 16],
        [12, 16, 20],
        [9, 13, 17],
        [13, 17, 21],
        [14, 18, 22],
        [3, 7, 11],
        [7, 11, 15],
        [2, 6, 10],
        [2, 8, 14]
    ]
//function for ShowmeWhatYouGot audio before start the game
    function playOtherAudio() {
        showMeWhatYouGot.play();
    }
//function for the pen audio when the users write X or O
    function playPenAudio() {
        penAudio.play();
    }
//event listner to start the game
    button.addEventListener('click', difficualtyChoice);
//functio to see either the user chooses 3X3, 4X4, or 5X5
    function difficualtyChoice() {
        playOtherAudio();
        if (easyR.checked == true) {
            numOfCoulmns = easyR.value;
            lengthW = 3;
            widthGame = 32;
            hightGame = 32;
            gameStructure();

        } else if (mediumR.checked == true) {
            numOfCoulmns = mediumR.value;
            lengthW = 4;
            widthGame = 23;
            hightGame = 23;
            gameStructure();

        } else if (hardR.checked == true) {
            numOfCoulmns = hardR.value;
            lengthW = 5;
            widthGame = 18;
            hightGame = 18;
            gameStructure();
        } else {
            gameStructure();
        }

        afterstructure();

    }
//function to draw the structure for the TicTacTie game
    function gameStructure() {
        game = document.querySelector('.game');
        body.removeChild(game);
        //console.log("hello")
        createGame = document.createElement('div');
        createGame.className = 'game';
        for (let i = 0; i <= numOfCoulmns; i++) {
            newDiv = document.createElement('div');
            newDiv.className = `raw${i + 1}`;
            newDiv.style.width = '100%';
            newDiv.style.height = `${hightGame}%`;
            newDiv.style.display = 'block';
            newDiv.style.textAlign = 'center';



            for (let j = 0; j <= numOfCoulmns; j++) {

                newSubDiv = document.createElement('div');
                newSubDiv.className = `subDiv`;
                newSubDiv.id = `${i}${j}`;

                if (i == numOfCoulmns) {
                    if (j == numOfCoulmns) {

                        newSubDiv.style.width = `${widthGame}%`;
                        newSubDiv.style.height = `${hightGame}vh`;
                        newSubDiv.style.display = 'inline-block';

                    } else {

                        newSubDiv.style.width = `${widthGame}%`;
                        newSubDiv.style.height = `${hightGame}vh`;
                        newSubDiv.style.borderRight = '10px solid #0097a7';
                        newSubDiv.style.display = 'inline-block';
                    }

                } else {

                    if (j == numOfCoulmns) {

                        newSubDiv.style.width = `${widthGame}%`;
                        newSubDiv.style.height = `${hightGame}vh`;
                        newSubDiv.style.borderBottom = '10px solid #0097a7';
                        newSubDiv.style.display = 'inline-block';

                    } else {
                        newSubDiv.style.width = `${widthGame}%`;
                        newSubDiv.style.height = `${hightGame}vh`;
                        newSubDiv.style.borderRight = '10px solid #0097a7';
                        newSubDiv.style.borderBottom = '10px solid #0097a7';
                        newSubDiv.style.display = 'inline-block';
                    }

                }
                newDiv.appendChild(newSubDiv);

            }
            createGame.appendChild(newDiv);
        }
        body.appendChild(createGame);
        statusNow.innerHTML = `${players.p1.name()} which's ${players.p1.type} is playing now`;

    }
//function to make the game works by enabling the click for the posible places and editing the status
    function afterstructure() {
        $allDivs = $('.subDiv');
        currentTrun = 0;
        $allDivs.on("click", function () {

            if (currentPlayer == players.p1.type) {
                statusNow.innerHTML = `${players.p2.name()} which's ${players.p2.type} is playing now`;
            } else {
                statusNow.innerHTML = `${players.p1.name()} which's ${players.p1.type} is playing now`;
            }
            playPenAudio();
// call the function Play with specific Id to draw the shape either X or O
            play(this.id);

        })
    }
//Function play for drawing XO, adding values to a specific the same place that user draws
    function play(id) {

        var $local = $(`#${id}`);


        if (currentPlayer == players.p1.type) {
            $local.addClass('xPlayer');
            $local.attr("value", x);
            currentPlayer = players.p2.type;

        } else {
            $local.addClass('oPlayer');
            $local.attr("value", o);
            currentPlayer = players.p1.type;
        }
//setting off the place that been clicked to make the game functional
        $local.off('click');
//adding 1 to the variable for future calculation
        currentTrun++;
//calling another function 
        checkWin(id)

    }


//function to see the user if he wins or not
    function checkWin(id) {
//decleration variables
        var allDivs = document.querySelectorAll('.subDiv');
        var isfull = `${lengthW} X ${lengthW}`;
        var isWin = [];
//jQuery to calls all divs that has the same class name
        $allDivs = $('.subDiv');
//for loop to assign every index a value inside the array
        for (var i = 0; i < allDivs.length; i++) {
            if (allDivs[i].getAttribute('value') != null && allDivs[i].getAttribute('value') != undefined && allDivs[i].getAttribute('value') != 'empty') {
                isWin[i] = allDivs[i].getAttribute('value');

            }
        }
//if condition to see if the game mode 3X3, 4X4, or 5X5
//This one for 3X3
        if (numOfCoulmns == 2) {

//the simple-long way to check if the user win or not
            if (isWin[0] == isWin[1] && isWin[1] == isWin[2] && isWin[0] != null) {
//call aertForWin function
                alertForWin(0);

            } else if (isWin[0] == isWin[3] && isWin[3] == isWin[6] && isWin[0] != null) {

                alertForWin(0);

            } else if (isWin[0] == isWin[4] && isWin[4] == isWin[8] && isWin[0] != null) {

                alertForWin(0);

            } else if (isWin[1] == isWin[4] && isWin[4] == isWin[7] && isWin[1] != null) {

                alertForWin(1);

            } else if (isWin[2] == isWin[5] && isWin[5] == isWin[8] && isWin[2] != null) {

                alertForWin(2);

            } else if (isWin[3] == isWin[4] && isWin[4] == isWin[5] && isWin[3] != null) {

                alertForWin(3);

            } else if (isWin[6] == isWin[7] && isWin[7] == isWin[8] && isWin[6] != null) {

                alertForWin(6);

            } else if (isWin[2] == isWin[4] && isWin[4] == isWin[6] && isWin[2] != null) {

                alertForWin(2);

            } else if (currentTrun == 9) {

                alert(`It\'s a draw .. ${isfull} and a draw, what a shame :(`);
            }
//this won for 4X4
        } else if (numOfCoulmns == 3) {
//same way to check if the user wins or not
            if (isWin[0] == isWin[1] && isWin[1] == isWin[2] && isWin[2] == isWin[3] && isWin[0] != null) {
//calling the alertForWin function
                alertForWin(0);
            } else if (isWin[0] == isWin[4] && isWin[4] == isWin[8] && isWin[8] == isWin[12] && isWin[0] != null) {

                alertForWin(0);
            } else if (isWin[0] == isWin[5] && isWin[5] == isWin[10] && isWin[10] == isWin[15] && isWin[0] != null) {

                alertForWin(0);
            } else if (isWin[1] == isWin[5] && isWin[5] == isWin[9] && isWin[9] == isWin[13] && isWin[1] != null) {

                alertForWin(1);
            } else if (isWin[2] == isWin[6] && isWin[6] == isWin[10] && isWin[10] == isWin[14] && isWin[2] != null) {

                alertForWin(2);
            } else if (isWin[3] == isWin[7] && isWin[7] == isWin[11] && isWin[11] == isWin[15] && isWin[3] != null) {

                alertForWin(3);
            } else if (isWin[4] == isWin[5] && isWin[5] == isWin[6] && isWin[6] == isWin[7] && isWin[4] != null) {

                alertForWin(4);
            } else if (isWin[8] == isWin[9] && isWin[9] == isWin[10] && isWin[10] == isWin[11] && isWin[8] != null) {

                alertForWin(8);
            } else if (isWin[12] == isWin[13] && isWin[13] == isWin[14] && isWin[14] == isWin[15] && isWin[12] != null) {

                alertForWin(1);
            } else if (isWin[3] == isWin[6] && isWin[6] == isWin[9] && isWin[9] == isWin[12] && isWin[3] != null) {

                alertForWin(3);
            } else if (currentTrun == 16) {

                alert(`It\'s a draw .. ${isfull} and a draw, what a shame :(`);
            }
//This one for 5X5
        } else if (numOfCoulmns == 4) {
//Decleration
            var firstIndex = 0;
            var secondIndex = 1;
            var thirdIndex = 2;
//for loop to check if the user wins or not. This one is another way to check it
            for (var i = 0; i < possibleWins.length; i++) {
//if condition to see if the user wins by checking the possibleWin array
                if (isWin[possibleWins[i][firstIndex]] === isWin[possibleWins[i][secondIndex]] && isWin[possibleWins[i][firstIndex]] === isWin[possibleWins[i][thirdIndex]] && isWin[possibleWins[i][firstIndex]] != undefined) {
//if condition to see which player has won to add their score and edit the status                  
                    if (isWin[possibleWins[i][firstIndex]] == players.p1.type) {
                        players.p1.score += 1;
                        firstPlayerScore.innerHTML = players.p1.score;
                        statusNow.innerHTML = `${players.p1.name()} is the WINNER, hit'em hard ${players.p1.name()}!!`;
                    } else {
                        players.p2.score += 1;
                        secondPlayerScore.innerHTML = players.p2.score;
                        statusNow.innerHTML = `${players.p2.name()} is the Winner, beat'm quick ${players.p2.name()}`;
                    }
                     $allDivs.off('click');
                    return alertFourByFour(i, firstIndex);
                } else if (currentTrun == 25) {
                     $allDivs.off('click');
                    return alert(`It\'s a draw .. ${isfull} and a draw, what a shame :(`);
                }
            }
//function for alert 5X5 mode to see which user has won
            function alertFourByFour(index, firstIndex){
                setTimeout(function(){
                alert(`Player ${isWin[possibleWins[index][firstIndex]]} is the winner, hooooorrrraaaayyyy!!`);
            }, 500)
            }
        }
//function to alert the player and chaninging the score along with editing the status
        function alertForWin(index) {
           setTimeout(function(){
            alert(`player ${isWin[index]} is the winner horraaaaaay!!`)
           }, 500);
           if (isWin[index] == players.p1.type) {
            players.p1.score += 1;
            firstPlayerScore.innerHTML = players.p1.score;
            statusNow.innerHTML = `${players.p1.name()} is the WINNER, hit'em hard ${players.p1.name()}!!`;
        } else {
            players.p2.score += 1;
            secondPlayerScore.innerHTML = players.p2.score;
            statusNow.innerHTML = `${players.p2.name()} is the Winner, beat'em quick ${players.p2.name()}`;
        }
//make the game stop by set the clicks off 
        $allDivs.off('click'); 
        }
    }
})

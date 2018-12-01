//jQuery event listner for load page
$(document).ready(function () {
//decleration variables
    var $button = $('.indexButton');
    var player1 = document.querySelector('.player1');
    var player2 = document.querySelector('.player2');
    var wowAudio = document.querySelector('.wowAudio');
//function to play the toyStory audio
    function playAudio (){
        
        wowAudio.play();

    }
//jQuery method to save values in localstorage and going to TicTacToe page
    $button.click(function () {
        window.localStorage.setItem("player1Name", player1.value)
        window.localStorage.setItem("player2Name", player2.value)
        playAudio();

        setTimeout(function () {
            window.location.href = "../game/ticTacToe.html";
        }, 6000)
    })
})
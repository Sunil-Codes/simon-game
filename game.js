var started = false;
var level = 0;
var gamePattern = []
var userClickedPattern = []
var buttonColours = ['red', 'blue', 'green', 'yellow']



$(document).keydown(function () {
    if (!started) {
        $('#level-title').text('level ' + level)
        nextSequence()
        started = true;
    }
})


$('#startgame').click(function () {
    if (!started) {
        $('#level-title').text('level ' + level)
        nextSequence()
        started = true;
    }
})











function checkAnswer(currentLevel) {
    var userClickedPatternLength = userClickedPattern.length - 1
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => { nextSequence() }, 1000)
        }
    } else {
        startOver()
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        $('body').addClass('game-over')
        $('h1').text('Game Over, Press any key to start')
        playSound('wrong');

    }


}










function nextSequence() {
    userClickedPattern = []
    level++
    $('#level-title').text('level ' + level)
    var random = Math.floor(Math.random() * 4)
    var randomchosenColour = buttonColours[random]
    gamePattern.push(randomchosenColour)

    $('#' + randomchosenColour).fadeOut(100).fadeIn(100);
    playSound(randomchosenColour)
}



function playSound(sname) {

    var aud4 = new Audio("sounds/" + sname + '.mp3')
    aud4.play()

}

function animatePress() {

    $('.pbtn').click(function () {
        var btn = this.id
        $('#' + btn).addClass('pressed');
        setTimeout(() => {
            $('#' + btn).removeClass('pressed');
        }, 100);
    })
}




$(".pbtn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress()

    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)

});



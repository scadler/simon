const status = {
    level: 1,
    sequence: [],
    input: [],
    entering: false,
    pause: false,
    correctInput: true,
}
  var sounds = {
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    yellow: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  };
function createPattern(level){
    $(".statusLights").css("opacity", "0.3");
    status.entering = false;
    status.sequence = [];
    status.input = [];
    status.correctInput = true
    var i = 0
    while( i <= level){
        var order = Math.floor(Math.random()*4)
        let color = (order === 0) ? "green" : (order === 1) ? "red" : (order === 2) ? "yellow" : "blue"
        status.sequence.push(color)
        i++
    }
    console.log(status.sequence)
    status.level += 1
    showPattern(status.sequence[0], 0)
}
function showPattern(color, i){
    $("#"+status.sequence[i-1]).css("opacity","0.6")
    if(i <status.sequence.length){
        i++
        $("#"+color).css("opacity","1")
        sounds[color].play();
        setTimeout(clearTiles, 600, status.sequence[i], i)
    }
    else if(i === status.sequence.length){
        status.entering = true;
        $("#inputReady").css("opacity", "1");
    }
}
function clearTiles(nextColor, index){
    $(".tile").css("opacity","0.6")
    if(status.entering === false){
        setTimeout(showPattern, 300, nextColor, index)
    }
    else{
            status.pause = false;
            if(status.input.length < status.sequence.length){
                $("#inputReady").css("opacity", "1");
            }
    }
}
function checkInput(){
    if(status.input.length === status.sequence.length){
        var i = 0;
        while(i < status.input.length){
            if(status.input[i] !== status.sequence[i]){
                status.correctInput = false
            }
            i++
        }
        if(status.correctInput === true){
            $("#correctInput").css("opacity", "1");
            setTimeout(createPattern, 1000, status.level)
        }
        else{
            status.pause = true
            $("#incorrectInput").css("opacity", "1");
            $("#inputReady").css("opacity","0.3");
            $("#start").css("opacity","0.3")
        }
    }
}
$("#start").click(function(){
    $("#start").css("opacity","1")
    createPattern(status.level);
});
$(".tile").click(function(){
    var id = $(this).attr('id')
    if(status.entering === true && status.pause === false){
        $("#"+id).css("opacity","1")
        status.input.push(id)
        sounds[id].play();
        status.pause = true
        $("#inputReady").css("opacity", "0.3");
        setTimeout(clearTiles, 600)
        checkInput()
    }
});
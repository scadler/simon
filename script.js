const status = {
    level: 2,
    sequence: [],
    input: [],
    entering: false,
    pause: false,
    correctInput: true,
}
function createPattern(level){
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
        setTimeout(clearTiles, 600, status.sequence[i], i)
    }
    else if(i === status.sequence.length){
        status.entering = true;
    }
}
function clearTiles(nextColor, index){
    $(".tile").css("opacity","0.6")
    if(status.entering === false){
        setTimeout(showPattern, 300, nextColor, index)
    }
    else{
        status.pause = true
        setTimeout(function(){status.pause = false}, 300)
    }
}
function checkInput(){
    if(status.input.length === status.sequence.length){
        var i = 0;
        while(i < status.input.length){
            if(status.input[i] !== status.sequence[i]){
                status.correctInput = false
            }
            console.log(i)
            console.log(status.input[i])
            i++
        }
        if(status.correctInput === true){
            console.log("Correct Input")
            setTimeout(createPattern, 1000, status.level)
        }
    }
}
$("#start").click(function(){
    createPattern(status.level);
});
$(".tile").click(function(){
    var id = $(this).attr('id')
    if(status.entering === true && status.pause === false){
        $("#"+id).css("opacity","1")
        status.input.push(id)
        status.pause = true
        setTimeout(clearTiles, 600)
        checkInput()
    }
});
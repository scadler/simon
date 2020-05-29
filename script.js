const status = {
    level: 2,
    sequence: [],
}
function createPattern(level){
    status.sequence = []
    var i = 0
    while( i <= level){
        var order = Math.floor(Math.random()*4)
        let color = (order === 0) ? "green" : (order === 1) ? "red" : (order === 2) ? "yellow" : "blue"
        status.sequence.push(color)
        i++
    }
    console.log(status.sequence)
    status.level += 1
    // showPattern(status.sequence[0], 0)
}
function showPattern(color, i){
    $("#"+color).css("opacity","0.6")
    while(i <status.sequence.length){
        i++
        $("#"+color).css("opacity","1")
        setTimeout(showPattern, 333, status.sequence[i], i)
    }
}
$("#start").click(function(){
    createPattern(status.level);
});
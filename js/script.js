function drawScroecard() // I'm writing 18 holes in one function
{
    if (localStorage.getItem('golf_app_score')){
        var  score =  JSON.parse(localStorage.getItem('golf_app_score'));
    }
    else{
        var  score = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

    for (let i = 0; i < 18; i++) {
        var hole = 
            `<div class="hole_container col-12 mt-2">
            <div class="row">
            <div class="hole_number col-6">${i + 1}</div>
            <div class="hole_score col-6" id="hole_${i + 1}"> ${score[i]} </div>
            <div class="row">
            </div>` ;
        (i < 9) ?  $('#first_column').append(hole) :  $('#second_column').append(hole);;
    }
} 

function resetGame(){
    localStorage.removeItem('golf_app_score');
    $('#total_score').text('0');
    $('#first_column').html('');
    $('#second_column').html('');
    $('#current-hole').html('1');
    $('#current-hole-score').html('0');
    drawScroecard();
    $('#hole_1').addClass("selected-hole");
}

function totalScore()
{
    var score = 0;
    var current_game = [];
    for (let i = 1; i < 19; i++) {
       score = score + parseInt($(`#hole_${i}`).text()); // add up all 18 holes
       current_game.push(parseInt($(`#hole_${i}`).text()));
    }
    $(`#total_score`).html(score);
    localStorage.setItem('golf_app_score', JSON.stringify(current_game));
}

function updateScore(hole_number, button_command)
{
    var current_score = parseInt($(`#hole_${hole_number}`).text()); // get current score of the relative hole
   // var button_command = $(this).attr('date-button-type'); // what button was pressed [-] or [+]
    if(button_command == 'below-par'){ // if [-]
        current_score--; // deduct 1 from current score
    }
    else{
        current_score++; // add 1 to score
    }
    $(`#hole_${hole_number}`).text(current_score); // set score back to relevant hole
    totalScore();
}

function drawScoreControler()
{
    var score_controler = 
    `<button id="last-hole"> < </button>
        <span id="current-hole"> 1 </span> 
        <button id="next-hole"> > </button>
        <span id="current-hole-score">  </span> 
        <button id="decrease"> - </button>
        <button id="increase"> + </button>`;

    $('#score_controler').html(score_controler);
}

function scoreCardIinit()
{
    drawScoreControler();
    drawScroecard();
    totalScore();
    $('#hole_1').addClass("selected-hole");
    $('#current-hole-score').text($(`#hole_1`).text());
}

scoreCardIinit();


$('.btn_score').on('click', function() {
    updateScore($(this).attr('data-hole'), $(this).attr('date-button-type'));
});

$('.btn_reset').on('click', function() {
    resetGame();
});

$('#decrease').on('click', function() {
    updateScore( parseInt($('#current-hole').text()), 'below-par');
    $('#current-hole-score').text($(`#hole_${parseInt($('#current-hole').text())}`).text());
});

$('#increase').on('click', function() {
    updateScore(parseInt($('#current-hole').text()), 'above-par');
    $('#current-hole-score').text($(`#hole_${parseInt($('#current-hole').text())}`).text());
});

$('#last-hole').on('click', function() {
    var current_hole = parseInt($('#current-hole').text());
    if(current_hole > 1 ) current_hole--; 
    $('#current-hole').text(current_hole);
    $('#current-hole-score').text($(`#hole_${parseInt($('#current-hole').text())}`).text());
    $(`#hole_${current_hole}`).addClass("selected-hole");
    $(`#hole_${current_hole+1}`).removeClass("selected-hole");
});

$('#next-hole').on('click', function() {
    var current_hole = parseInt($('#current-hole').text());
    if(current_hole < 18) current_hole++; 
    $('#current-hole').text(current_hole);
    $('#current-hole-score').text($(`#hole_${parseInt($('#current-hole').text())}`).text());
    $(`#hole_${current_hole}`).addClass("selected-hole");
    $(`#hole_${current_hole-1}`).removeClass("selected-hole");
});

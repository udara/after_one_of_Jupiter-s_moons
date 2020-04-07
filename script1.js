
$(document).ready(function(){
r = 0
    localscore();
    total();
    $('.startbtn').on('click',function(){
        reset();
        nexthole(0);
    })
    $('body').on('click','.nxtbtn',function(){
        
        var q = $(this).siblings('.holen').text();
        console.log(q);
        var t = $(this).siblings('.score').text();
        if(q==18){alert('Game Over');
            endhole(q,t);
            $(this).prop('disabled', true)
            $(this).removeClass('bg-blue-500');
            $(this).addClass('bg-blue-200');
            $(this).siblings('.plsbtn').prop('disabled',true);
            $(this).siblings('.plsbtn').addClass('bg-green-200').removeClass('bg-green-500');
            $(this).siblings('.msbtn').prop('disabled',true);
            $(this).siblings('.msbtn').addClass('bg-red-200').removeClass('bg-red-500');
          }else{
            console.log(t)
            nexthole(parseInt(q));
            endhole(q,t);
            $(this).prop('disabled', true)
            $(this).removeClass('bg-blue-500');
            $(this).addClass('bg-blue-200');
            $(this).siblings('.plsbtn').prop('disabled',true);
            $(this).siblings('.plsbtn').addClass('bg-green-200').removeClass('bg-green-500');
            $(this).siblings('.msbtn').prop('disabled',true);
            $(this).siblings('.msbtn').addClass('bg-red-200').removeClass('bg-red-500');
            //$(this).parent().addClass('hidden')
            

        }
        

    
    })
    $('body').on('click','.plsbtn',function(){
        var r = parseInt($(this).prev().text())
        r++;
        $(this).prev().text(r);
        total();
    })
    $('body').on('click','.msbtn',function(){
        var s = parseInt($(this).next().text())
        s--;
        $(this).next().text(s);
        total();
    })

})


var scorecard = [
    {hole: "", total: ""}
];

var usersc = JSON.parse(localStorage.getItem("userscore")) || [];


function nexthole(i){
    var btnclass = 'container w-1/6 text-center text-white font-bold py-2 px-2 rounded';
    var entryrow = $('<div class="flex mb-2"'+ "id="+i+">");
    var hole = $('<div class="container text-center w-1/6 holen">').text(i+1);
    var minusbtn = $('<button class="bg-red-500 msbtn '+btnclass+'">-</button>');
    var score = $('<div class="container w-1/6 text-center bg-grey-500 score" data='+(i)+'>').text(0);
    var plusbtn = $('<button class="bg-green-500 plsbtn '+btnclass+'">+</button>');
    //var total = $('<div class="container w-1/6 text-center bg-grey-500">').text('total');
    var nxtbtn = $('<button class="bg-blue-500 mx-auto lg:mx-2 nxtbtn '+btnclass+'">Next</button>');


    $('#start').append(entryrow);
    entryrow.append(hole);
    entryrow.append(minusbtn);
    entryrow.append(score);
    entryrow.append(plusbtn);
    entryrow.append(total);
    entryrow.append(nxtbtn);
}


function endhole(holenum,score){

    const holescore = {
        hlnum: holenum,
        hlscore: score
    }
    var pos = usersc.map(function(e) { return e.hlnum; }).indexOf(holenum);
    console.log(pos);
    if(pos==-1){usersc.push(holescore)};
    
    console.log(usersc);
    localStorage.setItem("userscore",JSON.stringify(usersc));
}

function localscore(){
    var btnclass = 'container w-1/6 text-center text-white font-bold py-2 px-4 rounded';
    for(l=0;l<usersc.length;l++){
        var entryrow = $('<div class="flex mb-2"'+ "id="+l+">");
        var hole = $('<div class="container text-center w-1/6 holen">').text(usersc[l].hlnum);
        var minusbtn = $('<button class="bg-red-200 msbtn '+btnclass+'" disabled>-</button>');
        var score = $('<div class="container w-1/6 text-center bg-grey-500 score" data='+(l)+'>').text(usersc[l].hlscore);
        var plusbtn = $('<button class="bg-green-200 plsbtn '+btnclass+'" disabled>+</button>');
        //var total = $('<div class="container w-1/6 text-center bg-grey-500">').text('total');
        var nxtbtn = $('<button class="bg-blue-200 mx-auto lg:mx-2 nxtbtn '+btnclass+'" disabled>Next</button>');
        $('#start').append(entryrow);
        entryrow.append(hole);
        entryrow.append(minusbtn);
        entryrow.append(score);
        entryrow.append(plusbtn);
        entryrow.append(total);
        entryrow.append(nxtbtn);

    };

    $('#start .flex .nxtbtn').last().removeAttr('disabled');
    $('#start .flex .nxtbtn').last().removeClass('bg-blue-200');
    $('#start .flex .nxtbtn').last().addClass('bg-blue-500');

}

function total(){
    var sum = 0;
$('.score').each(function() {
  sum += +$(this).text()||0;
});
$('#htotal').text(sum)
}

function reset(){
    localStorage.clear("userscore");
    usersc=[];
    $('#htotal').text(0);
    $('#start').html("");
}
function initMap(latt, lon) {
  // The location of Uluru
  var location = {lat: latt, lng: lon};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 17, center: location, mapTypeId: 'satellite'});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: location, map: map});
}
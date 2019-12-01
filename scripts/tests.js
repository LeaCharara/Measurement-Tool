if(localStorage.length != 0)
var iID = [localStorage.length];


$("#tests").on('click','#play', function(){
    var elems = $(this).parent();
    var bar = $(elems).find("#barDiv").children()[0];
    var perc = $(elems).find("#prog");
    var width = parseInt($(perc).text().slice(0,-1));
    var testID = parseInt($(elems).parent().attr('id').split('-')[1]);
    $(this).attr("disabled", true);
    $(elems).find("#pause").attr("disabled", false);
    $(elems).find("#stop").attr("disabled", false);
    $(bar).removeClass("loadbar paused stopped").addClass("started");

    iID[testID] = setInterval(prog, 100);
    function prog() {
    if (width >= 100) {
      clearInterval(iID[testID]);
      $(elems).find("#pause").attr("disabled", true);
      $(elems).find("#stop").attr("disabled", true);
    } else {
      width++; 
      $(bar).css('width', width + '%'); 
      $(perc).text(width * 1  + '%');
    }}

});

$("#tests").on('click','#pause', function(){
    var elems = $(this).parent();
    var bar = $(elems).find("#barDiv").children()[0];
    var testID = parseInt($(elems).parent().attr('id').split('-')[1]);
    $(this).attr("disabled", true);
    $(elems).find("#play").attr("disabled", false);
    $(elems).find("#stop").attr("disabled", false);
    $(bar).removeClass("loadbar started stopped").addClass("paused");

    clearInterval(iID[testID]);

});

$("#tests").on('click','#stop', function(){
    var elems = $(this).parent();
    var bar = $(elems).find("#barDiv").children()[0];
    var testID = parseInt($(elems).parent().attr('id').split('-')[1]);
    var perc = $(elems).find("#prog");
    $(this).attr("disabled", true);
    $(elems).find("#play").attr("disabled", true);
    $(elems).find("#pause").attr("disabled", true);
    $(bar).removeClass("loadbar started paused").addClass("stopped");

    clearInterval(iID[testID]);
    setTimeout(function(){
    $(bar).fadeOut();
    $(bar).css('width', '0%'); 
    $(perc).text('0%'); 
    $(bar).removeClass("stopped started paused").addClass("loadbar");
    $(bar).fadeIn();
    $(elems).find("#play").attr("disabled", false);
    }, 1500);

});


$(window).on("load",function(){
    $("#no_tests").hide();
    $("#tests").hide();
    $("#newTest").hide();
    $.ajax({
        url: "http://127.0.0.1:8000/tests/gettests/",
        dataType: "json",
        success: function( response ) {
            $("#loading").hide();
            if(response.length == 0){
                console.log(response.length)
                $("#no_tests").show();
            }else{
                $("#tests").show();
                $("#newTest").show();
                for(i = 0;i < response.length;i++){
                    
                    var test = response[i];
                    $("#tests").append('<div class ="test" id="test-'+test.id+'"><p>'+test.name+'</p><div class="inner"><div class="loadbar w3-round-xlarge" id="barDiv" style="width: 70%"><div id="bar" class="loadbar w3-round-xlarge" style="width:0%;height: 20px"></div></div>&emsp;<p id="prog">0%</p>&emsp;<button type="button" id="play" class="button" onclick="StartTest('+test.id+')"><i class="fa fa-play" style="font-size:17px;text-shadow:5px 4px 6px #000000;"></i></button><button type="button" id="pause" class="button" onclick="PauseTest('+test.id+')" disabled><i class="fa fa-pause" style="font-size:17px;text-shadow:5px 4px 6px #000000;"></i></button><button type="button" id="stop" class="button" onclick="StopTest('+test.id+')" enabled><i class="fa fa-stop" style="font-size:17px;text-shadow:5px 4px 6px #000000;"></i></button>&emsp;&emsp;<a id="edit" href="Edit_Test_Page.html?var='+test.id+'"><i class="fa fa-edit" style="font-size:20px;text-shadow:5px 4px 6px #000000;"></i></a><i id="view" class="fa fa-eye" style="font-size:20px;text-shadow:5px 4px 6px #000000;"></i></div>');
                }
            }
            $(".tests").mCustomScrollbar({
                axis:"y",
                theme: "minimal",
                setHeight: "20%"
            });
        },        
        error:function(){
        $("#no_tests").show();
        $("#loading").hide();
    }
        
    });
    
    
    
});

//I am keeping the localhost for you to test when done change it back to measurementtoolbackend

function StartTest(id){
    done = 0;
    //if start after being paused
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://127.0.0.1:8000/tests/continuetest/",
        data : JSON.stringify({"id" : id}),
        contentType: "application/json; charset=utf-8",
        success: function() {
            
        }
    })

    //if new start
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://127.0.0.1:8000/tests/begintest/",
        data : JSON.stringify({"id" : id}),
        contentType: "application/json; charset=utf-8",
        success: function() {
            
        }
    })
    
    // while(done != 100){
    //     done = UpdateTest(id);
    //     console.log(done)
    // }
    
 }

function PauseTest(id) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://127.0.0.1:8000/tests/abletorun/",
        data : JSON.stringify({"id" : id}),
        contentType: "application/json; charset=utf-8",
        success: function() {
        }
    })
    
    
 }


function UpdateTest(id){ //nb of queries that are done

    var done = 0;
    $.ajax({
        async: false,
        type: "POST",
        url: "http://127.0.0.1:8000/tests/nbofdone/",
        data : JSON.stringify({"id" : id}),
        contentType: "application/json; charset=utf-8",
        success: function(response) {
            done = response
        }
    })
    return done;
    
}

function StopTest(id) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://127.0.0.1:8000/tests/stoptest/",
        data : JSON.stringify({"id" : id}),
        contentType: "application/json; charset=utf-8",
        success: function() {
        }
    })

}

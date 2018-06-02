google.charts.load('current', {packages: ['corechart']});

var optionsBar = {'title':"Distribution of different user type in each year ",
    'width':400,
    'height':300};
var optionsPie = {'title':"Percentage of different user type",
    'width':400,
    'height':300};
var data;

function drawPie(){
    var anonNum = 0, botNum = 0,adminNum = 0,userNum = 0;

    graphData = new google.visualization.DataTable();
    graphData.addColumn('string', 'Year');
    graphData.addColumn('number', 'Percentage');
    $.each(data, function(index, val) {
        anonNum = anonNum +val['anon'];
        botNum = botNum +val['bot'];
        adminNum = adminNum +val['admin'];
        userNum = userNum + val['user'];
    });
    var chart = new google.visualization.PieChart($("#myChart")[0]);
    chart.draw(graphData, optionsPie);
}

function drawBar(){

    graphData = new google.visualization.DataTable();
    graphData.addColumn('string', 'Year');
    graphData.addColumn('number', 'Anon');
    graphData.addColumn('number','Bot');
    graphData.addColumn('number','Admin');
    graphData.addColumn('number', 'Users');
    $.each(data, function(index, val) {
        graphData.addRow([val[]]);
    })
    var chart = new google.visualization.PieChart($("#myChart")[0]);
    chart.draw(graphData, optionsBar);
}

$(document).ready(function() {

    $.getJSON('/data',null, function(rdata) {
            data = rdata
        }
    );

    $("#pie").click(function(event){
        event.preventDefault();
        drawPie()
    })

    $("#bar").click(function(event){
        event.preventDefault();
        drawBar()
    })

});

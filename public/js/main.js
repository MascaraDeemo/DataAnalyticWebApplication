google.charts.load('current', {packages: ['corechart']});

var optionsBar = {'title':"Distribution of different user type in each year ",
    'width':400,
    'height':300};
var data;

function drawPie(){
    graphData = new google.visualization.DataTable();
    graphData.addColumn('string', 'Element');
    graphData.addColumn('number', 'Percentage');
    $.each(data, function(key, val) {
        graphData.addRow([key, val]);
    })
    var chart = new google.visualization.PieChart($("#myChart")[0]);
    chart.draw(graphData, options);
}

function drawBar(){

    graphData = new google.visualization.DataTable();
    graphData.addColumn('string', 'Year');
    graphData.addColumn('number', 'Anon');
    graphData.addColumn('number','Bot');
    graphData.addColumn('number','Admin');
    graphData.addColumn('number', 'Users');
    $.each(data, function(index, val) {
        graphData.addRow([val['Year'],val['Anon'],val['Bot'],val['Admin'],val['Users']]);
    })
    var chart = new google.visualization.BarChart($("#Chart")[0]);
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

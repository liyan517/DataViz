
function makeGraphs_react(error, renderInst) {
    var measure = renderInst.measure;

    var chartsDOM = []

    for (var i = 0; i < renderInst.charts.length; i++) {
        var chart = renderInst.charts[i];
        var charType = chart.chart;
        if(charType == 'line'){
            chartsDOM.push()
        }
        var dim = chart.dim;
        var title = chart.title;
        //Do something
    }

    ReactDOM.render(
        <DashBoard data={dataCSV}/>,
        document.getElementById('charts')
    );
    // makeGraphs(error, dataCSV)
}
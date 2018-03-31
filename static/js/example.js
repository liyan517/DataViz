queue()
    .defer(d3.csv, "static/test/test.csv")
    .await(makeGraphs_react);


function makeGraphs(error, testCSV){

    //Clean projectsJson data
    var testData = testCSV;
    var dateFormat = d3.time.format("%Y-%m-%d");
    testData.forEach(function(d) {
        d["year"] = d["year"];
        d["count"] = +d["count"]
    });

    //Create a Crossfilter instance
    var ndx = crossfilter(testData);
    var dateDim = ndx.dimension(function(d) { return d["year"]; });

    //Create calculate
    var numCourseByDate = dateDim.group().reduceSum(function(d) {
        return d["count"];
    });

    //Charts
    var timeChart = dc.barChart("#time-chart");



    timeChart
        .width(768)
        .height(380)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Fruit')
        .yAxisLabel('Quantity Sold')
        .dimension(dateDim)
        .group(numCourseByDate);

    dc.renderAll();

}

var TestComp = React.createClass({
    render: function() {
        return (
            <div class="col-sm-12">
                <div class="chart-wrapper">
                    <div class="chart-title">
                        Number of Donations
                    </div>
                    <div class="chart-stage">
                        <div id="time-chart"></div>
                    </div>
                </div>
            </div>
        );
    },

});

function makeGraphs_react(error, dataCSV) {
    ReactDOM.render(
        <div class="col-sm-6">
            <div class="row">
                <TestComp/>
            </div>

        </div>,
        document.getElementById('charts')
    );
    makeGraphs(error, dataCSV)
}


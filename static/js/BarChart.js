
var BarChart = React.createClass({

    makeGraphs: function(testData, ndx){
        var dateDim = ndx.dimension(function(d) { return d["year"]; });

        //Create calculate
        var numCourseByDate = dateDim.group().reduceSum(function(d) {
            return d["count"];
        });

        //Charts
        var barChart = dc.barChart("#bar-chart");



        barChart
            .width(300)
            .height(300)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .xAxisLabel('Year')
            .yAxisLabel('Count')
            .dimension(dateDim)
            .group(numCourseByDate);

        // dc.renderAll();

    },


    componentDidMount: function() {
        var $this = $(ReactDOM.findDOMNode(this));
        this.makeGraphs(this.props.data, this.props.ndx)
        // set el height and width etc.
    },

    render: function() {
        return (
            <div className="col-sm-6">
                <div className="chart-wrapper">
                    <div className="chart-title">
                        Number of Donations
                    </div>
                    <div className="chart-stage">
                        <div id="bar-chart"></div>
                    </div>
                </div>
            </div>
        );
    },

});
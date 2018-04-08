var TimeChart = React.createClass({
    makeGraphs: function(ndx){
        var dim = this.props.dim;
        var measure = this.props.measure;
        var dimension = ndx.dimension(function(d) { return d[dim]; });

        //Create calculate
        var measure_val = dimension.group().reduceSum(function(d) {
            return d[measure];
        });

        //Charts
        var lineChart = dc.lineChart("#line-chart");
//        var volumeChart = dc.barChart('#small-line-chart');

        var xaxis = dim.replace('_', ' ')
        var yaxis = measure.split('_').join(' ')
        var newWidth = document.getElementById('line-stage').offsetWidth;
        lineChart
            .width(newWidth)
            .height(300)
            .transitionDuration(500)
            .margins({top: 30, right: 50, bottom: 50, left: 100})
            .dimension(dimension)
//            .mouseZoomable(true)
//    // Specify a "range chart" to link its brush extent with the zoom of the current "focus chart".
//            .rangeChart(volumeChart)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .xAxisLabel(xaxis)
            .yAxisLabel(yaxis)
            .renderHorizontalGridLines(true)
            .brushOn(false)
            .group(measure_val);

        // dc.renderAll();

    },


    componentDidMount: function() {
        var $this = $(ReactDOM.findDOMNode(this));
        this.makeGraphs(this.props.ndx)
        // set el height and width etc.
    },

    render: function() {
        return (
            <div className="col-sm-12">
                <div className="chart-wrapper">
                    <div className="chart-title">
                        {this.props.title}
                    </div>
                    <div className="chart-stage" id="line-stage">
                        <div id="line-chart">
                        </div>
                    </div>
                </div>
            </div>
        );
    },

});

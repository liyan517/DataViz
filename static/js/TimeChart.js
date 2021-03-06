var TimeChart = React.createClass({
    makeGraphs: function(ndx){
        var key = "#" + this.props.id
        var stagekey = this.props.stageid
        var dim = this.props.dim;
        var measure = this.props.measure;
        var dimension = ndx.dimension(function(d) { return d[dim]; });

        //Create calculate
        var measure_val = dimension.group().reduceSum(function(d) {
            return d[measure];
        });

        //Charts
        var lineChart = dc.lineChart(key);
//        var volumeChart = dc.barChart('#small-line-chart');

        var xaxis = dim.replace('_', ' ')
        var yaxis = measure.split('_').join(' ')
        var newWidth = document.getElementById(stagekey).offsetWidth;
        lineChart
            .width(newWidth)
            .height(300)
            .transitionDuration(500)
            .margins({top: 30, right: 50, bottom: 50, left: 80})
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
                    <div className="chart-stage" id={this.props.stageid}>
                        <div id={this.props.id}>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

});

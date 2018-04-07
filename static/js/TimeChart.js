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


        lineChart
            .width(800)
            .height(300)
            .transitionDuration(500)
            .margins({top: 30, right: 50, bottom: 25, left: 40})
            .dimension(dimension)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .xAxisLabel(String(dim))
            .yAxisLabel(String(measure))
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
        const style_css = {
            display: 'none'
        };
        return (

            <div className="col-sm-12">
                <div className="chart-wrapper">
                    <div className="chart-title">
                        {this.props.title}
                    </div>
                    <div className="chart-stage">
                        <div id="line-chart">

                        </div>
                    </div>
                </div>
            </div>
        );
    },

});

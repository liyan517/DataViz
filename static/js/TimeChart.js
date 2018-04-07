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
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .xAxisLabel(String(dim))
            .yAxisLabel(String(measure))
            .dimension(dimension)
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

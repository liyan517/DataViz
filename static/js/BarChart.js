
var BarChart = React.createClass({
    getInitialState: function (){
        return {
            chart: null
        }
    },

    makeGraphs: function(chart, testData, ndx){
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
        var barChart = dc.barChart(key);

        var xaxis = dim.replace('_', ' ')
        var yaxis = measure.split('_').join(' ')
        var newWidth = document.getElementById(stagekey).offsetWidth;
        barChart
            .width(newWidth)
            .margins({top: 30, right: 50, bottom: 50, left: 80})
            .height(300)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .xAxisLabel(xaxis)
            .yAxisLabel(yaxis)
            .dimension(dimension)
            .group(measure_val)
            .xAxis().ticks(4);
//            .on('renderlet', function (table) {
//                table.selectAll('g.x text').attr('transform', 'translate(-10,10) rotate(315)');
//            });



        // dc.renderAll();

    },


    componentDidMount: function() {
        var $this = $(ReactDOM.findDOMNode(this));
        this.makeGraphs(this.state.chart, this.props.data, this.props.ndx)
        // set el height and width etc.
    },

    render: function() {
        const style_css = {
            display: 'none'
        };
        return (

            <div className="col-sm-6">
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
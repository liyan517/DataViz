var PieChart = React.createClass({
        makeGraphs: function(testData, ndx){
            var dim = this.props.dim;
            var measure = this.props.measure;
            var dateDim = ndx.dimension(function(d) { return d[dim]; });

            //Create calculate
            var measure_val = dateDim.group().reduceSum(function(d) {
                return d[measure];
            });

            //Charts
            var pieChart = dc.pieChart("#pie-chart");
            pieChart
/*                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 600 400")*/
                //class to make it responsive
                //.classed("svg-content-responsive", true)
                .width(300)
                .height(300)
                .slicesCap(4)
                .innerRadius(50)
                .dimension(dateDim)
                .group(measure_val)
                .legend(dc.legend())
                // workaround for #703: not enough data is accessible through .label() to display percentages
                .on('pretransition', function(chart) {
                    chart.selectAll('text.pie-slice').text(function(d) {
                        return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
                    })
                });


        },


        componentDidMount: function() {
            var $this = $(ReactDOM.findDOMNode(this));
            this.makeGraphs(this.props.data, this.props.ndx)
            // set el height and width etc.
        },
        render: function() {
            return (
                <div className="col-sm-12">
                    <div className="chart-wrapper">
                        <div className="chart-title">
                            {this.props.title}
                        </div>
                        <div className="chart-stage svg-container">
                            <div id="pie-chart"></div>
                        </div>
                    </div>
                </div>
            );
        },

    }
);

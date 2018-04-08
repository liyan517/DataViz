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
            //var newWidth = document.getElementById('pie-stage').offsetHigh;
            var pieChart = dc.pieChart("#pie-chart");
            var containerWidth = document.getElementById('pie-stage')
            .offsetWidth;
            var width = 300
            var height = 300
            pieChart
/*                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 600 400")*/
                //class to make it responsive
                //.classed("svg-content-responsive", true)
                .width(containerWidth)
                .height(height)
                .transitionDuration(500)
                .slicesCap(5)
                .innerRadius(50)
                .cx(containerWidth/2)
                .dimension(dateDim)
                .group(measure_val)
                .legend(dc.legend())
                // workaround for #703: not enough data is accessible through .label() to display percentages
                .on('pretransition', function(chart) {
                    chart.selectAll('text.pie-slice').text(function(d) {
                        return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
                    })
                })
                .on('renderlet', function (table) {
                    table.selectAll('#pie-chart').classed('center', true);
                });


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
                            {this.props.title}
                        </div>
                        <div className="chart-stage" id="pie-stage">
                            <div id="pie-chart"></div>
                        </div>
                    </div>
                </div>
            );
        },

    }
);

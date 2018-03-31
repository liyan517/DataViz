var PieChart = React.createClass({
        makeGraphs: function(testData, ndx){
            var dateDim = ndx.dimension(function(d) { return "year"+d["year"]; });

            //Create calculate
            var numCourseByDate = dateDim.group().reduceSum(function(d) {
                return d["count"];
            });

            //Charts
            var pieChart = dc.pieChart("#pie-chart");
            pieChart
                .width(300)
                .height(300)
                .slicesCap(4)
                .innerRadius(50)
                .dimension(dateDim)
                .group(numCourseByDate)
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
                <div className="col-sm-6">
                    <div className="chart-wrapper">
                        <div className="chart-title">
                            {this.props.title}
                        </div>
                        <div className="chart-stage">
                            <div id="pie-chart"></div>
                        </div>
                    </div>
                </div>
            );
        },

    }
);

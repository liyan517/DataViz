
var BarChart = React.createClass({
    getInitialState: function (){
        return {
            chart: null
        }
    },

    makeGraphs: function(chart, testData, ndx){
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
                    <div className="chart-stage">
                        <div id="bar-chart">
                            <span className="reset" style={style_css}>Selected: <span
                                className="filter"></span></span>
                            <a className="reset" href="javascript:{barChart}.filterAll();dc.redrawAll();"
                               style={style_css}> reset</a>

                            <div className="clearfix"></div>

                        </div>
                    </div>
                </div>
            </div>
        );
    },

});
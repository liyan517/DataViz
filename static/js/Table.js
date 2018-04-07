
var TableChart = React.createClass({
    getInitialState: function (){
        return {
            chart: null
        }
    },

    makeGraphs: function(chart, testData, ndx){
        var dim = this.props.dim;
        var measure = this.props.measure;
        var dimension = ndx.dimension(function(d) { return d[dim]; });
        var columns = this.props.columns;

        //Create calculate
        var measure_val = (function(d) {
            return d[measure];
        });

        //Charts
        var tableChart = dc.dataTable(".data_table");



        tableChart
            .dimension(dimension)
            .group(function(d) {
                return "-" + d[dimension];
            })
            .columns(columns)
            .sortBy(function (d) {
            return d[measure];
        })
        // (_optional_) sort order, `default = d3.ascending`
            .order(d3.ascending)
            // (_optional_) custom renderlet to post-process chart using [D3](http://d3js.org)
            .on('renderlet', function (table) {
                table.selectAll('.dc-table-group').classed('table-info', true);
            });
        ;


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
            <div className="col-sm-12">
                <div className="chart-wrapper">
                    <div className="chart-title">
                        {this.props.title}
                    </div>
                    <div className="chart-stage">
                        <table className="table table-hover table-sm data_table"></table>
                    </div>
                </div>
            </div>
        );
    },

});
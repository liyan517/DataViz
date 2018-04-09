
var TableChart = React.createClass({
    getInitialState: function (){
        return {
            chart: null
        }
    },

    makeGraphs: function(chart, testData, ndx){
        var dim = this.props.dim;
        console.log(dim)
        var measure = this.props.measure;
        var all = ndx.groupAll();
        var dimension = ndx.dimension(function(d) { return d[dim]; });
        var columns = this.props.columns;
        console.log(columns)

        //Create calculate
        var measure_val = (function(d) {
            return d[measure];
        });

        //Charts
        var tableChart = dc.dataTable(".data_table");
        var recordCount = dc.dataCount('.data-count');



        tableChart
            .dimension(dimension)
            .group(function(d) {
                return "" + d[dim];
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
        recordCount /* dc.dataCount('.dc-data-count', 'chartGroup'); */
            .dimension(ndx)
            .group(all)
            // (_optional_) `.html` sets different html when some records or all records are selected.
            // `.html` replaces everything in the anchor with the html given using the following function.
            // `%filter-count` and `%total-count` are replaced with the values obtained.
            .html({
                some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                    ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
                all: 'All records selected. Please click on the graph to apply filters.'
            });


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

        <div className="row col-sm-12">
            <div className="row col-sm-12">
                <div className="data-count">
                    <span className="filter-count"></span> selected out of <span className="total-count"></span> records | <a
                    href="javascript:dc.filterAll(); dc.renderAll();">Reset All</a>
                </div>
            </div>

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
        </div>
        );
    },

});
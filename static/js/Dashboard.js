// ReactDOM.render(
//     <UploadBar/>,
//     document.getElementById('upload-bar')
// );
//
// queue()
//     .defer(d3.csv, "static/test/test.csv")
//     .await(makeGraphs_react);
//
// function makeDashBoards(error, response) {
//
// }


var CountChart = React.createClass({
    makeGraphs: function(chart, testData, ndx){
        var dim = this.props.dim;
        var measure = this.props.measure;
        var dimension = ndx.dimension(function(d) { return d[dim]; });

        //Create calculate
        var measure_val = dimension.group().reduceSum(function(d) {
            return d[measure];
        });

        //Charts
        var barChart = dc.barChart("#bar-chart");



        barChart
            .width(600)
            .height(300)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .xAxisLabel(dim)
            .yAxisLabel(measure)
            .dimension(dimension)
            .group(measure_val);


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
                            <span className="reset" style={style_css}>Selected: <span className="filter"></span></span>
                            <a className="reset" href="javascript:barChart.filterAll();dc.redrawAll();"
                               style={style_css}> reset</a>

                            <div className="clearfix"></div>

                        </div>
                    </div>
                </div>
            </div>
        );
    },

});



var DashBoard = React.createClass({
    count: function () {
        var nasdaqCount = dc.dataCount('.dc-data-count');
        nasdaqCount /* dc.dataCount('.dc-data-count', 'chartGroup'); */
            .dimension(ndx)
            .group(all)
            // (_optional_) `.html` sets different html when some records or all records are selected.
            // `.html` replaces everything in the anchor with the html given using the following function.
            // `%filter-count` and `%total-count` are replaced with the values obtained.
            .html({
                some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
                all: 'All records selected. Please click on the graph to apply filters.'
            })
    },
    getInitialState: function (){
        var data = this.props.data;
        var renderInst = this.props.inst;



        var dateFormat = d3.time.format("%Y-%m-%d");
        data.forEach(function(d) {
            d["year"] = d["year"];
            d["count"] = +d["count"]
        });

        //Create a Crossfilter instance
        var ndx = crossfilter(data);
        return {
          ndx: ndx,
          data: data,
          renderInst: renderInst
        };
    },
    componentDidMount: function() {
        var $this = $(ReactDOM.findDOMNode(this));
        dc.renderAll();
        // set el height and width etc.
    },

    render: function () {
        var chartObj = [];
        for (var i = 0; i < this.state.renderInst.charts.length; i++) {
            var chart = this.state.renderInst.charts[i]
            var charType = chart.chart;
            console.log(charType);
            switch(charType) {
                case 'pie':
                    chartObj.push(<PieChart data={this.props.data} ndx={this.state.ndx} title={chart.title} measure={this.state.renderInst.measure} dim={chart.dim}/>);
                    break;
                case 'bar':
                    chartObj.push(<BarChart data={this.props.data} ndx={this.state.ndx} title={chart.title} measure={this.state.renderInst.measure} dim={chart.dim}/>);
                    break;

                default:
                    return null;
            }
        }
            return(
            <div className="row" >
                {chartObj}

                <TableChart data={this.props.data} ndx={this.state.ndx} title='Test Table' measure='year' dim='year'/>
            </div>
        )

    }
});


var makeGraphs_react = function (dataCSV, renderInst) {

    ReactDOM.render(
        <DashBoard data={dataCSV} inst={renderInst}/>,
        document.getElementById('dashboard')
    );
    // makeGraphs(error, dataCSV)
}


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




var DashBoard = React.createClass({
    getInitialState: function (){
        var data = this.props.data;
        console.log(data.length)
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
                case 'time':
                    chartObj.push(<TimeChart data={this.props.data} ndx={this.state.ndx} title={chart.title} measure={this.state.renderInst.measure} dim={chart.dim}/>);
                    break;
                case 'table':
                    chartObj.push(<TableChart data={this.props.data} ndx={this.state.ndx} title={chart.title} measure={this.state.renderInst.measure} dim={chart.dim} columns={chart.columns}/>);
                    break;
                default:
                    chartObj.push(<div>Chart {charType} is not supported</div>);
            }
        }
            return(
            <div className="row" >
                {chartObj}

            </div>
        )
                // <TableChart data={this.props.data} ndx={this.state.ndx} title='Test Table' measure='year' dim='year'/>year

    }
});


var makeGraphs_react = function (dataCSV, renderInst) {

    ReactDOM.render(
        <DashBoard data={dataCSV} inst={renderInst}/>,
        document.getElementById('dashboard')
    );
    // makeGraphs(error, dataCSV)
};



var DashBoard = React.createClass({
    getInitialState: function (){
        var data = this.props.data;
        console.log(data.length)
        var renderInst = this.props.inst;



        var dateFormat = d3.time.format("%Y-%m-%d");
        data.forEach(function(d) {
            d["year"] = d["year"];
            d["count"] = +d["count"]
            if(d["price"] != undefined){
                d["price"] = +d["price"]
            }
            if(d["no_of_graduates"] != undefined){
                d["no_of_graduates"] = +d["no_of_graduates"]

            }
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
            var title = chart.title
            if(chart.title != undefined)
                title = chart.title.split('_').join(' ')
            var charType = chart.chart;
            var key = charType + "-" + i
            var stagekey = 'stage-' + charType + "-" + i
            console.log(charType + key);
            switch(charType) {
                case 'pie':
                    chartObj.push(<PieChart id={key} stageid={stagekey}
                    data={this.state.data} ndx={this.state.ndx}
                    title={title} measure={this.state.renderInst.measure}
                     dim={chart.dim}/>);
                    break;
                case 'bar':
                    chartObj.push(<BarChart id={key} stageid={stagekey}
                    data={this.state.data} ndx={this.state.ndx} title={title} measure={this.state.renderInst.measure} dim={chart.dim}/>);
                    break;
                case 'row':
                    chartObj.push(<RowChart id={key} stageid={stagekey}
                    data={this.state.data} ndx={this.state.ndx} title={title} measure={this.state.renderInst.measure} dim={chart.dim}/>);
                    break;
                case 'time':
                    chartObj.push(<TimeChart id={key} stageid={stagekey}
                    data={this.state.data} ndx={this.state.ndx} title={title} measure={this.state.renderInst.measure} dim={chart.dim}/>);
                    break;
                case 'real':
                    chartObj.push(<ScatterPlot id={key} stageid={stagekey}
                    data={this.state.data} ndx={this.state.ndx} title={title} measure={this.state.renderInst.measure} dim={chart.dim} columns={chart.columns}/>);
                    break;
                case 'geo':
                    chartObj.push(<GeoChart id={key} stageid={stagekey}
                    data={this.state.data} ndx={this.state.ndx} title={title} measure={this.state.renderInst.measure} dim={chart.dim}/>);
                    break;
                case 'table':
                    chartObj.push(<TableChart id={key} stageid={stagekey}
                    data={this.state.data} ndx={this.state.ndx} title={title} measure={this.state.renderInst.measure} dim={chart.dim} columns={chart.columns}/>);
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


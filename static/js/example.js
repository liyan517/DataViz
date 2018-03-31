queue()
    .defer(d3.csv, "static/test/test.csv")
    .await(makeGraphs_react);

function makeDashBoards(error, response) {

}




var DashBoard = React.createClass({
    getInitialState: function (){
        var data = this.props.data;
        var dateFormat = d3.time.format("%Y-%m-%d");
        data.forEach(function(d) {
            d["year"] = d["year"];
            d["count"] = +d["count"]
        });

        //Create a Crossfilter instance
        var ndx = crossfilter(data);
        return {
          ndx: ndx,
          data: data
        };
    },
    componentDidMount: function() {
        var $this = $(ReactDOM.findDOMNode(this));
        dc.renderAll();
        // set el height and width etc.
    },

    render: function () {
        return(
            <div className="row">

                <div className="col-sm-6">
                    <div className="row">

                        <div className="col-sm-12">
                            <div className="chart-wrapper">
                                <div className="chart-title">
                                    Number of Donations
                                </div>
                                <div className="chart-stage">
                                    <div id="time-chart"></div>
                                </div>
                            </div>
                        </div>
                        <BarChart data={this.state.data} ndx={this.state.ndx}/>
                        <PieChart data={this.state.data} ndx={this.state.ndx} title={"This is Pie"}/>

                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="chart-wrapper">
                        <div className="chart-title">
                            Distribution of Donations
                        </div>
                        <div className="chart-stage">
                            <div id="us-chart"></div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="chart-wrapper">
                        <div className="chart-title">
                            Total Number of Donations
                        </div>
                        <div className="chart-stage">
                            <div id="number-projects-nd"></div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="chart-wrapper">
                        <div className="chart-title">
                            Total Donations in USD
                        </div>
                        <div className="chart-stage">
                            <div id="total-donations-nd"></div>
                        </div>
                    </div>
                </div>

            </div>
        )

    }
});


function makeGraphs_react(error, dataCSV) {

    ReactDOM.render(
        <DashBoard data={dataCSV}/>,
        document.getElementById('charts')
    );
    // makeGraphs(error, dataCSV)
}


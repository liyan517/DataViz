queue()
    .defer(d3.csv, "static/test/test.csv")
    .await(makeGraphs_react);

function makeDashBoards(error, response) {

}

var LineChart = React.createClass({
    makeGraphs: function(testData, ndx){
        var dateDim = ndx.dimension(function(d) { return d["year"]; });

        //Create calculate
        var numCourseByDate = dateDim.group().reduceSum(function(d) {
            return d["count"];
        });

        //Charts
        var timeChart = dc.barChart("#time-chart");



        timeChart
            .width(768)
            .height(380)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .xAxisLabel('Fruit')
            .yAxisLabel('Quantity Sold')
            .dimension(dateDim)
            .group(numCourseByDate);

        dc.renderAll();

    },


    componentDidMount: function() {
        var $this = $(ReactDOM.findDOMNode(this));
        this.makeGraphs(this.props.data, this.props.ndx)
        // set el height and width etc.
    },
    render: function() {
        return (
            <div class="col-sm-12">
                <div class="chart-wrapper">
                    <div class="chart-title">
                        {this.props.title}
                    </div>
                    <div class="chart-stage">
                        <div id="line-chart"></div>
                    </div>
                </div>
            </div>
        );
    },

    }
);


var BarChart = React.createClass({

    makeGraphs: function(testData, ndx){
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
        this.makeGraphs(this.props.data, this.props.ndx)
        // set el height and width etc.
    },

    render: function() {
        return (
            <div className="col-sm-6">
                <div className="chart-wrapper">
                    <div className="chart-title">
                        Number of Donations
                    </div>
                    <div className="chart-stage">
                        <div id="bar-chart"></div>
                    </div>
                </div>
            </div>
        );
    },

});

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

                        <div className="col-sm-6">
                            <div className="chart-wrapper">
                                <div className="chart-title">
                                    Poverty Level
                                </div>
                                <div className="chart-stage">
                                    <div id="poverty-level-row-chart"></div>
                                </div>
                            </div>
                        </div>

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


ReactDOM.render(
    <UploadBar/>,
    document.getElementById('upload-bar')
);

queue()
    .defer(d3.csv, "static/test/test.csv")
    .await(makeGraphs_react);

function makeDashBoards(error, response) {

}




var DashBoard = React.createClass({
    getInitialState: function (){
        var data = this.props.data;
        var renderInst = this.props.inst



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

    getChart: function(charType){
      if (charType == 'pie'){
          return <PieChart/>;
      }else if (charType == 'bar') {
          return <BarChart />
      }
    },


    render: function () {
        return(
            <div className="row">
            {(function() {
                for (var i = 0; i < this.state.renderInst.length; i++) {
                    var chart = this.state.renderInst.charts[i]
                    var charType = chart.chart;
                    switch(charType) {
                        case 'pie':
                            return <PieChart data={this.props.data} />;
                        case 'bar':
                            return <BarChart data={this.props.data} />;

                        default:
                            return null;
                    }

                    var dim = chart.dim
                    var title = chart.title
                    //Do something
                }

            })()})

            </div>
        )

    }
});


function makeGraphs_react(error, dataCSV, renderInst) {

    ReactDOM.render(
        <DashBoard data={dataCSV} inst={renderInst}/>,
        document.getElementById('charts')
    );
    // makeGraphs(error, dataCSV)
}


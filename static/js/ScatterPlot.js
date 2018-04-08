
var ScatterPlot = React.createClass({
    getInitialState: function (){
        return {
            chart: null
        }
    },

    makeGraphs: function(testData, ndx){
        var key = "#" + this.props.id
        var stagekey = this.props.stageid
        var dim = this.props.dim;
        var measure = this.props.measure;
        var dimension = ndx.dimension(function(d) {
            return [d[dim], d[measure]]; });

        //Create calculate
        var measure_val = dimension.group().reduceCount();

        var max_y = measure_val.top(1)[0].value;
        var min_y = d3.min(testData, function(d) {
          return d[measure];
        });
        var min_x = d3.min(testData, function(d) {
          return d[dim];
        });
        var max_x = d3.max(testData, function(d) {
          return d[dim];
        });
        console.log(max_x + ',' + min_x)
        console.log(max_y + ',' + min_y)

        //Charts
        var chart = dc.scatterPlot(key);

        var xaxis = dim.replace('_', ' ')
        var yaxis = measure.split('_').join(' ')
        var newWidth = document.getElementById(stagekey).offsetWidth;

        var xaxis = dim.replace('_', ' ')
        var yaxis = measure.split('_').join(' ')
        chart.width(newWidth)
            .height(300)
            .x(d3.scale.linear().domain([min_x,max_x]))
//            .y(d3.scale.linear().domain([min_y,max_y]))
            .yAxisLabel(yaxis)
            .xAxisLabel(xaxis)
            .clipPadding(10)
            .dimension(dimension)
            .excludedOpacity(0.5)
            .group(measure_val);


        // dc.renderAll();

    },


    componentDidMount: function() {
        var $this = $(ReactDOM.findDOMNode(this));
        this.makeGraphs(this.props.data, this.props.ndx)
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
                    <div className="chart-stage" id={this.props.stageid}>
                        <div id={this.props.id}>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

});
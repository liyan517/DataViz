//need to add  .defer(d3.json, "static/geojson/SGJson.json")
var GeoChart = React.createClass({
        makeGraphs: function(testData, SGJson, ndx){
            var dim = this.props.dim;
            var measure = this.props.measure;
            var stateDim = ndx.dimension(function(d) { return d[dim]; });

            //Create calculate
            var measure_val = dateDim.group().reduceSum(function(d) {
                return d[measure];
            });

            var max_state = measure_val.top(1)[0].value;

            //Charts
            var sgChart = dc.geoChoroplethChart("#sg-chart");
            sgChart
            /*                .attr("preserveAspectRatio", "xMinYMin meet")
                            .attr("viewBox", "0 0 600 400")*/
            //class to make it responsive
            //.classed("svg-content-responsive", true)
                .height(330)
                .dimension(stateDim)
                .group(measure_val)
                .colors(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"])
                .colorDomain([0, max_state])
                .overlayGeoJson(statesJson["features"], "state", function (d) {
                    return d.properties.PLN_AREA_N;
                })
                .projection(d3.geo.albersUsa()
                    .scale(600)
                    .translate([340, 150]))
                .title(function (p) {
                    return "State: " + p["key"]
                        + "\n"
                        + "Total Amount: " + Math.round(p["value"]);
                });


        },


        componentDidMount: function() {
            var $this = $(ReactDOM.findDOMNode(this));
            this.makeGraphs(this.props.data, this.props.ndx)
            // set el height and width etc.
        },
        render: function() {
            return (
                <div className="col-sm-12">
                <div className="chart-wrapper">
                <div className="chart-title">
                {this.props.title}
        </div>
            <div className="chart-stage svg-container">
                <div id="pie-chart"></div>
                </div>
                </div>
                </div>
        );
        },

    }
);
//need to add  .defer(d3.json, "static/geojson/SGJson.json")
var GeoChart = React.createClass({
        makeGraphs: function (error, statesJson) {
            var dim = this.props.dim;
            var measure = this.props.measure;
            var stateDim = this.props.ndx.dimension(function (d) {
                return d[dim];
            });
            console.log(statesJson)

            //Create calculate
            var measure_val = stateDim.group().reduceSum(function (d) {
                return d[measure];
            });

            var max_state = measure_val.top(1)[0].value;

            //Charts
            var sgChart = dc.geoChoroplethChart("#geo-chart");
            sgChart
                .width(1000)
            /*                .attr("preserveAspectRatio", "xMinYMin meet")
                            .attr("viewBox", "0 0 600 400")*/
            //class to make it responsive
            //.classed("svg-content-responsive", true)
                .height(300)
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


        componentDidMount: function () {
            var $this = $(ReactDOM.findDOMNode(this));
            queue()
                .defer(d3.json, "static/geojson/SGJson.json")
                .await(this.makeGraphs);
            // set el height and width etc.
        },
        render: function () {
            return (
                <div className="col-sm-12">
                    <div className="chart-wrapper">
                        <div className="chart-title">
                            {this.props.title}
                        </div>
                        <div className="chart-stage svg-container">
                            <div id="geo-chart"></div>
                        </div>
                    </div>
                </div>
            );
        },

    }
);
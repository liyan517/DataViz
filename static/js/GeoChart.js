//need to add  .defer(d3.json, "static/geojson/SGJson.json")
var GeoChart = React.createClass({
        makeGraphs: function (error, statesJson) {
            var dim = this.props.dim;
            var measure = this.props.measure;
            var stateDim = this.props.ndx.dimension(function (d) {
                return d[dim];
            });
            console.log(statesJson)
            console.log(measure)

            //Create calculate
            var measure_val = stateDim.group().reduceSum(function (d) {
                return d[measure];
            });

            var max_state = measure_val.top(1)[0].value;


            var sgChart = dc.geoChoroplethChart("#geo-chart");
            var width = 1000;
            var height = 400;
            //var scale = 360*width/(104.05 - 103.6);
            //var scale = 360*height/(1.46 - 1.2);
            var scale = 360*height/(0.5);
            console.log(scale)
/* OK PARAM            var projection = d3.geo.equirectangular()
                    .scale(40000)
                    .center([100, -1])
                    .translate([-width*2,height*6]);*/

            var projection = d3.geo.equirectangular().scale(50000).center
            ([100,-1]).translate([-width*2.75,height*5.5]);;
            //Charts
            sgChart
                .width(width)
            /*                .attr("preserveAspectRatio", "xMinYMin meet")
                            .attr("viewBox", "0 0 600 400")*/
            //class to make it responsive
            //.classed("svg-content-responsive", true)
                .height(height)
                .dimension(stateDim)
                .group(measure_val)
                .colors(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"])
                .colorDomain([0, max_state])
                .overlayGeoJson(statesJson["features"], "state", function (d) {
                    return d.properties.PLN_AREA_N;
                })
//                .projection(d3.geo.equirectangular()
//                    .scale(50000)
//                    .center([100, -1])
//                    .translate([-width*3,height*7]))
                .projection(projection)
                .title(function (p) {
                    return "State: " + p["key"]
                        + "\n"
                        + "Total Amount: " + Math.round(p["value"]);
                });

                sgChart.render();



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
                        <div className="chart-stage">
                            <div id="geo-chart"></div>
                        </div>
                    </div>
                </div>
            );
        },

    }
);
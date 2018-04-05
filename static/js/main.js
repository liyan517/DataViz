

$(document).ready(
    $("#url-go").click(
        function() {
            $.post(
                "/postdata",
                {"url": $("#url-val").val()},
                function(response) {
                    alert(response)
                    obj = JSON.parse(response)
                    alert(obj.charts)
                    for (var i = 0; i < obj.charts.length; i++) {
                        var chart = obj.charts[i]
                        var charType = chart.chart;
                        var dim = chart.dim
                        var title = chart.title
                        //Do something
                    }
                }
            )
        }
     )
)
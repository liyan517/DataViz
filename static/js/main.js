

$(document).ready(
    $("#url-go").click(
        function() {
            var value = $("#url-val").val()
            $.post(
                "/postdata",
                {"url": value},
                function(response) {
                    var obj = JSON.parse(response);
/*                    $.get(value, function (data) {

                        makeGraphs_react(data.result.records, obj);
                    });*/
                    $.get("/data", function (data) {

                        let dataStr = JSON.parse(data);
                        makeGraphs_react(dataStr.data, obj);
                    });


// obj                    alert(obj.charts)
//                     for (var i = 0; i < obj.charts.length; i++) {
//                         var chart = obj.charts[i]
//                         var charType = chart.chart;
//                         var dim = chart.dim
//                         var title = chart.title
//                         //Do something
//                     }
                }
            )
        }
     )
)

function get_data(url) {
    $.get(url, function (response) {

    })
}
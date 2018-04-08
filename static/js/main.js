

$(document).ready(
    $("#url-go").click(
        function() {
        $("#canvas").append("<div id='loader'></div>")
            var value = $("#url-val").val()
            $.post(
                "/postdata",
                {"url": value},
                function(response) {
                    var obj = JSON.parse(response);
                    $.get("/data", {'key': obj.data}, function (data) {
                        document.getElementById("loader").style.display = "none";
                        document.getElementById("dashboard").style.display =
                        "block";
//                        alert(data);
                        let dataStr = JSON.parse(data);
                        makeGraphs_react(dataStr.data, obj);
                    });

                }
            )
        }
     )
)

function get_data(url) {
    $.get(url, function (response) {

    })
}
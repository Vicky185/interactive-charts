{"filter":false,"title":"linegraph.js","tooltip":"/line-graphs/linegraph.js","undoManager":{"mark":0,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":25,"column":9},"action":"insert","lines":["queue()","            .defer(d3.json, \"data/transactions.json\")","            .await(makeGraphs);","","        function makeGraphs(error, transactionsData) {","            var ndx = crossfilter(transactionsData);","            var parseDate = d3.time.format(\"%d/%m/%Y\").parse;","            transactionsData.forEach(function(d) {","                d.date = parseDate(d.date);","            });","            var date_dim = ndx.dimension(dc.pluck('date'));","            var total_spend_per_date = date_dim.group().reduceSum(dc.pluck('spend'));","            var minDate = date_dim.bottom(1)[0].date;","            var maxDate = date_dim.top(1)[0].date;","            dc.lineChart(\"#chart-here\")","                .width(1000)","                .height(300)","                .margins({ top: 10, right: 50, bottom: 30, left: 50 })","                .dimension(date_dim)","                .group(total_spend_per_date)","                .transitionDuration(500)","                .x(d3.time.scale().domain([minDate, maxDate]))","                .xAxisLabel(\"Month\")","                .yAxis().ticks(4);","            dc.renderAll();","        }"],"id":1}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":12,"column":19},"end":{"row":12,"column":19},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1570886202507,"hash":"f2c41096abd6e366f81f9d2b35cd7281d0091e02"}
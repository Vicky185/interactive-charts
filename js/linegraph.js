queue()
            .defer(d3.json, "../data/transactions.json")
            .await(makeGraphs);

        function makeGraphs(error, transactionsData) {
            var ndx = crossfilter(transactionsData);
            var parseDate = d3.time.format("%d/%m/%Y").parse;
            transactionsData.forEach(function(d) {
                d.date = parseDate(d.date);
            });
            var date_dim = ndx.dimension(dc.pluck('date'));
            var total_spend_per_date = date_dim.group().reduceSum(dc.pluck('spend'));
            var minDate = date_dim.bottom(1)[0].date;
            var maxDate = date_dim.top(1)[0].date;
            dc.lineChart("#chart-here")
                .width(1000)
                .height(300)
                .margins({ top: 10, right: 50, bottom: 30, left: 50 })
                .dimension(date_dim)
                .group(total_spend_per_date)
                .transitionDuration(500)
                .x(d3.time.scale().domain([minDate, maxDate]))
                .xAxisLabel("Month")
                .yAxis().ticks(4);
            dc.renderAll();
        }
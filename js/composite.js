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
            var minDate = date_dim.bottom(1)[0].date;
            var maxDate = date_dim.top(1)[0].date;

            function spend_by_name(name) {
                return function(d) {
                    if (d.name === name) {
                        return +d.spend;
                    }
                    else {
                        return 0;
                    }
                }
            }
            var tomSpendByMonth = date_dim.group().reduceSum(spend_by_name('Tom'));
            var bobSpendByMonth = date_dim.group().reduceSum(spend_by_name('Bob'));

            var aliceSpendByMonth = date_dim.group().reduceSum(spend_by_name('Alice'));
            var compositeChart = dc.compositeChart('#composite-chart');
            compositeChart
                .width(990)
                .height(200)
                .dimension(date_dim)
                .x(d3.time.scale().domain([minDate, maxDate]))
                .yAxisLabel("Spend")
                .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
                .renderHorizontalGridLines(true)
                .compose([
                    dc.lineChart(compositeChart)
                    .colors('green')
                    .group(tomSpendByMonth, 'Tom'),
                    dc.lineChart(compositeChart)
                    .colors('red')
                    .group(bobSpendByMonth, 'Bob'),
                    dc.lineChart(compositeChart)
                    .colors('blue')
                    .group(aliceSpendByMonth, 'Alice')
                ])
                .brushOn(false)
                .render();
            dc.renderAll();
        }
        
    queue()
        .defer(d3.json, "../data/transactions.json")
        .await(makeGraphs);


    function makeGraphs(error, transactionsData) {
        var ndx = crossfilter(transactionsData);
        var parseDate = d3.time.format("%d/%m/%Y").parse;
        transactionsData.forEach(function(d) {
            d.date = parseDate(d.date);
        });
        var dateDim = ndx.dimension(function(d) {
            return d.date;
        });
        var tradeColors = d3.scale.ordinal()
            .domain(["Alice", "Tom", "Bob"])
            .range(["red", "green", "blue"]);
        var minDate = dateDim.bottom(1)[0].date;
        var maxDate = dateDim.top(1)[0].date;
        var spendDim = ndx.dimension(function(d) {
            return [d.date, d.spend, d];
        });
        var spendGroup = spendDim.group();
        var spend_chart = dc.scatterPlot("#scatter-plot");
        spend_chart
            .width(768)
            .height(480)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .brushOn(false)
            .symbolSize(8)
            .clipPadding(10)
            .yAxisLabel("Amount Spent")
            .title(function(d) {
                return d.key[2].name + " spent " + d.key[2].spend + " in store " + d.key[2].store;
            })
            .colorAccessor(function(d) {
                return d.key[2].name;
            })
            .colors(tradeColors)
            .dimension(spendDim)
            .group(spendGroup);
        dc.renderAll();
    }
    
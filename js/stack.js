queue()
    .defer(d3.json, "../data/transactions.json")
    .await(makeGraphs);

function makeGraphs(error, transactionsData) {
    var ndx = crossfilter(transactionsData);
    var name_dim = ndx.dimension(dc.pluck('name'));
    var spendByNameStoreA = name_dim.group().reduceSum(function(d) {
        if (d.store === 'A') {
            return +d.spend;
        }
        else {
            return 0;
        }
    });
    var spendByNameStoreB = name_dim.group().reduceSum(function(d) {
        if (d.store === 'B') {
            return +d.spend;
        }
        else {
            return 0;
        }
    });
    var stackedChart = dc.barChart("#stacked-chart");
    stackedChart
        .width(500)
        .height(500)
        .dimension(name_dim)
        .group(spendByNameStoreA, "Store A")
        .stack(spendByNameStoreB, "Store B")
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));
    stackedChart.margins().right = 100;
    dc.renderAll();
}

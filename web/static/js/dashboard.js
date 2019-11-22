function dashboard(id, fData) {
    for (idx in fData) {
        row = fData[idx]
        row['time'] = d3.timeParse("%Y-%m")(row['time'])

    }
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.type;})
    .entries(fData)
    console.log(sumstat)
    data = fData
    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 60, bottom: 60, left: 60},
    width = 560 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.time; }))
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //// Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.trips; })])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));
    // color palette
    var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
    
    // Draw the line
    svg.selectAll(".line")
    .data(sumstat)
    .enter()
    .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
        return d3.line()
            .x(function(d) { return x(d.time); })
            .y(function(d) { return y(+d.trips); })
            (d.values)
        })
    // Draw the labels
    svg.selectAll(".label")
    .data(sumstat)
    .enter()
    .append("text")
        .attr("transform", function(d) {return "translate("+ (width +3) +","+ y(d.values[d.values.length-1].trips) +")"})
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", function(d){return color(d.key)})
        .text(function(d){return d.key});
    // Add a title
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 4))
        //.attr("y", 0 )
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text("Trips Per Day");

    //another chart
    svg = d3.select(id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.time; }))
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //// Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.vehicles; })])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));
    // color palette
    var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
    
    // Draw the line
    svg.selectAll(".line")
    .data(sumstat)
    .enter()
    .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
        return d3.line()
            .x(function(d) { return x(d.time); })
            .y(function(d) { return y(+d.vehicles); })
            (d.values)
        })
    // Draw the labels
    svg.selectAll(".label")
    .data(sumstat)
    .enter()
    .append("text")
        .attr("transform", function(d) {return "translate("+ (width +3) +","+ y(d.values[d.values.length-1].vehicles) +")"})
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", function(d){return color(d.key)})
        .text(function(d){return d.key});

    // Add a title
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 4))
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text("Unique Vehicles Per Day");
}
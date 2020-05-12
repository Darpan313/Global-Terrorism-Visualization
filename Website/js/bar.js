d3.csv('data/clean/year_kill.csv').then(function(data){
	var format = d3.format(",.0f");
	data.forEach(function(d){
		d.nkill = +d.nkill;
	});
	var barWidth = 25;
	var height=window.innerHeight>925?280:250;
	var xScale = d3.scaleLinear()
					.domain([d3.min(data,function(d){ return d.iyear}),d3.max(data,function(d){return d.iyear})])
					.range([0,1475]);
	var yScale = d3.scaleLinear()
					.domain([d3.min(data,function(d){ return d.nkill}),d3.max(data,function(d){return d.nkill})])
					.range([10,height-20]);

	
	var svg = d3.select("div#bar")
				.classed("bar-svg",true)
				.append("svg")
				.attr("width","100%")
				.attr("height","100%");

	var rects = svg.selectAll("rect")
				.data(data)
				.enter()
				.append('rect')
				.attr('class', 'year')
        		.attr('id', function (data) {
            		return 'year-' + data.iyear;
        		})
				.attr('x',function(data){
					return xScale(data.iyear)+10;
				})
				.attr('y',function(data){
					return height - yScale(data.nkill)+28;
				})
				.attr('width',barWidth)
				.attr('height',function(data){
					return yScale(data.nkill);
				});
	for(var i=0; i<data.length-1;i++){
		svg.append("line")
            .attr('class', 'bar-line')
            .attr('x1', xScale(data[i].iyear) + 10 + barWidth / 2)
            .attr('y1', height - yScale(data[i].nkill) +28)
            .attr('x2', xScale(data[i + 1].iyear) + 10 + barWidth / 2)
            .attr('y2', height - yScale(data[i + 1].nkill) +28);
	}
	for(var i=0;i<data.length;i++){
		 svg.append("circle")
            .attr('class', 'bar-point')
            .attr('cx', xScale(data[i].iyear) + 10 + barWidth / 2)
            .attr('cy', height - yScale(data[i].nkill) +28)
            .attr('r',3);

         svg.append('text')
            .attr('class', 'bar-text')
            .attr('x', xScale(data[i].iyear)+9)
            .attr('y', height - yScale(data[i].nkill)+15)
            .text(format(data[i].nkill));
	}
	svg.append('text')
		.attr('class', 'bar-label')
		.attr('x', '40%')
		.attr('y', 40)
		.text("Total Deaths Over Time Due to Terrorism")
		.style("font-weight","bold")
		.style("text-decoration","underline")
	;
	for(var i=2014;i<=2017;i++){
		$("#year-"+i).addClass("active-year selected-year")
	}
});

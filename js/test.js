function test_viz() {
	//Width and height
	var w = 500;
	var h = 100;

	//Create SVG element
	var svg = d3.select("#test-viz")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	svg.selectAll("circle")
	   .data(dataset)
	   .enter()
	   .append("circle")
	   .attr("cx", function(d) {
			return parseInt(d.prostitution);
	   })
	   .attr("cy", function(d) {
			return parseInt(d.cartheft);
	   })
	   .attr("r", function(d) {
			return 10;
	   });

	svg.selectAll("text")
	   .data(dataset)
	   .enter()
	   .append("text")
	   .text(function(d) {
			return parseInt(d.prostitution) + "," + parseInt(d.cartheft);
	   })
	   .attr("x", function(d) {
			return parseInt(d.prostitution);
	   })
	   .attr("y", function(d) {
			return parseInt(d.cartheft);
	   })
	   .attr("font-family", "sans-serif")
	   .attr("font-size", "11px")
	   .attr("fill", "red");
}

function scatter_viz() {
	//Width and height
	var w = 1000;
	var h = 500;
	var padding = 100;
					  
	//Create scale functions
	var xScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, function(d) { return d.prostitution; })])
						 .range([padding, w - padding*3])
						 .clamp(true)

	var yScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, function(d) { return d.cartheft; })])
						 .range([padding, h - padding])
						 .clamp(true)

	var rScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, function(d) { return d.total; })])
						 .range([1, 5])
						
	var xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom")
					  .ticks(5);
	
	var yAxis = d3.svg.axis()
					  .scale(yScale)
					  .orient("left")
					  .ticks(5);
	
	var svg = d3.select("#scatter-viz")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
	
	svg.selectAll("circle")  // <-- No longer "rect"
	   .data(dataset)
	   .enter()
	   .append("circle")
	   .attr("cx", function(d) {
			return xScale(d.prostitution);
	   })
	   .attr("cy", function(d) {
			return yScale(d.cartheft);
	   })
	   .attr("r", function(d) {
		   //return 5
			return rScale(d.total);
		});

		svg.selectAll("text")
		   .data(dataset)
		   .enter()
		   .append("text")
		   .text(function(d) {
				return d.district;
		   })
		   .attr("x", function(d) {
				return xScale(d.prostitution);
		   })
		   .attr("y", function(d) {
				return yScale(d.cartheft);
		   })
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "11px")
		   .attr("fill", "red");

		svg.append("g")
			.attr("class", "x-axis")
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xAxis);
			
		svg.append("g")
			.attr("class", "y-axis")
			.attr("transform", "translate(" + padding + ",0)")
			.call(yAxis);
}

function book_eg() {
	//Width and height
	var w = 500;
	var h = 100;
	
	var dataset = [
					[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
					[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
				  ];

	//Create SVG element
	var svg = d3.select("#book-eg")
				.append("svg")
				.attr("width", w)
				.attr("height", h);
	svg.selectAll("circle")
	   .data(dataset)
	   .enter()
	   .append("circle")
	   .attr("cx", function(d) {
			return d[0];
	   })
	   .attr("cy", function(d) {
			return d[1];
	   })
		.attr("r", function(d) {
			return Math.sqrt(h - d[1]);
		});
}
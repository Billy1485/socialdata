function test_viz() {
	//Width and height
	var w = 500;
	var h = 500;

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

function update_viz() {
		var svg = d3.select("svg")
        svg.selectAll("circle")
           .data(dataset)
           .attr("y", function(d) {
                return 500 - yScale(d);
           })
           .attr("height", function(d) {
                return yScale(d);
           });
}

function scatter_viz() {
	//Width and height
	var w = 1000;
	var h = 500;
	var padding = 100;

	//Create scale functions
	var xScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, function(d) { return parseFloat(d.prostitution); })])
						 .range([padding, w - padding])

	var yScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, function(d) { return parseFloat(d.cartheft); })])
						 .range([h - padding, padding])

	var rScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, function(d) { return parseFloat(d.total); })])
						 .range([1, 10]);
						
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
	
	svg.selectAll("circle")
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
		   .attr("class", "district-label")
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
			.attr("class", "axes")
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xAxis);
			
		svg.append("g")
			.attr("class", "axes")
			.attr("transform", "translate(" + padding + ",0)")
			.call(yAxis);

		d3.select("#year2003").on("click", function() {
			d3.csv("data/2003_crime_data.csv", function(error, data) {

				if (error) {  //If error is not null, something went wrong.
				  console.log(error);  //Log the error.
				} else {      //If no error, the file loaded correctly. Yay!
				  console.log(data);   //Log the data.
				  //Include other code to execute after successful file load here
				dataset = data
				svg.selectAll("circle")
				.data(dataset)
				.transition()
				.delay(function(d, i) {
					return i / dataset.length * 1000;
				})
				.each("start", function() {      // <-- Executes at start of transition
					svg.selectAll(".district-label")
					.style("opacity", 1)
					.transition()
					.duration(400)
					.style("opacity", 0)
					.remove()
				})					
   				.duration(2000)
				//.ease()
				.attr("cy", function(d) {
					return yScale(d.cartheft);
				})
				.attr("cx", function(d) {
					return xScale(d.prostitution);
				})
			   .attr("r", function(d) {
				   //return 5
					return rScale(d.total);
				})
				.each("end", function() {      // <-- Executes at end of transition
					svg.selectAll(".district-label")
					   .data(dataset)
					   .enter()
					   .append("text")
					   .text(function(d) {
							return d.district;
					   })
					   .attr("class", "district-label")
					   .attr("x", function(d) {
							return xScale(d.prostitution);
					   })
					   .attr("y", function(d) {
							return yScale(d.cartheft);
					   })
					   .attr("font-family", "sans-serif")
					   .attr("font-size", "11px")
					   .attr("fill", "red")
				})	

			}});
		})
		
		d3.select("#year2015").on("click", function() {

			d3.csv("data/2015_crime_data.csv", function(error, data) {

				if (error) {  //If error is not null, something went wrong.
					console.log(error);  //Log the error.
				} else {      //If no error, the file loaded correctly. Yay!
					console.log(data);   //Log the data.
					//Include other code to execute after successful file load here
					dataset = data
					svg.selectAll("circle")
					.data(dataset)
					.transition()
					.delay(function(d, i) {
						return i / dataset.length * 1000;
					})
					.each("start", function() {      // <-- Executes at start of transition
						svg.selectAll(".district-label")
						.style("opacity", 1)
						.transition()
						.duration(400)
						.style("opacity", 0)
						.remove()
					})					
   					.duration(2000)
					//.ease()
					.attr("cy", function(d) {
						return yScale(d.cartheft);
					})
					.attr("cx", function(d) {
						return xScale(d.prostitution);
					})
				   .attr("r", function(d) {
					   //return 5
						return rScale(d.total);
					})
					.each("end", function() {      // <-- Executes at end of transition
						svg.selectAll(".district-label")
						   .data(dataset)
						   .enter()
						   .append("text")
						   .text(function(d) {
								return d.district;
						   })
						   .attr("class", "district-label")
						   .attr("x", function(d) {
								return xScale(d.prostitution);
						   })
						   .attr("y", function(d) {
								return yScale(d.cartheft);
						   })
						   .attr("font-family", "sans-serif")
						   .attr("font-size", "11px")
						   .attr("fill", "red")
					})	
	
			}})
		})
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

function viz_2() {
			//Width and height
			var w = 600;
			var h = 250;
			
			var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.05);
			var yScale = d3.scale.linear()
							.domain([0, d3.max(dataset, function(d) { return parseFloat(d.total); })])
							.range([0, h]);
			
			//Create SVG element
			var svg = d3.select("#viz2-plot")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(d.Hour);
			   })
			   .attr("y", function(d) {
			   		return yScale(d.total);
			   })
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d) {
			   		return yScale(d.total);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, 20)";
			   });
			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d.Hour;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(d.Hour) + xScale.rangeBand() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d.total) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");
			//On click, update with new data			
			d3.select("p")
				.on("click", function() {
					//New values for dataset
					dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
								5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];
					//Update all rects
					svg.selectAll("rect")
					   .data(dataset)
					   .attr("y", function(d) {
					   		return h - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					//Update all labels
					svg.selectAll("text")
					   .data(dataset)
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return h - yScale(d) + 14;
					   });
					   				
				});
}

function histo() {

	var margin = {top: 20, right: 20, bottom: 70, left: 40},
		w = 1200 - margin.left - margin.right,
		h = 300 - margin.top - margin.bottom;
	//Create SVG element
	var svg = d3.select("#viz2-plot")
				.append("svg")
				.attr("width", w + margin.left + margin.right)
				.attr("height", h + margin.top + margin.bottom);
				
	var xScale = d3.scale.ordinal()
				.domain(d3.range(dataset.length))
                .rangeRoundBands([0, w], 0.1);
				
	var yScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) { return parseFloat(d.total); })])
				.range([0, h]);

	var xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom")
					  .ticks(5);

	svg.selectAll("rect")
	   .data(dataset)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) {
		  return xScale(i);
	   })
	   .attr("y", function(d) {
			return h - yScale(d.total);
	   })
	   
	   .attr("width", xScale.rangeBand())
	   .attr("height", function(d) {
			return yScale(d.total);
	   })
	   .attr("fill", "teal");
	   
		svg.selectAll("text")
		   .data(dataset)
		   .enter()
		   .append("text")
		   .text(function(d) {
				return d.total;
		   })
		   .attr("text-anchor", "middle")
		   .attr("x", function(d, i) {
				return xScale(i) + xScale.rangeBand() / 2;
		   })
		   .attr("y", function(d) {
				return h - yScale(d.total) + 14;
		   })
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "14px")
		   .attr("fill", "white")
		   .attr("class", "bar");
		  
			svg.append("g")
				.attr("class", "axes")
				.attr("transform", "translate(0," + h + ")")
				.call(xAxis);
			
			d3.select("#vehicle-theft")
				.on("click", function() {
					d3.csv("data/VEHICLE THEFT_crime_data.csv", function(error, data) {

						if (error) {  //If error is not null, something went wrong.
							console.log(error);  //Log the error.
						} else {      //If no error, the file loaded correctly.
							console.log(data);   //Log the data.
							//Include other code to execute after successful file load here
							dataset = data
							yScale.domain([0, d3.max(dataset, function(d) { return parseFloat(d.total); })]);
							svg.selectAll("rect")
							.data(dataset)
							.transition()
						   .attr("y", function(d) {
								return h - yScale(d.total);
						   })
						   .attr("height", function(d) {
								return yScale(d.total);
						   })
						   .attr("fill", "teal");
							   
							svg.selectAll(".bar")
							   .data(dataset)
							   .transition()
							   .delay(function(d, i) {
								   return i / dataset.length * 1000;
							   })
							   .duration(500)
							   .text(function(d) {
									return d.total;
							   })
							   .attr("x", function(d, i) {
									return xScale(i) + xScale.rangeBand() / 2;
							   })
							   .attr("y", function(d) {
									return h - yScale(d.total) +14 ;
							   });
						   
						}
					})
				})
				d3.select("#prostitution")
					.on("click", function() {
						d3.csv("data/PROSTITUTION_crime_data.csv", function(error, data) {

							if (error) {  //If error is not null, something went wrong.
								console.log(error);  //Log the error.
							} else {      //If no error, the file loaded correctly.
								console.log(data);   //Log the data.
								//Include other code to execute after successful file load here
								dataset = data
								yScale.domain([0, d3.max(dataset, function(d) { return parseFloat(d.total); })]);
								svg.selectAll("rect")
								.data(dataset)
								.transition()
							   .attr("y", function(d) {
									return h - yScale(d.total);
							   })
							   .attr("height", function(d) {
									return yScale(d.total);
							   })
							   .attr("fill", "teal");
							   
							svg.selectAll(".bar")
							   .data(dataset)
							   .transition()
							   .delay(function(d, i) {
								   return i / dataset.length * 1000;
							   })
							   .duration(500)
							   .text(function(d) {
									return d.total;
							   })
							   .attr("x", function(d, i) {
									return xScale(i) + xScale.rangeBand() / 2;
							   })
							   .attr("y", function(d) {
									return h - yScale(d.total) +14 ;
							   });
							   
							}
						})
					})				
				
}
//Function to display graph for question 2B
function viz_1() {	
	//Width and height for graph and margin padding
	var w = 1000;
	var h = 700;
	var padding = 100;
	var year = 2003

	//Create scale functions to scale values to pixels
	var xScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, function(d) { return parseFloat(d.prostitution); })])
						 .range([padding, w - padding])

	var yScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, function(d) { return parseFloat(d.cartheft); })])
						 .range([h - padding, padding])

	var rScale = d3.scale.linear()
						 .domain([0, d3.max(dataset, function(d) { return parseFloat(d.total); })])
						 .range([1, 15]);
	//Define axis line on both x and y					
	var xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom")
					  .ticks(5);
	
	var yAxis = d3.svg.axis()
					  .scale(yScale)
					  .orient("left")
					  .ticks(5);
	//get svg
	var svg = d3.select("#viz1-plot")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
	
	//Create circles for the graph, set x and y values and radius from scale and fill with colour
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
			return rScale(d.total);
		})
		.attr("fill", "teal")
	   .on("mouseover", function(d) {
			circle = d3.select(this)
			
			//get the mouse location for the event
			var xPosition = parseFloat(d3.event.pageX);
			var yPosition = parseFloat(d3.event.pageY);

			circle
				.style("stroke", "black")
				.style("stroke-width", 2)

			//Update the tooltip position and value
			d3.select("#tooltip")
				.style("left", xPosition + "px")
				.style("top", yPosition + "px")						
				.select("#district")
				.text(d.district)
				
			d3.select("#prostitution")
				.text("Prostitustion crimes: " + d.prostitution);
	   
			d3.select("#vehicle")
				.text("Vehicle theft crimes: " + d.cartheft);
			
			d3.select("#total")
				.text("Total crimes: " + d.total);
	   
			//Show the tooltip
			d3.select("#tooltip").classed("hidden", false);

	   })
	   .on("mouseout", function() {
			circle
				.style("stroke-width", 0)
			//Hide the tooltip
			d3.select("#tooltip").classed("hidden", true);
			
	   })
	
	//Add the axes to the graph
	svg.append("g")
		.attr("class", "axes")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis);
		
	svg.append("g")
		.attr("class", "axes")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);
		
	// Add the text label for the x axis
	svg.append("text")
		.attr("class", "axis-labels")
		.attr("transform", "translate(" + (w / 2) + " ," + (h - 50) + ")")
		.style("text-anchor", "middle")
		.text("Number of prostitution crimes");

	// Add the text label for the Y axis
	svg.append("text")
		.attr("class", "axis-labels")
		.attr("transform", "rotate(-90)")
		.attr("y", 0)
		.attr("x",0 - (h / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.text("Number of vehicle theft crimes");
	
	//text label for the title	
	svg.append("text")
		.attr("id", "title")
		.attr("x", w/2)             
		.attr("y", padding/2)
		.attr("text-anchor", "middle")  
		.style("font-size", "22px") 
		.style("font-weight", "bold")  
		.text("Prostitution vs vehicle theft, San Fransisco, " + year);
	
	//Listen for click on the html element with id year2003 and set circle and label values based on 2003 data
	d3.select("#year2003").on("click", function() {
		d3.csv("data/2003_crime.csv", function(error, data) {

			if (error) {  //If error is not null, something went wrong.
			  console.log(error);  //Log the error.
			} else {      //If no error, the file loaded correctly. Yay!
			  console.log(data);   //Log the data.
			
			//Amend circle positions based on year data
			dataset = data
			var circles = svg.selectAll("circle").data(dataset)
			year = 2003
			//Add new values to the set
			circles.enter()
				.append("circle")
				.attr("cx", function(d) {
					return xScale(d.prostitution);
				})
				.attr("cy", function(d) {
					return yScale(d.cartheft);
				})
				.attr("r", function(d) {
					return rScale(d.total)
				})
			
			//transition existing values to their new places
			circles.transition()
				.delay(function(d, i) {
					return i / dataset.length * 1000;
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
					return rScale(d.total)
				})
			
			//remove the values no longer required by the data set
			circles.exit()
				.transition()
				.remove()
				
			d3.select("#title")
				.transition()
				.text("Prostitution vs vehicle theft, San Fransisco, " + year);

		}});
	})
	
	//Listen for click on the html element with id year2015 and set circle and label values based on 2015 data	
	d3.select("#year2015").on("click", function() {

		d3.csv("data/2015_crime.csv", function(error, data) {

			if (error) {  //If error is not null, something went wrong.
				console.log(error);  //Log the error.
			} else {      //If no error, the file loaded correctly. Yay!
				console.log(data);   //Log the data.
				//Include other code to execute after successful file load here
				dataset = data
			var circles = svg.selectAll("circle").data(dataset)
			year = 2015
			//Add new values to the set
			circles.enter()
				.append("circle")
				.attr("cx", function(d) {
					return xScale(d.prostitution);
				})
				.attr("cy", function(d) {
					return yScale(d.cartheft);
				})
				.attr("r", function(d) {
					return rScale(d.total)
				})
			
			//transition existing values to their new places
			circles.transition()
				.delay(function(d, i) {
					return i / dataset.length * 1000;
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
					return rScale(d.total)
				})
			
			//remove the values no longer required by the data set
			circles.exit()
				.transition()
				.remove()
				
			d3.select("#title")
				.transition()
				.text("Prostitution vs vehicle theft, San Fransisco, " + year);

		}});
	})

}

//Function to display the graph for 2C
function viz_2() {
	var margin = {top: 20, right: 120, bottom: 70, left: 100},
	w = 1200 - margin.left - margin.right,
	h = 300 - margin.top - margin.bottom;
		
	var crime = "prostitution";
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
				
			// Add the text label for the x axis
			svg.append("text")
				.attr("class", "axis-labels")
				.attr("transform", "translate(" + (w / 2) + " ," + (h + 50) + ")")
				.style("text-anchor", "middle")
				.text("Hour of the day");
			
			//text label for the title	
			svg.append("text")
				.attr("id", "title-2C")
				.attr("x", (w/2) - 60)             
				.attr("y", margin.top)
				.attr("text-anchor", "middle")  
				.style("font-size", "22px") 
				.style("font-weight", "bold")  
				.text("Number of " + crime + " crimes each hour");
			
		d3.select("#vehicle-theft")
			.on("click", function() {
				d3.csv("data/VEHICLE THEFT_crime_data.csv", function(error, data) {

					if (error) {  //If error is not null, something went wrong.
						console.log(error);  //Log the error.
					} else {      //If no error, the file loaded correctly.
						//console.log(data);   //Log the data.
						//Include other code to execute after successful file load here
						dataset = data
						yScale.domain([0, d3.max(dataset, function(d) { return parseFloat(d.total); })]);
						xScale.domain(d3.range(dataset.length));
						var bars = svg.selectAll("rect").data(dataset)
						crime = "vehicle theft"
						bars.enter()
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
						   
						bars.transition()
						   .delay(function(d, i) {
							   return i / dataset.length * 1000;
						   })
						   .duration(500)
						   .text(function(d) {
								return d.total;
						   })
						   .attr("x", function(d, i) {
								return xScale(i);
						   })
						   .attr("y", function(d) {
								return h - yScale(d.total);
						   })
						   .attr("width", xScale.rangeBand())
							.attr("height", function(d) {
								return yScale(d.total);
							});
						
						bars.exit()
							.transition()
							.duration(500)
							.attr("x", -xScale.rangeBand())
							.remove();
						
						var labels = svg.selectAll(".bar")
						.data(dataset);
						
						//Enter…
						labels.enter()
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
						
						//Update…
						labels.transition()
							.duration(500)
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
							
						//Exit…
						labels.exit()
							.transition()
							.duration(500)
							.attr("x", -xScale.rangeBand())
							.remove();
							
						d3.select("#title-2C")
							.transition()
							.text("Number of " + crime + " crimes each hour");

					   
					}
				})
			})
			d3.select("#prostitution1")
				.on("click", function() {
					d3.csv("data/PROSTITUTION_crime_data.csv", function(error, data) {
						if (error) {  //If error is not null, something went wrong.
							console.log(error);  //Log the error.
						} else {      //If no error, the file loaded correctly.
							//console.log(data);   //Log the data.
							//Include other code to execute after successful file load here
							dataset = data
						yScale.domain([0, d3.max(dataset, function(d) { return parseFloat(d.total); })]);
						xScale.domain(d3.range(dataset.length));
						var bars = svg.selectAll("rect").data(dataset)
						crime = "prostitution"
						bars.enter()
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
						   
						bars.transition()
						   .delay(function(d, i) {
							   return i / dataset.length * 1000;
						   })
						   .duration(500)
						   .attr("x", function(d, i) {
								return xScale(i);
						   })
						   .attr("y", function(d) {
								return h - yScale(d.total);
						   })
						   .attr("width", xScale.rangeBand())
							.attr("height", function(d) {
								return yScale(d.total);
							});
						
						bars.exit()
							.transition()
							.duration(500)
							.attr("x", -xScale.rangeBand())
							.remove();
						
						var labels = svg.selectAll(".bar")
						.data(dataset);
						
						//Enter…
						labels.enter()
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
						
						//Update…
						labels.transition()
							.duration(500)
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
							
						//Exit…
						labels.exit()
							.transition()
							.duration(500)
							.attr("x", -xScale.rangeBand())
							.remove();
						
						d3.select("#title-2C")
							.transition()
							.text("Number of " + crime + " crimes each hour");
							   
							}
						})
					})
}

//Display kmeans points on map for assigment 2D
function map_viz(data, k)
{				
	var circles = svg.selectAll("circle").data(data)
	
	circles.enter()
		.append("circle")
		.transition()
		.duration(0)
		.each("start", function() {      // <-- Executes at start of transition
		   d3.select(this)
		   .attr("cx", function(d) {
			   return projection([d.X, d.Y])[0];
		   })
		   .attr("cy", function(d) {
			   return projection([d.X, d.Y])[1];
		   })
		   .attr("r", function(d) {
				if(d.centroid == "True")
					return 10;
				else
					return 2;
		   })
			.style("stroke-width", function(d) {
				if(d.centroid == "True")
					return 3;
				else
					return 0;
			})    // set the stroke width
			.style("stroke", function(d) {
				if(d.centroid == "True")
					return "white";
				else
					return colour_array[d.k];
			})
		})
		.transition()
		.duration(0)
	   .attr("fill", function(d) {
			return colour_array[d.k];
		})
	   .style("opacity", function(d) {
			if(d.centroid == "True")
				return 1;
			else
				return 0.6;
	   })	
		   
	circles.transition()
		.duration(0)
		.each("start", function() {      // <-- Executes at start of transition
		   d3.select(this)
		   .attr("cx", function(d) {
			   return projection([d.X, d.Y])[0];
		   })
		   .attr("cy", function(d) {
			   return projection([d.X, d.Y])[1];
		   })
		   .attr("r", function(d) {
				if(d.centroid == "True")
					return 10;
				else
					return 2;
		   })
			.style("stroke-width", function(d) {
				if(d.centroid == "True")
					return 3;
				else
					return 0;
			})    // set the stroke width
			.style("stroke", function(d) {
				if(d.centroid == "True")
					return "white";
				else
					return colour_array[d.k];
			})
		})
		.transition()
		.delay(function(d, i) {
			return i / dataset.length * 5;
		})	
		.duration(500)
		.style("fill", function(d) {
			return colour_array[d.k];
		})

	
		circles.exit()
			.transition()
			.duration(1000)
			.style("opacity", 0)
			.remove();
		
		d3.select("#title-2D")
			.transition()
			.text("Clusters for " + k);
	
}
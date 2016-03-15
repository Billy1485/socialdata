function viz1() {	
	d3.select("#viz1-plot").selectAll("p")
	.data(dataset)
	.enter()
	.append("p")
	.text(function(d) {
		return "I can count up to " + d.value;
	})
	//});
}
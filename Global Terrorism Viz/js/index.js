d3.csv("data/clean/code_mapping.csv").then(function(data){
	cname = [];
	data.forEach(d=>{cname.push(d.country)});
	cname.sort();
	const countryList = d3.select('#country-input');
	countryList.append('option').text("All");
	cname.forEach(function (value) {
		countryList.append('option').text(value);
	});
	$('.chosen').trigger("chosen:updated");
});
var dataTime = d3.range(0, 41).map(function(d) {
    return new Date().setFullYear(1978 + d);
  });
var sliderRange = d3
	.sliderBottom()
	.min(d3.min(dataTime))
	.max(d3.max(dataTime))
	.step(1000 * 60 * 60 * 24 * 365)
	.width(1475)
	.tickFormat(d3.timeFormat('%Y'))
	.tickValues(dataTime)
	.default([new Date().setFullYear(2014),new Date().setFullYear(2017)])
	.fill('rgb(148, 0, 211)')
	.on('onchange', val => {
		//console.log(val.map(d3.timeFormat('%Y')));
		var range = val.map(d3.timeFormat('%Y'));
		d3.select('p#type-input').text(val.map(d3.timeFormat('%Y')).join('-'));
		//console.log(typeof (parseInt(range[0])));
		$('.year').removeClass('active-year selected-year');
		for(var i=range[0];i<=range[1];i++){
			$("#year-"+i).addClass("active-year selected-year")
		}
		$("#map").empty();
		WORLDMAP.update(range);
		//SPIRAL.update(range,country);
	});

var gRange = d3
	.select('div#slider-range')
	.append('svg')
	.attr('width', 1515)
	.attr('height', 100)
	.append('g')
	.attr('transform', 'translate(20,20)');

gRange.call(sliderRange);
$("#country-input").change(function () {
	var range = $("#type-input").text();
	var rangeArr = new Array();
	rangeArr = range.split("-");
	$("#map").empty();
	WORLDMAP.update(rangeArr);
});
$("#terror-input").change(function () {
	console.log("change");
	var range = $("#type-input").text();
	var rangeArr = new Array();
	rangeArr = range.split("-");
	$("#terrordetails").empty();
	TERROR.update(rangeArr);
});
//populate drop down here
WORLDMAP.init();
TERROR.init();

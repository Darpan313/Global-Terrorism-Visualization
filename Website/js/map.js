var WORLDMAP = {
    data: {},
    world_data: {},
    country_data: {},
    city_data: {},
    terror_data: {},
    update: function (range) {
        var formatNumber = d3.format(",");
        var country = $("#country-input").val();
        this.world_data = {};
        this.country_data = {};
        this.city_data = {};
        this.terror_data = {};
        $("#map").empty();
        s_year = range[0]
        e_year = range[1]
        this.world_data = {};
        s_year = typeof s_year != "undefined" ? s_year : 2014;
        e_year = typeof e_year != "undefined" ? e_year : 2017;

        var totalKilled = 0;
        var totalIncidents = 0;
        for (var i = 0; i < data.length; i++) {
            var flag = false;
            if ((data[i].iyear >= s_year) && (data[i].iyear <= e_year)) {
                if (data[i].country_code != null) {
                    totalKilled += data[i].nkill;
                    totalIncidents+=1;
                    if (this.world_data[data[i].country_code] == null) {
                        this.world_data[data[i].country_code] = data[i].nkill;

                    } else {
                        this.world_data[data[i].country_code] = data[i].nkill + this.world_data[data[i].country_code];
                    }

                    if (this.country_data[data[i].country_txt] == null) {
                        this.country_data[data[i].country_txt] = data[i].nkill;

                    } else {
                        this.country_data[data[i].country_txt] = data[i].nkill + this.country_data[data[i].country_txt];
                    }

                    if (this.city_data[data[i].city] == null) {
                        this.city_data[data[i].city] = data[i].nkill;

                    } else {
                        this.city_data[data[i].city] = data[i].nkill + this.city_data[data[i].city];
                    }

                    if (this.terror_data[data[i].gname] == null) {
                        this.terror_data[data[i].gname] = data[i].nkill;

                    } else {
                        this.terror_data[data[i].gname] = data[i].nkill + this.terror_data[data[i].gname];
                    }
                }
            }
        }
        ;
        if (country != "All") {
            this.country_data = {};
            this.city_data = {};
            this.terror_data = {};
            totalKilled = 0;
            totalIncidents = 0;
            for (var i = 0; i < data.length; i++) {
                if ((data[i].iyear >= s_year) && (data[i].iyear <= e_year) && (data[i].country_txt == country)) {
                    totalKilled += data[i].nkill;
                    totalIncidents +=1;
                    if (this.country_data[data[i].country_txt] == null) {
                        this.country_data[data[i].country_txt] = data[i].nkill;

                    } else {
                        this.country_data[data[i].country_txt] = data[i].nkill + this.country_data[data[i].country_txt];
                    }

                    if (this.city_data[data[i].city] == null) {
                        this.city_data[data[i].city] = data[i].nkill;

                    } else {
                        this.city_data[data[i].city] = data[i].nkill + this.city_data[data[i].city];
                    }

                    if (this.terror_data[data[i].gname] == null) {
                        this.terror_data[data[i].gname] = data[i].nkill;

                    } else {
                        this.terror_data[data[i].gname] = data[i].nkill + this.terror_data[data[i].gname];
                    }
                }
            }

        }
        //console.log(this.country_data);
        //console.log(totalKilled)
        var country_table = [];
        for (var key in this.country_data) {
            var temp = new Array();
            temp.push(key);
            temp.push(this.country_data[key]);
            country_table.push(temp);
        }
        //console.log(country_table);
        $('#country-tab').DataTable({
            destroy: true,
            data: country_table,
            "pageLength": 8,
            "pagingType": "simple",
            "lengthChange": false,
            columns: [
                {title: "Country"},
                {title: "Deaths"},
            ]
        });
        var city_table = [];
        for (var key in this.city_data) {
            var temp = new Array();
            temp.push(key);
            temp.push(this.city_data[key]);
            city_table.push(temp);
        }
        $('#city-tab').DataTable({
            destroy: true,
            data: city_table,
            "pageLength": 8,
            "pagingType": "simple",
            "lengthChange": false,
            columns: [
                {title: "City"},
                {title: "Deaths"},
            ]
        });
        var terror_table = [];
        for (var key in this.terror_data) {
            var temp = new Array();
            temp.push(key);
            temp.push(this.terror_data[key]);
            terror_table.push(temp);
        }
        $('#terror-tab').DataTable({
            destroy: true,
            data: terror_table,
            "pageLength": 8,
            "pagingType": "simple",
            "lengthChange": false,
            columns: [
                {title: "Terror Group"},
                {title: "Killed"},
            ]
        });
        tname = []
        terror_table.sort(function (a,b) {
                return parseInt(b[1])-parseInt(a[1]);
        });
        var ttotal = 0;
        for(var i = 0;i<terror_table.length;i++){
            tname.push(terror_table[i][0]);
            ttotal+=1;
        }
        d3.select('p#teetotal #tval').text(" " + formatNumber(ttotal));
        const terrorList = d3.select('#terror-input');
        $("#terror-input").empty();
        terrorList.append('option').text("All");
        tname.forEach(function (value) {
            terrorList.append('option').text(value);
        });
        $('.chosen').trigger("chosen:updated");
        d3.select('p#total #val').text(" " + formatNumber(totalKilled));
        d3.select('p#totalincidents #ival').text(" " + formatNumber(totalIncidents));
        //console.log(this.world_data);
        const projection = d3.geoEquirectangular()
            .scale(1200 / Math.PI / 2)  // 960 pixels over 2 π radians
            .translate([500, 300]);
        const path = d3.geoPath().projection(projection);
        var colorScheme = d3.schemeReds[6];
        colorScheme.unshift("#eee")
        //var colorScale = d3.interpolateRdPu
        Promise.all([d3.json("data/topojson/world-110m.geojson"), this.world_data])
            .then(d => ready(null, d[0], d[1]));

        function ready(error, data, gtd) {
            //var colorScale = ramp(d3.scaleSequential(["blue", "green"])).domain([d3.min(d3.values(gtd)),d3.max(d3.values(gtd))])
            var colorScale = d3.scaleThreshold()
                .domain([
                    100,
                    500,
                    1000,
                    10000,
                    30000,
                    90000
                ])
                .range([
                    'rgb(224, 176, 255)',
                    'rgb(223, 115, 255)',
                    'rgb(218, 112, 214)',
                    'rgb(223, 0, 255)',
                    'rgb(148, 0, 211)',
                    'rgb(136, 0, 133)',
                ]);

            data.features.forEach(d => {
                d.nkill = gtd[d.id];
            });
            svg = d3.select("div#map").append("svg").attr("width", 1024).attr("height", 500);
            svg.append("g")
                .attr("class", "countries")
                .selectAll("path")
                .data(data.features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function (d) {
                    if (gtd[d.id] != null) {
                        return colorScale(gtd[d.id]);
                    } else {
                        return '#DDDDDD';
                    }
                })
                .on('mouseover', function (d) {
                    tip.show(d);
                    d3.select(this)
                        .style("opacity", 1)
                        .style("stroke", "#522d5b")
                        .style("stroke-width", 1.5);
                })
                .on('mouseout', function (d) {
                    tip.hide(d);
                    d3.select(this)
                        .style("opacity", 0.8)
                        .style("stroke", "white")
                        .style("stroke-width", 0.3);
                })
                .style('stroke', 'white')
                .style('opacity', 0.8)
                .style('stroke-width', 0.3);
            svg.append('path')
                .datum(topojson.mesh(data.features, (a, b) => a.id !== b.id))
                .attr('class', 'names')
                .attr('d', path);
            var g = svg.append("g")
                .attr("class", "legendThreshold")
                .attr("transform", "translate(0,345)");
            g.append("text")
                .attr("class", "caption")
                .attr("x", 0)
                .attr("y", -6)
                .text("Total deaths")
                .style("font-weight", "bold");
            var labels = ['0-100', '100-500', '500-1k', '1k-10k', '10k-30k', '>30k'];
            var legend = d3.legendColor()
                .labels(function (d) {
                    return labels[d.i];
                })
                .shapePadding(4)
                .scale(colorScale);
            svg.select(".legendThreshold")
                .call(legend);


            var tip = d3.tip().attr('class', 'd3-tip').direction('e').offset([0, 5])
                .html(function (d) {
                    //console.log(d);
                    var content = "<span style='margin-left: 2.5px;'><b>" + d.properties.name + "</b></span><br>";
                    content += `
                    <table style="margin-top: 2.5px;">
                    <tr><td>Total deaths: </td><td style="text-align: right">` + d.nkill + `</td></tr>
                    </table>
                    `;
                    return content;
                });
            svg.call(tip);
        }
        TERROR.update(range);
    },


    init: function () {
        $("#map").empty();
        d3.csv("data/clean/gtd_final.csv").then(function (data) {
            this.data = data;
            data.forEach(function (d) {
                d.iyear = +d.iyear;
                d.nkill = +d.nkill;
            });
            //console.log(data);
            WORLDMAP.update([2014, 2017])
        });

    }
};

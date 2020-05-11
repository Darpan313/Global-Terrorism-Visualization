var TERROR = {
    data: {},
    attack_type: {},
    target_type: {},
    weapon_type: {},
    update: function (range) {
        var formatNumber = d3.format(",");
        this.attack_type= {};
        this.target_type= {};
        this.weapon_type= {};
        var country = $("#country-input").val();
        var terrorgroup = $("#terror-input").val();
        s_year = range[0]
        e_year = range[1]
        var totalAttacks = 0;
        var kill = 0;
        if (country == "All" && terrorgroup == "All") {
            for (var i = 0; i < data.length; i++) {
                if ((data[i].iyear >= s_year) && (data[i].iyear <= e_year)) {
                    if (data[i].country_code != null) {
                        totalAttacks += 1;
                        kill += data[i].nkill;
                        if (this.attack_type[data[i].attacktype1_txt] == null) {
                            this.attack_type[data[i].attacktype1_txt] = 1;

                        } else {
                            this.attack_type[data[i].attacktype1_txt] = 1 + this.attack_type[data[i].attacktype1_txt];
                        }

                        if (this.target_type[data[i].targtype1_txt] == null) {
                            this.target_type[data[i].targtype1_txt] = 1;

                        } else {
                            this.target_type[data[i].targtype1_txt] = 1 + this.target_type[data[i].targtype1_txt];
                        }

                        if (this.weapon_type[data[i].weaptype1_txt] == null) {
                            this.weapon_type[data[i].weaptype1_txt] = 1;

                        } else {
                            this.weapon_type[data[i].weaptype1_txt] = 1 + this.weapon_type[data[i].weaptype1_txt];
                        }
                    }
                }
            }
        } else if (country == "All" && terrorgroup != "All") {
            //totalAttacks = 0;
            for (var i = 0; i < data.length; i++) {
                if ((data[i].iyear >= s_year) && (data[i].iyear <= e_year) && (data[i].gname==terrorgroup)) {
                    if (data[i].country_code != null) {
                        totalAttacks += 1;
                        kill += data[i].nkill;
                        if (this.attack_type[data[i].attacktype1_txt] == null) {
                            this.attack_type[data[i].attacktype1_txt] = 1;

                        } else {
                            this.attack_type[data[i].attacktype1_txt] = 1 + this.attack_type[data[i].attacktype1_txt];
                        }

                        if (this.target_type[data[i].targtype1_txt] == null) {
                            this.target_type[data[i].targtype1_txt] = 1;

                        } else {
                            this.target_type[data[i].targtype1_txt] = 1 + this.target_type[data[i].targtype1_txt];
                        }

                        if (this.weapon_type[data[i].weaptype1_txt] == null) {
                            this.weapon_type[data[i].weaptype1_txt] = 1;

                        } else {
                            this.weapon_type[data[i].weaptype1_txt] = 1 + this.weapon_type[data[i].weaptype1_txt];
                        }
                    }
                }
            }
        } else if (country != "All" && terrorgroup != "All") {
            for (var i = 0; i < data.length; i++) {
                if ((data[i].iyear >= s_year) && (data[i].iyear <= e_year) && (data[i].gname==terrorgroup) && (data[i].country_txt==country)) {
                    if (data[i].country_code != null) {
                        totalAttacks += 1;
                        kill += data[i].nkill;
                        if (this.attack_type[data[i].attacktype1_txt] == null) {
                            this.attack_type[data[i].attacktype1_txt] = 1;

                        } else {
                            this.attack_type[data[i].attacktype1_txt] = 1 + this.attack_type[data[i].attacktype1_txt];
                        }

                        if (this.target_type[data[i].targtype1_txt] == null) {
                            this.target_type[data[i].targtype1_txt] = 1;

                        } else {
                            this.target_type[data[i].targtype1_txt] = 1 + this.target_type[data[i].targtype1_txt];
                        }

                        if (this.weapon_type[data[i].weaptype1_txt] == null) {
                            this.weapon_type[data[i].weaptype1_txt] = 1;

                        } else {
                            this.weapon_type[data[i].weaptype1_txt] = 1 + this.weapon_type[data[i].weaptype1_txt];
                        }
                    }
                }
            }
        }else if (country != "All" && terrorgroup == "All") {
            for (var i = 0; i < data.length; i++) {
                if ((data[i].iyear >= s_year) && (data[i].iyear <= e_year) && (data[i].country_txt==country)) {
                    if (data[i].country_code != null) {
                        totalAttacks += 1;
                        kill += data[i].nkill;
                        if (this.attack_type[data[i].attacktype1_txt] == null) {
                            this.attack_type[data[i].attacktype1_txt] = 1;

                        } else {
                            this.attack_type[data[i].attacktype1_txt] = 1 + this.attack_type[data[i].attacktype1_txt];
                        }

                        if (this.target_type[data[i].targtype1_txt] == null) {
                            this.target_type[data[i].targtype1_txt] = 1;

                        } else {
                            this.target_type[data[i].targtype1_txt] = 1 + this.target_type[data[i].targtype1_txt];
                        }

                        if (this.weapon_type[data[i].weaptype1_txt] == null) {
                            this.weapon_type[data[i].weaptype1_txt] = 1;

                        } else {
                            this.weapon_type[data[i].weaptype1_txt] = 1 + this.weapon_type[data[i].weaptype1_txt];
                        }
                    }
                }
            }
        }
        console.log(totalAttacks);
        d3.select('p#totalDeathsByTerror #dvalue').text(" " + formatNumber(kill));
        d3.select('p#totalAttacksByTerror #avalue').text(" " + formatNumber(totalAttacks));
        var tempArr = [];
        var temp1 = [];
        for (var key in this.attack_type) {
            var tempDict = {};
            tempDict["area"] = key;
            tempDict["value"] = (this.attack_type[key]/totalAttacks)*100;
            tempArr.push(tempDict)
        }
        temp1.push(tempArr);

        tempArr = [];
        var temp2 = [];
        for (var key in this.target_type) {
            var tempDict = {};
            tempDict["area"] = key;
            tempDict["value"] = (this.target_type[key]/totalAttacks)*100;
            tempArr.push(tempDict)
        }
        temp2.push(tempArr);

        tempArr = [];
        var temp3 = [];
        for (var key in this.weapon_type) {
            var tempDict = {};
            tempDict["area"] = key;
            tempDict["value"] = (this.weapon_type[key]/totalAttacks)*100;
            tempArr.push(tempDict)
        }
        temp3.push(tempArr);
        var width = 300,
            height = 300;

// Config for the Radar chart
        var config = {
            w: width,
            h: height,
            maxValue: 100,
            levels: 4,
            ExtraWidthX: 300
        }

//Call function to draw the Radar chart

        RadarChart.draw("div#target-type", temp2, config);

        var svg = d3.select('div#target-type')
            .selectAll('svg')
            .append('svg')
            .attr("width", width)
            .attr("height", height);

        RadarChart.draw("div#attack-type", temp1, config);

        var svg = d3.select('div#attack-type')
            .selectAll('svg')
            .append('svg')
            .attr("width", width)
            .attr("height", height);

        RadarChart.draw("div#weapon-type", temp3, config);

        var svg = d3.select('div#weapon-type')
            .selectAll('svg')
            .append('svg')
            .attr("width", width)
            .attr("height", height);
    },
    init: function () {
        $("#terrordetails").empty();
        d3.csv("data/clean/gtd_final.csv").then(function (data) {
            this.data = data;
            data.forEach(function (d) {
                d.iyear = +d.iyear;
                d.nkill = +d.nkill;
            });
        });
    }
};

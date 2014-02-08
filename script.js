

	function Column(id, label, type) {this.id=id; this.label=label; this.type=type;};
	function Row() {};
	function Cell(v) {this.v = v;}
	
	var curve = {
		data_tbl: {cols: [], rows: [], reset: function(){ this.cols = []; this.rows=[];} },
		segment: {}, /* object to hold the calculation data for each segment */
		forecast_oil: {}, // object to hold the result of build_segment for oil only
		forecast_gas: {}, // same as above for gas
		forecast_ngl: {}, // ngl
		forecast_water: {}, // water
		history_oil: {}, // historical data for oil; ajax query of database
		history_gas: {}, // gas
		history_ngl: {}, // likely blank
		history_water: {}, // water
		
		
		// takes segement data and adds it to the forecast for the specified phase

		build_segment: function(Phase, Qi, start_dt, b_factor, decline_i, dec_term, term) {
		//test
		//console.log(Phase);
		//necessary variables
		days_per_month = 30.4;
		rate_initial = parseFloat(Qi);  //required data for formula
		rate = parseFloat(Qi);		//while loop counter for now
		//dt = new Date(start_dt.split("-")[0],start_dt.split("-")[1]-1,start_dt.split("-")[2]);
		b_fac = parseFloat(b_factor);
		//console.log("b-fac=" + b_fac);
		decline_initial = parseFloat(decline_i)/100;
		//console.log(decline_initial);
		nom_decline_numerator = (Math.pow((1 - decline_initial), (-1 * b_fac)) - 1);
		//console.log(nom_decline_numerator);
		nom_decline = nom_decline_numerator / b_fac;
		//console.log(nom_decline);
		month = 0;
	
		if (Phase === "Oil"){
			col1 = new Column("Date", "Month", 'date');
			curve.data_tbl.cols.push(col1);
			col2 = new Column(Phase, Phase +" ("+curve.segment.Units+")", 'number');
			curve.data_tbl.cols.push(col2);
			while (rate > parseFloat(term)) {
				row1 = new Row();
				row1.c = [];
				row1.c.push(new Cell(new Date(start_dt.split("-")[0],start_dt.split("-")[1]-1 + month,start_dt.split("-")[2])));
				row1.c.push(new Cell(rate * days_per_month));
				curve.data_tbl.rows.push(row1);
				
				month += 1;
				
				rate = rate_initial / Math.pow(1 + b_fac * (month / 12) * nom_decline, (1/b_fac));
				
			}


		}
		else {
			console.log("Feature not implemented yet!");
		} //eventually same loop for other phases		
	
	
	}
	};

google.load('visualization', '1.0', {'packages':['corechart']});
	function drawChart() {
			var data = new google.visualization.DataTable(curve.data_tbl);
			var options = {'title':'Volumes','width':800,'height':600};
			var chart = new google.visualization.LineChart(document.getElementById('graph'));
        		chart.draw(data, options);
		};
		

$(document).ready(function() {
	

	$("#calc").click(function () {
		$(":input").each(function(){
		curve.segment[$(this).attr("id")] = $(this).val();
		
		});
		curve.data_tbl.reset();
		curve.build_segment(curve.segment.Phase, curve.segment.qi, curve.segment.start_dt, curve.segment.b_factor, curve.segment.Decline, curve.segment.Terminal, 10);	
		drawChart();
		

		
		
	});

});


	

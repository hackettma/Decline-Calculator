$(document).ready(function() {
	$(".number").mousedown(function () {
		$(this).css("border-style", "inset");
		
	});
	$(".number").mouseup(function () {
		$(this).css("border-style", "outset");
		var updatenum = takeNumberInput($(this).text());
		$("#output p").html("<p>"+updatenum+"</p>");
	});
	$(".operator").mousedown(function () {
		$(this).css("border-style", "inset");
	});
	$(".operator").mouseup(function () {
		$(this).css("border-style", "outset");
		var updateoper = takeOperatorInput($(this).text());
		$("#output p").html("<p>"+updateoper+"</p>");
	});
});

var outputtext = "0.0";
var operand1_set = false;
var operand2_set = false;
var operator_set = false;
var operand1 = 0;
var operand2 = 0;
var operand2_str = "0";
var operator = "+";

var takeNumberInput = function(num_Text) {
	if (operand1_set) {
		if(operand2_str === "0"){
			operand2_str = num_Text;
		}
		else {
			operand2_str = operand2_str + num_Text;
		}
		outputtext = outputtext + num_Text;	 
		operand2 = parseFloat(operand2_str);
	}
	else {
		
		if (outputtext === "0.0"){
			outputtext = num_Text;
		}
		else {
			outputtext = outputtext + num_Text;
		}
		operand1 = parseFloat(outputtext);
	}

	return outputtext;
};

var takeOperatorInput = function(oper_text) {
	if (oper_text === "=") {
		outputtext = Evaluate_Inputs(operand1, operand2, operator);
	}
	else if (operand2 != 0) {
		operator = oper_text;
		var newval = parseFloat(Evaluate_Inputs(operand1, operand2, operator));
		operand1 = newval;
		operand2 = 0;
		operand2_str = "0";
		outputtext = operand1 + " " + oper_text + " ";
	}
	else {
		operand1_set = true;
		outputtext = operand1 + " " + oper_text + " ";		
	}
	
	return outputtext;

};

var Evaluate_Inputs = function(num1, num2, opernd) {
	switch (opernd) {
	
	case "+" :
		result = String(num1+num2);
		break;

	case "-" :
		result = String(num1-num2);
		break;

	case "*" :
		result = String(num1*num2);
		break;

	case "/" :
		result = String(num1*num2);
		break;	
	}
	return result;

	
};	
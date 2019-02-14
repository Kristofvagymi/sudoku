$(document).ready(function(){
	var $table = $( '<table id="table" border="1"></table>');
	
	for (var i = 0; i < 9; i++) {
		if( (i + 1) % 3 === 0){
			var $tr = $('<tr style="border-bottom:3pt solid black;"></tr>');
		}else{
			if(i===0){
				var $tr = $('<tr style="border-top:3pt solid black;"></tr>');
			}else{
				var $tr = $('<tr></tr>');
			}
		}
		for (var j = 0; j < 9; j++) { 
			var id = i * 9 + j;
			if( (j + 1) % 3 === 0){
				var $input = ('<input style="border-right:3pt solid black;" maxlength="1" onkeypress="isValidInput(this.id)" onkeyup="isValidInput(this.id)" id="'+id+'"/>');
			}else{
				if(j===0){
					var $input = ('<input style="border-left:3pt solid black;" maxlength="1" onkeypress="isValidInput(this.id)" onkeyup="isValidInput(this.id)" id="'+id+'"/>');
				}else{
					var $input = ('<input maxlength="1" onkeypress="isValidInput(this.id)" onkeyup="isValidInput(this.id)" id="'+id+'"/>');
				}
			}
			var $td = $('<td></td>').append($input);
			$tr.append($td);
		}
		$table.append($tr);
	}
	$(".table-container").append($table);
});

function isValidInput(id){
	var inputField = $("#"+id);
	if(!inputField.val().match(/^\d+$/)){
		inputField.val("");
	}
}

function validateFields(){
	var numbersInTable = new Array(9);
	for (var i = 0; i < 9; i++) {
		numbersInTable[i] = new Array(9);
	}
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			var inputField = $("#"+ (i*9+j));
			if(inputField.val()==undefined){
				var arrayObject = {sureValue:0};
				numbersInTable[i][j] = arrayObject;
			} else if(!inputField.val().match(/^\d+$/)){
				inputField.val("");
				var arrayObject = {sureValue:0};
				numbersInTable[i][j] = arrayObject;
			} else {
				var arrayObject = {sureValue:Number(inputField.val())}
				numbersInTable[i][j] = arrayObject;
			}
		}
	}
	return numbersInTable;
}

function tryObviusSollution(numbersInTable){

}

function tryToComplete(){
	var numbersInTable = validateFields();
	$.ajax({
		type:"POST",
		dataType:"json",
		contentType: "application/json",
		data:JSON.stringify({data: JSON.stringify(numbersInTable)}),
		url:"solve",
	})
	.done(function(response){
		  console.log("Response of update: ",response)
	})
	.fail(function(xhr, textStatus, errorThrown){
		  console.log("ERROR: ",xhr.responseText)
		  return xhr.responseText;
	});
}
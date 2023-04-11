/// <reference path="../Core2/Core2.js" />

var DB = "MasterControl";
var FN = "AdminDocCtrl.html";

$("document").ready(function () {
	$.Core(true);
	//SeriesSummarySelect();
	//$("#SeriesSearch").select();
	Demo();
});


function Demo() {
	$.CoreTabSelect("RouteSummary");
	RouteSummarySelect();
	$("#RouteID").text(2);
	RouteDefinitionSelect();
	RouteDetailDisplay(true);
	$.CoreTabSelect("StepSummary");
	StepDetailDisplay(true);
}


//#region AppTabDiv 

$("#AppTabDiv span").click(function () {
	window[(this.id + "Select")]();
});


//#endregion


//#region SeriesSummaryDiv

$("#SeriesNew").click(function () {
	SeriesDefinitionClear();
	SeriesDetailDisplay(true);
	$("#SeriesName").select();
});

$("#SeriesSearch").keyup(function (e) {
	if (e.keyCode == 13) {
		SeriesSummarySelect();
	}
});

$("#SeriesBodyTable").on("click", "tr", function () {
	$("#SeriesID").text(this.id);
	SeriesDefinitionSelect();
	SeriesDetailDisplay(true);
});

function SeriesSummarySelect() {
	$.CoreDataPage(DB, FN, "Access", "SeriesSummaryReturn", "R2018_SeriesSummarySelect", "SeriesBodyDiv", "Large", "None", { "Search": $("#SeriesSearch").val() });
}

function SeriesSummaryReturn(msg) {
	var markup = "";
	$.each(msg[0], function (key) {
		var d = msg[0][key];
		var State = d["SeriesActive"] == "True" ? "green" : "red";
		markup += "<tr id='" + d["SeriesID"] + "' class='Hover'>" +
					"<td class='SS0'><div style='background-color:" + State + "; color:" + State + ";'>-</div></td>" +
					"<td class='SS1'><div>" + d["SeriesName"] + "</div></td>" +
					"<td class='SS2'><div>" + d["SeriesMask"] + "</div></td>" +
					"<td class='SS3'><div>" + d["SeriesHits"] + "</div></td>" +
					"<td class='SS4'><div>" + d["SeriesLastUsed"] + "</div></td>" +
				"</tr>";
	});
	$("#SeriesBodyTable tbody").html(markup);
	$("#SeriesSearch").select();
}
//#endregion


//#region SeriesDetailDiv 

$("#SeriesDetailClose").click(function () {
	SeriesDefinitionClear();
	SeriesSummarySelect()
	SeriesDetailDisplay(false);
});


function SeriesDetailDisplay(State) {
	$("#SeriesDetailDiv").css("display", State ? "block" : "none");
}

function SeriesDefinitionClear() {
	$("#SeriesTitle").text("Series Title");
	$.CoreClear("SeriesDefinitionEdit", "SeriesID");
	$("#FixedBtn").css("color", "red").removeAttr("disabled");
	$("#AutoBtn").css("color", "green").removeAttr("disabled");
	$("#TextBtn").css("color", "blue").removeAttr("disabled");
	$("#SelectBtn").css("color", "purple").removeAttr("disabled");

}

//#endregion 


//#region MaskSummaryDiv 

$(".MaskBtn").click(function () {
	MaskDetailFill(this.value);
});


$("#SeriesMask").on("click", "span", function () {
	var CurrentClass=$(this).attr("class");
	$("#MaskID").text(this.id);
	switch (CurrentClass) {
		case "Fixed": $("#MaskValue").val($(this).text()); break;
		case "Auto": $("#MaskValue").val($(this).text()); break;
		case "Text": $("#MaskValue").val($("#SeriesText").val()); break;
		case "Select": $("#MaskValue").val($("#SeriesList").val()); break;
	}
	$("#MaskDetailContainer").removeClass("Fixed").removeClass("Auto").removeClass("Text").removeClass("Select").addClass(CurrentClass);
	MaskDetailDisplay(true);
});


$("#SeriesSave").click(function () {
	var P = $.CoreRead("SeriesDefinitionEdit", "SeriesID");
	P["SeriesMask"] = $("#SeriesMask").html();
	P["SeriesExample"] = $("#SeriesExample").html();
	$.CoreDataSave(DB, FN, "Access", "SeriesSaveReturn", "R2018_SeriesDefinitionSave", P);
});

$("#SeriesCancel").click(function () {
	SeriesSummarySelect();
	SeriesDefinitionClear();
	SeriesDetailDisplay(false);
	
});

function SeriesSaveReturn(msg) {
	SeriesSummarySelect();
	SeriesDetailDisplay(false);
	SeriesDefinitionClear();
}

function SeriesDefinitionSelect() {
	$.CoreDataSelect(DB, FN, "Access", "SeriesDefinitionReturn", "R2018_SeriesDefinitionSelect", "None", { "SeriesID": $("#SeriesID").text() });
}

function SeriesDefinitionReturn(msg) {
	$("#SeriesID").data("Original", msg[0][0]);
	SeriesDefinitionWrite();
}

function SeriesDefinitionWrite() {
	var d = $("#SeriesID").data("Original");
	$.CoreWrite(d);
	$("#SeriesTitle").text(d["SeriesName"]);
	$("#SeriesMask").html(d["SeriesMask"]);
	$("#SeriesExample").html(d["SeriesExample"]);
	SeriesButtonState();
}

	function MaskDetailFill(CurrentClass) {
		$("#MaskDetailContainer").removeClass("Fixed").removeClass("Auto").removeClass("Text").removeClass("Select").addClass(CurrentClass);
		switch (CurrentClass) {
			case "Fixed": $("#MaskLabel").text("Enter fixed characters"); break;
			case "Auto": $("#MaskLabel").text("Enter a seed value"); break;
			case "Text": $("#MaskLabel").text("Enter the maximum number of text characters that could be entered"); break;
			case "Select": $("#MaskLabel").text("Create a list by typing each value seperated by commas"); break;
		}
		MaskDetailDisplay(true);
		$("#MaskValue").select();
	}


	//#endregion


//#region MaskDetailDiv 

	$("#MaskDetailClose").click(function () {
		MaskDetailDisplay(false);
	});


	$("#MaskValue").keyup(function (e) {
		if (e.keyCode == 13) {
			MaskBuild();
		}
	});

	$("#MaskSave").click(function () {
		MaskBuild();
	});

	$("#MaskDelete").click(function () {
		var ID = $("#MaskID").text();
		var CurrentClass = ($("#SeriesMask span[id=" + ID + "]").attr("class"));
		switch (CurrentClass) {
			case "Fixed":
				$("#SeriesMask span[id=" + ID + "]").remove();
				$("#SeriesExample span[id=" + ID + "]").remove();
				break;
			case "Auto":
				$("#SeriesMask span[id=" + ID + "]").remove();
				$("#SeriesExample span[id=" + ID + "]").remove();
				$("#SeriesSeed").val("");
				break;
			case "Text":
				$("#SeriesMask span[id=" + ID + "]").remove();
				$("#SeriesExample input[id=" + ID + "]").remove();
				$("#SeriesText").val("");
				break;
			case "Select":
				$("#SeriesMask span[id=" + ID + "]").remove();
				$("#SeriesExample select[id=" + ID + "]").remove();
				$("#SeriesList").val("");
				break;
		}
		MaskDetailDisplay(false);
	});


	function MaskDetailDisplay(State) {
		$("#MaskDetailDiv").css("display", State ? "block" : "none");
		if (State) {
			$("#MaskValue").select();
		} else{
			$("#MaskValue").val("");
			$("#MaskID").text(0);
		}
		SeriesButtonState();
	}


	function SeriesButtonState() {
		if ($("#SeriesMask span[class*=Auto]").length > 0) {
			$("#AutoBtn").attr("disabled", "disabled").css("color", "#CCCCCC");
		} else {
			$("#AutoBtn").removeAttr("disabled", "disabled").css("color", "green");
		}
		if ($("#SeriesMask span[class*=Text]").length > 0) {
			$("#TextBtn").attr("disabled", "disabled").css("color", "#CCCCCC");
		} else {
			$("#TextBtn").removeAttr("disabled", "disabled").css("color", "blue");
		}
		if ($("#SeriesMask span[class*=Select]").length > 0) {
			$("#SelectBtn").attr("disabled", "disabled").css("color", "#CCCCCC");
		} else {
			$("#SelectBtn").removeAttr("disabled", "disabled").css("color", "purple");
		}
	}

	function MaskBuild() {
	
		if ($("#MaskValue").val().length == 0) {
			alert("You must enter a value to apply.");
		} else {
			if ($("#MaskID").text() != 0) {
				UpdateMask();
			}
			else {
				var MaxID = 0;
				$("#SeriesMask span").each(function () {
					if (this.id > MaxID) { MaxID = this.id }
				});
				MaxID = parseInt(MaxID) + 1;
				var CurrentClass = $.trim($("#MaskDetailContainer").attr("class").replace("ModalContainer", ""));
				var Value = $("#MaskValue").val();
				var Mask = $("#SeriesMask").html();
				var Example = $("#SeriesExample").html();
				switch (CurrentClass) {
					case "Fixed":
						Mask += "<span id='" + MaxID + "' class='" + CurrentClass + "'>" + Value + "</span>";
						Example += "<span id='" + MaxID + "'>" + Value + "</span>"; break;
					case "Auto":
						Mask += "<span id='" + MaxID + "' class='" + CurrentClass + "'>" + Value + "</span>";
						Example += "<span id='" + MaxID + "'>" + Value + "</span>";
						$("#SeriesSeed").val(Value); break;
					case "Text":
						Mask += "<span id='" + MaxID + "' class='" + CurrentClass + "'>Text</span>"; 
						Example += "<input  id='" + MaxID + "' type='text' maxlength='" + Value + "' style='width: " + (Value * 15) + "px; text-align:center;' />";
						$("#SeriesText").val(Value); break;
					case "Select":
						Mask += "<span id='" + MaxID + "' class='" + CurrentClass + "'>List</span>"; 
						Example += "<select id='" + MaxID + "' style='height:20px; text-align:center;'><option>" + Value.replace(/,/g, "</option><option>").replace(/ /g, "") + "</option></select>";
						$("#SeriesList").val(Value); break;
				}

				$("#SeriesMask").html(Mask);
				$("#SeriesExample").html(Example);
			}
			MaskDetailDisplay(false);
		}
	}


	function UpdateMask() {
		var ID = $("#MaskID").text();
		var Value = $("#MaskValue").val();
		var CurrentClass = ($("#SeriesMask span[id=" + ID + "]").attr("class"));
		switch (CurrentClass) {
			case "Fixed":
				$("#SeriesMask span[id=" + ID + "]").text(Value);
				$("#SeriesExample span[id=" + ID + "]").text(Value); break;
			case "Auto":
				$("#SeriesMask span[id=" + ID + "]").text(Value); 
				$("#SeriesExample span[id=" + ID + "]").text(Value); 
				$("#SeriesSeed").val(Value); break;
			case "Text":
				$("#SeriesExample input[id=" + ID + "]").attr("maxlength", Value).val("");
				$("#SeriesText").val(Value); break;
			case "Select":
				$("#SeriesExample select[id=" + ID + "]").html("<option>" + Value.replace(/,/g, "</option><option>").replace(/ /g, "") + "</option>");
				$("#SeriesList").val(Value); break;
		}
	}


	//#endregion


//#region DocTypeSummaryDiv

	$("#DocTypeSearch").keyup(function (e) {
		if (e.keyCode == 13) {
			DocTypeSummarySelect();
		}
	});


	$("#DocTypeNew").click(function () {
		DocTypeDetailClear();
		$.CoreTabSelect("DocTypeDefinition");
		$.CoreEdit("DocTypeDefinitionEdit", "DocTypeTab", true);
		DocTypeDetailDisplay(true);
		$("#DocTypeName").select();
	});


	$("#DocTypeBodyTable").on("click", "tr", function () {
		$("#DocTypeID").text(this.id);
		window[($("#DocTypeTabDiv span[class*=TabSelect]").attr("id") + "Select")]();
		DocTypeDetailDisplay(true);
	});



	function DocTypeSummarySelect() {
		$.CoreDataPage(DB, FN, "Access", "DocTypeSummaryReturn", "R2018_DocTypeSummarySelect", "DocTypeBodyDiv", "Large", "None", { "Search": $("#DocTypeSearch").val() });

	}

	function DocTypeSummaryReturn(msg) {
		var markup = "";
		$.each(msg[0], function (key) {
			var d = msg[0][key];
			var State = d["DocTypeActive"] == "True" ? "green" : "red";
			markup += "<tr id='" + d["DocTypeID"] + "' class='Hover' title='DocTypeID: " + d["DocTypeID"] + "'>" +
						"<td class='DTS0'><div style='background-color:" + State + "; color:transparent;'>_</div></td>" +
						"<td class='DTS1'><div>" + d["DocType"] + "</div></td>" +
						"<td class='DTS2'><div>" + d["DocTypeFormat"] + "</div></td>" +
						"<td class='DTS3'><div>" + d["DocTypeClassification"] + "</div></td>" +
						"<td class='DTS4'><div>" + d["SeriesTotal"] + "</div></td>" +
						"<td class='DTS5'><div>" + d["DocTypeHits"] + "</div></td>" +
						"<td class='DTS6'><div>" + d["DocTypeLastUsed"] + "</div></td>" +
					"<tr>";
		});
		$("#DocTypeBodyTable tbody").html(markup);
		$("#DocTypeSearch").select();
	}

	//#endregion


//#region DocTypeDetailDiv 

$("#DocTypeDetailClose").click(function () {
	DocTypeSummarySelect();
	DocTypeDetailClear();
	DocTypeDetailDisplay(false);
});

$("#DocTypeTabDiv span").click(function () {
	window[(this.id + "Select")]();
});

$("#DocTypeDefinitionEdit").click(function () {
	$.CoreEdit("DocTypeDefinitionEdit", "DocTypeTab", true);
});

	
$("#DocTypeSave").click(function () {
	$.CoreEdit("DocTypeDefinitionEdit", "DocTypeTab", false);
	var P = $.CoreRead("DocTypeDefinitionEdit", "DocTypeID");
	$.CoreDataSave(DB, FN, "Access", "DocTypeSaveReturn", "R2018_DocTypeDefinitionSave", P);
	$("#DocTypeClose").focus();
});

$("#DocTypeCancel").click(function () {
	$.CoreEdit("DocTypeDefinitionEdit", "DocTypeTab", false);
	DocTypeDefinitionWrite();
	$("#DocTypeClose").focus();
});

function DocTypeDetailDisplay(State) {
	$("#DocTypeDetailDiv").css("display", State ? "block" : "none");
}

function DocTypeDetailClear() {
	$("#DocTypeTitle").text("DocType Title");
	DocTypeDefinitionClear();
	DocTypeSeriesClear();
}

function DocTypeDefinitionClear() {
	$.CoreEdit("DocTypeDefinitionEdit", "DocTypeTab", false);
	$.CoreClear("DocTypeDefinitionEdit", "DocTypeID");
}


	

function DocTypeDefinitionSelect() {
	$.CoreDataSelect(DB, FN, "Access", "DocTypeDefinitionReturn", "R2018_DocTypeDefinitionSelect", "None", { "DocTypeID":$("#DocTypeID").text()});
}

function DocTypeDefinitionReturn(msg) {
	$("#DocTypeID").data("Original", msg[0][0]);
	DocTypeDefinitionWrite();
}

function DocTypeDefinitionWrite() {
	var d = $("#DocTypeID").data("Original");
	$.CoreWrite(d);
}

function DocTypeSaveReturn(msg) {
	$("#DocTypeID").data(msg[0][0]["DocTypeID"]);
	DocTypeDefinitionSelect();
}


//#endregion



//#region DocTypeSeriesDiv


$("#DocTypeSeriesSearch").keyup(function (e) {
	if (e.keyCode == 13) {
		DocTypeSeriesSelect();
	}
});

$("#DocTypeSeriesAvailableBodyTable").on("click", "tr", function () {
	$("#DocTypeSeriesAppliedBodyTable tr").removeClass("Selected");
	$(this).hasClass("Selected") ? $(this).removeClass("Selected") : $(this).addClass("Selected");
});


$("#DocTypeSeriesAppliedBodyTable").on("click", "tr", function () {
	$("#DocTypeSeriesAvailableBodyTable tr").removeClass("Selected");
	$(this).hasClass("Selected") ? $(this).removeClass("Selected") : $(this).addClass("Selected");
});

$("#DocTypeSeriesApply").click(function () {
	var IdString = [];
	$("#DocTypeSeriesAvailableBodyTable tr[class*=Selected]").each(function(){
		IdString += this.id + ",";
	});
	$.CoreDataSave(DB, FN, "Access", "DocTypeSeriesApplyReturn", "R2018_DocTypeSeriesSave", { "DocTypeID":$("#DocTypeID").text(), "IdString": IdString });
});

function DocTypeSeriesApplyReturn(msg) {
	DocTypeSeriesSelect();
}


$("#DocTypeSeriesRemove").click(function () {
	var IdString = [];
	$("#DocTypeSeriesAppliedBodyTable tr[class*=Selected]").each(function () {
		IdString += this.id + ",";
	});
	$.CoreDataSave(DB, FN, "Access", "DocTypeSeriesRemoveReturn", "R2018_DocTypeSeriesRemove", { "DocTypeID": $("#DocTypeID").text(), "IdString": IdString });
});

function DocTypeSeriesRemoveReturn(msg) {
	DocTypeSeriesSelect();
}

	function DocTypeSeriesSelect() {
		$.CoreDataPage(DB, FN, "Access", "DocTypeSeriesAvailableReturn", "R2018_DocTypeSeriesAvailableSelect", "DocTypeSeriesAvailableBodyDiv", "Medium", "None", { "DocTypeID": $("#DocTypeID").text(), "Search": $("#DocTypeSeriesSearch").val() });
		$.CoreDataPage(DB, FN, "Access", "DocTypeSeriesAppliedReturn", "R2018_DocTypeSeriesAppliedSelect", "DocTypeSeriesAppliedBodyDiv", "Medium", "None", { "DocTypeID": $("#DocTypeID").text(), "Search": $("#DocTypeSeriesSearch").val() });
	}


	function DocTypeSeriesAvailableReturn(msg) {
		var markup = "";
		$.each(msg[0], function(key){
			var d = msg[0][key];
			markup += "<tr id='" + d["SeriesID"] + "' class='Hover' title='SeriesID: " + d["SeriesID"] + "'>" +
						"<td class='DTS1'><div>" + d["Series"] + "</div></td>" +
					"</tr>";
		});
		$("#DocTypeSeriesAvailableBodyTable tbody").html(markup);
		$("#DocTypeSeriesSearch").select();
	}


	function DocTypeSeriesAppliedReturn(msg) {
		var markup = "";
		$.each(msg[0], function (key) {
			var d = msg[0][key];
			markup += "<tr id='" + d["SeriesID"] + "' class='Hover' title='SeriesID: " + d["SeriesID"] + "'>" +
						"<td class='DTS1'><div>" + d["Series"] + "</div></td>" +
					"</tr>";
		});
		$("#DocTypeSeriesAppliedBodyTable tbody").html(markup);
		$("#DocTypeSeriesSearch").select();
	}

	
	function DocTypeSeriesClear() {
		$("#DocTypeSeriesSearch").val("");
		$("#DocTypeSeriesAvailableTable tbody").html("");
		$("#DocTypeSeriesAppliedTable tbody").html("");
	}


//#endregion


//#region RoutingSummaryDiv

	$("#RouteNew").click(function () {
		$.CoreTabSelect("RouteDefinition");
		RouteDetailClear();
		$.CoreEdit("RouteDefinitionEdit", "RouteDetailTab", true);
		RouteDetailDisplay(true);
		$("#RouteName").select();
	});

	
	$("#RouteBodyTable").on("click", "tr", function () {
		$("#RouteID").text(this.id);
		RouteDefinitionSelect();
		RouteDetailDisplay(true);
	});

	function RouteSummarySelect() {
		$.CoreDataPage(DB, FN, "Access", "RouteSummarySelectReturn", "R2018_RouteSummarySelect", "RouteBodyDiv", "Large", "None", { "Search": $("#RouteSearch").val() });
	}

	function RouteSummarySelectReturn(msg) {
		var markup = "";
		$.each(msg[0], function (key) {
			var d = msg[0][key];
			markup += "<tr id='" + d["RouteID"] + "' class='Hover' title='RouteID: " + d["RouteID"] + "'>" +
						"<td class='RHS1'><div>&nbsp;</div></td>" +
						"<td class='RHS2'><div>" + d["RouteName"] + "</div></td>" +
						"<td class='RHS3'><div>" + d["Steps"] + "</div></td>" +
						"<td class='RHS4'><div>" + d["Used"] + "</div></td>" +
						"<td class='RHS5'><div>" + d["LastUsed"] + "</div></td>" +
						"<td class='RHS6'><div>" + d["LastUpdated"] + "</div></td>" +
					"</tr>";
		});
		$("#RouteBodyTable tbody").html(markup);
	}

//#endregion


//#region RouteDetailDiv


	$("#RouteDetailClose").click(function () {
		RouteDetailClear();
		RouteDetailDisplay(false);
	});

	
	function RouteDetailDisplay(State) {
		$("#RouteDetailDiv").css("display", State ? "block" : "none");
	}

	function RouteDetailClear() {
		$.CoreEdit("RouteDefinitionEdit", "RouteDetailTab", false);
		RouteDefinitionClear();
	}


	

//#endregion


//#region RouteDefinitionDiv

	$("#RouteDefinitionEdit").click(function () {
		$.CoreEdit("RouteDefinitionEdit", "RouteDetailTab", true);
		$("#RouteName").select();
	});

	$("#RouteDefinitionSave").click(function () {
		$.CoreEdit("RouteDefinitionEdit", "RouteDetailTab", false); 
		var P = $.CoreRead("RouteDefinitionEdit", "RouteID");
		$.CoreDataSave(DB, FN, "Access", "RouteDefinitionSaveReturn", "R2018_RouteDefinitionSave", P);
		$("#RouteDetailClose").focus();
	});


	$("#RouteDefinitionCancel").click(function () {

		if ($("#RouteID").text() == 0) {
			RouteDetailDisplay(false);
			RouteDetailClear();
		} else {
			$.CoreEdit("RouteDefinitionEdit", "RouteDetailTab", true);
			RouteDefinitionWrite();
		}

	});


	function RouteDefinitionClear() {
		$.CoreClear("RouteDefinitionEdit", "RouteID");
	}

	function RouteDefinitionSelect() {
		$.CoreDataSelect(DB, FN, "Access", "RouteDefinitionSelectReturn", "R2018_RouteDefinitionSelect", "None", {"RouteID":$("#RouteID").text()});
	}

	function RouteDefinitionSelectReturn(msg) {
		$("#RouteID").data("Original", msg[0][0]);
		RouteDefinitionSelectWrite();
	}


	function RouteDefinitionSelectWrite() {
		var d = $("#RouteID").data("Original")
		$.CoreWrite(d);
		$("#RouteDetailTitle").text(d["RouteName"]);
	}


	function RouteDefinitionSaveReturn(msg) {
		$("#RouteID").text(msg[0][0]["RouteID"]);
		RouteDefinitionSelect();
	}

	function RouteDefinitionWrite() {

	}


//#endregion



//#region StepSummaryDiv

	$("#StepNew").click(function () {
		StepMenuDisplay(true);
	});

	function StepSummaryClear() {
		$("#StepSummaryTable tbody").html("");
	}

//#endregion



//#region StepDetailDiv

	$("#StepDetailClose").click(function () {
		StepDetailDisplay(false);
	});

	function StepDetailDisplay(State) {
		$("#StepDetailDiv").css("display", State ? "block" : "none");
	}


//#endregion



//#region StepMenuDiv

	$("#StepMenuClose").click(function () {
		StepMenuDisplay(false);
	});

	$("#StepCreate").click(function () {
		StepMenuDisplay(false);
		StepDetailDisplay(true);
	});

	$("#StepAlt").click(function () {
		StepMenuDisplay(false);
		StepAltDisplay(true);
	});
	

	function StepMenuDisplay(State) {
		$("#StepMenuDiv").css("display", State ? "block" : "none");
	}


//#endregion


//#region StepDefinitionDiv

	$("#StepNotify").click(function () {
		if ($(this).prop("checked")) {
			$("#StepDetailDiv input:checkbox").attr("disabled", "disabled").prop("checked", false);
			$("#StepDetailDiv input:radio").attr("disabled", "disabled").prop("checked", false);
			$("#StepNotify").removeAttr("disabled").prop("checked", true);
		}
		else {
			$("#StepDetailDiv input:checkbox").removeAttr("disabled");
			$("#StepDetailDiv input:radio").removeAttr("disabled");
		}
	});

//#endregion



	//#region StepAltDiv

	$("#StepAltClose").click(function () {
		StepAltDisplay(false);
	});


	

	function StepAltDisplay(State) {
		$("#StepAltDiv").css("display", State ? "block" : "none");
	}


//#endregion



	function Debug(P) {
		var markup = "";
		$.each(P, function (key, value) {
			markup += key + ":" + value + "\n";
		});
		alert(markup);
	}
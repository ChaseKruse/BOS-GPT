// Core Variables
var DB = "HdnTracking";
var FN = "TRK22.html"; 

// Generic Events
$("document").ready(function () {
	$.Core(true);
	$.CoreSize();
	TemplateSummarySelect();
});

$("#AppTabDiv").on("click", "span", function() {
    switch(this.id) {
        case "TravelerSummary" : TravelerSummarySelect(); break;
        case "InventorySummary" : InventorySummarySelect(); break;
        case "OrderSummary" : OrderSummarySelect(); break;
        case "CddSummary" : CddSummarySelect(); break;
        case "SetUpSummarySelect" : SetUpSummarySelect(); break;
    }
});

//#region TravelerSummary

$("#TravelerNew").click(function() {
	$.CoreClear("TravelerDefinitionEdit", "TravelerID");
    $("#TravelerCddItem").val("");
    $("#TravelerTemplateName").val("");
    $.CoreEdit("TravelerDefinitionEdit", "TravelerTab", true);
	$("#TravelerDetailDiv").css("display", "block");
	$("#TravelerCustomer").focus().select();
});

$("#TravelerSearch").keyup(function (e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		TravelerSummarySelect();
    }
});

$("#TravelerBodyDiv").on("click", ">div", function () {
	$("#TravelerID").text(this.id); 
    window[$.CoreTabFindSelectedID("TravelerTab") + "Select"]();
	$("#TravelerDetailDiv").css("display", "block");
});

function TravelerSummarySelect() {
    $.CoreDataPage(DB, FN, "Access", "TravelerSummarySelectReturn", "TRK22_TravelerSummarySelect", "TravelerBodyDiv", "Large", "None", {
        Search: $("#TravelerSearch").val()
    });
}

function TravelerSummarySelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];

        let Process = "Location: " + 'TESTING';
        let color = "green";

        markup += '\
            <div id="' + d["TravelerID"] + '" class="TravelerSummaryRecord Hover" title="' + d["TravelerID"] + '">\
                <div style="border-left:10px solid ' + color + ';">\
                    <table class="FullWidth">\
                        <tbody>\
                            <tr style="display:none;">\
                                <td class="TS1">&nbsp;</td>\
                                <td class="TS2">&nbsp;</td>\
                                <td class="TS3">&nbsp;</td>\
                                <td class="TS4">&nbsp;</td>\
                                <td class="TS5">&nbsp;</td>\
                                <td class="TS6">&nbsp;</td>\
                                <td class="TS7">&nbsp;</td>\
                            </tr>\
                            <tr>\
                                <td class="TS1">Traveler ID ' + d['TravelerID'] + '</td>\
                                <td class="TS2">Lot #' + d['LotID'] + '</td>\
                                <td class="TS3">' + d['CddItem'] + '</td>\
                                <td class="TS4" colspan="2">' + d['TemplateName'] + '</td>\
                                <td class="TS6 AlignRight" colspan="2">' + Process + '</td>\
                            </tr>\
                            <tr>\
                                <td colspan="7"><div class="FullWidth" style="border-bottom:1px solid gray"></div></td>\
                            </tr\
                            <tr>\
                                <td class="TS1" colspan="3">Created ' + d['TravelerCreated'] + ' by ' + d['TravelerCreatedBy'] + '</td>\
                                <td class="TS4"></td>\
                                <td class="TS5 AlignRight">Good Qty</td>\
                                <td class="TS6 AlignRight">Loss</td>\
                                <td class="TS7 AlignRight">Date</td>\
                            </tr>\
                            <tr>\
                                <td class="TS1">Lot #</td>\
                                <td class="TS2">' + d['LotID'] + '</td>\
                                <td class="TS3">&nbsp;</td>\
                                <td class="TS4">-</td>\
                                <td class="TS5 AlignRight">-</td>\
                                <td class="TS6 AlignRight">-</td>\
                                <td class="TS7 AlignRight">-</td>\
                            </tr>\
                            <tr>\
                                <td class="TS1">Shop Order</td>\
                                <td class="TS2">' + d['ShopOrder'] + '</td>\
                                <td class="TS3">&nbsp;</td>\
                                <td class="TS4">-</td>\
                                <td class="TS5 AlignRight">-</td>\
                                <td class="TS6 AlignRight">-</td>\
                                <td class="TS7 AlignRight">-</td>\
                            </tr>\
                            <tr>\
                                <td class="TS1">Scheduled Qty</td>\
                                <td class="TS2">' + d['QtyScheduled'] + '</td>\
                                <td class="TS3">&nbsp;</td>\
                                <td class="TS4">-</td>\
                                <td class="TS5 AlignRight">-</td>\
                                <td class="TS6 AlignRight">-</td>\
                                <td class="TS7 AlignRight">-</td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
            </div>\
        '; 
    });
    $("#TravelerBodyDiv").html(markup);
    $("#TravelerSearch").focus().select();
}

//#endregion

//#region TravelerDetailDiv

$("#TravelerDetailClose").click(function () {
	TravelerSummarySelect();
	$("#TravelerDetailDiv").css("display", "none"); 
});

$("#TravelerTabDiv").on("click", "span", function() {
    window[this.id + "Select"]();
});

//#endregion

//#region TravelerDefinitionDiv
$("#TravelerDefinitionEdit").click(function() {
    $.CoreEdit("TravelerDefinitionEdit", "TravelerTab", true);
})

$("#TravelerTemplateSearchBtn").click(function() {
    TravelerTemplateSummarySelect();
    $("#TravelerTemplateDetailDiv").css("display", "block");
})

$("#TravelerCddSearchBtn").click(function() {
    TravelerCddSummarySelect();
    $("#TravelerCddDetailDiv").css("display", "block");
})

$("#TravelerSave").click(function() {
    TravelerDefinitionSave();
});

$("#TravelerCancel").click(function() {
    if($("#TravelerID").text() == 0) {
        TravelerSummarySelect();
        $("#TravelerDetailDiv").css("display", "none"); 
    }
    else {
        TravelerDefinitionSelectWrite();
    }
});

$("#TravelerDelete").click(function() {
    if(confirm("Are you sure you want to permanently delete this record?")) {
        TravelerDefinitionDelete();
    }
});

function TravelerDefinitionDelete() {
    $.CoreDataDelete(DB, FN, "Access", "TravelerDefinitionDeleteReturn", "TRK22_TravelerDefinitionDelete", {
        TravelerID: $("#TravelerID").text()
    });
}

function TravelerDefinitionDeleteReturn(msg) {
	TravelerSummarySelect();
	$("#TravelerDetailDiv").css("display", "none"); 
}

function TravelerDefinitionSave() {
    if($.CoreValidate("TravelerDefinitionEdit")) {
        var P = $.CoreRead("TravelerDefinitionEdit", "TravelerID");
        $.CoreDataSave(DB, FN, "Access", "TravelerDefinitionSaveReturn", "TRK22_TravelerDefinitionSave", P);
    }
}

function TravelerDefinitionSaveReturn(msg) {
    $("#TravelerID").text(msg[0][0]["TravelerID"])
	TravelerDefinitionSelect();
}

function TravelerDefinitionSelect() {
    $.CoreDataSelect(DB, FN, "Access", "TravelerDefinitionSelectReturn", "TRK22_TravelerDefinitionSelect", "None", {
        TravelerID: $("#TravelerID").text()
    });
}

function TravelerDefinitionSelectReturn(msg) {
    $("#TravelerID").data("Original", msg);
    TravelerDefinitionSelectWrite();
}

function TravelerDefinitionSelectWrite() {
	var msg = $("#TravelerID").data("Original");
    $.CoreWrite(msg[0][0]);
    $.CoreEdit("TravelerDefinitionEdit", "TravelerTab", false);
}

//#endregion


//#region TravelerTemplateCustomSearch

$("#TravelerTemplateDetailClose").click(function() {
    $("#TravelerTemplateDetailDiv").css("display", "none");
});

$("#TravelerTemplateSearch").keyup(function(e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		TravelerTemplateSummarySelect();
    }
})

$("#TravelerTemplateBodyDiv").on("click", "tr", function() {
    $("#TravelerTemplateName").val($(this).find("td:nth-child(2)").text());
    $("#TravelerTemplateID").val(this.id);
    $("#TravelerTemplateDetailDiv").css("display", "none");
});

function TravelerTemplateSummarySelect() {
    $.CoreDataPage(DB, FN, "Access", "TravelerTemplateSummarySelectReturn", "TRK22_TravelerTemplateSummarySelect", "TravelerTemplateBodyDiv", "Large", "None", {
        Search: $("#TravelerTemplateSearch").val()
    });
}

function TravelerTemplateSummarySelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];
        markup += '\
            <tr class="Hover" id="' + d.TemplateID + '">\
                <td class="TMS1" title="' + d.TemplateID + '"><div>' + d.TemplateID + '</div></td>\
                <td class="TMS2" title="' + d.TemplateName + '"><div>' + d.TemplateName + '</div></td>\
                <td class="TMS3" title="' + d.TemplateUpdated + '"><div>' + d.TemplateUpdated + '</div></td>\
                <td class="TMS4" title="' + d.TemplateUpdatedBy + '"><div>' + d.TemplateUpdatedBy + '</div></td>\
            </tr>\
        ';
    });
    $("#TravelerTemplateBodyDiv tbody").html(markup);
    $("#TravelerTemplateSearch").focus().select();
}

//#endregion

//#region TravelerCddCustomSearch

$("#TravelerCddDetailClose").click(function() {
    $("#TravelerCddDetailDiv").css("display", "none");
});

$("#TravelerCddSearch").keyup(function(e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		TravelerCddSummarySelect();
    }
})

$("#TravelerCddBodyDiv").on("click", "tr", function() {
    $("#TravelerCddItem").val($(this).find("td:first").text());
    $("#TravelerCddID").val(this.id);
    $("#TravelerCddDetailDiv").css("display", "none");
});

function TravelerCddSummarySelect() {
    $.CoreDataPage(DB, FN, "Access", "TravelerCddSummarySelectReturn", "TRK22_TravelerCddSummarySelect", "TravelerCddBodyDiv", "Large", "None", {
        Search: $("#TravelerCddSearch").val()
    });
}

function TravelerCddSummarySelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];
        markup += '\
            <tr class="Hover" id="' + d.CddID + '">\
                <td class="TCS1" title="' + d.CddItem + '"><div>' + d.CddItem + '</div></td>\
                <td class="TCS2" title="' + d.CddSeries + '"><div>' + d.CddSeries + '</div></td>\
                <td class="TCS3" title="' + d.CddGroup + '"><div>' + d.CddGroup + '</div></td>\
                <td class="TCS4" title="' + d.CddChipType + '"><div>' + d.CddChipType + '</div></td>\
            </tr>\
        ';
    });
    $("#TravelerCddBodyDiv tbody").html(markup);
    $("#TravelerCddSearch").focus().select();
}

//#endregion

//#region TravelerHoursSummaryDiv

function TravelerHoursSummarySelect() {
    $.CoreDataPage(DB, FN, "Access", "TravelerHoursSummarySelectReturn", "TRK22_TravelerHoursSummarySelect", "TravelerHoursBodyDiv", "Large", "None", {
        TravelerID: $("#TravelerID").text(),
        Search: $("#TravelerHoursSearch").val()
    });
}

function TravelerHoursSummarySelectReturn(msg) {
    $("#TravelerHoursTemp").html(JSON.stringify(msg, null, 2));
}

//#endregion


//#region TravelerLossSummary

$("#TravelerLossNew").click(function() {
	$.CoreClear("TravelerLossDefinitionEdit", "TravelerLossID");
    TravelerLossDefinitionSelect();
	$("#TravelerLossDetailDiv").css("display", "block");
	$("#OrderTravelerSearchBtn").focus().select();
});

$("#TravelerLossSearch").keyup(function (e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		TravelerLossSummarySelect();
    }
});

$("#TravelerLossBodyDiv").on("click", "tr", function () {
	$("#TravelerLossID").text(this.id); 
    TravelerLossDefinitionSelect();
    $("#TravelerLossDetailDiv").css("display", "block");
});

function TravelerLossSummarySelect() {
    $.CoreDataPage(DB, FN, "Access", "TravelerLossSummarySelectReturn", "TRK22_TravelerLossSummarySelect", "TravelerLossBodyDiv", "Large", "None", {
        TravelerID: $("#TravelerID").text(),
        Search: $("#TravelerLossSearch").val()
    });
}

function TravelerLossSummarySelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];

        markup += '\
            <tr id="' + d.TravelerLossID + '" class="Hover">\
                <td class="TLS1" title="' + d.OperationName + '">' + d.OperationName + '</td>\
                <td class="TLS2" title="' + d.TravelerLossDescription + '">' + d.TravelerLossDescription + '</td>\
                <td class="TLS3" title="' + d.TravelerLossQty + '">' + d.TravelerLossQty + '</td>\
                <td class="TLS4" title="' + d.TravelerLossUpdated + '">' + d.TravelerLossUpdated + '</td>\
                <td class="TLS5" title="' + d.TravelerLossUpdatedBy + '">' + d.TravelerLossUpdatedBy + '</td>\
            </tr>\
        '; 
    });
    $("#TravelerLossBodyDiv tbody").html(markup);
    $("#TravelerLossSearch").focus().select();
}

//#endregion

//#region TravelerLossDetailDiv

$("#TravelerLossDetailClose").click(function () {
	TravelerLossSummarySelect();
	$("#TravelerLossDetailDiv").css("display", "none"); 
});

//#endregion

//#region TravelerLossDefinitionDiv

$("#TravelerLossSave").click(function() {
    TravelerLossDefinitionSave();
});

$("#TravelerLossCancel").click(function() {
    if($("#TravelerLossID").text() == 0) {
        TravelerLossSummarySelect();
        $("#TravelerLossDetailDiv").css("display", "none"); 
    }
    else {
        TravelerLossDefinitionSelectWrite();
    }
});

$("#TravelerLossDelete").click(function() {
    if(confirm("Are you sure you want to remove this record?")) {
        TravelerLossDefinitionDelete();
    }
});

function TravelerLossDefinitionDelete() {
    $.CoreDataDelete(DB, FN, "Access", "TravelerLossDefinitionDeleteReturn", "TRK22_TravelerLossDefinitionDelete", {
        TravelerLossID: $("#TravelerLossID").text()
    });
}

function TravelerLossDefinitionDeleteReturn(msg) {
	TravelerLossSummarySelect();
	$("#TravelerLossDetailDiv").css("display", "none"); 
}

function TravelerLossDefinitionSave() {
    if($.CoreValidate("TravelerLossDefinitionEdit")) {
        var P = $.CoreRead("TravelerLossDefinitionEdit", "TravelerLossID");
        P["TravelerID"] = $("#TravelerID").text();
        $.CoreDataSave(DB, FN, "Access", "TravelerLossDefinitionSaveReturn", "TRK22_TravelerLossDefinitionSave", P);
    }
}

function TravelerLossDefinitionSaveReturn(msg) {
    $("#TravelerLossID").text(msg[0][0]["TravelerLossID"])
	TravelerLossDefinitionSelect();
}

function TravelerLossDefinitionSelect() {
    $.CoreDataSelect(DB, FN, "Access", "TravelerLossDefinitionSelectReturn", "TRK22_TravelerLossDefinitionSelect", "None", {
        TravelerLossID: $("#TravelerLossID").text(),
        TravelerID: $("#TravelerID").text()
    });
}

function TravelerLossDefinitionSelectReturn(msg) {
    $("#TravelerLossID").data("Original", msg);
    TravelerLossDefinitionSelectWrite();
}

function TravelerLossDefinitionSelectWrite() {
	var msg = $("#TravelerLossID").data("Original");

    var markup = "";
    $.each(msg[0], function(i) {
        var d = msg[0][i];
        markup += '<option value="' + d.TravelerStepID + '" > ' + d.OperationName + ' </option>';
    });
    $("#TravelerLossStepID").html(markup);

    $.CoreWrite(msg[1][0]);
}

//#endregion


//#region InventorySummary

$("#InventoryNew").click(function() {
	$.CoreClear("InventoryDefinitionEdit", "InventoryID");
	$("#InventoryDetailDiv").css("display", "block");
	$("#InventoryItem").focus().select();
});

$("#InventorySearch").keyup(function (e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		InventorySummarySelect();
    }
});

$("#InventoryBodyDiv").on("click", "tr", function () {
	$("#InventoryID").text(this.id); 
    InventoryDefinitionSelect();
	$("#InventoryDetailDiv").css("display", "block");
});

function InventorySummarySelect() {
    $.CoreDataPage(DB, FN, "Access", "InventorySummarySelectReturn", "TRK22_InventorySummarySelect", "InventoryBodyDiv", "Large", "None", {
        Search: $("#InventorySearch").val()
    });
}

function InventorySummarySelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];
        let status = "#FFFF66";

        if(d.TravelerComplete) status = "green";
        if(d.InventoryEdited) status = "blue";
        if(!d.InventoryActive) status = "lightgray";

        markup += '\
            <tr id="' + d.InventoryID + '" class="Hover" style="color:' + (Number(d.AvailableQty) < 0 ? "red" : "black") +';">\
                <td class="IS0" style="border:1px solid #ddd;background-color:' + status + ';">&nbsp;</td>\
                <td class="IS1" title="' + d.LotID + '">' + d.LotID + '</td>\
                <td class="IS2" title="' + d.CddItem + '">' + d.CddItem + '</td>\
                <td class="IS3" title="' + d.TemplateName + '">' + d.TemplateName + '</td>\
                <td class="IS4" title="' + d.InventoryQty + '">' + d.InventoryQty + '</td>\
                <td class="IS5" title="' + d.AvailableQty + '">' + d.AvailableQty + '</td>\
                <td class="IS6" title="' + d.InventoryUpdated + '">' + d.InventoryUpdated + '</td>\
            </tr>\
        '; 
    });
    $("#InventoryBodyDiv tbody").html(markup);
    $("#InventorySearch").focus().select();
}

//#endregion

//#region InventoryDetailDiv

$("#InventoryDetailClose").click(function () {
	InventorySummarySelect();
	$("#InventoryDetailDiv").css("display", "none"); 
});
//#endregion


//#region InventoryDefinitionDiv

$("#InventorySave").click(function() {
    InventoryDefinitionSave();
});

$("#InventoryCancel").click(function() {
    if($("#InventoryID").text() == 0) {
        InventorySummarySelect();
        $("#InventoryDetailDiv").css("display", "none"); 
    }
    else {
        InventoryDefinitionSelectWrite();
    }
});

$("#InventoryVerify").click(function() {
    InventoryVerifyDefinitionSave();
});

$("#InventoryDelete").click(function() {
    if(confirm("Are you sure you want to permanently delete this record?")) {
        InventoryDefinitionDelete();
    }
});

function InventoryDefinitionDelete() {
    $.CoreDataDelete(DB, FN, "Access", "InventoryDefinitionDeleteReturn", "TRK22_InventoryDefinitionDelete", {
        InventoryID: $("#InventoryID").text()
    });
}

function InventoryDefinitionDeleteReturn(msg) {
	InventorySummarySelect();
	$("#InventoryDetailDiv").css("display", "none"); 
}

function InventoryDefinitionSave() {
    if($.CoreValidate("InventoryDefinitionEdit")) {
        var P = $.CoreRead("InventoryDefinitionEdit", "InventoryID");
        $.CoreDataSave(DB, FN, "Access", "InventoryDefinitionSaveReturn", "TRK22_InventoryDefinitionSave", P);
    }
}

function InventoryDefinitionSaveReturn(msg) {
    $("#InventoryID").text(msg[0][0]["InventoryID"]);
	InventoryDefinitionSelect();
}

function InventoryVerifyDefinitionSave() {
    $.CoreDataSave(DB, FN, "Access", "InventoryVerifyDefinitionSaveReturn", "TRK22_InventoryVerifyDefinitionSave", {
        InventoryID: $("#InventoryID").text()
    });

}

function InventoryVerifyDefinitionSaveReturn(msg) {
	InventoryDefinitionSelect();
}

function InventoryDefinitionSelect() {
    $.CoreDataSelect(DB, FN, "Access", "InventoryDefinitionSelectReturn", "TRK22_InventoryDefinitionSelect", "None", {
        InventoryID: $("#InventoryID").text()
    });
}

function InventoryDefinitionSelectReturn(msg) {
    $("#InventoryID").data("Original", msg);
    InventoryDefinitionSelectWrite();
}

function InventoryDefinitionSelectWrite() {
	var msg = $("#InventoryID").data("Original");
    $.CoreWrite(msg[0][0]);
}

//#endregion



//#region Order

//#region OrderSummary

$("#OrderNew").click(function() {
	$.CoreClear("OrderDefinitionEdit", "OrderID");
    $("#OrderCddItem").val("");
    $.CoreEdit("OrderDefinitionEdit", "OrderTab", true);
	$("#OrderDetailDiv").css("display", "block");
	$("#OrderCustomer").focus().select();
});

$("#OrderSearch").keyup(function (e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		OrderSummarySelect();
    }
});

$("#OrderBodyDiv").on("click", "tr", function () {
	$("#OrderID").text(this.id); 
    window[$.CoreTabFindSelectedID("OrderTab") + "Select"]();
	$("#OrderDetailDiv").css("display", "block");
});

function OrderSummarySelect() {
    $.CoreDataPage(DB, FN, "Access", "OrderSummarySelectReturn", "TRK22_OrderSummarySelect", "OrderBodyDiv", "Large", "None", {
        Search: $("#OrderSearch").val()
    });
}

function OrderSummarySelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];
        markup += '\
            <tr class="Hover" id="' + d.OrderID + '">\
                <td class="DS1" title="' + d.OrderCustomer + '"><div>' + d.OrderCustomer + '</div></td>\
                <td class="DS2" title="' + d.OrderReference + '"><div>' + d.OrderReference + '</div></td>\
                <td class="DS3" title="' + d.OrderQtyRequested + '"><div>' + d.OrderQtyRequested + '</div></td>\
                <td class="DS4" title="' + d.OrderShipDate + '"><div>' + d.OrderShipDate + '</div></td>\
                <td class="DS5" title="' + d.OrderSooner + '"><div>' + d.OrderSooner + '</div></td>\
            </tr>\
        ';
    });
    $("#OrderBodyDiv tbody").html(markup);
    $("#OrderSearch").focus().select();
}

//#endregion

//#region OrderDetailDiv

$("#OrderDetailClose").click(function () {
	OrderSummarySelect();
	$("#OrderDetailDiv").css("display", "none"); 
});

$("#OrderTabDiv").on("click", "span", function() {
    window[this.id + "Select"]();
});

//#endregion

//#region OrderDefinitionDiv

$("#OrderDefinitionEdit").click(function() {
    $.CoreEdit("OrderDefinitionEdit", "OrderTab", true);
})

$("#OrderCddSearchBtn").click(function() {
    OrderCddSummarySelect();
    $("#OrderCddDetailDiv").css("display", "block");
})

$("#OrderSave").click(function() {
    OrderDefinitionSave();
});

$("#OrderCancel").click(function() {
    if($("#OrderID").text() == 0) {
        OrderSummarySelect();
        $("#OrderDetailDiv").css("display", "none"); 
    }
    else {
        OrderDefinitionSelectWrite();
    }
});

$("#OrderDelete").click(function() {
    if(confirm("Are you sure you want to permanently delete this record?")) {
        OrderDefinitionDelete();
    }
});

function OrderDefinitionDelete() {
    $.CoreDataDelete(DB, FN, "Access", "OrderDefinitionDeleteReturn", "TRK22_OrderDefinitionDelete", {
        OrderID: $("#OrderID").text()
    });
}

function OrderDefinitionDeleteReturn(msg) {
	OrderSummarySelect();
	$("#OrderDetailDiv").css("display", "none"); 
}

function OrderDefinitionSave() {
    if($.CoreValidate("OrderDefinitionEdit")) {
        var P = $.CoreRead("OrderDefinitionEdit", "OrderID");
        $.CoreDataSave(DB, FN, "Access", "OrderDefinitionSaveReturn", "TRK22_OrderDefinitionSave", P);
    }
}

function OrderDefinitionSaveReturn(msg) {
    $("#OrderID").text(msg[0][0]["OrderID"])
	OrderDefinitionSelect();
}

function OrderDefinitionSelect() {
    $.CoreDataSelect(DB, FN, "Access", "OrderDefinitionSelectReturn", "TRK22_OrderDefinitionSelect", "None", {
        OrderID: $("#OrderID").text()
    });
}

function OrderDefinitionSelectReturn(msg) {
    $("#OrderID").data("Original", msg);
    OrderDefinitionSelectWrite();
}

function OrderDefinitionSelectWrite() {
	var msg = $("#OrderID").data("Original");
    $.CoreWrite(msg[0][0]);
    $("#OrderTravelerSearch").val(msg[0][0]["CddItem"]);
    $.CoreEdit("OrderDefinitionEdit", "OrderTab", false);
}

//#endregion

//#region OrderCddCustomSearch

$("#OrderCddDetailClose").click(function() {
    $("#OrderCddDetailDiv").css("display", "none");
});

$("#OrderCddSearch").keyup(function(e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		OrderCddSummarySelect();
    }
})

$("#OrderCddBodyDiv").on("click", "tr", function() {
    $("#OrderCddItem").val($(this).find("td:first").text());
    $("#OrderCddID").val(this.id);
    $("#OrderCddDetailDiv").css("display", "none");
});

function OrderCddSummarySelect() {
    $.CoreDataPage(DB, FN, "Access", "OrderCddSummarySelectReturn", "TRK22_OrderCddSummarySelect", "OrderCddBodyDiv", "Large", "None", {
        Search: $("#OrderCddSearch").val()
    });
}

function OrderCddSummarySelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];
        markup += '\
            <tr class="Hover" id="' + d.CddID + '">\
                <td class="DCS1" title="' + d.CddItem + '"><div>' + d.CddItem + '</div></td>\
                <td class="DCS2" title="' + d.CddSeries + '"><div>' + d.CddSeries + '</div></td>\
                <td class="DCS3" title="' + d.CddGroup + '"><div>' + d.CddGroup + '</div></td>\
                <td class="DCS4" title="' + d.CddChipType + '"><div>' + d.CddChipType + '</div></td>\
            </tr>\
        ';
    });
    $("#OrderCddBodyDiv tbody").html(markup);
    $("#OrderCddSearch").focus().select();
}

//#endregion

//#region AllocationSummary

$("#AllocationAppliedSearch").keyup(function (e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		AllocationAppliedSelect();
    }
});

$("#AllocationAppliedBodyDiv").on("click", "tr", function () {
    $(".Selected").removeClass("Selected");
    $(this).addClass("Selected");
});

$("#AllocationAvailableBodyDiv").on("click", "tr", function () {
    $(".Selected").removeClass("Selected");
    $(this).addClass("Selected");
});

$("#AllocationApply").click(function() {
    // Check to make sure selected item is from the "available" summary
    if($(".Selected").parents("#AllocationAvailableBodyDiv").length) {
        var qty = prompt("Please enter the quantity");
        
        // Error checking for input
        // ensure valid input was entered
        if(qty == null) return;

        // make sure a number was entered
        if(
            isNaN(qty) || 
            parseInt(Number(qty)) != qty ||
            isNaN(parseInt(qty, 10))
        ) {
            alert("Invalid input. \nYou must enter a valid number.");
            return;
        }

        // Make sure the amount entered is more than the quantity currenty in inventory
        if(qty > $(".Selected").find(":nth-child(3)").text()) {
            alert("Quantity to add must be less than the quantity in inventory for this traveler.");
            return;
        }

        $.CoreDataSave(DB, FN, "Access", "AllocationApplyReturn", "TRK22_AllocationApply", {
            OrderID: $("#OrderID").text(),
            InventoryID: $(".Selected").attr("id"),
            Quantity: qty
        });
    }
    else {
        alert("Please select a record from inventory to apply");
    }
});

$("#AllocationRemove").click(function() {
    // Check to make sure selected item is from the "applied" summary
    if($(".Selected").parents("#AllocationAppliedBodyDiv").length) {
        $.CoreDataDelete(DB, FN, "Access", "AllocationRemoveReturn", "TRK22_AllocationRemove", {
            AllocationID: $(".Selected").attr("id")
        });
    }
    else {
        alert("Please select a record from the allocation to remove");
    }
});

function AllocationApplyReturn(msg) {
    AllocationSummarySelect();
}

function AllocationRemoveReturn(msg) {
    AllocationSummarySelect();
}

function AllocationSummarySelect() {
    AllocationAppliedSelect();
    AllocationAvailableSelect();
}

function AllocationAvailableSelect() {
    $.CoreDataPage(DB, FN, "Access", "AllocationAvailableSelectReturn", "TRK22_AllocationAvailableSelect", "AllocationAvailableBodyDiv", "Medium", "None", {
        OrderID: $("#OrderID").text(),
        Search: $("#AllocationAvailableSearch").val()
    });
}

function AllocationAvailableSelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];

        markup += '\
            <tr id="' + d.InventoryID + '" class="Hover">\
                <td class="AAS1" title="' + d.LotID + '">' + d.LotID + '</td>\
                <td class="AAS2" title="' + d.TemplateName + '">' + d.TemplateName + '</td>\
                <td class="AAS3" title="' + d.AvailableQty + '">' + d.AvailableQty + '</td>\
                <td class="AAS4" title="' + d.TravelerCreated + '">' + d.TravelerCreated + '</td>\
            </tr>\
        ';
    });
    $("#AllocationAvailableBodyDiv tbody").html(markup);
    $("#AllocationAvailableSearch").focus().select();
}

function AllocationAppliedSelect() {
    $.CoreDataPage(DB, FN, "Access", "AllocationAppliedSelectReturn", "TRK22_AllocationAppliedSelect", "AllocationAppliedBodyDiv", "Medium", "None", {
        OrderID: $("#OrderID").text(),
        Search: $("#AllocationAppliedSearch").val()
    });
}

function AllocationAppliedSelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];

        markup += '\
            <tr id="' + d.AllocationID + '" class="Hover">\
                <td class="AAS1" title="' + d.LotID + '">' + d.LotID + '</td>\
                <td class="AAS2" title="' + d.TemplateName + '">' + d.TemplateName + '</td>\
                <td class="AAS3" title="' + d.AllocationQty + '">' + d.AllocationQty + '</td>\
                <td class="AAS4" title="' + d.TravelerCreated + '">' + d.TravelerCreated + '</td>\
            </tr>\
        ';
    });
    $("#AllocationAppliedBodyDiv tbody").html(markup);
    $("#AllocationAppliedSearch").focus().select();
}

//#endregion

//#endregion




//#region Template

//#region TemplateSummary

$("#TemplateNew").click(function() {
	$.CoreClear("TemplateDefinitionEdit", "TemplateID");
	$("#TemplateActive").prop("checked", true);
    $.CoreEdit("TemplateDefinitionEdit", "TemplateTab", true);
	$("#TemplateDetailDiv").css("display", "block");
	$("#TemplateName").focus().select();
});

$("#TemplateSearch").keyup(function (e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		TemplateSummarySelect();
    }
});

$("#TemplateBodyDiv").on("click", "tr", function () {
	$("#TemplateID").text(this.id); 
    window[$.CoreTabFindSelectedID("TemplateTab") + "Select"]();
	$("#TemplateDetailDiv").css("display", "block");
});

function TemplateSummarySelect() {
    $.CoreDataPage(DB, FN, "Access", "TemplateSummarySelectReturn", "TRK22_TemplateSummarySelect", "TemplateBodyDiv", "Large", "None", {
        Search: $("#TemplateSearch").val()
    });
}

function TemplateSummarySelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];

		console.log(d.TemplateActive)

        markup += '\
            <tr id="' + d.TemplateID + '" class="Hover ' + (d.TemplateActive ? "Active" : "InActive") + '">\
				<td class="MS1">' + d.TemplateID + '</td>\
				<td class="MS2">' + d.TemplateName + '</td>\
				<td class="MS3">' + d.TemplateUpdated + '</td>\
				<td class="MS4">' + d.TemplateUpdatedBy + '</td>\
			</tr>\
        '; 
    });
    $("#TemplateBodyDiv tbody").html(markup);
    $("#TemplateSearch").focus().select();
}

//#endregion

//#region TemplateDetailDiv

$("#TemplateDetailClose").click(function () {
	TemplateSummarySelect();
	$("#TemplateDetailDiv").css("display", "none"); 
});

$("#TemplateTabDiv").on("click", "span", function() {
    window[this.id + "Select"]();
});

//#endregion

//#region TemplateDefinitionDiv
$("#TemplateDefinitionEdit").click(function() {
    $.CoreEdit("TemplateDefinitionEdit", "TemplateTab", true);
})

$("#TemplateTemplateSearchBtn").click(function() {
    TemplateTemplateSummarySelect();
    $("#TemplateTemplateDetailDiv").css("display", "block");
})

$("#TemplateCddSearchBtn").click(function() {
    TemplateCddSummarySelect();
    $("#TemplateCddDetailDiv").css("display", "block");
})

$("#TemplateSave").click(function() {
    TemplateDefinitionSave();
});

$("#TemplateCancel").click(function() {
    if($("#TemplateID").text() == 0) {
        TemplateSummarySelect();
        $("#TemplateDetailDiv").css("display", "none"); 
    }
    else {
        TemplateDefinitionSelectWrite();
    }
});

function TemplateDefinitionSave() {
    if($.CoreValidate("TemplateDefinitionEdit")) {
        var P = $.CoreRead("TemplateDefinitionEdit", "TemplateID");
        $.CoreDataSave(DB, FN, "Access", "TemplateDefinitionSaveReturn", "TRK22_TemplateDefinitionSave", P);
    }
}

function TemplateDefinitionSaveReturn(msg) {
    $("#TemplateID").text(msg[0][0]["TemplateID"])
	TemplateDefinitionSelect();
}

function TemplateDefinitionSelect() {
    $.CoreDataSelect(DB, FN, "Access", "TemplateDefinitionSelectReturn", "TRK22_TemplateDefinitionSelect", "None", {
        TemplateID: $("#TemplateID").text()
    });
}

function TemplateDefinitionSelectReturn(msg) {
	console.log(msg)
    $("#TemplateID").data("Original", msg);
    TemplateDefinitionSelectWrite();
}

function TemplateDefinitionSelectWrite() {
	var msg = $("#TemplateID").data("Original");
    $.CoreWrite(msg[0][0]);
    $.CoreEdit("TemplateDefinitionEdit", "TemplateTab", false);
}

//#endregion

//#region TemplateStep

//#region TemplateStepSummary

$("#TemplateStepNew").click(function() {
	$.CoreClear("TemplateStepDefinitionEdit", "TemplateStepID");
	$("#TemplateStepActive").prop("checked", true);
    $.CoreEdit("TemplateStepDefinitionEdit", "TemplateStepTab", true);
	$("#TemplateStepDetailDiv").css("display", "block");
	$("#TemplateStepName").focus().select();
});

$("#TemplateStepSearch").keyup(function (e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		TemplateStepSummarySelect();
    }
});

$("#TemplateStepSave").click(function() {
    let P = $.CoreRead("TemplateStepDefinitionEdit", "TemplateStepID");
    P["TemplateID"] = $("#TemplateID").text();

    console.log(P)
    $.CoreDataSave(DB, FN, "Access", "TemplateStepDefintionSaveReturn", "TRK22_TemplateStepDefinitionSave", P);
});

$("#TemplateStepBodyDiv").on("click", "tr", function () {
    $.CoreDataDelete(DB, FN, "Access", "TemplateStepDefinitionDeleteReturn", "TRK22_TemplateStepDefinitionDelete", {
        TemplateStepID: this.id
    });
});

function TemplateStepSummarySelect() {
    console.log("here")
    $.CoreDataSelect(DB, FN, "Access", "TemplateStepSummarySelectReturn", "TRK22_TemplateStepSummarySelect", "None", {
        TemplateID: $("#TemplateID").text()
    });
}

function TemplateStepSummarySelectReturn(msg) {
    let markup = "";
    // Populate Operation 
    $.each(msg[0], function(i) {
        let d = msg[0][i];

        markup += '\
            <option value="' + d.OperationID + '">' + d.OperationName + '</optoin>\
        ';
    });
    $("#TemplateStepOperationID").html(markup);

    // Populate Sequence 
    markup = "";
    $.each(msg[1], function(i) {
        markup += '\
            <option value="' + (i+1) + '">' + (i+1) + '</optoin>\
        ';
    });
    markup += '\
        <option value="' + (msg[1].length + 1) + '">' + (msg[1].length + 1) + '</optoin>\
    ';
    $("#TemplateStepSeq").html(markup);

    // Populate Step Summary
    markup = "";
    $.each(msg[1], function(i) {
        let d = msg[1][i];

        markup += '\
            <tr id="' + d.TemplateStepID + '" class="Hover Remove">\
				<td class="MSS1">' + d.TemplateStepSeq + '</td>\
				<td class="MSS2">' + d.OperationName + '</td>\
				<td class="MSS3">' + d.TemplateStepInstructions + '</td>\
				<td class="MSS4">' + d.TemplateStepUpdated + '</td>\
				<td class="MSS5">' + d.TemplateStepUpdatedBy + '</td>\
			</tr>\
        '; 
    });
    $("#TemplateStepBodyDiv tbody").html(markup);
    $("#TemplateStepSearch").focus().select();
}

function TemplateStepDefintionSaveReturn() {
    TemplateStepSummarySelect();
}

function TemplateStepDefinitionDeleteReturn() {
	TemplateStepSummarySelect();
}

//#endregion

//#endregion

//#endregion



//#region CddSummary

$("#CddNew").click(function() {
	$.CoreClear("CddDefinitionEdit", "CddID");
	$("#CddDetailDiv").css("display", "block");
	$("#CddItem").focus().select();
});

$("#CddSearch").keyup(function (e) {
	if (e.key == "Enter" || e.key == "Backspace" && this.value.length == 0) {
		CddSummarySelect();
    }
});

$("#CddBodyDiv").on("click", ">div", function () {
	$("#CddID").text(this.id); 
    CddDefinitionSelect();
	$("#CddDetailDiv").css("display", "block");
});

function CddSummarySelect() {
    $.CoreDataPage(DB, FN, "Access", "CddSummarySelectReturn", "TRK22_CddSummarySelect", "CddBodyDiv", "Large", "None", {
        Search: $("#CddSearch").val()
    });
}

function CddSummarySelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];
        markup += '\
            <div id="' + d["CddID"] + '" class="CddSummaryRecord Hover" title="' + d["CddID"] + '">\
                <table class="FullWidth">\
                    <tbody>\
                        <tr>\
                            <td class="C1">Item</td>\
                            <td class="C2">' + d['CddItem'] + '</td>\
                            <td class="C3">Tolerance</td>\
                            <td class="C4">' + d['CddTolerance'] + '</td>\
                            <td class="C5">Inductance Lower</td>\
                            <td class="C6">' + d['CddInductanceLowerLimit'] + ' ' + d['CddInductanceUom'] + '</td>\
                            <td class="C7">Last Updated</td>\
                            <td class="C8">' + d['CddUpdated'] + '</td>\
                        </tr>\
                        <tr>\
                            <td class="C1">Group</td>\
                            <td class="C2">' + d['CddGroup'] + '</td>\
                            <td class="C3">Wire</td>\
                            <td class="C4">' + d['CddWire'] + '</td>\
                            <td class="C5">Inductance Nom</td>\
                            <td class="C6">' + d['CddInductanceNom'] + ' ' + d['CddInductanceUom'] + '</td>\
                            <td class="C7">Updated By</td>\
                            <td class="C8">' + d['CddUpdatedBy'] + '</td>\
                        </tr>\
                        <tr>\
                            <td class="C1">Series</td>\
                            <td class="C1">' + d['CddSeries'] + '</td>\
                            <td class="C3">Turns</td>\
                            <td class="C4">' + d['CddTurns'] + '</td>\
                            <td class="C5">Inductance Upper</td>\
                            <td class="C6">' + d['CddInductanceUpperLimit'] + ' ' + d['CddInductanceUom'] + '</td>\
                            <td class="C7">Verified Date</td>\
                            <td class="C8">' + d['CddVerified'] + '</td>\
                        </tr>\
                        </tr>\
                        <tr>\
                            <td class="C1">Chip Type</td>\
                            <td class="C2">' + d['CddChipType'] + '</td>\
                            <td class="C3">Frequency</td>\
                            <td class="C4">' + d['CddFrequency'] + '</td>\
                            <td class="C5">DCR MAX</td>\
                            <td class="C6">' + d['CddDcrMax'] + ' ' + d['CddDcrUom'] + '</td>\
                            <td class="C7">Verified By</td>\
                            <td class="C8">' + d['CddVerifiedBy'] + '</td>\
                        </tr>\
                        <tr>\
                            <td class="C1">&nbsp;</td>\
                            <td class="C2">&nbsp;</td>\
                            <td class="C3">&nbsp;</td>\
                            <td class="C4">&nbsp;</td>\
                            <td class="C5">Packer DCR</td>\
                            <td class="C6">' + d['CddDcrPacker'] + ' ' + d['CddDcrUom'] + '</td>\
                            <td class="C7">&nbsp;</td>\
                            <td class="C8">&nbsp;</td>\
                        </tr>\
                    </tbody>\
                </table>\
            </div>\
        '; 
    });
    $("#CddBodyDiv").html(markup);
    $("#CddSearch").focus().select();
}

//#endregion

//#region CddDetailDiv

$("#CddDetailClose").click(function () {
	CddSummarySelect();
	$("#CddDetailDiv").css("display", "none"); 
});
//#endregion


//#region CddDefinitionDiv

$("#CddSave").click(function() {
    CddDefinitionSave();
});

$("#CddCancel").click(function() {
    if($("#CddID").text() == 0) {
        CddSummarySelect();
        $("#CddDetailDiv").css("display", "none"); 
    }
    else {
        CddDefinitionSelectWrite();
    }
});

$("#CddVerify").click(function() {
    CddVerifyDefinitionSave();
});

$("#CddDelete").click(function() {
    if(confirm("Are you sure you want to permanently delete this record?")) {
        CddDefinitionDelete();
    }
});

function CddDefinitionDelete() {
    $.CoreDataDelete(DB, FN, "Access", "CddDefinitionDeleteReturn", "TRK22_CddDefinitionDelete", {
        CddID: $("#CddID").text()
    });
}

function CddDefinitionDeleteReturn(msg) {
	CddSummarySelect();
	$("#CddDetailDiv").css("display", "none"); 
}

function CddDefinitionSave() {
    if($.CoreValidate("CddDefinitionEdit")) {
        var P = $.CoreRead("CddDefinitionEdit", "CddID");
        $.CoreDataSave(DB, FN, "Access", "CddDefinitionSaveReturn", "TRK22_CddDefinitionSave", P);
    }
}

function CddDefinitionSaveReturn(msg) {
    $("#CddID").text(msg[0][0]["CddID"]);
	CddDefinitionSelect();
}

function CddVerifyDefinitionSave() {
    $.CoreDataSave(DB, FN, "Access", "CddVerifyDefinitionSaveReturn", "TRK22_CddVerifyDefinitionSave", {
        CddID: $("#CddID").text()
    });

}

function CddVerifyDefinitionSaveReturn(msg) {
	CddDefinitionSelect();
}

function CddDefinitionSelect() {
    $.CoreDataSelect(DB, FN, "Access", "CddDefinitionSelectReturn", "TRK22_CddDefinitionSelect", "None", {
        CddID: $("#CddID").text()
    });
}

function CddDefinitionSelectReturn(msg) {
    $("#CddID").data("Original", msg);
    CddDefinitionSelectWrite();
}

function CddDefinitionSelectWrite() {
	var msg = $("#CddID").data("Original");
    $.CoreWrite(msg[0][0]);
}

//#endregion

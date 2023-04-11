// Core Variables
var DB = "HdnTracking";
var FN = "TRKO22.html"; 

// Generic Events
$("document").ready(function () { 
    $.Core(); 
    TravelerSummarySelect();
});

// Handle Scans

$("html").keyup(function (e) {

});

/* Traveler */
//#region TravelerSummary

$("#TravelerNew").click(function() {
	$.CoreClear("TravelerDefinitionEdit", "TravelerID");
	$("#TravelerDetailDiv").css("display", "block");
	$("#TravelerCustomer").focus().select();
});

$("#TravelerBodyDiv").on("click", "tr", function () {
    // CLICKED
});

function TravelerSummarySelect() {
    var params = {
        Search: $("#TravelerSearch").val()
    };
    $.CoreDataPage(DB, FN, "Access", "TravelerSummarySelectReturn", "TRKO22_TravelerSummarySelect", "TravelerBodyPaging", "Small", "None", params);
}

function TravelerSummarySelectReturn(msg) {
    let markup = "";
    $.each(msg[0], function(i) {
        let d = msg[0][i];
        markup += '\
            <div class="Row">\
                <div class="Col S0 M8">' + d.LotID + '</div>\
                <div class="Col S0 M24">' + d.CddItem + '</div>\
                <div class="Col S0 M24">' + d.TemplateName + '</div>\
                <div class="Col S0 M16">' + d.Qty + '</div>\
                <div class="Col S0 M20">' + d.ShopOrder + '</div>\
            </div>\
        '; 
    });
    $("#TravelerBodyDiv").html(markup);
    $("#TravelerSearch").focus().select();
}

//#endregion

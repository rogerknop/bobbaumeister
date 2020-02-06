// ****************************************************************************
// Berechnung für Aushub durchführen
function computeAushub() {
    var result = 0;

    debugger;

    // Werte aus den Feldern auslesen
    var seite_a = parseFloat( $("#aushub-seite_a").val() );
    var seite_b = parseFloat( $("#aushub-seite_b").val() );
    var hoehe_ok_bp = parseFloat( $("#aushub-ok_bp").val() );
    var dicke_bp = parseFloat( $("#aushub-dicke_bp").val() );    
    var hoehenMittelwert = aushubHoheneMittelwert;

    // Ergebns berechnen
    result =  seite_a * seite_b;

    // Ergebnis ins Zielfeld schreiben
    $("#aushub-result").val(result.toFixed(0));
}

// ****************************************************************************
// Berechnung für Kies durchführen
function computeKies() {
    var result = 0;

    debugger;
    // Werte aus den Feldern auslesen
    var value1 = parseFloat( $("#kies-value1").val() );
    var value2 = parseFloat( $("#kies-value2").val() );

    // Ergebns berechnen
    result =  value1 + value2;

    // Ergebnis ins Zielfeld schreiben
    $("#kies-result").val(result);
}

// ****************************************************************************
// Berechnung für Sonstiges durchführen
function computeSonst() {
    var result = 0;

    debugger;
    // Werte aus den Feldern auslesen
    var value1 = parseFloat( $("#sonst-value1").val() );
    var value2 = parseFloat( $("#sonst-value2").val() );

    // Ergebns berechnen
    result =  value1 + value2;

    // Ergebnis ins Zielfeld schreiben
    $("#sonst-result").val(result);
}

// ****************************************************************************
// Aushub: Höhenwert hinzufügen
var aushubHoehen = [];
var aushubHoheneMittelwert = 0;
function aushubAddHoehe() {
    debugger;
    var new_hoehe = parseFloat( $("#aushub-new_hoehe").val() );
    if (!new_hoehe || (new_hoehe <= 0)) {return;} 
    var index = aushubHoehen.length;
    aushubHoehen[index] = new_hoehe;

    updateAushubHoehen();
}

// ****************************************************************************
// Aushub: Höhenwert hinzufügen
function aushubDeleteHoehe(ctl, index) {
    $(ctl).parents("tr").remove();
    aushubHoehen.splice(index, 1);

    updateAushubHoehen();
}

// ****************************************************************************
// Aushub: Update berechneten Wert
function updateAushubHoehen() {
    $("#aushubHoehenWerte tbody").empty();
    var summe = 0;
    for (var i = 0; i < aushubHoehen.length; i++) {
        $("#aushubHoehenWerte tbody").append(
            "<tr><td>" + aushubHoehen[i] + "</td><td>" +
            "<button type='button' " +
            "onclick='aushubDeleteHoehe(this, " + i + ");' " +
            "class='btn btn-default'>" +
            "<span class='glyphicon glyphicon-remove' />" +
            "</button>" +
            "</td></tr>"
        );
        summe += aushubHoehen[i];
    }
    var anzahl = aushubHoehen.length;
    aushubHoheneMittelwert = summe / anzahl;
    $("#aushubHoehenWerte tbody").append(
        "<tr><td><strong>Mittelwert:&nbsp;" + aushubHoheneMittelwert.toFixed(1) + "</strong></td></tr>"
    );
    
    $("#aushub-new_hoehe").val("");
}

// ****************************************************************************
// Berechnungsseite ändern
function showMenu(menu) {
    $("#aushub").hide();
    $("#kies").hide();
    $("#sonst").hide();
    $("#" + menu).show();    
}

// ****************************************************************************
// Initialisierung nach dem Laden der Seite
$( document ).ready(function() {
    showMenu("aushub");
    
    $("#menu_aushub").click(function () { showMenu("aushub"); });
    $("#menu_kies" ).click(function () { showMenu("kies" ); });
    $("#menu_sonst").click(function () { showMenu("sonst"); });
    
    $("#aushub_berechnen").click(function () { computeAushub(); });
    $("#kies_berechnen" ).click(function () { computeKies();  });
    $("#sonst_berechnen").click(function () { computeSonst(); });

    $("#aushub_hoehe_hinzu").click(function () { aushubAddHoehe(); });
    $("#aushubHoehenWerte tbody").empty();
});
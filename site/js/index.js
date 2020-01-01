// ****************************************************************************
// Berechnung für Beton durchführen
function computeBeton() {
    var result = 0;

    debugger;
    // Werte aus den Feldern auslesen
    var value1 = parseFloat( $("#beton-value1").val() );
    var value2 = parseFloat( $("#beton-value2").val() );

    // Ergebns berechnen
    result =  value1 + value2;

    // Ergebnis ins Zielfeld schreiben
    $("#beton-result").val(result);
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
// Berechnungsseite ändern
function showMenu(menu) {
    $("#beton").hide();
    $("#kies").hide();
    $("#sonst").hide();
    $("#" + menu).show();    
}

// ****************************************************************************
// Initialisierung nach dem Laden der Seite
$( document ).ready(function() {
    showMenu("beton");
    
    $("#menu_beton").click(function () { showMenu("beton"); });
    $("#menu_kies" ).click(function () { showMenu("kies" ); });
    $("#menu_sonst").click(function () { showMenu("sonst"); });
    
    $("#beton_berechnen").click(function () { computeBeton(); });
    $("#kies_berechnen" ).click(function () { computeKies();  });
    $("#sonst_berechnen").click(function () { computeSonst(); });
});
// ****************************************************************************
// Berechnung für Aushub durchführen
function computeAushub() {
    // Werte aus den Feldern auslesen
    var seite_a = getNumber("#aushub-seite_a");
    var seite_b = getNumber("#aushub-seite_b");
    var hoehe_ok_bp = getNumber("#aushub-ok_bp");
    var dicke_bp = getNumber("#aushub-dicke_bp");    
    var hoehenMittelwert = aushubHoheneMittelwert;

    // Ergebns berechnen
    var baugrubenSohle = hoehe_ok_bp - dicke_bp;
    var baugrubenTiefe = hoehenMittelwert - baugrubenSohle;
    var flaeche = (seite_a + 1) * (seite_b + 1);
    var boeschung = 0.5 * baugrubenTiefe * (Math.tan(30 * Math.PI/180) * baugrubenTiefe) * (2 * seite_a + 2 * seite_b + 2);
    var aushub = flaeche * baugrubenTiefe + boeschung;

    // Ergebnis ins Zielfeld schreiben
    $("#aushub-result").val(aushub.toFixed(4));
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
// Zahl ermitteln
function getNumber(id) {
    var value = 0;
    var stringValue = $(id).val();
    stringValue = stringValue.replace(",",".");
    if (!isNaN(parseFloat(stringValue))) {
        value = parseFloat(stringValue);
        $(id).val("");
        //stringValue = stringValue.replace(".",",");
        $(id).val(stringValue);
    }
    return value;
}

// ****************************************************************************
// Aushub: Höhenwert hinzufügen
var aushubHoehen = [];
var aushubHoheneMittelwert = 0;
function aushubAddHoehe() {
    var new_hoehe = getNumber("#aushub-new_hoehe");
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
            "<tr><td>" + aushubHoehen[i].toLocaleString("de-DE", {minimumFractionDigits:3}) + "</td><td>" +
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
    if (anzahl > 0) {
        aushubHoheneMittelwert = summe / anzahl;
    }
    else {
        aushubHoheneMittelwert = 0;
    }
    $("#aushubHoehenWerte tbody").append(
        "<tr><td colspan='2'><strong>Mittelwert:&nbsp;" + aushubHoheneMittelwert.toLocaleString("de-DE", {minimumFractionDigits:3}) + "</strong></td></tr>"
    );
    
    $("#aushub-new_hoehe").val("");
}

// ****************************************************************************
// Aushub: Werte zurücksetzen
function resetAushub(ctl, index) {
    var seite_a = getNumber("#aushub-seite_a");
    var seite_b = getNumber("#aushub-seite_b");
    var hoehe_ok_bp = getNumber("#aushub-ok_bp");
    var dicke_bp = getNumber("#aushub-dicke_bp");    
    $("#aushub-seite_a").val("");
    $("#aushub-seite_b").val("");
    $("#aushub-ok_bp").val("");
    $("#aushub-dicke_bp").val("");
    $("#aushub-new_hoehe").val("");
    $("#aushub-result").val("");
    aushubHoehen = [];
    updateAushubHoehen();
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
    
    $("#aushub_reset").click(function () { resetAushub(); });

    $("#aushub_berechnen").click(function () { computeAushub(); });
    $("#kies_berechnen" ).click(function () { computeKies();  });
    $("#sonst_berechnen").click(function () { computeSonst(); });

    $("#aushub_hoehe_hinzu").click(function () { aushubAddHoehe(); });
    $("#aushubHoehenWerte tbody").empty();

    $(document).keypress(function(e){
        if(e.keyCode==13) {
            if (e.target.id==="aushub-new_hoehe") {
                aushubAddHoehe();
            }
            else {
                computeAushub();
            }
        }
    });
});
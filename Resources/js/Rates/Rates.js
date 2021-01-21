$(document).ready(function () {
    $('#tblRates').DataTable();

    $("#IdTypeConsultation").val("");
    $("#Dscription").val("");
    $("#Rate").val("");
});


function CallBack() {
    $('#tblRates').DataTable();

    $('#tblRates tbody').on('click', 'tr', function () {

        IdRate = $(this).find('td:first').html();
        IdTypeConsultation = $(this).find('td:nth-child(2)').html();
        Dscription = $(this).find('td:nth-child(3)').html();
        Rate = $(this).find('td:nth-child(4)').html();;

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
    });
}
// Sección para el CRUD
function NewRate() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#IdTypeConsultation").val("");
    $("#Dscription").val("");
    $("#Rate").val("");

    $("#modalHeader").html("Nueva Tarifa");
    $("#modalRate").modal('show');
}

function EditRate() {
    if (IdRate == 0 || IdRate == "") {
        alertify.warning("Debe de seleccionar un Tarifa");
    } else {
        $("#modalHeader").html("Modificar Tarifa");
        //$("#slctUser").val(Id);
        //$("#slctUseDetect").val(UseDetect);

        //$('#slctUser').prop("disabled", true);
        //$("#IdRate").val(IdRate);
        $("#IdTypeConsultation").val(IdTypeConsultation);
        $("#Dscription").val(Dscription);
        $("#Rate").val(Rate);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalRate").modal('show');
    }
}



$('#DateIn').datetimepicker({
    language: 'es',
    autoclose: 1,
    startView: 2,
    minView: 2,
    calendarWeeks: false,
    format: "yyyy-mm-dd"
});

//var IdRate = 0;
//var RateName = "";
//var Address = "";
//var Telephone = "";
//var Email = "";
//var Sex = "";
//var DateOfBirth = "";
//var IdBloodType = "";
//var VIH = "";
//var Weight = "";
//var Allergies = "";
//var CurrentMedications = "";
//var RateDisease = "";
//var Status = "";

var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblRates tbody').on('click', 'tr', function () {

    IdRate = $(this).find('td:first').html();
    IdTypeConsultation = $(this).find('td:nth-child(2)').html();
    Dscription = $(this).find('td:nth-child(3)').html();
    Rate = $(this).find('td:nth-child(4)').html();;

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#Save").on("click", function () {
    datos = {
        IdTypeConsultation: $("#IdTypeConsultation").val()
        , Dscription: $("#Dscription").val()
        , Rate: $("#Rate").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Rates/AddRate',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Tarifa Agregada.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblRates').DataTable().destroy();
                $('#tblRates tbody').empty();
                $.each(result.Rates, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblRates tbody').append("<tr><td>" + item.IdRate + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + item.Rate + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblRates').DataTable().destroy();
                $('#tblRates tbody').empty();
                $.each(result.Rates, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblRates tbody').append("<tr><td>" + item.IdRate + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + item.Rate + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar la Tarifa");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});
$("#Update").on("click", function () {
    datos = {
        IdRate: IdRate
        , IdTypeConsultation: $("#IdTypeConsultation").val()
        , Dscription: $("#Dscription").val()
        , Rate: $("#Rate").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Rates/UpdateRate',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Tarifa Actualizada.");
                $('#tblRates').DataTable().destroy();
                $('#tblRates tbody').empty();
                $.each(result.Rates, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblRates tbody').append("<tr><td>" + item.IdRate + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + item.Rate + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblRates').DataTable().destroy();
                $('#tblRates tbody').empty();
                $.each(result.Rates, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblRates tbody').append("<tr><td>" + item.IdRate + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + item.Rate + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al eliminar la Tarifa");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});



$(document).ready(function () {
    $('#tblTypeConsultations').DataTable();

    $("#Dscription").val("");
});


function CallBack() {
    $('#tblTypeConsultations').DataTable();

    $('#tblTypeConsultations tbody').on('click', 'tr', function () {

        IdTypeConsultation = $(this).find('td:first').html();
        Dscription = $(this).find('td:nth-child(2)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
    });
}
// Sección para el CRUD
function NewTypeConsultation() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#Dscription").val("");

    $("#modalHeader").html("Nuevo Tipo de Consulta");
    $("#modalTypeConsultation").modal('show');
}

function EditTypeConsultation() {
    if (IdTypeConsultation == 0 || IdTypeConsultation == "") {
        alertify.warning("Debe de seleccionar un Tipo de Consulta");
    } else {
        $("#modalHeader").html("Modificar Tipo de Consulta");
        //$("#slctUser").val(Id);
        //$("#slctUseDetect").val(UseDetect);

        //$('#slctUser').prop("disabled", true);
        //$("#IdTypeConsultation").val(IdTypeConsultation);
        $("#Dscription").val(Dscription);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalTypeConsultation").modal('show');
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

//var IdTypeConsultation = 0;
//var TypeConsultationName = "";
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
//var TypeConsultationDisease = "";
//var Status = "";

var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblTypeConsultations tbody').on('click', 'tr', function () {

    IdTypeConsultation = $(this).find('td:first').html();
    Dscription = $(this).find('td:nth-child(2)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#Save").on("click", function () {
    datos = {
        Dscription: $("#Dscription").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/TypeConsultation/AddTypeConsultation',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Tipo de Consulta Agregado.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblTypeConsultations').DataTable().destroy();
                $('#tblTypeConsultations tbody').empty();
                $.each(result.TypeConsultations, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblTypeConsultations tbody').append("<tr><td>" + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblTypeConsultations').DataTable().destroy();
                $('#tblTypeConsultations tbody').empty();
                $.each(result.TypeConsultations, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblTypeConsultations tbody').append("<tr><td>" + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Tipo de Consulta");
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
        IdTypeConsultation: IdTypeConsultation
        , Dscription: $("#Dscription").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/TypeConsultation/UpdateTypeConsultation',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Tipo de Consulta Actualizado.");
                $('#tblTypeConsultations').DataTable().destroy();
                $('#tblTypeConsultations tbody').empty();
                $.each(result.TypeConsultations, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblTypeConsultations tbody').append("<tr><td>" + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblTypeConsultations').DataTable().destroy();
                $('#tblTypeConsultations tbody').empty();
                $.each(result.TypeConsultations, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblTypeConsultations tbody').append("<tr><td>" + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al eliminar el Tipo de Consulta");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});



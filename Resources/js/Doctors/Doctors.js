$(document).ready(function () {
    $('#tblDoctors').DataTable();

    $("#DoctorName").val("");
    $("#Address").val("");
    $("#Telephone").val("");
    $("#Email").val("");
    $("#Sex").val("");
    $("#Origin").val("");
    $("#Specialty").val("");

    $("#Status").val("");
});


function CallBack() {
    $('#tblDoctors').DataTable();

    $('#tblDoctors tbody').on('click', 'tr', function () {

        IdDoctor = $(this).find('td:first').html();
        DoctorName = $(this).find('td:nth-child(2)').html();
        Address = $(this).find('td:nth-child(3)').html();
        Email = $(this).find('td:nth-child(4)').html();
        Telephone= $(this).find('td:nth-child(5)').html();
        Sex = $(this).find('td:nth-child(6)').html();
        Origin = $(this).find('td:nth-child(7)').html();
        Specialty = $(this).find('td:nth-child(8)').html();
        Status = $(this).find('td:nth-child(9)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
    });
}
// Sección para el CRUD
function NewDoctor() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#DoctorName").val("");
    $("#Address").val("");
    $("#Telephone").val("");
    $("#Email").val("");
    $("#Sex").val("");
    $("#Origin").val("");
    $("#Specialty").val("");

    $("#Status").val("");

    $("#modalHeader").html("Nuevo Doctor");
    $("#modalDoctor").modal('show');
}

function EditDoctor() {
    console.log(IdDoctor);
    if (IdDoctor == 0 || IdDoctor == "") {
        alertify.warning("Debe de seleccionar un Doctor");
    } else {
        $("#modalHeader").html("Modificar Doctor");
        //$("#slctUser").val(Id);
        //$("#slctUseDetect").val(UseDetect);

        //$('#slctUser').prop("disabled", true);
        //$("#IdDoctor").val(IdDoctor);
        $("#DoctorName").val(DoctorName);
        $("#Address").val(Address);
        $("#Telephone").val(Telephone);
        $("#Email").val(Email);
        $("#Sex").val(Sex);
        $("#Origin").val(Origin);
        $("#Specialty").val(Specialty);
        $("#Status").val(Status);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalDoctor").modal('show');
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

//var IdDoctor = 0;
//var DoctorName = "";
//var Address = "";
//var Telephone = "";
//var Email = "";
//var Sex = "";
//var Origin = "";
//var Specialty = "";
//var VIH = "";
//var Weight = "";
//var Allergies = "";
//var CurrentMedications = "";
//var PatientDisease = "";
//var Status = "";

var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblDoctors tbody').on('click', 'tr', function () {

    IdDoctor= $(this).find('td:first').html();
    DoctorName= $(this).find('td:nth-child(2)').html();
    Address= $(this).find('td:nth-child(3)').html();
    Email=$(this).find('td:nth-child(4)').html();
    Telephone= $(this).find('td:nth-child(5)').html();
    Sex= $(this).find('td:nth-child(6)').html();
    Origin=$(this).find('td:nth-child(7)').html();
    Specialty= $(this).find('td:nth-child(8)').html();
    Status= $(this).find('td:nth-child(9)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#Save").on("click", function () {
    datos = {
        //IdDoctor: $("#IdDoctor").val()
        DoctorName: $("#DoctorName").val()
        , Address: $("#Address").val()
        , Telephone: $("#Telephone").val()
        , Email: $("#Email").val()
        , Sex: $("#Sex").val()
        , Origin: $("#Origin").val()
        , Specialty: $("#Specialty").val()
        , Status: $("#Status").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Doctors/AddDcotor',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Doctor Agregado.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblDoctors').DataTable().destroy();
                $('#tblDoctors tbody').empty();
                $.each(result.Doctors, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblDoctors tbody').append("<tr><td>" + item.IdDoctor + "</td><td>"
                                                                 + item.DoctorName + "</td><td>"
                                                                 + item.Address + "</td><td>"
                                                                 + item.Email + "</td><td>"
                                                                 + item.Telephone + "</td><td>"
                                                                 + item.Sex + "</td><td>"
                                                                 + item.Origin + "</td><td>"
                                                                 + item.Specialty + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblDoctors').DataTable().destroy();
                $('#tblDoctors tbody').empty();
                $.each(result.Doctors, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblDoctors tbody').append("<tr><td>" + item.IdDoctor + "</td><td>"
                                                                + item.DoctorName + "</td><td>"
                                                                + item.Address + "</td><td>"
                                                                + item.Email + "</td><td>"
                                                                + item.Telephone + "</td><td>"
                                                                + item.Sex + "</td><td>"
                                                                 + item.Origin + "</td><td>"
                                                                 + item.Specialty + "</td><td>"
                                                                + item.Status + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Doctor");
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
        IdDoctor: IdDoctor
      , DoctorName: $("#DoctorName").val()
      , Address: $("#Address").val()
      , Telephone: $("#Telephone").val()
      , Email: $("#Email").val()
      , Sex: $("#Sex").val()
      , Origin: $("#Origin").val()
      , Specialty: $("#Specialty").val()
      , Status: $("#Status").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Doctors/UpdateDoctor',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Doctor Actualizado.");
                $('#tblDoctors').DataTable().destroy();
                $('#tblDoctors tbody').empty();
                $.each(result.Doctors, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblDoctors tbody').append("<tr><td>" + item.IdDoctor + "</td><td>"
                                                                + item.DoctorName + "</td><td>"
                                                                + item.Address + "</td><td>"
                                                                + item.Email + "</td><td>"
                                                                + item.Telephone + "</td><td>"
                                                                + item.Sex + "</td><td>"
                                                                 + item.Origin + "</td><td>"
                                                                 + item.Specialty + "</td><td>"
                                                                + item.Status + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblDoctors').DataTable().destroy();
                $('#tblDoctors tbody').empty();
                $.each(result.Doctors, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblDoctors tbody').append("<tr><td>" + item.IdDoctor + "</td><td>"
                                                               + item.DoctorName + "</td><td>"
                                                               + item.Address + "</td><td>"
                                                               + item.Email + "</td><td>"
                                                               + item.Telephone + "</td><td>"
                                                               + item.Sex + "</td><td>"
                                                                 + item.Origin + "</td><td>"
                                                                 + item.Specialty + "</td><td>"
                                                               + item.Status + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al eliminar el Doctor");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});



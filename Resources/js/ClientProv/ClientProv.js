$(document).ready(function () {
    $('#tblClientProvs').DataTable();

    $("#ClientProvType").val("");
    $("#ClienteProvName").val("");
    $("#Address").val("");
    $("#Telephone").val("");
    $("#Email").val("");
    $("#NRC").val("");
    $("#NIT").val("");
    $("#DUI").val("");
    $("#Status").val("");
});


function CallBack() {
    $('#tblClientProvs').DataTable();

    $('#tblClientProvs tbody').on('click', 'tr', function () {

        IdClientProv = $(this).find('td:first').html();
        ClientProvType = $(this).find('td:nth-child(2)').html();
        ClienteProvName = $(this).find('td:nth-child(3)').html();
        Address = $(this).find('td:nth-child(4)').html();
        Email = $(this).find('td:nth-child(5)').html();
        Telephone= $(this).find('td:nth-child(6)').html();
        NRC= $(this).find('td:nth-child(7)').html();
        NIT= $(this).find('td:nth-child(8)').html();
        DUI= $(this).find('td:nth-child(9)').html();
        Status= $(this).find('td:nth-child(10)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
    });
}
// Sección para el CRUD
function NewClientProv() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#ClientProvType").val("");
    $("#ClienteProvName").val("");
    $("#Address").val("");
    $("#Telephone").val("");
    $("#Email").val("");
    $("#NRC").val("");
    $("#NIT").val("");
    $("#DUI").val("");
    $("#Status").val("");

    $("#modalHeader").html("Nuevo");
    $("#modalClientProv").modal('show');
}

function EditClientProv() {
    if (IdClientProv == 0 || IdClientProv == "") {
        alertify.warning("Debe de seleccionar un Registro para continuar");
    } else {
        $("#modalHeader").html("Modificar");
        //$("#slctUser").val(Id);
        //$("#slctUseDetect").val(UseDetect);

        //$('#slctUser').prop("disabled", true);
        //$("#IdClientProv").val(IdClientProv);
        $("#ClientProvType").val(ClientProvType);
        $("#ClienteProvName").val(ClienteProvName);
        $("#Address").val(Address);
        $("#Telephone").val(Telephone);
        $("#Email").val(Email);
        $("#NRC").val(NRC);
        $("#NIT").val(NIT);
        $("#DUI").val(DUI);
        $("#Status").val(Status);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalClientProv").modal('show');
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

//var IdClientProv = 0;
//var ClientProvName = "";
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
//var ClientProvDisease = "";
//var Status = "";

var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#fbfcfd";

$('#tblClientProvs tbody').on('click', 'tr', function () {

    IdClientProv = $(this).find('td:first').html();
    ClientProvType = $(this).find('td:nth-child(2)').html();
    ClienteProvName = $(this).find('td:nth-child(3)').html();
    Address = $(this).find('td:nth-child(4)').html();
    Email = $(this).find('td:nth-child(5)').html();
    Telephone = $(this).find('td:nth-child(6)').html();
    NRC = $(this).find('td:nth-child(7)').html();
    NIT = $(this).find('td:nth-child(8)').html();
    DUI = $(this).find('td:nth-child(9)').html();
    Status = $(this).find('td:nth-child(10)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#Save").on("click", function () {
    datos = {
          ClientProvType: $("#ClientProvType").val()
        , ClienteProvName: $("#ClienteProvName").val()
        , Address: $("#Address").val()
        , Email: $("#Email").val()
        , Telephone: $("#Telephone").val()
        , NRC: $("#NRC").val()
        , NIT: $("#NIT").val()
        , DUI: $("#DUI").val()
        , Status: $("#Status").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/ClientProv/AddClientProv',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Registro Agregado.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblClientProvs').DataTable().destroy();
                $('#tblClientProvs tbody').empty();
                $.each(result.ClientProvs, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblClientProvs tbody').append("<tr><td>" + item.IdClientProv + "</td><td>"
                                                                 + item.ClientProvType + "</td><td>"
                                                                 + item.ClienteProvName + "</td><td>"
                                                                 + item.Address + "</td><td>"
                                                                 + item.Email + "</td><td>"
                                                                 + item.Telephone + "</td><td>"
                                                                 + item.NRC + "</td><td>"
                                                                 + item.NIT + "</td><td>"
                                                                 + item.DUI + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblClientProvs').DataTable().destroy();
                $('#tblClientProvs tbody').empty();
                $.each(result.ClientProvs, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblClientProvs tbody').append("<tr><td>" + item.IdClientProv + "</td><td>"
                                                                 + item.ClientProvType + "</td><td>"
                                                                 + item.ClienteProvName + "</td><td>"
                                                                 + item.Address + "</td><td>"
                                                                 + item.Email + "</td><td>"
                                                                 + item.Telephone + "</td><td>"
                                                                 + item.NRC + "</td><td>"
                                                                 + item.NIT + "</td><td>"
                                                                 + item.DUI + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Registro");
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
        IdClientProv: IdClientProv
        ,  ClientProvType: $("#ClientProvType").val()
        , ClienteProvName: $("#ClienteProvName").val()
        , Address: $("#Address").val()
        , Telephone: $("#Telephone").val()
        , Email: $("#Email").val()
        , NRC: $("#NRC").val()
        , NIT: $("#NIT").val()
        , DUI: $("#DUI").val()
        , Status: $("#Status").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/ClientProv/UpdateClientProv',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Registro Actualizado.");
                $('#tblClientProvs').DataTable().destroy();
                $('#tblClientProvs tbody').empty();
                $.each(result.ClientProvs, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblClientProvs tbody').append("<tr><td>" + item.IdClientProv + "</td><td>"
                                                                 + item.ClientProvType + "</td><td>"
                                                                 + item.ClienteProvName + "</td><td>"
                                                                 + item.Address + "</td><td>"
                                                                 + item.Email + "</td><td>"
                                                                 + item.Telephone + "</td><td>"
                                                                 + item.NRC + "</td><td>"
                                                                 + item.NIT + "</td><td>"
                                                                 + item.DUI + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblClientProvs').DataTable().destroy();
                $('#tblClientProvs tbody').empty();
                $.each(result.ClientProvs, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblClientProvs tbody').append("<tr><td>" + item.IdClientProv + "</td><td>"
                                                                 + item.ClientProvType + "</td><td>"
                                                                 + item.ClienteProvName + "</td><td>"
                                                                 + item.Address + "</td><td>"
                                                                 + item.Email + "</td><td>"
                                                                 + item.Telephone + "</td><td>"
                                                                 + item.NRC + "</td><td>"
                                                                 + item.NIT + "</td><td>"
                                                                 + item.DUI + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al eliminar el Registro");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});



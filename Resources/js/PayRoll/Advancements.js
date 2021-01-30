$(document).ready(function () {
    $('#tblAdvancements').DataTable();

    $("#IdEmploye").val("");
    $("#Concept").val("");
    $("#Advancements").val("");
    $("#Refund").val("");
    $("#Pending").val("");

});


function CallBack() {
    $('#tblAdvancements').DataTable();

    $('#tblAdvancements tbody').on('click', 'tr', function () {

        IdAdvancement = $(this).find('td:first').html();
        IdEmploye = $(this).find('td:nth-child(2)').html();
        EmployeName = $(this).find('td:nth-child(3)').html();
        Concept = $(this).find('td:nth-child(4)').html();
        Advancements = $(this).find('td:nth-child(5)').html();
        Refund = $(this).find('td:nth-child(6)').html();
        Pending = $(this).find('td:nth-child(7)').html();
        DateAdvancements = $(this).find('td:nth-child(8)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
        $('#btnAdvancement').prop("disabled", false);
    });
}
// Sección para el CRUD
function NewAdvancement() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#IdEmploye").val("");
    $("#Concept").val("");
    $("#Advancements").val("");
    $("#Refund").val("");
    $("#Pending").val("");

    $("#modalHeader").html("Nuevo Adelanto/Prestamo");
    $("#modalAdvancement").modal('show');
}

function EditAdvancement() {
    console.log(IdAdvancement);
    if (IdAdvancement == 0 || IdAdvancement == "") {
        alertify.warning("Debe de seleccionar un Advancement");
    } else {
        $("#modalHeader").html("Modificar Adelanto/Prestamo");

        $("#IdEmploye").val(IdEmploye);
        $("#Concept").val(Concept);
        $("#Advancements").val(Advancements);
        $("#Refund").val(Refund);
        $("#Pending").val(Pending);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalAdvancement").modal('show');
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


var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblAdvancements tbody').on('click', 'tr', function () {

    IdAdvancement = $(this).find('td:first').html();
    IdEmploye = $(this).find('td:nth-child(2)').html();
    EmployeName = $(this).find('td:nth-child(3)').html();
    Concept = $(this).find('td:nth-child(4)').html();
    Advancements = $(this).find('td:nth-child(5)').html();
    Refund = $(this).find('td:nth-child(6)').html();
    Pending = $(this).find('td:nth-child(7)').html();
    DateAdvancements = $(this).find('td:nth-child(8)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
    $('#btnAdvancement').prop("disabled", false);
});


$("#Save").on("click", function () {
    datos = {
        //IdAdvancement: $("#IdAdvancement").val()
        IdEmploye: $("#IdEmploye").val()
        , Concept: $("#Concept").val()
        , Advancements: $("#Advancements").val()
        , Refund: $("#Refund").val()
        , Pending: $("#Pending").val()
        , DateAdvancements: $("#DateAdvancements").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/PayRoll/AddAdvancement',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Advancement Agregado.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblAdvancements').DataTable().destroy();
                $('#tblAdvancements tbody').empty();
                $.each(result.Advancements, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.DateAdvancements).format('YYYY-MM-DD');
                    $('#tblAdvancements tbody').append("<tr><td>" + item.IdAdvancements + "</td><td>"
                                                                 + item.IdEmploye + "</td><td>"
                                                                 + item.EmployeName + "</td><td>"
                                                                 + item.Concept + "</td><td>"
                                                                 + item.Advancements + "</td><td>"
                                                                 + item.Refund + "</td><td>"
                                                                 + item.Pending + "</td><td>"
                                                                 + fecha + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblAdvancements').DataTable().destroy();
                $('#tblAdvancements tbody').empty();
                $.each(result.Advancements, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.DateAdvancements).format('YYYY-MM-DD');
                    $('#tblAdvancements tbody').append("<tr><td>" + item.IdAdvancements + "</td><td>"
                                                                 + item.IdEmploye + "</td><td>"
                                                                 + item.EmployeName + "</td><td>"
                                                                 + item.Concept + "</td><td>"
                                                                 + item.Advancements + "</td><td>"
                                                                 + item.Refund + "</td><td>"
                                                                 + item.Pending + "</td><td>"
                                                                 + fecha + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al agregar el Advancement");
                CallBack();
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
        IdAdvancements : IdAdvancement
        , IdEmploye: $("#IdEmploye").val()
        , Concept: $("#Concept").val()
        , Advancements: $("#Advancements").val()
        , Refund: $("#Refund").val()
        , Pending: $("#Pending").val()
        , DateAdvancements: $("#DateAdvancements").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/PayRoll/AddAdvancement',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Advancement Actualizado.");
                $('#tblAdvancements').DataTable().destroy();
                $('#tblAdvancements tbody').empty();
                $.each(result.Advancements, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.DateAdvancements).format('YYYY-MM-DD');
                    $('#tblAdvancements tbody').append("<tr><td>" + item.IdAdvancements + "</td><td>"
                                                                 + item.IdEmploye + "</td><td>"
                                                                 + item.EmployeName + "</td><td>"
                                                                 + item.Concept + "</td><td>"
                                                                 + item.Advancements + "</td><td>"
                                                                 + item.Refund + "</td><td>"
                                                                 + item.Pending + "</td><td>"
                                                                 + fecha + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblAdvancements').DataTable().destroy();
                $('#tblAdvancements tbody').empty();
                $.each(result.Advancements, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.DateAdvancements).format('YYYY-MM-DD');
                    $('#tblAdvancements tbody').append("<tr><td>" + item.IdAdvancements + "</td><td>"
                                                                 + item.IdEmploye + "</td><td>"
                                                                 + item.EmployeName + "</td><td>"
                                                                 + item.Concept + "</td><td>"
                                                                 + item.Advancements + "</td><td>"
                                                                 + item.Refund + "</td><td>"
                                                                 + item.Pending + "</td><td>"
                                                                 + fecha + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al eliminar el Advancement");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});



$(document).ready(function () {
    $('#tblOrders').DataTable();

    $("#IdComentsOrder").val("");
    $("#CardCode").val("");
    $("#Description").val("");
    $("#Attachment").val("");

    $('#Download').prop("disabled", true);
    $('#Close').prop("disabled", true);
    $('#btnEdit').prop("disabled", true);
});


function CallBack() {
    $('#tblOrders').DataTable();

    $('#tblOrders tbody').on('click', 'tr', function () {

        IdComentsOrder = $(this).find('td:first').html();
        CardCode = $(this).find('td:nth-child(2)').html();
        CardName = $(this).find('td:nth-child(3)').html();
        DateIn = $(this).find('td:nth-child(4)').html();
        DateTest = $(this).find('td:nth-child(5)').html();
        DateSent = $(this).find('td:nth-child(6)').html();
        DatePromis = $(this).find('td:nth-child(7)').html();
        Description = $(this).find('td:nth-child(8)').html();
        Attachment = $(this).find('td:nth-child(9)').html();
        Status = $(this).find('td:nth-child(10)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorDatePromisalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#Download').prop("disabled", false);
        $('#Close').prop("disabled", false);
        $('#btnEdit').prop("disabled", false);
        $('#Delete').prop("disabled", false);
    });
}

function NewOrden() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#IdComentsOrder").val("");
    $("#CardCode").val("");
    $("#Description").val("");
    $("#Attachment").val("");

    $("#modalContentOrderData").html("Nueva Orden");
    $("#modalOrderData").modal('show');
}

function EditOrden() {
    console.log(IdComentsOrder);
    if (IdComentsOrder == 0 || IdComentsOrder == "") {
        alertify.warning("Debe de seleccionar un Orden");
    } else {
        $("#modalContentOrderData").html("Modificar Orden");
        $("#IdComentsOrder").val(IdComentsOrder);
        $("#CardCode").val(CardCode);
        $("#DateTest").val(DateTest);
        $("#DateIn").val(DateIn);
        $("#DateSent").val(DateSent);
        $("#DatePromis").val(DatePromis);
        $("#Description").val(Description);
        $("#Attachment").val(Attachment);
        //$("#Status").val(Status);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalOrderData").modal('show');
    }
}



$('#DateStart').datetimepicker({
    language: 'es',
    autoclose: 1,
    startView: 2,
    minView: 2,
    calendarWeeks: false,
    format: "yyyy-mm-dd"
});

$('#DateInTest').datetimepicker({
    language: 'es',
    autoclose: 1,
    startView: 2,
    minView: 2,
    calendarWeeks: false,
    format: "yyyy-mm-dd"
});
$('#DateInSent').datetimepicker({
    language: 'es',
    autoclose: 1,
    startView: 2,
    minView: 2,
    calendarWeeks: false,
    format: "yyyy-mm-dd"
});
$('#DateInPromis').datetimepicker({
    language: 'es',
    autoclose: 1,
    startView: 2,
    minView: 2,
    calendarWeeks: false,
    format: "yyyy-mm-dd"
});



var ultimaFila = null;
var colorDatePromisalPAR = "#ffffff";
var colorDatePromisalIMPAR = "#ffe35c";

$('#tblOrders tbody').on('click', 'tr', function () {

    IdComentsOrder = $(this).find('td:first').html();
    CardCode = $(this).find('td:nth-child(2)').html();
    CardName = $(this).find('td:nth-child(3)').html();
    DateIn = $(this).find('td:nth-child(4)').html();
    DateTest = $(this).find('td:nth-child(5)').html();
    DateSent = $(this).find('td:nth-child(6)').html();
    DatePromis = $(this).find('td:nth-child(7)').html();
    Description = $(this).find('td:nth-child(8)').html();
    Attachment = $(this).find('td:nth-child(9)').html();
    Status = $(this).find('td:nth-child(10)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorDatePromisalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#Download').prop("disabled", false);
    $('#Close').prop("disabled", false);
    $('#btnEdit').prop("disabled", false);
    $('#Delete').prop("disabled", false);
});


$("#Save").on("click", function () {
    datos = {
        //IdComentsOrder: $("#IdComentsOrder").val()
        CardCode: $("#CardCode").val()
        , CardName: $("#CardName").val()
        , DateIn: $("#DateIn").val()
        , DateTest: $("#DateTest").val()
        , DateSent: $("#DateSent").val()
        , DatePromis: $("#DatePromis").val()
        , Description: $("#Description").val()
        , Attachment: $("#Attachment").val()
        , Status: 0
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: "/Billing/AddComentsOrder/",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Orden Agregada.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblOrders').DataTable().destroy();
                $('#tblOrders tbody').empty();
                $.each(result.Orders, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaDateIn = moment(item.DateIn).format('YYYY-MM-DD');
                    var fechaDateTest = moment(item.DateTest).format('YYYY-MM-DD');
                    var fechaDateSent = moment(item.DateSent).format('YYYY-MM-DD');
                    var fechaDatePromis = moment(item.DatePromis).format('YYYY-MM-DD');
                    $('#tblOrders tbody').append("<tr><td>" + item.IdComentsOrder + "</td><td>"
                                                                + item.CardCode + "</td><td>"
                                                                + item.CardName + "</td><td>"
                                                                + fechaDateIn + "</td><td hidden>"
                                                                + fechaDateTest + "</td><td hidden>"
                                                                + fechaDateSent + "</td><td hidden>"
                                                                 + fechaDatePromis + "</td><td hidden>"
                                                                 + item.Description + "</td><td hidden>"
                                                                 + item.Attachment + "</td><td>"
                                                                + item.Status + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblOrders').DataTable().destroy();
                $('#tblOrders tbody').empty();
                $.each(result.Orders, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaDateIn = moment(item.DateIn).format('YYYY-MM-DD');
                    var fechaDateTest = moment(item.DateTest).format('YYYY-MM-DD');
                    var fechaDateSent = moment(item.DateSent).format('YYYY-MM-DD');
                    var fechaDatePromis = moment(item.DatePromis).format('YYYY-MM-DD');
                    $('#tblOrders tbody').append("<tr><td>" + item.IdComentsOrder + "</td><td>"
                                                                + item.CardCode + "</td><td>"
                                                                + item.CardName + "</td><td>"
                                                                + fechaDateIn + "</td><td hidden>"
                                                                + fechaDateTest + "</td><td hidden>"
                                                                + fechaDateSent + "</td><td hidden>"
                                                                 + fechaDatePromis + "</td><td hidden>"
                                                                 + item.Description + "</td><td hidden>"
                                                                 + item.Attachment + "</td><td>"
                                                                + item.Status + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar la Orden");
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
        IdComentsOrder: IdComentsOrder
      , CardCode: $("#CardCode").val()
      , CardName: $("#CardName").val()
      , DateTest: $("#DateTest").val()
      , DateIn: $("#DateIn").val()
      , DateSent: $("#DateSent").val()
      , DatePromis: $("#DatePromis").val()
      , Description: $("#Description").val()
      , Attachment: $("#Attachment").val()
      , Status: 0
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: "/Billing/AddComentsOrder/",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Orden Actualizada.");
                $('#tblOrders').DataTable().destroy();
                $('#tblOrders tbody').empty();
                $.each(result.Orders, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaDateIn = moment(item.DateIn).format('YYYY-MM-DD');
                    var fechaDateTest = moment(item.DateTest).format('YYYY-MM-DD');
                    var fechaDateSent = moment(item.DateSent).format('YYYY-MM-DD');
                    var fechaDatePromis = moment(item.DatePromis).format('YYYY-MM-DD');
                    $('#tblOrders tbody').append("<tr><td>" + item.IdComentsOrder + "</td><td>"
                                                                + item.CardCode + "</td><td>"
                                                                + item.CardName + "</td><td>"
                                                                + fechaDateIn + "</td><td hidden>"
                                                                + fechaDateTest + "</td><td hidden>"
                                                                + fechaDateSent + "</td><td hidden>"
                                                                 + fechaDatePromis + "</td><td hidden>"
                                                                 + item.Description + "</td><td hidden>"
                                                                 + item.Attachment + "</td><td>"
                                                                + item.Status + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblOrders').DataTable().destroy();
                $('#tblOrders tbody').empty();
                $.each(result.Orders, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaDateIn = moment(item.DateIn).format('YYYY-MM-DD');
                    var fechaDateTest = moment(item.DateTest).format('YYYY-MM-DD');
                    var fechaDateSent = moment(item.DateSent).format('YYYY-MM-DD');
                    var fechaDatePromis = moment(item.DatePromis).format('YYYY-MM-DD');
                    $('#tblOrders tbody').append("<tr><td>" + item.IdComentsOrder + "</td><td>"
                                                                + item.CardCode + "</td><td>"
                                                                + item.CardName + "</td><td>"
                                                                + fechaDateIn + "</td><td hidden>"
                                                                + fechaDateTest + "</td><td hidden>"
                                                                + fechaDateSent + "</td><td hidden>"
                                                                 + fechaDatePromis + "</td><td hidden>"
                                                                 + item.Description + "</td><td hidden>"
                                                                 + item.Attachment + "</td><td>"
                                                                + item.Status + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al actualizar la Orden");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});
$("#Close").on("click", function () {
    if (IdComentsOrder == 0 || IdComentsOrder == "") {
        alertify.warning("Debe de seleccionar un Orden");
    } else {
        $("#modalContentOrderData").html("Modificar Orden");
        $("#IdComentsOrder").val(IdComentsOrder);
        $("#CardCode").val(CardCode);
        $("#DateTest").val(DateTest);
        $("#DateIn").val(DateIn);
        $("#DateSent").val(DateSent);
        $("#DatePromis").val(DatePromis);
        $("#Description").val(Description);
        $("#Attachment").val(Attachment);


        datos = {
            IdComentsOrder: IdComentsOrder
          , CardCode: $("#CardCode").val()
          , CardName: $("#CardName").val()
          , DateTest: $("#DateTest").val()
          , DateIn: $("#DateIn").val()
          , DateSent: $("#DateSent").val()
          , DatePromis: $("#DatePromis").val()
          , Description: $("#Description").val()
          , Attachment: $("#Attachment").val()
          , Status: 1
        }
        $.ajax({
            type: "POST",
            traditional: true,
            url: "/Billing/AddComentsOrder/",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(datos),
            success: function (result) {
                if (result.Res) {
                    alertify.success("Orden Actualizada.");
                    $('#tblOrders').DataTable().destroy();
                    $('#tblOrders tbody').empty();
                    $.each(result.Orders, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        var fechaDateIn = moment(item.DateIn).format('YYYY-MM-DD');
                        var fechaDateTest = moment(item.DateTest).format('YYYY-MM-DD');
                        var fechaDateSent = moment(item.DateSent).format('YYYY-MM-DD');
                        var fechaDatePromis = moment(item.DatePromis).format('YYYY-MM-DD');
                        $('#tblOrders tbody').append("<tr><td>" + item.IdComentsOrder + "</td><td>"
                                                                    + item.CardCode + "</td><td>"
                                                                    + item.CardName + "</td><td>"
                                                                    + fechaDateIn + "</td><td hidden>"
                                                                    + fechaDateTest + "</td><td hidden>"
                                                                    + fechaDateSent + "</td><td hidden>"
                                                                     + fechaDatePromis + "</td><td hidden>"
                                                                     + item.Description + "</td><td hidden>"
                                                                     + item.Attachment + "</td><td>"
                                                                    + item.Status + "</td></tr>");
                    });
                    CallBack();
                } else if (result.Res == false) {
                    $('#tblOrders').DataTable().destroy();
                    $('#tblOrders tbody').empty();
                    $.each(result.Orders, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        var fechaDateIn = moment(item.DateIn).format('YYYY-MM-DD');
                        var fechaDateTest = moment(item.DateTest).format('YYYY-MM-DD');
                        var fechaDateSent = moment(item.DateSent).format('YYYY-MM-DD');
                        var fechaDatePromis = moment(item.DatePromis).format('YYYY-MM-DD');
                        $('#tblOrders tbody').append("<tr><td>" + item.IdComentsOrder + "</td><td>"
                                                                    + item.CardCode + "</td><td>"
                                                                    + item.CardName + "</td><td>"
                                                                    + fechaDateIn + "</td><td hidden>"
                                                                    + fechaDateTest + "</td><td hidden>"
                                                                    + fechaDateSent + "</td><td hidden>"
                                                                     + fechaDatePromis + "</td><td hidden>"
                                                                     + item.Description + "</td><td hidden>"
                                                                     + item.Attachment + "</td><td>"
                                                                    + item.Status + "</td></tr>");
                    });
                    CallBack();
                    alertify.error("Ha ocurrido un error al cerrar la Orden");
                } else {
                    alertify.error("Ha ocurrido un error con la base de datos");
                }
            },
            error: function () {
                alertify.error("Ha ocurrido un error");
            }
        });
    }

});
$("#Delete").on("click", function () {
    if (IdComentsOrder == 0 || IdComentsOrder == "") {
        alertify.warning("Debe de seleccionar un Orden");
    } else {
       
        $.ajax({
            type: "POST",
            traditional: true,
            url: "/Billing/DeleteComentsOrder/",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ id: IdComentsOrder }),
            success: function (result) {
                if (result.Res) {
                    alertify.success("Orden Eliminada.");
                    $('#tblOrders').DataTable().destroy();
                    $('#tblOrders tbody').empty();
                    $.each(result.Orders, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        var fechaDateIn = moment(item.DateIn).format('YYYY-MM-DD');
                        var fechaDateTest = moment(item.DateTest).format('YYYY-MM-DD');
                        var fechaDateSent = moment(item.DateSent).format('YYYY-MM-DD');
                        var fechaDatePromis = moment(item.DatePromis).format('YYYY-MM-DD');
                        $('#tblOrders tbody').append("<tr><td>" + item.IdComentsOrder + "</td><td>"
                                                                    + item.CardCode + "</td><td>"
                                                                    + item.CardName + "</td><td>"
                                                                    + fechaDateIn + "</td><td hidden>"
                                                                    + fechaDateTest + "</td><td hidden>"
                                                                    + fechaDateSent + "</td><td hidden>"
                                                                     + fechaDatePromis + "</td><td hidden>"
                                                                     + item.Description + "</td><td hidden>"
                                                                     + item.Attachment + "</td><td>"
                                                                    + item.Status + "</td></tr>");
                    });
                    CallBack();
                } else if (result.Res == false) {
                    $('#tblOrders').DataTable().destroy();
                    $('#tblOrders tbody').empty();
                    $.each(result.Orders, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        var fechaDateIn = moment(item.DateIn).format('YYYY-MM-DD');
                        var fechaDateTest = moment(item.DateTest).format('YYYY-MM-DD');
                        var fechaDateSent = moment(item.DateSent).format('YYYY-MM-DD');
                        var fechaDatePromis = moment(item.DatePromis).format('YYYY-MM-DD');
                        $('#tblOrders tbody').append("<tr><td>" + item.IdComentsOrder + "</td><td>"
                                                                    + item.CardCode + "</td><td>"
                                                                    + item.CardName + "</td><td>"
                                                                    + fechaDateIn + "</td><td hidden>"
                                                                    + fechaDateTest + "</td><td hidden>"
                                                                    + fechaDateSent + "</td><td hidden>"
                                                                     + fechaDatePromis + "</td><td hidden>"
                                                                     + item.Description + "</td><td hidden>"
                                                                     + item.Attachment + "</td><td>"
                                                                    + item.Status + "</td></tr>");
                    });
                    alertify.error("Ha ocurrido un error al eliminar la Orden");
                    CallBack();
                } else {
                    alertify.error("Ha ocurrido un error con la base de datos");
                }
            },
            error: function () {
                alertify.error("Ha ocurrido un error");
            }
        });
    }

});





$('#Download').click(function () {

    if (IdComentsOrder == 0 || IdComentsOrder == "") {
        alertify.warning("Debe de seleccionar un Orden");
    } else {
        $("#modalContentOrderPrint").html("Imprimir Orden");

        $("#modalBody2").load("/Billing/PrintOrder/" + IdComentsOrder);
        $("#modalOrderDataPrint").modal('show');
    }

});

$(document).ready(function () {
    $('#tblPriceLists').DataTable();
    $('#tblPriceListDetail').DataTable();

    $("#IdPriceList").val("");
    $("#ListName").val("");
    $("#Price").val("");

});


function CallBack() {
    $('#tblPriceLists').DataTable();

    $('#tblPriceLists tbody').on('click', 'tr', function () {

        IdPriceList = $(this).find('td:first').html();
        ListName = $(this).find('td:nth-child(2)').html();
        Price = $(this).find('td:nth-child(3)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorUnitsOnHandalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
        getPriceListDetail();
    });
}




// Sección para el CRUD
function NewPriceLists() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#IdPriceList").val("");
    $("#ListName").val("");
    $("#Price").val("");

    $("#modalHeader").html("Nuevo PriceLists");
    $("#modalPriceList").modal('show');
}

function EditPriceLists() {
    console.log(IdPriceList);
    if (IdPriceList == 0 || IdPriceList == "") {
        alertify.warning("Debe de seleccionar un PriceLists");
    } else {
        $("#modalHeader").html("Modificar PriceLists");
        //$("#slctUser").val(Id);
        //$("#slctUseDetect").val(UseDetect);

        //$('#slctUser').prop("disabled", true);
        $("#IdPriceList").val(IdPriceList);
        $("#ListName").val(ListName);
        $("#Price").val(Price);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalPriceList").modal('show');
    }
}


var ultimaFila = null;
var ultimaFilaDetail = null;
var colorUnitsOnHandalPAR = "#ffffff";
var colorUnitsOnHandalIMPAR = "#fbfcfd";

$('#tblPriceLists tbody').on('click', 'tr', function () {

    IdPriceList = $(this).find('td:first').html();
    ListName = $(this).find('td:nth-child(2)').html();
    Price = $(this).find('td:nth-child(3)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorUnitsOnHandalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
    getPriceListDetail();
});

$("#Save").on("click", function () {
    datos = {
        IdPriceList: $("#IdPriceList").val()
        , ListName: $("#ListName").val()
        , Price: $("#Price").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Inventory/AddPriceList',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Precio de Lista Agregado.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblPriceLists').DataTable().destroy();
                $('#tblPriceLists tbody').empty();
                $.each(result.PriceLists, function (i, PriceLists) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPriceLists tbody').append("<tr><td>" + PriceLists.IdPriceList + "</td><td>"
                        + PriceLists.ListName + "</td><td>"
                        + PriceLists.Price + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblPriceLists').DataTable().destroy();
                $('#tblPriceLists tbody').empty();
                $.each(result.PriceLists, function (i, PriceLists) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPriceLists tbody').append("<tr><td>" + PriceLists.IdPriceList + "</td><td>"
                        + PriceLists.ListName + "</td><td>"
                        + PriceLists.Price + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el PriceLists");
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
        IdPriceList: IdPriceList
        , ListName: $("#ListName").val()
        , Price: $("#Price").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Inventory/AddPriceList',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("PriceLists Actualizado.");
                $('#tblPriceLists').DataTable().destroy();
                $('#tblPriceLists tbody').empty();
                $.each(result.PriceLists, function (i, PriceLists) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPriceLists tbody').append("<tr><td>" + PriceLists.IdPriceList + "</td><td>"
                        + PriceLists.ListName + "</td><td>"
                        + PriceLists.Price + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblPriceLists').DataTable().destroy();
                $('#tblPriceLists tbody').empty();
                $.each(result.PriceLists, function (i, PriceLists) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPriceLists tbody').append("<tr><td>" + PriceLists.IdPriceList + "</td><td>"
                        + PriceLists.ListName + "</td><td>"
                        + PriceLists.Price + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al eliminar el PriceLists");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Detail
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getPriceListDetail() {
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Inventory/GetPriceListDetail',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPriceList: IdPriceList }),
        success: function (result) {
            if (result.Res) {
                alertify.success("Detalle dePrecio de Lista Obtenido.");
                $('#tblPriceListDetail').DataTable().destroy();
                $('#tblPriceListDetail tbody').empty();
                $.each(result.tblPriceListDetail, function (i, PriceLists) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPriceListDetail tbody').append("<tr><td>" + PriceLists.IdPriceListDetail + "</td><td hidden>"
                        + PriceLists.IdPriceList + "</td><td>"
                        + PriceLists.ItemCode + "</td><td>"
                        + PriceLists.Dscription + "</td><td>"
                        + PriceLists.Price + "</td></tr>");
                });
                CallBack2();
            } else if (result.Res == false) {
                $('#tblPriceListDetail').DataTable().destroy();
                $('#tblPriceListDetail tbody').empty();
                $.each(result.tblPriceListDetail, function (i, PriceLists) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPriceListDetail tbody').append("<tr><td>" + PriceLists.IdPriceListDetail + "</td><td hidden>"
                        + PriceLists.IdPriceList + "</td><td>"
                        + PriceLists.ItemCode + "</td><td>"
                        + PriceLists.Dscription + "</td><td>"
                        + PriceLists.Price + "</td></tr>");
                });
                CallBack2();
                alertify.error("Ha ocurrido un error al obtener el Detalle de la lista de precio");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
}


function CallBack2() {
    $('#tblPriceListDetail').DataTable();

    $('#tblPriceListDetail tbody').on('click', 'tr', function () {

        IdPriceListDetail = $(this).find('td:first').html();
        ListNum = $(this).find('td:nth-child(2)').html();
        ItemCode = $(this).find('td:nth-child(3)').html();
        Dscription = $(this).find('td:nth-child(4)').html();
        Price = $(this).find('td:nth-child(5)').html();

        if (ultimaFilaDetail != null) {
            ultimaFilaDetail.css('background-color', colorUnitsOnHandalPAR);
        }

        $(this).css('background-color', '#D4F0FB');
        ultimaFilaDetail = $(this);

        $('#btnEditDetail').prop("disabled", false);
    });
}




// Sección para el CRUD
function NewPriceListDetail() {

    $('#SaveDetail').prop("hidden", false);
    $('#UpdateDetail').prop("hidden", true);

    $("#IdPriceListDetail").val("");
    $("#ListNum").val(IdPriceList);
    $("#List").val(ListName);
    $("#ItemCode").val("");
    $("#Dscription").val("");
    $("#Price").val("");

    $("#modalHeaderD").html("Nuevo Detalle");
    $("#modalPriceListDetail").modal('show');
}

function EditPriceListDeatil() {
   // console.log(IdPriceListDetail);
    if (IdPriceListDetail == 0 || IdPriceListDetail == "") {
        alertify.warning("Debe de seleccionar un PriceLists");
    } else {
        $("#modalHeaderD").html("Modificar Detalle");
        
        $("#IdPriceListDetail").val(IdPriceListDetail);
        $("#List").val(ListName);
        $("#ListNum").val(IdPriceList);
        $("#ItemCode").val(ItemCode);
        $("#Dscription").val(Dscription);
        $("#Price").val(Price);


        $('#UpdateDetail').prop("hidden", false);
        $('#SaveDetail').prop("hidden", true);

        $("#modalPriceListDetail").modal('show');
    }
}


var ultimaFilaDetail = null;

$('#tblPriceListDetail tbody').on('click', 'tr', function () {

    IdPriceListDetail = $(this).find('td:first').html();
    ListNum = $(this).find('td:nth-child(2)').html();
    ItemCode = $(this).find('td:nth-child(3)').html();
    Dscription = $(this).find('td:nth-child(4)').html();
    Price = $(this).find('td:nth-child(5)').html();

    if (ultimaFilaDetail != null) {
        ultimaFilaDetail.css('background-color', colorUnitsOnHandalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFilaDetail = $(this);

    $('#btnEditDetail').prop("disabled", false);
});


$("#SaveDetail").on("click", function () {
    datos = {
        //IdPriceListDetail: $("#IdPriceListDetail").val()
          IdPriceList: $("#ListNum").val()
        , ItemCode: $("#ItemCode").val()
        , Dscription: $("#Dscription").val()
        , Price: $("#PriceDetail").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Inventory/AddPriceListDetail',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Precio de Lista Agregado.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblPriceListDetail').DataTable().destroy();
                $('#tblPriceListDetail tbody').empty();
                $.each(result.tblPriceListDetail, function (i, PriceLists) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPriceListDetail tbody').append("<tr><td>" + PriceLists.IdPriceListDetail + "</td><td hidden>"
                        + PriceLists.IdPriceList + "</td><td>"
                        + PriceLists.ItemCode + "</td><td>"
                        + PriceLists.Dscription + "</td><td>"
                        + PriceLists.Price + "</td></tr>");
                });
                CallBack2();
            } else if (result.Res == false) {
                $('#tblPriceListDetail').DataTable().destroy();
                $('#tblPriceListDetail tbody').empty();
                $.each(result.tblPriceListDetail, function (i, PriceLists) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPriceListDetail tbody').append("<tr><td>" + PriceLists.IdPriceListDetail + "</td><td hidden>"
                        + PriceLists.IdPriceList + "</td><td>"
                        + PriceLists.ItemCode + "</td><td>"
                        + PriceLists.Dscription + "</td><td>"
                        + PriceLists.Price + "</td></tr>");
                });
                CallBack2();
                alertify.error("Ha ocurrido un error al agregar el PriceLists");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});
$("#UpdateDetail").on("click", function () {
    datos = {
        IdPriceListDetail: IdPriceListDetail
        , IdPriceList: $("#ListNum").val()
        , ItemCode: $("#ItemCode").val()
        , Dscription: $("#Dscription").val()
        , Price: $("#PriceDetail").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Inventory/AddPriceListDetail',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("PriceLists Actualizado.");
                $('#tblPriceListDetail').DataTable().destroy();
                $('#tblPriceListDetail tbody').empty();
                $.each(result.tblPriceListDetail, function (i, PriceLists) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPriceListDetail tbody').append("<tr><td>" + PriceLists.IdPriceListDetail + "</td><td hidden>"
                        + PriceLists.IdPriceList + "</td><td>"
                        + PriceLists.ItemCode + "</td><td>"
                        + PriceLists.Dscription + "</td><td>"
                        + PriceLists.Price + "</td></tr>");
                });
                CallBack2();
            } else if (result.Res == false) {
                $('#tblPriceListDetail').DataTable().destroy();
                $('#tblPriceListDetail tbody').empty();
                $.each(result.tblPriceListDetail, function (i, PriceLists) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPriceListDetail tbody').append("<tr><td>" + PriceLists.IdPriceListDetail + "</td><td hidden>"
                        + PriceLists.IdPriceList + "</td><td>"
                        + PriceLists.ItemCode + "</td><td>"
                        + PriceLists.Dscription + "</td><td>"
                        + PriceLists.Price + "</td></tr>");
                });
                CallBack2();
                alertify.error("Ha ocurrido un error al eliminar el PriceLists");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});
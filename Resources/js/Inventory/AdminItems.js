$(document).ready(function () {
    $('#tblItems').DataTable();

    $("#ItemCode").val("");
    $("#ItemName").val("");
    $("#Brand").val("");
    $("#Cost").val("");
    $("#Package").val("");
    $("#Units").val("");
    $("#PackageOnHand").val("");
    $("#UnitsOnHand").val("");
    $("#UnitWeight").val("");
    $("#PackageWeight").val("");
    $("#ItemType").val("");
    $("#WarehouseCode").val("");

});


function CallBack() {
    $('#tblItems').DataTable();

    $('#tblItems tbody').on('click', 'tr', function () {

        ItemCode = $(this).find('td:first').html();
        ItemName = $(this).find('td:nth-child(2)').html();
        Brand = $(this).find('td:nth-child(3)').html();
        Costo = $(this).find('td:nth-child(4)').html();
        Package = $(this).find('td:nth-child(5)').html();
        Units = $(this).find('td:nth-child(6)').html();
        PackageOnHand = $(this).find('td:nth-child(7)').html();
        UnitsOnHand = $(this).find('td:nth-child(8)').html();
        UnitWeight = $(this).find('td:nth-child(9)').html();
        PackageWeight = $(this).find('td:nth-child(10)').html();
        ItemType = $(this).find('td:nth-child(11)').html();
        WarehouseCode = $(this).find('td:nth-child(12)').html();

        switch (WarehouseCode) {
            case "Almacen 1":
                WarehouseCode = "1";
                break;
            case "Almacen 2":
                WarehouseCode = "2";
                break;
            case "Almacen 3":
                WarehouseCode = "3";
                break;
        }
        switch (ItemType) {
            case "Prducto Termiano":
                ItemType = "1";
                break;
            case "Prducto de Prueba":
                ItemType = "2";
                break;
            case "Materia Prima":
                ItemType = "3";
                break;
        }

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorUnitsOnHandalPAR);
        }

        $(this).css('background-color', '#D4F0FB');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
    });
}

function ImportData() {
    $("#file").val("");
    $("#modalHeader").html("Importar Datos");
    $("#modalImportData").modal('show');
}

function DownInventory() {
    $("#file").val("");
    $("#modalHeader").html("Descarga de Inventario");
    $("#modalDownData").modal('show');
}

function UpInventory() {
    $("#file").val("");
    $("#modalHeader").html("Carga de Inventario");
    $("#modalUpData").modal('show');
}


// Sección para el CRUD
function NewItem() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#ItemCode").val("");
    $("#ItemName").val("");
    $("#Brand").val("");
    $("#Cost").val("");
    $("#Package").val("");
    $("#Units").val("");
    $("#PackageOnHand").val("");
    $("#UnitsOnHand").val("");
    $("#UnitWeight").val("");
    $("#PackageWeight").val("");
    $("#ItemType").val("");
    $("#WarehouseCode").val("");

    $("#modalHeader").html("Nuevo Item");
    $("#modalItem").modal('show');
}

function EditItem() {
    console.log(ItemCode);
    if (ItemCode == 0 || ItemCode == "") {
        alertify.warning("Debe de seleccionar un Item");
    } else {
        $("#modalHeader").html("Modificar Item");
        //$("#slctUser").val(Id);
        //$("#slctUseDetect").val(UseDetect);

        //$('#slctUser').prop("disabled", true);
        $("#ItemCode").val(ItemCode);
        $("#ItemName").val(ItemName);
        $("#Brand").val(Brand);
        $("#Cost").val(Costo);
        $("#Units").val(Units);
        $("#Package").val(Package);
        $("#PackageOnHand").val(PackageOnHand);
        $("#UnitsOnHand").val(UnitsOnHand);
        $("#UnitWeight").val(UnitWeight);
        $("#PackageWeight").val(PackageWeight);
        $("#ItemType").val(ItemType);
        $("#WarehouseCode").val(WarehouseCode);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalItem").modal('show');
    }
}


var ultimaFila = null;
var colorUnitsOnHandalPAR = "#ffffff";
var colorUnitsOnHandalIMPAR = "#ffe35c";

$('#tblItems tbody').on('click', 'tr', function () {

    ItemCode = $(this).find('td:first').html();
    ItemName = $(this).find('td:nth-child(2)').html();
    Brand = $(this).find('td:nth-child(3)').html();
    Costo = $(this).find('td:nth-child(4)').html();
    Package = $(this).find('td:nth-child(5)').html();
    Units = $(this).find('td:nth-child(6)').html();
    PackageOnHand = $(this).find('td:nth-child(7)').html();
    UnitsOnHand = $(this).find('td:nth-child(8)').html();
    UnitWeight = $(this).find('td:nth-child(9)').html();
    PackageWeight = $(this).find('td:nth-child(10)').html();
    ItemType = $(this).find('td:nth-child(11)').html();
    WarehouseCode = $(this).find('td:nth-child(12)').html();

    switch (WarehouseCode) {
        case "Almacen 1":
            WarehouseCode = "1";
            break;
        case "Almacen 2":
            WarehouseCode = "2";
            break;
        case "Almacen 3":
            WarehouseCode = "3";
            break;
    }
    switch (ItemType) {
        case "Prducto Termiano":
            ItemType = "1";
            break;
        case "Prducto de Prueba":
            ItemType = "2";
            break;
        case "Materia Prima":
            ItemType = "3";
            break;
    }
    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorUnitsOnHandalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#Save").on("click", function () {
    datos = {
          ItemCode: $("#ItemCode").val()
        , ItemName: $("#ItemName").val()
        , Brand: $("#Brand").val()
        , Cost: $("#Cost").val()
        , Units: $("#Units").val()
        , Package: $("#Package").val()
        , PackageOnHand: $("#PackageOnHand").val()
        , UnitsOnHand: $("#UnitsOnHand").val()
        , UnitWeight: $("#UnitWeight").val()
        , PackageWeight: $("#PackageWeight").val()
        , ItemType: $("#ItemType").val()
        , WarehouseCode: $("#WarehouseCode").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Inventory/AddItem',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Item Agregado.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblItems').DataTable().destroy();
                $('#tblItems tbody').empty();
                $.each(result.Items, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    switch (item.WarehouseCode) {
                        case 1:
                            WarehouseCode = "Almacen 1";
                            break;
                        case 2:
                            WarehouseCode = "Almacen 2";
                            break;
                        case 3:
                            WarehouseCode = "Almacen 3";
                            break;
                    }
                    switch (item.ItemType) {
                        case "1":
                            ItemType = "Prducto Termiano";
                            break;
                        case "2":
                            ItemType = "Prducto de Prueba";
                            break;
                        case "3":
                            ItemType = "Materia Prima";
                            break;
                    }

                    $('#tblItems tbody').append("<tr><td>" + item.ItemCode + "</td><td>"
                        + item.ItemName + "</td><td>"
                        + item.Brand + "</td><td>"
                        + item.Cost + "</td><td hidden>"
                        + item.Package + "</td><td hidden>"
                        + item.Units + "</td><td>"
                        + item.PackageOnHand + "</td><td>"
                        + item.UnitsOnHand + "</td><td hidden>"
                        + item.UnitWeight + "</td><td hidden>"
                        + item.PackageWeight + "</td><td>"
                        + ItemType + "</td><td>"
                        + WarehouseCode + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblItems').DataTable().destroy();
                $('#tblItems tbody').empty();
                $.each(result.Items, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    switch (item.WarehouseCode) {
                        case 1:
                            WarehouseCode = "Almacen 1";
                            break;
                        case 2:
                            WarehouseCode = "Almacen 2";
                            break;
                        case 3:
                            WarehouseCode = "Almacen 3";
                            break;
                    }
                    switch (item.ItemType) {
                        case "1":
                            ItemType = "Prducto Termiano";
                            break;
                        case "2":
                            ItemType = "Prducto de Prueba";
                            break;
                        case "3":
                            ItemType = "Materia Prima";
                            break;
                    }

                    $('#tblItems tbody').append("<tr><td>" + item.ItemCode + "</td><td>"
                        + item.ItemName + "</td><td>"
                        + item.Brand + "</td><td>"
                        + item.Cost + "</td><td hidden>"
                        + item.Package + "</td><td hidden>"
                        + item.Units + "</td><td>"
                        + item.PackageOnHand + "</td><td>"
                        + item.UnitsOnHand + "</td><td hidden>"
                        + item.UnitWeight + "</td><td hidden>"
                        + item.PackageWeight + "</td><td>"
                        + ItemType + "</td><td>"
                        + WarehouseCode + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Item");
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
          ItemCode: ItemCode
        , ItemName: $("#ItemName").val()
        , Brand: $("#Brand").val()
        , Cost: $("#Cost").val()
        , Units: $("#Units").val()
        , Package: $("#Package").val()
        , PackageOnHand: $("#PackageOnHand").val()
        , UnitsOnHand: $("#UnitsOnHand").val()
        , UnitWeight: $("#UnitWeight").val()
        , PackageWeight: $("#PackageWeight").val()
        , ItemType: $("#ItemType").val()
        , WarehouseCode: $("#WarehouseCode").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Inventory/AddItem',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Item Actualizado.");
                $('#tblItems').DataTable().destroy();
                $('#tblItems tbody').empty();
                $.each(result.Items, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    switch (item.WarehouseCode) {
                        case 1:
                            WarehouseCode = "Almacen 1";
                            break;
                        case 2:
                            WarehouseCode = "Almacen 2";
                            break;
                        case 3:
                            WarehouseCode = "Almacen 3";
                            break;
                    }
                    switch (item.ItemType) {
                        case "1":
                            ItemType = "Prducto Termiano";
                            break;
                        case "2":
                            ItemType = "Prducto de Prueba";
                            break;
                        case "3":
                            ItemType = "Materia Prima";
                            break;
                    }

                    $('#tblItems tbody').append("<tr><td>" + item.ItemCode + "</td><td>"
                        + item.ItemName + "</td><td>"
                        + item.Brand + "</td><td>"
                        + item.Cost + "</td><td hidden>"
                        + item.Package + "</td><td hidden>"
                        + item.Units + "</td><td>"
                        + item.PackageOnHand + "</td><td>"
                        + item.UnitsOnHand + "</td><td hidden>"
                        + item.UnitWeight + "</td><td hidden>"
                        + item.PackageWeight + "</td><td>"
                        + ItemType + "</td><td>"
                        + WarehouseCode + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblItems').DataTable().destroy();
                $('#tblItems tbody').empty();
                $.each(result.Items, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    switch (item.WarehouseCode) {
                        case 1:
                            WarehouseCode = "Almacen 1";
                            break;
                        case 2:
                            WarehouseCode = "Almacen 2";
                            break;
                        case 3:
                            WarehouseCode = "Almacen 3";
                            break;
                    }
                    switch (item.ItemType) {
                        case "1":
                            ItemType = "Prducto Termiano";
                            break;
                        case "2":
                            ItemType = "Prducto de Prueba";
                            break;
                        case "3":
                            ItemType = "Materia Prima";
                            break;
                    }

                    $('#tblItems tbody').append("<tr><td>" + item.ItemCode + "</td><td>"
                        + item.ItemName + "</td><td>"
                        + item.Brand + "</td><td>"
                        + item.Cost + "</td><td hidden>"
                        + item.Package + "</td><td hidden>"
                        + item.Units + "</td><td>"
                        + item.PackageOnHand + "</td><td>"
                        + item.UnitsOnHand + "</td><td hidden>"
                        + item.UnitWeight + "</td><td hidden>"
                        + item.PackageWeight + "</td><td>"
                        + ItemType + "</td><td>"
                        + WarehouseCode + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al eliminar el Item");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});

function DownloadInventory() {
    //window.location = "/Inventory/DownloadPDFInventory/";

    $("#modalContentPrint").html("Imprimir Orden");

    $("#modalBody2").load("/Inventory/DownloadPDFInventory/");
    $("#modalDataPrint").modal('show');
}

function DownloadInventoryLog() {
    window.location.href = "/Inventory/DownloadLogInventory/" ;
}
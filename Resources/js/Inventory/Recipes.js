$(document).ready(function () {
    $('#tblRecetas').DataTable();
    $('#tblProductos').DataTable();

    $("#Quantity").val("");
    $("#UnitOfMeasurement").val("");
    $("#Cost").val("");
    $("#CostXQuantity").val("");



    $('#Insumo').combobox('select', '');
});


function CallBack() {
    $('#tblRecetas').DataTable();

    $('#tblRecetas tbody').on('click', 'tr', function () {

        IdReceta = $(this).find('td:first').html();
        ItemCodeInput = $(this).find('td:nth-child(2)').html();
        Description = $(this).find('td:nth-child(3)').html();
        Quantity = $(this).find('td:nth-child(4)').html();
        UnitOfMeasurement = $(this).find('td:nth-child(5)').html();
        Cost = $(this).find('td:nth-child(6)').html();
        CostXQuantity = $(this).find('td:nth-child(7)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
    });
}


function CallBack2() {
    $('#tblProductos').DataTable();

    $('#tblProductos tbody').on('click', 'tr', function () {

        ItemCode = $(this).find('td:first').html();

        if (ultimaFila2 != null) {
            ultimaFila2.css('background-color', colorOriginalPAR2);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila2 = $(this);

        //Obtener el detalle
        GetRecipe(ItemCode);
    });
}

// Sección para el CRUD
function NewReceta() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#Quantity").val("");
    $("#UnitOfMeasurement").val("");
    $("#Cost").val("");
    $("#CostXQuantity").val("");

    $('#Insumo').combobox('select', '');

    $("#modalHeader").html("Nueva Receta");
    $("#modalReceta").modal('show');
}

function EditReceta() {
    console.log(IdReceta);
    if (IdReceta == 0 || IdReceta == "") {
        alertify.warning("Debe de seleccionar una Receta");
    } else {
        $("#modalHeader").html("Modificar Receta");

        $('#Insumo').combobox('select', ItemCodeInput);

        $("#Quantity").val(Quantity);
        $("#UnitOfMeasurement").val(UnitOfMeasurement);
        $("#Cost").val(Cost);
        $("#CostXQuantity").val(CostXQuantity);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalReceta").modal('show');
    }
}

var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";
var ultimaFila2 = null;
var colorOriginalPAR2 = "#ffffff";
var colorOriginalIMPAR2 = "#ffe35c";


$('#tblProductos tbody').on('click', 'tr', function () {

    ItemCode = $(this).find('td:first').html();

    if (ultimaFila2 != null) {
        ultimaFila2.css('background-color', colorOriginalPAR2);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila2 = $(this);

    //Obtener el detalle
    GetRecipe(ItemCode);
});


$('#tblRecetas tbody').on('click', 'tr', function () {

    IdReceta = $(this).find('td:first').html();
    ItemCodeInput = $(this).find('td:nth-child(2)').html();
    Description = $(this).find('td:nth-child(3)').html();
    Quantity = $(this).find('td:nth-child(4)').html();
    UnitOfMeasurement = $(this).find('td:nth-child(5)').html();
    Cost = $(this).find('td:nth-child(6)').html();
    CostXQuantity = $(this).find('td:nth-child(7)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#Save").on("click", function () {
    datos = {
        //IdReceta: IdReceta
        ItemCode: ItemCode
        , ItemCodeInput: $("#Insumo").val()
        , Description: ""
        , Quantity: $("#Quantity").val()
        , UnitOfMeasurement: $("#UnitOfMeasurement").val()
        , Cost: $("#Cost").val()
        , CostXQuantity: $("#CostXQuantity").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Recipes/AddItem',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Receta Agregada.");

                $('#tblRecetas').DataTable().destroy();
                $('#tblRecetas tbody').empty();
                $.each(result.Items, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblRecetas tbody').append("<tr><td>" + item.IdRecipe + "</td><td>"
                                                                 + item.ItemCodeInput + "</td><td>"
                                                                 + item.Description + "</td><td>"
                                                                 + item.Quantity + "</td><td>"
                                                                 + item.UnitOfMeasurement + "</td><td>"
                                                                 + item.Cost + "</td><td>"
                                                                 + item.CostXQuantity + "</td></tr>");
                });
                CallBack();

                
                $('#tblProductos').DataTable().destroy();
                $('#tblProductos tbody').empty();
                $.each(result.Inventory, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblProductos tbody').append("<tr><td>" + item.ItemCode + "</td><td>"
                                                                 + item.ItemName + "</td><td>"
                                                                 + item.Cost + "</td></tr>");
                });
                CallBack2();
            } else if (result.Res == false) {
                $('#tblRecetas').DataTable().destroy();
                $('#tblRecetas tbody').empty();
                $.each(result.Items, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblRecetas tbody').append("<tr><td>" + item.IdRecipe + "</td><td>"
                                                                 + item.ItemCodeInput + "</td><td>"
                                                                 + item.Description + "</td><td>"
                                                                 + item.Quantity + "</td><td>"
                                                                 + item.UnitOfMeasurement + "</td><td>"
                                                                 + item.Cost + "</td><td>"
                                                                 + item.CostXQuantity + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Receta");
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
        IdReceta: IdReceta
       , ItemCode: ItemCode
       , ItemCodeInput: $("#Insumo").val()
       , Description: ""
       , Quantity: $("#Quantity").val()
       , UnitOfMeasurement: $("#UnitOfMeasurement").val()
       , Cost: $("#Cost").val()
       , CostXQuantity: $("#CostXQuantity").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Recipes/AddItem',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Receta Actualizado.");
                $('#tblRecetas').DataTable().destroy();
                $('#tblRecetas tbody').empty();
                $.each(result.Items, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblRecetas tbody').append("<tr><td>" + item.IdRecipe + "</td><td>"
                                                                 + item.ItemCodeInput + "</td><td>"
                                                                 + item.Description + "</td><td>"
                                                                 + item.Quantity + "</td><td>"
                                                                 + item.UnitOfMeasurement + "</td><td>"
                                                                 + item.Cost + "</td><td>"
                                                                 + item.CostXQuantity + "</td></tr>");
                });
                CallBack();


                $('#tblProductos').DataTable().destroy();
                $('#tblProductos tbody').empty();
                $.each(result.Inventory, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblProductos tbody').append("<tr><td>" + item.ItemCode + "</td><td>"
                                                                 + item.ItemName + "</td><td>"
                                                                 + item.Cost + "</td></tr>");
                });
                CallBack2();
            } else if (result.Res == false) {
                $('#tblRecetas').DataTable().destroy();
                $('#tblRecetas tbody').empty();
                $.each(result.Items, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblRecetas tbody').append("<tr><td>" + item.IdRecipe + "</td><td>"
                                                                 + item.ItemCodeInput + "</td><td>"
                                                                 + item.Description + "</td><td>"
                                                                 + item.Quantity + "</td><td>"
                                                                 + item.UnitOfMeasurement + "</td><td>"
                                                                 + item.Cost + "</td><td>"
                                                                 + item.CostXQuantity + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al eliminar el Receta");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});

function GetRecipe(ItemCode) {
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Recipes/GetRecipe',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ ItemCode: ItemCode }),
        success: function (result) {
            if (result.Res) {
                alertify.success("Receta Agregado.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblRecetas').DataTable().destroy();
                $('#tblRecetas tbody').empty();
                $.each(result.Items, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblRecetas tbody').append("<tr><td>" + item.IdRecipe + "</td><td>"
                                                                 + item.ItemCodeInput + "</td><td>"
                                                                 + item.Description + "</td><td>"
                                                                 + item.Quantity + "</td><td>"
                                                                 + item.UnitOfMeasurement + "</td><td>"
                                                                 + item.Cost + "</td><td>"
                                                                 + item.CostXQuantity + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblRecetas').DataTable().destroy();
                $('#tblRecetas tbody').empty();
                $.each(result.Items, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblRecetas tbody').append("<tr><td>" + item.IdRecipe + "</td><td>"
                                                                 + item.ItemCodeInput + "</td><td>"
                                                                 + item.Description + "</td><td>"
                                                                 + item.Quantity + "</td><td>"
                                                                 + item.UnitOfMeasurement + "</td><td>"
                                                                 + item.Cost + "</td><td>"
                                                                 + item.CostXQuantity + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Receta");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
}

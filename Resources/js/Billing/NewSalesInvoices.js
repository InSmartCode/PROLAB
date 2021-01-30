$(document).ready(function () {
    
    $('#tblSaleDetail').DataTable({
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "No data available in table",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "No se Encontraron Registros",
            "infoFiltered": "(filtered1 from _MAX_ total entries)",
            "lengthMenu": "_MENU_ Registros por Pag.",
            "search": "Buscar: ",
            "zeroRecords": "No matching records found"
        },

        buttons: [
            //{ extend: 'print', className: 'btn btn-circle  green btn-outline btn-group-lg ' },
            //{ extend: 'pdf', className: 'btn btn-circle  green btn-outline btn-group-lg' },
            //{ extend: 'csv', className: 'btn btn-circle  green btn-outline btn-group-lg' }
        ],

        "order": [
            [0, 'asc']
        ],

        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "Todos"]
        ],
        "pageLength": 10
    });

    $('#tblItems').DataTable({
        "pageLength": 7,
        "searching": true,
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "No data available in table",
            "info": "Showing _START_ to _END_ of _TOTAL_ entries",
            "infoEmpty": "No entries found",
            "infoFiltered": "(filtered1 from _MAX_ total entries)",
            "lengthMenu": "_MENU_ entries",
            "search": "Burcar:",
            "zeroRecords": "No matching records found"
        },
        buttons: [
        ],
        responsive: true,
        "order": [
            [0, 'asc']
        ],
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ],
        "dom": "<'row' <'col-md-12'B>><'row'<'col-md-12 hidden'f>r><t><'row'<'col-sm-12'p>>"
    });

    $('#cliente').combobox('select', '');
    $('#ItemCode').val('');
    $('#ItemName').val('');
    $('#Price').val('');
    $('#Quantity').val('');
});

function CallBack2() {
    $('#tblSaleDetail').DataTable({
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "No data available in table",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "No se Encontraron Registros",
            "infoFiltered": "(filtered1 from _MAX_ total entries)",
            "lengthMenu": "_MENU_ Registros por Pag.",
            "search": "Buscar: ",
            "zeroRecords": "No matching records found"
        },

        buttons: [
            //{ extend: 'print', className: 'btn btn-circle  green btn-outline btn-group-lg ' },
            //{ extend: 'pdf', className: 'btn btn-circle  green btn-outline btn-group-lg' },
            //{ extend: 'csv', className: 'btn btn-circle  green btn-outline btn-group-lg' }
        ],

        "order": [
            [0, 'asc']
        ],

        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "Todos"]
        ],
        "pageLength": 10
    });
}

function callBack() {
    $('#tblItems').DataTable({
        "pageLength": 7,
        "searching": true,
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "No data available in table",
            "info": "Showing _START_ to _END_ of _TOTAL_ entries",
            "infoEmpty": "No entries found",
            "infoFiltered": "(filtered1 from _MAX_ total entries)",
            "lengthMenu": "_MENU_ entries",
            "search": "Burcar:",
            "zeroRecords": "No matching records found"
        },
        buttons: [
        ],
        responsive: true,
        "order": [
            [0, 'asc']
        ],
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ],
        "dom": "<'row' <'col-md-12'B>><'row'<'col-md-12 hidden'f>r><t><'row'<'col-sm-12'p>>"
    });
}

$('#DateIn').datetimepicker({
    language: 'es',
    autoclose: 1,
    startView: 2,
    minView: 2,
    calendarWeeks: false,
    format: "yyyy-mm-dd"
});

$('#cliente').combobox({
    onSelect: function (row) {
        var IdCliente = row.value;
        if (IdCliente != "") {
            $.ajax({
                type: "POST",
                traditional: true,
                url: "/Billing/GetInfoClient",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ IdClient: IdCliente }),
                success: function (resultado) {
                    $('#tblItems').DataTable().destroy();
                    $('#tblItems tbody').empty();
                    $.each(resultado.PriceList, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblItems tbody').append("<tr><td>" + item.ItemCode + "</td><td>" + item.Dscription + "</td><td hidden>" + item.Price + "</td></tr>");
                    });
                    callBack();
                    $('#btnNew').prop('disabled', false);
                },
                error: function () {
                    alert('Ha ocurrido un error al Ingresar el producto');
                }
            });
        }
    }
});

var formatNumber = {
    separador: ",", // separador para los miles
    sepDecimal: '.', // separador para los decimales
    formatear: function (num) {
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },
    new: function (num, simbol) {
        this.simbol = simbol || '';
        return this.formatear(num);
    }

}

var ultimaFila = null;
var ultimaFila2 = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#fbfcfd";

$('#tblItems tbody').on('click', 'tr', function () {
    var itemCode = $(this).find('td:first').html();
    var itemName = $(this).find('td:nth-child(2)').html();
    var priceList = $(this).find('td:nth-child(3)').html();

    if (ultimaFila != null) {
        var tipo = (itemCode % 2) ? "Impar" : "Par";
        if (tipo == "Impar") {
            ultimaFila.css('background-color', colorOriginalIMPAR);
        } else {
            ultimaFila.css('background-color', colorOriginalPAR);
        }
    }
    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    // LLenamos los campos.
    $("#ItemCode").val(itemCode);
    $("#ItemName").val(itemName);
    $("#Price").val(priceList);
    $("#Quantity").val("");


    // Evaluamos que el producto tenga asignado un precio para poder ser vendido.    
    if ($('#Quantity').val() == "") {
        $('[data-toggle="popoverSinPrecio"]').popover('show');
        $('#SaveAndNext').prop('disabled', true);
        $('#Save').prop('disabled', true);
    } else {
        $('[data-toggle="popoverSinPrecio"]').popover('hide');
        $('#SaveAndNext').prop('disabled', false);
        $('#Save').prop('disabled', false);
    }

    $("#Quantity").focus();
});

function newItem() {
    $("#modalHeader").html("Nuevo Producto");


    $('#divItems').prop("hidden", false);
    $('#Edit').prop("hidden", true);
    $('#SaveAndNext').prop("hidden", false);
    $('#Save').prop("hidden", false);

    $("#modalAddItem").modal('show');
}

function EditItem() {
    $("#modalHeader").html("Editar Producto");
    

    $('#divItems').prop("hidden", true);
    $('#Edit').prop("hidden", false);
    $('#SaveAndNext').prop("hidden", true);
    $('#Save').prop("hidden", true);

    $("#modalUpdateItem").modal('show');
}


function OrderData() {
    $("#modalContentOrderData").html("Datos y Comentarios de la Orden");


    //$('#divItems').prop("hidden", true);
    //$('#Edit').prop("hidden", false);
    //$('#SaveAndNext').prop("hidden", true);
    //$('#Save').prop("hidden", true);

    $("#modalOrderData").modal('show');
}


$('#tblSaleDetail tbody').on('click', 'tr', function () {
    var IdSalesDetail = $(this).find('td:first').html();
    var LineNum = $(this).find('td:nth-child(2)').html();
    var ItemCode = $(this).find('td:nth-child(3)').html();
    var ItemName = $(this).find('td:nth-child(4)').html();
    var Quantity = $(this).find('td:nth-child(5)').html();
    var Price = $(this).find('td:nth-child(6)').html();

    if (ultimaFila2 != null) {
        var tipo = (IdSalesDetail % 2) ? "Impar" : "Par";
        if (tipo == "Impar") {
            ultimaFila2.css('background-color', colorOriginalIMPAR);
        } else {
            ultimaFila2.css('background-color', colorOriginalPAR);
        }
    }
    $(this).css('background-color', '#ffe35c');
    ultimaFila2 = $(this);

    // LLenamos los campos.
    $("#ItemCodeUpdate").val(ItemCode);
    $("#ItemNameUpdate").val(ItemName);
    $("#PriceUpdate").val(Price);
    $("#QuantityUpdate").val("");


    // Evaluamos que el producto tenga asignado un precio para poder ser vendido.    
    if ($('#QuantityUpdate').val() == "") {
        $('[data-toggle="popoverSinPrecio"]').popover('show');
        $('#SaveAndNext').prop('disabled', true);
        $('#Save').prop('disabled', true);
        $('#Edit').prop('disabled', true);
    } else {
        $('[data-toggle="popoverSinPrecio"]').popover('hide');
        $('#SaveAndNext').prop('disabled', false);
        $('#Save').prop('disabled', false);
        $('#Edit').prop('disabled', false);
    }

    $('#btnEdit').prop('disabled', false);

    $('#btnDeleteItem').prop('disabled', false);

    $("#QuantityUpdate").focus();
});


$('#Quantity').on('keyup', function (e) {

    var numero = $('#Quantity').val();
    if (e.which == 13) {
        if (numero == '') {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $("#Quantity").focus();
            $('#Edit').prop('disabled', true);
            return;
        }
        else if (numero == 0) {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#Quantity").focus();
            return;
        } else if (numero % 1 == 0) {
            AddItem('Add');
        } else {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");
            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#Quantity").focus();
            return;
        }
    } else {
        if (numero == '') {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#Quantity").focus();
            return;
        }
        else if (numero == 0) {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#Quantity").focus();
            return;
        }else if (numero % 1 == 0) {
            $('#SaveAndNext').prop('disabled', false);
            $('#Save').prop('disabled', false);
            $('#Edit').prop('disabled', false);
            $("#Quantity").focus();
            return;
        } else {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");
            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#Quantity").focus();
            return;
        }
    }
    

});

$('#QuantityUpdate').on('keyup', function (e) {

    var numero = $('#QuantityUpdate').val();
    if (e.which == 13) {
        if (numero == '') {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $("#QuantityUpdate").focus();
            $('#Edit').prop('disabled', true);
            return;
        }
        else if (numero == 0) {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#QuantityUpdate").focus();
            return;
        } else if (numero % 1 == 0) {
            UpdateItem('Add');
        } else {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");
            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#QuantityUpdate").focus();
            return;
        }
    } else {
        if (numero == '') {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#QuantityUpdate").focus();
            return;
        }
        else if (numero == 0) {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#QuantityUpdate").focus();
            return;
        } else if (numero % 1 == 0) {
            $('#SaveAndNext').prop('disabled', false);
            $('#Save').prop('disabled', false);
            $('#Edit').prop('disabled', false);
            $("#QuantityUpdate").focus();
            return;
        } else {
            alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");
            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#QuantityUpdate").focus();
            return;
        }
    }


});


$('#SaveAndNext').click(function () {
    var id = $('#IdComentsOrder').val();
    var num = $('#NumAtCard').val();
    if (id == "" || id == "Seleccione" || num == "") {
        alertify.error("Porfavor Ingrese Correlativo de la Factura y el Número de la Orden");
    } else {
        AddItem('Add');
    }
});

$('#Save').click(function () {
    var id = $('#IdComentsOrder').val();
    var num = $('#NumAtCard').val();
    if (id == "" || id == "Seleccione" || num == "") {
        alertify.error("Porfavor Ingrese Correlativo de la Factura y el Número de la Orden");
    } else {
        AddItem('Add');
    }
});


$('#Edit').click(function () {
    var id = $('#IdComentsOrder').val();
    var num = $('#NumAtCard').val();
    if (id == "" || id == "Seleccione" || num == "") {
        alertify.error("Porfavor Ingrese Correlativo de la Factura y el Número de la Orden");
    } else {
        UpdateItem();
    }
});

$('#btnDeleteItem').click(function () {
    var datos = {
        // Información del producto.
        IdClient: $('#cliente').val(),
        NumAtCard: $("#NumAtCard").val(),
        DocDate: $("#DocDate").val(),
        FlgNew: $("#FlgNew").val(),
        ItemCode: $("#ItemCodeUpdate").val(),
        ItemName: $("#ItemNameUpdate").val(),
        Quantity: 0,
        UnitPrice: $("#PriceUpdate").val()
    };

    $.ajax({
        type: "POST",
        traditional: true,
        url: "/Billing/DeleteSalesDocItem/",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {

            if (result.Message == 0) {
                ItemsList(result.SaleDetail, result.Sale);
            } else {
                alertify.error('Ha ocurrido un error al ingresar el producto');
            }
            $("#FlgNew").val();

            $('#SaveAndNext').prop('disabled', false);
            $('#Save').prop('disabled', false);
            $('#Edit').prop('disabled', false);
            //call2.DataTable().search("").draw();
        },
        error: function () {
            $('#SaveAndNext').prop('disabled', false);
            $('#Save').prop('disabled', false);
            $('#Edit').prop('disabled', false);

            alertify.error('Ha ocurrido un error al ingresar el producto');
        }
    });

});

function AddItem() {
    var numero = $('#Quantity').val();
    var datos = {
        // Información del producto.
        IdClient: $('#cliente').val(),
        IdComentsOrder: $('#IdComentsOrder').val(),
            NumAtCard: $("#NumAtCard").val(),
            DocDate: $("#DocDate").val(),
            FlgNew: $("#FlgNew").val(),
            ItemCode: $("#ItemCode").val(),
            ItemName: $("#ItemName").val(),
            Quantity: $("#Quantity").val(),
            UnitPrice: $("#Price").val()
        };
   
    if (numero == '') {
        alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

        $('#SaveAndNext').prop('disabled', true);
        $('#Save').prop('disabled', true);
        $('#Edit').prop('disabled', true);
        $('#Download').prop('disabled', true);
        $("#Quantity").focus();
        return;
    }
    else if (numero == 0) {
        alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

        $('#SaveAndNext').prop('disabled', true);
        $('#Save').prop('disabled', true);
        $('#Edit').prop('disabled', true);
        $('#Download').prop('disabled', true);
        $("#Quantity").focus();
        return;
    } else if (numero % 1 == 0) {
        

        $.ajax({
            type: "POST",
            traditional: true,
            url: "/Billing/AddSalesDocItem/",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(datos),
            success: function (result) {

                if (result.Message == 0) {
                    ItemsList(result.SaleDetail, result.Sale);
                } else {
                    alertify.error('Ha ocurrido un error al ingresar el producto');
                }
                $("#FlgNew").val();

                $('#SaveAndNext').prop('disabled', false);
                $('#Save').prop('disabled', false);
                $('#Edit').prop('disabled', false);
                $('#Download').prop('disabled', false);
                //call2.DataTable().search("").draw();
            },
            error: function () {
                $('#SaveAndNext').prop('disabled', false);
                $('#Save').prop('disabled', false);
                $('#Edit').prop('disabled', false);
                $('#Download').prop('disabled', false);
                
                alertify.error('Ha ocurrido un error al ingresar el producto');
            }
        });
    } else {
        alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");
        $('#SaveAndNext').prop('disabled', true);
        $('#Save').prop('disabled', true);
        $('#Edit').prop('disabled', true);
        $('#Download').prop('disabled', false);
        $("#Quantity").focus();
        return;
    }
}

function UpdateItem() {
    var numero = $('#QuantityUpdate').val();
    var datos = {
            // Información del producto.
        IdClient: $('#cliente').val(),
            NumAtCard: $("#NumAtCard").val(),
            DocDate: $("#DocDate").val(),
            FlgNew: $("#FlgNew").val(),
            ItemCode: $("#ItemCodeUpdate").val(),
            ItemName: $("#ItemNameUpdate").val(),
            Quantity: $("#QuantityUpdate").val(),
            UnitPrice: $("#PriceUpdate").val()
        };
    
    if (numero == '') {
        alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

        $('#SaveAndNext').prop('disabled', true);
        $('#Save').prop('disabled', true);
        $('#Edit').prop('disabled', true);
        $("#QuantityUpdate").focus();
        return;
    }
    else if (numero == 0) {
        alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");

        $('#SaveAndNext').prop('disabled', true);
        $('#Save').prop('disabled', true);
        $('#Edit').prop('disabled', true);
        $("#QuantityUpdate").focus();
        return;
    } else if (numero % 1 == 0) {


        $.ajax({
            type: "POST",
            traditional: true,
            url: "/Billing/UpdateSalesDocItem/",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(datos),
            success: function (result) {

                if (result.Message == 0) {
                    ItemsList(result.SaleDetail, result.Sale);
                } else {
                    alertify.error('Ha ocurrido un error al ingresar el producto');
                }
                $("#FlgNew").val();

                $('#SaveAndNext').prop('disabled', false);
                $('#Save').prop('disabled', false);
                $('#Edit').prop('disabled', false);
                //call2.DataTable().search("").draw();
            },
            error: function () {
                $('#SaveAndNext').prop('disabled', false);
                $('#Save').prop('disabled', false);
                $('#Edit').prop('disabled', false);

                alertify.error('Ha ocurrido un error al ingresar el producto');
            }
        });
    } else {
        alertify.error("Debe digitar una cantidad valida para ingresar un nuevo producto.");
        $('#SaveAndNext').prop('disabled', true);
        $('#Save').prop('disabled', true);
        $('#Edit').prop('disabled', true);
        $("#QuantityUpdate").focus();
        return;
    }
}

function ItemsList(SaleDetail, Sale){
    $('#tblSaleDetail').DataTable().destroy();
    $('#tblSaleDetail tbody').empty();
    $.each(SaleDetail, function (i, PriceLists) {
        /* Vamos agregando a nuestra tabla las filas necesarias */
        $('#tblSaleDetail tbody').append("<tr><td hidden>" + PriceLists.IdSalesDetail + "</td><td>"
                                                    + PriceLists.LineNume + "</td><td>"
                                                    + PriceLists.ItemCode + "</td><td>"
                                                    + PriceLists.ItemName + "</td><td>"
                                                    + PriceLists.Quantity + "</td><td>"
                                                    + PriceLists.UnitPrice + "</td><td>"
                                                    + PriceLists.LineTotal + "</td></tr>");
    });
    CallBack2();


    $("#tdSubtotal").html(formatNumber.new(Sale.SubTotall.toFixed(2), "$ "));
    $("#IVA").html(formatNumber.new(Sale.IVAl.toFixed(2), "$ "));
    $("#Percepcion").html(formatNumber.new(Sale.Perceptionl.toFixed(2), "$ "));
    $("#Total").html(formatNumber.new(Sale.DocTotall.toFixed(2), "$ "));

    
    $("#FlgNew").val("N");
}

$('#Download').click(function () {

    //window.location = "/Billing/DownloadPDFSales/" + $("#NumAtCard").val();

    if (IdComentsOrder == 0 || IdComentsOrder == "") {
        alertify.warning("Debe de seleccionar un Orden");
    } else {
        $("#modalContentPrint").html("Imprimir Factura");

        $("#modalBody2").load("/Billing/PrintSale/" + $("#NumAtCard").val());
        $("#modalDataPrint").modal('show');
    }

});



function SaveSale(){

    $.ajax({
        type: "POST",
        traditional: true,
        url: "/Billing/SaveSale/",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ NumAtCard: $("#NumAtCard").val() }),
        success: function (result) {

            if (result.Res == true) {
                alertify.success('Realizado');
            } else {
                alertify.error('Ha ocurrido un error ');
            }
        },
        error: function () {
            alertify.error('Ha ocurrido un error al ingresar el producto');
        }
    });
}
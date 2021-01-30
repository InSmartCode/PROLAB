$(document).ready(function () {

    $('#tblPurchaseDetail').DataTable({
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

    $('#tblItems').DataTable({
        "scrollY": "200px",
        "scrollCollapse": true,
        "paging": false
    });

    $('#provider').combobox('select', '');
    $('#ItemCode').val('');
    $('#ItemName').val('');
    $('#Price').val('');
    $('#Quantity').val('');

    $("#FlgNew").val("S");
});

function CallBack2() {
    $('#tblPurchaseDetail').DataTable({
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

function callBack() {
    $('#tblItems').DataTable({
        "pageLength": 6,
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

$('#provider').combobox({
    onSelect: function (row) {
        var IdProveedor = row.value;
        if (IdProveedor != "") {
            $.ajax({
                type: "POST",
                traditional: true,
                url: "/Billing/GetInfoPrivider",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ IdProvider: IdProveedor }),
                success: function (resultado) {
                    $('#tblItems').DataTable().destroy();
                    $('#tblItems tbody').empty();
                    $.each(resultado.PriceList, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblItems tbody').append("<tr><td>" + item.ItemCode + "</td><td>" + item.ItemName + "</td><td hidden></td></tr>");
                    });
                    callBack();
                    $('#btnNewItem').prop('disabled', false);
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

    $("#Price").focus();
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
    if (ItemCode != null) {
        $("#modalHeaderUpdate").html("Editar Producto");


        $('#divItems').prop("hidden", true);
        $('#Edit').prop("hidden", false);
        $('#SaveAndNext').prop("hidden", true);
        $('#Save').prop("hidden", true);

        $("#modalUpdateItem").modal('show');
    } else {
        alertify.error("Debe seleccionar un producto para continuar");
    }

   
}

$('#tblPurchaseDetail tbody').on('click', 'tr', function () {
    IdPurchaseDetail = $(this).find('td:first').html();
    LineNum = $(this).find('td:nth-child(2)').html();
    ItemCode = $(this).find('td:nth-child(3)').html();
    ItemName = $(this).find('td:nth-child(4)').html();
    Quantity = $(this).find('td:nth-child(5)').html();
    Price = $(this).find('td:nth-child(6)').html();

    if (ultimaFila2 != null) {
        var tipo = (IdPurchaseDetail % 2) ? "Impar" : "Par";
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

    $("#PriceUpdate").focus();
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
        } else if (numero % 1 == 0) {
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


$('#Price').on('keyup', function (e) {
    var numero = $('#Price').val();
    var prctn = numero % 1;
    if (e.which == 13) {
        if (numero == '') {
            alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $("#Price").focus();
            $('#Edit').prop('disabled', true);
            return;
        }
        else if (numero == 0) {
            alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#Price").focus();
            return;
        } else if (numero % 1 == 0) {
            AddItem('Add');
        } else {
            //alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");
            //$('#SaveAndNext').prop('disabled', true);
            //$('#Save').prop('disabled', true);
            //$('#Edit').prop('disabled', true);
            //$("#Price").focus();
            return;
        }
    } else {
        if (numero == '') {
            alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#Price").focus();
            return;
        }
        else if (numero == 0) {
            alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#Price").focus();
            return;
        } else if (numero % 1 == 0) {
            $('#SaveAndNext').prop('disabled', false);
            $('#Save').prop('disabled', false);
            $('#Edit').prop('disabled', false);
            $("#Price").focus();
            return;
        } else {
            //alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");
            //$('#SaveAndNext').prop('disabled', true);
            //$('#Save').prop('disabled', true);
            //$('#Edit').prop('disabled', true);
            //$("#Price").focus();
            return;
        }
    }


});

$('#PriceUpdate').on('keyup', function (e) {

    var numero = $('#PriceUpdate').val();
    if (e.which == 13) {
        if (numero == '') {
            alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $("#PriceUpdate").focus();
            $('#Edit').prop('disabled', true);
            return;
        }
        else if (numero == 0) {
            alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#PriceUpdate").focus();
            return;
        } else if (numero % 1 == 0) {
            UpdateItem('Add');
        } else {
            //alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");
            //$('#SaveAndNext').prop('disabled', true);
            //$('#Save').prop('disabled', true);
            //$('#Edit').prop('disabled', true);
            //$("#PriceUpdate").focus();
            return;
        }
    } else {
        if (numero == '') {
            alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#PriceUpdate").focus();
            return;
        }
        else if (numero == 0) {
            alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");

            $('#SaveAndNext').prop('disabled', true);
            $('#Save').prop('disabled', true);
            $('#Edit').prop('disabled', true);
            $("#PriceUpdate").focus();
            return;
        } else if (numero % 1 == 0) {
            $('#SaveAndNext').prop('disabled', false);
            $('#Save').prop('disabled', false);
            $('#Edit').prop('disabled', false);
            $("#PriceUpdate").focus();
            return;
        } else {
            //alertify.error("Debe digitar un Precio valido para ingresar un nuevo producto.");
            //$('#SaveAndNext').prop('disabled', true);
            //$('#Save').prop('disabled', true);
            //$('#Edit').prop('disabled', true);
            //$("#PriceUpdate").focus();
            return;
        }
    }


});

$('#SaveAndNext').click(function () {
    AddItem('Add');
});

$('#Save').click(function () {
    AddItem('Add');
});


$('#Edit').click(function () {
    UpdateItem();
});

$('#btnDeleteItem').click(function () {
    var datos = {
        // Información del producto.
        IdProvider: $('#provider').val(),
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
        url: "/Billing/DeletePurchaseDocItem/",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {

            if (result.Message == 0) {
                ItemsList(result.PurchaseDetail, result.Purchase);
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
        IdProvider: $('#provider').val(),
        NumAtCard: $("#NumAtCard").val(),
        DocDate: $("#DocDate").val(),
        FlgNew: $("#FlgNew").val(),
        ItemCode: $("#ItemCode").val(),
        ItemName: $("#ItemName").val(),
        Quantity: $("#Quantity").val(),
        UnitPrice: $("#Price").val()
    };

    if ($("#NumAtCard").val()=="") {
        alertify.error("Debe digitar correlativo de la factrura valida para ingresar un nuevo producto.");
        return;
    }

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
    } else if (numero % 1 == 0) {


        $.ajax({
            type: "POST",
            traditional: true,
            url: "/Billing/AddPurchaseDocItem/",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(datos),
            success: function (result) {

                if (result.Message == 0) {
                    ItemsList(result.PurchaseDetail, result.Purchase);
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
        $("#Quantity").focus();
        return;
    }
}

function UpdateItem() {
    var numero = $('#QuantityUpdate').val();
    var datos = {
        // Información del producto.
        IdProvider: $('#provider').val(),
        NumAtCard: $("#NumAtCard").val(),
        DocDate: $("#DocDate").val(),
        FlgNew: $("#FlgNew").val(),
        ItemCode: $("#ItemCodeUpdate").val(),
        ItemName: $("#ItemNameUpdate").val(),
        Quantity: $("#QuantityUpdate").val(),
        UnitPrice: $("#PriceUpdate").val()
    };

    if ($("#NumAtCard").val() == "") {
        alertify.error("Debe digitar correlativo de la factrura valida para ingresar un nuevo producto.");
        return;
    }

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
            url: "/Billing/UpdatePurchaseDocItem/",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(datos),
            success: function (result) {

                if (result.Message == 0) {
                    ItemsList(result.PurchaseDetail, result.Purchase);
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

function ItemsList(PurchaseDetail, Purchase) {
    $('#tblPurchaseDetail').DataTable().destroy();
    $('#tblPurchaseDetail tbody').empty();
    $.each(PurchaseDetail, function (i, PriceLists) {
        /* Vamos agregando a nuestra tabla las filas necesarias */
        $('#tblPurchaseDetail tbody').append("<tr><td hidden>" + PriceLists.IdPurchaseDetail + "</td><td>"
                                                    + PriceLists.LineNume + "</td><td>"
                                                    + PriceLists.ItemCode + "</td><td>"
                                                    + PriceLists.ItemName + "</td><td>"
                                                    + PriceLists.Quantity + "</td><td>"
                                                    + PriceLists.UnitPrice + "</td><td>"
                                                    + PriceLists.LineTotal + "</td></tr>");
    });
    CallBack2();

    if (Purchase != null) {
        $("#tdSubtotal").html(formatNumber.new(Purchase.SubTotal.toFixed(2), "$ "));
        $("#IVA").html(formatNumber.new(Purchase.IVA.toFixed(2), "$ "));
        $("#Total").html(formatNumber.new(Purchase.DocTotal.toFixed(2), "$ "));
        //$("#Percepcion").html(formatNumber.new(Purchase.Perception.toFixed(2), "$ "));
    } else {
        $("#tdSubtotal").html(formatNumber.new(0, "$ "));
        $("#IVA").html(formatNumber.new(0, "$ "));
        $("#Percepcion").html(formatNumber.new(0, "$ "));
        $("#Total").html(formatNumber.new(0, "$ "));
    }


    $("#FlgNew").val("N");
}



function SavePurchase() {

    $.ajax({
        type: "POST",
        traditional: true,
        url: "/Billing/SavePurchase/",
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
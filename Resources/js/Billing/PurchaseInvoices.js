$(document).ready(function () {

    $('#tblPurchase').DataTable({
        "pageLength": 10,
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


    //$('#cliente').combobox('select', '');
    //$('#ItemCode').val('');
    //$('#ItemName').val('');
    //$('#Price').val('');
    //$('#Quantity').val('');
});
function CallBack() {
    $('#tblPurchase').DataTable({
        "pageLength": 10,
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
    startView: 3,
    minView: 3,
    calendarWeeks: false,
    format: "yyyy-mm"
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


var idPurchase = "";
var ultimaFila = null;
var ultimaFila2 = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#fbfcfd";

$('#tblPurchase tbody').on('click', 'tr', function () {
    idPurchase = $(this).find('td:first').html();
    //var idcliente = $(this).find('td:nth-child(2)').html();

    if (ultimaFila != null) {
        var tipo = (idPurchase % 2) ? "Impar" : "Par";
        if (tipo == "Impar") {
            ultimaFila.css('background-color', colorOriginalIMPAR);
        } else {
            ultimaFila.css('background-color', colorOriginalPAR);
        }
    }
    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

});


function ShowDetailPurchase() {
    $("#modalHeader").html("Detalle de Factura");

    if (idPurchase != "") {
        $.ajax({
            type: "POST",
            traditional: true,
            url: "/Billing/GetInfoPurchase",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdPurchase: idPurchase }),
            success: function (resultado) {

                if (resultado.Res) {
                    //$('#tblPurchaseDetail').DataTable().destroy();
                    $('#tblPurchaseDetail tbody').empty();
                    $.each(resultado.PurchaseDetail, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblPurchaseDetail tbody').append("<tr><td>" + item.LineNume + "</td><td>"
                                                                    + item.ItemCode + "</td><td>"
                                                                    + item.ItemName + "</td><td>"
                                                                    + item.Quantity + "</td><td>"
                                                                    + item.UnitPrice + "</td><td>"
                                                                    + item.LineTotal + "</td></tr>");
                    });

                    var fecha = moment(resultado.Purchase.DocDate).format('DD/MM/YYYY');
                    $('#IdPurchase').text(resultado.Purchase.IdPurchase);
                    $('#IdProvider').text(resultado.Purchase.IdProvider);
                    $('#ClienteProvName').text(resultado.Provider.ClienteProvName);
                    $('#NumAtCard').text(resultado.Purchase.NumAtCard);
                    $('#DocDate').text(fecha);
                    $('#Status').text(resultado.Purchase.Status);
                    $('#SubTotal').text(formatNumber.new(resultado.Purchase.SubTotal.toFixed(2), "$ "));
                    $('#IVA').text(formatNumber.new(resultado.Purchase.IVA.toFixed(2), "$ "));
                    $('#DocTotal').text(formatNumber.new(resultado.Purchase.DocTotal.toFixed(2), "$ "));
                } else {
                    alertify.error('Ha ocurrido un error al ingresar el producto');
                }


                $("#modalDetailPurchase").modal('show');
            },
            error: function () {
                alert('Ha ocurrido un error al Ingresar el producto');
            }
        });
    } else {
        alertify.error("Debe seleccionar una Factura para continuar");
    }

}

function UpdatePurchase() {
    //var date =$('#DateIn').data('date');
    //var date = $('#DateIn').val();
    $.ajax({
        type: "POST",
        traditional: true,
        url: "/Billing/GetPurchaseByDate",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Date: $('#DateIn').data('date') }),
        success: function (resultado) {

            if (resultado.Res) {
                $('#tblPurchase').DataTable().destroy();
                $('#tblPurchase tbody').empty();
                $.each(resultado.PurchaseInvoices, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.DocDate).format('DD/MM/YYYY');
                    $('#tblPurchase tbody').append("<tr><td hidden>" + item.IdPurchase + "</td><td>"
                                                                + item.IdProvider + "</td><td>"
                                                                + item.ClienteProvName + "</td><td>"
                                                                + item.NumAtCard + "</td><td>"
                                                                + fecha + "</td><td>"
                                                                + item.DocTotal.toFixed(2) + "</td><td>"
                                                                + item.Status + "</td></tr>");
                });
                CallBack();
            } else {
                alertify.error('Ha ocurrido un error al obtener datos');
            }

        },
        error: function () {
            alert('Ha ocurrido un error al Ingresar el producto');
        }
    });
}


function EditPurchase() {
    if (idPurchase != "") {
        window.location.href = "/Billing/EditPurchaseInvoices/?IdPurchase=" + idPurchase;
    } else {
        alertify.error("Debe seleccionar una Factura para continuar");
    }
}
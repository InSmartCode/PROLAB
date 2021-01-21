$(document).ready(function () {

    $('#tblSales').DataTable({
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
    $('#tblSales').DataTable({
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


var idsale="";
var ultimaFila = null;
var ultimaFila2 = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#fbfcfd";

$('#tblSales tbody').on('click', 'tr', function () {
    idsale = $(this).find('td:first').html();
    //var idcliente = $(this).find('td:nth-child(2)').html();

    if (ultimaFila != null) {
        var tipo = (idsale % 2) ? "Impar" : "Par";
        if (tipo == "Impar") {
            ultimaFila.css('background-color', colorOriginalIMPAR);
        } else {
            ultimaFila.css('background-color', colorOriginalPAR);
        }
    }
    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

});


function ShowDetailSale() {
    $("#modalHeader").html("Detalle de Factura");

    if (idsale!="") {
        $.ajax({
            type: "POST",
            traditional: true,
            url: "/Billing/GetInfoInvoice",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdSale: idsale }),
            success: function (resultado) {

                if (resultado.Res) {
                    //$('#tblSaleDetail').DataTable().destroy();
                    $('#tblSaleDetail tbody').empty();
                    $.each(resultado.SaleDetail, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblSaleDetail tbody').append("<tr><td>" + item.LineNume + "</td><td>"
                                                                    + item.ItemCode + "</td><td>"
                                                                    + item.ItemName + "</td><td>"
                                                                    + item.Quantity + "</td><td>"
                                                                    + item.UnitPrice + "</td><td>"
                                                                    + item.LineTotal + "</td></tr>");
                    });

                    var fecha = moment(resultado.Sale.DocDate).format('DD/MM/YYYY');
                    $('#IdSale').text(resultado.Sale.IdSale);
                    $('#IdClient').text(resultado.Sale.IdClient);
                    $('#ClienteProvName').text(resultado.Sale.ClienteProvName);
                    $('#NumAtCard').text(resultado.Sale.NumAtCard);
                    $('#DocDate').text(fecha);
                    $('#Status').text(resultado.Sale.Status);
                    $('#SubTotal').text(formatNumber.new(resultado.Sale.SubTotal, "$ "));
                    $('#IVA').text(formatNumber.new(resultado.Sale.IVA, "$ "));
                    $('#DocTotal').text(formatNumber.new(resultado.Sale.DocTotal, "$ "));
                } else {
                    alertify.error('Ha ocurrido un error al ingresar el producto');
                }

               
                $("#modalDetailSale").modal('show');
            },
            error: function () {
                alert('Ha ocurrido un error al Ingresar el producto');
            }
        });
    } else {
        alertify.error("Debe seleccionar una Factura para continuar");
    }

}

function UpdateSales() {
    //var date =$('#DateIn').data('date');
    //var date = $('#DateIn').val();
    $.ajax({
        type: "POST",
        traditional: true,
        url: "/Billing/GetSalesByDate",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Date: $('#DateIn').data('date') }),
        success: function (resultado) {

            if (resultado.Res) {
                $('#tblSales').DataTable().destroy();
                $('#tblSales tbody').empty();
                $.each(resultado.SalesInvoices, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.DocDate).format('DD/MM/YYYY');
                    $('#tblSales tbody').append("<tr><td hidden>" + item.IdSale + "</td><td>"
                                                                + item.IdClient + "</td><td>"
                                                                + item.ClienteProvName + "</td><td>"
                                                                + item.NumAtCard + "</td><td>"
                                                                + fecha + "</td><td>"
                                                                + item.DocTotal + "</td><td>"
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


function EditSale() {
    if (idsale!="") {
        window.location.href = "/Billing/EditSalesInvoices/?IdSale=" + idsale;
    } else {
        alertify.error("Debe seleccionar una Factura para continuar");
    }
}
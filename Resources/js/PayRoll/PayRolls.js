$(document).ready(function () {
    $('#tblPayRolls').DataTable();
    $('#btnPrintPayment').prop("disabled", true);
});


function CallBack() {
    $('#tblPayRolls').DataTable();

    $('#tblPayRolls tbody').on('click', 'tr', function () {

        IdPayroll = $(this).find('td:first').html();
        IdEmploye = $(this).find('td:nth-child(2)').html();
        EmployeName = $(this).find('td:nth-child(3)').html();
        EmployeLastName = $(this).find('td:nth-child(4)').html();
        BaseSalary = $(this).find('td:nth-child(5)').html();
        EarnedSalary = $(this).find('td:nth-child(6)').html();
        Holidays = $(this).find('td:nth-child(7)').html();
        AFP = $(this).find('td:nth-child(8)').html();
        ISSS = $(this).find('td:nth-child(9)').html();
        Rent = $(this).find('td:nth-child(10)').html();
        OtherDiscounts = $(this).find('td:nth-child(11)').html();
        DialingDiscount = $(this).find('td:nth-child(12)').html();
        Bonus = $(this).find('td:nth-child(13)').html();
        Compensation = $(this).find('td:nth-child(14)').html();
        NetSalary = $(this).find('td:nth-child(15)').html();
        PayDate = $(this).find('td:nth-child(16)').html();
        PayMonth = $(this).find('td:nth-child(17)').html();
        NumPay = $(this).find('td:nth-child(18)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnPrintPayment').prop("disabled", false);
    });


    $('#btnPrintPayment').prop("disabled", true);
}

function CallBack2() {
    $('#tblPayRolls2').DataTable();

    $('#tblPayRolls2 tbody').on('click', 'tr', function () {

        IdPayroll = $(this).find('td:first').html();
        IdEmploye = $(this).find('td:nth-child(2)').html();
        EmployeName = $(this).find('td:nth-child(3)').html();
        EmployeLastName = $(this).find('td:nth-child(4)').html();
        BaseSalary = $(this).find('td:nth-child(5)').html();
        EarnedSalary = $(this).find('td:nth-child(6)').html();
        Holidays = $(this).find('td:nth-child(7)').html();
        AFP = $(this).find('td:nth-child(8)').html();
        ISSS = $(this).find('td:nth-child(9)').html();
        Rent = $(this).find('td:nth-child(10)').html();
        OtherDiscounts = $(this).find('td:nth-child(11)').html();
        DialingDiscount = $(this).find('td:nth-child(12)').html();
        Bonus = $(this).find('td:nth-child(13)').html();
        Compensation = $(this).find('td:nth-child(14)').html();
        NetSalary = $(this).find('td:nth-child(15)').html();
        PayDate = $(this).find('td:nth-child(16)').html();
        PayMonth = $(this).find('td:nth-child(17)').html();
        NumPay = $(this).find('td:nth-child(18)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnPrintPayment').prop("disabled", false);
    });
    $('#btnPrintPayment').prop("disabled", true);
}

$('#DateIn').datetimepicker({
    language: 'es',
    autoclose: 1,
    startView: 3,
    minView: 3,
    calendarWeeks: false,
    format: "yyyy-mm"
});


$('#NewDateIn').datetimepicker({
    language: 'es',
    autoclose: 1,
    startView: 2,
    minView: 2,
    calendarWeeks: false,
    format: "yyyy-mm-dd"
});

var IdPayroll = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblPayRolls tbody').on('click', 'tr', function () {

    IdPayroll = $(this).find('td:first').html();
    IdEmploye = $(this).find('td:nth-child(2)').html();
    EmployeName = $(this).find('td:nth-child(3)').html();
    EmployeLastName = $(this).find('td:nth-child(4)').html();
    BaseSalary = $(this).find('td:nth-child(5)').html();
    EarnedSalary = $(this).find('td:nth-child(6)').html();
    Holidays = $(this).find('td:nth-child(7)').html();
    AFP = $(this).find('td:nth-child(8)').html();
    ISSS = $(this).find('td:nth-child(9)').html();
    Rent = $(this).find('td:nth-child(10)').html();
    OtherDiscounts = $(this).find('td:nth-child(11)').html();
    DialingDiscount = $(this).find('td:nth-child(12)').html();
    Bonus = $(this).find('td:nth-child(13)').html();
    Compensation = $(this).find('td:nth-child(14)').html();
    NetSalary = $(this).find('td:nth-child(15)').html();
    PayDate = $(this).find('td:nth-child(16)').html();
    PayMonth = $(this).find('td:nth-child(17)').html();
    NumPay = $(this).find('td:nth-child(18)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnPrintPayment').prop("disabled", false);
});

$('#tblPayRolls2 tbody').on('click', 'tr', function () {

    IdPayroll = $(this).find('td:first').html();
    IdEmploye = $(this).find('td:nth-child(2)').html();
    EmployeName = $(this).find('td:nth-child(3)').html();
    EmployeLastName = $(this).find('td:nth-child(4)').html();
    BaseSalary = $(this).find('td:nth-child(5)').html();
    EarnedSalary = $(this).find('td:nth-child(6)').html();
    Holidays = $(this).find('td:nth-child(7)').html();
    AFP = $(this).find('td:nth-child(8)').html();
    ISSS = $(this).find('td:nth-child(9)').html();
    Rent = $(this).find('td:nth-child(10)').html();
    OtherDiscounts = $(this).find('td:nth-child(11)').html();
    DialingDiscount = $(this).find('td:nth-child(12)').html();
    Bonus = $(this).find('td:nth-child(13)').html();
    Compensation = $(this).find('td:nth-child(14)').html();
    NetSalary = $(this).find('td:nth-child(15)').html();
    PayDate = $(this).find('td:nth-child(16)').html();
    PayMonth = $(this).find('td:nth-child(17)').html();
    NumPay = $(this).find('td:nth-child(18)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnPrintPayment').prop("disabled", false);
});


$("#PayDate").on("change", function () {
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/PayRoll/GetPeyments',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ date: $("#PayDate").val() }),
        success: function (result) {
            if (result.Res) {
                alertify.success("datos Obtenidos con Exito");
                
                $('#tblPayRolls').DataTable().destroy();
                $('#tblPayRolls tbody').empty();
                $('#tblPayRolls2').DataTable().destroy();
                $('#tblPayRolls2 tbody').empty();
                $.each(result.Payrolls, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.PayDate).format('YYYY-MM-DD');
                    if (item.NumPay==1) {
                        $('#tblPayRolls tbody').append("<tr><td>" + item.IdPayroll + "</td><td>"
                                                                    + item.IdEmploye + "</td><td>"
                                                                    + item.EmployeName + "</td><td>"
                                                                    + item.EmployeLastName + "</td><td hidden>"
                                                                    + item.BaseSalary + "</td><td hidden>"
                                                                    + item.EarnedSalary + "</td><td hidden>"
                                                                    + item.Holidays + "</td><td hidden>"
                                                                    + item.AFP + "</td><td hidden>"
                                                                    + item.ISSS + "</td><td hidden>"
                                                                    + item.Rent + "</td><td hidden>"
                                                                    + item.OtherDiscounts + "</td><td hidden>"
                                                                    + item.DialingDiscount + "</td><td hidden>"
                                                                    + item.Bonus + "</td><td hidden>"
                                                                    + item.Compensation + "</td><td>"
                                                                    + item.NetSalary + "</td><td>"
                                                                    + fecha + "</td><td hidden>"
                                                                    + item.PayMonth + "</td><td hidden>"
                                                                    + item.NumPay + "</td></tr>");
                    } else {
                        $('#tblPayRolls2 tbody').append("<tr><td>" + item.IdPayroll + "</td><td>"
                                                                    + item.IdEmploye + "</td><td>"
                                                                    + item.EmployeName + "</td><td>"
                                                                    + item.EmployeLastName + "</td><td hidden>"
                                                                    + item.BaseSalary + "</td><td hidden>"
                                                                    + item.EarnedSalary + "</td><td hidden>"
                                                                    + item.Holidays + "</td><td hidden>"
                                                                    + item.AFP + "</td><td hidden>"
                                                                    + item.ISSS + "</td><td hidden>"
                                                                    + item.Rent + "</td><td hidden>"
                                                                    + item.OtherDiscounts + "</td><td hidden>"
                                                                    + item.DialingDiscount + "</td><td hidden>"
                                                                    + item.Bonus + "</td><td hidden>"
                                                                    + item.Compensation + "</td><td>"
                                                                    + item.NetSalary + "</td><td>"
                                                                    + fecha + "</td><td hidden>"
                                                                    + item.PayMonth + "</td><td hidden>"
                                                                    + item.NumPay + "</td></tr>");
                    }   
                });
                CallBack();
                CallBack2();
                
            } else {
                alertify.error("Ha ocurrido un error");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
})


$('#btnPrintPaymentAll').click(function () {
    var pdate = $("#PayDate").val();
    //window.location = "/PayRoll/DownloadPDFPayRolls/?fecha=" + $("#PayDate").val();
    $("#modalContentPrint").html("Imprimir Planilla");

    $("#modalBody2").load("/PayRoll/DownloadPDFPayRolls/?fecha=" + $("#PayDate").val());
    $("#modalDataPrint").modal('show');
});

$('#btnPrintPayment').click(function () {

    //window.location = "/PayRoll/DownloadPDFPayRoll/" + IdPayroll;
    $("#modalContentPrint").html("Imprimir Planilla");

    $("#modalBody2").load("/PayRoll/DownloadPDFPayRoll/" + IdPayroll);
    $("#modalDataPrint").modal('show');
});


$('#btnPayRoll').click(function () {
    var pdate = $("#PayDate").val();
    //window.location = "/PayRoll/DownloadPayRoll/?fecha=" + $("#PayDate").val();
    $("#modalContentPrint").html("Imprimir Planilla");

    $("#modalBody2").load("/PayRoll/DownloadPayRoll/?fecha=" + $("#PayDate").val());
    $("#modalDataPrint").modal('show');
});


$('#btnChangeDate').click(function () {
    $("#modalContentUpdatePayRoll").html("Modificar Planilla");

    $("#modalUpdatePayRoll").modal('show');
});


$('#Update').click(function () {
    if (IdPayroll == 0 || IdPayroll == "" || IdPayroll==null) {
        alertify.error("Debe selecionar una Planilla para continuar");
        return;
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/PayRoll/ChangeDatePayRoll',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ id: IdPayroll, date: $("#NewPayDate").val(), DatePayRolls: $("#PayDate").val() }),
        success: function (result) {
            if (result.Res) {
                alertify.success("datos Obtenidos con Exito");

                $('#tblPayRolls').DataTable().destroy();
                $('#tblPayRolls tbody').empty();
                $('#tblPayRolls2').DataTable().destroy();
                $('#tblPayRolls2 tbody').empty();
                $.each(result.Payrolls, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.PayDate).format('YYYY-MM-DD');
                    if (item.NumPay == 1) {
                        $('#tblPayRolls tbody').append("<tr><td>" + item.IdPayroll + "</td><td>"
                                                                    + item.IdEmploye + "</td><td>"
                                                                    + item.EmployeName + "</td><td>"
                                                                    + item.EmployeLastName + "</td><td hidden>"
                                                                    + item.BaseSalary + "</td><td hidden>"
                                                                    + item.EarnedSalary + "</td><td hidden>"
                                                                    + item.Holidays + "</td><td hidden>"
                                                                    + item.AFP + "</td><td hidden>"
                                                                    + item.ISSS + "</td><td hidden>"
                                                                    + item.Rent + "</td><td hidden>"
                                                                    + item.OtherDiscounts + "</td><td hidden>"
                                                                    + item.DialingDiscount + "</td><td hidden>"
                                                                    + item.Bonus + "</td><td hidden>"
                                                                    + item.Compensation + "</td><td>"
                                                                    + item.NetSalary + "</td><td>"
                                                                    + fecha + "</td><td hidden>"
                                                                    + item.PayMonth + "</td><td hidden>"
                                                                    + item.NumPay + "</td></tr>");
                    } else {
                        $('#tblPayRolls2 tbody').append("<tr><td>" + item.IdPayroll + "</td><td>"
                                                                    + item.IdEmploye + "</td><td>"
                                                                    + item.EmployeName + "</td><td>"
                                                                    + item.EmployeLastName + "</td><td hidden>"
                                                                    + item.BaseSalary + "</td><td hidden>"
                                                                    + item.EarnedSalary + "</td><td hidden>"
                                                                    + item.Holidays + "</td><td hidden>"
                                                                    + item.AFP + "</td><td hidden>"
                                                                    + item.ISSS + "</td><td hidden>"
                                                                    + item.Rent + "</td><td hidden>"
                                                                    + item.OtherDiscounts + "</td><td hidden>"
                                                                    + item.DialingDiscount + "</td><td hidden>"
                                                                    + item.Bonus + "</td><td hidden>"
                                                                    + item.Compensation + "</td><td>"
                                                                    + item.NetSalary + "</td><td>"
                                                                    + fecha + "</td><td hidden>"
                                                                    + item.PayMonth + "</td><td hidden>"
                                                                    + item.NumPay + "</td></tr>");
                    }
                });
                CallBack();
                CallBack2();

            } else {
                alertify.error("Ha ocurrido un error");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});
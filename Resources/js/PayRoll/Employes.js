$(document).ready(function () {
    $('#tblEmployes').DataTable();

    $("#EmployeName").val("");
    $("#EmployeLastName").val("");
    $("#DUI").val("");
    $("#NIT").val("");
    $("#Address").val("");
    $("#Phone").val("");
    $("#Position").val("");
    $("#Salary").val("");
    $("#FlgBonus").val("");
    $("#FlgCompensation").val("");
    $("#FlgHolidays").val("");
    $("#PaymentType").val("");
    //$("#HiringDate").val("");
    $("#Status").val("");

});


function CallBack() {
    $('#tblEmployes').DataTable();

    $('#tblEmployes tbody').on('click', 'tr', function () {

        IdEmploye = $(this).find('td:first').html();
        EmployeName = $(this).find('td:nth-child(2)').html();
        EmployeLastName = $(this).find('td:nth-child(3)').html();
        DUI = $(this).find('td:nth-child(4)').html();
        NIT = $(this).find('td:nth-child(5)').html();
        Address = $(this).find('td:nth-child(6)').html();
        Phone = $(this).find('td:nth-child(7)').html();
        Position = $(this).find('td:nth-child(8)').html();
        Salary = $(this).find('td:nth-child(9)').html();
        FlgBonus = $(this).find('td:nth-child(10)').html();
        FlgCompensation = $(this).find('td:nth-child(11)').html();
        FlgHolidays = $(this).find('td:nth-child(12)').html();
        PaymentType = $(this).find('td:nth-child(13)').html();
        HiringDate = $(this).find('td:nth-child(14)').html();
        Status = $(this).find('td:nth-child(15)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
        $('#btnPayment').prop("disabled", false);
    });
}
// Sección para el CRUD
function NewEmploye() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#EmployeName").val("");
    $("#EmployeLastName").val("");
    $("#DUI").val("");
    $("#NIT").val("");
    $("#Address").val("");
    $("#Phone").val("");
    $("#Position").val("");
    $("#Salary").val("");
    $("#FlgBonus").val("");
    $("#FlgCompensation").val("");
    $("#FlgHolidays").val("");
    $("#PaymentType").val("");
    //$("#HiringDate").val("");
    $("#Status").val("");

    $("#modalHeader").html("Nuevo Empleado");
    $("#modalEmploye").modal('show');
}

function EditEmploye() {
    console.log(IdEmploye);
    if (IdEmploye == 0 || IdEmploye == "") {
        alertify.warning("Debe de seleccionar un Employe");
    } else {
        $("#modalHeader").html("Modificar Empleado");

        $("#EmployeName").val(EmployeName);
        $("#EmployeLastName").val(EmployeLastName);
        $("#DUI").val(DUI);
        $("#NIT").val(NIT);
        $("#Address").val(Address);
        $("#Phone").val(Phone);
        $("#Position").val(Position);
        $("#Salary").val(Salary);
        $("#FlgBonus").val(FlgBonus);
        $("#FlgCompensation").val(FlgCompensation);
        $("#FlgHolidays").val(FlgHolidays);
        $("#PaymentType").val(PaymentType);
        $("#HiringDate").val(HiringDate);
        $("#Status").val(Status);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalEmploye").modal('show');
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

$('#tblEmployes tbody').on('click', 'tr', function () {

    IdEmploye = $(this).find('td:first').html();
    EmployeName = $(this).find('td:nth-child(2)').html();
    EmployeLastName = $(this).find('td:nth-child(3)').html();
    DUI = $(this).find('td:nth-child(4)').html();
    NIT = $(this).find('td:nth-child(5)').html();
    Address = $(this).find('td:nth-child(6)').html();
    Phone = $(this).find('td:nth-child(7)').html();
    Position = $(this).find('td:nth-child(8)').html();
    Salary = $(this).find('td:nth-child(9)').html();
    FlgBonus = $(this).find('td:nth-child(10)').html();
    FlgCompensation = $(this).find('td:nth-child(11)').html();
    FlgHolidays = $(this).find('td:nth-child(12)').html();
    PaymentType = $(this).find('td:nth-child(13)').html();
    HiringDate = $(this).find('td:nth-child(14)').html();
    Status = $(this).find('td:nth-child(15)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
    $('#btnPayment').prop("disabled", false);
});


$("#Save").on("click", function () {
    datos = {
        //IdEmploye: $("#IdEmploye").val()
        EmployeName: $("#EmployeName").val()
        , EmployeLastName: $("#EmployeLastName").val()
        , DUI: $("#DUI").val()
        , NIT: $("#NIT").val()
        , Address: $("#Address").val()
        , Phone: $("#Phone").val()
        , Position: $("#Position").val()
        , Salary: $("#Salary").val()
        , FlgBonus: $("#FlgBonus").val()
        , FlgCompensation: $("#FlgCompensation").val()
        , FlgHolidays: $("#FlgHolidays").val()
        , PaymentType: $("#PaymentType").val()
        , HiringDate: $("#HiringDate").val()
        , Status: $("#Status").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/PayRoll/AddEmploye',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Employe Agregado.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblEmployes').DataTable().destroy();
                $('#tblEmployes tbody').empty();
                $.each(result.Employes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.HiringDate).format('YYYY-MM-DD');
                    $('#tblEmployes tbody').append("<tr><td>" + item.IdEmploye + "</td><td>"
                                                                 + item.EmployeName + "</td><td>"
                                                                 + item.EmployeLastName + "</td><td>"
                                                                 + item.DUI + "</td><td>"
                                                                 + item.NIT + "</td><td hidden>"
                                                                 + item.Address + "</td><td hidden>"
                                                                 + item.Phone + "</td><td>"
                                                                 + item.Position + "</td><td hidden>"
                                                                 + item.Salary + "</td><td hidden>"
                                                                 + item.FlgBonus + "</td><td hidden>"
                                                                 + item.FlgCompensation + "</td><td hidden>"
                                                                 + item.FlgHolidays + "</td><td hidden>"
                                                                 + item.PaymentType + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblEmployes').DataTable().destroy();
                $('#tblEmployes tbody').empty();
                $.each(result.Employes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.HiringDate).format('YYYY-MM-DD');
                    $('#tblEmployes tbody').append("<tr><td>" + item.IdEmploye + "</td><td>"
                                                                 + item.EmployeName + "</td><td>"
                                                                 + item.EmployeLastName + "</td><td>"
                                                                 + item.DUI + "</td><td>"
                                                                 + item.NIT + "</td><td hidden>"
                                                                 + item.Address + "</td><td hidden>"
                                                                 + item.Phone + "</td><td>"
                                                                 + item.Position + "</td><td hidden>"
                                                                 + item.Salary + "</td><td hidden>"
                                                                 + item.FlgBonus + "</td><td hidden>"
                                                                 + item.FlgCompensation + "</td><td hidden>"
                                                                 + item.FlgHolidays + "</td><td hidden>"
                                                                 + item.PaymentType + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al agregar el Employe");
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
        IdEmploye: IdEmploye
      , EmployeName: $("#EmployeName").val()
      , EmployeLastName: $("#EmployeLastName").val()
        , DUI: $("#DUI").val()
        , NIT: $("#NIT").val()
        , Address: $("#Address").val()
        , Phone: $("#Phone").val()
        , Position: $("#Position").val()
        , Salary: $("#Salary").val()
        , FlgBonus: $("#FlgBonus").val()
        , FlgCompensation: $("#FlgCompensation").val()
        , FlgHolidays: $("#FlgHolidays").val()
        , PaymentType: $("#PaymentType").val()
        , HiringDate: $("#HiringDate").val()
        , Status: $("#Status").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/PayRoll/UpdateEmploye',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Employe Actualizado.");
                $('#tblEmployes').DataTable().destroy();
                $('#tblEmployes tbody').empty();
                $.each(result.Employes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.HiringDate).format('YYYY-MM-DD');
                    $('#tblEmployes tbody').append("<tr><td>" + item.IdEmploye + "</td><td>"
                                                                 + item.EmployeName + "</td><td>"
                                                                 + item.EmployeLastName + "</td><td>"
                                                                 + item.DUI + "</td><td>"
                                                                 + item.NIT + "</td><td hidden>"
                                                                 + item.Address + "</td><td hidden>"
                                                                 + item.Phone + "</td><td>"
                                                                 + item.Position + "</td><td hidden>"
                                                                 + item.Salary + "</td><td hidden>"
                                                                 + item.FlgBonus + "</td><td hidden>"
                                                                 + item.FlgCompensation + "</td><td hidden>"
                                                                 + item.FlgHolidays + "</td><td hidden>"
                                                                 + item.PaymentType + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblEmployes').DataTable().destroy();
                $('#tblEmployes tbody').empty();
                $.each(result.Employes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.HiringDate).format('YYYY-MM-DD');
                    $('#tblEmployes tbody').append("<tr><td>" + item.IdEmploye + "</td><td>"
                                                                 + item.EmployeName + "</td><td>"
                                                                 + item.EmployeLastName + "</td><td>"
                                                                 + item.DUI + "</td><td>"
                                                                 + item.NIT + "</td><td hidden>"
                                                                 + item.Address + "</td><td hidden>"
                                                                 + item.Phone + "</td><td>"
                                                                 + item.Position + "</td><td hidden>"
                                                                 + item.Salary + "</td><td hidden>"
                                                                 + item.FlgBonus + "</td><td hidden>"
                                                                 + item.FlgCompensation + "</td><td hidden>"
                                                                 + item.FlgHolidays + "</td><td hidden>"
                                                                 + item.PaymentType + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al eliminar el Employe");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});


function CreatePayment() {
    alertify.confirm("Advertencia de Confirmación", "¿Desea continuar en Generar Pago para el Empleado Seleccionado?",
           function () {
               $.ajax({
                   type: "POST",
                   traditional: true,
                   url: '/PayRoll/CreatePeyment',
                   contentType: "application/json; charset=utf-8",
                   data: JSON.stringify({ IdEmploye: IdEmploye }),
                   success: function (result) {
                       if (result.Res) {
                           alertify.success("Pago Generado con Éxito. Redireccionando.....");
                           window.location = "/PayRoll/PayRolls";
                       } else {
                           alertify.error("Ha ocurrido un error");
                       }
                   },
                   error: function () {
                       alertify.error("Ha ocurrido un error");
                   }
               });
           },
             function () {
                 //alertify.error('Cancel');
             });
   
 
}


function CreatePaymentAll() {
    alertify.confirm("Advertencia de Confirmación", "¿Desea continuar en Generar Pago para todos los Empleados?",
           function () {
               $.ajax({
                   type: "POST",
                   traditional: true,
                   url: '/PayRoll/CreatePeymentALL',
                   contentType: "application/json; charset=utf-8",
                   data: JSON.stringify({ IdEmploye: 0 }),
                   success: function (result) {
                       if (result.Res) {
                           alertify.success("Pago Generado con Éxito. Redireccionando.....");
                       } else {
                           alertify.error("Ha ocurrido un error");
                       }
                   },
                   error: function () {
                       alertify.error("Ha ocurrido un error");
                   }
               });
           },
             function () {
                 //alertify.error('Cancel');
             });

  
}
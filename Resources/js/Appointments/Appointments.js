$(document).ready(function () {
    $('#tblAppointments').DataTable();
    //$('#btnPrintPayment').prop("disabled", true);

    //$('datetimepicker4').change(function () {
    //    $(this).next('input.datetimepicker').destroy();

    //    $(this).next('input.datetimepicker').datetimepicker({
    //        minDate: $(this).val()
    //    });
    //});

    $('#datetimepicker4').val("");
    
    $('#datetimepicker4').datetimepicker({
        datepicker: false,
        autoclose: 1,
        startView: 1,
        minView: 0,
        format: 'H:i:s'
    });
});

function CallBack() {
    $('#tblAppointments').DataTable();

    $('#tblAppointments tbody').on('click', 'tr', function () {

        IdMedicalAppointment = $(this).find('td:first').html();
        IdPatient = $(this).find('td:nth-child(2)').html();
        PatientName = $(this).find('td:nth-child(3)').html();
        IdDoctor = $(this).find('td:nth-child(4)').html();
        DoctorName = $(this).find('td:nth-child(5)').html();
        IdTypeConsultation = $(this).find('td:nth-child(6)').html();
        Dscription = $(this).find('td:nth-child(7)').html();
        ConsultationDate = $(this).find('td:nth-child(8)').html();
        ConsultationTime = $(this).find('td:nth-child(9)').html();
        Status = $(this).find('td:nth-child(10)').html();
        Paid = $(this).find('td:nth-child(11)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
        $('#btnDelete').prop("disabled", false);
    });


    $('#btnEdit').prop("disabled", true);
    $('#btnDelete').prop("disabled", true);
}




$('#DateIn').datetimepicker({
    language: 'es',
    autoclose: 1,
    startView: 2,
    minView: 2,
    calendarWeeks: false,
    format: "yyyy-mm-dd",
    leftArrow: '<i class="fas fa-long-arrow-alt-left"></i>',
    rightArrow: '<i class="fas fa-long-arrow-alt-right"></i>'
});
$('#DateInConsultationDate').datetimepicker({
    language: 'es',
    autoclose: 1,
    startView: 2,
    minView: 2,
    calendarWeeks: false,
    format: "yyyy-mm-dd",
    leftArrow: '<i class="fas fa-long-arrow-alt-left"></i>',
    rightArrow: '<i class="fas fa-long-arrow-alt-right"></i>'
});


function NewAppointment() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#IdPatient").val("");
    $("#IdDoctor").val("");
    $("#IdTypeConsultation").val("");
    $("#Status").val("P");
    $("#Paid").val("N");

    $("#modalHeader").html("Nueva Cita");
    $("#modalAppointment").modal('show');
}

function EditAppointment() {

    if (IdMedicalAppointment == 0 || IdMedicalAppointment == "") {
        alertify.warning("Debe de seleccionar una Cita");
    } else {
        $("#modalHeader").html("Modificar Cita");
        $("#IdMedicalAppointment").val(IdMedicalAppointment);
        $("#IdPatient").val(IdPatient);
        $("#IdDoctor").val(IdDoctor);
        $("#IdTypeConsultation").val(IdTypeConsultation);
        $("#ConsultationDate").val(ConsultationDate);
        $("#datetimepicker4").val(ConsultationTime);
        $("#Status").val(Status);
        $("#Paid").val(Paid);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalAppointment").modal('show');
    }
}


var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";
$('#tblAppointments tbody').on('click', 'tr', function () {

    IdMedicalAppointment = $(this).find('td:first').html();
    IdPatient = $(this).find('td:nth-child(2)').html();
    PatientName = $(this).find('td:nth-child(3)').html();
    IdDoctor = $(this).find('td:nth-child(4)').html();
    DoctorName = $(this).find('td:nth-child(5)').html();
    IdTypeConsultation = $(this).find('td:nth-child(6)').html();
    Dscription = $(this).find('td:nth-child(7)').html();
    ConsultationDate = $(this).find('td:nth-child(8)').html();
    ConsultationTime = $(this).find('td:nth-child(9)').html();
    Status = $(this).find('td:nth-child(10)').html();
    Paid = $(this).find('td:nth-child(11)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
    $('#btnDelete').prop("disabled", false);
});



$("#Save").on("click", function () {
    datos = {
        //IdDoctor: $("#IdDoctor").val()
        IdPatient: $("#IdPatient").val()
        , IdDoctor: $("#IdDoctor").val()
        , IdTypeConsultation: $("#IdTypeConsultation").val()
        , ConsultationDate: $("#ConsultationDate").val()
        , ConsultationTime: $("#datetimepicker4").val()
        , Status: $("#Status").val()
        , Paid: $("#Paid").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Clinic/AddMedicalAppointment',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Cita Agregada.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblAppointments').DataTable().destroy();
                $('#tblAppointments tbody').empty();
                $.each(result.MedicalAppointments, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.ConsultationDate).format('YYYY-MM-DD');
                    var hora = moment(item.ConsultationTime).format('HH:mm:ss');
                    $('#tblAppointments tbody').append("<tr><td>" + item.IdMedicalAppointment + "</td><td hidden>"
                                                                 + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td hidden>"
                                                                 + item.IdDoctor + "</td><td>"
                                                                 + item.DoctorName + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + hora + "</td><td>"
                                                                 + item.Status + "</td><td>"
                                                                 + item.Paid + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblAppointments').DataTable().destroy();
                $('#tblAppointments tbody').empty();
                $.each(result.MedicalAppointments, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.ConsultationDate).format('YYYY-MM-DD');
                    var hora = moment(item.ConsultationTime).format('HH:mm:ss');
                    $('#tblAppointments tbody').append("<tr><td>" + item.IdMedicalAppointment + "</td><td hidden>"
                                                                 + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td hidden>"
                                                                 + item.IdDoctor + "</td><td>"
                                                                 + item.DoctorName + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + hora + "</td><td>"
                                                                 + item.Status + "</td><td>"
                                                                 + item.Paid + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al agregar la Cita");
                CallBack();
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
            GetAppointments();
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});

$("#Update").on("click", function () {
    datos = {
        IdMedicalAppointment: IdMedicalAppointment
     , IdPatient: $("#IdPatient").val()
     , IdDoctor: $("#IdDoctor").val()
     , IdTypeConsultation: $("#IdTypeConsultation").val()
     , ConsultationDate: $("#ConsultationDate").val()
     , ConsultationTime: $("#datetimepicker4").val()
     , Status: $("#Status").val()
     , Paid: $("#Paid").val()
    }
    
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Clinic/UpdateMedicalAppointment',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Cita Actualizada.");
                $('#tblAppointments').DataTable().destroy();
                $('#tblAppointments tbody').empty();
                $.each(result.MedicalAppointments, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.ConsultationDate).format('YYYY-MM-DD');
                    var hora = moment(item.ConsultationTime).format('HH:mm:ss');
                    $('#tblAppointments tbody').append("<tr><td>" + item.IdMedicalAppointment + "</td><td hidden>"
                                                                 + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td hidden>"
                                                                 + item.IdDoctor + "</td><td>"
                                                                 + item.DoctorName + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + hora + "</td><td>"
                                                                 + item.Status + "</td><td>"
                                                                 + item.Paid + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblAppointments').DataTable().destroy();
                $('#tblAppointments tbody').empty();
                $.each(result.MedicalAppointments, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.ConsultationDate).format('YYYY-MM-DD');
                    var hora = moment(item.ConsultationTime).format('HH:mm:ss');
                    $('#tblAppointments tbody').append("<tr><td>" + item.IdMedicalAppointment + "</td><td hidden>"
                                                                 + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td hidden>"
                                                                 + item.IdDoctor + "</td><td>"
                                                                 + item.DoctorName + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + hora + "</td><td>"
                                                                 + item.Status + "</td><td>"
                                                                 + item.Paid + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al actualizar la cita");
                CallBack();
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
            GetAppointments();
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});

$("#btnDelete").on("click", function () {
    datos = {
        MedicalAppointment: IdMedicalAppointment
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Clinic/DeleteMedicalAppointment',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Cita Eliminada.");
                $('#tblAppointments').DataTable().destroy();
                $('#tblAppointments tbody').empty();
                $.each(result.MedicalAppointments, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.ConsultationDate).format('YYYY-MM-DD');
                    var hora = moment(item.ConsultationTime).format('HH:mm:ss');
                    $('#tblAppointments tbody').append("<tr><td>" + item.IdMedicalAppointment + "</td><td hidden>"
                                                                 + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td hidden>"
                                                                 + item.IdDoctor + "</td><td>"
                                                                 + item.DoctorName + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + hora + "</td><td>"
                                                                 + item.Status + "</td><td>"
                                                                 + item.Paid + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblAppointments').DataTable().destroy();
                $('#tblAppointments tbody').empty();
                $.each(result.MedicalAppointments, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.ConsultationDate).format('YYYY-MM-DD');
                    var hora = moment(item.ConsultationTime).format('HH:mm:ss');
                    $('#tblAppointments tbody').append("<tr><td>" + item.IdMedicalAppointment + "</td><td hidden>"
                                                                 + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td hidden>"
                                                                 + item.IdDoctor + "</td><td>"
                                                                 + item.DoctorName + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + hora + "</td><td>"
                                                                 + item.Status + "</td><td>"
                                                                 + item.Paid + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al eliminar la Cita");
                CallBack();
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
            GetAppointments();
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });

});


$("#Date").on("change", function () {
    GetAppointments();
})

function GetAppointments() {
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Clinic/GetMedicalAppointment',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ date: $("#Date").val() }),
        success: function (result) {
            if (result.Res) {
                alertify.success("Citas Obtenidas.");
                $('#tblAppointments').DataTable().destroy();
                $('#tblAppointments tbody').empty();
                $.each(result.MedicalAppointments, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.ConsultationDate).format('YYYY-MM-DD');
                    var hora = moment(item.ConsultationTime).format('HH:mm:ss');
                    $('#tblAppointments tbody').append("<tr><td>" + item.IdMedicalAppointment + "</td><td hidden>"
                                                                 + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td hidden>"
                                                                 + item.IdDoctor + "</td><td>"
                                                                 + item.DoctorName + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + hora + "</td><td>"
                                                                 + item.Status + "</td><td>"
                                                                 + item.Paid + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblAppointments').DataTable().destroy();
                $('#tblAppointments tbody').empty();
                $.each(result.MedicalAppointments, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.ConsultationDate).format('YYYY-MM-DD');
                    var hora = moment(item.ConsultationTime).format('HH:mm:ss');
                    $('#tblAppointments tbody').append("<tr><td>" + item.IdMedicalAppointment + "</td><td hidden>"
                                                                 + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td hidden>"
                                                                 + item.IdDoctor + "</td><td>"
                                                                 + item.DoctorName + "</td><td hidden>"
                                                                 + item.IdTypeConsultation + "</td><td>"
                                                                 + item.Dscription + "</td><td>"
                                                                 + fecha + "</td><td>"
                                                                 + hora + "</td><td>"
                                                                 + item.Status + "</td><td>"
                                                                 + item.Paid + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al obtener la Citas");
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
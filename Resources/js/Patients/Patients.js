$(document).ready(function () {
    $('#tblPatients').DataTable();

    $("#PatientName").val("");
    $("#Address").val("");
    $("#Telephone").val("");
    $("#Email").val("");
    $("#Sex").val("");
    $("#Age").val("");
    $("#IdBloodType").val("");
    $("#VIH").val("");

    $("#Weight").val("");
    $("#Allergies").val("");
    $("#CurrentMedications").val("");
    $("#PatientDisease").val("");
    $("#OtherConditions").val("");
    $("#Status").val("");

    IdPatient = 0;
    IdMedicalRecord = 0;
    $("#Teeth").val("");
    $("#IdDoctor").val("0");
    $("#ClinicalProcedure").val("");
    $("#PrescribedTreatment").val("");
    $("#Payment").val("");


    $('#btnEdit').prop("disabled", true);
    $('#btnAddMR').prop("disabled", true);
});


function CallBack() {
    $('#tblPatients').DataTable();

    $('#tblPatients tbody').on('click', 'tr', function () {

        IdPatient= $(this).find('td:first').html();
        PatientName=$(this).find('td:nth-child(2)').html();
        Address=$(this).find('td:nth-child(3)').html();
        Telephone= $(this).find('td:nth-child(4)').html();
        Email=$(this).find('td:nth-child(5)').html();
        Sex= $(this).find('td:nth-child(6)').html();
        DateOfBirth= $(this).find('td:nth-child(7)').html();
        Age= $(this).find('td:nth-child(8)').html();
        IdBloodType= $(this).find('td:nth-child(9)').html();
        VIH= $(this).find('td:nth-child(10)').html();
        Weight= $(this).find('td:nth-child(11)').html();
        Allergies= $(this).find('td:nth-child(12)').html();
        CurrentMedications= $(this).find('td:nth-child(13)').html();
        PatientDisease= $(this).find('td:nth-child(14)').html();
        OtherConditions= $(this).find('td:nth-child(15)').html();
        Status= $(this).find('td:nth-child(16)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);
        
        $('#btnDownloadFicha').prop("disabled", false);
        $('#btnEdit').prop("disabled", false);
        $('#btnAddMR').prop("disabled", false);
    });
}
// Sección para el CRUD
function NewPatient() {

    $('#Save').prop("hidden", false);
    $('#Update').prop("hidden", true);

    $("#PatientName").val("");
    $("#Address").val("");
    $("#Telephone").val("");
    $("#Email").val("");
    $("#Sex").val("");
    $("#Age").val("");
    $("#IdBloodType").val("");
    $("#VIH").val("");

    $("#Weight").val("");
    $("#Allergies").val("");
    $("#CurrentMedications").val("");
    $("#PatientDisease").val("");
    $("#OtherConditions").val("");
    $("#Status").val("");

    $("#modalHeader").html("Nuevo Paciente");
    $("#modalPatient").modal('show');
}

function EditPatient() {
    console.log(IdPatient);
    if (IdPatient == 0 || IdPatient == "") {
        alertify.warning("Debe de seleccionar un Paciente");
    } else {
        $("#modalHeader").html("Modificar Paciente");
        //$("#slctUser").val(Id);
        //$("#slctUseDetect").val(UseDetect);

        //$('#slctUser').prop("disabled", true);
        //$("#IdPatient").val(IdPatient);
        $("#PatientName").val(PatientName);
        $("#Address").val(Address);
        $("#Telephone").val(Telephone);
        $("#Email").val(Email);
        $("#Sex").val(Sex);
        $("#DateOfBirth").val(DateOfBirth);
        $("#Age").val(Age);
        $("#IdBloodType").val(IdBloodType);
        $("#VIH").val(VIH);
        
        $("#Weight").val(Weight);
        $("#Allergies").val(Allergies);
        $("#CurrentMedications").val(CurrentMedications);
        $("#PatientDisease").val(PatientDisease);
        $("#OtherConditions").val(OtherConditions);
        $("#Status").val(Status);


        $('#Update').prop("hidden", false);
        $('#Save').prop("hidden", true);

        $("#modalPatient").modal('show');
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

//var IdPatient = 0;
//var PatientName = "";
//var Address = "";
//var Telephone = "";
//var Email = "";
//var Sex = "";
//var DateOfBirth = "";
//var IdBloodType = "";
//var VIH = "";
//var Weight = "";
//var Allergies = "";
//var CurrentMedications = "";
//var PatientDisease = "";
//var Status = "";

var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#fbfcfd";

$('#tblPatients tbody').on('click', 'tr', function () {
    
    IdPatient = $(this).find('td:first').html();
    PatientName = $(this).find('td:nth-child(2)').html();
    Address = $(this).find('td:nth-child(3)').html();
    Telephone = $(this).find('td:nth-child(4)').html();
    Email = $(this).find('td:nth-child(5)').html();
    Sex = $(this).find('td:nth-child(6)').html();
    DateOfBirth = $(this).find('td:nth-child(7)').html();
    Age = $(this).find('td:nth-child(8)').html();
    IdBloodType = $(this).find('td:nth-child(9)').html();
    VIH = $(this).find('td:nth-child(10)').html();
    Weight = $(this).find('td:nth-child(11)').html();
    Allergies = $(this).find('td:nth-child(12)').html();
    CurrentMedications = $(this).find('td:nth-child(13)').html();
    PatientDisease = $(this).find('td:nth-child(14)').html();
    OtherConditions = $(this).find('td:nth-child(15)').html();
    Status = $(this).find('td:nth-child(16)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnDownloadFicha').prop("disabled", false);
    $('#btnEdit').prop("disabled", false);
    $('#btnAddMR').prop("disabled", false);

    getMedicalRercord();
});



$("#Save").on("click", function () {
    datos = {
        //IdPatient: $("#IdPatient").val()
          PatientName: $("#PatientName").val()
        , Address: $("#Address").val()
        , Telephone: $("#Telephone").val()
        , Email: $("#Email").val()
        , Sex: $("#Sex").val()
        , DateOfBirth: $("#DateOfBirth").val()
        , Age: $("#Age").val()
        , IdBloodType: $("#IdBloodType").val()
        , VIH: $("#VIH").val()
        , Weight: $("#Weight").val()
        , Allergies: $("#Allergies").val()
        , CurrentMedications: $("#CurrentMedications").val()
        , PatientDisease: $("#PatientDisease").val()
        , OtherConditions: $("#OtherConditions").val()
        , Status: $("#Status").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Patients/AddPatient',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Pasiente Agregado.");
                //setTimeout(function () {
                //    window.location = "/User/UserToDetector";
                //}, 2000);
                $('#tblPatients').DataTable().destroy();
                $('#tblPatients tbody').empty();
                $.each(result.Patients, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.DateOfBirth).format('YYYY-MM-DD');
                    $('#tblPatients tbody').append("<tr><td>" + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td>"
                                                                 + item.Address + "</td><td>"
                                                                 + item.Telephone + "</td><td>"
                                                                 + item.Email + "</td><td>"
                                                                 + item.Sex + "</td><td>"
                                                                 + fecha + "</td><td hidden>"
                                                                 + item.Age + "</td><td hidden>"
                                                                 + item.IdBloodType + "</td><td hidden>"
                                                                 + item.VIH + "</td><td hidden>"
                                                                 + item.Weight + "</td><td hidden>"
                                                                 + item.Allergies + "</td><td hidden>"
                                                                 + item.CurrentMedications + "</td><td hidden>"
                                                                 + item.PatientDisease + "</td><td hidden>"
                                                                 + item.OtherConditions + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblPatients').DataTable().destroy();
                $('#tblPatients tbody').empty();
                $.each(result.Patients, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.DateOfBirth).format('YYYY-MM-DD');
                    $('#tblPatients tbody').append("<tr><td>" + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td>"
                                                                 + item.Address + "</td><td>"
                                                                 + item.Telephone + "</td><td>"
                                                                 + item.Email + "</td><td>"
                                                                 + item.Sex + "</td><td>"
                                                                 + fecha + "</td><td hidden>"
                                                                 + item.Age + "</td><td hidden>"
                                                                 + item.IdBloodType + "</td><td hidden>"
                                                                 + item.VIH + "</td><td hidden>"
                                                                 + item.Weight + "</td><td hidden>"
                                                                 + item.Allergies + "</td><td hidden>"
                                                                 + item.CurrentMedications + "</td><td hidden>"
                                                                 + item.PatientDisease + "</td><td hidden>"
                                                                 + item.OtherConditions + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al agregar el pasiente");
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
        IdPatient: IdPatient
      , PatientName: $("#PatientName").val()
        , Address: $("#Address").val()
        , Telephone: $("#Telephone").val()
        , Email: $("#Email").val()
        , Sex: $("#Sex").val()
        , DateOfBirth: $("#DateOfBirth").val()
        , Age: $("#Age").val()
        , IdBloodType: $("#IdBloodType").val()
        , VIH: $("#VIH").val()
        , Weight: $("#Weight").val()
        , Allergies: $("#Allergies").val()
        , CurrentMedications: $("#CurrentMedications").val()
        , PatientDisease: $("#PatientDisease").val()
        , OtherConditions: $("#OtherConditions").val()
        , Status: $("#Status").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Patients/UpdatePatient',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Pasiente Actualizado.");
                $('#tblPatients').DataTable().destroy();
                $('#tblPatients tbody').empty();
                $.each(result.Patients, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.DateOfBirth).format('YYYY-MM-DD');
                    $('#tblPatients tbody').append("<tr><td>" + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td>"
                                                                 + item.Address + "</td><td>"
                                                                 + item.Telephone + "</td><td>"
                                                                 + item.Email + "</td><td>"
                                                                 + item.Sex + "</td><td>"
                                                                 + fecha + "</td><td hidden>"
                                                                 + item.Age + "</td><td hidden>"
                                                                 + item.IdBloodType + "</td><td hidden>"
                                                                 + item.VIH + "</td><td hidden>"
                                                                 + item.Weight + "</td><td hidden>"
                                                                 + item.Allergies + "</td><td hidden>"
                                                                 + item.CurrentMedications + "</td><td hidden>"
                                                                 + item.PatientDisease + "</td><td hidden>"
                                                                 + item.OtherConditions + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblPatients').DataTable().destroy();
                $('#tblPatients tbody').empty();
                $.each(result.Patients, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.DateOfBirth).format('YYYY-MM-DD');
                    $('#tblPatients tbody').append("<tr><td>" + item.IdPatient + "</td><td>"
                                                                 + item.PatientName + "</td><td>"
                                                                 + item.Address + "</td><td>"
                                                                 + item.Telephone + "</td><td>"
                                                                 + item.Email + "</td><td>"
                                                                 + item.Sex + "</td><td>"
                                                                 + fecha + "</td><td hidden>"
                                                                 + item.Age + "</td><td hidden>"
                                                                 + item.IdBloodType + "</td><td hidden>"
                                                                 + item.VIH + "</td><td hidden>"
                                                                 + item.Weight + "</td><td hidden>"
                                                                 + item.Allergies + "</td><td hidden>"
                                                                 + item.CurrentMedications + "</td><td hidden>"
                                                                 + item.PatientDisease + "</td><td hidden>"
                                                                 + item.OtherConditions + "</td><td>"
                                                                 + item.Status + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al actualizar el Pasiente");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
});


function AddMedicalRecord() {

    $('#Save2').prop("hidden", false);
    $('#Update2').prop("hidden", true);

    $("#PatientName").val("");
    $("#Address").val("");
    $("#Telephone").val("");
    $("#Email").val("");
    $("#Sex").val("");
    $("#Age").val("");
    $("#IdBloodType").val("");
    $("#VIH").val("");

    $("#Weight").val("");
    $("#Allergies").val("");
    $("#CurrentMedications").val("");
    $("#PatientDisease").val("");
    $("#OtherConditions").val("");
    $("#Status").val("");

    $("#modalHeaderMD").html("Nuevo Procedimiento");
    $("#modalMedicalRecord").modal('show');
}


$('#tblMedicalRecordDetail tbody').on('click', 'tr', function () {

    IdMedicalRecord = $(this).find('td:first').html();
    IdPatient = $(this).find('td:nth-child(2)').html();
    IdDoctor = $(this).find('td:nth-child(3)').html();
    Teeth = $(this).find('td:nth-child(4)').html();
    ClinicalProcedure = $(this).find('td:nth-child(5)').html();
    PrescribedTreatment = $(this).find('td:nth-child(6)').html();
    DateProcedure = $(this).find('td:nth-child(7)').html();
    Payment = $(this).find('td:nth-child(8)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $("#Teeth").val(Teeth);
    $("#DateProcedure").val(DateProcedure);
    $("#IdDoctor").val(IdDoctor);
    $("#ClinicalProcedure").val(ClinicalProcedure);
    $("#PrescribedTreatment").val(PrescribedTreatment);
    $("#Payment").val(Payment);

    //$('#Update2').prop("hidden", false);
    //$('#Upd').prop("disabled", false);
});

function getMedicalRercord() {

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Patients/getMedicalRercord',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPatient: IdPatient }),
        success: function (result) {
            if (result.Res) {
                alertify.success("Pasiente Actualizado.");
                $('#tblMedicalRecordDetail').DataTable().destroy();
                $('#tblMedicalRecordDetail tbody').empty();
                $.each(result.MedicalRercord, function (i, item) {
                    var fechaDateIn = moment(item.DateProcedure).format('YYYY-MM-DD');
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMedicalRecordDetail tbody').append("<tr><td>" + item.IdMedicalRecord + "</td><td hidden>"
                                                                 + item.IdPatient + "</td><td hidden>"
                                                                 + item.IdDoctor + "</td><td>"
                                                                 + item.Teeth + "</td><td>"
                                                                 + item.ClinicalProcedure + "</td><td>"
                                                                 + item.PrescribedTreatment + "</td><td>"
                                                                 + fechaDateIn + "</td><td>"
                                                                 + item.Payment + "</td></tr>");
                });
                CallBack();
            } else if (result.Res == false) {
                $('#tblMedicalRecordDetail').DataTable().destroy();
                $('#tblMedicalRecordDetail tbody').empty();
                $.each(result.MedicalRercord, function (i, item) {
                    var fechaDateIn = moment(item.DateProcedure).format('YYYY-MM-DD');
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMedicalRecordDetail tbody').append("<tr><td>" + item.IdMedicalRecord + "</td><td hidden>"
                                                                 + item.IdPatient + "</td><td hidden>"
                                                                 + item.IdDoctor + "</td><td>"
                                                                 + item.Teeth + "</td><td>"
                                                                 + item.ClinicalProcedure + "</td><td>"
                                                                 + item.PrescribedTreatment + "</td><td>"
                                                                 + fechaDateIn + "</td><td>"
                                                                 + item.Payment + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al eliminar el Pasiente");
            } else {
                alertify.error("Ha ocurrido un error con la base de datos");
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });
   
}



function SaveMedicalRercord() {
    var Doctor= $("#IdDoctor").val();
    var Teeth = $("#Teeth").val();
    var ClinicalProcedure = $("#ClinicalProcedure").val();
    var PrescribedTreatment= $("#PrescribedTreatment").val();
    var Payment= $("#Payment").val();

    if (IdPatient == 0 || IdPatient == "" || Doctor == "0" || Teeth == "" || ClinicalProcedure == "" || PrescribedTreatment == "" || Payment == "") {
        alertify.warning("Debe de seleccionar un Paciente");
    } else {

        datos = {
            IdPatient: IdPatient
       , IdDoctor: $("#IdDoctor").val()
       , Teeth: $("#Teeth").val()
       , ClinicalProcedure: $("#ClinicalProcedure").val()
       , PrescribedTreatment: $("#PrescribedTreatment").val()
       , DateProcedure: $("#DateProcedure").val()
       , Payment: $("#Payment").val()
        }

        $.ajax({
            type: "POST",
            traditional: true,
            url: '/Patients/AddMedicalRercord',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(datos),
            success: function (result) {
                if (result.Res) {
                    alertify.success("Procedimiento Agregado con Éxito");
                    $('#tblMedicalRecordDetail').DataTable().destroy();
                    $('#tblMedicalRecordDetail tbody').empty();
                    $.each(result.MedicalRercord, function (i, item) {
                        var fechaDateIn = moment(item.DateProcedure).format('YYYY-MM-DD');
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblMedicalRecordDetail tbody').append("<tr><td>" + item.IdMedicalRecord + "</td><td hidden>"
                                                                     + item.IdPatient + "</td><td hidden>"
                                                                     + item.IdDoctor + "</td><td>"
                                                                     + item.Teeth + "</td><td>"
                                                                     + item.ClinicalProcedure + "</td><td>"
                                                                     + item.PrescribedTreatment + "</td><td>"
                                                                     + fechaDateIn + "</td><td>"
                                                                     + item.Payment + "</td></tr>");
                    });
                    CallBack();
                } else if (result.Res == false) {
                    $('#tblMedicalRecordDetail').DataTable().destroy();
                    $('#tblMedicalRecordDetail tbody').empty();
                    $.each(result.MedicalRercord, function (i, item) {
                        var fechaDateIn = moment(item.DateProcedure).format('YYYY-MM-DD');
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblMedicalRecordDetail tbody').append("<tr><td>" + item.IdMedicalRecord + "</td><td hidden>"
                                                                     + item.IdPatient + "</td><td hidden>"
                                                                     + item.IdDoctor + "</td><td>"
                                                                     + item.Teeth + "</td><td>"
                                                                     + item.ClinicalProcedure + "</td><td>"
                                                                     + item.PrescribedTreatment + "</td><td>"
                                                                     + fechaDateIn + "</td><td>"
                                                                     + item.Payment + "</td></tr>");
                    });
                    CallBack();
                    alertify.error("Ha ocurrido un error al agregar el procedimiento");
                } else {
                    alertify.error("Ha ocurrido un error con la base de datos");
                }

                IdMedicalRecord = 0;
                $("#Teeth").val("");
                $("#IdDoctor").val("0");
                $("#ClinicalProcedure").val("");
                $("#PrescribedTreatment").val("");
                $("#Payment").val("");

            },
            error: function () {
                alertify.error("Ha ocurrido un error");
            }
        });

    }

}



function UpdateMedicalRercord() {
    if (IdMedicalRecord == 0 || IdMedicalRecord == "") {
        alertify.warning("Debe de seleccionar un Procedimiento");
    } else {

        datos = {
            IdMedicalRecord: IdMedicalRecord
      , IdPatient: IdPatient
      , IdDoctor: $("#IdDoctor").val()
      , Teeth: $("#Teeth").val()
      , ClinicalProcedure: $("#ClinicalProcedure").val()
      , PrescribedTreatment: $("#PrescribedTreatment").val()
      , DateProcedure: $("#DateProcedure").val()
      , Payment: $("#Payment").val()
        }

        $.ajax({
            type: "POST",
            traditional: true,
            url: '/Patients/UpdateMedicalRercord',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(datos),
            success: function (result) {
                if (result.Res) {
                    alertify.success("Procedimiento Actualizado.");
                    $('#tblMedicalRecordDetail').DataTable().destroy();
                    $('#tblMedicalRecordDetail tbody').empty();
                    $.each(result.MedicalRercord, function (i, item) {
                        var fechaDateIn = moment(item.DateProcedure).format('YYYY-MM-DD');
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblMedicalRecordDetail tbody').append("<tr><td>" + item.IdMedicalRecord + "</td><td hidden>"
                                                                     + item.IdPatient + "</td><td hidden>"
                                                                     + item.IdDoctor + "</td><td>"
                                                                     + item.Teeth + "</td><td>"
                                                                     + item.ClinicalProcedure + "</td><td>"
                                                                     + item.PrescribedTreatment + "</td><td>"
                                                                     + fechaDateIn + "</td><td>"
                                                                     + item.Payment + "</td></tr>");
                    });
                    CallBack();
                } else if (result.Res == false) {
                    $('#tblMedicalRecordDetail').DataTable().destroy();
                    $('#tblMedicalRecordDetail tbody').empty();
                    $.each(result.MedicalRercord, function (i, item) {
                        var fechaDateIn = moment(item.DateProcedure).format('YYYY-MM-DD');
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblMedicalRecordDetail tbody').append("<tr><td>" + item.IdMedicalRecord + "</td><td hidden>"
                                                                     + item.IdPatient + "</td><td hidden>"
                                                                     + item.IdDoctor + "</td><td>"
                                                                     + item.Teeth + "</td><td>"
                                                                     + item.ClinicalProcedure + "</td><td>"
                                                                     + item.PrescribedTreatment + "</td><td>"
                                                                     + fechaDateIn + "</td><td>"
                                                                     + item.Payment + "</td></tr>");
                    });
                    CallBack();
                    alertify.error("Ha ocurrido un error al actualizar el Procedimiento");
                } else {
                    alertify.error("Ha ocurrido un error con la base de datos");
                }

                IdMedicalRecord = 0;
                $("#Teeth").val("");
                $("#IdDoctor").val("0");
                $("#ClinicalProcedure").val("");
                $("#PrescribedTreatment").val("");
                $("#Payment").val("");
            },
            error: function () {
                alertify.error("Ha ocurrido un error");
            }
        });
    }


}



function DeleteMedicalRercord() {
    if (IdMedicalRecord == 0 || IdMedicalRecord == "") {
        alertify.warning("Debe de seleccionar un Procedimiento");
    } else {

        $.ajax({
            type: "POST",
            traditional: true,
            url: '/Patients/DeleteMedicalRercord',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdMedicalRecord: IdMedicalRecord, IdPatient: IdPatient }),
            success: function (result) {
                if (result.Res) {
                    alertify.success("Procedimiento Eliminado");
                    $('#tblMedicalRecordDetail').DataTable().destroy();
                    $('#tblMedicalRecordDetail tbody').empty();
                    $.each(result.MedicalRercord, function (i, item) {
                        var fechaDateIn = moment(item.DateProcedure).format('YYYY-MM-DD');
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblMedicalRecordDetail tbody').append("<tr><td>" + item.IdMedicalRecord + "</td><td hidden>"
                                                                     + item.IdPatient + "</td><td hidden>"
                                                                     + item.IdDoctor + "</td><td>"
                                                                     + item.Teeth + "</td><td>"
                                                                     + item.ClinicalProcedure + "</td><td>"
                                                                     + item.PrescribedTreatment + "</td><td>"
                                                                     + fechaDateIn + "</td><td>"
                                                                     + item.Payment + "</td></tr>");
                    });
                    CallBack();
                } else if (result.Res == false) {
                    $('#tblMedicalRecordDetail').DataTable().destroy();
                    $('#tblMedicalRecordDetail tbody').empty();
                    $.each(result.MedicalRercord, function (i, item) {
                        var fechaDateIn = moment(item.DateProcedure).format('YYYY-MM-DD');
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblMedicalRecordDetail tbody').append("<tr><td>" + item.IdMedicalRecord + "</td><td hidden>"
                                                                     + item.IdPatient + "</td><td hidden>"
                                                                     + item.IdDoctor + "</td><td>"
                                                                     + item.Teeth + "</td><td>"
                                                                     + item.ClinicalProcedure + "</td><td>"
                                                                     + item.PrescribedTreatment + "</td><td>"
                                                                     + fechaDateIn + "</td><td>"
                                                                     + item.Payment + "</td></tr>");
                    });
                    CallBack();
                    alertify.error("Ha ocurrido un error al eliminar el Procedimiento");
                } else {
                    alertify.error("Ha ocurrido un error con la base de datos");
                }

                IdMedicalRecord = 0;
                $("#Teeth").val("");
                $("#IdDoctor").val("0");
                $("#ClinicalProcedure").val("");
                $("#PrescribedTreatment").val("");
                $("#Payment").val("");
            },
            error: function () {
                alertify.error("Ha ocurrido un error");
            }
        });
    }


}


function DownloadMedicalRecod() {
    $("#modalMedicalRecord").modal('hide');

    $("#modalContentPrint").html("Imprimir Abonos/Procedimientos");

    $("#modalBody2").load("/Patients/DownloadPDFMedicalRercord/" + IdPatient);
    $("#modalDataPrint").modal('show');
}

function DownloadFicha() {
    $("#modalContentPrint").html("Imprimir Abonos/Procedimientos");

    $("#modalBody2").load("/Patients/DownloadPDFFicha/" + IdPatient);
    $("#modalDataPrint").modal('show');
}
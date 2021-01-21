$(document).ready(function () {
    $('#tblRoles').DataTable();
});

// Eventos de la tabla
var Id = 0; // La utilizamos para saber si se ha seleccionado un registro en la tabla o no
var ultimaFila = null;
var colorOriginalIMPAR = "#ffffff";
var colorOriginalPAR = "#ffe35c";

$("#tblRoles tbody").on("click", "tr", function () {
    Id = $(this).find('td:nth-child(1)').html();
    Nombre = $(this).find('td:nth-child(2)').html();

    if (ultimaFila != null) {
        var tipo = (Id % 2) ? "Impar" : "Par";
        if (tipo == "Impar") {
            ultimaFila.css('background-color', colorOriginalIMPAR);
        } else {
            ultimaFila.css('background-color', colorOriginalPAR);
        }
    }
    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    //Activamos los botones editar y eliminar
    $('#btnEdit').prop("disabled", false);
    $('#btnDelete').prop("disabled", false);
});

// Sección para el CRUD
function NewRole() {
    $("#modalHeader").html("Nuevo Rol");
    $("#modalBody").load("/Role/NewRole");
    $("#modalRole").modal('show');
}

function EditRole() {

    if (Id == 0) {
        alertify.warning("Debe de seleccionar un usuario");
    } else {
        $("#modalHeader").html("Modificar usuario");
        $("#modalBody").load("/Role/EditRole/" + Id);
        $("#modalRole").modal('show');
    }
}

function DeleteRole() {

    if (Id == 0) {
        alertify.warning("Debe de seleccionar un rol");
    } else {
        alertify.confirm("IMACASA", "¿Desea eliminar el rol: " + Nombre + "?",
            function () {
                datos = {
                    Id: Id
                }
                $.ajax({
                    type: "POST",
                    traditional: true,
                    url: '/Role/DeleteRole',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(datos),
                    success: function (result) {
                        if (result == 0) {
                            alertify.success("Rol eliminado.");
                            setTimeout(function () {
                                window.location = "/Role/Index";
                            }, 2000);
                        } else if (result == 1) {
                            alertify.error("Ha ocurrido un error al eliminar el rol");
                        } else {
                            alertify.error("Ha ocurrido un error con la base de datos");
                        }
                    },
                    error: function () {
                        alertify.error("Ha ocurrido un error");
                    }
                });
            },
            function () {
                alertify.error("Cancelado");
            })
    }
}
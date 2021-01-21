$(document).ready(function () {
    $('#tblUsers').DataTable();
});

// Sección para el CRUD
function NewUser() {
    $("#modalHeader").html("Nuevo usuario");
    $("#modalBody").load("/User/NewUser");
    $("#modalUser").modal('show');
}

function EditUser() {

    if (Id == 0) {
        alertify.warning("Debe de seleccionar un usuario");
    } else {
        $("#modalHeader").html("Modificar usuario");
        $("#modalBody").load("/User/EditUser/" + Id);
        $("#modalUser").modal('show');
    }
}

function DeleteUser() {

    if (Nombre.trim() === $("#userName").html()) {
        alertify.error("No puede eliminar el usuario con el que está logeado");
        return;
    }

    if (Id == 0) {
        alertify.warning("Debe de seleccionar un usuario");
    } else {
        alertify.confirm("IMACASA", "¿Desea eliminar al usuario: " + Nombre + "?",
            function () {
                datos = {
                    Id: Id
                }
                $.ajax({
                    type: "POST",
                    traditional: true,
                    url: '/User/DeleteUser',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(datos),
                    success: function (result) {
                        if (result == 0) {
                            alertify.success("Usuario eliminado.");
                            setTimeout(function () {
                                window.location = "/User/Index";
                            }, 2000);
                        } else if (result == 1) {
                            alertify.error("Ha ocurrido un error al eliminar el usuario");
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

// Eventos de la tabla
var Id = 0; // La utilizamos para saber si se ha seleccionado un registro en la tabla o no
var ultimaFila = null;
var colorOriginalIMPAR = "#ffffff";
var colorOriginalPAR = "#ffe35c";

$("#tblUsers tbody").on("click", "tr", function () {
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
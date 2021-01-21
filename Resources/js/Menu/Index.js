$(document).ready(function () {
    $('#tblMenus').DataTable();
});

// Sección para el CRUD
function NewMenu() {
    $("#modalHeader").html("Nuevo Menu");
    $("#modalBody").load("/Menu/NewMenu");
    $("#modalMenu").modal('show');
}

function EditMenu() {

    if (Id == 0) {
        alertify.warning("Debe de seleccionar un menú");
    } else {
        $("#modalHeader").html("Modificar menu");
        $("#modalBody").load("/Menu/EditMenu/" + Id);
        $("#modalMenu").modal('show');
    }
}

function DeleteMenu() {

    if (Id == 0) {
        alertify.warning("Debe de seleccionar un usuario");
    } else {
        alertify.confirm("IMACASA", "¿Desea eliminar el menú: " + Nombre + "?",
            function () {
                datos = {
                    Id: Id
                }
                $.ajax({
                    type: "POST",
                    traditional: true,
                    url: '/Menu/DeleteMenu',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(datos),
                    success: function (result) {
                        if (result == 0) {
                            alertify.success("Menú eliminado");
                            setTimeout(function () {
                                window.location = "/Menu/Index";
                            }, 2000);
                        } else if (result == 1) {
                            alertify.error("Ha ocurrido un error al eliminar el menú");
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
var colorOriginalPAR = "#fbfcfd";

$("#tblMenus tbody").on("click", "tr", function () {
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
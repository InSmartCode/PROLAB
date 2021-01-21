$(document).ready(function () {
    ChargeMenus($('#slctRols option:selected').val());
});

function LoadPermissions() {
    ChargeMenus($('#slctRols option:selected').val());
}


function ChargeMenus(Role) {
    datos = {
        Role: Role
    };

    $.ajax({
        type: "POST",
        traditional: true,
        url: "/Permission/ChargeMenus",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        beforeSend: function () {
            $('#trans').show();
            $('#transact').text("Por favor espere...");
        },
        success: function (resultado) {
            console.log(resultado);
            $('#tblMenus tbody').empty();
            $.each(resultado.lstMenus, function (i, item) {
                $('#tblMenus tbody').append("<tr> <th>" + item.Id + "</th><td>" + item.MenuName + "</td></tr>");
            });

            $('#tblPermission tbody').empty();
            $.each(resultado.lstPermissions, function (i, item) {
                $('#tblPermission tbody').append("<tr><td>" + item.Id + "</td><td>" + item.IdMenu + "</td><td>" + item.MenuName + "</td></tr>");
            });

            $('#transact').text("Transacción realizada");
        },
        error: function () {
            alertify.error("Ha ocurrido un error al cargar los datos");
        },
        complete: function () {
            $('#transact').text("Transacción terminada");
            $('#trans').hide();
        }
    });
}

idMenu = 0; // Almacenamos acá el Id del menú seleccionado
idPerm = 0; // Almacenamos acá el Id del permiso seleccionado

var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblMenus tbody').on('click', 'tr', function () {
    idMenu = $(this).find('th:nth-child(1)').html();
    if (ultimaFila != null) {
        var tipo = (idMenu % 2) ? "Impar" : "Par";
        if (tipo == "Impar") {
            ultimaFila.css('background-color', colorOriginalIMPAR);
        } else {
            ultimaFila.css('background-color', colorOriginalPAR);
        }
    }
    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

});

var ultimaFila2 = null;
var colorOriginalPAR2 = "#ffffff";
var colorOriginalIMPAR2 = "#ffe35c";

$('#tblPermission tbody').on('click', 'tr', function () {
    idPerm = $(this).find('td:nth-child(1)').html();

    if (ultimaFila2 != null) {
        var tipo = (idPerm % 2) ? "Impar" : "Par";
        if (tipo == "Impar") {
            ultimaFila2.css('background-color', colorOriginalIMPAR2);
        } else {
            ultimaFila2.css('background-color', colorOriginalPAR2);
        }
    }
    $(this).css('background-color', '#ffe35c');
    ultimaFila2 = $(this);

});

$(window).on("load, resize", function () {
    var viewportWidth = $(window).width();
    if (viewportWidth < 994) {
        $("#iAgregar").removeClass("fa fa-arrow-right").addClass("fa fa-arrow-down");
        $("#iQuitar").removeClass("fa fa-arrow-left").addClass("fa fa-arrow-up");
    }
    if (viewportWidth > 994) {
        $("#iAgregar").removeClass("fa fa-arrow-down").addClass("fa fa-arrow-right");
        $("#iQuitar").removeClass("fa fa-arrow-up").addClass("fa fa-arrow-left");
    }
});

function AddPermission() {
    if (idMenu == 0) {
        alertify.error("Primero debe escoger un menú");
        return;
    }
    datos = {
        Role: $('#slctRols option:selected').val(),
        MenuId: idMenu
    };
    $.ajax({
        type: "POST",
        traditional: true,
        url: "/Permission/AddPermission",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        beforeSend: function () {
            $('#trans').show();
            $('#transact').text("Por favor espere...");
        },
        success: function (resultado) {
            $('#tblMenus tbody').empty();
            $.each(resultado.lstMenus, function (i, item) {
                $('#tblMenus tbody').append("<tr> <th>" + item.Id + "</th><td>" + item.MenuName + "</td></tr>");
            });

            $('#tblPermission tbody').empty();
            $.each(resultado.lstPermissions, function (i, item) {
                $('#tblPermission tbody').append("<tr><td>" + item.Id + "</td><td>" + item.IdMenu + "</td><td>" + item.MenuName + "</td></tr>");
            });

            $('#transact').text("Transacción realizada");
        },
        error: function () {
            alertify.error("Ha ocurrido un error al cargar los datos");
        },
        complete: function () {
            $('#transact').text("Transacción terminada");
            $('#trans').hide();
        }
    });

    idMenu = 0;
}

function QuitPermission() {
    if (idPerm == 0) {
        alertify.error("Primero debe escoger un permiso");
        return;
    }
    datos = {
        Role: $('#slctRols option:selected').val(),
        PermissonId: idPerm
    };
    $.ajax({
        type: "POST",
        traditional: true,
        url: "/Permission/QuitPermission",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        beforeSend: function () {
            $('#trans').show();
            $('#transact').text("Por favor espere...");
        },
        success: function (resultado) {
            $('#tblMenus tbody').empty();
            $.each(resultado.lstMenus, function (i, item) {
                $('#tblMenus tbody').append("<tr> <th>" + item.Id + "</th><td>" + item.MenuName + "</td></tr>");
            });

            $('#tblPermission tbody').empty();
            $.each(resultado.lstPermissions, function (i, item) {
                $('#tblPermission tbody').append("<tr><td>" + item.Id + "</td><td>" + item.IdMenu + "</td><td>" + item.MenuName + "</td></tr>");
            });

            $('#transact').text("Transacción realizada");
        },
        error: function () {
            alertify.error("Ha ocurrido un error al cargar los datos");
        },
        complete: function () {
            $('#transact').text("Transacción terminada");
            $('#trans').hide();
        }
    });

    idPerm = 0;
}
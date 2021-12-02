/*
*
* Author: Armando Acuña
*/

function guardar() {
    var name = $.trim($("#nombre").val());
    var email = $.trim($("#email").val());
    var password = $.trim($("#password").val());
    var cfpassword = $.trim($("#cfpassword").val());
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (name != "" && email != "" && password != "" && cfpassword != "" && emailRegex.test(email)) {
        if (password != cfpassword) {
            alert("Los password no coinciden");
                $("#cfpassword").focus();
        } else {
            $.ajax({
                url: 'http://129.151.125.74:8080/api/user/new',
                data: JSON.stringify({
                    "email": email,
                    "password": password,
                    "name": name
                }),
                type: 'POST',
                contentType: 'application/json',
                error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
                success: function (respuesta) {
                    console.log(respuesta);  
                    if (respuesta.id == null) {
                        alert("No fue posible crear la cuenta, Usuario ya existe.");
                    } else {  
                        alert('Cuenta creada de forma correcta.');
                        
                        $("#formf").trigger("reset");
                }}
            });
        }
        return false;
    }

}

function login(){
    var email= $.trim($("#email").val());
    var password= $.trim($("#password").val());
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(email != "" && password != "" && emailRegex.test(email)){
        $.ajax({
            url: 'http://129.151.125.74:8080/api/user/'+email+"/"+password,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
            success: function (respuesta) {
                console.log(respuesta);
                console.log(respuesta);
                if (respuesta.id == null) {
                    alert("No existe un usuario con estos datos.")
                } else {
                    alert('Bienvenido al Sistema '+respuesta.name);
                }
                $(':input').val('');
                $("#email").focus();
            }           
        });        
        return false;       
    }   
}

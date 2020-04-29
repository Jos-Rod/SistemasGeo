
auth.onAuthStateChanged( user => {
    configurarMenu(user);
});

const formIngresar = document.getElementById("formIngresar");

formIngresar.addEventListener("submit", (e) => {
    e.preventDefault(); // evitar el reload

    let correo = formIngresar["correo"].value;
    let contrasena = formIngresar["contrasena"].value;

    auth.signInWithEmailAndPassword(correo, contrasena).then( credentials => {
        console.log("Login exitoso.");

        $("#modalIngresar").modal("hide");
        formIngresar.reset();
        formIngresar.querySelector(".error").innerHTML = "";

    }).catch( error => {
        console.log("Error en login: ");
        formIngresar.querySelector(".error").innerHTML = messageError(error.code);
    });

});

function messageError(errCode) {
    let mensaje = "";
    console.log(errCode)
    switch (errCode) {
        case "auth/wrong-password":
            mensaje = "Contraseña incorrecta";
            break;
        case "auth/user-not-found":
            mensaje = "Usuario no encontrado";
            break;
        case "auth/weak-password":
            mensaje = "La contraseña es débil";
            break;
        default:
            mensaje = "Hay un error al ingresar con este usuario."
    }

    return mensaje;
}

const salir = document.getElementById("btnSalir");
salir.addEventListener("click", (e) => {
    e.preventDefault();

    auth.signOut().then( () => {
        alert("Has salido de la sesión");
        $("#collapseExample").collapse("hide");
    });
});

const formRegistro = document.getElementById("formRegistro");
formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = formRegistro["correo_registro"].value;
    const contrasena = formRegistro["contrasena_registro"].value;

    auth.createUserWithEmailAndPassword(correo, contrasena).then( credentials => {
        
        db.collection("usuarios").doc(credentials.user.uid).set({
            nombre: formRegistro["nombre_registro"].value,
            telefono: formRegistro["telefono_registro"].value,
            direccion: formRegistro["direccion_registro"].value
        });

    }).then( () => {
        
        console.log("Registrado!");
        $("#modalRegistro").modal("hide");
        formRegistro.querySelector(".error").innerHTML = "";

    }).catch( error => {
        console.log("Error en registro: ");
        formRegistro.querySelector(".error").innerHTML = messageError(error.code);
        formRegistro.reset();
    });

});


function loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then( function(res) {
        // var token = result.credential.accessToken;
        // var user = result.user;

        const usuarioGlobal = res.user;

        db.collection("usuarios").doc(credentials.user.uid).set({
            nombre: usuarioGlobal.displayName,
            direccion: usuarioGlobal.photoURL
        });

        $("#modalIngresar").modal("hide");
        formIngresar.reset();
        formIngresar.querySelector(".error").innerHTML = "";

    });
}

const auth = firebase.auth();
var formLogin = document.getElementById('formLogin');
var pedidos = {};
var productos = [];


auth.onAuthStateChanged( user => {
    if (user) {
        logeado();
        obtenerProductos();
        obtenerBorradorOT();
        obtenerChoferes();
        if (user.email == "pedro@pedro.com") {
            modoMapa();
            document.getElementById('correoChofer').innerHTML = `Correo: ${user.email}`;
            obtenerInfoChofer(user.email);
        }
    } else {
        console.log("Usuario no logeado");
        noLoggeado();
    }
});

function salir() {
    auth.signOut().then( () => {
        noLoggeado();
    });
}

formLogin.addEventListener("submit", (e) => {
    e.preventDefault(); // evitar el reload
    let correo = formLogin["correo"].value;
    let contrasena = formLogin["contrasena"].value;

    auth.signInWithEmailAndPassword(correo, contrasena).then( credentials => {
        console.log("Login exitoso.");

        logeado();

    }).catch( error => {
        console.log("Error en login: ");
        
    });
});


function obtenerProductos() {
    db.collection("veckyProductos").get().then( doc => {
        var html = '';
        doc.docs.forEach(d => {
            const prod = d.data();
            html += `
            <div class="card col-12 p-2 mt-3">
                <h5>${prod.nombre}</h5>
                <p class="mt-2">${prod.descripcion}</p>
                <p style="text-align: right;">Existencias: ${prod.existencias}</p>
                <button class="btn btn-info" style="width: 40%; margin-left: auto; margin-right: auto;" onclick="agregarProductoAOT('${d.id}', '${prod.nombre}')">Agregar a OT</button>
            </div>
            `;
        });
        document.getElementById('listaProd').innerHTML = html;
    });
}

async function agregarProductoAOT(id, nombre) {

    const {value: cantidad} = await Swal.fire({
        title: 'Existencias a OT',
        text: `Ingresa las existencias para agregar de ${nombre} a la OT:`,
        input: 'text',
        inputPlaceholder: '0'
    });
    
    actualizarCantidadPedido(id, cantidad);

}

function actualizarCantidadPedido(id, cantidad) {
    db.collection("veckyProductos").doc(id).update({
        pedido: parseInt(cantidad)
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

function obtenerBorradorOT() {
    db.collection("veckyProductos").onSnapshot( snap => {
        var html = ``;
        snap.docs.forEach(e => {
            if (e.data().pedido > 0) {
                const prodOT = e.data();
                html += `
                <div class="card col-12 p-2" style="height: 100px">
                    <h5>${prodOT.nombre}</h5>
                    <p style="text-align: right;">Pedido: <strong>${prodOT.pedido}</strong></p>
                    <button class="btn btn-danger" style="width: 40%; margin-left: auto; margin-right: auto;" onclick="quitarDeOT('${e.id}')">Quitar</button>
                </div>
                `;
            }
        });
        if (html == ``) {
            document.getElementById('listaOT').hidden = true;
            document.getElementById('divAcciones').hidden = true;
        } else {
            document.getElementById('listaOT').hidden = false;
            document.getElementById('listaOT').innerHTML = html;
            document.getElementById('divAcciones').hidden = false;
        }
    });
}

function quitarDeOT(id) {
    actualizarCantidadPedido(id, 0);
}

function crearOT() {
    Swal.fire({
        title: 'Crear OT',
        text: "Vas a crear la orden de traslado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear OT'
      }).then((result) => {
        if (result.value) {

            // crear la OT
            obtenerPedidos();

        //   Swal.fire(
        //     'Deleted!',
        //     'Your file has been deleted.',
        //     'success'
        //   );
        }
      });
}

function obtenerPedidos() {
    pedidos = {};
    db.collection("veckyProductos").get().then( doc => {
        doc.docs.forEach(d => {
            if (d.data().pedido > 0) {
                pedidos[d.id] = d.data().pedido;
            }            
        });
        
        const choferSelected = document.getElementById('inputGroupSelect').value;
        // obtener chofer seleccionado
        db.collection("veckyChoferes").doc(choferSelected).update({
            pedido: pedidos
        })
        .then(function() {

            for (var key in pedidos) {
                quitarDeOT(key);
            }

              Swal.fire(
                'OT Creada!',
                'La OT ha sido creada.',
                'success'
              );
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    });
}

function obtenerChoferes() {
    db.collection("veckyChoferes").get().then( doc => {
        var html = ``;
        doc.docs.forEach(d => {
            html += `
                <option value="${d.id}">${d.data().nombre} ${d.data().apellido}</option>
            `;
        });
        document.getElementById('inputGroupSelect').innerHTML = html;
    });
}

function obtenerInfoChofer(email) {
    db.collection("veckyChoferes").onSnapshot( snap => {
        snap.docs.forEach(e => {
            console.log(e);
            if (e.data().email == email) {
                var siHay = false;
                for (var key in e.data().pedido) {
                    siHay = true
                }

                if (siHay) {
                    console.log("Existen pedidos");
                    compartirUbicacion(e.id);
                } else {
                    compartirUbicacionBool = false;
                    console.log("No existen pedidos");
                    alert("El pedido ha terminado");
                    salir();
                }
            }
        });
    });
}
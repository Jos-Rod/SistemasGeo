

const listaToLog = document.querySelectorAll(".toLog");
const listaLogged = document.querySelectorAll(".logged");

const configurarMenu = (user) => {
    if (user) {

        db.collection("usuarios").doc(user.uid).get().then( doc => {
            console.log("Login: " + doc.data());
            if (doc.data().telefono) {
                $("#menuImg").attr("src","");
                document.getElementById("menuNombre").innerHTML = doc.data().nombre;
                document.getElementById("menuTelefono").innerHTML = "Teléfono: " + doc.data().telefono;
                document.getElementById("menuDireccion").innerHTML = "Dirección: " + doc.data().direccion;
            } else {
                document.getElementById("menuNombre").innerHTML = doc.data().nombre
                document.getElementById("menuDireccion").innerHTML = "";
                document.getElementById("menuTelefono").innerHTML = "";
                $("#menuImg").attr("src", doc.data().direccion);
            }
        });

        db.collection("platillos").onSnapshot( snap => {
            ponerPlatillos(snap.docs);
        });

        listaLogged.forEach( i => i.style.display = "block");
        listaToLog.forEach( i => i.style.display = "none");
    } else {
        listaLogged.forEach( i => i.style.display = "none");
        listaToLog.forEach( i => i.style.display = "block");

        document.getElementById("listaPlatillos").innerHTML = `
        <div class="container mt-4 col-12 shadow" style="border-radius: 20px; background-color: yellowgreen; height: 140px; display: flex; justify-content: center; align-items: center;">
                      <h2 style="color: white;">Inicia sesión para pedir eso que se te antoja</h2>
                  </div>
        `;
    }
};

function ponerPlatillos(data) {
    
    if (data.length) {
        var html = '';
        data.forEach( p => {
            const platillo = p.data();
            const columna = `
            <div class="card shadow mr-3 ml-3" style="width: 18rem; border-radius: 25px;">
                    <img src="images/${platillo.imagen}" class="card-img-top" alt="Pizza">
                    <div class="card-body">
                        <h5>${platillo.nombre}</h5>
                        <p class="card-text">Las mejores pizzas</p>
                        <p class="card-text" style="text-align: end;">$${platillo.precio} MXN</p>        
                    </div>
                </div>
            `;

            html += columna;

        });

        document.getElementById("listaPlatillos").innerHTML = html;

    }
}




var compartirUbicacionBool = false;
var idChoferVer = "";
function compartirUbicacion(idChofer) {
    compartirUbicacionBool = true;
    idChoferVer = idChofer;
    console.log("Compartiendo ubicacion fucion");
}

var coordinates = {
    lat: 21.168614,
    lng:  -101.692980
}
var propiedades = {
    center: coordinates,
    zoom: 20
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), propiedades);

    if (navigator.geolocation) {
        // window.addEventListener('locationchange', function(){
        //     console.log('location changed!');
        //     moverPosicion(marker);
        // });
        navigator.geolocation.getCurrentPosition(moverPosicion);
    }
}

// function moverPosicion() {
//     if (compartirUbicacionBool) {
//         console.log("Compartiendo ubicacion");
//         navigator.geolocation.getCurrentPosition( position => {
//             var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//             };
//             console.log("Posision");
//             console.log(pos);
    
//             // update firebase location
//             db.collection("veckyChoferes").doc(idChoferVer).update({
//                 watcherLocation: new firebase.firestore.GeoPoint(pos.lat, pos.lng)
//             });
    
//         });
//     }
// }

function moverPosicion(pos) {
    if (compartirUbicacionBool) {
        console.log("Compartiendo ubicacion por primera vez...");
        var pos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        };
        console.log("Posición");
        console.log(pos);

        // update firebase location
        db.collection("veckyChoferes").doc(idChoferVer).update({
            watcherLocation: new firebase.firestore.GeoPoint(pos.lat, pos.lng)
        });
        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(moverPosicion);
        }, 5000);
    } else {

    }
}
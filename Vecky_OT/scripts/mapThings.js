



var compartirUbicacionBool = false;
var idChoferVer = "";
function compartirUbicacion(idChofer) {
    compartirUbicacionBool = true;
    idChoferVer = idChofer;
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
        window.addEventListener('locationchange', function(){
            console.log('location changed!');
            moverPosicion(marker);
        });
    }
}

function moverPosicion() {
    if (compartirUbicacionBool) {
        navigator.geolocation.getCurrentPosition( position => {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log("Posision");
            console.log(pos);
    
            // update firebase location
            db.collection("veckyChoferes").doc(idChoferVer).update({
                watcherLocation: new firebase.firestore.GeoPoint(pos.lat, pos.lng)
            });
    
        });
    }
}
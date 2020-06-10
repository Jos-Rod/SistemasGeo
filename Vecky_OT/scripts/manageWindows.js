

function logeado() {
    document.getElementById('divLogin').hidden = true;
    document.getElementById('divOT').hidden = false;
    document.getElementById('divMap').hidden = true;
}

function noLoggeado() {
    document.getElementById('divLogin').hidden = false;
    document.getElementById('divOT').hidden = true;
    document.getElementById('divMap').hidden = true;
}

function modoMapa() {
    document.getElementById('divLogin').hidden = true;
    document.getElementById('divOT').hidden = true;
    document.getElementById('divMap').hidden = false;
}
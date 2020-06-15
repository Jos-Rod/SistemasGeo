

function logeado() {
    document.getElementById('divLogin').hidden = true;
    document.getElementById('divOT').hidden = false;
    document.getElementById('divMap').hidden = true;
    document.getElementById('divWatcher').hidden = true;
}

function noLoggeado() {
    document.getElementById('divLogin').hidden = false;
    document.getElementById('divOT').hidden = true;
    document.getElementById('divMap').hidden = true;
    document.getElementById('divWatcher').hidden = true;
}

function modoMapa() {
    document.getElementById('divLogin').hidden = true;
    document.getElementById('divOT').hidden = true;
    document.getElementById('divMap').hidden = false;
    document.getElementById('divWatcher').hidden = true;
}

function verWatcher() {
    document.getElementById('divLogin').hidden = true;
    document.getElementById('divOT').hidden = true;
    document.getElementById('divMap').hidden = true;
    document.getElementById('divWatcher').hidden = false;
}
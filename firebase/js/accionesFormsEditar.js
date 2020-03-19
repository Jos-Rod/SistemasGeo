formularioEditarCarretePlomo.addEventListener("submit", (e) => {
    e.preventDefault();
});

formularioEditarLures.addEventListener("submit", (e) => {
    e.preventDefault();
});

btnGuardarCambiosEditar.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("id");
    let collection = e.target.parentElement.getAttribute("collection");

    var registroAActualizar = new Registro(id, formularioEditarCarretePlomo.nombreEditar.value, formularioEditarCarretePlomo.codigoEditar.value);
    registroAActualizar.actualizar(collection);

});

btnGuardarCambiosEditarLures.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("id");
    var registroAActualizar = new RegistroLures(id, formularioEditarLures.tipoEditar.value, formularioEditarLures.codigoEditar.value, formularioEditarLures.sizeEditar.value, formularioEditarLures.colorEditar.value);
    registroAActualizar.actualizar();
});
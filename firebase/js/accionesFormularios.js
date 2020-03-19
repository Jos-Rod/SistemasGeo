formularioAgregarCarrete.addEventListener("submit", (e) => {
    e.preventDefault(); // prevenir que la pagina se actualice
    var registro = new Registro(0, formularioAgregarCarrete.nombre.value, formularioAgregarCarrete.codigo.value);
    registro.agregar("productos");
    formularioAgregarCarrete.reset();
    $('#modalAgregarCarrete').modal('hide');
});

formularioAgregarPlomo.addEventListener("submit", (e) => {
    e.preventDefault(); // prevenir que la pagina se actualice
    var registro = new Registro(0, formularioAgregarPlomo.nombre.value, formularioAgregarPlomo.codigo.value);
    registro.agregar("plomos");
    formularioAgregarPlomo.reset();
    $('#modalAgregarPlomo').modal('hide');
});

formularioAgregarLure.addEventListener("submit", (e) => {
    e.preventDefault(); // prevenir que la pagina se actualice
    var registro = new RegistroLures(0, formularioAgregarLure.tipo.value, formularioAgregarLure.codigo.value, formularioAgregarLure.size.value, formularioAgregarLure.color.value);
    registro.agregar();
    formularioAgregarLure.reset();
    $('#modalAgregarLure').modal('hide');
});
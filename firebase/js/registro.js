class Registro {
    constructor(id, nombre, codigo) {
        this.id = id;
        this.nombre = nombre;
        this.codigo = codigo;
    }

    borrar(id, collection) {
        db.collection(collection).doc(id).delete();
    }

    agregar(collection) {
        db.collection(collection).add({
            nombre: this.nombre,
            codigo: this.codigo
        });
    }

    editar() {
        formularioEditarCarretePlomo.nombreEditar.value = this.nombre;
        formularioEditarCarretePlomo.codigoEditar.value = this.codigo;
    }

    actualizar(collection) {
        db.collection(collection).doc(this.id).update({
            nombre: this.nombre,
            codigo: this.codigo
        });
        $('#modalEditarCarretePlomo').modal('hide');
    }

}
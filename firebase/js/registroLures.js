class RegistroLures {
    constructor(id, tipo, codigo, size, color) {
        this.id = id;
        this.tipo = tipo;
        this.codigo = codigo;
        this.size = size;
        this.color = color;
    }

    borrar(id) {
        db.collection("lures").doc(this.id).delete();
    }

    agregar() {
        db.collection("lures").add({
            tipo: this.tipo,
            codigo: this.codigo,
            size: this.size,
            color: this.color
        });
    }

    editar() {
        formularioEditarLures.tipoEditar.value = this.tipo;
        formularioEditarLures.codigoEditar.value = this.codigo;
        formularioEditarLures.sizeEditar.value = this.size;
        formularioEditarLures.colorEditar.value = this.color;
    }

    actualizar() {
        db.collection("lures").doc(this.id).update({
            tipo: this.tipo,
            codigo: this.codigo,
            size: this.size,
            color: this.color
        });
        $('#modalEditarLures').modal('hide');
    }

}
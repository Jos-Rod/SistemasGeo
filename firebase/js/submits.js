db.collection('productos').onSnapshot( (snap) => {
    let changes = snap.docChanges();
    changes.forEach( change => {
        
        if (change.type == "added") {
            agregarElementoALista(change.doc, productsList, "productos");
        } else if (change.type == "removed") {
            let valorId = document.getElementById(change.doc.id);
            productsList.removeChild(valorId);
        } else if (change.type == "modified") {
            console.log("modificado");
        }
        
    });
});

db.collection('plomos').onSnapshot( (snap) => {
    let changes = snap.docChanges();
    changes.forEach( change => {
        console.log(change.type);
        if (change.type == "added") {
            agregarElementoALista(change.doc, plomosList, "plomos");
        } else if (change.type == "removed") {
            let valorId = document.getElementById(change.doc.id);
            plomosList.removeChild(valorId);
        } else if (change.type == "modified") {
            console.log("modificado");
            let valorId = document.getElementById(change.doc.id);
            plomosList.removeChild(valorId);
            agregarElementoALista(change.doc, plomosList, "plomos");
        }
    });
});

db.collection('lures').onSnapshot( (snap) => {
    let changes = snap.docChanges();
    changes.forEach( change => {
        
        if (change.type == "added") {
            agregarElementoAListaLures(change.doc);
        } else if (change.type == "removed") {
            let valorId = document.getElementById(change.doc.id);
            luresList.removeChild(valorId);
        }
        
    });
});
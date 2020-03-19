db.collection('productos').onSnapshot( (snap) => {
    let changes = snap.docChanges();
    changes.forEach( change => {
        
        if (change.type == "added") {
            agregarElementoALista(change.doc, productsList, "productos");
        } else if (change.type == "removed") {
            let valorId = document.getElementById(change.doc.id);
            productsList.removeChild(valorId);
        } else if (change.type == "modified") {
            let valorId = document.getElementById(change.doc.id);
            productsList.removeChild(valorId);
            agregarElementoALista(change.doc, productsList, "productos");
        }
        
    });
});

db.collection('plomos').onSnapshot( (snap) => {
    let changes = snap.docChanges();
    changes.forEach( change => {
        if (change.type == "added") {
            agregarElementoALista(change.doc, plomosList, "plomos");
        } else if (change.type == "removed") {
            let valorId = document.getElementById(change.doc.id);
            plomosList.removeChild(valorId);
        } else if (change.type == "modified") {
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
        } else if (change.type == "modified") {
            let valorId = document.getElementById(change.doc.id);
            luresList.removeChild(valorId);
            agregarElementoAListaLures(change.doc);
        }
        
    });
});
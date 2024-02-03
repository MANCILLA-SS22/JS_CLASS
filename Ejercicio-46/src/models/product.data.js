const data = [
    {
        "title": "Saiga-12", 
        "price": 800, 
        "id": 1,
    },
    {   
        "title": "RPG", 
        "price": 1000, 
        "id": 5,
    },
    {   
        "title": "AA-12", 
        "price": 3000, 
        "id": 8,
    },
    {
        "title": "Barret .50 cal", 
        "price": 5000, 
        "id": 3,
    },
    {   
        "title": "AK-12", 
        "price": 900, 
        "id": 8,
    },
    {
        "title": "MP7", 
        "price": 650, 
        "id": 10,
    }
];

function recuperarDatos(){

    return data;
}

function guardarDato(dato){
    data.push(dato);
    return dato;
}

function deleteById(){

    return data;
}

export {recuperarDatos, guardarDato, deleteById}
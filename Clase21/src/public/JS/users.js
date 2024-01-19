function llamarApi() {
    console.log("Llamando api users!!!");
    fetch('/api/users/65a9017b3936a1c059a35360', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(result => {
        if (result.status === 200) {
            result.json()
                .then(json => {
                    console.log("1. ", json);
                });
        } else if (result.status === 401) {
            console.log(result);
            alert("Login invalido revisa tus credenciales!");
        }
    })
};
llamarApi();

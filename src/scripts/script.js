function resetForm (){
    document.getElementById("cardForm").reset();
}

document.getElementById("cardForm").addEventListener("submit", function(event){
    event.preventDefault();

    let formData = new FormData(this)
    let title = formData.get("card-title");
    let content = formData.get("card-content");

    // Crear un objeto con los mismos nombres de campo que el modelo Pydantic
    let cardData = {
        title: title,
        content: content
    };

    let jsonData = JSON.stringify(cardData)
    let postUrl = "http://127.0.0.1:8000/card" 

    fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Indica que se está enviando JSON en el cuerpo de la solicitud
        },
        body: jsonData
    }).then(response => {
        if(!response.ok){
            throw new Error("request Error")
        }
        //Add msg feedback
        resetForm();
    }).catch(error =>{
        console.log("Error", error);
        alert("Something when wrong. Please try again.");
    });
});


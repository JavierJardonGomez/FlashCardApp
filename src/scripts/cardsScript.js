document.addEventListener('DOMContentLoaded', function () {
    fetchCards();
});

function fetchCards() {
    fetch('http://127.0.0.1:8000/cards')
        .then(response => response.json())
        .then(cards => {
            const tbody = document.querySelector('#cardTable tbody');
            tbody.innerHTML = '';

            cards.forEach(card => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${card.title}</td>
                    <td>${card.content}</td>
                    <td>
                        <button onclick="editCard(${card.id})">Editar</button>
                        <button onclick="deleteCard(${parseInt(card.id)})">Eliminar</button>
                    </td>
                `;
                row.dataset.cardId = card.id; // Almacena el ID como atributo de datos
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching cards:', error));
}

function editCard(cardId) {
    // Recupera el ID de la tarjeta desde el atributo de datos de la fila
    const row = document.querySelector(`tr[data-card-id="${cardId}"]`);
    console.log(`Editar tarjeta con ID: ${cardId}`);

}

function deleteCard(cardId) {
    // Recupera el ID de la tarjeta desde el atributo de datos de la fila
    const row = document.querySelector(`tr[data-card-id="${cardId}"]`);
    console.log(`Eliminar tarjeta con ID: ${cardId}`);
    fetch(`http://127.0.0.1:8000/card/${cardId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            // Si la eliminación fue exitosa, actualiza la lista de cards
            fetchCards();
        } else {
            console.error('Error al eliminar la card');
        }
    })
    .catch(error => console.error('Error al eliminar la card:', error));
}

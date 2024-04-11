//http://127.0.0.1:8000/randomCard

document.addEventListener('DOMContentLoaded', function() {
    fetchFlashcard();
});

function fetchFlashcard() {
    fetch('http://127.0.0.1:8000/randomCard')
        .then(response => response.json())
        .then(flashcard => {
            const cardTitle = document.getElementById('card-title');
            cardTitle.textContent = flashcard.title;
            cardTitle.dataset.content = flashcard.content; // Guardamos el contenido en un atributo personalizado
        })
        .catch(error => console.error('Error fetching flashcard:', error));
}

function rotateCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');

    if (flashcard.classList.contains('flipped')) {
        // Si la tarjeta está girada, mostramos el contenido
        const cardTitle = document.getElementById('card-title');
        cardTitle.textContent = cardTitle.dataset.content;
    } else {
        // Si la tarjeta no está girada, volvemos a mostrar el título
        fetchFlashcard();
    }
}

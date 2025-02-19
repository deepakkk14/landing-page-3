const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restart');

const cards = [
    '🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🥥', '🍑', '🍏',
    '🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🥥', '🍑', '🍏',
];

let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    gameBoard.innerHTML = '';
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="front">${card}</div>
            <div class="back"></div>
        `;
        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.querySelector('.front').textContent === card2.querySelector('.front').textContent;

    if (isMatch) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cards.length / 2) {
            setTimeout(() => alert('You won!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

restartButton.addEventListener('click', () => {
    matchedPairs = 0;
    flippedCards = [];
    createBoard();
});

createBoard();

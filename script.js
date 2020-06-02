const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;

/*this keyword represents the element that fired the event.
access the classList of memory-card and toggle the flip-class.
toggle means -> if its there remove it if its not add it.*/
    this.classList.toggle('flip');

if (!hasFlippedCard){
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
} 
    //second click
    secondCard = this;

    checkForMatch();
}
function checkForMatch(){
    // do cards match?
    let isMatch = firstCard.dataset.framework === 
        secondCard.dataset.framework;
    
        isMatch ? disableCards() : unflipCards();
}

function disableCards(){
//its a match!
firstCard.removeEventListener('click', flipCard);
secondCard.removeEventListener('click', flipCard);

resetBoard();
};

function unflipCards(){
    lockBoard = true;
   //not a match
   setTimeout(() =>{
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
}, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
     [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;

    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));

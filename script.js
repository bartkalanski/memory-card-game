//Fetch
class Fetch {
    async getCurrent() {
        const response = await fetch(
            `https://restcountries.eu/rest/v2/region/europe`
        );
        const data = await response.json();

        console.log(data);

        return data;
    }
}
let randomNumber = Math.floor(Math.random() * 54);
let randomNumberOne = Math.floor(Math.random() * 54);
let randomNumberTwo = Math.floor(Math.random() * 54);
let randomNumberThree = Math.floor(Math.random() * 54);
let randomNumberFour = Math.floor(Math.random() * 54);
let randomNumberFive = Math.floor(Math.random() * 54);
//UI
class UI {
    constructor() {
        this.oneContainer = document.getElementById("one")
        this.twoContainer = document.getElementById("two")
        this.threeContainer = document.getElementById("three")
        this.fourContainer = document.getElementById("four")
        this.fiveContainer = document.getElementById("five")
        this.sixContainer = document.getElementById("six");
        this.sevenContainer = document.getElementById("seven")
        this.eightContainer = document.getElementById("eight")
        this.nineContainer = document.getElementById("nine")
        this.tenContainer = document.getElementById("ten")
        this.elevenContainer = document.getElementById("eleven")
        this.twelveContainer = document.getElementById("twelve");
        this.country;
    }

    populateUI(data) {
        this.oneContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumber].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.sevenContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumber].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.twoContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberOne].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.eightContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberOne].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.threeContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberTwo].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.nineContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberTwo].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.fourContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberThree].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.tenContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberThree].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.fiveContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberFour].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.elevenContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberFour].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.sixContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberFive].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
        this.twelveContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberFive].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="JS Badge" />
            `;
    }
}
//Script
const ft = new Fetch();
const ui = new UI();
document.body.addEventListener('click', () => {
    ft.getCurrent().then((data) => {
        //call a UI method
        ui.populateUI(data);
    });
});

//Script
const cards = document.querySelectorAll('.memory-card');
console.log(cards)
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    /*this keyword represents the element that fired the event.
    access the classList of memory-card and toggle the flip-class.
    toggle means -> if its there remove it if its not add it.*/
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    //second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    // do cards match?
    let isMatch = firstCard.dataset.framework ===
        secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    //its a match!
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
};

function unflipCards() {
    lockBoard = true;
    //not a match
    setTimeout(() => {
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
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;

    })
})();
//listens for click on specific card
cards.forEach(card => card.addEventListener('click', flipCard));
// fetch

class Fetch {
    async getCurrent(input) {
        const response = await fetch(
            `https://restcountries.eu/rest/v2/region/${input}/`
        );
        const data = await response.json();
        return data;

    }
}

// ui

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
    }

    populateUI(data) {

        // number of countries in a specified region

        let numberOfCountries = data.length;

        let randomNumber;
        let randomNumberOne;
        let randomNumberTwo;
        let randomNumberThree;
        let randomNumberFour;
        let randomNumberFive;

        // fix repeating random number
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        if (numberOfCountries === 50) {
            randomNumber = getRandom(0, 7)
            randomNumberOne = getRandom(7, 15)
            randomNumberTwo = getRandom(15, 23)
            randomNumberThree = getRandom(23, 31)
            randomNumberFour = getRandom(38, 45)
            randomNumberFive = getRandom(45, 50)
        } else if (numberOfCountries === 60) {
            randomNumber = getRandom(0, 9)
            randomNumberOne = getRandom(9, 19)
            randomNumberTwo = getRandom(19, 29)
            randomNumberThree = getRandom(29, 39)
            randomNumberFour = getRandom(39, 49)
            randomNumberFive = getRandom(49, 60)
        } else if (numberOfCountries === 57) {
            randomNumber = getRandom(0, 8)
            randomNumberOne = getRandom(8, 18)
            randomNumberTwo = getRandom(18, 27)
            randomNumberThree = getRandom(27, 36)
            randomNumberFour = getRandom(36, 45)
            randomNumberFive = getRandom(45, 57)
        } else if (numberOfCountries === 53) {
            randomNumber = getRandom(0, 8)
            randomNumberOne = getRandom(8, 16)
            randomNumberTwo = getRandom(16, 24)
            randomNumberThree = getRandom(24, 32)
            randomNumberFour = getRandom(40, 48)
            randomNumberFive = getRandom(48, 53)
        } else if (numberOfCountries === 27) {
            randomNumber = getRandom(0, 5)
            randomNumberOne = getRandom(5, 10)
            randomNumberTwo = getRandom(10, 15)
            randomNumberThree = getRandom(15, 20)
            randomNumberFour = getRandom(20, 25)
            randomNumberFive = getRandom(25, 27)
        }

        // hide welcome page as game begins

        document.getElementById("index-banner").style.display =
            "none";

        // populate cards with flags 

        this.oneContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumber].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.sevenContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumber].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.twoContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberOne].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.eightContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberOne].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.threeContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberTwo].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.nineContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberTwo].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.fourContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberThree].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.tenContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberThree].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.fiveContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberFour].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.elevenContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberFour].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.sixContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberFive].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
        this.twelveContainer.innerHTML = `
            <img class="front-face" src="${data[randomNumberFive].flag}" alt="flag" />
            <img class="back-face" src="img/globe.png" alt="world-flag" />
            `;
    }
}
// script

const ft = new Fetch();
const ui = new UI();

// add event listeners 
const search = document.getElementById("getInputData")
const button = document.getElementById("begin");

// submit button

button.addEventListener('click', () => {
    const currentVal = search.value;

    ft.getCurrent(currentVal).then((data) => {

        //call a UI method
        ui.populateUI(data);
    });
});

// gameplay 

const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let counter = 1;
let moves = document.getElementById("move-counter");

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    /*this keyword represents the element that fired the event.
    access the classList of memory-card and toggle the flip-class.
    toggle means -> if its there remove it if its not add it.*/
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        //first click
        moves.innerHTML =
            `<h3>Move Count : ${counter++}</h3>`;
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
    // its a match!
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
};

function unflipCards() {
    lockBoard = true;
    // not a match
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
// listens for click on specific card
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});
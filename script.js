const cards = document.querySelectorAll('.memory-card');

function flipCard(){
/*this keyword represents the element that fired the event.
access the classList of memory-card and toggle the flip-class.
toggle means -> if its there remove it if its not add it.*/
    this.classList.toggle('flip');}

cards.forEach(card => card.addEventListener('click', flipCard));
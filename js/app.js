let timerHandle;
// cards array holds all cards
let cards = [...document.getElementsByClassName("card")];

console.log(cards);

var timer = 0;

const deck = document.getElementById("card-deck");
var firstCard = null;
var matchedCards = [];

// loop to add event listeners to each card
var displayCard = function (obj) {
    obj.classList.toggle("open");
    obj.classList.toggle("show");
    obj.classList.toggle("disabled");
};

//Compare the 2 cards
//
function compare(currentCard, previousCard) {
    // Matcher
    return currentCard.innerHTML === previousCard.innerHTML;
}

function endGame() {
    clearInterval(timerHandle);
    timerHandle = null;

    var stars = rating();

    swal({
        text: `Game Over Congratulations! You finished with ${stars} stars time is ${timer} `,
        button: "Play again!"
    }).then((value) => {
        if (value === true) {
            restart();
        }
    });
}

function isGameOver() {

    // if (timer >= 1) {
    //     console.log("game over")
    //     return true;
    // }
    console.log(`matched cards length ${matchedCards.length}`)
    console.log(` cards length ${cards.length}`)

    if (matchedCards.length === cards.length) {
        return true;
    }
    return false;
}
/*
 * Add move
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set the rating
    rating();
}
/*
 * Rating
 */
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;

function rating() {

    if (moves < 10) {
        starsContainer.innerHTML = star + star + star;
        return 3;
    } else if (moves < 15) {
        starsContainer.innerHTML = star + star;
        return 2;
    } else {
        starsContainer.innerHTML = star;
        return 1;
    }
}
/*
 * Restart Button
 */
function restart() {
    for (var i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.classList.remove("open", "show", "disable", "match");
    };

    resetTimer();
    init();

    // Reset ANY RELATED variables
    matchedCards = [];

    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = star + star + star;
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", restart);


/////// Start the game for the first time!
function init() {
    shuffle(cards);
    const deck = document.getElementById("card-deck");
    deck.innerHTML = ""
    for (var i = 0; i < cards.length; i++) {
        let card = cards[i];
        const div = document.createElement("div");
        div.appendChild(card)
        deck.innerHTML += div.innerHTML
    }
    cards = [...document.getElementsByClassName("card")];

    for (var i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.addEventListener("click", function() {
            if (! timerHandle) {
                resetTimer()
                timerHandle = setInterval(banana, 3000)
            }

            displayCard(this);

            if (firstCard === null) {
                firstCard = this
                return;
            }

            // Add New Move
            addMove();
            
            var currentCard = this;

            if (! compare(currentCard, firstCard)) {
                // Wait 600ms then, do this!
                setTimeout(function () {
                    currentCard.classList.remove("open", "show", "disable");
                    firstCard.classList.remove("open", "show", "disable");
                    firstCard = null;        
                }, 600);

                return;
            }

            // Matched
            currentCard.classList.add("match");
            firstCard.classList.add("match");
    
            matchedCards.push(currentCard, firstCard);
    
            firstCard = null;
    
            // Check if the game is over!
            if (isGameOver()) {
                endGame();
                // resetTimer();
            }
        });
    };
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* timer */
/*var timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('#basicUsage').html(timer.getTimeValues().toString());
});
*/

function resetTimer() {
    console.log("Reset")
    timer = 0;
}

function banana() {
    timer = timer + 1;
    console.log(`time is ${timer}`);
}

restart()

/* set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
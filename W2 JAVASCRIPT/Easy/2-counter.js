let counter = 0;

function updateCounter() {
    counter++;
    console.log(counter);
    setTimeout(updateCounter, 1000); // schedule next call after 1 second
}

updateCounter(); // start the counter

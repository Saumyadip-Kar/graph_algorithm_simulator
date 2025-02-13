function printNumbersWithInterval() {
    let i = 1;
    const intervalId = setInterval(() => {
        console.log(i);
        i++;
        if (i > 10) {
            clearInterval(intervalId);  // Stop the interval after printing 10
        }
    }, 300);
}

//printNumbersWithInterval();

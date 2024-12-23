//JavaScript code with simple, beginner-friendly comments explaining each part
document.addEventListener('DOMContentLoaded', () => {
    // Select elements from the HTML
    const colorBox = document.getElementById('color-box'); // The box showing the correct color
    const colorCodeText = document.getElementById('color-code'); // The text displaying the RGB code
    const buttons = document.querySelectorAll('.color-button'); // All color buttons
    const result = document.getElementById('result'); // Where the game result (correct/incorrect) is shown
    const resetButton = document.getElementById('reset'); // "Try Again" button
    const startButton = document.getElementById('start'); // "Start New Game" button
    const scoreDisplay = document.getElementById('score'); // The score counter
    const timerDisplay = document.getElementById('timer'); // The timer

    // Initialize game variables
    let correctColor; // Stores the correct color
    let score = 0; // Keeps track of the player's score
    let timeLeft = 30; // Game timer starts at 30 seconds
    let gameInterval; // Stores the interval ID for the timer

    // Generate a random RGB color
    function randomColor() {
        const r = Math.floor(Math.random() * 256); // Random red value (0-255)
        const g = Math.floor(Math.random() * 256); // Random green value (0-255)
        const b = Math.floor(Math.random() * 256); // Random blue value (0-255)
        return `rgb(${r}, ${g}, ${b})`; // Combine values into an RGB string
    }

    // Update the timer every second
    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--; // Reduce time by 1 second
            timerDisplay.textContent = timeLeft; // Update the timer display
        } else {
            clearInterval(gameInterval); // Stop the timer when time is up
            result.textContent = "Time's Up! 😢"; // Show "Time's Up!" message
            result.style.color = 'red'; // Change text color to red
            disableButtons(); // Disable the buttons to stop the game
        }
    }

    // Disable all buttons (used when the game ends)
    function disableButtons() {
        buttons.forEach(button => button.disabled = true);
    }

    // Enable all buttons (used when the game starts or resets)
    function enableButtons() {
        buttons.forEach(button => button.disabled = false);
    }

    // Reset the game to its initial state
    function resetGame() {
        clearInterval(gameInterval); // Stop the existing timer
        score = 0; // Reset the score to 0
        timeLeft = 30; // Reset the timer to 30 seconds
        scoreDisplay.textContent = score; // Update the score display
        result.textContent = ''; // Clear the result message
        enableButtons(); // Re-enable all buttons
        setupGame(); // Start a new game
        gameInterval = setInterval(updateTimer, 1000); // Restart the timer
    }

    // Set up a new round of the game
    function setupGame() {
        correctColor = randomColor(); // Generate a new correct color
        colorBox.style.backgroundColor = correctColor; // Display the correct color in the box
        colorCodeText.textContent = correctColor; // Show the RGB code for the correct color

        // Generate random colors for the buttons
        const colors = [randomColor(), randomColor(), randomColor(), randomColor()];
        colors[Math.floor(Math.random() * 4)] = correctColor; // Randomly assign the correct color to one button

        // Assign colors to the buttons and add click event listeners
        buttons.forEach((button, index) => {
            button.style.backgroundColor = colors[index]; // Set button color
            button.onclick = () => checkAnswer(colors[index]); // Check the answer when clicked
        });
    }

    // Check if the selected color is correct
    function checkAnswer(selectedColor) {
        if (selectedColor === correctColor) {
            result.textContent = 'Correct! 🎉'; // Show success message
            result.style.color = 'green'; // Change text color to green
            score++; // Increase the score by 1
            scoreDisplay.textContent = score; // Update the score display
        } else {
            result.textContent = 'Try Again! 😢'; // Show failure message
            result.style.color = 'red'; // Change text color to red
        }

        // After 1 second, reset the game for the next round
        setTimeout(() => {
            result.textContent = ''; // Clear the result message
            setupGame(); // Start a new round
        }, 1000);
    }

    // Start a new game when the "Start New Game" button is clicked
    startButton.addEventListener('click', () => {
        resetGame(); // Reset the game
        gameInterval = setInterval(updateTimer, 1000); // Start the timer
    });

    // Reset the game when the "Try Again" button is clicked
    resetButton.addEventListener('click', resetGame);

    // Automatically start the game when the page loads
    resetGame();
});

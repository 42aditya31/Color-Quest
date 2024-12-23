document.addEventListener('DOMContentLoaded', () => {
    const colorBox = document.getElementById('color-box');
    const colorCodeText = document.getElementById('color-code');
    const buttons = document.querySelectorAll('.color-button');
    const result = document.getElementById('result');
    const resetButton = document.getElementById('reset');
    const startButton = document.getElementById('start');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');

    let correctColor;
    let score = 0;
    let timer;
    let timeLeft = 30;
    let gameInterval;

    // Function to generate a random RGB color
    function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Function to update the timer
    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            clearInterval(gameInterval);
            result.textContent = "Time's Up! 😢";
            result.style.color = 'red';
            disableButtons();
        }
    }

    // Function to disable buttons after time runs out
    function disableButtons() {
        buttons.forEach(button => button.disabled = true);
    }

    // Function to reset the game
    function resetGame() {
        clearInterval(gameInterval);
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
        result.textContent = '';
        enableButtons();
        setupGame();
        gameInterval = setInterval(updateTimer, 1000);
    }

    // Function to enable buttons
    function enableButtons() {
        buttons.forEach(button => button.disabled = false);
    }

    // Function to set up the game
    function setupGame() {
        correctColor = randomColor();
        colorBox.style.backgroundColor = correctColor;
        colorCodeText.textContent = correctColor;

        // Generate random colors for buttons
        const colors = [randomColor(), randomColor(), randomColor(), randomColor()];
        colors[Math.floor(Math.random() * 4)] = correctColor; // Randomly place the correct color

        // Shuffle the button colors
        buttons.forEach((button, index) => {
            button.style.backgroundColor = colors[index];
            button.addEventListener('click', () => checkAnswer(colors[index]));
        });
    }

    // Check if the clicked color is correct
    function checkAnswer(selectedColor) {
        if (selectedColor === correctColor) {
            result.textContent = 'Correct! 🎉';
            result.style.color = 'green';
            score++;
            scoreDisplay.textContent = score;
        } else {
            result.textContent = 'Try Again! 😢';
            result.style.color = 'red';
        }

        // After each guess, update the game (new random colors and reset result text)
        setTimeout(() => {
            result.textContent = '';
            setupGame(); // Re-setup the game with new random colors
        }, 1000); // Wait 1 second before resetting
    }

    // Start a new game
    startButton.addEventListener('click', () => {
        resetGame();
        gameInterval = setInterval(updateTimer, 1000);
    });

    // Reset the game
    resetButton.addEventListener('click', resetGame);

    // Initialize the game
    resetGame();
});

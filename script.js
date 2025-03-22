let playerName = '';
let selectedEmoji = '';
let currentQuestionIndex = 0;
let timeLeft = 20;
let timer;
let score = 0;
let leaderboard = [];

const questions = [
    { question: "Is JavaScript een programmeertaal?", answer: true },
    { question: "Is de aarde plat?", answer: false },
    // Voeg hier meer vragen toe als je wilt
];

function startGame() {
    playerName = document.getElementById("player-name").value;
    if (!playerName) {
        alert("Voer je naam in!");
        return;
    }
    
    document.getElementById('name-input').style.display = 'none';
    document.getElementById('emoji-selection').style.display = 'block';
}

function selectEmoji(emoji) {
    selectedEmoji = emoji;
    document.getElementById('emoji-selection').style.display = 'none';
    startTimer();
    showQuestion();
    document.getElementById('game').style.display = 'block';
    document.getElementById('background-music').play();
}

function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft + " seconden";
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
}

function answer(isTrue) {
    const question = questions[currentQuestionIndex];
    if (isTrue === question.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        timeLeft = 20; // Reset timer voor de volgende vraag
        showQuestion();
    } else {
        endGame();
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        timeLeft = 20;
        startTimer();
    } else {
        endGame();
    }
}

function endGame() {
    // Voeg speler toe aan de leaderboard
    leaderboard.push({ name: playerName, score });
    leaderboard.sort((a, b) => b.score - a.score); // Sorteren op score

    // Toon het leaderboard
    displayLeaderboard();

    document.getElementById('game').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
}

function displayLeaderboard() {
    const ranking = document.getElementById('ranking');
    ranking.innerHTML = ''; // Reset de lijst
    leaderboard.slice(0, 3).forEach((player, index) => {
        ranking.innerHTML += `<li>${index + 1}. ${player.name} - Score: ${player.score}</li>`;
    });
}


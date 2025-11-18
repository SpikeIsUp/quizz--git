// VARIABLES GLOBALES
let quizQuestions = [];
let currentQuizIndex = 0;
let quizScore = 0;
let selectedOptionIndex = 0;

// INITIALISATION
document.addEventListener('DOMContentLoaded', function() {
    showScreen('loading-screen');
    loadQuestions();
    
    // Démarrer au clic ou touche entrée
    document.addEventListener('keypress', startFromLoading);
    document.getElementById('loading-screen').addEventListener('click', function() {
        if (this.classList.contains('active')) {
            startQuiz();
        }
    });
});

function startFromLoading(e) {
    if (e.key === 'Enter' && document.getElementById('loading-screen').classList.contains('active')) {
        startQuiz();
        document.removeEventListener('keypress', startFromLoading);
    }
}

// CHARGEMENT DES QUESTIONS
async function loadQuestions() {
    try {
        const response = await fetch('/cyber/api/quiz');
        quizQuestions = await response.json();
        console.log('✅ Questions chargées:', quizQuestions.length);
    } catch (error) {
        console.error('❌ Erreur chargement:', error);
        alert('Erreur de connexion au serveur. Rechargez la page.');
    }
}

// GESTION DES ÉCRANS
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ==================== QUIZ ====================

function startQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    selectedOptionIndex = 0;
    showScreen('quiz-screen');
    displayQuizQuestion();
    setupKeyboardNavigation();
}

function displayQuizQuestion() {
    if (currentQuizIndex >= quizQuestions.length) {
        showResults();
        return;
    }
    
    const question = quizQuestions[currentQuizIndex];
    
    document.getElementById('quiz-current').textContent = currentQuizIndex + 1;
    document.getElementById('quiz-score').textContent = quizScore;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'terminal-btn';
        button.textContent = `${index + 1}. ${option}`;
        button.setAttribute('data-index', index);
        button.onclick = () => answerQuiz(index);
        optionsContainer.appendChild(button);
    });
    
    selectedOptionIndex = 0;
    updateOptionSelection();
    document.getElementById('quiz-feedback').classList.add('hidden');
}

function updateOptionSelection() {
    const buttons = document.querySelectorAll('#options-container .terminal-btn');
    buttons.forEach((btn, i) => {
        if (i === selectedOptionIndex) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', handleQuizKeyboard);
}

function handleQuizKeyboard(e) {
    if (!document.getElementById('quiz-screen').classList.contains('active')) {
        return;
    }
    
    const buttons = document.querySelectorAll('#options-container .terminal-btn');
    if (buttons.length === 0) return;
    
    // Navigation avec chiffres (1-4)
    if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (index < buttons.length && !buttons[index].disabled) {
            e.preventDefault();
            answerQuiz(index);
        }
    }
    // Navigation avec flèches
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!buttons[0].disabled) {
            selectedOptionIndex = (selectedOptionIndex - 1 + buttons.length) % buttons.length;
            updateOptionSelection();
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!buttons[0].disabled) {
            selectedOptionIndex = (selectedOptionIndex + 1) % buttons.length;
            updateOptionSelection();
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (!buttons[selectedOptionIndex].disabled) {
            answerQuiz(selectedOptionIndex);
        }
    }
}

function answerQuiz(userAnswer) {
    const question = quizQuestions[currentQuizIndex];
    const isCorrect = userAnswer === question.correctAnswer;
    
    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.remove('hidden', 'correct', 'incorrect');
    
    const buttons = document.querySelectorAll('#options-container .terminal-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.5';
    });
    
    if (isCorrect) {
        quizScore++;
        buttons[userAnswer].classList.add('correct');
        feedback.classList.add('correct');
        feedback.innerHTML = `<strong>✅ BONNE RÉPONSE!</strong>`;
    } else {
        buttons[userAnswer].classList.add('wrong');
        buttons[question.correctAnswer].classList.add('correct');
        feedback.classList.add('incorrect');
        feedback.innerHTML = `
            <strong>❌ MAUVAISE RÉPONSE</strong><br>
            La bonne réponse était: ${question.options[question.correctAnswer]}
        `;
    }
    
    setTimeout(() => {
        currentQuizIndex++;
        displayQuizQuestion();
    }, 2500);
}

// ==================== RÉSULTATS ====================

async function showResults() {
    document.removeEventListener('keydown', handleQuizKeyboard);
    showScreen('results-screen');
    
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    
    document.getElementById('final-score').textContent = `${quizScore}/${quizQuestions.length}`;
    document.getElementById('final-percentage').textContent = `${percentage}%`;
    
    const levelBadge = document.getElementById('final-level');
    const levelMessage = document.getElementById('level-message');
    
    let level, message, color;
    
    if (percentage >= 90) {
        level = '🏆 EXPERT EN CYBERSÉCURITÉ';
        message = 'EXCEPTIONNEL! Vous maîtrisez parfaitement la cybersécurité.';
        color = '#FFD700';
    } else if (percentage >= 75) {
        level = '💎 HACKER CONFIRMÉ';
        message = 'EXCELLENT! Vous avez une solide compréhension de la cybersécurité.';
        color = '#0f0';
    } else if (percentage >= 60) {
        level = '💻 ANALYSTE SÉCURITÉ';
        message = 'BIEN! Vous avez de bonnes bases en cybersécurité.';
        color = '#0ff';
    } else if (percentage >= 40) {
        level = '🔧 APPRENTI HACKER';
        message = 'PAS MAL! Continuez à apprendre les bases de la sécurité.';
        color = '#ff0';
    } else {
        level = '🔰 DÉBUTANT';
        message = 'DÉBUT DE PARCOURS. Étudiez les fondamentaux de la cybersécurité!';
        color = '#f80';
    }
    
    levelBadge.textContent = level;
    levelBadge.style.background = color;
    levelBadge.style.color = '#000';
    levelMessage.textContent = message;
    levelMessage.style.borderColor = color;
    levelMessage.style.color = color;
    
    setupResultsKeyboard();
    
    try {
        await fetch('/cyber/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                score: quizScore,
                total: quizQuestions.length
            })
        });
    } catch (error) {
        console.error('Erreur envoi score:', error);
    }
}

function setupResultsKeyboard() {
    document.addEventListener('keydown', function handleResults(e) {
        if (e.key === 'r' || e.key === 'R') {
            document.removeEventListener('keydown', handleResults);
            restartQuiz();
        } else if (e.key === 'm' || e.key === 'M') {
            window.location.href = '/';
        }
    });
}

function restartQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    selectedOptionIndex = 0;
    startQuiz();
}
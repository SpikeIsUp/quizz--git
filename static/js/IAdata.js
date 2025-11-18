// VARIABLES GLOBALES
let pretestQuestions = [];
let quizQuestions = [];
let currentPreTestIndex = 0;
let pretestScore = 0;
let currentQuizIndex = 0;
let quizScore = 0;
let selectedOptionIndex = 0;

// INITIALISATION
document.addEventListener('DOMContentLoaded', function() {
    showScreen('loading-screen');
    loadQuestions();
    
    document.addEventListener('keypress', startFromLoading);
    document.getElementById('loading-screen').addEventListener('click', function() {
        if (this.classList.contains('active')) {
            startPreTest();
        }
    });
});

function startFromLoading(e) {
    if (e.key === 'Enter' && document.getElementById('loading-screen').classList.contains('active')) {
        startPreTest();
        document.removeEventListener('keypress', startFromLoading);
    }
}

// CHARGEMENT DES QUESTIONS
async function loadQuestions() {
    try {
        const pretestResponse = await fetch('/IAdata/api/pretest');
        pretestQuestions = await pretestResponse.json();
        
        const quizResponse = await fetch('/IAdata/api/quiz');
        quizQuestions = await quizResponse.json();
        
        console.log('✅ Questions chargées:', pretestQuestions.length, 'pré-test,', quizQuestions.length, 'quiz');
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

// ==================== PRÉ-TEST ====================

function startPreTest() {
    currentPreTestIndex = 0;
    pretestScore = 0;
    selectedOptionIndex = 0;
    showScreen('pretest-screen');
    displayPreTestQuestion();
    setupPretestKeyboard();
}

function displayPreTestQuestion() {
    if (currentPreTestIndex >= pretestQuestions.length) {
        checkPreTestResult();
        return;
    }
    
    const question = pretestQuestions[currentPreTestIndex];
    
    document.getElementById('pretest-current').textContent = currentPreTestIndex + 1;
    document.getElementById('pretest-score').textContent = pretestScore;
    
    const mediaElement = document.getElementById('pretest-media');
    mediaElement.src = question.mediaUrl;
    mediaElement.alt = `Test ${currentPreTestIndex + 1}`;
    
    document.getElementById('pretest-feedback').classList.add('hidden');
    
    const buttons = document.querySelectorAll('.pretest-buttons button');
    buttons.forEach((btn, i) => {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.onclick = () => answerPreTest(btn.getAttribute('data-answer') === 'true');
        if (i === selectedOptionIndex) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function setupPretestKeyboard() {
    document.addEventListener('keydown', handlePretestKeyboard);
}

function handlePretestKeyboard(e) {
    if (!document.getElementById('pretest-screen').classList.contains('active')) {
        return;
    }
    
    const buttons = document.querySelectorAll('.pretest-buttons button');
    if (buttons[0].disabled) return;
    
    if (e.key === '1') {
        e.preventDefault();
        answerPreTest(true);
    } else if (e.key === '2') {
        e.preventDefault();
        answerPreTest(false);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        selectedOptionIndex = 0;
        updatePretestSelection();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        selectedOptionIndex = 1;
        updatePretestSelection();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const isAI = selectedOptionIndex === 0;
        answerPreTest(isAI);
    }
}

function updatePretestSelection() {
    const buttons = document.querySelectorAll('.pretest-buttons button');
    buttons.forEach((btn, i) => {
        if (i === selectedOptionIndex) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function answerPreTest(userAnswer) {
    const question = pretestQuestions[currentPreTestIndex];
    const isCorrect = userAnswer === question.isAi;
    
    const feedback = document.getElementById('pretest-feedback');
    feedback.classList.remove('hidden', 'correct', 'incorrect');
    
    const buttons = document.querySelectorAll('.pretest-buttons button');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.5';
    });
    
    if (isCorrect) {
        pretestScore++;
        feedback.classList.add('correct');
        feedback.innerHTML = `
            <strong>✅ CORRECT!</strong><br>
            Ce média est bien ${question.isAi ? 'généré par IA' : 'réel/non-IA'}.
        `;
    } else {
        feedback.classList.add('incorrect');
        feedback.innerHTML = `
            <strong>❌ INCORRECT!</strong><br>
            Ce média est ${question.isAi ? 'généré par IA' : 'réel/non-IA'}.
        `;
    }
    
    setTimeout(() => {
        currentPreTestIndex++;
        selectedOptionIndex = 0;
        displayPreTestQuestion();
    }, 2000);
}

function checkPreTestResult() {
    document.removeEventListener('keydown', handlePretestKeyboard);
    
    if (pretestScore === 3) {
        setTimeout(() => {
            alert('🎉 ACCÈS AUTORISÉ! Score parfait: 3/3\n\nVous allez maintenant accéder au quiz principal.');
            startQuiz();
        }, 500);
    } else {
        const feedback = document.getElementById('pretest-feedback');
        feedback.classList.remove('hidden');
        feedback.classList.add('incorrect');
        feedback.innerHTML = `
            <strong>⛔ ACCÈS REFUSÉ</strong><br>
            Score: ${pretestScore}/3 - Vous devez obtenir 3/3 pour continuer.<br>
            <button class="terminal-btn" onclick="startPreTest()" style="margin-top: 20px;">
                🔄 RECOMMENCER LE PRÉ-TEST
            </button>
        `;
    }
}

// ==================== QUIZ PRINCIPAL ====================

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
    
    // Type de question (IA ou DATA)
    const typeBadge = document.getElementById('quiz-type');
    if (currentQuizIndex < 10) {
        typeBadge.textContent = 'IA';
        typeBadge.style.background = '#f0f';
    } else {
        typeBadge.textContent = 'DATA';
        typeBadge.style.background = '#0ff';
    }
    
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
    
    if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (index < buttons.length && !buttons[index].disabled) {
            e.preventDefault();
            answerQuiz(index);
        }
    } else if (e.key === 'ArrowUp') {
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
        level = '🏆 DATA SCIENTIST EXPERT';
        message = 'EXCEPTIONNEL! Vous maîtrisez parfaitement l\'IA et la DATA.';
        color = '#FFD700';
    } else if (percentage >= 75) {
        level = '💎 ML ENGINEER';
        message = 'EXCELLENT! Vous avez une solide compréhension de l\'IA et de la DATA.';
        color = '#f80';
    } else if (percentage >= 60) {
        level = '💻 DATA ANALYST';
        message = 'BIEN! Vous avez de bonnes bases en IA et DATA.';
        color = '#0ff';
    } else if (percentage >= 40) {
        level = '🔧 APPRENTI DATA';
        message = 'PAS MAL! Continuez à apprendre les fondamentaux.';
        color = '#ff0';
    } else {
        level = '🔰 DÉBUTANT';
        message = 'DÉBUT DE PARCOURS. Étudiez les bases de l\'IA et de la DATA!';
        color = '#f00';
    }
    
    levelBadge.textContent = level;
    levelBadge.style.background = color;
    levelBadge.style.color = '#000';
    levelMessage.textContent = message;
    levelMessage.style.borderColor = color;
    levelMessage.style.color = color;
    
    setupResultsKeyboard();
    
    try {
        await fetch('/IAdata/api/submit', {
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
    currentPreTestIndex = 0;
    pretestScore = 0;
    currentQuizIndex = 0;
    quizScore = 0;
    selectedOptionIndex = 0;
    startPreTest();
}
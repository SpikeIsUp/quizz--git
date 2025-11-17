// =========================
//   QUIZZ INFO — ARCADE
// =========================

// Questions : q = question, a = réponses, c = index de la bonne réponse
const questions = [
  {
    q: "Que signifie CPU ?",
    a: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Control Power Usage",
    ],
    c: 0,
  },
  {
    q: "Quel protocole utilise le port 80 ?",
    a: ["HTTPS", "FTP", "HTTP"],
    c: 2,
  },
  { q: "Un octet vaut :", a: ["4 bits", "8 bits", "16 bits"], c: 1 },
  {
    q: "Que signifie RAM ?",
    a: ["Random Access Memory", "Rapid Access Module", "Read-Only Memory"],
    c: 0,
  },
  {
    q: "Quel langage est principalement utilisé pour le web côté client ?",
    a: ["Python", "JavaScript", "C"],
    c: 1,
  },
  {
    q: "SSH sert principalement à :",
    a: [
      "Transférer des fichiers",
      "Se connecter de manière sécurisée à une machine distante",
      "Envoyer des mails",
    ],
    c: 1,
  },
  {
    q: "HTML sert à :",
    a: [
      "Styliser une page",
      "Structurer le contenu d'une page web",
      "Gérer une base de données",
    ],
    c: 1,
  },
  {
    q: "CSS sert à :",
    a: [
      "Créer un serveur",
      "Ajouter du style à une page web",
      "Exécuter du code",
    ],
    c: 1,
  },
  {
    q: "Git est :",
    a: [
      "Un système de gestion de versions",
      "Un serveur web",
      "Un langage de programmation",
    ],
    c: 0,
  },
  {
    q: "HTTP signifie :",
    a: [
      "HyperText Transfer Protocol",
      "High Transfer Text Process",
      "Hyperlink Text Transmission Program",
    ],
    c: 0,
  },
  // ➜ Ajoute ici d'autres questions au même format...
];

let score = 0;
let timer = 30;
let current = 0;
let timerInterval = null;
let bestScore = 0;

// Sons (paths à adapter selon ton projet)
const sStart = new Audio("/static/assets/start.mp3");
const sGood = new Audio("/static/assets/correct.mp3");
const sBad = new Audio("/static/assets/wrong.mp3");

// petite config son
[sStart, sGood, sBad].forEach((a) => {
  a.volume = 0.4;
  a.preload = "auto";
});

// Mélange simple de tableau
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Timer
function startTimer() {
  const timerEl = document.getElementById("timer");
  timerEl.classList.remove("warning");

  timer = 30;
  timerEl.textContent = timer;

  timerInterval = setInterval(() => {
    timer--;
    timerEl.textContent = timer;

    if (timer <= 5) {
      timerEl.classList.add("warning");
    }

    if (timer <= 0) {
      endGame();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Affichage question
function loadQuestion() {
  if (current >= questions.length) {
    endGame();
    return;
  }

  const q = questions[current];
  const qEl = document.getElementById("question");
  const answersDiv = document.getElementById("answers");

  qEl.textContent = q.q;
  answersDiv.innerHTML = "";

  // Mélanger les réponses
  const indices = q.a.map((_, i) => i);
  shuffle(indices);

  indices.forEach((i) => {
    const btn = document.createElement("button");
    btn.textContent = q.a[i];
    btn.onclick = () => selectAnswer(i, q.c, btn);
    answersDiv.appendChild(btn);
  });

  // (Re)démarrer le timer pour cette question
  stopTimer();
  startTimer();
}

// Sélection d'une réponse
function selectAnswer(indexClicked, correctIndex, clickedBtn) {
  stopTimer();

  const answersDiv = document.getElementById("answers");
  const buttons = answersDiv.querySelectorAll("button");

  if (indexClicked === correctIndex) {
    score += 10;
    sGood.currentTime = 0;
    sGood.play();
    clickedBtn.classList.add("correct");
  } else {
    sBad.currentTime = 0;
    sBad.play();
    clickedBtn.classList.add("wrong");
    // Marquer la bonne réponse
    buttons.forEach((btn, realIndex) => {
      if (btn.textContent === questions[current].a[correctIndex]) {
        btn.classList.add("correct");
      }
    });
  }

  // Mettre à jour le score affiché
  document.getElementById("score").textContent = score;

  // Désactiver tous les boutons
  buttons.forEach((b) => (b.disabled = true));

  // Passer à la question suivante
  setTimeout(() => {
    current++;
    loadQuestion();
  }, 900);
}

// Fin de partie
function endGame() {
  stopTimer();

  // Masquer les questions et réponses
  document.getElementById("answers").innerHTML = "";
  document.getElementById("question").textContent = "";

  // Afficher l'écran de fin
  const gameOver = document.getElementById("game-over");
  gameOver.classList.remove("hidden");

  const finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = `Ton score final : ${score}`;

  const recordMsg = document.getElementById("record-msg");

  // Gestion du record (localStorage)
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("info_best_score", String(bestScore));
    document.getElementById("best-score").textContent = bestScore;
    recordMsg.textContent = "🔥 Nouveau record ! Bien joué !";
  } else {
    recordMsg.textContent = `Record actuel : ${bestScore}`;
  }
}

// Initialisation
window.onload = () => {
  // Charger record
  const savedBest = localStorage.getItem("info_best_score");
  if (savedBest) {
    bestScore = parseInt(savedBest, 10) || 0;
  } else {
    bestScore = 0;
  }
  document.getElementById("best-score").textContent = bestScore;

  // Mélanger l'ordre des questions
  shuffle(questions);

  // Jouer son de start
  sStart.play().catch(() => {
    /* ignore si bloqué par navigateur */
  });

  // Démarrer le quiz
  loadQuestion();

  // Bouton rejouer
  document.getElementById("replay-btn").onclick = () => {
    // Réinitialiser état
    score = 0;
    current = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("game-over").classList.add("hidden");
    shuffle(questions);
    loadQuestion();
  };
};

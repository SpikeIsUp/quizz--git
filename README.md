# 🧠 Projet GoQuiz 

## 🎯 Objectif 

Créer un **petit jeu de quiz en console** 
Le jeu pose des questions à l’utilisateur, vérifie les réponses et affiche un score final avec un petit message amusant.

---

## 🗂️ Structure du projet

```text
GoQuiz/
│
├── main.go → point d’entrée du programme
├── quizmenu.go → menu principal
├── quizinfo.go → quiz sur l’informatique
├── quizcyber.go → quiz cybersécurité
├── quizIAdata.go → quiz sur la data et l’IA
├── go.mod → module Go (nom du projet)
├── README.md → documentation du projet
```
---

##  Logique du programme (vue d’ensemble)

#### Ce diagramme montre comment les fichiers et les fonctions s’enchaînent dans le projet GoQuiz.

```text
┌───────────────────────────┐
│         main.go           │
│       ShowMenu()          │
│  (point d'entrée du jeu)  │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│        quizmenu.go        │
│   fonction : ShowMenu()   │
│                           │
│  1️⃣ Affiche le menu       │
│  2️⃣ Lis le choix          │
│  3️⃣ Appelle le bon quiz   │
└───────┬─────────────────┬─────────────────┬
        │                 │                 │
        ▼                 ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ quizinfo.go   │ │ quizcyber.go  │ │ quizIAdata.go │
│ StartQuizInfo │ │ StartQuizCyber│ │StartQuizIAData│
└───────────────┘ └───────────────┘ └───────────────┘
```
##  Flux interne d’un quiz (exemple avec quizinfo.go)
#### Ce schéma montre un exemple ce qu’il se passe à l’intérieur d’un quiz.
    
 ```text
    StartQuizInfo()
   │
   ├── AskQuestion("texte")
   │       │
   │       └── Affiche la question à l'utilisateur
   │
   ├── CheckAnswer(correctAnswer)
   │       │
   │       ├── Lis la réponse entrée au clavier
   │       ├── Compare avec la bonne réponse
   │       └── Retourne true ou false
   │
   └── CalculateScore(score, totalQuestions)
           ├── Affiche le score
           └── Donne le titre selon le niveau
           
```


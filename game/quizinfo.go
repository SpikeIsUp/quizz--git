package main

import "fmt"

func StartQuizInfo() {
	fmt.Println("=== Quiz Informatique ===")
	fmt.Println("=== Quiz Informatique Générale ===")

	totalQuestions := 3
	score := 0
	// Question 1
	fmt.Println("Quel est le système d’exploitation libre le plus utilisé ?")
	fmt.Println("1. Windows")
	fmt.Println("2. macOS")
	fmt.Println("3. Linux")
	if CheckAnswer(3) {
		score++
	}
	// Question 2
	fmt.Println("Quel langage est compilé ?")
	fmt.Println("1. Python")
	fmt.Println("2. Go")
	fmt.Println("3. JavaScript")
	if CheckAnswer(2) {
		score++
	}
	// Question 3
	fmt.Println("Que signifie HTML ?")
	fmt.Println("1. HyperText Markup Language")
	fmt.Println("2. HighText Machine Learning")
	fmt.Println("3. Hyper Transfer Main Line")
	if CheckAnswer(1) {
		score++
	}
	CalculateScore(score, totalQuestions)
}

func CheckAnswer(correctAnswer int) bool {
	var userAnswer int
	fmt.Print("Ta réponse (numéro) : ")
	fmt.Scan(&userAnswer)

	if userAnswer == correctAnswer {
		fmt.Println("✅ Correct !")
		return true
	} else {
		fmt.Println("❌ Mauvaise réponse.")
		return false
	}
}

func CalculateScore(score int, total int) {
	fmt.Printf("Tu as %d/%d bonnes réponses.\n", score, total)

	if score <= 1 {
		fmt.Println("🔰 Niveau : Apprenti codeur")
	} else if score == 2 {
		fmt.Println("💻 Niveau : Développeur en progression")
	} else {
		fmt.Println("🤯 Niveau : Cyber Mastermind")
	}
}

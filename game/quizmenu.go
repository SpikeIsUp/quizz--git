package main

import "fmt"

func ShowMenu() {
	var choice int
	fmt.Println("=== GOQUIZ ===")
	fmt.Println("1. Informatique")
	fmt.Println("2. Cybersécurité")
	fmt.Println("3. Data / IA")
	fmt.Println("0. Quitter")
	fmt.Print("Choix : ")
	fmt.Scan(&choice)

	if choice == 1 {
		StartQuizInfo()
	} else if choice == 2 {
		StartQuizCyber()
	} else if choice == 3 {
		StartQuizIAData()
	} else {
		fmt.Println("Merci d'avoir joué 👋")
	}
}

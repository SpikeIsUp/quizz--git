package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/SpikelsUp/quizz--git/game"
)

func RenderTemplate(w http.ResponseWriter, tmpl string) error {
	path := filepath.Join("template", tmpl)
	log.Println("Rendu:", path)
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	return nil
}

// CYBER
func Cyber(w http.ResponseWriter, r *http.Request) {
	log.Println("➡️  GET /cyber")

	// API pour les questions
	if strings.Contains(r.URL.Path, "/api/quiz") {
		log.Println("📡 API: Cyber questions")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(game.QuizCyberQuestions)
		return
	}
	if strings.Contains(r.URL.Path, "/api/submit") && r.Method == "POST" {
		handleSubmitScore(w, r, "CYBER")
		return
	}

	http.ServeFile(w, r, "template/cyber.html")
}

// IA/DATA
func IAdata(w http.ResponseWriter, r *http.Request) {
	log.Println("➡️  GET /IAdata")

	if strings.Contains(r.URL.Path, "/api/pretest") {
		log.Println("📡 API: Pré-test questions")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(game.PreTestQuestions)
		return
	}
	if strings.Contains(r.URL.Path, "/api/quiz") {
		log.Println("📡 API: IAdata questions")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(game.QuizIADataQuestions)
		return
	}
	if strings.Contains(r.URL.Path, "/api/submit") && r.Method == "POST" {
		handleSubmitScore(w, r, "IA/DATA")
		return
	}

	http.ServeFile(w, r, "template/IAdata.html")
}

// INFO
func Info(w http.ResponseWriter, r *http.Request) {
	log.Println("➡️  GET /info")

	if strings.Contains(r.URL.Path, "/api/quiz") {
		log.Println("📡 API: Info questions")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(game.QuizInfoQuestions)
		return
	}
	if strings.Contains(r.URL.Path, "/api/submit") && r.Method == "POST" {
		handleSubmitScore(w, r, "INFO")
		return
	}

	http.ServeFile(w, r, "template/info.html")
}

// Fonction commune pour gérer les scores
func handleSubmitScore(w http.ResponseWriter, r *http.Request, quizType string) {
	var submission struct {
		Score int `json:"score"`
		Total int `json:"total"`
	}

	if err := json.NewDecoder(r.Body).Decode(&submission); err != nil {
		log.Println("❌ Erreur décodage JSON:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	percentage := float64(submission.Score) / float64(submission.Total) * 100
	log.Printf("📊 [%s] Score: %d/%d (%.1f%%)", quizType, submission.Score, submission.Total, percentage)

	response := map[string]interface{}{
		"status":     "success",
		"score":      submission.Score,
		"total":      submission.Total,
		"percentage": percentage,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

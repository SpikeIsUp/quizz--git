package controller

import (
	"log"
	"net/http"
	"path/filepath"
)

func RenderTemplate(w http.ResponseWriter, tmpl string) error {
	path := filepath.Join("template", tmpl)
	log.Println("Rendu:", path)

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	return (nil)
}

func Cyber(w http.ResponseWriter, r *http.Request) {
	log.Println("➡️  GET /Cyber")
	if err := RenderTemplate(w, "menu.html"); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func IAdata(w http.ResponseWriter, r *http.Request) {
	log.Println("➡️  GET /IAdata")
	if err := RenderTemplate(w, "menu.html"); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func Info(w http.ResponseWriter, r *http.Request) {
	log.Println("➡️  GET /info")
	if err := RenderTemplate(w, "menu.html"); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
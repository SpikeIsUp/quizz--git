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

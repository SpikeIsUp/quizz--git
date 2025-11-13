package main

import (
	"net/http"

	"github.com/SpikelsUp/quizz--git/controller"
)

func main() {
	ShowMenu()
}

func ShowMenu() {
	panic("unimplemented")
}

func menuHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	if err := controller.RenderTemplate(w, "menu.html"); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

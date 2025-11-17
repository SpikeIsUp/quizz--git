package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/SpikelsUp/quizz--git/controller"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "template/menu.html")
}

func cyberHandler(w http.ResponseWriter, r *http.Request) {
	controller.Cyber(w, r)
}

func IAdataHandler(w http.ResponseWriter, r *http.Request) {
	controller.IAdata(w, r)
}

func infoHandler(w http.ResponseWriter, r *http.Request) {
	controller.Info(w, r)
}

func main() {
	//cwd, _ := os.Getwd()

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))


	
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/cyber", cyberHandler)
	http.HandleFunc("/IAdata", IAdataHandler)
	http.HandleFunc("/info", infoHandler)

	addr := ":8080"
	fmt.Printf("✅ Serveur lancé sur http://localhost%v\n", addr)
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal(err)
	}

}

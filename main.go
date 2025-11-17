package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)
type Score struct {
Name string `json:"name"`
Score int `json:"score"`
Date string `json:"date"`
}


func main() {
// Static files
fs := http.FileServer(http.Dir("static"))
http.Handle("/static/", http.StripPrefix("/static/", fs))


// Templates
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
http.ServeFile(w, r, "templates/index.html")
})
http.HandleFunc("/quiz", func(w http.ResponseWriter, r *http.Request) {
http.ServeFile(w, r, "templates/quiz.html")
})


// Serve data files (questions + scores)
http.HandleFunc("/api/questions", func(w http.ResponseWriter, r *http.Request) {
http.ServeFile(w, r, "data/questions.json")
})


// Simple API to save a score (POST JSON)
http.HandleFunc("/api/score", func(w http.ResponseWriter, r *http.Request) {
if r.Method != http.MethodPost {
w.WriteHeader(http.StatusMethodNotAllowed)
return
}
body, err := io.ReadAll(r.Body)
if err != nil {
http.Error(w, "bad body", http.StatusBadRequest)
return
}
var s Score
if err := json.Unmarshal(body, &s); err != nil {
http.Error(w, "invalid json", http.StatusBadRequest)
return
}
// add date
s.Date = time.Now().Format(time.RFC3339)


// load existing
f, err := os.ReadFile("data/scores.json")
if err != nil {
// if missing, create
os.WriteFile("data/scores.json", []byte("[]"), 0644)
f = []byte("[]")
}
var list []Score
_ = json.Unmarshal(f, &list)
list = append(list, s)
out, _ := json.MarshalIndent(list, "", " ")
os.WriteFile("data/scores.json", out, 0644)


w.Header().Set("Content-Type", "application/json")
w.Write([]byte("{\"ok\":true}"))
})


log.Println("Server running on http://localhost:8080")
log.Fatal(http.ListenAndServe(":8080", nil))
}
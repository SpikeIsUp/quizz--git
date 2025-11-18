package game

type QuizQuestion struct {
	Question      string   `json:"question"`
	Options       []string `json:"options"`
	CorrectAnswer int      `json:"correctAnswer"`
}

var QuizCyberQuestions = []QuizQuestion{
	{
		Question:      "Que signifie DDoS ?",
		Options:       []string{"Distributed Denial of Service", "Direct Data of System", "Destructive Digital Operation System", "Dynamic Denial on Server"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Quel protocole sécurise les connexions HTTP ?",
		Options:       []string{"FTP", "HTTPS", "SSH", "SMTP"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Qu'est-ce qu'un firewall ?",
		Options:       []string{"Un antivirus", "Un pare-feu réseau", "Un système d'exploitation", "Un logiciel de cryptage"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Que fait un malware ?",
		Options:       []string{"Protège l'ordinateur", "Accélère le système", "Nuit au système", "Optimise la mémoire"},
		CorrectAnswer: 2,
	},
	{
		Question:      "Qu'est-ce que le phishing ?",
		Options:       []string{"Une attaque par hameçonnage", "Un type de cryptage", "Un protocole réseau", "Un pare-feu"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Quel port utilise SSH par défaut ?",
		Options:       []string{"21", "22", "80", "443"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Que signifie VPN ?",
		Options:       []string{"Virtual Private Network", "Very Protected Node", "Verified Public Network", "Visual Protocol Network"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Qu'est-ce qu'une attaque par force brute ?",
		Options:       []string{"Essai systématique de mots de passe", "Destruction physique d'un serveur", "Surcharge réseau", "Injection SQL"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Que fait un ransomware ?",
		Options:       []string{"Vole des données", "Chiffre les fichiers et demande une rançon", "Détruit le BIOS", "Ralentit le réseau"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Qu'est-ce que l'authentification à deux facteurs (2FA) ?",
		Options:       []string{"Double mot de passe", "Mot de passe + code temporaire", "Deux antivirus", "Deux pare-feu"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Quel algorithme de cryptage est le plus sûr aujourd'hui ?",
		Options:       []string{"MD5", "SHA-1", "AES-256", "DES"},
		CorrectAnswer: 2,
	},
	{
		Question:      "Que signifie SQL Injection ?",
		Options:       []string{"Injection de code SQL malveillant", "Protection de base de données", "Type de cryptage", "Protocole réseau"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Qu'est-ce qu'un honeypot en cybersécurité ?",
		Options:       []string{"Un piège pour attirer les pirates", "Un antivirus", "Un type de malware", "Un protocole réseau"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Que fait un IDS ?",
		Options:       []string{"Détecte les intrusions", "Chiffre les données", "Accélère le réseau", "Gère les utilisateurs"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Qu'est-ce que le zero-day ?",
		Options:       []string{"Une vulnérabilité non encore corrigée", "Un antivirus", "Un protocole", "Un système d'exploitation"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Quel est le rôle du chiffrement asymétrique ?",
		Options:       []string{"Utilise une clé pour chiffrer et déchiffrer", "Utilise deux clés : publique et privée", "Ne chiffre pas les données", "Accélère les échanges"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Que signifie CVE ?",
		Options:       []string{"Common Vulnerabilities and Exposures", "Cyber Virtual Environment", "Computer Virus Entry", "Cryptographic Value Exchange"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Qu'est-ce qu'un botnet ?",
		Options:       []string{"Un réseau de robots physiques", "Un réseau d'ordinateurs infectés contrôlés à distance", "Un type de VPN", "Un protocole réseau"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Que fait un SIEM ?",
		Options:       []string{"Surveille et analyse les événements de sécurité", "Chiffre les emails", "Gère les utilisateurs", "Bloque les virus"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Qu'est-ce que le social engineering ?",
		Options:       []string{"Manipulation psychologique pour obtenir des infos", "Développement de réseaux sociaux", "Programmation collaborative", "Gestion de communautés"},
		CorrectAnswer: 0,
	},
}

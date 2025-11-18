package game

type PreTestQuestion struct {
	MediaURL  string `json:"mediaUrl"`
	MediaType string `json:"mediaType"`
	IsAI      bool   `json:"isAi"`
}

var PreTestQuestions = []PreTestQuestion{
	{
		MediaURL:  "/static/image/image1.jpg",
		MediaType: "image",
		IsAI:      true,
	},
	{
		MediaURL:  "/static/image/image2.jpg",
		MediaType: "image",
		IsAI:      false,
	},
	{
		MediaURL:  "/static/image/image3.png",
		MediaType: "image",
		IsAI:      true,
	},
}

var QuizIADataQuestions = []QuizQuestion{
	// Questions IA (10 questions)
	{
		Question:      "Quel algorithme est utilisé pour l'apprentissage supervisé ?",
		Options:       []string{"K-means", "Régression linéaire", "DBSCAN", "PCA"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Que signifie GPT dans ChatGPT ?",
		Options:       []string{"General Purpose Technology", "Generative Pre-trained Transformer", "Global Processing Tool", "Graphical Programming Terminal"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Quel est le rôle d'un réseau de neurones convolutif (CNN) ?",
		Options:       []string{"Traitement du langage naturel", "Reconnaissance d'images", "Analyse de séries temporelles", "Clustering"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Qu'est-ce que l'overfitting en Machine Learning ?",
		Options:       []string{"Le modèle est trop simple", "Le modèle mémorise les données d'entraînement", "Le modèle converge trop vite", "Le modèle manque de données"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Quel framework est développé par Google pour le deep learning ?",
		Options:       []string{"PyTorch", "Keras", "TensorFlow", "Scikit-learn"},
		CorrectAnswer: 2,
	},
	{
		Question:      "Que fait la fonction d'activation ReLU ?",
		Options:       []string{"Retourne 0 si x < 0, sinon x", "Retourne une valeur entre 0 et 1", "Normalise les données", "Calcule la dérivée"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Qu'est-ce qu'un GAN (Generative Adversarial Network) ?",
		Options:       []string{"Un réseau de sécurité", "Deux réseaux qui s'affrontent", "Un algorithme de clustering", "Un type de base de données"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Quel est le but du dropout dans un réseau de neurones ?",
		Options:       []string{"Accélérer l'entraînement", "Réduire l'overfitting", "Augmenter la précision", "Compresser le modèle"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Que signifie NLP en IA ?",
		Options:       []string{"Network Layer Protocol", "Natural Language Processing", "Neural Learning Process", "Normalized Linear Prediction"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Quel algorithme est utilisé pour le clustering non supervisé ?",
		Options:       []string{"Random Forest", "K-means", "Gradient Boosting", "SVM"},
		CorrectAnswer: 1,
	},
	// Questions DATA (10 questions)
	{
		Question:      "Quel langage est principalement utilisé pour interroger des bases de données ?",
		Options:       []string{"Python", "SQL", "Java", "C++"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Que signifie CRUD en gestion de données ?",
		Options:       []string{"Create Read Update Delete", "Connect Run Upload Download", "Compile Run Use Debug", "Cache Render Update Deploy"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Quel type de base de données est MongoDB ?",
		Options:       []string{"Relationnelle", "NoSQL orientée documents", "GraphQL", "In-memory"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Qu'est-ce qu'une clé primaire dans une base de données ?",
		Options:       []string{"Un mot de passe", "Un identifiant unique", "Une connexion", "Un index"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Quel format de données est le plus utilisé pour les API REST ?",
		Options:       []string{"XML", "CSV", "JSON", "YAML"},
		CorrectAnswer: 2,
	},
	{
		Question:      "Que fait la commande SQL 'JOIN' ?",
		Options:       []string{"Supprime des données", "Fusionne des tables", "Crée une table", "Sauvegarde la base"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Qu'est-ce qu'un ETL en Data Engineering ?",
		Options:       []string{"Extract Transform Load", "Execute Test Launch", "Encode Transfer Link", "Evaluate Train Learn"},
		CorrectAnswer: 0,
	},
	{
		Question:      "Quel outil est utilisé pour le Big Data distribué ?",
		Options:       []string{"Excel", "Hadoop", "Notepad", "Paint"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Qu'est-ce qu'un Data Warehouse ?",
		Options:       []string{"Un entrepôt physique", "Un système de stockage centralisé pour l'analyse", "Un logiciel de sécurité", "Un type de virus"},
		CorrectAnswer: 1,
	},
	{
		Question:      "Quel est le rôle d'un index dans une base de données ?",
		Options:       []string{"Sécuriser les données", "Accélérer les recherches", "Compresser les fichiers", "Créer des backups"},
		CorrectAnswer: 1,
	},
}

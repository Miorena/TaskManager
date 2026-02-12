const express = require("express");
const cors = require("cors");
const { syncDatabase } = require("./models");
const taskRouter = require("./routes/tasks");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Sert à parser le body des requêtes entrantes

app.get("/", (req, res) => {
	res.json({ message: "Welcome on my API" });
});

// Utiliser les routes tasks
app.use("/tasks", taskRouter);

// Gestion de 404 - route non trouvée
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

// Gestionaire d'erreurs global
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Internal server error" });
});

// Démarrer le serveur après avoir synchronisé la DB
syncDatabase()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Database connection error");
		process.exit(1); // Arrête le processus avec un code d'erreur
	});
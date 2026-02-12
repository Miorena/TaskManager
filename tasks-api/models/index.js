const { Sequelize, DataTypes } = require("sequelize");
const { Database } = require("sqlite3");

// Connexion à SQlite (Fichier créer automatiquement)
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite",
	logging: false, // enlève les logs SQL dans le terminal
});

// Définition du modèle Task
const Task = sequelize.define("Task", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isDone: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

// Fonction pour synchroniser la BD (créer les tables)
const syncDatabase = async () => {
	await sequelize.sync();
	console.log("Database synchronised ✅");
};

module.exports = { Task, syncDatabase };
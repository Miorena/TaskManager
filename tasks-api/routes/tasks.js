const express = require("express");
const router = express.Router();
const { Task } = require("../models");
const { validateId } = require ("../middleware/validateId");

// GET all tasks
router.get("/", async (req, res) => {
	try {
		const tasks = await Task.findAll();
		res.json(tasks);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error"});
	}
});

// GET task by id
router.get("/:id",validateId, async (req, res) => {
	try {
		const task = await Task.findByPk(req.params.id);
		if (!task) return res.status(404).json({ message: "Task not found" });
		res.json(task);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

// POST create task
router.post("/", async (req, res) => {
	try {
		const { title } = req.body;
		if (!title) return res.status(400).json({ message: "Title required" });
		const task = await Task.create({ title });
		res.status(201).json(task);
	} catch (err) {
		console.error(err);
		res.satuts(500).json({ message: "Internal server error" });
	}
});

// PUT - Remplacer complètement une tâche
router.put("/:id",validateId, async (req, res) => {
	try {
		const task = await Task.findByPk(req.params.id);
		if (!task) return res.status(404).json({ message: "Task not found" });

		const { title, isDone } = req.body;
		if (!title) return res.status(400).json({ message: "Title required" });

		await task.update({ title, isDone });
		res.json(task);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

// PATCH - Mise à jour partielle
router.patch("/:id",validateId, async (req, res) => {
	try {
		const task = await Task.findByPk(req.params.id);
		if (!task) return res.status(404).json({ message: "Task not found" });

		const { title, isDone } = req.body;
		if (title !== undefined) task.title = title;
		if (isDone !== undefined) task.isDone = isDone;

		await task.save();
		res.json(task);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

// DELETE - Supprimer une tâche
router.delete("/:id",validateId, async (req, res) => {
	try {
		const task = await Task.findByPk(req.params.id);
		if (!task) return res.status(404).json({ message: "Task not found" });

		await task.destroy();
		res.json({ message: "Task deleted!" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
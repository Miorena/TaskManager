const validateId = (req, res, next) => {
	const id = parseInt(req.params.id, 10);

	if (isNaN(id) || id <= 0) {
		return res.status(400).json({ message: "Invalid ID" });
	}

	req.params.id = id;
	next();
};

module.exports = { validateId };
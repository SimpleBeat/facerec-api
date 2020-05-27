const Clarifai = require('clarifai');
const app = new Clarifai.App({ apiKey: 'a2517569aefa4cf0a2adb582ffcd45b2' });

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to run api'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(400).json('Count is not available'))
}

module.exports = {
	handleImage,
	handleApiCall
}
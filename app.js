const express = require('express');
const xss = require('xss');

const app = express();

app.use(express.json());

// Define a GET route handler for the root path
app.get('/', (req, res) => {
	res.send('Welcome to the TUIC API!');
});

app.post('/data', (req, res) => {
	const sanitizedInput = xss(req.body.input);
	// Process the sanitizedInput
	res.send(`Processed input: ${sanitizedInput}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));

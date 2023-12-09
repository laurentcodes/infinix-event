import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
	const { type } = req.query;

	try {
		const data = fs.readFileSync(
			path.join(process.cwd(), 'src', 'data', type + '.txt'),
			'utf8'
		);

		const lines = data.split('\n');

		const arrayOfObjects = lines.map((line) => {
			const [email, name] = line.split('\t');
			return { email, name };
		});

		res.status(200).json(arrayOfObjects);
	} catch (error) {
		res.status(500).json({ error: 'Error reading the file' });
	}
}

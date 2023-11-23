const connectDB = require('../../../config/db');
import { CustomError } from './util/customError';

const Attendant = require('./models/Attendant');

// Connect database
connectDB();

export default async function handler(req, res) {
	const { method } = req;

	const { network, name, handle } = req.body;

	if (method === 'GET') {
		try {
			let attendants = await Attendant.find();
			const count = await Attendant.countDocuments();

			res.status(200).json({ data: attendants, total: count });
		} catch (err) {
			res.status(500).send({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	} else if (method === 'POST') {
		try {
			let attendantExists = await Attendant.findOne({ network, handle });

			if (attendantExists) {
				throw new CustomError('Error', 409, 'Handle already exists');
			}

			const attendant = new Attendant({
				network,
				name,
				handle,
			});

			await attendant.save();

			res.status(201).json({
				data: { network, name, handle },
				status: res.statusCode,
				message: 'Submitted Successfully',
			});
		} catch (err) {
			res.status(500).send({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	}
}

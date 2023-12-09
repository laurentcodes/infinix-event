const connectDB = require('../../../config/db');
import { CustomError } from './util/customError';

const Attendant = require('./models/Attendant');

// Connect database
connectDB();

export default async function handler(req, res) {
	const { method } = req;

	const { network, name, handle, validPassport, transsionStaff } = req.body;

	if (method === 'GET') {
		try {
			let attendants = await Attendant.find();
			const count = await Attendant.countDocuments();

			const pipeline = [
				{
					$group: {
						_id: '$handle', // Replace 'fieldName' with your specific field
						count: { $sum: 1 },
					},
				},
				{
					$match: {
						count: { $gt: 1 },
					},
				},
			];

			const duplicates = await Attendant.aggregate(pipeline);
			console.log('Duplicate entries:', duplicates);

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
				validPassport,
				transsionStaff,
			});

			const attendantData = await attendant.save();

			res.status(201).json({
				data: {
					network: attendantData.network,
					name: attendantData.name,
					handle: attendantData.handle,
					code: attendantData.code,
				},
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

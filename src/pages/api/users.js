const connectDB = require('../../../config/db');
import { CustomError } from './util/customError';

const User = require('./models/User');

// Connect database
connectDB();

export default async function handler(req, res) {
	const { method } = req;

	const { name, email, phone, state } = req.body;

	if (method === 'GET') {
		try {
			let users = await User.find();
			const count = await User.countDocuments();

			res.status(200).json({ data: users, total: count });
		} catch (err) {
			res.status(500).send({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	} else if (method === 'POST') {
		try {
			let userExists = await User.findOne({ email });

			if (userExists) {
				throw new CustomError('Error', 409, 'User already exists');
			}

			const user = new User({
				name,
				email,
				phone,
				state,
			});

			const userData = await user.save();

			res.status(201).json({
				data: {
					name: userData.name,
					email: userData.email,
					phone: userData.phone,
					code: userData.code,
					state: userData.state,
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

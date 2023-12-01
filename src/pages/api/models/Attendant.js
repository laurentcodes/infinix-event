const mongoose = require('mongoose');

import generateUniqueCode from '../util/generateCodes';

const attendantSchema = mongoose.Schema({
	network: {
		type: String,
		enum: ['x', 'facebook', 'instagram'],
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	handle: {
		type: String,
		required: true,
	},
	code: {
		type: Number,
	},
	validPassport: {
		type: Boolean,
		required: true,
	},
	transsionStaff: {
		type: Boolean,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

attendantSchema.pre('save', function (next) {
	const code = generateUniqueCode();

	this.code = code;

	next();
});

module.exports =
	mongoose.models.attendant || mongoose.model('attendant', attendantSchema);

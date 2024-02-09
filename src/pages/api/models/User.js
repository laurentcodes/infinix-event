const mongoose = require('mongoose');

import generateUniqueCode from '../util/generateCodes';

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	code: {
		type: Number,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

userSchema.pre('save', function (next) {
	const code = generateUniqueCode();

	this.code = code;

	next();
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);

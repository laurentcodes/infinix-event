const mongoose = require('mongoose');

const AttendantSchema = mongoose.Schema({
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
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports =
	mongoose.models.attendant || mongoose.model('attendant', AttendantSchema);

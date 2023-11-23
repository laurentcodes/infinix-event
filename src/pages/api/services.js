import axios from 'axios';

// ATTENDANTS
export const getAttendants = async () => {
	const { data } = await axios.get('/api/attendants');
	return data;
};

export const addAttendant = async (value) => {
	const { data } = await axios.post('/api/attendants', value);
	return data;
};

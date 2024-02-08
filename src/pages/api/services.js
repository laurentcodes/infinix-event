import axios from 'axios';

// ATTENDANTS
export const getAttendants = async () => {
	const { data } = await axios.get('/api/attendants');
	return data;
};

export const addAttendant = async (values) => {
	const { data } = await axios.post('/api/attendants', values);
	return data;
};

// USERS
export const getUsers = async () => {
	const { data } = await axios.get('/api/users');
	return data;
};

export const addUser = async (values) => {
	const { data } = await axios.post('/api/users', values);
	return data;
};

export const sendEmail = async (values) => {
	const { data } = await axios.post('/api/mail', values);
	return data;
};

export const getDetails = async (type = 'fans') => {
	const { data } = await axios.get(`/api/read-file?type=${type}`);
	return data;
};

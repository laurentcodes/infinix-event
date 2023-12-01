import { useState } from 'react';
import Image from 'next/image';
import { Lato } from 'next/font/google';

import { addAttendant } from './api/services';

const lato = Lato({
	subsets: ['latin'],
	weight: ['100', '300', '400', '700', '900'],
});

import logo from '../../public/assets/infinix-logo.png';

export default function Home() {
	const initialData = {
		network: 'select',
		name: '',
		handle: '',
		validPassport: false,
		transsionStaff: false,
	};

	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const [formData, setFormData] = useState(initialData);

	const handleSubmit = (e) => {
		e.preventDefault();

		addAttendant(formData)
			.then((res) => {
				setFormData(initialData);

				if (res.status === 201) {
					setMessage(res.message);

					setTimeout(() => {
						setMessage('');
					}, 3000);
				}
			})
			.catch((err) => {
				setError(err.response.data.message);

				setFormData(initialData);

				setTimeout(() => {
					setError('');
				}, 3000);
			});
	};

	console.log(formData);

	return (
		<main
			className={`flex flex-col items-center h-screen bg-gradient-to-br from-green-600 to-green-400 ${lato.className}`}
		>
			<Image alt='Infinix Logo' src={logo} width={200} />

			<form
				className='flex flex-col gap-3 w-full md:w-1/4 items-center px-6 md:px-0 mt-12'
				onSubmit={handleSubmit}
			>
				{error && (
					<p className='bg-red-600 rounded-md py-2 mt-6 text-white w-full text-center'>
						{error}
					</p>
				)}

				{message && (
					<p className='bg-green-800 rounded-md py-2 mt-6 text-white w-full text-center'>
						{message}
					</p>
				)}

				<div className='flex flex-col gap-1 w-full'>
					<label className='font-bold'>Social Network</label>
					<select
						className='p-2 border rounded-md focus:outline-none'
						name='socials'
						value={formData.network}
						onChange={(e) =>
							setFormData({ ...formData, network: e.target.value })
						}
					>
						<option value='select'>Select Network</option>
						<option value='x'>X</option>
						<option value='facebook'>Facebook</option>
						<option value='instagram'>Instagram</option>
					</select>
				</div>

				<div className='flex flex-col gap-1 w-full'>
					<label className='font-bold'>Name</label>
					<input
						className='p-2 border rounded-md focus:outline-none'
						type='text'
						placeholder='Enter Name'
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					/>
				</div>

				<div className='flex flex-col gap-1 w-full'>
					<label className='font-bold'>Handle</label>
					<input
						className='p-2 border rounded-md focus:outline-none'
						type='text'
						placeholder='Enter Handle'
						value={formData.handle}
						onChange={(e) =>
							setFormData({ ...formData, handle: e.target.value })
						}
					/>
				</div>

				<div className='flex gap-1 w-full items-center'>
					<label className='font-bold'>Valid International Passport?</label>
					<input
						className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
						type='checkbox'
						value={formData.validPassport}
						onChange={(e) =>
							setFormData({ ...formData, validPassport: e.target.checked })
						}
					/>
				</div>

				<div className='flex gap-1 w-full items-center'>
					<label className='font-bold'>Transsion Staff?</label>
					<input
						className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
						type='checkbox'
						value={formData.transsionStaff}
						onChange={(e) =>
							setFormData({ ...formData, transsionStaff: e.target.checked })
						}
					/>
				</div>

				<button
					type='submit'
					className='bg-white px-3 py-2 rounded-md mt-3 w-full enabled:hover:bg-green-800 enabled:hover:text-white enabled:transition-all enabled:duration-500'
					disabled={!formData.name || !formData.handle}
				>
					Submit
				</button>
			</form>
		</main>
	);
}

import Image from 'next/image';
import { Lato } from 'next/font/google';
import { useState } from 'react';
import { Modal } from 'flowbite-react';

import { addUser } from './api/services';

const lato = Lato({
	subsets: ['latin'],
	weight: ['100', '300', '400', '700', '900'],
});

import logo from '../../public/assets/infinix-logo.png';

export default function Home() {
	const initialData = {
		name: '',
		email: '',
		phone: '',
		state: '',
	};

	const [user, setUser] = useState({});
	const [error, setError] = useState('');
	const [openModal, setOpenModal] = useState(false);

	const [formData, setFormData] = useState(initialData);

	const handleSubmit = (e) => {
		e.preventDefault();

		addUser(formData)
			.then((res) => {
				setFormData(initialData);

				setUser(res.data);

				if (res.status === 201) {
					setOpenModal(true);
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

	return (
		<main
			className={`flex flex-col items-center h-screen bg-gradient-to-br from-green-600 to-green-400 ${lato.className}`}
		>
			<Image alt='Infinix Logo' src={logo} width={200} />

			<form
				className='flex flex-col gap-3 w-full md:w-1/3 lg:w-1/4 items-center px-6 md:px-0 mt-12'
				onSubmit={handleSubmit}
			>
				{error && (
					<p className='bg-red-600 rounded-md py-2 mt-6 text-white w-full text-center'>
						{error}
					</p>
				)}

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
					<label className='font-bold'>Email</label>
					<input
						className='p-2 border rounded-md focus:outline-none'
						type='text'
						placeholder='Enter Email'
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
					/>
				</div>

				<div className='flex flex-col gap-1 w-full'>
					<label className='font-bold'>Phone</label>
					<input
						className='p-2 border rounded-md focus:outline-none'
						type='text'
						placeholder='Enter Phone Number'
						value={formData.phone}
						onChange={(e) =>
							setFormData({ ...formData, phone: e.target.value })
						}
					/>
				</div>

				<div className='flex flex-col gap-1 w-full'>
					<label className='font-bold'>State</label>
					<input
						className='p-2 border rounded-md focus:outline-none'
						type='text'
						placeholder='Enter State'
						value={formData.state}
						onChange={(e) =>
							setFormData({ ...formData, state: e.target.value })
						}
					/>
				</div>

				<button
					type='submit'
					className='bg-white px-3 py-2 rounded-md mt-3 w-full enabled:hover:bg-green-800 enabled:hover:text-white enabled:transition-all enabled:duration-500'
					disabled={Object.values(formData).some((x) => x === '')}
				>
					Submit
				</button>
			</form>

			<Modal
				show={openModal}
				size='lg'
				popup
				position='center'
				onClose={() => {
					setOpenModal(false);
				}}
			>
				<Modal.Header className='bg-black rounded-t-lg' />
				<Modal.Body className='bg-black rounded-b-lg'>
					<div className='flex flex-col justify-center items-center text-white text-lg gap-3'>
						<p>
							Hi, {user.name}: ({user.email})
						</p>
						<p>
							Your Unique Code is <b className='text-blue-500'>{user.code}</b>
						</p>
						<p>Please keep this code as it is your unique identifier.</p>
						{/* <p>
							There are terms and conditions as follows:
							<br />• The winner should be present at the venue when announced.
							<br />• The winner must possess a valid international passport
							valid for at least six months.
							<br />• The event organizers, colleagues and planners are not
							eligible to win or participate.
						</p> */}
					</div>
				</Modal.Body>
			</Modal>
		</main>
	);
}

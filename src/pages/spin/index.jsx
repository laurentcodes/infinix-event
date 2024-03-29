'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'flowbite-react';
import SlotCounter from 'react-slot-counter';

import { getUsers } from '../api/services';

import logo from '../../../public/assets/infinix-logo.png';

export default function Spin() {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [value, setValue] = useState('');
	const [winner, setWinner] = useState(null);

	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		setLoading(true);

		getUsers().then((res) => {
			setUsers(res.data);
			setLoading(false);
		});
	}, []);

	const ref = useRef(null);

	const handleSpin = () => {
		ref.current?.startAnimation();

		// Generate a random index
		const randomIndex = Math.floor(Math.random() * users.length);

		// Access the randomly selected value
		const randomWinner = users[randomIndex];
		const randomValue = randomWinner.code;

		setWinner(randomWinner);
		setValue(randomValue);

		setTimeout(() => {
			setOpenModal(true);
			// setIsExploding(true);
		}, 11000);
	};

	if (loading) {
		return (
			<span className='flex w-screen h-screen items-center justify-center'>
				<span className='animate-ping absolute h-16 w-16 rounded-full bg-green-400'></span>
			</span>
		);
	}

	return (
		<main className='h-screen w-screen flex flex-col items-center bg-gradient-to-br from-green-300 to-green-700 px-6 text-white'>
			{/* {isExploding && (
				<ConfettiExplosion particleCount={350} duration={10000} zIndex={100} />
			)} */}

			<Image
				src={logo}
				width={100}
				alt='Infinix Logo'
				className='cursor-pointer'
				onClick={() => router.push('/')}
			/>

			{users.length > 0 ? (
				<div className='flex flex-col md:flex-row justify-center items-center gap-6 w-full mt-44'>
					<div className='bg-green-900 w-full md:w-[50%] py-8 text-center text-5xl rounded-lg'>
						<SlotCounter
							ref={ref}
							startValue={'     '}
							value={value}
							animateUnchanged={true}
							duration={10}
							useMonospaceWidth
							startValueOnce
							containerClassName='bg-green-300 w-full text-black'
							charClassName='mx-3 font-bold'
							separatorClassName='p-6'
						/>
					</div>

					<button
						type='button'
						className='bg-green-900 rounded-full w-24 h-24 uppercase font-bold hover:bg-green-700 ease-in duration-300'
						onClick={handleSpin}
					>
						Spin
					</button>
				</div>
			) : (
				<div className='w-full h-full flex flex-col justify-center items-center'>
					<p className='text-2xl uppercase font-bold'>No ticket available</p>
					<p
						className='text-blue-600 underline cursor-pointer font-bold'
						onClick={() => router.back()}
					>
						back
					</p>
				</div>
			)}

			{winner !== null && (
				<Modal
					show={openModal}
					size='lg'
					popup
					position='center'
					onClose={() => {
						setOpenModal(false);
						// setIsExploding(false);
					}}
				>
					<Modal.Header className='bg-black rounded-t-lg' />
					<Modal.Body className='bg-black rounded-b-lg'>
						<div className='flex flex-col justify-center items-center text-white gap-6'>
							<p className='uppercase text-center text-2xl'>
								Winning Ticket:{' '}
								<span className='text-blue-500 block'>{value}</span>
							</p>

							<div className='text-center flex flex-col gap-4 text-3xl'>
								<h3 className='uppercase text-center font-bold'>Winner</h3>

								<p>Name: {winner.name}</p>
								<p>Email - {winner.email}</p>
								<p>Phone - {winner.phone}</p>

								{/* <p>Has Valid Passport: {winner.validPassport ? 'Yes' : 'No'}</p>
								<p>
									Is Transsion Staff: {winner.transsionStaff ? 'Yes' : 'No'}
								</p> */}
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</main>
	);
}

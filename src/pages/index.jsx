import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import logo from '../../public/assets/infinix-logo.png';

export default function Home() {
	return (
		<main className='flex flex-col items-center h-screen bg-gradient-to-br from-green-600 to-green-400'>
			<Image alt='Infinix Logo' src={logo} width={200} />

			<form className='flex flex-col gap-3 w-full md:w-1/4 items-center px-6 md:px-0 mt-12'>
				<div className='flex flex-col gap-1 w-full'>
					<label className='font-bold'>Social Network</label>
					<select
						className='p-2 border rounded-md focus:outline-none'
						name='socials'
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
					/>
				</div>

				<div className='flex flex-col gap-1 w-full'>
					<label className='font-bold'>Handle</label>
					<input
						className='p-2 border rounded-md focus:outline-none'
						type='text'
					/>
				</div>

				<button className='bg-white px-3 py-2 rounded-md mt-3 w-full hover:bg-green-800 hover:text-white transition-all duration-500'>
					Submit
				</button>
			</form>
		</main>
	);
}

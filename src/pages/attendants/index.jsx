import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import Paginate from '../../components/Paginate';

import { getAttendants } from '../api/services';

import logo from '../../../public/assets/infinix-logo.png';

export default function Attendants() {
	const [attendants, setAttendants] = useState([]);
	const [totalAttendants, setTotalAttendants] = useState(0);

	const [itemOffset, setItemOffset] = useState(0);

	const itemsPerPage = 20;
	const pageCount = Math.ceil(attendants.length / itemsPerPage);

	const endOffset = itemOffset + itemsPerPage;

	const currentItems = attendants.slice(itemOffset, endOffset);

	const onPageChange = (e) => {
		const newOffset = (e.selected * itemsPerPage) % attendants.length;

		setItemOffset(newOffset);
	};

	useEffect(() => {
		getAttendants().then((res) => {
			setAttendants(res.data);
			setTotalAttendants(res.total);
		});
	}, []);

	if (attendants.length === 0) {
		return (
			<span className='flex w-screen h-screen items-center justify-center'>
				<span className='animate-ping absolute h-16 w-16 rounded-full bg-green-400'></span>
			</span>
		);
	}

	return (
		<div className='p-6'>
			<Image src={logo} alt='Infinix Logo' width={150} className='' />

			<div className='overflow-x-auto'>
				<Table>
					<Table.Head className='text-left text-xl'>
						<Table.HeadCell>Network</Table.HeadCell>
						<Table.HeadCell>Name</Table.HeadCell>
						<Table.HeadCell>Handle</Table.HeadCell>
					</Table.Head>

					<Table.Body className='divide-y'>
						{currentItems.length > 0 &&
							currentItems.map((attendant) => (
								<Table.Row key={attendant._id} className='text-gray-900'>
									<Table.Cell className='whitespace-nowrap font-medium'>
										{attendant.network}
									</Table.Cell>
									<Table.Cell>{attendant.name}</Table.Cell>
									<Table.Cell>{attendant.handle}</Table.Cell>
								</Table.Row>
							))}
					</Table.Body>
				</Table>
			</div>

			<div className='py-8 float-right'>
				<Paginate pageCount={pageCount} handlePageClick={onPageChange} />
			</div>
		</div>
	);
}

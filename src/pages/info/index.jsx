import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import Paginate from '../../components/Paginate';

import { getUsers } from '../api/services';

import logo from '../../../public/assets/infinix-logo.png';

export default function Attendants() {
	const [users, setUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);

	const [itemOffset, setItemOffset] = useState(0);

	const itemsPerPage = 20;
	const pageCount = Math.ceil(users.length / itemsPerPage);

	const endOffset = itemOffset + itemsPerPage;

	const currentItems = users.slice(itemOffset, endOffset);

	const onPageChange = (e) => {
		const newOffset = (e.selected * itemsPerPage) % users.length;

		setItemOffset(newOffset);
	};

	useEffect(() => {
		getUsers().then((res) => {
			setUsers(res.data);
			setTotalUsers(res.total);
		});
	}, []);

	if (users.length === 0) {
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
						<Table.HeadCell>Name</Table.HeadCell>
						<Table.HeadCell>Email</Table.HeadCell>
						<Table.HeadCell>Phone</Table.HeadCell>
					</Table.Head>

					<Table.Body className='divide-y'>
						{currentItems.length > 0 &&
							currentItems.map((user) => (
								<Table.Row key={user._id} className='text-gray-900'>
									<Table.Cell>{user.name}</Table.Cell>
									<Table.Cell>{user.email}</Table.Cell>
									<Table.Cell>{user.phone}</Table.Cell>
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

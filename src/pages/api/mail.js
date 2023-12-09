import path from 'path';

const connectDB = require('../../../config/db');

import { send } from '../../../config/mail';

// Connect database
connectDB();

const handler = async (req, res) => {
	const { method } = req;

	const { name, email } = req.body;

	if (method === 'POST') {
		try {
			const htmlContent = `
			<html lang='en'>
				<body>
					<div>
						<p>
            Dear ${name}, <br />
						Join us for a night of wonder and thrill, where the drinks will be cold, the music will be hot, and the vibes will be absolutely unforgettable. 🕺💃
						
						<br />
						<br />

						You're cordially invited to the Infinix HOT 40 Fans' Party! 🎈

						<br />
						<br />

						Location: <b>The Good Beach</b>
						
						<br />
						<br />

						Date: <b>9th Dec. 2023</b>

						<br />
						<br />

						Time: <b>3:00PM</b>

						<br />
						<br />

						Stand a chance to Win a Hangout with Iwobi in Ivory Coast and other consolation prizes.

						<br />
						<br />

						Please present this QR Code at the Venue as it admits ONE person.

						<br />

						<img style="width:250px;" src="cid:img" />
						</p>
					</div>
				</body>
			</html>
		`;

			const htmlContentTranssion = `
			<html lang='en'>
				<body>
					<div>
						<p>
            Dear Transsion Colleague (${name}), <br />
						Join us as we launch the Infinix Hot 40.

						<br />
						<br />

						Location: <b>The Good Beach</b>
						
						<br />
						<br />

						Date: <b>9th Dec. 2023</b>

						<br />
						<br />

						Time: <b>3:00PM</b>

						<br />
						<br />

						Please present this QR Code at the Venue:

						<br />

						<img style="width:250px;" src="cid:img" />
						</p>
					</div>
				</body>
			</html>
		`;
			const htmlContentVIP = `
			<html lang='en'>
				<body>
					<div>
						<p>
            Dear KOL/VIP (${name}), <br />
						We are thrilled to extend a special invitation to you for the highly anticipated launch of the Infinix Hot 40.

						<br />
						<br />

						Location: <b>The Good Beach</b>
						
						<br />
						<br />

						Date: <b>9th Dec. 2023</b>

						<br />
						<br />

						Time: <b>3:00PM</b>

						<br />
						<br />

						Please present this QR Code at the Venue:

						<br />

						<img style="width:250px;" src="cid:img" />
						</p>
					</div>
				</body>
			</html>
		`;

			const emailData = {
				from: '"Infinix Promotion" <infinixpromotion@gmail.com>',
				to: email,
				subject: 'Infinix HOT 40 Party',
				html: htmlContent,
				attachments: [
					{
						filename: 'image.png',
						path: path.join(
							process.cwd(),
							'public',
							'assets',
							'qr_codes',
							name.split(' ').join('') + '.png'
						),
						cid: 'img',
					},
				],
			};

			// console.log(
			// 	path.join(
			// 		process.cwd(),
			// 		'public',
			// 		'assets',
			// 		'qr_codes',
			// 		name.split(' ').join('') + '.png'
			// 	)
			// );

			await send(emailData);

			res.status(201).json({
				data: { name, email },
				status: res.statusCode,
				message: 'Email Sent successfully!',
			});
		} catch (err) {
			res.status(500).send({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	} else {
		res.status(405).send({ message: 'Invalid' });
	}
};

export default handler;

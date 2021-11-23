const nodemailer = require('nodemailer');


/* GET home page. */

const mailsender = (user) => {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'yugkhokhar366@gmail.com',
			pass: 'S2k3c0s2@1110'
		}
	});

	var mailOptions = {
		from: 'yugkhokhar366@gmail.com',
		to: `${user}`,
		subject: 'Sending Email using Node.js',
		text: 'That was easy!'
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};




module.exports =mailsender ;

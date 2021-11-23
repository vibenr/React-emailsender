var express = require('express');
let bodyParser = require('body-parser');
var router = express.Router();
const nodemailer = require('nodemailer');
const app = express();
const validateemail = require('email-validator');
const bcrypt = require('bcryptjs');
const registermodel = require('../Models/register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

router.get('/login', async function(req, res) {
	const email = req.body.email;
	const passwords = req.body.password;
	if (!validateemail.validate(email)) {
		res.json({ err: 'ENTER A VALID EMAIL' });
	} else {
		let user = registermodel.findOne({ email });
		try {
			if (await bcrypt.compare(passwords, user.password)) {
				mailsender(email);
			}
		} catch (e) {
			res.json({ err: e });
		}
	}
});

router.get('/register', async function(req, res,next) {
	const { name, email, password } = req.body;
	const getmail = bcrypt.hash(password, 10, (err, hash) => {
	const newuserdata = new registermodel({ name, email, password: hash });
		newuserdata.save();
	});



});

module.exports = router;

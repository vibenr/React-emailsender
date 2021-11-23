require('./connectdb/connectdb');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const validateemail = require('email-validator');
const {mailsender}=require('./routes/index')
const bodyParser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler


app.get('/auth/login',async (req,res)=>{

	const email = req.body.email;
	const passwords = req.body.password;
	if (!validateemail.validate(email)) {
		res.json({ err: 'ENTER A VALID EMAIL' });
	} else {
		let user = registermodel.findOne({ email });
		try {
			if (await bcrypt.compare(passwords, user.password)) {
				mailsender(email);
				res.redirect('/');
			}
		} catch (e) {
			res.json({ err: e });
		}
	}
})


app.post('/auth/register',async (req,res)=>{
	
	const { name, email, password } = req.body;
	const getmail = await bcrypt.hash(password, 10, (err, hash) => {
		const newuserdata = new registermodel({ name, email, password: hash });
		newuserdata.save();
	});
	
})



// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.use(function(req, res, next) {
	next(createError(404));
});
module.exports = app;

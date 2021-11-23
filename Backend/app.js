require('./connectdb/connectdb');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let app = express();
const registermodel=require('./Models/register');
const validateemail = require('email-validator');
const bcrypt=require('bcryptjs');
const {mail}=require('./routes/index')

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

let urlencodedParser = bodyParser.urlencoded({ extended: false })

// catch 404 and forward to error handler


app.post("/auth/login",urlencodedParser,async (req,res)=>{
	let email=req.body.email;
	let password=req.body.password;
  
	
	let user=await registermodel.findOne({email});
	
	if(user==null){
		return res.send("No Admin Found")
	} 

	  try{
	   if(await bcrypt.compare(password,user.password))
	   {
		 res.redirect('/register');
		 mail(email)
	   }
	   else{
		 res.send('Not Allowed')
	   }
	  }
	  catch(error){
	   res.status(500).send("server error");
	}
		
  
  })  

  
app.post('/auth/register',urlencodedParser,async (req,res)=>{
	
const name=req.body.name;
const password=req.body.password;
const email=req.body.email;

const getmail = await bcrypt.hash(password, 10, (err, hash) => {
		const newuserdata = new registermodel({ name, email, password: hash });
		newuserdata.save();
		res.redirect('/login');
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

const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const passport = require('passport');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const encrypt = (pass) => {

	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(pass, salt);
// Store hash in your password DB.

}

module.exports = function(passport){

router.get('/', (req, res, next) => {

	res.redirect('/');
});

router.get('/signup', (req, res, next)=>{
		res.render('signup');

});

router.post('/signup', 
	// validate fields 
	[
	body('firstName').isLength({min: 1}).trim().withMessage('First Name must not be empty'),
	body('lastName').isLength({min : 1}).trim().withMessage('Last Name must  not be empty'),
	body('email').isLength({min: 1}).trim().withMessage('Email field can not be blank'),
	body('email').isEmail().trim().withMessage('It is not a valid Email'),
	body('password').isLength({min: 4}).trim().withMessage('The password is too weak'),
	body('email').custom(value => {
    return User.findOne({
    	where: {
    		email: value
    	}	
    })
    .then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),

		sanitizeBody('firstName').trim().escape(),
		sanitizeBody('lastName').trim().escape(),
		sanitizeBody('email').trim().escape(),
		sanitizeBody('password').trim().escape()

	], (req, res, next)=> {
		const errors = validationResult(req);

	if(!errors.isEmpty()){

		res.render('signup',{
			errors: errors.array()
		})
	} 
	const { firstName, lastName, email, password } = req.body;
		
		const user = User.build({

			firstName: firstName,
			lastName: lastName,
			email: email,
			password: encrypt(password)
		});
		
		 user.save().then(()=> {
		 	res.redirect('/users/login');
	 })
	}	
)
router.get('/login', (req, res, next) => {
	res.render('login', {
		errors: req.flash('error')
	})
	// res.json({
	// 	message: 'please sign in',
	// 	error: 		req.flash('error')
	// })
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash:  true
}), function(req, res){
    console.log("hey");
})

router.get('/logout', (req, res, next) => {
req.logout();
res.redirect('/users/login');

})

    return router;
};
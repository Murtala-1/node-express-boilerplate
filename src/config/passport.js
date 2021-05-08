const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('../models');
const Users = db.User;
// const User = require('../model/user.model');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// create jwt strategy
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Users.findAll({ where: { id: jwt_payload.id } })
        .then(user => {
          if (user.length) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

// var LocalStrategy = require('passort-local').LocalStrategy;

// module.exports = function(passport) {
// 	// passport session setup

// 	passport.serializeUser(function(user, done) {
// 		done(null, user.id);
// 	})

// 	passport.deserializeUser(function(id, done) {
// 		connection.query(`select * fron users where id = ${id}`, function(err, rows) {
// 			done(err, rows[0]);
// 		});
// 	});

// 	// LOCAL SIGNUP
// 	passport.use('local-signup', new LocalStrategy({
// 		// by default, local strategy uses username and password, we will override with email
// 		usernameField : 'email',
// 		passwordField : 'password',
// 		passReqToCallback : true
// 	},
// 	function(req, email, password, done) {
// 		connection.query(`select * from users where email=${email}`, function(err,rows){
// 			console.log(rows);
// 			console.log('above row object');
// 			if(err) return done(err);
// 			if(rows.length) {
// 				return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
// 			} else {
// 				// if there is no user with that email
// 				// create the user
// 				var newUserMysql = new Object();
// 				newUserMysql.email = email;
// 				newUserMysql.password = password; // use the generateHash fn in our use model
// 				var insertQuery = `INSERT INTO users (email,password) values ('${email}', '${password}')`;
// 				console.log(insertQuery);
// 				connection.query(insertQuery, function(err,rows){
// 					newUserMysql.id = rows.insertId;
// 					return done(null, newUserMysql);
// 				})
// 			}
// 		})
// 	}))

// 	// LOCAL LOGIN
// 	// we are using named strategies since we have one for login and one for signup
//     // by default, if there was no name, it would just be called 'local'
//     passport.use('local-login', new LocalStrategy({
//     	usernameField : 'email',
//     	passwordField : 'password',
//     	passReqToCallback : true // allows us to pass back the entire request to the callback
//     }, function(req, email, password, done) {// callback with email and password from our form
//     	connection.query(`SELECT * FROM users WHERE email=${email}`, function (err,rows) {
//     		if (err) return done(err);
//     		if (!rows.length) {
//     			return done(null, false, req.flash('loginMessge', 'No user found.'));
//     			// req.flash is the way to set flashdata using connect-flash
//     		}
//     		// if the user is found but the password is wrong
//     		if(!(rows[0].password == password)) // create the loginMessage and save it to session as flashdata
//     			return done(null, false, req.flash('loginMessage', 'Oops! Wrong password!'))

//     		// all is well, return successful user
//     		return done(null, rows[0]);
//     	})
//     }))

// }

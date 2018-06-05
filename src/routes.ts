import * as passport from 'passport';

import { jsonParser,urlEncoder,CORS,expressFlash, ValidationMiddleware, Auth } from './middlewares/standard';
import { UserRegPostVal, UserLoginPostVal } from './config/validators';

import * as HomeController from './controller/home';
import * as RegistrationController from './controller/Registration';
import * as LoginController from './controller/Login';

const express = require('express')
const app = express()

app.use(CORS);
app.use(jsonParser);
app.use(urlEncoder);
// app.use(expressFlash());
app.use(passport.initialize());

app.get('/',HomeController.index)

app.post('/signup',jsonParser,UserRegPostVal,ValidationMiddleware,RegistrationController.SignUpEmail)
app.post('/login',UserLoginPostVal,ValidationMiddleware,LoginController.LogInEmail)
app.post('/check',Auth,HomeController.index)
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//   res.redirect(req.session.returnTo || "/");
// });



export default app;

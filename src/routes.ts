import { jsonParser,urlEncoder,CORS,expressFlash } from './middlewares/standard';
import * as passport from 'passport';

import * as HomeController from './controller/home';
import * as RegistrationController from './controller/Registration';
import * as LoginController from './controller/Login';

const express = require('express')
const app = express()

app.use(CORS);
app.use(jsonParser);
app.use(urlEncoder);
app.use(expressFlash());
app.use(passport.initialize());

app.get('/',HomeController.index)

app.post('/signup',RegistrationController.SignUpEmail)
app.post('/login',LoginController.LogInEmail)
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//   res.redirect(req.session.returnTo || "/");
// });

export default app;
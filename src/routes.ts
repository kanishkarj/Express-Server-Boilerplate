import { jsonParser,urlEncoder,CORS,expressFlash } from './middlewares/standard';

import * as HomeController from './controller/home';
import * as RegistrationController from './controller/Registration';

const express = require('express')
const app = express()

app.use(CORS);
app.use(jsonParser);
app.use(urlEncoder);
app.use(expressFlash());
app.get('/',HomeController.index)

app.post('/signup',RegistrationController.index)

export default app;
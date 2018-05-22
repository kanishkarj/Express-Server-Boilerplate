import { jsonParser,urlEncoder,CORS } from './middlewares/standard';

import * as HomeController from './controller/home';

const express = require('express')
const app = express()

app.use(CORS);
app.use(jsonParser);
app.use(urlEncoder);

app.get('/',HomeController.index)

export default app;
const dotenv = require("dotenv");
const mongoose = require('mongoose');

import app from './src/routes';

dotenv.config({ path: "env.example" });
process.env.NODE_ENV = 'development';

mongoose.connect(`mongodb://localhost:27017`);
// mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`);
require('./src/models');
require('./src/config/passport');

app.listen(process.env.PORT);

export default app;

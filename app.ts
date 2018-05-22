const dotenv = require("dotenv");

import app from './src/routes';

dotenv.config({ path: ".env.example" });

app.listen(5000);

export default app;

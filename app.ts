import express = require('express');
const app = express();

// require('dotenv').config();

app.use('/',(req,res)=>{return res.send("sdf")});

app.listen(5000);

export default app;

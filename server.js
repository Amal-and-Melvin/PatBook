const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');


const auth = require('./middleware/auth')
const connectDB = require('./config/db')
dotenv.config({path: './config/config.env'})

const users = require('./routes/users');
const patients = require('./routes/patients');
const admins = require('./routes/admins');

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/', users);
app.use('/admin',auth, admins);


const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));
const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./routes/UserRoutes');
const adminRouter = require('./routes/Detail');
const cookieParser = require('cookie-parser');
const ProfileRouter = require('./routes/ProfileRoutes');
const articleRouter = require('./routes/BlogRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOption = {
    origin: 'https://blog-website-nf7h.vercel.app/',
    credentials: true,
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOption));
app.use('/auth', UserRouter);
app.use('/', adminRouter);
app.use('/', ProfileRouter);
app.use('/', articleRouter)

app.get('/', (req, res) => {
    res.send('hello world');
})

const PORT = process.env.PORT || 3011;
const uri = process.env.MONGO_DB_URI;

mongoose.connect(uri)
    .then(() => {
        console.log('database connected successfully');
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT} `);
        });
    })
    .catch(error => {
        console.error('error during mongodb connection', error);
    })



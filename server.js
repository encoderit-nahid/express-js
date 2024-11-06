require('dotenv').config();
const express = require('express')
const session = require('express-session');
const connectDB = require('./config/db.connect');
const {route} = require('./routes/auth')
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000

connectDB();
// Middleware
app.use(express.urlencoded({extended: true}));
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,  // Your MongoDB URI
        collectionName: 'sessions',
    })
}));

// app.use(expressLayouts);
// app.set('layout', 'layout');
app.set('view engine', 'ejs');

// Connect to MongoDB

app.get('/', (req, res, next) => {
    // console.log('Hello');
    // res.status(500).send('Hello')
    // res.json({'message': 'this is a message'})
    // res.download('/path-to-file.png')
    res.render('index', {text: 'Nahid'})
})

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

app.use('/', authRouter)
app.use('/users', userRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

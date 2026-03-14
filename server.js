const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const PORT = process.env.PORT || 4000
const methodOverride = require('method-override');
const cors = require('cors');
const logger = require('morgan');
const testJwtRouter = require('./controllers/test-jwt');
const session = require('express-session');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');


//middleware 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(isSignedIn);
app.use(passUserToView);

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.static('public'));

// Routes go here

const moviesRouter = require('./controllers/movies');

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/movies', moviesRouter)
//app.use('/lists', listsRouter)
//app.use('/auth', authRouter)
//app.use('/users', userRouter)
//app.use('/test-jwt', testJwtRouter)

app.listen(4000, () => {
  console.log('The express app is ready!');
});

app.use('/test-jwt', testJwtRouter);
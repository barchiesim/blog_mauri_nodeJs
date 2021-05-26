const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const Blog = require ('./models/blog')

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://mauri2:test123456@nodetuts.qk4jv.mongodb.net/DB_CORSO?retryWrites=true&w=majority";
//const mauri = "mongodb+srv://mauri:<password>@nodetuts.qk4jv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about.ejs', { title: 'About' });
});

// blog routes 
app.use('/blogs', blogRoutes);

///Versione BASE  senza routers
// app.get('/blogs', (req, res) => {
//   Blog.find().sort({ createdAt: -1 })
//     .then(result => {
//       res.render('index', { blogs: result, title: 'All blogs' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});




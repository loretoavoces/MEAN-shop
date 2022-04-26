const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors())
require('./configs/passport.config')(app)

// Routes
const categoriesRoutes = require('./routes/categories.routes');
const productsRoutes = require('./routes/products.routes');
const usersRoutes = require('./routes/user.routes');
const filesRoutes = require('./routes/files.routes');


const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/upload`, filesRoutes);

// Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'shop-db'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

// Server
app.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
})

module.exports = app;
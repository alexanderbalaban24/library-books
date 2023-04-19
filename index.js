const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const bookApiRouter = require('./routes/api/books');
const bookRouter = require('./routes/books');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(loggerMiddleware);

app.use('/public', express.static(__dirname+"/public"));

app.use('/', indexRouter);
app.use('/api/books', bookApiRouter);
app.use('/books', bookRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Books service running on port: ${PORT}`);
})



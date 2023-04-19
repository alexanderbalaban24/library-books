const express = require('express')
const Book = require("../../models");

const fileMiddleware = require('../../middleware/file.js');
const fs = require("fs");

const router = express.Router();

const stor = {
  books: []
};

[1, 2, 3].map(el => {
  const book = new Book(`title ${el}`, `desc ${el}`, `author ${el}`, `favorite ${el}`);
  stor.books.push(book);
});


router.get('/', (req, res) => {
  const {books} = stor;
  res.json(books);
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const {books} = stor;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    const book = books[idx];
    res.json(book);
  } else {
    res.status(400);
    res.json('404 | Not found');
  }
});

router.post('/', fileMiddleware.single('cover-img'),(req, res) => {
  const {title, desc, author, favorite, fileCover, fileName, id} = req.body;
  const {books} = stor;
  let fileBook;

  if (req.file) {
    const {path} = req.file;
    fileBook = path;
  }

  const newBook = new Book(title, desc, author, favorite, fileCover, fileName, fileBook, id);
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

router.put('/:id', (req, res) => {
  const {title, desc, author, favorite, fileCover, fileName} = req.body;
  const {id} = req.params;
  const {books} = stor;

  const idx = stor.books.findIndex(el => el.id === id);

  if(idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      desc,
      author,
      favorite,
      fileCover,
      fileName
    };

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | Not found');
  }
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const {books} = stor;

  const idx = books.findIndex(el => el.id === id);

  if(idx !== -1) {
    books.splice(idx, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json('book | Not found');
  }
});

router.post('/upload-img', fileMiddleware.single('cover-img'), (req, res) => {

  if (req.file) {
    const {path} = req.file;

    res.json(path);
  } else {
    res.json(null)
  }
});

router.get('/:id/download-img', (req, res) => {
  const {id} = req.params;
  const fileName = fs.readdirSync(__dirname+`/../public/img/`).filter(el => el.split('.')[0] === id)[0];

  res.download(__dirname+`/../public/img/${fileName}`, 'cover.png', err => {
    if (err) {
      res.status(404).json();
    }
  })
})

module.exports = router;

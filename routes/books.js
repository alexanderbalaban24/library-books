const express = require('express')
const Book = require("../models");
const axios = require("axios");

const router = express.Router();

const COUNTER_URL = process.env.COUNTER_URL || "http://localhost:82";

const stor = {
  books: []
};

[1, 2, 3].map(el => {
  const book = new Book(`title ${el}`, `desc ${el}`, `author ${el}`, `favorite ${el}`);
  stor.books.push(book);
});


router.get('/', (req, res) => {
  const {books} = stor;
  res.render("book/index", {
    title: "Book",
    books
  })
});

router.get('/create', (req, res) => {
  res.render("book/create", {
    title: "Create | Book",
    book: {}
  })
})

router.post('/create',(req, res) => {
  const {title, desc, author, favorite, fileCover, fileName, id} = req.body;
  const {books} = stor;

  const newBook = new Book(title, desc, author, favorite, fileCover, fileName, id);
  books.push(newBook);

  res.status(201).redirect('/books')
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const {books} = stor;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    const book = books[idx];
    try {
      const {count} = await axios.post(`${COUNTER_URL}counter/${id}/incr`).then(res => res.data);
      res.render("book/view", {
        title: "Book | View",
        book: book,
        count: count
      });
    } catch (e) {
      console.log(e);
      res.status(404).redirect("/404");
    }

  } else {
    res.status(404).redirect("/404");
  }
});

router.get('/update/:id', (req, res) => {
  const {id} = req.params;
  const {books} = stor;

  const idx = stor.books.findIndex(el => el.id === id);

  if(idx !== -1) {

    res.render("book/update", {
      title: "Book | View",
      book: books[idx]
    });
  } else {
    res.status(404).redirect("/404");
  }
});

router.post('/update/:id', (req, res) => {
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

    res.redirect(`/books/${id}`)
  } else {
    res.status(404).redirect("/404");
  }
});

router.post('/delete/:id', (req, res) => {
  const {id} = req.params;
  const {books} = stor;

  const idx = books.findIndex(el => el.id === id);

  if(idx !== -1) {
    books.splice(idx, 1);
    res.redirect("/books");
  } else {
    res.status(404).redirect("/404")
  }
});

module.exports = router;

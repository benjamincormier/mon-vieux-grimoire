const fs = require('fs');

const Book = require('../models/bookModel');

exports.getAllBooks = (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.getBook = (req, res) => {
  const id = req.params.id;
  Book.findOne({ _id: id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

exports.getBestBooks = (req, res) => {
  console.log('get the 3 best Books !');
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.createBook = (req, res) => {
  // req.body.book example :
  // {"userId":"xyz","title":"TITRE","author":"AUTEUR","year":"1995","genre":"GENRE","ratings":[{"userId":"xyz","grade":3}],"averageRating":3}
  const bookObject = JSON.parse(req.body.book);
  // console.log(bookObject);
  // 1 - Deleting userId in book and book.rating and replacing them with userId extracted from the token
  delete bookObject.userId;
  delete bookObject.ratings[0].userId;
  // console.log(bookObject);

  const idExtractedFromToken = req.auth.userId;

  // 2 - Mongoose
  const book = new Book({
    ...bookObject,
    userId: idExtractedFromToken,
    // ratings[0].userId : idExtractedFromToken,
    ratings: {
      grade: bookObject.ratings[0].grade,
      userId: idExtractedFromToken,
    },
    averageRating: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: 'Book created!' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateBook = (req, res) => {
  const bookId = req.params.id;

  // if image provided by user, req.body.book exists :
  const updatedBookObject = req.body.book
    ? JSON.parse(req.body.book)
    : req.body;
  const userId = updatedBookObject.userId;

  const idExtractedFromToken = req.auth.userId;
  // checking if a user tries to modify another user's book:
  if (idExtractedFromToken !== userId)
    res.status(401).json({ message: 'Not authorized' });

  // if image provided by user, update path in database
  if (req.body.book) {
    updatedBookObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;
  }

  // Mongoose
  Book.findOneAndUpdate(
    { _id: bookId },
    {
      ...updatedBookObject,
    },
    { new: true }
  )
    .then(() => res.status(204).json({ message: 'Book modified!' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res) => {
  const id = req.params.id;
  console.log('id of the book to delete :', id);
  Book.findOne({ _id: id })
    .then((book) => {
      console.log('book ', book);
      if (book.userId != req.auth.userId) {
        // Checking if user requesting delete book is the user who created resource. If not return 401 "Unauthorized"
        res.status(401).json({ message: 'Not authorized' });
      } else {
        // Deleting image from file system
        const filename = book.imageUrl.split('/images/')[1];
        console.log('filename :' + filename);
        fs.unlink(`images/${filename}`, () => {
          // Deleting book from MongoDB
          Book.deleteOne({ _id: id })
            .then(() => {
              res.status(200).json({ message: 'Book deleted!' });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.rateBook = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

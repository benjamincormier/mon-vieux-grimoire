const Book = require('../models/bookModel');

exports.getAllBooks = (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.getBook = (req, res) => {
  console.log('get (a specific) Book !');
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
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
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.deleteBook = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.rateBook = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

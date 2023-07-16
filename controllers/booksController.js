const Book = require('../models/bookModel');

exports.getAllBooks = (req, res) => {
  console.log('get All Books !');
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
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
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
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

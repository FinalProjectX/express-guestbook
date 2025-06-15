const express = require('express');
const router = express.Router();
const Entry = require('../../models/Entry');

// Route default: tampilkan semua entri
router.get('/', (req, res) => {
  Entry.find({})
    .then(entries => {
      entries.reverse();
      res.status(200).render('pages/entries/index', {
        entries,
        error: null,
        keyword: null
      });
    })
    .catch(error => res.status(400).render('pages/entries/index', {
      entries: [],
      error,
      keyword: null
    }));
});

// Route pencarian
router.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  Entry.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { comment: { $regex: keyword, $options: 'i' } }
    ]
  })
    .then(entries => {
      entries.reverse();
      res.status(200).render('pages/entries/index', {
        entries,
        keyword,
        error: null
      });
    })
    .catch(error => res.status(400).render('pages/entries/index', {
      entries: [],
      keyword,
      error
    }));
});

module.exports = router;
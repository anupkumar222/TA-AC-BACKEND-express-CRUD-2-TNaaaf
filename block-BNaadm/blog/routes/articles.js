var express = require('express');
var router = express.Router();

var Article = require('../models/Article');

//list articles
router.get('/', (req, res, next) => {
    Article.find({}, (err, articles) => {
        if(err) return next(err);
        res.render('articles', { articles });
    });
});

//create article form
router.get('/new', (req, res) => {
    res.render('addArticle');
})

//fetch single article
router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Article.findById(id, (err, article) => {
        if(err) return next(err);
        res.render('articleDetail', { article })
    });
});

//create article
router.post('/', (req, res, next) => {
    req.body.tags = req.body.tags.trim().split(" ");
    Article.create(req.body, (err, createdArticle) => {
        if(err) return next(err);
        res.redirect('/articles');
    })
});

//edit article form
router.get('/:id/edit', (req, res, next) => {
    var id = req.params.id;
    Article.findById(id, (err, article) => {
        article.tags = article.tags.join(" ")
        if(err) return next(err);
        res.render('editArticleForm', { article });
    });
});

//update article
router.post('/:id', (req, res) => {
    var id = req.params.id;
    req.body.tags = req.body.tags.split(" ")
    Article.findByIdAndUpdate(id, req.body, (err, updatedData) => {
        if(err) return next(err);
        res.redirect('/articles/' + id);
    })
})

//delete article
router.get('/:id/delete', (req, res, next) => {
    var id = req.params.id;
    Article.findByIdAndDelete(id, (err, article) => {
        if(err) return next(err);
        res.redirect('/articles')
    })
});

//increment likes
router.get('/:id/likes', (req, res, next) => {
    var id = req.params.id;
    Article.findByIdAndUpdate(id, { $inc : {likes: 1}}, (err, article) => {
        if(err) return next(err);
        res.redirect('/articles/' + id);
    })
})

module.exports = router;
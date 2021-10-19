const express = require('express')
const TodoRouter = express.Router()

const Todo = require('../../models/Todo')



TodoRouter.get('/chance', (req, res, next) => {
    if (Math.random() < 0.5) return next()
    res.send("first one")
})
TodoRouter.get('/chance', (req, res, next) => {
    res.send("second one")
})

TodoRouter.get('/fruits/:name', (req, res, next) => {
    if(req.params.name != 'apple') return next();
    res.send('[logic 1] You like apple')
},
(req, res, next) => {
    if(req.params.name != 'banana') return next();
    res.send('[logic 2] You like banana')
},
(req, res) => {
    res.send(`[log 3] You like ${req.params.name} ~~~`)
})

TodoRouter.get('/shirts', (req, res) => {
    res.send(`feature - color : ${req.query.color} / size : ${req.query.size}`)
})


// ----------------------------------------


TodoRouter.get('/', (req, res) => {
    res.send('all todo list (get)')
})

TodoRouter.route('/').get((req, res) => {
    res.send('all todo list (route)')
})


TodoRouter.route('/:id').get((req, res) => {
    res.send(`todo ${req.params.id} (get)`)
}) 

TodoRouter.route('/').post((req, res) => {
    console.log(req.body)
    res.send(`todo ${req.body.name} created (post)`)
})

TodoRouter.route('/:id').put((req, res) => {
    res.send(`todo ${req.params.id} updated (put)`)
})

TodoRouter.route('/:id').delete((req, res) =>{
    res.send(`todo ${req.params.id} removed (delete)`)
})

/*
TodoRouter.get('/:name/comments', (req, res, next) => {
    if(req.params.name != "lhu") {
        res.status(401).send('You are not 어쩌구')
    }
    next()
}, (req, res) => {
    res.send("this is page to update 어쩌구 ! ")
})
*/


module.exports = TodoRouter
const express = require('express')
const TodoRouter = express.Router()

const Todo = require('../../models/Todo')


/* 10.21 전 작성한코드 모두 주석처리
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


TodoRouter.get('/:name/comments', (req, res, next) => {
    if(req.params.name != "lhu") {
        res.status(401).send('You are not 어쩌구')
    }
    next()
}, (req, res) => {
    res.send("this is page to update 어쩌구 ! ")
})
*/

// get 한개 찾기
// TodoRouter.get('/:id', (req, res) =>{
//     Todo.findById(req.params.id, (err, todo) => {
//         if(err) throw err;
//         res.json({ status: 200, todo })
//     })
// })

// get 모두 찾기
// TodoRouter.get('/', async (req, res) => {
//     const todos = await Todo.find()
//     console.log(todos)
//     res.json({ status: 200, todos})
// })


// put
TodoRouter.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, todo) => { // new: true 일때 : 업데이트된 값을 가져옴, false일때 : 업데이트되기전 값을 가져옴
        if(err) throw err;
        res.json({ status: 204, msg: `todo  ${req.params.id} updated !!`, todo })
        console.log(todo)
    })
})

// delete
TodoRouter.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id, req.body, (err, todo) => {
        if(err) throw err;
        res.json({ staus: 204, msg: `todo ${req.params.id} removed ~~`, todo })
    })
})




/*
TodoRouter.get('/', (req, res) => {
    res.send('todo list ~~~')
})

TodoRouter.get('/:id', (req, res) => {
    res.send(`todo ${req.params.id} !!!!!!`)
})
*/
TodoRouter.post('/', (req, res) => {
    console.log(req.body)
    // res.send(`todo ${req.body.name} !!!`)

    Todo.findOne({ name: req.body.name, done: false}, (err, todo) => {
        if(err) throw err;
        if(!todo) {
            const newTodo = new Todo(req.body);
            newTodo.save().then(() => {
                res.json( { sattus: 201, msg: "new todo created in db!!!", newTodo })
            })
        } else {
            const msg = 'this todo already exists in db ~~~'
            res.json({ status: 204, msg })
        }
    })
})

/*
TodoRouter.route('/:id').put( (req, res) => {
    res.send(`todo ${req.params.id} updated!!!!!`)
})

TodoRouter.put('/:id', (req, res) => {
    res.send(`todo ${req.params.id} updated!!!!!`)
})

TodoRouter.delete('/:id', (req, res) => {
    res.send(`todo ${req.params.id} removed~~~~`)
})
*/



module.exports = TodoRouter
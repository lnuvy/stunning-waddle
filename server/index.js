var express = require('express') // node_modules 안의 express 연관된 코드를 가져온다.
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')


var routes = require('./src/routes')
app.use("/api", routes) // api 라우팅

// app.set('case sensitive routing', true)


var corsOptions = {  // CORS 옵션
    origin: 'http://localhost:3000', 
    credentials: true // 3000포트의 접근 허용
}

const CONNECT_URL = 'mongodb://localhost:27017/hulee'
mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongodb connected..."))
.catch(e => console.log('failed to connect mongodb: ${e}'))



// app.use('/static', express.static('public'));
app.use('/static', express.static(__dirname + '/public'));

app.use(cors(corsOptions)) // CORS 설정

// app.use(express.urlencoded({ extended: true}))                                                                                                                         
app.use(bodyParser.json())
app.use(logger('tiny')) // Logger 설정

/*
app.get('/static', (req, res) => {
    console.log('경로 : ', __dirname)
    res.render('index')
})
*/

app.get('/index', (req, res) => {
    console.log('index~~' + __dirname)
    res.sendFile(__dirname + '/public/index.html')
})
app.get('/home', (req, res) => {
    console.log('home~~' + __dirname)
    res.sendFile(__dirname + '/public/home.html')
})

app.get('/detail', (req, res) => {
    console.log('detail~~' + __dirname)
    res.sendFile(__dirname + '/public/detail.html')
})

/*
app.get('/asdf', (req, res) => {
    res.redirect('/static/index.html')
})
*/


app.use((req, res, next) => { // 페이지가 없을때 에러처리
    res.status(404).send("Sorry~! 404")
})

app.use((err, req, res, next) => { // 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server~")
})






app.listen(5000, () => {
    console.log('server is running on port 5000')
})



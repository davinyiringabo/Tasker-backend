const express = require("express")
const bodyParser = require("body-parser")
const morgan =  require("morgan")
const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser')
const swaggerUI = require("swagger-ui-express")
const app = express()
const swaggerDocument = require('./swagger.json')
const base_url = process.env.BASE_URL
app.use('/v1/api/swagger-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use("/v1",require("./server/routes/routes"))
const connectionToDB = require("./server/database/connection")
const { default: mongoose } = require("mongoose")
app.use(express.static(__dirname+"/views/"))
dotenv.config({path: "./config.env"})
const PORT = process.env.PORT||8080
app.use(morgan("tiny"))

connectionToDB()

app.set('view engine','ejs')

app.use(express.static(path.resolve(__dirname,"assets/css/public")))
app.use(express.static(path.resolve(__dirname,"assets/img")))
app.use(express.static(path.resolve(__dirname,"assets/js")))


app.listen(PORT,()=>{
    console.log(`The server is running at the port ${base_url}:`+PORT)
})


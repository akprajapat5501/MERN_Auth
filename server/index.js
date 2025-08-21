const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
require('dotenv').config();
const db = require('./models/db')
const cookieParser = require("cookie-parser");

// const PORT = process.env.PORT;
const PORT = 9000;
const HOSTNAME = "127.0.0.1";

// app.get("/", (req, res)=>{
//     res.send("hello world")
// })

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:5174", // your frontend
    credentials: true
}));

app.use("/auth", routes)
app.use("/products", ProductRouter)

db().then(()=>{
    console.log("database is connected...");

    app.listen(PORT, HOSTNAME, ()=>{
    console.log(`server is running at http://${HOSTNAME}:${PORT}`);
})
})

// app.listen(PORT, ()=>{
//     console.log(`server is running at http://:${PORT}`);
// })

const express = require("express");
const cors = require("cors");
const connectMongo = require("./config/connection")
const imageRouter = require("./routes/imageRoute")

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api", imageRouter)

app.get("/", (req, res) => {
    res.send("hello world")
});

connectMongo()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Connected to MongoDB")
            console.log(`Working on PORT: ${PORT}`)
        });
    }, (err) => {
        console.log({ err: err })
    })
    .catch(err => {
        console.log("error occurred", err)
    })



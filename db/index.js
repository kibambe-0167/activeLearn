import express from 'express';
import cors from 'cors';
import getAll, { addData, updateData, deleteData } from "./db.js";
const app = express();
// contains db access subroutines

const port = 4000;

// configure json for express
app.use(express.text());
// app.use(express.json())
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

// app.use(express.urlencoded({ extended: true, }));

app.get("/", cors(), (req, res) => {
    getAll().then(data => {
        console.log("here", data);
        res.send({ message: data });
        // res.status(200).json({ message: data });
        // res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: err.message });
    });
});

app.post("/add", (req, res) => {
    let d = req.query.name;
    console.log(d);
    addData(d).then(response => {
        // console.log("here", response);
        if (response == "1") {
            res.json({ message: "data added" });
        } else {
            res.json({ message: response });
        }
    }).catch(err => {
        console.log(err);
    })
});


// page to delete data from table.
app.delete("/delete", (req, res) => {
    let id = req.query.id;
    // console.log(id);
    deleteData(id).then(response => {
        // console.log(response);
        if (response == "1") {
            res.json({ message: "data successfully deleted..." })
        } else {
            res.json({ message: response });
        }
    }).catch(err => {
        console.log(err);
    })
});

// update data from table
app.put("/update", (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    // console.log(id, name);
    // res.json({ message: "data update" });
    updateData(id, name).then(response => {
        if (response == "1") {
            res.json({ message: "data updated" });
        } else {
            res.json({ message: response });
        }
    }).catch(err => {
        console.log(err);
    })
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
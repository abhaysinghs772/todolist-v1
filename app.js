const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");

// console.log(date());

// let items = ["item_1", "item_2", "item_3"]; 
const items = ["item_1", "item_2", "item_3"]; // can also be written like this mdn refrence
// let workItems = [];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {

    let day = date.getDate();
    res.render("list", { listTitle: day, newListItems: items });

});
app.post('/', function (req, res) {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("server is started at port 3000");
});
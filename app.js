const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const mongoose = require("mongoose");

// console.log(date());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

const itemSchema = {
    name: String
}

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "welcome to your todolist!"
});

const item2 = new Item({
    name: "hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name : String,
    items : [itemSchema]
}
const List = mongoose.model("List", listSchema)

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("successfully saved default items to DB!");
                }
                res.redirect("/");
            });
        } else {
            res.render("list", { listTitle: "Today", newListItems: foundItems });
        }
    });
});

app.get("/:customListName", function(req, res){
    // console.log(req.params.customListName);
    const customListName = req.params.customListName;

    const list = new List ({
        name : customListName,
        items : defaultItems
    });
    list.save();

    List.findOne({name : customListName}, function(err){
        if(!err){
            if(!foundLists){
                console.log("not exists");
            }else{
                console.log("exists");
            }
        }
    });
});

app.post('/', function (req, res) {
    const itemName = req.body.newItem;
    
    const item = new Item({
        name : itemName
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("successfully removed item");
            res.redirect("/");
        }
    });
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
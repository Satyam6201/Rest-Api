const exp = require("constants");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");


app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views", path.join(__dirname ,"views"));
app.use(express.static("public"));
app.set (express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username :"Satyam kumar Mishra",
        content :"i love tech!"
   
    },
    {
        id: uuidv4(),
        username :"Shivam Kumar Ashish ",
        content: "i love coding!"
       
    },
    {
        id: uuidv4(),
        username: "Shashank Panday",
        content: "i love collage life!"
    },
    {
        id: uuidv4(),
        username: "Utsav Singh",
        content: "i am a web developer!"
    }
];

//1.Get REST:-
app.get("/posts",(req,res)=>{
    res.render("index.ejs" ,{posts});
});
app.get("/post/new",(req,res) =>{
    res.render("new.ejs");
});

//2.Post REST:-
app.post("/posts" ,(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts")
});

// 3.Get REST:-
app.get("/posts/:id" ,(req,res) =>{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});

// 4.Patch:-

app.patch("/posts/:id" , (req,res) =>{
    let {id} = req.params;
    let NewContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = NewContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit" , (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , {post});
});

// Delete the post:-

app.delete("/posts/:id" ,(req,res)=>{
    let {id}= req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port,() =>{
    console.log("server is working !");
});
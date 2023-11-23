const express=require("express");
const cors=require("cors")
const controller=require("./cont.js")
const app=express();

app.use(express.json())
app.use(cors())


app.post("/add-user",controller.addUser);

app.get("/get-user",controller.getUser);

app.post("/save",controller.save);

app.get("/get-all-posts",controller.getAllposts);

app.post("/addComment",controller.addComment);

app.post("/set-like",controller.setLike);

app.post("/create-post",controller.createPost);

app.listen(4000,()=>console.log("Srerver at localhost:4000"));

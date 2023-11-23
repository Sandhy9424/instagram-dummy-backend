const database=require("./data.js")

const addUser=(req,res)=>{
    if(req.body.name==null||req.body.email==null){
        res.status(404).send("invalid input");
    }
  let st={
    id:database.user.length+1,
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    bio:"",
    posts:[]
  }
  try{
  database.user.push(st);
  res.status(200).send(st);
}catch(err){
    res.status(404).send(err);
}
}
const getUser=(req,res)=>{
  const email=req.query.email;
  const password=req.query.password;
  let user=null;

  database.user.forEach((e)=>{
    if(e.email==email&&e.password==password){
        user=e;
    }
  })
  if(user==null){
    res.status(404).send("student not find")
  }
  res.status(200).send(user);
}

const save=(req,res)=>{
    const userId=req.query.id;
  let user=null;

  database.user.forEach((e)=>{
    if(e.id==userId){
        user=e;
    }
  })
  if(user==null){
    res.status(404).send("no-student")
  }
  const id=req.query.postId;
  let b=false;
  user.posts.forEach((e)=>{
    if(e.id==id){
      b=true
      res.status(404).send("err in post");
    }
  })

let post=null
database.posts.forEach((e)=>{
    if(e.id==id){
        post=e;
    }
  })
  if(b==false){
  user.posts.push(post)
  }
  res.status(200).send(user);
}
const getAllposts=(req,res)=>{
    res.status(200).send(database.posts);
}

const addComment=(req,res)=>{
        const userId=req.body.id;
      let user=null;
    
      database.user.forEach((e)=>{
        if(e.id==userId){
            user=e;
        }
      })
    
      const id=req.body.postId;
    
    let post=null
    database.posts.forEach((e)=>{
        if(e.id==id){
            post=e;
        }
      })
    let userPost=null
    user.posts.forEach((e)=>{
      if(e.id==id){
        userPost=e
      }
    })
    if(userPost!=null){
      userPost.comments.push({id:user.id,name:user.name,message:req.body.message})
    }
      post.comments.push({id:user.id,name:user.name,message:req.body.message})
      res.status(200).send(post);
}
const setLike=(req,res)=>{
   let pid=req.query.id
   let post=null
   database.posts.forEach((e)=>{
       if(e.id==pid){
           post=e;
       }
     })
     post.likes=post.likes+1;
     res.status(200).send("success")
}
const createPost=(req,res)=>{
  let data={
    id:req.body.id,
    caption:req.body.caption,
    display_src:req.body.Img,
    likes:0,
    code:"",
    comments:[]
  }
  let user=null;
  database.user.map((e)=>{
    if(req.body.id==e.id){
      user=e;
    }
  })
  user.posts.push(data);
  database.posts.push(data);
  res.status(200).send(user)

}

let controller={
   "getUser":getUser,
   "addUser":addUser,
   "save":save,
   "getAllposts":getAllposts,
   "addComment":addComment,
   "setLike":setLike,
   "createPost":createPost
}

module.exports=controller;
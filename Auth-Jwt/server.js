require('dotenv').config();

const express= require('express');
const app=express();
const jwt= require('jsonwebtoken');
// console.log("from.env"+process.env.ACCESS_TOKEN_SECRET)
app.use(express.json());

const posts=[{
    username: "A",
    title: "A title"
},{
    username: "B",
    title: "B title"
},]

app.get('/posts',autheticateToken,(req,res)=>{
    console.log('req'+ req.user.name);
    res.json(posts.filter(post=>post.username === req.user.name));
});

//whenever user submit login page we create login jwt token and send as json
app.post('/login',(req,res)=>{
    //we need to authenticate
    const username=req.body.username
    const user={name:username}
    const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
})

// fn autheticateToken helps us to get the token from the req else sends 401

function autheticateToken(req,res,next){
    // console.log(req);
    const authHeader= req.headers['authorization'];
    // console.log(authHeader);
    const token=authHeader && authHeader.split(' ')[1];
    if(token==null){return res.sendStatus(401);}

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user;
        next();
    })
}
app.listen(3000);
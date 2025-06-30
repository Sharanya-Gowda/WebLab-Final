const express=require('express');
const app=express();

let totalvisit=0;

const logger=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
}
const visitcount=(req,res,next)=>{
    totalvisit++;
    next();
}
app.use(logger);
app.use(visitcount);

app.get('/',(req,res)=>{
    
    res.send(`<h1>Welcome to the page.You have visited  ${totalvisit} times</h1>`);
    
})

app.listen(3000,()=>{
    console.log("Serving on port http://localhost:3000");
});
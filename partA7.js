const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send(`
        <h2>Details of Engineering Branch</h2>
        <li><a href='/cse'>CSE</a></li>
        <li><a href='/ece'>ECE</a></li>
    `)
});

app.get('/cse',(req,res)=>{
    res.send(`
        <body style="background-color:#D18C1D;font-family:Arial;color:blue">
        <p>Computer Networks OS</p>
        </body>
    `)
});
app.get('/ece',(req,res)=>{
    res.send(`
        <body style="background-color:#D18C1D;font-family:Arial;color:blue">
        <p>Computer Networks OS</p>
        </body>
    `)
});
app.listen(3000,()=>{
    console.log("Serving on port http://localhost:3000");
});
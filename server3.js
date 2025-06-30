const express=require('express');
const {MongoClient}=require('mongodb');
const path=require('path');
const { message } = require('statuses');
const app=express();

const uri="mongodb://127.0.0.1:27017";
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let collections;
(async()=>{
    const client=await MongoClient.connect(uri);
    collections=client.db('mydb').collection('partB3');
    console.log("MongoDB Conneted");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server3.html'));
})

app.post('/insert',async(req,res)=>{
    const {name,email,phone,hire,title,salary}=req.body;
    await collections.insertOne({
        name,email,phone,hire,title,salary:parseInt(salary)
    });
    res.json({message:'Inserted'});
})

app.get('/see',async(req,res)=>{
    const result=await collections.find({salary:{$gt : 50000}}).toArray();
    res.json(result);
})
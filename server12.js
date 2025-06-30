const express=require('express');
const {MongoClient}=require('mongodb');
const path=require("path");
const app=express();

const uri="mongodb://127.0.0.1:27017";
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let collections;
(async()=>{
    const client=await MongoClient.connect(uri);
    collections=client.db('mydb').collection('partB12');
    console.log("MongoDB Connected");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server12.html'));
})
app.post('/insert',async(req,res)=>{
    const{id,name,subject,marks}=req.body;
    const mark_num=parseInt(marks);
    const ans=mark_num<20?"Not Eligible":"Eligible";

    await collections.insertOne({
        id:parseInt(id),
        name,
        subject,
        marks:mark_num,
        ans
    });
    res.json({message:'inserted',ans})
});

app.get('/see',async(req,res)=>{
    const result=await collections.find({ans:'Not Eligible'}).toArray();
    res.json(result);
})
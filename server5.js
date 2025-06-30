const express=require('express');
const {MongoClient}=require('mongodb');
const path=require('path');
const app=express();

const uri="mongodb://127.0.0.1:27017";
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

let collections;
(async()=>{
    const client=await MongoClient.connect(uri);
    collections=client.db('mydb').collection('partB5');
    console.log("MongoDB Connected");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server5.html'));
});

app.post('/insert',async(req,res)=>{
    const{name,usn,dept,grade}=req.body;
    await collections.insertOne({
        name,usn,dept,grade
    });
    res.json({message:'inserted'});
});
app.get('/see',async(req,res)=>{
    const result=await collections.find().toArray();
    res.json(result)
})
app.post('/update',async(req,res)=>{
    const{name,grade}=req.body;
    await collections.updateOne(
        {name},
        {$set:{grade}}
        // {upsert:true}
    );
    res.json({message:'updated'});
});
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
    collections=client.db('mydb').collection('partB4');
    console.log("MongoDB Conneted");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server4.html'));
});

app.post('/insert',async(req,res)=>{
    const{id,name,company,duration}=req.body;
    await collections.insertOne({
        id:parseInt(id),name,company,duration,status:'working'
    });
    res.json({message:'inserted',status:'working'});
});

app.get('/see',async(req,res)=>{
    const result=await collections.find({company:'Infosys'}).toArray();
    res.json(result);
});

app.post('/update',async(req,res)=>{
    const{id}=req.body;
    await collections.updateOne(
        {id: parseInt(id)},
        {$set:{status:'completed'}},
        {upsert:false}
    );
    res.json({message:'updated'});
});
const express=require('express');
const {MongoClient}=require('mongodb');
const path=require('path');
const app=express();

const uri="mongodb://127.0.0.1:27017";
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let collections;
(async()=>{
    const client=await MongoClient.connect(uri);
    collections=client.db('mydb').collection('partB1');
    console.log("MongoDB Conneted");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server1.html'));
})

app.post('/insert',async(req,res)=>{
    const{id,uname,complaint}=req.body;
    await collections.insertOne({
        id:parseInt(id),
        uname,
        complaint,
        status:'pending'
    });
    res.json({message:'Inserted',status:'pending'});
});

app.post('/resolve',async(req,res)=>{
    const{uname,status}=req.body;
    await collections.updateOne(
        {uname},
        {$set:{status}}
    );
    res.json({message:"Updated"});
})

app.get('/viewcomp',async(req,res)=>{
    const result=await collections.find({status:'pending'}).toArray();
    res.json(result);
});
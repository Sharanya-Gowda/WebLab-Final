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
    collections=client.db('mydb').collection('partB10');
    console.log("MongoDB Connected");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server10.html'));
})
app.post('/insert',async(req,res)=>{
    const{id,name,title,domain,fund}=req.body;

    await collections.insertOne({
        id:parseInt(id),
        name,
        title,
        domain,
        fund:parseFloat(fund)
    });
    res.json({message:'inserted'})
});

app.get('/see',async(req,res)=>{
    const result=await collections.find(
        {domain:'EdTech'},
        {fund:{$gt:500000}}
    ).toArray();
    res.json(result);
})
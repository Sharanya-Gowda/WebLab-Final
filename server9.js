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
    collections=client.db('mydb').collection('partB9');
    console.log("MongoDB Connected");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server9.html'));
})
app.post('/insert',async(req,res)=>{
    const{name,branch,sem}=req.body;

    await collections.insertOne({
        name,
        branch,
        sem:parseInt(sem)
    });
    res.json({message:'inserted'})
});

app.get('/see',async(req,res)=>{
    const result=await collections.find(
        {branch:'cse'},
        {sem:6}
    ).toArray();
    res.json(result);
})
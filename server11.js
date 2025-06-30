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
    collections=client.db('mydb').collection('partB11');
    console.log("MongoDB Connected");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server11.html'));
})
app.post('/insert',async(req,res)=>{
    const{id,name,course,classatt,totalatt}=req.body;
    const class_num=parseFloat(classatt);
    const total_num=parseFloat(totalatt);
    const per=(class_num/total_num)*100;

    await collections.insertOne({
        id:parseInt(id),
        name,
        course,
        classatt:class_num,
        totalatt:total_num,
        percentage:per
    });
    res.json({message:'inserted',percentage:per})
});

app.get('/see',async(req,res)=>{
    const result=await collections.find({percentage:{$lt:75}}).toArray();
    res.json(result);
})
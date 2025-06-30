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
    collections=client.db('mydb').collection('partB6');
    console.log("MongoDB Connected");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server6.html'));
})
app.post('/insert',async(req,res)=>{
    const{id,name,location,totalbeds,occ}=req.body;
    const total_num=parseInt(totalbeds);
    const occ_num=parseInt(occ);
    const avai=total_num-occ_num;
    await collections.insertOne({
        id:parseInt(id),
        name,
        location,
        totalbeds:total_num,
        occ:occ_num,
        avai:avai
    });
    res.json({message:'inserted',avai})
});

app.get('/see',async(req,res)=>{
    const result=await collections.find(
        {avai:{$lt:10}}
    ).toArray();
    res.json(result);
});
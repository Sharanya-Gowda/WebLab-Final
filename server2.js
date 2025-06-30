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
    collections=client.db('mydb').collection('partB2');
    console.log("MongoDB Conneted");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server2.html'));
})

app.get('/insert',async(req,res)=>{
    const{name,usn,sem,fee}=req.query;
    const exam_fee=parseInt(fee);
    if (exam_fee<=0){
        const del=await collections.deleteMany({usn});
        res.json({message:'Deleted'});
    }
    else{
        await collections.updateOne(
            {usn},
            {$set:{name,sem,exam_fee}},
            {upsert: true}
        );
        res.json({message:'Updated'});
    } 
});

app.get('/see',async(req,res)=>{
    const result=await collections.find().toArray();
    res.json(result);
})
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
    collections=client.db('mydb').collection('partB8');
    console.log("MongoDB Connected");
    app.listen(3000,()=>console.log("Server running on http://localhost:3000"));
})();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'server8.html'));
})
app.post('/insert',async(req,res)=>{
    const{id,name,price,discount,stock}=req.body;
    const price_num=parseFloat(price);
    const dis_num=parseFloat(discount);
    const total=price_num-(price*dis_num/100);

    await collections.insertOne({
        id:parseInt(id),
        name,
        price:parseFloat(price_num),
        discount:parseFloat(dis_num),
        total_price:total
    });
    res.json({message:'inserted',total_price:total})
});

app.get('/see',async(req,res)=>{
    const result=await collections.find({total_price:{$lt:1000}}).toArray();
    res.json(result);
})
const express=require("express");
const port=process.env.PORT || 8000;
const urlencodedParser = express.urlencoded({ extended: true });
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const url=process.env.URL
const nodemailer = require("nodemailer");

//const url="mongodb://localhost:27017"



const app=express();

app.use(express.static("public"))
app.use(express.json())
app.use(urlencodedParser)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.get('/', (req,res)=>{
    res.sendFile(__dirname +'/public/index.html');//Route handler
   
  });




  app.post ('/', urlencodedParser,  async (req, res)=>{
    
    
    try{
      
    let email=req.body.email;
    let password=req.body.password;
    let passwordConfirmation=req.body.passwordConfirmation;
  
     
   if(email && password && passwordConfirmation)
   { 
    
let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'mtest0649@gmail.com',
        pass:'Testing11!'
    }
});


let mailOptions={
    from:'mtest0649@gmail.com',
    to:req.body.email,
    //https://www.google.com/settings/security/lesssecureapps  cc:'',
    //bcc:'',
    subject:'Testing',
    text:'it works'
    //attachment:[{filename:'', path:''}]
}


transporter.sendMail(mailOptions, (err, data)=>{
    if(err){
        console.log('Error Occurs')
    }else{
        console.log('Email sent!!')
        MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client)=> {
          const db=client.db("newregister")
          const collection =db.collection("newusers")
          const doc={email:email,  password:password, passwordConfirmation:passwordConfirmation};
        const findUser= await collection.findOne({email:req.body.email})
       //console.log(findUser)
            if(findUser){
             // console.log("User already exists")
              return res.status(400).send({message:'User already exists!!'})
              
    
    
            }else{
              const newUser=await collection.insertOne(doc) 
                 res.send (newUser)
                 
                  
                  
              
    
            }
          
         })
        
        
    }

})
}else{
    res.status(400).send("bad request");

 }

}catch(ex){
   return res.status(500).send("error");
 }
});

app.listen(port, ()=>{
    console.log(`Server listening on ${port}`)
})
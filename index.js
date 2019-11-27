const express=require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const details = require('./schemas/details.js')
const twilio = require('twilio');
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer');
const config=require('./config/config.js');
const client = new twilio(config.twilio.accountSid,config.twilio.authToken);

//setting up express app
const app=express();

//setting up MIDDLEWARES
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

//GET API for homepage
app.get('/',(req,res)=>{
    res.render('home.ejs');
})

//GET API for checkin-page
app.get('/checkin',(req,res)=>{
    res.render('checkinform.ejs');  
})

//POST API for checkin-page
app.post('/checkin',(req,res)=>{
    var o=req.body;
    console.log(req.body);
    const {vname,vemail,vnumber,hname,hemail,hnumber}=o;
 

var timestamp=Date.now();
var date = new Date(Date.now()); 
var currtime=date.toLocaleString('en-GB', { hour:'numeric', minute:'numeric',  hour12:true } );
var id=otpGenerator.generate(6, { upperCase: false, specialChars: false });
    var detail=new details({vname,vemail,vnumber,hname,hemail,hnumber,address:config.address,intime:timestamp,visitingId:id});
    detail.save();
    console.log(detail);
    

//CHECKIN SMS SENT TO HOST
  
  var sender='+12563803259';
  var receiver = hnumber;
  var message = `
  Details about Visitor ${vname}
  Name : ${vname}
  Email: ${vemail}
  Phone: ${vnumber}
  Checkin Time: ${currtime}
  Visiting ID: ${id}`;
  client.messages.create({
      to: receiver,
      from: sender,
      body: message
  })
  .then(message => console.log(`Checkin SMS sent to Host: ${hname} ` + message.sid))
  .catch((error)=>{
      console.log(error);
  });

    //CHECKIN EMAIL SEND TO HOST
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your_email',
          pass: 'your_password'
        }
      });
      
      var mailOptions = {
        from: 'your_email',
        to: hemail,
        subject: `Details about Visitor ${vname}`,
        text: `
        Name: ${vname}
        Email: ${vemail}
        Phone: ${vnumber}
        Checkin Time: ${currtime}
        Visiting ID: ${id}`
      };


      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log(`Checkin Email sent to Host: ${hname} ` + info.response);
        }
      });

//CHECKIN SMS SEND TO VISITOR

var sender='+12563803259';
var receiver = vnumber;
var message = `
Welcome ${vname} ,
Your Visiting ID is  ${id}
Kindly use it at the time of checkout.
Do not share the ID with anyone.`;
client.messages.create({
    to: receiver,
    from: sender,
    body: message
})
.then(message => console.log(`Checkin SMS sent To Visitor ${vname}: ` + message.sid))
.catch((error)=>{
  console.log("hi");
    console.log(error);
});

//CHECKIN EMAIL SENT TO VISITOR


var mailOptions = {
  from: 'your_email',
  to: vemail,
  subject: `Visiting ID`,
  text: `
  Welcome ${vname} ,
  Your Visiting ID is ${id}
  Kindly use it at the time of checkout.
  Do not share the ID with anyone.`
};



transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log(`Checkin Email sent To Visitor ${vname}: ` + info.response);
  }
});


res.redirect('/');
})


//GET API for checkout-page
app.get('/checkout',(req,res)=>{
    res.render('checkoutform.ejs');
})


//POST API for checkout-page
app.post('/checkout',(req,res)=>{
   var p=req.body;
    var timestamp=Date.now();
    var date = new Date(Date.now()); 
    var ot=date.toLocaleString('en-GB', { hour:'numeric', minute:'numeric',  hour12:true } );
    
    details.findOneAndUpdate({visitingId:p.visitingId}, {$set:{outtime:timestamp}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        console.log(doc);
        
        
        const{vemail,vname,vnumber,intime,hemail,hname,hnumber,address}=doc;
        var date = new Date(intime); 
        var it=date.toLocaleString('en-GB', { hour:'numeric', minute:'numeric',  hour12:true } );
        var id=doc.visitingId;
        //CHECKOUT EMAIL SEND TO VISITOR
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your_email',
          pass: 'your_password'
        }
      });
      
      var mailOptions = {
        from: 'your_email',
        to: vemail,
        subject: `Details about Your Visit ID ${id}`,
        text: `
        Thank You for visiting :)
        Name: ${vname}
        Phone: ${vnumber}
        Checkin Time: ${it}
        Checkout Time: ${ot}
        Host Name: ${hname}
        Address: ${address}`
      };
   

     transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log(`Checkout Email sent To Visitor ${vname}: ` + info.response);
        }
      });

      //CHECKOUT SMS TO VISITOR
      
      var sender='+12563803259';
  var receiver = vnumber;
  var message = `
  Reference to your Visit ID ${id}
  Thank You for visiting :)
  Name- ${vname}
  Phone- ${vnumber}
  Checkin Time- ${it}
  Checkout Time- ${ot}
  Host Name- ${hname}
  Address- ${address}`;
  client.messages.create({
      to: receiver,
      from: sender,
      body: message
  })
  .then(message => console.log(`Checkout SMS Sent To Visitor ${vname} : ` + message.sid))
  .catch((error)=>{
      console.log(error);
  });

  //CHECKOUT EMAIL SENT TO HOST
var mailOptions = {
    from: 'your_email',
    to: hemail,
    subject: 'Checkout Notification',
    text: `
    Hello ${hname},
    ${vname} with visiting id ${id} 
    has checked out successfully.
    Have a good day :)`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log(`Checkout Email sent to Host: ${hname} ` + info.response);
    }
  });

  //CHECKOUT SMS SEND TO HOST
var sender='+12563803259';  
var receiver = hnumber;
var message = `
Hello ${hname},
${vname} with visiting id ${id} 
has checked out successfully.
Have a good day :)`;
client.messages.create({
    to: receiver,
    from: sender,
    body: message
})
.then(message => console.log( `Checkout SMS Sent To Host ${hname} : `   + message.sid))
.catch((error)=>{
    console.log(error);
});


res.redirect('/');
})
})

//configuring port number for app
app.listen(config.port,()=>{
    console .log(`Server is running on port ${config.port}`);
})
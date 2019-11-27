const mongoose=require('mongoose');
mongoose.connect('mongodb://akt114:Summergeeks114@ds121183.mlab.com:21183/summergeeks',{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
    console.log('connected with database');
});

const Schema=mongoose.Schema;

const detailSchema=new Schema({
   vname:{
       type:String,
       required:true
   },
   vemail:{
       type:String,
       required:true
   },
   vnumber:{
       type:String,
       required:true
   },
    intime:{
        type:Number,
        // required:true
    },
    outtime:{
        type:Number,
        // required:true
    },
    hname:{
       type:String,
       required:true
   },
   hemail:{
       type:String,
       required:true
   },
   hnumber:{
       type:String,
       required:true
   },
    address:{
        type:String,
        required:true
},

   visitingId:{
       type:String,
       required:true
   }
})

module.exports=mongoose.model('details',detailSchema);
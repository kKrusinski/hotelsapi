const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
    {
        userId:{type:String, required:true},
        hotelId:[{    
                roomId:{
                    type:String
                },
                howManyDays:{
                    type:Number,
                    default:1,
                }     
        }], 
      amount:{type:Number, required:true},
      discount:{type:Number}
    },
    {timestamps:true}
)
module.exports = mongoose.model("Bill", BillSchema); 
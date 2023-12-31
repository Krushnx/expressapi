const mongoose = require('mongoose');


const subsriberSchema = new mongoose.Schema({
    name : {
        type : String , 
        required  :true
        
    },
    subscriberToChannel : {
        type : String , 
        required  :true
        
    },
    subscribeDate  : {
        type : Date, 
        required  :true , 
        default : Date.now

    }
})


module.exports = mongoose.model('subscriber'  , subsriberSchema);
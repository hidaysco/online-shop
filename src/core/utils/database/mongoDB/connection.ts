import mongoose from 'mongoose'
const mongoURL = "mongodb://localhost:27017/onlineshop" || process.env.mongoUrl
export class mongoConnection{
    constructor(){
        this.connect()
    }
    connect(){           
        mongoose.connect(mongoURL,{
            useNewUrlParser:true,
        })
        .then(()=>console.log("Connected"))
        .catch((err) => {
            console.log(`something wrong ${err}`);
        })
    }
}
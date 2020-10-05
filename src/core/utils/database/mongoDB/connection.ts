import mongoose from 'mongoose'
const mongoURL = process.env.mongoUrl || "mongodb://localhost:27017/onlineshop"
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
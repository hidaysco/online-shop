
import mongoose from "mongoose";

export interface IItem { 
  name: string,
  desciption: string,
  category: string,
  author: string,
  price: number,
  qty: number,
  createdAt?: Date,
  updatedAt?: Date
}
const schema =  new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  author: String,
  price: Number,
  qty: Number,
  createdAt: {type:Date, default:Date.now},
  updatedAt: {type:Date, default:Date.now}
})

schema.pre('update', function update() {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  })
});
export const MItem = mongoose.model<IItem & mongoose.Document>('items', schema);

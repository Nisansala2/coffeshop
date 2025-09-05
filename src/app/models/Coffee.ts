import mongoose, { Schema, Document } from "mongoose";

export interface ICoffee extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string; // "hot" or "cold"
  popular: boolean;
}

const CoffeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: ["hot", "cold"], required: true },
  popular: { type: Boolean, default: false },
});

export default mongoose.models.Coffee ||
  mongoose.model<ICoffee>("Coffee", CoffeeSchema);
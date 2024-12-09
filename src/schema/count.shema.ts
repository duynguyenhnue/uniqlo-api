import { Schema, model } from 'mongoose';

const CounterSchema = new Schema({
  sequenceName: { type: String, required: true, unique: true },
  value: { type: Number, required: true, default: 0 },
});

export const Counter = model('Counter', CounterSchema);

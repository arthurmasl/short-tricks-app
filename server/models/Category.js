import { Schema, model } from 'mongoose';

const CategorySchema = Schema({
  name: String,
  items: Array,
  color: String,
});

export default model('Category', CategorySchema);

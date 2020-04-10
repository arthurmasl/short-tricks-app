import { Schema, model } from 'mongoose';

const ItemSchema = Schema({
  videos: Array,
  category: String,
  name: String,
  start: Number,
  end: Number,
  likes: Number,
});

export default model('Item', ItemSchema);

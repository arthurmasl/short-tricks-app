import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  id: String,
  name: String,
  photo: String,
  token: String,
  status: String,
  likes: Array,
});

export default model('User', UserSchema);

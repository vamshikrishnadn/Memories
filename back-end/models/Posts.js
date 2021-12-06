import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = Schema({
  creator: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  tags: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: String },
  selectedFile: { type: String },
  _user: { type: String, required: true },
});

const Post = mongoose.model('posts', postSchema);

export default Post;

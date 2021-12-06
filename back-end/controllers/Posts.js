import Post from "../models/Posts.js";
import mongoose from "mongoose";

export const fetchPosts = async (req, res) => {
  const posts = await Post.find();
  try {
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching posts");
  }
};


export const fetchPost = async (req, res) => {
  const post = req.params.id;
  const getPost = await Post.findById(post);
  try {
    res.status(200).send(getPost);
    console.log("this is called");
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching posts");
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const data = req.user;
  // console.log('User Data', data);

  const newPost = new Post({
    ...post,
    createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(409).json("Some thing went wrong in creating new post");
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, message, creator, selectedFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const updatedPost = {
    creator,
    title,
    message,
    tags,
    selectedFile,
    _id: id,
    createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  };

  await Post.findByIdAndUpdate(id, updatedPost, { new: true });
  try {
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some thing went wrong in updating post");
  }
};

export const deletePost = async (req, res) => {
  const post = req.params.id;
  try {
    await Post.findByIdAndRemove(post);
    res.send("Post Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySearch = async (req, res) => {
  const { tags, title } = req.query;
  console.log(req.query);
  try {
    const searchTitle = new RegExp(title, "i");
    const searchTags = new RegExp(tags, "i");
    const posts = await Post.find({
      $or: [{ title: searchTitle }, { tags: searchTags }],
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in Searching posts");
  }
};

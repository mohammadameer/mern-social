import Post from "../models/post.model";
import dbErrorHandler from "../helpers/dbErrorHandler";
import formidable from "formidable";
import fs from "fs";

const listNewsFeed = (req, res) => {
  let following = req.profile.following;
  following.push(req.profile._id);
  Post.find({ postedBy: { $in: req.profile.following } })
    .populate("comments", "text created")
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .sort("-created")
    .exec((err, posts) => {
      if (err)
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });
      res.json(posts);
    });
};

const listByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate("comments", "text created")
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .sort("-created")
    .exec((err, posts) => {
      if (err)
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });
      res.json(posts);
    });
};

const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err)
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    console.log(fields);
    let post = new Post(fields);
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err)
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });
      res.json(result);
    });
  });
};

const photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

const postByID = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if (err || !post)
        return res.status(400).json({
          error: "Post not found"
        });
      req.post = post;
      next();
    });
};

const isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if (!isPoster)
    return res.status(403).json({
      error: "User is not authorized"
    });
  next();
};

const remove = (req, res) => {
  let post = req.post;
  post.remove((err, deletedPost) => {
    if (err)
      res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err)
      });
    res.json(deletedPost);
  });
};

const like = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err)
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err)
      });
    res.json(result);
  });
};

const unlike = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.userId,
    { $pull: { likes: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err)
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err)
      });
    res.json(result);
  });
};

const comment = (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  ).exec((err, result) => {
    if (err)
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err)
      });
    res.json(result);
  });
};

const uncomment = (req, res) => {
  let comment = req.body.comment;
  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { comments: { _id: comment._id } } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err)
        return res.status(400).json({
          error: dbErrorHandler.getErrorMessage(err)
        });
      res.json(result);
    });
};

export default {
  listNewsFeed,
  listByUser,
  photo,
  create,
  postByID,
  isPoster,
  remove,
  like,
  unlike,
  comment,
  uncomment
};

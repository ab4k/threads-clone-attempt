import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    const { postedBy, text, postImage } = req.body;
    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ message: "postedBy and text fields are mandatory" });
    }

    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user._id.toString() !== req.user._id.toString())
      return res
        .status(400)
        .json({ message: "User is not authorized to post" });

    const maxLength = 500;

    if (text.length > maxLength)
      return res.status(400).json({
        message: `The post length cannot be greater than ${maxLength} characters.`,
      });

    const newPost = await Post({ postedBy, text, postImage });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in createPost, ${error.message}`);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in getPost, ${error.message}`);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.postedBy._id.toString() !== req.user._id.toString())
      return res
        .status(400)
        .json({ message: "You are not authorized to delete this post" });

    await Post.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ message: "Post is deleted successfully.", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in deletePost, ${error.message}`);
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      return res.status(200).json({ message: "Post unliked successfully." });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: "Post liked successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in likePost, ${error.message}`);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    console.log("req.body-> ", req.body);
    console.log("req.params-> ", req.params);
    console.log("text-> ", { text });
    const postId = req.params.id;
    console.log("postId-> ", postId);
    const { id: postId1 } = req.params;
    console.log("postId1-> ", postId1);
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;

    const username = req.user.username;

    if (!text)
      return res.status(400).json({ message: "Text field is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const reply = { userId, userProfilePic, text, username };
    post.replies.push(reply);

    await post.save();

    return res.status(200).json({ message: "Replied Successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in replyToPost, ${error.message}`);
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const following = user.following;
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ feedPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in getFeedPosts, ${error.message}`);
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
};

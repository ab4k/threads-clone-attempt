import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import generateTokenSetCookie from "../utils/helperFunctions/generateTokenSetCookie.js";

const signupUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const doesUserExists = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (doesUserExists) {
      return res
        .status(400)
        .json({ message: "User already exists, try sign in" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(newUser);
    if (newUser) {
      generateTokenSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(`Something went wrong in Sign up ${err.message}`);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    console.log(user.email);
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordValid) {
      return res.status(400).json({ message: "Invalid user credentials" });
    }
    generateTokenSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in login, ${error.message}`);
  }
};

const logoutUser = (_, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in logout, ${error.message}`);
  }
};

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot follow / unfollow yourself" });
    }

    if (!userToModify || !currentUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      return res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow user
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      return res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in followUnfollowUser, ${error.message}`);
  }
};

const updateProfile = async (req, res) => {
  const { name, email, username, password, profilePic, bio } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "Unauthorized" });
    if (req.params.id !== userId.toString())
      return res.status(400).json({
        message: "You are not authorized to update other's profile. 😡",
      });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in updateProfile, ${error.message}`);
  }
};

const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select(
      "-password -createdAt -updatedAt -email"
    );
    if (!user) return res.status(400).json({ message: "User not found" });

    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error in getUserProfile, ${error.message}`);
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateProfile,
  getUserProfile,
};

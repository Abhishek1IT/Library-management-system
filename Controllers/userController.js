import User from '../Models/User.js';

// Get all users (Librarian)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update user (Librarian)
export const updateUser = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = role || user.role;
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete user (Librarian)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

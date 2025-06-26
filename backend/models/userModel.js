import mongoose from "mongoose";

// Define the user schema
// This schema defines the structure of the user documents in the MongoDB collection
// Each user will have a name, email, password, and cartData
// The 'required' field ensures that these fields must be provided when creating a user
// The 'unique' field for email ensures that no two users can have the same email address
// The 'default' field for cartData will automatically set an empty object when a user is created
// The 'minimize: false' option allows the cartData field to be stored even if it is empty or undefined,
// which is useful for maintaining the structure of the user document
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // when user is created, cartData will be unavailable
    // because mongoose neglects properties that are empty or undefined
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("User", userSchema);

export default userModel;

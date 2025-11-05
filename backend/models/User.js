import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6
  },
  role: {
    type: String,
    enum: ["learner", "teacher", "admin"],
    default: "learner"
  },
  credits: {
    type: Number,
    default: 1, 
    min: 0
  },
  skills: [
    {
      name: { type: String },
      level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const bcrypt = await import("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;

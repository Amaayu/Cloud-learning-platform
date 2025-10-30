import mongoose, { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  bookmarks: mongoose.Types.ObjectId[];
  progress: {
    subjectId: mongoose.Types.ObjectId;
    completedTopics: mongoose.Types.ObjectId[];
    completedUnits: mongoose.Types.ObjectId[];
    progressPercentage: number;
  }[];
  theme: "light" | "dark" | "system";
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, mongoose.Document {}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
    progress: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
        completedTopics: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
          },
        ],
        completedUnits: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
          },
        ],
        progressPercentage: {
          type: Number,
          default: 0,
        },
      },
    ],
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserDocument> = mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        cfid: {
            type: String,
        },
        lcid : {
            type: String
        },
        about: {
            type: String
        },
        githubUsername:{
            type: String
        },
        githubAccessToken:{
            type: String
        },
    },{timestamps:true}
)

export default mongoose.model("users", userSchema)
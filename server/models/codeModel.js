import mongoose from 'mongoose'

const codeSchema = new mongoose.Schema(
    {
        owner:{
            type: String,
        },
        name:{
            type: String,
            required: true,
        },
        desc:{
            type: String,
            required: true,
        },
        content:{
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

export default mongoose.model("code", codeSchema);
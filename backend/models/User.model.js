import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    profileUrl:{
        type: String,
        required: true
    },
    avatarUrl:{
        type:String,
    },
    likedProfiles:{
        type: [String],
        default: []
    },
    likedBy:[
        {
            username:{
                type: String,
                required: true
            },
            avatarUrl:{
                type: String, 
            },
            likedDate:{
                type: Date,
                default: Date.now
            }
        }
    ]

}, { timestamps: true })

export default mongoose.model("User", userSchema);
import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        is_active: {
            type: Boolean,
            required: false,
            default: true
        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user"
        },
    },
    {
        timestamps: true,
    }
);

const User = model('User', UserSchema)

export default User;
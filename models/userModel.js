import mongoose from 'mongoose';

const userSchema = new mongooes.Schema({
    username: {
        type: String,
        require: [true, 'Please provide a username'],
        unique: true
    },
    email:{
        type: String,
        require: [true, 'Please provide an email'],
        unique:true
    },
    password:{
        type: String,
        require: [true, 'Please provide an password'],
    },
    isVarified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgetPasswordTolen: String,
    forgetPasswordTolenExpiry: Date,
    verifyToken: String,
    verifyTokenEpiry: Date
})

const User =mongoose.models.user || mongoose.model("users", userSchema)

export default User
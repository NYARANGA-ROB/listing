const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2ZZn1O7P6wpLivC46RDkkpL4uN862KR9Lw&usqp=CAU"
    },
}, {timestamps: true});

const User = mongoose.model("User",userSchema);
module.exports = {User};


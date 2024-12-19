const { User } = require("../models/user.model");
const  bcryptjs  = require('bcryptjs');
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

 exports.signup = async (req,res,next) =>{
    console.log(req.body);
    let {username, email, password} = req.body;
    if(!username || !email || !password || username =="" || email == "" || password == ""){
        next(errorHandler(400, 'all fields are required...'));
    }
    

    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password: hashedPassword});

    try{
        await newUser.save();
        res.status(201).json("User created successfully...");
        console.log("user added ...")
    }
    catch(error){
        console.log(error);
        next(error);
        // next(errorHandler(550,"internal issue..."));
        

    }
}

exports.signin = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        console.log(validUser);  // Log the user object to check if it's retrieved correctly

        if (!validUser) {
            return next(errorHandler(404, 'User not found!'))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(401, "Invalid input!"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc; //password is not sending as a response
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}

exports.google = async (req,res,next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly: true})
                .status(200)
                .json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });

            console.log(newUser);
            await newUser.save();
            const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET);
            const {password: pass, ...rest} = newUser._doc;
            res.cookie('access_token', token, {httpOnly: true})
                .status(200)
                .json(rest);
        }
    }
    catch(error){

    }
};

exports.signOut = async (req, res, next) => {
    try {
        await res.clearCookie('access_token'); // Add quotes around 'access_token'
        res.status(200).json("User has been log Out");
    } catch (error) {
        next(error);
    }
};

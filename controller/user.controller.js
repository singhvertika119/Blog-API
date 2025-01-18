import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//JWT secret key and expiration time
const jwtSecret = "mysecretkey";
const jwtExpirySeconds = 300;

//Generate JWT token
const generateToken = (user) => {
    const token = jwt.sign({ id: user.id }, jwtSecret, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    });
    return token;
};

//Sign up user
const signup = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        //Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        const user = await User.create({ name, email, password, username });

        //Generate JWT token
        const token = generateToken(user._id);

        return res.status(201).json({ message: "User created succesfully", user: { id: user._id, name: user.name }, token });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
}

//login user 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //Generate JWT token
        const token = generateToken(user._id);

        return res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name }, token });
    }

    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
}

//Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json({ message: "User found", data: user });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

//Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, password, username } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({ message: "Invalid User ID" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updateData = {
            name,
            email,
            password: hashedPassword,
            username
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

        return res.status(200).json({ message: "User Updated succsesfully", data: updatedUser });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
}

//Delete User Profile
const deleteUserProfile = async(req, res) => {
    try {
        const { userId } = req.params;
        if( !userId ) {
            return res.status(400).json({ message: "User ID is required" });
        }
        
        if( !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({ message: "Invalid User ID" });
        }

        const deletedUser = await User.findByIdAndDelete(userId).select("-password");

        return res.status(200).json({ message: "User deleted succesfully"});
        
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        }) 
    }
}

export { signup, login, getUserProfile, updateUserProfile, deleteUserProfile };
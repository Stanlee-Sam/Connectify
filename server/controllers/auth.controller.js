import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    },  process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
}

export const signup = async (req, res) => {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        // friends,
        // location,
        // occupation,
    } = req.body;

    const picturePath = req.file ? req.file.path : null;

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with all required fields
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                username,
                email,
                password: hashedPassword,
                name: `${firstName} ${lastName}`, 
                // picturePath,
                // friends,
                // location,
                // occupation,
                // viewedProfile: Math.floor(Math.random() * 10000),
                // impressions: Math.floor(Math.random() * 10000),
            },
        });

        res.status(200).json({ success: true, message: "Sign up successful", data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const login = async (req, res) => {
    try {
        console.log("Login request received:", req.body);

        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: { email: email },
        });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ success: false, message: "Invalid user credentials" });
        }

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        console.log("User logged in:", user);

        return res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = (req,res) => {
    res.clearCookie('token',{
        secure : 'true',
        sameSite : 'none',
    });
    return res.status(200).json({ success: true, message: "Logged out" });
}
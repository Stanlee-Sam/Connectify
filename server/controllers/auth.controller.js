import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const generateToken = (user) => {
    return jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
}

export const signup = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        friends,
        location,
        occupation,
    } = req.body;

    const picturePath = req.file ? req.file.path : null;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                picturePath,
                friends,
                location,
                occupation,
                viewedProfile: Math.floor(Math.random() * 10000),
                impressions: Math.floor(Math.random() * 10000),
            },
        });

        res.status(200).json({ success: true, message: "Sign up successful", data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: { email: email },
        });
        if (!user || await bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ success: false, message: "Invalid user credentials" });
        } 
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

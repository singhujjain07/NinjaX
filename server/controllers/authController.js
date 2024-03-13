import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"
import { hashPassword, comparePassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, cfid, lcid } = req.body
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        // check user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered!! please login '
            })
        }

        // register
        const hashedPassword = await hashPassword(password)
        // save
        const user = await new userModel({ name, email, password: hashedPassword, cfid, lcid }).save()
        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid credentials'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        // generate token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.status(200).send({
            success: true,
            message: 'Login Successfull',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                cfid: user.cfid,
                lcid: user.lcid,
                about: user.about
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in logging in',
            error
        })
    }
}

export const updateCfController = async (req, res) => {
    try {
        const { cfid } = req.body
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            cfid: cfid
        },{ new: true })
        res.status(200).send({
            success: true,
            message: 'Ccodeforces Id Updated Successfully',
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in updating Ccodeforces Id',
            error
        })
    }
}
export const updateLcController = async (req, res) => {
    try {
        const { lcid } = req.body
        console.log(lcid)
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            lcid: lcid
        },{ new: true })
        res.status(200).send({
            success: true,
            message: 'Leetcode Id Updated Successfully',
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in updating LC Id',
            error
        })
    }
}

export const updateProfileController = async (req,res) =>{
    try {
        const {name,email,lcid,cfid,about} = req.body;
        const user = await userModel.findById(req.user._id);
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            email: email || user.email,
            about: about,
            lcid: lcid,
            cfid: cfid,
        }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Profile Updated Successfully',
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating profile".
            error
        })
    }
}
const encryptUtil = require("../utils/EncryptUtil");
const userModel = require('../models/UserModel');
const token = require('../utils/TokenUtil');

const register = async (req, res) => {
    const email = req.body.email;
    const userExits = await userModel.findOne({ email });
    if (userExits) {
        return res.status(400).json({
            message: "Email already exists",
        })
    }

    req.body.password = await encryptUtil.encryptPasswaord(req.body.password);
    const user = await userModel.create(req.body);
    res.status(201).json({
        token: token.generateToken(user._id),
        data: user,
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const userFromEmail = await userModel.findOne({ email: email });
    // console.log(userFromEmail);

    if (userFromEmail) {
        const token = tokenUtil.generateToken(userFromEmail._id);
        if (encryptUtil.comparePassword(password, userFromEmail.password)) {
            res.status(200).json({
                message: "user login successfully....",
                token: token,
            })
        } else {
            res.status(401).json({
                message: "invalid password...",
            })
        }
    } else {
        res.status(404).json({
            message: "User not found...",
        })
    }
}

module.exports = {
    login,
    register
}
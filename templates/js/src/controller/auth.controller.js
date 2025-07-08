const AuthService = require("../services/auth.service");

exports.register = async(req, res) => {
    const result = await AuthService.register(req.body);
    res.status(201).json(result);
};

exports.login = async(req, res) => {
    const result = await AuthService.login(req.body);
    res.json(result);
};
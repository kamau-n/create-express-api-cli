const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../config/data-source");
const { User } = require("../entities/User");

const AuthService = {
    async register({ email, password }) {
        const repo = AppDataSource.getRepository("User");
        const hashed = await bcrypt.hash(password, 10);
        const user = repo.create({ email, password: hashed });
        await repo.save(user);
        return { message: "User registered" };
    },

    async login({ email, password }) {
        const repo = AppDataSource.getRepository("User");
        const user = await repo.findOneBy({ email });
        if (!user) throw new Error("Invalid credentials");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Invalid credentials");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return { token };
    },
};

module.exports = AuthService;
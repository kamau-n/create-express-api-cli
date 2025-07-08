import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export const AuthService = {
  async register(data: { email: string; password: string }) {
    const repo = AppDataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = repo.create({ ...data, password: hashedPassword });
    await repo.save(user);
    return { message: "User registered" };
  },

  async login(data: { email: string; password: string }) {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ email: data.email });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return { token };
  },
};

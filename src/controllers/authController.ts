import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { sendVerificationEmail } from "../config/email";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    const token = generateToken({ userId: user.id }, "1d");
    await sendVerificationEmail(user.email, token);

    res.json({ message: "Signup successful, check your email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ message: "Missing token" });

  try {
    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET as string);
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { verified: true }
    });
    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
router.post("/login", login);

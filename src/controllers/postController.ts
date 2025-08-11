import { Request, Response } from "express";
import prisma from "../config/db";

export const createPost = async (req: Request, res: Response) => {
  const { content, type } = req.body;
  const mediaUrl = req.file?.path || null;
  const userId = (req as any).userId; // set by auth middleware

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const post = await prisma.post.create({
      data: {
        authorId: userId,
        content,
        mediaUrl,
        type,
      },
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const getPublicFeed = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, name: true, avatarUrl: true } },
      },
      take: 20,
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

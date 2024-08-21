import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  console.log("Post ID:", postId);
  console.log("User ID:", userId);

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId: parseInt(userId), postId: parseInt(postId) },
      },
    });

    if (existingLike) {
      return res
        .status(400)
        .json({ message: "You have already liked this post." });
    }

    const newLike = await prisma.like.create({
      data: {
        userId: parseInt(userId),
        postId: parseInt(postId),
      },
    });
    console.log("New Like Created:", newLike);

    res.status(201).json(newLike);
  } catch (e) {
    console.error("Error during likePost:", e);

    res.status(500).json({ message: "Server Error" });
  }
};

export const getLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const likes = await prisma.like.findMany({
      where: { postId: parseInt(postId) },
    });

    res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const dislikePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId: parseInt(userId), postId: parseInt(postId) },
      },
    });
    if (!existingLike) {
      return res.status(404).json({ message: "You have not liked this post." });
    }

    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
    res.status(200).json({ message: "Post unliked successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

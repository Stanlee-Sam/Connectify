import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getComment = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10); 
    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Invalid Post ID' });
    }

    console.log(`Fetching comments for postId: ${postId}`); 

    
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePic: true
          }
        }
      }
    });

    console.log("Fetched Comments:", comments); 

    if (comments.length === 0) {
      return res.status(404).json({ error: 'No comments found' });
    }

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



export const addComment = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); 
    const { userId, desc, postId } = req.body;

    if (!userId || !desc || !postId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const parsedPostId = parseInt(postId, 10);
    if (isNaN(parsedPostId)) {
      return res.status(400).json({ message: "Invalid Post ID" });
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    const postExists = await prisma.post.findUnique({ where: { id: parsedPostId } });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = await prisma.comment.create({
      data: {
        userId,
        desc,
        postId: parsedPostId,
        createdAt: new Date()
      },
    });

    res.status(201).json(newComment);
  } catch (e) {
    console.error("Error adding comment:", e);
    res.status(500).json({ message: "Server Error" });
  }
};
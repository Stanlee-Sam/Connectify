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
};

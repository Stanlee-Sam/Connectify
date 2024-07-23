import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getRelationship = async (req, res) => {
  const { userId } = req.params;
  const parsedUserId = parseInt(userId, 10);

  if (isNaN(parsedUserId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const relationships = await prisma.relationship.findMany({
      where: {
        followerUserId: parsedUserId,
      },
    });
    const followedUserIds = relationships.map(r => r.followedUserId);
    res.status(200).json(followedUserIds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addRelationship = async (req, res) => {
    const { followerUserId, followedUserId } = req.body;
    const followerId = parseInt(followerUserId, 10);
    const followedId = parseInt(followedUserId, 10);
  
    console.log("Request body:", req.body);
    console.log("Parsed followerId:", followerId);
    console.log("Parsed followedId:", followedId);
  
    if (isNaN(followerId) || isNaN(followedId)) {
      console.error("Invalid user IDs:", { followerId, followedId });
      return res.status(400).json({ error: "Invalid user IDs" });
    }
  
    try {
      const isFollowerValid = await prisma.user.findUnique({ where: { id: followerId } });
      const isFollowedValid = await prisma.user.findUnique({ where: { id: followedId } });
  
      if (!isFollowerValid || !isFollowedValid) {
        console.error("User validation failed:", { isFollowerValid, isFollowedValid });
        return res.status(400).json({ error: "One or both user IDs do not exist" });
      }
  
      const existingRelationship = await prisma.relationship.findUnique({
        where: {
          followerUserId_followedUserId: {
            followerUserId: followerId,
            followedUserId: followedId,
          },
        },
      });
  
      if (existingRelationship) {
        console.log("Relationship already exists:", existingRelationship);
        return res.status(409).json({ error: "Relationship already exists" });
      }
  
      const newRelationship = await prisma.relationship.create({
        data: {
          followerUserId: followerId,
          followedUserId: followedId,
        },
      });
      res.status(201).json(newRelationship);
    } catch (error) {
      console.error("Error creating relationship:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

// Remove an existing follow relationship
export const deleteRelationship = async (req, res) => {
  const { followerUserId, followedUserId } = req.body;
  const followerId = parseInt(followerUserId, 10);
  const followedId = parseInt(followedUserId, 10);

  if (isNaN(followerId) || isNaN(followedId)) {
    return res.status(400).json({ error: "Invalid user IDs" });
  }

  try {
    // Check if users exist
    const isFollowerValid = await prisma.user.findUnique({ where: { id: followerId } });
    const isFollowedValid = await prisma.user.findUnique({ where: { id: followedId } });

    if (!isFollowerValid || !isFollowedValid) {
      return res.status(400).json({ error: "One or both user IDs do not exist" });
    }

    await prisma.relationship.deleteMany({
      where: {
        followerUserId: followerId,
        followedUserId: followedId,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

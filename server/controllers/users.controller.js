

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      const friends = await Promise.all(
        user.friends.map((id) => prisma.user.findUnique({ where: { id } }))
      );
      const formattedFriends = friends.map(({ id, firstName, lastName, occupation, location, picturePath }) => ({
        id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      }));
      res.status(200).json({ formattedFriends });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { friendId } = req.params;
    const userId = req.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const friend = await prisma.user.findUnique({ where: { id: friendId } });

    if (user && friend) {
      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== userId);
      } else {
        user.friends.push(friendId);
        friend.friends.push(userId);
      }
      await prisma.user.update({ where: { id: userId }, data: { friends: user.friends } });
      await prisma.user.update({ where: { id: friendId }, data: { friends: friend.friends } });

      const updatedFriends = await Promise.all(
        user.friends.map((id) => prisma.user.findUnique({ where: { id } }))
      );
      const formattedFriends = updatedFriends.map(({ id, firstName, lastName, occupation, location, picturePath }) => ({
        id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      }));

      res.status(200).json({ formattedFriends });
    } else {
      res.status(404).json({ message: 'User or friend not found' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

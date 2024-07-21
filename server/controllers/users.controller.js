// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// export const getUser = async(req, res) => {
//     try{
//         const { id} = req.params;
//         const user = await prisma.user.findById(id);
//         res.status(200).json(user)
//     } catch(e){
//         res.status(500).send({message: e.message})
//     }
// }

// export const getUserFriends = async(req, res) => {
//     try{
//         const { id} = req.params;
//         const user = await prisma.user.findById(id);

//         const friends =  await Promise.all(
//             user.friends.map((id) => User.findById(id))
//         )
//         const formattedFriends = friends.map(
//             ({_id, firstName, lastName, occupation, location, picturePath }) => {
//                 return {
//                     id: _id,
//                     firstName,
//                     lastName,
//                     occupation,
//                     location,
//                     picturePath,
//                 }
//             }
//         )
//         res.status(200).json({formattedFriends})
//     }catch(e){
//         res.status(500).json({message : e.message})
//     }
// }

// export const addRemoveFriend = async(req, res) => {
//     try{
//         const { id, friendId } = req.params;
//         const user = await prisma.user.findById(id);
//         const friend = await prisma.user.findById(friendId);

//         if(user.friends.includes(friendId)){
//             user.friends = user.friends.filter((id) => id !== friendId)
//             friend.friends = friend.friends.filter((id) => id !== id);
//         } else {
//             user.friends.push(friendId)
//             friend.friends.push(id)
//         }
//         await user.save()
//         await friend.save()

//         const friends =  await Promise.all(
//             user.friends.map((id) => User.findById(id))
//         )
//         const formattedFriends = friends.map(
//             ({_id, firstName, lastName, occupation, location, picturePath }) => {
//                 return {
//                     id: _id,
//                     firstName,
//                     lastName,
//                     occupation,
//                     location,
//                     picturePath,
//                 }
//             }
//         )


//         res.status(200).json({formattedFriends})



//     }catch(e){
//         res.status(500).json({message : e.message})
//     }
// }

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve user ID from token
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
    const userId = req.user.id; // Retrieve user ID from token
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
    const userId = req.user.id; // Retrieve user ID from token
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

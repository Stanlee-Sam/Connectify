import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUser = async(req, res) => {
    try{
        const { id} = req.params;
        const user = await prisma.user.findById(id);
        res.status(200).json(user)
    } catch(e){
        res.status(500).send({message: e.message})
    }
}

export const getUserFriends = async(req, res) => {
    try{
        const { id} = req.params;
        const user = await prisma.user.findById(id);

        const friends =  await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath }) => {
                return {
                    id: _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                }
            }
        )
        res.status(200).json({formattedFriends})
    }catch(e){
        res.status(500).json({message : e.message})
    }
}

export const addRemoveFriend = async(req, res) => {
    try{
        const { id, friendId } = req.params;
        const user = await prisma.user.findById(id);
        const friend = await prisma.user.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()

        const friends =  await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath }) => {
                return {
                    id: _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                }
            }
        )


        res.status(200).json({formattedFriends})



    }catch(e){
        res.status(500).json({message : e.message})
    }
}
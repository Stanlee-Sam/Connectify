import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const likePost = async(req,res) => {
    try{
        const { id} = req.params
        const { userId} = req.body
        const post = await prisma.Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId)
        }else{
            post.likes.set(userId, true)
        }

        const updatedPost = await prisma.Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )
        
        res.status(200).json()
    }catch(e){
        
        res.status(500).json({ message : e.message})
    }
    
}
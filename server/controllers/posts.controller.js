import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createPost = async(req,res) => {
    try {
        const { userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post ({
            userId,
            firstName : user.firstName,
            lastName: user.lastName,
            location : user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes : {},
            comments : []
        })
        await newPost.save();

        const post = await prisma.Post.find()
        res.status(201).json(post)
    }
    catch(e){
        console.error(e)
        res.status(500).json({ message: "Server Error" })
    }

}

export const getFeedPosts = async(req,res) => {
    try{
        const post = await prisma.Post.find();
        res.status(200).json(post)
    }catch(e){
        console.error(e)
        res.status(500).json({ message : e.message})
    }

}
export const getUserPosts = async(req,res) => {
    try{
        const { userId } = req.params;
        const post = await prisma.Post.find({userId});
        res.status(200).json(post)
    }catch(e){
        console.error(e)
        res.status(500).json({ message : e.message})
    }
    
}
// export const likePost = async(req,res) => {
//     try{
//         const { id} = req.params
//         const { userId} = req.body
//         const post = await prisma.Post.findById(id);
//         const isLiked = post.likes.get(userId);

//         if(isLiked){
//             post.likes.delete(userId)
//         }else{
//             post.likes.set(userId, true)
//         }

//         const updatedPost = await prisma.Post.findByIdAndUpdate(
//             id,
//             { likes: post.likes },
//             { new: true }
//         )
        
//         res.status(200).json()
//     }catch(e){
        
//         res.status(500).json({ message : e.message})
//     }
    
// }
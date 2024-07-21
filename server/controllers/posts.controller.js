import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// export const createPost = async (req, res) => {
//     try {
//         const { userId, description, picturePath } = req.body;
//         const user = await prisma.user.findUnique({ where: { id: userId } });

//         if (!user) return res.status(404).json({ message: "User not found" });

//         const newPost = await prisma.post.create({
//             data: {
//                 userId,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 location: user.location,
//                 description,
//                 userPicturePath: user.picturePath,
//                 picturePath,
//                 likes: {},
//                 comments: []
//             }
//         });

//         const post = await prisma.post.findMany(); 
//         res.status(201).json(post);
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

export const createPost = async (req, res) => {
    try {
      const { userId, description, img, name, profilePic } = req.body;
  
      // Check if user exists
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Create a new post
      const newPost = await prisma.post.create({
        data: {
          userId,
          name: name || `${user.firstName} ${user.lastName}`, // Default to user's full name if name is not provided
          desc: description,
          img,
          profilePic: profilePic || user.picturePath, // Default to user's picture if profilePic is not provided
        },
      });
  
      // Respond with the newly created post
      res.status(201).json(newPost);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

export const getFeedPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await prisma.post.findMany({ where: { userId } });
        res.status(200).json(posts);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};
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
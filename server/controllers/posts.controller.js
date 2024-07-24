import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export const createPost = async (req, res) => {
  try {
    const { userId, desc, img, name, profilePic } = req.body;

   
    if (!userId || !desc || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    
    const newPost = await prisma.post.create({
      data: {
        userId,
        desc,
        img: img || '', 
        name,
        profilePic: profilePic || '' 
      },
    });

    res.status(201).json(newPost);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
};

  


export const getFeedPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true },  
      orderBy: { createdAt: 'desc' }  
    });

    console.log("Posts:", posts);
    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

  export const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      
      const parsedUserId = parseInt(userId, 10);
  
      if (isNaN(parsedUserId)) {
        return res.status(400).json({ message: "Invalid User ID" });
      }
  
     
      const posts = await prisma.post.findMany({
        where: { userId: parsedUserId },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
  
  
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
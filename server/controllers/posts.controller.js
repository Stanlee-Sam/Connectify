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
      const userId = req.user.id;

      console.log("User ID:", userId);
  
      
      const followingRelationships = await prisma.relationship.findMany({
        where: { followerUserId: userId },
        select: { followedUserId: true }
      });

      console.log("Following Relationships:", followingRelationships);
  
      const followingIds = followingRelationships.map(rel => rel.followedUserId);
      console.log("Following IDs:", followingIds); 
  
      
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            { userId: userId }, 
            { userId: { in: followingIds } } 
          ]
        },
        include: { user: true }, 
        orderBy: {
          createdAt: 'desc' 
        }
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
      const posts = await prisma.post.findMany({ where: { userId: parseInt(userId, 10) } });
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
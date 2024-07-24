import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      username: 'john_doe',
      email: 'john@example.com',
      password: 'hashed_password',
      name: 'John Doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'hashed_password',
      name: 'Jane Doe',
    },
  });

  // Create relationships
  await prisma.relationship.create({
    data: {
      followerUserId: user1.id,
      followedUserId: user2.id,
    },
  });

  // Create posts
  await prisma.post.createMany({
    data: [
      {
        desc: 'This is a post by John Doe',
        img: 'path/to/image1.jpg',
        name: 'John Doe',
        profilePic: 'path/to/profilepic1.jpg',
        userId: user1.id,
      },
      {
        desc: 'This is a post by Jane Doe',
        img: 'path/to/image2.jpg',
        name: 'Jane Doe',
        profilePic: 'path/to/profilepic2.jpg',
        userId: user2.id,
      },
    ],
  });

  console.log('Seeding complete.');
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

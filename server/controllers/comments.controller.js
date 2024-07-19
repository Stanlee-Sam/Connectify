import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const addComment = (req,res) => {
    res.send("Comment")
}

